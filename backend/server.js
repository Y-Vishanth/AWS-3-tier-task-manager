const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express(

const allowedOrigins = [
  'http://localhost:5173',
  'http://34.117.8.214',
  'https://storage.googleapis.com' //only the domain name is allowed, not the full URL
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'backend is healthy - pipeline test',
  });
});

app.use('/tasks', require('./routes/taskRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});