import PropTypes from "prop-types";
import React, { Component } from "react";

import AppSearchContext from "./AppSearchContext";

class AppSearchProvider extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    driver: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = props.driver.getState();
    props.driver.subscribeToStateChanges(state => this.setState(state));
  }

  render() {
    const { children, driver } = this.props;
    const {
      current,
      facets,
      filters,
      results,
      size,
      searchTerm,
      sort,
      totalResults
    } = this.state;

    const providerValue = {
      current: current,
      facets: facets,
      filters: filters,
      results: results,
      size: size,
      searchTerm: searchTerm,
      sort: sort,
      totalResults: totalResults,
      addFilter: driver.addFilter,
      removeFilter: driver.removeFilter,
      setSearchTerm: driver.setSearchTerm,
      setSort: driver.setSort,
      updatePage: driver.updatePage
    };

    return (
      <AppSearchContext.Provider value={providerValue}>
        {children(providerValue)}
      </AppSearchContext.Provider>
    );
  }
}

export default AppSearchProvider;
