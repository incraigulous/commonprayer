A reading-size control — four "A" glyphs for scaling the prayed/read text.

```jsx
const { TypeScale, READING_SCALES } = CommonPrayerDesignSystem;

function App() {
  const [size, setSize] = React.useState('md'); // 'sm' | 'md' | 'lg' | 'xl'
  React.useEffect(() => {
    document.documentElement.style.setProperty('--reading-scale', READING_SCALES[size]);
  }, [size]);
  return <TypeScale value={size} onChange={setSize} />;
}
```

- **Presentational.** It reports the chosen step; the consumer maps it to `--reading-scale` (see `READING_SCALES`: sm `0.9` · md `1` · lg `1.15` · xl `1.3`) and sets that token on a root.
- **Scope.** `--reading-scale` resizes only the reading components (Scripture, Versicle, IlluminatedInitial, Callout, Rubric) and the `.cp-office__say` prose. Headings, badges, and chrome keep their fixed sizes.
- **On a coloured surface** (e.g. the season-coloured flyout) invert it with `--text-on-accent`: translucent-light track, solid-light active step. See the app's `.cp-typepop .cp-typescale` overrides.
- **value**: `sm` · `md` · `lg` · `xl` (default `md`). **onChange**: `(size) => void`.
