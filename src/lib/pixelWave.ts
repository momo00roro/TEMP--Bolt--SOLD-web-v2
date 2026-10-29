const BLOCK = 14;
const SPREAD = 0.55;
const FADE = 0.32;
const INK = [5, 8, 18];
const FLASH = [61, 139, 255];

interface Wave {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  cols: number;
  rows: number;
  delays: Float32Array;
}

function createWave(origin: { x: number; y: number }): Wave | null {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  canvas.className = 'pixel-wave';
  canvas.setAttribute('aria-hidden', 'true');
  ctx.scale(dpr, dpr);
  const block = (e: Event) => e.preventDefault();
  canvas.addEventListener('wheel', block, { passive: false });
  canvas.addEventListener('touchmove', block, { passive: false });
  document.body.appendChild(canvas);

  const cols = Math.ceil(w / BLOCK);
  const rows = Math.ceil(h / BLOCK);
  const ox = origin.x / BLOCK;
  const oy = origin.y / BLOCK;
  const far = Math.hypot(Math.max(ox, cols - ox), Math.max(oy, rows - oy));
  const delays = new Float32Array(cols * rows);
  for (let i = 0; i < delays.length; i++) {
    const d = Math.hypot((i % cols) + 0.5 - ox, Math.floor(i / cols) + 0.5 - oy) / far;
    delays[i] = Math.min(1, d * 0.88 + Math.random() * 0.12);
  }
  return { canvas, ctx, cols, rows, delays };
}

function draw(wave: Wave, time: number, covering: boolean) {
  const { ctx, cols, delays } = wave;
  ctx.clearRect(0, 0, wave.canvas.width, wave.canvas.height);
  let busy = false;
  for (let i = 0; i < delays.length; i++) {
    const start = (covering ? delays[i] : 1 - delays[i]) * SPREAD;
    const t = Math.min(1, Math.max(0, (time - start) / FADE));
    if (t < 1) busy = true;
    const eased = 1 - (1 - t) ** 3;
    const fill = covering ? eased : 1 - eased;
    if (fill <= 0.01) continue;
    const flash = t > 0 && t < 1 ? Math.max(0, 1 - Math.abs(t - 0.35) / 0.35) * 0.6 : 0;
    const r = INK[0] + (FLASH[0] - INK[0]) * flash;
    const g = INK[1] + (FLASH[1] - INK[1]) * flash;
    const b = INK[2] + (FLASH[2] - INK[2]) * flash;
    const size = BLOCK * (0.3 + 0.7 * fill);
    const x = (i % cols) * BLOCK + (BLOCK - size) / 2;
    const y = Math.floor(i / cols) * BLOCK + (BLOCK - size) / 2;
    ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${Math.min(1, fill * 1.2).toFixed(3)})`;
    ctx.fillRect(x, y, size + 0.5, size + 0.5);
  }
  return busy;
}

function play(wave: Wave, covering: boolean) {
  return new Promise<void>((resolve) => {
    const begin = performance.now();
    const frame = (now: number) => {
      if (draw(wave, (now - begin) / 1000, covering)) requestAnimationFrame(frame);
      else resolve();
    };
    requestAnimationFrame(frame);
  });
}

let running = false;

export async function pixelJump(origin: { x: number; y: number }, jump: () => void) {
  if (running) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    jump();
    return;
  }
  const wave = createWave(origin);
  if (!wave) {
    jump();
    return;
  }
  running = true;
  try {
    await play(wave, true);
    jump();
    await new Promise((r) => setTimeout(r, 120));
    await play(wave, false);
  } finally {
    wave.canvas.remove();
    running = false;
  }
}
