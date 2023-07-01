import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleCase } from '../../../store/singleCaseSlice';
import { updateCase } from '../../../store/editCaseSlice';
import { Container, Button } from 'react-bootstrap';

const SingleCasePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const caseData = useSelector((state) => state.singleCase.case.data);
  const isLoading = useSelector((state) => state.singleCase.isLoading);
  const officers = useSelector((state) => state.officers.officers);

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    dispatch(fetchSingleCase(id));
  }, [dispatch, id]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedData(caseData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    const caseId = caseData.id;
    dispatch(updateCase({ id: caseId, updatedData: editedData }));
    setIsEditing(false);
  };

  return (
    <div className="mb-10">
      <Container>
        {isLoading ? (
          <p>Загрузка...</p>
        ) : (
          <div className="">
            <h1 className="mb-4">Детальная информация о краже</h1>
            {caseData && (
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="card p-3 d-inline-block">
                  <h3 className="mb-3">
                    <strong>Лицензия:</strong>{' '}
                    {isEditing ? (
                      <input
                        type="text"
                        name="licenseNumber"
                        value={editedData.licenseNumber || ''}
                        onChange={handleInputChange}
                      />
                    ) : (
                      caseData.licenseNumber
                    )}
                  </h3>
                  <h3 className="mb-3">
                    <strong>Сотрудник:</strong>{' '}
                    {isEditing ? (
                      <select
                        name="officer"
                        value={editedData.officer || ''}
                        onChange={handleInputChange}
                      >
                        <option value="">Выберите сотрудника</option>
                        {officers
                          .filter((officer) => officer.status === 'одобрен')
                          .map((officer) => (
                            <option key={officer._id} value={officer._id}>
                              {officer.firstName} {officer.lastName}
                            </option>
                          ))}
                      </select>
                    ) : (
                      caseData.officer
                    )}
                  </h3>
                  <h3 className="mb-3">
                    <strong>ФИО:</strong>{' '}
                    {isEditing ? (
                      <input
                        type="text"
                        name="ownerFullName"
                        value={editedData.ownerFullName || ''}
                        onChange={handleInputChange}
                      />
                    ) : (
                      caseData.ownerFullName
                    )}
                  </h3>
                  <h3 className="mb-3">
                    <strong>Дата:</strong>{' '}
                    {isEditing ? (
                      <input
                        type="text"
                        name="date"
                        value={editedData.date || ''}
                        onChange={handleInputChange}
                      />
                    ) : (
                      caseData.date
                    )}
                  </h3>
                  <h3 className="mb-3">
                    <strong>Тип велосипеда:</strong>{' '}
                    {isEditing ? (
                      <input
                        type="text"
                        name="type"
                        value={editedData.type || ''}
                        onChange={handleInputChange}
                      />
                    ) : (
                      caseData.type
                    )}
                  </h3>
                  <h3 className="mb-3">
                    <strong>Цвет велосипеда:</strong>{' '}
                    {isEditing ? (
                      <input
                        type="text"
                        name="color"
                        value={editedData.color || ''}
                        onChange={handleInputChange}
                      />
                    ) : (
                      caseData.color
                    )}
                  </h3>
                  <h3 className="mb-3">
                    <strong>Описание:</strong>{' '}
                    {isEditing ? (
                      <textarea
                        value={editedData.description || ''}
                        name="description"
                        onChange={handleInputChange}
                      />
                    ) : (
                      caseData.description
                    )}
                  </h3>
                  {caseData.status === 'завершен' && (
                    <h3 className="mb-3">
                      <strong>Завершающий комментарий:</strong>{' '}
                      {isEditing ? (
                        <textarea
                          value={editedData.resolution || ''}
                          name="resolution"
                          onChange={handleInputChange}
                          required={caseData.status === 'завершен'}
                        />
                      ) : (
                        caseData.resolution
                      )}
                    </h3>
                  )}
                  {isEditing ? (
                    <Button onClick={handleSaveClick}>Сохранить</Button>
                  ) : (
                    <Button onClick={handleEditClick}>Редактировать</Button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default SingleCasePage;