const express = require('express');
const router = express.Router();
const { artistRegisterValidation } = require('../helpers/validation')
const { signUpValidation } = require('../helpers/validation')
const userController = require('../controllers/userController')
const artistController = require('../controllers/artistController')
const { createBooking } = require('../controllers/bookingController');
const { bookingValidation } = require('../helpers/validation');
const { msg } = require('../controllers/messageController');
const { messageValidation } = require('../helpers/validation');
const { review } = require('../controllers/reviewController');
const { reviewValidation } = require('../helpers/validation');
const { loginValidation } = require('../helpers/validation');
const loginController = require('../controllers/loginController');

router.post('/login', loginValidation, loginController, artistLogin);

router.post('/reviews', reviewValidation, review);
router.post('/messages', messageValidation, msg);
router.post('/bookings', bookingValidation, createBooking);
router.post('/register', signUpValidation, userController.register);
router.post('/artistregister',artistRegisterValidation, artistController.artistRegister)




module.exports = router;