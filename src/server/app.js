import Koa from 'koa';
import render from 'koa-swig';
import config from './config';
import initController from './controllers';
import co from 'co';
import serve from 'koa-static';
import { errorHandler } from './middlewares';
import { historyApiFallback } from 'koa2-connect-history-api-fallback';
import log4js from 'log4js';

log4js.configure({
  appenders: { error: { type: 'file', filename: './logs/error.log' } },
  categories: { default: { appenders: ['error'], level: 'error' } },
});

const logger = log4js.getLogger('error');

const app = new Koa();

//配置swig模板
app.context.render = co.wrap(
  render({
    root: config.viewsDir,
    autoescape: true,
    cache: config.cache,
    ext: 'html',
    varControls: ['[[', ']]'],
  })
);

//配置静态资源路径
app.use(serve(config.staticDir));
//配置前端路由与后端路由容错
app.use(historyApiFallback({ index: '/', whiteList: ['/api', '/books'] }));

//错误处理
errorHandler(app, logger);

//配置路由
initController(app);

app.listen(config.port, () => {
  console.log('server is running...');
});
