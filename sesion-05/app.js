const screens={case:'screen-case',diagnosis:'screen-diagnosis',theory:'screen-theory',apply:'screen-apply',open:'screen-open',survey:'screen-survey',result:'screen-result'};
const state={diagnosisScore:0,theoryScore:0,applyScore:0,openScore:0,openRubric:0,openBreakdown:{},survey:{}};

const diagnosisOptions=[
{id:'peer-exclusion',title:'Exclusión entre iguales',text:'Algunos grupos impiden participar a compañeros de otros orígenes o con capacidades diferentes.',good:true},
{id:'ethnic',title:'Discriminación étnica',text:'El origen étnico aparece como criterio de exclusión social.',good:true},
{id:'disability',title:'Barreras por discapacidad',text:'Las capacidades diferentes se convierten en motivo de exclusión.',good:true},
{id:'teacher-bias',title:'Expectativas docentes desiguales',text:'Algunos docentes esperan menos de determinadas minorías.',good:true},
{id:'opportunities',title:'Desigualdad de oportunidades',text:'La participación y las tareas asignadas varían según el grupo al que pertenece el estudiante.',good:true},
{id:'only-conflict',title:'Simple conflicto interpersonal',text:'Se trata únicamente de desacuerdos puntuales sin relación con pertenencia grupal.',good:false},
{id:'grades',title:'Problema general de rendimiento',text:'La dificultad principal es que todo el alumnado obtiene bajas calificaciones.',good:false},
{id:'technology',title:'Brecha tecnológica',text:'La causa principal es la falta de dispositivos digitales.',good:false}
];

const theoryItems=[
{prompt:'Un docente presupone menor capacidad académica por pertenecer el estudiante a una minoría y le asigna tareas menos exigentes.',correct:'bias',options:[['bias','Prejuicio/estereotipo que se traduce en trato y oportunidades desiguales.'],['neutral','Diferenciación pedagógica neutral.'],['peer','Conflicto entre iguales.'],['access','Accesibilidad física únicamente.']]},
{prompt:'Un estudiante es excluido del grupo por su origen étnico.',correct:'ethnic',options:[['ethnic','Discriminación racial o étnica.'],['socio','Discriminación socioeconómica.'],['gender','Discriminación de género.'],['none','No constituye discriminación.']]},
{prompt:'Una actividad no permite participar en igualdad de condiciones a un alumno con discapacidad y no se realizan adaptaciones.',correct:'disability',options:[['disability','Discriminación por discapacidad y barreras de participación.'],['ethnic','Discriminación étnica.'],['social','Simple preferencia social.'],['merit','Selección por mérito.']]},
{prompt:'Una práctica cotidiana del centro produce sistemáticamente menos oportunidades para determinados grupos, aunque no exista un insulto explícito.',correct:'systemic',options:[['systemic','Discriminación sistémica o estructural.'],['direct','Solo discriminación directa y visible.'],['friendship','Problema de amistad.'],['random','Diferencia aleatoria sin relevancia.']]},
{prompt:'La exclusión sostenida provoca aislamiento, baja autoestima, estrés y menor participación escolar.',correct:'impact',options:[['impact','Impacto de la discriminación en bienestar, relaciones y aprendizaje.'],['discipline','Falta de disciplina individual.'],['ability','Baja capacidad personal como causa principal.'],['neutral','Efecto sin relación educativa.']]}
];

const applyItems=[
{prompt:'Para prevenir la discriminación a nivel de centro...',correct:'policy',options:[['policy','Establecer políticas claras de no discriminación, comunicarlas y aplicarlas de forma consistente.'],['informal','Actuar solo cuando el problema sea muy grave.'],['private','Dejar cada caso exclusivamente al criterio individual del tutor.'],['avoid','Evitar hablar de discriminación para no generar conflicto.']],why:'El Tema 3 propone políticas claras y firmes como base institucional para combatir la discriminación.'},
{prompt:'Para evitar expectativas docentes sesgadas...',correct:'training',options:[['training','Formar al profesorado para identificar prejuicios, revisar expectativas y garantizar oportunidades equitativas.'],['lower','Mantener expectativas más bajas para evitar frustración.'],['same','Asignar siempre exactamente la misma tarea sin considerar barreras ni necesidades.'],['ignore','No revisar las propias prácticas docentes.']],why:'La formación docente permite reconocer sesgos y abordar la diversidad de forma inclusiva y respetuosa.'},
{prompt:'Para asegurar la participación del alumnado con discapacidad...',correct:'adapt',options:[['adapt','Adaptar actividades, materiales o espacios cuando sea necesario para asegurar la participación de todos.'],['exclude','Eximir al estudiante de las actividades colectivas.'],['separate','Crear siempre una actividad paralela aislada.'],['wait','Esperar a que el estudiante se adapte por sí solo.']],why:'La inclusión exige eliminar barreras y adaptar las actividades para garantizar participación real.'},
{prompt:'Ante un caso concreto de discriminación...',correct:'case',options:[['case','Detectar, escuchar y apoyar a la persona afectada, intervenir, implicar a las familias cuando proceda y realizar seguimiento.'],['punish','Aplicar una sanción automática y cerrar el caso.'],['mediate-only','Mediar sin comprobar si existe desigualdad o victimización.'],['ignore','Esperar a que desaparezca espontáneamente.']],why:'La intervención debe proteger al alumnado afectado, actuar sobre la conducta discriminatoria y mantener seguimiento.'},
{prompt:'Para trabajar la dimensión social del problema...',correct:'community',options:[['community','Cuestionar prejuicios y estereotipos, trabajar valores democráticos e implicar a familias y comunidad.'],['walls','Limitar toda actuación al aula y evitar el entorno social.'],['lecture','Dar una única charla sin continuidad.'],['individual','Responsabilizar solo a quien sufre la discriminación de adaptarse.']],why:'El Tema 3 señala que los prejuicios sociales llegan a la escuela y que familias, comunidad y educación pueden contribuir a combatirlos.'}
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
 theoryItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="theory-${i}"><option value="">Selecciona la explicación</option>${item.options.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});
}
function renderApply(){
 const grid=document.getElementById('applyGrid');
 applyItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="apply-${i}"><option value="">Selecciona la actuación</option>${item.options.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});
}
function renderSurvey(){
 const box=document.getElementById('surveyItems');
 surveyStatements.forEach((s,i)=>{const div=document.createElement('div');div.className='survey-item';div.innerHTML=`<p><strong>${i+1}.</strong> ${s}</p><div class="likert">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="survey-${i}" value="${n}"> ${n}</label>`).join('')}</div>`;box.appendChild(div);});
 document.getElementById('surveyUseful').innerHTML='<option value="">Selecciona una opción</option>'+commonSurvey.usefulOptions.map(o=>`<option>${o}</option>`).join('');
}
renderDiagnosis();renderTheory();renderApply();renderSurvey();

document.getElementById('evaluateDiagnosis').addEventListener('click',()=>{
 const chosen=[...document.querySelectorAll('.block-option.selected')].map(x=>x.dataset.id);const good=diagnosisOptions.filter(o=>o.good).map(o=>o.id);const correct=chosen.filter(id=>good.includes(id)).length;const bad=chosen.filter(id=>!good.includes(id)).length;
 state.diagnosisScore=Math.max(0,Math.round((correct/good.length)*20-bad*3));
 feedback(document.getElementById('diagnosisFeedback'),`<strong>${correct===5&&bad===0?'Diagnóstico preciso.':'Revisa algunos elementos.'}</strong> Has identificado ${correct} de 5 señales relevantes${bad?` y has seleccionado ${bad} distractor(es).`:'.'}<br><br><strong>Clave del Tema 3:</strong> la discriminación no se limita a insultos explícitos. También puede aparecer como exclusión, barreras de participación, expectativas académicas más bajas y oportunidades desiguales.<br><button class="primary" id="toTheory">Continuar</button>`,correct>=4&&bad===0?'good':'warn');
 document.getElementById('toTheory').addEventListener('click',()=>show('theory'));
});

document.getElementById('evaluateTheory').addEventListener('click',()=>{
 let correct=0;theoryItems.forEach((item,i)=>{if(document.getElementById(`theory-${i}`).value===item.correct)correct++;});state.theoryScore=Math.round((correct/theoryItems.length)*20);
 feedback(document.getElementById('theoryFeedback'),`<strong>${correct===5?'Lectura teórica completa.':'Hay relaciones que conviene revisar.'}</strong> Has resuelto ${correct} de 5 situaciones.<br><br><strong>Mapa del Tema 3:</strong> prejuicios y estereotipos pueden traducirse en discriminación étnica, de género, socioeconómica o por discapacidad; también existen formas sistémicas menos visibles. Sus efectos alcanzan el rendimiento, la autoestima, el bienestar emocional y las relaciones sociales.<br><button class="primary" id="toApply">Continuar</button>`,correct>=4?'good':'warn');
 document.getElementById('toApply').addEventListener('click',()=>show('apply'));
});

document.getElementById('evaluateApply').addEventListener('click',()=>{
 let correct=0;const explanations=[];applyItems.forEach((item,i)=>{if(document.getElementById(`apply-${i}`).value===item.correct)correct++;explanations.push(`<li>${item.why}</li>`);});state.applyScore=Math.round((correct/applyItems.length)*15);
 feedback(document.getElementById('applyFeedback'),`<strong>${correct===applyItems.length?'Respuesta institucional coherente.':'Revisa algunas decisiones.'}</strong> Has resuelto ${correct} de ${applyItems.length} situaciones.<ul>${explanations.join('')}</ul><p>La respuesta eficaz combina prevención institucional, revisión de prácticas docentes, eliminación de barreras, intervención ante casos y participación de la comunidad.</p><button class="primary" id="toOpen">Continuar</button>`,correct>=4?'good':'warn');
 document.getElementById('toOpen').addEventListener('click',()=>show('open'));
});

function has(text,terms){return terms.some(t=>text.includes(t));}
function pointsFor(text,checks){return checks.reduce((s,c)=>s+(has(text,c.terms)?c.points:0),0);}

document.getElementById('evaluateOpen').addEventListener('click',()=>{
 const raw=document.getElementById('openAnswer').value.trim();const text=raw.toLowerCase();const notes=[];
 const identification=Math.min(20,pointsFor(text,[
  {terms:['discriminación','discriminacion'],points:4},{terms:['prejuicio','prejuicios'],points:4},{terms:['estereotipo','estereotipos'],points:4},{terms:['normas sociales','norma social'],points:3},{terms:['étnica','etnica','origen étnico','origen etnico'],points:3},{terms:['discapacidad','capacidades diferentes'],points:2}
 ]));
 const teacher=Math.min(15,pointsFor(text,[
  {terms:['expectativas docentes','expectativas más bajas','expectativas mas bajas','sesgo docente','sesgos docentes'],points:6},{terms:['oportunidades académicas','oportunidades academicas','participación','participacion','tareas'],points:4},{terms:['trato desigual','trato y oportunidades desiguales','equidad','equitativa','equitativo'],points:5}
 ]));
 const prevention=Math.min(20,pointsFor(text,[
  {terms:['políticas claras de no discriminación','politicas claras de no discriminacion','política de no discriminación','politica de no discriminacion'],points:5},{terms:['formación docente','formar al profesorado','formación del profesorado','formacion docente','formacion del profesorado'],points:5},{terms:['currículo inclusivo','curriculo inclusivo','currículum inclusivo','curriculum inclusivo'],points:4},{terms:['adaptar actividades','adaptación de actividades','adaptacion de actividades','adaptar los espacios','adaptación de espacios','participación de todos','participacion de todos'],points:3},{terms:['valores democráticos','valores democraticos','inclusivo','inclusiva','preventivo','preventiva'],points:3}
 ]));
 const intervention=Math.min(20,pointsFor(text,[
  {terms:['identificar','detectar'],points:3},{terms:['escuchar','entrevistar'],points:3},{terms:['apoyar','apoyo emocional','alumnado afectado','persona afectada'],points:4},{terms:['intervenir','actuar sobre','medidas disciplinarias','sancion'],points:4},{terms:['familias','familia'],points:3},{terms:['seguimiento','acompañamiento','acompanamiento'],points:3}
 ]));
 const impact=Math.min(10,pointsFor(text,[
  {terms:['rendimiento académico','rendimiento academico'],points:2},{terms:['autoestima'],points:2},{terms:['bienestar emocional','salud emocional','salud mental','ansiedad','estrés','estres'],points:3},{terms:['relaciones sociales','aislamiento','exclusión','exclusion'],points:3}
 ]));
 const community=Math.min(15,pointsFor(text,[
  {terms:['comunidad educativa','comunidad','organizaciones comunitarias'],points:4},{terms:['familias','familia'],points:3},{terms:['cuestionar prejuicios','trabajar prejuicios','combatir prejuicios','cuestionen prejuicios'],points:3},{terms:['cuestionar estereotipos','trabajar estereotipos','combatir estereotipos','cuestionen estereotipos'],points:3},{terms:['enfoque integral','respuesta integral','de forma integral','integral, inclusivo y preventivo'],points:2}
 ]));
 const rubric=identification+teacher+prevention+intervention+impact+community;
 state.openRubric=rubric;state.openScore=Math.round(rubric*.45);state.openBreakdown={identification,teacher,prevention,intervention,impact,community};
 if(identification<16)notes.push('Explica mejor cómo prejuicios, estereotipos y normas sociales pueden transformarse en discriminación.');
 if(teacher<12)notes.push('Profundiza en las expectativas docentes sesgadas y su efecto sobre participación, tareas y oportunidades.');
 if(prevention<16)notes.push('Añade medidas institucionales: política de no discriminación, formación docente, currículo inclusivo y eliminación de barreras.');
 if(intervention<16)notes.push('Concreta el protocolo ante un caso: detectar, escuchar, apoyar, intervenir, implicar a las familias y realizar seguimiento.');
 if(impact<8)notes.push('Considera efectos sobre rendimiento, autoestima, bienestar emocional y relaciones sociales.');
 if(community<12)notes.push('Incluye la dimensión social: familias, comunidad y trabajo crítico sobre prejuicios y estereotipos.');
 if(raw.length<650)notes.push('La respuesta puede desarrollarse algo más para justificar la relación entre las medidas propuestas y el Tema 3.');
 const type=rubric>=85?'good':'warn';
 feedback(document.getElementById('openFeedback'),`<strong>Revisión de la respuesta: ${rubric}/100.</strong><div class="breakdown"><div>Identificación y conceptualización: <strong>${identification}/20</strong></div><div>Sesgos y discriminación docente: <strong>${teacher}/15</strong></div><div>Prevención y currículo: <strong>${prevention}/20</strong></div><div>Intervención ante casos: <strong>${intervention}/20</strong></div><div>Impacto en el alumnado: <strong>${impact}/10</strong></div><div>Familias, comunidad y coherencia: <strong>${community}/15</strong></div></div>${notes.length?`<p><strong>Para mejorar:</strong></p><ul>${notes.map(n=>`<li>${n}</li>`).join('')}</ul>`:`<p>La propuesta identifica las formas de discriminación, actúa sobre los sesgos y combina prevención, intervención y participación comunitaria de forma coherente con el Tema 3.</p>`}<button class="primary" id="toSurvey">Continuar al cuestionario</button>`,type);
 document.getElementById('toSurvey').addEventListener('click',()=>show('survey'));
});

document.getElementById('finishSurvey').addEventListener('click',()=>{
 const values=[];let complete=true;surveyStatements.forEach((_,i)=>{const checked=document.querySelector(`input[name="survey-${i}"]:checked`);if(!checked)complete=false;else values.push(Number(checked.value));});
 if(!complete){feedback(document.getElementById('surveyFeedback'),'<strong>Faltan respuestas.</strong> Valora las diez afirmaciones antes de finalizar.','warn');return;}
 state.survey={version:commonSurvey.version,likert:values,best:document.getElementById('surveyBest').value.trim(),improve:document.getElementById('surveyImprove').value.trim(),useful:document.getElementById('surveyUseful').value};
 finish();
});

function finish(){
 const total=Math.min(100,state.diagnosisScore+state.theoryScore+state.applyScore+state.openScore);document.getElementById('finalScore').textContent=total;
 let message=total>=85?'Has construido una respuesta muy sólida y fundamentada.':total>=65?'La propuesta es adecuada, aunque todavía puedes profundizar en algunas conexiones teóricas.':'Conviene revisar el Tema 3 y relacionar con mayor precisión diagnóstico, teoría e intervención.';
 document.getElementById('resultText').innerHTML=`<p><strong>${message}</strong></p><div class="breakdown"><div>Diagnóstico: <strong>${state.diagnosisScore}/20</strong></div><div>Teoría: <strong>${state.theoryScore}/20</strong></div><div>Decisiones: <strong>${state.applyScore}/15</strong></div><div>Resolución abierta: <strong>${state.openScore}/45</strong> <small>(${state.openRubric}/100 en rúbrica)</small></div></div><p>En esta sesión se ha valorado especialmente la capacidad de reconocer que la discriminación puede ser social, interpersonal, docente y sistémica, y que una respuesta educativa necesita combinar prevención, equidad, protección del alumnado y transformación de la comunidad.</p>`;
 const record={session:'sesion-05',topic:'tema-03',timestamp:new Date().toISOString(),scores:{diagnosis:state.diagnosisScore,theory:state.theoryScore,application:state.applyScore,open:state.openScore,openRubric:state.openRubric,total},openBreakdown:state.openBreakdown,openAnswer:document.getElementById('openAnswer').value.trim(),survey:state.survey};
 localStorage.setItem('eaweb-sesion-05',JSON.stringify(record));show('result');
}
document.getElementById('restart').addEventListener('click',()=>{localStorage.removeItem('eaweb-sesion-05');location.reload();});