/*******************************
 * VAH – Visual Art Hub
 * WhatsApp-first Catalogue Logic
 *******************************/

// ===== CONFIG =====
const VAH_WHATSAPP_NUMBER = "9398287399";

// ===== PRODUCT DATA =====
// You can easily add / remove products here later
const products = [
  {
    id: 1,
    name: "Photo Frames",
    category: "Frames",
    image: "assets/images/product-frames.jpg"
  },
  {
    id: 2,
    name: "Custom Mugs",
    category: "Mugs",
    image: "assets/images/product-mugs.jpg"
  },
  {
    id: 3,
    name: "Printed T-Shirts",
    category: "T-shirts",
    image: "assets/images/product-tshirts.jpg"
  },
  {
    id: 4,
    name: "Custom Keychains",
    category: "Keychains",
    image: "assets/images/product-keychains.jpg"
  },
  {
    id: 5,
    name: "Magic Mirror",
    category: "Magic Mirror",
    image: "assets/images/product-magic-mirror.jpg"
  },
  {
    id: 6,
    name: "Photo Pillows",
    category: "Pillows",
    image: "assets/images/product-pillows.jpg"
  }
];

// ===== STATE =====
let selectedItems = {};

// ===== RENDER PRODUCTS =====
function renderProducts(filterCategory = "All") {
  const container = document.getElementById("products-container");
  if (!container) return;

  container.innerHTML = "";

  const filteredProducts =
    filterCategory === "All"
      ? products
      : products.filter(p => p.category === filterCategory);

  filteredProducts.forEach(product => {
    const qty = selectedItems[product.id]?.qty || 1;

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="category">${product.category}</p>

      <div class="qty-control">
        <button onclick="changeQty(${product.id}, -1)">−</button>
        <span id="qty-${product.id}">${qty}</span>
        <button onclick="changeQty(${product.id}, 1)">+</button>
      </div>

      <button class="select-btn" onclick="toggleSelect(${product.id})">
        ${selectedItems[product.id] ? "Selected" : "Select Item"}
      </button>
    `;

    container.appendChild(card);
  });
}

// ===== QUANTITY CHANGE =====
function changeQty(productId, delta) {
  if (!selectedItems[productId]) {
    selectedItems[productId] = { qty: 1 };
  }

  selectedItems[productId].qty += delta;
  if (selectedItems[productId].qty < 1) {
    selectedItems[productId].qty = 1;
  }

  document.getElementById(`qty-${productId}`).innerText =
    selectedItems[productId].qty;
}

// ===== SELECT / DESELECT ITEM =====
function toggleSelect(productId) {
  if (selectedItems[productId]) {
    delete selectedItems[productId];
  } else {
    selectedItems[productId] = { qty: 1 };
  }

  renderProducts(getActiveCategory());
}

// ===== CATEGORY FILTER =====
function filterProducts(category) {
  document.querySelectorAll(".filter-btn").forEach(btn =>
    btn.classList.remove("active")
  );

  document
    .querySelector(`[data-category="${category}"]`)
    .classList.add("active");

  renderProducts(category);
}

// ===== GET ACTIVE CATEGORY =====
function getActiveCategory() {
  const activeBtn = document.querySelector(".filter-btn.active");
  return activeBtn ? activeBtn.dataset.category : "All";
}

// ===== SEND TO WHATSAPP =====
function sendToWhatsApp() {
  const selectedIds = Object.keys(selectedItems);

  if (selectedIds.length === 0) {
    alert("Please select at least one item.");
    return;
  }

  let message = "Hello VAH – Visual Art Hub 👋%0A%0A";
  message += "I am interested in the following items:%0A";

  selectedIds.forEach((id, index) => {
    const product = products.find(p => p.id == id);
    const qty = selectedItems[id].qty;

    message += `${index + 1}. ${product.name} (${product.category}) - Qty: ${qty}%0A`;
  });

  message += "%0APlease contact me with details. Thank you!";

  const url = `https://wa.me/${VAH_WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, "_blank");
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
