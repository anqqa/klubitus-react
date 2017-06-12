'use strict';

const Hapi = require('hapi');
const { graphqlHapi } = require('graphql-server-hapi');

const HOST = 'localhost';
const PORT = 3000;

const server = new Hapi.Server();
server.connection({
  host: HOST,
  port: PORT
});


server.register({
  register: graphqlHapi,
  options:  {
    path: '/graphql',
    graphqlOptions: { schema: null },
  },
});


server.start((err) => {
  if (err) {
    throw err;
  }

  console.log(`Server running at: ${server.info.uri}`);
});
