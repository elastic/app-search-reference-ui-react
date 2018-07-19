import React from "react";

import AppSearchConsumer from "../app-search/AppSearchConsumer";

export default function withAppSearch(Component) {
  return function(props) {
    return (
      <AppSearchConsumer>
        {context => <Component {...context} {...props} />}
      </AppSearchConsumer>
    );
  };
}
