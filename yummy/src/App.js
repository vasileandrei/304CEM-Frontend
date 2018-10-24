import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'; 
import Register from './components/Register'; 

class App extends Component {

  render() {

    return (
      <div>
        <Header onSearchClick={this.onSearch} />
        <Register />
      </div>
    );
  }

}

export default App;
