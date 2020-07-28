import React, { useState } from 'react';
import { Router, navigate } from '@reach/router';
import { GlobalStyle, Wrapper } from './styles/GlobalStyle';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

export const RouterManager = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <Wrapper>
      <GlobalStyle />
      <Router basepath={process.env.PUBLIC_URL}>
        <NotFound default />
        <Home path="/" loggedIn={loggedIn} />
        <Login
          path="/login"
          handleLoggedIn={(e) => {
            if (e) {
              navigate(process.env.PUBLIC_URL);
            }
            setLoggedIn(e);
          }}
        />
      </Router>
    </Wrapper>
  );
};
