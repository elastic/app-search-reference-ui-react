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
    isFocused: false
  };

  handleFocus = e => {
    this.setState({
      isFocused: true
    });
  };

  handleBlur = e => {
    this.setState({
      isFocused: false
    });
  };

  handleSubmit = e => {
    const { setSearchTerm } = this.props;
    const { value } = this.state;

    e.preventDefault();
    setSearchTerm(value);
  };

  render() {
    const { isFocused, value } = this.state;
    const { inputProps } = this.props;

    return (
      <SearchBox
        isFocused={isFocused}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        value={value}
        inputProps={{
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          ...inputProps
        }}
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
