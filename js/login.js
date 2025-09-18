// Import Firebase auth functions
import { auth } from "./firebase-config.js";  
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Attach login form
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Firebase sign in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("✅ Login successful:", user.email);

    // Redirect to dashboard
    window.location.href = "dashboard.html"; 
  } catch (error) {
    console.error("❌ Login failed:", error.message);
    alert(error.message);
  }
});
