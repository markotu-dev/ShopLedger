/*************************************************
 * SHOPLEDGER
 * Module: Authentication Routes
 * File: authRoutes.js
 * Purpose: Handles authentication endpoints
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/

// ============================================
// 1. Import Required Packages
// ============================================

// Import Express
const express = require("express");

// Create a router object
const router = express.Router();

// Import Authentication Controller
const {
    registerUser,
    loginUser
} = require("../Controllers/authController");
// Import Authentication Middleware
const { protect } = require("../Middleware/authMiddleware");


// ============================================
// 2. Authentication Routes
// ============================================

/**
 * @route   POST /api/auth/register
 * @desc    Register a new ShopLedger user
 * @access  Public
 */
router.post("/register", registerUser);


/**
 * @route   POST /api/auth/login
 * @desc    Login an existing ShopLedger user
 * @access  Public
 */
router.post("/login", loginUser);
/**
 * @route   GET /api/auth/profile
 * @desc    Protected profile route
 * @access  Private
 */
router.get("/profile", protect, (req, res) => {

    return res.status(200).json({

        success: true,

        message: "Protected route accessed successfully.",

        user: req.user

    });

});


// ============================================
// 3. Export Router
// ============================================

module.exports = router;