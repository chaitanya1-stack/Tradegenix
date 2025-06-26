import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingAnimation from './ LoadingAnimation.jsx';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import historicalapi from '../historicalApi';
import './historicalData.css'; 

const HistoricalData = () => {
  const { symbol } = useParams();
  const [data, setData] = useState([]);
  const [range, setRange] = useState('1y');
  const [loading, setLoading] = useState(true);

  const fetchData = async (selectedRange) => {
    try {
      setLoading(true);
      const res = await historicalapi.get(`/historicaldata/${symbol}?range=${selectedRange}`);
      const formatted = res.data.historical.map((d) => ({
        date: new Date(d.date).toLocaleDateString(),
        close: d.close,
      }));
      setData(formatted);
    } catch (err) {
      console.error('Failed to fetch historical data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(range);
  }, [symbol, range]);

  return (
    <div className="historical-container">
      <div className="historical">Historical Data for {symbol}</div>

      <div className="range-buttons">
        {['1m', '6m', '1y', '3y', '5y'].map((r) => (
          <button
            key={r}
            className={range === r ? 'active' : ''}
            onClick={() => setRange(r)}
          >
            {r.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
         <LoadingAnimation />
      ) : (
        <ResponsiveContainer width="100%" height={170}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" minTickGap={20} />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line type="monotone" dataKey="close" stroke="#3b82f6" strokeWidth={1} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default HistoricalData;
