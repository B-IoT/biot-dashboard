import React from 'react';
import './ItemButton.css';

function Composant31(props) {
  const { text1, className } = props;

  return (
    <div className={`composant-3-1 ${className || ''}`}>
      <div className="overlap-group3">
        <h1 className="text-1 axiforma-semi-bold-spindle-120px">{text1}</h1>
      </div>
    </div>
  );
}

export default Composant31;
