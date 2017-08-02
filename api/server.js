import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import { postgraphql } from 'postgraphql';

const JWT_SECRET  = process.env.JWT_SECRET;
const PG_USER     = process.env.POSTGRES_USER;
const PG_PASSWORD = process.env.POSTGRES_PASSWORD;
const PG_DATABASE = process.env.POSTGRES_DB;
const PORT        = process.env.PORT || 3000;

const app    = new koa();
const router = new koaRouter();


// Logging
app.use(async function(context, next) {
  const start = new Date();

  await next();

  const ms = new Date() - start;

  console.log(`${context.method} ${context.url} - ${ms}`);
});


// GraphQL
app.use(postgraphql(`postgres://${PG_USER}:${PG_PASSWORD}@db:5432/${PG_DATABASE}`, ['klubitus', 'klubitus_private'], {
  exportGqlSchemaPath:  '/opt/api/schema/schema.graphqls',
  exportJsonSchemaPath: '/opt/api/schema/schema.json',
  graphiql:             true,
  jwtPgTypeIdentifier:  'klubitus.jwt_token',
  jwtSecret:            JWT_SECRET,
  pgDefaultRole:        'klubitus_guest',
  //watchPg:              true,
}));


// app.use(koaBody());
// app.use(router.routes());
// app.use(router.allowedMethods());


app.listen(PORT, () => {
  console.log('Server is running on', `http://localhost:${PORT}`);
  console.log('GraphiQL dashboard', `http://localhost:${PORT}/graphiql`);
});
