/*************************************************
 * SHOPLEDGER
 * Module: Purchase Controller
 * File: purchaseController.js
 * Purpose: Handles purchase operations
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/

// ============================================
// 1. Import Required Packages
// ============================================

// Import Purchase model
const Purchase = require("../Models/Purchase");

// Import Product model
const Product = require("../Models/Product");

// Import Supplier model
const Supplier = require("../Models/Supplier");


// ============================================
// 2. Record a New Purchase
// ============================================

const createPurchase = async (req, res) => {

    try {

        const {

            productId,
            supplierId,
            quantityPurchased,
            costPrice,
            notes

        } = req.body;


        // ============================================
        // Validate Required Fields
        // ============================================

        if (

            !productId ||
            !supplierId ||
            !quantityPurchased ||
            costPrice === undefined

        ) {

            return res.status(400).json({

                success: false,
                message: "Please provide all required fields."

            });

        }


        // ============================================
        // Find Product
        // ============================================

        const product = await Product.findOne({

            _id: productId,
            user: req.user._id

        });

        if (!product) {

            return res.status(404).json({

                success: false,
                message: "Product not found."

            });

        }


        // ============================================
        // Find Supplier
        // ============================================

        const supplier = await Supplier.findOne({

            _id: supplierId,
            user: req.user._id

        });

        if (!supplier) {

            return res.status(404).json({

                success: false,
                message: "Supplier not found."

            });

        }


        // ============================================
        // Calculate Total Amount
        // ============================================

        const totalAmount = quantityPurchased * costPrice;


        // ============================================
        // Increase Product Stock
        // ============================================

        product.quantity += quantityPurchased;

        // Update cost price to latest purchase price
        product.costPrice = costPrice;

        await product.save();


        // ============================================
        // Save Purchase
        // ============================================

        const purchase = await Purchase.create({

            user: req.user._id,

            product: product._id,

            supplier: supplier._id,

            quantityPurchased,

            costPrice,

            totalAmount,

            notes

        });


        return res.status(201).json({

            success: true,

            message: "Purchase recorded successfully.",

            data: purchase

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// ============================================
// 3. Get All Purchases
// ============================================

const getPurchases = async (req, res) => {

    try {

        const purchases = await Purchase.find({

            user: req.user._id

        })

        .populate("product", "name category")

        .populate("supplier", "name contactPerson")

        .sort({

            createdAt: -1

        });


        return res.status(200).json({

            success: true,

            count: purchases.length,

            data: purchases

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// ============================================
// 4. Get Single Purchase
// ============================================

const getSinglePurchase = async (req, res) => {

    try {

        const purchase = await Purchase.findOne({

            _id: req.params.id,

            user: req.user._id

        })

        .populate("product", "name category")

        .populate("supplier", "name contactPerson");


        if (!purchase) {

            return res.status(404).json({

                success: false,
                message: "Purchase not found."

            });

        }


        return res.status(200).json({

            success: true,

            data: purchase

        });

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// ============================================
// 5. Delete Purchase
// ============================================

const deletePurchase = async (req, res) => {

    try {

        const purchase = await Purchase.findOne({

            _id: req.params.id,

            user: req.user._id

        });

        if (!purchase) {

            return res.status(404).json({

                success: false,
                message: "Purchase not found."

            });

        }

        await purchase.deleteOne();

        return res.status(200).json({

            success: true,
            message: "Purchase deleted successfully."

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

    createPurchase,

    getPurchases,

    getSinglePurchase,

    deletePurchase

};