/*************************************************
 * SHOPLEDGER
 * Module: Authentication Middleware
 * File: authMiddleware.js
 * Purpose: Protects routes using JWT authentication
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/

// ============================================
// 1. Import Required Packages
// ============================================

// Import JSON Web Token package
const jwt = require("jsonwebtoken");

// Import the User model
const User = require("../Models/User");


// ============================================
// 2. Authentication Middleware
// ============================================

const protect = async (req, res, next) => {

    try {

        let token;

        // ============================================
        // Check Authorization Header
        // ============================================

        if (

            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")

        ) {

            // Extract token from header
            token = req.headers.authorization.split(" ")[1];

        }

        // ============================================
        // No Token Provided
        // ============================================

        if (!token) {

            return res.status(401).json({

                success: false,
                message: "Access denied. No token provided."

            });

        }

        // ============================================
        // Verify Token
        // ============================================

        const decoded = jwt.verify(

            token,
            process.env.JWT_SECRET

        );

        // ============================================
        // Find User
        // ============================================

        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {

            return res.status(401).json({

                success: false,
                message: "User not found."

            });

        }

        // Continue to the next middleware or controller
        next();

    } catch (error) {

        return res.status(401).json({

            success: false,
            message: "Invalid or expired token."

        });

    }

};


// ============================================
// 3. Export Middleware
// ============================================

module.exports = {

    protect

};