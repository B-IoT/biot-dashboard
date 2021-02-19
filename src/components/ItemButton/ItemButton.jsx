import React from 'react';

import './ItemButton.css';

export default function ItemButton({ text, icon }) {
  const [animate, setAnimate] = React.useState(0);

  return (
    <div className="item-container">
      <div className="item-light" />
      <div className="item-shadow" />
      <div className="text-container">
        <img className="item-icon" src={icon} alt="Item icon" />
        <div className="item-text axiforma-medium-blue-18px"> {text} </div>
      </div>
    </div>
  );
}
