import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAuthorizedOfficer } from '../../../store/createOfficerSlice';
import { Container, Form, Button } from 'react-bootstrap';
import './CreateOfficerPage'

const CreateOfficerPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.newOfficer.isLoading);
  const error = useSelector((state) => state.newOfficer.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [approved, setApproved] = useState(false);

  const handleCreateOfficer = () => {
    dispatch(
      createAuthorizedOfficer({
        email,
        password,
        firstName,
        lastName,
        approved,
      })
    );
  };

  return (
    <Container className='mb-10'>
      <h1>Создание нового сотрудника</h1>
      {error && <p>Произошла ошибка: {error}</p>}
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password *</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Фамилия</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите фамилию"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="approved" className='mt-3 mb-3'>
          <Form.Check
            type="checkbox"
            label="Одобрен"
            checked={approved}
            onChange={(e) => setApproved(e.target.checked)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleCreateOfficer} disabled={isLoading}>
          {isLoading ? 'Создание...' : 'Создать'}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateOfficerPage;