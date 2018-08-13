import PropTypes from "prop-types";
import React from "react";

function Meta({ end, searchTerm, start, totalResults }) {
  return (
    <div className="results__result-count">
      Showing{" "}
      <strong>
        {start} - {end}
      </strong>{" "}
      of <strong>{totalResults}</strong> for <strong>{searchTerm}</strong>
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
