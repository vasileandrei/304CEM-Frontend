import React, { Component } from 'react';
import yummy_logo from './../../images/logo.png';
import './../../css/Header.css';

class Header extends Component {

constructor(props) {
    super(props);
    this.state = {
        searchTerm: "",
        headerStyle: {backgroundColor:this.props.backgroundColor}
    };
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
}

handleSearchSubmit(event) {
    //prevent the form to be submitted to its action url
    event.preventDefault();
    this.props.onSearchClick(this.state.searchTerm);
}

handleTextChange(event) {
    // console.log('event change')
    this.setState({searchTerm: event.target.value})
}

    render() {

        return (
            //this is JSX code which is very similar to HTML we already know 
            <div className="header" style={this.state.headerStyle}>
            <img src={yummy_logo} alt="React logo" /><a href="#default" className="logo">Yummy</a>
                <div className="header-right">
                    <div className="search-container">
                    <form action="">
                        <input type="text" placeholder="Search.." name="txtSearch" onChange={this.handleTextChange} value={this.state.searchTerm} />
                        <button type="submit" onClick={this.handleSearchSubmit}>Search</button>
                    </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header; 