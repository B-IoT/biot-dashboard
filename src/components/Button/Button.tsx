import React from 'react';
import { Hover, FadeIn, FadeOut, Scale } from '../../utils/animations';

import './Button.css';

export default function Button(props: {
  text: string;
  onClick: () => void;
  width: number;
  style: {};
}) {
  return (
    <Hover
      className="button"
      style={Object.assign({}, { width: props.width }, props.style)}
      onClick={props.onClick}
    >
      <FadeIn className="button-pressed" style={{ width: props.width }} />
      <FadeOut className="button-shadow" style={{ width: props.width }} />
      <FadeOut className="button-light" style={{ width: props.width }} />
      <Scale
        className="button-text axiforma-medium-blue-22px"
        style={{ width: props.width }}
      >
        {props.text}
      </Scale>
    </Hover>
  );
}
