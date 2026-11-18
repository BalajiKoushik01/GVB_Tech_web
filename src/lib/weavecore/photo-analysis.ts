import { z } from 'zod';

const point = z.tuple([z.number().int().min(0).max(1000), z.number().int().min(0).max(1000)]);
const outline = z.array(point).min(3).max(48);
const quad = z.tuple([point, point, point, point]);
export const analysisSchema = z.object({
  saree: z.array(outline).max(8),
  panels: z.array(z.object({
    kind: z.enum(['body', 'border', 'pallu']),
    outline,
    crop: quad.nullable(),
  }).strict()).max(6),
  zari: z.array(outline).max(8),
}).strict();

export type PhotoAnalysis = z.infer<typeof analysisSchema>;
export type PhotoPanel = PhotoAnalysis['panels'][number];

export function isInsideOutline([x, y]: [number, number], polygon: number[][]) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [a, b] = polygon[i];
    const [c, d] = polygon[j];
    const edge = (x - a) * (d - b) - (y - b) * (c - a);
    if (edge === 0 && x >= Math.min(a, c) && x <= Math.max(a, c) && y >= Math.min(b, d) && y <= Math.max(b, d)) return true;
    if ((b > y) !== (d > y) && x < (c - a) * (y - b) / (d - b) + a) inside = !inside;
  }
  return inside;
}

export function cropInsidePanel(panel: PhotoPanel, saree: PhotoAnalysis['saree']) {
  if (!panel.crop) return false;
  const q = panel.crop;
  for (let i = 0; i < 4; i++) {
    const [a, b, c] = [q[i], q[(i + 1) % 4], q[(i + 2) % 4]];
    if ((b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]) <= 0) return false;
  }
  // Check the interior as well as corners. A garment mask can be concave.
  for (let row = 0; row <= 8; row++) {
    for (let col = 0; col <= 8; col++) {
      const u = col / 8, v = row / 8;
      const coordinate = (axis: number) => (1 - v) * ((1 - u) * q[0][axis] + u * q[1][axis]) +
        v * ((1 - u) * q[3][axis] + u * q[2][axis]);
      const p: [number, number] = [coordinate(0), coordinate(1)];
      if (!isInsideOutline(p, panel.outline) || !saree.some(mask => isInsideOutline(p, mask))) return false;
    }
  }
  return true;
}
