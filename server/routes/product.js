const express = require('express');
const router = express.Router();

const {getUserById} = require('../controllers/user');
const {isSignedin, isAuthenticated, isAdmin } = require('../controllers/auth');
const {getCategoryByName} = require('../controllers/category')
const {getProductById,getProductByName, createProduct, getProduct, photo, updateProduct, deleteProduct, getAllProducts, getAllProductsByCategory ,getAllUniqueCategories} = require('../controllers/product');

// Params
router.param('userId', getUserById);
router.param('productId', getProductById);
router.param('productName', getProductByName);
router.param('categoryName', getCategoryByName);


// Create Route
router.post(
    '/product/create/:userId',
    isSignedin, 
    isAuthenticated, 
    isAdmin,  
    createProduct
);


// Read Route
router.get('/product/:productId', getProduct );
router.get('/product/photo/:productId', photo);
router.get("/product/name/:productName", getProduct);


// Update Route
router.put('/product/:productId/:userId', isSignedin, isAuthenticated, isAdmin, updateProduct);

// Delete Route
router.delete('/product/:productId/:userId', isSignedin, isAuthenticated, isAdmin, deleteProduct);

// Listing Route
router.get('/products', getAllProducts);

router.get('/products/:categoryName', getAllProductsByCategory);

router.get('/products/categories', getAllUniqueCategories)

module.exports = router;
