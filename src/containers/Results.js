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
  // Use "title" field as the title field if a user hasn't specified one
  return config.titleField || "title";
}

function getUrlField() {
  return config.urlField;
}

function getTitle(result) {
  const titleField = getTitleField();

  return (
    result.getSnippet(titleField) ||
    result.getRaw(titleField) ||
    result.getRaw("id") // As a last resort, just show ID if nothing else
  );
}

function getUrl(result) {
  const urlField = getUrlField();
  if (urlField) return result.getRaw(urlField);
}

/*
  Our `Result` component expects result fields to be formatted in an object
  like:
  {
    field1: "value1",
    field2: "value2"
  }

  Our search results object is not formatted that way, so this function does
  that formatting.

  Note that we explicitly "exclude" certain fields that we know we don't
  want to show, like "id", the title field, and the url field.
*/
function formatResultFields(result) {
  return Object.keys(result.data).reduce((acc, n) => {
    if (["_meta", "id", getTitleField(), getUrlField()].includes(n)) return acc;

    let value = result.getSnippet(n) || result.getRaw(n);
    value = Array.isArray(value) ? value.join(", ") : value;
    acc[`${capitalizeFirstLetter(n)}`] = value;
    return acc;
  }, {});
}
class ResultsContainer extends Component {
  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    const { results } = this.props;

    return (
      <Results>
        {results.map(result => (
          <Result
            fields={formatResultFields(result)}
            key={`result-${result.getRaw("id")}`}
            title={getTitle(result)}
            url={getUrl(result)}
          />
        ))}
      </Results>
    );
  }
}

export default withAppSearch(ResultsContainer);
