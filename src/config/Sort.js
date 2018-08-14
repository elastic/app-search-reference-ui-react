import React, { Component } from "react";

import Sort from "../containers/Sort";
import { create } from "../types/SortOption";
import { getConfig } from "../config/config-helper";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function buildSortOptionsFromConfig() {
  const config = getConfig();
  return [
    create({
      name: "None",
      value: "",
      direction: ""
    }),
    ...(config.sortFields || []).reduce((acc, sortField) => {
      acc.push(
        create({
          name: `${capitalizeFirstLetter(sortField)} ASC`,
          value: sortField,
          direction: "asc"
        })
      );
      acc.push(
        create({
          name: `${capitalizeFirstLetter(sortField)} DESC`,
          value: sortField,
          direction: "desc"
        })
      );
      return acc;
    }, [])
  ];
}

class SortConfigContainer extends Component {
  render() {
    return <Sort sortOptions={buildSortOptionsFromConfig()} />;
  }
}

export default SortConfigContainer;
