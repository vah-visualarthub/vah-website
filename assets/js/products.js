function filterProducts(category, btn) {
  const buttons = document.querySelectorAll('.filter-btn');
  const container = document.getElementById('products-container');
  const emptySection = document.getElementById('no-products');

  buttons.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  let filtered;

  if (category === 'All') {
    filtered = allProducts;
  } else {
    filtered = allProducts.filter(p => p.category === category);
  }

  container.innerHTML = '';

  if (filtered.length === 0) {
    emptySection.style.display = "block";
    return;
  } else {
    emptySection.style.display = "none";
  }

  filtered.forEach(product => {
    const card = `
      <div class="product-card" onclick="goToProduct(${product.id})">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
      </div>
    `;
    container.innerHTML += card;
  });
}

function goToProduct(id) {
  window.location.href = `product-detail.html?id=${id}`;
}
