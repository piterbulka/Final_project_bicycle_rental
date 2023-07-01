import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {registerUser} from '../../../store/authSlice'
import {loginUser} from '../../../store/authSlice'

const RegistrationForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [clientId, setClientId] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const loginData = {
      email,
      password,
    };

    if (showLogin) {
      dispatch(loginUser(loginData));
      onClose();
      return 
    }

    const registrData = Object.assign({
      firstName,
      lastName,
      clientId,
    }, loginData);

    dispatch(registerUser(registrData));
    onClose();
  };


  const handleToggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="modal d-block" tabIndex="-1" aria-labelledby="registrationModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="registrationModalLabel">{showLogin ? 'Вход' : 'Регистрация'}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <Form onSubmit={handleFormSubmit}>
              {!showLogin && (
                <>
                  <Form.Group className="mb-3 text-start">
                    <Form.Label htmlFor="firstNameInput">Имя</Form.Label>
                    <Form.Control type="text" id="firstNameInput" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3 text-start">
                    <Form.Label htmlFor="lastNameInput">Фамилия</Form.Label>
                    <Form.Control type="text" id="lastNameInput" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3 text-start">
                    <Form.Label htmlFor="clientIdInput">Client ID</Form.Label>
                    <Form.Control type="text" id="clientIdInput" required value={clientId} onChange={(e) => setClientId(e.target.value)} />
                  </Form.Group>
                </>
              )}
              <Form.Group className="mb-3 text-start">
                  <Form.Label htmlFor="emailInput">E-mail</Form.Label>
                  <Form.Control type="email" id="emailInput" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
              <Form.Group className="mb-3 text-start">
                <Form.Label htmlFor="passwordInput">Пароль</Form.Label>
                <Form.Control type="password" id="passwordInput" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Button type="submit" variant="success" onClick={handleFormSubmit}>{showLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
            </Form>
            <div className="mt-3 text-center">
              {showLogin ? (
                <p>
                  Нет учетной записи?{' '}
                  <button type="button" className="btn btn-link" onClick={handleToggleForm}>
                    Зарегистрируйтесь здесь
                  </button>
                </p>
              ) : (
                <p>
                  Уже зарегистрированы?{' '}
                  <button type="button" className="btn btn-link" onClick={handleToggleForm}>
                    Войдите здесь
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;