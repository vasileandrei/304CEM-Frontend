import React, { Component } from 'react';
import './css/App.css';
import Header from './components/Header'; 
// import Register from './components/Register'; 
// import Login from './components/Login';
import Grid from './components/Grid';
import Data from './Data';

class App extends Component {

  onSearch(term){
    console.log("search on term:" + term);
  }

  //we will pass this function to card component so we will handle which thumbnail was clicked
  handleThumbnailClicked(key){
    console.log("item with id:" + key + " was clicked");
  } 

  render() {

    return (
      <div>
        <Header onSearchClick={this.onSearch} />
        <Grid items={Data.items} colClass="col-m-3" onClick={this.handleThumbnailClicked} rowLength={4} />
      </div>
    );
  }

}

export default App;
