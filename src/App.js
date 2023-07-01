import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationPage from './components/Pages/PegistrationPage/RegistrationPage';
import AllCases from './components/Pages/AllCasesPage/AllCasesPage'
import SingleCasePage from './components/Pages/SingleCase/SingleCasePage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/all-cases" element={<AllCases />} />
            <Route path="/cases/:id" element={<SingleCasePage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
