/*************************************************
 * SHOPLEDGER
 * Module: Registration
 * File: register.js
 * Purpose: Handle Registration Page
 * Author: Mark Otu
 *************************************************/


// ============================================
// Password Visibility
// ============================================

const passwordInput =
    document.getElementById("password");

const confirmPasswordInput =
    document.getElementById("confirmPassword");

const passwordToggle =
    document.getElementById("togglePassword");


// Create a second eye icon for Confirm Password

if(confirmPasswordInput){

    const confirmToggle =
        document.createElement("i");

    confirmToggle.className =
        "fa-solid fa-eye toggle-password";

    confirmPasswordInput.parentElement.appendChild(confirmToggle);


    confirmToggle.addEventListener("click",()=>{

        const type =
            confirmPasswordInput.type === "password"
            ? "text"
            : "password";

        confirmPasswordInput.type = type;

        confirmToggle.classList.toggle("fa-eye");

        confirmToggle.classList.toggle("fa-eye-slash");

    });

}


if(passwordInput && passwordToggle){

    passwordToggle.addEventListener("click",()=>{

        const type =
            passwordInput.type === "password"
            ? "text"
            : "password";

        passwordInput.type = type;

        passwordToggle.classList.toggle("fa-eye");

        passwordToggle.classList.toggle("fa-eye-slash");

    });

}



// ============================================
// Registration Form
// ============================================

const registerForm =
    document.getElementById("registerForm");

    // ============================================
// Registration Validation
// ============================================

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // ========================================
        // Get Form Values
        // ========================================

        const fullName = document.getElementById("fullName").value.trim();

        const businessName = document.getElementById("businessName").value.trim();

        const email = document.getElementById("email").value.trim();

        const phone = document.getElementById("phone").value.trim();

        const businessType = document.getElementById("businessType").value;

        const country = document.getElementById("country").value.trim();

        const password = document.getElementById("password").value;

        const confirmPassword = document.getElementById("confirmPassword").value;

        const terms = document.getElementById("terms").checked;


        // ========================================
        // Required Fields
        // ========================================

        if (
            fullName === "" ||
            businessName === "" ||
            email === "" ||
            phone === "" ||
            businessType === "" ||
            country === "" ||
            password === "" ||
            confirmPassword === ""
        ) {

            alert("Please complete all required fields.");

            return;

        }


        // ========================================
        // Password Length
        // ========================================

        if (password.length < 8) {

            alert("Password must contain at least 8 characters.");

            return;

        }


        // ========================================
        // Password Match
        // ========================================

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }


        // ========================================
        // Terms
        // ========================================

        if (!terms) {

            alert("Please accept the Terms & Conditions.");

            return;

        }


        // ========================================
        // Email Validation
        // ========================================

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return;

        }


        // ========================================
        // Phone Validation
        // ========================================

        if (phone.length < 10) {

            alert("Please enter a valid phone number.");

            return;

        }


        // ========================================
        // Temporary Registration
        // ========================================

        console.log("================================");

        console.log("Registration Attempt");

        console.log({

            fullName,

            businessName,

            email,

            phone,

            businessType,

            country

        });

        console.log("================================");

        alert(
            "Registration Successful!\n\nFrontend demonstration completed.\nBackend connection will be added later."
        );

    });

}