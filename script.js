// =========================
// 🎛️ Sélecteurs principaux
// =========================
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');
let searchBtn = document.querySelector('#search-btn');
let searchForm = document.querySelector('.search-form');
let cartBtn = document.querySelector('#cart-btn');
let cartItem = document.querySelector('.cart-items-container');

// =========================
// 🧭 Menu / Search / Panier
// =========================
menu.onclick = () => {
  navbar.classList.toggle('active');
  searchForm.classList.remove('active');
  cartItem.classList.remove('active');
};

searchBtn.onclick = () => {
  searchForm.classList.toggle('active');
  navbar.classList.remove('active');
  cartItem.classList.remove('active');
};

cartBtn.onclick = () => {
  cartItem.classList.toggle('active');
  navbar.classList.remove('active');
  searchForm.classList.remove('active');
};

// =========================
// 🔍 Fonction de recherche
// =========================
let searchBox = document.querySelector('#search-box');
let allItems = document.querySelectorAll('.menu .box, .products .box');

searchBox.addEventListener('input', () => {
  let searchVal = searchBox.value.toLowerCase();

  allItems.forEach(item => {
    let title = item.querySelector('h3').innerText.toLowerCase();
    if (title.includes(searchVal)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});

// =========================
// 🛒 Logique du panier
// =========================
let addToCartButtons = document.querySelectorAll('.btn');
let cartContainer = document.querySelector('.cart-items-wrapper');
let cartTotalSpan = document.querySelector('.cart-total span');

function updateCartTotal() {
  let cartItems = cartContainer.querySelectorAll('.cart-item');
  let total = 0;
  cartItems.forEach(item => {
    let priceText = item.querySelector('.price').innerText;
    total += parseFloat(priceText) || 0;
  });
  cartTotalSpan.innerText = total + 'da';
}

// Fonction pour ajouter un produit au panier
function addItemToCart(image, title, price) {
  let item = document.createElement('div');
  item.classList.add('cart-item');
  item.innerHTML = `
    <span class="fas fa-times"></span>
    <img src="${image}" alt="">
    <div class="content">
      <h3>${title}</h3>
      <div class="price">${price}</div>
    </div>
  `;

  // Ajouter dans le panier
  cartContainer.appendChild(item);
  updateCartTotal();

  // 🔄 Rebrancher la croix ❌ pour supprimer
  item.querySelector('.fa-times').addEventListener('click', () => {
    item.remove();
    updateCartTotal();
  });
}

// Événement sur chaque bouton "Add to cart"
addToCartButtons.forEach(button => {
  button.addEventListener('click', e => {
    // avoid empty href reload
    e.preventDefault();
    let box = button.closest('.box');
    if (!box) return;

    let image = box.querySelector('img')?.src;
    let title = box.querySelector('h3')?.innerText;
    let price = box.querySelector('.price')?.innerText;

    addItemToCart(image, title, price);
    cartItem.classList.add('active');
  });
});

// =========================
// ❌ Bouton pour fermer le panier
// =========================
const closeCartBtn = document.querySelector('.close-cart');

if (closeCartBtn) {
  closeCartBtn.addEventListener('click', () => {
    cartItem.classList.remove('active');
  });
}

// =========================
// ✨ Effets au scroll
// =========================
const header = document.querySelector('.header');
const sections = document.querySelectorAll("section");

window.onscroll = () => {
  // Header effect
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Close components on scroll
  navbar.classList.remove('active');
  searchForm.classList.remove('active');

  // Section animations
  const trigger = window.innerHeight * 0.85;
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < trigger) {
      sec.classList.add("visible");
    }
  });
};
