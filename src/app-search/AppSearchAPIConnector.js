import * as SwiftypeAppSearch from "swiftype-app-search-javascript";

/*
 * We mainly just need to filter out unsupported configuration values, like
 * `disjunctive`
 */
function toAPIFacetSyntax(facetConfig = {}) {
  return Object.entries(facetConfig).reduce((acc, [key, value]) => {
    acc[key] = Object.entries(value).reduce((propAcc, [propKey, propValue]) => {
      if (["type", "size", "ranges"].includes(propKey)) {
        propAcc[propKey] = propValue;
      }
      return propAcc;
    }, {});
    return acc;
  }, {});
}

function getListOfDisjunctiveFacets(facetConfig = {}) {
  return Object.entries(facetConfig).reduce((acc, [key, value]) => {
    if (value && value.disjunctive === true) {
      return acc.concat(key);
    }
    return acc;
  }, []);
}
export default class AppSearchAPIConnector {
  /**
   * @param options Object
   * engineName  - Engine to query, found in your App Search Dashboard
   * hostIdentifier - Credential found in your App Search Dashboard
   * searchKey - Credential found in your App Search Dashboard
   * endpointBase - (optional) Overrides the base of the Swiftype API endpoint
   *   completely. Useful when proxying the Swiftype API or developing against
   *   a local API server.
   */
  constructor({ searchKey, engineName, hostIdentifier, endpointBase = "" }) {
    if (!engineName || !hostIdentifier || !searchKey) {
      throw Error("engineName, hostIdentifier, and searchKey are required");
    }

    this.client = SwiftypeAppSearch.createClient({
      endpointBase,
      hostIdentifier: hostIdentifier,
      apiKey: searchKey,
      engineName: engineName
    });
  }

  click(props) {
    return this.client.click(props);
  }

  search(searchTerm, searchOptions) {
    const disjunctiveFacets = getListOfDisjunctiveFacets(searchOptions.facets);
    if (searchOptions.facets) {
      searchOptions.facets = toAPIFacetSyntax(searchOptions.facets);
    }

    return this.client.search(searchTerm, {
      ...searchOptions,
      disjunctiveFacets
    });
  }
}
