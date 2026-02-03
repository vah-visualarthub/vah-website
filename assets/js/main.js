// ==========================
// MAIN.JS FOR VAH WEBSITE
// ==========================

document.addEventListener("DOMContentLoaded", function() {
  // ======== VARIABLES ========
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");
  const addButtons = document.querySelectorAll(".add-to-cart");
  const selectedItemsList = document.getElementById("selected-items");
  const whatsappOrderBtn = document.getElementById("whatsapp-order");
  const whatsappStickyBtn = document.getElementById("whatsapp-order-sticky");
  const whatsappNumber = "919398287399"; // Use your WhatsApp number without + or spaces

  let selectedProducts = [];

  // ======== PRODUCT FILTERING ========
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // Set active class
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      productCards.forEach(card => {
        if(filter === "all" || card.dataset.category === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // ======== ADD / REMOVE PRODUCTS ========
  addButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const productName = btn.dataset.product;

      // Check if product already selected
      const index = selectedProducts.indexOf(productName);
      if(index === -1) {
        selectedProducts.push(productName);
        btn.textContent = "Remove";
        btn.style.backgroundColor = "#ff6666";
      } else {
        selectedProducts.splice(index, 1);
        btn.textContent = "Add";
        btn.style.backgroundColor = "#25d366";
      }

      updateSelectedItems();
    });
  });

  // ======== UPDATE SELECTED ITEMS LIST ========
  function updateSelectedItems() {
    // Clear current list
    selectedItemsList.innerHTML = "";

    if(selectedProducts.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No items selected yet.";
      selectedItemsList.appendChild(li);

      whatsappOrderBtn.disabled = true;
      whatsappStickyBtn.disabled = true;
    } else {
      selectedProducts.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        selectedItemsList.appendChild(li);
      });

      whatsappOrderBtn.disabled = false;
      whatsappStickyBtn.disabled = false;
    }
  }

  // ======== WHATSAPP ORDER BUTTON ========
  function sendWhatsAppOrder() {
    if(selectedProducts.length === 0) return;

    const message = `Hi VAH, I’d like to order the following personalized items: ${selectedProducts.join(", ")}. Please guide me further.`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  }

  whatsappOrderBtn.addEventListener("click", sendWhatsAppOrder);
  whatsappStickyBtn.addEventListener("click", sendWhatsAppOrder);

});
