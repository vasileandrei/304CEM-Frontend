import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header'; 
import Login from './components/login/Login'; 

class App extends Component {

  render() {

    return (
      <div>
        <Header onSearchClick={this.onSearch} />
        <Login/>
      </div>
    );
  }

}

export default App;
