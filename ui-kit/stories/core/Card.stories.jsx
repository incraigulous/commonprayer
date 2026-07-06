import React from 'react';
import { Card } from '../../components/core/Card.jsx';
import { Badge } from '../../components/core/Badge.jsx';
import { Button } from '../../components/core/Button.jsx';
import { Rubric } from '../../components/liturgy/Rubric.jsx';

export default {
  title: 'Core/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'sunk', 'flat', 'illuminated'],
    },
    interactive: { control: 'boolean' },
    eyebrow: { control: 'text' },
    title: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `
A ruled parchment card. Hairline borders do the structural work — this is line-art, not a soft card UI.

| Variant | Usage |
|---|---|
| \`default\` | Standard raised surface |
| \`sunk\` | Recessed / inset content |
| \`flat\` | Transparent — for nesting |
| \`illuminated\` | Gilt-framed sacred content |
        `,
      },
    },
  },
};

export const Default = {
  args: {
    eyebrow: 'Morning Prayer',
    title: 'The Invitatory',
    children: 'Lord, open thou our lips. And our mouth shall shew forth thy praise.',
  },
};

export const Sunk = {
  args: {
    variant: 'sunk',
    eyebrow: 'Reading',
    title: 'A Lesson',
    children: 'A reading from the Holy Gospel according to St. Luke…',
  },
};

export const Illuminated = {
  args: {
    variant: 'illuminated',
    eyebrow: 'The Collect',
    title: 'A Collect for Grace',
    children: 'O Lord, our heavenly Father, almighty and everlasting God, who hast safely brought us to the beginning of this day; Defend us in the same with thy mighty power; and grant that this day we fall into no sin, neither run into any kind of danger.',
  },
};

export const Interactive = {
  args: {
    interactive: true,
    eyebrow: 'Evening Prayer',
    title: 'Compline',
    children: 'The service of Night Prayer — traditionally said at the close of day.',
    onClick: () => alert('Card clicked'),
  },
};

export const WithContent = {
  name: 'Rich Content',
  render: () => (
    <div style={{ maxWidth: '36rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Card eyebrow="Proper 9 · Ordinary Time" title="Morning Prayer">
        <Rubric>The Officiant begins the service with one or more of these sentences of Scripture.</Rubric>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-body)', color: 'var(--text)', margin: '0.75rem 0 1rem' }}>
          The Lord is in his holy temple: let all the earth keep silence before him.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Badge>Proper 9</Badge>
          <Badge variant="sage">Ordinary Time</Badge>
        </div>
      </Card>

      <Card variant="illuminated" eyebrow="The Collect" title="A Collect for Grace">
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-body)', color: 'var(--text)', margin: 0 }}>
          O Lord, our heavenly Father, almighty and everlasting God, who hast safely brought us to the beginning of this day; Defend us in the same with thy mighty power.
        </p>
      </Card>

      <Card interactive eyebrow="Next Office" title="Midday Prayer" onClick={() => {}}>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-body)', color: 'var(--text-muted)', margin: '0 0 1rem' }}>
          A brief office for the midday hour — the sixth hour of prayer.
        </p>
        <Button variant="secondary" size="sm">Begin</Button>
      </Card>
    </div>
  ),
};

export const AllVariants = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
      {['default', 'sunk', 'flat', 'illuminated'].map(variant => (
        <Card key={variant} variant={variant} eyebrow={variant} title="The Office">
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: 0 }}>
            Card variant: <strong>{variant}</strong>
          </p>
        </Card>
      ))}
    </div>
  ),
};

export const Playground = {
  args: {
    variant: 'default',
    eyebrow: 'Morning Prayer',
    title: 'The Invitatory',
    interactive: false,
    children: 'Lord, open thou our lips. And our mouth shall shew forth thy praise.',
  },
};
