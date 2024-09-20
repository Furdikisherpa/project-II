const express = require('express');
const router = express.Router();
const multer = require('multer');
// Import controllers and middleware
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
const bookingMiddleware = require('../middleware/bookingMiddleware');
const userController = require('../controllers/userController');
const artistController = require('../controllers/artistController');
const bookingController = require('../controllers/bookingController');
const messageController = require('../controllers/messageController');
const reviewController = require('../controllers/reviewController');
const artistloginController = require('../controllers/artistloginController');
const userloginController = require('../controllers/userloginController');
const artistProfileController = require('../controllers/ArtistProfileController');
const userProfileController = require('../controllers/userProfileController');
const artistDataFectchController = require('../controllers/artistDataFetchController');
const uploadVideoController = require('../controllers/UploadVideoController');
const fetchVideoController = require('../controllers/FetchVideoController');
const fetchBookingControllers = require('../controllers/FetchBookingController');
const artistUpdateController = require('../controllers/artistUpdateController');
// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Initialize multer
const upload = multer({ storage: storage });
// Controllers for artist booking
// const { getBooking, acceptBooking, rejectBooking } = require('../controllers/artistBookingController');
// const { verifyToken, checkArtistRole } = require('../middleware/artistBookingMiddleware');

// User Routes
router.post('/register', userRegisterValidation, userController.register);
router.post('/userlogin', userloginValidation, userloginController.userlogin);
router.get('/user/:id', userProfileController.userProfile);

// Artist Routes
router.post('/artistRegister', artistRegisterValidation, artistController.artistRegister);
router.post('/artistlogin', artistloginValidation, artistloginController.artistlogin);
router.get('/artist/:id', artistProfileController.artistProfile);
router.put('/artists/:id',upload.single('mediaGallery'), artistUpdateController.updateArtistProfile);
router.get('/artists', artistDataFectchController.artistData);


// Booking Routes
router.post('/bookings', bookingValidation, bookingController.createBooking);
router.get('/bookeddata', bookingMiddleware, fetchBookingControllers.getUserBookings);

// Video Routes
router.get('/getvideo', fetchVideoController.getVideos);
router.post('/uploadvideo', authMiddleware, uploadVideoController.uploadVideo);
router.delete('/deletevideo', authMiddleware, uploadVideoController.deleteVideo);


// Review Routes
router.post('/reviews', reviewValidation, reviewController.review);

// Message Routes
router.post('/messages', messageValidation, messageController.msg);

// Artist Booking Routes
// router.get('/artist/bookings', verifyToken, checkArtistRole, getBooking);
// router.put('/artist/bookings/:bookingID/accept', verifyToken, checkArtistRole, acceptBooking);
// router.put('/artist/bookings/:bookingID/reject', verifyToken, checkArtistRole, rejectBooking);

module.exports = router;
