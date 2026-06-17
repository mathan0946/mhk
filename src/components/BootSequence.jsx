import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './BootSequence.css'

const LINES = [
  '> handshake / portfolio.kernel ............ ok',
  '> mounting /30+ projects .................. ok',
  '> calibrating cursor ...................... ok',
  '> warming manifesto.txt ................... ok',
  '> ready_',
]

const DURATION = 2400 // ms — total counting time
const HEX = Array.from({ length: 60 }, (_, i) =>
  ((i * 53 + 19) & 0xff).toString(16).padStart(2, '0').toUpperCase()
)

const pad = (n) => String(n).padStart(3, '0')

export default function BootSequence({ onComplete }) {
  const [count, setCount] = useState(0)
  const [visibleLines, setVisibleLines] = useState(0)
  const [glitch, setGlitch] = useState(false)
  const [open, setOpen] = useState(true)
  const [ready, setReady] = useState(false)
  const startRef = useRef(0)

  // Freeze scroll + hide chrome (nav/footer) while booting
  useEffect(() => {
    const lenis = window.__lenis
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.body.classList.add('is-booting')
    lenis?.stop?.()
    return () => {
      document.body.style.overflow = prev
      document.body.classList.remove('is-booting')
      lenis?.start?.()
    }
  }, [])

  // Counter (easeOutCubic) + type-on line reveal
  useEffect(() => {
    let raf = 0
    startRef.current = performance.now()
    const tick = (t) => {
      const elapsed = t - startRef.current
      const p = Math.min(1, elapsed / DURATION)
      const eased = 1 - Math.pow(1 - p, 3)
      const n = Math.floor(eased * 100)
      setCount(n)
      setVisibleLines(Math.min(LINES.length, Math.floor((n / 100) * LINES.length) + (n >= 100 ? 1 : 0)))
      if (p < 1) raf = requestAnimationFrame(tick)
      else {
        setCount(100)
        setVisibleLines(LINES.length)
        setGlitch(true)
        // Glitch settles, then expose the click-to-enter affordance.
        setTimeout(() => {
          setGlitch(false)
          setReady(true)
        }, 520)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Press Enter / Space to dismiss as an alternative to clicking.
  useEffect(() => {
    if (!ready) return
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [ready])

  const onExitComplete = () => onComplete?.()

  // Tens scramble during the run for that broken-terminal feel
  const display = pad(count)

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {open && (
        <motion.div
          className={`boot${glitch ? ' boot--glitch' : ''}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.7, 0, 0.3, 1] }}
          role="status"
          aria-live="polite"
        >
          {/* Layered FX */}
          <span className="boot__grid" aria-hidden />
          <span className="boot__noise" aria-hidden />
          <span className="boot__scan" aria-hidden />
          <span className="boot__vignette" aria-hidden />

          {/* Minimal animated centerpiece — concentric rings + crosshair */}
          <div className="boot__orb" aria-hidden>
            <span className="boot__orb-ring boot__orb-ring--1" />
            <span className="boot__orb-ring boot__orb-ring--2" />
            <span className="boot__orb-ring boot__orb-ring--3" />
            <span className="boot__orb-core" />
            <span className="boot__orb-cross boot__orb-cross--h" />
            <span className="boot__orb-cross boot__orb-cross--v" />
            <span className="boot__orb-arc boot__orb-arc--1" />
            <span className="boot__orb-arc boot__orb-arc--2" />
          </div>

          {/* Counter — moves to the side so it doesn't overlap the model */}
          <motion.div
            className="boot__center"
            exit={{ scale: 0.1, opacity: 0, filter: 'blur(8px)' }}
            animate={ready ? { opacity: 0, scale: 0.85 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
          >
            <div className="boot__count" data-text={display}>
              <span className="boot__count-outline">{display}</span>
              <span
                className="boot__count-fill"
                style={{ clipPath: `inset(${100 - count}% 0 0 0)` }}
              >
                {display}
              </span>
              <span className="boot__count-suffix">%</span>
            </div>
          </motion.div>

          {/* Click-to-enter — appears once boot completes */}
          <AnimatePresence>
            {ready && (
              <motion.button
                key="enter"
                type="button"
                className="boot__enter"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                click to enter
              </motion.button>
            )}
          </AnimatePresence>

          {/* Minimal progress rail — only while loading */}
          {!ready && (
            <div className="boot__bar">
              <div className="boot__bar-fill" style={{ width: `${count}%` }} />
            </div>
          )}

          {/* End-of-boot flash */}
          {glitch && <span className="boot__flash" aria-hidden />}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
