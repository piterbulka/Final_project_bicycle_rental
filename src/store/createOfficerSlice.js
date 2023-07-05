import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createAuthorizedOfficer = createAsyncThunk(
  'officers/createAuthorized',
  async (officerData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('https://sf-final-project-be.herokuapp.com/api/officers', officerData, config);

      if (!response.ok) {
        throw new Error('Ошибка при создании нового сотрудника');
      }

      const data = await response.json();
      return data.officer;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const newOfficerSlice = createSlice({
  name: 'newOfficer',
  initialState: {
    isLoading: false,
    error: null,
    successMessage: '',
    officer: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAuthorizedOfficer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = '';
        state.officer = null;
      })
      .addCase(createAuthorizedOfficer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = 'Новый сотрудник успешно создан';
        state.officer = action.payload;
      })
      .addCase(createAuthorizedOfficer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default newOfficerSlice.reducer;