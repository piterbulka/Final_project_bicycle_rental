import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOfficers, deleteOfficer } from '../../../store/officersSlice';
import './allOfficersPage';
import { Container, Table, Button } from 'react-bootstrap';

const OfficersPage = () => {
  const dispatch = useDispatch();
  const officers = useSelector((state) => state.officers.officers);
  const isLoading = useSelector((state) => state.officers.isLoading);

  useEffect(() => {
    dispatch(fetchOfficers());
  }, [dispatch]);

  const handleDeleteClick = (officerId) => {
    dispatch(deleteOfficer(officerId));
  };

  return (
    <div className="mb-10">
      <Container fluid>
        <h1 className="mb-4">Ответственные сотрудники</h1>
        {isLoading ? (
          <p>Загрузка...</p>
        ) : (
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Почта</th>
                <th>Одобрен</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {officers.map((officer) => (
                <tr key={officer._id}>
                  <td>{officer.firstName}</td>
                  <td>{officer.lastName}</td>
                  <td>{officer.email}</td>
                  <td>{officer.approved ? 'Да' : 'Нет'}</td>
                  <td>
                    <Link to={`/officers/${officer._id}`} className="btn btn-success me-2 mb-2">
                      Подробнее
                    </Link>
                    <Button className="me-2 mb-2" variant="danger" onClick={() => handleDeleteClick(officer._id)}>
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default OfficersPage;
