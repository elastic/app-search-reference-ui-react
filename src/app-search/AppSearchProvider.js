import PropTypes from "prop-types";
import React, { Component } from "react";

import AppSearchContext from "./AppSearchContext";

class AppSearchProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
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
      results,
      size,
      searchTerm,
      totalResults
    } = this.state;

    return (
      <AppSearchContext.Provider
        value={{
          current: current,
          facets: facets,
          results: results,
          size: size,
          searchTerm: searchTerm,
          totalResults: totalResults,
          addFilter: driver.addFilter,
          setSearchTerm: driver.setSearchTerm,
          updatePage: driver.updatePage
        }}
      >
        {children}
      </AppSearchContext.Provider>
    );
  }
}

export default AppSearchProvider;
