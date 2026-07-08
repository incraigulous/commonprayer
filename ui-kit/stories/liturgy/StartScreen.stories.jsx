import React from 'react';
import { StartScreen } from '../../components/liturgy/StartScreen.jsx';

export default {
  title: 'Liturgy/StartScreen',
  component: StartScreen,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The office entry screen: a full-bleed image behind a frosted chapel-arch card with the date, the day's theme, the office name, and a Begin button. Fills its container — drop it into a phone frame or full viewport. \`accent\` / \`textColor\` paint the Begin button and default to the live \`--accent\`. \`top\` floats over the image above the card — use it for a Morning/Noon/Evening/Compline switcher.
      `,
      },
    },
  },
};

const CARDS = [
  { label: 'Morning', office: 'Morning Prayer', accent: '#a9843a', image: '/morning.jpg' },
  { label: 'Noon',    office: 'Noonday Prayer', accent: '#5f7d53', image: '/noon.jpg' },
  { label: 'Evening', office: 'Evensong',       accent: '#bf4835', image: '/evening.jpg' },
  { label: 'Night',   office: 'Compline',       accent: '#524570', image: '/night.jpg' },
];

function Phone({ children }) {
  return (
    <div style={{ width: 260, height: 480, borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
      {children}
    </div>
  );
}

export const TimesOfDay = {
  name: 'Times of Day',
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      {CARDS.map((c) => (
        <div key={c.label}>
          <Phone>
            <StartScreen
              image={c.image} date="Monday, 6 July" title={c.office}
              subtitle="The Promise of Freedom" accent={c.accent} onBegin={() => {}}
            />
          </Phone>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', textAlign: 'center', margin: '10px 0 0' }}>
            {c.label}
          </p>
        </div>
      ))}
    </div>
  ),
};

function PeriodSwitcher({ active }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', padding: '0 1rem' }}>
      {CARDS.map((c) => (
        <span
          key={c.label}
          style={{
            fontFamily: 'var(--font-ui)', fontSize: 12, letterSpacing: '0.04em',
            padding: '6px 12px', borderRadius: 999,
            background: c.label === active ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.16)',
            color: c.label === active ? '#1a120a' : '#fff',
          }}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}

export const WithPeriodSwitcher = {
  name: 'With Period Switcher (top)',
  render: () => (
    <Phone>
      <StartScreen
        image={CARDS[0].image} date="Monday, 6 July" title={CARDS[0].office}
        subtitle="The Promise of Freedom" accent={CARDS[0].accent} onBegin={() => {}}
        top={<PeriodSwitcher active="Morning" />}
      />
    </Phone>
  ),
};

export const Playground = {
  args: {
    image: CARDS[0].image,
    date: 'Monday, 6 July',
    title: 'Morning Prayer',
    subtitle: 'The Promise of Freedom',
    buttonLabel: 'Begin',
    accent: CARDS[0].accent,
    glassLines: true,
  },
  render: (args) => (
    <Phone>
      <StartScreen {...args} onBegin={() => {}} />
    </Phone>
  ),
};
