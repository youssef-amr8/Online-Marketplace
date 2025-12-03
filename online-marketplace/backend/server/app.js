const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./src/routes');

require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS settings (adjust origin as needed)
app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
  credentials: true
}));

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Connect to MongoDB
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/marketPlace';
mongoose.connect(mongoURL)
  .then(() => console.log('Connected to MongoDB:', mongoURL))
  .catch(err => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
