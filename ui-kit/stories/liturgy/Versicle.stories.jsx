import React from 'react';
import { Versicle } from '../../components/liturgy/Versicle.jsx';

export default {
  title: 'Liturgy/Versicle',
  component: Versicle,
  tags: ['autodocs'],
  argTypes: {
    lines: {
      control: 'object',
      description: 'Array of { by, text, response? } line objects',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A versicle-and-response exchange between Officiant and People.

Each line has:
- \`by\` — speaker label (small-caps, accent colored)
- \`text\` — the line text
- \`response\` — if true, the People's line is rendered in semibold

The 6.5rem speaker column aligns all labels to a consistent right edge.
      `,
      },
    },
  },
};

const OPENING = [
  { by: 'Officiant', text: 'Lord, open thou our lips.' },
  { by: 'People',    text: 'And our mouth shall shew forth thy praise.', response: true },
];

const PRECES = [
  { by: 'Officiant', text: 'O God, make speed to save us.' },
  { by: 'People',    text: 'O Lord, make haste to help us.', response: true },
  { by: '',          text: 'Glory to the Father, and to the Son, and to the Holy Spirit;' },
  { by: '',          text: 'as it was in the beginning, is now, and will be for ever. Amen.', response: true },
  { by: '',          text: 'Praise the Lord.' },
  { by: 'People',    text: 'The Lord\'s name be praised.', response: true },
];

const LORD_HAVE_MERCY = [
  { by: 'Officiant', text: 'Lord, have mercy.' },
  { by: 'People',    text: 'Christ, have mercy.', response: true },
  { by: 'Officiant', text: 'Lord, have mercy.' },
];

export const Default = {
  args: { lines: OPENING },
};

export const Preces = {
  args: { lines: PRECES },
};

export const KyrieEleison = {
  name: 'Kyrie Eleison',
  args: { lines: LORD_HAVE_MERCY },
};

export const InContext = {
  name: 'In Liturgy Context',
  render: () => (
    <div style={{ maxWidth: '36rem' }}>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem' }}>
        Opening of Morning Prayer
      </div>

      <Versicle lines={OPENING} />

      <div style={{ height: '1.5rem' }} />

      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem' }}>
        The Preces
      </div>

      <Versicle lines={PRECES} />
    </div>
  ),
};

export const Playground = {
  args: {
    lines: [
      { by: 'Officiant', text: 'Lord, open thou our lips.' },
      { by: 'People', text: 'And our mouth shall shew forth thy praise.', response: true },
    ],
  },
};
