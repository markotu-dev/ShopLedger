/*************************************************
 * SHOPLEDGER
 * Module: Report Controller
 * File: reportController.js
 * Purpose: Handles reporting and analytics operations
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/


// ============================================
// 1. Import Required Packages
// ============================================
// ============================================
// Export Sales Excel
// ============================================

const exportSalesExcel = async (req, res) => {

    try {

        const sales = await Sale.find({

            user: req.user._id

        });

        const workbook = generateSalesExcel(sales);

        const buffer = require("xlsx").write(workbook, {

            type: "buffer",

            bookType: "xlsx"

        });

        res.setHeader(

            "Content-Type",

            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

        );

        res.setHeader(

            "Content-Disposition",

            "attachment; filename=sales-report.xlsx"

        );

        return res.send(buffer);

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// Import Models
const Sale = require("../Models/Sale");

const Purchase = require("../Models/Purchase");

const Product = require("../Models/Product");
// Import PDF Service
const {

    generateSalesPDF,

    generateInventoryPDF

} = require("../Services/pdfService");
// Import Excel Service
const {

    generateSalesExcel,

    generateInventoryExcel

} = require("../Services/excelService");


// ============================================
// 2. Generate Sales Report
// ============================================

const getSalesReport = async (req, res) => {

    try {


        const {

            startDate,

            endDate

        } = req.query;



        // Build filter

        let filter = {

            user: req.user._id

        };



        // Add date filtering if provided

        if (startDate && endDate) {

            filter.createdAt = {

                $gte: new Date(startDate),

                $lte: new Date(endDate)

            };

        }



        const sales = await Sale.find(filter)

        .populate("product", "name category")

        .sort({

            createdAt: -1

        });



        let totalRevenue = 0;

        let totalProfit = 0;



        sales.forEach((sale) => {


            totalRevenue += sale.totalAmount;


            totalProfit += sale.profit;


        });



        return res.status(200).json({

            success: true,

            report: {

                totalSales: sales.length,

                totalRevenue,

                totalProfit,

                sales

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
// 3. Generate Purchase Report
// ============================================

const getPurchaseReport = async (req, res) => {

    try {


        const purchases = await Purchase.find({

            user: req.user._id

        })

        .populate("product", "name category")

        .populate("supplier", "name")

        .sort({

            createdAt: -1

        });



        let totalPurchaseAmount = 0;



        purchases.forEach((purchase) => {


            totalPurchaseAmount += purchase.totalAmount;


        });



        return res.status(200).json({

            success: true,

            report: {

                totalPurchases: purchases.length,

                totalPurchaseAmount,

                purchases

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
// 4. Generate Inventory Report
// ============================================

const getInventoryReport = async (req, res) => {

    try {


        const products = await Product.find({

            user: req.user._id

        })

        .sort({

            quantity: 1

        });



        let inventoryValue = 0;



        products.forEach((product) => {


            inventoryValue +=

            product.costPrice * product.quantity;


        });



        const lowStockProducts = products.filter((product) => {


            return product.quantity <= product.lowStockLevel;


        });



        return res.status(200).json({

            success: true,

            report: {

                totalProducts: products.length,

                inventoryValue,

                lowStockCount: lowStockProducts.length,

                lowStockProducts,

                products

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
// Generate Sales PDF
// ============================================

const exportSalesPDF = async (req, res) => {

    try {


        const sales = await Sale.find({

            user: req.user._id

        });



        const pdf = generateSalesPDF(sales);



        res.setHeader(

            "Content-Type",

            "application/pdf"

        );


        res.setHeader(

            "Content-Disposition",

            "attachment; filename=sales-report.pdf"

        );


        return res.send(

            Buffer.from(

                pdf.output("arraybuffer")

            )

        );


    } catch (error) {


        return res.status(500).json({

            success: false,

            message: error.message

        });


    }

};

// ============================================
// Generate Inventory PDF
// ============================================

const exportInventoryPDF = async (req, res) => {

    try {


        const products = await Product.find({

            user: req.user._id

        });



        const pdf = generateInventoryPDF(products);



        res.setHeader(

            "Content-Type",

            "application/pdf"

        );


        res.setHeader(

            "Content-Disposition",

            "attachment; filename=inventory-report.pdf"

        );


        return res.send(

            Buffer.from(

                pdf.output("arraybuffer")

            )

        );


    } catch (error) {


        return res.status(500).json({

            success: false,

            message: error.message

        });


    }

};

// ============================================
// 5. Export Controller
// ============================================
module.exports = {

    getSalesReport,

    getPurchaseReport,

    getInventoryReport,

    exportSalesPDF,

    exportInventoryPDF,

    exportSalesExcel,

    exportInventoryExcel

};


// ============================================
// Export Inventory Excel
// ============================================

const exportInventoryExcel = async (req, res) => {

    try {

        const products = await Product.find({

            user: req.user._id

        });

        const workbook = generateInventoryExcel(products);

        const buffer = require("xlsx").write(workbook, {

            type: "buffer",

            bookType: "xlsx"

        });

        res.setHeader(

            "Content-Type",

            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

        );

        res.setHeader(

            "Content-Disposition",

            "attachment; filename=inventory-report.xlsx"

        );

        return res.send(buffer);

    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};