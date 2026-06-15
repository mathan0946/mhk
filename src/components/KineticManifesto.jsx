import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './KineticManifesto.css'

const PHRASES = [
  { count: '01', big: 'I SHIP', tail: 'THINGS.', sub: '30+ public repos. No vaporware.' },
]

/* A pinned, scroll-driven kinetic-typography section.
   Outer height = N × 100vh; inner sticks while phrases swap. */
export default function KineticManifesto() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Background slab translates with scroll for parallax depth
  const slabY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const lineX = useTransform(scrollYProgress, [0, 1], ['-10%', '110%'])
  const progressW = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={ref}
      className="kinetic"
      style={{ height: `${PHRASES.length * 55 + 70}vh` }}
      aria-label="Manifesto"
    >
      <div className="kinetic__sticky">
        {/* Background slab + sweeping rule line */}
        <motion.div className="kinetic__slab" style={{ y: slabY }} aria-hidden />
        <motion.div className="kinetic__sweep" style={{ x: lineX }} aria-hidden />

        {/* Top HUD */}
        <div className="kinetic__hud">
          <span className="kinetic__hud-label">MANIFESTO</span>
          <div className="kinetic__hud-bar"><motion.span style={{ width: progressW }} /></div>
          <span className="kinetic__hud-count">{String(PHRASES.length).padStart(2, '0')}</span>
        </div>

        {/* Phrases — each holds for its slice with a short crossfade at the boundary.
            First phrase starts already visible; last phrase holds until the very end. */}
        {PHRASES.map((p, i) => {
          const slot = 1 / PHRASES.length
          const isFirst = i === 0
          const isLast = i === PHRASES.length - 1
          const fade = 0.03
          const entryFade = 0.05
          const holdStart = i * slot
          const holdEnd = (i + 1) * slot
          // Out finishes before In begins so the two never visibly overlap.
          const inStart = isFirst ? 0 : holdStart
          const inEnd = isFirst ? entryFade : holdStart + fade
          const outStart = isLast ? 1 : holdEnd - fade
          const outEnd = isLast ? 1 : holdEnd
          return (
            <Phrase
              key={i}
              data={p}
              progress={scrollYProgress}
              inStart={inStart}
              inEnd={inEnd}
              outStart={outStart}
              outEnd={outEnd}
              isFirst={isFirst}
              isLast={isLast}
            />
          )
        })}

        {/* Persistent scroll cue */}
        <div className="kinetic__cue" aria-hidden>
          <span className="kinetic__cue-arrow">↓</span>
          <span>KEEP SCROLLING</span>
        </div>
      </div>
    </section>
  )
}

function Phrase({ data, progress, inStart, inEnd, outStart, outEnd, isFirst, isLast }) {
  // First phrase gets a real entry (opacity 0→1, slight slide) — just compressed in time.
  const opacity = useTransform(
    progress,
    [inStart, inEnd, outStart, outEnd],
    [0, 1, 1, isLast ? 1 : 0]
  )
  const scale = useTransform(
    progress,
    [inStart, inEnd, outStart, outEnd],
    [isFirst ? 0.92 : 0.82, 1, 1, isLast ? 1 : 1.18]
  )
  const y = useTransform(
    progress,
    [inStart, inEnd, outStart, outEnd],
    [isFirst ? '4vh' : '6vh', '0vh', '0vh', isLast ? '0vh' : '-6vh']
  )
  const blur = useTransform(
    progress,
    [inStart, inEnd, outStart, outEnd],
    [isFirst ? 4 : 4, 0, 0, isLast ? 0 : 4]
  )
  const filter = useTransform(blur, (b) => `blur(${b}px)`)
  const tailX = useTransform(
    progress,
    [inStart, inEnd, outStart, outEnd],
    [isFirst ? '3vw' : '6vw', '0vw', '0vw', isLast ? '0vw' : '-6vw']
  )

  return (
    <motion.div className="kinetic__phrase" style={{ opacity, filter }}>
      <motion.span className="kinetic__count" style={{ y }}>{data.count}</motion.span>
      <motion.h2 className="kinetic__big" style={{ scale, y }}>
        <span className="kinetic__big-head">{data.big}</span>
        <motion.span className="kinetic__big-tail" style={{ x: tailX }}>
          {data.tail}
        </motion.span>
      </motion.h2>
      <motion.p className="kinetic__sub" style={{ y }}>{data.sub}</motion.p>
    </motion.div>
  )
}
