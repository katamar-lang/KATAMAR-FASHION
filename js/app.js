// ── PRODUCTS DATA ──────────────────────────────────────────────
const products = [
  {
    id: 1, name: "Linen Oversized Blazer", category: "outerwear",
    price: 189, badge: "New",
    colors: ["#c9b99a", "#1a1a1a", "#7090a8"],
    gradient: "linear-gradient(145deg, #d4c4a8 0%, #b5a48a 100%)"
  },
  {
    id: 2, name: "Silk Wrap Midi Dress", category: "tops",
    price: 145, badge: "Bestseller",
    colors: ["#c4a882", "#8b6f47", "#a8b5a0"],
    gradient: "linear-gradient(145deg, #e8d5c0 0%, #c9a882 100%)"
  },
  {
    id: 3, name: "Wide-Leg Linen Trousers", category: "bottoms",
    price: 98, badge: null,
    colors: ["#f0ebe3", "#6b7c63", "#555555"],
    gradient: "linear-gradient(145deg, #e0d8cc 0%, #c8bfb0 100%)"
  },
  {
    id: 4, name: "Merino Knit Cardigan", category: "tops",
    price: 128, badge: "New",
    colors: ["#c9b99a", "#8b7355", "#a8b5a0"],
    gradient: "linear-gradient(145deg, #d8cfc4 0%, #b8a898 100%)"
  },
  {
    id: 5, name: "Structured Tote Bag", category: "accessories",
    price: 79, badge: null,
    colors: ["#1a1a1a", "#c9b99a", "#8b6f47"],
    gradient: "linear-gradient(145deg, #4a3f35 0%, #2a1f15 100%)"
  },
  {
    id: 6, name: "Cropped Linen Shirt", category: "tops",
    price: 88, badge: "Sale",
    colors: ["#f0ebe3", "#7090a8", "#c9b99a"],
    gradient: "linear-gradient(145deg, #ddd5c8 0%, #c5bcb0 100%)"
  },
  {
    id: 7, name: "Tailored Wide Culottes", category: "bottoms",
    price: 112, badge: null,
    colors: ["#1a1a1a", "#a8b5a0", "#c9b99a"],
    gradient: "linear-gradient(145deg, #b5c4b0 0%, #8a9e84 100%)"
  },
  {
    id: 8, name: "Leather Belt — Slim", category: "accessories",
    price: 55, badge: null,
    colors: ["#1a1a1a", "#8b6f47"],
    gradient: "linear-gradient(145deg, #6b5040 0%, #3a2515 100%)"
  }
];

let cart = [];
let activeFilter = 'all';

// ── RENDER PRODUCTS ────────────────────────────────────────────
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  grid.innerHTML = '';

  filtered.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.animation = `revealUp 0.5s ease forwards ${i * 0.08}s`;

    const dotsHTML = p.colors.map(c =>
      `<div class="color-dot" style="background:${c}"></div>`
    ).join('');

    card.innerHTML = `
      <div class="product-img">
        <div class="product-img-bg" style="background:${p.gradient}; height:100%;"></div>
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <button class="product-quick-add" onclick="addToCart(${p.id}, event)">
          Add to Bag +
        </button>
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-meta">
          <span class="product-category">${p.category}</span>
          <span class="product-price">$${p.price}</span>
        </div>
        <div class="product-colors">${dotsHTML}</div>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ── FILTER ─────────────────────────────────────────────────────
function filterProducts(filter, btn) {
  activeFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(filter);
}

// ── CART ───────────────────────────────────────────────────────
function addToCart(id, e) {
  e.stopPropagation();
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  showToast(`${product.name} added to bag ✓`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
  renderCart();
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = count;
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (cart.length === 0) {
    container.innerHTML = '<p class="cart-empty">Your bag is empty.</p>';
    footer.style.display = 'none';
    return;
  }

  footer.style.display = 'block';
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cartTotal').textContent = total;

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img" style="background:${item.gradient}; border-radius:2px;"></div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price} × ${item.qty}</div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    </div>
  `).join('');
}

function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  drawer.classList.toggle('open');
  overlay.classList.toggle('open');
}

// ── TOAST ──────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ── NEWSLETTER ─────────────────────────────────────────────────
function subscribe() {
  const email = document.getElementById('nlEmail').value;
  const confirm = document.getElementById('nlConfirm');
  if (!email.includes('@')) {
    confirm.textContent = 'Please enter a valid email.';
    confirm.style.color = '#c0392b';
    return;
  }
  confirm.textContent = '✓ You\'re on the list. Welcome to the circle.';
  confirm.style.color = '#8b6f47';
  document.getElementById('nlEmail').value = '';
}

// ── CUSTOM CURSOR ──────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const dot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(2)');
  el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
});

// ── NAV SCROLL ─────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── INIT ────────────────────────────────────────────────────────
renderProducts();
