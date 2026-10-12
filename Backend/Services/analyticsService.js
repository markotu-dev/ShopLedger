/*************************************************
 * SHOPLEDGER
 * Module: Analytics Service
 * File: analyticsService.js
 * Purpose: Provides dashboard analytics
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/

// ============================================
// Calculate Sales Summary
// ============================================

const calculateSalesSummary = (sales) => {

    const totalSales = sales.reduce(

        (sum, sale) => sum + sale.totalAmount,

        0

    );

    const totalProfit = sales.reduce(

        (sum, sale) => sum + sale.profit,

        0

    );

    return {

        totalSales,

        totalProfit,

        totalTransactions: sales.length

    };

};


// ============================================
// Calculate Inventory Summary
// ============================================

const calculateInventorySummary = (products) => {

    const totalProducts = products.length;

    const lowStockProducts = products.filter(

        product => product.quantity <= product.lowStockLevel

    ).length;

    return {

        totalProducts,

        lowStockProducts

    };

};


// ============================================
// Export Service
// ============================================

module.exports = {

    calculateSalesSummary,

    calculateInventorySummary

};