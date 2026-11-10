# Detectives del currículo oculto

Juego de clic educativo, listo para GitHub Pages. El alumnado investiga una ilustración de aula, identifica seis posibles indicios de currículo oculto de género (+10 puntos cada uno) y recibe explicaciones al completar el reto.

## Publicar en GitHub Pages
1. Crea un repositorio público de GitHub (por ejemplo, `detectives-curriculo-oculto`).
2. Sube **index.html**, **styles.css**, **script.js** y la carpeta **assets** (con `aula.png`) a la raíz del repositorio.
3. En **Settings → Pages → Build and deployment**, elige **Deploy from a branch**, rama **main** y carpeta **/(root)**; guarda los cambios.
4. La página estará disponible en `https://TU-USUARIO.github.io/detectives-curriculo-oculto/` cuando GitHub termine de publicarla.

No requiere instalación, conexión a servicios de terceros, ni biblioteca externa. Funciona en móvil y ordenador. No recoge datos del alumnado.

## Personalización
- Cambia `assets/aula.png` si quieres otra ilustración con la **misma composición y proporción 4:3**.
- En `script.js`, modifica el array `CLUES` para cambiar textos, puntuaciones (en `points` y `discover`) o los puntos clicables (`x`, `y`, `w`, `h` en porcentajes).
- Se muestran 6 zonas discretas. Las marcas de acierto solo aparecen tras hacer clic.

## Nota didáctica
Un dibujo aislado no prueba discriminación. Las explicaciones diferencian entre un indicio que invita a indagar y un patrón desigual comprobado; el juego está pensado para fomentar observación crítica y discusión en la formación del profesorado.

## Verificar la colocación de las zonas
- Abre la página con `?debug=1` al final de la URL y pulsa «Empezar»: verás seis contornos y sus etiquetas para comprobar la posición de los clics.
- En la URL habitual (sin `?debug=1`), los contornos **no** se muestran antes del acierto.
- Las zonas se han revisado con la imagen `assets/aula.png` de 1448×1086 píxeles. Se adaptan proporcionalmente a pantallas móviles.
- Las zonas representan preguntas para observar, **no** pruebas automáticas de sexismo.