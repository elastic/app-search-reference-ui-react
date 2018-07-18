import React, { Component } from "react";

import Results from "../components/Results";

class ResultsContainer extends Component {
  state = {
    results: [{ id: "a" }, { id: "b" }, { id: "c" }]
  };

  render() {
    return <Results results={this.state.results} />;
  }
}

export default ResultsContainer;
