// Routes
const authRoutes = require('./../routes/auth');
const userRoutes = require('./../routes/user');
const categoryRoutes = require('./../routes/category');
const productRoutes = require('./../routes/product');
const storeRoutes = require('./../routes/store');
const offerRoutes = require('./../routes/offer');
const developerRoutes = require('./../routes/developer');

const Routes = [
    authRoutes, 
    userRoutes, 
    categoryRoutes, 
    productRoutes, 
    storeRoutes, 
    offerRoutes,
    developerRoutes
]

module.exports = Routes
