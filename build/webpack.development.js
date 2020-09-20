const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

module.exports = {
  watch: true,

  plugins: [
    new WebpackBuildNotifierPlugin({
      title: 'Koa2_booksSys Webpack Build',
      suppressSuccess: true,
    }),
    new BundleAnalyzerPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../src/web/views/layout'),
          to: '../views/layout',
        },
        {
          from: path.join(__dirname, '../src/web/components'),
          to: '../components',
        },
      ],
    }),
  ],
};
