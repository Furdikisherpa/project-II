const express = require('express');
const router = express.Router();
const {
    artistRegisterValidation,
    userRegisterValidation,
    bookingValidation,
    messageValidation,
    reviewValidation,
    artistloginValidation,
    userloginValidation
} = require('../helpers/validation');
const authMiddleware = require('../middleware/authMiddleware');

const userController = require('../controllers/userController');
const artistController = require('../controllers/artistController');
const bookingController = require('../controllers/bookingController');
const messageController = require('../controllers/messageController');
const reviewController = require('../controllers/reviewController');
const artistloginController = require('../controllers/artistloginController');
const userloginController = require('../controllers/userloginController');
const ArtistProfileController = require('../controllers/ArtistProfileController');
const userProfileController = require('../controllers/userProfileController');
const artistDataFectchController = require('../controllers/artistDataFetchController');
const UploadVideoController = require('../controllers/UploadVideoController');
const FetchVideoController = require('../controllers/FetchVideoController');
const artistUpdateController = require('../controllers/artistUpdateController');

// Artist update route
router.put('/artist/:id', artistUpdateController.updateArtistProfile);

// Video fetch route
router.get('/getvideo', FetchVideoController.getVideos);

// Video upload route
router.post('/uploadvideo', authMiddleware, UploadVideoController.uploadVideo);

// Artists data fetch
router.get('/artists', artistDataFectchController.artistData);

// User profile route
router.get('/user/:id', userProfileController.userProfile);

// Artist profile route
router.get('/artist/:id', ArtistProfileController.artistProfile);

// User Login route
router.post('/userlogin', userloginValidation, userloginController.userlogin);

// Artist Login route
router.post('/artistlogin', artistloginValidation, artistloginController.artistlogin);

// Review route
router.post('/reviews', reviewValidation, reviewController.review);

// Message route
router.post('/messages', messageValidation, messageController.msg);

// Booking route
router.post('/bookings', bookingValidation, bookingController.createBooking);

// User registration route
router.post('/register', userRegisterValidation, userController.register);

// Artist registration route
router.post('/artistRegister', artistRegisterValidation, artistController.artistRegister);

module.exports = router;
