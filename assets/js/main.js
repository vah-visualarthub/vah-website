/*************************************************
 VAH – Visual Art Hub
 Global JS (Clean Version)
**************************************************/

const WHATSAPP_NUMBER = "919398287399";

/* ================= MOBILE MENU ================= */

function toggleMenu() {
  const nav = document.getElementById("main-nav");
  const hamburger = document.querySelector(".hamburger");

  if (nav && hamburger) {
    nav.classList.toggle("active");
    hamburger.classList.toggle("open");
  }
}

/* ================= CLOSE MENU ON CLICK ================= */

document.addEventListener("DOMContentLoaded", function () {

  const navLinks = document.querySelectorAll("#main-nav a");
  const nav = document.getElementById("main-nav");
  const hamburger = document.querySelector(".hamburger");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (nav && hamburger) {
        nav.classList.remove("active");
        hamburger.classList.remove("open");
      }
    });
  });

});

/* ================= WHATSAPP HELPER ================= */

function openWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(url, "_blank");
}
