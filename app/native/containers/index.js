import React from 'react';
import ApolloClient, { createNetworkInterface, ApolloProvider } from 'react-apollo';
import { TabBarBottom, TabNavigator } from 'react-navigation';

import Routes from '../config/routes';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8080/graphql'
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


export default() => <ApolloProvider client={client}>
  <AppNavigator />
</ApolloProvider>;

