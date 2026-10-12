/*************************************************
 * SHOPLEDGER
 * Module: Database Configuration
 * File: database.js
 * Purpose: Connect ShopLedger to MongoDB
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/

// ============================================
// 1. Import Required Packages
// ============================================

// Import the Mongoose library
const mongoose = require("mongoose");


// ============================================
// 2. Create Database Connection Function
// ============================================

/**
 * Connects ShopLedger to MongoDB.
 *
 * @returns {Promise<void>}
 * @throws {Error} If the connection fails.
 */
const connectDatabase = async () => {

    try {

        // Attempt to connect to MongoDB using the URI from the .env file
        const connection = await mongoose.connect(process.env.MONGODB_URI);

        console.log("========================================");
        console.log("✅ MongoDB Connected Successfully");
        console.log(`📦 Database Host: ${connection.connection.host}`);
        console.log("========================================");

    } catch (error) {

        console.error("========================================");
        console.error("❌ MongoDB Connection Failed");
        console.error(error);
        console.error("========================================");

        // Stop the application if the database connection fails
        process.exit(1);

    }

};


// ============================================
// 3. Export the Connection Function
// ============================================

// Make the function available to other files
module.exports = connectDatabase;