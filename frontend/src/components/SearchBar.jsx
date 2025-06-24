import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './SearchBar.css';

const SearchBar = ({ onResult }) => {
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState('');
   const [darkMode, setDarkMode] = useState(true); //  toggle state
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!symbol.trim()) return;

    setLoading(true);
    try {
      navigate(`/stock/${symbol}`);
    } catch (err) {
      alert('Stock not found or server error');
    } finally {
      setLoading(false);
    }
  };

  // Animated dots in placeholder
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // toggel button for night mode 
    const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
  };


// for logout
    const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };


// if no token found redirect to login page
    useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/', { replace: true }); // Redirect to login if not logged in
    }
  }, [navigate]);

  return (
    <motion.div
       className={`completediv ${darkMode ? 'dark' : 'light'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >

     <motion.div
     className="logo1"
     initial={{ opacity: 0, y: -20 }}
     animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
     >
     <div className="tradegenix1">TRADEGENIX <span className="dot1">.</span></div>
     </motion.div>



        <motion.button
            className="logoutbutton "
            onClick={ handleLogout}
            
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="logout">log out</div>
          </motion.button>

      <div className="theme-toggle">
    <button className="emoji-toggle" onClick={toggleTheme}>
    {darkMode ? <i className="bi bi-moon-fill " ></i> : <i className="bi bi-brightness-high-fill"></i>} 
    </button>
    </div>


      <motion.div
        className="search-container"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 2.2, ease: 'easeInOut' }}
      >
        <div className="input-button-wrapper">
          <input
            className="animated-input"
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder={`Enter stock symbol${dots}`}
          />
          <motion.button
            className="button inline-button"
            onClick={handleSearch}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? 'Searching...' : 'Search'}
          </motion.button>

             

        </div>
      </motion.div>
      <div className="knowsymbol">
       <a
              href="https://www.nasdaq.com/market-activity/stocks/screener"
              target="_blank"
              rel="noopener noreferrer"
              className="symbol-helper-link"
>
             <div className="symbol">Don’t know the symbol? <span className="clickhere">Click here.</span> </div>
            </a>
            </div>
    </motion.div>
  );
};

export default SearchBar;
