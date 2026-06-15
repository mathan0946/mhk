import { useEffect } from 'react'
import Lenis from 'lenis'

/* Site-wide smooth scroll. Exposes the instance on window.__lenis
   so route changes / hash navigation can drive it directly.
   Honors prefers-reduced-motion. */

export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.4,
      wheelMultiplier: 1.0,
    })

    window.__lenis = lenis

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return null
}
