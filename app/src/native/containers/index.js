import { TabBarBottom, TabNavigator } from 'react-navigation';

import Apollo from '../../lib/apollo';
import { Color } from '../../lib/constants';

import Routes from '../config/routes';


const AppNavigator = TabNavigator(Routes, {
  navigationOptions: {
    initialRouteName: 'Events',
  },
  tabBarComponent: TabBarBottom,
  tabBarOptions:   {
    activeTintColor:   Color.TEXT,
    inactiveTintColor: Color.TEXT_DARK,
    style:             {
      backgroundColor: Color.BACKGROUND_LIGHT,
    },
  },
  tabBarPosition:  'bottom',
});


export default Apollo(AppNavigator);
