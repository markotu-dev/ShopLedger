/*************************************************
 * SHOPLEDGER
 * Module: Customer Controller
 * File: customerController.js
 * Purpose: Handles customer operations
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/

// ============================================
// 1. Import Required Packages
// ============================================

// Import Customer model
const Customer = require("../Models/Customer");


// ============================================
// 2. Add New Customer
// ============================================

const createCustomer = async (req, res) => {

    try {

        const {

            name,
            phone,
            email,
            address,
            notes

        } = req.body;


        // Validate required field

        if (!name) {

            return res.status(400).json({

                success: false,
                message: "Customer name is required."

            });

        }


        // Create customer

        const customer = await Customer.create({

            user: req.user._id,

            name,
            phone,
            email,
            address,
            notes

        });


        return res.status(201).json({

            success: true,

            message: "Customer created successfully.",

            data: customer

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ============================================
// 3. Get All Customers
// ============================================

const getCustomers = async (req, res) => {

    try {

        const customers = await Customer.find({

            user: req.user._id

        }).sort({

            createdAt: -1

        });


        return res.status(200).json({

            success: true,

            count: customers.length,

            data: customers

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ============================================
// 4. Get Single Customer
// ============================================

const getCustomer = async (req, res) => {

    try {

        const customer = await Customer.findOne({

            _id: req.params.id,

            user: req.user._id

        });


        if (!customer) {

            return res.status(404).json({

                success: false,

                message: "Customer not found."

            });

        }


        return res.status(200).json({

            success: true,

            data: customer

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ============================================
// 5. Update Customer
// ============================================

const updateCustomer = async (req, res) => {

    try {

        const customer = await Customer.findOne({

            _id: req.params.id,

            user: req.user._id

        });


        if (!customer) {

            return res.status(404).json({

                success: false,

                message: "Customer not found."

            });

        }


        const updatedCustomer = await Customer.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );


        return res.status(200).json({

            success: true,

            message: "Customer updated successfully.",

            data: updatedCustomer

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ============================================
// 6. Delete Customer
// ============================================

const deleteCustomer = async (req, res) => {

    try {

        const customer = await Customer.findOne({

            _id: req.params.id,

            user: req.user._id

        });


        if (!customer) {

            return res.status(404).json({

                success: false,

                message: "Customer not found."

            });

        }


        await customer.deleteOne();


        return res.status(200).json({

            success: true,

            message: "Customer deleted successfully."

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ============================================
// 7. Export Controller
// ============================================

module.exports = {

    createCustomer,

    getCustomers,

    getCustomer,

    updateCustomer,

    deleteCustomer

};