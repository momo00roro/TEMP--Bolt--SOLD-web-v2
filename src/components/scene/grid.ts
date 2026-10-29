import * as THREE from 'three';
import { CELL, type Frame } from './frames';

const COLS = 30;
const ROWS = 24;
const SPAN_Z = ROWS * CELL;

function crossTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  if (!g) throw new Error('2D canvas unavailable');
  g.fillStyle = '#fff';
  g.fillRect(28, 6, 8, 52);
  g.fillRect(6, 28, 52, 8);
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  return tex;
}

export function waveHeight(x: number, z: number, t: number, wave: number) {
  return Math.sin(t * 0.85 + x * 0.21 + z * 0.17) * 0.42 * wave;
}

export function createGrid() {
  const group = new THREE.Group();
  const material = new THREE.MeshBasicMaterial({
    alphaMap: crossTexture(),
    transparent: true,
    depthWrite: false,
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const geo = new THREE.PlaneGeometry(0.62, 0.62);
  geo.rotateX(-Math.PI / 2);
  const count = COLS * ROWS;
  const mesh = new THREE.InstancedMesh(geo, material, count);
  mesh.frustumCulled = false;
  group.add(mesh);

  const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, depthWrite: false });
  const segCount = ROWS * (COLS - 1) + COLS * (ROWS - 1);
  const linePos = new Float32Array(segCount * 6);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  lines.frustumCulled = false;
  group.add(lines);
  const pts = new Float32Array(count * 3);

  const m = new THREE.Matrix4();
  const dark = new THREE.Color('#ffffff');
  const light = new THREE.Color('#5d7fb8');
  let travel = 0;

  function update(p: Frame, time: number, dt: number) {
    group.position.set(p.gx, p.gy, p.gz);
    group.rotation.set(0, 0, 0);
    group.rotateY(THREE.MathUtils.degToRad(p.yaw));
    group.rotateX(THREE.MathUtils.degToRad(p.pitch));
    group.rotateY(THREE.MathUtils.degToRad(p.spin));

    travel = (travel + p.flow * 0.4 * dt) % SPAN_Z;
    material.color.copy(dark).lerp(light, p.light);
    material.opacity = p.grid * (0.85 + p.light * 0.15);
    mesh.visible = material.opacity > 0.01;
    lineMat.color.copy(material.color);
    lineMat.opacity = p.grid * (0.22 + p.light * 0.16);
    lines.visible = mesh.visible;
    if (!mesh.visible) return;

    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      let z = (r - ROWS / 2) * CELL + travel;
      if (z > SPAN_Z / 2) z -= SPAN_Z;
      for (let c = 0; c < COLS; c++) {
        const x = (c - COLS / 2) * CELL;
        const y = waveHeight(x, z, time, p.wave);
        m.makeTranslation(x, y, z);
        pts[i * 3] = x;
        pts[i * 3 + 1] = y;
        pts[i * 3 + 2] = z;
        mesh.setMatrixAt(i++, m);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;

    let s = 0;
    const seg = (a: number, b: number, skip = false) => {
      const o = s * 6;
      const bb = skip ? a : b;
      linePos[o] = pts[a * 3];
      linePos[o + 1] = pts[a * 3 + 1];
      linePos[o + 2] = pts[a * 3 + 2];
      linePos[o + 3] = pts[bb * 3];
      linePos[o + 4] = pts[bb * 3 + 1];
      linePos[o + 5] = pts[bb * 3 + 2];
      s++;
    };
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS - 1; c++) seg(r * COLS + c, r * COLS + c + 1);
    }
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS - 1; r++) {
        const a = r * COLS + c;
        const b = a + COLS;
        seg(a, b, Math.abs(pts[b * 3 + 2] - pts[a * 3 + 2]) > CELL * 1.5);
      }
    }
    lineGeo.attributes.position.needsUpdate = true;
  }

  return { group, update };
}
