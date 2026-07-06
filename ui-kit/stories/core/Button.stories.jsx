import React from 'react';
import { Button } from '../../components/core/Button.jsx';

export default {
  title: 'Core/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'gilt'],
      description: 'Visual style',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    block: {
      control: 'boolean',
      description: 'Full-width button',
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Four button variants map to distinct semantic roles in the liturgy:

| Variant | Role | Usage |
|---|---|---|
| \`primary\` | Rubric red fill | The one clear action per screen |
| \`secondary\` | Ruled outline | Secondary / alternative action |
| \`ghost\` | Quiet text | Tertiary, destructive, or nav actions |
| \`gilt\` | Gold outline | Singular sacred actions (e.g. "Amen") |
        `,
      },
    },
  },
};

export const Primary = {
  args: { variant: 'primary', children: 'Begin Morning Prayer' },
};

export const Secondary = {
  args: { variant: 'secondary', children: 'Skip to Evening' },
};

export const Ghost = {
  args: { variant: 'ghost', children: 'Cancel' },
};

export const Gilt = {
  args: { variant: 'gilt', children: 'Amen' },
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium (default)</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  ),
};

export const AllVariants = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {['sm', 'md', 'lg'].map(size => (
        <div key={size} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
          <Button variant="primary"   size={size}>Begin Office</Button>
          <Button variant="secondary" size={size}>Schedule</Button>
          <Button variant="ghost"     size={size}>Skip</Button>
          <Button variant="gilt"      size={size}>Amen</Button>
        </div>
      ))}
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      <Button variant="primary"   disabled>Begin Office</Button>
      <Button variant="secondary" disabled>Schedule</Button>
      <Button variant="ghost"     disabled>Skip</Button>
      <Button variant="gilt"      disabled>Amen</Button>
    </div>
  ),
};

export const Block = {
  render: () => (
    <div style={{ maxWidth: '24rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Button variant="primary"   block>Begin Morning Prayer</Button>
      <Button variant="secondary" block>View Lectionary</Button>
      <Button variant="ghost"     block>Settings</Button>
    </div>
  ),
};

export const AsLink = {
  name: 'As Anchor',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button as="a" href="#" variant="primary">Open BCP</Button>
      <Button as="a" href="#" variant="ghost">Learn more</Button>
    </div>
  ),
};

export const Playground = {
  args: {
    variant: 'primary',
    size: 'md',
    block: false,
    disabled: false,
    children: 'Begin Morning Prayer',
  },
  render: (args) => <Button {...args} />,
};
