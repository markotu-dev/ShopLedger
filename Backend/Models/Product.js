/*************************************************
 * SHOPLEDGER
 * Module: Product Model
 * File: Product.js
 * Purpose: Defines the Product schema
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/

// ============================================
// 1. Import Required Packages
// ============================================

const mongoose = require("mongoose");


// ============================================
// 2. Create Product Schema
// ============================================

const productSchema = new mongoose.Schema(

    {

        // Product Owner
        user: {

            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true

        },

        // Product Name
        name: {

            type: String,
            required: true,
            trim: true

        },

        // Product Category
        category: {

            type: String,
            default: "General"

        },

        // Selling Price
        sellingPrice: {

            type: Number,
            required: true,
            min: 0

        },

        // Cost Price
        costPrice: {

            type: Number,
            required: true,
            min: 0

        },

        // Quantity Available
        quantity: {

            type: Number,
            required: true,
            min: 0

        },

        // Low Stock Alert Level
        lowStockLevel: {

            type: Number,
            default: 5,
            min: 0

        },

        // Product Description
        description: {

        image: {
    type: String,
    default: ""
},

        }

    },

    {

        timestamps: true

    }

);


// ============================================
// 3. Export Product Model
// ============================================

module.exports = mongoose.model("Product", productSchema);