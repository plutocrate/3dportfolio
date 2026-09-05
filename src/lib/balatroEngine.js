// ─────────────────────────────────────────────────────────────────────────
// BALATRO SWIRL ENGINE
// One shader, rendered into as many canvases as you like. A "background"
// canvas covers the whole screen at low opacity. "surface" canvases are
// small (sized to a button, or to an aura around your character) and
// sample the *exact same field* — offset by their own screen position —
// so the pattern reads as one continuous flow, just brighter/more opaque
// wherever it "pops through" a surface.
// ─────────────────────────────────────────────────────────────────────────

const VERTEX_SRC = `
attribute vec2 p;
void main(){
  gl_Position = vec4(p, 0.0, 1.0);
}
`;

// `uOffset` + `uGlobalRes` are what keep every surface canvas lined up with
// the background: instead of using the small canvas's own pixel coords, we
// add its page position and divide by the *window's* resolution, so it's
// sampling the same point in the field the background would show there.
// `uSurface` (0 or 1) turns off the CRT degrade (scanlines/vignette/flicker)
// and cranks saturation + gloss so surfaces read as more vivid / "popped".
const FRAGMENT_SRC = `
precision highp float;

uniform vec2  uGlobalRes;
uniform vec2  uOffset;
uniform float uTime;
uniform vec2  uMouse;
uniform float uSurface;
uniform float uIntensity;

float hash(vec2 p){
  return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);
}

float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0,0.0));
  float c = hash(i + vec2(0.0,1.0));
  float d = hash(i + vec2(1.0,1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}

float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for(int i=0;i<6;i++){
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

vec2 rot(vec2 p, float a){
  float c = cos(a), s = sin(a);
  return vec2(c*p.x - s*p.y, s*p.x + c*p.y);
}

void main(){
  vec2 fragCoord = gl_FragCoord.xy + uOffset;
  vec2 uv = fragCoord / uGlobalRes;

  vec2 p = uv;
  p.x *= uGlobalRes.x / uGlobalRes.y;

  vec2 flow = vec2(
    fbm(p * 2.0 + uTime * 0.15),
    fbm(p * 2.0 - uTime * 0.12)
  );

  float swirl = fbm(p * 1.5) * 6.2831;
  vec2 warped = rot(p + flow * 0.35, swirl + uTime * 0.15);

  vec2 warp2 = vec2(
    fbm(warped * 2.5 + uTime * 0.2),
    fbm(warped * 2.5 - uTime * 0.18)
  );
  warped += warp2 * 0.5;

  vec2 m = uMouse / uGlobalRes;
  float d = distance(uv, m);
  warped += (uv - m) * 0.04 * exp(-d * 6.0);

  float n = fbm(warped * 3.0);
  float bands = sin(n * 10.0) * 0.5 + 0.5;

  float blend = fbm(p * 1.2 + uTime * 0.1);

  vec3 red  = vec3(1.3, 0.2, 0.2);
  vec3 blue = vec3(0.1, 0.3, 1.3);
  red  *= 0.6 + bands * 0.9;
  blue *= 0.6 + bands * 0.9;

  vec3 col = mix(blue, red, blend);

  float spec = pow(1.0 - abs(bands - 0.5) * 2.0, 10.0);
  col += spec * (uSurface > 0.5 ? 1.0 : 0.6);

  col *= 1.3;

  if (uSurface < 0.5) {
    float scan = sin(gl_FragCoord.y * 1.6) * 0.05;
    col -= scan;

    vec2 center = uv - 0.5;
    float vig = smoothstep(0.9, 0.2, dot(center, center));
    col *= vig;

    col *= 0.97 + 0.03 * sin(uTime * 10.0);
  } else {
    // surfaces get punchier saturation instead of the CRT degrade
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(lum), col, 1.35);
  }

  col += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.02;
  col.r += 0.02 * noise(uv + uTime);
  col.b -= 0.02 * noise(uv - uTime);

  col *= uIntensity;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('Balatro swirl shader error:', gl.getShaderInfoLog(s));
  }
  return s;
}

function buildProgram(gl) {
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERTEX_SRC));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  return {
    prog,
    uGlobalRes: gl.getUniformLocation(prog, 'uGlobalRes'),
    uOffset:    gl.getUniformLocation(prog, 'uOffset'),
    uTime:      gl.getUniformLocation(prog, 'uTime'),
    uMouse:     gl.getUniformLocation(prog, 'uMouse'),
    uSurface:   gl.getUniformLocation(prog, 'uSurface'),
    uIntensity: gl.getUniformLocation(prog, 'uIntensity'),
  };
}

// ── Shared clock + mouse, so every canvas (background + all surfaces)
// samples the exact same instant of the same field. ─────────────────────
export function createSwirlField() {
  const field = {
    mouse: [0, 0],
    startTime: performance.now(),
    active: false,      // whether the swirl should currently be shown
    opacity: 0,          // animated 0→1 fade driven by setActive()
    _targetOpacity: 0,
    _fadeMs: 900,
  };

  window.addEventListener('mousemove', (e) => {
    field.mouse = [e.clientX, window.innerHeight - e.clientY];
  });

  field.setActive = (on) => {
    field.active = on;
    field._targetOpacity = on ? 1 : 0;
  };

  field.tick = (dtMs) => {
    const step = dtMs / field._fadeMs;
    if (field.opacity < field._targetOpacity) {
      field.opacity = Math.min(field._targetOpacity, field.opacity + step);
    } else if (field.opacity > field._targetOpacity) {
      field.opacity = Math.max(field._targetOpacity, field.opacity - step);
    }
  };

  field.elapsed = () => (performance.now() - field.startTime) * 0.001;

  return field;
}

// ── Mounts one canvas (background OR surface) into the given <canvas>
// element, driven by the shared field. Returns { destroy }. ─────────────
export function mountSwirl(canvasEl, field, opts = {}) {
  const {
    surface = false,          // false = full CRT background look, true = punchy "pop" surface
    baseOpacity = surface ? 0.85 : 0.4, // max canvas opacity once fully faded in
    intensity = surface ? 1.35 : 1.0,   // color intensity multiplier
    followOffset = true,      // surfaces: keep aligned to the element's page position
  } = opts;

  const gl = canvasEl.getContext('webgl', { alpha: true, premultipliedAlpha: false });
  if (!gl) { console.warn('WebGL unavailable for Balatro swirl'); return { destroy() {} }; }
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const u = buildProgram(gl);
  let raf = null;
  let lastT = performance.now();
  let destroyed = false;

  function resize() {
    const rect = canvasEl.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvasEl.width  = Math.max(1, Math.round(rect.width * dpr));
    canvasEl.height = Math.max(1, Math.round(rect.height * dpr));
    gl.viewport(0, 0, canvasEl.width, canvasEl.height);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvasEl);
  resize();

  function frame(now) {
    if (destroyed) return;
    const dt = now - lastT;
    lastT = now;
    field.tick(dt);

    const rect = canvasEl.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    gl.uniform2f(u.uGlobalRes, window.innerWidth * dpr, window.innerHeight * dpr);
    if (followOffset && surface) {
      // page-space offset (in device pixels) so this canvas's local (0,0)
      // lines up with its true position in the shared field
      gl.uniform2f(u.uOffset, rect.left * dpr, (window.innerHeight - rect.bottom) * dpr);
    } else {
      gl.uniform2f(u.uOffset, 0, 0);
    }
    gl.uniform1f(u.uTime, field.elapsed());
    gl.uniform2f(u.uMouse, field.mouse[0] * dpr, field.mouse[1] * dpr);
    gl.uniform1f(u.uSurface, surface ? 1 : 0);
    gl.uniform1f(u.uIntensity, intensity);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    canvasEl.style.opacity = String(field.opacity * baseOpacity);

    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  return {
    destroy() {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
    },
  };
}
