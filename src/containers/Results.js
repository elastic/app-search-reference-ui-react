import PropTypes from "prop-types";
import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import Results from "../components/Results";
import Result from "../components/Result";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTitle(result) {
  return (
    result.getSnippet("title") ||
    result.getRaw("title") ||
    result.getSnippet("name") ||
    result.getRaw("name") ||
    result.getRaw("id")
  );
}

function formatResultFields(result) {
  var { _meta, id, name, title, ...filtered } = result.data;
  return Object.keys(filtered).reduce((acc, n) => {
    let value = result.getSnippet(n) || result.getRaw(n);
    value = Array.isArray(value) ? value.join(", ") : value;
    acc[`${capitalizeFirstLetter(n)}`] = value;
    return acc;
  }, {});
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
            fields={formatResultFields(result)}
            key={`result-${result.getRaw("id")}`}
            result={result}
            title={getTitle(result)}
          />
        ))}
      </Results>
    );
  }
}

export default withAppSearch(ResultsContainer);
