import { Fragment, type CSSProperties, type ReactNode } from 'react';
import {
  ArrowRight, Compass, Monitor, MousePointer2, Package, Palette, PenTool, Play, Shapes, Sparkles, Type, MessageSquare,
  type LucideIcon,
} from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  compass: Compass,
  monitor: Monitor,
  'mouse-pointer': MousePointer2,
  package: Package,
  palette: Palette,
  'pen-tool': PenTool,
  play: Play,
  shapes: Shapes,
  sparkles: Sparkles,
  type: Type,
  message: MessageSquare,
};

export function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const Cmp = icons[name] ?? Sparkles;
  return <Cmp size={size} strokeWidth={1.6} aria-hidden="true" />;
}

export function Label({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <span className="label">
      {index && <span className="label__index">{index}</span>}
      <span className="label__text">{children}</span>
    </span>
  );
}

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  size?: 'md' | 'sm' | 'lg';
  arrow?: boolean;
}

export function Button({ href, children, variant = 'primary', size = 'md', arrow }: ButtonProps) {
  return (
    <a className={`btn btn--${variant} btn--${size}`} href={href}>
      <span className="btn__label">{children}</span>
      {arrow && <ArrowRight className="btn__arrow" size={16} strokeWidth={1.8} aria-hidden="true" />}
    </a>
  );
}

export function Chars({ lines, className = '' }: { lines: string[]; className?: string }) {
  let n = 0;
  const split = lines.map((line) => line.split(' ').map((word) => [...word].map((ch) => ({ ch, i: n++ }))));
  return (
    <span className={`chars ${className}`} aria-label={lines.join(' ')}>
      {split.map((words, li) => (
        <span className="chars__line" key={li} aria-hidden="true">
          {words.map((chars, wi) => (
            <Fragment key={wi}>
              {wi > 0 && ' '}
              <span className="chars__word">
                {chars.map(({ ch, i }) => (
                  <span className="chars__char" key={i} style={{ '--i': i } as CSSProperties}>
                    {ch}
                  </span>
                ))}
              </span>
            </Fragment>
          ))}
        </span>
      ))}
    </span>
  );
}
