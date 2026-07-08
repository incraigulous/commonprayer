The in-office step tabs — a horizontal-scrolling row of section tabs (Opening · Psalm · Scripture …), each active one carrying its own accent underline. These are the tabs at the top of the office in the app.

```jsx
const { Tabs } = CommonPrayerDesignSystem;
const [step, setStep] = React.useState('scripture');

<Tabs
  value={step}
  onChange={setStep}
  items={[
    { id: 'opening', label: 'Opening' },
    { id: 'psalm', label: 'Psalm' },
    { id: 'scripture', label: 'Scripture' },
    { id: 'canticle', label: 'Canticle' },
    { id: 'prayers', label: 'Prayers' },
    { id: 'collect', label: 'Collect' },
  ]}
/>
```

- Controlled via `value` + `onChange`; falls back to the first item.
- The row scrolls horizontally when the steps overflow — the active tab keeps its accent underline. Pair with scroll-spy to sync the active tab to the section in view.
