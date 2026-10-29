import { useEffect, useRef, useState } from 'react';
import { useSceneProgress } from '@/components/scene/Scene';
import { remap, type Range } from '@/lib/timeline';

const W = 1000;
const H = 220;

export function Route({ nodes, range }: { nodes: { label: string; meta: string }[]; range: Range }) {
  const ref = useRef<HTMLDivElement>(null);
  const points = nodes.map((_, i) => ({ x: 90 + (i * (W - 180)) / Math.max(1, nodes.length - 1), y: i % 2 === 0 ? 160 : 60 }));
  const d = points.reduce((acc, p, i) => {
    if (i === 0) return `M${p.x} ${p.y}`;
    const prev = points[i - 1];
    const mid = (p.x - prev.x) / 2;
    return `${acc} C${prev.x + mid} ${prev.y} ${p.x - mid} ${p.y} ${p.x} ${p.y}`;
  }, '');

  useSceneProgress((p) => {
    const root = ref.current;
    const line = root?.querySelector<SVGPathElement>('.route__line');
    const head = root?.querySelector<SVGRectElement>('.route__head');
    if (!root || !line || !head) return;
    const len = line.getTotalLength();
    const t = remap(p, range[0], range[1]);
    line.style.strokeDasharray = `${len}`;
    line.style.strokeDashoffset = `${len * (1 - t)}`;
    const pt = line.getPointAtLength(t * len);
    head.setAttribute('x', String(pt.x - 6));
    head.setAttribute('y', String(pt.y - 6));
    root.querySelectorAll('[data-node]').forEach((n, i) => n.classList.toggle('is-on', t >= i / Math.max(1, nodes.length - 1) - 0.01));
  });

  return (
    <div ref={ref} className="route">
      <svg className="route__svg" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <path className="route__track" d={d} />
        <path className="route__line" d={d} />
        {points.map((p, i) => (
          <rect key={i} data-node className="route__node" x={p.x - 8} y={p.y - 8} width={16} height={16} />
        ))}
        <rect className="route__head" width={12} height={12} />
      </svg>
      {nodes.map((n, i) => (
        <div
          key={n.label}
          data-node
          className="route__step"
          style={{ left: `${(points[i].x / W) * 100}%`, top: `${(points[i].y / H) * 100}%` }}
        >
          <span className="label">
            <span className="label__index">{String(i + 1).padStart(2, '0')}</span>
            <span className="label__text">{n.label}</span>
          </span>
          <span className="route__meta mono">{n.meta}</span>
        </div>
      ))}
    </div>
  );
}

export function TypeLines({ lines, active }: { lines: string[]; active: boolean }) {
  const [typed, setTyped] = useState<string[]>(() => lines.map(() => ''));
  const [row, setRow] = useState(0);

  useEffect(() => {
    if (!active) return;
    let line = 0;
    let ch = 0;
    setTyped(lines.map(() => ''));
    const id = window.setInterval(() => {
      if (line >= lines.length) {
        window.clearInterval(id);
        return;
      }
      ch++;
      const l = line;
      const c = ch;
      setRow(l);
      setTyped((prev) => prev.map((v, i) => (i === l ? lines[l].slice(0, c) : v)));
      if (ch >= lines[line].length) {
        line++;
        ch = 0;
      }
    }, 28);
    return () => window.clearInterval(id);
  }, [active, lines]);

  return (
    <div className="type mono">
      <p className="visually-hidden">{lines.join('. ')}</p>
      {lines.map((_, i) => (
        <p key={i} className={i === row ? 'type__line is-active' : 'type__line'} aria-hidden="true">
          {typed[i]}
          <span className="type__cursor" />
        </p>
      ))}
    </div>
  );
}

export function Statement({ text, range }: { text: string; range: Range }) {
  const ref = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useSceneProgress((p) => {
    const el = ref.current;
    if (!el) return;
    const t = remap(p, range[0], range[1]);
    const eased = 1 - Math.pow(1 - t, 3);
    const z = 2.4 - eased * 1.4;
    el.style.setProperty('--z', z.toFixed(4));
    if (readout.current) readout.current.textContent = `Zoom ${Math.round((1 / z) * 100)}%  ·  Kerning -50`;
  });

  return (
    <div ref={ref} className="statement">
      <div className="statement__frame">
        <span ref={readout} className="statement__readout mono" />
        <span className="statement__handle statement__handle--tl" />
        <span className="statement__handle statement__handle--tr" />
        <span className="statement__handle statement__handle--bl" />
        <span className="statement__handle statement__handle--br" />
        <p className="statement__text">{text}</p>
      </div>
    </div>
  );
}
