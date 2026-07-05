// Common Prayer — app shell (top bar, office nav, theme). Mounts everything.
const CPds = window.CommonPrayerDesignSystem_91d70c;
const { Tabs, Icon } = CPds;

function App() {
  const data = window.CP_DATA;
  const [tab, setTab] = React.useState('morning');
  const [theme, setTheme] = React.useState('dark');
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
        <button className="cp-app__icon" aria-label="Settings"><Icon name="type" size="1.15rem" /></button>
      </header>

      <main className="cp-app__scroll" ref={scrollRef}>
        {isOffice
          ? <OfficeScreen office={office} day={data.day} />
          : <MoreScreen theme={theme} onTheme={setTheme} />}
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
