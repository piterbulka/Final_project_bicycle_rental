
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Запрос для создания нового сообщения о краже для авторизованных пользователей
export const createAuthorizedReport = createAsyncThunk(
  'report/createAuthorized',
  async (reportData, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('https://sf-final-project-be.herokuapp.com/api/cases/', reportData, config);

      if (!response.ok) {
        throw new Error('Ошибка при создании сообщения о краже');
      }

      const data = await response.json();
      return data.case;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Запрос для создания нового сообщения о краже для неавторизованных пользователей
export const createPublicReport = createAsyncThunk(
  'report/createPublic',
  async (reportData, thunkAPI) => {
    try {
      const response = await fetch('https://sf-final-project-be.herokuapp.com/api/public/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании сообщения о краже');
      }

      const data = await response.json();
      return data.case;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Создаем срез (slice) для управления состоянием сообщений о краже
const reportSlice = createSlice({
  name: 'report',
  initialState: {
    isLoading: false,
    error: null,
    successMessage: '',
    case: null, // Добавляем новое поле для хранения информации о созданном кейсе
  },
  reducers: {
    createReportStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.successMessage = '';
    },
    createReportSuccess: (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload;
    },
    createReportFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAuthorizedReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = '';
        state.case = null;
      })
      .addCase(createAuthorizedReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = 'Сообщение о краже успешно создано';
        state.case = action.payload;
      })
      .addCase(createAuthorizedReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createPublicReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = '';
        state.case = null;
      })
      .addCase(createPublicReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = 'Сообщение о краже успешно создано';
        state.case = action.payload;
      })
      .addCase(createPublicReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  createReportStart,
  createReportSuccess,
  createReportFailure,
} = reportSlice.actions;

export default reportSlice.reducer;