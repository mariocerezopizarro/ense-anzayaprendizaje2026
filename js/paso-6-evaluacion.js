/**
 * EYAWEB · Paso 6 de 6.
 * Enlace único a la evaluación externa; sin cuestionario dentro de EYAWEB.
 * Aplicable a las 16 sesiones, sin cambiar los pasos ni las rúbricas.
 */
(function () {
  'use strict';

  const FORM_URL = 'https://forms.cloud.microsoft/e/1fU4xsQdSW';
  const surveyCard = document.querySelector('#screen-survey .card');
  const openButton = document.getElementById('evaluateOpen');
  const openFeedback = document.getElementById('openFeedback');
  if (!surveyCard || !openButton || !openFeedback || typeof show !== 'function') return;

  // Los nodos del antiguo cuestionario permanecen en el DOM porque el
  // código de las sesiones los necesita durante la inicialización y reinicio.
  // Se ocultan con prioridad sobre los estilos display:grid/flex de la web.
  for (const el of Array.from(surveyCard.children)) {
    el.style.setProperty('display', 'none', 'important');
    el.setAttribute('aria-hidden', 'true');
  }

  const step = document.createElement('div');
  step.className = 'eaweb-evaluation-step';
  step.innerHTML = `
    <span class="badge">PASO 6 DE 6 · EVALUACIÓN DE EYAWEB</span>
    <h2>¡Has completado la actividad!</h2>
    <p>¡Enhorabuena! Has llegado al final de esta sesión de EYAWEB.</p>
    <p>Nos gustaría conocer tu opinión sobre la herramienta. Tu valoración
       nos ayudará a seguir innovando, mejorando las clases y creando
       experiencias de aprendizaje más útiles para el alumnado.</p>
    <p class="muted">El cuestionario evalúa tu experiencia con EYAWEB,
       no tus conocimientos de la asignatura.</p>
    <div class="actions">
      <a class="primary" href="${FORM_URL}" target="_blank" rel="noopener noreferrer"
         style="display:inline-flex;align-items:center;justify-content:center;text-align:center;text-decoration:none;min-height:46px;">
        Acceder al cuestionario de evaluación ↗
      </a>
    </div>
  `;
  surveyCard.appendChild(step);

  // Tras la devolución formativa del caso práctico, permitir pasar al paso 6.
  // Las últimas sesiones ya crean su botón; las anteriores lo necesitaban.
  openButton.addEventListener('click', () => {
    if (!document.getElementById('openAnswer')?.value.trim()) return;
    if (openFeedback.classList.contains('hidden')) return;

    const existing = openFeedback.querySelector('#toSurvey');
    if (existing) {
      existing.textContent = 'Continuar al paso 6';
      return;
    }

    const nav = document.createElement('div');
    nav.className = 'actions';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'primary';
    btn.id = 'toSurvey';
    btn.textContent = 'Continuar al paso 6';
    btn.addEventListener('click', () => show('survey'));
    nav.appendChild(btn);
    openFeedback.appendChild(nav);
  });
})();
