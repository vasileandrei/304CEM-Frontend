import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import PropTypes from 'prop-types';
import getPosts from '../../actions/axiosPostsReq';
import getOffers from '../../actions/axiosOfferReq';
import Offer from '../Offer/Offer';
import './UserItems.scss';

const notEmpty = 0;

const messageIndex = 0;
const dataIndex = 1;

class UserItems extends Component{
    constructor() {
        super();

        this.state = {
            postsList: [],
            offersList: [],
            sendToOfferComponent: false,
            offerStatus: '',
            empty: true,
            loading: true
        };

		this.showFlashMessage = (event) => this._showFlashMessage(event);
    }

    async componentDidMount() {
        // Get all posts for current user
        await this.getAllPosts();
        // Get all offers for current user
        await this.getAllOffers();
        // Append offers to posts
        await this.combineResults();

        // Allow the page to render, we got all the data
        if (!this.state.sendToOfferComponent) {
            this.setState({
                sendToOfferComponent: true
            });
        }

        if (this.state.postsList.length > notEmpty) {
            this.setNotEmpty();
        }

        this.setState({
            loading: false
        });
    }

    async getAllPosts() {
        const currentUser = this.props.auth.user.userInfo.username;
        const response = await getPosts('get_all_posts', currentUser);
        if (response[messageIndex] === true) {
            this.setState({
                postsList: response[dataIndex]
            });
        }
    }

    async getAllOffers() {
        const currentUser = this.props.auth.user.userInfo.username;
        const response = await getOffers('get_all_offers', '', currentUser);
        if (response[messageIndex] === true) {
            this.setState({
                offersList: response[dataIndex]
            });
        }
    }

    combineResults = () => {
        const posts = this.state.postsList;
        const pendingOffers = this.state.offersList.pendingList;
        const acceptedOffers = this.state.offersList.acceptedList;
        const boughtOffers = this.state.offersList.boughtList;

        console.log(pendingOffers.length);
        console.log(this.state.offersList);

        for (let i=0; i < posts.length; i++) {
            for (let j=0; j < pendingOffers.length; j++) {
                if (pendingOffers.length !== 0) {
                    if (posts[i]._id === pendingOffers[j].postId) {
                        posts[i].offers = pendingOffers[j].offers;
                        posts[i].offerStatus = 'Pending';
                    }
                } else if (acceptedOffers.length !== 0) {
                    if (posts[i]._id === acceptedOffers[j].postId) {
                        posts[i].offerStatus = 'Accepted';
                    }
                } else if (boughtOffers.length !== 0) {
                    if (posts[i]._id === boughtOffers[j].postId) {
                        posts[i].offerStatus = 'Bought';
                    }
                } else {
                    posts[i].offerStatus = '';
                }
            }
        }
    }

    openAllOffersModal = (index) => {
        const showThisItemDetails = this.state.postsList[index];
        this.props.history.push({
        pathname:'/myItems/' + showThisItemDetails._id,
        state:{
            itemPressed: showThisItemDetails,
            modalOpen: true,
            type: '/myItems/'
        }
        });
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
        let offerComponent;
        const emptyCanvas = <div>
                <h1 className='homeTitle'>You have no items posted</h1>
                <Button className="actionButtons" onClick={this.postNewItem}>Add new item</Button>
            </div>;
        if (this.state.sendToOfferComponent) {
            offerComponent =
                <ListGroup className='list__content'>
                    {this.state.postsList.map((item, index) =>
                        <Offer click={() => this.openAllOffersModal(index)} className='offer__item' key={item._id} value={item} />
                    )}
                </ListGroup>;
        }
        return (
            <LoadingOverlay
            active={this.state.loading}
            className='mySpinner'
            spinner
            text="Loading">
                <div className='body'>
                    { this.state.empty? emptyCanvas: offerComponent }
                </div>
            </LoadingOverlay>
        );
    }
}

UserItems.propTypes = {
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(UserItems);