const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

fetch('data/products.json')
  .then(res => res.json())
  .then(data => {

    const product = data.find(p => p.id == productId);

    if (!product) {
      document.getElementById('product-detail').innerHTML = "<p>Product not found</p>";
      return;
    }

    const container = document.getElementById('product-detail');

    container.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>

      <div class="product-info">
        <h1>${product.name}</h1>
        <p class="price">${product.price}</p>

        <p class="description">${product.description}</p>

        <ul class="product-features">
          <li>✔ Fully customizable design</li>
          <li>✔ Premium quality finish</li>
          <li>✔ Perfect for gifting</li>
        </ul>
      </div>
    `;

    // WhatsApp link
    const whatsappBtn = document.getElementById('whatsapp-order');

    whatsappBtn.href = `https://wa.me/919398287399?text=Hi, I want to order ${product.name}`;
  });
