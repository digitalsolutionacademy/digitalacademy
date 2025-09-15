document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  // Toggle mobile menu
  function toggleMenu() {
    // Toggle hamburger button animation
    menuBtn.classList.toggle("open");

    // Toggle mobile menu visibility
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
  }

  // Add click event to hamburger menu button
  menuBtn.addEventListener("click", toggleMenu);

  // Close menu when clicking on a link (optional)
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
      menuBtn.classList.remove("open");
    });
  });

  // Close menu when clicking outside (optional)
  document.addEventListener("click", function (event) {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnMenuBtn = menuBtn.contains(event.target);

    if (
      !isClickInsideMenu &&
      !isClickOnMenuBtn &&
      !mobileMenu.classList.contains("hidden")
    ) {
      mobileMenu.classList.add("hidden");
      mobileMenu.classList.remove("flex");
      menuBtn.classList.remove("open");
    }
  });
});

// // ======================
// // Supabase Initialization (ONLY ONCE)
// // ======================
// const SUPABASE_URL = "https://xfgjhanlnyoxonxigwiz.supabase.co";
// const SUPABASE_ANON_KEY =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmZ2poYW5sbnlveG9ueGlnd2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NzkzMzksImV4cCI6MjA3MzM1NTMzOX0.UlXgfMWdT2SFGdrsfQZj3gIh0mI65-5IGy7E5wwotwM";
// const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// // ======================
// // DOM Ready
// // ======================
// window.addEventListener("DOMContentLoaded", () => {
//   // Mobile menu code...
//   // Scroll animations code...

//   // ======================
//   // Registration Form
//   // ======================
//   document
//     .getElementById("registerForm")
//     .addEventListener("submit", async function (e) {
//       e.preventDefault();

//       const email = document.getElementById("email").value.trim();
//       const password = document.getElementById("password").value;
//       const fullname = document.getElementById("fullname").value.trim();
//       const phone = document.getElementById("phone").value.trim();
//       const course = document.getElementById("course").value.trim();

//       // Clear previous errors
//       document.getElementById("emailError").textContent = "";
//       document.getElementById("passwordError").textContent = "";
//       document.getElementById("generalError").textContent = "";

//       // Email validation
//       if (!isValidEmail(email)) {
//         document.getElementById("emailError").textContent =
//           "Please enter a valid email address";
//         return;
//       }

//       // Password validation
//       const passwordError = validatePassword(password);
//       if (passwordError) {
//         document.getElementById("passwordError").textContent = passwordError;
//         return;
//       }

//       try {
//         // Register user with Supabase Auth
//         const { data, error } = await supabaseClient.auth.signUp({
//           email,
//           password,
//           options: {
//             emailRedirectTo: window.location.origin,
//           },
//         });

//         if (error) {
//           handleAuthError(error);
//           return;
//         }

//         // Insert profile data AFTER user signup
//         if (data?.user) {
//           const { error: profileError } = await supabaseClient
//             .from("profiles")
//             .insert([
//               {
//                 id: data.user.id, // link profile to auth user
//                 fullname,
//                 phone,
//                 course,
//               },
//             ]);

//           if (profileError) {
//             console.error("Error saving profile:", profileError);
//             document.getElementById("generalError").textContent =
//               "Account created but failed to save profile info.";
//             return;
//           }
//         }

//         alert(
//           "Registration successful! Please check your email to confirm your account."
//         );
//         window.location.href = "Login.html";
//       } catch (err) {
//         console.error("Registration error:", err);
//         document.getElementById("generalError").textContent =
//           "An unexpected error occurred. Please try again.";
//       }
//     });

//   // ======================
//   // Validation Functions
//   // ======================
//   function isValidEmail(email) {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   }

//   function validatePassword(password) {
//     if (password.length < 8) {
//       return "Password must be at least 8 characters long";
//     }
//     if (!/[A-Z]/.test(password)) {
//       return "Password must contain at least one uppercase letter";
//     }
//     if (!/[a-z]/.test(password)) {
//       return "Password must contain at least one lowercase letter";
//     }
//     if (!/\d/.test(password)) {
//       return "Password must contain at least one number";
//     }
//     if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) {
//       return "Password must contain at least one special character";
//     }
//     return null;
//   }

//   function handleAuthError(error) {
//     const errorElement = document.getElementById("generalError");
//     if (!error) return;

//     switch (error.message) {
//       case "User already registered":
//         errorElement.textContent =
//           "This email is already registered. Please log in.";
//         break;
//       case "Password should be at least 6 characters":
//         errorElement.textContent =
//           "Password is too weak. Please use a stronger password.";
//         break;
//       case "Invalid email":
//         errorElement.textContent = "Please enter a valid email address.";
//         break;
//       default:
//         errorElement.textContent =
//           error.message || "An error occurred during registration.";
//     }
//   }
//   // ======================
//   // Login Form
//   // ======================
//   const loginForm = document.getElementById("loginForm");
//   if (loginForm) {
//     const emailInput = document.getElementById("email");
//     const passwordInput = document.getElementById("password");
//     const emailError = document.getElementById("emailError");
//     const passwordError = document.getElementById("passwordError");
//     const togglePassword = document.getElementById("togglePassword");

//     // Toggle password visibility
//     if (togglePassword) {
//       togglePassword.addEventListener("click", () => {
//         const type =
//           passwordInput.getAttribute("type") === "password"
//             ? "text"
//             : "password";
//         passwordInput.setAttribute("type", type);

//         const eyeIcon = togglePassword.querySelector("i");
//         if (eyeIcon) {
//           if (type === "text") {
//             eyeIcon.classList.remove("fa-eye");
//             eyeIcon.classList.add("fa-eye-slash");
//           } else {
//             eyeIcon.classList.remove("fa-eye-slash");
//             eyeIcon.classList.add("fa-eye");
//           }
//         }
//       });
//     }

//     // Validate email format
//     function isValidEmail(email) {
//       const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       return re.test(email);
//     }

//     loginForm.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       let isValid = true;

//       emailError.style.display = "none";
//       passwordError.style.display = "none";

//       if (!emailInput.value.trim()) {
//         emailError.textContent = "Email is required";
//         emailError.style.display = "block";
//         isValid = false;
//       } else if (!isValidEmail(emailInput.value.trim())) {
//         emailError.textContent = "Please enter a valid email";
//         emailError.style.display = "block";
//         isValid = false;
//       }

//       if (!passwordInput.value.trim()) {
//         passwordError.textContent = "Password is required";
//         passwordError.style.display = "block";
//         isValid = false;
//       } else if (passwordInput.value.length < 6) {
//         passwordError.textContent = "Password must be at least 6 characters";
//         passwordError.style.display = "block";
//         isValid = false;
//       }

//       if (!isValid) return;

//       // Supabase login
//       const { data, error } = await supabaseClient.auth.signInWithPassword({
//         email: emailInput.value,
//         password: passwordInput.value,
//       });

//       if (error) {
//         alert("Login failed: " + error.message);
//       } else {
//         console.log("User logged in:", data.user);

//         // redirect to dashboard
//         window.location.href = "dashboard.html";
//       }
//     });
//   }

//   // ======================
//   // Dashboard
//   // ======================
//   const welcome = document.getElementById("welcome");
//   if (welcome) {
//     (async () => {
//       const {
//         data: { session },
//       } = await supabaseClient.auth.getSession();

//       if (!session) {
//         window.location.href = "Login.html";
//         return;
//       }

//       welcome.textContent =
//         "Welcome " +
//         (session.user.user_metadata.fullname || session.user.email);

//       const logoutBtn = document.getElementById("logout-btn");
//       if (logoutBtn) {
//         logoutBtn.addEventListener("click", async () => {
//           await supabaseClient.auth.signOut();
//           alert("Logout successful!");
//           window.location.href = "Login.html";
//         });
//       }
//     })();
//   }

//   // ======================
//   // Sidebar (dashboard only)
//   // ======================
//   const menuToggle = document.getElementById("menu-toggle");
//   const sidebar = document.getElementById("sidebar");
//   const overlay = document.getElementById("overlay");

//   if (menuToggle && sidebar && overlay) {
//     menuToggle.addEventListener("click", () => {
//       sidebar.classList.toggle("open");
//       overlay.classList.toggle("active");
//     });

//     overlay.addEventListener("click", () => {
//       sidebar.classList.remove("open");
//       overlay.classList.remove("active");
//     });
//   }

//   const collapseToggle = document.getElementById("collapse-toggle");
//   if (collapseToggle && sidebar) {
//     collapseToggle.addEventListener("click", () => {
//       sidebar.classList.toggle("collapsed");

//       document.querySelector(".main-content").style.marginLeft =
//         sidebar.classList.contains("collapsed") ? "80px" : "300px";

//       const icon = collapseToggle.querySelector("i");
//       if (icon) {
//         if (icon.classList.contains("fa-angle-double-left")) {
//           icon.classList.remove("fa-angle-double-left");
//           icon.classList.add("fa-angle-double-right");
//         } else {
//           icon.classList.remove("fa-angle-double-right");
//           icon.classList.add("fa-angle-double-left");
//         }
//       }
//     });
//   }
// });
