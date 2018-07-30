import PropTypes from "prop-types";
import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import Results from "../components/Results";
import Result from "../components/Result";
import config from "../config/engine.json";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTitleField() {
  // Use "title" as the title field if a user hasn't specified a title field
  return config.titleField || "title";
}

function getTitle(result) {
  const titleField = getTitleField();

  return (
    result.getSnippet(titleField) ||
    result.getRaw(titleField) ||
    result.getRaw("id") // As a last resort, just show ID if nothing else
  );
}

function formatResultFields(result) {
  return Object.keys(result.data).reduce((acc, n) => {
    if (["_meta", "id", getTitleField()].includes(n)) return acc;

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
