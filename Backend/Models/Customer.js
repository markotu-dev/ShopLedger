/*************************************************
 * SHOPLEDGER
 * Module: Customer Model
 * File: Customer.js
 * Purpose: Defines the Customer schema
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/


// ============================================
// 1. Import Required Packages
// ============================================

// Import Mongoose
const mongoose = require("mongoose");


// ============================================
// 2. Create Customer Schema
// ============================================

const customerSchema = new mongoose.Schema(

    {

        // Owner of this customer
        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        // Customer's full name
        name: {

            type: String,

            required: true,

            trim: true

        },


        // Phone number
        phone: {

            type: String,

            default: ""

        },


        // Email address
        email: {

            type: String,

            default: "",

            lowercase: true,

            trim: true

        },


        // Home or business address
        address: {

            type: String,

            default: ""

        },


        // Additional notes
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

    "Customer",

    customerSchema

);