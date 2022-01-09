const mongoose = require('mongoose');

var developerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
        },

        email: {
            type: String,
            trim: true,
            required: true,
            maxlength: 100,
        },

        developerImage: {
            data: Buffer,
            contentType: String,
        },

        facebook: {
            type: String,
            trim: true,
            maxlength: 200,
        },

        instagram: {
            type: String,
            trim: true,
            maxlength: 200,
        },

        linkedin: {
            type: String,
            trim: true,
            maxlength: 200,
        }

    },
    
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Developer', developerSchema);