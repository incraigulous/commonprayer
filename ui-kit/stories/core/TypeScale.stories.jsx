import React, { useState } from 'react';
import { TypeScale, READING_SCALES } from '../../components/core/TypeScale.jsx';

export default {
  title: 'Core/TypeScale',
  component: TypeScale,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Currently selected scale step',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Reading-size control — four "A" glyphs stepping the prayed/read text up or down.
Pair \`value\` with \`READING_SCALES\` and set \`--reading-scale\` on a root element.

This scales ONLY the liturgical body text. Headings, chrome, badges, and nav keep their fixed sizes.

\`\`\`js
import { READING_SCALES } from './TypeScale';
// { sm: 0.9, md: 1, lg: 1.15, xl: 1.3 }
document.documentElement.style.setProperty(
  '--reading-scale', READING_SCALES[value]
);
\`\`\`
      `,
      },
    },
  },
};

export const Default = {
  args: { value: 'md' },
};

export const WithLivePreview = {
  name: 'Live Preview',
  render: () => {
    const [size, setSize] = useState('md');
    const scale = READING_SCALES[size];

    return (
      <div>
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <TypeScale value={size} onChange={setSize} />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text-muted)' }}>
            Scale: {scale}x
          </span>
        </div>

        <div style={{
          maxWidth: '36rem',
          padding: '1.5rem',
          background: 'var(--surface-raised)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          '--reading-scale': scale,
        }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>
            Morning Prayer · Proper 9
          </div>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: `calc(var(--text-base) * ${scale})`,
            lineHeight: 'var(--leading-body)',
            color: 'var(--text)',
            margin: '0 0 1rem',
          }}>
            Almighty God, to you all hearts are open, all desires known, and from you no secrets are hid: Cleanse the thoughts of our hearts by the inspiration of your Holy Spirit, that we may perfectly love you, and worthily magnify your holy Name.
          </p>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: `calc(var(--text-base) * ${scale})`,
            lineHeight: 'var(--leading-body)',
            color: 'var(--text)',
            fontStyle: 'italic',
            margin: 0,
          }}>
            The Lord is in his holy temple: let all the earth keep silence before him.
          </p>
        </div>
      </div>
    );
  },
};

export const AllSteps = {
  name: 'All Steps',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {[
        { value: 'sm', scale: 0.9,  label: 'Small (0.9×)' },
        { value: 'md', scale: 1,    label: 'Regular (1×) — default' },
        { value: 'lg', scale: 1.15, label: 'Large (1.15×)' },
        { value: 'xl', scale: 1.3,  label: 'Extra Large (1.3×)' },
      ].map(({ value, scale, label }) => (
        <div key={value}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-subtle)', marginBottom: 4 }}>{label}</div>
          <TypeScale value={value} />
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: `calc(var(--text-base) * ${scale})`,
            lineHeight: 'var(--leading-body)',
            color: 'var(--text)',
            margin: '0.75rem 0 0',
            maxWidth: '36rem',
          }}>
            Lord, open thou our lips. And our mouth shall shew forth thy praise.
          </p>
        </div>
      ))}
    </div>
  ),
};
