const express = require('express');
const dotenv = require('dotenv');


const cors = require('cors');

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/historicaldata', require('./routes/historicalData'));


const PORT = process.env.PORT || 5600;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
