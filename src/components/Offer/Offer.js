import React from 'react';
// import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Offer.scss';

const Offer=(props)=>{
  return (
    <div onClick={props.click} className='offers__item'>
        <div className='offer'>
            <div className='offer__header'>
                <div className='header__up'>
                    <div className='offer__title'>{props.value.title}({props.value.offers.length})</div>
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
