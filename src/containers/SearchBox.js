import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import SearchBox from "../components/SearchBox";

export class SearchBoxContainer extends Component {
  state = {
    value: "cat"
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.setSearchTerm(this.state.value);
  };

  render() {
    return (
      <SearchBox
        value={this.state.value}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      />
    );
  }

  handleChange = e => {
    this.setState({
      value: e.currentTarget.value
    });
  };
}

export default withAppSearch(SearchBoxContainer);
