/*************************************************
 * SHOPLEDGER
 * Module: Customers
 * File: customers.js
 * Purpose: Customer Management
 * Author: Mark Otu
 *************************************************/


// =============================================
// DOM ELEMENTS
// =============================================

const addCustomerBtn =
    document.getElementById("addCustomerBtn");

const customerModal =
    document.getElementById("customerModal");

const closeCustomerModal =
    document.getElementById("closeCustomerModal");

const cancelCustomer =
    document.getElementById("cancelCustomer");

const customerForm =
    document.getElementById("customerForm");

const customersTableBody =
    document.getElementById("customersTableBody");

const customerSearch =
    document.getElementById("customerSearch");

const customerFilter =
    document.getElementById("customerFilter");

const customersLastUpdated =
    document.getElementById("customersLastUpdated");



// =============================================
// SAMPLE CUSTOMERS
// (Temporary until backend integration)
// =============================================

let customers = [

    {

        id:1,

        name:"John Doe",

        phone:"+234 801 234 5678",

        email:"john@example.com",

        purchases:5,

        spent:35000,

        status:"Active"

    }

];



// =============================================
// MODAL FUNCTIONS
// =============================================

function openCustomerModal(){

    customerModal.classList.add("show");

}

function closeCustomer(){

    customerModal.classList.remove("show");

}



if(addCustomerBtn){

    addCustomerBtn.addEventListener(

        "click",

        openCustomerModal

    );

}



if(closeCustomerModal){

    closeCustomerModal.addEventListener(

        "click",

        closeCustomer

    );

}



if(cancelCustomer){

    cancelCustomer.addEventListener(

        "click",

        closeCustomer

    );

}



// Close modal when clicking outside

window.addEventListener("click",(event)=>{

    if(event.target===customerModal){

        closeCustomer();

    }

});



// =============================================
// LAST UPDATED
// =============================================

if(customersLastUpdated){

    customersLastUpdated.textContent =

        new Date().toLocaleString();

}

// =============================================
// RENDER CUSTOMERS TABLE
// =============================================

function renderCustomers(filteredCustomers = customers){

    if(!customersTableBody) return;

    customersTableBody.innerHTML = "";

    filteredCustomers.forEach((customer)=>{

        customersTableBody.innerHTML += `

        <tr>

            <td>${customer.name}</td>

            <td>${customer.phone}</td>

            <td>${customer.email}</td>

            <td>${customer.purchases}</td>

            <td>₦${customer.spent.toLocaleString()}</td>

            <td>

                <span class="status paid">

                    ${customer.status}

                </span>

            </td>

            <td>

                <button
                    class="table-btn edit"
                    onclick="editCustomer(${customer.id})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="table-btn delete"
                    onclick="deleteCustomer(${customer.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    updateCustomerStatistics();

}



// =============================================
// UPDATE CUSTOMER STATISTICS
// =============================================

function updateCustomerStatistics(){

    const totalCustomers =
        document.getElementById("totalCustomers");

    const totalPurchases =
        document.getElementById("totalPurchases");

    const customerRevenue =
        document.getElementById("customerRevenue");

    const activeCustomers =
        document.getElementById("activeCustomers");

    const purchases =
        customers.reduce((sum,c)=>sum+c.purchases,0);

    const revenue =
        customers.reduce((sum,c)=>sum+c.spent,0);

    const active =
        customers.filter(c=>c.status==="Active").length;

    if(totalCustomers){

        totalCustomers.textContent =
            customers.length;

    }

    if(totalPurchases){

        totalPurchases.textContent =
            purchases;

    }

    if(customerRevenue){

        customerRevenue.textContent =
            "₦" + revenue.toLocaleString();

    }

    if(activeCustomers){

        activeCustomers.textContent =
            active;

    }

}



// =============================================
// SAVE CUSTOMER
// =============================================

if(customerForm){

    customerForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        const newCustomer = {

            id:Date.now(),

            name:

                document.getElementById("customerName").value,

            phone:

                document.getElementById("customerPhone").value,

            email:

                document.getElementById("customerEmail").value,

            purchases:0,

            spent:0,

            status:

                document.getElementById("customerStatus").value

        };

        customers.unshift(newCustomer);

        renderCustomers();

        customerForm.reset();

        closeCustomer();

        alert("Customer added successfully!");

    });

}



function saveCustomers(){

    localStorage.setItem(

        CUSTOMERS_STORAGE_KEY,

        JSON.stringify(customers)

    );

}



// =============================================
// LIVE SEARCH
// =============================================

if(customerSearch){

    customerSearch.addEventListener("input",function(){

        const keyword =

            this.value.toLowerCase().trim();

        const filteredCustomers =

            customers.filter(customer=>

                customer.name

                .toLowerCase()

                .includes(keyword)

                ||

                customer.phone

                .toLowerCase()

                .includes(keyword)

                ||

                customer.email

                .toLowerCase()

                .includes(keyword)

            );

        renderCustomers(filteredCustomers);

    });

}



// =============================================
// CUSTOMER FILTER
// =============================================

if(customerFilter){

    customerFilter.addEventListener("change",function(){

        const selected = this.value;

        if(selected==="all"){

            renderCustomers();

            return;

        }

        if(selected==="active"){

            renderCustomers(

                customers.filter(c=>c.status==="Active")

            );

            return;

        }

        if(selected==="new"){

            renderCustomers(

                customers.slice(0,10)

            );

        }

    });

}



// =============================================
// EDIT CUSTOMER
// =============================================

function editCustomer(id){

    const customer =

        customers.find(c=>c.id===id);

    if(!customer){

        alert("Customer not found.");

        return;

    }

    alert(

`Customer Editing

Name: ${customer.name}

Phone: ${customer.phone}

Email: ${customer.email}

(Full editing will be added during backend integration.)`

    );

}



// =============================================
// DELETE CUSTOMER
// =============================================

function deleteCustomer(id){

    const confirmed = confirm(

        "Are you sure you want to delete this costomer?"
    )
    customers = customers.filter(

    customer => customer.id !== id

);

saveCustomers();

renderCustomers();

}



// =============================================
// SAVE TO LOCAL STORAGE
// =============================================

const originalRenderCustomers = renderCustomers;

renderCustomers = function(filteredCustomers = customers){

    originalRenderCustomers(filteredCustomers);

    saveCustomers();

};
// =============================================
// INITIALIZE CUSTOMERS
// =============================================

function initializeCustomers(){

    const savedCustomers = localStorage.getItem(

        CUSTOMERS_STORAGE_KEY

    );

    if(savedCustomers){

        customers = JSON.parse(savedCustomers);

    }

    renderCustomers();

}



document.addEventListener(

    "DOMContentLoaded",

    initializeCustomers

);



// =============================================
// FUTURE BACKEND FUNCTIONS
// =============================================

// async function fetchCustomers(){}

// async function createCustomer(){}

// async function updateCustomer(){}

// async function deleteCustomerAPI(){}

// async function fetchCustomerHistory(){}

// async function fetchCustomerStatistics(){}