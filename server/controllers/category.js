const Category = require('../models/category');
const { validationResult } = require('express-validator');

exports.getCategoryById = async (req, res, next, id) => {

    try {

        const category = await Category.findById(id);

        if(category){
            req.category = category;
        }else{
            res.status(400).json({
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

exports.getCategoryByName = async (req, res, next, name) => {

    try {

        const category = await Category.findOne( { name: name } );

        if(category){
            req.category = category;
        }else{
            res.status(400).json({
                error: 'Not found category by name'
            });
        }

        next();

        // It will go to next function with category in req 
        
    } catch (error) {
        return res.status(400).json({
            error: 'Error in finding category'
        });
    }
}

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

exports.getCategory = (req, res) => {
    return res.json(req.category)
}

exports.getAllCategory = async (req, res) => {

    try {
        
        const categories = await Category.find();

        if (categories) {
            res.json(categories);
        }

    } catch (error) {
        res.json({
            error: "No category found"
        })
    }
}

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
        res.json({
            error: "Unable to update"
        })
    }
}

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
        res.status(400).json({
            error: `Failed to delete this category`
        })
    }
}