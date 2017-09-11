// @flow

import PropTypes from 'prop-types';
import React from 'react';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import type { NavigationParams } from 'react-navigation/src/TypeDefinition';


/**
 * Get navigation action.
 *
 * @param  {object}            router
 * @param  {string}            path
 * @param  {NavigationParams}  [params]
 */
function getAction(router, path: string, params?: NavigationParams) {
  const action = router.getActionForPathAndParams(path, params);

  if (action) {
    return action;
  }

  return NavigationActions.navigate({
    params:    { path },
    routeName: 'NotFound',
  });
}


export default (NavigationAwareView) => {
  const initialAction = getAction(NavigationAwareView.router, window.location.pathname.substr(1));
  const initialState  = NavigationAwareView.router.getStateForAction(initialAction);

  console.log({ initialAction, initialState });


  /**
   * Set document title.
   *
   * @param  {object}    state
   * @param  {Function}  dispatch
   */
  function setDocumentTitle(state, dispatch) {
    const navigation = addNavigationHelpers({ state, dispatch });

    document.title = NavigationAwareView.router.getScreenOptions(navigation).title;
  }


  class NavigationContainer extends React.Component {
    static childContextTypes = {
      dispatch:                  PropTypes.func.isRequired,
      getActionForPathAndParams: PropTypes.func.isRequired,
      getURIForAction:           PropTypes.func.isRequired,
    };

    state = initialState;


    getChildContext() {
      return {
        dispatch:                  this.dispatch,
        getActionForPathAndParams: this.getActionForPathAndParams,
        getURIForAction:           this.getURIForAction,
      };
    }


    componentDidMount() {
      setDocumentTitle(this.state.routes[this.state.index], this.dispatch);

      // Handle browser back button
      window.onpopstate = (event) => {
        event.preventDefault();

        const action = getAction(NavigationAwareView.router, window.location.pathname.substr(1));

        if (action) {
          this.dispatch(action);
        }
      };
    }


    componentWillUpdate(nextProps, nextState) {

      // Update browser history to match state
      const { path, params } = NavigationAwareView.router.getPathAndParamsForState(nextState);
      const hash             = params && params.hash ? `#${params.hash}` : '';
      const uri              = `/${path}${hash}`;

      if (window.location.pathname !== uri) {
        window.history.pushState({}, nextState.title, uri);
      }

      setDocumentTitle(nextState.routes[nextState.index], this.dispatch);
    }


    componentDidUpdate() {

      // Scroll to element id
      const { params } = NavigationAwareView.router.getPathAndParamsForState(this.state);

      if (params && params.hash) {
        document.getElementById(params.hash).scrollIntoView();
      }

    }


    /**
     * Maps URI to Action.
     *
     * @param   {string}            path
     * @param   {NavigationParams}  [params]
     * @return  {Action|undefined}
     */
    getActionForPathAndParams = (path: string, params?: NavigationParams) => {
      return NavigationAwareView.router.getActionForPathAndParams(path, params);
    };


    /**
     * Maps Action to URI.
     *
     * @param   {Action}  action
     * @return  {string}
     */
    getURIForAction = (action) => {
      const state    = NavigationAwareView.router.getStateForAction(action, this.state) || this.state;
      const { path } = NavigationAwareView.router.getPathAndParamsForState(state);

      return `/${path}`;
    };


    dispatch = (action) => {
      const state = NavigationAwareView.router.getStateForAction(action, this.state);

      if (!state) {
        console.log('Dispatched action did not change state', { action });
      }
      else if (console.group) {
        console.group('Navigation Dispatch');
        console.log('Action', action);
        console.log('New State', state);
        console.log('Last State', this.state);
        console.groupEnd();
      }
      else {
        console.log('Navigation Dispatch', { action, newState: state, lastState: this.state });
      }

      if (!state) {
        return true;
      }

      if (state !== this.state) {
        this.setState(state);

        return true;
      }

      return false;
    };


    render() {
      return (
        <div>
          NavigationAwareView
          <NavigationAwareView navigation={addNavigationHelpers({ state: this.state, dispatch: this.dispatch })}/>
        </div>
      );
    }

  }

  return NavigationContainer;
};
