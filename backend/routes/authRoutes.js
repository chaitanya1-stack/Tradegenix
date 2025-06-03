const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.get('/me', protect, (req, res) => {
  res.json(req.user); // to verify logged-in user 
});

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
