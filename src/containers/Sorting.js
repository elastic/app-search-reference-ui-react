import PropTypes from "prop-types";
import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import Sorting from "../components/Sorting";

class SortingContainer extends Component {
  static propTypes = {
    searchTerm: PropTypes.string.isRequired
  };

  render() {
    const { searchTerm } = this.props;

    if (!searchTerm) return null;

    return (
      <Sorting
        searchTerm={searchTerm}
      />
    );
  }
}

export default withAppSearch(SortingContainer);
