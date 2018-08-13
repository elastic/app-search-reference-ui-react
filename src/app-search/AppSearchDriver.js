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
    sort: {},
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
    const { filters, searchTerm, sort } = this.state;
    this.updateSearchResults(
      searchTerm,
      1,
      [...filters, { [name]: value }],
      sort
    );
  };

  removeFilter = (name, value) => {
    const { filters, searchTerm, sort } = this.state;
    const updatedFilters = filters.filter(filter => !(filter[name] === value));
    this.updateSearchResults(searchTerm, 1, updatedFilters, sort);
  };

  setSearchTerm = searchTerm => {
    const { sort } = this.state;
    this.updateSearchResults(searchTerm, 1, [], sort);
  };

  setSort = sort => {
    const { filters, searchTerm } = this.state;
    this.updateSearchResults(searchTerm, 1, filters, sort);
  };

  updatePage = current => {
    const { filters, searchTerm, sort } = this.state;

    this.updateSearchResults(searchTerm, current, filters, sort);
  };

  updateSearchResults = (searchTerm, current, filters, sort) => {
    const searchOptions = {
      ...this.searchOptions,
      page: {
        size: 10,
        current: current
      },
      filters: {
        all: filters
      }
    };

    if (Object.keys(sort).length > 0) {
      searchOptions.sort = sort;
    }

    return this.client.search(searchTerm, searchOptions).then(resultList => {
      this.setState({
        current: resultList.info.meta.page.current,
        facets: resultList.info.facets,
        filters: filters,
        results: resultList.results,
        size: resultList.info.meta.page.size,
        searchTerm: searchTerm,
        sort: sort,
        totalResults: resultList.info.meta.page.total_results
      });
    });
  };
}
