import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import { postgraphql } from 'postgraphql';

const PORT = process.env.PORT;
const PG_USER = process.env.POSTGRES_USER;
const PG_PASSWORD = process.env.POSTGRES_PASSWORD;
const PG_DATABASE = process.env.POSTGRES_DB;

const app = new koa();
const router = new koaRouter();

app.use(koaBody());


// GraphQL
app.use(postgraphql(`postgres://${PG_USER}:${PG_PASSWORD}@db:5432/${PG_DATABASE}`, 'public', {
  graphiql: true
}));


// Logging
app.use(async function(ctx, next) {
  const start = new Date();

  await next();

  const ms = new Date() - start;

  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});


app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log('Server is running on', `localhost:${PORT}`);
  console.log('GraphiQL dashboard', `localhost:${PORT}/graphiql`);
});
