import React, { Component } from "react";

import Header from "./components/Header";
import Body from "./components/Body";

import AppSearchProvider from "./app-search/AppSearchProvider";
import AppSearchDriver from "./app-search/AppSearchDriver";
import {
  buildSearchOptionsFromConfig,
  getConfig
} from "./config/config-helper";

function createDriver() {
  const { hostIdentifier, searchKey, engineName } = getConfig();
  return new AppSearchDriver({
    hostIdentifier,
    searchKey,
    engineName,
    initialState: {
      resultsPerPage: 20
    },
    searchOptions: buildSearchOptionsFromConfig()
  });
}

class App extends Component {
  render() {
    const config = getConfig();

    if (!config) return <div>No config found</div>;

    return (
      <AppSearchProvider driver={createDriver()}>
        {({ searchTerm }) => (
          <div>
            <div className="site-background" />
            <div
              className={`search-demo  ${searchTerm ? "active-search" : ""}`}
            >
              <div className="search-demo__content">
                <Header />
                <Body />
              </div>
            </div>
          </div>
        )}
      </AppSearchProvider>
    );
  }
}

export default App;
