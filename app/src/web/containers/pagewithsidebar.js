// @flow
import React from 'react';
import { addNavigationHelpers } from 'react-navigation';

import Link from '../components/link';

const LinkableLi = Link.Linkable(props => <li {...props} />);

class PageWithSidebar extends React.Component {
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
              <LinkableLi key={index} to={route.routeName} className={isActive ? 'active' : ''}>
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
