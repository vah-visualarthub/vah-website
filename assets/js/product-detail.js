const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

const container = document.getElementById('product-detail');
const errorSection = document.getElementById('product-error');
const whatsappBtn = document.getElementById('whatsapp-order');

fetch('data/products.json')
  .then(res => res.json())
  .then(data => {

    const product = data.find(p => p.id == productId);

    if (!product) {
      container.style.display = "none";
      errorSection.style.display = "block";
      return;
    }

    container.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="product-info">
        <h1>${product.name}</h1>
        <p class="price">${product.price}</p>

        <p class="desc">
          This is a fully customizable product. You can add your photo,
          text, or design based on your requirement.
        </p>

        <ul class="feature-list">
          <li>✔ High-quality print</li>
          <li>✔ Personalised design</li>
          <li>✔ Perfect for gifting</li>
        </ul>
      </div>
    `;

    // WhatsApp Message
    const message = `Hi VAH, I want to order this product:\n\n${product.name}\nPrice: ${product.price}`;
    const encoded = encodeURIComponent(message);

    whatsappBtn.href = `https://wa.me/919398287399?text=${encoded}`;
    whatsappBtn.target = "_blank";

  });
