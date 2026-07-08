import React, { useState } from 'react';
import { DisplayMenu, timeOfDayOffice, timeOfDaySeason, DISPLAY_READING_SCALES } from '../../components/core/DisplayMenu.jsx';

export default {
  title: 'Core/DisplayMenu',
  component: DisplayMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The reading-display settings panel: **Theme** (System · Light · Dark), **Color** (the Seasonal & Time-of-Day auto modes plus every liturgical season) and **Text size**. Presentational and fully controlled — the panel paints its own background in the current \`--accent\`, so it always previews the chosen colour. Drop it inside a popover or sheet of your own; resolve the auto modes with \`timeOfDaySeason\` and apply \`data-season\` / \`--reading-scale\` on a root element.
      `,
      },
    },
  },
};

const CALENDAR_SEASON = 'ordinary'; // stands in for "today" on the liturgical calendar

export const Default = {
  render: () => {
    const [theme, setTheme] = useState('system');
    const [color, setColor] = useState('seasonal');
    const [size, setSize] = useState('md');

    return (
      <div style={{ maxWidth: 320 }} data-season={color === 'seasonal' ? CALENDAR_SEASON : color === 'time' ? timeOfDaySeason() : color}>
        <DisplayMenu
          theme={theme} onThemeChange={setTheme}
          color={color} onColorChange={setColor}
          size={size} onSizeChange={setSize}
          colorHint={color === 'time' ? `Now: ${timeOfDayOffice().office}` : color === 'seasonal' ? 'Following the calendar' : null}
        />
      </div>
    );
  },
};

export const PinnedSeason = {
  name: 'Pinned Season',
  render: () => (
    <div style={{ maxWidth: 320 }} data-season="advent">
      <DisplayMenu theme="dark" color="advent" size="lg" />
    </div>
  ),
};

export const WithReadout = {
  name: 'With Preview Readout',
  render: () => {
    const [theme, setTheme] = useState('light');
    const [color, setColor] = useState('seasonal');
    const [size, setSize] = useState('md');
    const season = color === 'time' ? timeOfDaySeason() : color === 'seasonal' ? CALENDAR_SEASON : color;

    return (
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }} data-season={season}>
        <div style={{ maxWidth: 320 }}>
          <DisplayMenu
            theme={theme} onThemeChange={setTheme}
            color={color} onColorChange={setColor}
            size={size} onSizeChange={setSize}
            colorHint={color === 'time' ? `Now · ${timeOfDayOffice().office}` : color === 'seasonal' ? 'Following the calendar' : null}
          />
        </div>
        <div style={{ maxWidth: '24rem' }}>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', margin: '0 0 0.75rem' }}>
            Preview
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--text)', margin: '0 0 0.5rem' }}>
            The Invitatory
          </p>
          <p style={{
            fontFamily: 'var(--font-serif)', color: 'var(--text)', lineHeight: 'var(--leading-body)',
            fontSize: `calc(var(--text-base) * ${DISPLAY_READING_SCALES[size]})`, margin: 0,
          }}>
            O come, let us sing unto the Lord; let us heartily rejoice in the strength of our salvation.
          </p>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-subtle)', marginTop: '1rem' }}>
            theme {theme} · color {color} · season {season} · size {size}
          </p>
        </div>
      </div>
    );
  },
};
