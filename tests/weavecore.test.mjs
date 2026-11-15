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
