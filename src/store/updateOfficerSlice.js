import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateOfficer = createAsyncThunk(
  'officers/updateOfficer',
  async (officerData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `https://sf-final-project-be.herokuapp.com/api/officers/${officerData._id}`,
        officerData,
        config
      );

      if (!response.ok) {
        throw new Error('Ошибка при редактировании данных сотрудника');
      }

      const data = await response.json();
      return data.officer;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const editOfficerSlice = createSlice({
  name: 'editOfficer',
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateOfficer.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOfficer.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateOfficer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default editOfficerSlice.reducer;