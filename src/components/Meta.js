import PropTypes from "prop-types";
import React from "react";

import "./Meta.css";

function Meta({ current, size, searchTerm, totalResults }) {
  return (
    <div className="Meta">
      <div className="Meta-term">
        <span>Results for:</span>
        <span>{searchTerm}</span>
      </div>
      <div className="Meta-paging">
        Showing {current} - {current + size} of {totalResults}
      </div>
    </div>
  );
}

Meta.propTypes = {
  current: PropTypes.number.isRequired,
  searchTerm: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired
};

export default Meta;
