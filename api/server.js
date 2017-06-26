import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import { graphiqlKoa, graphqlKoa } from 'graphql-server-koa';

const PORT = 3000;

const app = new koa();
const router = new koaRouter();

app.use(koaBody());

// GraphQL
router.post('/graphql', graphqlKoa({ schema: null }));
router.get('/graphql', graphqlKoa({ schema: null }));

router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

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
