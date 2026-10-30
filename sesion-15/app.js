const screens={case:'screen-case',diagnosis:'screen-diagnosis',theory:'screen-theory',apply:'screen-apply',open:'screen-open',survey:'screen-survey',result:'screen-result'};
const state={diagnosisScore:0,theoryScore:0,applyScore:0,openScore:0,openRubric:0,openBreakdown:{},survey:{}};

const diagnosisOptions=[
{id:'games',title:'Elecciones de juego segregadas',text:'Los niños se concentran en construcción y movimiento y las niñas en actividades de cuidado.',good:true},
{id:'expectations',title:'Expectativas docentes diferenciadas',text:'Se reconoce más el liderazgo de los niños y la obediencia de las niñas.',good:true},
{id:'materials',title:'Materiales estereotipados',text:'Cuentos e imágenes reproducen roles tradicionales de género.',good:true},
{id:'space',title:'Organización de los rincones',text:'La distribución y uso de espacios puede reforzar asociaciones de género.',good:true},
{id:'hidden',title:'Currículum oculto',text:'Rutinas e interacciones transmiten mensajes implícitos sobre lo que se espera de cada género.',good:true},
{id:'attendance',title:'Absentismo elevado',text:'El principal problema es la falta de asistencia regular.',good:false},
{id:'achievement',title:'Descenso académico general',text:'El caso indica una caída global del rendimiento.',good:false},
{id:'resources',title:'Escasez de materiales',text:'La principal dificultad es que no hay suficientes recursos en el aula.',good:false}
];

const theoryItems=[
{prompt:'El profesorado quiere evitar que sus expectativas influyan en la valoración del alumnado.',correct:'criteria',options:[['criteria','Criterios claros, objetivos y transparentes.'],['intuition','Valoración basada en impresiones generales.'],['different','Criterios distintos según el género.'],['conduct','Priorizar conducta y obediencia sobre el aprendizaje.']]},
{prompt:'Se revisan pruebas, rúbricas y ejemplos para comprobar que no reproducen estereotipos.',correct:'instruments',options:[['instruments','Diseño no sexista de instrumentos de evaluación.'],['space','Reorganización del patio.'],['family','Participación familiar.'],['discipline','Medida disciplinaria.']]},
{prompt:'El equipo analiza quién recibe más atención, comentarios y oportunidades de participación.',correct:'feedback',options:[['feedback','Retroalimentación y participación equitativas.'],['anonymous','Corrección anónima exclusivamente.'],['formal','Currículo formal.'],['competition','Evaluación competitiva.']]},
{prompt:'El profesorado revisa periódicamente resultados y observaciones para detectar patrones de desigualdad.',correct:'data',options:[['data','Análisis de datos y reflexión docente sobre sesgos.'],['intuition','Percepción espontánea sin registros.'],['final','Evaluación solo al final del trimestre.'],['separate','Análisis separado por materias sin perspectiva de género.']]},
{prompt:'El alumnado participa en autoevaluación y coevaluación con acompañamiento docente.',correct:'guided',options:[['guided','Autoevaluación y coevaluación guiadas.'],['free','Coevaluación sin criterios ni acompañamiento.'],['ranking','Clasificación pública del alumnado.'],['teacher','Evaluación exclusivamente docente.']]}
];

const applyItems=[
{prompt:'Los rincones reproducen elecciones muy diferenciadas por género.',correct:'rotation',options:[['rotation','Crear rincones rotativos de construcción, juego simbólico, ciencia, movimiento y expresión artística para todo el alumnado.'],['separate','Mantener rincones diferenciados para niños y niñas.'],['remove','Eliminar los rincones de cuidado.'],['free','No intervenir nunca en los patrones de elección.']],why:'La organización equitativa de espacios amplía intereses y evita que las elecciones queden condicionadas por expectativas de género.'},
{prompt:'Los cuentos muestran a mujeres cuidando y a hombres en profesiones de poder.',correct:'stories',options:[['stories','Analizar y reinventar cuentos, incorporando personajes y profesiones sin estereotipos.'],['ban','Eliminar cualquier cuento tradicional sin trabajarlo.'],['ignore','Mantenerlos sin reflexión porque son ficción.'],['explain','Presentarlos como modelos habituales que conviene imitar.']],why:'Las actividades críticas identifican y cuestionan estereotipos y amplían los modelos disponibles para el alumnado.'},
{prompt:'El liderazgo se atribuye casi siempre a los niños y el cuidado a las niñas.',correct:'roles',options:[['roles','Rotar encargos y valorar por igual liderazgo, creatividad, cooperación y cuidado.'],['girls','Asignar permanentemente el liderazgo a las niñas.'],['boys','Mantener la distribución porque surge espontáneamente.'],['none','Eliminar todas las responsabilidades del alumnado.']],why:'La rotación de responsabilidades evita reforzar jerarquías y permite experimentar capacidades diversas.'},
{prompt:'El centro quiere trabajar profesiones sin reproducir expectativas tradicionales.',correct:'drama',options:[['drama','Dramatizar profesiones y roles diversos sin asociarlos a un género concreto.'],['lecture','Explicar verbalmente la igualdad sin cambiar las experiencias.'],['separate','Asignar profesiones diferentes a niños y niñas.'],['poster','Colocar un cartel sobre igualdad y no modificar la actividad.']],why:'La dramatización permite actuar, cuestionar y transformar los roles tradicionales desde experiencias cercanas.'},
{prompt:'El centro quiere consolidar una cultura igualitaria más allá del aula.',correct:'families',options:[['families','Organizar talleres con familias sobre juguetes, profesiones, corresponsabilidad y mensajes igualitarios entre escuela y hogar.'],['notice','Enviar una circular informativa una vez al año.'],['delegate','Delegar toda la coeducación en una única persona.'],['event','Limitar el trabajo a una efeméride anual.']],why:'La coeducación requiere coherencia entre escuela, familias e instituciones y no puede reducirse a acciones puntuales.'},
{prompt:'¿Qué caracteriza a una actividad didáctica crítica para la igualdad?',correct:'critical',options:[['critical','Identifica estereotipos, cuestiona el currículum oculto y promueve acción y participación transformadoras.'],['memorize','Memoriza definiciones sobre igualdad.'],['neutral','Evita analizar situaciones reales para mantener neutralidad.'],['extra','Se realiza solo como actividad complementaria sin relación con el currículo.']],why:'El Tema 7 articula estas actividades en identificación, cuestionamiento y empoderamiento mediante la acción.'}
];

const commonSurvey=window.COMMON_SURVEY;
const surveyStatements=commonSurvey.statements;

function show(name){
Object.values(screens).forEach(id=>document.getElementById(id).classList.remove('active'));
document.getElementById(screens[name]).classList.add('active');
const steps={case:1,diagnosis:2,theory:3,apply:4,open:5,survey:6,result:6};
const step=steps[name];
document.getElementById('progressLabel').textContent=name==='result'?'Actividad completada':`Paso ${step} de 6`;
document.getElementById('progressBar').style.width=`${name==='result'?100:(step/6)*100}%`;
window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.next)));
document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.back)));
function feedback(el,html,type='good'){el.className=`feedback ${type}`;el.innerHTML=html;}

function renderDiagnosis(){
const grid=document.getElementById('diagnosisGrid');
diagnosisOptions.forEach(o=>{const btn=document.createElement('button');btn.className='block-option';btn.dataset.id=o.id;btn.innerHTML=`<strong>${o.title}</strong><span>${o.text}</span>`;btn.addEventListener('click',()=>btn.classList.toggle('selected'));grid.appendChild(btn);});
}
function renderTheory(){
const grid=document.getElementById('theoryGrid');
theoryItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="theory-${i}"><option value="">Selecciona la estrategia</option>${item.options.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});
}
function renderApply(){
const grid=document.getElementById('applyGrid');
applyItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="apply-${i}"><option value="">Selecciona la propuesta</option>${item.options.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});
}
function renderSurvey(){
const box=document.getElementById('surveyItems');
surveyStatements.forEach((s,i)=>{const div=document.createElement('div');div.className='survey-item';div.innerHTML=`<p><strong>${i+1}.</strong> ${s}</p><div class="likert">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="survey-${i}" value="${n}"> ${n}</label>`).join('')}</div>`;box.appendChild(div);});
document.getElementById('surveyUseful').innerHTML='<option value="">Selecciona una opción</option>'+commonSurvey.usefulOptions.map(o=>`<option>${o}</option>`).join('');
}
renderDiagnosis();renderTheory();renderApply();renderSurvey();

document.getElementById('evaluateDiagnosis').addEventListener('click',()=>{
const chosen=[...document.querySelectorAll('.block-option.selected')].map(x=>x.dataset.id);
const good=diagnosisOptions.filter(o=>o.good).map(o=>o.id);
const correct=chosen.filter(id=>good.includes(id)).length;
const bad=chosen.filter(id=>!good.includes(id)).length;
state.diagnosisScore=Math.max(0,Math.round((correct/good.length)*20-bad*3));
feedback(document.getElementById('diagnosisFeedback'),`<strong>${correct===5&&bad===0?'Diagnóstico completo.':'Revisa algunos elementos.'}</strong> Has identificado ${correct} de 5 elementos relevantes${bad?` y ${bad} distractor(es).`:'.'}<br><br><strong>Clave:</strong> antes de intervenir hay que hacer visibles los estereotipos presentes en rutinas, expectativas, espacios y materiales.<br><button class="primary" id="toTheory">Continuar</button>`,correct>=4&&bad===0?'good':'warn');
document.getElementById('toTheory').addEventListener('click',()=>show('theory'));
});

document.getElementById('evaluateTheory').addEventListener('click',()=>{
let correct=0;theoryItems.forEach((item,i)=>{if(document.getElementById(`theory-${i}`).value===item.correct)correct++;});
state.theoryScore=Math.round((correct/theoryItems.length)*20);
feedback(document.getElementById('theoryFeedback'),`<strong>${correct===theoryItems.length?'Evaluación con perspectiva de género bien comprendida.':'Hay estrategias evaluativas que conviene revisar.'}</strong> Has resuelto ${correct} de ${theoryItems.length} relaciones.<br><br><strong>Clave:</strong> evaluar con equidad implica revisar sesgos, instrumentos, criterios, retroalimentación, participación y datos, no solo la calificación final.<br><button class="primary" id="toApply">Continuar</button>`,correct>=4?'good':'warn');
document.getElementById('toApply').addEventListener('click',()=>show('apply'));
});

document.getElementById('evaluateApply').addEventListener('click',()=>{
let correct=0;const explanations=[];
applyItems.forEach((item,i)=>{if(document.getElementById(`apply-${i}`).value===item.correct)correct++;explanations.push(`<li>${item.why}</li>`);});
state.applyScore=Math.round((correct/applyItems.length)*15);
feedback(document.getElementById('applyFeedback'),`<strong>${correct===applyItems.length?'Propuestas transformadoras bien seleccionadas.':'Revisa algunas propuestas.'}</strong> Has resuelto correctamente ${correct} de ${applyItems.length} situaciones.<ul>${explanations.join('')}</ul><p>Una propuesta crítica no se limita a hablar de igualdad: hace visibles los estereotipos, los cuestiona y permite actuar de otra manera.</p><button class="primary" id="toOpen">Continuar</button>`,correct>=5?'good':'warn');
document.getElementById('toOpen').addEventListener('click',()=>show('open'));
});

function has(text,terms){return terms.some(t=>text.includes(t));}
function pts(text,groups){return groups.reduce((s,g)=>s+(has(text,g.terms)?g.points:0),0);}

document.getElementById('evaluateOpen').addEventListener('click',()=>{
const text=document.getElementById('openAnswer').value.trim().toLowerCase();

const hidden=Math.min(15,pts(text,[
{terms:['currículum oculto','curriculum oculto','estereotipos','sesgos de género','sesgos de genero'],points:5},
{terms:['rutinas','interacciones','rincones','cuentos','imágenes','imagenes','materiales'],points:5},
{terms:['observar','observación','observacion','analizar','detectar'],points:5}
]));

const evaluation=Math.min(25,pts(text,[
{terms:['perspectiva de género','perspectiva de genero','evaluación equitativa','evaluacion equitativa'],points:5},
{terms:['criterios claros','criterios objetivos','criterios transparentes','rúbricas','rubricas'],points:5},
{terms:['instrumentos no sexistas','diseño no sexista','diseno no sexista','pruebas sin estereotipos'],points:5},
{terms:['retroalimentación equitativa','retroalimentacion equitativa','feedback equitativo','comentarios basados en criterios'],points:5},
{terms:['autoevaluación','autoevaluacion','coevaluación','coevaluacion','datos desagregados','analizar resultados'],points:5}
]));

const expectations=Math.min(15,pts(text,[
{terms:['expectativas docentes','expectativas','trato','elogios'],points:5},
{terms:['rotar encargos','rotación de roles','rotacion de roles','responsabilidades','liderazgo'],points:5},
{terms:['creatividad','cooperación','cooperacion','cuidado','obediencia'],points:5}
]));

const activities=Math.min(20,pts(text,[
{terms:['actividades didácticas críticas','actividades didacticas criticas','propuestas didácticas críticas','propuestas didacticas criticas'],points:5},
{terms:['identificar estereotipos','cuestionar estereotipos','cuestionamiento del currículum oculto','cuestionamiento del curriculum oculto'],points:5},
{terms:['reescribir cuentos','reinventar cuentos','dramatizar profesiones','dramatización','dramatizacion'],points:5},
{terms:['acción transformadora','accion transformadora','participación activa','participacion activa','empoderamiento'],points:5}
]));

const environment=Math.min(15,pts(text,[
{terms:['organización equitativa de espacios','organizacion equitativa de espacios','rincones rotativos','rotación por rincones','rotacion por rincones'],points:5},
{terms:['construcción','construccion','juego simbólico','juego simbolico','ciencia','expresión artística','expresion artistica','movimiento'],points:5},
{terms:['revisar materiales','materiales no estereotipados','cuentos e imágenes','cuentos e imagenes','referentes diversos'],points:5}
]));

const culture=Math.min(10,pts(text,[
{terms:['coeducación transversal','coeducacion transversal','transversal','cultura escolar inclusiva','cultura escolar transformadora'],points:5},
{terms:['familias','talleres con familias','juguetes','profesiones','corresponsabilidad','escuela y hogar'],points:5}
]));

const rubric=hidden+evaluation+expectations+activities+environment+culture;
state.openRubric=rubric;state.openScore=Math.round(rubric*.45);state.openBreakdown={hidden,evaluation,expectations,activities,environment,culture};

feedback(document.getElementById('openFeedback'),`<strong>Valoración de la respuesta: ${rubric}/100.</strong><div class="breakdown"><div>Diagnóstico del currículum oculto: ${hidden}/15</div><div>Evaluación con perspectiva de género: ${evaluation}/25</div><div>Expectativas y participación: ${expectations}/15</div><div>Propuestas didácticas críticas: ${activities}/20</div><div>Espacios y materiales: ${environment}/15</div><div>Coeducación transversal y familias: ${culture}/10</div></div><p>${rubric===100?'La respuesta articula evaluación, propuestas críticas y transformación de la cultura escolar de forma plenamente coherente con el Tema 7.':'Revisa los apartados con menor puntuación y conecta cada medida con la prevención de desigualdades y la transformación cotidiana del centro.'}</p><button class="primary" id="toSurvey">Continuar</button>`,rubric>=80?'good':'warn');
document.getElementById('toSurvey').addEventListener('click',()=>show('survey'));
});

document.getElementById('finishSurvey').addEventListener('click',()=>{
const responses=surveyStatements.map((_,i)=>document.querySelector(`input[name="survey-${i}"]:checked`)?.value||'');
if(responses.some(v=>!v)){feedback(document.getElementById('surveyFeedback'),'<strong>Completa las 10 valoraciones antes de finalizar.</strong>','warn');return;}
state.survey={responses,best:document.getElementById('surveyBest').value.trim(),improve:document.getElementById('surveyImprove').value.trim(),useful:document.getElementById('surveyUseful').value};
const total=Math.min(100,state.diagnosisScore+state.theoryScore+state.applyScore+state.openScore);
document.getElementById('finalScore').textContent=total;
document.getElementById('resultText').innerHTML=`<p><strong>Puntuación global: ${total}/100.</strong></p><div class="breakdown"><div>Diagnóstico: ${state.diagnosisScore}/20</div><div>Teoría: ${state.theoryScore}/20</div><div>Aplicación: ${state.applyScore}/15</div><div>Resolución: ${state.openScore}/45</div></div><p>La actividad diferencia entre el rendimiento demostrado en las tareas y tu percepción del aprendizaje en el cuestionario final.</p>`;
localStorage.setItem('eaweb-sesion-15',JSON.stringify({session:'sesion-15',topic:'tema-07',score:total,state,completedAt:new Date().toISOString()}));
show('result');
});

document.getElementById('restart').addEventListener('click',()=>{localStorage.removeItem('eaweb-sesion-15');location.reload();});