function errorHandler(app, logger) {
  app.use(async (ctx, next) => {
    try {
      await next();
      if (ctx.status == 404) {
        ctx.body = `<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>`;
      }
    } catch (e) {
      ctx.body = '错误正在紧急修复中。。。';
      logger.error(e);
    }
  });
}

export { errorHandler };
