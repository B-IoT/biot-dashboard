import React from 'react';

import './RoundButton.css';
import { Hover, FadeIn, FadeOut, Scale } from '../../utils/animations';

export default function RoundButton(props: {
  iconPath: string;
  onClickHandler(event: React.MouseEvent<HTMLElement>): void;
}) {
  return (
    <Hover className="round-container">
      <FadeIn className="round-pressed" />
      <button className="round-button-container" onClick={props.onClickHandler}>
        <FadeOut className="round-button-container">
          <div className="round-light" />
          <div className="round-shadow" />
        </FadeOut>
      </button>
      <Scale className="icon-container clear">
        <img className="round-icon" src={props.iconPath} alt="Button icon" />
      </Scale>
    </Hover>
  );
}
