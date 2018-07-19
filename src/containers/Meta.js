import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import Meta from "../components/Meta";

class MetaContainer extends Component {
  render() {
    return (
      <Meta
        searchTerm={this.props.searchTerm}
        totalResults={this.props.totalResults}
        currentItem={this.props.currentItem}
        size={this.props.size}
      />
    );
  }
}

export default withAppSearch(MetaContainer);
