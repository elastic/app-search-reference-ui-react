import PropTypes from "prop-types";
import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import Sort from "../components/Sort";

function serialize(sortObject) {
  const keys = Object.keys(sortObject);
  if (keys.length === 0) return "";
  return `${[keys[0]]}|||${sortObject[[keys[0]]]}`;
}

function deSerialize(sortString) {
  if (!sortString) return {};
  const [sortBy, sortDirection] = sortString.split("|||");
  return {
    [sortBy]: sortDirection
  };
}

class SortContainer extends Component {
  static propTypes = {
    setSort: PropTypes.func.isRequired
  };

  render() {
    const { setSort, sort } = this.props;

    return (
      <Sort
        onChange={e => {
          setSort(deSerialize(e.currentTarget.value));
        }}
        options={[
          { name: "Name ASC", value: "name|||asc" },
          { name: "Name DESC", value: "name|||desc" },
          { name: "License ASC", value: "license|||asc" },
          { name: "License DESC", value: "license|||desc" }
        ]}
        value={serialize(sort)}
      />
    );
  }
}

export default withAppSearch(SortContainer);
