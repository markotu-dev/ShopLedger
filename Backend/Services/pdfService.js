/*************************************************
 * SHOPLEDGER
 * Module: PDF Service
 * File: pdfService.js
 * Purpose: Generates PDF reports
 * Author: Mark Otu
 * Date Created: July 2026
 *************************************************/


// ============================================
// 1. Import Required Packages
// ============================================

const jsPDF = require("jspdf");

require("jspdf-autotable");



// ============================================
// 2. Generate Sales PDF
// ============================================

const generateSalesPDF = (sales) => {


    const doc = new jsPDF();



    // Title

    doc.setFontSize(18);

    doc.text(

        "ShopLedger Sales Report",

        14,

        20

    );



    // Date

    doc.setFontSize(10);

    doc.text(

        `Generated: ${new Date().toLocaleDateString()}`,

        14,

        30

    );



    const tableData = sales.map((sale) => [


        sale.productName,

        sale.quantitySold,

        sale.totalAmount,

        sale.profit


    ]);



    doc.autoTable({

        startY: 40,

        head: [

            [

                "Product",

                "Quantity",

                "Amount",

                "Profit"

            ]

        ],


        body: tableData


    });



    return doc;

};



// ============================================
// 3. Generate Inventory PDF
// ============================================

const generateInventoryPDF = (products) => {


    const doc = new jsPDF();



    doc.setFontSize(18);


    doc.text(

        "ShopLedger Inventory Report",

        14,

        20

    );



    const tableData = products.map((product) => [


        product.name,

        product.category,

        product.quantity,

        product.sellingPrice


    ]);



    doc.autoTable({

        startY: 35,


        head: [

            [

                "Product",

                "Category",

                "Stock",

                "Price"

            ]

        ],


        body: tableData


    });



    return doc;


};



// ============================================
// 4. Export Service
// ============================================

module.exports = {


    generateSalesPDF,

    generateInventoryPDF


};