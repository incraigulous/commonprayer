import React from 'react';
import { Rubric } from '../../components/liturgy/Rubric.jsx';

export default {
  title: 'Liturgy/Rubric',
  component: Rubric,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'sm', 'heading'],
    },
    center: { control: 'boolean' },
    as: { control: 'select', options: ['p', 'div', 'span'] },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `
The traditional red-letter direction to the worshipper. Always italic, always the accent color.

Rubrics tell you what to **do** — they are never the content you pray. This red-letter distinction is inviolable.

> *"The Officiant begins the service…"*
> *"All kneeling"*
> *"A pause is kept"*

The \`heading\` variant renders in small-caps for rubric section marks.
      `,
      },
    },
  },
};

export const Default = {
  args: { children: 'The Officiant begins the service with one or more of these sentences of Scripture.' },
};

export const Small = {
  args: { variant: 'sm', children: 'Said or sung by all.' },
};

export const Heading = {
  args: { variant: 'heading', children: 'The Invitatory and Psalter' },
};

export const Center = {
  args: { center: true, children: 'All kneeling.' },
};

export const InContext = {
  name: 'In Liturgy Context',
  render: () => (
    <div style={{ maxWidth: '36rem' }}>
      <Rubric variant="heading">Morning Prayer — Rite II</Rubric>

      <div style={{ height: '1.5rem' }} />

      <Rubric>The Officiant begins the service with one or more of these sentences of Scripture.</Rubric>

      <div style={{ height: '1rem' }} />

      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-body)', color: 'var(--text)', margin: 0 }}>
        The Lord is in his holy temple: let all the earth keep silence before him. <em>Habakkuk 2:20</em>
      </p>

      <div style={{ height: '1.5rem' }} />

      <Rubric>Then follows:</Rubric>

      <div style={{ height: '1rem' }} />

      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-body)', color: 'var(--text)', margin: '0 0 0.5rem' }}>
        <em>Officiant</em> — Lord, open thou our lips.
      </p>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-body)', color: 'var(--text)', margin: 0 }}>
        <em>People</em> — And our mouth shall shew forth thy praise.
      </p>

      <div style={{ height: '1.5rem' }} />

      <Rubric center>All stand and sing or say,</Rubric>

      <div style={{ height: '1rem' }} />

      <Rubric variant="sm">Said or sung by all.</Rubric>
    </div>
  ),
};

export const Playground = {
  args: {
    variant: 'default',
    center: false,
    children: 'The Officiant begins the service with one or more of these sentences of Scripture.',
  },
};
