import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useInputValue } from '../../hooks/useInputValue';
import {
  SignUpLogin,
  Header,
  Options,
  OptionButton,
  OptionName,
  InputGroup,
  InputLabel,
  Input,
  ConfirmButton,
} from './styles';

export const SignUpLoginComponent = ({ handleLoggedIn }) => {
  const [option, setOption] = useState('Login');
  const [name, setName, onNameChange] = useInputValue('');
  const [email, setEmail, onEmailChange] = useInputValue('');
  const [password, setPassword, onPasswordChange] = useInputValue('');
  const [
    confirmPassword,
    setConfirmPassword,
    onConfirmPasswordChange,
  ] = useInputValue('');
  const [telephone, setTelephone, onTelephoneChange] = useInputValue('');
  const [address, setAddress, onAddressChange] = useInputValue('');
  const [company, setCompany, onCompanyChange] = useInputValue('');

  const handleClearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setTelephone('');
    setAddress('');
    setCompany('');
  };

  const passwordValidation = () => {
    return password === confirmPassword;
  };

  const formValidation = () => {
    let isItOK = false;
    if (option === 'Login' && email && password) {
      isItOK = true;
    } else if (
      option === 'Sign Up' &&
      passwordValidation() &&
      name &&
      email &&
      password &&
      confirmPassword &&
      telephone &&
      address &&
      company
    ) {
      isItOK = true;
    }

    return isItOK;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (option === 'Login') {
      // console.log(email, password);
      handleLoggedIn(true);
    } else if (option === 'Sign Up' && passwordValidation()) {
      // console.log(name, email, password);
      handleLoggedIn(true);
    } else if (option === 'Sign Up' && !passwordValidation()) {
      // console.log('Passwords dont match!');
      setPassword('');
      setConfirmPassword('');
    }
    handleClearForm();
  };

  return (
    <SignUpLogin onSubmit={handleFormSubmit}>
      <Header>
        <Options>
          <OptionButton
            disabled={option === 'Login'}
            onClick={() => {
              setOption('Login');
            }}
          >
            <OptionName>Entrar</OptionName>
          </OptionButton>
          <OptionButton
            disabled={option === 'Sign Up'}
            onClick={() => {
              setOption('Sign Up');
            }}
          >
            <OptionName>Registrarse</OptionName>
          </OptionButton>
        </Options>
      </Header>
      {option === 'Sign Up' && (
        <InputGroup>
          <InputLabel htmlFor="name">Nombres:</InputLabel>
          <Input
            name="name"
            title="Name"
            type="text"
            value={name}
            onChange={onNameChange}
            placeholder="John Doe"
            autoComplete="name"
          />
        </InputGroup>
      )}
      <InputGroup>
        <InputLabel htmlFor="email">Email:</InputLabel>
        <Input
          name="email"
          title="Email"
          type="text"
          value={email}
          onChange={onEmailChange}
          placeholder="john@site.com"
        />
      </InputGroup>
      <InputGroup>
        <InputLabel htmlFor="password">Contraseña:</InputLabel>
        <Input
          name="password"
          title="Contraseña"
          type="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="*****"
          autoComplete="new-password"
        />
      </InputGroup>
      {option === 'Sign Up' && (
        <InputGroup>
          <InputLabel htmlFor="confirmPassword">
            Confirmar Contraseña:
          </InputLabel>
          <Input
            name="confirmPassword"
            title="Confirmar Contraseña"
            type="password"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            placeholder="*****"
            autoComplete="new-password"
          />
        </InputGroup>
      )}
      {option === 'Sign Up' && (
        <InputGroup>
          <InputLabel htmlFor="telephone">Telefono:</InputLabel>
          <Input
            name="telephone"
            title="Telefono"
            type="text"
            value={telephone}
            onChange={onTelephoneChange}
            placeholder="(000)000-0000"
          />
        </InputGroup>
      )}
      {option === 'Sign Up' && (
        <InputGroup>
          <InputLabel htmlFor="address">Direccion:</InputLabel>
          <Input
            name="address"
            title="Direccion"
            type="text"
            value={address}
            onChange={onAddressChange}
            placeholder="1600 Amphitheatre Parkway Mountain View, CA 94043 United States"
            autoComplete="address"
          />
        </InputGroup>
      )}
      {option === 'Sign Up' && (
        <InputGroup>
          <InputLabel htmlFor="company">Empresa:</InputLabel>
          <Input
            name="company"
            title="Empresa"
            type="text"
            value={company}
            onChange={onCompanyChange}
            placeholder="Google"
          />
        </InputGroup>
      )}
      <ConfirmButton
        className="confirm-button"
        onClick={handleFormSubmit}
        title={formValidation() ? option : 'Fill the form'}
      >
        {option}
      </ConfirmButton>
    </SignUpLogin>
  );
};

SignUpLoginComponent.propTypes = {
  handleLoggedIn: PropTypes.func.isRequired,
};
