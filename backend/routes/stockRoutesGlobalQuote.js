const express = require('express');
const axios = require('axios');
const router = express.Router(); 
const { protect } = require('../middleware/authMiddleware');


router.get('/quote/:symbol',protect,  async (req, res) => {
  const { symbol } = req.params;
  

  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol,
        apikey: process.env.STOCK_API_KEY,
      }
    });

    const globalQuote = response.data['Global Quote'];

    if (!globalQuote || Object.keys(globalQuote).length === 0) {
      return res.status(404).json({ error: 'No quote data found' });
    }

    const cleanedData = {
      symbol: globalQuote['01. symbol'],
      open: globalQuote['02. open'],
      high: globalQuote['03. high'],
      low: globalQuote['04. low'],
      price: globalQuote['05. price'],
      volume: globalQuote['06. volume'],
      latestTradingDay: globalQuote['07. latest trading day'],
      previousClose: globalQuote['08. previous close'],
      change: globalQuote['09. change'],
      changePercent: globalQuote['10. change percent']
    };

    res.json(cleanedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch current stock quote' });
  }


});






  module.exports = router;