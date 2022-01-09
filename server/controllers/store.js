const Store = require('../models/store');

// @desc Get All Stores
// @route GET /api/stores
// @access Public
exports.getAllStores = async (req, res, next) => {

    try {

        const stores = await Store.find();

        return res.status(200).json({
            success: true,
            // count: stores.length,
            data: stores
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// @desc Create a Store
// @route POST /api/create/store/:userId
// @access Admin
exports.createStore = async (req, res, next) => {

    try {

        const store = new Store(req.body);

        const storeRegistered = await store.save();

        if (storeRegistered) {
            return res.status(201).json({
                success: true,
                data: store
            });
        }
        else {
            return res.status(500).json({error: "Failed to Register"});
        }
    
    } catch (error) {
        console.error(error);

        if (error.code === 11000) {
            return res.status(400).json({ error: 'This store already exists' });
        }
        
        res.status(500).json({ error: 'Server error' });
    }
}