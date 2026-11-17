import { useState } from 'react';
import { clone, crop, fromJSON, type Design, type Region } from './model';
import { assemblePanels, MAX_ASSEMBLY_PANELS, type AssemblyAxis, type AssemblyPanel } from './panel-assembly';

type Props = {
  design: Design | null;
  selection: Region | null;
  onAssemble: (design: Design) => void;
};

export function PanelAssembly({ design, selection, onAssemble }: Props) {
  const [panels, setPanels] = useState<AssemblyPanel[]>([]);
  const [axis, setAxis] = useState<AssemblyAxis>('vertical');
  const [error, setError] = useState('');
  const [reading, setReading] = useState(false);
  const cells = panels.reduce((total, panel) => total + panel.design.pixels.length, 0);
  function add(added: AssemblyPanel[]) {
    if (panels.length + added.length > MAX_ASSEMBLY_PANELS) throw Error('The assembly holds up to 24 panels.');
    if (cells + added.reduce((total, panel) => total + panel.design.pixels.length, 0) > 4_000_000) {
      throw Error('The imported panels exceed four million cells.');
    }
    setPanels([...panels, ...added]);
    setError('');
  }
  async function open(files: File[]) {
    setReading(true);
    try {
      if (files.length + panels.length > MAX_ASSEMBLY_PANELS || files.reduce((bytes, file) => bytes + file.size, 0) > 32 * 1024 * 1024) {
        throw Error('Choose up to 24 project files totaling no more than 32 MB per import.');
      }
      const imported: AssemblyPanel[] = [];
      let importedCells = cells;
      for (const file of files) {
        const project = fromJSON(JSON.parse(await file.text()));
        importedCells += project.pixels.length;
        if (importedCells > 4_000_000) throw Error('The imported panels exceed four million cells.');
        imported.push({ name: file.name.replace(/\.json$/i, '').slice(0, 80) || 'Panel', design: project });
      }
      add(imported);
    } catch (cause) {
      setError((cause as Error).message);
    } finally {
      setReading(false);
    }
  }
  function move(index: number, step: -1 | 1) {
    const next = [...panels];
    [next[index], next[index + step]] = [next[index + step], next[index]];
    setPanels(next);
  }
  return <section>
    <h2>Assemble saree panels</h2>
    <p className="muted">Add the body, borders, or pallu in order. Stacked panels need the same width. Side-by-side panels need the same height.</p>
    <button type="button" disabled={!design || reading} onClick={() => {
      if (!design) return;
      try {
        const captured = selection ? crop(design, selection) : clone(design);
        add([{ name: selection?.name || `Panel ${panels.length + 1}`, design: captured }]);
      } catch (cause) {
        setError((cause as Error).message);
      }
    }}>Add {selection ? 'selected panel' : 'current design'}</button>
    <label>Import panel projects
      <input type="file" multiple accept=".json,application/json" disabled={reading} onChange={event => {
        const files = Array.from(event.currentTarget.files ?? []);
        event.currentTarget.value = '';
        if (files.length) void open(files);
      }} />
    </label>
    {panels.length > 0 && <ol className="assembly-list">
      {panels.map((panel, i) => <li key={i}>
        <label>Panel {i + 1} name
          <input maxLength={80} value={panel.name} disabled={reading}
            onChange={event => setPanels(panels.map((item, index) => index === i ? { ...item, name: event.target.value } : item))} />
        </label>
        <span>{panel.design.width} × {panel.design.height}</span>
        <div className="button-row">
          <button type="button" aria-label={`Move panel ${i + 1} earlier`} disabled={i === 0 || reading} onClick={() => move(i, -1)}>↑</button>
          <button type="button" aria-label={`Move panel ${i + 1} later`} disabled={i === panels.length - 1 || reading} onClick={() => move(i, 1)}>↓</button>
          <button type="button" disabled={reading} aria-label={`Remove panel ${i + 1}`} onClick={() => setPanels(panels.filter((_, index) => index !== i))}>Remove</button>
        </div>
      </li>)}
    </ol>}
    <label>Join direction
      <select value={axis} onChange={event => setAxis(event.target.value === 'horizontal' ? 'horizontal' : 'vertical')}>
        <option value="vertical">Stack vertically</option>
        <option value="horizontal">Join side by side</option>
      </select>
    </label>
    <button type="button" className="primary" disabled={panels.length < 2 || reading} onClick={() => {
      try {
        const assembled = assemblePanels(panels.map((panel, i) => ({ ...panel, name: panel.name.trim() || `Panel ${i + 1}` })), axis);
        onAssemble(assembled);
        setError('');
      } catch (cause) {
        setError((cause as Error).message);
      }
    }}>Build assembled saree</button>
    {error && <p role="alert">{error}</p>}
  </section>;
}
