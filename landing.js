// landing.js — handles the hamburger menu open/close

document.addEventListener("DOMContentLoaded", function () {
  var hamburgerBtn = document.getElementById("hamburger-btn");
  var mobileMenu = document.getElementById("mobile-menu");
  var closeMenuBtn = document.getElementById("close-menu-btn");

  hamburgerBtn.addEventListener("click", function () {
    mobileMenu.classList.remove("hidden");
  });

  closeMenuBtn.addEventListener("click", function () {
    mobileMenu.classList.add("hidden");
  });

  mobileMenu.addEventListener("click", function (event) {
    if (event.target === mobileMenu) {
      mobileMenu.classList.add("hidden");
    }
  });
});
