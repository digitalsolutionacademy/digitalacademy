import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get values
  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const course = document.getElementById("course").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const generalError = document.getElementById("generalError");

  // Validate password
  if (password !== confirmPassword) {
    generalError.textContent = "Passwords do not match.";
    return;
  }

  try {
    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 2. Save extra info in Firestore under user.uid
    await setDoc(doc(db, "students", user.uid), {
      fullname,
      email,
      phone,
      course,
      createdAt: new Date(),
    });

    // 3. Redirect to dashboard
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error(error);
    generalError.textContent = error.message;
  }
});
