// ─────────────────────────────────────────────────────────────────────────
// BALATRO SWIRL ENGINE (perf-tuned)
// Same shader, rendered into as many canvases as you like. Changes that fix
// the lag:
//   1. Zero GPU work while the swirl is fully faded out (was: full shader
//      cost 60x/sec on every canvas, all the time, even when invisible).
//   2. Noise loop cut from 6 octaves x 7 calls/pixel to 3 octaves x 5 calls
//      (~2.8x fewer noise evaluations) — one warp pass instead of two.
//   3. Resolution capped hard: background no longer renders at 2x device
//      pixel ratio, and small "surface" canvases (buttons) render at a
//      tiny fixed internal size and let CSS scale them up — they're
//      blurred/blended anyway, so nobody can tell, and it's a huge win
//      per canvas when you've got 6-8 of them on screen.
//   4. The rAF loop itself now actually stops when the swirl is off,
//      instead of quietly ticking 60x/sec forever in the background for
//      the whole lifetime of the page. Each canvas registers a "wake"
//      callback with the shared field and only starts requesting frames
//      again once setActive(true) explicitly calls it — so "not showing
//      the swirl" now genuinely means zero per-frame cost, not just zero
//      draw calls.
// ─────────────────────────────────────────────────────────────────────────

const VERTEX_SRC = `
attribute vec2 p;
void main(){
  gl_Position = vec4(p, 0.0, 1.0);
}
`;

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

// 3 octaves instead of 6 — still reads as organic marbling at the
// viewing distance/blur this is used at, at roughly half the cost.
float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for(int i=0;i<3;i++){
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
  // single warp pass (the original's second domain-warp pass is folded
  // into this one via a slightly larger flow contribution) — visually
  // very close, much cheaper
  vec2 warped = rot(p + flow * 0.55, swirl + uTime * 0.15);

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
    uOffset: gl.getUniformLocation(prog, 'uOffset'),
    uTime: gl.getUniformLocation(prog, 'uTime'),
    uMouse: gl.getUniformLocation(prog, 'uMouse'),
    uSurface: gl.getUniformLocation(prog, 'uSurface'),
    uIntensity: gl.getUniformLocation(prog, 'uIntensity'),
  };
}

// ── Shared clock + mouse, so every canvas (background + all surfaces)
// samples the exact same instant of the same field. ─────────────────────
export function createSwirlField() {
  const field = {
    mouse: [0, 0],
    startTime: performance.now(),
    active: false,
    opacity: 0,
    _targetOpacity: 0,
    _fadeMs: 900,
    _wakers: new Set(),
  };

  window.addEventListener('mousemove', (e) => {
    field.mouse = [e.clientX, window.innerHeight - e.clientY];
  });

  field.setActive = (on) => {
    field.active = on;
    field._targetOpacity = on ? 1 : 0;
    // Every mounted canvas stops its own rAF loop entirely once it fades
    // out (see mountSwirl below) — so turning the swirl back on has to
    // explicitly nudge each one awake again, rather than relying on a
    // loop that was never actually still running in the background.
    if (on) field._wakers.forEach((wake) => wake());
  };

  field.tick = (dtMs) => {
    const step = dtMs / field._fadeMs;
    if (field.opacity < field._targetOpacity) {
      field.opacity = Math.min(field._targetOpacity, field.opacity + step);
    } else if (field.opacity > field._targetOpacity) {
      field.opacity = Math.max(field._targetOpacity, field.opacity - step);
    }
  };

  // True whenever there's any reason to be drawing at all — actively on,
  // or mid fade-out.
  field.isLive = () => field.opacity > 0.001 || field._targetOpacity > 0;

  field.elapsed = () => (performance.now() - field.startTime) * 0.001;

  // A canvas registers a "wake" callback while it's alive but its own rAF
  // loop has stopped (fully faded out) — setActive(true) calls every
  // registered waker so the right canvases restart, without any canvas
  // having to poll in the background to find out it should turn back on.
  field.registerWaker = (fn) => {
    field._wakers.add(fn);
    return () => field._wakers.delete(fn);
  };

  return field;
}

// ── Mounts one canvas (background OR surface) into the given <canvas>
// element, driven by the shared field. Returns { destroy }. ─────────────
export function mountSwirl(canvasEl, field, opts = {}) {
  const {
    surface = false,
    baseOpacity = surface ? 0.85 : 0.4,
    intensity = surface ? 1.35 : 1.0,
    followOffset = true,
    // Background: capped device-pixel ratio (was uncapped-ish at 2x — the
    // single biggest cost on retina/high-DPI screens, since cost scales
    // with pixel count). Surfaces: small fixed backing resolution — they're
    // tiny, blended, and often blurred, so a low-res buffer upscaled by
    // the GPU looks identical but costs a fraction as much to shade.
    maxDpr = surface ? 1 : 1.25,
    surfaceMaxDim = 96,
    // Background redraws at ~30fps instead of 60 — halves shader cost for
    // motion nobody would notice the difference on. Surfaces skip this
    // (they're cheap enough after the resolution cut, and buttons benefit
    // from staying crisp/responsive to the shared clock).
    targetFps = surface ? 60 : 30,
  } = opts;

  const gl = canvasEl.getContext('webgl', {
    alpha: true,
    premultipliedAlpha: false,
    antialias: false,
    powerPreference: 'low-power',
  });
  if (!gl) { console.warn('WebGL unavailable for Balatro swirl'); return { destroy() { } }; }
  // Chrome (unlike Firefox) enforces a fairly low hard cap on how many
  // WebGL contexts can be alive at once across the whole page — and this
  // engine creates a brand new one per mounted canvas (background,
  // character aura, every "surface" button). Once that cap is hit, Chrome
  // silently EVICTS one (firing 'webglcontextlost'), which makes every
  // draw call into it a silent no-op forever unless something notices and
  // recovers. Mobile is worse on two counts: a lower cap AND far more
  // aggressive context suspension whenever the tab is backgrounded (app
  // switch, screen lock) — so the recovery path below matters even more
  // there. (An earlier version of this function also proactively released
  // each context on unmount to stop the budget from leaking as canvases
  // came and went — dropped because React.StrictMode's dev-only
  // mount→cleanup→mount on the SAME canvas made that self-inflict a
  // permanent loss; leaning on the browser's own GC to reclaim contexts
  // from canvases that are truly gone is slightly less eager but never
  // wrong.)
  const loseCtxExt = gl.getExtension('WEBGL_lose_context');
  let contextLost = gl.isContextLost();
  if (!contextLost) {
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }

  let u = contextLost ? null : buildProgram(gl);

  function onContextLost(e) {
    // Required by spec to have any chance of getting the context back —
    // without this, the browser treats the loss as permanent.
    e.preventDefault();
    contextLost = true;
    running = false;
    canvasEl.style.opacity = '0';
  }

  function onContextRestored() {
    contextLost = false;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    u = buildProgram(gl); // program/buffers were wiped by the loss, rebuild them
    lastW = 0; lastH = 0; // force resize() to actually re-apply the viewport
    resize();
    wake();
  }

  canvasEl.addEventListener('webglcontextlost', onContextLost, false);
  canvasEl.addEventListener('webglcontextrestored', onContextRestored, false);

  // Mobile browsers routinely suspend/discard WebGL resources for a
  // backgrounded tab (app switch, screen lock) far more readily than
  // desktop does, and that suspension doesn't always cleanly round-trip
  // through the standard lost/restored event pair the way a desktop GPU
  // eviction does. Belt-and-suspenders: whenever the page becomes visible
  // again, if this context is (still) marked lost, explicitly ask for it
  // back rather than just trusting an automatic restore that may not
  // reliably arrive. restoreContext() is a documented no-op if a restore
  // is already pending or unnecessary, so this is safe to call liberally.
  function onVisibilityChange() {
    if (document.visibilityState !== 'visible') return;
    if (contextLost) {
      loseCtxExt?.restoreContext();
    } else if (field.isLive()) {
      // Not lost, but a backgrounded mobile tab can also just leave the
      // rAF loop stalled without ever formally losing the context —
      // wake() is a safe no-op if it's already running.
      wake();
    }
  }
  document.addEventListener('visibilitychange', onVisibilityChange);

  let raf = null;
  let lastT = performance.now();
  let lastDrawT = 0;
  const minFrameMs = 1000 / targetFps;
  let destroyed = false;
  let running = false;
  let lastW = 0, lastH = 0;

  function resize() {
    const rect = canvasEl.getBoundingClientRect();
    let w, h;
    if (surface) {
      // Fixed small backing buffer, aspect-matched to the element, capped
      // at surfaceMaxDim on the long edge — resolution independent of DPR.
      const scale = Math.min(1, surfaceMaxDim / Math.max(rect.width, rect.height, 1));
      w = Math.max(1, Math.round(rect.width * scale));
      h = Math.max(1, Math.round(rect.height * scale));
    } else {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      w = Math.max(1, Math.round(rect.width * dpr));
      h = Math.max(1, Math.round(rect.height * dpr));
    }
    if (w !== lastW || h !== lastH) {
      canvasEl.width = w;
      canvasEl.height = h;
      lastW = w; lastH = h;
      gl.viewport(0, 0, w, h);
    }
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvasEl);
  resize();

  // The actual fix: this loop no longer reschedules itself unconditionally.
  // Previously requestAnimationFrame fired 60x/sec for the entire life of
  // the page — for the background canvas AND every "surface" button canvas
  // — even while fully invisible, since the old version always called
  // `raf = requestAnimationFrame(frame)` at the end no matter what. Now,
  // the moment the field goes fully dead (not active, fully faded out), the
  // loop just stops: no more rAF calls, no more per-frame work, nothing.
  // It only starts again when field.setActive(true) explicitly wakes it —
  // see registerWaker above — so idle time on a phone genuinely goes back
  // to being idle instead of quietly burning a frame budget forever.
  function loop(now) {
    if (destroyed) return;
    if (contextLost) { running = false; return; } // stays asleep until 'webglcontextrestored' wakes it
    const dt = now - lastT;
    lastT = now;
    field.tick(dt);

    if (!field.isLive()) {
      running = false;
      canvasEl.style.opacity = '0';
      return; // no reschedule — asleep until woken
    }

    if (now - lastDrawT < minFrameMs) {
      canvasEl.style.opacity = String(field.opacity * baseOpacity);
      raf = requestAnimationFrame(loop);
      return;
    }
    lastDrawT = now;

    resize(); // cheap no-op unless size actually changed

    let offX = 0, offY = 0;
    let resW = canvasEl.width, resH = canvasEl.height;
    if (surface && followOffset) {
      const rect = canvasEl.getBoundingClientRect();
      // Map this canvas's low-res backing buffer back into the SAME
      // field-space scale as the background (window inner size), so the
      // pattern still lines up despite the smaller buffer.
      const scaleX = canvasEl.width / Math.max(rect.width, 1);
      const scaleY = canvasEl.height / Math.max(rect.height, 1);
      offX = rect.left * scaleX;
      offY = (window.innerHeight - rect.bottom) * scaleY;
      resW = window.innerWidth * scaleX;
      resH = window.innerHeight * scaleY;
    }

    gl.uniform2f(u.uGlobalRes, resW, resH);
    gl.uniform2f(u.uOffset, offX, offY);
    gl.uniform1f(u.uTime, field.elapsed());
    gl.uniform2f(u.uMouse, field.mouse[0] * (resW / window.innerWidth), field.mouse[1] * (resH / window.innerHeight));
    gl.uniform1f(u.uSurface, surface ? 1 : 0);
    gl.uniform1f(u.uIntensity, intensity);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    canvasEl.style.opacity = String(field.opacity * baseOpacity);

    raf = requestAnimationFrame(loop);
  }

  function wake() {
    if (running || destroyed || contextLost) return;
    running = true;
    lastT = performance.now();
    raf = requestAnimationFrame(loop);
  }

  const unregisterWaker = field.registerWaker(wake);

  // Only actually start the loop if there's already a reason to be live —
  // e.g. this canvas mounted mid-fade, or after the field was already
  // turned on. Otherwise it stays fully idle until setActive(true) wakes
  // it, rather than running one perpetual "is anything happening?" loop.
  if (field.isLive()) wake();

  return {
    destroy() {
      destroyed = true;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      unregisterWaker();
      canvasEl.removeEventListener('webglcontextlost', onContextLost, false);
      canvasEl.removeEventListener('webglcontextrestored', onContextRestored, false);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      // Deliberately NOT calling WEBGL_lose_context.loseContext() here —
      // see the note above. The browser reclaims the context on its own
      // once this canvas is actually garbage collected.
    },
  };
}
