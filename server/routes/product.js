const express = require('express');
const router = express.Router();

const { getUserById } = require('../controllers/user');
const { isSignedin, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getCategoryByName } = require('../controllers/category')
const { getProductById, getProductByName, createProduct, getProduct, photo, updateProduct, deleteProduct, getAllProducts, getAllProductsByCategory, getAllUniqueCategories, getSearchedProducts } = require('../controllers/product');

// Params
router.param('userId', getUserById);
router.param('productId', getProductById);
router.param('productName', getProductByName);
router.param('categoryName', getCategoryByName);


// @desc Get Product By ID
// @access Public
router.get('/product/:productId', getProduct );

// @desc Get Products searched by title
// @access Public
router.get('/product/search/:title', getSearchedProducts);

// @desc Get Product By Name
// @access Public
router.get('/product/name/:productName', getProduct);

// @desc Get All Products
// @access Public
router.get('/products', getAllProducts);

// @desc Get All Products By Category
// @access Public
router.get('/products/:categoryName', getAllProductsByCategory);

// @desc Get All Unique Categories (Min. 1 Product)
// @access Public
router.get('/products/all/categories', getAllUniqueCategories)

router.get('/product/photo/:productId', photo);

// @desc Create a Product
// @access Admin
router.post('/product/create/:userId', isSignedin, isAuthenticated, isAdmin, createProduct);

// @desc Update a Product
// @access Admin
router.put('/product/:productId/:userId', isSignedin, isAuthenticated, isAdmin, updateProduct);

// @desc Delete a Product
// @access Admin
router.delete('/product/:productId/:userId', isSignedin, isAuthenticated, isAdmin, deleteProduct);


module.exports = router;
