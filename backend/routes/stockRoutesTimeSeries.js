const express = require('express');
const axios = require('axios');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Fetch last 5 years (60 months) historical data
router.get('/history/:symbol', protect, async (req, res) => {
  const { symbol } = req.params;

  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'TIME_SERIES_MONTHLY_ADJUSTED',
        symbol,
        apikey: process.env.STOCK_API_KEY,
      },
    });

    const rawData = response.data['Monthly Adjusted Time Series'];
    if (!rawData) {
      return res.status(404).json({ error: 'No historical data found' });
    }

    const sortedDates = Object.keys(rawData).sort().slice(-60); // last 5 years
    const formatted = sortedDates.map((date) => ({
      date,
      close: parseFloat(rawData[date]['5. adjusted close']),
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch historical stock data' });
  }
});

module.exports = router;
