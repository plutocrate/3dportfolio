import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// ─────────────────────────────────────────────────────────────────────────────
// LAVA SMOKE — volumetric cloud tendrils drifting from top-right toward model
// Built from many overlapping blurred divs animated independently.
// Each "puff" is a blurred radial-gradient blob that moves, scales, and fades.
// ─────────────────────────────────────────────────────────────────────────────

// Individual smoke puff config
const PUFFS = [
  // Core bright source — stays near corner
  { w: 320, h: 280, top: -60,  right: -40,  blur: 55,  opacity: 0.55, color: 'rgba(255,90,10,0.7)',   dur: 7,  delay: 0    },
  { w: 220, h: 200, top: -30,  right: 20,   blur: 40,  opacity: 0.45, color: 'rgba(255,60,5,0.6)',    dur: 9,  delay: 0.4  },
  // Mid tendrils — reach down-left toward model
  { w: 380, h: 220, top: 30,   right: -20,  blur: 70,  opacity: 0.30, color: 'rgba(200,50,5,0.5)',    dur: 11, delay: 0.8  },
  { w: 280, h: 180, top: 80,   right: 60,   blur: 60,  opacity: 0.28, color: 'rgba(180,40,0,0.45)',   dur: 8,  delay: 1.2  },
  { w: 500, h: 160, top: 120,  right: -80,  blur: 90,  opacity: 0.18, color: 'rgba(160,35,0,0.35)',   dur: 14, delay: 0.6  },
  // Far tendrils — faint wisps reaching toward center
  { w: 600, h: 120, top: 180,  right: -150, blur: 110, opacity: 0.12, color: 'rgba(130,28,0,0.28)',   dur: 16, delay: 1.0  },
  { w: 420, h: 100, top: 240,  right: -100, blur: 95,  opacity: 0.09, color: 'rgba(110,22,0,0.22)',   dur: 13, delay: 1.8  },
  { w: 700, h: 80,  top: 300,  right: -200, blur: 130, opacity: 0.06, color: 'rgba(90,18,0,0.18)',    dur: 18, delay: 2.2  },
  // Accent hot spots — bright small cores scattered in cloud
  { w: 140, h: 130, top: 10,   right: 80,   blur: 30,  opacity: 0.50, color: 'rgba(255,140,30,0.75)', dur: 5,  delay: 0.2  },
  { w: 100, h: 90,  top: 60,   right: 140,  blur: 25,  opacity: 0.38, color: 'rgba(255,120,20,0.65)', dur: 4,  delay: 0.9  },
  { w: 160, h: 120, top: -10,  right: 160,  blur: 35,  opacity: 0.40, color: 'rgba(255,100,10,0.60)', dur: 6,  delay: 0.3  },
]

function SmokePuff({ cfg, index }) {
  const ref = useRef()

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    // Fade in staggered
    gsap.fromTo(el,
      { opacity: 0, scale: 0.75 },
      { opacity: cfg.opacity, scale: 1, duration: 2.2, ease: 'power2.out', delay: 1.6 + cfg.delay }
    )

    // Continuous drift — each puff moves slightly differently
    // Direction: generally left and slightly down (toward model = center-left)
    const driftX = -(18 + index * 4 + Math.random() * 12)  // rightward negative = leftward
    const driftY =  (6  + index * 2 + Math.random() * 8)   // downward

    gsap.to(el, {
      x: driftX,
      y: driftY,
      duration: cfg.dur,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    // Breathe — scale pulse
    gsap.to(el, {
      scaleX: 1.08 + Math.random() * 0.06,
      scaleY: 1.04 + Math.random() * 0.04,
      duration: cfg.dur * 0.7,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: cfg.delay * 0.5,
    })

    // Slow opacity pulse — lava flicker
    gsap.to(el, {
      opacity: cfg.opacity * (0.6 + Math.random() * 0.3),
      duration: cfg.dur * 0.45,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: cfg.delay,
    })
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top:    cfg.top,
        right:  cfg.right,
        width:  cfg.w,
        height: cfg.h,
        borderRadius: '50%',
        background: `radial-gradient(ellipse at 50% 50%, ${cfg.color}, transparent 70%)`,
        filter: `blur(${cfg.blur}px)`,
        opacity: 0,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        willChange: 'transform, opacity',
      }}
    />
  )
}

export function LavaSwirl({ visible }) {
  const wrapRef = useRef()

  useEffect(() => {
    if (!visible || !wrapRef.current) return
    // Whole system fades in after boot
    gsap.fromTo(wrapRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.8, ease: 'power2.out', delay: 1.2 }
    )
  }, [visible])

  if (!visible) return null

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 11,
        opacity: 0,
        // Hard clip to right side so smoke never bleeds past center
        clipPath: 'inset(0 0 0 38%)',
      }}
    >
      {PUFFS.map((cfg, i) => (
        <SmokePuff key={i} cfg={cfg} index={i} />
      ))}
    </div>
  )
}
