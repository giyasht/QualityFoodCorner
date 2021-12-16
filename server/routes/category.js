const express = require("express");
const router = express.Router();

const {
	getCategoryById,
	getCategoryByName,
	createCategory,
	getCategory,
	getAllCategory,
	updateCategory,
	deleteCategory,
} = require("../controllers/category");
const { isSignedin, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

const { check } = require('express-validator');

// Params
router.param("userId", getUserById);
router.param("catergoryId", getCategoryById);
router.param("categoryName", getCategoryByName);

// Routes
router.post(
    "/category/create/:userId",
    [
      check('name','Category name is empty').isLength({ min: 1 }), 
    ],
    isSignedin,
    isAuthenticated,
    isAdmin,
    createCategory
);

// Read
router.get("/category/:catergoryId", getCategory);
router.get("/category/name/:categoryName", getCategory);
router.get("/categories", getAllCategory);

// Update
router.put(
	"/category/:catergoryId/:userId",
	[
		check('name','Category name is empty').isLength({ min: 1 }), 
	],
	isSignedin,
	isAuthenticated,
	isAdmin,
	updateCategory
);

// Delete
router.delete(
	"/category/:catergoryId/:userId",
	isSignedin,
	isAuthenticated,
	isAdmin,
	deleteCategory
);

module.exports = router;
