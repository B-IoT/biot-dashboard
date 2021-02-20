import React from 'react';
import styled from '@emotion/styled/macro';

import './BackButton.css';
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

export default function BackButton() {
  return (
    <Link to="/search">
      <Hover className="back-button">
        <FadeIn className="back-pressed" />
        <FadeOut className="back-shadow" />
        <FadeOut className="back-light" />
        <Scale className="back-text axiforma-book-normal-blue-30px">
          {"Retour"}
        </Scale>
      </Hover>
    </Link>
  );
}