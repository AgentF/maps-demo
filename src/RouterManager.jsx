import React from 'react';
import { Router } from '@reach/router';
import { GlobalStyle } from './styles/GlobalStyle';
import { Home } from './pages/Home';

export const RouterManager = () => (
  <>
    <GlobalStyle />
    <Router basepath="/maps-demo/">
      <Home path="/" />
    </Router>
  </>
);
