// components/StockResult.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const StockResult = () => {
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await api.get(`/stocks2/quote/${symbol}`);
        setStock(res.data);
      } catch (err) {
        alert('Stock not found or server error');
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [symbol]);

  if (loading) return <p>Loading...</p>;

  return stock ? (
    <div>
      <h3>{stock.symbol}</h3>
      <p>Price: ${stock.price}</p>
      <p>Change: {stock.changePercent}</p>
      <p>Open: ${stock.open}</p>
      <p>High: ${stock.high}</p>
      <p>Low: ${stock.low}</p>
      <p>Previous Close: ${stock.previousClose}</p>
      <p>Volume: {stock.volume}</p>
      <p>Latest Trading Day: {stock.latestTradingDay}</p>
    </div>
  ) : (
    <p>Stock not found</p>
  );
};

export default StockResult;
