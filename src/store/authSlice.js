import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Создаем асинхронный thunk для выполнения запроса на регистрацию
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData) => {
    try {
      const response = await axios.post('https://sf-final-project-be.herokuapp.com/api/auth/sign_up', userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

// Создаем асинхронный thunk для выполнения запроса на вход
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post('https://sf-final-project-be.herokuapp.com/api/auth/sign_in', userData);
        const data = response.data.data;
        
        // Сохраняем токен в localStorage
        localStorage.setItem('token', data.token);
        
        
        return data;
      } catch (error) {
        throw rejectWithValue(error.response.data);
      }
    }
);
// Функция для выполнения запроса GET /api/auth/
const checkTokenValidity = async () => {
    try {
      // Получаем токен из localStorage
      const token = localStorage.getItem('token');
      
      // Устанавливаем заголовок Authorization
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      // Выполняем GET запрос
      const response = await axios.get('https://sf-final-project-be.herokuapp.com/api/auth/', config);
      const data = response.data;
      
      // Возвращаем данные
      return data;
    } catch (error) {
      throw error.response.data;
    }
};

// Пример вызова функции проверки действительности токена
checkTokenValidity()
  .then((data) => {
    // Обработка успешного ответа
    console.log('Токен действителен:', data);
  })
  .catch((error) => {
    // Обработка ошибки
    console.error('Ошибка при проверке токена:', error);
  });

// Создаем срез (slice) для управления состоянием аутентификации
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
        email: '',
        password: '',
    },
    isLoading: false,
    error: null,
    successMessage: '',
    isLoggedIn: false,
    officer: '', // Добавляем поле officer для хранения выбранного ответственного сотрудника
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
        state.user = {
          email: '',
          password: '',
        };
        state.isLoggedIn = false;
        // Очищаем localStorage при выходе из системы
        localStorage.removeItem('token');
    },
      setOfficer: (state, action) => {
        state.officer = action.payload; // Устанавливаем значение выбранного ответственного сотрудника
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true
      });
  },
});

export const {
  setUser,
  logoutUser, // Добавляем новый экшен для выхода из учетной записи
} = authSlice.actions;

export default authSlice.reducer;
