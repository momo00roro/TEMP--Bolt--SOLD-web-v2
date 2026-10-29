import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createTimeline, FRAME_DEFAULTS, FRAME_KEYS, type Frame } from './frames';
import { createSky } from './sky';
import { createGrid } from './grid';
import { createTiles } from './tiles';
import { createPanels } from './panels';

interface Props {
  onTone: (tone: 'dark' | 'light') => void;
}

function createDust() {
  const count = 420;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 50;
    pos[i * 3 + 1] = (Math.random() - 0.3) * 20;
    pos[i * 3 + 2] = (Math.random() - 0.7) * 50;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ color: '#9cc2ff', size: 0.05, transparent: true, depthWrite: false, sizeAttenuation: true });
  return { points: new THREE.Points(geo, mat), mat };
}

export default function SpaceCanvas({ onTone }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const toneRef = useRef(onTone);
  toneRef.current = onTone;

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    scene.environment = pmrem.fromScene(room, 0.04).texture;
    scene.fog = new THREE.Fog('#050a18', 16, 52);

    scene.add(new THREE.AmbientLight('#ffffff', 0.55));
    const key = new THREE.DirectionalLight('#ffffff', 1.1);
    key.position.set(5, 8, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight('#9fc2ff', 0.45);
    rim.position.set(-6, 2, -3);
    scene.add(rim);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
    const sky = createSky();
    scene.add(sky.mesh);
    const grid = createGrid();
    scene.add(grid.group);
    const tiles = createTiles(grid.group);
    scene.add(tiles.group);
    const panels = createPanels(grid.group);
    const dust = createDust();
    scene.add(dust.points);

    const timeline = createTimeline();
    const target: Frame = { ...FRAME_DEFAULTS };
    const live: Frame = { ...FRAME_DEFAULTS };
    let first = true;
    const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
    const darkFog = new THREE.Color('#050a18');
    const lightFog = new THREE.Color('#eef2f9');
    const lookDir = new THREE.Vector3();
    const tgt = new THREE.Vector3();
    let tone: 'dark' | 'light' = 'dark';
    let width = 0;
    let height = 0;

    const resize = () => {
      width = el.clientWidth;
      height = el.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      timeline.measure();
    };
    resize();
    window.addEventListener('resize', resize);
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;
    const frame = () => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = reduced ? 0 : clock.elapsedTime;
      const mobile = width < 900;
      timeline.sample(window.scrollY, window.innerHeight, mobile, target);
      const k = first ? 1 : 1 - Math.exp(-3.4 * dt);
      first = false;
      for (const key of FRAME_KEYS) live[key] += (target[key] - live[key]) * k;

      pointer.sx += (pointer.x - pointer.sx) * (1 - Math.exp(-2 * dt));
      pointer.sy += (pointer.y - pointer.sy) * (1 - Math.exp(-2 * dt));

      const az = THREE.MathUtils.degToRad(live.azim + pointer.sx * 2.5);
      const el2 = THREE.MathUtils.degToRad(live.elev - pointer.sy * 1.5);
      lookDir.set(-Math.cos(el2) * Math.sin(az), -Math.sin(el2), -Math.cos(el2) * Math.cos(az));
      tgt.set(live.tx, live.ty, live.tz);
      camera.position.copy(tgt).addScaledVector(lookDir, -live.dist);
      camera.up.set(Math.sin(THREE.MathUtils.degToRad(live.roll)), Math.cos(THREE.MathUtils.degToRad(live.roll)), 0);
      camera.lookAt(tgt);
      camera.fov = live.fov;
      if (Math.abs(live.pan) > 0.002 || Math.abs(live.panY) > 0.002) {
        camera.setViewOffset(width, height, -live.pan * width * 0.5, live.panY * height * 0.5, width, height);
      } else {
        camera.clearViewOffset();
      }
      camera.updateProjectionMatrix();

      sky.mesh.position.copy(camera.position);
      sky.uniforms.uLight.value = live.light;
      sky.uniforms.uGlow.value = live.glow;
      sky.uniforms.uTime.value = t * 0.05;
      (scene.fog as THREE.Fog).color.copy(darkFog).lerp(lightFog, live.light);
      dust.mat.opacity = live.dust * (1 - live.light * 0.6);
      dust.mat.color.set(live.light > 0.5 ? '#5d86d6' : '#9cc2ff');
      dust.points.rotation.y = t * 0.01;

      grid.update(live, t, reduced ? 0 : dt);
      grid.group.updateMatrixWorld(true);
      tiles.update(live, t, reduced ? 0 : dt, camera);
      panels.update(live);
      renderer.render(scene, camera);

      const nextTone = live.light > 0.5 ? 'light' : 'dark';
      if (nextTone !== tone) {
        tone = nextTone;
        toneRef.current(tone);
      }
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      pmrem.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={host} className="space" aria-hidden="true" />;
}
