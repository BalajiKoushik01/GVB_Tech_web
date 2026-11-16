import type { RGB } from './model';

type Swatch = { color: RGB; count: number; key: number };

export function adaptivePalette(input: Uint8Array, budget: number) {
  if (!Number.isInteger(budget) || budget < 2 || budget > 256) throw Error('Choose between 2 and 256 output colors.');
  const keyAt = (offset: number) => ((input[offset] >> 3) << 10) | ((input[offset + 1] >> 3) << 5) | (input[offset + 2] >> 3);
  const counts = new Uint32Array(32768);
  const sums = new Uint32Array(32768 * 3);
  const exact = new Map<number, number>();
  for (let i = 0; i < input.length; i += 3) {
    const rgb = input[i] * 65536 + input[i + 1] * 256 + input[i + 2];
    if (exact.size <= budget && !exact.has(rgb)) exact.set(rgb, exact.size);
    const key = keyAt(i);
    counts[key]++;
    for (let ch = 0; ch < 3; ch++) sums[key * 3 + ch] += input[i + ch];
  }
  if (exact.size <= budget) {
    const palette: RGB[] = Array.from(exact.keys(), n => [n >> 16, n >> 8 & 255, n & 255]);
    const pixels = Uint8Array.from({ length: input.length / 3 }, (_, index) => {
      const i = index * 3;
      return exact.get(input[i] * 65536 + input[i + 1] * 256 + input[i + 2])!;
    });
    return { palette, pixels, error: 0 };
  }
  const swatches: Swatch[] = [];
  for (let key = 0; key < counts.length; key++) {
    const count = counts[key];
    if (count) swatches.push({ key, count, color: [sums[key * 3] / count, sums[key * 3 + 1] / count, sums[key * 3 + 2] / count] });
  }
  function describe(entries: Swatch[]) {
    const low = [255, 255, 255], high = [0, 0, 0];
    let weight = 0;
    for (const { color, count } of entries) {
      weight += count;
      for (let channel = 0; channel < 3; channel++) {
        low[channel] = Math.min(low[channel], color[channel]);
        high[channel] = Math.max(high[channel], color[channel]);
      }
    }
    const ranges = high.map((value, channel) => value - low[channel]);
    const axis = ranges.indexOf(Math.max(...ranges));
    return { entries, weight, axis, score: entries.length > 1 ? ranges[axis] * Math.sqrt(weight) : -1 };
  }
  const boxes = [describe(swatches)];
  while (boxes.length < budget) {
    let largest = 0;
    for (let i = 1; i < boxes.length; i++) if (boxes[i].score > boxes[largest].score) largest = i;
    const { entries, weight, axis, score } = boxes[largest];
    if (score < 0) break;
    entries.sort((a, b) => a.color[axis] - b.color[axis]);
    let split = 1, left = entries[0].count;
    while (split < entries.length - 1 && left < weight / 2) left += entries[split++].count;
    boxes.splice(largest, 1, describe(entries.slice(0, split)), describe(entries.slice(split)));
  }
  const lookup = new Uint8Array(counts.length);
  const palette: RGB[] = boxes.map(({ entries, weight }, index) => {
    const mean: RGB = [0, 0, 0];
    for (const { key, count, color } of entries) {
      lookup[key] = index;
      for (let ch = 0; ch < 3; ch++) mean[ch] += color[ch] * count;
    }
    return mean.map(value => Math.round(value / weight)) as RGB;
  });
  let error = 0;
  const pixels = new Uint8Array(input.length / 3);
  for (let i = 0; i < input.length; i += 3) {
    const index = lookup[keyAt(i)];
    pixels[i / 3] = index;
    for (let ch = 0; ch < 3; ch++) error += Math.abs(palette[index][ch] - input[i + ch]);
  }
  return { palette, pixels, error };
}
