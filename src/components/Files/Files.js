/* eslint-disable max-len */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResizeAware from 'react-resize-aware';
import Item from './../Item/Item';
import './Files.scss';

const mobileThreshHold = 100;

class Files extends Component{

constructor(){
    super();
    this.state = {
      isMobileDevice: false,
      openModal: false,
      postsList: [],
      mobile: {
        DrawerOpen:false
      }
    };
  }

  handleResize = ({ width }) =>{
    if (width < mobileThreshHold){
      this.setState({isMobileDevice:true});
    } else {
      this.setState({isMobileDevice:false});
    }
  };

  componentDidMount(){
    let testpostsList=[];
    testpostsList.push(
      {
        _id:'asddfa3e4e34fd',
        authorId:'11122112112',
        authorName:'Bogdan',
        title:'Gtx 1070',
        condition:'Perferct',
        location:'Bucharest',
        description:'This is the shorthand for flex-grow, flex-shrink and flex-basis combined. The second and third parameters (flex-shrink and flex-basis) are optional. Default is 0 1 auto.',
        dateCreated:'21 Jan 2019',
        images:['https://goo.gl/images/nsSPRa','34433'],
        offers:[
          {
            _id:'dsgqwt4534243e',
            requestName: 'Raluca',
            reqPrice:150,
            reqMessage:'this is a test message'
          }
        ]
      },
      {
        _id:'asddfa3e4c34fd',
        authorId:'343251554334',
        authorName:'Gogoasa',
        title:'Gtx 1060',
        condition:'Good',
        location:'Guatamala',
        description:'This is the shorthand for flex-grow, flex-shrink and flex-basis combined. The second and third parameters (flex-shrink and flex-basis) are optional. Default is 0 1 auto.',
        dateCreated:'08 Jan 2020',
        images:['../../images/test_photo.jpg','34433'],
        offers:[
          {
            _id:'dsgqwt4534243e',
            requestName:'Raluca',
            reqPrice:150,
            reqMessage:'this is a test message',
            status:'Pending'
          },
          {
            _id:'dsgqwtd534243e',
            requestName:'Gogu',
            reqPrice:350,
            reqMessage:'this is a test message',
            status:'Pending'
          }
        ]
      },
      {
        _id:'fasde43q45cfd',
        authorId:'43124324321',
        authorName:'Relu',
        title:'Gtx 1060',
        condition:'Used',
        location:'France',
        description:'This is the shorthand for flex-grow, flex-shrink and flex-basis combined. The second and third parameters (flex-shrink and flex-basis) are optional. Default is 0 1 auto.',
        dateCreated:'21 Jan 2020',
        images:['../../images/test_photo.jpg','34433'],
        offers:[
          {
            _id:'dsgqwt4534243e',
            requestName:'Raluca',
            reqPrice:150,
            reqMessage:'this is a test message',
            status:'Pending'
          },
          {
            _id:'dsgqwtd534243e',
            requestName:'Gogu',
            reqPrice:350,
            reqMessage:'this is a test message',
            status:'Pending'
          }
        ]
      });
    this.setState({
      postsList: testpostsList
    });
  }

  AccessItemDetails(itemIndex){
    let showThisItemDetails = this.state.postsList[itemIndex];
    this.props.history.push({
      pathname:'/allPosts/' + showThisItemDetails._id,
      state:{
          itemPressed: showThisItemDetails,
          modalOpen: true
       }
     });
  }

  render() {
    const webView =
    <div className='parent_container_web'>
      <div className='main_container_web'>
        <div className='cards_list'>
          {this.state.postsList.map((item,index) =>
            <Item click={()=>this.AccessItemDetails(index)} key={item._id} value={item}></Item>
          )}
        </div>
      </div>
    </div>;

    const mobileView =
    <div className="App">
      <header className="App_header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Hello here. Want to see the hot reload for mobileee </p>
        <a className="App_link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>;


    return (
      <ResizeAware onlyEvent onResize={this.handleResize}> {
        this.state.isMobileDevice===false? webView : mobileView
      } </ResizeAware>
    );
  }
}

Files.propTypes = {
  history: PropTypes.object.isRequired
};



export default Files;
