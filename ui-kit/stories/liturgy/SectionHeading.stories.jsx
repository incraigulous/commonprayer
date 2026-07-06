import React from 'react';
import { SectionHeading } from '../../components/liturgy/SectionHeading.jsx';

export default {
  title: 'Liturgy/SectionHeading',
  component: SectionHeading,
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: ['display', 'office', 'section'],
      description: 'Typographic level — display (40px) > office (30px) > section (24px)',
    },
    rule: { control: 'boolean', description: 'Show rubric-colored accent rule below' },
    center: { control: 'boolean' },
    eyebrow: { control: 'text', description: 'Small-caps label above the title' },
    as: { control: 'select', options: ['h1', 'h2', 'h3', 'h4'] },
    children: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `
A section heading in the display serif (Cormorant Garamond) with an optional rubric-colored accent rule.

Three typographic levels:
- **display** — 40px, for full-page titles and dates
- **office** — 30px, for named offices (Morning Prayer, Evensong)
- **section** — 24px, for internal sections (The Invitatory, The Psalter)
      `,
      },
    },
  },
};

export const Display = {
  args: { level: 'display', children: 'July 6, 2026', eyebrow: 'Sunday, Proper 9' },
};

export const Office = {
  args: { level: 'office', children: 'Morning Prayer', eyebrow: 'The Daily Office' },
};

export const Section = {
  args: { level: 'section', children: 'The Invitatory', rule: true },
};

export const Centered = {
  args: { level: 'office', children: 'Morning Prayer', eyebrow: 'The Daily Office', center: true },
};

export const NoRule = {
  name: 'Without Rule',
  args: { level: 'section', children: 'A Collect for the Day', rule: false },
};

export const Hierarchy = {
  name: 'Full Hierarchy',
  render: () => (
    <div style={{ maxWidth: '36rem' }}>
      <SectionHeading level="display" eyebrow="Sunday, Proper 9">July 6, 2026</SectionHeading>
      <div style={{ height: '2rem' }} />
      <SectionHeading level="office" eyebrow="The Daily Office">Morning Prayer</SectionHeading>
      <div style={{ height: '1.5rem' }} />
      <SectionHeading level="section">The Invitatory</SectionHeading>
      <div style={{ height: '1rem' }} />
      <SectionHeading level="section">The Psalter</SectionHeading>
      <div style={{ height: '1rem' }} />
      <SectionHeading level="section">The Lessons</SectionHeading>
    </div>
  ),
};

export const AllLevels = {
  name: 'All Levels Side by Side',
  render: () => (
    <div style={{ maxWidth: '36rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-subtle)', letterSpacing: '0.08em', marginBottom: 8 }}>display — 40px</div>
        <SectionHeading level="display" eyebrow="Proper 9">July 6, 2026</SectionHeading>
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-subtle)', letterSpacing: '0.08em', marginBottom: 8 }}>office — 30px</div>
        <SectionHeading level="office" eyebrow="The Daily Office">Morning Prayer</SectionHeading>
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-subtle)', letterSpacing: '0.08em', marginBottom: 8 }}>section — 24px</div>
        <SectionHeading level="section">The Invitatory</SectionHeading>
      </div>
    </div>
  ),
};

export const Playground = {
  args: {
    level: 'office',
    eyebrow: 'The Daily Office',
    rule: true,
    center: false,
    children: 'Morning Prayer',
  },
};
