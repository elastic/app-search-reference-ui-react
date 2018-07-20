import PropTypes from "prop-types";
import RCPagination from "rc-pagination";
import React from "react";

import "rc-pagination/assets/index.css";

import withAppSearch from "../app-search/withAppSearch";

// App search is currently limited to 100 pages, so we need to make sure
// that our pager only shows up to 100 pages.
function limitedTo100Pages(totalResults, size) {
  return Math.min(size * 100, totalResults);
}

function Paging({ current, updatePage, size, totalResults }) {
  if (totalResults === 0) return null;

  return (
    <div>
      <RCPagination
        pageSize={size}
        current={current}
        total={limitedTo100Pages(totalResults, size)}
        onChange={updatePage}
      />
    </div>
  );
}

Paging.propTypes = {
  current: PropTypes.number.isRequired,
  updatePage: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired
};

export default withAppSearch(Paging);
