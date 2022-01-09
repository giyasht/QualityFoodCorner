const Category = require('../models/category');
const { validationResult } = require('express-validator');


// @desc Get a Category By Id
// @route GET /api/category/:catergoryId
// @access Public
exports.getCategoryById = async (req, res, next, id) => {

    try {

        const category = await Category.findById(id);

        if (category) {
            req.category = category;
        }
        
        else {
            return res.status(400).json({
                error: 'Not found category by ID'
            });
        }
        
        next();

    } catch (error) {
        return res.status(400).json({
            error: 'Error in finding category by ID'
        });
    }
}

// @desc Get a Category By Name
// @route GET /api/category/:catergoryName
// @access Public
exports.getCategoryByName = async (req, res, next, name) => {

    try {

        const category = await Category.findOne( { name: name } );

        if (category) {
            req.category = category;
        }
        
        else {
            return res.status(400).json({
                error: 'Not found category by name'
            });
        }

        // It will go to next function with category info in req.category
        next();
        
    } catch (error) {
        return res.status(400).json({
            error: 'Error in finding category'
        });
    }
}

// @desc Get All Categories
// @route GET /api/categories
// @access Public
exports.getAllCategory = async (req, res) => {

    try {
        
        const categories = await Category.find();

        if (categories) {
            return res.json(categories);
        }

    } catch (error) {
        return res.json({
            error: "No categories found"
        })
    }
}

// @desc Get a Category
// @access Public
exports.getCategory = (req, res) => {
    
    try {
        return res.json(req.category)
        
	} catch (error) {
		return res.json({
			error: "404 Not Found"
		})
	}
}

// @desc Create a Category
// @route POST /api/category/create/:userId
// @access ADMIN
exports.createCategory = async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg});
        }
        
        const category = new Category(req.body);

        const categoryRegistered = await category.save();

        if (categoryRegistered) {
            return res.status(201).json({
                message: "Category Registered Successfully ...",
                category: categoryRegistered
            });
        }
        else {
            return res.status(500).json({error: "Failed to Register"});
        }

    } catch (error) {
        return res.status(400).json({
            error: 'Unable to save category'
        })
    }
}

// @desc Update a Category
// @route PUT /api/category/:catergoryId/:userId
// @access ADMIN
exports.updateCategory = async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg ,message:"validation error" });
        }
        
        const category = req.category;

        category.name = req.body.name;

        const updatedCategory = await category.save();

        if (updatedCategory) {
            return res.json(updatedCategory)
        }

    } catch (error) {
        return res.json({
            error: "Unable to update"
        })
    }
}

// @desc Update a Category
// @route DELETE /api/category/:catergoryId/:userId
// @access ADMIN
exports.deleteCategory = async (req, res) => {

    try {
        
        const category = req.category;
 
        const deletedCategory = await category.remove();

        if (deletedCategory) {
            return res.json({
                message: `Successfully Deleted ${deletedCategory.name} category`
            })
        }

    } catch (error) {
        return res.status(400).json({
            error: `Failed to delete this category`
        })
    }
}