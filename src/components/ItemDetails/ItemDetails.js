import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import favsRequest from './../../actions/axiosUserReq';
import './ItemDetails.scss';

const notEmpty = 0;

const imgIndex = 0;

const messageIndex = 0;
const dataIndex = 1;

let favList = [];

class ItemDetails extends Component {
    constructor() {
      super();

      this.state = {
          currentItem: '',
          favourites: '',
          modalIsOpen: false,
          offerModal: false,
          images: [],
          stateFavList: []

      };

      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.onCloseModal = this.onCloseModal.bind(this);
      this.makeOffer = this.makeOffer.bind(this);
      this.addToFav = this.addToFav.bind(this);
      this.delFromFav = this.delFromFav.bind(this);
    }

    afterOpenModal = () => {
      this.subtitle.style.color = '#f00';
    }

    async componentDidMount() {
        this.setState({
            modalIsOpen: this.props.location.state.modalOpen,
            currentItem: this.props.location.state.itemPressed,
            favourites: this.props.auth.user.userInfo.favourites
        });

        await this.getAllFavs();

        this.setState({
            stateFavList: favList
        });
    }

    onCloseModal = () => {
        this.setState({modalIsOpen: false});
        this.props.history.push({
            pathname:'/allPosts'
        });
    }

    makeOffer = () => {
        this.props.history.push({
        pathname:'/allPosts/' + this.state.currentItem._id + '/makeOffer',
        state:{
            offerItemPressed: this.state.currentItem,
            offerModal: true
            }
        });
    };

    async getAllFavs() {
        const response = await favsRequest('get_fav', this.props.auth.user.userInfo.username);
        if (response[messageIndex] === true) {
            favList = response[dataIndex];
            this.setState({
                stateFavList: favList
            });
        }
    }

    async addToFav()  {
        const response = await favsRequest('add_fav', this.props.auth.user.userInfo.username, this.state.currentItem._id);
        if (response[messageIndex] === true) {
            favList.push(response[dataIndex]);
        }
        await this.getAllFavs();
    }

    async delFromFav() {
        const findIndex = -1;
        const removeIndex = 1;

        const response = await favsRequest('del_fav', this.props.auth.user.userInfo.username, this.state.currentItem._id);
        if (response[messageIndex] === true) {
            const index = favList.indexOf(this.state.currentItem._id);
            if (index > findIndex) {
                favList.splice(index, removeIndex);
            }
        }
        await this.getAllFavs();
    }

    render() {
        let buttonToDisplay;
        if (favList) {
            if (favList.indexOf(this.state.currentItem._id) >= notEmpty) {
                buttonToDisplay = <Button className='modal__button' onClick={this.delFromFav}>Delete from Favourites</Button>;
            } else {
                buttonToDisplay = <Button className='modal__button' onClick={this.addToFav}>Add to Favourites</Button>;
            }
        }
        return (
          <div>
            <Modal closeOnOverlayClick={true} open={this.state.modalIsOpen} onClose={this.onCloseModal} center>
                <div className='modal__cards__item'>
                    <div className='modal__card'>
                        <div className='modal__card__header'>
                            <div className='modal__header__up'>
                                <div   className='modal__card__title'>{this.state.currentItem.title}</div>
                            </div>
                                <div className='modal__header__down'>
                                <div className='modal__card__title'>Condition: <span>{this.state.currentItem.condition}</span></div>
                                    <span  className='modal__card__title'>Location: {this.state.currentItem.location}</span>
                                </div>
                            </div>
                            <div className='modal__image'>
                                <Image src={ this.state.currentItem.files? this.state.currentItem.files[imgIndex]: ''} />
                            </div>
                            <div className='modal__card__content'>
                                <p className='modal__card__text'>{this.state.currentItem.description}</p>
                                <div className='modal__buttons_container'>
                                    { buttonToDisplay }
                                    <Button className='modal__button' onClick={this.makeOffer}>Make Offer</Button>
                                    <Button className='modal__button'>Send  Message</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
          </div>
        );
      }
  }

ItemDetails.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(ItemDetails);