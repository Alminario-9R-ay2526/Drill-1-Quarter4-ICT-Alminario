// ======================================================
// ELECTRICITY CONSUMPTION CLASSIFIER - MAIN SCRIPT
// Contains: Data types, variables, conditionals, outputs
// Author: ICT 9 Student
// ======================================================

// --- GLOBAL VARIABLES (JavaScript data types) ---
let isLoggedIn = false;          // boolean
const VALID_USER = "user";       // string
const VALID_PASS = "pass123";    // string
let currentCategory = "";        // string for classification

// DOM elements
const loginSection = document.getElementById("loginSection");
const classifierSection = document.getElementById("classifierSection");
const loginBtn = document.getElementById("loginBtn");
const loginErrorDiv = document.getElementById("loginError");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const classifyBtn = document.getElementById("classifyBtn");
const kwhInput = document.getElementById("kwhInput");
const resultText = document.getElementById("resultText");
const resultDescription = document.getElementById("resultDescription");
const innerHtmlDemo = document.getElementById("innerHtmlDemo");

// --- Helper: Display info using innerHTML ---
function updateInnerHtmlDemo(message) {
    // using innerHTML to output dynamic content
    innerHtmlDemo.innerHTML = `<i class="bi bi-info-circle-fill text-primary"></i> ${message}`;
}

// --- LOGIN AUTHENTICATION (Conditional statements) ---
function authenticateUser(username, password) {
    // Using conditional statements to check credentials
    if (username === VALID_USER && password === VALID_PASS) {
        return true;
    } else {
        return false;
    }
}

// Handle login button click
loginBtn.addEventListener("click", () => {
    const enteredUser = usernameInput.value.trim();
    const enteredPass = passwordInput.value.trim();
    
    // JavaScript conditional for validation
    if (authenticateUser(enteredUser, enteredPass)) {
        // Successful login
        loginErrorDiv.classList.add("d-none");
        isLoggedIn = true;
        
        // Output using window.alert (required demo)
        window.alert("✅ Login successful! Welcome to the Electricity Classifier.");
        
        // Switch UI: hide login, show classifier
        loginSection.style.display = "none";
        classifierSection.style.display = "block";
        
        // Use innerHTML to show a welcome message in result area
        resultText.innerHTML = "🔓 You are logged in. Enter kWh to classify.";
        resultDescription.innerHTML = "";
        
        // Additional innerHTML demo update
        updateInnerHtmlDemo("Login successful at " + new Date().toLocaleTimeString());
    } else {
        // Failed login - show error message using innerHTML
        loginErrorDiv.classList.remove("d-none");
        loginErrorDiv.innerHTML = "<i class='bi bi-exclamation-triangle-fill'></i> Invalid username or password. Please try again.";
        // Also trigger window.alert (optional demo)
        window.alert("❌ Authentication failed. Check credentials.");
    }
});

// --- CLASSIFICATION FUNCTION (Conditional statements, variables) ---
function classifyElectricity(kwh) {
    // Convert to number (data type number)
    let usage = Number(kwh);
    let category = "";
    let description = "";
    
    // Using conditional statements (if-else if chain)
    if (usage >= 0 && usage <= 100) {
        category = "Lifeline Consumer";
        description = "Discounted electricity rates apply. You're eligible for socialized pricing.";
    } else if (usage >= 101 && usage <= 200) {
        category = "Low Consumption";
        description = "Normal residential rate. Efficient usage!";
    } else if (usage >= 201 && usage <= 300) {
        category = "Average Consumption";
        description = "Typical electricity usage for a medium household.";
    } else if (usage >= 301 && usage <= 500) {
        category = "High Consumption";
        description = "Higher electricity usage. Consider energy-saving appliances.";
    } else if (usage > 500) {
        category = "Very High Consumption";
        description = "Heavy electricity user! Audit your appliances or check for HVAC efficiency.";
    } else {
        category = "Invalid input";
        description = "Please enter a valid positive number for kWh.";
    }
    
    return { category, description };
}

// Handle classification button click
classifyBtn.addEventListener("click", () => {
    if (!isLoggedIn) {
        // This should not happen because UI is hidden, but safety
        window.alert("Please login first!");
        return;
    }
    
    let rawValue = kwhInput.value;
    if (rawValue === "") {
        // Output using innerHTML for error message
        resultText.innerHTML = "⚠️ Please enter a kWh value.";
        resultDescription.innerHTML = "";
        updateInnerHtmlDemo("Empty input detected.");
        return;
    }
    
    let kwhNumber = parseFloat(rawValue);
    // Check if valid number
    if (isNaN(kwhNumber) || kwhNumber < 0) {
        resultText.innerHTML = " Invalid number! Use positive numeric values.";
        resultDescription.innerHTML = "";
        updateInnerHtmlDemo("Invalid number entered: " + rawValue);
        return;
    }
    
    // Get classification
    const { category, description } = classifyElectricity(kwhNumber);
    currentCategory = category;
    
    // Display result using innerHTML
    resultText.innerHTML = `🔋 ${kwhNumber} kWh → <span class="text-primary">${category}</span>`;
    resultDescription.innerHTML = `<p class="mt-2"><i class="bi bi-chat-dots"></i> ${description}</p>
                                   <hr><small class="text-secondary">⚡ Recommendation: ${getEnergyTip(category)}</small>`;
    
    // Update demo output via innerHTML
    updateInnerHtmlDemo(`Classified ${kwhNumber} kWh as "${category}" at ${new Date().toLocaleTimeString()}`);
});

// Helper function for unique tips (extra logic)
function getEnergyTip(category) {
    let tip = "";
    switch(category) {
        case "Lifeline Consumer": tip = "Keep up the low usage, check for appliance leaks."; break;
        case "Low Consumption": tip = "Switch to LED bulbs to stay in this bracket."; break;
        case "Average Consumption": tip = "Unplug idle electronics to save up to 10%."; break;
        case "High Consumption": tip = "Consider inverter AC / refrigerator."; break;
        case "Very High Consumption": tip = "Schedule an energy audit today!"; break;
        default: tip = "Monitor monthly usage.";
    }
    return tip;
}

// --- Demo: window.alert button (additional requirement) ---
const alertDemoBtn = document.getElementById("alertDemoBtn");
if (alertDemoBtn) {
    alertDemoBtn.addEventListener("click", () => {
        window.alert(" JavaScript Alert Demo: Electricity conservation helps the planet! ⚡");
    });
}

// --- Initial innerHTML output on page load (without login) ---
updateInnerHtmlDemo("Ready — please log in to use the classifier.");

// Small comment: All JavaScript data types used: string, number, boolean, object (DOM elements)
// Variables: let, const. Conditional statements: if-else, switch.
// Output methods: innerHTML, window.alert, document.write (see footer in HTML)