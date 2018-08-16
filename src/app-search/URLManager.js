import createHistory from "history/createBrowserHistory";
import queryString from "query-string";
import { create } from "../types/SortOption";

function isNumeric(num) {
  return !isNaN(num);
}

function toSingleValue(val) {
  if (Array.isArray(val)) val = val[val.length - 1];
  return val;
}

function toSingleValueInteger(num) {
  return toInteger(toSingleValue(num));
}

function toInteger(num) {
  if (!isNumeric(num)) return;
  return parseInt(num, 10);
}

function parseFiltersFromQueryParams(queryParams) {
  const filters = Object.keys(queryParams).reduce((acc, paramName) => {
    if (paramName.startsWith("f-")) {
      let paramValue = queryParams[paramName];
      if (!paramValue) return acc;
      const filterName = paramName.replace("f-", "");
      acc.push({
        [filterName]: paramValue
      });
    }
    return acc;
  }, []);

  if (filters.length === 0) return;
  return filters;
}

function parseCurrentFromQueryParams(queryParams) {
  return toSingleValueInteger(queryParams.current);
}

function parseSearchTermFromQueryParams(queryParams) {
  return toSingleValue(queryParams.q);
}

function parseSortFromQueryParams(queryParams) {
  const sortBy = toSingleValue(queryParams["sort-by"]);
  const sortDirection = toSingleValue(queryParams["sort-direction"]);

  if (sortBy) {
    return create({
      value: sortBy,
      direction: sortDirection
    });
  }

  return;
}

function parseSizeFromQueryParams(queryParams) {
  return toSingleValueInteger(queryParams.size);
}

function paramsToState(queryParams) {
  const state = {
    current: parseCurrentFromQueryParams(queryParams),
    filters: parseFiltersFromQueryParams(queryParams),
    searchTerm: parseSearchTermFromQueryParams(queryParams),
    resultsPerPage: parseSizeFromQueryParams(queryParams),
    sort: parseSortFromQueryParams(queryParams)
  };

  return Object.keys(state).reduce((acc, key) => {
    const value = state[key];
    if (value) acc[key] = value;
    return acc;
  }, {});
}

function stateToParams(state) {
  const { searchTerm, current, filters, resultsPerPage, sort } = state;
  const params = {};

  filters.forEach(filter => {
    const key = Object.keys(filter)[0];
    params[`f-${key}`] = filter[key];
  });

  if (current > 1) params.current = current;
  if (searchTerm) params.q = searchTerm;
  if (resultsPerPage) params.size = resultsPerPage;
  if (sort && sort.value) {
    params["sort-by"] = sort.value;
    params["sort-direction"] = sort.direction;
  }

  return params;
}

function stateToQueryString(state) {
  const params = stateToParams(state);
  return queryString.stringify(params);
}

/**
 * The URL Manager is responsible for synchronizing state between
 * AppSearchDriver and the URL. There are 3 main cases to handle when
 * synchronizing:
 *
 * 1. When the app loads, AppSearchDriver will need to
 * read the current state from the URL, in order to perform the search
 * expressed by the query string. `getStateFromURL` is used for this case.
 *
 * 2. When the URL changes as a result of `pushState` or `replaceState`,
 * AppSearchDriver will need to be notified and given the updated state, so that
 * it can re-run the current search. `onURLStateChange` is used for this case.
 *
 * 3. When state changes in AppSearchDriver, the URL will need to be updated
 * to reflect those changes. `onURLStateChange` is used for this case.
 */

export default class URLManager {
  constructor() {
    this.history = createHistory();
  }

  getStateFromURL() {
    const state = paramsToState(
      queryString.parse(this.history.location.search)
    );
    return state;
  }

  pushStateToURL(state) {
    const searchString = stateToQueryString(state);
    this.history.push(
      {
        search: `?${searchString}`
      },
      { some: "state" }
    );
  }

  onURLStateChange() {}
}
