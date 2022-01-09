const express = require("express");
const router = express.Router();
const { check } = require('express-validator');

const { getCategoryById, getCategoryByName, createCategory, getCategory, getAllCategory, updateCategory, deleteCategory } = require("../controllers/category");
const { isSignedin, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");


// Params
router.param("userId", getUserById);
router.param("catergoryId", getCategoryById);
router.param("categoryName", getCategoryByName);


// @desc Get Category By ID
// @access Public
router.get('/category/:catergoryId', getCategory);

// @desc Get Category By Name
// @access Public
router.get('/category/name/:categoryName', getCategory);

// @desc Get All Categories
// @access Public
router.get('/categories', getAllCategory);

// @desc Create a Category
// @access Admin
router.post(
    '/category/create/:userId',
    [
      check('name','Category name is empty').isLength({ min: 1 }), 
    ],
    isSignedin, isAuthenticated, isAdmin, createCategory
);

// @desc Update a Category
// @access Admin
router.put(
	'/category/:catergoryId/:userId',
	[
		check('name','Category name is empty').isLength({ min: 1 }), 
	],
	isSignedin, isAuthenticated, isAdmin, updateCategory
);

// @desc Delete a Category
// @access Admin
router.delete('/category/:catergoryId/:userId', isSignedin, isAuthenticated, isAdmin, deleteCategory);

module.exports = router;
