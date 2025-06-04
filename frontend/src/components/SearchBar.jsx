import React, { useState } from 'react';
import api from '../api';  

const SearchBar = ({ onResult }) => {
  const [symbol, setSymbol] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!symbol.trim()) return;

    setLoading(true);
    try {
      const res = await api.get(`/stocks2/quote/${symbol}` );
      
      onResult(res.data);
    } catch (err) {
      alert('Stock not found or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter stock symbol (e.g., AAPL)"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
};

export default SearchBar;
