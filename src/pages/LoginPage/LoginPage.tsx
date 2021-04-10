import React, { useState } from 'react';

import './LoginPage.css';
import Input from '../../components/Input/Input';
import logo from '../../img/logoColor.png';
import Button from '../../components/Button/Button';

function LoginPage() {
  const [keyword, setKeyword] = useState('');
  console.log(keyword);

  return (
    <div className="center-login">
      <a href="https://biot.webflow.io">
        <img className="login-logo" src={logo} alt="BIoT logo" />
      </a>
      <Input
        setKeyword={setKeyword}
        defaultText="Nom d'utilisateur"
        width={400}
        style={{ marginTop: 20 }}
      />
      <Input
        setKeyword={setKeyword}
        defaultText="Mot de passe"
        width={400}
        style={{}}
      />

      <Button text="Connexion" width={200} style={{ marginTop: 50 }} />
    </div>
  );
}

export default LoginPage;
