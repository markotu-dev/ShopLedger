/*************************************************
 * SHOPLEDGER
 * Module: Customer Routes
 * File: customerRoutes.js
 * Purpose: Handles customer endpoints
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


// Import Customer Controller
const {

    createCustomer,

    getCustomers,

    getCustomer,

    updateCustomer,

    deleteCustomer

} = require("../Controllers/customerController");


// Import Authentication Middleware
const {

    protect

} = require("../Middleware/authMiddleware");


// ============================================
// 2. Customer Routes
// ============================================

/**
 * @route   POST /api/customers
 * @desc    Create a new customer
 * @access  Private
 */
router.post(

    "/",

    protect,

    createCustomer

);


/**
 * @route   GET /api/customers
 * @desc    Get all customers
 * @access  Private
 */
router.get(

    "/",

    protect,

    getCustomers

);


/**
 * @route   GET /api/customers/:id
 * @desc    Get single customer
 * @access  Private
 */
router.get(

    "/:id",

    protect,

    getCustomer

);


/**
 * @route   PUT /api/customers/:id
 * @desc    Update customer
 * @access  Private
 */
router.put(

    "/:id",

    protect,

    updateCustomer

);


/**
 * @route   DELETE /api/customers/:id
 * @desc    Delete customer
 * @access  Private
 */
router.delete(

    "/:id",

    protect,

    deleteCustomer

);


// ============================================
// 3. Export Router
// ============================================

module.exports = router;