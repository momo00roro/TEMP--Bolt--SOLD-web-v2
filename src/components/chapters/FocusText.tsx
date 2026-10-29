import { useRef } from 'react';
import { useSceneProgress } from '@/components/scene/Scene';
import { remap, type Range } from '@/lib/timeline';

interface Part {
  text: string;
  key?: boolean;
}

export default function FocusText({ parts, range }: { parts: Part[]; range: Range }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const tokens = parts.flatMap((p) =>
    p.key ? [{ w: p.text, key: true }] : p.text.split(' ').filter(Boolean).map((w) => ({ w, key: false })),
  );

  useSceneProgress((p) => {
    const el = ref.current;
    if (!el) return;
    const lit = remap(p, range[0], range[1]) * (tokens.length + 1);
    el.querySelectorAll<HTMLElement>('.focus__word').forEach((span, i) => {
      span.style.setProperty('--lit', String(Math.min(1, Math.max(0, lit - i))));
    });
  });

  return (
    <p ref={ref} className="focus">
      {tokens.map(({ w, key }, i) => {
        const glued = /^[.,;:!?]/.test(w);
        return (
          <span key={i}>
            {i > 0 && !glued && ' '}
            <span className={key ? 'focus__word focus__word--key' : 'focus__word'}>{w}</span>
          </span>
        );
      })}
    </p>
  );
}
