import PropTypes from "prop-types";
import React, { Component } from "react";

import AppSearchContext from "./AppSearchContext";

class AppSearchProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    driver: PropTypes.object.isRequired
  };

  state = {
    current: 0,
    results: [],
    size: 0,
    searchTerm: "",
    totalResults: 0
  };

  setSearchTerm = searchTerm => {
    const { driver } = this.props;

    driver.search(searchTerm, {}).then(resultList => {
      this.setState({
        current: resultList.info.meta.page.current,
        results: resultList.results,
        size: resultList.info.meta.page.size,
        searchTerm: searchTerm,
        totalResults: resultList.info.meta.page.total_results
      });
    });
  };

  render() {
    const { children } = this.props;
    const { current, results, size, searchTerm, totalResults } = this.state;

    return (
      <AppSearchContext.Provider
        value={{
          current: current,
          results: results,
          size: size,
          searchTerm: searchTerm,
          totalResults: totalResults,
          setSearchTerm: this.setSearchTerm
        }}
      >
        {children}
      </AppSearchContext.Provider>
    );
  }
}

export default AppSearchProvider;
