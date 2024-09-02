require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import routes
const userRouter = require('./routes/userRoute');
const bookingRouter = require('./routes/artistBookingRoute');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Replaces bodyParser.json()
app.use(express.urlencoded({ extended: true })); // Replaces bodyParser.urlencoded()

// Routes
app.use('/api', userRouter);
app.use('/api', bookingRouter); // Correctly use the bookingRouter

// Error handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.statusCode).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
