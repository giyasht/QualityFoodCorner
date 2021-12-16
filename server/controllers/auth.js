const User = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});

exports.signup = async (req,res) => {

    const {name, lastname, email, password} = req.body;
    if (!name || !lastname || !email || !password ) {
        return res.status(422).json({error:"Please fill all fields properly ..."});
    }
    
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg ,message:"validation error" });
        }

        const userExists = await User.findOne({email:email});
        
        if (userExists) {
            return res.status(422).json({error:"Email already exist"});
        }

        const user = new User(req.body);

        const userRegistered = await user.save();

        if (userRegistered) {
            return res.status(201).json({message: "User Registered Successfully ..."});
        }
        else {
            return res.status(500).json({error: "Failed to Register"});
        }
        
    } catch (error) {
        console.log(error);
    }

    
}

exports.signin = async (req,res) => {
    
    try {

        const {email,password} = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }

        const user = await User.findOne({email:email});

        if (user) {

            if(!user.authenticate(password)){
                return res.status(401).json({
                    error: "Email and Password do not match !!"
                })
            }

            // create token
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

            // put token in cookie
            res.cookie('token', token, {expire: new Date() + 9999});
            
            // send respnse to front-end
            const {_id, name, email, role} = user;
            return res.json({token, user: {_id, name, email, role}})
        }
        else{
            res.status(400).json({
                error: "User Email does not exists"
            })
        }
        
    } catch (error) {
        console.log(error);
    }

}

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message:"User Signout Successfully"
    });
}

//protected route 

exports.isSignedin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth",
    algorithms: ['sha1', 'RS256', 'HS256']
});


exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCSESS DENIED"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not Admin , ACCESS DENIED"
        })
    }
    next();
}