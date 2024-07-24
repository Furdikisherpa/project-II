const { check } = require('express-validator');

exports.signUpValidation =[
    check('username','Name is required').not().isEmpty(),
    check('email','Please enter a valid mail').isEmail().normalizeEmail({ gmail_remove_dots:true }),
    check('password','Password is required').isLength({ min:6 }),
    check('fullname','Full name is required').not().isEmpty(),
    check('contact','Contact number is required').not().isEmpty(),

]

