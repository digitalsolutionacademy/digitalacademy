// Mobile menu functionality
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");

btn.addEventListener("click", () => {
  btn.classList.toggle("open");
  menu.classList.toggle("hidden");
  menu.classList.toggle("flex");
});

// Close mobile menu when clicking on links
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    btn.classList.remove("open");
    menu.classList.add("hidden");
    menu.classList.remove("flex");
  });
});

// Animation on scroll
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(".animate-fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // Form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Here you would normally send the form data to a server
      // For this example, we'll just show an alert
      alert("Thank you for your message! We will contact you soon.");
      contactForm.reset();
    });
  }
});

// Form validation
document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // If validation passes, show success message
  alert("Registration successful! You will be redirected to the login page.");
  window.location.href = "login.html";
});

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const togglePassword = document.getElementById("togglePassword");

  // Toggle password visibility
  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Toggle eye icon
    const eyeIcon = this.querySelector("i");
    if (type === "text") {
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    } else {
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    }
  });

  // Validate email format
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Form validation
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Reset error messages
    emailError.style.display = "none";
    passwordError.style.display = "none";

    // Validate email
    if (!emailInput.value.trim()) {
      emailError.textContent = "Email is required";
      emailError.style.display = "block";
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address";
      emailError.style.display = "block";
      isValid = false;
    }

    // Validate password
    if (!passwordInput.value.trim()) {
      passwordError.textContent = "Password is required";
      passwordError.style.display = "block";
      isValid = false;
    } else if (passwordInput.value.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters";
      passwordError.style.display = "block";
      isValid = false;
    }

    // If form is valid, simulate login
    if (isValid) {
      // In a real application, you would send this data to your server
      console.log("Login attempt with:", {
        email: emailInput.value,
        password: passwordInput.value,
      });

      // Show success message (in a real app, you'd redirect or handle authentication)
      alert("Login successful! Redirecting to dashboard...");
      window.location.href = "dashboard.html"; // Redirect to homepage or dashboard
    }
  });

  // Real-time validation
  emailInput.addEventListener("input", function () {
    if (this.value.trim() && !isValidEmail(this.value.trim())) {
      emailError.textContent = "Please enter a valid email address";
      emailError.style.display = "block";
    } else {
      emailError.style.display = "none";
    }
  });

  passwordInput.addEventListener("input", function () {
    if (this.value.length > 0 && this.value.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters";
      passwordError.style.display = "block";
    } else {
      passwordError.style.display = "none";
    }
  });
});
