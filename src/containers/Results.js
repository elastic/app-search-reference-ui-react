import PropTypes from "prop-types";
import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import Results from "../components/Results";

class ResultsContainer extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired
  };

  render() {
    const { results } = this.props;

    return <Results results={results} />;
  }
}

export default withAppSearch(ResultsContainer);
