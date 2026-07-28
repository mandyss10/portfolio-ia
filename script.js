// ===== Año dinámico =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Tema claro / oscuro (persistente) =====
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const saved = localStorage.getItem('theme');
if (saved) root.setAttribute('data-theme', saved);
const paint = () => { toggle.textContent = root.getAttribute('data-theme') === 'light' ? '☀️' : '🌙'; };
paint();
toggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  paint();
});

// ===== Efecto máquina de escribir =====
const roles = [
  'Ingeniero de Inteligencia Artificial',
  'Machine Learning Engineer',
  'Deep Learning & Computer Vision',
  'Data Science aplicada'
];
const el = document.getElementById('typed-text');
let r = 0, i = 0, deleting = false;

(function type() {
  const word = roles[r];
  el.textContent = word.slice(0, i);

  if (!deleting && i < word.length) { i++; setTimeout(type, 65); }
  else if (!deleting) { deleting = true; setTimeout(type, 1800); }
  else if (i > 0) { i--; setTimeout(type, 30); }
  else { deleting = false; r = (r + 1) % roles.length; setTimeout(type, 250); }
})();

// ===== Aparición al hacer scroll =====
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.section').forEach(s => io.observe(s));

// ===== Scroll suave =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', ev => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { ev.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
