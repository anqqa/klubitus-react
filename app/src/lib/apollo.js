// @flow
import React from 'react';
import ApolloClient, { createNetworkInterface, ApolloProvider } from 'react-apollo';

import { GRAPHQL_ENDPOINT } from './constants';


const networkInterface = createNetworkInterface({
  uri: GRAPHQL_ENDPOINT,
});

/*
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    next();
  }
}]);
*/

const client = new ApolloClient({
  networkInterface,
});


const Apollo = AppNavigator => () => (
  <ApolloProvider client={client}>
    <AppNavigator />
  </ApolloProvider>
);


export default Apollo;
