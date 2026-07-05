# Portfolio — In-Progress Notes

Date paused: 2026-06-13
Branch: master (uncommitted changes)

## What's already shipped this session

1. **Infineon internship added** to `src/data/content.js`:
   - New top entry in `journey` array (period: `Jul 2026 — Jun 2027`, with `now: true` badge moved here from B.Tech entry).
   - Hero `intro` paragraph updated to mention the 11-month internship.
   - New `achievements` card "Infineon, incoming".
   - New `stats` tile in hero: `{ value: '11mo', label: 'Infineon internship · Jul '26' }` — the existing Counter component parses `11mo` as 11 + suffix and animates.

2. **Lusion.co-inspired upgrades — planned 5 moves**:
   1. WebGL distorted sphere behind hero portrait (started, see below)
   2. Shader-displaced project thumbnails on hover
   3. Intro loader with curtain reveal
   4. Bottom-fixed HUD strip (scroll % / section / time)
   5. ASCII/halftone overlay on portrait hover

## ✅ DONE: Lusion move #1 — WebGL hero sphere

Wired up and building clean. Pointer ref shared with the spotlight, canvas mounted behind content (`z-index: 0`, screen blend at 55% opacity), hidden under `prefers-reduced-motion`, dimmed on mobile. Bundle grew to ~1.3 MB (~370 KB gz) — three.js is the heavyweight. **Follow-up**: lazy-load `HeroSphere` via `React.lazy` so the sphere doesn't block first paint on slow connections.

### Original step-by-step (kept for reference)

**Done:**
- `npm install three @react-three/fiber @react-three/drei` — installed.
- `src/components/HeroSphere.jsx` — created. Noise-distorted icosahedron via `MeshDistortMaterial`, B&W palette, reacts to a `pointer` ref (rotation tilt + distort/speed scale with cursor energy), slow autonomous drift, breathing scale.
- `src/components/Hero.jsx` — added the `import HeroSphere from './HeroSphere'` line. **Component not yet mounted in JSX.**

**To finish (pick up here):**

### Step A — wire pointer + mount the canvas
In `src/components/Hero.jsx`:

1. Inside the `Hero` function, add a normalized-pointer ref next to `heroRef`:
   ```js
   const pointer = useRef({ x: 0, y: 0 })
   ```

2. In `onMove`, also update the normalized pointer (range roughly -1..1):
   ```js
   pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1
   pointer.current.y = -(((e.clientY - r.top) / r.height) * 2 - 1)
   ```

3. Mount the sphere right after `<div className="hero__spotlight" aria-hidden />`:
   ```jsx
   <HeroSphere pointer={pointer} />
   ```

### Step B — CSS for the canvas
Add to `src/components/Hero.css` (anywhere after `.hero__spotlight` block):

```css
.hero__sphere {
  position: absolute !important;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.55;
  mix-blend-mode: screen;
}
@media (max-width: 720px) {
  .hero__sphere { opacity: 0.35; }
}
@media (prefers-reduced-motion: reduce) {
  .hero__sphere { display: none; }
}
```

Notes:
- `mix-blend-mode: screen` keeps the sphere from muddying the dark background and lets it glow softly.
- Opacity dialed back so it sits *behind* the portrait/copy, not competing.
- Reduced-motion users get no canvas at all.

### Step C — verify
- `npm run dev` and confirm the sphere renders behind the hero, drifts on its own, and tilts toward the cursor.
- Check there's no z-index fight with `.hero__grid` (which is already `z-index: 1`).
- If the sphere feels too loud, drop opacity to 0.4 or shrink `args={[1.2, 64]}` in HeroSphere.jsx.
- If perf is bad on low-end devices, lower `dpr` to `[1, 1.4]` and drop the second directional light.

## Next moves after #1 lands

- **#3 Intro loader** is the cheapest follow-up — pure DOM, ~30 lines of Framer Motion. Lives in `App.jsx` above the routes, counts 0→100, then a vertical mask slides up.
- **#4 Bottom HUD** is also DOM-only — small mono row reading `scroll % · current section · local time`. Use IntersectionObservers on each section to track which is active.
- **#2 Shader thumbnails** is the heaviest — one WebGL canvas per Work card with a displacement shader. Save for last.

## Files touched this session

- `src/data/content.js` — Infineon edits (intro, journey, achievements, stats)
- `src/components/HeroSphere.jsx` — NEW
- `src/components/Hero.jsx` — added import only
- `package.json` / `package-lock.json` — added three + @react-three/fiber + @react-three/drei

## Future plan — bigger picture

### Near-term (this branch, next 1–2 sessions)
- Finish Lusion move #1 (Steps A–C above) and ship the WebGL hero sphere.
- Add Lusion move #3 (intro loader / curtain reveal) — sets tone in the first 2 seconds.
- Add Lusion move #4 (bottom HUD strip: scroll % · section · local time) — pure DOM, cheap.
- Quick pass on mobile: make sure the sphere doesn't tank perf on low-end Android (test on Lighthouse mobile preset).

### Mid-term (next 2–3 weeks, before joining Infineon)
- Lusion move #2 — shader-displaced project thumbnails (RGB-shift / wave on hover). Heaviest move, save for last.
- Lusion move #5 — ASCII/halftone overlay on portrait hover. Self-contained, no perf risk.
- Add a **Now / Reading / Listening** mini-block in the footer or aside — keeps the site feeling alive between major updates.
- SEO + OG: write a proper `<meta>` block, OG image (auto-generated from hero), structured-data Person schema.
- Lighthouse: target 95+ on Performance, Accessibility, Best Practices, SEO. The sphere is the main risk; gate it behind `prefers-reduced-motion` and a small-screen check.
- Write 1–2 long-form **case study** pages for the top projects (DermaQ, Voice of Every Learner) — the current `/archive` is breadth; case studies show depth.

### Post-internship-start (Jul 2026 onward)
- Add a **/notes** or **/log** route — short engineering posts from the Infineon work (whatever's shareable; respect NDA).
- Convert the journey timeline so the Infineon entry can grow detail over time (sub-points / month markers) without becoming a wall of text.
- Update `profile.role` from "AI / ML Engineer" to something that reflects the actual Infineon team scope once known (silicon-ML, embedded-AI, etc.).
- Swap the hero badge from "Infineon-bound · Jul '26" to "At Infineon · Bengaluru" once started.
- Plan the **next portfolio rewrite** for graduation (2027) — by then this site will be ~15 months old and the internship work will be the centerpiece, not a footnote.

### Stretch / wishlist
- 3D scene route (`/lab` or `/play`) — a single page that goes full Lusion: shader playground, scroll-driven scene, fully WebGL. Sandbox for techniques without risking the main portfolio's polish.
- Custom domain + email forwarder so recruiters see `hi@mhokesh.dev` instead of gmail.
- Light-mode variant — current site is dark-only; a toggle would broaden first-impression appeal in slides/decks.
- Replace placeholder portrait with a properly-shot one (B&W, matching the site's grading) before recruiter season.
- Open-graph card per project so shared links don't fall back to the generic hero.
