import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Range } from '@/lib/timeline';

type Listener = (progress: number) => void;

interface SceneApi {
  subscribe: (fn: Listener) => () => void;
}

const SceneContext = createContext<SceneApi | null>(null);

export interface Mark {
  kf: string;
  at: number;
}

interface SceneProps {
  id?: string;
  chapter: string;
  length: number;
  marks: Mark[];
  tone?: 'dark' | 'light';
  children: ReactNode;
}

export default function Scene({ id, chapter, length, marks, tone = 'dark', children }: SceneProps) {
  const ref = useRef<HTMLElement>(null);
  const listeners = useRef(new Set<Listener>());
  const last = useRef(0);

  const subscribe = useCallback((fn: Listener) => {
    listeners.current.add(fn);
    fn(last.current);
    return () => {
      listeners.current.delete(fn);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      if (rect.bottom < -window.innerHeight || rect.top > window.innerHeight * 2) return;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      if (Math.abs(p - last.current) < 0.0001) return;
      last.current = p;
      listeners.current.forEach((fn) => fn(p));
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={ref} id={id} data-chapter={chapter} className="scene" style={{ height: `${length * 100}svh` }}>
      {marks.map((m) => (
        <i
          key={m.kf}
          className="scene__mark"
          data-kf={m.kf}
          style={{ top: `calc(${m.at} * (100% - 100svh))` }}
          aria-hidden="true"
        />
      ))}
      <SceneContext.Provider value={{ subscribe }}>
        <div className={`scene__frame chapter--${tone}`}>{children}</div>
      </SceneContext.Provider>
    </section>
  );
}

export function useSceneProgress(fn: Listener) {
  const api = useContext(SceneContext);
  const saved = useRef(fn);
  saved.current = fn;
  useEffect(() => api?.subscribe((p) => saved.current(p)), [api]);
}

export function useBeat([start, end]: Range) {
  const [state, setState] = useState<'pre' | 'in' | 'past'>('pre');
  useSceneProgress((p) => {
    const next = p >= end ? 'past' : p >= start ? 'in' : 'pre';
    setState((s) => (s === next ? s : next));
  });
  return state;
}

interface BeatProps {
  range: Range;
  className?: string;
  children: ReactNode | ((active: boolean) => ReactNode);
}

export function Beat({ range, className = '', children }: BeatProps) {
  const state = useBeat(range);
  return (
    <div className={`scene__layer ${className} is-${state}`} aria-hidden={state !== 'in'}>
      {typeof children === 'function' ? children(state === 'in') : children}
    </div>
  );
}
