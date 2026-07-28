// ═══════════ Año dinámico ═══════════
document.getElementById('year').textContent = new Date().getFullYear();

// ═══════════ Tema claro / oscuro (persistente) ═══════════
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

// ═══════════ Efecto máquina de escribir ═══════════
const roles = [
  'Ingeniero de Inteligencia Artificial',
  'Machine Learning Engineer',
  'Computer Vision & Deep Learning',
  'Sistemas con LLMs y RAG'
];
const typedEl = document.getElementById('typed-text');
let r = 0, i = 0, deleting = false;

(function type() {
  const word = roles[r];
  typedEl.textContent = word.slice(0, i);
  if (!deleting && i < word.length) { i++; setTimeout(type, 60); }
  else if (!deleting) { deleting = true; setTimeout(type, 1900); }
  else if (i > 0) { i--; setTimeout(type, 28); }
  else { deleting = false; r = (r + 1) % roles.length; setTimeout(type, 260); }
})();

// ═══════════ Aparición al hacer scroll ═══════════
const reveal = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); reveal.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.section').forEach(s => reveal.observe(s));

// ═══════════ Contadores animados ═══════════
const counters = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);          // ease-out cúbico
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
    counters.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counters.observe(el));

// ═══════════ Barras de nivel ═══════════
const bars = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.style.width = e.target.dataset.level + '%';
    bars.unobserve(e.target);
  });
}, { threshold: 0.4 });
document.querySelectorAll('.bar i').forEach(el => bars.observe(el));

// ═══════════ Barra de progreso + botón "arriba" ═══════════
const progress = document.getElementById('progress');
const toTop = document.getElementById('to-top');
const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  toTop.classList.toggle('show', window.scrollY > 500);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
