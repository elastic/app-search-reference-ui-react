import PropTypes from "prop-types";
import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import Results from "../components/Results";
import Result from "../components/Result";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class ResultsContainer extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired
  };

  render() {
    const { results } = this.props;

    return (
      <Results>
        {results.map(result => (
          <Result
            fields={{
              [`${capitalizeFirstLetter("description")}`]: result.getRaw(
                "description"
              ),
              [`${capitalizeFirstLetter("version")}`]: result.getRaw("version")
            }}
            key={`result-${result.getRaw("id")}`}
            result={result}
            title={result.getRaw("name")}
          />
        ))}
      </Results>
    );
  }
}

export default withAppSearch(ResultsContainer);
