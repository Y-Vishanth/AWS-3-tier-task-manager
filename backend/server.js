const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'backend is healthy',
  });
});

app.use('/tasks', require('./routes/taskRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
