import React, { Component } from "react";

import SearchBox from "../components/SearchBox";

class App extends Component {
  state = {
    value: "cat"
  };

  render() {
    return <SearchBox value={this.state.value} onChange={this.handleChange} />;
  }

  handleChange = e => {
    this.setState({
      value: e.currentTarget.value
    });
  };
}

export default App;
