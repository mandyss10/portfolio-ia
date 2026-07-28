# 🧠 Portfolio — Iván Mandayo Lagoa

Portfolio personal de Ingeniero de Inteligencia Artificial.
Web estática (HTML + CSS + JS, sin dependencias) publicada gratis con **GitHub Pages**.

🔗 **Demo:** https://USUARIO.github.io/portfolio-ia/

## Estructura

```
portfolio-ia/
├── index.html    # Contenido: hero, sobre mí, proyectos, skills, contacto
├── style.css     # Estilos, tema claro/oscuro, responsive
├── script.js     # Typewriter, toggle de tema, animaciones al scroll
└── .nojekyll     # Evita que GitHub Pages procese el sitio con Jekyll
```

## Cómo editarlo

- **Añadir un proyecto:** copia un bloque `<article class="card">` en `index.html`
  y cambia título, descripción, tags y el enlace al repo.
- **Cambiar colores:** variables `--accent` y `--accent-2` al principio de `style.css`.
- **Cambiar los roles del texto animado:** array `roles` en `script.js`.

## Ver en local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python -m http.server 8000
```

## Publicar los cambios

```bash
git add .
git commit -m "Actualiza proyectos"
git push
```

GitHub Pages redespliega solo en ~1 minuto.
