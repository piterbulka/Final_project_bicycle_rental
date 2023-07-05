import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RegistrationForm from '../Pages/ModalPage/EditModalPage.js.js';
import { logoutUser } from '../../store/authSlice';
import { Link } from 'react-router-dom';
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
      <Container fluid='xl'>
        <Row>
          <div className='d-flex align-items-baseline col-md-6'>
            <FontAwesomeIcon icon={faBicycle} size='2x' className='me-2' />
            <Link to='/' className='text-decoration-none text-dark'>
              <h1>UrbanCycleRent</h1>
            </Link>
          </div>
          <Col className='text-end'>
            <div className="row">
            {isLoggedIn ? (
              <>
              <div className="d-flex gap-3 flex-wrap align-items-end justify-content-end mb-2">
                <Link to='/all-cases'>
                  <Button variant='success' className=''>Все кражи</Button>
                </Link>
                <Link to='/all-officers'>
                  <Button variant='success' className=''>Все сотрудники</Button>
                </Link>
                <Link to='/create-officer'>
                  <Button variant='success' className=''>Создать сотрудника</Button>
                </Link>
                <Button variant='danger' className='' onClick={handleLogout}>Выйти</Button>
                </div>
              </>
            ) : (
              <>
              <div className="">
                <Button className='px-4 button-reg' variant='success' onClick={handleModalToggle}>Вход/Регистрация</Button>
                {isModalOpen && <RegistrationForm onClose={handleModalToggle} />}
              </div>
              </>
            )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;