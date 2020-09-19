const HtmlWebpackPlugin = require('html-webpack-plugin');
const pluginName = 'afterHtmlPlugin';

function createHtml(type, arr) {
  let result = '';
  if (type === 'js') {
    arr.forEach((jsSrc) => {
      result += `<script src='${jsSrc}'></script>`;
    });
  }
  if (type === 'css') {
    arr.forEach((cssHref) => {
      result += `<link href="${cssHref}" rel=stylesheet></link>`;
    });
  }

  return result;
}

class afterHtmlPlugin {
  jsArr = [];
  cssArr = [];
  apply(compiler) {
    //提取js、css
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        pluginName,
        (data, cb) => {
          this.jsArr = data.assets.js;
          this.cssArr = data.assets.css;
          cb(null, data);
        }
      );
    });

    //重新写入js、css
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        pluginName,
        (data, cb) => {
          data.html = data.html.replace(
            '<!-- injectjs -->',
            createHtml('js', this.jsArr)
          );
          data.html = data.html.replace(
            '<!-- injectcss -->',
            createHtml('css', this.cssArr)
          );
          cb(null, data);
        }
      );
    });
  }
}

module.exports = afterHtmlPlugin;
