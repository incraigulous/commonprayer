// Common Prayer — app shell. Views: home · session · more · psalter.
const CPds = window.CommonPrayerDesignSystem_91d70c;
const { Icon, timeOfDaySeason } = CPds;
const READING_SCALES = CPds.READING_SCALES || { sm: 0.9, md: 1, lg: 1.15, xl: 1.3 };
const SEASON_ACCENTS = window.CP_SEASON_ACCENTS;
const SEASON_GLASS = window.CP_SEASON_GLASS;
const SEASON_LABELS = {
  advent: 'Advent', christmas: 'Christmas', epiphany: 'Epiphany', lent: 'Lent',
  easter: 'Easter', pentecost: 'Pentecost', ordinary: 'Ordinary Time',
};

const store = {
  get: (k, d) => { try { return localStorage.getItem(k) ?? d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
};

function App() {
  const data = window.CP_DATA;
  const [view, setView] = React.useState('home');                                  // home | session | more | psalter
  const [period, setPeriod] = React.useState('morning');                           // morning | noonday | evening | compline
  const [theme, setTheme] = React.useState(() => store.get('cp-theme', 'light'));   // system | light | dark
  const [color, setColor] = React.useState(() => store.get('cp-color', 'time'));    // seasonal | time | <season>
  const [size, setSize] = React.useState(() => store.get('cp-reading-size', 'md'));

  const p = data.periods.find((x) => x.id === period) || data.periods[0];

  // Resolve the colour mode → a concrete liturgical season.
  const season =
    color === 'time' ? p.season
    : color === 'seasonal' ? (data.day.seasonKey || 'ordinary')
    : color;

  const accent = SEASON_ACCENTS[season] || SEASON_ACCENTS.ordinary;
  const glass = SEASON_GLASS[season] || SEASON_GLASS.ordinary;

  const colorHint =
    color === 'time' ? `Now · ${p.office}`
    : color === 'seasonal' ? `Following the calendar · ${SEASON_LABELS[season]}`
    : null;

  // Resolve theme (system follows the OS).
  const effTheme = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  // Season → in-office accent (tabs, scripture cards, links) + home mood.
  React.useEffect(() => {
    document.documentElement.setAttribute('data-season', season);
    const root = document.querySelector('.cp-app');
    if (root) {
      root.style.setProperty('--period-accent', accent.accent);
      root.style.setProperty('--period-on', accent.onAccent);
    }
  }, [season, accent]);

  React.useEffect(() => { document.documentElement.setAttribute('data-theme', effTheme); }, [effTheme]);
  React.useEffect(() => { store.set('cp-theme', theme); }, [theme]);
  React.useEffect(() => { store.set('cp-color', color); }, [color]);
  React.useEffect(() => {
    document.documentElement.style.setProperty('--reading-scale', READING_SCALES[size] ?? 1);
    store.set('cp-reading-size', size);
  }, [size]);

  const office = data.offices[period];
  const display = { theme, onTheme: setTheme, color, onColor: setColor, size, onSize: setSize, colorHint };

  // Splash: show the SplashScreen component briefly, then fade out + retire the boot bridge.
  const [booting, setBooting] = React.useState(true);
  React.useEffect(() => {
    const boot = document.getElementById('cp-boot');
    if (boot) { boot.classList.add('is-hidden'); setTimeout(() => boot.remove(), 400); }
    const t = setTimeout(() => setBooting(false), 1600);
    return () => clearTimeout(t);
  }, []);

  const onNavigate = (id) => { if (id === 'office') setView('session'); else setView(id); };

  const SplashScreen = CPds.SplashScreen;

  return (
    <div className="cp-app">
      {SplashScreen && booting ? (
        <div className={'cp-splash-overlay' + (booting ? '' : ' is-hidden')}>
          <SplashScreen />
        </div>
      ) : null}
      {view === 'home' && (
        <HomeScreen
          periods={data.periods} period={period} onSelectPeriod={setPeriod}
          day={data.day} week={data.week} accent={accent}
          onStart={() => setView('session')} onNavigate={onNavigate}
        />
      )}

      {view === 'session' && (
        <SessionScreen
          office={office} period={p} day={data.day} week={data.week}
          accent={accent} glass={glass} display={display}
          onClose={() => setView('home')}
        />
      )}

      {(view === 'more' || view === 'psalter') && (
        <div className="cp-inner">
          <header className="cp-inner__head">
            {view === 'psalter' && (
              <button className="cp-inner__back" aria-label="Back" onClick={() => setView('more')}>
                <Icon name="chevron-left" size="1.5rem" />
              </button>
            )}
            <h1 className="cp-inner__title">{view === 'psalter' ? 'The Psalter' : 'More'}</h1>
          </header>
          <main className="cp-inner__scroll">
            {view === 'psalter'
              ? <PsalterScreen />
              : <MoreScreen display={display} onOpenPsalter={() => setView('psalter')} />}
          </main>
          <Nav variant="solid" active={view === 'psalter' ? 'psalter' : 'more'} onNavigate={onNavigate} />
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
