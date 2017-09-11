import React from 'react';
import ReactDOM from 'react-dom';

import Apollo from '../lib/apollo';
import NavigationAwareView from './containers/navigationawareview';
import App from './containers/app';


const ClientApp       = NavigationAwareView(App);
const ApolloClientApp = Apollo(ClientApp);

ReactDOM.render(<ApolloClientApp />, document.getElementById('app'));
