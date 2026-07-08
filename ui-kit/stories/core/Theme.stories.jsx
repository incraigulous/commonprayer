import React from 'react';
import { Theme } from '../../components/core/Theme.jsx';
import { Button } from '../../components/core/Button.jsx';
import { Badge } from '../../components/core/Badge.jsx';
import { Card } from '../../components/core/Card.jsx';
import { SectionHeading } from '../../components/liturgy/SectionHeading.jsx';

export default {
  title: 'Core/Theme',
  component: Theme,
  tags: ['autodocs'],
  argTypes: {
    theme: { control: 'select', options: ['system', 'light', 'dark'] },
    season: { control: 'select', options: [undefined, 'ordinary', 'advent', 'christmas', 'epiphany', 'lent', 'easter', 'pentecost'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
  parameters: {
    docs: {
      description: {
        component: `
Sets the \`data-theme\` / \`data-season\` attributes (and \`--reading-scale\`) that every other component reads its colours and reading size from — a nestable stand-in for what the app does by hand on \`<html>\`. \`tokens/colors.css\` and \`tokens/seasons.css\` are keyed entirely off these attributes, so Theme doesn't introduce a new colour system, it's just a reusable place to set them.
      `,
      },
    },
  },
};

function Sample() {
  return (
    <Card style={{ maxWidth: '20rem' }}>
      <Badge variant="sage" style={{ marginBottom: 'var(--space-3)' }}>Proper 9</Badge>
      <SectionHeading level="section">Morning Prayer</SectionHeading>
      <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)', lineHeight: 'var(--leading-body)', margin: '0 0 var(--space-4)' }}>
        O Lord, open thou our lips.
      </p>
      <Button variant="primary" size="sm">Begin</Button>
    </Card>
  );
}

export const SeasonalComparison = {
  name: 'Seasonal Comparison',
  render: () => (
    <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
      {['ordinary', 'advent', 'lent', 'easter', 'pentecost'].map((season) => (
        <Theme key={season} season={season} style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', background: 'var(--bg)' }}>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', margin: '0 0 var(--space-3)' }}>
            {season}
          </p>
          <Sample />
        </Theme>
      ))}
    </div>
  ),
};

export const LightVsDark = {
  name: 'Light vs Dark',
  render: () => (
    <div style={{ display: 'flex', gap: '1.25rem' }}>
      <Theme theme="dark" season="ordinary" style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', background: 'var(--bg)' }}>
        <Sample />
      </Theme>
      <Theme theme="light" season="ordinary" style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', background: 'var(--bg)' }}>
        <Sample />
      </Theme>
    </div>
  ),
};

export const ReadingSizes = {
  name: 'Reading Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {['sm', 'md', 'lg', 'xl'].map((size) => (
        <Theme key={size} season="ordinary" size={size} style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', background: 'var(--bg)', width: '16rem' }}>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', margin: '0 0 var(--space-3)' }}>
            size: {size}
          </p>
          <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)', fontSize: 'var(--reading-base)', lineHeight: 'var(--leading-body)', margin: 0 }}>
            O come, let us sing unto the Lord.
          </p>
        </Theme>
      ))}
    </div>
  ),
};

export const NestedOverride = {
  name: 'Nested Override',
  render: () => (
    <Theme season="ordinary" style={{ padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', background: 'var(--bg)' }}>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', margin: '0 0 var(--space-4)' }}>
        Outer: ordinary (sage)
      </p>
      <Button variant="primary" size="sm" style={{ marginBottom: 'var(--space-5)' }}>Sage Button</Button>

      <Theme as="div" season="advent" style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-md)', background: 'var(--surface-raised)', border: '1px solid var(--border)' }}>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-subtle)', margin: '0 0 var(--space-4)' }}>
          Nested: advent (violet) — only this card is overridden
        </p>
        <Button variant="primary" size="sm">Violet Button</Button>
      </Theme>
    </Theme>
  ),
};

export const Playground = {
  args: { theme: 'dark', season: 'ordinary', size: 'md' },
  render: (args) => (
    <Theme {...args} style={{ padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', background: 'var(--bg)' }}>
      <Sample />
    </Theme>
  ),
};
