/** Search for translational repeats in an already isolated, rectified fabric patch. */
export function detectRepeat(signal: Uint8Array, width: number, height: number) {
  function period(horizontal: boolean) {
    const axis = horizontal ? width : height;
    const cross = horizontal ? height : width;
    const stride = horizontal ? 1 : width;
    const crossStride = horizontal ? width : 1;
    const scores = new Float64Array(Math.floor(axis / 2) + 1);
    for (let lag = 1; lag < scores.length; lag++) {
      let a = 0, b = 0, aa = 0, bb = 0, ab = 0, count = 0;
      for (let row = 0; row < cross; row++) {
        for (let col = 0; col < axis - lag; col++) {
          const at = row * crossStride + col * stride;
          const first = signal[at], second = signal[at + lag * stride];
          a += first; b += second; aa += first * first; bb += second * second; ab += first * second; count++;
        }
      }
      const va = aa - a * a / count;
      const vb = bb - b * b / count;
      if (Math.min(va, vb) / count >= 9) scores[lag] = (ab - a * b / count) / Math.sqrt(va * vb);
    }
    const candidates: number[] = [];
    for (let lag = 4; lag < scores.length; lag++) {
      if (scores[lag] >= .88 && scores[lag] - scores[lag - 1] >= .015 &&
          (lag + 1 === scores.length || scores[lag] - scores[lag + 1] >= .015)) candidates.push(lag);
    }
    const best = Math.max(...candidates.map(lag => scores[lag]));
    return candidates.find(lag => scores[lag] >= best - .035) ?? null;
  }
  return { columns: period(true), rows: period(false) };
}
