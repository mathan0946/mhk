# Mhokesh P — Portfolio

A premium, editorial-feeling portfolio for a Computer Science and AI student.
Deliberately avoids the usual AI-portfolio clichés (dark mode, neon, animated grids,
particles). Instead: warm paper tones, a single clay accent, serif display type, and
whitespace as the primary design element.

## Design direction
- **Palette:** cream paper (`--paper`) + ink + one warm clay accent. No gradients-as-decoration, no dark mode.
- **Type:** Fraunces (display serif), Inter (body), JetBrains Mono (technical labels).
- **Motion:** Framer Motion — staged hero reveal, scroll-linked parallax on project visuals,
  expand-on-hover skill layers, scroll progress bar. All respect `prefers-reduced-motion`.

## Sections
1. **Hero** — typographic manifesto + asymmetric identity rail + a "7th among 10,000+" signal stat.
2. **Work** — three projects, each an alternating asymmetric spread with a generative,
   domain-themed CSS visual (sensor field / document / pixel grid) and parallax.
3. **Journey** — a "now"-anchored timeline spine with achievement notes offset to one side.
4. **Skills** — grouped by the *role they play in a system* (intelligence → generation → shipping),
   as interactive expandable layers rather than a tag cloud or bars.
5. **Contact** — dark closing panel with a warm glow and the resume's contact details.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # preview the build
```

## Editing content
All copy lives in `src/data/content.js` — one source of truth for profile, projects,
journey, achievements, and skill clusters. No need to touch components to update text.

## Stack
React 19 · Vite · Framer Motion · hand-written CSS (no UI framework).
