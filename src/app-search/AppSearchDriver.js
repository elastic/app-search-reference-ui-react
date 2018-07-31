import * as SwiftypeAppSearch from "swiftype-app-search-javascript";

/*
 * A framework agnostic state manager for App Search apps
 */
export default class AppSearchDriver {
  state = {
    current: 1,
    facets: {},
    filters: [],
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
    const state = { ...this.state, ...newState };
    this.onStateChange(state);
    this.state = state;
  }

  getState() {
    // We return a copy of state here, because we want to ensure the state
    // inside of this object remains immutable.
    return { ...this.state };
  }

  addFilter = (name, value) => {
    const { filters, searchTerm } = this.state;
    this.updateSearchResults(searchTerm, 1, [...filters, { [name]: value }]);
  };

  setSearchTerm = searchTerm => {
    const { filters } = this.state;
    this.updateSearchResults(searchTerm, 1, filters);
  };

  updatePage = current => {
    const { filters, searchTerm } = this.state;

    this.updateSearchResults(searchTerm, current, filters);
  };

  updateSearchResults = (searchTerm, current, filters) => {
    let searchOptions = {
      ...this.searchOptions,
      page: {
        size: 10,
        current: current
      },
      filters: {
        all: filters
      }
    };

    return this.client.search(searchTerm, searchOptions).then(resultList => {
      this.setState({
        current: resultList.info.meta.page.current,
        facets: resultList.info.facets,
        filters: filters,
        results: resultList.results,
        size: resultList.info.meta.page.size,
        searchTerm: searchTerm,
        totalResults: resultList.info.meta.page.total_results
      });
    });
  };
}
