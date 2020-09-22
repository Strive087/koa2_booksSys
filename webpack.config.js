const { argv } = require('yargs');
const path = require('path');
const merge = require('webpack-merge').default;
const mode = argv.mode;
const envConfig = require(`./build/webpack.${mode}.js`);
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const afterHtmlPlugin = require('./build/afterHtmlPlugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
        filename: `../views/${pagesName}/page/${actionName}.html`,
        template: `./src/web/views/${pagesName}/page/${actionName}.html`,
        chunks: ['runtime', entryKey],
        inject: false,
      })
    );
  }
});

const baseConfig = {
  mode,
  entry: entrys,
  output: {
    path: path.join(__dirname, './dist/web/assets'),
    filename: '[name].[hash:5].js',
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
    new afterHtmlPlugin(),
    new CleanWebpackPlugin(),
  ],
};

module.exports = merge(baseConfig, envConfig);
