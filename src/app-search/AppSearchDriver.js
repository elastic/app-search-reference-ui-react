import * as SwiftypeAppSearch from "swiftype-app-search-javascript";
import URLManager from "./URLManager";

function filterSearchParameters({
  current,
  filters,
  resultsPerPage,
  searchTerm,
  sortDirection,
  sortField
}) {
  return {
    current,
    filters,
    resultsPerPage,
    searchTerm,
    sortDirection,
    sortField
  };
}

export const DEFAULT_STATE = {
  // Search Parameters -- This is state that represents the input that was
  // used to produce the current query results. It is always in sync
  // with the Results State
  current: 1,
  error: "",
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
 *
 * The public interface of the Driver can be thought about in the following
 * way:
 *
 * Ways to GET state:
 * - getState - Get the initial app state
 * - subscribeToStateChanges - Get updated state whenever it changes
 *
 * Ways to SET state, or "Actions" as we refer to them elsewhere
 * - addFilter, etc, will typically update the state and trigger new queries
 *
 */
export default class AppSearchDriver {
  state = DEFAULT_STATE;

  /**
   *
   * @param options Object
   * engineName  - Engine to query, found in your App Search Dashboard
   * hostIdentifier - Credential found in your App Search Dashboard
   * initialState - This lets you set initial search parameters, ex:
   *   `searchTerm: "test"`
   * searchKey - Credential found in your App Search Dashboard
   * searchOptions - A low level configuration which lets you configure
   *   the options used on the Search API endpoint, ex: `result_fields`
   * trackURLState - Boolean, track state in the url or not?
   */
  constructor({
    engineName,
    hostIdentifier,
    initialState,
    searchKey,
    searchOptions,
    trackUrlState = true
  }) {
    if (!engineName || !hostIdentifier || !searchKey) {
      throw Error("engineName, hostIdentifier, and searchKey are required");
    }
    this.subscriptions = [];
    this.searchOptions = searchOptions || {};
    this.trackUrlState = trackUrlState;
    this.client = SwiftypeAppSearch.createClient({
      hostIdentifier: hostIdentifier,
      apiKey: searchKey,
      engineName: engineName
    });

    let urlState;
    if (trackUrlState) {
      this.URLManager = new URLManager();
      urlState = this.URLManager.getStateFromURL();
      this.URLManager.onURLStateChange(urlState => {
        this._updateSearchResults({ ...DEFAULT_STATE, ...urlState }, true);
      });
    } else {
      urlState = {};
    }

    // We filter these here to disallow anything other than valid search
    // parameters to be passed in initial state, or url state. `results`, etc,
    // should not be allowed to be passed in, that should be generated based on
    // the results of the query
    const searchParameters = filterSearchParameters({
      ...this.state,
      ...initialState,
      ...urlState
    });

    // Initialize the state without calling _setState, because we don't
    // want to trigger an update callback, we're just initializing the state
    // to the correct default values for the initial UI render
    this.state = {
      ...this.state,
      ...searchParameters
    };

    // We'll trigger an initial search if initial parameters contain
    // a search term or filters, otherwise, we'll just save their selections
    // in state as initial values.
    if (searchParameters.searchTerm || searchParameters.filters.length > 0) {
      this._updateSearchResults(searchParameters);
    }
  }

  _updateSearchResults = (searchParameters, skipPushToUrl = false) => {
    const {
      current,
      filters,
      resultsPerPage,
      searchTerm,
      sortDirection,
      sortField
    } = {
      ...this.state,
      ...searchParameters
    };

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

    return this.client.search(searchTerm, searchOptions).then(
      resultList => {
        this._setState({
          current: current,
          error: "",
          facets: resultList.info.facets,
          filters,
          requestId: resultList.info.meta.request_id,
          results: resultList.results,
          resultsPerPage,
          searchTerm,
          sortDirection,
          sortField,
          totalResults: resultList.info.meta.page.total_results
        });

        if (!skipPushToUrl && this.trackUrlState) {
          this.URLManager.pushStateToURL({
            current,
            filters,
            resultsPerPage,
            searchTerm,
            sortDirection,
            sortField
          });
        }
      },
      error => {
        this._setState({
          error: `An unexpected error occurred: ${error.message}`
        });
      }
    );
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
   * Retrieves all available acitons
   *
   * @returns Object All actions
   */
  getActions() {
    return {
      addFilter: this.addFilter,
      removeFilter: this.removeFilter,
      setResultsPerPage: this.setResultsPerPage,
      setSearchTerm: this.setSearchTerm,
      setSort: this.setSort,
      setCurrent: this.setCurrent,
      trackClickThrough: this.trackClickThrough
    };
  }

  /**
   * Retrieve current state. Typically used on app initialization. Subsequent
   * state updates should come through subscription.
   *
   * @returns Object Current state
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
    const { filters } = this.state;
    this._updateSearchResults({
      current: 1,
      filters: [...filters, { [name]: value }]
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
    const { filters } = this.state;
    const updatedFilters = filters.filter(filter => !(filter[name] === value));
    this._updateSearchResults({
      current: 1,
      filters: updatedFilters
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
    this._updateSearchResults({
      current: 1,
      resultsPerPage
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
    this._updateSearchResults({
      current: 1,
      filters: [],
      searchTerm
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
    this._updateSearchResults({
      current: 1,
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

  /**
   * Set the current page
   *
   * Will trigger new search
   *
   * @param current Integer
   */
  setCurrent = current => {
    this._updateSearchResults({
      current
    });
  };
}
