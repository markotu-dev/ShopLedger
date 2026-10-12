/*************************************************
 * SHOPLEDGER
 * Module: Sale Model
 * File: Sale.js
 * Purpose: Defines the Sale schema
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/

// ============================================
// 1. Import Required Packages
// ============================================

// Import Mongoose
const mongoose = require("mongoose");


// ============================================
// 2. Create Sale Schema
// ============================================

const saleSchema = new mongoose.Schema(

    {

        // Owner of the sale
        user: {

            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true

        },

        // Product sold
        product: {

            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true

        },

        // Product name
        productName: {

            type: String,
            required: true,
            trim: true

        },

        // Quantity sold
        quantitySold: {

            type: Number,
            required: true,
            min: 1

        },

        // Selling price per unit
        sellingPrice: {

            type: Number,
            required: true,
            min: 0

        },

        // Cost price per unit
        costPrice: {

            type: Number,
            required: true,
            min: 0

        },

        // Profit from the sale
        profit: {

            type: Number,
            required: true,
            min: 0

        },

        // Total amount of the sale
        totalAmount: {

            type: Number,
            required: true,
            min: 0

        }

    },

    {

        timestamps: true

    }

);


// ============================================
// 3. Export Sale Model
// ============================================

module.exports = mongoose.model("Sale", saleSchema);