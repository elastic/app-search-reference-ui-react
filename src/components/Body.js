import React from "react";

import Facets from "../containers/Facets";
import PagingInfo from "../containers/PagingInfo";
import Paging from "../containers/Paging";
import Results from "../containers/Results";
import ResultsPerPage from "../containers/ResultsPerPage";
import Sorting from "../containers/Sorting";
import { buildSortOptionsFromConfig } from "../config/config-helper";

export default function Body() {
  return (
    <div className="reference-ui-body">
      <div className="initial-state-message">Type a search above to begin.</div>
      <div className="search-results">
        <div className="sidebar">
          <Sorting sortOptions={buildSortOptionsFromConfig()} />
          <Facets />
        </div>
        <div className="results">
          <div className="results__header">
            <div className="meta">
              <PagingInfo />
              <ResultsPerPage />
            </div>
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
