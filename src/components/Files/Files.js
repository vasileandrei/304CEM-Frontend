/* eslint-disable max-len */

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import PropTypes from 'prop-types';
import ResizeAware from 'react-resize-aware';
import Item from './../Item/Item';
import getAllPosts from './../../actions/axiosPostsReq';
import './Files.scss';

const mobileThreshHold = 100;

const messageIndex = 0;
const dataIndex = 1;

class Files extends Component{

constructor(){
    super();
    this.state = {
      empty: true,
      loading: true,
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

  async componentDidMount() {

    await this.getAllPosts();

    if (this.state.postsList.length) {
      this.setNotEmpty();
    }

    this.setState({
      loading: false
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

  async getAllPosts() {
    const response = await getAllPosts('get_all_posts', 'posts');
    if (response[messageIndex] === true) {
      this.setState({
          postsList: response[dataIndex]
      });
    }
  }

  postNewItem = () => {
   this.props.history.push({
      pathname:'/postItem/'
    });
  }

  setNotEmpty = () => {
    this.setState({
      empty: false
    });
  }

  render() {
    let offerComponent = [];
    const emptyCanvas = <div>
        <h1 className='homeTitle'>No posts yet - be the first one</h1>
        <Button className="actionButtons" onClick={this.postNewItem}>Add new item</Button>
    </div>;
    if (this.state.postsList.length) {
      offerComponent =
        <div className='parent_container_web'>
          <div className='main_container_web'>
            <div className='cards_list'>
              {this.state.postsList.map((item,index) =>
                <Item click={()=>this.AccessItemDetails(index)} key={item._id} value={item}></Item>
              )}
            </div>
          </div>
        </div>;
    }

    return (
      <LoadingOverlay
        active={this.state.loading}
        className='mySpinner'
        spinner
        text="Loading"
      >
        <ResizeAware onlyEvent onResize={this.handleResize}> {
          <div className='body'>
              { this.state.empty? emptyCanvas: offerComponent }
            </div>
        } </ResizeAware>
      </LoadingOverlay>
    );
  }
}

Files.propTypes = {
  history: PropTypes.object.isRequired
};



export default Files;
