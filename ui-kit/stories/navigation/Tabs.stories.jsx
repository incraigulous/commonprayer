import React, { useState } from 'react';
import { Tabs } from '../../components/navigation/Tabs.jsx';
import { Icon } from '../../components/core/Icon.jsx';

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['underline', 'bar'],
    },
    value: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Segmented tabs in two variants:

- **underline** — in-page section switching (liturgy section tabs, readings)
- **bar** — bottom office navigation (Morning / Noon / Evening / More)

The \`bar\` variant fills with the seasonal accent color and tracks it automatically.
      `,
      },
    },
  },
};

const OFFICE_TABS = [
  { id: 'morning', label: 'Morning' },
  { id: 'noon',    label: 'Midday' },
  { id: 'evening', label: 'Evening' },
  { id: 'compline',label: 'Night' },
];

const SECTION_TABS = [
  { id: 'office',   label: 'Office' },
  { id: 'psalms',   label: 'Psalms' },
  { id: 'readings', label: 'Readings' },
  { id: 'collects', label: 'Collects' },
];

const NAV_TABS = [
  { id: 'morning', label: 'Morning', icon: <Icon name="sun" size="1.35rem" /> },
  { id: 'noon',    label: 'Noon',    icon: <Icon name="clock" size="1.35rem" /> },
  { id: 'evening', label: 'Evening', icon: <Icon name="sunset" size="1.35rem" /> },
  { id: 'more',    label: 'More',    icon: <Icon name="menu" size="1.35rem" /> },
];

export const Underline = {
  render: () => {
    const [active, setActive] = useState('morning');
    return <Tabs variant="underline" value={active} onChange={setActive} items={OFFICE_TABS} />;
  },
};

export const Bar = {
  render: () => {
    const [active, setActive] = useState('morning');
    return (
      <div style={{ maxWidth: 400 }}>
        <Tabs variant="bar" value={active} onChange={setActive} items={NAV_TABS} />
      </div>
    );
  },
};

export const SectionSwitcher = {
  name: 'Section Switcher (Underline)',
  render: () => {
    const [active, setActive] = useState('office');
    const content = {
      office:   'The daily office text and prayers.',
      psalms:   'The appointed psalms for the day.',
      readings: 'Old Testament, New Testament, and Gospel lessons.',
      collects: 'Collects for the day and season.',
    };
    return (
      <div style={{ maxWidth: '36rem' }}>
        <Tabs variant="underline" value={active} onChange={setActive} items={SECTION_TABS} />
        <div style={{ padding: '1.5rem 0', fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-body)', color: 'var(--text)' }}>
          {content[active]}
        </div>
      </div>
    );
  },
};

export const BottomNav = {
  name: 'Bottom Navigation (Bar)',
  render: () => {
    const [active, setActive] = useState('morning');
    return (
      <div style={{ maxWidth: 400, border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', minHeight: 120, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--text)' }}>
            {NAV_TABS.find(t => t.id === active)?.label} Prayer
          </span>
        </div>
        <Tabs variant="bar" value={active} onChange={setActive} items={NAV_TABS} />
      </div>
    );
  },
};

export const SeasonalBarColors = {
  name: 'Bar — Seasonal Colors',
  render: () => {
    const seasons = ['none', 'ordinary', 'advent', 'christmas', 'lent', 'easter', 'pentecost'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {seasons.map(season => (
          <div key={season} data-season={season !== 'none' ? season : undefined}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 6 }}>
              {season === 'none' ? 'Base (no season)' : season}
            </div>
            <div style={{ maxWidth: 400 }}>
              <Tabs variant="bar" value="morning" items={NAV_TABS} />
            </div>
          </div>
        ))}
      </div>
    );
  },
};
