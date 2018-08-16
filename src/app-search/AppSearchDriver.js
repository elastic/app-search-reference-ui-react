import * as SwiftypeAppSearch from "swiftype-app-search-javascript";
import URLManager from "./URLManager";

/*
 * A framework agnostic state manager for App Search apps
 */
export default class AppSearchDriver {
  state = {
    current: 1,
    facets: {},
    facetFields: [],
    filters: [],
    requestId: "",
    results: [],
    resultsPerPage: 0,
    searchTerm: "",
    sortDirection: "",
    sortField: "",
    totalResults: 0
  };

  constructor({
    hostIdentifier,
    searchKey,
    engineName,
    initialState,
    searchOptions
  }) {
    this.onStateChange = function() {};
    this.searchOptions = searchOptions || {};

    this.URLManager = new URLManager();
    const urlState = this.URLManager.getStateFromURL();

    this.state = { ...this.state, ...initialState, ...urlState };

    this.client = SwiftypeAppSearch.createClient({
      hostIdentifier: hostIdentifier,
      apiKey: searchKey,
      engineName: engineName
    });

    if (this.state.searchTerm) {
      this.updateSearchResultsFromCurrentState();
    }
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
    const {
      filters,
      resultsPerPage,
      searchTerm,
      sortDirection,
      sortField
    } = this.state;
    this.updateSearchResults(
      searchTerm,
      1,
      [...filters, { [name]: value }],
      resultsPerPage,
      sortDirection,
      sortField
    );
  };

  removeFilter = (name, value) => {
    const {
      filters,
      resultsPerPage,
      searchTerm,
      sortDirection,
      sortField
    } = this.state;
    const updatedFilters = filters.filter(filter => !(filter[name] === value));
    this.updateSearchResults(
      searchTerm,
      1,
      updatedFilters,
      resultsPerPage,
      sortDirection,
      sortField
    );
  };

  setResultsPerPage = resultsPerPage => {
    const { filters, searchTerm, sortDirection, sortField } = this.state;
    this.updateSearchResults(
      searchTerm,
      1,
      filters,
      resultsPerPage,
      sortDirection,
      sortField
    );
  };

  setSearchTerm = searchTerm => {
    const { resultsPerPage, sortDirection, sortField } = this.state;
    this.updateSearchResults(
      searchTerm,
      1,
      [],
      resultsPerPage,
      sortDirection,
      sortField
    );
  };

  setSort = (sortField, sortDirection) => {
    const { filters, resultsPerPage, searchTerm } = this.state;
    this.updateSearchResults(
      searchTerm,
      1,
      filters,
      resultsPerPage,
      sortDirection,
      sortField
    );
  };

  trackClickThrough = (documentId, tags = []) => {
    const { requestId, searchTerm } = this.state;

    this.client.click({
      query: searchTerm,
      documentId,
      requestId,
      tags
    });
  };

  updatePage = current => {
    const {
      filters,
      resultsPerPage,
      searchTerm,
      sortDirection,
      sortField
    } = this.state;

    this.updateSearchResults(
      searchTerm,
      current,
      filters,
      resultsPerPage,
      sortDirection,
      sortField
    );
  };

  updateSearchResults = (
    searchTerm,
    current,
    filters,
    resultsPerPage,
    sortDirection,
    sortField
  ) => {
    const searchOptions = {
      ...this.searchOptions,
      page: {
        current: current,
        size: resultsPerPage
      },
      filters: {
        all: filters
      }
    };

    if (sortField && sortDirection) {
      searchOptions.sort = {
        [sortField]: sortDirection
      };
    }

    return this.client.search(searchTerm, searchOptions).then(resultList => {
      this.setState({
        current: resultList.info.meta.page.current,
        facets: resultList.info.facets,
        filters: filters,
        requestId: resultList.info.meta.request_id,
        results: resultList.results,
        resultsPerPage: resultsPerPage,
        searchTerm: searchTerm,
        sortDirection: sortDirection,
        sortField: sortField,
        totalResults: resultList.info.meta.page.total_results
      });

      this.URLManager.pushStateToURL({
        current,
        filters,
        resultsPerPage,
        searchTerm,
        sortDirection,
        sortField
      });
    });
  };

  updateSearchResultsFromCurrentState() {
    const {
      searchTerm,
      current,
      filters,
      resultsPerPage,
      sortDirection,
      sortField
    } = this.state;
    this.updateSearchResults(
      searchTerm,
      current,
      filters,
      resultsPerPage,
      sortDirection,
      sortField
    );
  }
}
