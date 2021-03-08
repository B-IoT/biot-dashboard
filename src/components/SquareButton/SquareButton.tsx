import React from 'react';

import './SquareButton.css';
import { Hover, FadeIn, FadeOut, Scale } from '../../utils/animations';

export default function SquareButton(props: { iconPath: string, onClickHandler(event: React.MouseEvent<HTMLElement>): void }) {
  return (
    <Hover className='square-container'>
      <FadeIn className='square-pressed' />
      <button className='button-container' onClick={props.onClickHandler}>
        <FadeOut className='button-container'>
          <div className='square-light' />
          <div className='square-shadow' />
        </FadeOut>
      </button>
      <Scale className='icon-container clear'>
        <img
          className='square-icon'
          src={props.iconPath}
          alt='Button icon'
        />
      </Scale>
    </Hover>
  );
}
