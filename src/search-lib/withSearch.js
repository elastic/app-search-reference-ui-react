import React from "react";

import SearchConsumer from "./SearchConsumer";

/**
 * This is a Higher Order Component that is used to expose (as `props`) all
 * state and Actions provided by the SearchProvider to "container"
 * components.
 */
export default function withSearch(Component) {
  return function(props) {
    return (
      <SearchConsumer>
        {context => <Component {...context} {...props} />}
      </SearchConsumer>
    );
  };
}
