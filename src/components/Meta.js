import PropTypes from "prop-types";
import React from "react";

import "./Meta.css";

function Meta({ end, searchTerm, start, totalResults }) {
  return (
    <div className="Meta">
      <div className="Meta-term">
        <span>Results for:</span>
        <span>{searchTerm}</span>
      </div>
      <div className="Meta-paging">
        Showing {start} - {end} of {totalResults}
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
