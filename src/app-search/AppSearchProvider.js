import React, { Component } from "react";

import { AppSearchContext } from "./AppSearchContext";

class AppSearchProvider extends Component {
  state = {
    searchTerm: "lion"
  };

  setSearchTerm = searchTerm => {
    this.setState({
      searchTerm
    });
  };

  render() {
    return (
      <AppSearchContext.Provider
        value={{
          searchTerm: this.state.searchTerm,
          setSearchTerm: this.setSearchTerm,
          totalResults: 1000,
          currentItem: 1,
          size: 20,
          results: [{ id: "a" }, { id: "b" }, { id: "c" }]
        }}
      >
        {this.props.children}
      </AppSearchContext.Provider>
    );
  }
}

export default AppSearchProvider;
