import React from 'react';

import './Logo.css';
import logo from '../../img/logo.png';

export default function Logo() {
  return (
    <a href="https://biot.webflow.io">
      <img className="logo" src={logo} alt="BIoT logo" />
    </a>
  );
}
