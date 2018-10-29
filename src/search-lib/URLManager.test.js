import URLManager from "./URLManager";

function createManager() {
  const manager = new URLManager();
  manager.history = {
    location: {
      search: ""
    },
    listen: jest.fn(),
    push: jest.fn()
  };
  return manager;
}

it("can be initialized", () => {
  const manager = new URLManager();
  expect(manager).toBeInstanceOf(URLManager);
});

describe("#getStateFromURL", () => {
  it("will parse the current state from the URL", () => {
    const manager = createManager();
    manager.history.location.search =
      "?fv-dependencies=underscore&fv-keywords=node&q=node&size=20&sort-direction=asc&sort-field=name";

    const state = manager.getStateFromURL();
    expect(state).toMatchSnapshot();
  });

  it("will parse range filter types", () => {
    const manager = createManager();
    manager.history.location.search =
      "?fr-date=12_4000&fr-date=_4000&fr-cost=50_&fv-keywords=node";

    const state = manager.getStateFromURL();
    expect(state).toMatchSnapshot();
  });

  it("will ignore unrecognized parameters", () => {
    const manager = createManager();
    manager.history.location.search =
      "?q=test&bogus=12&tommy=dunn&whatever&ok&thatsall";

    const state = manager.getStateFromURL();
    expect(state).toMatchSnapshot();
  });

  it("will correctly handle multiple instances of the same parameter", () => {
    const manager = createManager();
    manager.history.location.search =
      "fv-dependencies=underscore&fv-dependencies=another&fv-keywords=node&q=bad&q=node&size=bad&size=20&sort-direction=bad&sort-direction=asc&sort-field=bad&sort-field=name";

    const state = manager.getStateFromURL();
    expect(state).toMatchSnapshot();
  });
});

describe("#pushStateToURL", () => {
  it("will update the url with the url corresponding to the provided state", () => {
    const manager = createManager();
    manager.pushStateToURL({
      filters: [
        {
          dependencies: ["underscore", "another"]
        },
        {
          keywords: ["node"]
        }
      ],
      resultsPerPage: 20,
      searchTerm: "node",
      sortDirection: "asc",
      sortField: "name"
    });
    const queryString = manager.history.push.mock.calls[0][0].search;
    expect(queryString).toEqual(
      "?fv-dependencies=underscore&fv-dependencies=another&fv-keywords=node&q=node&size=20&sort-field=name&sort-direction=asc"
    );
  });

  it("will update the url with range filter types", () => {
    const manager = createManager();
    manager.pushStateToURL({
      filters: [
        {
          date: [
            {
              from: 12,
              to: 4000
            },
            {
              to: 4000
            }
          ]
        },
        {
          cost: [
            {
              from: 50
            }
          ]
        },
        {
          keywords: "node"
        }
      ]
    });
    const queryString = manager.history.push.mock.calls[0][0].search;
    expect(queryString).toEqual(
      "?fr-date=12_4000&fr-date=_4000&fr-cost=50_&fv-keywords=node"
    );
  });
});

describe("#onURLStateChange", () => {
  it("will call provided callback with updated state when url changes", () => {
    const manager = createManager();

    let newState;
    manager.onURLStateChange(state => {
      newState = state;
    });

    // Simulate state change
    manager.history.listen.mock.calls[0][0]({
      search:
        "?fv-dependencies=underscore&fv-keywords=node&q=node&size=20&sort-direction=asc&sort-field=name"
    });

    expect(newState).toMatchSnapshot();
  });
});
