import Router from '@koa/router';
import IndexController from './IndexController';
import ApiController from './ApiController';
// const Router = require('@koa/router');
// const IndexController = require('./IndexController');
// const ApiController = require('./ApiController');

const router = new Router();
const indexController = new IndexController();
const apiController = new ApiController();

function initController(app) {
  router.get('/', (ctx) => {
    ctx.body = 'home';
  });

  router.get('/books', indexController.actionIndex);

  router.get('/api/getDataList', apiController.actionDataList);

  app.use(router.routes());
}

export default initController;
