import React from 'react';
import ApolloClient, { createNetworkInterface, ApolloProvider } from 'react-apollo';
import { TabBarBottom, TabNavigator } from 'react-navigation';

import Routes from '../config/routes';
import { GRAPHQL_ENDPOINT } from '../../lib/constants';

const networkInterface = createNetworkInterface({
  uri: GRAPHQL_ENDPOINT
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

const AppNavigator = TabNavigator(Routes, {
  navigationOptions: {
    initialRouteName: 'Events'
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom'
});


export default () => <ApolloProvider client={client}>
  <AppNavigator />
</ApolloProvider>;
