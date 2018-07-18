import React, { Component } from "react";

import Meta from "../components/Meta";

class MetaContainer extends Component {
  state = {
    searchTerm: "cat",
    totalResults: 1000,
    currentItem: 1,
    size: 20
  };

  render() {
    return (
      <Meta
        searchTerm={this.state.searchTerm}
        totalResults={this.state.totalResults}
        currentItem={this.state.currentItem}
        size={this.state.size}
      />
    );
  }
}

export default MetaContainer;
