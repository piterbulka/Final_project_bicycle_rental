import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Создаем асинхронный thunk для получения данных одного сообщения о краже
export const fetchSingleCase = createAsyncThunk('singleCase/fetchSingleCase', async (caseId, thunkAPI) => {
  try {
    // Получаем токен авторизации
    const token = localStorage.getItem('token');

    // Устанавливаем заголовок с токеном авторизации
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`https://sf-final-project-be.herokuapp.com/api/cases/${caseId}`, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
});

const singleCaseSlice = createSlice({
  name: 'singleCase',
  initialState: {
    case: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleCase.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleCase.fulfilled, (state, action) => {
        state.case = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchSingleCase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default singleCaseSlice.reducer;