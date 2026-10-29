import { ArrowRight } from 'lucide-react';
import Scene, { Beat } from '@/components/scene/Scene';
import { Chars, Icon, Label } from '@/components/ui';
import { about } from '@/content';
import { timeline } from '@/lib/timeline';
import FocusText from './FocusText';

const tl = timeline([1.8, 2.8, 2.6]);

export default function About() {
  return (
    <Scene
      id="about"
      chapter="about"
      length={tl.length}
      marks={[
        { kf: 'about', at: 0 },
        { kf: 'about-manifesto', at: tl.steps[1][0] },
        { kf: 'about-body', at: tl.steps[2][0] },
      ]}
    >
      <Beat range={tl.steps[0]} className="scene__layer--center container">
        <Label index="01">{about.label}</Label>
        <h2 className="beat__title">
          <Chars lines={about.title} />
        </h2>
        <p className="beat__intro">{about.intro}</p>
      </Beat>

      <Beat range={tl.steps[1]} className="scene__layer--center container">
        <FocusText parts={about.manifesto} range={[tl.at(1, 0.05), tl.at(1, 0.7)]} />
      </Beat>

      <Beat range={tl.steps[2]} className="scene__layer--center container">
        <div className="features">
          {about.features.map((f, i) => (
            <article className="feature" key={f.title} style={{ '--i': i } as React.CSSProperties}>
              <div className="feature__visual">
                <span className="feature__index mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="icon-tile icon-tile--lg">
                  <Icon name={f.icon} size={26} />
                </span>
              </div>
              <div className="feature__words">
                <h3 className="feature__title">{f.title}</h3>
                <p className="feature__body">{f.body}</p>
              </div>
              <ul className="feature__tags mono">
                {f.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <a className="feature__more" href="#contact">
                <span>Talk to us about {f.title.toLowerCase()}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </Beat>
    </Scene>
  );
}
