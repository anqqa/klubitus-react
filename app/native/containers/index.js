import React from 'react';
import { TabBarBottom, TabNavigator } from 'react-navigation';

import Routes from '../config/routes';


const AppNavigator = TabNavigator(Routes, {
  navigationOptions: {
    initialRouteName: 'Events'
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom'
});


export default() => <AppNavigator />;
