import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Shop from '../Shop';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to R3PI&apos;s fruit shop.</h2>
        </div>
        <Shop {...this.props} />
      </div>
    );
  }
}

export default App;
