// ═══════════ Año dinámico ═══════════
document.getElementById('year').textContent = new Date().getFullYear();

// ═══════════ Tema claro / oscuro (persistente) ═══════════
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const saved = localStorage.getItem('theme');
if (saved) root.setAttribute('data-theme', saved);

const ICON_MOON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
const ICON_SUN  = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>';

const paint = () => {
  toggle.innerHTML = root.getAttribute('data-theme') === 'light' ? ICON_SUN : ICON_MOON;
};
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

// ═══════════ Visor de fotos ═══════════
const gallery = document.getElementById('gallery');

if (gallery) {
  const box = document.getElementById('lightbox');
  const img = document.getElementById('lb-img');
  const caption = document.getElementById('lb-caption');
  const figures = [...gallery.querySelectorAll('figure')];
  let index = 0;

  const show = i => {
    index = (i + figures.length) % figures.length;   // pasa de la última a la primera
    const source = figures[index].querySelector('img');
    img.src = source.src;
    img.alt = source.alt;
    caption.textContent = figures[index].querySelector('figcaption').textContent;
  };

  const open = i => {
    show(i);
    box.hidden = false;
    document.body.style.overflow = 'hidden';         // congela el scroll del fondo
    box.querySelector('.lb-close').focus();
  };

  const close = () => {
    box.hidden = true;
    document.body.style.overflow = '';
    figures[index].querySelector('img').focus?.();
  };

  figures.forEach((fig, i) => {
    fig.tabIndex = 0;
    fig.setAttribute('role', 'button');
    fig.setAttribute('aria-label', `Ampliar foto: ${fig.querySelector('figcaption').textContent}`);
    fig.addEventListener('click', () => open(i));
    fig.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  box.addEventListener('click', e => {
    const action = e.target.closest('[data-lb]')?.dataset.lb;
    if (action === 'next') show(index + 1);
    else if (action === 'prev') show(index - 1);
    else if (action === 'close' || e.target === box) close();
  });

  document.addEventListener('keydown', e => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(index + 1);
    else if (e.key === 'ArrowLeft') show(index - 1);
  });
}

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
