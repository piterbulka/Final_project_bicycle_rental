import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import reportReducer from './reportSlice';
import officersReducer from './officersSlice';
import casesSlice from './allCasesSlice';
import singleCaseReducer from './singleCaseSlice';
import editCaseReducer from './editCaseSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
    officers: officersReducer,
    allCases: casesSlice,
    singleCase: singleCaseReducer,
    editCase: editCaseReducer,
  },
});

export default store;