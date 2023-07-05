import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllCases, deleteCase } from '../../../store/allCasesSlice';
import './AllCasesPage';
import { Table, Button, Container } from 'react-bootstrap';

const AllCasesPage = () => {
  const dispatch = useDispatch();
  const cases = useSelector((state) => state.allCases.cases);
  const isLoading = useSelector((state) => state.allCases.isLoading);

  useEffect(() => {
    dispatch(fetchAllCases());
  }, [dispatch]);

  const handleDelete = (caseId) => {
    dispatch(deleteCase(caseId));
  };

  return (
    <div className="mb-10">
      <Container fluid>
        <h1>Сообщения о кражах</h1>
        {isLoading ? (
          <p>Загрузка...</p>
        ) : (
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Лицензия</th>
                <th>Сотрудник</th>
                <th>Описание</th>
                <th>Дата</th>
                <th>ФИО</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseItem) => (
                <tr key={caseItem._id}>
                  <td>{caseItem.licenseNumber}</td>
                  <td>{caseItem.officer}</td>
                  <td>{caseItem.description}</td>
                  <td>{caseItem.date}</td>
                  <td>{caseItem.ownerFullName}</td>

                  <td>
                    <Button variant="danger" className="me-2 mb-2" onClick={() => handleDelete(caseItem._id)}>
                      Удалить
                    </Button>
                    <Link to={`/cases/${caseItem._id}`} className="btn btn-success ml-2 me-2 mb-2">
                      Подробнее
                    </Link>
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

export default AllCasesPage;
