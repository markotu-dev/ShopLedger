/*************************************************
 * SHOPLEDGER
 * Module: Reports
 * File: reports.js
 * Purpose: Reports Management
 * Author: Mark Otu
 *************************************************/


// =============================================
// DOM ELEMENTS
// =============================================

const reportRevenue =
    document.getElementById("reportRevenue");

const reportSales =
    document.getElementById("reportSales");

const productsSold =
    document.getElementById("productsSold");

const customersServed =
    document.getElementById("customersServed");

const reportsTableBody =
    document.getElementById("reportsTableBody");

const inventoryReportBody =
    document.getElementById("inventoryReportBody");

const customerReportBody =
    document.getElementById("customerReportBody");

const reportSearch =
    document.getElementById("reportSearch");

const startDate =
    document.getElementById("startDate");

const endDate =
    document.getElementById("endDate");

const generateReport =
    document.getElementById("generateReport");

const exportPDF =
    document.getElementById("exportPDF");

const exportExcel =
    document.getElementById("exportExcel");



// =============================================
// SAMPLE DATA
// (Temporary until backend integration)
// =============================================

let salesReports = [

    {

        date:"08/07/2026",

        receipt:"SL-1001",

        customer:"Walk-in Customer",

        payment:"Cash",

        total:8500,

        status:"Completed"

    }

];



let inventoryReports = [

    {

        product:"Sample Product",

        category:"General",

        stock:120,

        lowStock:"No",

        status:"In Stock"

    }

];



let customerReports = [

    {

        name:"John Doe",

        purchases:5,

        spent:35000,

        status:"Active"

    }

];



// =============================================
// UPDATE SUMMARY CARDS
// =============================================

function updateSummaryCards(){

    const revenue = salesReports.reduce(

        (sum,item)=>sum+item.total,

        0

    );

    reportRevenue.textContent =
        "₦" + revenue.toLocaleString();

    reportSales.textContent =
        salesReports.length;

    productsSold.textContent =
        inventoryReports.length;

    customersServed.textContent =
        customerReports.length;

}

// =============================================
// RENDER SALES REPORT
// =============================================

function renderSalesReport(){

    if(!reportsTableBody) return;

    reportsTableBody.innerHTML = "";

    salesReports.forEach(report=>{

        reportsTableBody.innerHTML += `

        <tr>

            <td>${report.date}</td>

            <td>${report.receipt}</td>

            <td>${report.customer}</td>

            <td>${report.payment}</td>

            <td>₦${report.total.toLocaleString()}</td>

            <td>

                <span class="status paid">

                    ${report.status}

                </span>

            </td>

        </tr>

        `;

    });

}



// =============================================
// RENDER INVENTORY REPORT
// =============================================

function renderInventoryReport(){

    if(!inventoryReportBody) return;

    inventoryReportBody.innerHTML = "";

    inventoryReports.forEach(item=>{

        inventoryReportBody.innerHTML += `

        <tr>

            <td>${item.product}</td>

            <td>${item.category}</td>

            <td>${item.stock}</td>

            <td>${item.lowStock}</td>

            <td>

                <span class="status paid">

                    ${item.status}

                </span>

            </td>

        </tr>

        `;

    });

}



// =============================================
// RENDER CUSTOMER REPORT
// =============================================

function renderCustomerReport(){

    if(!customerReportBody) return;

    customerReportBody.innerHTML = "";

    customerReports.forEach(customer=>{

        customerReportBody.innerHTML += `

        <tr>

            <td>${customer.name}</td>

            <td>${customer.purchases}</td>

            <td>₦${customer.spent.toLocaleString()}</td>

            <td>

                <span class="status paid">

                    ${customer.status}

                </span>

            </td>

        </tr>

        `;

    });

}



// =============================================
// GENERATE REPORT
// =============================================

if(generateReport){

    generateReport.addEventListener("click",()=>{

        renderSalesReport();

        renderInventoryReport();

        renderCustomerReport();

        updateSummaryCards();

        alert("Report generated successfully!");

    });

}



// =============================================
// INITIAL LOAD
// =============================================

document.addEventListener("DOMContentLoaded",()=>{

    renderSalesReport();

    renderInventoryReport();

    renderCustomerReport();

    updateSummaryCards();

});

// =============================================
// LOCAL STORAGE
// =============================================

const REPORTS_STORAGE_KEY = "shopledger_reports";

function saveReports(){

    localStorage.setItem(

        REPORTS_STORAGE_KEY,

        JSON.stringify({

            salesReports,

            inventoryReports,

            customerReports

        })

    );

}

function loadReports(){

    const savedReports = localStorage.getItem(

        REPORTS_STORAGE_KEY

    );

    if(!savedReports) return;

    const data = JSON.parse(savedReports);

    salesReports = data.salesReports || [];

    inventoryReports = data.inventoryReports || [];

    customerReports = data.customerReports || [];

}



// =============================================
// LIVE SEARCH
// =============================================

if(reportSearch){

    reportSearch.addEventListener("input",function(){

        const keyword =

            this.value.toLowerCase().trim();

        const filtered = salesReports.filter(report=>

            report.receipt.toLowerCase().includes(keyword)

            ||

            report.customer.toLowerCase().includes(keyword)

            ||

            report.payment.toLowerCase().includes(keyword)

        );

        reportsTableBody.innerHTML = "";

        filtered.forEach(report=>{

            reportsTableBody.innerHTML += `

            <tr>

                <td>${report.date}</td>

                <td>${report.receipt}</td>

                <td>${report.customer}</td>

                <td>${report.payment}</td>

                <td>₦${report.total.toLocaleString()}</td>

                <td>

                    <span class="status paid">

                        ${report.status}

                    </span>

                </td>

            </tr>

            `;

        });

    });

}



// =============================================
// DATE FILTER
// =============================================

if(startDate && endDate){

    function filterReportsByDate(){

        const start = startDate.value;

        const end = endDate.value;

        if(!start || !end){

            renderSalesReport();

            return;

        }

        const filtered = salesReports.filter(report=>{

            const parts = report.date.split("/");

            const reportDate =

                new Date(parts[2],parts[1]-1,parts[0]);

            return reportDate >= new Date(start)

                && reportDate <= new Date(end);

        });

        reportsTableBody.innerHTML = "";

        filtered.forEach(report=>{

            reportsTableBody.innerHTML += `

            <tr>

                <td>${report.date}</td>

                <td>${report.receipt}</td>

                <td>${report.customer}</td>

                <td>${report.payment}</td>

                <td>₦${report.total.toLocaleString()}</td>

                <td>

                    <span class="status paid">

                        ${report.status}

                    </span>

                </td>

            </tr>

            `;

        });

    }

    startDate.addEventListener("change",filterReportsByDate);

    endDate.addEventListener("change",filterReportsByDate);

}



// =============================================
// EXPORT PLACEHOLDERS
// =============================================

if(exportPDF){

    exportPDF.addEventListener("click",()=>{

        alert(

            "PDF export will be connected during backend integration."

        );

    });

}



if(exportExcel){

    exportExcel.addEventListener("click",()=>{

        alert(

            "Excel export will be connected during backend integration."

        );

    });

}



// =============================================
// PRINT REPORT
// =============================================

window.printReport = function(){

    window.print();

};



// =============================================
// SAVE REPORTS AFTER GENERATION
// =============================================

const originalUpdateSummaryCards = updateSummaryCards;

updateSummaryCards = function(){

    originalUpdateSummaryCards();

    saveReports();

};

// =============================================
// INITIALIZE REPORTS
// =============================================

function initializeReports(){

    loadReports();

    renderSalesReport();

    renderInventoryReport();

    renderCustomerReport();

    updateSummaryCards();

}



document.addEventListener(

    "DOMContentLoaded",

    initializeReports

);



// =============================================
// FUTURE BACKEND FUNCTIONS
// =============================================

// async function fetchReports(){}

// async function generateReportAPI(){}

// async function exportPDFAPI(){}

// async function exportExcelAPI(){}

// async function fetchSalesReports(){}

// async function fetchInventoryReports(){}

// async function fetchCustomerReports(){}