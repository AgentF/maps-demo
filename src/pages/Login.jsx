import React from 'react';
import PropTypes from 'prop-types';
import { SignUpLoginComponent } from '../components/SignUpLogin/index';
import { LoginWrapper } from './styles';

export const Login = ({ handleLoggedIn }) => (
  <LoginWrapper>
    <SignUpLoginComponent handleLoggedIn={handleLoggedIn} />
  </LoginWrapper>
);

Login.propTypes = {
  handleLoggedIn: PropTypes.func.isRequired,
};
