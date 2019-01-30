import PropTypes from "prop-types";
import React, { Component } from "react";

import { withSearch } from "../search-lib";
import { SearchBox } from "../components";

export class SearchBoxContainer extends Component {
  static propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.func.isRequired
  };

  state = {
    isFocused: false,
    showSuggestions: false,
    value: ""
  };

  constructor(props) {
    super();
    this.state.value = props.searchTerm;
  }

  handleFocus = () => {
    this.setState({
      isFocused: true,
      showSuggestions: true
    });
  };

  handleBlur = () => {
    this.setState({
      isFocused: false,
      showSuggestions: false
    });
  };

  handleSubmit = e => {
    const { setSearchTerm } = this.props;
    const { value } = this.state;

    e.preventDefault();
    this.setState(
      {
        showSuggestions: false
      },
      () => {
        setSearchTerm(value, {
          refresh: true,
          suggest: false
        });
      }
    );
  };

  handleSelectSuggestion = suggestion => {
    const { setSearchTerm } = this.props;

    this.setState(
      {
        showSuggestions: false,
        value: suggestion.suggestion
      },
      () => {
        setSearchTerm(suggestion.suggestion, {
          refresh: true,
          suggest: false
        });
      }
    );
  };

  handleChange = e => {
    const { setSearchTerm } = this.props;

    this.setState({
      value: e.currentTarget.value,
      showSuggestions: true
    });

    setSearchTerm(e.currentTarget.value, {
      refresh: false,
      suggest: true
    });
  };

  render() {
    const { isFocused, showSuggestions, value } = this.state;
    const { inputProps, querySuggestionResults } = this.props;

    return (
      <SearchBox
        isFocused={isFocused}
        onChange={this.handleChange}
        onSelectSuggestion={this.handleSelectSuggestion}
        onSubmit={this.handleSubmit}
        showSuggestions={showSuggestions}
        suggestions={querySuggestionResults}
        value={value}
        inputProps={{
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          ...inputProps
        }}
      />
    );
  }
}

export default withSearch(SearchBoxContainer);
