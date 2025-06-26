const express = require('express');
const router = express.Router();
const yahooFinance = require('yahoo-finance2').default;
const { protect } = require('../middleware/authMiddleware'); // Optional if you need auth

router.get('/:symbol', protect, async (req, res) => {
  const { symbol } = req.params;
  const { range } = req.query;

  const now = new Date();
  const rangeMap = {
    '1m': 30,
    '6m': 182,
    '1y': 365,
    '3y': 1095,
    '5y': 1825,
  };

  const days = rangeMap[range] || 365;
  const period1 = new Date();
  period1.setDate(now.getDate() - days);

  try {
    const results = await yahooFinance.historical(symbol, {
      period1,
      period2: now,
      interval: '1d',
    });

    res.json({ historical: results });
  } catch (err) {
    console.error('Yahoo Finance API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
});

module.exports = router;
