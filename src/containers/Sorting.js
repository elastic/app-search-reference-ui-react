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

function formatValue(sortField, sortDirection) {
  return `${sortField}|||${sortDirection}`;
}

function formatSelectOption(sortOption) {
  return {
    name: sortOption.name,
    value: formatValue(sortOption.value, sortOption.direction)
  };
}
class SortingContainer extends Component {
  static propTypes = {
    // Injected
    searchTerm: PropTypes.string.isRequired,
    setSort: PropTypes.func.isRequired,
    sortDirection: PropTypes.string.isRequired,
    sortField: PropTypes.string.isRequired,
    // Passed
    sortOptions: PropTypes.arrayOf(SortOption).isRequired
  };

  render() {
    const {
      searchTerm,
      setSort,
      sortDirection,
      sortField,
      sortOptions
    } = this.props;

    if (!searchTerm) return null;

    return (
      <Sorting
        onChange={e => {
          const sortOption = findSortOption(sortOptions, e.currentTarget.value);
          setSort(sortOption.value, sortOption.direction);
        }}
        options={sortOptions.map(formatSelectOption)}
        value={formatValue(sortField, sortDirection)}
      />
    );
  }
}

export default withAppSearch(SortingContainer);
