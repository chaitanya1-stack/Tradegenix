import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashBoard';
import RegisterPage from './components/registerPage';
import LoginPage from './components/loginPage';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';





function App() {
  return (
    <Router>
      <Routes>
       
         <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LoginPage />} />
        
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
