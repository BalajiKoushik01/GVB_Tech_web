import type { RGB } from './model';

export function readIndexedBmp(buffer: ArrayBuffer) {
  if (buffer.byteLength < 54) return null;
  const view = new DataView(buffer);
  if (view.getUint16(0, true) !== 0x4d42 || view.getUint32(14, true) !== 40 ||
      view.getUint16(26, true) !== 1 || view.getUint16(28, true) !== 8 || view.getUint32(30, true) !== 0) return null;
  const width = view.getInt32(18, true);
  const signedHeight = view.getInt32(22, true);
  const height = Math.abs(signedHeight);
  const stride = Math.ceil(width / 4) * 4;
  const offset = view.getUint32(10, true);
  const count = view.getUint32(46, true) || 256;
  if (width <= 0 || height === 0 || width * height > 24_000_000 || count > 256 ||
      offset < 54 + count * 4 || offset + stride * height > buffer.byteLength) {
    throw Error('The indexed BMP has an invalid header or exceeds the trial limits.');
  }
  const bytes = new Uint8Array(buffer);
  const palette: RGB[] = Array.from({ length: count }, (_, index) => {
    const pos = 54 + index * 4;
    return [bytes[pos + 2], bytes[pos + 1], bytes[pos]];
  });
  return {
    width, height, palette,
    indexAt(x: number, y: number) {
      const row = signedHeight < 0 ? y : height - 1 - y;
      const index = bytes[offset + row * stride + x];
      if (index >= palette.length) throw Error('An indexed BMP pixel refers to a missing palette slot.');
      return index;
    },
  };
}
