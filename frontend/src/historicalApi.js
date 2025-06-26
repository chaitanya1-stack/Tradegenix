// src/historicalApi.js
import axios from 'axios';

const HISTORICAL_API_URL = 'http://localhost:5600/api';

const historicalapi = axios.create({
  baseURL: HISTORICAL_API_URL,
});

// Auth token setter
export const setHistoricalAuthToken = (token) => {
  if (token) {
    historicalapi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete historicalapi.defaults.headers.common['Authorization'];
  }
};

export default historicalapi;
