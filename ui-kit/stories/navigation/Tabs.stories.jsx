import React, { useState } from 'react';
import { Tabs } from '../../components/navigation/Tabs.jsx';

export default {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `
The in-office step tabs (Opening · Psalm · Scripture …): a horizontal-scrolling row of section tabs, each active one carrying its own accent underline — the tabs used at the top of the office in the app, directly beneath the SessionBar.
      `,
      },
    },
  },
};

const SECTION_TABS = [
  { id: 'office',   label: 'Office' },
  { id: 'psalms',   label: 'Psalms' },
  { id: 'readings', label: 'Readings' },
  { id: 'collects', label: 'Collects' },
];

export const Underline = {
  render: () => {
    const [active, setActive] = useState('office');
    return <Tabs value={active} onChange={setActive} items={SECTION_TABS} />;
  },
};

export const SectionSwitcher = {
  name: 'Section Switcher',
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
        <Tabs value={active} onChange={setActive} items={SECTION_TABS} />
        <div style={{ padding: '1.5rem 0', fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-body)', color: 'var(--text)' }}>
          {content[active]}
        </div>
      </div>
    );
  },
};

export const SeasonalColors = {
  name: 'Seasonal Colors',
  render: () => {
    const seasons = ['none', 'ordinary', 'advent', 'christmas', 'lent', 'easter', 'pentecost'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {seasons.map(season => (
          <div key={season} data-season={season !== 'none' ? season : undefined}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: 6 }}>
              {season === 'none' ? 'Base (no season)' : season}
            </div>
            <div style={{ maxWidth: '28rem' }}>
              <Tabs value="office" items={SECTION_TABS} />
            </div>
          </div>
        ))}
      </div>
    );
  },
};
