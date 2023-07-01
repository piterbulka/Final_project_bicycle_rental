import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './RegistrationPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { createAuthorizedReport, createPublicReport, createReportStart } from '../../../store/reportSlice';
import { fetchOfficers } from '../../../store/officersSlice';


const RegistrationPage = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.report.isLoading);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn); // Переменная, определяющая авторизацию пользователя
    const officers = useSelector((state) => state.officers.officers);

    const [licenseNumber, setLicenseNumber] = useState('');
    const [ownerFullName, setOwnerFullName] = useState('');
    const [type, setType] = useState('');
    const [clientId, setClientId] = useState('');
    const [color, setColor] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [officer, setOfficer] = useState('');

    // Загрузка списка сотрудников при монтировании компонента
    useEffect(() => {
        const fetchOfficersData = () => {
          dispatch(fetchOfficers());
        };
    
        fetchOfficersData();
      }, [dispatch]);

    const handleRegistration = (e) => {
        e.preventDefault();

        dispatch(createReportStart());

        const reportData = {
            licenseNumber,
            ownerFullName,
            type,
            clientId,
            color,
            date,
            description,
            officer,
        };

        // Диспатч соответствующего действия в зависимости от авторизации
        if (isLoggedIn) {
            // Диспатч действия для авторизованных пользователей
            dispatch(createAuthorizedReport(reportData));
        } else {
            // Диспатч действия для неавторизованных пользователей
            dispatch(createPublicReport(reportData));
        }

        // Сброс значений полей после отправки
        setLicenseNumber('');
        setOwnerFullName('');
        setType('');
        setClientId('');
        setColor('');
        setDate('');
        setDescription('');
        setOfficer('');
    };

    return (
        <Container className='mb-10'>
            <h2>Заполните информацию о велосипеде</h2>
            <Form onSubmit={handleRegistration}>
                <Form.Group controlId="licenseNumber" className='mb-3'>
                    <Form.Label>Номер лицензии *</Form.Label>
                    <Form.Control
                        type="text"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="ownerFullNameme" className='mb-3'>
                    <Form.Label>ФИО клиента *</Form.Label>
                    <Form.Control
                        type="text"
                        value={ownerFullName}
                        onChange={(e) => setOwnerFullName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="type" className='mb-3'>
                    <Form.Label>Тип велосипеда *</Form.Label>
                    <Form.Control
                        as="select"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    >
                        <option>Выберите тип велосипеда</option>
                        <option value="general">general</option>
                        <option value="sport">sport</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="clientId" className='mb-3'>
                    <Form.Label>ID клиента *</Form.Label>
                    <Form.Control
                        type="text"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="color" className='mb-3'>
                    <Form.Label>Цвет велосипеда</Form.Label>
                    <Form.Control
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="date" className='mb-3'>
                    <Form.Label>Дата кражи</Form.Label>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="description" className='mb-3'>
                    <Form.Label>Дополнительная информация</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                {isLoggedIn && (
                    <Form.Group controlId="officer" className='mb-3'>
                        <Form.Label>Ответственный сотрудник</Form.Label>
                        <Form.Control
                            as="select"
                            value={officer}
                            onChange={(e) => setOfficer(e.target.value)}
                        >
                            <option value="">Выберите сотрудника</option>
                            {officers.map((officer) => (
                                <option key={officer._id} value={officer._id}>
                                    {officer.firstName} {officer.lastName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                )}

                <Button variant="success" className='mb-3 mt-3' type="submit" disabled={isLoading}>
                    {isLoading ? 'Отправка...' : 'Зарегистрировать'}
                </Button>
            </Form>
        </Container>
    );
};

export default RegistrationPage;