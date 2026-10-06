const screens={case:'screen-case',diagnosis:'screen-diagnosis',theory:'screen-theory',apply:'screen-apply',open:'screen-open',survey:'screen-survey',result:'screen-result'};
const state={diagnosisScore:0,theoryScore:0,applyScore:0,openScore:0,openRubric:0,openBreakdown:{},survey:{}};

const diagnosisOptions=[
{id:'intercultural',title:'Conflictos interculturales',text:'El caso señala conflictos que afectan a la dinámica escolar.',good:true},
{id:'inclusion',title:'Necesidad de inclusión y respeto',text:'El proyecto nace para prevenir discriminación y mejorar la convivencia.',good:true},
{id:'service',title:'Aprendizaje-servicio como eje',text:'El proyecto conecta aprendizaje escolar y participación comunitaria.',good:true},
{id:'shared',title:'Responsabilidad compartida',text:'Profesores, familias y comunidad deben trabajar de forma coordinada.',good:true},
{id:'diversity',title:'Diversidad cultural y de capacidades',text:'Las actividades deben permitir conocer y valorar diferencias culturales y capacidades diversas.',good:true},
{id:'grades',title:'Fracaso académico generalizado',text:'El problema principal es una caída global del rendimiento académico.',good:false},
{id:'devices',title:'Falta de dispositivos',text:'La prioridad es comprar tecnología porque el caso describe una brecha digital.',good:false},
{id:'discipline',title:'Problema exclusivamente disciplinario',text:'La solución debe centrarse solo en sanciones y control de conducta.',good:false}
];

const theoryItems=[
{prompt:'El alumnado aprende contenidos mientras desarrolla una acción útil para su entorno.',correct:'aps',options:[['aps','Aprendizaje-servicio: aprendizaje académico unido a servicio comunitario.'],['lecture','Clase expositiva desconectada del entorno.'],['punish','Respuesta disciplinaria.'],['isolated','Trabajo individual sin dimensión comunitaria.']]},
{prompt:'El profesorado diseña experiencias, conecta contextos y facilita la inclusión.',correct:'architect',options:[['architect','Docente como arquitecto y facilitador del aprendizaje.'],['passive','Docente como observador pasivo.'],['control','Docente centrado solo en control.'],['external','Responsabilidad exclusiva de agentes externos.']]},
{prompt:'Escuela y familias comparten recursos, experiencias y acciones educativas.',correct:'family',options:[['family','Colaboración escuela-familia para apoyar el aprendizaje y la inclusión.'],['separation','Separación entre hogar y escuela.'],['optional','Participación familiar solo decorativa.'],['students','Responsabilidad exclusiva del alumnado.']]},
{prompt:'El centro trabaja con asociaciones u otras instituciones para ampliar oportunidades educativas.',correct:'community',options:[['community','Conexión con el entorno y redes comunitarias.'],['closed','Escuela cerrada al entorno.'],['individual','Intervención individual sin redes.'],['competition','Competición entre instituciones.']]},
{prompt:'Los conflictos se abordan mediante diálogo, escucha y búsqueda de soluciones compartidas.',correct:'conflict',options:[['conflict','Resolución educativa de conflictos mediante mediación y diálogo.'],['avoid','Evitar hablar del conflicto.'],['sanction','Sanción como única medida.'],['separate','Separar permanentemente a los grupos.']]}
];

const applyItems=[
{prompt:'Para dar sentido al aprendizaje-servicio...',correct:'real',options:[['real','Diseñar un proyecto comunitario real donde el alumnado colabore con personas y entidades diversas.'],['fiction','Simular siempre situaciones sin contacto con el entorno.'],['worksheet','Sustituir el proyecto por fichas individuales.'],['event','Limitarlo a un único evento sin continuidad.']],why:'El Tema 4 presenta el aprendizaje-servicio como combinación de aprendizaje académico y servicio comunitario.'},
{prompt:'Para preparar al profesorado...',correct:'training',options:[['training','Formarse en diversidad cultural, inclusión y resolución de conflictos, con recursos para aplicarlo en el aula.'],['intuition','Confiar únicamente en la intuición personal.'],['delegate','Delegar la inclusión en especialistas externos.'],['neutral','Evitar revisar prácticas docentes.']],why:'El docente necesita herramientas para diseñar ambientes inclusivos y actuar como facilitador del aprendizaje.'},
{prompt:'Para implicar a las familias...',correct:'families',options:[['families','Organizar talleres, participación en actividades y recursos para apoyar la inclusión desde casa.'],['inform','Limitarse a informar al final del proyecto.'],['exclude','Evitar su participación para simplificar la gestión.'],['punish','Contactarlas solo cuando haya sanciones.']],why:'La colaboración escuela-familia conecta el aprendizaje con la vida cotidiana y refuerza la coherencia educativa.'},
{prompt:'Para implicar a la comunidad...',correct:'network',options:[['network','Crear redes con asociaciones, instituciones u otras escuelas y abrir actividades al entorno.'],['schoolonly','Mantener todo el proyecto dentro del aula.'],['outsourcing','Entregar el proyecto a una ONG sin participación escolar.'],['visit','Realizar una visita aislada sin proyecto compartido.']],why:'El Tema 4 propone conectar aprendizaje, entorno y comunidad para aumentar relevancia y compromiso.'},
{prompt:'Para trabajar los conflictos interculturales...',correct:'dialogue',options:[['dialogue','Crear espacios de diálogo, mediación y resolución constructiva de conflictos.'],['ignore','Ignorar los conflictos menores.'],['separate','Separar los grupos implicados.'],['lecture','Dar una charla puntual sin práctica posterior.']],why:'La resolución de conflictos debe convertirse en una experiencia educativa basada en diálogo y participación.'},
{prompt:'Para documentar y mejorar el proyecto...',correct:'evaluate',options:[['evaluate','Usar tecnología de forma pedagógica para compartir experiencias y recoger evaluación y retroalimentación.'],['tech','Usar tecnología solo por novedad.'],['noeval','No evaluar para evitar condicionar al alumnado.'],['final','Evaluar únicamente al final sin posibilidad de mejora.']],why:'La tecnología puede facilitar comunicación y difusión, mientras que la evaluación continua permite introducir mejoras.'}
];

const commonSurvey=window.COMMON_SURVEY;
const surveyStatements=commonSurvey.statements;

function show(name){Object.values(screens).forEach(id=>document.getElementById(id).classList.remove('active'));document.getElementById(screens[name]).classList.add('active');const steps={case:1,diagnosis:2,theory:3,apply:4,open:5,survey:6,result:6};const step=steps[name];document.getElementById('progressLabel').textContent=name==='result'?'Actividad completada':`Paso ${step} de 6`;document.getElementById('progressBar').style.width=`${name==='result'?100:(step/6)*100}%`;window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.next)));
document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.back)));
function feedback(el,html,type='good'){el.className=`feedback ${type}`;el.innerHTML=html;}

function renderDiagnosis(){const grid=document.getElementById('diagnosisGrid');diagnosisOptions.forEach(o=>{const btn=document.createElement('button');btn.className='block-option';btn.dataset.id=o.id;btn.innerHTML=`<strong>${o.title}</strong><span>${o.text}</span>`;btn.addEventListener('click',()=>btn.classList.toggle('selected'));grid.appendChild(btn);});}
function renderTheory(){const grid=document.getElementById('theoryGrid');theoryItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="theory-${i}"><option value="">Selecciona la explicación</option>${item.options.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});}
function renderApply(){const grid=document.getElementById('applyGrid');applyItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="apply-${i}"><option value="">Selecciona la actuación</option>${item.options.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});}
function renderSurvey(){const box=document.getElementById('surveyItems');surveyStatements.forEach((s,i)=>{const div=document.createElement('div');div.className='survey-item';div.innerHTML=`<p><strong>${i+1}.</strong> ${s}</p><div class="likert">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="survey-${i}" value="${n}"> ${n}</label>`).join('')}</div>`;box.appendChild(div);});document.getElementById('surveyUseful').innerHTML='<option value="">Selecciona una opción</option>'+commonSurvey.usefulOptions.map(o=>`<option>${o}</option>`).join('');}
renderDiagnosis();renderTheory();renderApply();renderSurvey();

document.getElementById('evaluateDiagnosis').addEventListener('click',()=>{const chosen=[...document.querySelectorAll('.block-option.selected')].map(x=>x.dataset.id);const good=diagnosisOptions.filter(o=>o.good).map(o=>o.id);const correct=chosen.filter(id=>good.includes(id)).length;const bad=chosen.filter(id=>!good.includes(id)).length;state.diagnosisScore=Math.max(0,Math.round((correct/good.length)*20-bad*3));feedback(document.getElementById('diagnosisFeedback'),`<strong>${correct===5&&bad===0?'Diagnóstico preciso.':'Revisa algunos elementos.'}</strong> Has identificado ${correct} de 5 elementos relevantes${bad?` y has seleccionado ${bad} distractor(es).`:'.'}<br><br><strong>Clave del Tema 4:</strong> prevenir la discriminación exige conectar metodologías, profesorado, familias y entorno social; no es solo un problema disciplinario.<br><button class="primary" id="toTheory">Continuar</button>`,correct>=4&&bad===0?'good':'warn');document.getElementById('toTheory').addEventListener('click',()=>show('theory'));});

document.getElementById('evaluateTheory').addEventListener('click',()=>{let correct=0;theoryItems.forEach((item,i)=>{if(document.getElementById(`theory-${i}`).value===item.correct)correct++;});state.theoryScore=Math.round((correct/theoryItems.length)*20);feedback(document.getElementById('theoryFeedback'),`<strong>${correct===5?'Conexión teórica completa.':'Hay relaciones que conviene revisar.'}</strong> Has resuelto ${correct} de 5 situaciones.<br><br><strong>Mapa del Tema 4:</strong> aprendizaje-servicio, papel docente, colaboración escuela-familia, conexión con el entorno y resolución educativa de conflictos forman una respuesta integrada.<br><button class="primary" id="toApply">Continuar</button>`,correct>=4?'good':'warn');document.getElementById('toApply').addEventListener('click',()=>show('apply'));});

document.getElementById('evaluateApply').addEventListener('click',()=>{let correct=0;const explanations=[];applyItems.forEach((item,i)=>{if(document.getElementById(`apply-${i}`).value===item.correct)correct++;explanations.push(`<li>${item.why}</li>`);});state.applyScore=Math.round((correct/applyItems.length)*15);feedback(document.getElementById('applyFeedback'),`<strong>${correct===applyItems.length?'Proyecto coherente y conectado.':'Revisa algunas decisiones.'}</strong> Has resuelto correctamente ${correct} de ${applyItems.length} situaciones.<ul>${explanations.join('')}</ul><p>«Puente de Culturas» funciona cuando las acciones no aparecen aisladas: metodología, familias, comunidad, conflicto y evaluación forman un mismo ecosistema educativo.</p><button class="primary" id="toOpen">Continuar</button>`,correct>=5?'good':'warn');document.getElementById('toOpen').addEventListener('click',()=>show('open'));});

function has(text,terms){return terms.some(t=>text.includes(t));}
function pointsFor(text,checks){return checks.reduce((s,c)=>s+(has(text,c.terms)?c.points:0),0);}

document.getElementById('evaluateOpen').addEventListener('click',()=>{
 const raw=document.getElementById('openAnswer').value.trim();const text=raw.toLowerCase();const notes=[];
 const service=Math.min(20,pointsFor(text,[
  {terms:['aprendizaje-servicio','aprendizaje servicio','aps'],points:8},
  {terms:['proyecto comunitario','proyectos comunitarios','servicio comunitario','acción comunitaria','accion comunitaria'],points:5},
  {terms:['metodologías activas','metodologias activas','aprendizaje basado en proyectos','abp'],points:4},
  {terms:['utilidad real','problema real','situaciones reales','experiencias reales'],points:3}
 ]));
 const teacher=Math.min(15,pointsFor(text,[
  {terms:['arquitecto del aprendizaje','facilitador del aprendizaje','facilitadora del aprendizaje'],points:5},
  {terms:['formación docente','formacion docente','formación del profesorado','formacion del profesorado','capacitación docente','capacitacion docente'],points:5},
  {terms:['diversidad cultural','inclusión','inclusion','resolución de conflictos','resolucion de conflictos'],points:5}
 ]));
 const families=Math.min(15,pointsFor(text,[
  {terms:['familias','padres','madres'],points:5},
  {terms:['talleres','escuela de padres','actividades escolares','voluntarios'],points:5},
  {terms:['apoyo desde casa','aprendizaje en casa','recursos para apoyar','participación familiar','participacion familiar'],points:5}
 ]));
 const community=Math.min(15,pointsFor(text,[
  {terms:['comunidad','entorno social','entorno'],points:5},
  {terms:['asociaciones','ong','ongs','instituciones','otras escuelas'],points:5},
  {terms:['redes','alianzas','colaboración comunitaria','colaboracion comunitaria','proyectos colaborativos'],points:5}
 ]));
 const dialogue=Math.min(15,pointsFor(text,[
  {terms:['espacios de diálogo','espacios de dialogo','diálogo','dialogo','foros'],points:5},
  {terms:['mediación','mediacion'],points:4},
  {terms:['resolución de conflictos','resolucion de conflictos','resolución constructiva','resolucion constructiva'],points:4},
  {terms:['escucha','soluciones compartidas','negociación','negociacion'],points:2}
 ]));
 const techEval=Math.min(20,pointsFor(text,[
  {terms:['tecnología','tecnologia','recursos multimedia','contenido digital','medios digitales'],points:5},
  {terms:['compartir experiencias','documentar','difundir','comunicación','comunicacion'],points:3},
  {terms:['evaluación','evaluacion','retroalimentación','retroalimentacion'],points:5},
  {terms:['mejora','mejoras','seguimiento','monitorear','monitorizar'],points:4},
  {terms:['integral','coordinada','coordinado','responsabilidad compartida','ecosistema'],points:3}
 ]));
 let rubric=service+teacher+families+community+dialogue+techEval;
 if(raw.length<500)rubric=Math.min(rubric,75);
 state.openRubric=rubric;state.openScore=Math.round(rubric*.45);state.openBreakdown={service,teacher,families,community,dialogue,techEval};
 if(service<16)notes.push('Desarrolla mejor el aprendizaje-servicio y su conexión con proyectos comunitarios reales.');
 if(teacher<12)notes.push('Explica con más claridad el papel del profesorado y su formación.');
 if(families<12)notes.push('Concreta cómo participan las familias más allá de recibir información.');
 if(community<12)notes.push('Amplía las redes con comunidad, asociaciones u otras instituciones.');
 if(dialogue<12)notes.push('Incluye diálogo, mediación y resolución educativa de conflictos.');
 if(techEval<16)notes.push('Explica cómo usar tecnología con propósito y cómo evaluar y mejorar el proyecto.');
 if(raw.length<500)notes.push('La respuesta necesita mayor desarrollo y justificación para alcanzar la máxima puntuación.');
 const type=rubric>=80?'good':'warn';
 feedback(document.getElementById('openFeedback'),`<strong>Valoración orientativa: ${rubric}/100.</strong><div class="breakdown"><div>Aprendizaje-servicio y metodologías: ${service}/20</div><div>Rol docente y formación: ${teacher}/15</div><div>Familias: ${families}/15</div><div>Comunidad y redes: ${community}/15</div><div>Diálogo y conflictos: ${dialogue}/15</div><div>Tecnología, evaluación y coherencia: ${techEval}/20</div></div>${notes.length?`<p><strong>Para mejorar:</strong></p><ul>${notes.map(n=>`<li>${n}</li>`).join('')}</ul>`:'<p>La respuesta conecta de forma completa las dimensiones centrales del Tema 4 con el proyecto «Puente de Culturas».</p>'}`,type);
});

document.getElementById('finishSurvey').addEventListener('click',()=>{
 const likert=[];for(let i=0;i<surveyStatements.length;i++){const checked=document.querySelector(`input[name="survey-${i}"]:checked`);likert.push(checked?Number(checked.value):null);}
 state.survey={likert,best:document.getElementById('surveyBest').value.trim(),improve:document.getElementById('surveyImprove').value.trim(),useful:document.getElementById('surveyUseful').value};
 const unanswered=likert.filter(v=>v===null).length;if(unanswered){feedback(document.getElementById('surveyFeedback'),`Faltan ${unanswered} valoraciones de la escala. Completa todas antes de finalizar.`,'warn');return;}
 finish();
});

function finish(){const total=Math.min(100,state.diagnosisScore+state.theoryScore+state.applyScore+state.openScore);document.getElementById('finalScore').textContent=total;const record={session:'sesion-07',topic:'tema-04',timestamp:new Date().toISOString(),scores:{diagnosis:state.diagnosisScore,theory:state.theoryScore,application:state.applyScore,open:state.openScore,total},openRubric:state.openRubric,openBreakdown:state.openBreakdown,openAnswer:document.getElementById('openAnswer').value.trim(),survey:state.survey,surveyVersion:commonSurvey.version};localStorage.setItem('eaweb-sesion-07',JSON.stringify(record));document.getElementById('resultText').innerHTML=`<p><strong>Puntuación global: ${total}/100.</strong></p><div class="breakdown"><div>Diagnóstico · ${state.diagnosisScore}/20</div><div>Teoría · ${state.theoryScore}/20</div><div>Decisiones · ${state.applyScore}/15</div><div>Resolución del caso · ${state.openScore}/45</div></div><p><strong>Idea final:</strong> prevenir la discriminación no depende de una actividad aislada. En el Tema 4, el docente diseña un ecosistema de aprendizaje que conecta metodologías activas, servicio a la comunidad, familias, entorno social, resolución de conflictos y evaluación continua.</p>`;show('result');}

document.getElementById('restart').addEventListener('click',()=>location.reload());