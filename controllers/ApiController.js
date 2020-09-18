import Controller from './Controller';
// const Controller = require("./Controller");

class ApiController extends Controller {
  constructor() {
    super();
  }
  actionDataList(ctx) {
    ctx.body = [
      {
        id: 1,
        data: 'hello',
      },
      {
        id: 2,
        data: 'world',
      },
    ];
  }
}

export default ApiController;
