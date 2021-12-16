const Product = require('../models/product');
const Category = require('../models/category')
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const { sortBy } = require('lodash');
const path = require("path");
const { validationResult } = require('express-validator');

exports.getProductById = async (req, res, next, id) => {

    try {
        
        const product = await (await Product.findById(id)).populate('category');

        if(product){
            req.product = product;
        }
        
        next();


    } catch (error) {
        return res.status(400).json({
            error: 'Product not found'
        });
    }

}

exports.getProductByName = async (req, res, next, name) => {

    try {

        const product = await Product.findOne( { name: name } );

        if(product){
            req.product = product;
        }else{
            res.status(400).json({
                error: 'Not found product by name'
            });
        }

        next();

        // It will go to function getCategory() and will give response
        
    } catch (error) {
        return res.status(400).json({
            error: 'Error in finding product'
        });
    }
}

exports.createProduct = async (req, res) => {

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

            const { name, description, price, category, stock, photoUrl} = fields

            if (!name) {
                return res.status(400).json({
                    error: "Name field is empty !"
                })
            }

            if (!description) {
                return res.status(400).json({
                    error: "Description field is empty !"
                })
            }

            if (!price) {
                return res.status(400).json({
                    error: "Price field is empty !"
                })
            }

            if (!category) {
                return res.status(400).json({
                    error: "Category field is empty !"
                })
            }

            if (!stock) {
                return res.status(400).json({
                    error: "Stock field is empty !"
                })
            }



            const categoryObject = await Category.findOne({ name: fields.category})

            if (!categoryObject) {
                return res.status(400).json({
                    error: `${fields.category} Catgeory does not exists !`
                })                ;
            } 

            // if (!name || !description || !price || !category || !stock ) {
            //     return res.status(400).json({
            //         error: "Please Include All Fields"
            //     })
            // }

            const updatedFields = {
                name: fields.name,
                description: fields.description,
                price: fields.price,
                category: categoryObject._id,
                stock: fields.stock,
                photoUrl: fields.photoUrl,
            }

            let product = new Product(updatedFields);

            // handle file
            if (file.photo) {

                if (file.photo.size>3000000) {
                    return res.status(400).json({
                        error: "File size too big"
                    })
                }

                // formidable - V1
                // product.photo.data = fs.readFileSync(file.photo.path);
                // product.photo.contentType = file.photo.type;

                // formidable - V2
                product.photo.data = fs.readFileSync(file.photo.filepath);
                product.photo.contentType = file.photo.mimetype;
            }

            // save to DB
            const productCreated = await product.save()

            if (productCreated) {
                res.json(productCreated)
            }



        })
        
    } catch (error) {
        res.status(400).json({
            error: "Saving Failed"
        })
    }
}

exports.getProduct = (req, res) => {
	
	try {
		
		req.product.photo = undefined
		return res.json(req.product)

	} catch (error) {
		res.json({
			error: "404 Not Found"
		})
	}
}

exports.photo = (req, res, next) => {

	if (req.product.photo.data) {
		res.set('Content-Type', req.product.photo.contentType);
		return res.send(req.product.photo.data);
	}
	next();
}

exports.updateProduct = async (req, res) => {

	try {

        let form = new formidable.IncomingForm();
        form.keepExtensions = true

        form.parse(req, async (err, fields, file) => {
            
            if(err){
                return res.status(400).json({
                    error: "Problem with image"
                });
            }

			// Update product
            let product = req.product;
			product = _.extend(product, fields) 

            // handle file
            if (file.photo) {

                if (file.photo.size>3000000) {
                    return res.status(400).json({
                        error: "File size too big"
                    })
                }

                product.photo.data = fs.readFileSync(file.photo.path);
                product.photo.contentType = file.photo.type;
            }

            // Save to DB
			try {
				
				const productUpdated = await product.save()

				if (productUpdated) {
					res.json(productUpdated)
				}

			} catch (error) {
				res.status(400).json({
					error: "Updation Failed"
				})
			}
            
        })
        
    } catch (error) {
        res.status(400).json({
            error: "Saving Failed"
        })
    }
}

exports.deleteProduct = async (req, res) => {
	
	try {
		
		const product = req.product;
		const deletedProduct = await product.remove();

		if (deletedProduct) {
            return res.json({
                message: `Successfully Deleted ${deletedProduct.name} Product`
            })
        }

	} catch (error) {
		res.status(400).json({
            error: `Failed to delete this product`
        })
	}
}

exports.getAllProducts = async (req, res) => {

	try {

		let limit = req.query.limit ? parseInt(req.query.limit) : 100;
		let sortBy = req.query.sortBy ? req.query.sortBy : '_id';

		const products = await Product.find()
									.populate('category')
									.select('-photo')
									.sort([[sortBy, 'asc']])
									.limit(limit);

		if (products) {
			res.json(products);
		}
		
	} catch (error) {
		
		res.status(400).json({
			error: "No products found"
		})
	}
}

exports.getAllProductsByCategory = async (req, res) => {

    try {

        let categoryId = req.category ? (req.category.id) : '619cb6bddafcf9142ec6f52a';

        const products = await Product.find({ category : categoryId  })									
                                    .populate('category')
									// .select('photo')
									// .sort([[sortBy, 'asc']])
									// .limit(limit);

        if (products) {
            res.json(products);
        }

    } catch (error) {
		
		res.status(400).json({
			error: "No products found"
		})
	}
}

exports.getAllUniqueCategories = async (req, res) => {

	try {
		
		const categories = await Product.distinct('category', {});

		if (categories) {
			res.json(categories);
		}

	} catch (error) {
		
		return res.status(400).json({
			error: "No Category Found"
		})
	}
}

exports.updateStock = (req, res) => {

	let myOperations = req.body.order.products.map(prod => {
		return{
			updateOne: {
				filter: {_id: prod._id},
				update: {$inc: {stock: -prod.count, sold: +prod.count} }
			}
		}
	});

	Product.bulkWrite(myOperations, {}, (err, products) => {

		if (err) {
			return res.status(400).json({
				error: "Bulk Operation Failed"
			});
		}
		next();
	})
}
