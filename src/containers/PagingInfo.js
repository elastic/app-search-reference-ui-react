import PropTypes from "prop-types";
import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import PagingInfo from "../components/PagingInfo";

class PagingInfoContainer extends Component {
  static propTypes = {
    current: PropTypes.number.isRequired,
    resultsPerPage: PropTypes.number.isRequired,
    searchTerm: PropTypes.string.isRequired,
    totalResults: PropTypes.number.isRequired
  };

  render() {
    const { current, resultsPerPage, searchTerm, totalResults } = this.props;
    const start = totalResults === 0 ? 0 : (current - 1) * resultsPerPage + 1;
    const end =
      totalResults <= resultsPerPage
        ? totalResults
        : start + resultsPerPage - 1;

    if (!searchTerm) return null;

    return (
      <PagingInfo
        end={end}
        searchTerm={searchTerm}
        start={start}
        totalResults={totalResults}
      />
    );
  }
}

export default withAppSearch(PagingInfoContainer);
