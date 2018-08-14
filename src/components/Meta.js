import PropTypes from "prop-types";
import React from "react";

function Meta({ end, searchTerm, start, totalResults }) {
  return (
    <div className="meta">
      <div className="meta__paging-info">
        Showing{" "}
        <strong>
          {start} - {end}
        </strong>{" "}
        out of <strong>{totalResults}</strong>{" "}
        for: <em>{searchTerm}</em>
      </div>
      <div className="meta__result-count">
        <label htmlFor="result-count">Show{" "}
          <select name="result-count" id="result-count">
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="all">All</option>
          </select>
        </label>
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
