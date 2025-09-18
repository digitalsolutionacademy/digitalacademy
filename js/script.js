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
// Get modal element
const modal = document.getElementById("registration-modal");

// Function to open modal
function openModal() {
  modal.classList.add("active");
  document.body.style.overflow = "hidden"; // Prevent scrolling
}

// Function to close modal
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = ""; // Re-enable scrolling
}

// Close modal when clicking outside
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

// Set up multiple triggers (in your actual implementation)
document.addEventListener("DOMContentLoaded", function () {
  // This would be your actual Register buttons
  const demoTriggers = document.querySelectorAll("[data-modal-trigger]");

  demoTriggers.forEach((trigger) => {
    trigger.addEventListener("click", openModal);
  });
});
