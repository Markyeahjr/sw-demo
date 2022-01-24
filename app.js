const Koa = require('koa');
const app = new Koa();
const koaStatic = require('koa-static-server');
const rootDir = './view';
const port = 80;

app.use(
  koaStatic({
    rootDir,
    rootPath: ''
  })
);

console.log(`open: http://localhost:${port}`);
app.listen(port);