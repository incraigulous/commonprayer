A small-caps label above a heading or card title: the manuscript's rubric tag.

```jsx
<Eyebrow>Morning Prayer</Eyebrow>
<Eyebrow as="span">The Collect</Eyebrow>
```

- **as**: element/tag to render as. `p` (default), `span`, etc.
- Always colored with the live `--accent` — no variants.
- Used inside `Card` and `SectionHeading` for their `eyebrow` prop; reach for it directly when neither fits.
