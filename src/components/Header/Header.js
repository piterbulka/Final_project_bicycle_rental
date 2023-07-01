import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RegistrationForm from '../Pages/ModalPage/EditModalPage.js.js';
import { logoutUser } from '../../store/authSlice';
import { Link } from 'react-router-dom'; // Импортируем компонент Link для создания ссылки
import './Header.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBicycle } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className='pt-3 border-bottom bg-white fixed-top'>
      <Container>
        <Row>
          <Col className='d-flex align-items-baseline'>
          
            <FontAwesomeIcon icon={faBicycle} size='2xl' className='me-2' />
          <Link to='/' className='text-decoration-none text-dark'>
            <h1>UrbanCycleRent</h1>
          </Link>
          </Col>
          <Col className='text-end'>
            {isLoggedIn ? (
              <>
                <Link to='/all-cases'>
                  <Button variant='success'  className='me-2'>Все кражи</Button>
                </Link>
                <Button variant='danger' onClick={handleLogout}>Выйти</Button>
              </>
            ) : (
              <>
                <Button variant='success' onClick={handleModalToggle}>Вход/Регистрация</Button>
                {isModalOpen && <RegistrationForm onClose={handleModalToggle} />}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;