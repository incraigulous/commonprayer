A vector stained-glass panel — a deterministic jittered quad mesh tinted from `colors`, leaded with a dark join, whose panes optionally shimmer on slow, staggered cycles (like light through old glass).

```jsx
const { Mosaic } = CommonPrayerDesignSystem;

<div style={{ height: 160, overflow: 'hidden' }}>
  <Mosaic colors={['#ecd79c', '#d3ad5c', '#a9843a', '#8a6b2e']} />
</div>
```

- **Fills its container** (`width:100%; height:100%`). Size, clip or mask it from the parent — e.g. a fade `mask-image` so it dissolves into a colour block (see `Masthead`).
- **colors** — light → deep tiles; tiles are picked deterministically per `seed`, so the pattern is stable across renders.
- **animate** (default `true`) — each pane shimmers on its own 4.5–8.5s cycle with a random delay; automatically stilled under `prefers-reduced-motion`. Pass `animate={false}` for a static panel.
- **cols / rows** set the tile density; **lead** sets the join colour.
- Presentational and decorative (`aria-hidden`).
