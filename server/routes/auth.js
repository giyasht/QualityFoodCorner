const express = require('express');
const router = express.Router();
const { signout, signup, signin, isSignedin } = require('../controllers/auth');
const { check } = require('express-validator');

router.post(
    '/signup',

    // Middlewares to check basic validation of name, lastname, email and password
    [
        check('name','name must be more than 2 char').isLength({ min: 2 }), 
        check('lastname','lastname must be more than 2 char').isLength({ min: 2 }), 
        check('email','Invalid Email').isEmail(),
        check(
            'password',
            'Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character.',
        )
        .isLength({ min:8})
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
        ),
    ], 
    
    signup
);


router.post(
    '/signin',

    // Middlewares to check basic validation of email and password
    [
        check('email','Invalid Email').isEmail(),
        check('password','Password is required').isLength({ min: 1 }),
    ],

    signin
);

router.get('/signout', signout);

router.get('/test', isSignedin, (req,res) => {
    res.send('A protected route')
})

module.exports = router;