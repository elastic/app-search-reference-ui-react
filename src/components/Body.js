import PropTypes from "prop-types";
import React from "react";

import {
  ErrorBoundary,
  Facets,
  PagingInfo,
  Paging,
  Results,
  ResultsPerPage,
  Sorting
} from "../containers";
import { buildSortOptionsFromConfig } from "../config/config-helper";

function Body({ hasSidebar = true }) {
  return (
    <div className="reference-ui-body">
      <ErrorBoundary>
        <div className="initial-state-message">
          Type a search above to begin.
        </div>
        <div className="search-results">
          <div className={"sidebar" + (hasSidebar ? '' : ' hidden')}>
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
      </ErrorBoundary>
    </div>
  );
}

Body.propTypes = {
  hasSidebar: PropTypes.bool
};

export default Body;
