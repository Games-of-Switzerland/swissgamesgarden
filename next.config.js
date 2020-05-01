const withSass = require('@zeit/next-sass');
const Dotenv = require('dotenv-webpack');

module.exports = withSass({
  webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
    // Handle storybook source.
    config.module.rules.push({
      test: /\.stories\.jsx?$/,
      loaders: [require.resolve('@storybook/source-loader')],
      enforce: 'pre',
    });

    // Add the new plugin to the existing webpack plugins
    config.plugins.push(new Dotenv({silent: true}));

    return config;
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config;
  },
});
