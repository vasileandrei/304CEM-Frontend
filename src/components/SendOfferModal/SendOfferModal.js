import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import addOffer from '../../actions/axiosOfferReq';
import './SendOfferModal.scss';

const lengthValidation = 0;

class SendOfferModal extends Component{
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            currentItem: '',
            message: '',
            text: '',
            price: '',
            loading: false
        };

        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
		this.showFlashMessage = (event) => this._showFlashMessage(event);
    }

    afterOpenModal = () => {
        this.subtitle.style.color = '#f00';
    }

    componentDidMount = () => {
        this.setState({
            modalIsOpen: this.props.location.state.offerModal,
            currentItem: this.props.location.state.offerItemPressed
        });

    }

    onCloseModal = () => {
        this.setState({modalIsOpen: false});
        this.props.history.push({
            pathname:'/allPosts/' + this.state.currentItem._id
        });
    }

    // eslint-disable-next-line no-unused-vars
	_showFlashMessage = (event) => {
		this.setState({
			show: !this.state.show,
			showClass: (!this.state.show ? 'fadeOut': 'fadeOut2')
		});
    }

    // handle changes in the two fields
    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.id]: event.target.value
        });

    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.showFlashMessage();
        if (this.state.text.length === lengthValidation ||
            this.state.price.length === lengthValidation) {
            this.setState({
                message: 'Please compelte the entire form'
            });
        } else {
            this.setState({
                message: 'Processing your request'
            });
            this.sendOffer();
        }
    }

    async sendOffer() {
        const offerUser = this.props.auth.user.userInfo.username;
        const offerPrice = this.state.price;
        const offerMessage = this.state.text;
        const postId = this.state.currentItem._id;

        const response = await addOffer('add_offer', postId, offerUser, offerMessage, offerPrice);

        if (response) {
            this.setState({
                message: 'Successfully posted offer'
            });
            this.onCloseModal();
        } else {
            this.setState({
                message: 'An error has occured'
            });
        }
    }

    render() {
        return (
          <div>
            <Modal closeOnOverlayClick={true} open={this.state.modalIsOpen} onClose={this.onCloseModal} center>
                <div className='modal__offer__cards__item'>
                    <div className='modal__offer__card'>
                        <div className='modal__offer_card__header'>
                                <div className='modal__header__down'>
                                    <span  className='modal__card__title'>
                                        Send an offer to {this.state.currentItem.authorName}
                                    </span>
                                </div>
                            </div>
                            <div className='modal__card__content'>
                                <FormGroup className="inputField" controlId="text">
                                    <FormControl className="input textArea" type="textarea" placeholder="Your message here"
                                    value={this.state.text} onChange={this.handleChange} componentClass="textarea" />
                                </FormGroup>
                                <FormGroup className="inputField" controlId="price">
                                    <FormControl className="input" type="text" placeholder="Price in £"
                                    value={this.state.price} onChange={this.handleChange} />
                                </FormGroup>
                                <br />
                                <div id="externalMessage" className={this.state.showClass}>
                                    {this.state.message}
                                </div>
                                <div className='modal__buttons_container'>
                                    <Button className='modal__offer__button' onClick={this.handleSubmit}>Send Offer</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
          </div>
        );
      }
}

SendOfferModal.propTypes = {
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps)(SendOfferModal);