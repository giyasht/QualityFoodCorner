const User = require('../models/user');
const { validationResult } = require('express-validator');
// @desc Get User By ID
// @route GET /api/user/:userId
// @access Public
exports.getUserById = async (req, res, next, id) => {

    try {

        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({
                error: "NO user found in database"
            });
        }

        req.profile = user;
        next();
        
    } catch (error) {
        return res.status(400).json({
            error: "NO user found in database"
        });
    }
};

// @desc Get Admin By ID
// @route GET /api/user/:adminId
// @access Admin
exports.getAdminById = async (req, res, next, id) => {
    
    try {

        const admin = await User.find({id: id, role:1});

        if (!admin) {
            return res.status(400).json({
                error: "NO Admin found in database by Id"
            });
        }

        req.profile = admin;
        next();
        
    } catch (error) {
        return res.status(400).json({
            error: "NO Admin found in database"
        });
    }
}

// @desc Get User By Admin Credentials
// @route GET /api/admin/user/:adminId
// @access Admin
exports.getUserByAdmin = async (req, res) => {

    try {

        const userIdToBeFound = req.body.userId

        const user = await User.findById(userIdToBeFound);

        if (!user) {
            return res.status(400).json({
                error: "NO Admin found in database"
            });
        }

        return res.json(user)
        
    } catch (error) {
        return res.status(400).json({
            error: "NO user found in database"
        });
    }
}

// @desc Get a User
// @route GET /api/user/:userId
// @access Public
exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
};

// @desc Update a User
// @route PUT /api/user/:userId
// @access Admin
exports.updateUser = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({
                error: errors.array()[0].msg
            });
        }

        const user = await User.findByIdAndUpdate(
            {_id: req.profile._id},
            {$set: req.body},
            {new:true, useFindAndModify:false},
        );

        user.salt = undefined;
        user.encry_password = undefined;
        
        return res.status(200).json(user)

    } catch (error) {

        return res.status(400).json({
            error: "You are not allowed to update this info"
        });
    }
};

// @desc Add a Product to CartItems
// @route PUT /api/user/add/cartItem/:userId
// @access Public
exports.addToCartItems = async (req, res) => {

    try {

        const user = await User.findById(req.profile._id);

        user.cartItems.push(req.body.productId)

        user.save()

        return res.status(200).json({
            success : "Added Cart Item"
        });


    } catch (error) {

        return res.status(400).json({
            error: "You are not allowed to update this info"
        });
    }
};

// @desc Remove a Product to CartItems
// @route PUT /api/user/remove/cartItem/:userId
// @access Public
exports.removeFromCartItems = async (req, res) => {
    
    try {

        const user = await User.findById(req.profile._id);

        var index = user.cartItems.indexOf(req.body.productId);

        if (index !== -1) {
            user.cartItems.splice(index, 1);
        }

        if (index == -1) {
            return res.status(400).json({
                success : "This Item is not present in the Cart"
            });
        }

        user.save()

        return res.status(200).json({
            success : "Remove from CartItems"
        });


    } catch (error) {

        return res.status(400).json({
            error: "You are not allowed to update this info"
        });
    }
}

// @desc CheckOut CartItems
// @route PUT /api/user/remove/cartItem/:userId
// @access Public
exports.checkOutCartItems = async (req, res) => {
    
    try {

        const user = await User.findById(req.profile._id);

        if (user.cartItems.length === 0) {

            user.save()

            return res.status(400).json({
                error:"Cart Items is empty"
            })
        }

        var x = user.cartItems.slice()

        var y = {
            status:"pending",
            items: x
        };

        user.orders.push(y);

        user.cartItems = [];

        user.save()

        return res.status(200).json({
            success : "Order Successful"
        });


    } catch (error) {

        return res.status(400).json({
            error: "Order Unsuccessful"
        });
    }
}