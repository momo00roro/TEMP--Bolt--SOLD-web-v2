import Scene, { Beat } from '@/components/scene/Scene';
import { Chars, Label } from '@/components/ui';
import { process } from '@/content';
import { timeline } from '@/lib/timeline';
import { Route, Statement, TypeLines } from './ProcessParts';

const intro = timeline([2.4]);
const steps = timeline(process.steps.map(() => 2));
const statement = timeline([2.2]);

export default function Process() {
  return (
    <>
      <Scene id="process" chapter="process" length={intro.length} marks={[{ kf: 'process', at: 0 }]} tone="dark">
        <Beat range={intro.steps[0]} className="scene__layer--center container">
          <Label index="03">{process.label}</Label>
          <h2 className="beat__title beat__title--sm">
            <Chars lines={[process.title]} />
          </h2>
          <p className="beat__intro">{process.intro}</p>
          <Route
            nodes={process.steps.map((s) => ({ label: s.label, meta: s.title }))}
            range={[intro.at(0, 0.1), intro.at(0, 0.75)]}
          />
        </Beat>
      </Scene>

      <Scene
        chapter="process"
        length={steps.length}
        marks={process.steps.map((_, i) => ({ kf: `process-${i + 1}`, at: steps.steps[i][0] }))}
        tone="dark"
      >
        {process.steps.map((s, i) => (
          <Beat key={s.label} range={steps.steps[i]} className="scene__layer--left container">
            {(active) => (
              <article className={`step step--${s.tone}`}>
                <Label index={`0${i + 1}`}>{s.label}</Label>
                <h3 className="step__title">{s.title}</h3>
                <p className="step__body">{s.body}</p>
                <TypeLines lines={s.log} active={active} />
                <ol className="ticks" aria-label={`Step ${i + 1} of ${process.steps.length}`}>
                  {process.steps.map((_, k) => (
                    <li key={k} className={k <= i ? 'is-on' : undefined} />
                  ))}
                </ol>
              </article>
            )}
          </Beat>
        ))}
      </Scene>

      <Scene chapter="process" length={statement.length} marks={[{ kf: 'process-4', at: 0 }]}>
        <Beat range={statement.steps[0]} className="scene__layer--center container">
          <Statement text={process.statement} range={[statement.at(0, 0.05), statement.at(0, 0.55)]} />
        </Beat>
      </Scene>
    </>
  );
}
