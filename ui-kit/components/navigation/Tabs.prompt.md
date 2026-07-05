Tabs for switching offices or in-page sections.

```jsx
const [office, setOffice] = React.useState('morning');
<Tabs
  variant="bar"
  value={office}
  onChange={setOffice}
  items={[
    { id: 'morning', label: 'Morning', icon: <Icon name="sunrise" /> },
    { id: 'noon',    label: 'Noon',    icon: <Icon name="sun" /> },
    { id: 'evening', label: 'Evening', icon: <Icon name="moon" /> },
    { id: 'more',    label: 'More',    icon: <Icon name="menu" /> },
  ]}
/>

<Tabs items={[{id:'psalter',label:'Psalter'},{id:'lessons',label:'Lessons'}]} />
```

- **variant**: `bar` (bottom office nav, icon over label, rubric top-mark) · `underline` (display-serif section tabs, rubric underline). Controlled via `value` + `onChange`.
