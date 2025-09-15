const SUPABASE_URL = "https://pbxccdobbiebsyiypgvl.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieGNjZG9iYmllYnN5aXlwZ3ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MzA2NTYsImV4cCI6MjA3MzUwNjY1Nn0.xgnj4uYG28VvPptlGjI-gVJ24NCc_qbVzwv3rxU4xp4";
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const loginForm = document.getElementById("loginForm");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

// Hide errors by default
emailError.style.display = "none";
passwordError.style.display = "none";

// Toggle password visibility
document.getElementById("togglePassword").addEventListener("click", () => {
  const passwordField = document.getElementById("password");
  const icon = document.querySelector("#togglePassword i");
  if (passwordField.type === "password") {
    passwordField.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
});

// Handle login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Reset errors
  emailError.style.display = "none";
  passwordError.style.display = "none";

  if (!email) {
    emailError.style.display = "block";
    return;
  }
  if (!password) {
    passwordError.style.display = "block";
    return;
  }

  try {
    // Login with Supabase Auth
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Fetch user profile (optional)
    const { data: profile } = await client
      .from("user_profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    alert("Welcome back, " + (profile?.full_name || "User") + "!");

    // Redirect to dashboard
    window.location.href = "dashboard.html";
  } catch (err) {
    passwordError.style.display = "block";
    passwordError.innerText = err.message;
  }
});
