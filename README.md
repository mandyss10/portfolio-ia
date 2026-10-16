# Portfolio — Iván Mandayo Lagoa

Portfolio personal de Ingeniero de Inteligencia Artificial.
Web estática (HTML, CSS y un poco de JS) publicada gratis con **GitHub Pages**.

🔗 **Demo:** https://mandyss10.github.io/portfolio-ia/

## Estructura

```
portfolio-ia/
├── index.html      # Intro, trabajo, sobre mí, fuera del código, contacto
├── style.css       # Estilos, tema claro/oscuro, responsive
├── script.js       # Tema y visor de fotos
├── assets/         # Retrato, fotos de deporte y favicon
└── .nojekyll       # Evita que GitHub Pages procese el sitio con Jekyll
```

## Cómo editarlo

- **Añadir un proyecto:** copia un bloque `<article class="card">` en `index.html`.
  Hay tres fondos: `card-sea`, `card-orange` y `card-foam`.
- **Cajas de detección:** cada `<span class="box">` va en porcentajes de la foto
  (`--x`, `--y`, `--w`, `--h`) y el texto sale de `data-label`. Si dos etiquetas chocan,
  añade `box-left`.
- **Colores:** variables al principio de `style.css` (`--sea`, `--foam`, `--orange`).
- **Tipografía:** Bricolage Grotesque, desde Google Fonts.

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
