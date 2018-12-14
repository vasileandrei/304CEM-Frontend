import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import PropTypes from 'prop-types';
import getPosts from '../../actions/axiosPostsReq';
import getMyOffers from '../../actions/axiosMyOfferReq';
import Offer from '../Offer/Offer';
import './UserOffers.scss';

const messageIndex = 0;
const dataIndex = 1;

class UserOffers extends Component{
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
        // Get all offers for current user
        await this.getAllMyOffers();
        // Get all posts for current user
        await this.getAllPosts();
        // Append offers to posts
        await this.combineResults();
        // Allow the page to render, we got all the data
        if (!this.state.sendToOfferComponent) {
            this.setState({
                sendToOfferComponent: true
            });
        }

        // eslint-disable-next-line no-magic-numbers
        if (this.state.postsList.length > 0) {
            this.setNotEmpty();
        }

        this.setState({
            loading: false
        });
    }

    async getAllMyOffers() {
        const currentUser = this.props.auth.user.userInfo.username;
        const response = await getMyOffers('get_all_my_offers', currentUser);
        if (response[messageIndex] === true) {
            this.setState({
                offersList: response[dataIndex]
            });
        }
    }

    async getAllPosts() {
        const myIdList = this.state.offersList;
        const response = await getPosts('get_all_posts_by_id', '', myIdList);
        if (response[messageIndex] === true) {
            this.setState({
                postsList: response[dataIndex]
            });
        }
    }

    combineResults = () => {
        const posts = this.state.postsList;
        const offers = this.state.offersList;
        for (let i=0; i < posts.length; i++) {
            for (let j=0; j < offers.length; j++) {
                if (posts[i]._id === offers[j].postId) {
                    posts[i].offers = offers[j].offers;
                    posts[i].type = 'userOffer';
                }
            }
        }
    }

    openAllOffersModal = (index) => {
        const showThisItemDetails = this.state.postsList[index];
        this.props.history.push({
        pathname:'/myOffers/' + showThisItemDetails._id,
        state:{
            itemPressed: showThisItemDetails,
            modalOpen: true,
            type: '/myOffers/'
        }
        });
    }

    goToAllPosts = () => {
        this.props.history.push({
                pathname:'/allPosts/'
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
                <h1 className='homeTitle'>You have no offers</h1>
                <Button className="actionButtons" onClick={this.goToAllPosts}>Browse for items</Button>
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

UserOffers.propTypes = {
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(UserOffers);