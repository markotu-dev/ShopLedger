/*************************************************
 * SHOPLEDGER
 * Module: Dashboard
 * File: dashboard.js
 * Purpose: Dashboard Functionality
 * Author: Mark Otu
 *************************************************/


// =============================================
// DOM Elements
// =============================================

const sidebar =
    document.querySelector(".sidebar");

const menuToggle =
    document.getElementById("menuToggle");

const currentDate =
    document.getElementById("currentDate");



// =============================================
// Mobile Sidebar Toggle
// =============================================

if(menuToggle){

    menuToggle.addEventListener("click",()=>{

        sidebar.classList.toggle("show-sidebar");

    });

}



// =============================================
// Display Current Month & Year
// =============================================

if(currentDate){

    const today = new Date();

    currentDate.textContent =
        today.toLocaleDateString("en-US",{

            month:"long",

            year:"numeric"

        });

}



// =============================================
// Dashboard Ready
// =============================================

function initializeDashboard(){

    console.log("ShopLedger Dashboard Loaded Successfully");

    animateCounter("totalRevenue",250000,"₦");

    animateCounter("monthlyProfit",98000,"₦");

    animateCounter("totalSales",153);

    animateCounter("totalProducts",427);

}



document.addEventListener("DOMContentLoaded",initializeDashboard);

// =============================================
// Sales Overview Chart
// =============================================

const salesChartCanvas = document.getElementById("salesChart");

if (salesChartCanvas) {

    new Chart(salesChartCanvas, {

        type: "line",

        data: {

            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul"
            ],

            datasets: [

                {

                    label: "Sales",

                    data: [
                        120,
                        190,
                        300,
                        250,
                        420,
                        510,
                        620
                    ],

                    borderColor: "#2563EB",

                    backgroundColor: "rgba(37,99,235,0.15)",

                    borderWidth: 3,

                    fill: true,

                    tension: 0.4,

                    pointRadius: 5,

                    pointHoverRadius: 7

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: true

                }

            },

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}



// =============================================
// Quick Action Buttons
// =============================================

const quickActionButtons =
    document.querySelectorAll(".quick-actions button");

quickActionButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const action = button.textContent.trim();

        alert(`${action} feature will be connected to the backend soon.`);

    });

});



// =============================================
// Notification Button
// =============================================

const notificationButton =
    document.querySelector(".notification-btn");

if (notificationButton) {

    notificationButton.addEventListener("click", () => {

        alert(
            "Notifications will be loaded from the database after backend integration."
        );

    });

}



// =============================================
// Animated Dashboard Counters
// =============================================

function animateCounter(elementId, targetValue, prefix = "") {

    const element = document.getElementById(elementId);

    if (!element) return;

    let current = 0;

    const increment = Math.ceil(targetValue / 60);

    const timer = setInterval(() => {

        current += increment;

        if (current >= targetValue) {

            current = targetValue;

            clearInterval(timer);

        }

        element.textContent = prefix + current.toLocaleString();

    }, 20);

}


// =============================================
// Future Backend Functions
// =============================================

// fetchDashboardStatistics()

// fetchRecentSales()

// fetchNotifications()

// fetchInventoryAlerts()

// loadUserProfile()