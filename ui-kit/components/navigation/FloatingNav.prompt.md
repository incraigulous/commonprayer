The app's floating pill tabs — Home / Office / Psalter / More — icon-over-label buttons in a rounded bar, meant to float over content rather than dock to the screen edge.

```jsx
const { FloatingNav } = CommonPrayerDesignSystem;

const [active, setActive] = React.useState('home');

<FloatingNav
  variant="glass"
  active={active}
  onChange={setActive}
  items={[
    { id: 'home',    label: 'Home',    icon: 'home' },
    { id: 'office',  label: 'Office',  icon: 'book-open' },
    { id: 'psalter', label: 'Psalter', icon: 'book' },
    { id: 'more',    label: 'More',    icon: 'menu' },
  ]}
/>
```

- **Controlled** — pass `active` and `onChange(id)`.
- **variant** — `glass` (default) is frosted and translucent, for floating over full-bleed imagery (the Home screen); `solid` sits on `--surface-raised` for a plain background. The active tab turns white (`glass`) or the season `--accent` (`solid`).
- **Floating, not docked.** Unlike `Tabs`, this isn't full-width chrome — position it yourself (e.g. absolutely, inset from the edges) so it reads as a pill floating over the screen.
