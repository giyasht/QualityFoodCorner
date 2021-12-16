const User = require('../models/user');

exports.getUserById = async (req, res, next, id) => {

    try {

        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({
                error: "NO user found in  database"
            });
        }

        req.profile = user;
        next();
        
    } catch (error) {
        return res.status(400).json({
            error: "NO user found in  database"
        });
    }
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
};

exports.updateUser = async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(
            {_id: req.profile._id},
            {$set: req.body},
            {new:true, useFindAndModify:false},
        );

        user.salt = undefined;
        user.encry_password = undefined;
        res.json(user)

    } catch (error) {

        return res.status(400).json({
            error: "You are not allowed to update this info"
        });
    }
};


exports.updateCartItems = async (req, res) => {

    try {

        const user = await User.findById(req.profile._id);

        console.log(user);

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