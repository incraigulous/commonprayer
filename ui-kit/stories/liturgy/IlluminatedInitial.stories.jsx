import React from 'react';
import { IlluminatedInitial } from '../../components/liturgy/IlluminatedInitial.jsx';

export default {
  title: 'Liturgy/IlluminatedInitial',
  component: IlluminatedInitial,
  tags: ['autodocs'],
  argTypes: {
    letter: { control: 'text' },
    variant: {
      control: 'select',
      options: ['gilt', 'rubric', 'ink'],
    },
    boxed: { control: 'boolean' },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `
An illuminated initial (drop-cap) opening a prayer, psalm, or reading.

Rendered in **Goudy Initialen** — a decorative foliate initial face supplied by the client.
Use **only** for single letters; never for words.

The drop-cap floats left with a 3-line span, gilded by default.
The \`boxed\` variant adds an illuminated manuscript frame.
      `,
      },
    },
  },
};

const OFFICE = `Lord, open thou our lips. And our mouth shall shew forth thy praise. O God, make speed to save us. O Lord, make haste to help us. Glory be to the Father, and to the Son, and to the Holy Ghost; as it was in the beginning, is now, and ever shall be, world without end. Amen.`;

export const Gilt = {
  args: {
    letter: 'O',
    variant: 'gilt',
    children: OFFICE,
  },
};

export const Rubric = {
  args: {
    letter: 'A',
    variant: 'rubric',
    children: 'lmighty God, to you all hearts are open, all desires known, and from you no secrets are hid: Cleanse the thoughts of our hearts by the inspiration of your Holy Spirit.',
  },
};

export const Ink = {
  args: {
    letter: 'B',
    variant: 'ink',
    children: 'lessed are the poor in spirit: for theirs is the kingdom of heaven. Blessed are they that mourn: for they shall be comforted.',
  },
};

export const BoxedGilt = {
  name: 'Boxed — Gilt Frame',
  args: {
    letter: 'O',
    variant: 'gilt',
    boxed: true,
    children: OFFICE,
  },
};

export const BoxedRubric = {
  name: 'Boxed — Rubric Frame',
  args: {
    letter: 'L',
    variant: 'rubric',
    boxed: true,
    children: 'ord, open thou our lips. And our mouth shall shew forth thy praise.',
  },
};

export const AllLetters = {
  name: 'Sample Letters — All Variants',
  render: () => (
    <div style={{ maxWidth: '36rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {[
        { letter: 'O', variant: 'gilt',   text: `Lord, open thou our lips. And our mouth shall shew forth thy praise. O God, make speed to save us. O Lord, make haste to help us.` },
        { letter: 'A', variant: 'rubric', text: `lmighty and most merciful Father, we have erred and strayed from your ways like lost sheep. We have followed too much the devices and desires of our own hearts.` },
        { letter: 'B', variant: 'ink',    text: `less the Lord, O my soul, and all that is within me, bless his holy name! Bless the Lord, O my soul, and forget not all his benefits.` },
      ].map(({ letter, variant, text }) => (
        <IlluminatedInitial key={letter + variant} letter={letter} variant={variant}>
          {text}
        </IlluminatedInitial>
      ))}
    </div>
  ),
};

export const BoxedVariants = {
  name: 'Boxed Variants',
  render: () => (
    <div style={{ maxWidth: '36rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <IlluminatedInitial letter="O" variant="gilt" boxed>
        {OFFICE}
      </IlluminatedInitial>
      <IlluminatedInitial letter="A" variant="rubric" boxed>
        lmighty God, to you all hearts are open, all desires known, and from you no secrets are hid.
      </IlluminatedInitial>
    </div>
  ),
};

export const Playground = {
  args: {
    letter: 'O',
    variant: 'gilt',
    boxed: false,
    children: `Lord, open thou our lips. And our mouth shall shew forth thy praise.`,
  },
};
