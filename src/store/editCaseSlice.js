import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Создаем асинхронный thunk для редактирования сообщения о краже
export const updateCase = createAsyncThunk('editCase/updateCase', async (data, thunkAPI) => {
  try {
    // Получаем токен авторизации
    const token = localStorage.getItem('token');

    // Устанавливаем заголовок с токеном авторизации
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.put(`https://sf-final-project-be.herokuapp.com/api/cases/${data._id}`, data, config);
    return response.data.case;
  } catch (error) {
    throw error.response.data;
  }

});


const editCaseSlice = createSlice({
  name: 'editCase',
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCase.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCase.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateCase.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default editCaseSlice.reducer;