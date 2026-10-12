/*************************************************
 * SHOPLEDGER
 * Module: Analytics
 * File: analytics.js
 * Purpose: Analytics Dashboard
 * Author: Mark Otu
 *************************************************/


// =============================================
// DOM ELEMENTS
// =============================================

const totalRevenue =
    document.getElementById("totalRevenue");

const totalSales =
    document.getElementById("totalSales");

const inventoryValue =
    document.getElementById("inventoryValue");

const totalCustomers =
    document.getElementById("totalCustomers");

const topProductsBody =
    document.getElementById("topProductsBody");

const lowStockBody =
    document.getElementById("lowStockBody");

const bestSellingProduct =
    document.getElementById("bestSellingProduct");

const inventoryAlert =
    document.getElementById("inventoryAlert");

const salesInsight =
    document.getElementById("salesInsight");



// =============================================
// SAMPLE DATA
// (Temporary until backend integration)
// =============================================

const analyticsData = {

    revenue: 2450000,

    sales: 385,

    inventoryValue: 1280000,

    customers: 162,

    monthlySales: [

        180000,

        220000,

        210000,

        250000,

        275000,

        320000,

        340000,

        360000,

        390000,

        410000,

        450000,

        520000

    ],

    categorySales: [

        42,

        26,

        18,

        14

    ],

    inventoryLevels: [

        180,

        140,

        120,

        90,

        60,

        45

    ],

    customerGrowth: [

        20,

        32,

        45,

        62,

        78,

        94,

        112,

        125,

        138,

        145,

        154,

        162

    ]

};



// =============================================
// UPDATE KPI CARDS
// =============================================

function updateKPIs(){

    totalRevenue.textContent =

        "₦" +

        analyticsData.revenue.toLocaleString();

    totalSales.textContent =

        analyticsData.sales.toLocaleString();

    inventoryValue.textContent =

        "₦" +

        analyticsData.inventoryValue.toLocaleString();

    totalCustomers.textContent =

        analyticsData.customers.toLocaleString();

}



// =============================================
// INSIGHT TEXT
// =============================================

function updateInsights(){

    bestSellingProduct.textContent =

        "Rice 50kg generated the highest revenue this month.";

    inventoryAlert.textContent =

        "3 products are currently below the minimum stock level.";

    salesInsight.textContent =

        "Sales increased by 12% compared to the previous month.";

}


// =============================================
// CHARTS
// =============================================

function initializeCharts(){

    // Monthly Sales Trend

    const salesChartCanvas = document.getElementById("salesChart");

    if(salesChartCanvas){

        new Chart(salesChartCanvas,{

            type:"line",

            data:{

                labels:[

                    "Jan","Feb","Mar","Apr","May","Jun",

                    "Jul","Aug","Sep","Oct","Nov","Dec"

                ],

                datasets:[{

                    label:"Monthly Revenue",

                    data:analyticsData.monthlySales,

                    borderColor:"#2563EB",

                    backgroundColor:"rgba(37,99,235,0.15)",

                    fill:true,

                    tension:0.4

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false

            }

        });

    }



    // Sales by Category

    const categoryChartCanvas = document.getElementById("categoryChart");

    if(categoryChartCanvas){

        new Chart(categoryChartCanvas,{

            type:"doughnut",

            data:{

                labels:[

                    "Food",

                    "Beverages",

                    "Electronics",

                    "Others"

                ],

                datasets:[{

                    data:analyticsData.categorySales,

                    backgroundColor:[

                        "#2563EB",

                        "#10B981",

                        "#F59E0B",

                        "#EF4444"

                    ]

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false

            }

        });

    }



    // Inventory Levels

    const inventoryChartCanvas = document.getElementById("inventoryChart");

    if(inventoryChartCanvas){

        new Chart(inventoryChartCanvas,{

            type:"bar",

            data:{

                labels:[

                    "Rice",

                    "Beans",

                    "Oil",

                    "Drinks",

                    "Soap",

                    "Sugar"

                ],

                datasets:[{

                    label:"Stock",

                    data:analyticsData.inventoryLevels,

                    backgroundColor:"#10B981"

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false

            }

        });

    }



    // Customer Growth

    const customerChartCanvas = document.getElementById("customerChart");

    if(customerChartCanvas){

        new Chart(customerChartCanvas,{

            type:"line",

            data:{

                labels:[

                    "Jan","Feb","Mar","Apr","May","Jun",

                    "Jul","Aug","Sep","Oct","Nov","Dec"

                ],

                datasets:[{

                    label:"Customers",

                    data:analyticsData.customerGrowth,

                    borderColor:"#8B5CF6",

                    backgroundColor:"rgba(139,92,246,0.15)",

                    fill:true,

                    tension:0.35

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false

            }

        });

    }

}


// =============================================
// SAMPLE TABLE DATA
// =============================================

const topProducts = [

    {
        product:"Rice 50kg",
        category:"Food",
        sold:180,
        revenue:540000
    },

    {
        product:"Vegetable Oil",
        category:"Groceries",
        sold:120,
        revenue:360000
    },

    {
        product:"Soft Drinks",
        category:"Beverages",
        sold:95,
        revenue:190000
    }

];



const lowStockProducts = [

    {
        product:"Sugar",
        category:"Groceries",
        stock:8,
        status:"Low Stock"
    },

    {
        product:"Milk",
        category:"Dairy",
        stock:5,
        status:"Critical"
    }

];



// =============================================
// RENDER TABLES
// =============================================

function renderTopProducts(){

    if(!topProductsBody) return;

    topProductsBody.innerHTML = "";

    topProducts.forEach(item=>{

        topProductsBody.innerHTML += `

        <tr>

            <td>${item.product}</td>

            <td>${item.category}</td>

            <td>${item.sold}</td>

            <td>₦${item.revenue.toLocaleString()}</td>

        </tr>

        `;

    });

}



function renderLowStock(){

    if(!lowStockBody) return;

    lowStockBody.innerHTML = "";

    lowStockProducts.forEach(item=>{

        const badgeClass =

            item.status === "Critical"

            ? "pending"

            : "success";

        lowStockBody.innerHTML += `

        <tr>

            <td>${item.product}</td>

            <td>${item.category}</td>

            <td>${item.stock}</td>

            <td>

                <span class="status ${badgeClass}">

                    ${item.status}

                </span>

            </td>

        </tr>

        `;

    });

}



// =============================================
// SEARCH
// =============================================

const analyticsSearch =

    document.getElementById("analyticsSearch");

if(analyticsSearch){

    analyticsSearch.addEventListener("input",function(){

        const keyword =

            this.value.toLowerCase();

        const rows =

            document.querySelectorAll(".analytics-table tbody tr");

        rows.forEach(row=>{

            row.style.display =

                row.textContent.toLowerCase().includes(keyword)

                ? ""

                : "none";

        });

    });

}



// =============================================
// LOCAL STORAGE
// =============================================

const ANALYTICS_STORAGE =

    "shopledger_analytics";

function saveAnalytics(){

    localStorage.setItem(

        ANALYTICS_STORAGE,

        JSON.stringify(analyticsData)

    );

}

function loadAnalytics(){

    const stored =

        localStorage.getItem(ANALYTICS_STORAGE);

    if(!stored) return;

    Object.assign(

        analyticsData,

        JSON.parse(stored)

    );

}



// =============================================
// FUTURE API PLACEHOLDERS
// =============================================

// async function fetchAnalytics(){}

// async function fetchCharts(){}

// async function fetchTopProducts(){}

// async function fetchLowStock(){}

// async function fetchInsights(){}


// =============================================
// INITIALIZE ANALYTICS
// =============================================

function initializeAnalytics(){

    loadAnalytics();

    updateKPIs();

    updateInsights();

    initializeCharts();

    renderTopProducts();

    renderLowStock();

    saveAnalytics();

}



document.addEventListener(

    "DOMContentLoaded",

    initializeAnalytics

);