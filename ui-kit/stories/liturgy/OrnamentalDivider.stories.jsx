import React from 'react';
import { OrnamentalDivider } from '../../components/liturgy/OrnamentalDivider.jsx';

export default {
  title: 'Liturgy/OrnamentalDivider',
  component: OrnamentalDivider,
  tags: ['autodocs'],
  argTypes: {
    glyph: {
      control: 'select',
      options: ['cross', 'latin', 'fleuron', 'diamond', 'asterism', 'none'],
      description: 'Manuscript glyph: ✠ † ❦ ❖ ⁂',
    },
    tone: {
      control: 'select',
      options: ['gilt', 'rubric'],
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
An ornamental divider — a ruled hairline centred on a small manuscript glyph.

Glyphs available:

| Value | Glyph | Name |
|---|---|---|
| \`cross\` | ✠ | Maltese cross |
| \`latin\` | † | Latin cross |
| \`fleuron\` | ❦ | Fleuron / hedera |
| \`diamond\` | ❖ | Black diamond |
| \`asterism\` | ⁂ | Asterism |
| \`none\` | — | Plain hairline rule |
      `,
      },
    },
  },
};

export const Cross = {
  args: { glyph: 'cross', tone: 'gilt' },
};

export const Latin = {
  args: { glyph: 'latin', tone: 'gilt' },
};

export const Fleuron = {
  args: { glyph: 'fleuron', tone: 'gilt' },
};

export const Diamond = {
  args: { glyph: 'diamond', tone: 'gilt' },
};

export const Asterism = {
  args: { glyph: 'asterism', tone: 'gilt' },
};

export const Plain = {
  name: 'Plain Rule',
  args: { glyph: 'none' },
};

export const RubricTone = {
  name: 'Rubric Tone',
  args: { glyph: 'cross', tone: 'rubric' },
};

export const AllGlyphs = {
  name: 'All Glyphs',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {[
        { glyph: 'cross',    label: 'cross ✠' },
        { glyph: 'latin',    label: 'latin †' },
        { glyph: 'fleuron',  label: 'fleuron ❦' },
        { glyph: 'diamond',  label: 'diamond ❖' },
        { glyph: 'asterism', label: 'asterism ⁂' },
        { glyph: 'none',     label: 'none (plain rule)' },
      ].map(({ glyph, label }) => (
        <div key={glyph}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-subtle)', marginBottom: 4, letterSpacing: '0.08em' }}>{label}</div>
          <OrnamentalDivider glyph={glyph} />
        </div>
      ))}
    </div>
  ),
};

export const InContext = {
  name: 'In Liturgy Context',
  render: () => (
    <div style={{ maxWidth: '36rem' }}>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-body)', color: 'var(--text)', margin: '0 0 0' }}>
        Glory be to the Father, and to the Son, and to the Holy Ghost: as it was in the beginning, is now, and ever shall be, world without end. Amen.
      </p>

      <OrnamentalDivider glyph="cross" tone="gilt" />

      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-body)', color: 'var(--text)', margin: '0' }}>
        Praise ye the Lord. The Lord's name be praised.
      </p>

      <OrnamentalDivider glyph="fleuron" tone="rubric" />

      <p style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', color: 'var(--text)', margin: 0 }}>
        The First Lesson
      </p>
    </div>
  ),
};
