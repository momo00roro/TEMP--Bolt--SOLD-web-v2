import Scene, { Beat } from '@/components/scene/Scene';
import { Button, Chars } from '@/components/ui';
import { hero } from '@/content';
import { timeline } from '@/lib/timeline';

const tl = timeline([1.4], { lead: 0, tail: 0.3 });

export default function Hero() {
  return (
    <Scene id="welcome" chapter="welcome" length={tl.length} marks={[{ kf: 'welcome', at: 0 }]}>
      <Beat range={[-1, tl.steps[0][1]]} className="hero">
        <div className="hero__inner container">
          <h1 className="hero__heading">
            <span className="hero__slogan rise-in">{hero.slogan}</span>
            <Chars lines={hero.title} className="hero__title" />
          </h1>
          <div className="hero__side">
            <p className="rise-in" style={{ animationDelay: '0.5s' }}>{hero.lede}</p>
            <div className="hero__actions rise-in" style={{ animationDelay: '0.65s' }}>
              <Button href="#work" arrow>See our work</Button>
              <Button href="#contact" variant="ghost">Start a project</Button>
            </div>
          </div>
        </div>
        <div className="hero__scroll mono rise-in" style={{ animationDelay: '1s' }}>
          <span className="hero__scroll-bar" />
          Scroll to explore
        </div>
      </Beat>
    </Scene>
  );
}
