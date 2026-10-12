/*************************************************
 * SHOPLEDGER
 * Module: Report Routes
 * File: reportRoutes.js
 * Purpose: Handles report endpoints
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


// Import Report Controller
const {

    getSalesReport,

    getPurchaseReport,

    getInventoryReport,

    exportSalesPDF,

    exportInventoryPDF,

    exportSalesExcel,

    exportInventoryExcel

} = require("../Controllers/reportController");


// Import Authentication Middleware
const {

    protect

} = require("../Middleware/authMiddleware");



// ============================================
// 2. Report Routes
// ============================================


/**
 * @route   GET /api/reports/sales
 * @desc    Generate sales report
 * @access  Private
 */
router.get(

    "/sales",

    protect,

    getSalesReport

);



/**
 * @route   GET /api/reports/purchases
 * @desc    Generate purchase report
 * @access  Private
 */
router.get(

    "/purchases",

    protect,

    getPurchaseReport

);



/**
 * @route   GET /api/reports/inventory
 * @desc    Generate inventory report
 * @access  Private
 */
router.get(

    "/inventory",

    protect,

    getInventoryReport

);



// ============================================
// 3. Export Router
// ============================================

module.exports = router;
// ============================================
// Excel Export Routes
// ============================================

/**
 * @route   GET /api/reports/excel/sales
 * @desc    Download Sales Excel Report
 * @access  Private
 */
router.get(

    "/excel/sales",

    protect,

    exportSalesExcel

);


/**
 * @route   GET /api/reports/excel/inventory
 * @desc    Download Inventory Excel Report
 * @access  Private
 */
router.get(

    "/excel/inventory",

    protect,

    exportInventoryExcel

);