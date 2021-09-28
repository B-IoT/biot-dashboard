import { useState } from 'react';

import './LoginPage.css';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { authenticate } from '../../api/api';
import { useHistory } from 'react-router-dom';
import { translate } from '../../i18n';

const strings = {
  username: translate("username"),
  password: translate("password"),
  wrongCredentials: translate("wrongCredentials"),
  login: translate("login")
}

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
      <a href="https://www.b-iot.ch">
        <img className="login-logo" src={'/img/logoColor.png'} alt="BIoT logo" />
      </a>
      <Input
        setKeyword={setUsername}
        defaultText={strings.username!}
        width={350}
        style={{}}
        isPassword={false}
        enterHandler={() => null}
      />
      <Input
        setKeyword={setPassword}
        defaultText={strings.password!}
        width={350}
        style={{ marginTop: 15 }}
        isPassword={true}
        enterHandler={handleSignIn}
      />
      {showError && (
        <div className="error-text login-error">
          {strings.wrongCredentials}
        </div>
      )}
      <Button
        text={strings.login!}
        onClick={() => handleSignIn()}
        width={200}
        style={{ marginTop: 35 }}
      />
    </div>
  );
}

export default LoginPage;
