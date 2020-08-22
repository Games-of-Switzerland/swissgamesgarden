const path = require('path');

module.exports = ({config}) => {
  config.module.rules = [
    ...(config.module.rules || []),
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    },
  ];

  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve(__dirname, '../'),
    path.resolve(__dirname, '../src'),
    'node_modules',
  ];

  return config;
};
