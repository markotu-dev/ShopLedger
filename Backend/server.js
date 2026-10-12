/*************************************************
 * SHOPLEDGER
 * Module: Server
 * File: server.js
 * Purpose: Start the ShopLedger server
 * Author: Mark Otu
 * Date Created: July 2026
 * Last Updated: July 2026
 *************************************************/

// ============================================
// 1. Load Environment Variables
// ============================================

// Load variables from the .env file
require("dotenv").config();

// ============================================
// 2. Import Required Files
// ============================================

// Import the Express application
const app = require("./app");

// Import the MongoDB connection function
const connectDatabase = require("./Config/database");


// ============================================
// 3. Set the Server Port
// ============================================

// Use the port from the .env file
// If none exists, default to 5000
const PORT = process.env.PORT || 5000;


// ============================================
// 4. Start the Application
// ============================================

/**
 * Starts the ShopLedger application.
 */
const startServer = async () => {

    try {

        // Connect to MongoDB first
        await connectDatabase();

        // Start the Express server only after the database is connected
        app.listen(PORT, () => {

            console.log("========================================");
            console.log("🚀 ShopLedger Server Started Successfully");
            console.log(`🌐 Running at: http://localhost:${PORT}`);
            console.log(`📅 Environment: ${process.env.NODE_ENV}`);
            console.log("========================================");

        });

    } catch (error) {

        console.error("Application failed to start.");
        console.error(error);

    }

};


// Start the application
startServer();