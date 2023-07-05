import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Запрос для получения данных об одном сотруднике
export const fetchOfficer = createAsyncThunk(
  'officers/fetchOfficer',
  async (officerId, thunkAPI) => {
    try {
      // Получаем токен авторизации из localStorage
      const token = localStorage.getItem('token');

      // Создаем заголовки запроса с авторизационным токеном
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Выполняем GET-запрос для получения данных сотрудника
      const response = await axios.get(`https://sf-final-project-be.herokuapp.com/api/officers/${officerId}`, config);

      // Возвращаем данные сотрудника
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);

// Создаем срез (slice) для управления состоянием одного сотрудника
const singleOfficerSlice = createSlice({
  name: 'singleOfficer',
  initialState: {
    officer: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfficer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOfficer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.officer = action.payload;
      })
      .addCase(fetchOfficer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default singleOfficerSlice.reducer;