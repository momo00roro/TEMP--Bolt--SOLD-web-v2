import { ArrowUpRight } from 'lucide-react';
import Scene, { Beat } from '@/components/scene/Scene';
import { Chars, Label } from '@/components/ui';
import { award, works } from '@/content';
import { timeline } from '@/lib/timeline';

const tl = timeline([2.4, ...works.map(() => 2), 0.3], { gap: [1.2, ...works.slice(1).map(() => 0.6), 1.2] });

function Headline({ lines }: { lines: string[] }) {
  return (
    <h2 className="award__title">
      {lines.map((line) => (
        <span className="award__line" key={line}>
          {line.split(/(\[[^\]]+\])/).map((part) =>
            part.startsWith('[') ? <em key={part}>{part.slice(1, -1)}</em> : <Chars key={part} lines={[part]} />,
          )}
        </span>
      ))}
    </h2>
  );
}

export default function Work() {
  const marks = [
    { kf: 'work', at: 0 },
    ...works.map((_, i) => ({ kf: `work-${i + 1}`, at: tl.steps[i + 1][0] })),
    { kf: 'work-fold', at: tl.steps[works.length + 1][0] },
  ];

  return (
    <Scene id="work" chapter="work" length={tl.length} marks={marks} tone="light">
      <Beat range={tl.steps[0]} className="scene__layer--center container award">
        <Label index="02">{award.label}</Label>
        <Headline lines={award.headline} />
        <div className="award__box">
          <p className="award__about">{award.about}</p>
          <dl className="facts">
            {award.facts.map((f) => (
              <div className="facts__item" key={f.label}>
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Beat>

      {works.map((w, i) => (
        <Beat key={w.name} range={tl.steps[i + 1]} className="scene__layer--left container exhibit">
          <article className="exhibit__card">
            <div className="exhibit__head">
              <Label index={String(i + 1).padStart(2, '0')}>{w.category}</Label>
              <span className="mono muted">{w.year}</span>
            </div>
            <ul className="awards" aria-label="Recognition">
              {w.awards.map((a) => (
                <li className="awards__item mono" key={a.name}>
                  <span className="awards__tier">{a.tier}</span>
                  <span className="awards__name">{a.name}</span>
                </li>
              ))}
            </ul>
            <h3 className="exhibit__name">{w.name}</h3>
            <p className="exhibit__body">{w.body}</p>
            <a className="exhibit__link" href="#contact">
              Discuss a similar project <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <ol className="ticks" aria-label={`Project ${i + 1} of ${works.length}`}>
              {works.map((_, k) => (
                <li key={k} className={k <= i ? 'is-on' : undefined} />
              ))}
            </ol>
          </article>
          <img className="exhibit__still" src={w.image} alt={`${w.name} project`} loading="lazy" />
        </Beat>
      ))}
    </Scene>
  );
}
