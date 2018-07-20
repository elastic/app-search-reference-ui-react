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
    const start = totalResults === 0 ? 0 : (current - 1) * size + 1;
    const end = totalResults <= size ? totalResults : start + size - 1;

    if (!searchTerm) return null;

    return (
      <Meta
        end={end}
        searchTerm={searchTerm}
        start={start}
        totalResults={totalResults}
      />
    );
  }
}

export default withAppSearch(MetaContainer);
