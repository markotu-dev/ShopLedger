/*************************************************
 * SHOPLEDGER
 * Module: Supplier Model
 * File: Supplier.js
 * Purpose: Defines the Supplier schema
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/

// ============================================
// 1. Import Required Packages
// ============================================

const mongoose = require("mongoose");


// ============================================
// 2. Create Supplier Schema
// ============================================

const supplierSchema = new mongoose.Schema(

    {

        // Owner of this supplier
        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },


        // Supplier name
        name: {

            type: String,

            required: true,

            trim: true

        },


        // Contact person
        contactPerson: {

            type: String,

            default: ""

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


        // Address
        address: {

            type: String,

            default: ""

        },


        // Notes
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

    "Supplier",

    supplierSchema

);