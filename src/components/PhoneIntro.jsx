import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import './PhoneIntro.css'

/**
 * Scroll-driven cinematic intro.
 *
 * Phase 1 (0–30%)   portrait phone floats; aurora wallpaper + lock screen.
 * Phase 2 (30–70%)  phone pivots to landscape, scales up, bezel dissolves,
 *                   lock screen fades out, website fades in.
 * Phase 3 (70–100%) phone is gone — the website fills the viewport.
 *
 * The section is 500vh tall and its inner stage is sticky so scroll progress
 * drives the morph. Swap the contents of #website-content for your real site.
 */
export default function PhoneIntro() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Smooth out Lenis' fractional updates for buttery transforms.
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })

  // ---- phase 1: floating portrait
  const floatY = useTransform(p, [0, 0.3], [0, -10])
  const hintOpacity = useTransform(p, [0, 0.08], [1, 0])

  // ---- phase 2: rotate + scale + bezel dissolve
  // Rotate to landscape, then keep scaling so the screen fills the viewport.
  const rotate = useTransform(p, [0.3, 0.7], [0, -90])
  const scale = useTransform(
    p,
    [0, 0.3, 0.7, 1],
    [1, 1.04, 3.4, 5.2]
  )

  // Bezel: thickness, radius and shadow all dissolve through phase 2.
  const bezelOpacity = useTransform(p, [0.4, 0.7], [1, 0])
  const bezelRadius = useTransform(p, [0.4, 0.72], [44, 0])
  const bezelInset = useTransform(p, [0.4, 0.72], [10, 0])
  const shadowOpacity = useTransform(p, [0.35, 0.7], [1, 0])
  const notchOpacity = useTransform(p, [0.35, 0.55], [1, 0])

  // ---- screen content crossfade
  // Site fade is delayed until the phone is nearly in landscape, so the
  // pre-rotated website doesn't appear at a weird angle during the spin.
  const lockOpacity = useTransform(p, [0.3, 0.55], [1, 0])
  const siteOpacity = useTransform(p, [0.62, 0.78], [0, 1])

  // ---- aurora background fades as phone takes over
  const bgOpacity = useTransform(p, [0.55, 0.85], [1, 0])

  // Live clock for the lock screen.
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 15)
    return () => clearInterval(id)
  }, [])
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  const date = now.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <section className="phone-intro" ref={sectionRef} aria-label="Intro animation">
      <div className="phone-intro__sticky">
        <motion.div className="phone-intro__bg" style={{ opacity: bgOpacity }} aria-hidden>
          <span className="phone-intro__aurora phone-intro__aurora--a" />
          <span className="phone-intro__aurora phone-intro__aurora--b" />
          <span className="phone-intro__aurora phone-intro__aurora--c" />
          <span className="phone-intro__grain" />
        </motion.div>

        <motion.div
          className="phone-intro__stage"
          style={{ rotate, scale, y: floatY }}
        >
          <motion.div
            className="phone-intro__shadow"
            style={{ opacity: shadowOpacity }}
            aria-hidden
          />

          <div className="phone-intro__phone">
            <motion.div
              className="phone-intro__bezel"
              style={{
                opacity: bezelOpacity,
                borderRadius: bezelRadius,
                inset: bezelInset,
              }}
              aria-hidden
            />

            <motion.div
              className="phone-intro__notch"
              style={{ opacity: notchOpacity }}
              aria-hidden
            />

            <div className="phone-intro__screen">
              {/* Lock screen + wallpaper */}
              <motion.div className="phone-intro__lock" style={{ opacity: lockOpacity }}>
                <div id="wallpaper" className="phone-intro__wallpaper" aria-hidden>
                  <span className="phone-intro__wall phone-intro__wall--a" />
                  <span className="phone-intro__wall phone-intro__wall--b" />
                  <span className="phone-intro__wall phone-intro__wall--c" />
                </div>
                <div className="phone-intro__lock-content">
                  <div className="phone-intro__status">
                    <span>{time}</span>
                    <span className="phone-intro__signal">
                      <i /><i /><i /><i />
                    </span>
                  </div>
                  <div className="phone-intro__time">{time}</div>
                  <div className="phone-intro__date">{date}</div>
                  <div className="phone-intro__lock-foot">
                    <span className="phone-intro__flash" aria-hidden>⚡</span>
                    <span className="phone-intro__camera" aria-hidden>◉</span>
                  </div>
                  <div className="phone-intro__home-indicator" aria-hidden />
                </div>
              </motion.div>

              {/* Website preview (this is what you swap for the real site) */}
              <motion.div
                id="website-content"
                className="phone-intro__site"
                style={{ opacity: siteOpacity }}
              >
                <div className="phone-intro__site-nav">
                  <span className="phone-intro__site-logo">mathan.dev</span>
                  <span className="phone-intro__site-links">
                    <span>work</span>
                    <span>about</span>
                    <span>contact</span>
                  </span>
                </div>
                <div className="phone-intro__site-hero">
                  <span className="phone-intro__site-badge">
                    <i /> AI / ML Engineer
                  </span>
                  <h2 className="phone-intro__site-headline">
                    I teach machines to <em>see, read, and reason</em> about the messy real world.
                  </h2>
                  <p className="phone-intro__site-sub">
                    Scroll to continue ↓
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="phone-intro__hint"
          style={{ opacity: hintOpacity }}
          aria-hidden
        >
          <span>scroll</span>
          <span className="phone-intro__hint-line" />
        </motion.div>
      </div>
    </section>
  )
}
