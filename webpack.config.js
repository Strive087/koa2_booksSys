const { argv } = require('yargs');
const path = require('path');
const merge = require('webpack-merge').default;
const config = require('./src/server/config');
const mode = argv.mode;
const envConfig = require(`./build/webpack.${mode}.js`);
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

console.log('当前打包环境', mode);

const files = glob.sync('./src/web/views/**/*.entry.js');

const entrys = {};

const htmlPlugins = [];

files.forEach((url) => {
  if (/([a-zA-Z]+-[a-zA-Z]+)\.entry\.js$/.test(url)) {
    const entryKey = RegExp.$1;
    const [pagesName, actionName] = entryKey.split('-');
    entrys[entryKey] = `./src/web/views/${pagesName}/${entryKey}.entry.js`;

    htmlPlugins.push(
      new HtmlWebpackPlugin({
        filename: `../web/views/${pagesName}/page/${actionName}.html`,
        template: `./src/web/views/${pagesName}/page/${actionName}.html`,
        chunks: ['runtime', entryKey],
      })
    );
  }
});

const baseConfig = {
  mode,
  entry: entrys,
  output: {
    path: path.join(__dirname, './dist/assets'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    ...htmlPlugins,
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, './src/web/views/layout'),
          to: '../web/views/layout',
        },
        {
          from: path.join(__dirname, './src/web/components'),
          to: '../web/components',
        },
      ],
    }),
  ],
};

module.exports = merge(baseConfig, envConfig);
