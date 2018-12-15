import React   from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import './Item.scss';

const Item=(props)=>{
  return (
    <div onClick={props.click} className='cards__item'>
    <div className='card'>
      <div className='card__image'>
        <Image src={props.value.files[0]}></Image>
      </div>
      <div className='card__header'>
        <div className='header__up'>
          <div className='card__title'>{props.value.title}<br/><br/></div>
        </div>
        <div className='header__down'>
          <span  className='card__title'>Location: {props.value.location}</span>
          <div className='card__title'>Condition: <span>{props.value.condition}</span></div>
        </div>
      </div>
      <div className='card__content'>
        <p className='card__text'>{props.value.description}</p>
        <div className='card_meta'>
          <div>Posted on: <span>{props.value.dateCreated}</span></div>
        </div>
      </div>
    </div>
  </div>
  );
};

Item.propTypes = {
  value: PropTypes.object.isRequired,
  click: PropTypes.func.isRequired
};

export default Item;
