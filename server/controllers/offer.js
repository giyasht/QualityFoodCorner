const Offer = require('../models/offer');
const formidable = require('formidable');
const fs = require('fs');


// @desc Get All Offers
// @route GET /api/offer/all
// @access Public
exports.getAllOffers = async (req, res) => {
    
    try {
        
        // const offers = await Offer.find({}, { name: 1, feature: 1, isActive: 1 });
        const offers = await Offer.find();

        if(offers){
            return res.status(200).json(offers)
        }


    } catch (error) {
        return res.status(400).json({
            error: error
        });
    }
}

// @desc Create a Offer
// @route POST /api/offer/create/:userId
// @access Admin
exports.createOffer = async (req, res) => {

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

            const { name, feature1, feature2, feature3, isActive } = fields

            if (!name) {
                return res.status(400).json({
                    error: "Name field is empty !"
                })
            }

            if (!feature1 && !feature2 && !feature3) {
                return res.status(400).json({
                    error: "Feature field is empty !"
                })
            }

            const updatedFields = {
                name: fields.name,
                // feature: fields.feature,
                isActive: fields.isActive,
            }

            let offer = new Offer(updatedFields);

            
            // Features array
            if( feature1 != null){
                offer.feature.push(feature1)
            }

            if( feature2 != null){
                offer.feature.push(feature2)
            }
            
            if( feature3 != null){
                offer.feature.push(feature3)
            }

            // handle file
            if (file.offerImage) {

                if (file.offerImage.size>3000000) {
                    return res.status(400).json({
                        error: "File size too big"
                    })
                }

                // formidable - V2
                offer.offerImage.data = fs.readFileSync(file.offerImage.filepath);
                offer.offerImage.contentType = file.offerImage.mimetype;
            }


            // save to DB
            const offerCreated = await offer.save()

            if (offerCreated) {
                return res.status(201).json(offerCreated)
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: error
        })
    }
}