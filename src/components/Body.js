import React from "react";

import Facets from "../containers/Facets";
import Meta from "../containers/Meta";
import Paging from "../containers/Paging";
import Results from "../containers/Results";
import ResultsPerPage from "../containers/ResultsPerPage";
import Sort from "../containers/Sort";
import { buildSortOptionsFromConfig } from "../config/config-helper";

export default function Body() {
  return (
    <div className="search-demo__body">
      <div className="search-results">
        <Sort sortOptions={buildSortOptionsFromConfig()} />
        <Facets />
        <div className="results">
          <div className="results__header">
            <Meta />
            <ResultsPerPage />
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
