/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from "react";
import { Offline, Online, Detector } from "react-detect-offline";
import "./App.css";

const polling = {
  enabled: true,
  interval: 2000,
  timeout: 1000
};

class App extends Component {
  render() {
    return (
      <div>
        <Online polling={polling}>Online 🆗</Online>
        <Offline polling={polling}>⚠️Offline⚠️</Offline>
        <Detector
          render={({ online }) => (
            <div className={`App ${online ? "Online" : "Offline"}`}>
              detector: {online ? "online" : "offline"}
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
