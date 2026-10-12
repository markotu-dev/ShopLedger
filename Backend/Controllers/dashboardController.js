/*************************************************
 * SHOPLEDGER
 * Module: Dashboard Controller
 * File: dashboardController.js
 * Purpose: Handles dashboard analytics
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/


// ============================================
// 1. Import Required Packages
// ============================================

// Import Sale model
const Sale = require("../Models/Sale");

// Import Product model
const Product = require("../Models/Product");

// Import Purchase model
const Purchase = require("../Models/Purchase");

// Import Analytics Service
const {

    calculateSalesSummary,

    calculateInventorySummary

} = require("../Services/analyticsService");


// ============================================
// 2. Get Dashboard Statistics
// ============================================

const getDashboardStats = async (req, res) => {

    try {

        // ============================================
        // Get User Sales
        // ============================================

        const sales = await Sale.find({

            user: req.user._id

        });


        // ============================================
        // Get User Products
        // ============================================

        const products = await Product.find({

            user: req.user._id

        });


        // ============================================
        // Get User Purchases
        // ============================================

        const purchases = await Purchase.find({

            user: req.user._id

        });


        // ============================================
        // Calculate Sales Summary
        // ============================================

        const salesSummary = calculateSalesSummary(

            sales

        );


        // ============================================
        // Calculate Inventory Summary
        // ============================================

        const inventorySummary = calculateInventorySummary(

            products

        );


        // ============================================
        // Calculate Purchase Total
        // ============================================

        const totalPurchases = purchases.reduce(

            (sum, purchase) =>

                sum + (purchase.totalAmount || 0),

            0

        );


        // ============================================
        // Calculate Inventory Value
        // ============================================

        const inventoryValue = products.reduce(

            (sum, product) =>

                sum +

                (

                    (product.costPrice || 0) *

                    (product.quantity || 0)

                ),

            0

        );


        // ============================================
        // Return Dashboard Statistics
        // ============================================

        return res.status(200).json({

            success: true,

            data: {

                totalSales: salesSummary.totalSales,

                totalProfit: salesSummary.totalProfit,

                totalTransactions:
                    salesSummary.totalTransactions,

                totalProducts:
                    inventorySummary.totalProducts,

                lowStockProducts:
                    inventorySummary.lowStockProducts,

                totalPurchases,

                inventoryValue

            }

        });


    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ============================================
// 3. Export Controller
// ============================================

module.exports = {

    getDashboardStats

};