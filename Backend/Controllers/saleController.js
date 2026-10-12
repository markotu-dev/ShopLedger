/*************************************************
 * SHOPLEDGER
 * Module: Sales Controller
 * File: saleController.js
 * Purpose: Handles sales operations
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/


// ============================================
// 1. Import Required Packages
// ============================================

const Sale = require("../Models/Sale");

const Product = require("../Models/Product");



// ============================================
// 2. Record a New Sale
// ============================================

const createSale = async (req, res) => {

    try {

        const {

            productId,
            quantitySold

        } = req.body;


        if (!productId || !quantitySold) {

            return res.status(400).json({

                success: false,
                message: "Please provide product and quantity."

            });

        }


        const product = await Product.findOne({

            _id: productId,
            user: req.user._id

        });


        if (!product) {

            return res.status(404).json({

                success: false,
                message: "Product not found."

            });

        }


        if (quantitySold > product.quantity) {

            return res.status(400).json({

                success: false,
                message: "Insufficient stock."

            });

        }


        const totalAmount =
            product.sellingPrice * quantitySold;


        const profit =
            (product.sellingPrice - product.costPrice)
            * quantitySold;



        product.quantity -= quantitySold;

        await product.save();



        const sale = await Sale.create({

            user: req.user._id,

            product: product._id,

            productName: product.name,

            quantitySold,

            sellingPrice: product.sellingPrice,

            costPrice: product.costPrice,

            totalAmount,

            profit

        });



        return res.status(201).json({

            success: true,

            message: "Sale recorded successfully.",

            data: sale

        });


    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};



// ============================================
// 3. Get All Sales
// ============================================

const getSales = async (req, res) => {

    try {


        const sales = await Sale.find({

            user: req.user._id

        })

        .populate("product", "name category")

        .sort({

            createdAt: -1

        });



        return res.status(200).json({

            success: true,

            count: sales.length,

            data: sales

        });


    } catch (error) {


        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};



// ============================================
// 4. Get Single Sale
// ============================================

const getSingleSale = async (req, res) => {

    try {


        const sale = await Sale.findOne({

            _id: req.params.id,

            user: req.user._id

        })

        .populate("product", "name category");



        if (!sale) {

            return res.status(404).json({

                success: false,

                message: "Sale not found."

            });

        }



        return res.status(200).json({

            success: true,

            data: sale

        });



    } catch (error) {

        return res.status(500).json({

            success: false,
            message: error.message

        });

    }

};



// ============================================
// 5. Delete Sale
// ============================================

const deleteSale = async (req, res) => {

    try {


        const sale = await Sale.findOne({

            _id: req.params.id,

            user: req.user._id

        });



        if (!sale) {

            return res.status(404).json({

                success: false,

                message: "Sale not found."

            });

        }



        await sale.deleteOne();



        return res.status(200).json({

            success: true,

            message: "Sale deleted successfully."

        });



    } catch (error) {


        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ============================================
// 6. Get Sales Statistics
// ============================================

const getSalesStats = async (req, res) => {

    try {


        const sales = await Sale.find({

            user: req.user._id

        });



        // Total sales count

        const totalSales = sales.length;



        // Total revenue

        const totalRevenue = sales.reduce(

            (sum, sale) => sum + sale.totalAmount,

            0

        );



        // Total profit

        const totalProfit = sales.reduce(

            (sum, sale) => sum + sale.profit,

            0

        );



        // Total products sold

        const productsSold = sales.reduce(

            (sum, sale) => sum + sale.quantitySold,

            0

        );



        // Today's date

        const today = new Date();

        today.setHours(0,0,0,0);



        const todaySales = sales

            .filter((sale) => sale.createdAt >= today)

            .reduce(

                (sum, sale) => sum + sale.totalAmount,

                0

            );



        // Current month

        const monthStart = new Date(

            today.getFullYear(),

            today.getMonth(),

            1

        );



        const monthlySales = sales

            .filter((sale) => sale.createdAt >= monthStart)

            .reduce(

                (sum, sale) => sum + sale.totalAmount,

                0

            );



        return res.status(200).json({

            success: true,

            data: {

                totalSales,

                totalRevenue,

                totalProfit,

                todaySales,

                monthlySales,

                productsSold

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
// 6. Export Controller
// ============================================

module.exports = {

    createSale,

    getSales,

    getSingleSale,

    deleteSale,

    getSalesStats

};