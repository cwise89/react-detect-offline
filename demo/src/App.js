import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const show = this.state && this.state.show;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 onClick={() => this.setState({ show: !show })}>Welcome to React</h2>
        </div>
        {
          show ?
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
            <Online>Internet ready.{' '}</Online>
            <Online>
              <span style={{color: 'pink'}}>Internet{' '}</span>
              <span style={{color: 'red'}}>ready.{' '}</span>
            </Online>
            <Online>Internet ready.{' '}</Online>
            <Offline>OFFLINE ONLY.</Offline>
            <Offline/>
          </p>
          : null
        }
      </div>
    );
  }
}

export default App;
