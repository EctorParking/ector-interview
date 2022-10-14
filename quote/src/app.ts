import Koa from 'koa';
import koaBody from 'koa-body';

import helloRouter from './controller/hello';

const app = new Koa();

app
  .use(koaBody())
  .use(helloRouter.routes());

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('🚀 Ready on port 3000');
});
