const Developer = require('../models/developer');
const formidable = require('formidable');
const fs = require('fs');

// @desc Get All Developers
// @route GET /api/developer/all
// @access Public
exports.getAllDevelopers = async (req, res) => {
    
    try {
        
        const developers = await Developer.find();
        // const developers = await Developer.find({}, { name: 1, email: 1, facebook: 1, });

        if(developers){
            return res.status(200).json(developers)
        }


    } catch (error) {
        return res.status(400).json({
            error: error
        });
    }
}

// @desc Create a Offer
// @route POST /api/developer/create/:userId
// @access Admin
exports.createDeveloper = async (req, res) => {

    try {

        let form = new formidable.IncomingForm();
        form.keepExtensions = true

        form.parse(req, async (err, fields, file) => {

            // console.log(err,fields,file);
            
            if(err){
                return res.status(400).json({
                    error: "Problem with image"
                });
            }

            const { name, email, facebook, instagram, linkedin } = fields

            if (!name) {
                return res.status(400).json({
                    error: "Name field is empty !"
                })
            }

            if (!email) {
                return res.status(400).json({
                    error: "Email field is empty !"
                })
            }

            const updatedFields = {
                name: name,
                email: email,
                facebook: facebook,
                instagram: instagram,
                linkedin: linkedin,
            }

            let developer = new Developer(updatedFields);

            // handle file
            if (file.developerImage) {

                if (file.developerImage.size>3000000) {
                    return res.status(400).json({
                        error: "File size too big"
                    })
                }

                // formidable - V2
                developer.developerImage.data = fs.readFileSync(file.developerImage.filepath);
                developer.developerImage.contentType = file.developerImage.mimetype;
            }


            // save to DB
            const developerCreated = await developer.save()

            if (developerCreated) {
                return res.status(201).json(developerCreated)
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}

