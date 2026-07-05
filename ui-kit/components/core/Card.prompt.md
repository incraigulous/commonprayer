A ruled container for grouped content — days, offices, readings, settings.

```jsx
<Card eyebrow="Proper 9" title="The Sixth Sunday after Pentecost">
  Morning, Noonday, and Evening Prayer for the day.
</Card>

<Card variant="illuminated" title="Collect of the Day">
  O God, you have taught us to keep all your commandments…
</Card>
```

- **variant**: `default` (ruled surface), `sunk` / `flat` (recede), `illuminated` (gilt double-frame for featured/sacred content).
- **eyebrow** renders a small-caps rubric-red kicker; **title** a display-serif heading. **interactive** adds hover for tappable cards.
