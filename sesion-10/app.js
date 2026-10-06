const screens={case:'screen-case',diagnosis:'screen-diagnosis',theory:'screen-theory',apply:'screen-apply',open:'screen-open',survey:'screen-survey',result:'screen-result'};
const state={diagnosisScore:0,theoryScore:0,applyScore:0,openScore:0,openRubric:0,openBreakdown:{},survey:{}};

const diagnosisOptions=[
{id:'failure',title:'Fracaso escolar',text:'El centro presenta una tasa preocupante que requiere intervención.',good:true},
{id:'learning',title:'Dificultades de aprendizaje',text:'Parte del alumnado presenta dificultades asociadas a desmotivación y bajo rendimiento.',good:true},
{id:'family',title:'Implicación familiar insuficiente',text:'La participación de las familias en el proceso educativo es limitada.',good:true},
{id:'expectations',title:'Expectativas docentes poco favorecedoras',text:'Algunas expectativas del profesorado no contribuyen al desarrollo del alumnado.',good:true},
{id:'context',title:'Retos socioeconómicos y diversidad',text:'El contexto social y económico influye en las condiciones educativas.',good:true},
{id:'devices',title:'Brecha digital como causa principal',text:'El caso atribuye el problema fundamentalmente a la falta de dispositivos.',good:false},
{id:'attendance',title:'Absentismo generalizado',text:'La causa central del problema es una ausencia continuada del alumnado.',good:false},
{id:'curriculum',title:'Currículo desactualizado',text:'El caso identifica los contenidos curriculares como causa principal.',good:false}
];

const theoryItems=[
{prompt:'Un entorno familiar con estrés y escaso apoyo dificulta la concentración y la respuesta ante las demandas escolares.',correct:'family',options:[['family','Factores familiares y bienestar influyen en el aprendizaje.'],['neutral','El entorno familiar apenas tiene relación con el rendimiento.'],['teacher','Depende solo de las expectativas docentes.'],['ability','Se explica únicamente por capacidad individual.']]},
{prompt:'Un profesor espera poco de un alumno y termina ofreciéndole menos oportunidades y retos.',correct:'pygmalion',options:[['pygmalion','Efecto Pigmalión o profecía autocumplida.'],['resilience','Resiliencia familiar.'],['home','Aprendizaje en el hogar.'],['chance','Coincidencia sin impacto educativo.']]},
{prompt:'Un sesgo inconsciente cambia la forma en que el docente interactúa con determinados estudiantes.',correct:'bias',options:[['bias','Concepciones erróneas, prejuicios y sesgos pueden limitar oportunidades.'],['motivation','Es solo un problema de motivación individual.'],['family','Es un factor exclusivamente familiar.'],['none','No tiene consecuencias académicas.']]},
{prompt:'Las familias reciben apoyo para gestionar estrés, emociones y expectativas educativas.',correct:'support',options:[['support','Apoyo familiar, resiliencia y comunicación escuela-hogar.'],['punitive','Control disciplinario de las familias.'],['low','Reducción de expectativas académicas.'],['distance','Separación entre familia y escuela.']]},
{prompt:'Se detectan dificultades de aprendizaje cuanto antes y se ofrecen apoyos personalizados.',correct:'early',options:[['early','Prevención del fracaso escolar mediante identificación e intervención tempranas.'],['wait','Esperar a que el problema se agrave.'],['label','Etiquetar sin intervenir.'],['same','Aplicar exactamente la misma respuesta a todo el alumnado.']]}
];

const applyItems=[
{prompt:'Una familia atraviesa una situación de estrés sostenido que afecta al alumno.',correct:'familyhelp',options:[['familyhelp','Ofrecer apoyo psicológico, recursos, comunicación cercana y talleres de gestión emocional y resiliencia.'],['blame','Responsabilizar a la familia del bajo rendimiento.'],['ignore','Evitar intervenir porque es un asunto privado.'],['lower','Reducir automáticamente las metas académicas del alumno.']],why:'El Tema 5 reconoce que el entorno familiar adverso puede afectar al aprendizaje y propone apoyo, recursos y comunicación.'},
{prompt:'Un profesor considera que un estudiante con bajo rendimiento “no llegará mucho más lejos”.',correct:'high',options:[['high','Revisar esa expectativa, mantener altas expectativas realistas y aplicar práctica reflexiva.'],['confirm','Ajustar las tareas a esa baja expectativa.'],['separate','Excluirlo de actividades exigentes.'],['wait','Esperar a que mejore por sí solo.']],why:'Las expectativas docentes pueden generar efecto Pigmalión; deben revisarse para evitar profecías autocumplidas.'},
{prompt:'Se detectan prejuicios asociados al origen cultural o socioeconómico.',correct:'diversity',options:[['diversity','Trabajar diversidad e inclusión con toda la comunidad y aplicar políticas claras contra la discriminación.'],['silence','Evitar hablar del tema para no generar tensión.'],['individual','Tratarlo solo como problema individual.'],['informal','Confiar únicamente en acuerdos informales.']],why:'La educación en diversidad e inclusión y las políticas antidiscriminación ayudan a combatir sesgos y barreras.'},
{prompt:'Un alumno muestra dificultades persistentes y creciente desmotivación.',correct:'early',options:[['early','Realizar identificación temprana y ofrecer apoyo personalizado o especializado.'],['wait','Esperar al final de curso.'],['punish','Aumentar sanciones por falta de esfuerzo.'],['same','Mantener las mismas tareas sin ajustes.']],why:'La intervención temprana evita que las dificultades se consoliden y agraven el fracaso escolar.'},
{prompt:'El alumnado percibe el aprendizaje como poco útil y desconectado de su realidad.',correct:'stimulating',options:[['stimulating','Crear un ambiente estimulante conectando contenidos con vida real e intereses y fomentando mentalidad de crecimiento.'],['more','Añadir más ejercicios repetitivos.'],['grades','Centrarse únicamente en las calificaciones.'],['competition','Aumentar la competición entre estudiantes.']],why:'La relevancia del aprendizaje y la mentalidad de crecimiento son respuestas propuestas ante la desmotivación.'},
{prompt:'¿Qué enfoque resume mejor la respuesta del centro?',correct:'integral',options:[['integral','Intervenir coordinadamente sobre familia, expectativas docentes, sesgos, dificultades y motivación.'],['single','Buscar una única causa del fracaso escolar.'],['familyonly','Responsabilizar principalmente a las familias.'],['teacheronly','Centrar toda la respuesta en el profesorado.']],why:'El fracaso escolar es multifactorial y exige soluciones combinadas desde la escuela y la familia.'}
];

const commonSurvey=window.COMMON_SURVEY;
const surveyStatements=commonSurvey.statements;
function show(name){Object.values(screens).forEach(id=>document.getElementById(id).classList.remove('active'));document.getElementById(screens[name]).classList.add('active');const steps={case:1,diagnosis:2,theory:3,apply:4,open:5,survey:6,result:6};const step=steps[name];document.getElementById('progressLabel').textContent=name==='result'?'Actividad completada':`Paso ${step} de 6`;document.getElementById('progressBar').style.width=`${name==='result'?100:(step/6)*100}%`;window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.next)));document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.back)));
function feedback(el,html,type='good'){el.className=`feedback ${type}`;el.innerHTML=html;}
function renderDiagnosis(){const grid=document.getElementById('diagnosisGrid');diagnosisOptions.forEach(o=>{const btn=document.createElement('button');btn.className='block-option';btn.dataset.id=o.id;btn.innerHTML=`<strong>${o.title}</strong><span>${o.text}</span>`;btn.addEventListener('click',()=>btn.classList.toggle('selected'));grid.appendChild(btn);});}
function renderTheory(){const grid=document.getElementById('theoryGrid');theoryItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="theory-${i}"><option value="">Selecciona la explicación</option>${item.options.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});}
function renderApply(){const grid=document.getElementById('applyGrid');applyItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="apply-${i}"><option value="">Selecciona la actuación</option>${item.options.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});}
function renderSurvey(){const box=document.getElementById('surveyItems');surveyStatements.forEach((s,i)=>{const div=document.createElement('div');div.className='survey-item';div.innerHTML=`<p><strong>${i+1}.</strong> ${s}</p><div class="likert">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="survey-${i}" value="${n}"> ${n}</label>`).join('')}</div>`;box.appendChild(div);});document.getElementById('surveyUseful').innerHTML='<option value="">Selecciona una opción</option>'+commonSurvey.usefulOptions.map(o=>`<option>${o}</option>`).join('');}
renderDiagnosis();renderTheory();renderApply();renderSurvey();

document.getElementById('evaluateDiagnosis').addEventListener('click',()=>{const chosen=[...document.querySelectorAll('.block-option.selected')].map(x=>x.dataset.id);const good=diagnosisOptions.filter(o=>o.good).map(o=>o.id);const correct=chosen.filter(id=>good.includes(id)).length;const bad=chosen.filter(id=>!good.includes(id)).length;state.diagnosisScore=Math.max(0,Math.round((correct/good.length)*20-bad*3));feedback(document.getElementById('diagnosisFeedback'),`<strong>${correct===5&&bad===0?'Diagnóstico preciso.':'Revisa algunos elementos.'}</strong> Has identificado ${correct} de 5 factores relevantes${bad?` y ${bad} distractor(es).`:'.'}<br><br><strong>Clave del Tema 5:</strong> el fracaso escolar es multifactorial: puede relacionarse con variables individuales, familiares, escolares y sociales, por lo que no debe explicarse por una única causa.<br><button class="primary" id="toTheory">Continuar</button>`,correct>=4&&bad===0?'good':'warn');document.getElementById('toTheory').addEventListener('click',()=>show('theory'));});

document.getElementById('evaluateTheory').addEventListener('click',()=>{let correct=0;theoryItems.forEach((item,i)=>{if(document.getElementById(`theory-${i}`).value===item.correct)correct++;});state.theoryScore=Math.round((correct/theoryItems.length)*20);feedback(document.getElementById('theoryFeedback'),`<strong>${correct===5?'Conexión teórica completa.':'Hay relaciones que conviene revisar.'}</strong> Has resuelto ${correct} de 5 situaciones.<br><br><strong>Mapa del Tema 5:</strong> familia, expectativas docentes, sesgos y dificultades de aprendizaje pueden interactuar y afectar tanto al rendimiento como al bienestar del alumnado.<br><button class="primary" id="toApply">Continuar</button>`,correct>=4?'good':'warn');document.getElementById('toApply').addEventListener('click',()=>show('apply'));});

document.getElementById('evaluateApply').addEventListener('click',()=>{let correct=0;const explanations=[];applyItems.forEach((item,i)=>{if(document.getElementById(`apply-${i}`).value===item.correct)correct++;explanations.push(`<li>${item.why}</li>`);});state.applyScore=Math.round((correct/applyItems.length)*15);feedback(document.getElementById('applyFeedback'),`<strong>${correct===applyItems.length?'Intervención muy coherente.':'Revisa algunas decisiones.'}</strong> Has resuelto correctamente ${correct} de ${applyItems.length} situaciones.<ul>${explanations.join('')}</ul><p>La respuesta más eficaz combina prevención, apoyo familiar, revisión de expectativas docentes, inclusión e intervención temprana.</p><button class="primary" id="toOpen">Continuar</button>`,correct>=5?'good':'warn');document.getElementById('toOpen').addEventListener('click',()=>show('open'));});

function has(text,terms){return terms.some(t=>text.includes(t));}
function pts(text,groups){return groups.reduce((s,g)=>s+(has(text,g.terms)?g.points:0),0);}
document.getElementById('evaluateOpen').addEventListener('click',()=>{const raw=document.getElementById('openAnswer').value.trim();const text=raw.toLowerCase();

const family=Math.min(15,pts(text,[
{terms:['estrés','estres','entorno familiar','problemas familiares','falta de apoyo'],points:5},
{terms:['resiliencia','manejo emocional','gestión emocional','gestion emocional'],points:5},
{terms:['expectativas familiares','autoestima','metas académicas','metas academicas'],points:5}
]));
const pygmalion=Math.min(20,pts(text,[
{terms:['efecto pigmalión','efecto pigmalion','profecía autocumplida','profecia autocumplida'],points:8},
{terms:['expectativas del profesorado','expectativas docentes','expectativas del profesor'],points:6},
{terms:['altas expectativas','expectativas altas','altas y realistas','expectativas positivas'],points:6}
]));
const bias=Math.min(15,pts(text,[
{terms:['estereotipos','estereotipo','prejuicios','prejuicio'],points:5},
{terms:['sesgos','sesgo','concepciones erróneas','concepciones erroneas'],points:5},
{terms:['limitar oportunidades','oportunidades educativas','interacción','interaccion','autoconcepto'],points:5}
]));
const familySupport=Math.min(15,pts(text,[
{terms:['talleres','talleres para padres','talleres para familias'],points:5},
{terms:['apoyo psicológico','apoyo psicologico','servicios sociales','recursos'],points:5},
{terms:['comunicación','comunicacion','escuela y familia','familia-escuela'],points:5}
]));
const teacherInclusion=Math.min(15,pts(text,[
{terms:['formación continua','formacion continua','formación docente','formacion docente'],points:5},
{terms:['práctica reflexiva','practica reflexiva','reflexión docente','reflexion docente'],points:5},
{terms:['diversidad e inclusión','diversidad e inclusion','políticas anti-discriminación','politicas anti-discriminacion','políticas contra la discriminación','politicas contra la discriminacion','equidad'],points:5}
]));
const failure=Math.min(20,pts(text,[
{terms:['identificación temprana','identificacion temprana','evaluación temprana','evaluacion temprana'],points:5},
{terms:['apoyo personalizado','apoyo especializado','educación especializada','educacion especializada','plan de apoyo'],points:5},
{terms:['ambiente de aprendizaje estimulante','aprendizaje estimulante','contenido con la vida real','vida real','intereses de los estudiantes','intereses del alumnado'],points:5},
{terms:['mentalidad de crecimiento','desmotivación','desmotivacion','fracaso escolar'],points:5}
]));
const rubric=family+pygmalion+bias+familySupport+teacherInclusion+failure;state.openRubric=rubric;state.openScore=Math.round(rubric*.45);state.openBreakdown={family,pygmalion,bias,familySupport,teacherInclusion,failure};
feedback(document.getElementById('openFeedback'),`<strong>Valoración de la respuesta: ${rubric}/100.</strong><div class="breakdown"><div>Factores familiares: ${family}/15</div><div>Expectativas y Pigmalión: ${pygmalion}/20</div><div>Sesgos y prejuicios: ${bias}/15</div><div>Apoyo a familias: ${familySupport}/15</div><div>Formación e inclusión: ${teacherInclusion}/15</div><div>Prevención del fracaso: ${failure}/20</div></div><p>${rubric===100?'La respuesta integra todos los componentes esenciales del Tema 5 para este caso.':'Revisa los apartados con menor puntuación e incorpora tanto el impacto de los factores como estrategias concretas para abordarlos.'}</p><button class="primary" id="toSurvey">Continuar</button>`,rubric>=80?'good':'warn');document.getElementById('toSurvey').addEventListener('click',()=>show('survey'));});

document.getElementById('finishSurvey').addEventListener('click',()=>{const responses=surveyStatements.map((_,i)=>document.querySelector(`input[name="survey-${i}"]:checked`)?.value||'');if(responses.some(v=>!v)){feedback(document.getElementById('surveyFeedback'),'<strong>Completa las 10 valoraciones antes de finalizar.</strong>','warn');return;}state.survey={responses,best:document.getElementById('surveyBest').value.trim(),improve:document.getElementById('surveyImprove').value.trim(),useful:document.getElementById('surveyUseful').value};const total=Math.min(100,state.diagnosisScore+state.theoryScore+state.applyScore+state.openScore);document.getElementById('finalScore').textContent=total;document.getElementById('resultText').innerHTML=`<p><strong>Puntuación global: ${total}/100.</strong></p><div class="breakdown"><div>Diagnóstico: ${state.diagnosisScore}/20</div><div>Teoría: ${state.theoryScore}/20</div><div>Aplicación: ${state.applyScore}/15</div><div>Resolución: ${state.openScore}/45</div></div><p>La actividad diferencia entre el rendimiento demostrado y tu percepción del aprendizaje en el cuestionario final.</p>`;localStorage.setItem('eaweb-sesion-10',JSON.stringify({session:'sesion-10',topic:'tema-05',score:total,state,completedAt:new Date().toISOString()}));show('result');});

document.getElementById('restart').addEventListener('click',()=>{localStorage.removeItem('eaweb-sesion-10');location.reload();});