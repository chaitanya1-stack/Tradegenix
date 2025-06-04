import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


import './loginPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api, { setAuthToken } from '../api';//


function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/', formData); // backend login route
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      setAuthToken(token);
       localStorage.setItem('token', res.data.token); //stores locally user token 
       localStorage.setItem('user', JSON.stringify(res.data.user)); // stores locally user name

      toast.success(` Welcome, ${user.username}!`, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        onClose: () => navigate('/dashboard'),
      });

      

     // setMessage(`Welcome, ${user.username}!`);   im using toast in place of this


      // Optional: redirect to dashboard
      // navigate('/dashboard'); // if using react-router-dom

    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
    }

  };
  

  return (
    <div className= "completeBox">
        <div className="tradegenix_logo">
        <div className="tradegenix">TRADEGENIX<span className="dot">.</span></div>
        <div className="tradegenixdescriptiuon">Clear stock visualizations for smarter trading decisions.</div>
    </div>
       <div className="formboxdiv">
    <form className="formbox" onSubmit={handleSubmit} >
       
      <h1 className="login">Login</h1>
      <div>
      <input className="input email"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        
      />
      <input className="input password"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
       
      />
      <button  className="login-btn" type="submit" style={{ width: '100%' }}>Login</button>
      <p>{message}</p>
      </div>
       <div className="new_here_create">
    <div className="new">
    new here? <Link to="/register" className="create">create an account</Link>

   </div>
   </div>
    </form>
    </div>
    
   
     {/* Toast popup container */}
      <ToastContainer />
    </div>

    
    
  );
}

export default LoginPage;
