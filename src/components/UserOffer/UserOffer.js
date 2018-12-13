import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import getPosts from '../../actions/axiosPostsReq';
import getOffers from '../../actions/axiosOfferReq';
import Offer from './../Offer/Offer';
import './UserOffer.scss';

const messageIndex = 0;
const dataIndex = 1;

class UserOffer extends Component{
    constructor() {
        super();

        this.state = {
            postsList: [],
            offersList: [],
            sendToOfferComponent: false
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
        const offers = this.state.offersList;
        for (let i=0; i < posts.length; i++) {
            for (let j=0; j < offers.length; j++) {
                if (posts[i]._id === offers[j].postId) {
                    posts[i].offers = offers[j].offers;
                }
            }
        }
    }

    openAllOffersModal = (itemIndex) => {
        let showThisItemDetails = this.state.postsList[itemIndex];
        this.props.history.push({
        pathname:'/myOffers/' + showThisItemDetails._id,
        state:{
            itemPressed: showThisItemDetails,
            modalOpen: true
        }
        });
    }

    render() {
        let offerComponent;
        if (this.state.sendToOfferComponent) {
            offerComponent =
                <ListGroup className='list__content'>
                    {this.state.postsList.map((item, index) =>
                        <Offer className='offer__item' click={()=>this.openAllOffersModal(index)} key={item._id} value={item} />
                    )}
                </ListGroup>;
        }
        return (
            <div className='body'>
                { offerComponent }
            </div>
        );
    }
}

UserOffer.propTypes = {
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(UserOffer);