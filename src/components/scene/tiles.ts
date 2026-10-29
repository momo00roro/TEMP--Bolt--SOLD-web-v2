import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { CELL, type Frame } from './frames';
import { waveHeight } from './grid';

const ICONS: string[][] = [
  ['M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z', 'M18 16v4', 'M16 18h4'],
  ['M12 3l8 4.5v9L12 21l-8-4.5v-9z', 'M4 7.5l8 4.5 8-4.5', 'M12 12v9'],
  ['M14.5 5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 1 1 5 0', 'M7.5 18a2.5 2.5 0 1 1-5 0a2.5 2.5 0 1 1 5 0', 'M21.5 18a2.5 2.5 0 1 1-5 0a2.5 2.5 0 1 1 5 0', 'M10.8 7.2L6.2 15.6', 'M13.2 7.2l4.6 8.4', 'M7.5 18h9'],
  ['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M17 14v6', 'M14 17h6'],
  ['M4 20l4-1 11-11-3-3L5 16z', 'M14 6l3 3'],
  ['M12 3l9 5-9 5-9-5z', 'M3 12.5l9 5 9-5', 'M3 17l9 5 9-5'],
  ['M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z', 'M15 12a3 3 0 1 1-6 0a3 3 0 1 1 6 0'],
  ['M5 7V4h14v3', 'M12 4v16', 'M9 20h6'],
  ['M5 3l14 7-6 2-2 6z'],
  ['M8 7l-5 5 5 5', 'M16 7l5 5-5 5', 'M14 4l-4 16'],
  ['M4 5h16v11H9l-5 4z', 'M8 10h8'],
  ['M21 12a9 9 0 1 1-18 0a9 9 0 1 1 18 0', 'M15.5 8.5l-2 5-5 2 2-5z'],
];

export const TILE_COUNT = ICONS.length;
const DEPTH = 0.22;
const HOVER = 0.14;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

// Loose diagonal drift of tiles lying on the floor, in grid cells.
const SCATTERED: [number, number][] = [[-3, -2], [0, -3], [3, -2], [-4, 1], [-1, 0], [2, 1], [5, 0], [-2, 3], [1, 3], [4, 3], [-5, -1], [0, 5]];

const noise = (n: number) => {
  const s = Math.sin(n * 91.7 + 3.1) * 15731.743;
  return s - Math.floor(s);
};
const fade = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function canvasTexture(draw: (g: CanvasRenderingContext2D) => void) {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  if (!g) throw new Error('2D canvas unavailable');
  draw(g);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

const iconTexture = (paths: string[]) =>
  canvasTexture((g) => {
    g.scale(256 / 24, 256 / 24);
    g.strokeStyle = '#fff';
    g.lineWidth = 1.5;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    paths.forEach((d) => g.stroke(new Path2D(d)));
  });

const faceTexture = () =>
  canvasTexture((g) => {
    const grad = g.createLinearGradient(0, 256, 256, 0);
    grad.addColorStop(0, '#1a4bd8');
    grad.addColorStop(0.5, '#3a86ff');
    grad.addColorStop(0.85, '#a9cbff');
    grad.addColorStop(1, '#f4f8ff');
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
  });

const MODES = ['orbit', 'drift', 'settle', 'board', 'stream', 'rise', 'stack'] as const;
type Mode = (typeof MODES)[number];

interface Pose {
  p: THREE.Vector3;
  q: THREE.Quaternion;
  scale: number;
}

export function createTiles(floor: THREE.Group) {
  const group = new THREE.Group();
  const side = new THREE.MeshPhysicalMaterial({ color: '#2d72f2', roughness: 0.28, clearcoat: 0.85, envMapIntensity: 0.95 });
  const face = new THREE.MeshPhysicalMaterial({ map: faceTexture(), roughness: 0.26, clearcoat: 0.85, clearcoatRoughness: 0.08, envMapIntensity: 0.8 });
  const body = new RoundedBoxGeometry(1, 1, DEPTH, 4, 0.08);
  const iconPlane = new THREE.PlaneGeometry(0.56, 0.56);
  const mats = [side, side, side, side, face, side];

  const tiles = ICONS.map((paths) => {
    const tile = new THREE.Group();
    tile.add(new THREE.Mesh(body, mats));
    const icon = new THREE.Mesh(iconPlane, new THREE.MeshBasicMaterial({ map: iconTexture(paths), transparent: true, depthWrite: false }));
    icon.position.z = DEPTH / 2 + 0.004;
    tile.add(icon);
    group.add(tile);
    return tile;
  });

  const v = new THREE.Vector3();
  const qa = new THREE.Quaternion();
  const qb = new THREE.Quaternion();
  const euler = new THREE.Euler();
  const rig = new THREE.Object3D();
  const layFlat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
  const X = new THREE.Vector3(1, 0, 0);
  const focus = new THREE.Vector3();
  const eye = new THREE.Vector3();
  const look = new THREE.Vector3();
  const side1 = new THREE.Vector3();
  const side2 = new THREE.Vector3();
  const poses: Pose[] = MODES.map(() => ({ p: new THREE.Vector3(), q: new THREE.Quaternion(), scale: 1 }));
  const blendP = new THREE.Vector3();
  const blendQ = new THREE.Quaternion();
  let spin = 0;

  function onFloor(x: number, z: number, lift: number, f: Frame, t: number, out: Pose) {
    out.p.set(x, waveHeight(x, z, t, f.wave) + lift, z).applyMatrix4(floor.matrixWorld);
    out.q.copy(floor.quaternion).multiply(layFlat);
  }

  function faceCamera(out: Pose, twist: number) {
    rig.position.copy(out.p);
    rig.lookAt(eye);
    rig.rotateZ(twist);
    out.q.copy(rig.quaternion);
  }

  function pose(mode: Mode, i: number, f: Frame, t: number, out: Pose) {
    out.scale = 1;
    focus.set(f.tx, f.ty + f.ringY, f.tz);
    switch (mode) {
      case 'orbit': {
        const a = (i / TILE_COUNT) * Math.PI * 2 + spin;
        qa.setFromAxisAngle(X, THREE.MathUtils.degToRad(f.ringTilt));
        v.set(Math.cos(a) * f.ringR, Math.sin(t * 0.6 + i * 0.9) * 0.15, Math.sin(a) * f.ringR * f.ringDepth).applyQuaternion(qa);
        out.p.copy(focus).add(v);
        rig.position.copy(out.p);
        rig.lookAt(eye);
        qb.copy(rig.quaternion);
        rig.lookAt(focus);
        rig.rotateY(Math.PI);
        out.q.copy(rig.quaternion).slerp(qb, f.ringFace);
        out.scale = f.ringScale * (1 - f.ringHideFront * fade(-0.3, 0.15, -Math.sin(a)));
        break;
      }
      case 'drift': {
        const y = 1 - (i / (TILE_COUNT - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const a = i * GOLDEN + t * 0.05;
        out.p.set(focus.x + Math.cos(a) * r * 6.5, focus.y + y * 2.6 + Math.sin(t * 0.3 + i) * 0.3, focus.z + Math.sin(a) * r * 5);
        euler.set(Math.sin(t * 0.2 + i) * 0.35, a * 0.5, Math.cos(t * 0.17 + i * 1.7) * 0.2);
        out.q.setFromEuler(euler);
        out.scale = 0.85 + noise(i) * 0.35;
        break;
      }
      case 'settle': {
        const [x, z] = SCATTERED[i];
        onFloor((x + 0.5) * CELL, (z + 0.5) * CELL, HOVER, f, t, out);
        break;
      }
      case 'board': {
        onFloor(((i % 4) - 1.5) * CELL, (Math.floor(i / 4) - 1) * CELL, HOVER, f, t, out);
        break;
      }
      case 'stack': {
        const layer = Math.floor(i / 4);
        const k = i % 4;
        const x = ((k % 2) - 0.5) * CELL * 1.05;
        const z = (Math.floor(k / 2) - 0.5) * CELL * 1.05;
        onFloor(x, z, HOVER + layer * 2.2 * f.layerGap, f, t, out);
        break;
      }
      case 'stream': {
        const u = ((t * 0.07 + i / TILE_COUNT) % 1 + 1) % 1;
        const a = i * GOLDEN * 2 + t * 0.25;
        const r = 2.4 + noise(i + 4) * 1.4;
        side1.crossVectors(look, THREE.Object3D.DEFAULT_UP).normalize();
        side2.crossVectors(side1, look);
        out.p.copy(eye).addScaledVector(look, 34 - u * 31).addScaledVector(side1, Math.cos(a) * r).addScaledVector(side2, Math.sin(a) * r);
        faceCamera(out, a * 0.25);
        out.scale = 1.1 * fade(0, 0.15, u) * (1 - fade(0.8, 1, u));
        break;
      }
      case 'rise': {
        const u = ((t * 0.045 + i / TILE_COUNT) % 1 + 1) % 1;
        const a = i * GOLDEN + t * 0.12;
        const r = 2 + noise(i + 9) * 4;
        out.p.set(focus.x + Math.cos(a) * r, focus.y - 5 + u * 12, focus.z + Math.sin(a) * r * 0.6);
        faceCamera(out, Math.sin(t * 0.3 + i) * 0.15);
        out.scale = fade(0, 0.15, u) * (1 - fade(0.8, 1, u));
        break;
      }
    }
  }

  function update(f: Frame, t: number, dt: number, camera: THREE.Camera) {
    spin += f.ringPace * dt;
    camera.getWorldPosition(eye);
    camera.getWorldDirection(look);
    const weights = MODES.map((m) => Math.max(0, f[m]));
    const total = weights.reduce((a, b) => a + b, 0);
    const shown = 1 - Math.min(1, Math.max(0, f.exhibit));

    tiles.forEach((tile, i) => {
      if (total < 0.001 || shown < 0.01) {
        tile.visible = false;
        return;
      }
      let acc = 0;
      let scale = 0;
      blendP.set(0, 0, 0);
      MODES.forEach((m, k) => {
        const w = weights[k];
        if (w < 0.001) return;
        pose(m, i, f, t, poses[k]);
        acc += w;
        blendP.addScaledVector(poses[k].p, w);
        scale += poses[k].scale * w;
        if (acc === w) blendQ.copy(poses[k].q);
        else blendQ.slerp(poses[k].q, w / acc);
      });
      scale = (scale / total) * shown;
      tile.visible = scale > 0.01;
      tile.position.copy(blendP.divideScalar(total));
      tile.quaternion.copy(blendQ);
      tile.scale.setScalar(Math.max(scale, 0.0001));
    });
  }

  return { group, update };
}
