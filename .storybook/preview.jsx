import React from 'react';
import '../ui-kit/tokens/fonts.css';
import '../ui-kit/tokens/colors.css';
import '../ui-kit/tokens/typography.css';
import '../ui-kit/tokens/spacing.css';
import '../ui-kit/tokens/effects.css';
import '../ui-kit/tokens/seasons.css';
import '../ui-kit/tokens/base.css';

/** @type {import('@storybook/react').Preview} */
const preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Light / Dark / Auto',
      defaultValue: 'dark',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'dark',  right: '🌑', title: 'Night Office (dark)' },
          { value: 'light', right: '☀️', title: 'Parchment (light)' },
          { value: 'auto',  right: '🖥',  title: 'Auto (OS)' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
    season: {
      name: 'Season',
      description: 'Liturgical season accent',
      defaultValue: 'none',
      toolbar: {
        icon: 'calendar',
        items: [
          { value: 'none',      title: 'None (base accent)' },
          { value: 'ordinary',  right: '🟢', title: 'Ordinary Time' },
          { value: 'epiphany',  right: '🟢', title: 'Epiphany' },
          { value: 'advent',    right: '🟣', title: 'Advent' },
          { value: 'lent',      right: '🟣', title: 'Lent' },
          { value: 'christmas', right: '🟡', title: 'Christmas' },
          { value: 'easter',    right: '🟡', title: 'Easter' },
          { value: 'pentecost', right: '🔴', title: 'Pentecost' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const { theme, season } = context.globals;
      const html = document.documentElement;
      html.setAttribute('data-theme', theme ?? 'dark');
      if (season && season !== 'none') {
        html.setAttribute('data-season', season);
      } else {
        html.removeAttribute('data-season');
      }
      return (
        <div style={{
          minHeight: '100vh',
          background: 'var(--bg)',
          color: 'var(--text)',
          fontFamily: 'var(--font-serif)',
          padding: '2rem',
          boxSizing: 'border-box',
        }}>
          <Story />
        </div>
      );
    },
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    layout: 'fullscreen',
  },
};

export default preview;
