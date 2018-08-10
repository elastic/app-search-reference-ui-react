import PropTypes from "prop-types";
import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import Results from "../components/Results";
import Result from "../components/Result";
import * as Config from "../config/config-helper";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/*
  Our `Result` component expects result fields to be formatted in an object
  like:
  {
    field1: "value1",
    field2: "value2"
  }
*/
function formatResultFields(result) {
  return Object.keys(result.data).reduce((acc, n) => {
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
            fields={Config.stripUnnecessaryResultFields(
              formatResultFields(result)
            )}
            key={`result-${result.getRaw("id")}`}
            title={Config.getResultTitle(result)}
            url={Config.getResultUrl(result)}
          />
        ))}
      </Results>
    );
  }
}

export default withAppSearch(ResultsContainer);
