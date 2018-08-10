import React from "react";

import Facets from "../containers/Facets";
import Meta from "../containers/Meta";
import Paging from "../containers/Paging";
import Results from "../containers/Results";

export default function Body() {
  return (
    <div className="search-demo__body">
      <div className="search-results">
        <Facets />
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
