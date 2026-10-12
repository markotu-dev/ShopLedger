/*************************************************
 * SHOPLEDGER
 * Module: Sales
 * File: sales.js
 * Purpose: Sales Management
 * Author: Mark Otu
 *************************************************/


// =============================================
// DOM ELEMENTS
// =============================================

const newSaleBtn =
    document.getElementById("newSaleBtn");

const saleModal =
    document.getElementById("saleModal");

const closeSaleModal =
    document.getElementById("closeSaleModal");

const cancelSale =
    document.getElementById("cancelSale");

const saleForm =
    document.getElementById("saleForm");

const salesTableBody =
    document.getElementById("salesTableBody");

const salesSearch =
    document.getElementById("salesSearch");

const paymentFilter =
    document.getElementById("paymentFilter");

const saleQuantity =
    document.getElementById("saleQuantity");

const unitPrice =
    document.getElementById("unitPrice");

const saleTotal =
    document.getElementById("saleTotal");

const receiptNumber =
    document.getElementById("receiptNumber");

const salesLastUpdated =
    document.getElementById("salesLastUpdated");


// =============================================
// SAMPLE SALES
// (Temporary until backend integration)
// =============================================

let sales = [

    {

        id:1,

        receipt:"SL-1001",

        customer:"Walk-in Customer",

        items:3,

        payment:"Cash",

        total:8500,

        status:"Completed"

    }

];



// =============================================
// MODAL FUNCTIONS
// =============================================

function openSaleModal(){

    saleModal.classList.add("show");

    generateReceiptNumber();

}

function closeSale(){

    saleModal.classList.remove("show");

}


if(newSaleBtn){

    newSaleBtn.addEventListener(

        "click",

        openSaleModal

    );

}

if(closeSaleModal){

    closeSaleModal.addEventListener(

        "click",

        closeSale

    );

}

if(cancelSale){

    cancelSale.addEventListener(

        "click",

        closeSale

    );

}


// Close modal when clicking outside

window.addEventListener("click",(event)=>{

    if(event.target===saleModal){

        closeSale();

    }

});



// =============================================
// RECEIPT NUMBER
// =============================================

function generateReceiptNumber(){

    const number =

        "SL-" +

        Math.floor(

            1000 +

            Math.random()*9000

        );

    if(receiptNumber){

        receiptNumber.value = number;

    }

}



// =============================================
// AUTO CALCULATE TOTAL
// =============================================

function calculateTotal(){

    const quantity =

        Number(saleQuantity.value)||0;

    const price =

        Number(unitPrice.value)||0;

    const total =

        quantity*price;

    saleTotal.textContent =

        "₦"+total.toLocaleString();

}

if(saleQuantity){

    saleQuantity.addEventListener(

        "input",

        calculateTotal

    );

}

if(unitPrice){

    unitPrice.addEventListener(

        "input",

        calculateTotal

    );

}



// =============================================
// LAST UPDATED
// =============================================

if(salesLastUpdated){

    salesLastUpdated.textContent =

        new Date().toLocaleString();

}

// =============================================
// RENDER SALES TABLE
// =============================================

function renderSales(filteredSales = sales){

    if(!salesTableBody) return;

    salesTableBody.innerHTML = "";

    filteredSales.forEach((sale)=>{

        salesTableBody.innerHTML += `

        <tr>

            <td>${sale.receipt}</td>

            <td>${sale.customer}</td>

            <td>${sale.items}</td>

            <td>${sale.payment}</td>

            <td>₦${sale.total.toLocaleString()}</td>

            <td>

                <span class="status paid">

                    ${sale.status}

                </span>

            </td>

            <td>

                <button
                    class="table-btn edit"
                    onclick="viewSale(${sale.id})">

                    <i class="fa-solid fa-eye"></i>

                </button>

                <button
                    class="table-btn delete"
                    onclick="printReceipt(${sale.id})">

                    <i class="fa-solid fa-print"></i>

                </button>

            </td>

        </tr>

        `;

    });

    updateSalesStatistics();

}



// =============================================
// UPDATE SALES STATISTICS
// =============================================

function updateSalesStatistics(){

    const todayRevenue =
        document.getElementById("todayRevenue");

    const totalSales =
        document.getElementById("totalSales");

    const totalProfit =
        document.getElementById("totalProfit");

    const receiptCount =
        document.getElementById("receiptCount");

    const revenue =
        sales.reduce((sum,sale)=>{

            return sum + sale.total;

        },0);

    if(todayRevenue){

        todayRevenue.textContent =
            "₦" + revenue.toLocaleString();

    }

    if(totalSales){

        totalSales.textContent =
            sales.length;

    }

    if(receiptCount){

        receiptCount.textContent =
            sales.length;

    }

    if(totalProfit){

        const estimatedProfit =
            Math.round(revenue * 0.25);

        totalProfit.textContent =
            "₦" + estimatedProfit.toLocaleString();

    }

}



// =============================================
// SAVE SALE
// =============================================

if(saleForm){

    saleForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        const quantity =
            Number(saleQuantity.value);

        const price =
            Number(unitPrice.value);

        const newSale = {

            id:Date.now(),

            receipt:receiptNumber.value,

            customer:

                document.getElementById("customerName").value ||

                "Walk-in Customer",

            items:quantity,

            payment:

                document.getElementById("paymentMethod").value,

            total:quantity * price,

            status:"Completed"

        };

        sales.unshift(newSale);

        renderSales();

        saleForm.reset();

        saleTotal.textContent = "₦0";

        closeSale();

        generateReceiptNumber();

        alert("Sale recorded successfully!");

    });

}


// =============================================
// LOCAL STORAGE
// =============================================

const SALES_STORAGE_KEY = "shopledger_sales";

function saveSales(){

    localStorage.setItem(

        SALES_STORAGE_KEY,

        JSON.stringify(sales)

    );

}



// =============================================
// LIVE SEARCH
// =============================================

if(salesSearch){

    salesSearch.addEventListener("input",function(){

        const keyword =

            this.value.toLowerCase().trim();

        const filteredSales =

            sales.filter(sale=>

                sale.customer

                .toLowerCase()

                .includes(keyword)

                ||

                sale.receipt

                .toLowerCase()

                .includes(keyword)

            );

        renderSales(filteredSales);

    });

}



// =============================================
// PAYMENT FILTER
// =============================================

if(paymentFilter){

    paymentFilter.addEventListener("change",function(){

        const selected =

            this.value;

        if(selected==="all"){

            renderSales();

            return;

        }

        const filteredSales =

            sales.filter(sale=>

                sale.payment===selected

            );

        renderSales(filteredSales);

    });

}



// =============================================
// VIEW SALE
// =============================================

function viewSale(id){

    const sale =

        sales.find(s=>s.id===id);

    if(!sale){

        alert("Sale not found.");

        return;

    }

    alert(

`Receipt: ${sale.receipt}

Customer: ${sale.customer}

Items: ${sale.items}

Payment: ${sale.payment}

Total: ₦${sale.total.toLocaleString()}

Status: ${sale.status}`

    );

}



// =============================================
// PRINT RECEIPT
// =============================================

function printReceipt(id){

    const sale =

        sales.find(s=>s.id===id);

    if(!sale){

        alert("Receipt not found.");

        return;

    }

    alert(

        "Printing receipt for " +

        sale.receipt +

        "\n\n(Printing will be implemented during backend integration.)"

    );

}



// =============================================
// SAVE TO LOCAL STORAGE
// =============================================

const originalRenderSales = renderSales;

renderSales = function(filteredSales = sales){

    originalRenderSales(filteredSales);

    saveSales();

};

// =============================================
// INITIALIZE SALES
// =============================================

function initializeSales(){

    const savedSales = localStorage.getItem(

        SALES_STORAGE_KEY

    );

    if(savedSales){

        sales = JSON.parse(savedSales);

    }

    renderSales();

}



document.addEventListener(

    "DOMContentLoaded",

    initializeSales

);



// =============================================
// FUTURE BACKEND FUNCTIONS
// =============================================

// async function fetchSales(){}

// async function createSale(){}

// async function updateSale(){}

// async function deleteSale(){}

// async function printReceiptPDF(){}

// async function fetchRevenueStatistics(){}