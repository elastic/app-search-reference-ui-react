import React, { Component } from "react";

import "./App.css";

import Header from "./components/Header";
import Body from "./components/Body";

import AppSearchProvider from "./app-search/AppSearchProvider";

class App extends Component {
  render() {
    return (
      <AppSearchProvider>
        <div className="App">
          <div className="App-body">
            <Header />
            <Body />
          </div>
        </div>
      </AppSearchProvider>
    );
  }
}

export default App;
