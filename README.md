# 🧠 Portfolio — Iván Mandayo Lagoa

Portfolio personal de Ingeniero de Inteligencia Artificial.
Web estática (HTML + CSS + JS, sin dependencias) publicada gratis con **GitHub Pages**.

🔗 **Demo:** https://mandyss10.github.io/portfolio-ia/

## Estructura

```
portfolio-ia/
├── index.html          # Hero, sobre mí, proyectos, stack, trayectoria, contacto
├── style.css           # Estilos, tema claro/oscuro, responsive
├── script.js           # Typewriter, contadores, barras, scroll, tema
├── assets/             # Imágenes (SVG propios, sin dependencias externas)
│   ├── foto-ivan.jpg        # Foto del hero (recorte circular vía CSS)
│   ├── favicon.svg
│   ├── pattern.svg          # Fondo de red neuronal del hero
│   ├── cover-toxiscan.svg   # Portada de ToxiScan
│   ├── cover-ships.svg      # Portada de ship-vision
│   └── cover-rag.svg
└── .nojekyll           # Evita que GitHub Pages procese el sitio con Jekyll
```

## Cómo editarlo

- **Añadir un proyecto:** copia un bloque `<article class="project">` en `index.html`.
  Alterna la clase `reverse` para que la imagen cambie de lado.
- **Poner una captura real:** guarda tu `.png`/`.jpg` en `assets/` y cambia el `src`
  del `<img>` de esa tarjeta.
- **Cambiar colores:** variables `--accent`, `--accent-2` y `--accent-3` al principio de `style.css`.
- **Cambiar los roles animados:** array `roles` en `script.js`.
- **Cambiar métricas y niveles:** atributos `data-count` y `data-level` en `index.html`.

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
