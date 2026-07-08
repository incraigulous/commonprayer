The office reading-view top bar — a back (or close) control on the left, the "AA" text-size control on the right, and an optional centred title.

```jsx
const { SessionBar } = CommonPrayerDesignSystem;

<SessionBar
  title="Morning Prayer"
  leadIcon="x"            // or 'chevron-left'
  onBack={() => close()}
  onTextSize={() => openTypePopover()}
/>
```

- **Presentational** — wire `onBack` and `onTextSize`.
- **leadIcon** switches the left control between a back chevron and a close ✕.
- The **AA** glyph is set in the season `--accent`; hide it with `showTextSize={false}`.
- Omit `title` for a bare bar (just the two controls); drop the bottom rule with `hairline={false}`.
- Pairs with the office step Tabs directly beneath it.
