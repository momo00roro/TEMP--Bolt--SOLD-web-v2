import type { CSSProperties } from 'react';
import Scene, { Beat } from '@/components/scene/Scene';
import { Chars, Icon, Label } from '@/components/ui';
import { studio } from '@/content';
import { timeline } from '@/lib/timeline';

const tl = timeline([1.8, 3]);

function LayerStack() {
  return (
    <div className="layers">
      <div className="layers__scene" aria-hidden="true">
        {studio.layers.map((layer, i) => (
          <div className="layers__slot" key={layer.name} style={{ '--i': studio.layers.length - 1 - i } as CSSProperties}>
            <div className="layers__plane">
              {layer.icons.map((ic) => (
                <span className="layers__tile" key={ic}>
                  <Icon name={ic} size={16} />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ol className="layers__labels">
        {studio.layers.map((layer, i) => (
          <li key={layer.name} style={{ '--i': i } as CSSProperties}>
            <Label index={String(i + 1).padStart(2, '0')}>{layer.name}</Label>
            <span className="mono muted">{layer.role}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Studio() {
  return (
    <Scene
      id="studio"
      chapter="studio"
      length={tl.length}
      marks={[
        { kf: 'studio', at: 0 },
        { kf: 'studio-body', at: tl.steps[1][0] },
      ]}
    >
      <Beat range={tl.steps[0]} className="scene__layer--center container">
        <Label index="04">{studio.label}</Label>
        <h2 className="beat__title">
          <Chars lines={studio.title} />
        </h2>
        <p className="beat__intro">{studio.intro}</p>
      </Beat>

      <Beat range={tl.steps[1]} className="studio container">
        <div className="studio__panel">
          <LayerStack />
          <ul className="caps">
            {studio.capabilities.map((c, i) => (
              <li className="caps__row" key={c.name} style={{ '--i': i } as CSSProperties}>
                <span className="icon-tile">
                  <Icon name={c.icon} size={16} />
                </span>
                <span className="caps__name">{c.name}</span>
                <span className="caps__meta mono">{c.meta}</span>
              </li>
            ))}
          </ul>
        </div>
      </Beat>
    </Scene>
  );
}
