import React from "react";

import AppSearchConsumer from "../app-search/AppSearchConsumer";

/**
 * This is a Higher Order Component that is used to expose (as `props`) all
 * state and Actions provided by the AppSearchProvider to "container"
 * components.
 */
export default function withAppSearch(Component) {
  return function(props) {
    return (
      <AppSearchConsumer>
        {context => <Component {...context} {...props} />}
      </AppSearchConsumer>
    );
  };
}
