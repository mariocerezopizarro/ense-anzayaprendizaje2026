# Sembrando saberes

Prototipo web de un videojuego/simulador educativo construido a partir del temario de la asignatura **Enseñanza y Aprendizaje en el Contexto Familiar, Social y Escolar**.

## Versión 0.1

Incluye un primer caso práctico basado en el Tema 1 y tres mecánicas:

1. **Construcción por bloques**: selección de estrategias de intervención.
2. **Priorización**: ordenación de los pasos de una intervención.
3. **Respuesta abierta**: redacción libre con feedback local basado en criterios explícitos del tema.

La corrección abierta de esta versión **no utiliza todavía IA**. Se emplean reglas transparentes y términos clave para comprobar la presencia de elementos importantes. Esto permite probar la experiencia de juego sin depender de servicios externos ni claves API.

## Estructura

- `index.html`: interfaz principal.
- `css/styles.css`: diseño responsive.
- `js/app.js`: lógica de juego y evaluación.
- `contenido/temas/tema-01.md`: contenido académico de referencia.

## Próximos pasos posibles

- añadir más casos y actividades;
- separar los casos en archivos JSON para facilitar su edición;
- incorporar perfiles y progreso del alumnado;
- crear un modo examen y un modo práctica;
- añadir actividades de asociación, clasificación y detección de errores;
- incorporar un backend seguro para evaluación semántica de respuestas abiertas mediante IA;
- mostrar al estudiante la parte concreta del temario en la que se basa cada feedback.

## Publicación

El proyecto está preparado como aplicación web estática y puede publicarse mediante GitHub Pages.