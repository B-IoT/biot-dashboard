import { Redirect, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchToken } from '../api/api';

function SecureRoute({ component: Component, ...rest }: any) {
  const token = localStorage.getItem('token');
  const tokenDate = localStorage.getItem('tokenDate');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Check if token exists and if it is younger than 6 days (in milliseconds)
  useEffect(() => {
    if (
      token === null ||
      tokenDate === null ||
      Date.now() - parseInt(tokenDate) > 518400000
    ) {
      setIsLoggedIn(false);
    } else {
      fetchToken();
      setIsLoggedIn(true);
    }
  }, [token, tokenDate]);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default SecureRoute;
