'use strict';

// Helper function to toggle the "active" class on an element
function elemToggleFunc(elem) {
  elem.classList.toggle("active");
}

/* =========================
   Menu Toggle Functionality
   ========================= */
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

// Group elements that should trigger the toggle
const navElemArr = [overlay, navCloseBtn, navOpenBtn];
navbarLinks.forEach(link => navElemArr.push(link));

// Attach event listeners to all menu toggle elements
navElemArr.forEach(elem => {
  elem.addEventListener("click", function () {
    elemToggleFunc(navbar);
    elemToggleFunc(overlay);
  });
});

/* =========================
   Header Active State on Scroll
   ========================= */
const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 400 ? header.classList.add("active")
    : header.classList.remove("active");
});

/* =========================
   Services Card Flip Effect
   ========================= */
// Flip card to show back side
document.querySelectorAll('.card-btn').forEach(button => {
  button.addEventListener('click', function() {
    const card = this.closest('.card');
    card.classList.add('flipped');
  });
});

// Flip card back to front side
document.querySelectorAll('.card-btn-back').forEach(button => {
  button.addEventListener('click', function() {
    const card = this.closest('.card');
    card.classList.remove('flipped');
  });
});

/* =========================
   Contact Modal Functionality
   ========================= */
   document.getElementById("openModal").addEventListener("click", function () {
    document.getElementById("contactModal").style.display = "flex";
  });
  
  document.querySelector(".close-btn").addEventListener("click", function () {
    document.getElementById("contactModal").style.display = "none";
  });
  
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("contactModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });


  
