import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import AcceptOffer from './../../actions/axiosOfferReq';
import './CheckOneOffer.scss';

class CheckOneOffer extends Component {
    constructor() {
      super();

      this.state = {
          currentItem: '',
          message: '',
          modalIsOpen: false,
          offerModal: false,
          dispplayAccepted: false
      };

      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.onCloseModal = this.onCloseModal.bind(this);
    }

    afterOpenModal = () => {
      this.subtitle.style.color = '#f00';
    }

    componentDidMount = () => {
        this.setState({
            modalIsOpen: this.props.location.state.modalOpen,
            currentItem: this.props.location.state.itemPressed
        });
    }

    onCloseModal = () => {
        this.setState({modalIsOpen: false});
        this.props.history.push({
            pathname:'/myItems/'
        });
    }

    async makeOffer(item) {
        const messageIndex = 0;
        const postId = this.state.currentItem._id;
        const offerId = item.id;

        const reponse = await AcceptOffer('accept_offer', postId, offerId);

        if (reponse[messageIndex] === true) {
            this.setState({
                dispplayAccepted: true,
                message: `A message has been sent to ${item.requestUser}`
            });
        }
    }

    generateMessages() {
        let contentData;
        let messagesList = [];
        if (this.state.currentItem.offerStatus === 'Accepted') {
            contentData = <p>Waiting for the bidder response</p>;
            return contentData;
        } else if (this.state.currentItem.offerStatus === 'Bought') {
            contentData = <p>Item has been bought</p>;
            return contentData;
        } else {
            contentData =
                this.state.currentItem.offers.map((item) => {
                    messagesList.push(
                        <ListGroup onClick={() => this.makeOffer(item)} key={item.id} className='list__offer__content'>
                    <ListGroupItem className='offer__input'>Bid from: { item.requestUser }<br/></ListGroupItem>
                    <ListGroupItem className='offer__input'>Price: { item.requestPrice }<br/></ListGroupItem>
                    <ListGroupItem className='offer__input'>Message: { item.requestMessage }<br/></ListGroupItem>
                    <Button className='button'>Accept Offer</Button>
                </ListGroup>
                );
            });
            return messagesList;
        }
    }

    render() {
        let listOfMessages;
        let acceptedOffer;
        if ( this.state.currentItem ) {
            listOfMessages = this.generateMessages();
        }
        if ( this.state.dispplayAccepted ){
            acceptedOffer =
            <div>
                <p>Successfully accepted offer for item {this.state.currentItem.title}</p>
                <p>{this.state.message}</p>
            </div>;
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
                                    <span  className='modal__card__title'>{this.state.currentItem.price}</span>
                                </div>
                            </div>
                            <div className='modal__card__content'>
                                <p className='modal__card__text'>{this.state.currentItem.description}</p>
                                { acceptedOffer? acceptedOffer : listOfMessages }
                            </div>
                        </div>
                    </div>
                </Modal>
          </div>
        );
      }
  }

  CheckOneOffer.propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

export default CheckOneOffer;
