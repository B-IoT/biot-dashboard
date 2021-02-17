import * as React from 'react';
import './Composant35.css';

function Composant35(props) {
  const { text16, className } = props;

  return (
    <div className={`composant-3-5 ${className || ''}`}>
      <div className="overlap-group15">
        <h1 className="text-16 axiforma-semi-bold-spindle-120px">{text16}</h1>
      </div>
    </div>
  );
}

export default Composant35;
