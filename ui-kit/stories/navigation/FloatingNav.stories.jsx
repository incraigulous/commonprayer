import React, { useState } from 'react';
import { FloatingNav } from '../../components/navigation/FloatingNav.jsx';

export default {
  title: 'Navigation/FloatingNav',
  component: FloatingNav,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['glass', 'solid'] },
    active: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: `
The app's floating pill tabs — Home / Office / Psalter / More — icon-over-label buttons in a rounded bar, meant to float over content rather than dock to the screen edge. \`glass\` sits over full-bleed imagery with light text; \`solid\` sits on a raised surface with the active tab in the season accent. Controlled via \`active\` / \`onChange\`.
      `,
      },
    },
  },
};

const ITEMS = [
  { id: 'home',    label: 'Home',    icon: 'home' },
  { id: 'office',  label: 'Office',  icon: 'book-open' },
  { id: 'psalter', label: 'Psalter', icon: 'book' },
  { id: 'more',    label: 'More',    icon: 'menu' },
];

export const Glass = {
  name: 'Glass — Over Imagery',
  render: () => {
    const [active, setActive] = useState('home');
    return (
      <div style={{
        width: 320, height: 180, borderRadius: 12, overflow: 'hidden',
        background: 'linear-gradient(160deg, #1b2a44, #0a1220)',
        display: 'flex', alignItems: 'flex-end', padding: 16,
      }}>
        <FloatingNav variant="glass" items={ITEMS} active={active} onChange={setActive} />
      </div>
    );
  },
};

export const Solid = {
  name: 'Solid — On a Surface',
  render: () => {
    const [active, setActive] = useState('office');
    return (
      <div style={{ width: 320 }}>
        <FloatingNav variant="solid" items={ITEMS} active={active} onChange={setActive} />
      </div>
    );
  },
};

export const Playground = {
  args: { variant: 'glass', active: 'home', items: ITEMS },
  render: (args) => (
    <div style={{
      width: 320, height: 180, borderRadius: 12, overflow: 'hidden',
      background: args.variant === 'glass' ? 'linear-gradient(160deg, #1b2a44, #0a1220)' : 'var(--bg)',
      display: 'flex', alignItems: 'flex-end', padding: 16,
    }}>
      <FloatingNav {...args} />
    </div>
  ),
};
