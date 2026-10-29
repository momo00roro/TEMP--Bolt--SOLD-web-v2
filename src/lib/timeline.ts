export type Range = [number, number];

export interface Timeline {
  length: number;
  steps: Range[];
  at: (step: number, t: number) => number;
}

interface TimelineOptions {
  gap?: number | number[];
  lead?: number;
  tail?: number;
}

// Durations are in viewport heights; steps come back as 0..1 progress ranges of the pinned scene.
export function timeline(durations: number[], { gap = 0.6, lead = 0.1, tail = 0.25 }: TimelineOptions = {}): Timeline {
  const gapAt = (i: number) => (typeof gap === 'number' ? gap : gap[i] ?? 0.6);
  let cursor = lead;
  const raw = durations.map((d, i) => {
    const r: Range = [cursor, cursor + d];
    cursor += d + (i < durations.length - 1 ? gapAt(i) : 0);
    return r;
  });
  const total = cursor + tail;
  const steps = raw.map(([a, b]) => [a / total, b / total] as Range);
  return {
    length: total + 1,
    steps,
    at: (step, t) => steps[step][0] + (steps[step][1] - steps[step][0]) * t,
  };
}

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
export const smooth = (v: number) => v * v * (3 - 2 * v);
export const remap = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
