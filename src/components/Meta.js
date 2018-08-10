import PropTypes from "prop-types";
import React from "react";

function Meta({ end, searchTerm, start, totalResults }) {
  return (
    <div className="results__header">
      <div className="results__result-count">
        Showing{" "}
        <strong>
          {start} - {end}
        </strong>{" "}
        of <strong>{totalResults}</strong>
      </div>
      <div className="results__powered-by powered-by">
        <span>Results for: </span>
        <span>{searchTerm}</span>
      </div>
    </div>
  );
}

Meta.propTypes = {
  end: PropTypes.number.isRequired,
  searchTerm: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired
};

export default Meta;
