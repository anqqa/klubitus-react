// @flow

import React from 'react';
import { addNavigationHelpers, createNavigator } from 'react-navigation/lib/react-navigation.web';
import { TabRouter } from 'react-navigation';

import PageWithSidebar from './pagewithsidebar';


/**
 * View with navigation.
 *
 * @param  {object}  navigation
 * @param  {object}  router
 * @return  {React.Component}
 *
 * @constructor
 */
const NavView = ({ navigation, router }: { navigation: any, router: any }) => {
  const { state } = navigation;
  const Component = router.getComponentForState(state);

  return <Component navigation={addNavigationHelpers({ ...navigation, state: state.routes[state.index] })} />;
};


class AppFrame extends React.Component {
  render() {
    const { navigation, router } = this.props;
    const childNavigation        = addNavigationHelpers({
      ...navigation,
      state: navigation.state.routes[navigation.state.index],
    });
    const { state: { routes, index } }  = navigation;
    const route = routes[index];
    const ScreenView = router.getComponentForRouteName(route.routeName);

    return (
      <div>
        AppFrame
        <ScreenView navigation={childNavigation} />
      </div>
    );
  }
}


class HomePage extends React.Component {
  static navigationOptions = {
    title: 'Klubitus'
  };

  render() {
    return (
      <div>
        HomePage
      </div>
    );
  }
}


const EventsPage = createNavigator(
  TabRouter({
    LatestEvents: {
      path:   '',
      screen: HomePage,
    }
  })
)(PageWithSidebar);
EventsPage.navigationOptions = ({ navigationOptions }) => ({ title: `${navigationOptions.title} | Klubitus` });


const App = createNavigator(
  TabRouter({
    Home: {
      path:   '',
      screen: HomePage,
    },
    Events: {
      path:   'events',
      screen: EventsPage,
    },
    Forum: {
      path:   'forum',
      screen: HomePage,
    },
    NotFound: {
      screen:            HomePage,
      navigationOptions: { title: 'Page not found' }
    }
  }, {
    initialRouteName: 'Home'
  })
)(PageWithSidebar);

export default App;

