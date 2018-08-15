import React from "react";

import Facets from "../containers/Facets";
import Meta from "../containers/Meta";
import Paging from "../containers/Paging";
import Results from "../containers/Results";
import Sorting from "../containers/Sorting";

export default function Body() {
  return (
    <div className="reference-ui-body">
      <div className="initial-state-message">Type a search above to begin.</div>
      <div className="search-results">
        <div className="sidebar">
          <Sorting />
          <Facets />
        </div>
        <div className="results">
          <div className="results__header">
            <Meta />
          </div>
          <div className="results__body">
            <Results />
          </div>
          <div className="results__footer">
            <Paging />
          </div>
        </div>
      </div>
    </div>
  );
}
