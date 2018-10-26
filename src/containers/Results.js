import PropTypes from "prop-types";
import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import { Result, Results } from "../components";
import * as Config from "../config/config-helper";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function htmlEscape(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
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
    // Fallback to raw values here, because non-string fields
    // will not have a snippet fallback. Raw values MUST be html escaped.
    let value = result.getSnippet(n) || htmlEscape(result.getRaw(n));
    value = Array.isArray(value) ? value.join(", ") : value;
    acc[`${capitalizeFirstLetter(n)}`] = value;
    return acc;
  }, {});
}
export class ResultsContainer extends Component {
  static propTypes = {
    results: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.object.isRequired,
        getRaw: PropTypes.func.isRequired,
        getSnippet: PropTypes.func.isRequired
      })
    ).isRequired,
    trackClickThrough: PropTypes.func.isRequired
  };

  handleClickLink = id => {
    const { trackClickThrough } = this.props;
    trackClickThrough(id);
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
            onClickLink={() => this.handleClickLink(result.getRaw("id"))}
            title={Config.getResultTitle(result)}
            url={Config.getResultUrl(result)}
          />
        ))}
      </Results>
    );
  }
}

export default withAppSearch(ResultsContainer);
