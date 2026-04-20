let allProducts = [];

fetch('data/products.json')
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    displayProducts(data);
  });

function displayProducts(products) {
  const container = document.getElementById('products-container');
  container.innerHTML = '';

  products.forEach(product => {
    const card = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <a href="product-detail.html?id=${product.id}" class="view-btn">
          View Details
        </a>
      </div>
    `;
    container.innerHTML += card;
  });
}

function filterProducts(category) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  event.target.classList.add('active');

  if (category === 'All') {
    displayProducts(allProducts);
  } else {
    const filtered = allProducts.filter(p => p.category === category);
    displayProducts(filtered);
  }
}
