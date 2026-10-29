import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import SpaceCanvas from '@/components/scene/SpaceCanvas';
import Header, { ChapterNav, useChapter } from '@/components/Header';
import Hero from '@/components/chapters/Hero';
import About from '@/components/chapters/About';
import Work from '@/components/chapters/Work';
import Process from '@/components/chapters/Process';
import Studio from '@/components/chapters/Studio';
import Contact from '@/components/chapters/Contact';
import { pixelJump } from '@/lib/pixelWave';

const isWheelNotch = (e: WheelEvent) => e.deltaMode === 1 || (Math.abs(e.deltaY) >= 50 && Number.isInteger(e.deltaY) && e.deltaX === 0);

function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
      virtualScroll: (data) => {
        const notch = data.event.type === 'wheel' && isWheelNotch(data.event as WheelEvent);
        if (notch) data.deltaY *= 2.4;
        lenis.options.lerp = notch ? 0.085 : 0.075;
        return true;
      },
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!a) return;
      const target = document.querySelector(a.getAttribute('href') ?? '');
      if (!target) return;
      e.preventDefault();
      if (a.hasAttribute('data-pixel')) {
        pixelJump({ x: e.clientX, y: e.clientY }, () => lenis.scrollTo(target as HTMLElement, { immediate: true, force: true }));
        return;
      }
      lenis.scrollTo(target as HTMLElement, { duration: 1.6 });
    };
    document.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);
}

export default function App() {
  const [tone, setTone] = useState<'dark' | 'light'>('dark');
  const chapter = useChapter();
  useSmoothScroll();

  return (
    <div className={tone === 'light' ? 'page is-light' : 'page'}>
      <SpaceCanvas onTone={setTone} />
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <Process />
        <Studio />
        <Contact />
      </main>
      <ChapterNav current={chapter} />
    </div>
  );
}
