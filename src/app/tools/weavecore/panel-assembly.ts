import { sizeOK, type Design, type RGB } from './model';

export type AssemblyPanel = { name: string; design: Design };
export type AssemblyAxis = 'vertical' | 'horizontal';
export const MAX_ASSEMBLY_PANELS = 24;

export function assemblePanels(panels: readonly AssemblyPanel[], axis: AssemblyAxis): Design {
  if (panels.length < 2 || panels.length > MAX_ASSEMBLY_PANELS) throw Error('Add between 2 and 24 panels.');
  const vertical = axis === 'vertical';
  const first = panels[0].design;
  const crossSize = vertical ? first.width : first.height;
  let length = 0;
  for (const { name, design } of panels) {
    if ((vertical ? design.width : design.height) !== crossSize) {
      throw Error(`${name} needs ${crossSize} ${vertical ? 'columns' : 'rows'} to join this assembly. Tile or crop that panel first.`);
    }
    length += vertical ? design.height : design.width;
  }
  const width = vertical ? crossSize : length;
  const height = vertical ? length : crossSize;
  if (!sizeOK(width, height)) throw Error('The assembled design exceeds the editor dimensions or four million cells.');

  const palette: RGB[] = [];
  const names: string[] = [];
  const mappings = new Map<string, Map<number, number>>();
  const pixels = new Uint8Array(width * height);
  const regions: Design['regions'] = [];
  let offset = 0;
  for (const { name, design } of panels) {
    const signature = JSON.stringify([design.palette, design.names]);
    const remap = mappings.get(signature) ?? new Map<number, number>();
    mappings.set(signature, remap);
    for (const index of new Set(design.pixels)) {
      if (remap.has(index)) continue;
      if (palette.length >= 256) throw Error('The assembly needs more than 256 palette slots. Use a common palette across the panels.');
      remap.set(index, palette.length);
      palette.push([...design.palette[index]]);
      names.push(design.names[index]);
    }
    const x = vertical ? 0 : offset;
    const y = vertical ? offset : 0;
    for (let row = 0; row < design.height; row++) {
      const destination = (y + row) * width + x;
      for (let col = 0; col < design.width; col++) {
        pixels[destination + col] = remap.get(design.pixels[row * design.width + col])!;
      }
    }
    regions.push({ name, x, y, width: design.width, height: design.height });
    offset += vertical ? design.height : design.width;
  }
  return {
    schema: 'weavecore.indexed.v1', width, height, pixels, palette, names, regions,
    provenance: { source: 'panel assembly', axis },
    report: {
      used_colors: palette.length, rgb_mae: null, exact_sampled_rgb: null,
      notes: ['Panel geometry and colors are retained. Review the assembled palette indices against your factory weave assignments.'],
    },
  };
}
