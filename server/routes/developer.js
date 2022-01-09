const express = require('express');
const router = express.Router();

const { createDeveloper, getAllDevelopers } = require('../controllers/developer');
const { getUserById } = require('../controllers/user');
const { isSignedin, isAdmin } = require('../controllers/auth');

// Params
router.param('userId', getUserById);


// @desc Get All Developers
// @access Public
router.get('/developer/all', getAllDevelopers);

// @desc Create a Developer
// @access Admin
router.post('/developer/create/:userId', isSignedin, isAdmin, createDeveloper);

module.exports = router;