/*************************************************
 VAH – Visual Art Hub
 WhatsApp-first Product Selection Logic
**************************************************/

const WHATSAPP_NUMBER = "9398287399";

/* ================= PRODUCT DATA ================= */

const products = [
  { id: 1, name: "Photo Frame", category: "Frames", image: "assets/images/product-frames.jpg" },
  { id: 2, name: "Custom Mug", category: "Mugs", image: "assets/images/product-mugs.jpg" },
  { id: 3, name: "Printed T-Shirt", category: "T-shirts", image: "assets/images/product-tshirts.jpg" },
  { id: 4, name: "Photo Pillow", category: "Pillows", image: "assets/images/product-pillows.jpg" },
  { id: 5, name: "Custom Keychain", category: "Keychains", image: "assets/images/product-keychains.jpg" },
  { id: 6, name: "Magic Mirror", category: "Magic Mirror", image: "assets/images/product-magic-mirror.jpg" }
];

/* ================= STATE ================= */

let selectedProducts = {};

/* ================= RENDER PRODUCTS ================= */

function renderProducts(category = "All") {
  const container = document.getElementById("products-container");
  if (!container) return;

  container.innerHTML = "";

  const filtered =
    category === "All"
      ? products
      : products.filter(p => p.category === category);

  filtered.forEach(product => {
    const quantity = selectedProducts[product.id] || 0;

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>

      <div style="padding: 0 16px 20px;">
        <div style="display:flex; justify-content:center; gap:10px; margin-top:12px;">
          <button onclick="decreaseQty(${product.id})">−</button>
          <span style="min-width:30px; text-align:center; font-weight:600;">
            ${quantity}
          </span>
          <button onclick="increaseQty(${product.id})">+</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

/* ================= FILTER ================= */

function filterProducts(category) {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.category === category) {
      btn.classList.add("active");
    }
  });

  renderProducts(category);
}

/* ================= QUANTITY HANDLERS ================= */

function increaseQty(id) {
  selectedProducts[id] = (selectedProducts[id] || 0) + 1;
  renderProducts(getActiveCategory());
}

function decreaseQty(id) {
  if (!selectedProducts[id]) return;

  selectedProducts[id]--;
  if (selectedProducts[id] <= 0) delete selectedProducts[id];

  renderProducts(getActiveCategory());
}

function getActiveCategory() {
  const active = document.querySelector(".filter-btn.active");
  return active ? active.dataset.category : "All";
}

/* ================= WHATSAPP MESSAGE ================= */

function sendToWhatsApp() {
  if (Object.keys(selectedProducts).length === 0) {
    alert("Please select at least one product.");
    return;
  }

  let message = "Hello VAH 👋\n\n";
  message += "I am interested in the following products:\n";

  products.forEach(p => {
    if (selectedProducts[p.id]) {
      message += `• ${p.name} – Qty: ${selectedProducts[p.id]}\n`;
    }
  });

  message += "\nPlease contact me for customization, pricing, and details.\n";
  message += "\nThank you!";

  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(url, "_blank");
}

/* ================= MOBILE MENU ================= */

document.addEventListener("DOMContentLoaded", function () {

  // Render products if on products page
  renderProducts();

  const hamburger = document.querySelector(".hamburger");
  const nav = document.getElementById("main-nav");

  if (hamburger && nav) {

    hamburger.addEventListener("click", function () {
      nav.classList.toggle("active");
      hamburger.classList.toggle("open");
    });

    // Auto close when nav link clicked (better mobile UX)
    document.querySelectorAll("#main-nav a").forEach(link => {
      link.addEventListener("click", function () {
        nav.classList.remove("active");
        hamburger.classList.remove("open");
      });
    });

  }

});
