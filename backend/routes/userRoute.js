const express = require('express');
const router = express.Router();
const { artistRegisterValidation, signUpValidation, bookingValidation, messageValidation, reviewValidation, loginValidation } = require('../helpers/validation');
const userController = require('../controllers/userController');
const artistController = require('../controllers/artistController');
const bookingController = require('../controllers/bookingController');
const messageController = require('../controllers/messageController');
const reviewController = require('../controllers/reviewController');
const artistloginController = require('../controllers/artistloginController');

// Login route
router.post('/login', loginValidation, artistloginController.artistLogin);

// Review route
router.post('/reviews', reviewValidation, reviewController.review);

// Message route
router.post('/messages', messageValidation, messageController.msg);

// Booking route
router.post('/bookings', bookingValidation, bookingController.createBooking);

// User registration route
router.post('/register', signUpValidation, userController.register);

// Artist registration route
router.post('/artistregister', artistRegisterValidation, artistController.artistRegister);

module.exports = router;
