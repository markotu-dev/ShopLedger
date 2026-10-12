/*************************************************
 * SHOPLEDGER
 * Module: Excel Service
 * File: excelService.js
 * Purpose: Generates Excel reports
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/

// ============================================
// 1. Import Required Packages
// ============================================

const XLSX = require("xlsx");


// ============================================
// 2. Generate Sales Excel
// ============================================

const generateSalesExcel = (sales) => {

    const worksheet = XLSX.utils.json_to_sheet(

        sales.map((sale) => ({

            Product: sale.productName,
            Quantity: sale.quantitySold,
            SellingPrice: sale.sellingPrice,
            CostPrice: sale.costPrice,
            TotalAmount: sale.totalAmount,
            Profit: sale.profit

        }))

    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

        workbook,
        worksheet,
        "Sales Report"

    );

    return workbook;

};


// ============================================
// 3. Generate Inventory Excel
// ============================================

const generateInventoryExcel = (products) => {

    const worksheet = XLSX.utils.json_to_sheet(

        products.map((product) => ({

            Product: product.name,
            Category: product.category,
            Quantity: product.quantity,
            SellingPrice: product.sellingPrice,
            CostPrice: product.costPrice,
            LowStockLevel: product.lowStockLevel

        }))

    );

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

        workbook,
        worksheet,
        "Inventory Report"

    );

    return workbook;

};


// ============================================
// 4. Export Service
// ============================================

module.exports = {

    generateSalesExcel,

    generateInventoryExcel

};