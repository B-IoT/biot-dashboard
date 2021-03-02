import React from 'react';
import styled from '@emotion/styled/macro';

import './ItemButton';
import './ItemButton.css';

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

export default function PlaceholderButton() {
  return (
    <Hover className="item-container">
      <FadeIn className="item-pressed" />
      <FadeOut className="button-container">
        <div className="item-light" />
        <div className="item-shadow" />
      </FadeOut>
      <Scale className="text-container">
        <div className="placeholder-text axiforma-semi-bold-spindle-120px">
          {'...'}
        </div>
      </Scale>
    </Hover>
  );
}
