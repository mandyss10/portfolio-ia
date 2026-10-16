// ─────────── Año del pie ───────────
document.getElementById('year').textContent = new Date().getFullYear();

// ─────────── Cajas de detección ───────────
// Se dibujan cuando la foto entra en pantalla.
const seen = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('seen');
    seen.unobserve(e.target);
  });
}, { threshold: 0.35 });
document.querySelectorAll('.det').forEach(el => seen.observe(el));

const gallery = document.getElementById('gallery');
document.getElementById('vision-toggle').addEventListener('change', e => {
  gallery.classList.toggle('hide-boxes', !e.target.checked);
});

// ─────────── Visor de fotos ───────────
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
  figures[index].focus();
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
