import { detectRepeat } from './repeat-detection';
import { readIndexedBmp } from './indexed-bmp';
import { sizeOK, type Design, type RGB } from './model';

type Options = { width: number; height: number; colors: number; mode: string; corners: number[][]; photo?: "repeat" | "motif" };

export async function extractLocally(file: File, { width, height, colors, mode, corners, photo }: Options): Promise<Design> {
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
    let right = 1, bottom = 1;
    const notes: string[] = [];
    if (photo === 'repeat') {
      const gridWidth = Math.min(256, width);
      const gridHeight = Math.min(256, height);
      const light = sampleGrid(gridWidth, gridHeight, image.width, image.height, corners, (x, y) => {
        const offset = (y * image.width + x) * 4;
        return Math.round(.299 * source[offset] + .587 * source[offset + 1] + .114 * source[offset + 2]);
      });
      const repeat = detectRepeat(light, gridWidth, gridHeight);
      if (!repeat.columns && !repeat.rows) {
        throw Error('No reliable repeat found. Select a flatter patch with at least two copies, or switch to Extract one motif.');
      }
      right = repeat.columns ? repeat.columns / (gridWidth - 1) : 1;
      bottom = repeat.rows ? repeat.rows / (gridHeight - 1) : 1;
      width = Math.max(1, Math.round(width * right));
      height = Math.max(1, Math.round(height * bottom));
      notes.push(`Repeat found on ${repeat.columns && repeat.rows ? 'both axes' : repeat.columns ? 'the horizontal axis' : 'the vertical axis'}. Inspect the extracted unit before tiling.`);
    } else if (photo) {
      notes.push('Extracted the visible fabric patch marked in the photo.');
    }
    const map = new Map<number, number>();
    const palette: RGB[] = [];
    const levels = Math.max(2, Math.min(6, Math.floor(Math.cbrt(colors))));
    const reduce = (value: number) => Math.round(Math.round(value * (levels - 1) / 255) * 255 / (levels - 1));
    let changed = 0;
    const pixels = sampleGrid(width, height, image.width, image.height, corners, (ix, iy) => {
        const offset = (iy * image.width + ix) * 4;
        if (source[offset + 3] !== 255) throw Error('Flatten transparent pixels onto a background before opening the image.');
        const rgb: RGB = [source[offset], source[offset + 1], source[offset + 2]];
        const color = mode === 'reduce' ? rgb.map(reduce) as RGB : rgb;
        changed += color.reduce((difference, channel, index) => difference + Math.abs(channel - rgb[index]), 0);
        const key = color[0] * 65536 + color[1] * 256 + color[2];
        let index = map.get(key);
        if (index === undefined) {
          if (palette.length === 256) throw Error('This image has more than 256 sampled colors. Choose Reduce colors, or use a flat-color artwork image.');
          index = palette.length;
          map.set(key, index);
          palette.push(color);
        }
        return index;
    }, right, bottom);
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

function sampleGrid(width: number, height: number, sourceWidth: number, sourceHeight: number, corners: number[][], sample: (x: number, y: number) => number, right = 1, bottom = 1) {
  const pixels = new Uint8Array(width * height);
  const transform = corners.length ? perspective(corners) : null;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const [sx, sy] = transform
        ? transform(right < 1 ? x / width * right : width === 1 ? .5 : x / (width - 1), bottom < 1 ? y / height * bottom : height === 1 ? .5 : y / (height - 1))
        : [(x + .5) * sourceWidth / width - .5, (y + .5) * sourceHeight / height - .5];
      const ix = Math.max(0, Math.min(sourceWidth - 1, Math.round(sx)));
      const iy = Math.max(0, Math.min(sourceHeight - 1, Math.round(sy)));
      pixels[y * width + x] = sample(ix, iy);
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
