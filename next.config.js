const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  webpack(config) {
    config.resolve = {
      ...config.resolve,
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    };
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/games',
        destination: '/',
        permanent: true,
      },
      {
        source: '/people',
        destination: '/',
        permanent: true,
      },
      {
        source: '/studios',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
