import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import reportReducer from './reportSlice';
import officersReducer from './officersSlice';
import casesSlice from './allCasesSlice';
import singleCaseReducer from './singleCaseSlice';
import editCaseReducer from './editCaseSlice';
import singleOfficerReducer from './singleOfficerSlice';
import newOfficerReducer from './editCaseSlice'
import editOfficerReducer from './updateOfficerSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    report: reportReducer,
    officers: officersReducer,
    allCases: casesSlice,
    singleCase: singleCaseReducer,
    editCase: editCaseReducer,
    singleOfficer: singleOfficerReducer,
    newOfficer: newOfficerReducer,
    editOfficer: editOfficerReducer,
  },
});

export default store;