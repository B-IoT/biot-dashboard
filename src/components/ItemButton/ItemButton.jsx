import * as React from 'react';
import './ItemButton.css';

function ItemButton(props) {
  const { text16, className } = props;

  return (
    <div className="container">
      <div className="composant-3-" />
      <div className="composant-3-25" />
      <div className={`composant-3-5 ${className || ''}`} />
      <div className="overlap-group15" />
      <h1 className="text-16 axiforma-semi-bold-spindle-120px">{text16}</h1>
    </div>
  );
}

export default ItemButton;
