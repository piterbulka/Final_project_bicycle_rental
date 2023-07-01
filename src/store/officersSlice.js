import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Запрос для получения списка всех сотрудников
export const fetchOfficers = createAsyncThunk(
  'officers/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://sf-final-project-be.herokuapp.com/api/officers/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Включаем авторизационный заголовок
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Создаем срез (slice) для управления состоянием списка сотрудников
const officersSlice = createSlice({
  name: 'officers',
  initialState: {
    officers: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfficers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOfficers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.officers = action.payload.officers;
      })
      .addCase(fetchOfficers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default officersSlice.reducer;