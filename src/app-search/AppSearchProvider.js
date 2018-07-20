import PropTypes from "prop-types";
import React, { Component } from "react";

import AppSearchContext from "./AppSearchContext";

class AppSearchProvider extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    driver: PropTypes.object.isRequired
  };

  state = {
    current: 1,
    results: [],
    size: 0,
    searchTerm: "",
    totalResults: 0
  };

  updateSearch = (searchTerm, current) => {
    const { driver } = this.props;

    driver
      .search(searchTerm, {
        page: {
          size: 10,
          current: current
        }
      })
      .then(resultList => {
        this.setState({
          current: resultList.info.meta.page.current,
          results: resultList.results,
          size: resultList.info.meta.page.size,
          searchTerm: searchTerm,
          totalResults: resultList.info.meta.page.total_results
        });
      });
  };

  updatePage = current => {
    const { searchTerm } = this.state;
    this.updateSearch(searchTerm, current);
  };

  setSearchTerm = searchTerm => {
    this.updateSearch(searchTerm, 1);
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
          updatePage: this.updatePage,
          setSearchTerm: this.setSearchTerm
        }}
      >
        {children}
      </AppSearchContext.Provider>
    );
  }
}

export default AppSearchProvider;
