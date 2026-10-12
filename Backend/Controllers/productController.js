/*************************************************
 * SHOPLEDGER
 * Module: Product Controller
 * File: productController.js
 * Purpose: Handles product operations
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/


// ============================================
// 1. Import Required Packages
// ============================================

// Import Product model
const Product = require("../Models/Product");



// ============================================
// 2. Add New Product
// ============================================

const addProduct = async (req, res) => {

    try {


        const {

            name,
            category,
            sellingPrice,
            costPrice,
            quantity,
            lowStockLevel,
            description

        } = req.body;



        // Get uploaded image path

        const image = req.file

            ? req.file.path

            : "";



        // Validate required fields

        if (

            !name ||

            sellingPrice === undefined ||

            costPrice === undefined ||

            quantity === undefined

        ) {


            return res.status(400).json({

                success: false,

                message: "Please fill in all required fields."

            });


        }



        // Create product

        const product = await Product.create({

            user: req.user._id,

            name,

            category,

            sellingPrice,

            costPrice,

            quantity,

            lowStockLevel,

            description,

            image

        });



        return res.status(201).json({

            success: true,

            message: "Product added successfully.",

            data: product

        });



    } catch (error) {


        return res.status(500).json({

            success: false,

            message: error.message

        });


    }

};




// ============================================
// 3. Get All Products (Search & Filter)
// ============================================

const getProducts = async (req, res) => {


    try {


        const {

            search,

            category,

            lowStock,

            sort


        } = req.query;



        const query = {


            user: req.user._id


        };



        // Search product name

        if (search) {


            query.name = {


                $regex: search,

                $options: "i"


            };


        }



        // Filter category

        if (category) {


            query.category = category;


        }



        let products = await Product.find(query);



        // Low stock filter

        if (lowStock === "true") {


            products = products.filter(product =>


                product.quantity <= product.lowStockLevel


            );


        }



        // Sorting

        if (sort === "oldest") {


            products.sort(

                (a, b) => a.createdAt - b.createdAt

            );


        } else {


            products.sort(

                (a, b) => b.createdAt - a.createdAt

            );


        }



        return res.status(200).json({

            success: true,

            count: products.length,

            data: products

        });



    } catch (error) {


        return res.status(500).json({

            success: false,

            message: error.message

        });


    }


};




// ============================================
// 4. Update Product
// ============================================

const updateProduct = async (req, res) => {


    try {


        const product = await Product.findOne({


            _id: req.params.id,

            user: req.user._id


        });



        if (!product) {


            return res.status(404).json({


                success: false,

                message: "Product not found."


            });


        }



        const updatedProduct = await Product.findByIdAndUpdate(


            req.params.id,


            req.body,


            {

                new: true,

                runValidators: true

            }


        );



        return res.status(200).json({


            success: true,

            message: "Product updated successfully.",

            data: updatedProduct


        });



    } catch (error) {


        return res.status(500).json({


            success: false,

            message: error.message


        });


    }


};




// ============================================
// 5. Delete Product
// ============================================

const deleteProduct = async (req, res) => {


    try {


        const product = await Product.findOne({


            _id: req.params.id,

            user: req.user._id


        });



        if (!product) {


            return res.status(404).json({


                success: false,

                message: "Product not found."


            });


        }



        await product.deleteOne();



        return res.status(200).json({


            success: true,

            message: "Product deleted successfully."


        });



    } catch (error) {


        return res.status(500).json({


            success: false,

            message: error.message


        });


    }


};




// ============================================
// 6. Export Controller
// ============================================

module.exports = {


    addProduct,

    getProducts,

    updateProduct,

    deleteProduct


};