/* eslint-disable max-len */

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import PropTypes from 'prop-types';
import ResizeAware from 'react-resize-aware';
import Item from './../Item/Item';
import getAllPosts from './../../actions/axiosPostsReq';
import favsRequest from './../../actions/axiosUserReq';
import './Favourites.scss';

const mobileThreshHold = 100;

const messageIndex = 0;
const dataIndex = 1;

let favList = [];

class Favourites extends Component{

constructor(){
    super();
    this.state = {
      empty: true,
      isMobileDevice: false,
      openModal: false,
      postsList: [],
      favList: [],
      loading: true,
      mobile: {
        DrawerOpen:false
      }
    };

    this.goToAllPosts = this.goToAllPosts.bind(this);
  }

  handleResize = ({ width }) =>{
    if (width < mobileThreshHold){
      this.setState({isMobileDevice:true});
    } else {
      this.setState({isMobileDevice:false});
    }
  };

  async componentDidMount() {

    await this.getAllFavs();

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

    async getAllFavs() {
        const response = await favsRequest('get_fav', this.props.auth.user.userInfo.username);
        if (response[messageIndex] === true) {
            favList = response[dataIndex];
            this.setState({
                stateFavList: favList
            });
        }
    }

    async getAllPosts() {
        const response = await getAllPosts('get_all_posts', 'posts');
        if (response[messageIndex] === true) {
            const newList = await this.filterList(response[dataIndex]);
            this.setState({
                postsList: newList
            });
        }
    }

    filterList = (list) => {
        const notEmpty = 0;
        const tmpList = [];
        list.forEach((element) => {
            if (favList.indexOf(element._id) >= notEmpty) {
                tmpList.push(element);
            }
        });
        return tmpList;
    }


    setNotEmpty = () => {
        this.setState({
        empty: false
        });
    }

    goToAllPosts = () => {
        this.props.history.push({
                pathname:'/allPosts/'
            });
    }

    render() {
        let offerComponent = [];
        const emptyCanvas = <div>
            <h1 className='homeTitle'>No posts yet - be the first one</h1>
            <Button className="actionButtons" onClick={this.goToAllPosts}>Browse for items</Button>
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
        <ResizeAware onlyEvent onResize={this.handleResize}> {
            <LoadingOverlay
            active={this.state.loading}
            className='mySpinner'
            spinner
            text="Loading">
                <div className='body'>
                    { this.state.empty? emptyCanvas: offerComponent }
                </div>
            </LoadingOverlay>
        } </ResizeAware>
        );
    }
}

Favourites.propTypes = {
  history: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(Favourites);
