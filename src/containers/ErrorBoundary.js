import PropTypes from "prop-types";
import React, { Component } from "react";

import { withSearch } from "../search-lib";
import { ErrorBoundary } from "../components";

export class ErrorBoundaryContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    error: PropTypes.string.isRequired
  };

  render() {
    return <ErrorBoundary {...this.props} />;
  }
}

export default withSearch(ErrorBoundaryContainer);
