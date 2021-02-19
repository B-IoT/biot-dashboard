import React from 'react';

import './ItemButton.css';

export default function PlaceholderButton({ text }) {
  return (
    <div className="item-container">
      <div className="item-light" />
      <div className="item-shadow" />
      <div className="placeholder-text axiforma-semi-bold-spindle-120px">
        {' '}
        {text}{' '}
      </div>
    </div>
  );
}
