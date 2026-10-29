import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { works } from '@/content';
import { PANEL_H, PANEL_SPOTS, PANEL_W, type Frame } from './frames';

const fade = (v: number) => {
  const t = Math.min(1, Math.max(0, v));
  return t * t * (3 - 2 * t);
};

// Work panels lie flat in the floor and hinge upright on their front edge when their chapter step is active.
export function createPanels(floor: THREE.Group) {
  const loader = new THREE.TextureLoader();
  const frameGeo = new RoundedBoxGeometry(PANEL_W + 0.16, PANEL_H + 0.16, 0.08, 3, 0.04);
  frameGeo.translate(0, (PANEL_H + 0.16) / 2, 0);
  const imageGeo = new THREE.PlaneGeometry(PANEL_W, PANEL_H);
  imageGeo.translate(0, PANEL_H / 2 + 0.08, 0.045);
  const frameMat = new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.35, clearcoat: 0.6 });

  const hinges = works.map((w, i) => {
    const map = loader.load(w.image);
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 8;
    const hinge = new THREE.Group();
    const [x, z] = PANEL_SPOTS[i];
    hinge.position.set(x, 0.02, z + PANEL_H / 2);
    hinge.add(new THREE.Mesh(frameGeo, frameMat));
    const image = new THREE.Mesh(imageGeo, new THREE.MeshBasicMaterial({ map, transparent: true, toneMapped: false }));
    hinge.add(image);
    floor.add(hinge);
    return { hinge, image };
  });

  function update(f: Frame) {
    hinges.forEach(({ hinge, image }, i) => {
      const up = fade(1 - (Math.abs(f.raised - (i + 1)) - 0.15) / 0.7) * fade(f.exhibit);
      hinge.visible = f.exhibit > 0.01;
      hinge.rotation.x = -Math.PI / 2 + up * (Math.PI / 2);
      (image.material as THREE.MeshBasicMaterial).opacity = 0.25 + up * 0.75;
    });
  }

  return { update };
}
