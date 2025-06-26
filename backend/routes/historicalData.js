const express = require('express');
const router = express.Router();

//const { protect } = require('../middleware/authMiddleware');
const API_KEY = process.env.TWELVE_DATA_API_KEY;

router.get('/:symbol', async (req, res) => {
  const { symbol } = req.params;

    try {
    const response = await axios.get('https://api.twelvedata.com/time_series', {
      params: {
        symbol: symbol,
        interval: '1day',
        outputsize: 5000, // get as much as possible
        apikey: API_KEY
      }
    });

    if (response.data.status === 'error') {
      return res.status(400).json({ error: response.data.message });
    }

    res.json({ historical: response.data.values });
  } catch (err) {
    console.error('Twelve Data API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
});

module.exports = router;
