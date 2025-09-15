const SUPABASE_URL = "https://pbxccdobbiebsyiypgvl.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieGNjZG9iYmllYnN5aXlwZ3ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MzA2NTYsImV4cCI6MjA3MzUwNjY1Nn0.xgnj4uYG28VvPptlGjI-gVJ24NCc_qbVzwv3rxU4xp4";
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// DOM elements
const nameField = document.querySelector('#profile input[type="text"]');
const emailField = document.querySelector('#profile input[type="email"]');
const phoneField = document.querySelector('#profile input[type="tel"]');
const schoolField = document.querySelector(
  '#profile input[value="Digital Solution Academy"]'
);
const studentIdField = document.querySelector('#profile input[value^="DSA"]');
const logoutBtn = document.getElementById("logout-btn");

// 🔹 Check session on page load
async function checkUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // Not logged in → back to login
    window.location.href = "login.html";
    return;
  }

  const user = session.user;

  // Update DOM with Supabase Auth user
  if (nameField) nameField.value = user.user_metadata.full_name || "Student";
  if (emailField) emailField.value = user.email;
  if (phoneField) phoneField.value = user.user_metadata.phone || "+234 ...";
  if (schoolField) schoolField.value = user.user_metadata.school || "Unknown";
  if (studentIdField)
    studentIdField.value = user.user_metadata.student_id || "DSA-2025-0000";

  // Also update header greeting
  const headerName = document.querySelector("header h2");
  if (headerName)
    headerName.textContent = `Welcome back, ${
      user.user_metadata.full_name || "Student"
    }!`;
}

// 🔹 Logout
logoutBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  await supabase.auth.signOut();
  window.location.href = "login.html";
});

// Run on load
checkUser();
