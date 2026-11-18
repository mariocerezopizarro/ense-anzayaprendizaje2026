/**
 * EYAWEB · Paso 6 de 6: evaluación externa de la herramienta.
 * El cuestionario se gestiona en Microsoft Forms; no se recopilan respuestas aquí.
 * Se incorpora al final de cada sesión sin modificar las actividades ni las rúbricas.
 */
(function () {
  'use strict';

  const FORM_URL = 'https://forms.cloud.microsoft/e/1fU4xsQdSW';
  const surveyCard = document.querySelector('#screen-survey .card');
  const openButton = document.getElementById('evaluateOpen');
  const openFeedback = document.getElementById('openFeedback');
  if (!surveyCard || !openButton || !openFeedback || typeof show !== 'function') return;

  // Conservamos los elementos originales ocultos para que el código existente
  // de cada sesión (incluido el reinicio de la sesión 1) siga funcionando.
  Array.from(surveyCard.children).forEach(el => el.classList.add('hidden'));

  const step = document.createElement('div');
  step.className = 'eaweb-evaluation-step';
  step.innerHTML = `
    <span class="badge">PASO 6 DE 6 · EVALUACIÓN DE EYAWEB</span>
    <h2>¡Has completado la actividad!</h2>
    <p>Antes de finalizar, nos gustaría conocer tu experiencia con EYAWEB.
       Tu opinión nos ayudará a mejorar la herramienta y las actividades que proponemos al alumnado.</p>
    <p class="muted"><strong>Este cuestionario evalúa la herramienta, no tus conocimientos.</strong>
       Se abrirá en una pestaña nueva para que puedas conservar tu trabajo.</p>
    <div class="actions">
      <a id="externalEvaluationLink" class="primary" href="${FORM_URL}" target="_blank"
         rel="noopener noreferrer"
         style="display:inline-flex;align-items:center;justify-content:center;text-align:center;text-decoration:none;min-height:46px;">
         Acceder al cuestionario de evaluación ↗
      </a>
    </div>
    <p class="muted" style="font-size:.9rem;margin-top:14px;">
      Las respuestas se envían directamente mediante Microsoft Forms, no a través de EYAWEB.
      Puedes consultar tu informe de aprendizaje con independencia de que respondas al formulario.
    </p>
    <div class="actions">
      <button id="returnToOpen" class="secondary" type="button">Volver a mi respuesta</button>
      <button id="viewLearningReport" class="secondary" type="button">Ver mi informe de aprendizaje</button>
    </div>
  `;
  surveyCard.appendChild(step);

  document.getElementById('returnToOpen').addEventListener('click', () => show('open'));
  document.getElementById('viewLearningReport').addEventListener('click', () => {
    // Las notas ya han sido calculadas por las actividades. No se atribuyen
    // respuestas ficticias al formulario externo.
    const firstSession = Object.prototype.hasOwnProperty.call(state, 'orderScore');
    const parts = firstSession
      ? [['Diagnóstico', state.diagnosisScore, 20], ['Priorización', state.orderScore, 15],
         ['Relaciones', state.matchScore, 20], ['Resolución del caso', state.openScore, 45]]
      : [['Diagnóstico', state.diagnosisScore, 20], ['Teoría', state.theoryScore, 20],
         ['Aplicación', state.applyScore, 15], ['Resolución del caso', state.openScore, 45]];
    const total = Math.min(100, Math.max(0, parts.reduce((sum, [, score]) => sum + (Number(score) || 0), 0)));
    document.getElementById('finalScore').textContent = String(total);
    document.getElementById('resultText').innerHTML =
      '<p><strong>Has completado esta sesión de EYAWEB.</strong> Este informe resume tu desempeño en las actividades. La revisión es automática y orientativa: no sustituye la valoración del profesorado.</p>' +
      '<div class="breakdown">' + parts.map(([label, score, max]) =>
        '<div>' + label + ': <strong>' + (Number(score) || 0) + '/' + max + '</strong></div>'
      ).join('') + '</div>' +
      '<p>La evaluación de la herramienta es independiente de estas puntuaciones y se realiza mediante el cuestionario externo.</p>';
    show('result');
  });

  // En las sesiones 1–13 la navegación al antiguo cuestionario estaba
  // desactivada. La restauramos tras la revisión formativa del paso 5.
  // En las sesiones 14–16 ya existe el botón: reutilizamos su navegación.
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