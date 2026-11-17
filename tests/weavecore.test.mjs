import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bmp } from '../src/app/tools/weavecore/model.ts';
import { readIndexedBmp } from '../src/app/tools/weavecore/indexed-bmp.ts';

test('trial preserves duplicate RGB slots and odd-width row ordering', () => {
  const palette = [[0, 0, 0], [210, 160, 30], [210, 160, 30]];
  const pixels = Uint8Array.from([0, 1, 2, 2, 1, 0]);
  const encoded = bmp({ width: 3, height: 2, palette, pixels });
  const imported = readIndexedBmp(encoded.buffer);
  assert.deepEqual(imported.palette.slice(0, 3), palette);
  assert.deepEqual(Array.from(pixels, (_, i) => imported.indexAt(i % 3, Math.floor(i / 3))), [...pixels]);
  assert.throws(() => readIndexedBmp(encoded.buffer.slice(0, -1)));
});

test('repeat detection recovers a two-axis fabric period and rejects flat ground', async () => {
  const { detectRepeat } = await import('../src/app/tools/weavecore/repeat-detection.ts');
  const width = 40, height = 30;
  const signal = Uint8Array.from({ length: width * height }, (_, i) => {
    const x = i % width % 10;
    const y = Math.floor(i / width) % 6;
    return x >= 2 && x <= 5 && y >= 1 && y <= 2 ? 210 : 25;
  });
  assert.deepEqual(detectRepeat(signal, width, height), { columns: 10, rows: 6 });
  assert.deepEqual(detectRepeat(new Uint8Array(width * height).fill(100), width, height), { columns: null, rows: null });
});

test('adaptive palette keeps dark motif distinct from dark ground at eight colors', async () => {
  const { adaptivePalette } = await import('../src/app/tools/weavecore/photo-palette.ts');
  const colors = Uint8Array.from({ length: 3072 }, (_, offset) => {
    const cell = Math.floor(offset / 3);
    return (cell % 23 === 0 ? 107 : 25) + cell % 11 + offset % 3;
  });
  const result = adaptivePalette(colors, 8);
  assert.ok(result.palette.length <= 8);
  assert.ok(result.palette[result.pixels[0]][0] > 100);
  assert.ok(result.palette[result.pixels[1]][0] < 40);
  assert.notEqual(result.pixels[0], result.pixels[1]);
});

test('palette reduction keeps exact tones when they fit the selected budget', async () => {
  const { adaptivePalette } = await import('../src/app/tools/weavecore/photo-palette.ts');
  const result = adaptivePalette(Uint8Array.of(20, 12, 25, 23, 13, 27, 20, 12, 25), 2);
  assert.deepEqual(result.palette, [[20, 12, 25], [23, 13, 27]]);
  assert.deepEqual([...result.pixels], [0, 1, 0]);
  assert.equal(result.error, 0);
});

test('masked repeat recovery keeps observations, fills consensus and flags disagreement', async () => {
  const { reconstructRepeat, CellSource } = await import('../src/lib/weavecore/reconstruct-repeat.ts');
  const copy = (indices, observed) => ({ indices: Uint8Array.from(indices), observed: Uint8Array.from(observed) });
  const ref = copy([0, 8, 8, 8, 8], [1, 0, 0, 0, 0]);
  const result = reconstructRepeat(ref, [
    copy([9, 0, 1, 1, 2], [1, 1, 1, 1, 0]),
    copy([9, 0, 2, 2, 2], [1, 1, 1, 1, 1]),
    copy([9, 0, 2, 3, 2], [1, 1, 1, 1, 0]),
  ]);
  const { Observed, MatchingRepeats, Unresolved } = CellSource;
  assert.deepEqual([...result.indices], [0, 0, 0, 0, 0]);
  assert.deepEqual([...result.source], [Observed, MatchingRepeats, Unresolved, Unresolved, Unresolved]);
  assert.deepEqual([...result.support], [1, 3, 0, 0, 0]);
  assert.deepEqual([...ref.indices], [0, 8, 8, 8, 8]);
});

test('repeat detection ignores masked obstruction colors', async () => {
  const { detectRepeat } = await import('../src/app/tools/weavecore/repeat-detection.ts');
  const width = 48, height = 24;
  const observed = Uint8Array.from({ length: width * height }, (_, i) => i % width < 7 && i < width * 6 ? 0 : 1);
  const signal = Uint8Array.from(observed, (valid, i) => valid
    ? (i % width % 8 < 3 && Math.floor(i / width) % 8 < 3 ? 210 : 35)
    : 12 + i % 111);
  assert.deepEqual(detectRepeat(signal, width, height, observed), { columns: 8, rows: 8 });
});

test('tiling to exact dimensions keeps indexed dots and crops the final copies', async () => {
  const { tileToSize } = await import('../src/app/tools/weavecore/model.ts');
  const input = { width: 2, height: 2, pixels: Uint8Array.of(0, 1, 2, 3),
    palette: [[0, 0, 0], [10, 10, 10], [20, 20, 20], [30, 30, 30]],
    names: ['A', 'B', 'C', 'D'], regions: [] };
  const panel = tileToSize(input, 5, 3);
  assert.deepEqual([panel.width, panel.height], [5, 3]);
  assert.deepEqual([...panel.pixels], [0, 1, 0, 1, 0, 2, 3, 2, 3, 2, 0, 1, 0, 1, 0]);
  assert.deepEqual(panel.palette, input.palette);
  assert.throws(() => tileToSize(input, 5000, 5000));
});
