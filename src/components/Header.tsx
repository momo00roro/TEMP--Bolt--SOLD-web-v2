import { useEffect, useState } from 'react';
import { Hexagon, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui';
import { chapters, navItems, type ChapterId } from '@/content';

export function useChapter() {
  const [current, setCurrent] = useState<ChapterId>('welcome');
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = e.target.getAttribute('data-chapter') as ChapterId | null;
          if (e.isIntersecting && id) setCurrent(id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    document.querySelectorAll('[data-chapter]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return current;
}

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('is-menu-open', open);
  }, [open]);

  return (
    <header className="site-header">
      <a href="#welcome" className="brand" aria-label="SOLD home" data-pixel>
        <Hexagon size={20} strokeWidth={2} aria-hidden="true" />
        <span className="wordmark">SOLD</span>
      </a>
      <nav className="nav-links" aria-label="Main">
        {navItems.map((n) => (
          <a key={n.href} href={n.href}>{n.label}</a>
        ))}
      </nav>
      <div className="site-header__cta">
        <Button href="#contact" size="sm">Start a project</Button>
      </div>
      <button className="menu-button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
      <div className={`mobile-menu ${open ? 'is-open' : ''}`}>
        {[...navItems, { href: '#contact', label: 'Contact' }].map((n, i) => (
          <a key={n.href} href={n.href} onClick={() => setOpen(false)} style={{ '--i': i } as React.CSSProperties}>
            <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            {n.label}
          </a>
        ))}
      </div>
    </header>
  );
}

export function ChapterNav({ current }: { current: ChapterId }) {
  const index = Math.max(0, chapters.findIndex((c) => c.id === current));
  return (
    <>
      <div className="indicator mono" aria-hidden="true">
        <span className="indicator__index">{String(index).padStart(2, '0')}</span>
        <span className="indicator__name" key={current}>{chapters[index].name}</span>
      </div>
      <nav className="chapter-dots" aria-label="Chapters">
        {chapters.map((c) => (
          <a key={c.id} href={`#${c.id}`} className={c.id === current ? 'is-current' : undefined} aria-label={c.name}>
            <span className="chapter-dots__name mono">{c.name}</span>
            <span className="chapter-dots__mark" />
          </a>
        ))}
      </nav>
    </>
  );
}
