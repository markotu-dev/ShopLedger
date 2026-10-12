/*************************************************
 * SHOPLEDGER
 * Module: Supplier Routes
 * File: supplierRoutes.js
 * Purpose: Handles supplier endpoints
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


// Import Supplier Controller
const {

    createSupplier,

    getSuppliers,

    getSupplier,

    updateSupplier,

    deleteSupplier

} = require("../Controllers/supplierController");


// Import Authentication Middleware
const {

    protect

} = require("../Middleware/authMiddleware");


// ============================================
// 2. Supplier Routes
// ============================================

/**
 * @route   POST /api/suppliers
 * @desc    Create a new supplier
 * @access  Private
 */
router.post(

    "/",

    protect,

    createSupplier

);


/**
 * @route   GET /api/suppliers
 * @desc    Get all suppliers
 * @access  Private
 */
router.get(

    "/",

    protect,

    getSuppliers

);


/**
 * @route   GET /api/suppliers/:id
 * @desc    Get single supplier
 * @access  Private
 */
router.get(

    "/:id",

    protect,

    getSupplier

);


/**
 * @route   PUT /api/suppliers/:id
 * @desc    Update supplier
 * @access  Private
 */
router.put(

    "/:id",

    protect,

    updateSupplier

);


/**
 * @route   DELETE /api/suppliers/:id
 * @desc    Delete supplier
 * @access  Private
 */
router.delete(

    "/:id",

    protect,

    deleteSupplier

);


// ============================================
// 3. Export Router
// ============================================

module.exports = router;