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

## Preparación del examen · Plan 2026

La preparación del examen tiene un índice independiente, sin alterar la numeración de las sesiones temáticas:

- **[Índice de preparación del examen](preparacion-examen/)**.
- **Sesión 1: CEIP La Estación · Una feria de ideas para todos** ([abrir simulacro](simulacro-examen-la-estacion/)). Clase 11, temas 1, 3 y 4. Cinco preguntas, autores del temario y evaluación orientativa guiada.
- **Sesión 2: pendiente de definir**.
- **Sesión 3: CEIP La Encina · Un comienzo para todos** ([abrir simulacro](simulacro-examen-plan2026/)). Temas 2, 5 y 8. Preguntas abiertas, elección de dos optativas y autoevaluación orientativa con rúbrica y retroalimentación guiada.

Los futuros simulacros se incorporarán en el orden acordado en este índice. Es material formativo complementario al temario oficial, no un examen ni una corrección oficial.

## Publicación

El proyecto está preparado como aplicación web estática y puede publicarse mediante GitHub Pages.