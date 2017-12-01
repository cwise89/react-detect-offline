import React, { Component } from "react";
import { Offline, Online, Detector } from "react-detect-offline";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Detector
        render={({ online }) => (
          <div className={`App ${online ? "Online" : "Offline"}`}>
            <Online>Online</Online>
            <Offline>OFFLINE</Offline>
          </div>
        )}
      />
    );
  }
}

export default App;
