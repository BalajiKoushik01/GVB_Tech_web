import { reconstructRepeat, CellSource } from '../../../lib/weavecore/reconstruct-repeat';
import { adaptivePalette } from './photo-palette';
import { detectRepeat } from './repeat-detection';
import { readIndexedBmp } from './indexed-bmp';
import { sizeOK, type Design, type RGB } from './model';

type Options = { width: number; height: number; colors: number; mode: string; corners: number[][]; photo?: "repeat" | "motif"; occlusion?: number[][]; repeatCounts?: { across: number; down: number } };

export async function extractLocally(file: File, { width, height, colors: paletteBudget, mode, corners, photo, occlusion, repeatCounts }: Options): Promise<Design> {
  if (!sizeOK(width, height)) throw Error('Choose valid output dimensions, up to four million cells.');
  if (photo && corners.length !== 4) throw Error('Mark four corners around the fabric only.');
  const bmp = mode === 'preserve' ? readIndexedBmp(await file.arrayBuffer()) : null;
  if (bmp) {
    const pixels = sampleGrid(width, height, bmp.width, bmp.height, corners, bmp.indexAt);
    return {
      schema: 'weavecore.indexed.v1', width, height, pixels, palette: bmp.palette,
      names: bmp.palette.map((_, index) => `Color ${index}`), regions: [],
      provenance: { source: 'indexed BMP' },
      report: { used_colors: new Set(pixels).size, rgb_mae: 0, exact_sampled_rgb: true, notes: ['Original BMP palette slots and sampled indices preserved.'] },
    };
  }
  const image = await createImageBitmap(file).catch(() => {
    throw Error('This browser could not open that image. Try a PNG or JPEG.');
  });
  try {
    if (image.width * image.height > 24_000_000) throw Error('Choose an image with up to 24 million pixels.');
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw Error('Image editing is unavailable in this browser.');
    ctx.drawImage(image, 0, 0);
    const source = ctx.getImageData(0, 0, image.width, image.height).data;
    const excluded = (x: number, y: number) => {
      if (!occlusion || occlusion.length !== 2) return false;
      const [a, b] = occlusion;
      return x >= Math.min(a[0], b[0]) && x <= Math.max(a[0], b[0]) &&
             y >= Math.min(a[1], b[1]) && y <= Math.max(a[1], b[1]);
    };
    let right = 1, bottom = 1;
    let columns = false, rows = false;
    const notes: string[] = [];
    let combine: ((x: number, y: number) => RGB) | undefined;
    if (photo === 'repeat') {
      const gridWidth = Math.min(256, width);
      const gridHeight = Math.min(256, height);
      const observed = new Uint8Array(gridWidth * gridHeight);
      const light = sampleGrid(gridWidth, gridHeight, image.width, image.height, corners, (x, y, cell) => {
        const offset = (y * image.width + x) * 4;
        observed[cell] = source[offset + 3] === 255 && !excluded(x, y) ? 1 : 0;
        return Math.round(.299 * source[offset] + .587 * source[offset + 1] + .114 * source[offset + 2]);
      });
      const detected = repeatCounts ? null : detectRepeat(light, gridWidth, gridHeight, observed.every(Boolean) ? undefined : observed);
      if (!repeatCounts && !detected?.columns && !detected?.rows) {
        throw Error('No reliable repeat found. Enter the number of complete copies in the crop or extract one motif.');
      }
      columns = repeatCounts ? repeatCounts.across > 1 : Boolean(detected?.columns);
      rows = repeatCounts ? repeatCounts.down > 1 : Boolean(detected?.rows);
      if (repeatCounts) {
        const fits = (count: number, size: number) => Number.isInteger(count) && count >= 1 && count <= 64 && size % count === 0;
        if (!fits(repeatCounts.across, width) || !fits(repeatCounts.down, height)) {
          throw Error('The crop grid dimensions must divide evenly by the number of copies, from 1 to 64 per axis.');
        }
        right = columns ? width / repeatCounts.across / (width - 1) : 1;
        bottom = rows ? height / repeatCounts.down / (height - 1) : 1;
        width /= repeatCounts.across;
        height /= repeatCounts.down;
      } else {
        right = detected?.columns ? detected.columns / (gridWidth - 1) : 1;
        bottom = detected?.rows ? detected.rows / (gridHeight - 1) : 1;
        width = Math.max(1, Math.round(width * right));
        height = Math.max(1, Math.round(height * bottom));
      }
      const rectify = perspective(corners);
      const repeatsX = Math.min(3, repeatCounts?.across ?? (detected?.columns ? Math.floor(gridWidth / detected.columns) : 1));
      const repeatsY = Math.min(3, repeatCounts?.down ?? (detected?.rows ? Math.floor(gridHeight / detected.rows) : 1));
      if (observed.includes(0) || occlusion?.length === 2) {
        const cellCount = width * height;
        const copyCount = repeatsX * repeatsY;
        if (cellCount > 250_000) throw Error('Use a smaller output grid for masked repeat recovery.');
        const colors = new Uint8Array(cellCount * copyCount * 3);
        const copies = Array.from({ length: copyCount }, () => ({
          observed: new Uint8Array(cellCount), indices: new Uint8Array(cellCount),
        }));
        let count = 0;
        for (let copy = 0; copy < copyCount; copy++) {
          for (let cell = 0; cell < cellCount; cell++) {
            const x = cell % width, y = Math.floor(cell / width);
            const u = (columns ? x / width * right : width === 1 ? .5 : x / (width - 1)) + (copy % repeatsX) * right;
            const v = (rows ? y / height * bottom : height === 1 ? .5 : y / (height - 1)) + Math.floor(copy / repeatsX) * bottom;
            if (u > 1 || v > 1) continue;
            const [px, py] = rectify(u, v);
            const sx = Math.round(px), sy = Math.round(py);
            const offset = (sy * image.width + sx) * 4;
            if (source[offset + 3] !== 255 || excluded(sx, sy)) continue;
            copies[copy].observed[cell] = 1;
            colors.set(source.subarray(offset, offset + 3), count++ * 3);
          }
        }
        if (!count) throw Error('No visible fabric remained after masking.');
        const reduced = adaptivePalette(colors.subarray(0, count * 3), paletteBudget);
        let cursor = 0;
        for (const copy of copies) {
          for (let cell = 0; cell < cellCount; cell++) if (copy.observed[cell]) copy.indices[cell] = reduced.pixels[cursor++];
        }
        const recovered = reconstructRepeat(copies[0], copies.slice(1));
        const unresolved = recovered.source.filter(cell => cell === CellSource.Unresolved).length;
        if (unresolved) throw Error(`${unresolved} repeat cells lack agreement. Select a patch with more intact copies or a smaller obstruction.`);
        const repaired = recovered.source.filter(cell => cell === CellSource.MatchingRepeats).length;
        return {
          schema: 'weavecore.indexed.v1', width, height, pixels: recovered.indices, palette: reduced.palette,
          names: reduced.palette.map((_, index) => `Color ${index}`), regions: [],
          provenance: { source: 'masked repeat recovery', originalRepairedOffsets: recovered.source.reduce<number[]>((out, value, index) => {
            if (value === CellSource.MatchingRepeats) out.push(index);
            return out;
          }, []) },
          report: { used_colors: new Set(recovered.indices).size, rgb_mae: null, exact_sampled_rgb: null,
            notes: [`Recovered ${repaired} masked cells from agreeing visible copies.`, 'Palette indices in unmasked cells come from the reference copy.'] },
        };
      }
      if (repeatsX * repeatsY >= 3) {
        combine = (x, y) => {
          const u = columns ? x / width * right : width === 1 ? .5 : x / (width - 1);
          const v = rows ? y / height * bottom : height === 1 ? .5 : y / (height - 1);
          const samples: RGB[] = [];
          for (let row = 0; row < repeatsY; row++) {
            for (let column = 0; column < repeatsX; column++) {
              const copyU = u + column * right;
              const copyV = v + row * bottom;
              if (copyU > 1 || copyV > 1) continue;
              const [px, py] = rectify(copyU, copyV);
              const offset = (Math.round(py) * image.width + Math.round(px)) * 4;
              if (source[offset + 3] === 255) samples.push([source[offset], source[offset + 1], source[offset + 2]]);
            }
          }
          if (!samples.length) throw Error('No opaque fabric pixels were available at a repeat position.');
          // Select an observed RGB triplet, using the middle brightness to resist glare and shadows.
          samples.sort((a, b) => luminance(a) - luminance(b));
          return samples[Math.floor((samples.length - 1) / 2)];
        };
        notes.push(`Combined ${repeatsX * repeatsY} visible copies to reduce isolated glare and shadows.`);
      }
      notes.push(repeatCounts
        ? `Extracted one unit from the specified ${repeatCounts.across} × ${repeatCounts.down} layout. Inspect the repeat preview before tiling.`
        : `Repeat found on ${columns && rows ? 'both axes' : columns ? 'the horizontal axis' : 'the vertical axis'}. Inspect the extracted unit before tiling.`);
    } else if (photo) {
      notes.push('Extracted the visible fabric patch marked in the photo.');
    }
    const map = new Map<number, number>();
    let palette: RGB[] = [];
    const sampled = mode === 'reduce' ? new Uint8Array(width * height * 3) : null;
    let pixels = sampleGrid(width, height, image.width, image.height, corners, (x, y, cell) => {
      const offset = (y * image.width + x) * 4;
      if (!combine && source[offset + 3] !== 255) throw Error('Flatten transparent pixels onto a background before opening the image.');
      const rgb: RGB = combine ? combine(cell % width, Math.floor(cell / width)) : [source[offset], source[offset + 1], source[offset + 2]];
      if (sampled) {
        sampled.set(rgb, cell * 3);
        return 0;
      }
      const key = rgb[0] * 65536 + rgb[1] * 256 + rgb[2];
      const existing = map.get(key);
      if (existing !== undefined) return existing;
      if (palette.length === 256) throw Error('This image has more than 256 sampled colors. Choose Reduce colors, or use a flat-color artwork image.');
      const index = palette.length;
      map.set(key, index);
      palette.push(rgb);
      return index;
    }, right, bottom, columns, rows);
    let changed = 0;
    if (sampled) {
      const reduced = adaptivePalette(sampled, paletteBudget);
      palette = reduced.palette;
      pixels = reduced.pixels;
      changed = reduced.error;
      notes.push(`Used ${palette.length} palette slots derived from the selected fabric colors.`);
    }
    return {
      schema: 'weavecore.indexed.v1', width, height, pixels, palette,
      names: palette.map((_, index) => `Color ${index}`), regions: [], provenance: { source: 'browser trial' },
      report: {
        used_colors: palette.length, rgb_mae: changed / (pixels.length * 3), exact_sampled_rgb: changed === 0,
        notes: [...notes, 'Measured against browser-decoded RGB samples. Use an editable project file to preserve original palette indices.'],
      },
    };
  } finally {
    image.close();
  }
}

function luminance([r, g, b]: RGB) {
  return .299 * r + .587 * g + .114 * b;
}

function sampleGrid(width: number, height: number, sourceWidth: number, sourceHeight: number, corners: number[][], sample: (x: number, y: number, cell: number) => number, right = 1, bottom = 1, repeatX = false, repeatY = false) {
  const pixels = new Uint8Array(width * height);
  const transform = corners.length ? perspective(corners) : null;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const [sx, sy] = transform
        ? transform(repeatX ? x / width * right : width === 1 ? .5 : x / (width - 1), repeatY ? y / height * bottom : height === 1 ? .5 : y / (height - 1))
        : [(x + .5) * sourceWidth / width - .5, (y + .5) * sourceHeight / height - .5];
      const ix = Math.max(0, Math.min(sourceWidth - 1, Math.round(sx)));
      const iy = Math.max(0, Math.min(sourceHeight - 1, Math.round(sy)));
      pixels[y * width + x] = sample(ix, iy, y * width + x);
    }
  }
  return pixels;
}

function perspective(points: number[][]) {
  const [a, b, c, d] = points;
  const turns = points.map((p, i) => {
    const q = points[(i + 1) % 4], r = points[(i + 2) % 4];
    return (q[0] - p[0]) * (r[1] - q[1]) - (q[1] - p[1]) * (r[0] - q[0]);
  });
  if (!turns.every(turn => turn > 0)) throw Error('Mark a convex crop in clockwise order from the top-left.');
  const dx1 = b[0] - c[0], dx2 = d[0] - c[0], dx3 = a[0] - b[0] + c[0] - d[0];
  const dy1 = b[1] - c[1], dy2 = d[1] - c[1], dy3 = a[1] - b[1] + c[1] - d[1];
  const denominator = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / denominator;
  const h = (dx1 * dy3 - dx3 * dy1) / denominator;
  return (u: number, v: number) => {
    const scale = 1 + g * u + h * v;
    return [
      (a[0] + ((1 + g) * b[0] - a[0]) * u + ((1 + h) * d[0] - a[0]) * v) / scale,
      (a[1] + ((1 + g) * b[1] - a[1]) * u + ((1 + h) * d[1] - a[1]) * v) / scale,
    ];
  };
}

export function sampleDesign(): Design {
  const width = 192, height = 144;
  const pixels = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const edge = Math.min(y, height - 1 - y);
      const distance = Math.abs(x % 24 - 12) + Math.abs(y % 24 - 12);
      let index = 0;
      if (edge < 20) index = edge === 3 || edge === 17 || (edge > 6 && edge < 15 && (x + edge) % 8 < 4) ? 1 : 3;
      else if (distance < 8) index = distance < 4 ? 2 : 1;
      pixels[y * width + x] = index;
    }
  }
  return {
    schema: 'weavecore.indexed.v1', width, height, pixels,
    palette: [[24, 76, 65], [220, 181, 93], [252, 232, 178], [111, 40, 65]],
    names: ['Body ground', 'Zari', 'Meena', 'Border ground'],
    regions: [{ name: 'Upper border', x: 0, y: 0, width, height: 20 }, { name: 'Body', x: 0, y: 20, width, height: 104 }, { name: 'Lower border', x: 0, y: 124, width, height: 20 }],
    provenance: { source: 'GVB Tech sample' },
    report: { used_colors: 4, rgb_mae: null, exact_sampled_rgb: null, notes: ['Sample artwork for trying the editor.'] },
  };
}
