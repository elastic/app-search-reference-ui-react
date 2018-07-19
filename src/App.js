import React, { Component } from "react";

import "./App.css";

import Header from "./components/Header";
import Body from "./components/Body";

import AppSearchProvider from "./app-search/AppSearchProvider";
import AppSearchDriver from "./app-search/AppSearchDriver";
import config from "./config/engine.json";

class App extends Component {
  render() {
    return (
      <AppSearchProvider driver={new AppSearchDriver(config)}>
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
