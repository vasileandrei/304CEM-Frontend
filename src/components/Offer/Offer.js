import React from 'react';
import PropTypes from 'prop-types';
import './Offer.scss';

const Offer=(props)=>{
    if (props.value.type === 'userOffer') {
        props.value.offerStatus = props.value.offers.status;
        props.value.offers.length = 'Your offer';
    }
    let statusValue;
    if (typeof props.value.offers === 'undefined') {
        props.value.offers = [];
    }
    const numberOfOffers = `(${props.value.offers.length})`;
    if (props.value.offerStatus === 'Accepted') {
        statusValue = <span className='greenStatus'>{props.value.offerStatus}</span>;
    } else if (props.value.offerStatus === 'Pending') {
        statusValue = <span className='orangeStatus'>{props.value.offerStatus}</span>;
    } else {
        statusValue = <span className='greyStatus'>No Offers</span>;
    }

  return (
    <div onClick={props.click} className='offers__item'>
        <div className='offer'>
            <div className='offer__header'>
                <div className='header__up'>
                    <div className='offer__title'>{props.value.title}{ numberOfOffers }<br /></div>
                    <div className='offer__title'>Status: { statusValue }</div>
                </div>
            </div>
            <div className='offer__content'>
                    <div className='offer__text'>Price: <span>{props.value.price}</span></div>
            </div>
            <div className='offer__content'>
                <div className='offer__text'>Location: <span>{props.value.location}</span></div>
            </div>
            <div className='offer__content'>
                <div className='offer__text'>Posted on: <span>{props.value.dateCreated}</span></div>
            </div>
        </div>
  </div>
  );
};

Offer.propTypes = {
  value: PropTypes.object.isRequired,
  click: PropTypes.func.isRequired
};

export default Offer;
