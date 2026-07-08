The office entry screen — a full-bleed image behind a frosted chapel-arch card with the date, the day's theme, the office name, and a Begin button.

```jsx
const { StartScreen } = CommonPrayerDesignSystem;

<StartScreen
  image="/assets/morning.jpg"
  date="Monday, 6 July"
  title="The Promise of Freedom"
  subtitle="Morning Prayer · Fixing our eyes on Jesus"
  onBegin={() => openOffice()}
  accent="#a9843a"           // season colour of the day
  top={<PeriodSwitcher />}   // optional, floats above the card
/>
```

- **Fills its container** — drop it into a phone frame or full viewport.
- The **arch card** is the chapel-window shape (frosted glass over the photo); it carries date, theme, sub-line and the Begin button.
- **accent / textColor** paint the Begin button; default to the live `--accent`.
- **top** floats over the image above the card — use it for a Morning/Noon/Evening/Compline switcher. **children** render inside the arch under the button.
- Presentational — you provide the image and wire `onBegin`.
