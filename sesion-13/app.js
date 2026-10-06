const screens={case:'screen-case',diagnosis:'screen-diagnosis',theory:'screen-theory',apply:'screen-apply',open:'screen-open',survey:'screen-survey',result:'screen-result'};
const state={diagnosisScore:0,theoryScore:0,applyScore:0,openScore:0,openRubric:0,openBreakdown:{},survey:{}};

const diagnosisOptions=[
{id:'stagnation',title:'Rendimiento estancado',text:'El rendimiento del alumnado no progresa como se espera.',good:true},
{id:'motivation',title:'Caída de la motivación del personal',text:'El profesorado muestra menor motivación y compromiso.',good:true},
{id:'fragmentation',title:'Equipos fragmentados',text:'Los grupos de trabajo actúan de forma poco integrada.',good:true},
{id:'resistance',title:'Resistencia al cambio',text:'Existe rechazo o inseguridad ante nuevas metodologías pedagógicas.',good:true},
{id:'systemic',title:'Necesidad de una respuesta integral',text:'Los problemas están relacionados y requieren una mirada global del centro.',good:true},
{id:'attendance',title:'Absentismo generalizado',text:'La causa principal del problema es una falta masiva de asistencia.',good:false},
{id:'discipline',title:'Conflicto disciplinario severo',text:'El centro atraviesa una crisis grave de convivencia entre estudiantes.',good:false},
{id:'building',title:'Infraestructura deteriorada',text:'El problema central es el estado físico del edificio escolar.',good:false}
];

const theoryItems=[
{prompt:'Luisa analiza cómo profesorado, alumnado, equipos, recursos y procesos se influyen mutuamente.',correct:'system',options:[['system','Mentalidad sistémica e interconexión de los componentes.'],['isolated','Análisis aislado de cada problema.'],['control','Supervisión administrativa exclusivamente.'],['individual','Responsabilidad individual de cada actor.']]},
{prompt:'La comunidad define conjuntamente hacia dónde quiere avanzar y qué metas comparte.',correct:'vision',options:[['vision','Visión compartida de mejora continua.'],['orders','Dirección unilateral del cambio.'],['inform','Información sin participación.'],['routine','Mantenimiento de rutinas existentes.']]},
{prompt:'Se crean grupos interdisciplinarios y espacios regulares para compartir conocimiento.',correct:'collaboration',options:[['collaboration','Colaboración y aprendizaje colectivo.'],['competition','Competencia entre equipos.'],['separation','Especialización aislada de departamentos.'],['external','Delegación de problemas a agentes externos.']]},
{prompt:'Docentes y otros miembros asumen responsabilidades de liderazgo según sus fortalezas.',correct:'distributed',options:[['distributed','Liderazgo distribuido.'],['autocratic','Liderazgo autocrático.'],['absence','Ausencia de liderazgo.'],['informal','Reparto informal sin coordinación.']]},
{prompt:'La escuela revisa prácticas, aprende de los resultados y se adapta continuamente.',correct:'learning',options:[['learning','Escuela que aprende y mejora continua.'],['fixed','Organización estable que evita cambios.'],['final','Evaluación solo al final.'],['individual','Aprendizaje limitado únicamente al alumnado.']]}
];

const applyItems=[
{prompt:'Los equipos trabajan como compartimentos aislados. ¿Qué actuación encaja mejor?',correct:'teams',options:[['teams','Crear reuniones regulares, espacios de diálogo y equipos de trabajo interdisciplinarios.'],['separate','Mantener equipos separados para aumentar especialización.'],['director','Centralizar todos los proyectos en dirección.'],['inform','Enviar únicamente instrucciones por correo.']],why:'El liderazgo sistémico busca romper silos y generar sinergias mediante colaboración y comunicación.'},
{prompt:'Parte del profesorado se resiste a nuevas metodologías.',correct:'change',options:[['change','Comunicar la visión, ofrecer apoyo y formación, planificar el cambio y recoger feedback.'],['force','Imponer el cambio sin acompañamiento.'],['avoid','Renunciar a la innovación para evitar conflicto.'],['replace','Sustituir automáticamente a quienes expresen dudas.']],why:'La resistencia al cambio se gestiona con visión clara, apoyo, formación y una transición planificada.'},
{prompt:'Luisa quiere actualizar las prácticas del profesorado.',correct:'training',options:[['training','Impulsar talleres, cursos, coaching y aprendizaje entre iguales.'],['individual','Dejar toda la formación a iniciativa individual.'],['inspection','Aumentar inspecciones sin desarrollo profesional.'],['oneoff','Realizar una única charla sin seguimiento.']],why:'La formación profesional continua es una condición central de una escuela que aprende.'},
{prompt:'Se quiere aprovechar el conocimiento y las fortalezas de distintos miembros del centro.',correct:'distributed',options:[['distributed','Asignar roles de liderazgo y responsabilidades compartidas con coordinación.'],['central','Concentrar decisiones y responsabilidades en dirección.'],['random','Repartir tareas de forma aleatoria.'],['external','Externalizar la toma de decisiones.']],why:'El liderazgo distribuido permite aprovechar experiencias diversas y reforzar el compromiso colectivo.'},
{prompt:'El centro quiere innovar sin convertir la experimentación en improvisación.',correct:'innovation',options:[['innovation','Apoyar proyectos innovadores, proporcionar recursos, reconocer iniciativas y evaluar sus resultados.'],['technology','Comprar tecnología sin cambiar prácticas.'],['riskfree','Evitar cualquier riesgo pedagógico.'],['fashion','Aplicar cualquier novedad sin analizar su utilidad.']],why:'La innovación sistémica combina experimentación, apoyo, recursos, reconocimiento y evaluación.'},
{prompt:'¿Cómo puede consolidarse el cambio a largo plazo?',correct:'monitor',options:[['monitor','Definir indicadores, analizar datos, revisar avances, reconocer logros y ajustar las estrategias.'],['finish','Dar el proceso por terminado tras implantar las primeras medidas.'],['opinions','Basarse solo en impresiones informales.'],['fixed','Mantener el plan aunque los datos indiquen que no funciona.']],why:'La mejora continua requiere monitorización, reflexión, reconocimiento de aprendizajes y adaptación.'}
];

const commonSurvey=window.COMMON_SURVEY;
const surveyStatements=commonSurvey.statements;
function show(name){Object.values(screens).forEach(id=>document.getElementById(id).classList.remove('active'));document.getElementById(screens[name]).classList.add('active');const steps={case:1,diagnosis:2,theory:3,apply:4,open:5,survey:6,result:6};const step=steps[name];document.getElementById('progressLabel').textContent=name==='result'?'Actividad completada':`Paso ${step} de 6`;document.getElementById('progressBar').style.width=`${name==='result'?100:(step/6)*100}%`;window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.next)));document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.back)));
function feedback(el,html,type='good'){el.className=`feedback ${type}`;el.innerHTML=html;}
function renderDiagnosis(){const grid=document.getElementById('diagnosisGrid');diagnosisOptions.forEach(o=>{const btn=document.createElement('button');btn.className='block-option';btn.dataset.id=o.id;btn.innerHTML=`<strong>${o.title}</strong><span>${o.text}</span>`;btn.addEventListener('click',()=>btn.classList.toggle('selected'));grid.appendChild(btn);});}
function renderTheory(){const grid=document.getElementById('theoryGrid');theoryItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="theory-${i}"><option value="">Selecciona el fundamento</option>${item.options.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});}
function renderApply(){const grid=document.getElementById('applyGrid');applyItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="apply-${i}"><option value="">Selecciona la actuación</option>${item.options.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});}
function renderSurvey(){const box=document.getElementById('surveyItems');surveyStatements.forEach((s,i)=>{const div=document.createElement('div');div.className='survey-item';div.innerHTML=`<p><strong>${i+1}.</strong> ${s}</p><div class="likert">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="survey-${i}" value="${n}"> ${n}</label>`).join('')}</div>`;box.appendChild(div);});document.getElementById('surveyUseful').innerHTML='<option value="">Selecciona una opción</option>'+commonSurvey.usefulOptions.map(o=>`<option>${o}</option>`).join('');}
renderDiagnosis();renderTheory();renderApply();renderSurvey();

document.getElementById('evaluateDiagnosis').addEventListener('click',()=>{const chosen=[...document.querySelectorAll('.block-option.selected')].map(x=>x.dataset.id);const good=diagnosisOptions.filter(o=>o.good).map(o=>o.id);const correct=chosen.filter(id=>good.includes(id)).length;const bad=chosen.filter(id=>!good.includes(id)).length;state.diagnosisScore=Math.max(0,Math.round((correct/good.length)*20-bad*3));feedback(document.getElementById('diagnosisFeedback'),`<strong>${correct===5&&bad===0?'Diagnóstico sistémico preciso.':'Revisa algunos elementos.'}</strong> Has identificado ${correct} de 5 factores relevantes${bad?` y ${bad} distractor(es).`:'.'}<br><br><strong>Clave del Tema 6:</strong> un enfoque sistémico evita tratar estos problemas como compartimentos independientes y analiza sus interrelaciones dentro del conjunto de la organización.<br><button class="primary" id="toTheory">Continuar</button>`,correct>=4&&bad===0?'good':'warn');document.getElementById('toTheory').addEventListener('click',()=>show('theory'));});

document.getElementById('evaluateTheory').addEventListener('click',()=>{let correct=0;theoryItems.forEach((item,i)=>{if(document.getElementById(`theory-${i}`).value===item.correct)correct++;});state.theoryScore=Math.round((correct/theoryItems.length)*20);feedback(document.getElementById('theoryFeedback'),`<strong>${correct===5?'Fundamentos bien relacionados.':'Hay relaciones que conviene revisar.'}</strong> Has resuelto ${correct} de 5 situaciones.<br><br><strong>Mapa del Tema 6:</strong> interconexión, visión compartida, colaboración, liderazgo distribuido y aprendizaje organizativo permiten convertir la escuela en un sistema capaz de aprender y adaptarse.<br><button class="primary" id="toApply">Continuar</button>`,correct>=4?'good':'warn');document.getElementById('toApply').addEventListener('click',()=>show('apply'));});

document.getElementById('evaluateApply').addEventListener('click',()=>{let correct=0;const explanations=[];applyItems.forEach((item,i)=>{if(document.getElementById(`apply-${i}`).value===item.correct)correct++;explanations.push(`<li>${item.why}</li>`);});state.applyScore=Math.round((correct/applyItems.length)*15);feedback(document.getElementById('applyFeedback'),`<strong>${correct===applyItems.length?'Transformación sistémica coherente.':'Revisa algunas decisiones.'}</strong> Has resuelto correctamente ${correct} de ${applyItems.length} situaciones.<ul>${explanations.join('')}</ul><p>La meta no es ejecutar acciones aisladas, sino construir una organización que colabora, reflexiona, aprende de los datos y adapta continuamente sus prácticas.</p><button class="primary" id="toOpen">Continuar</button>`,correct>=5?'good':'warn');document.getElementById('toOpen').addEventListener('click',()=>show('open'));});

function has(text,terms){return terms.some(t=>text.includes(t));}
function pts(text,groups){return groups.reduce((s,g)=>s+(has(text,g.terms)?g.points:0),0);}
document.getElementById('evaluateOpen').addEventListener('click',()=>{const raw=document.getElementById('openAnswer').value.trim();const text=raw.toLowerCase();

const systemic=Math.min(20,pts(text,[
{terms:['liderazgo sistémico','liderazgo sistemico','enfoque sistémico','enfoque sistemico','organización interconectada','organizacion interconectada','interrelacionados','interconectados'],points:7},
{terms:['diagnóstico holístico','diagnostico holistico','análisis de datos','analisis de datos','evaluaciones','encuestas'],points:7},
{terms:['feedback','retroalimentación','retroalimentacion','todos los actores','comunidad educativa'],points:6}
]));
const collaboration=Math.min(15,pts(text,[
{terms:['visión compartida','vision compartida','visión y misión','vision y mision','misión compartida','mision compartida'],points:5},
{terms:['espacios de diálogo','espacios de dialogo','reuniones','grupos de trabajo','equipos interdisciplinarios'],points:5},
{terms:['colaboración','colaboracion','comunicación','comunicacion','romper silos','fragmentación','fragmentacion'],points:5}
]));
const development=Math.min(15,pts(text,[
{terms:['formación continua','formacion continua','desarrollo profesional','talleres','cursos','coaching','aprendizaje entre iguales'],points:5},
{terms:['resistencia al cambio','gestión del cambio','gestion del cambio','adaptabilidad','transición','transicion'],points:5},
{terms:['apoyo','planificación','planificacion','comunicar la visión','comunicar la vision'],points:5}
]));
const distributed=Math.min(10,pts(text,[
{terms:['liderazgo distribuido','responsabilidad compartida','roles de liderazgo','delegar responsabilidades'],points:5},
{terms:['fortalezas','experiencias diversas','todos los niveles','coordinación','coordinacion'],points:5}
]));
const innovation=Math.min(15,pts(text,[
{terms:['innovación pedagógica','innovacion pedagogica','experimentación','experimentacion','nuevas estrategias','nuevas metodologías','nuevas metodologias'],points:5},
{terms:['tecnología','tecnologia','tecnologías','tecnologias','recursos','infraestructura'],points:5},
{terms:['reconocimiento','reconocer iniciativas','apoyo a proyectos','riesgos pedagógicos','riesgos pedagogicos'],points:5}
]));
const learning=Math.min(25,pts(text,[
{terms:['indicadores','monitoreo','monitorización','monitorizacion','seguimiento','análisis de datos','analisis de datos'],points:5},
{terms:['mejora continua','ajustar estrategias','revisión','revision','evaluación constante','evaluacion constante'],points:5},
{terms:['escuela que aprende','organización que aprende','organizacion que aprende','aprendizaje organizativo'],points:5},
{terms:['reflexión crítica','reflexion critica','aprendizaje colaborativo','aprendizaje continuo','adaptación','adaptacion'],points:5},
{terms:['celebrar logros','reconocer logros','reconocer aprendizajes','cultura de aprendizaje','motivación','motivacion'],points:5}
]));

const rubric=systemic+collaboration+development+distributed+innovation+learning;state.openRubric=rubric;state.openScore=Math.round(rubric*.45);state.openBreakdown={systemic,collaboration,development,distributed,innovation,learning};
feedback(document.getElementById('openFeedback'),`<strong>Valoración de la respuesta: ${rubric}/100.</strong><div class="breakdown"><div>Visión sistémica y diagnóstico: ${systemic}/20</div><div>Visión compartida y colaboración: ${collaboration}/15</div><div>Desarrollo y gestión del cambio: ${development}/15</div><div>Liderazgo distribuido: ${distributed}/10</div><div>Innovación y tecnología: ${innovation}/15</div><div>Escuela que aprende y mejora: ${learning}/25</div></div><p>${rubric===100?'La respuesta integra todos los componentes esenciales del liderazgo sistémico y de la escuela que aprende previstos en el Tema 6.':'Revisa los apartados con menor puntuación y conecta cada estrategia con la transformación global y sostenible del centro.'}</p><button class="primary" id="toSurvey">Continuar</button>`,rubric>=80?'good':'warn');document.getElementById('toSurvey').addEventListener('click',()=>show('survey'));});

document.getElementById('finishSurvey').addEventListener('click',()=>{const responses=surveyStatements.map((_,i)=>document.querySelector(`input[name="survey-${i}"]:checked`)?.value||'');if(responses.some(v=>!v)){feedback(document.getElementById('surveyFeedback'),'<strong>Completa las 10 valoraciones antes de finalizar.</strong>','warn');return;}state.survey={responses,best:document.getElementById('surveyBest').value.trim(),improve:document.getElementById('surveyImprove').value.trim(),useful:document.getElementById('surveyUseful').value};const total=Math.min(100,state.diagnosisScore+state.theoryScore+state.applyScore+state.openScore);document.getElementById('finalScore').textContent=total;document.getElementById('resultText').innerHTML=`<p><strong>Puntuación global: ${total}/100.</strong></p><div class="breakdown"><div>Diagnóstico: ${state.diagnosisScore}/20</div><div>Teoría: ${state.theoryScore}/20</div><div>Aplicación: ${state.applyScore}/15</div><div>Resolución: ${state.openScore}/45</div></div><p>La actividad diferencia entre el rendimiento demostrado en las tareas y tu percepción del aprendizaje en el cuestionario final.</p>`;localStorage.setItem('eaweb-sesion-13',JSON.stringify({session:'sesion-13',topic:'tema-06',score:total,state,completedAt:new Date().toISOString()}));show('result');});

document.getElementById('restart').addEventListener('click',()=>{localStorage.removeItem('eaweb-sesion-13');location.reload();});