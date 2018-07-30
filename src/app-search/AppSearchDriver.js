import * as SwiftypeAppSearch from "swiftype-app-search-javascript";

export default class AppSearchDriver {
  state = {
    current: 1,
    results: [],
    size: 0,
    searchTerm: "",
    totalResults: 0
  };

  constructor(config) {
    this.onStateChange = function() {};
    this.config = config;
    this.client = SwiftypeAppSearch.createClient({
      hostIdentifier: config.hostIdentifier,
      apiKey: config.searchKey,
      engineName: config.engineName
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
    return this.search(searchTerm, {
      page: {
        size: 10,
        current: current
      }
    }).then(resultList => {
      this.setState({
        current: resultList.info.meta.page.current,
        results: resultList.results,
        size: resultList.info.meta.page.size,
        searchTerm: searchTerm,
        totalResults: resultList.info.meta.page.total_results
      });
    });
  };

  search() {
    return this.client.search.apply(this.client, arguments);
  }
}
