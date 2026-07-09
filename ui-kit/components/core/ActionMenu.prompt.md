A floating action button that expands into a short stack of icon items — used for quick actions over an office reading (Share / Note / Remind).

```jsx
const { ActionMenu } = CommonPrayerDesignSystem;

<ActionMenu
  items={[
    { icon: 'share-2', label: 'Share',  onClick: () => share() },
    { icon: 'pencil',  label: 'Note',   onClick: () => addNote() },
    { icon: 'bell',    label: 'Remind', onClick: () => setReminder() },
  ]}
/>
```

- **Self-managed.** Open/closed state lives inside the component; clicking an item both fires its `onClick` and closes the menu.
- The main button fills with `--accent` and rotates 45° into a close (✕-like) mark when open.
- **Inline by default** — position it yourself (e.g. `position: absolute; right: 20px; bottom: 26px;`) to float it over a screen.
