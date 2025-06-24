import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../api'; // adjust path if needed
import './registerPage.css';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);
      toast.success(`🎉 Account created for ${res.data.user.username}`, {
        position: 'top-center',
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
  <div className="completeBox">
    <div className="tradegenix_logo">
        <div className="tradegenix">TRADEGENIX<span className="dot">.</span></div>
        <div className="tradegenixdescriptiuon">Clear stock visualizations for smarter trading decisions.</div>
    </div>
    <div className="formboxdiv">
      <form className="formbox" onSubmit={handleSubmit}>
        <div className="heading">
          
        </div>
        <h1 className="login">Register</h1>
        <input
          className="input"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div className="registerdiv">
        <button className="login-btn" type="submit">
          Register
        </button>
        </div>
        <p className="error-message">{message}</p>


         <div className="new_here_create">
        <div className="new">
          Already have an account?{' '}
          <Link to="/" className="create">
            Login
          </Link>
        </div>
      </div>

      </form>
    </div>

    

      

    <ToastContainer />
  </div>
);

}

export default RegisterPage;
