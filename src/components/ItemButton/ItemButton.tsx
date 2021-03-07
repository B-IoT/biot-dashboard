import React from 'react';

import './ItemButton.css';
import { Link } from 'react-router-dom';
import { Hover, FadeIn, FadeOut, Scale } from '../../utils/animations';
import { getIconPath } from '../../utils/items';

export default function ItemButton(props: { itemName: string }) {
  return (
    <Hover className="item-container">
      <FadeIn className="item-pressed" />
      <Link
        className="button-container"
        to={{ pathname: '/tracking', state: { itemName: props.itemName } }}
        style={{ textDecoration: 'none' }}
      >
        <FadeOut className="button-container">
          <div className="item-light" />
          <div className="item-shadow" />
        </FadeOut>
      </Link>
      <Scale className="text-container clear">
        <img
          className="item-icon"
          src={getIconPath(props.itemName)}
          alt="Item icon"
        />
        <div className="item-text axiforma-medium-blue-18px">
          {' '}
          {props.itemName}{' '}
        </div>
      </Scale>
    </Hover>
  );
}
