A labelled toggle field — a "light switch": a pill track with a sliding thumb, an inline label and optional help text.

```jsx
const { Switch } = CommonPrayerDesignSystem;

const [dark, setDark] = React.useState(false);

<Switch
  label="Night office"
  help="Dim the page for low light"
  checked={dark}
  onChange={setDark}
/>
```

- **Controlled** — pass `checked` and `onChange(next, event)`.
- The track fills with the theme **`--accent`** when on, so it matches the season.
- **onGlyph / offGlyph** ride inside the thumb — e.g. a sun / moon for a light-mode switch.
- Renders a native `role="switch"` checkbox; keyboard- and screen-reader-accessible. Pair several in a column with `gap` for a settings list.
