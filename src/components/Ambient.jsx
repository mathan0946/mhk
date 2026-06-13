import { useEffect, useRef } from 'react'

/**
 * 3D-feel animated background. Renders to a canvas:
 *   - a slowly rotating wireframe sphere of nodes
 *   - drifting parallax particles in the depth field
 *   - subtle connecting lines between close nodes
 * Cursor moves the camera; scroll tilts the world.
 * No external 3D library — projected by hand.
 */
export default function Ambient() {
  const canvasRef = useRef(null)
  const stateRef = useRef({
    w: 0, h: 0, dpr: 1,
    mouseX: 0, mouseY: 0,
    targetMX: 0, targetMY: 0,
    scrollY: 0,
    t: 0,
    nodes: [],
    stars: [],
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    const s = stateRef.current

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Fibonacci sphere — well-distributed points on a unit sphere
    const NODE_COUNT = 220
    s.nodes = []
    const phi = Math.PI * (Math.sqrt(5) - 1)
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = phi * i
      s.nodes.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r })
    }

    // Drifting star/particle field (z in [0.2, 1])
    const STAR_COUNT = 180
    s.stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: 0.2 + Math.random() * 0.8,
      vy: 0.0004 + Math.random() * 0.0012,
    }))

    const resize = () => {
      s.dpr = Math.min(window.devicePixelRatio || 1, 2)
      s.w = window.innerWidth
      s.h = window.innerHeight
      canvas.width = s.w * s.dpr
      canvas.height = s.h * s.dpr
      canvas.style.width = s.w + 'px'
      canvas.style.height = s.h + 'px'
      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e) => {
      s.targetMX = (e.clientX / window.innerWidth) * 2 - 1
      s.targetMY = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    const onScroll = () => { s.scrollY = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    let raf = 0
    const render = () => {
      s.t += reduced ? 0.0008 : 0.003
      // smooth the camera
      s.mouseX += (s.targetMX - s.mouseX) * 0.06
      s.mouseY += (s.targetMY - s.mouseY) * 0.06

      ctx.clearRect(0, 0, s.w, s.h)

      const cx = s.w / 2
      const cy = s.h / 2
      const radius = Math.min(s.w, s.h) * 0.42

      // ---- particle/star field ----
      for (let i = 0; i < s.stars.length; i++) {
        const st = s.stars[i]
        st.y += st.vy
        if (st.y > 1) st.y = -1
        const px = cx + st.x * cx * 0.95 + s.mouseX * 30 * st.z
        const py = cy + st.y * cy * 0.95 + s.mouseY * 30 * st.z - s.scrollY * 0.15 * st.z
        const size = (1 - st.z) * 1.6 + 0.3
        const alpha = (1 - st.z) * 0.7 + 0.1
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
        ctx.fillRect(px, py, size, size)
      }

      // ---- rotating wireframe sphere ----
      const scrollTilt = Math.min(s.scrollY / 2000, 1) * 0.6
      const rotY = s.t + s.mouseX * 0.6
      const rotX = -0.35 + s.mouseY * 0.4 + scrollTilt
      const sy = Math.sin(rotY), cyR = Math.cos(rotY)
      const sx = Math.sin(rotX), cxR = Math.cos(rotX)

      const proj = new Array(s.nodes.length)
      const FOCAL = 2.3
      for (let i = 0; i < s.nodes.length; i++) {
        const n = s.nodes[i]
        // rotate around Y
        let X = n.x * cyR - n.z * sy
        let Z = n.x * sy + n.z * cyR
        // rotate around X
        let Y = n.y * cxR - Z * sx
        Z = n.y * sx + Z * cxR
        // perspective
        const f = FOCAL / (FOCAL + Z)
        const px = cx + X * radius * f
        const py = cy + Y * radius * f - s.scrollY * 0.08
        proj[i] = { x: px, y: py, depth: (Z + 1) * 0.5, f }
      }

      // connecting lines
      ctx.lineWidth = 0.6
      for (let i = 0; i < proj.length; i++) {
        const a = proj[i]
        for (let j = i + 1; j < proj.length; j++) {
          const b = proj[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < 9000) {
            const alpha = (1 - d2 / 9000) * 0.22 * Math.min(a.depth, b.depth)
            if (alpha < 0.01) continue
            ctx.strokeStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // nodes
      for (let i = 0; i < proj.length; i++) {
        const p = proj[i]
        const size = 1.2 + p.f * 1.8
        const alpha = 0.3 + p.depth * 0.7
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="ambient" aria-hidden>
      <canvas ref={canvasRef} className="ambient__canvas" />
      <div className="ambient__grid" />
      <div className="ambient__scan" />
      <div className="ambient__vignette" />
    </div>
  )
}
