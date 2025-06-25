// routes/overviewRoute.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// for converting to trillion (T) or billion (B);

function formatMarketCap(value) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}T`; // Trillions
  if (value >= 1_000) return `${(value / 1_000).toFixed(2)}B`; // Billions
  return `${value.toFixed(2)}M`; // Millions
}


router.get('/:symbol', protect, async (req, res) => {
  const { symbol } = req.params;

  try {
    const response = await axios.get('https://finnhub.io/api/v1/stock/profile2', {
      params: {
        symbol,
        token: process.env.FINNHUB_API_KEY,
      },
    });

    const data = response.data;

    if (!data.name) {
      return res.status(404).json({ error: 'Company profile not found' });
    }

    res.json({
      name: data.name,
      exchange: data.exchange,
      industry: data.finnhubIndustry,
      marketCap: formatMarketCap(data.marketCapitalization),
      weburl: data.weburl,
      logo: data.logo,
      ipo: data.ipo,
      country: data.country,
    });
  } catch (err) {
    console.error('Error fetching profile:', err.message);
    res.status(500).json({ error: 'Failed to fetch company profile' });
  }
});

module.exports = router;
