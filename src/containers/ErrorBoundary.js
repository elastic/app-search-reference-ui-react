import PropTypes from "prop-types";
import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import { ErrorBoundary } from "../components";

class ErrorBoundaryContainer extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ]).isRequired,
    error: PropTypes.string.isRequired
  };

  render() {
    return <ErrorBoundary {...this.props} />;
  }
}

export default withAppSearch(ErrorBoundaryContainer);
