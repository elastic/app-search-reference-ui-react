import PropTypes from "prop-types";
import React, { Component } from "react";

import withAppSearch from "../app-search/withAppSearch";
import SearchBox from "../components/SearchBox";

export class SearchBoxContainer extends Component {
  static propTypes = {
    setSearchTerm: PropTypes.func.isRequired
  };

  state = {
    value: "",
    focus: false
  };

  handleFocus = e => {
    this.setState({
      focus: true
    });
  }

  handleSubmit = e => {
    const { setSearchTerm } = this.props;
    const { value } = this.state;

    e.preventDefault();
    setSearchTerm(value);
  };

  render() {
    const { value } = this.state;

    return (
      <SearchBox
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onFocus={this.handeFocus}
        value={value}
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
