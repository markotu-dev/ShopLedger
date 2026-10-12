/*************************************************
 * SHOPLEDGER
 * Module: Sales Routes
 * File: saleRoutes.js
 * Purpose: Handles sales endpoints
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/


// ============================================
// 1. Import Required Packages
// ============================================

const express = require("express");

const router = express.Router();


const {

    createSale,

    getSales,

    getSingleSale,

    deleteSale,

    getSalesStats

} = require("../Controllers/saleController");



const {

    protect

} = require("../Middleware/authMiddleware");



// ============================================
// 2. Sales Routes
// ============================================



// Create sale

router.post(

    "/",

    protect,

    createSale

);



// Get all sales

router.get(

    "/",

    protect,

    getSales

);



// Get single sale
/**
 * @route   GET /api/sales/stats
 * @desc    Get sales statistics
 * @access  Private
 */
router.get(

    "/stats",

    protect,

    getSalesStats

);
router.get(

    "/:id",

    protect,

    getSingleSale

);



// Delete sale

router.delete(

    "/:id",

    protect,

    deleteSale

);



// ============================================
// 3. Export Router
// ============================================

module.exports = router;