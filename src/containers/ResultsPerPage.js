import PropTypes from "prop-types";
import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import ResultsPerPage from "../components/ResultsPerPage";

class ResultsPerPageContainer extends Component {
  static propTypes = {
    resultsPerPage: PropTypes.number.isRequired,
    searchTerm: PropTypes.string.isRequired,
    setResultsPerPage: PropTypes.func.isRequired
  };

  render() {
    const { resultsPerPage, searchTerm, setResultsPerPage } = this.props;

    if (!searchTerm) return null;

    return (
      <ResultsPerPage
        onChange={e => {
          setResultsPerPage(parseInt(e.currentTarget.value, 10));
        }}
        options={[20, 40, 60]}
        value={resultsPerPage}
      />
    );
  }
}

export default withAppSearch(ResultsPerPageContainer);
