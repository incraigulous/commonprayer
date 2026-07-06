import React from 'react';
import { Icon } from '../../components/core/Icon.jsx';

export default {
  title: 'Core/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    size: { control: 'text' },
    strokeWidth: { control: { type: 'range', min: 0.5, max: 3, step: 0.25 } },
  },
  parameters: {
    docs: {
      description: {
        component: `
A line-art icon using [Lucide](https://lucide.dev). Sized in \`em\` so it inherits font-size and color.

Note: Lucide is a substitute for the production icon set — the exact set used in the app was not supplied with the design system.
      `,
      },
    },
  },
};

const APP_ICONS = [
  'sun', 'moon', 'sunset', 'sunrise',
  'book-open', 'bookmark', 'heart', 'star',
  'bell', 'clock', 'calendar', 'map-pin',
  'settings', 'user', 'users', 'search',
  'chevron-right', 'chevron-left', 'chevron-up', 'chevron-down',
  'arrow-left', 'arrow-right', 'x', 'check',
  'plus', 'minus', 'edit', 'trash',
  'share', 'download', 'upload', 'external-link',
  'volume-2', 'volume-x', 'play', 'pause',
  'lock', 'unlock', 'eye', 'eye-off',
];

export const SingleIcon = {
  name: 'Single Icon',
  args: { name: 'book-open', size: '2rem', strokeWidth: 1.75 },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text)' }}>
      <Icon {...args} />
      <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--text-muted)' }}>{args.name}</span>
    </div>
  ),
};

export const CommonAppIcons = {
  name: 'Common App Icons',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
      {APP_ICONS.map(name => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 48, height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--surface-raised)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text)',
          }}>
            <Icon name={name} size="1.25rem" />
          </div>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--text-subtle)', textAlign: 'center', maxWidth: 56 }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '1.5rem', color: 'var(--text)' }}>
      {['1rem', '1.25rem', '1.5rem', '2rem', '2.5rem', '3rem'].map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Icon name="book-open" size={size} />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--text-subtle)' }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const StrokeWeights = {
  name: 'Stroke Weights',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '1.5rem', color: 'var(--text)' }}>
      {[1, 1.25, 1.5, 1.75, 2, 2.5].map(sw => (
        <div key={sw} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Icon name="book-open" size="2rem" strokeWidth={sw} />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--text-subtle)' }}>{sw}</span>
        </div>
      ))}
    </div>
  ),
};

export const ColorInheritance = {
  name: 'Color Inheritance',
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
      {[
        { color: 'var(--text)',        label: '--text' },
        { color: 'var(--text-muted)',  label: '--text-muted' },
        { color: 'var(--accent)',      label: '--accent' },
        { color: 'var(--gilt)',        label: '--gilt' },
        { color: 'var(--sage-500)',    label: '--sage-500' },
        { color: 'var(--violet-500)',  label: '--violet-500' },
      ].map(({ color, label }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Icon name="sun" size="1.75rem" style={{ color }} />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--text-subtle)', textAlign: 'center' }}>{label}</span>
        </div>
      ))}
    </div>
  ),
};

export const InText = {
  name: 'Inline With Text',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {[
        { text: 'Morning Prayer', icon: 'sun', color: 'var(--text)' },
        { text: 'Midday Prayer', icon: 'clock', color: 'var(--text)' },
        { text: 'Evening Prayer', icon: 'sunset', color: 'var(--text)' },
        { text: 'Settings', icon: 'settings', color: 'var(--text-muted)' },
      ].map(({ text, icon, color }) => (
        <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color }}>
          <Icon name={icon} size="1.1em" />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', lineHeight: 1 }}>{text}</span>
        </div>
      ))}
    </div>
  ),
};
