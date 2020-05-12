const withPlugins = require('next-compose-plugins');
const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const {parsed: localEnv} = require('dotenv').config();

const nextConfig = {
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  },
  publicRuntimeConfig: {
    // will be available on both server and client
    ...process.env,
  },
};

module.exports = withPlugins([[withSass, {}]], nextConfig);
