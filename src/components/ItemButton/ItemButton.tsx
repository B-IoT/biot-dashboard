import React from 'react';
import styled from '@emotion/styled/macro';

import './ItemButton.css';
import { Link } from 'react-router-dom';

const FadeIn = styled.div({
  opacity: 0,
  transition: 'opacity 250ms ease',
});

const FadeOut = styled.div({
  opacity: 1,
  transition: 'opacity 250ms ease',
});

const Scale = styled.div({
  transform: 'scale(1)',
  transition: 'transform 250ms ease',
});

const Hover = styled.div({
  [`:hover ${FadeIn}`]: {
    opacity: 1,
  },
  [`:hover ${FadeOut}`]: {
    opacity: 0,
  },
  [`:hover ${Scale}`]: {
    transform: 'scale(0.9)',
  },
});

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
