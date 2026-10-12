/*************************************************
 * SHOPLEDGER
 * File: app.js
 * Purpose: Configure the Express application
 * Author: Mark Otu
 *************************************************/


// ============================================
// 1. Import Required Packages
// ============================================

// Import Express framework
const express = require("express");

// Import Helmet security middleware
const helmet = require("helmet");

// Import CORS
const cors = require("cors");

// Import Morgan request logger
const morgan = require("morgan");

// Import Path
const path = require("path");


// ============================================
// 2. Import Application Routes
// ============================================

// Authentication Routes
const authRoutes = require("./Routes/authRoutes");

// Product Routes
const productRoutes = require("./Routes/productRoutes");

// Customer Routes
const customerRoutes = require("./Routes/customerRoutes");

// Supplier Routes
const supplierRoutes = require("./Routes/supplierRoutes");

// Purchase Routes
const purchaseRoutes = require("./Routes/purchaseRoutes");

// Sales Routes
const saleRoutes = require("./Routes/saleRoutes");

// Dashboard Routes
const dashboardRoutes = require("./Routes/dashboardRoutes");

// Report Routes
const reportRoutes = require("./Routes/reportRoutes");


// ============================================
// 3. Create Express Application
// ============================================

const app = express();


// ============================================
// 4. Register Global Middleware
// ============================================

// Security headers
app.use(helmet());

// Allow frontend communication
app.use(cors());

// Accept JSON requests
app.use(express.json());

// Accept form data
app.use(express.urlencoded({ extended: true }));

// HTTP request logger
app.use(morgan("dev"));

// Serve uploaded product images
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);


// ============================================
// 5. Register Application Routes
// ============================================

// Authentication Routes
app.use("/api/auth", authRoutes);

// Product Routes
app.use("/api/products", productRoutes);

// Customer Routes
app.use("/api/customers", customerRoutes);

// Supplier Routes
app.use("/api/suppliers", supplierRoutes);

// Purchase Routes
app.use("/api/purchases", purchaseRoutes);

// Sales Routes
app.use("/api/sales", saleRoutes);

// Dashboard Routes
app.use("/api/dashboard", dashboardRoutes);

// Report Routes
app.use("/api/reports", reportRoutes);


// ============================================
// 6. Home Route
// ============================================

app.get("/", (req, res) => {

    res.send("Welcome to ShopLedger API");

});


// ============================================
// 7. Export Application
// ============================================

module.exports = app;