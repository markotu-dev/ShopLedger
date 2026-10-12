/*************************************************
 * SHOPLEDGER
 * Module: Settings
 * File: settings.js
 * Purpose: Application Settings
 * Author: Mark Otu
 *************************************************/


// =============================================
// DOM ELEMENTS
// =============================================

const fullName =
    document.getElementById("fullName");

const email =
    document.getElementById("email");

const password =
    document.getElementById("password");

const businessName =
    document.getElementById("businessName");

const businessPhone =
    document.getElementById("businessPhone");

const businessEmail =
    document.getElementById("businessEmail");

const businessAddress =
    document.getElementById("businessAddress");

const themeSelect =
    document.getElementById("themeSelect");

const currency =
    document.getElementById("currency");

const taxRate =
    document.getElementById("taxRate");

const profileImage =
    document.getElementById("profileImage");

const profilePreview =
    document.getElementById("profilePreview");

const saveSettingsBtn =
    document.getElementById("saveSettingsBtn");



// =============================================
// STORAGE KEY
// =============================================

const SETTINGS_STORAGE =

    "shopledger_settings";



// =============================================
// DEFAULT SETTINGS
// =============================================

const defaultSettings = {

    fullName:"",

    email:"",

    password:"",

    businessName:"",

    businessPhone:"",

    businessEmail:"",

    businessAddress:"",

    theme:"light",

    currency:"NGN",

    taxRate:7.5,

    lowStockAlerts:true,

    dailyReport:true,

    weeklySummary:false,

    emailNotifications:false,

    profileImage:""

};



// =============================================
// CURRENT SETTINGS
// =============================================

let settings = {

    ...defaultSettings

};
// =============================================
// LOAD SETTINGS
// =============================================

function loadSettings(){

    const stored =

        localStorage.getItem(

            SETTINGS_STORAGE

        );

    if(stored){

        settings = {

            ...settings,

            ...JSON.parse(stored)

        };

    }

    populateForm();

populateNotificationSettings();

applyTheme();

}



// =============================================
// POPULATE FORM
// =============================================

function populateForm(){

    fullName.value =

        settings.fullName;

    email.value =

        settings.email;

    password.value =

        "";

    businessName.value =

        settings.businessName;

    businessPhone.value =

        settings.businessPhone;

    businessEmail.value =

        settings.businessEmail;

    businessAddress.value =

        settings.businessAddress;

    themeSelect.value =

        settings.theme;

    currency.value =

        settings.currency;

    taxRate.value =

        settings.taxRate;

    if(settings.profileImage){

        profilePreview.src =

            settings.profileImage;

    }

}
// =============================================
// APPLY THEME
// =============================================

function applyTheme(){

    document.body.classList.toggle(

        "dark-mode",

        settings.theme === "dark"

    );

}



themeSelect.addEventListener(

    "change",

    function(){

        settings.theme =

            this.value;

        applyTheme();

    }

);


// =============================================
// NOTIFICATION ELEMENTS
// =============================================

const lowStockAlerts =
    document.getElementById("lowStockAlerts");

const dailyReport =
    document.getElementById("dailyReport");

const weeklySummary =
    document.getElementById("weeklySummary");

const emailNotifications =
    document.getElementById("emailNotifications");



// =============================================
// PROFILE IMAGE UPLOAD
// =============================================

const uploadButton =
    document.querySelector(".upload-btn");

if(uploadButton){

    uploadButton.addEventListener("click",()=>{

        profileImage.click();

    });

}

profileImage.addEventListener("change",function(){

    const file = this.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(event){

        profilePreview.src =

            event.target.result;

        settings.profileImage =

            event.target.result;

    };

    reader.readAsDataURL(file);

});



// =============================================
// SAVE SETTINGS
// =============================================

function saveSettings(){

    settings.fullName =
        fullName.value.trim();

    settings.email =
        email.value.trim();

    settings.password =
        password.value;

    settings.businessName =
        businessName.value.trim();

    settings.businessPhone =
        businessPhone.value.trim();

    settings.businessEmail =
        businessEmail.value.trim();

    settings.businessAddress =
        businessAddress.value.trim();

    settings.currency =
        currency.value;

    settings.taxRate =
        Number(taxRate.value);

    settings.lowStockAlerts =
        lowStockAlerts.checked;

    settings.dailyReport =
        dailyReport.checked;

    settings.weeklySummary =
        weeklySummary.checked;

    settings.emailNotifications =
        emailNotifications.checked;

    localStorage.setItem(

        SETTINGS_STORAGE,

        JSON.stringify(settings)

    );

    alert(

        "Settings saved successfully."

    );

}



// =============================================
// SAVE BUTTON
// =============================================

saveSettingsBtn.addEventListener(

    "click",

    saveSettings

);



// =============================================
// UPDATE NOTIFICATION SWITCHES
// =============================================

function populateNotificationSettings(){

    lowStockAlerts.checked =

        settings.lowStockAlerts;

    dailyReport.checked =

        settings.dailyReport;

    weeklySummary.checked =

        settings.weeklySummary;

    emailNotifications.checked =

        settings.emailNotifications;

}

// =============================================
// SECURITY BUTTONS
// =============================================

const changePasswordBtn =
    document.getElementById("changePasswordBtn");

const logoutDevicesBtn =
    document.getElementById("logoutDevicesBtn");

const backupDataBtn =
    document.getElementById("backupDataBtn");

const restoreDataBtn =
    document.getElementById("restoreDataBtn");

const resetAppBtn =
    document.getElementById("resetAppBtn");



// =============================================
// SECURITY ACTIONS
// =============================================

if(changePasswordBtn){

    changePasswordBtn.addEventListener("click",()=>{

        alert(
            "Password change will be available after backend integration."
        );

    });

}

if(logoutDevicesBtn){

    logoutDevicesBtn.addEventListener("click",()=>{

        alert(
            "Logout from all devices will be enabled after backend integration."
        );

    });

}



// =============================================
// BACKUP DATA
// =============================================

if(backupDataBtn){

    backupDataBtn.addEventListener("click",()=>{

        const backup = {

            settings

        };

        const blob = new Blob(

            [JSON.stringify(backup,null,2)],

            {

                type:"application/json"

            }

        );

        const url =

            URL.createObjectURL(blob);

        const link =

            document.createElement("a");

        link.href = url;

        link.download =

            "shopledger-backup.json";

        link.click();

        URL.revokeObjectURL(url);

    });

}



// =============================================
// RESTORE DATA
// =============================================

if(restoreDataBtn){

    restoreDataBtn.addEventListener("click",()=>{

        alert(
            "Restore functionality will be connected during backend integration."
        );

    });

}



// =============================================
// RESET APPLICATION
// =============================================

if(resetAppBtn){

    resetAppBtn.addEventListener("click",()=>{

        const confirmed = confirm(

            "This will reset all saved settings. Continue?"

        );

        if(!confirmed){

            return;

        }

        localStorage.removeItem(

            SETTINGS_STORAGE

        );

        settings = {

            ...defaultSettings

        };

        populateForm();

        populateNotificationSettings();

        applyTheme();

        alert(

            "Settings have been reset."

        );

    });

}



// =============================================
// FUTURE API PLACEHOLDERS
// =============================================

// async function fetchSettings(){}

// async function saveSettingsToServer(){}

// async function uploadProfileImage(){}

// async function updateBusinessSettings(){}

// async function updateNotifications(){}



// =============================================
// INITIALIZE PAGE
// =============================================

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        loadSettings();

    }

);