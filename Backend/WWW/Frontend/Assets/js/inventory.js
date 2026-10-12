/*************************************************
 * SHOPLEDGER
 * Module: Inventory
 * File: inventory.js
 * Purpose: Inventory Management
 * Author: Mark Otu
 *************************************************/


// =============================================
// DOM ELEMENTS
// =============================================

const addProductBtn =
    document.getElementById("addProductBtn");

const productModal =
    document.getElementById("productModal");

const closeModal =
    document.getElementById("closeModal");

const cancelProduct =
    document.getElementById("cancelProduct");

const productForm =
    document.getElementById("productForm");

const inventoryTableBody =
    document.getElementById("inventoryTableBody");

const inventorySearch =
    document.getElementById("inventorySearch");

const categoryFilter =
    document.getElementById("categoryFilter");

const lastUpdated =
    document.getElementById("lastUpdated");


// =============================================
// SAMPLE PRODUCTS
// (Temporary until backend is connected)
// =============================================

let products = [

    {

        id:1,

        name:"Coca-Cola 50cl",

        category:"Beverages",

        stock:45,

        price:500,

        status:"In Stock"

    },

    {

        id:2,

        name:"Peak Milk",

        category:"Food",

        stock:3,

        price:1200,

        status:"Low Stock"

    }

];


// =============================================
// MODAL FUNCTIONS
// =============================================

function openModal(){

    productModal.classList.add("show");

}

function closeProductModal(){

    productModal.classList.remove("show");

}


if(addProductBtn){

    addProductBtn.addEventListener("click",openModal);

}

if(closeModal){

    closeModal.addEventListener("click",closeProductModal);

}

if(cancelProduct){

    cancelProduct.addEventListener("click",closeProductModal);

}


// Close when clicking outside modal

window.addEventListener("click",(event)=>{

    if(event.target===productModal){

        closeProductModal();

    }

});



// =============================================
// LAST UPDATED
// =============================================

if(lastUpdated){

    lastUpdated.textContent =
        new Date().toLocaleString();

}

// =============================================
// RENDER INVENTORY TABLE
// =============================================

function renderProducts(filteredProducts = products){

    if(!inventoryTableBody) return;

    inventoryTableBody.innerHTML = "";

    filteredProducts.forEach((product)=>{

        const status =
            product.stock <= 10
                ? "Low Stock"
                : "In Stock";

        const statusClass =
            product.stock <= 10
                ? "pending"
                : "paid";

        inventoryTableBody.innerHTML += `

        <tr>

            <td>

                <img
                    src="Assets/AI-Images/inventory.png"
                    class="product-image"
                    alt="Product">

            </td>

            <td>${product.name}</td>

            <td>${product.category}</td>

            <td>${product.stock}</td>

            <td>₦${product.price.toLocaleString()}</td>

            <td>

                <span class="status ${statusClass}">

                    ${status}

                </span>

            </td>

            <td>

                <button
                    class="table-btn edit"
                    onclick="editProduct(${product.id})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="table-btn delete"
                    onclick="deleteProduct(${product.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

    updateStatistics();

}



// =============================================
// UPDATE DASHBOARD STATISTICS
// =============================================

function updateStatistics(){

    const totalProducts =
        document.getElementById("totalProducts");

    const totalCategories =
        document.getElementById("totalCategories");

    const lowStockCount =
        document.getElementById("lowStockCount");

    const inventoryValue =
        document.getElementById("inventoryValue");

    if(totalProducts){

        totalProducts.textContent =
            products.length;

    }

    if(totalCategories){

        const categories =
            [...new Set(products.map(p=>p.category))];

        totalCategories.textContent =
            categories.length;

    }

    if(lowStockCount){

        lowStockCount.textContent =
            products.filter(p=>p.stock<=10).length;

    }

    if(inventoryValue){

        const value =
            products.reduce((sum,p)=>{

                return sum + (p.price*p.stock);

            },0);

        inventoryValue.textContent =
            "₦" + value.toLocaleString();

    }

}



// =============================================
// ADD PRODUCT
// =============================================

if(productForm){

    productForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        const newProduct = {

            id: Date.now(),

            name:
                document.getElementById("productName").value,

            category:
                document.getElementById("category").value,

            stock:Number(

                document.getElementById("quantity").value

            ),

            price:Number(

                document.getElementById("sellingPrice").value

            ),

            status:"In Stock"

        };

        products.push(newProduct);

        renderProducts();

        productForm.reset();

        closeProductModal();

        alert("Product added successfully!");

    });

}


// =============================================
// LOCAL STORAGE
// =============================================

function saveProducts() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(products)
    );
}



// =============================================
// LIVE SEARCH
// =============================================

if (inventorySearch) {

    inventorySearch.addEventListener("input", function () {

        const keyword =
            this.value.toLowerCase().trim();

        const filteredProducts =
            products.filter(product =>

                product.name
                    .toLowerCase()
                    .includes(keyword)

            );

        renderProducts(filteredProducts);

    });

}



// =============================================
// CATEGORY FILTER
// =============================================

if (categoryFilter) {

    categoryFilter.addEventListener("change", function () {

        const selected =
            this.value;

        if (selected === "all") {

            renderProducts();

            return;

        }

        const filteredProducts =
            products.filter(product =>

                product.category === selected

            );

        renderProducts(filteredProducts);

    });

}
// =============================================
// INITIALIZE INVENTORY
// =============================================

function initializeInventory(){

    const savedProducts = localStorage.getItem(STORAGE_KEY);

    if(savedProducts){

        products = JSON.parse(savedProducts);

    }

    renderProducts();

}



document.addEventListener(

    "DOMContentLoaded",

    initializeInventory

);


// =============================================
// DELETE PRODUCT
// =============================================

function deleteProduct(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this product?"
        );

    if (!confirmed) return;

    products =
        products.filter(product =>

            product.id !== id

        );

    saveProducts();

    renderProducts();

}



// =============================================
// EDIT PRODUCT
// =============================================

function editProduct(id) {

    alert(

        "Edit Product will be connected during backend integration.\n\nProduct ID: " + id

    );

}



// =============================================
// SAVE TO LOCAL STORAGE AFTER ADDING
// =============================================

const originalRenderProducts = renderProducts;

renderProducts = function(filteredProducts = products){

    originalRenderProducts(filteredProducts);

    saveProducts();

};



// =============================================
// FUTURE BACKEND FUNCTIONS
// =============================================

// async function fetchProducts(){}

// async function createProduct(){}

// async function updateProduct(){}

// async function deleteProductAPI(){}

// async function fetchInventoryStatistics(){}