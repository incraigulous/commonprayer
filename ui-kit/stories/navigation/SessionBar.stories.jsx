import React from 'react';
import { SessionBar } from '../../components/navigation/SessionBar.jsx';

export default {
  title: 'Navigation/SessionBar',
  component: SessionBar,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    leadIcon: { control: 'select', options: ['chevron-left', 'x'] },
    showTextSize: { control: 'boolean' },
    hairline: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: `
The office reading-view top bar: a back (or close) control on the left and the "AA" text-size control on the right, with an optional centred title. Presentational — wire \`onBack\` and \`onTextSize\`. \`leadIcon\` switches the left control between a back chevron and a close ✕. Pairs with the office step Tabs directly beneath it.
      `,
      },
    },
  },
};

function Frame({ children }) {
  return (
    <div style={{ maxWidth: 360, border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
      {children}
      <div style={{ padding: '2rem 1.25rem', fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text-subtle)' }}>
        Office content scrolls below.
      </div>
    </div>
  );
}

export const WithTitle = {
  render: () => (
    <Frame>
      <SessionBar title="Morning Prayer" leadIcon="x" onBack={() => {}} onTextSize={() => {}} />
    </Frame>
  ),
};

export const Bare = {
  name: 'Bare (back + AA only)',
  render: () => (
    <Frame>
      <SessionBar leadIcon="chevron-left" onBack={() => {}} onTextSize={() => {}} />
    </Frame>
  ),
};

export const NoTextSize = {
  name: 'Without Text Size',
  render: () => (
    <Frame>
      <SessionBar title="Settings" leadIcon="chevron-left" onBack={() => {}} showTextSize={false} />
    </Frame>
  ),
};

export const NoHairline = {
  name: 'Without Hairline',
  render: () => (
    <Frame>
      <SessionBar title="Morning Prayer" leadIcon="x" onBack={() => {}} onTextSize={() => {}} hairline={false} />
    </Frame>
  ),
};

export const Playground = {
  args: {
    title: 'Morning Prayer',
    leadIcon: 'x',
    showTextSize: true,
    hairline: true,
  },
  render: (args) => (
    <Frame>
      <SessionBar {...args} onBack={() => {}} onTextSize={() => {}} />
    </Frame>
  ),
};
