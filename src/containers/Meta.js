import PropTypes from "prop-types";
import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import Meta from "../components/Meta";

class MetaContainer extends Component {
  static propTypes = {
    current: PropTypes.number.isRequired,
    searchTerm: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    totalResults: PropTypes.number.isRequired
  };

  render() {
    const { current, searchTerm, size, totalResults } = this.props;

    if (!searchTerm) return null;

    return (
      <Meta
        current={current}
        searchTerm={searchTerm}
        size={size}
        totalResults={totalResults}
      />
    );
  }
}

export default withAppSearch(MetaContainer);
