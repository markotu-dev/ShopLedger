/*************************************************
 * SHOPLEDGER
 * Module: Supplier Controller
 * File: supplierController.js
 * Purpose: Handles supplier operations
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/

// ============================================
// 1. Import Required Packages
// ============================================

// Import Supplier model
const Supplier = require("../Models/Supplier");


// ============================================
// 2. Create Supplier
// ============================================

const createSupplier = async (req, res) => {

    try {

        const {

            name,
            contactPerson,
            phone,
            email,
            address,
            notes

        } = req.body;


        // Validate required field

        if (!name) {

            return res.status(400).json({

                success: false,
                message: "Supplier name is required."

            });

        }


        // Create supplier

        const supplier = await Supplier.create({

            user: req.user._id,

            name,
            contactPerson,
            phone,
            email,
            address,
            notes

        });


        return res.status(201).json({

            success: true,

            message: "Supplier created successfully.",

            data: supplier

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ============================================
// 3. Get All Suppliers
// ============================================

const getSuppliers = async (req, res) => {

    try {

        const suppliers = await Supplier.find({

            user: req.user._id

        }).sort({

            createdAt: -1

        });


        return res.status(200).json({

            success: true,

            count: suppliers.length,

            data: suppliers

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ============================================
// 4. Get Single Supplier
// ============================================

const getSupplier = async (req, res) => {

    try {

        const supplier = await Supplier.findOne({

            _id: req.params.id,

            user: req.user._id

        });


        if (!supplier) {

            return res.status(404).json({

                success: false,

                message: "Supplier not found."

            });

        }


        return res.status(200).json({

            success: true,

            data: supplier

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ============================================
// 5. Update Supplier
// ============================================

const updateSupplier = async (req, res) => {

    try {

        const supplier = await Supplier.findOne({

            _id: req.params.id,

            user: req.user._id

        });


        if (!supplier) {

            return res.status(404).json({

                success: false,

                message: "Supplier not found."

            });

        }


        const updatedSupplier = await Supplier.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );


        return res.status(200).json({

            success: true,

            message: "Supplier updated successfully.",

            data: updatedSupplier

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ============================================
// 6. Delete Supplier
// ============================================

const deleteSupplier = async (req, res) => {

    try {

        const supplier = await Supplier.findOne({

            _id: req.params.id,

            user: req.user._id

        });


        if (!supplier) {

            return res.status(404).json({

                success: false,

                message: "Supplier not found."

            });

        }


        await supplier.deleteOne();


        return res.status(200).json({

            success: true,

            message: "Supplier deleted successfully."

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

    createSupplier,

    getSuppliers,

    getSupplier,

    updateSupplier,

    deleteSupplier

};