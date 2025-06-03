const express = require('express');
const axios = require('axios');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/:symbol',protect,  async (req, res) => {
  const { symbol } = req.params;

  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol,
        apikey: process.env.STOCK_API_KEY,
      }
    });

    const timeSeries = response.data['Time Series (Daily)'];
    if (!timeSeries) {
      return res.status(404).json({ error: 'No data found for this symbol' });
    }

    const cleanedData = Object.entries(timeSeries).slice(0, 100).map(([date, values]) => ({
      date,
      open: values['1. open'],
      high: values['2. high'],
      low: values['3. low'],
      close: values['4. close'],
      volume: values['5. volume']
    }));

    res.json({ symbol, data: cleanedData });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
});

module.exports = router;
