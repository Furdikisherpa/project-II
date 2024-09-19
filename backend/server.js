const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./routes/userRoute');
const artistBookingRoutes = require('./routes/artistBookingRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logging middleware

// Routes
app.use('/api', userRouter); // All user-related routes
app.use('/api/artist', artistBookingRoutes); // Auth middleware applied to artist routes

// Error handling middleware (if applicable)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
