const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRoute');
const artistBookingRoutes = require('./routes/artistBookingRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', userRouter);
app.use('/api/artist', artistBookingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.statusCode).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
