import { works } from '@/content';

export const FRAME_DEFAULTS = {
  tx: 0, ty: 1.2, tz: -3, azim: 0, elev: 8, dist: 12, fov: 40, roll: 0, pan: 0, panY: 0,
  light: 0, glow: 0.3, dust: 0.3,
  gx: 0, gy: -1.2, gz: -6, pitch: 0, yaw: 0, spin: 0, wave: 0.5, flow: 0, grid: 1,
  ringR: 4, ringY: 0, ringTilt: 20, ringDepth: 0.7, ringScale: 1, ringFace: 0, ringPace: 0.08, ringHideFront: 0,
  orbit: 0, drift: 0, settle: 0, board: 0, stream: 0, rise: 0, stack: 0, layerGap: 0, exhibit: 0, raised: 0,
};

export type Frame = typeof FRAME_DEFAULTS;
export type FrameKey = keyof Frame;
export const FRAME_KEYS = Object.keys(FRAME_DEFAULTS) as FrameKey[];

const make = (o: Partial<Frame>): Frame => ({ ...FRAME_DEFAULTS, ...o });

export const CELL = 2.4;
export const PANEL_W = 5.2;
export const PANEL_H = (PANEL_W * 9) / 16;
export const PANEL_SPOTS: [number, number][] = [[-4.8, 3.5], [4.8, -0.5], [-4.8, -4.5], [4.8, -8.5]];

const paper: Partial<Frame> = { light: 1, glow: -1, gy: -1.5, gz: -4, wave: 0.35, flow: 0.5, dust: 0.1 };
const night: Partial<Frame> = { light: 0, glow: 0.55, gy: -1.5, gz: -4, wave: 0.35, flow: 0.5, dust: 0.7 };
const gallery: Partial<Frame> = { ...paper, wave: 0, flow: 0, exhibit: 1 };

function exhibitFrame(i: number, mobile: boolean): Frame {
  const [x, z] = PANEL_SPOTS[i];
  return make({
    ...gallery,
    raised: i + 1,
    tx: x + (mobile ? 0 : 1.2),
    ty: (gallery.gy ?? 0) + PANEL_H / 2,
    tz: (gallery.gz ?? 0) + z,
    azim: x > 0 ? 12 : -8,
    elev: 7,
    dist: mobile ? 11.5 : 8.8,
    pan: mobile ? 0 : 0.27,
    panY: mobile ? 0.36 : 0,
  });
}

function buildFrames(mobile: boolean): Record<string, Frame> {
  const pick = (desk: Partial<Frame>, phone: Partial<Frame> = {}) => make(mobile ? { ...desk, ...phone } : desk);
  const frames: Record<string, Frame> = {
    welcome: pick(
      { tx: 2.2, ty: 1, tz: -3.5, azim: 18, elev: 7, dist: 12.5, pan: 0.3, panY: 0.16, glow: 0.8, gx: 1.5, gy: -2.2, gz: -8, pitch: 46, yaw: -18, wave: 0.75, flow: 2.2, orbit: 1, ringR: 5, ringY: 0.8, ringTilt: 8, ringDepth: 1, ringScale: 1.55, ringPace: 0.11, ringHideFront: 1 },
      { pan: 0, panY: 0.58, ringR: 6.2, ringScale: 2.1 },
    ),
    about: pick(
      { tx: 0, ty: 1.4, tz: 0, azim: 8, elev: 5, dist: 11.5, roll: -2, fov: 42, glow: -0.3, gy: 1.4, gz: -8, pitch: 90, spin: 16, wave: 1, flow: 2, grid: 0, dust: 1, orbit: 1, ringR: 5.8, ringTilt: 86, ringFace: 1, ringPace: 0.1 },
      { ringR: 7, dist: 13, ringScale: 1.35 },
    ),
    'about-manifesto': pick(
      { tx: 0, ty: 1.4, tz: 0, azim: -18, elev: 12, dist: 9.8, fov: 42, glow: -0.8, gy: 1.4, gz: -8, pitch: 90, spin: -14, wave: 1, flow: 2, grid: 0, dust: 1, orbit: 1, ringR: 5.2, ringTilt: 72, ringFace: 1 },
      { orbit: 0, rise: 1, dist: 16 },
    ),
    'about-body': make({ tx: 0, ty: -2, tz: -2.5, azim: 14, elev: 60, dist: 14.5, glow: -1.3, gy: -2, gz: -2.5, wave: 0.35, settle: 1 }),
    work: pick({ ...paper, tx: 0, ty: 0.8, tz: -3, azim: 6, elev: 16, dist: 15.5, orbit: 1, ringR: 7.4, ringTilt: 90, ringY: 1, ringFace: 1 }, { orbit: 0, settle: 1, dist: 18 }),
    'work-fold': pick({ ...gallery, settle: 1, raised: works.length + 2, tx: 0, ty: -1.4, tz: -7.5, azim: 12, elev: 36, dist: 21 }, { dist: 27 }),
    process: make({ ...night, tx: 0, ty: -0.6, tz: -3.5, azim: -18, elev: 28, dist: 14, settle: 1, panY: mobile ? -0.3 : 0 }),
    'process-1': pick({ ...night, tx: 1.6, ty: 1.3, tz: -8, azim: 12, elev: 6, dist: 10.5, fov: 42, pan: 0.3, gy: -1.4, gz: -8, wave: 0.8, flow: 4, drift: 1 }, { pan: 0, panY: 0.5 }),
    'process-2': pick({ ...night, tx: 1.6, ty: 2, tz: -7, azim: 10, elev: 6, dist: 12.5, pan: 0.32, gx: 1.6, gy: 1.4, gz: -7, pitch: 90, yaw: -18, wave: 0.3, board: 1 }, { pan: 0, panY: 0.55, dist: 14 }),
    'process-3': pick({ tx: 0, ty: 1, tz: -28, azim: 5, elev: 2, dist: 28, fov: 44, pan: 0.22, glow: 0.3, gy: -2, gz: -10, wave: 0.4, grid: 0, dust: 1, stream: 1 }, { pan: 0, panY: 0.45 }),
    'process-4': make({ tx: 0, ty: 2.4, tz: -10, azim: 8, elev: 12, dist: 15, fov: 42, glow: -0.2, gy: -2, gz: -10, wave: 0.6, flow: 3, dust: 0.5, rise: 1 }),
    studio: pick({ tx: 0, ty: 1.2, tz: -5, azim: 28, elev: 30, dist: 15, glow: 0.2, gy: -1.6, gz: -5, spin: 40, wave: 0.25, stack: 1, layerGap: 1 }, { panY: -0.8 }),
    'studio-body': pick({ tx: 0, ty: 0.4, tz: -5, azim: 62, elev: 38, dist: 13, glow: 0.2, gy: -1.6, gz: -5, spin: 40, wave: 0.25, stack: 1, layerGap: 1, pan: -0.3 }, { pan: 0, panY: 0.4 }),
    contact: pick(
      { tx: 2.4, ty: 1.6, tz: -4, azim: -8, elev: 4, dist: 12, fov: 44, pan: 0.38, glow: 0.5, gx: 3, gy: 0.4, gz: -12, pitch: 80, yaw: 12, spin: -10, wave: 1, flow: 2, dust: 0.6, orbit: 1, ringR: 3.8, ringTilt: 28, ringDepth: 1, ringScale: 0.72 },
      { pan: 0, panY: -0.4, ringR: 5.6, ringTilt: 8, ringScale: 1.9, ringHideFront: 1, glow: -0.4 },
    ),
  };
  works.forEach((_, i) => {
    frames[`work-${i + 1}`] = exhibitFrame(i, mobile);
  });
  return frames;
}

const ease = (t: number) => t * t * (3 - 2 * t);

interface Stop {
  top: number;
  frame: Frame;
}

// Keyframes are DOM markers ([data-kf]); the camera arrives at each marker's frame as its top reaches the viewport top.
export function createTimeline() {
  const sets = { desktop: buildFrames(false), mobile: buildFrames(true) };
  let stops: Stop[] = [];
  let docHeight = -1;
  let forMobile = false;
  let checkedAt = 0;

  function measure(mobile: boolean) {
    const frames = mobile ? sets.mobile : sets.desktop;
    docHeight = document.documentElement.scrollHeight;
    forMobile = mobile;
    stops = Array.from(document.querySelectorAll<HTMLElement>('[data-kf]'))
      .map((el) => ({ key: el.dataset.kf ?? '', top: el.getBoundingClientRect().top + window.scrollY }))
      .filter((s) => frames[s.key])
      .sort((a, b) => a.top - b.top)
      .map((s) => ({ top: s.top, frame: frames[s.key] }));
  }

  function sample(scrollY: number, viewport: number, mobile: boolean, out: Frame) {
    const now = performance.now();
    if (mobile !== forMobile || stops.length === 0 || (now - checkedAt > 500 && document.documentElement.scrollHeight !== docHeight)) {
      checkedAt = now;
      measure(mobile);
    }
    if (stops.length === 0) return Object.assign(out, FRAME_DEFAULTS);
    const first = stops[0];
    const last = stops[stops.length - 1];
    if (scrollY <= first.top) return Object.assign(out, first.frame);
    if (scrollY >= last.top) return Object.assign(out, last.frame);
    let i = 0;
    while (i < stops.length - 2 && stops[i + 1].top <= scrollY) i++;
    const a = stops[i];
    const b = stops[i + 1];
    const span = Math.min(b.top - a.top, 1.8 * viewport);
    const t = ease(Math.min(1, Math.max(0, (scrollY - (b.top - span)) / Math.max(1, span))));
    for (const k of FRAME_KEYS) out[k] = a.frame[k] + (b.frame[k] - a.frame[k]) * t;
    return out;
  }

  return { measure: () => measure(forMobile), sample };
}
