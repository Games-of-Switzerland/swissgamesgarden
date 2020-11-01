const path = require('path');

module.exports = {
  stories: ['../src/components/**/*.stories.@(js|jsx)'],
  addons: [
    '@storybook/addon-docs/preset',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-knobs/preset',
    '@storybook/addon-backgrounds',
  ],
  webpackFinal: config => {
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, '../'),
      path.resolve(__dirname, '../src'),
      'node_modules',
    ];

    return config;
  },
};
