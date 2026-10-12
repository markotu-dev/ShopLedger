/*************************************************
 * SHOPLEDGER
 * Module: Product Routes
 * File: productRoutes.js
 * Purpose: Handles product endpoints
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/

// ============================================
// 1. Import Required Packages
// ============================================

const express = require("express");

const router = express.Router();

const {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require("../Controllers/productController");

const {
    protect
} = require("../Middleware/authMiddleware");

// Import Upload Middleware
const upload = require("../Middleware/uploadMiddleware");

// ============================================
// 2. Product Routes
// ============================================

router.post(

    "/",

    protect,

    upload.single("image"),

    addProduct

);

/**
 * @route GET /api/products
 */
router.get("/", protect, getProducts);

/**
 * @route PUT /api/products/:id
 */
router.put("/:id", protect, updateProduct);

/**
 * @route DELETE /api/products/:id
 */
router.delete("/:id", protect, deleteProduct);


// ============================================
// 3. Export Router
// ============================================

module.exports = router;