import React, { useState } from 'react';
import { SplashScreen } from '../../components/liturgy/SplashScreen.jsx';

export default {
  title: 'Liturgy/SplashScreen',
  component: SplashScreen,
  tags: ['autodocs'],
  argTypes: {
    word: { control: 'text' },
    subtitle: { control: 'text' },
    glyph: { control: 'text' },
    enter: { control: 'boolean' },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The app-open lockup: a gilt cross, thin rule, the wordmark and a small-caps byline on a deep ground. Fills its container — overlay it full-screen above the app on launch, then fade it out once the app has mounted. The cross glows gently on a loop; \`enter\` plays a one-shot rise-in for the lockup. Both respect \`prefers-reduced-motion\`.
      `,
      },
    },
  },
};

export const Default = {
  render: () => (
    <div style={{ height: '70vh' }}>
      <SplashScreen />
    </div>
  ),
};

export const Replay = {
  name: 'Replay Entrance',
  render: () => {
    const [k, setK] = useState(0);
    return (
      <div style={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <SplashScreen key={k} />
        </div>
        <button
          type="button"
          onClick={() => setK((n) => n + 1)}
          style={{
            fontFamily: 'var(--font-ui)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '10px 16px', margin: 16, alignSelf: 'center', cursor: 'pointer',
            background: 'var(--surface-raised)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 6,
          }}
        >
          Replay entrance
        </button>
      </div>
    );
  },
};

export const Playground = {
  args: {
    word: 'Prayer Book',
    subtitle: 'by Via Media',
    glyph: '✝',
    enter: true,
  },
  render: (args) => (
    <div style={{ height: '70vh' }}>
      <SplashScreen {...args} />
    </div>
  ),
};
