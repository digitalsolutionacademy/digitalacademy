// Import Firebase core + services
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDwF5HpQlATEArPonhXSyFi9pzYwnfaxMc",
  authDomain: "digital-744b1.firebaseapp.com",
  projectId: "digital-744b1",
  storageBucket: "digital-744b1.appspot.com", // ✅ fixed
  messagingSenderId: "154430535210",
  appId: "1:154430535210:web:8d1be6b066e61dc9ccb553",
  measurementId: "G-ME82PTK5PN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
