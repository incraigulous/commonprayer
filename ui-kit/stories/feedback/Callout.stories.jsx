import React from 'react';
import { Callout } from '../../components/feedback/Callout.jsx';

export default {
  title: 'Feedback/Callout',
  component: Callout,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['note', 'prayer', 'blessing', 'refrain'],
    },
    title: { control: 'text' },
    glyph: { control: 'text' },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `
A callout aside — a note, prayer, blessing, or refrain set apart from the flowing office text.

| Variant | Glyph | Usage |
|---|---|---|
| \`note\` | ✶ | Rubrical aside, commentary |
| \`prayer\` | ✟ | A complete prayer set apart |
| \`blessing\` | ✠ | The closing grace — centered, gilt wash |
| \`refrain\` | ❧ | An antiphon or repeated response |
      `,
      },
    },
  },
};

export const Note = {
  args: {
    variant: 'note',
    title: 'Historical note',
    children: 'This versicle has been part of Morning Prayer since the first Book of Common Prayer (1549).',
  },
};

export const Prayer = {
  args: {
    variant: 'prayer',
    title: 'A Collect for the Day',
    children: 'O Lord, our heavenly Father, almighty and everlasting God, who hast safely brought us to the beginning of this day; Defend us in the same with thy mighty power.',
  },
};

export const Blessing = {
  args: {
    variant: 'blessing',
    title: 'The Blessing',
    children: 'The peace of God, which passeth all understanding, keep your hearts and minds in the knowledge and love of God, and of his Son Jesus Christ our Lord; and the blessing of God Almighty, the Father, the Son, and the Holy Ghost, be amongst you and remain with you always.',
  },
};

export const Refrain = {
  args: {
    variant: 'refrain',
    title: 'Antiphon',
    children: 'Lord, open thou our lips. And our mouth shall shew forth thy praise.',
  },
};

export const AllVariants = {
  name: 'All Variants',
  render: () => (
    <div style={{ maxWidth: '36rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Callout variant="note" title="A rubrical note">
        The officiant may substitute a different sentence of Scripture at their discretion.
      </Callout>
      <Callout variant="prayer" title="A Collect for Grace">
        O Lord, our heavenly Father, almighty and everlasting God, who hast safely brought us to the beginning of this day; Defend us in the same with thy mighty power.
      </Callout>
      <Callout variant="blessing" title="The Peace">
        The peace of the Lord be always with you. And also with you.
      </Callout>
      <Callout variant="refrain" title="Antiphon">
        Lord, open thou our lips. And our mouth shall shew forth thy praise.
      </Callout>
    </div>
  ),
};

export const WithoutTitle = {
  name: 'Without Title',
  render: () => (
    <div style={{ maxWidth: '36rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Callout variant="note">A note without a header — simple aside.</Callout>
      <Callout variant="refrain">
        Lord, open thou our lips. And our mouth shall shew forth thy praise.
      </Callout>
    </div>
  ),
};

export const Playground = {
  args: {
    variant: 'prayer',
    title: 'A Collect for the Day',
    children: 'O Lord, our heavenly Father, almighty and everlasting God, who hast safely brought us to the beginning of this day.',
  },
};
