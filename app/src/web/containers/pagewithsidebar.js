// @flow

import React from 'react';
import { addNavigationHelpers } from 'react-navigation';
import type { NavigationScreenProp, NavigationState } from 'react-navigation/src/TypeDefinition';

import Link from '../components/link';


const LinkableLi = Link.Linkable(props => <li {...props} />);


type Props = {
  router: NavigationState,
  navigation: NavigationScreenProp
};

class PageWithSidebar extends React.PureComponent<Props> {
  props: Props;

  render() {
    const { router, navigation: { dispatch, state } } = this.props;

    const ActiveScreen = router.getComponentForState(state);

    return (
      <div>
        Sidebar
        <ul>
          {state.routes && state.routes.map((route, index) => {
            const childNavigation = addNavigationHelpers({ state: route, dispatch });
            const isActive        = state.index === index;
            const options         = router.getScreenOptions(childNavigation, {});

            return (
              <LinkableLi className={isActive ? 'active' : ''}
                          key={`LINK-${route.routeName.toUpperCase()}`}
                          to={route.routeName}>
                {options.linkName || 'Link'}
              </LinkableLi>
            );
          })}
        </ul>
        Screen
        <ActiveScreen navigation={this.props.navigation} />
      </div>
    );
  }
}

export default PageWithSidebar;
