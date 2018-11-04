import React, { Component } from 'react';
import './../css/components/Card.css';


class Card extends Component {
  
    constructor(props){
        super(props);

        this.state = {
           cardStyle:{backgroundColor:this.props.backgroundColor}
        };
        
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(event){

        event.preventDefault();
        this.props.onClick(this.props.id);
    }

    render() {

        return (

            //this is JSX code which is very similar to HTML we already know
            //note that when a card has its title clicked it will call the event handler
            //which was passed from the grid to the card
            <div className="card">
                <img src={this.props.image} alt={this.props.imgAlt} style={{width: '100%'}} />
                <div className="container">
                    <button onClick={this.onClickHandler} className="linkButton"><h4><b>{this.props.title}</b></h4></button>
                    <p>{this.props.article}</p> 
                </div>
            </div>
        );
    }
}
export default Card;