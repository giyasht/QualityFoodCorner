const express = require('express');
const router = express.Router();

const { createOffer, getAllOffers } = require('../controllers/offer');
const { getUserById } = require('../controllers/user');
const { isSignedin,isAuthenticated, isAdmin } = require('../controllers/auth');

// Params
router.param('userId', getUserById);

// @desc Get All Offers
// @access Public
router.get('/offer/all', getAllOffers);

// @desc Create a Offer
// @access Admin
router.post('/offer/create/:userId', isSignedin, isAuthenticated, isAdmin, createOffer);


module.exports = router;