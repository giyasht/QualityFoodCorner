const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { getUserById, getAdminById, getUser, updateUser, getUserByAdmin, addToCartItems, removeFromCartItems, checkOutCartItems } = require('../controllers/user');
const { isSignedin, isAuthenticated, isAdmin } = require('../controllers/auth');

// Params
router.param('userId', getUserById);
router.param('adminId', getAdminById);


// @desc Get User By ID
// @access User (Public)
router.get('/user/:userId', isSignedin, isAuthenticated, getUser);

// @desc Update User by ID
// @access User (Public)
router.put(
    '/user/:userId',
    
    // Middlewares to check basic validation of mobile number
    [
        check('address.mobile','Mobile number should contains 10 digits').isLength({ min: 10, max: 12 }),
    ], 

    isSignedin, isAuthenticated, updateUser);

// @desc Add a Product to CartItems By User
// @access User (Public)
router.put('/user/add/cartItem/:userId', isSignedin, isAuthenticated, addToCartItems);

// @desc Remove a Product From CartItems By User
// @access User (Public)
router.put('/user/remove/cartItem/:userId', isSignedin, isAuthenticated, removeFromCartItems);

router.put('/user/checkout/cartItems/:userId', isSignedin, isAuthenticated, checkOutCartItems);

// @desc Get User By ID
// @access ADMIN
router.get('/admin/user/:adminId', isSignedin, isAdmin, getUserByAdmin);

// @desc Update User By ID
// @access ADMIN
router.put('/admin/user/:adminId', isSignedin, isAdmin, updateUser);

module.exports = router;
