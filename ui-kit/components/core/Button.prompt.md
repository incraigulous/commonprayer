A liturgical button in four voices — use it for any tappable action.

```jsx
<Button variant="primary">Begin Morning Prayer</Button>
<Button variant="secondary">Choose a day</Button>
<Button variant="ghost">Pause</Button>
<Button variant="gilt" size="lg">Amen</Button>
```

- **variant**: `primary` (rubric-red fill, the one clear action), `secondary` (ruled vellum outline), `ghost` (quiet inline, e.g. "Pause"), `gilt` (gold small-caps for sacred moments like "Amen").
- **size**: `sm` · `md` · `lg`. **block** stretches full width. Renders an `<a>` when given `href`, or set `as`.
