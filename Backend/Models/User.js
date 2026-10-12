/*************************************************
 * SHOPLEDGER
 * Module: User Model
 * File: User.js
 * Purpose: Defines the structure of users in MongoDB
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/


// ============================================
// 1. Import Required Packages
// ============================================


// Import mongoose to create MongoDB schemas
const mongoose = require("mongoose");



// ============================================
// 2. Create User Schema
// ============================================


// A schema defines the structure of data stored in MongoDB
const userSchema = new mongoose.Schema(


    {

        // User's full name
        name: {

            type: String,

            required: true,

            trim: true

        },


        // User email used for login
        email: {

            type: String,

            required: true,

            unique: true,

            lowercase: true,

            trim: true

        },


        // Encrypted user password
        password: {

            type: String,

            required: true

        },


        // User role in the system
        role: {

            type: String,

            enum: ["Admin", "Staff"],

            default: "Admin"

        },


        // Name of the user's business
        businessName: {

            type: String,

            required: true,

            trim: true

        }


    },

    {


        // Automatically creates createdAt and updatedAt fields
        timestamps: true


    }

);



// ============================================
// 3. Export User Model
// ============================================


// Makes this model available to other backend files
module.exports = mongoose.model("User", userSchema);