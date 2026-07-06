import React, { useState } from 'react';
import { Button } from '../../components/core/Button.jsx';
import { Badge } from '../../components/core/Badge.jsx';
import { Card } from '../../components/core/Card.jsx';
import { OrnamentalDivider } from '../../components/liturgy/OrnamentalDivider.jsx';
import { Rubric } from '../../components/liturgy/Rubric.jsx';
import { SectionHeading } from '../../components/liturgy/SectionHeading.jsx';
import { Tabs } from '../../components/navigation/Tabs.jsx';

export default {
  title: 'Foundations/Seasonal Theme',
  parameters: {
    docs: {
      description: {
        component: `
The liturgical calendar recolors the accent — links, active states, focus rings, rubric emphasis —
via \`data-season\` on a root element. Season always layers on top of theme.

| Season | Accent | Notes |
|---|---|---|
| Ordinary / Epiphany | Sage green | The manuscript mark |
| Advent | Violet | Penitential preparation |
| Lent | Deep violet | Fasting season |
| Christmas / Easter | Gold | The great feasts |
| Pentecost | Rubric red | Fire of the Spirit |
        `,
      },
    },
  },
};

const SEASONS = [
  { id: 'none',      label: 'Base',      badge: 'default' },
  { id: 'ordinary',  label: 'Ordinary',  badge: 'sage' },
  { id: 'epiphany',  label: 'Epiphany',  badge: 'sage' },
  { id: 'advent',    label: 'Advent',    badge: 'violet' },
  { id: 'lent',      label: 'Lent',      badge: 'violet' },
  { id: 'christmas', label: 'Christmas', badge: 'gilt' },
  { id: 'easter',    label: 'Easter',    badge: 'gilt' },
  { id: 'pentecost', label: 'Pentecost', badge: 'rubric' },
];

export const SeasonPicker = {
  name: 'Season Switcher',
  render: () => {
    const [season, setSeason] = useState('none');
    const active = SEASONS.find(s => s.id === season) || SEASONS[0];

    return (
      <div>
        <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1.5rem' }}>
          Pick a liturgical season below. All accent-colored elements — the rule under the heading, the rubric text, the badge, the button, the tab indicator — update together.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {SEASONS.map(s => (
            <button
              key={s.id}
              onClick={() => {
                setSeason(s.id);
                const html = document.documentElement;
                if (s.id !== 'none') html.setAttribute('data-season', s.id);
                else html.removeAttribute('data-season');
              }}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: 'var(--radius-pill)',
                border: `1px solid ${s.id === season ? 'var(--accent)' : 'var(--border-strong)'}`,
                background: s.id === season ? 'var(--accent-quiet)' : 'transparent',
                color: s.id === season ? 'var(--accent)' : 'var(--text-muted)',
                fontFamily: 'var(--font-ui)', fontSize: 13, cursor: 'pointer',
                transition: 'all var(--dur-fast) var(--ease-standard)',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div data-season={season !== 'none' ? season : undefined} style={{ maxWidth: '36rem' }}>
          <Card eyebrow={active.label} title="The Daily Office">
            <SectionHeading eyebrow="Opening" level="section">
              Morning Prayer
            </SectionHeading>

            <Rubric>The Officiant begins the service with one or more of these sentences of Scripture.</Rubric>

            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-body)', color: 'var(--text)', margin: '1rem 0' }}>
              O Lord, open thou our lips. And our mouth shall shew forth thy praise.
            </p>

            <OrnamentalDivider glyph="cross" tone="gilt" />

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <Badge variant={active.badge}>{active.label}</Badge>
              <Badge>Proper 9</Badge>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button variant="primary" size="sm">Begin Office</Button>
              <Button variant="secondary" size="sm">Settings</Button>
              <Button variant="ghost" size="sm">Skip</Button>
            </div>
          </Card>

          <div style={{ marginTop: '1.5rem' }}>
            <Tabs
              variant="underline"
              value="morning"
              items={[
                { id: 'morning', label: 'Morning' },
                { id: 'noon',    label: 'Midday' },
                { id: 'evening', label: 'Evening' },
              ]}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const AllSeasons = {
  name: 'All Seasons at a Glance',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
      {SEASONS.filter(s => s.id !== 'none').map(s => (
        <div key={s.id} data-season={s.id} style={{
          padding: '1.25rem',
          background: 'var(--surface-raised)',
          border: '1px solid var(--accent)',
          borderRadius: 'var(--radius-lg)',
        }}>
          <div style={{
            fontFamily: 'var(--font-ui)', fontSize: 11,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--accent)', marginBottom: '0.75rem',
          }}>
            {s.label}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: 4, background: 'var(--accent)' }} />
            <div style={{ width: 32, height: 32, borderRadius: 4, background: 'var(--accent-hover)' }} />
            <div style={{ width: 32, height: 32, borderRadius: 4, background: 'var(--accent-press)' }} />
            <div style={{ width: 32, height: 32, borderRadius: 4, background: 'var(--accent-quiet)' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>
            accent · hover · press · quiet
          </div>
          <div style={{ marginTop: '0.75rem' }}>
            <Button variant="primary" size="sm">Begin Office</Button>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const DarkAndLight = {
  name: 'Dark vs Light',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      {['dark', 'light'].map(theme => (
        <div key={theme} data-theme={theme} style={{
          padding: '1.5rem',
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
        }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>
            {theme === 'dark' ? 'Night Office (dark)' : 'Parchment (light)'}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--text)', marginBottom: '0.5rem' }}>
            Morning Prayer
          </div>
          <Rubric>The Officiant begins the service…</Rubric>
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
            <Button variant="primary" size="sm">Begin</Button>
            <Button variant="secondary" size="sm">Skip</Button>
          </div>
        </div>
      ))}
    </div>
  ),
};
