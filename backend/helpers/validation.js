const { check } = require('express-validator');

exports.userRegisterValidation = [
    check('username', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password is required').isLength({ min: 6 }),
];

exports.artistRegisterValidation = [
    check('username').notEmpty().withMessage('Artist name is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('email').isEmail().withMessage('Invalid email'),
];

exports.bookingValidation = [
    check('EventDate').isISO8601().withMessage('Event date must be a valid date'),
    check('EventTime').matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Event time must be a valid time in HH:mm format'),
    check('UserID').isInt().withMessage('User ID must be an integer'),
    check('ArtistID').isInt().withMessage('Artist ID must be an integer'),
    check('Status').isIn(['pending', 'confirmed', 'cancelled']).withMessage('Status must be one of: pending, confirmed, cancelled'),
];

exports.messageValidation = [
    check('SenderID').isInt().withMessage('Sender ID must be an integer'),
    check('ReceiverID').isInt().withMessage('Receiver ID must be an integer'),
    check('Content').notEmpty().withMessage('Content is required')
];

exports.reviewValidation = [
    check('Rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be an integer between 1 and 5'),
    check('Comment')
        .notEmpty()
        .withMessage('Comment is required'),
    check('UserID')
        .isInt()
        .withMessage('User ID must be an integer'),
    check('ArtistID')
        .isInt()
        .withMessage('Artist ID must be an integer')
];

exports.artistloginValidation = [
    check('email').isEmail().withMessage('Please include a valid email'),
    check('password').notEmpty().withMessage('Password is required')
];

exports.userloginValidation = [
    check('email').isEmail().withMessage('Please include a valid email'),
    check('password').notEmpty().withMessage('Password is required')
];
