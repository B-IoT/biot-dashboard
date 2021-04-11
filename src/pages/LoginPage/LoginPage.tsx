import React, { useState } from 'react';

import './LoginPage.css';
import Input from '../../components/Input/Input';
import logo from '../../img/logoColor.png';
import Button from '../../components/Button/Button';
import { authenticate } from '../../api/items';
import { useHistory } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const history = useHistory();

  async function handleSignIn() {
    const success = await authenticate(username, password);

    if (success) {
      history.push('/');
    } else {
      setShowError(true);
    }
  }

  return (
    <div className="center-login">
      <a href="https://biot.webflow.io">
        <img className="login-logo" src={logo} alt="BIoT logo" />
      </a>
      <Input
        setKeyword={setUsername}
        defaultText="Nom d'utilisateur"
        width={350}
        style={{}}
        isPassword={false}
      />
      <Input
        setKeyword={setPassword}
        defaultText="Mot de passe"
        width={350}
        style={{ marginTop: 15 }}
        isPassword={true}
      />
      {showError && (
        <div className="error-text login-error">
          {'Identifiant ou mot de passe incorrect.'}
        </div>
      )}
      <Button
        text="Connexion"
        onClick={() => handleSignIn()}
        width={200}
        style={{ marginTop: 35 }}
      />
    </div>
  );
}

export default LoginPage;
