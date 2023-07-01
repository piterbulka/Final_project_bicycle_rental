import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Создаем асинхронный thunk для получения всех сообщений о краже
export const fetchAllCases = createAsyncThunk('cases/fetchAllCases', async () => {
  try {
    // Получаем токен авторизации
    const token = localStorage.getItem('token');

    // Устанавливаем заголовок с токеном авторизации
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Выполняем GET-запрос для получения всех сообщений о краже
    const response = await axios.get('https://sf-final-project-be.herokuapp.com/api/cases/', config);

    return response.data;
  } catch (error) {
    // Если произошла ошибка, возвращаем ошибку в качестве результата
    throw error.message;
  }
});

export const deleteCase = createAsyncThunk('cases/deleteCase', async (caseId) => {
  try {
    // Добавляем токен авторизации к заголовкам запроса
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Выполняем DELETE-запрос для удаления сообщения о краже
    await axios.delete(`https://sf-final-project-be.herokuapp.com/api/cases/${caseId}`, config);

    // Возвращаем идентификатор удаленного сообщения о краже
    return caseId;
  } catch (error) {
    // Если произошла ошибка, возвращаем ошибку в качестве результата
    throw error.message;
  }
});


// Создаем слайс (reducer) для управления состоянием сообщений о краже

const casesSlice = createSlice({
  name: 'cases',
  initialState: {
    cases: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCases.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllCases.fulfilled, (state, action) => {
        state.cases = action.payload.data;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAllCases.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteCase.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCase.fulfilled, (state, action) => {
        // Удаляем удаленное сообщение из списка
        state.cases = state.cases.filter((caseItem) => caseItem._id !== action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteCase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default casesSlice.reducer;