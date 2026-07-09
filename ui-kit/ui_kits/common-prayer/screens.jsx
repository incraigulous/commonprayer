// Common Prayer — modern app screens.
const CP = window.CommonPrayerDesignSystem_91d70c;
const { Icon, TypeScale, Tabs } = CP;
const IlluminatedInitial = CP.IlluminatedInitial || function ({ letter, children }) { return <p className="rb rb-scripture"><span style={{ fontFamily: 'var(--font-display)', fontSize: '2.4em', float: 'left', lineHeight: .8, marginRight: '.08em' }}>{letter}</span>{children}</p>; };
// DisplayMenu comes from the DS bundle; guard so a not-yet-rebuilt bundle can't
// blank the whole app (the real component renders once the bundle is current).
const DisplayMenu = CP.DisplayMenu || function DisplayMenuPending() { return null; };
const SCR_SEASON_ACCENTS = window.CP_SEASON_ACCENTS || {};

/* ---- shared floating nav --------------------------------------------------
   FloatingNav / ActionMenu come from the DS bundle; guard with the original
   inline markup so a not-yet-rebuilt bundle can't blank the app (the real
   components render once the bundle is current). */
const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'office', label: 'Office', icon: 'book-open' },
  { id: 'psalter', label: 'Psalter', icon: 'book' },
  { id: 'more', label: 'More', icon: 'menu' },
];
function Nav({ variant, active, onNavigate }) {
  if (CP.FloatingNav) return <CP.FloatingNav variant={variant} items={NAV_ITEMS} active={active} onChange={onNavigate} />;
  return (
    <nav className={'cp-fnav cp-fnav--' + variant}>
      {NAV_ITEMS.map((it) => (
        <button key={it.id} className={active === it.id ? 'is-on' : ''} onClick={() => onNavigate(it.id)}>
          <Icon name={it.icon} size="1.35rem" />
          {it.label}
        </button>
      ))}
    </nav>
  );
}

/* ---- floating action menu ------------------------------------------------ */
const FAB_ITEMS = [
  { icon: 'share-2', label: 'Share' },
  { icon: 'pencil', label: 'Note' },
  { icon: 'bell', label: 'Remind' },
];
function ActionMenu() {
  if (CP.ActionMenu) return <CP.ActionMenu items={FAB_ITEMS} />;
  const [open, setOpen] = React.useState(false);
  return (
    <div className={'cp-fab' + (open ? ' is-open' : '')}>
      <button className="cp-fab__main" aria-label="Actions" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <Icon name="plus" size="1.5rem" />
      </button>
      {FAB_ITEMS.map((it) => (
        <button key={it.label} className="cp-fab__item" aria-label={it.label} title={it.label}>
          <Icon name={it.icon} size="1.15rem" />
        </button>
      ))}
    </div>
  );
}

/* ---- HOME (time of day) -------------------------------------------------- */
const StartScreen = CP.StartScreen;
function HomeScreen({ periods, period, onSelectPeriod, day, week, accent, onStart, onNavigate }) {
  const p = periods.find((x) => x.id === period) || periods[0];
  const periodSwitch = (
    <div className="cp-period">
      {periods.map((x) => (
        <button key={x.id} className={x.id === period ? 'is-on' : ''} onClick={() => onSelectPeriod(x.id)}>
          <span className="dot" style={x.id === period ? undefined : { background: (SCR_SEASON_ACCENTS[x.season] || {}).accent }} />
          {x.label}
        </button>
      ))}
    </div>
  );
  return (
    <div className="cp-home">
      <StartScreen
        image={p.image} date={day.dateLong} title={p.office}
        subtitle={week.theme}
        accent={accent.accent} textColor={accent.onAccent}
        onBegin={onStart} top={periodSwitch}
      />
      <ActionMenu />
      <Nav variant="glass" active="home" onNavigate={onNavigate} />
    </div>
  );
}

/* ---- reading blocks ------------------------------------------------------ */
function Block({ b }) {
  switch (b.type) {
    case 'heading':  return <h2 className="rb rb-heading">{b.text}</h2>;
    case 'rubric':   return <p className="rb rb-rubric">{b.text}</p>;
    case 'prose':    return <p className="rb rb-prose">{b.text}</p>;
    case 'scripture':
      if (b.dropcap && b.text) {
        const letter = b.text.charAt(0);
        const rest = b.text.slice(1);
        return (
          <div className="rb rb-opening">
            <IlluminatedInitial letter={letter} variant="gilt">{rest}</IlluminatedInitial>
            {b.ref && <span className="rb-ref">{b.ref}</span>}
          </div>
        );
      }
      return (
        <div className={'rb rb-scripture' + (b.highlight ? ' rb-scripture--hl' : '')}>
          {b.text}
          {b.ref && <span className="rb-ref">{b.ref}</span>}
        </div>
      );
    case 'psalm':
      return (
        <div className="rb rb-psalm">
          {b.ref && <span className="rb-psalm__ref">{b.ref}</span>}
          <span className="rb-psalm__text">{b.text}</span>
        </div>
      );
    case 'canticle': return <p className="rb rb-canticle">{b.text}</p>;
    case 'collect':  return <p className="rb rb-collect">{b.text}</p>;
    case 'refrain':  return <p className="rb rb-refrain">{b.text}<span className="rb-ref">{b.ref}</span></p>;
    case 'versicle':
      return (
        <div className="rb rb-versicle">
          {b.lines.map((l, i) => (
            <p key={i} className={'rb-vline' + (l.response ? ' rb-vline--resp' : '')}>
              {l.by ? <span className="who">{l.by}</span> : null}{l.text}
            </p>
          ))}
        </div>
      );
    default: return null;
  }
}

/* ---- stained-glass mosaic (vector, voronoi-ish) -------------------------- */
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function MosaicBand({ colors, seed = 9, cols = 10, rows = 8, width = 420, height = 300 }) {
  const rand = mulberry32(seed);
  const pts = [];
  for (let r = 0; r <= rows; r++) { pts[r] = []; for (let c = 0; c <= cols; c++) {
    const jx = (c === 0 || c === cols) ? 0 : (rand() - .5) * (width / cols) * .72;
    const jy = (r === 0 || r === rows) ? 0 : (rand() - .5) * (height / rows) * .72;
    pts[r][c] = [ (c * width / cols) + jx, (r * height / rows) + jy ];
  } }
  const polys = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const q = [pts[r][c], pts[r][c + 1], pts[r + 1][c + 1], pts[r + 1][c]];
    polys.push({
      p: q.map((a) => a.join(',')).join(' '), fill: colors[Math.floor(rand() * colors.length)],
      delay: (rand() * 4).toFixed(2), dur: (2.8 + rand() * 2.7).toFixed(2),
    });
  }
  return (
    <svg className="cp-mosaic cp-mosaic--anim" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      {polys.map((pl, i) => <polygon key={i} points={pl.p} fill={pl.fill} stroke="rgba(26,18,10,.45)" strokeWidth="1.2" strokeLinejoin="round" style={{ animationDelay: `${pl.delay}s`, animationDuration: `${pl.dur}s` }} />)}
    </svg>
  );
}

/* Masthead comes from the DS bundle; fall back to this inline copy until the
   bundle is rebuilt so the office opening never blanks. Same props either way. */
function InlineMasthead({ office, date, readings, opening, fill, textColor, colors }) {
  const list = Array.isArray(readings) ? readings.filter(Boolean) : [];
  const lines = Array.isArray(opening) ? opening.filter(Boolean) : (opening ? [opening] : []);
  return (
    <div className="cp-mast" style={{ background: fill, color: textColor }}>
      <div className="cp-mast__body">
        {date ? <p className="cp-mast__date">{date}</p> : null}
        <h1 className="cp-mast__title">{office}</h1>
        {lines.length ? <p className="cp-mast__opening">{lines.map((l, i) => <span key={i}>{l}</span>)}</p> : null}
        {list.length ? <p className="cp-mast__readings">Readings · {list.join(' · ')}</p> : null}
      </div>
      {colors && colors.length ? <MosaicBand colors={colors} /> : null}
    </div>
  );
}
// Use the actual Masthead component from the design-system bundle.
const Masthead = CP.Masthead;

/* ---- SESSION (the office) ------------------------------------------------ */
function SessionScreen({ office, period, day, week, accent, glass, display, onClose }) {
  const [active, setActive] = React.useState(0);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const pageRef = React.useRef(null);
  const steps = office.steps;

  React.useEffect(() => {
    const root = pageRef.current; if (!root) return;
    const secs = [...root.querySelectorAll('[data-sec]')];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.sec)); });
    }, { root, rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [office]);

  const go = (i) => {
    const root = pageRef.current; if (!root) return;
    const el = root.querySelector(`[data-sec="${i}"]`);
    if (el) root.scrollTo({ top: el.offsetTop - 6, behavior: 'smooth' });
  };

  return (
    <div className="cp-session">
      <header className="cp-shead">
        <div className="cp-shead__top">
          <button className="cp-shead__ico" aria-label="Display settings" onClick={() => setMenuOpen((o) => !o)}>
            <span className="cp-aa"><span className="s">A</span><span className="l">A</span></span>
          </button>
          <button className="cp-shead__ico" aria-label="Close" onClick={onClose}><Icon name="x" size="1.5rem" /></button>
        </div>
        <div className="cp-steps">
          <Tabs items={steps.map((s) => ({ id: s.key, label: s.label }))}
            value={steps[active].key} onChange={(id) => go(steps.findIndex((s) => s.key === id))} />
        </div>
        {menuOpen && (
          <>
            <div className="cp-typepop__scrim" onClick={() => setMenuOpen(false)} />
            <div className="cp-menupop" role="dialog" aria-label="Display settings">
              <DisplayMenu
                theme={display.theme} onThemeChange={display.onTheme}
                color={display.color} onColorChange={display.onColor}
                size={display.size} onSizeChange={display.onSize}
                colorHint={display.colorHint}
              />
            </div>
          </>
        )}
      </header>

      <div className="cp-page" ref={pageRef}>
        <div className="cp-mastwrap">
          <Masthead
            office={period.office} date={day.dateLong} readings={office.readings}
            fill={accent.accent} textColor={accent.onAccent} colors={glass}
          />
        </div>

        {steps.map((s, i) => (
          <section className="cp-sec" data-sec={i} key={s.key}>
            {i === 0 && office.opening && office.opening.length ? (
              <div className="cp-lead">
                <Block b={{ type: 'versicle', lines: office.opening.map((t, k) => ({ text: t, response: k > 0 })) }} />
              </div>
            ) : null}
            <p className="cp-sec__label">{s.label}</p>
            {s.blocks.map((b, j) => <Block key={j} b={b} />)}
          </section>
        ))}

        <div className="cp-amen"><button className="cp-amen__btn" onClick={onClose}>Amen</button></div>
      </div>
    </div>
  );
}

/* ---- MORE ---------------------------------------------------------------- */
function MoreScreen({ display, onOpenPsalter }) {
  const { Card, Field } = CP;
  const items = [
    { icon: 'book', label: 'The Psalter', meta: '150', onClick: onOpenPsalter },
    { icon: 'calendar', label: 'Choose a day', meta: 'Today' },
    { icon: 'book-open', label: 'The Lectionary', meta: 'Year C' },
    { icon: 'bookmark', label: 'Saved prayers', meta: '4' },
    { icon: 'bell', label: 'Reminders', meta: 'Off' },
  ];
  return (
    <div className="cp-more">
      <div className="cp-more__display">
        <DisplayMenu
          theme={display.theme} onThemeChange={display.onTheme}
          color={display.color} onColorChange={display.onColor}
          size={display.size} onSizeChange={display.onSize}
          colorHint={display.colorHint}
        />
      </div>

      <nav className="cp-list">
        {items.map((it) => (
          <button key={it.label} className="cp-list__row" onClick={it.onClick}>
            <span className="cp-list__lead"><Icon name={it.icon} size="1.15rem" /></span>
            <span className="cp-list__label">{it.label}</span>
            {it.meta && <span className="cp-list__meta">{it.meta}</span>}
            <Icon name="chevron-right" size="1.1rem" />
          </button>
        ))}
      </nav>

      <Card variant="illuminated" title="An intention" eyebrow="Prayer journal">
        <Field multiline rows={3} placeholder="Name someone or something to hold in prayer…" />
      </Card>
    </div>
  );
}

/* ---- PSALTER ------------------------------------------------------------- */
function range(a, b) { const out = []; for (let i = a; i <= b; i++) out.push(i); return out; }
function PsalterScreen() {
  const [q, setQ] = React.useState('');
  const books = [
    { name: 'Book I', from: 1, to: 41 }, { name: 'Book II', from: 42, to: 72 },
    { name: 'Book III', from: 73, to: 89 }, { name: 'Book IV', from: 90, to: 106 },
    { name: 'Book V', from: 107, to: 150 },
  ];
  const appointed = [{ n: 95, name: 'Venite' }, { n: 100, name: 'Jubilate' }, { n: 84, name: 'Quam dilecta' }];
  const todaySet = new Set(appointed.map((a) => a.n));
  const query = q.trim();
  const visibleBooks = books
    .map((b) => ({ ...b, nums: range(b.from, b.to).filter((n) => query === '' || String(n).startsWith(query)) }))
    .filter((b) => b.nums.length > 0);

  return (
    <div className="cp-psalter">
      <p className="cp-psalter__lede">One hundred fifty psalms, in five books.</p>
      <div className="cp-psearch">
        <span className="cp-psearch__ico"><Icon name="search" size="1.05rem" /></span>
        <input className="cp-psearch__input" inputMode="numeric" placeholder="Jump to a psalm…"
          value={q} onChange={(e) => setQ(e.target.value.replace(/[^0-9]/g, ''))} />
        {q && <button className="cp-psearch__clear" aria-label="Clear" onClick={() => setQ('')}><Icon name="x" size="1rem" /></button>}
      </div>

      {query === '' && (
        <div className="cp-appointed">
          <p className="cp-appointed__lbl"><span className="sw" aria-hidden="true" /> Appointed today</p>
          <div className="cp-appointed__chips">
            {appointed.map((a) => (
              <button key={a.n} className="cp-chip"><span className="cp-chip__n">{a.n}</span><span className="cp-chip__name">{a.name}</span></button>
            ))}
          </div>
        </div>
      )}

      {visibleBooks.map((b) => (
        <section className="cp-book" key={b.name}>
          <header className="cp-book__head">
            <p className="cp-book__name">{b.name}</p>
            <p className="cp-book__range">Psalms {b.from}–{b.to}</p>
          </header>
          <div className="cp-book__grid">
            {b.nums.map((n) => <button key={n} className={'cp-psalm' + (todaySet.has(n) ? ' cp-psalm--today' : '')}>{n}</button>)}
          </div>
        </section>
      ))}
      {visibleBooks.length === 0 && <p className="cp-psalter__empty">No psalm {query}. The Psalter numbers 1 to 150.</p>}
    </div>
  );
}

Object.assign(window, { Nav, HomeScreen, SessionScreen, MoreScreen, PsalterScreen });
