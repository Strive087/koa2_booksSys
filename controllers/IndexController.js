import Controller from './Controller';
import BooksModel from '../models/BooksModel';
// const Controller = require("./Controller");
// const BooksModel = require('../models/BooksModel');

class IndexController extends Controller {
  constructor() {
    super();
  }
  // async actionIndex(ctx) {
  //   // throw new Error('自定义错误')
  //   await booksModel.getBooksDataList().then(async (data) => {
  //     console.log(data);
  //     ctx.body = await ctx.render('index', {
  //       message: '后端输出的数据',
  //       books: data
  //     })
  //   }).catch((e) => {
  //     console.log(e);
  //   });

  // }

  async actionIndex(ctx) {
    // throw new Error('自定义错误')
    const result = await BooksModel.getBooksDataList();
    ctx.body = await ctx.render('index', {
      message: result.message,
      books: result.data,
    });
  }
}

export default IndexController;
