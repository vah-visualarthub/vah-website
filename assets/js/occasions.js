const params = new URLSearchParams(window.location.search);
const occasionType = params.get('type');

document.getElementById('occasion-title').innerText = occasionType;

fetch('data/products.json')
  .then(res => res.json())
  .then(data => {

    const filtered = data.filter(product =>
      product.occasion.includes(occasionType)
    );

    const container = document.getElementById('occasion-products');
    const emptySection = document.getElementById('no-products');

    if (filtered.length === 0) {
      emptySection.style.display = "block";
      return;
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
  });

function goToProduct(id) {
  window.location.href = `product-detail.html?id=${id}`;
}
