// dashboard.js
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Check if user is logged in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      // Get the student's Firestore document
      const docRef = doc(db, "students", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        // ✅ Update all UI fields dynamically
        document.getElementById("fullname").textContent = data.fullname;
        document.getElementById("profileName").textContent = data.fullname;
        document.getElementById("avatarInitials").textContent = data.fullname
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();

        document.getElementById("fullnameInput").value = data.fullname;
        document.getElementById("emailInput").value = data.email;
        document.getElementById("phoneInput").value = data.phone;
        document.getElementById("courseInput").value = data.course;
        document.getElementById("enrollmentDate").value = data.createdAt.toDate().toDateString();
        document.getElementById("studentId").value = user.uid;

      } else {
        console.log("No student data found!");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  } else {
    // If not logged in, redirect to login page
    window.location.href = "login.html";
  }
});
