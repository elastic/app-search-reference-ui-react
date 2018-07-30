import * as SwiftypeAppSearch from "swiftype-app-search-javascript";

/*
 * A framework agnostic state manager for App Search apps
 */
export default class AppSearchDriver {
  state = {
    current: 1,
    facets: {},
    results: [],
    size: 0,
    searchTerm: "",
    totalResults: 0
  };

  constructor({ hostIdentifier, searchKey, engineName, searchOptions }) {
    this.onStateChange = function() {};
    this.searchOptions = searchOptions || {};

    this.client = SwiftypeAppSearch.createClient({
      hostIdentifier: hostIdentifier,
      apiKey: searchKey,
      engineName: engineName
    });
  }

  subscribeToStateChanges(onStateChange) {
    this.onStateChange = onStateChange;
  }

  setState(newState) {
    const state = Object.assign({}, this.state, newState);
    this.onStateChange(state);
    this.state = state;
  }

  getState() {
    // We return a copy of state here, because we want to ensure the state
    // inside of this object remains immutable.
    return Object.assign({}, this.state);
  }

  setSearchTerm = searchTerm => {
    this.updateSearchResults(searchTerm, 1);
  };

  updatePage = current => {
    const { searchTerm } = this.state;

    this.updateSearchResults(searchTerm, current);
  };

  updateSearchResults = (searchTerm, current) => {
    return this.client
      .search(
        searchTerm,
        Object.assign({}, this.searchOptions, {
          page: {
            size: 10,
            current: current
          }
        })
      )
      .then(resultList => {
        this.setState({
          current: resultList.info.meta.page.current,
          facets: resultList.info.facets,
          results: resultList.results,
          size: resultList.info.meta.page.size,
          searchTerm: searchTerm,
          totalResults: resultList.info.meta.page.total_results
        });
      });
  };
}
