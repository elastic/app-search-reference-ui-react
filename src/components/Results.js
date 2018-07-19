import PropTypes from "prop-types";
import React from "react";

import "./Results.css";

import Result from "./Result";

function Results({ results }) {
  return (
    <div className="Results">
      {results.map(result => (
        <Result key={result.getRaw("id")} result={result} />
      ))}
    </div>
  );
}

Results.propTypes = {
  results: PropTypes.array.isRequired
};

export default Results;
