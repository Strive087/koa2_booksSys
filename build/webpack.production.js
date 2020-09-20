const CopyPlugin = require('copy-webpack-plugin');
const minify = require('html-minifier').minify;
const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  output: {
    //无改动的情况hash不变，考虑到缓存因素
    filename: '[name].[contenthash].js',
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin({})],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../src/web/views/layout'),
          to: '../views/layout',
          transform(content) {
            return minify(content.toString(), {
              collapseWhitespace: true,
            });
          },
        },
        {
          from: path.join(__dirname, '../src/web/components'),
          to: '../components',
          transform(content) {
            return minify(content.toString(), {
              collapseWhitespace: true,
              minifyCSS: true,
            });
          },
        },
      ],
    }),
  ],
};
