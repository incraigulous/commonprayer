// Common Prayer — app shell (top bar, office nav, theme). Mounts everything.
const CPds = window.CommonPrayerDesignSystem_91d70c;
const { Tabs, Icon, TypeScale } = CPds;
const READING_SCALES = CPds.READING_SCALES || { sm: 0.9, md: 1, lg: 1.15, xl: 1.3 };

function App() {
  const data = window.CP_DATA;
  const [tab, setTab] = React.useState('morning');
  const [theme, setTheme] = React.useState('dark');
  const [size, setSize] = React.useState(() => localStorage.getItem('cp-reading-size') || 'md');
  const [typeOpen, setTypeOpen] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Recolour the accent to the liturgical season of the day.
  React.useEffect(() => {
    const seasonByColor = { sage: 'ordinary', violet: 'advent', gilt: 'christmas', rubric: 'pentecost' };
    const season = data.day.seasonKey || seasonByColor[data.day.color] || 'ordinary';
    document.documentElement.setAttribute('data-season', season);
  }, [data.day]);

  // Scale only the reading text to the chosen size, and remember it.
  React.useEffect(() => {
    document.documentElement.style.setProperty('--reading-scale', READING_SCALES[size] ?? 1);
    localStorage.setItem('cp-reading-size', size);
  }, [size]);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [tab]);

  const isOffice = tab !== 'more';
  const office = isOffice ? data.offices[tab] : null;
  const title = isOffice ? office.title : 'Common Prayer';

  return (
    <div className="cp-app">
      <header className="cp-app__bar">
        <button className="cp-app__icon" aria-label="Menu"><Icon name="menu" size="1.3rem" /></button>
        <h1 className="cp-app__title">{title}</h1>
        <div className="cp-app__typewrap">
          <button className="cp-app__icon" aria-label="Text size" aria-expanded={typeOpen} onClick={() => setTypeOpen((o) => !o)}>
            <Icon name="type" size="1.15rem" />
          </button>
          {typeOpen && (
            <div className="cp-typepop" role="dialog" aria-label="Text size">
              <p className="cp-typepop__lbl">Text size</p>
              <TypeScale value={size} onChange={setSize} />
              <p className="cp-typepop__sample">Grace to you and peace from God our Father.</p>
            </div>
          )}
        </div>
      </header>
      {typeOpen && <div className="cp-typepop__scrim" onClick={() => setTypeOpen(false)} />}

      <main className="cp-app__scroll" ref={scrollRef}>
        {isOffice
          ? <OfficeScreen office={office} day={data.day} />
          : <MoreScreen theme={theme} onTheme={setTheme} size={size} onSize={setSize} />}
      </main>

      <footer className="cp-app__nav">
        <Tabs
          variant="bar"
          value={tab}
          onChange={setTab}
          items={[
            { id: 'morning', label: 'Morning', icon: <Icon name="sunrise" size="1em" /> },
            { id: 'noon',    label: 'Noon',    icon: <Icon name="sun" size="1em" /> },
            { id: 'evening', label: 'Evening', icon: <Icon name="moon" size="1em" /> },
            { id: 'more',    label: 'More',    icon: <Icon name="more-horizontal" size="1em" /> },
          ]}
        />
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
