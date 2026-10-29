import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button, Chars, Label } from '@/components/ui';
import { contact, EMAIL, navItems } from '@/content';

export default function Contact() {
  const year = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="contact" data-chapter="contact" className={seen ? 'contact is-seen' : 'contact'}>
      <i className="scene__mark" data-kf="contact" style={{ top: 0 }} aria-hidden="true" />
      <div className="contact__hero container">
        <Label index="05">{contact.label}</Label>
        <h2 className="contact__title">
          <Chars lines={contact.title} />
        </h2>
        <p className="contact__body">{contact.body}</p>
        <div className="contact__actions">
          <Button href={`mailto:${EMAIL}?subject=New%20project`} size="lg" arrow>{contact.cta}</Button>
          <a className="contact__mail mono" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </div>

      <footer className="footer">
        <div className="footer__row container">
          <nav className="footer__nav" aria-label="Footer">
            {navItems.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </nav>
          <div className="footer__meta mono">
            <span>Singapore</span>
            <a href="https://sold.com.sg" target="_blank" rel="noreferrer">
              sold.com.sg <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <span>&copy; {year} SOLD AI Studio</span>
          </div>
        </div>
        <div className="footer__wordmark" aria-hidden="true">SOLD</div>
      </footer>
    </section>
  );
}
