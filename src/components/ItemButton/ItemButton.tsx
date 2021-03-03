import React from 'react';

import './ItemButton.css';
import { Link } from 'react-router-dom';
import { Hover, FadeIn, FadeOut, Scale } from '../../utils/animations';

export default function ItemButton(props: { text: string; icon: string }) {
  return (
    <Hover className="item-container">
      <FadeIn className="item-pressed" />
      <Link
        className="button-container"
        to={{ pathname: '/tracking', state: { itemName: props.text } }}
        style={{ textDecoration: 'none' }}
      >
        <FadeOut className="button-container">
          <div className="item-light" />
          <div className="item-shadow" />
        </FadeOut>
      </Link>
      <Scale className="text-container clear">
        <img className="item-icon" src={props.icon} alt="Item icon" />
        <div className="item-text axiforma-medium-blue-18px">
          {' '}
          {props.text}{' '}
        </div>
      </Scale>
    </Hover>
  );
}
