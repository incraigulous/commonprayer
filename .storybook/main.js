/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  stories: [
    '../ui-kit/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: [
    '../ui-kit/assets',
    '../public',
  ],
};

export default config;
