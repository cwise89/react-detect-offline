import React, { Component } from "react";
import { Offline, Online, Detector } from "react-detect-offline";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Detector
          render={({ online }) => (
            <div className={`App ${online ? "Online" : "Offline"}`}>
              detector: {online ? "online" : "offline"}
            </div>
          )}
        />
        <Online>Online Component</Online>
        <Offline polling={{ enabled: true, interval: 2000, timeout: 1000 }}>
          Offline Component with custom polling
        </Offline>
      </div>
    );
  }
}

export default App;
