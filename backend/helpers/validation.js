const { check } = require('express-validator');

exports.signUpValidation =[
    check('username','Name is required').not().isEmpty(),
    check('email','Please enter a valid mail').isEmail().normalizeEmail({ gmail_remove_dots:true }),
    check('password','Password is required').isLength({ min:6 }),
    check('fullname','Full name is required').not().isEmpty(),
    check('contact','Contact number is required').not().isEmpty(),

];

exports.artistRegisterValidation = [
    check('artistname').notEmpty().withMessage('Artist name is required'),
    check('genre').notEmpty().withMessage('Genre is required'),
    // check('artistBio').notEmpty().withMessage('Artist bio is required'),
    check('artistPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('artistEmail').isEmail().withMessage('Invalid email'),
    // check('mediagallery').notEmpty().withMessage('Media gallery is required'), // Add specific validation if necessary
    // check('priceinfo').notEmpty().withMessage('Price info is required'),
    check('contactinfo').notEmpty().withMessage('Contact info is required'),
];

exports.bookingValidation = [
    check('EventDate').isISO8601().withMessage('Event date must be a valid date'),
    check('UserID').isInt().withMessage('User ID must be an integer'),
    check('ArtistID').isInt().withMessage('Artist ID must be an integer'),
    check('Status').isIn(['pending', 'confirmed', 'cancelled']).withMessage('Status must be one of: pending, confirmed, cancelled'),
    check('TotalPrice').isDecimal().withMessage('Total price must be a decimal value')
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

exports.loginValidation =[
    check('artistEmail', 'Please include a valid email').isEmail(),
    check('artistPassword', 'Password is required').exists()
];