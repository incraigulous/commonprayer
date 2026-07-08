import React from 'react';
import { Mosaic } from '../../components/liturgy/Mosaic.jsx';

export default {
  title: 'Liturgy/Mosaic',
  component: Mosaic,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A vector stained-glass panel: a deterministic jittered quad mesh tinted from \`colors\`, leaded with a dark join, whose panes optionally shimmer on slow, staggered cycles — like light through old glass. Fills its container (\`width:100%; height:100%\`); the caller sizes, clips or masks it (see \`Masthead\`, which fades one up from its foot).
      `,
      },
    },
  },
};

const PALETTES = {
  Easter:    ['#ecd79c', '#e2c887', '#d3ad5c', '#c9a24b', '#a9843a', '#8a6b2e', '#dcc079'],
  Ordinary:  ['#a9c19b', '#94ad87', '#7f9a72', '#5f7d53', '#4a6540', '#3c5334', '#8aa67d'],
  Pentecost: ['#f0b3a6', '#eca192', '#e27563', '#d65846', '#bf4835', '#9c3626', '#e9897a'],
  Lent:      ['#b3a7c9', '#9789b3', '#7d6f9c', '#675889', '#524570', '#3f3459', '#8b7daa'],
};

export const SeasonalPalettes = {
  name: 'Seasonal Palettes',
  render: () => (
    <div>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', marginBottom: '1rem' }}>
        Each pane shimmers on its own slow, staggered cycle.
      </p>
      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
        {Object.entries(PALETTES).map(([name, colors]) => (
          <div key={name} style={{ width: 200 }}>
            <div style={{ height: 140, borderRadius: 8, overflow: 'hidden' }}>
              <Mosaic colors={colors} seed={name.length * 3} />
            </div>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', textAlign: 'center', margin: '8px 0 0' }}>
              {name}
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Static = {
  name: 'Static (animate=false)',
  render: () => (
    <div style={{ width: 320, height: 200, borderRadius: 8, overflow: 'hidden' }}>
      <Mosaic colors={PALETTES.Easter} animate={false} />
    </div>
  ),
};

export const FadedIntoBlock = {
  name: 'Faded Into a Colour Block',
  render: () => (
    <div style={{
      width: 320, height: 240, borderRadius: 8, overflow: 'hidden', position: 'relative',
      background: '#a9843a',
    }}>
      <div style={{ position: 'absolute', inset: 0, maskImage: 'linear-gradient(to top, transparent, black 65%)', WebkitMaskImage: 'linear-gradient(to top, transparent, black 65%)' }}>
        <Mosaic colors={PALETTES.Easter} />
      </div>
    </div>
  ),
};

export const Playground = {
  args: {
    colors: PALETTES.Easter,
    seed: 9,
    cols: 10,
    rows: 8,
    animate: true,
  },
  render: (args) => (
    <div style={{ width: 320, height: 220, borderRadius: 8, overflow: 'hidden' }}>
      <Mosaic {...args} />
    </div>
  ),
};
