/*************************************************
 * SHOPLEDGER
 * Module: Upload Middleware
 * File: uploadMiddleware.js
 * Purpose: Handles file uploads using Multer
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/


// ============================================
// 1. Import Required Packages
// ============================================

// Import Multer
const multer = require("multer");

// Import Path module
const path = require("path");


// ============================================
// 2. Configure Storage
// ============================================

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(

            null,

            "uploads/products"

        );

    },


    filename: function (req, file, cb) {


        const uniqueName =

            Date.now() +

            "-" +

            file.originalname.replace(/\s+/g, "-");


        cb(

            null,

            uniqueName

        );


    }

});


// ============================================
// 3. File Filter
// ============================================

const fileFilter = (req, file, cb) => {


    const allowedTypes = [

        "image/jpeg",

        "image/png",

        "image/jpg",

        "image/webp"

    ];



    if (allowedTypes.includes(file.mimetype)) {


        cb(

            null,

            true

        );


    } else {


        cb(

            new Error(

                "Only image files are allowed."

            ),

            false

        );


    }


};



// ============================================
// 4. Configure Multer Upload
// ============================================

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});



// ============================================
// 5. Export Middleware
// ============================================

module.exports = upload;