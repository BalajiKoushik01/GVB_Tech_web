import { analysisSchema, cropInsidePanel, type PhotoAnalysis, type PhotoPanel } from '@/lib/weavecore/photo-analysis';
import { extractLocally } from './local-extraction';
import type { Design } from './model';

export type PanelDraft = { kind: PhotoPanel['kind']; design?: Design; repeat?: boolean; error?: string };

export async function analyzePhoto(file: File, paletteBudget: number): Promise<{ analysis: PhotoAnalysis; drafts: PanelDraft[] }> {
  const bitmap = await createImageBitmap(file);
  let jpeg: string;
  const { width, height } = bitmap;
  try {
    if (width * height > 24_000_000) throw Error('Use a photo with up to 24 million pixels.');
    const scale = Math.min(1, 1280 / Math.max(width, height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));
    const ctx = canvas.getContext('2d');
    if (!ctx) throw Error('Image editing is unavailable in this browser.');
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    jpeg = canvas.toDataURL('image/jpeg', .82).split(',')[1] ?? '';
  } finally {
    bitmap.close();
  }
  const response = await fetch('/api/weavecore/analyze', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: jpeg }),
  });
  const data = await response.json();
  if (!response.ok) throw Error(typeof data.error === 'string' ? data.error : 'Photo analysis failed.');
  const analysis = analysisSchema.parse(data);
  const drafts: PanelDraft[] = [];
  for (const panel of analysis.panels) {
    if (!panel.crop || !cropInsidePanel(panel, analysis.saree)) {
      drafts.push({ kind: panel.kind, error: 'No usable patch was identified. Mark a patch manually.' });
      continue;
    }
    const corners = panel.crop.map(([x, y]) => [Math.round(x / 1000 * (width - 1)), Math.round(y / 1000 * (height - 1))]);
    const distance = (a: number[], b: number[]) => Math.hypot(a[0] - b[0], a[1] - b[1]);
    const options = {
      width: Math.max(2, Math.min(512, Math.round((distance(corners[0], corners[1]) + distance(corners[3], corners[2])) / 2))),
      height: Math.max(2, Math.min(512, Math.round((distance(corners[0], corners[3]) + distance(corners[1], corners[2])) / 2))),
      mode: 'reduce', corners, colors: paletteBudget,
    };
    try {
      drafts.push({ kind: panel.kind, design: await extractLocally(file, { ...options, photo: 'repeat' }), repeat: true });
    } catch {
      try {
        drafts.push({ kind: panel.kind, design: await extractLocally(file, { ...options, photo: 'motif' }), repeat: false });
      } catch {
        drafts.push({ kind: panel.kind, error: 'This patch could not be extracted. Select it manually.' });
      }
    }
  }
  return { analysis, drafts };
}
