import * as SwiftypeAppSearch from "swiftype-app-search-javascript";

export default class AppSearchDriver {
  constructor(config) {
    this.config = config;
    this.client = SwiftypeAppSearch.createClient({
      hostIdentifier: config.hostIdentifier,
      apiKey: config.searchKey,
      engineName: config.engineName
    });
  }

  search() {
    return this.client.search.apply(this.client, arguments);
  }
}
