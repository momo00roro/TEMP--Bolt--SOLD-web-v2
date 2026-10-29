import * as THREE from 'three';

const vertex = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform float uLight;
  uniform float uGlow;
  uniform float uTime;
  varying vec3 vDir;

  void main() {
    vec3 d = normalize(vDir);
    float h = d.y;
    float s = clamp(0.5 + uGlow * 0.35, 0.0, 1.0);

    vec3 deep = vec3(0.012, 0.027, 0.075);
    vec3 navy = vec3(0.035, 0.09, 0.22);
    vec3 blue = vec3(0.18, 0.45, 1.0);
    vec3 haze = vec3(0.86, 0.9, 0.97);

    vec3 glowDir = normalize(vec3(0.62 + sin(uTime) * 0.05, 0.42, -0.66));
    float g = max(dot(d, glowDir), 0.0);
    float glow = pow(g, 5.0) * 0.9 + pow(g, 22.0) * 0.6;

    vec3 dark = mix(deep, navy, smoothstep(-0.25, 0.7, h) * 0.6);
    dark += blue * glow * (0.25 + 0.85 * s);
    dark += haze * exp(-abs(h + 0.05) * 9.0) * 0.12 * s;

    vec3 paperTop = vec3(0.969, 0.976, 0.988);
    vec3 paperLow = vec3(0.906, 0.925, 0.961);
    vec3 paperBlue = vec3(0.835, 0.882, 0.965);
    vec3 light = mix(paperLow, paperTop, smoothstep(-0.3, 0.6, h));
    light = mix(light, paperBlue, pow(g, 4.0) * 0.55);

    gl_FragColor = vec4(mix(dark, light, uLight), 1.0);
  }
`;

export function createSky() {
  const uniforms = { uLight: { value: 0 }, uGlow: { value: 0 }, uTime: { value: 0 } };
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(80, 48, 24),
    new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms, side: THREE.BackSide, depthWrite: false }),
  );
  mesh.renderOrder = -10;
  mesh.frustumCulled = false;
  return { mesh, uniforms };
}
