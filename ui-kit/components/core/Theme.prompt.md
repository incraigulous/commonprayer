Sets the `data-theme` / `data-season` attributes (and `--reading-scale`) that every other component in the kit reads its colours and reading size from — a nestable stand-in for what the app does by hand on `<html>`.

```jsx
const { Theme, Masthead, Button } = CommonPrayerDesignSystem;

<Theme theme="dark" season="advent" size="lg">
  {/* everything in here sees the Advent violet --accent, dark surfaces,
      and a 1.15x reading scale — no manual data-* attributes needed */}
  <Masthead office="Evening Prayer" date="December 6" readings={['Psalm 141']} />
  <Button variant="primary">Begin</Button>
</Theme>
```

- **It's just attributes.** `tokens/colors.css` keys dark/light off `data-theme`, and `tokens/seasons.css` keys the seven liturgical seasons off `data-season` — both are plain CSS attribute selectors, so any element carrying them recolours everything beneath it. Theme is a convenience wrapper for setting both (plus `--reading-scale`) on one element, not a new colour system.
- **`theme="system"`** (the default) sets `data-theme="auto"`, which rides the `[data-theme="auto"] { @media (prefers-color-scheme...) }` block already in `tokens/colors.css` — no `matchMedia` listener needed.
- **`season`** takes one resolved id (`advent` · `christmas` · `epiphany` · `lent` · `easter` · `pentecost` · `ordinary`). Omit it for the base rubric-red accent. Theme does **not** resolve the calendar or time-of-day itself — use `timeOfDaySeason()` from `DisplayMenu`, or your own liturgical calendar, then pass the result in. Same convention as `DisplayMenu` and `Masthead`.
- **Nestable.** Wrap the whole app once at the root, or wrap just a card/section to preview a different season/theme/size inline (this is how the seasonal comparisons in Storybook work).
- **`as`** lets you render the wrapper as something other than a `div` (e.g. `section`) when it needs to carry semantic meaning.
