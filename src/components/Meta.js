import React from "react";
import "./Meta.css";

export default function Meta({ searchTerm, totalResults, current, size }) {
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
