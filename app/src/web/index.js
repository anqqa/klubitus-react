import React from 'react';
import ReactDOM from 'react-dom';

import NavigationAwareView from './containers/navigationawareview';
import App from './containers/app';


const ClientApp = NavigationAwareView(App);

ReactDOM.render(<ClientApp />, document.getElementById('app'));
