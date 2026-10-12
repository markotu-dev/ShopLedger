/*************************************************
 * SHOPLEDGER
 * Module: Dashboard Routes
 * File: dashboardRoutes.js
 * Purpose: Handles dashboard endpoints
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/


// ============================================
// 1. Import Required Packages
// ============================================

// Import Express
const express = require("express");

// Create Router
const router = express.Router();


// ============================================
// 2. Import Dashboard Controller
// ============================================

const {

    getDashboardStats

} = require("../Controllers/dashboardController");


// ============================================
// 3. Import Authentication Middleware
// ============================================

const {

    protect

} = require("../Middleware/authMiddleware");


// ============================================
// 4. Dashboard Routes
// ============================================

/**
 * @route   GET /api/dashboard
 * @desc    Get dashboard statistics
 * @access  Private
 */

router.get(

    "/",

    protect,

    getDashboardStats

);


// ============================================
// 5. Export Router
// ============================================

module.exports = router;