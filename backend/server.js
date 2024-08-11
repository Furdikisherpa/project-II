require("dotenv").config();
const express = require('express');
const cors = require('cors');
require('./config/dbConnection');

// Import routes
const userRouter = require('./routes/userRoute');
const connection = require("./config/dbConnection");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Replaces bodyParser.json()
app.use(express.urlencoded({ extended: true })); // Replaces bodyParser.urlencoded()

// Routes
app.use('/api', userRouter);

// Example endpoint to fetch data
app.get('/api/artist', (req, res) => {
  const query = 'SELECT * FROM artist '; // Modify according to your table and query

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'An error occurred while fetching data' });
      return;
    }
    res.json(results);
  });
});



// Error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
