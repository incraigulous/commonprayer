// Common Prayer — office reading screen. Composes the DS liturgy components.
const CP = window.CommonPrayerDesignSystem_91d70c;
const { SectionHeading, Rubric, IlluminatedInitial, Versicle, Scripture, Callout, OrnamentalDivider, Badge, Button } = CP;

function OfficeScreen({ office, day }) {
  return (
    <article className="cp-office">
      <header className="cp-office__masthead">
        <p className="cp-office__date">{day.date}</p>
        <p className="cp-office__season">{day.season}</p>
        <div className="cp-office__tags">
          <Badge variant="sage">{day.proper}</Badge>
          <Badge>Ordinary Time</Badge>
        </div>
      </header>

      <OrnamentalDivider glyph="fleuron" />

      <SectionHeading level="display">{office.title}</SectionHeading>
      <Rubric>{office.opening}</Rubric>
      <Scripture cite={office.sentenceRef}>{office.sentence}</Scripture>

      <SectionHeading>Confession of Sin</SectionHeading>
      <Rubric variant="sm">{office.confessionRubric}</Rubric>
      <p className="cp-office__say">{office.confession}</p>

      <SectionHeading>The Invitatory</SectionHeading>
      <Versicle lines={office.versicle} />
      <IlluminatedInitial letter={office.invitatoryCap} boxed>
        {office.invitatory}
      </IlluminatedInitial>

      <SectionHeading>The Lesson</SectionHeading>
      <Scripture cite={office.lessonRef} variant="illuminated">
        {office.lesson}
      </Scripture>

      <SectionHeading>The Collect</SectionHeading>
      <Callout variant="prayer" title={office.collectTitle}>
        {office.collect}
      </Callout>

      <Callout variant="refrain" title="Refrain">
        {office.refrain} <span className="cp-office__ref">{office.refrainRef}</span>
      </Callout>

      <OrnamentalDivider glyph="cross" />
      <div className="cp-office__amen">
        <Button variant="gilt" size="lg">Amen</Button>
      </div>
    </article>
  );
}

function MoreScreen({ theme, onTheme }) {
  const { Card, Field, Icon } = CP;
  const items = [
    { icon: 'calendar', label: 'Choose a day', meta: 'Today' },
    { icon: 'book-open', label: 'The Lectionary', meta: 'Year C' },
    { icon: 'bookmark', label: 'Saved prayers', meta: '4' },
    { icon: 'feather', label: 'Prayer journal', meta: '' },
    { icon: 'bell', label: 'Reminders', meta: 'Off' },
  ];
  return (
    <div className="cp-more">
      <SectionHeading level="display">More</SectionHeading>

      <Card title="Appearance" eyebrow="Settings">
        <div className="cp-toggle">
          <div className="cp-toggle__opt">
            <Icon name="moon" size="1.1rem" />
            <span>Night office</span>
          </div>
          <div className="cp-seg">
            <button className={theme === 'dark' ? 'is-on' : ''} onClick={() => onTheme('dark')}>Dark</button>
            <button className={theme === 'light' ? 'is-on' : ''} onClick={() => onTheme('light')}>Light</button>
          </div>
        </div>
      </Card>

      <nav className="cp-list">
        {items.map((it) => (
          <button key={it.label} className="cp-list__row">
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

Object.assign(window, { OfficeScreen, MoreScreen });
