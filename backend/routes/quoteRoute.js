// routes/quoteRoute.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/:symbol', protect, async (req, res) => {
  const { symbol } = req.params;

  try {
    const response = await axios.get('https://finnhub.io/api/v1/quote', {
      params: {
        symbol,
        token: process.env.FINNHUB_API_KEY,
      },
    });

    const data = response.data;

    if (!data || !data.c) {
      return res.status(404).json({ error: 'No quote data found' });
    }

    // Compute percentage change
    const changePercent = (((data.c - data.pc) / data.pc) * 100).toFixed(2);

    res.json({
      symbol,
      price: data.c,
      open: data.o,
      high: data.h,
      low: data.l,
      previousClose: data.pc,
      changePercent: `${changePercent}%`,
      volume: 'N/A', // Finnhub /quote doesn't give volume — placeholder
      latestTradingDay: new Date(data.t * 1000).toISOString().split('T')[0], // convert UNIX to YYYY-MM-DD
    });
  } catch (err) {
    console.error('Error fetching quote:', err.message);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

module.exports = router;
