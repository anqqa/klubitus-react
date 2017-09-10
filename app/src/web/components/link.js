// @flow
import PropTypes from 'prop-types';
import React from 'react';
import { NavigationActions } from 'react-navigation';


const isModifiedEvent = event => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const Linkable = Inner => {
  class LinkableWrapped extends React.Component {
    static contextTypes = {
      dispatch:                  PropTypes.func.isRequired,
      getURIForAction:           PropTypes.func.isRequired,
      getActionForPathAndParams: PropTypes.func.isRequired,
    };

    /**
     * Get Navigation action for component.
     *
     * @return  {Action|null}
     */
    getAction = () => {
      const { to, href } = this.props;

      if (typeof to === 'string') {

        // Route given
        return NavigationActions.navigate({ routeName: to });

      }
      else if (typeof to === 'object' && typeof to.type === 'string') {

        // Action given
        return to;

      }
      else if (href) {

        // URL given
        const match = href.match(/^\/(.*)/);

        if (match) {
          const pathParts = match[1].split('#');
          const path      = pathParts[0];
          let params      = {};

          if (pathParts.length) {
            params.hash = pathParts[1];
          }

          return this.context.getActionForPathAndParams(path, params);
        }
      }

      return null;
    };


    /**
     * Get URL for target.
     *
     * @return  {string}
     */
    getURL() {
      const action = this.getAction();

      if (!action) {
        return '#';
      }

      return this.context.getURIForAction(action);
    }


    /**
     * Handle click.
     *
     * @param  {Event}  event
     */
    onClick = event => {
      const action = this.getAction();

      if (!isModifiedEvent(event) && action) {
        this.context.dispatch(action);

        event.preventDefault();
      }
    };

    render() {
      return <Inner href={this.getURL()} onClick={this.onClick} {...this.props} />;
    }
  }

  return LinkableWrapped;
};


const Link = Linkable(props => <a {...props} />);

Link.Linkable = Linkable;

export default Link;
