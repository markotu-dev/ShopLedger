/*************************************************
 * SHOPLEDGER
 * Module: Login
 * File: login.js
 * Purpose: Handle Login Page Interactions
 * Author: Mark Otu
 *************************************************/


// ============================================
// Show / Hide Password
// ============================================

const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");


if(passwordInput && togglePassword){

    togglePassword.addEventListener("click", () => {

        const type =
            passwordInput.getAttribute("type") === "password"
            ? "text"
            : "password";

        passwordInput.setAttribute("type", type);

        togglePassword.classList.toggle("fa-eye");

        togglePassword.classList.toggle("fa-eye-slash");

    });

}


// ============================================
// Login Form
// ============================================

const loginForm = document.getElementById("loginForm");


if(loginForm){

    loginForm.addEventListener("submit", function(event){

        // Prevent page refresh
        event.preventDefault();


        // Get Form Values
        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value.trim();


        // Simple Validation

        if(email === "" || password === ""){

            alert("Please fill in all required fields.");

            return;

        }


        // Temporary Login Message
        // Backend connection will replace this later

        console.log("================================");

        console.log("Login Attempt");

        console.log("Email:", email);

        console.log("Password:", password);

        console.log("================================");


        alert("Login successful (Frontend Demo).\nBackend connection coming next.");

    });

}