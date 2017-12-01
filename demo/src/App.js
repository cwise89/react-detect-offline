import React, { Component } from "react";
import { Offline, Online } from "react-detect-offline";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Online>
          <div>Online</div>
        </Online>
        <Offline>
          <div style={{ color: "red" }}>OFFLINE</div>
        </Offline>
      </div>
    );
  }
}

export default App;
