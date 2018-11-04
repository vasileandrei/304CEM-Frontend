import React, { Component } from 'react';

import './../css/components/Grid.css';
import Card from './Card';

class Grid extends Component {
  
    //we divided the grid into 3 components
    //the grid iteself
    //the rwo
    //the card or thumbnail
    //the grid iterates throw the recieved rows and generate the required number of rows

    //for each grid row we dife a function that will render the rwo data
    //this function recieves the cards to render as an array plus a unique id
    GridRow(cards, id){
         
        //in case null recieved for cards return to avoid runtime errors
         if(cards == null){
            return null;
        }
    
        //for each cell inside the row create a new Card component
        //definde the props for each card
        //note that we have a <div> element in top of <Card> to define our css responsive class
        //which is usually refer to the class="col-m-3" for example
        //the key for each single element should be defined in the top tag
        //note that we need to pass the click event handler and a unique id for each card
        return (
            <div className="row" key={id}>
                {cards.map((item, index) =>
                    <div className={this.props.colClass} key={item.id}>
                        <Card   image={item.image} 
                                title={item.title} 
                                article={item.article} 
                                onClick = {this.props.onClick}
                                id ={item.id}
                        />
                    </div>
                )}  
            </div>
           
        );

    }

    //this function will render the entire grid
    render() {

        //in case no array recieved for rows return to avoid run time erros
        if(this.props.items == null){
            return null;
        }

        //this code will divide the items array into small arrays 
        //where each array contain the data required for each row

        //create an array to split items into arrays for each row
        var allRows = [];
        //save the total length of items
        var len = this.props.items.length;
        //fidn the total number of rows we will produce
        var totalRows = len / this.props.rowLength;
        //count how many rows we have so far
        var countRows = 0;
    
        var count = 0;

        //while we did not count all rows
        while(countRows < totalRows){
            
            //creare a new array for this row
            let newRow = [];

            //add the required items to the array
            for (var i = 0; i < this.props.rowLength; i++){
                
                newRow.push(this.props.items[i + (countRows * this.props.rowLength)]);
                count++;
            }
            //increment the rows counter
            countRows++;
            //add the new array for this row in the pool of all row arrays
            allRows.push( this.GridRow(newRow, countRows) );
        }
    
        //after we saved all individual rows component inside the allRows now render them
        return (
            <div>
                {allRows} 
            </div>
        );
    }
}
export default Grid;