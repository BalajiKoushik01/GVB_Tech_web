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
