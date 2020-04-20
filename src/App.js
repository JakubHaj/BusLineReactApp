import React, { Component } from 'react';
import './App.css';
import Interface from './containers/Interface/Interface'
import Map from './containers/Map'
require('dotenv').config();

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Interface></Interface>
          <Map></Map>
        </header>
      </div>
      );
    }
}


export default App;