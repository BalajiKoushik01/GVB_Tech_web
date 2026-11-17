export type RepeatEvidence = {
  indices: Uint8Array;
  observed: Uint8Array;
};

export const CellSource = {
  Unresolved: 0,
  Observed: 1,
  MatchingRepeats: 2,
} as const;

/** All copies must already be aligned and share one indexed palette and textile region. */
export function reconstructRepeat(reference: RepeatEvidence, neighbors: readonly RepeatEvidence[]) {
  const size = reference.indices.length;
  const copies = [reference, ...neighbors];
  if (copies.length > 9 || size > 4_000_000 ||
      copies.some(copy => copy.indices.length !== size || copy.observed.length !== size)) {
    throw Error('Use up to nine aligned copies with the same dimensions.');
  }
  const indices = new Uint8Array(size);
  const source = new Uint8Array(size);
  const support = new Uint8Array(size);
  const counts = new Uint8Array(256);
  const touched = new Uint8Array(neighbors.length);
  for (let cell = 0; cell < size; cell++) {
    if (reference.observed[cell]) {
      indices[cell] = reference.indices[cell];
      source[cell] = CellSource.Observed;
      support[cell] = 1;
      continue;
    }
    let votes = 0, distinct = 0, best = 0, bestIndex = 0;
    for (const copy of neighbors) {
      if (!copy.observed[cell]) continue;
      const index = copy.indices[cell];
      if (!counts[index]) touched[distinct++] = index;
      votes++;
      counts[index]++;
      if (counts[index] > best) {
        best = counts[index];
        bestIndex = index;
      }
    }
    if (best >= 2 && best * 4 >= votes * 3) {
      indices[cell] = bestIndex;
      source[cell] = CellSource.MatchingRepeats;
      support[cell] = best;
    }
    for (let i = 0; i < distinct; i++) counts[touched[i]] = 0;
  }
  return { indices, source, support };
}
