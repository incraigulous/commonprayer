The reading-display settings panel — Theme, Color (Seasonal / Time of Day / a specific season), and Text size. Presentational and controlled; it paints in the current `--accent`, so it previews the chosen colour. Drop it inside your own popover or sheet.

```jsx
const { DisplayMenu, timeOfDaySeason, DISPLAY_READING_SCALES } =
  CommonPrayerDesignSystem;

function App() {
  const [theme, setTheme] = React.useState('system'); // 'system'|'light'|'dark'
  const [color, setColor] = React.useState('seasonal'); // auto or a season id
  const [size, setSize]  = React.useState('md');        // 'sm'|'md'|'lg'|'xl'

  // Resolve the two auto modes to a concrete season:
  const season =
    color === 'time'     ? timeOfDaySeason()      // follows the clock
  : color === 'seasonal' ? todaysCalendarSeason   // follows the calendar
  : color;                                         // a pinned season

  React.useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-season', season);
    if (theme !== 'system') html.setAttribute('data-theme', theme);
    html.style.setProperty('--reading-scale', DISPLAY_READING_SCALES[size]);
  }, [season, theme, size]);

  return (
    <DisplayMenu
      theme={theme} onThemeChange={setTheme}
      color={color} onColorChange={setColor}
      size={size}  onSizeChange={setSize}
      colorHint={color === 'time' ? `Now: ${season}` : null}
    />
  );
}
```

- **Presentational.** Reports the three choices; the consumer applies them (`data-theme`, `data-season`, `--reading-scale`).
- **Color modes.** Two auto modes — `seasonal` (liturgical calendar) and `time` (the clock, via `timeOfDaySeason` / `timeOfDayOffice`) — plus the seven seasons: `advent`, `christmas`, `epiphany`, `lent`, `easter`, `pentecost`, `ordinary`.
- **Time of Day** maps the four offices to colours: Morning→Easter, Noonday→Ordinary, Evening→Pentecost, Compline→Lent (see `OFFICE_PERIODS`).
- **Self-colouring.** The panel background is `--accent`, so it always shows the currently-selected colour. Place it on the season-coloured chrome for a seamless flyout.
- **colorHint** — optional italic line under the pills (good for showing the resolved season in an auto mode).
