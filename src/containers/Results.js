import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import Results from "../components/Results";

class ResultsContainer extends Component {
  render() {
    return <Results results={this.props.results} />;
  }
}

export default withAppSearch(ResultsContainer);
