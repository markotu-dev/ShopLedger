/*************************************************
 * SHOPLEDGER
 * Module: Purchase Model
 * File: Purchase.js
 * Purpose: Defines the Purchase schema
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/

// ============================================
// 1. Import Required Packages
// ============================================

const mongoose = require("mongoose");


// ============================================
// 2. Create Purchase Schema
// ============================================

const purchaseSchema = new mongoose.Schema(

    {

        // Owner
        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        // Purchased Product
        product: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Product",

            required: true

        },


        // Supplier
        supplier: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Supplier",

            required: true

        },


        // Quantity Purchased
        quantityPurchased: {

            type: Number,

            required: true,

            min: 1

        },


        // Cost Price Per Unit
        costPrice: {

            type: Number,

            required: true

        },


        // Total Purchase Amount
        totalAmount: {

            type: Number,

            required: true

        },


        // Optional Notes
        notes: {

            type: String,

            default: ""

        }

    },

    {

        timestamps: true

    }

);


// ============================================
// 3. Export Model
// ============================================

module.exports = mongoose.model(

    "Purchase",

    purchaseSchema

);