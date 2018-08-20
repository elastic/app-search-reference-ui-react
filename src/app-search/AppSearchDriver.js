import * as SwiftypeAppSearch from "swiftype-app-search-javascript";
import URLManager from "./URLManager";

function filterSearchParameters(state) {
  const {
    current,
    filters,
    resultsPerPage,
    searchTerm,
    sortDirection,
    sortField
  } = state;
  return {
    current,
    filters,
    resultsPerPage,
    searchTerm,
    sortDirection,
    sortField
  };
}

const DEFAULT_STATE = {
  // Search Parameters -- This is state that represents the input that was
  // used to produce the current query results. It is always in sync
  // with the Results State
  current: 1,
  filters: [],
  resultsPerPage: 0,
  searchTerm: "",
  sortDirection: "",
  sortField: "",
  // Results State -- This state represents the results of the current query
  facets: {},
  requestId: "",
  results: [],
  totalResults: 0
};

/*
 * The Driver is a framework agnostic state manager for App Search apps. Meaning,
 * it is the source of truth for state in this React App, but it has no
 * dependencies on React itself.
 */
export default class AppSearchDriver {
  state = DEFAULT_STATE;

  /**
   *
   * @param options {*}
   *
   * engineName  - Engine to query, found in your App Search Dashboard
   * hostIdentifier - Credential found in your App Search Dashboard
   * initialState - This lets you set initial search parameters
   * searchKey - Credential found in your App Search Dashboard
   * searchOptions - A low level configuration which let's you configure
   * the options used on the Search API endpoint
   */
  constructor({
    engineName,
    hostIdentifier,
    initialState,
    searchKey,
    searchOptions
  }) {
    this.subscriptions = [];
    this.searchOptions = searchOptions || {};
    this.client = SwiftypeAppSearch.createClient({
      hostIdentifier: hostIdentifier,
      apiKey: searchKey,
      engineName: engineName
    });

    this.URLManager = new URLManager();
    const urlState = this.URLManager.getStateFromURL();
    this.URLManager.onURLStateChange(urlState => {
      this._updateSearchResults({ ...DEFAULT_STATE, ...urlState }, true);
    });
    // We filter these here, because the only state that should be allowed
    // to be passed in, is search parameter state. Results, etc, should not
    // be allowed to be passed in, that should be generated based on the
    // provided search parameters.
    const searchParameters = filterSearchParameters({
      ...this.state,
      ...initialState,
      ...urlState
    });

    // Initialize the state without calling _setState, because we don't
    // want to trigger an update callback, we're just initializing the state
    // to the correct default values.
    this.state = {
      ...this.state,
      ...searchParameters
    };

    // We'll trigger an initial search if initial parameters contains
    // a search term or filters, otherwise, we'll just save their selections
    // in state as defaults.
    if (searchParameters.searchTerm || searchParameters.filters.length > 0) {
      this._updateSearchResults(searchParameters);
    }
  }

  _updateSearchResults = (
    { current, filters, resultsPerPage, searchTerm, sortDirection, sortField },
    skipPushToUrl = false
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
      this._setState({
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

      if (!skipPushToUrl) {
        this.URLManager.pushStateToURL({
          current,
          filters,
          resultsPerPage,
          searchTerm,
          sortDirection,
          sortField
        });
      }
    });
  };

  _setState(newState) {
    const state = { ...this.state, ...newState };
    this.subscriptions.forEach(subscription => subscription(state));
    this.state = state;
  }

  /**
   * Any time state is updated in this Driver, the provided callback
   * will be executed with the updated state.
   *
   * @param onStateChange Function
   */
  subscribeToStateChanges(onStateChange) {
    this.subscriptions.push(onStateChange);
  }

  /**
   * Retrieve current state. Typically used on app initialization. Subsequent
   * state updates should come through subscription.
   *
   * @returns Current state
   */
  getState() {
    // We return a copy of state here, because we want to ensure the state
    // inside of this object remains immutable.
    return { ...this.state };
  }

  /**
   * Filter results
   *
   * Will trigger new search
   *
   * @param name String field name to filter on
   * @param value String field value to filter on
   */
  addFilter = (name, value) => {
    const {
      filters,
      resultsPerPage,
      searchTerm,
      sortDirection,
      sortField
    } = this.state;
    this._updateSearchResults({
      current: 1,
      filters: [...filters, { [name]: value }],
      resultsPerPage,
      searchTerm,
      sortDirection,
      sortField
    });
  };

  /**
   * Remove filter from results
   *
   * Will trigger new search
   *
   * @param name String field name for filter to remove
   * @param value String field value for filter to remove
   */
  removeFilter = (name, value) => {
    const {
      filters,
      resultsPerPage,
      searchTerm,
      sortDirection,
      sortField
    } = this.state;
    const updatedFilters = filters.filter(filter => !(filter[name] === value));
    this._updateSearchResults({
      current: 1,
      filters: updatedFilters,
      resultsPerPage,
      searchTerm,
      sortDirection,
      sortField
    });
  };

  /**
   * Set the number of results to show
   *
   * Will trigger new search
   *
   * @param resultsPerPage Integer
   */
  setResultsPerPage = resultsPerPage => {
    const { filters, searchTerm, sortDirection, sortField } = this.state;
    this._updateSearchResults({
      current: 1,
      filters,
      resultsPerPage,
      searchTerm,
      sortDirection,
      sortField
    });
  };

  /**
   * Set the current search term
   *
   * Will trigger new search
   *
   * @param searchTerm String
   */
  setSearchTerm = searchTerm => {
    const { resultsPerPage, sortDirection, sortField } = this.state;
    this._updateSearchResults({
      current: 1,
      filters: [],
      resultsPerPage,
      searchTerm,
      sortDirection,
      sortField
    });
  };

  /**
   * Set the current sort
   *
   * Will trigger new search
   *
   * @param sortField String
   * @param sortDirection String ["asc"|"desc"]
   */
  setSort = (sortField, sortDirection) => {
    const { filters, resultsPerPage, searchTerm } = this.state;
    this._updateSearchResults({
      current: 1,
      filters: filters,
      resultsPerPage,
      searchTerm,
      sortDirection,
      sortField
    });
  };

  /**
   * Report a click through event. A click through event is when a user
   * clicks on a result link. Click events can be reviewed in the App Search
   * Analytics Dashboard.
   *
   * @param documentId String The document ID associated with result that was
   * clicked
   * @param tag Array[String] Optional Tags which can be used to categorize
   * this click event in App Search Analytics dashboard
   */
  trackClickThrough = (documentId, tags = []) => {
    const { requestId, searchTerm } = this.state;

    this.client.click({
      query: searchTerm,
      documentId,
      requestId,
      tags
    });
  };

  setCurrent = current => {
    const {
      filters,
      resultsPerPage,
      searchTerm,
      sortDirection,
      sortField
    } = this.state;

    this._updateSearchResults({
      current,
      filters,
      resultsPerPage,
      searchTerm,
      sortDirection,
      sortField
    });
  };
}
