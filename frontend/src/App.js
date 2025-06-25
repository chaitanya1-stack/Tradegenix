import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { setAuthToken } from './api';
import RegisterPage from './components/registerPage';
import LoginPage from './components/loginPage';
import SearchBar from './components/SearchBar';
import StockResult from './components/StockResult';
import LoadingAnimation from './components/ LoadingAnimation';

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
    // Set token globally when app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
  }, []);
  return (
    <Router>
      <Routes>
       
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
         <Route path="/searchbar" element={<SearchBar />} />
         <Route path="/stock/:symbol" element={<StockResult />} />
          <Route path="/loadingpage" element={<LoadingAnimation />} />
         

        
      
      </Routes>
    </Router>
  );
}

export default App;
