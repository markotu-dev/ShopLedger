/*************************************************
 * SHOPLEDGER
 * Module: Authentication Controller
 * File: authController.js
 * Purpose: Handles user registration and login
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/

// ============================================
// 1. Import Required Packages
// ============================================

// Import bcrypt for password encryption
const bcrypt = require("bcrypt");

// Import JSON Web Token package
const jwt = require("jsonwebtoken");

// Import the User model
const User = require("../Models/User");


// ============================================
// 2. Register New User
// ============================================

/**
 * Registers a new ShopLedger user.
 */
const registerUser = async (req, res) => {

    try {

        // Extract user information from the request body
        const {
            name,
            email,
            password,
            businessName
        } = req.body;


        // ============================================
        // Validate Required Fields
        // ============================================

        if (!name || !email || !password || !businessName) {

            return res.status(400).json({

                success: false,
                message: "Please fill in all required fields."

            });

        }


        // ============================================
        // Check if Email Already Exists
        // ============================================

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(409).json({

                success: false,
                message: "An account with this email already exists."

            });

        }


        // ============================================
        // Hash the Password
        // ============================================

        const hashedPassword = await bcrypt.hash(password, 10);


        // ============================================
        // Create New User
        // ============================================

        const newUser = await User.create({

            name,
            email,
            password: hashedPassword,
            businessName

        });


        // ============================================
        // Generate JWT Token
        // ============================================

        const token = jwt.sign(

            {
                id: newUser._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }

        );


        // ============================================
        // Registration Successful
        // ============================================

        return res.status(201).json({

            success: true,

            message: "User registered successfully.",

            token,

            data: {

                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                businessName: newUser.businessName

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
// 3. Login User
// ============================================

/**
 * Logs in an existing ShopLedger user.
 */
const loginUser = async (req, res) => {

    try {console.log("✅ LOGIN CONTROLLER EXECUTED");

        // Extract login details
        const { email, password } = req.body;


        // ============================================
        // Validate Input
        // ============================================

        if (!email || !password) {

            return res.status(400).json({

                success: false,
                message: "Please provide both email and password."

            });

        }


        // ============================================
        // Find User
        // ============================================

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({

                success: false,
                message: "Invalid email or password."

            });

        }


        // ============================================
        // Compare Password
        // ============================================

        const passwordMatch = await bcrypt.compare(

            password,
            user.password

        );

        if (!passwordMatch) {

            return res.status(401).json({

                success: false,
                message: "Invalid email or password."

            });

        }


        // ============================================
        // Generate JWT Token
        // ============================================

        const token = jwt.sign(

            {
                id: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }

        );


        // ============================================
        // Login Successful
        // ============================================

        return res.status(200).json({

            success: true,

            message: "Login successful.",

            token,

            data: {

                id: user._id,
                name: user.name,
                email: user.email,
                businessName: user.businessName

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
// 4. Export Controller Functions
// ============================================

module.exports = {

    registerUser,
    loginUser

};