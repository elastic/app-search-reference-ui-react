import React, { Component } from "react";

import { Body, Header } from "./components";
import { SearchProvider } from "@elastic/react-search-ui";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

import {
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
  getConfig
} from "./config/config-helper";

function createDriver() {
  const { hostIdentifier, searchKey, endpointBase, engineName } = getConfig();
  return {
    apiConnector: new AppSearchAPIConnector({
      hostIdentifier,
      searchKey,
      endpointBase,
      engineName
    }),
    facetConfig: buildFacetConfigFromConfig(),
    searchOptions: buildSearchOptionsFromConfig()
  };
}

class App extends Component {
  render() {
    const config = getConfig();

    if (!config.engineName) {
      return (
        <div>
          No config found. Be sure to provide configuration by either including
          a src/config/engine.json file, or including window.appConfig.
        </div>
      );
    }

    return (
      <SearchProvider config={createDriver()}>
        {({ searchTerm, results }) => (
          <div
            className={`reference-ui${
              searchTerm || results.length > 0 ? " active-search" : ""
            }`}
          >
            <Header />
            <Body />
          </div>
        )}
      </SearchProvider>
    );
  }
}

export default App;
