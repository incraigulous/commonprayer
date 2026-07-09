import React from 'react';
import { ActionMenu } from '../../components/core/ActionMenu.jsx';

export default {
  title: 'Core/ActionMenu',
  component: ActionMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A floating action button that expands into a short stack of icon items — used for quick actions over an office reading (Share / Note / Remind). Self-managed open state; the main button fills with \`--accent\` and rotates 45° into a close mark when open. Inline by default — position it yourself to float it over a screen.
      `,
      },
    },
  },
};

const ITEMS = [
  { icon: 'share-2', label: 'Share' },
  { icon: 'pencil',  label: 'Note' },
  { icon: 'bell',    label: 'Remind' },
];

export const Default = {
  render: () => (
    <div style={{ width: 300, height: 220, borderRadius: 12, border: '1px solid var(--border)', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 20 }}>
      <ActionMenu items={ITEMS} />
    </div>
  ),
};

export const FloatingOverScreen = {
  name: 'Floating Over a Screen',
  render: () => (
    <div style={{ width: 300, height: 260, borderRadius: 16, overflow: 'hidden', position: 'relative', background: 'linear-gradient(160deg, #1b2a44, #0a1220)' }}>
      <div style={{ position: 'absolute', right: 20, bottom: 24 }}>
        <ActionMenu items={ITEMS} />
      </div>
    </div>
  ),
};

export const Playground = {
  args: { mainIcon: 'plus', mainLabel: 'Actions', items: ITEMS },
  render: (args) => (
    <div style={{ width: 300, height: 220, borderRadius: 12, border: '1px solid var(--border)', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 20 }}>
      <ActionMenu {...args} />
    </div>
  ),
};
