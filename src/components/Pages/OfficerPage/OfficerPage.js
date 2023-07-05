import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOfficer } from '../../../store/singleOfficerSlice';
import { Container, Form, Button } from 'react-bootstrap';
import {updateOfficer} from '../../../store/updateOfficerSlice'


const OfficerDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Получение параметра id

  const officer = useSelector((state) => state.singleOfficer.officer.data);
  const isLoading = useSelector((state) => state.singleOfficer.isLoading);
  const error = useSelector((state) => state.singleOfficer.error);

  const [isApproved, setIsApproved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(officer ? officer.firstName : '');
  const [lastName, setLastName] = useState(officer ? officer.lastName : '');
  const [password, setPassword] = useState(officer ? officer.password : '');

  useEffect(() => {
    dispatch(fetchOfficer(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (officer) {
      setIsApproved(officer.approved);
      setFirstName(officer.firstName);
      setLastName(officer.lastName);
    }
  }, [officer]);

  const handleApprovalChange = () => {
    setIsApproved(!isApproved);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  

  const handleSaveClick = () => {
    dispatch(
      updateOfficer({
        _id: id,
        approved: isApproved,
        firstName: firstName,
        lastName: lastName,
        password: password,
      })
    );
    setIsEditing(false);
  };

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Произошла ошибка: {error}</p>;
  }

  if (!officer) {
    return <p>Сотрудник не найден.</p>;
  }

  return (
    <Container>
      <div className="mb-10">
        <h1>Информация о сотруднике</h1>
        <Form>
          <Form.Group controlId="formFirstName">
            <Form.Label>Имя:</Form.Label>
            {isEditing ? (
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            ) : (
              <Form.Control type="text" value={firstName} readOnly />
            )}
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Фамилия:</Form.Label>
            {isEditing ? (
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            ) : (
              <Form.Control type="text" value={lastName} readOnly />
            )}
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" value={officer.email} disabled />
          </Form.Group>
          <Form.Group controlId="formPassword">
          <Form.Label>Пароль:</Form.Label>
          {isEditing ? (
            <Form.Control
              type="password"
              value={password}
              onChange={handlePasswordChange} // Изменение обработчика события
              autoComplete="current-password"
            />
          ) : (
            <Form.Control type="password" value={password} readOnly />
          )}
        </Form.Group>
          <Form.Group controlId="formClientId">
            <Form.Label>Client ID:</Form.Label>
            <Form.Control type="text" value={officer.clientId} disabled />
          </Form.Group>
          <Form.Group controlId="formApproval">
            <Form.Check
              type="checkbox"
              label="Одобрен"
              checked={isApproved}
              onChange={handleApprovalChange}
              disabled={!isEditing}
            />
          </Form.Group>
          {isEditing ? (
            <Button variant="primary" onClick={handleSaveClick}>
              Сохранить
            </Button>
          ) : (
            <Button variant="primary" onClick={handleEditClick}>
              Редактировать
            </Button>
          )}
        </Form>
      </div>
    </Container>
  );
};

export default OfficerDetailsPage;