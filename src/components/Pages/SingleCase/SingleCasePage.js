import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleCase } from '../../../store/singleCaseSlice';
import { updateCase } from '../../../store/editCaseSlice';
import { fetchOfficers } from '../../../store/officersSlice';
import { Container, Button } from 'react-bootstrap';

const SingleCasePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const caseData = useSelector((state) => state.singleCase.case.data);
  const isLoading = useSelector((state) => state.singleCase.isLoading);
  const officers = useSelector((state) => state.officers.officers);

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [status, setStatus] = useState(caseData ? caseData.status : 'new');
  const [clientId, setClientId] = useState(caseData ? caseData.clientId : '');

  useEffect(() => {
    dispatch(fetchSingleCase(id));
    dispatch(fetchOfficers());
  }, [dispatch, id]);

  useEffect(() => {
    setEditedData(caseData);
    setClientId(caseData ? caseData.clientId : '');
  }, [caseData]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedData(caseData);
    setClientId(caseData ? caseData.clientId : '');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleClientIdChange = (e) => {
    setClientId(e.target.value);
  };

  const handleSaveClick = () => {
    if (editedData.status === 'done' && !editedData.resolution) {
      alert('Пожалуйста, заполните поле "Завершающий комментарий".');
      return;
    }

    dispatch(
      updateCase({
        ...editedData,
        status: status,
        clientId: clientId,
      })
    );
    setIsEditing(false);
    setEditedData(editedData);
  };

  return (
    <div className="mb-10">
      <Container>
        {isLoading ? (
          <p>Загрузка...</p>
        ) : (
          <div className="">
            <h1 className="mb-4">Детальная информация о краже</h1>
            {editedData && (
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div className="card p-3 d-inline-block">
                  <h3 className="mb-3">
                    <strong>Статус сообщения:</strong>{' '}
                    {isEditing ? (
                      <select
                        name="status"
                        value={status}
                        onChange={handleStatusChange}
                      >
                        <option value="new">Новый</option>
                        <option value="in_progress">В процессе</option>
                        <option value="done">Завершен</option>
                      </select>
                    ) : (
                      status
                    )}
                  </h3>
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
                      editedData.licenseNumber
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
                          .filter((officer) => officer.approved)
                          .map((officer) => (
                            <option key={officer._id} value={officer._id}>
                              {officer.firstName} {officer.lastName}
                            </option>
                          ))}
                      </select>
                    ) : (
                      editedData.officer
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
                      editedData.ownerFullName
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
                      editedData.date
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
                      editedData.type
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
                      editedData.color
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
                      editedData.description
                    )}
                  </h3>
                  {editedData.status === 'done' && (
                    <h3 className="mb-3">
                      <strong>Завершающий комментарий:</strong>{' '}
                      {isEditing ? (
                        <textarea
                          value={editedData.resolution || ''}
                          name="resolution"
                          onChange={handleInputChange}
                          required={editedData.status === 'done'}
                        />
                      ) : (
                        editedData.resolution
                      )}
                    </h3>
                  )}
                  <h3 className="mb-3">
                    <strong>Дата создания сообщения:</strong>{' '}
                    {editedData.createdAt ? (
                      editedData.createdAt
                    ) : (
                      "Не указана"
                    )}
                  </h3>
                  <h3 className="mb-3">
                    <strong>Client ID:</strong>{' '}
                    {isEditing ? (
                      <input
                        type="text"
                        name="clientId"
                        value={clientId || ''}
                        onChange={handleClientIdChange}
                        disabled
                      />
                    ) : (
                      clientId
                    )}
                  </h3>
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