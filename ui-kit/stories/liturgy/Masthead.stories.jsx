import React from 'react';
import { Masthead } from '../../components/liturgy/Masthead.jsx';

export default {
  title: 'Liturgy/Masthead',
  component: Masthead,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The full-bleed opening of a daily office: a solid colour-of-the-day block with the date, the office name (the centred page heading) and the appointed readings, and a vector stained-glass mosaic fading up from its foot. Fills its container's height so the office content scrolls up from beneath it. \`fill\` / \`textColor\` default to the live \`--accent\` / \`--text-on-accent\` (so it follows the season); pass explicit values plus a matching \`colors\` palette to pin a colour.
      `,
      },
    },
  },
};

const GLASS = {
  easter:    ['#ecd79c', '#e2c887', '#d3ad5c', '#c9a24b', '#a9843a', '#8a6b2e', '#dcc079'],
  ordinary:  ['#a9c19b', '#94ad87', '#7f9a72', '#5f7d53', '#4a6540', '#3c5334', '#8aa67d'],
  pentecost: ['#f0b3a6', '#eca192', '#e27563', '#d65846', '#bf4835', '#9c3626', '#e9897a'],
  lent:      ['#b3a7c9', '#9789b3', '#7d6f9c', '#675889', '#524570', '#3f3459', '#8b7daa'],
};
const ACCENT = { easter: '#a9843a', ordinary: '#5f7d53', pentecost: '#bf4835', lent: '#524570' };
const ON_ACCENT = { easter: '#fbf4e4', ordinary: '#f1f6ee', pentecost: '#fdeeea', lent: '#efeaf6' };

const OFFICES = [
  { office: 'Morning Prayer',   tradition: 'Matins',              season: 'easter',    readings: ['Psalm 95', 'John 8'] },
  { office: 'Noonday Prayer',   tradition: 'Sext',                season: 'ordinary',  readings: ['Psalm 84'] },
  { office: 'Evening Prayer',   tradition: 'Vespers · Evensong',  season: 'pentecost', readings: ['Psalm 141', 'Luke 1'] },
  { office: 'Nighttime Prayer', tradition: 'Compline',            season: 'lent',      readings: ['Psalm 4', 'Psalm 91'] },
];

function Phone({ o }) {
  return (
    <div style={{ width: 240 }}>
      <div style={{ height: 340, borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
        <Masthead
          office={o.office} tradition={o.tradition} date="Monday, 6 July" readings={o.readings}
          fill={ACCENT[o.season]} textColor={ON_ACCENT[o.season]} colors={GLASS[o.season]}
        />
      </div>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', textAlign: 'center', margin: '10px 0 0' }}>
        {o.season}
      </p>
    </div>
  );
}

export const SeasonalOffices = {
  name: 'Seasonal Offices',
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      {OFFICES.map((o) => <Phone key={o.office} o={o} />)}
    </div>
  ),
};

export const FollowsAccent = {
  name: 'Follows Live Accent (no pinned colour)',
  render: () => (
    <div style={{ width: 320, height: 340, borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
      <Masthead office="Evening Prayer" tradition="Vespers" date="Monday, 6 July" readings={['Psalm 141', 'Luke 1']} />
    </div>
  ),
};

export const PlainBlock = {
  name: 'Without Mosaic (plain colour)',
  render: () => (
    <div style={{ width: 320, height: 260, borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
      <Masthead office="Noonday Prayer" tradition="Sext" date="Monday, 6 July" readings={['Psalm 84']} fill={ACCENT.ordinary} textColor={ON_ACCENT.ordinary} />
    </div>
  ),
};

export const Playground = {
  args: {
    office: 'Morning Prayer',
    tradition: 'Matins',
    date: 'Monday, 6 July',
    readings: ['Psalm 95', 'John 8'],
    fill: ACCENT.easter,
    textColor: ON_ACCENT.easter,
    colors: GLASS.easter,
  },
  render: (args) => (
    <div style={{ width: 320, height: 340, borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
      <Masthead {...args} />
    </div>
  ),
};
