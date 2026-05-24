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

// ── NEWSLETTER ─────────────────────────────────────────────────
function subscribe() {
  const emailInput = document.getElementById('nlEmail');
  const confirm = document.getElementById('nlConfirm');
  const email = emailInput.value.trim();

  if (!email || !email.includes('@')) {
    confirm.textContent = 'Por favor ingresa un correo válido.';
    confirm.style.color = '#c0392b';
    return;
  }

  // Abre el cliente de correo con el email pre-rellenado
  const subject = encodeURIComponent('Quiero unirme al Círculo — Katamar Fashion');
  const body = encodeURIComponent(
    'Hola Katamar,\n\nQuiero ser la primera en saber sobre el lanzamiento de la Skinny Bag.\n\nMi correo: ' + email
  );
  window.location.href = 'mailto:katamar2000@gmail.com?subject=' + subject + '&body=' + body;

  confirm.textContent = '✓ ¡Bienvenida al círculo! Revisa tu correo.';
  confirm.style.color = '#8b6f47';
  emailInput.value = '';
}

// ── TOAST ──────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
