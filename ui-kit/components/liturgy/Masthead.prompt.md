The full-bleed opening of a daily office — a solid colour-of-the-day block with the date, the office name (the centred page heading) and the appointed readings, and a vector stained-glass mosaic fading up from its foot.

```jsx
const { Masthead } = CommonPrayerDesignSystem;

// Follows the season automatically (fill = current --accent):
<div style={{ height: '100%', overflowY: 'auto' }}>
  <Masthead
    office="Evening Prayer"
    date="Monday, 6 July"
    readings={['Psalm 141', 'Luke 1']}
    colors={eveningGlassPalette}   // light → deep tiles
  />
  {/* office sections scroll up from beneath */}
</div>
```

- **Fills its container's height.** Put it first inside a scroll area; the reading content flows up underneath the mosaic.
- **Colour.** `fill` / `textColor` default to the live `--accent` / `--text-on-accent`, so it re-colours with the season. To pin a colour, pass explicit `fill` + `textColor` and a matching `colors` palette.
- **The mosaic** is a deterministic vector stained-glass band (stable per `seed`); it fades up into the colour block so the text reads over solid colour. Omit `colors` for a plain block.
- **children** render under the readings line (e.g. an author byline).
- Presentational — no internal navigation or player; compose those around it.
