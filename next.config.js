const withSass = require('@zeit/next-sass');

module.exports = withSass({
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {

    // Handle storybook source.
    config.module.rules.push({
      test: /\.stories\.jsx?$/,
      loaders: [require.resolve('@storybook/source-loader')],
      enforce: 'pre',
    });

    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config
  },
});
