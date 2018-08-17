import PropTypes from "prop-types";
import React, { Component } from "react";

import AppSearchContext from "./AppSearchContext";

/**
 * The AppSearchProvider is the glue that connects the AppSearchDriver to
 * our React App. It "subscribes" to the driver in order to be
 * notified of state updates, and then passes that state down to child
 * components in a React Context. It will also pass down "actions" from the
 * AppSearchDriver, which allow child components to update state.
 */
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
      requestId,
      results,
      resultsPerPage,
      searchTerm,
      sortDirection,
      sortField,
      totalResults
    } = this.state;

    const providerValue = {
      // Search Parameters
      current,
      filters,
      resultsPerPage,
      searchTerm,
      sortDirection,
      sortField,
      // Result data
      facets,
      requestId,
      results,
      totalResults,
      // Actions
      addFilter: driver.addFilter,
      trackClickThrough: driver.trackClickThrough,
      removeFilter: driver.removeFilter,
      setCurrent: driver.setCurrent,
      setResultsPerPage: driver.setResultsPerPage,
      setSearchTerm: driver.setSearchTerm,
      setSort: driver.setSort
    };

    return (
      <AppSearchContext.Provider value={providerValue}>
        {children(providerValue)}
      </AppSearchContext.Provider>
    );
  }
}

export default AppSearchProvider;
