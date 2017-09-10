// @flow

import React, { Component, PropTypes } from 'react';
import { createNavigator } from 'react-navigation';


/**
 * View with navigation.
 *
 * @param  {object}  navigation
 * @param  {object]  router
 * @returns  {XML}
 *
 * @constructor
 */
const NavView = ({ navigation, router }) => {
  const { state } = navigation;
  const Component = router.getComponentForState(state);

  return (
    <Component navigation={addNavigationHelpers({ ...navigation, state: state.routes[state.index] })} />
  );
};


const App = createNavigator();

class ReactKlubitus extends React.Component {
  render() {
    return (
      <div className="react">
        Klubitus React
      </div>
    );
  }
}

ReactKlubitus.propTypes = {

};

export default ReactKlubitus;
