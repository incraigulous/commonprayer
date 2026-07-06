import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const commonPrayerTheme = create({
  base: 'dark',

  // Brand
  brandTitle: 'Common Prayer — Design System',
  brandUrl: '/',
  brandTarget: '_self',

  // Colors
  colorPrimary: '#d65846',    // rubric red
  colorSecondary: '#c9a24b',  // illuminated gold

  // UI
  appBg: '#04070f',           // ink-950
  appContentBg: '#0a0e1a',    // ink-900
  appPreviewBg: '#04070f',
  appBorderColor: '#2a3446',  // ink-700
  appBorderRadius: 4,

  // Text
  textColor: '#ece7db',       // vellum-text
  textInverseColor: '#04070f',
  textMutedColor: '#9ca2ad',  // ink-400

  // Toolbar default and active colors
  barTextColor: '#9ca2ad',
  barHoverColor: '#ece7db',
  barSelectedColor: '#d65846',
  barBg: '#121826',           // ink-850

  // Form colors
  inputBg: '#1a2130',         // ink-800
  inputBorder: '#2a3446',
  inputTextColor: '#ece7db',
  inputBorderRadius: 4,

  // Fonts
  fontBase: 'ui-sans-serif, system-ui, -apple-system, Helvetica, Arial, sans-serif',
  fontCode: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
});

addons.setConfig({
  theme: commonPrayerTheme,
});
