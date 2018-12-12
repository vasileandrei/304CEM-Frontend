import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import testImage from './images/videoCard.jpg';
import './ItemDetails.scss';

class ItemDetails extends Component {
    constructor() {
      super();

      this.state = {
        modalIsOpen: false
      };

      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.onCloseModal = this.onCloseModal.bind(this);
    }

    afterOpenModal() {
      this.subtitle.style.color = '#f00';
    }
    componentDidMount(){
        this.setState({
            modalIsOpen: this.props.location.state.modalOpen
        });
    }

    onCloseModal() {
      this.setState({modalIsOpen: false});
      this.props.history.push({
        pathname:'/allPosts'

       });
    }

    render() {
        return (
          <div>
            <Modal  closeOnOverlayClick={true} open={this.state.modalIsOpen} onClose={this.onCloseModal} center>
                <div className='modal__cards__item'>
                    <div className='modal__card'>
                        <div className='modal__card__header'>
                            <div className='modal__header__up'>
                                <div   className='modal__card__title'>GTX 1070</div>
                                <div className='modal__card__title'>Condition: <span>Perfect</span></div>
                            </div>
                                <div className='modal__header__down'>
                                    <span  className='modal__card__title'>Bucharest</span>
                                </div>
                            </div>
                            <div className='modal__image'>
                                <Image src={testImage}></Image>
                            </div>
                            <div className='modal__card__content'>
                                <p className='modal__card__text'>This is the shorthand for flex-grow, flex-shrink and flex-basis combined. The second and third parameters (flex-shrink and flex-basis) are optional. Default is 0 1 auto. </p>
                                <div className='modal__buttons_container'>
                                    <Button className='modal__button'>Add to Fav</Button>
                                    <Button className='modal__button'>Make Offer</Button>
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
    location: PropTypes.object.isRequired
  };

  export default ItemDetails;
