import PropTypes from "prop-types";
import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import Sorting from "../components/Sorting";
import SortOption from "../types/SortOption";

function findSortOption(sortOptions, sortString) {
  const [value, direction] = sortString.split("|||");
  return sortOptions.find(
    option => option.value === value && option.direction === direction
  );
}

function formatOption(sortOption) {
  return {
    name: sortOption.name,
    value: `${sortOption.value}|||${sortOption.direction}`
  };
}
class SortingContainer extends Component {
  static propTypes = {
    // Injected
    setSort: PropTypes.func.isRequired,
    sort: PropTypes.shape({ name: PropTypes.string, value: PropTypes.string })
      .isRequired,
    // Passed
    sortOptions: PropTypes.arrayOf(SortOption).isRequired
  };

  render() {
    const { searchTerm, setSort, sort, sortOptions } = this.props;

    if (!searchTerm) return null;

    return (
      <Sorting
        onChange={e => {
          setSort(findSortOption(sortOptions, e.currentTarget.value));
        }}
        options={sortOptions.map(formatOption)}
        value={formatOption(sort).value}
      />
    );
  }
}

export default withAppSearch(SortingContainer);
