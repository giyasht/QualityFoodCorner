const express = require('express');
const router = express.Router();

const { getAllStores, createStore } = require('../controllers/store');
const { getUserById } = require('../controllers/user');
const { isSignedin, isAuthenticated, isAdmin } = require('../controllers/auth');

// Params
router.param('userId', getUserById);

// @desc Get All Stores
// @access Public
router.get('/stores', getAllStores);

// @desc Create a Store
// @access Admin
router.post('/create/store/:userId', isSignedin, isAuthenticated, isAdmin, createStore);

module.exports = router;
