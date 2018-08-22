import AppSearchDriver, { DEFAULT_STATE } from "./AppSearchDriver";
import * as SwiftypeAppSearch from "swiftype-app-search-javascript";
jest.mock("swiftype-app-search-javascript");

const resultList = {
  info: {
    facets: {},
    meta: {
      page: {
        total_results: 1000
      },
      request_id: "12345"
    }
  },
  results: [{}, {}]
};

const params = {
  engineName: "some-engine",
  hostIdentifier: "host-XXXX",
  searchKey: "search-XXXXX",
  trackUrlState: false
};

const mockClient = {
  search: jest.fn().mockReturnValue({ then: cb => cb(resultList) }),
  click: jest.fn().mockReturnValue(Promise.resolve())
};

beforeAll(() => {
  SwiftypeAppSearch.createClient.mockReturnValue(mockClient);
});

it("can be initialized", () => {
  const driver = new AppSearchDriver(params);
  expect(driver).toBeInstanceOf(AppSearchDriver);
});

it("will throw when missing required parameters", () => {
  expect(() => {
    new AppSearchDriver({});
  }).toThrow();
});

it("will use initial state if provided", () => {
  const initialState = {
    current: 3,
    resultsPerPage: 60,
    sortField: "name",
    sortDirection: "asc"
  };

  const driver = new AppSearchDriver({
    ...params,
    initialState
  });
  const stateAfterCreation = driver.getState();

  expect(stateAfterCreation).toEqual({
    ...DEFAULT_STATE,
    ...initialState
  });
});

it("will trigger a search if searchTerm or filters are provided in initial state", () => {
  const initialState = {
    filters: [{ initial: "value" }],
    searchTerm: "test"
  };

  const driver = new AppSearchDriver({
    ...params,
    initialState
  });
  const stateAfterCreation = driver.getState();

  expect(stateAfterCreation).toEqual({
    ...DEFAULT_STATE,
    ...initialState,
    requestId: "12345",
    results: [{}, {}],
    totalResults: 1000
  });
});

describe("#getState", () => {
  it("returns the current state", () => {
    const driver = new AppSearchDriver(params);
    expect(driver.getState()).toEqual(DEFAULT_STATE);
  });
});

describe("#getActions", () => {
  it("returns the current state", () => {
    const driver = new AppSearchDriver(params);
    const actions = driver.getActions();
    expect(actions.addFilter).toBeInstanceOf(Function);
    expect(actions.removeFilter).toBeInstanceOf(Function);
    expect(actions.setResultsPerPage).toBeInstanceOf(Function);
    expect(actions.setSearchTerm).toBeInstanceOf(Function);
    expect(actions.setSort).toBeInstanceOf(Function);
    expect(actions.setCurrent).toBeInstanceOf(Function);
    expect(actions.trackClickThrough).toBeInstanceOf(Function);
  });
});

describe("#setSearchTerm", () => {
  it("Updates state", () => {
    const initialState = {
      current: 2, // RESET
      filters: [
        // RESET
        {
          filter1: "value1"
        }
      ],
      resultsPerPage: 60, // KEEP
      sortField: "name", // KEEP
      sortDirection: "asc" // KEEP
    };

    const driver = new AppSearchDriver({
      ...params,
      initialState
    });
    const stateAfterCreation = driver.getState();

    let updatedState;
    driver.subscribeToStateChanges(newState => {
      updatedState = newState;
    });

    driver.setSearchTerm("test");

    expect(updatedState).toEqual({
      ...stateAfterCreation, // KEPT
      current: 1, // RESET
      filters: [], // RESET
      searchTerm: "test" // UPDATED
    });
  });
});

describe("#addFilter", () => {
  it("Updates state", () => {
    const initialState = {
      filters: [{ initial: "value" }], // UPDATE
      current: 2, // RESET
      resultsPerPage: 60, // KEEP
      sortField: "name", // KEEP
      sortDirection: "asc" // KEEP
    };

    const driver = new AppSearchDriver({
      ...params,
      initialState
    });
    const stateAfterCreation = driver.getState();

    let updatedState;
    driver.subscribeToStateChanges(newState => {
      updatedState = newState;
    });

    driver.addFilter("test", "value");

    expect(updatedState).toEqual({
      ...stateAfterCreation, // KEPT
      current: 1, // RESET
      filters: [{ initial: "value" }, { test: "value" }] // UPDATED
    });
  });
});

describe("#removeFilter", () => {
  it("Updates state", () => {
    const initialState = {
      filters: [{ initial: "value" }, { test: "value" }], // UPDATE
      current: 2, // RESET
      resultsPerPage: 60, // KEEP
      sortField: "name", // KEEP
      sortDirection: "asc" // KEEP
    };

    const driver = new AppSearchDriver({
      ...params,
      initialState
    });
    const stateAfterCreation = driver.getState();

    let updatedState;
    driver.subscribeToStateChanges(newState => {
      updatedState = newState;
    });

    driver.removeFilter("test", "value");

    expect(updatedState).toEqual({
      ...stateAfterCreation, // KEPT
      current: 1, // RESET
      filters: [{ initial: "value" }] // UPDATED
    });
  });
});

describe("#setCurrent", () => {
  it("Updates state", () => {
    const initialState = {
      filters: [{ initial: "value" }], // KEEP
      searchTerm: "test", // KEEP
      current: 1, // UPDATE
      resultsPerPage: 60, // KEEP
      sortField: "name", // KEEP
      sortDirection: "asc" // KEEP
    };

    const driver = new AppSearchDriver({
      ...params,
      initialState
    });
    const stateAfterCreation = driver.getState();

    let updatedState;
    driver.subscribeToStateChanges(newState => {
      updatedState = newState;
    });

    driver.setCurrent(2);

    expect(updatedState).toEqual({
      ...stateAfterCreation, // KEPT
      current: 2 // UPDATED
    });
  });
});

describe("#setSort", () => {
  it("Updates state", () => {
    const initialState = {
      filters: [{ initial: "value" }], // KEEP
      searchTerm: "test", // KEEP
      current: 3, // RESET
      resultsPerPage: 60, // KEPT
      sortField: "name", // UPDATE
      sortDirection: "asc" // UPDATE
    };

    const driver = new AppSearchDriver({
      ...params,
      initialState
    });
    const stateAfterCreation = driver.getState();

    let updatedState;
    driver.subscribeToStateChanges(newState => {
      updatedState = newState;
    });

    driver.setSort("date", "desc");

    expect(updatedState).toEqual({
      ...stateAfterCreation, // KEPT
      current: 1, // RESET
      sortField: "date", // UPDATED
      sortDirection: "desc" // UPDATED
    });
  });
});

describe("#setResultsPerPage", () => {
  it("Updates state", () => {
    const initialState = {
      filters: [{ initial: "value" }], // KEEP
      searchTerm: "test", // KEEP
      current: 3, // RESET
      resultsPerPage: 60, // UPDATE
      sortField: "name", // KEEP
      sortDirection: "asc" // KEEP
    };

    const driver = new AppSearchDriver({
      ...params,
      initialState
    });
    const stateAfterCreation = driver.getState();

    let updatedState;
    driver.subscribeToStateChanges(newState => {
      updatedState = newState;
    });

    driver.setResultsPerPage(20);

    expect(updatedState).toEqual({
      ...stateAfterCreation, // KEPT
      current: 1, // RESET
      resultsPerPage: 20
    });
  });
});
