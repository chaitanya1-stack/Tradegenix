import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

const Dashboard = () => {
  const [stock, setStock] = useState(null);

  return (
    <div>
      <h2>Search for Stock Quotes</h2>
      <SearchBar onResult={setStock} />
      {stock && (
        <div>
          <h3>{stock.symbol}</h3>
          <p>Price: ${stock.price}</p>
          <p>Change: {stock.changePercent}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
