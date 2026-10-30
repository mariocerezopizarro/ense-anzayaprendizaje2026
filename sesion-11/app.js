const screens={case:'screen-case',diagnosis:'screen-diagnosis',theory:'screen-theory',apply:'screen-apply',open:'screen-open',survey:'screen-survey',result:'screen-result'};
const state={diagnosisScore:0,theoryScore:0,applyScore:0,openScore:0,openRubric:0,openBreakdown:{},survey:{}};

const diagnosisOptions=[
{id:'results',title:'Descenso del rendimiento',text:'Los resultados académicos muestran una tendencia negativa.',good:true},
{id:'innovation',title:'Falta de innovación pedagógica',text:'El centro recibe críticas por no incorporar enfoques pedagógicos innovadores.',good:true},
{id:'morale',title:'Desánimo docente',text:'El profesorado muestra baja motivación y necesita apoyo y desarrollo profesional.',good:true},
{id:'family',title:'Escasa implicación familiar',text:'Padres y tutores participan poco en la vida escolar.',good:true},
{id:'skills',title:'Necesidad de habilidades del siglo XXI',text:'El currículo debe preparar mejor al alumnado para futuros desafíos.',good:true},
{id:'discipline',title:'Problema disciplinario generalizado',text:'La prioridad del centro es un incremento severo de conductas disruptivas.',good:false},
{id:'attendance',title:'Absentismo estructural',text:'La principal causa del descenso académico es la falta continuada de asistencia.',good:false},
{id:'infrastructure',title:'Deterioro del edificio',text:'El problema central es la falta de espacios físicos adecuados.',good:false}
];

const theoryItems=[
{prompt:'Ernesto define y comunica hacia dónde quiere llevar al centro y qué quiere conseguir.',correct:'vision',options:[['vision','Establecer una visión y misión claras.'],['control','Centralizar todas las decisiones.'],['routine','Mantener las rutinas existentes.'],['inspection','Supervisar únicamente el cumplimiento normativo.']]},
{prompt:'El director crea condiciones seguras, inclusivas y estimulantes para alumnado y profesorado.',correct:'climate',options:[['climate','Crear un ambiente propicio para el aprendizaje.'],['competition','Aumentar la competición interna.'],['authority','Reforzar solo la autoridad formal.'],['distance','Reducir la participación comunitaria.']]},
{prompt:'Ernesto proporciona formación, recursos y apoyo para mejorar las prácticas docentes.',correct:'excellence',options:[['excellence','Promover la excelencia en la enseñanza.'],['selection','Seleccionar solo al profesorado con mejores resultados.'],['delegation','Delegar sin acompañamiento.'],['punishment','Usar sanciones como principal motor de mejora.']]},
{prompt:'El centro incorpora nuevas metodologías y tecnologías y revisa periódicamente sus procesos.',correct:'innovation',options:[['innovation','Impulsar innovación y mejora continua.'],['stability','Evitar cambios para ganar estabilidad.'],['marketing','Mejorar principalmente la imagen externa.'],['control','Aumentar controles administrativos.']]},
{prompt:'El colegio crea oportunidades para que familias y entidades locales participen en la educación.',correct:'community',options:[['community','Involucrar a la comunidad en la educación.'],['schoolonly','Mantener la educación dentro de la escuela.'],['inform','Limitarse a informar a las familias.'],['external','Delegar la responsabilidad en entidades externas.']]}
];

const applyItems=[
{prompt:'Ernesto acaba de llegar al centro. ¿Cuál debería ser su primera actuación?',correct:'diagnosis',options:[['diagnosis','Analizar datos de rendimiento y recoger feedback de docentes, familias y alumnado.'],['plan','Aplicar un plan inicial basado en experiencias de otros centros y ajustarlo después con la información recogida.'],['technology','Actualizar algunos recursos tecnológicos prioritarios mientras se realiza el diagnóstico pedagógico.'],['rules','Revisar normas y procedimientos que parecen obstaculizar la innovación antes de completar el análisis global.']],why:'El liderazgo efectivo parte de un diagnóstico del estado actual que permita fundamentar el plan de acción.'},
{prompt:'El equipo está desorientado y no comparte prioridades.',correct:'mission',options:[['mission','Definir y comunicar una visión y misión compartidas con metas claras.'],['orders','Asignar prioridades por equipos y pedir a cada uno que concrete cómo contribuirá a los objetivos generales.'],['wait','Abrir un periodo de propuestas y dejar que las prioridades emerjan de las iniciativas del profesorado.'],['external','Utilizar una propuesta externa como punto de partida y presentarla después al claustro para su adaptación.']],why:'Una visión y misión claras alinean objetivos y proporcionan dirección estratégica.'},
{prompt:'El profesorado está desanimado y necesita renovar sus prácticas.',correct:'development',options:[['development','Impulsar formación continua, intercambio de buenas prácticas y apoyo profesional.'],['pressure','Establecer metas de mejora exigentes y revisar periódicamente su cumplimiento antes de decidir apoyos formativos.'],['replace','Asignar las iniciativas innovadoras al profesorado más preparado y ampliar progresivamente su participación al resto.'],['individual','Ofrecer un catálogo amplio de formación y dejar que cada docente seleccione su itinerario de manera individual.']],why:'El desarrollo profesional es un objetivo central del liderazgo educativo y mejora la calidad de la enseñanza.'},
{prompt:'El centro quiere preparar al alumnado para desafíos futuros.',correct:'skills',options:[['skills','Integrar pensamiento crítico, comunicación, colaboración, creatividad e innovación y competencia digital en el currículo.'],['devices','Priorizar la competencia digital mediante nuevas herramientas y complementar después con otras habilidades.'],['content','Reforzar conocimientos básicos como base previa antes de introducir proyectos de pensamiento crítico y creatividad.'],['tests','Aumentar la frecuencia de evaluación para obtener más información sobre el progreso y ajustar la enseñanza.']],why:'El Tema 6 incluye expresamente el desarrollo de habilidades del siglo XXI entre los objetivos del liderazgo educativo.'},
{prompt:'Ernesto quiere aumentar compromiso y responsabilidad del profesorado.',correct:'distributed',options:[['distributed','Delegar responsabilidades, reconocer iniciativas y favorecer liderazgo distribuido con coordinación.'],['autocratic','Reservar a dirección las decisiones estratégicas y delegar únicamente tareas de ejecución en los equipos.'],['informal','Permitir que surjan liderazgos informales y formalizarlos cuando demuestren eficacia.'],['avoid','Mantener la coordinación principal en dirección y crear grupos consultivos sin capacidad decisoria.']],why:'El liderazgo distribuido puede aumentar compromiso y responsabilidad, aunque requiere coordinación y comunicación.'},
{prompt:'Tras implementar el plan, ¿cómo debería continuar el proceso?',correct:'evaluate',options:[['evaluate','Definir indicadores, revisar resultados, recoger feedback y ajustar estrategias.'],['freeze','Mantener las líneas estratégicas durante varios cursos y realizar ajustes solo cuando los resultados empeoren claramente.'],['opinions','Recoger opiniones de profesorado y familias como principal fuente de seguimiento y contrastarlas al final del curso.'],['final','Realizar una evaluación anual completa y utilizarla para rediseñar el plan del curso siguiente.']],why:'La mejora continua requiere seguimiento, retroalimentación y ajustes basados en evidencia.'}
];

const commonSurvey=window.COMMON_SURVEY;
const surveyStatements=commonSurvey.statements;
function orderedDiagnosisOptions(){
  const good=diagnosisOptions.filter(o=>o.good), bad=diagnosisOptions.filter(o=>!o.good);
  const out=[]; let gi=0,bi=0; const pattern=['b','g','g','b','g','b','g','g','g'];
  pattern.forEach(k=>{if(k==='g'&&gi<good.length)out.push(good[gi++]);if(k==='b'&&bi<bad.length)out.push(bad[bi++]);});
  return out.concat(good.slice(gi),bad.slice(bi));
}
function orderedChoices(options,correct,index){
  const right=options.find(([v])=>v===correct), wrong=options.filter(([v])=>v!==correct);
  const positions=[1,2,3,1,3,2]; const out=[...wrong];
  out.splice(Math.min(positions[index%positions.length],out.length),0,right); return out;
}

function show(name){Object.values(screens).forEach(id=>document.getElementById(id).classList.remove('active'));document.getElementById(screens[name]).classList.add('active');const steps={case:1,diagnosis:2,theory:3,apply:4,open:5,survey:6,result:6};const step=steps[name];document.getElementById('progressLabel').textContent=name==='result'?'Actividad completada':`Paso ${step} de 6`;document.getElementById('progressBar').style.width=`${name==='result'?100:(step/6)*100}%`;window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.next)));document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.back)));
function feedback(el,html,type='good'){el.className=`feedback ${type}`;el.innerHTML=html;}
function renderDiagnosis(){const grid=document.getElementById('diagnosisGrid');orderedDiagnosisOptions().forEach(o=>{const btn=document.createElement('button');btn.className='block-option';btn.dataset.id=o.id;btn.innerHTML=`<strong>${o.title}</strong><span>${o.text}</span>`;btn.addEventListener('click',()=>btn.classList.toggle('selected'));grid.appendChild(btn);});}
function renderTheory(){const grid=document.getElementById('theoryGrid');theoryItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="theory-${i}"><option value="">Selecciona el propósito</option>${orderedChoices(item.options,item.correct,i).map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});}
function renderApply(){const grid=document.getElementById('applyGrid');applyItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="apply-${i}"><option value="">Selecciona la actuación</option>${orderedChoices(item.options,item.correct,i).map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});}
function renderSurvey(){const box=document.getElementById('surveyItems');surveyStatements.forEach((s,i)=>{const div=document.createElement('div');div.className='survey-item';div.innerHTML=`<p><strong>${i+1}.</strong> ${s}</p><div class="likert">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="survey-${i}" value="${n}"> ${n}</label>`).join('')}</div>`;box.appendChild(div);});document.getElementById('surveyUseful').innerHTML='<option value="">Selecciona una opción</option>'+commonSurvey.usefulOptions.map(o=>`<option>${o}</option>`).join('');}
renderDiagnosis();renderTheory();renderApply();renderSurvey();

document.getElementById('evaluateDiagnosis').addEventListener('click',()=>{const chosen=[...document.querySelectorAll('.block-option.selected')].map(x=>x.dataset.id);const good=diagnosisOptions.filter(o=>o.good).map(o=>o.id);const correct=chosen.filter(id=>good.includes(id)).length;const bad=chosen.filter(id=>!good.includes(id)).length;state.diagnosisScore=Math.max(0,Math.round((correct/good.length)*20-bad*3));feedback(document.getElementById('diagnosisFeedback'),`<strong>${correct===5&&bad===0?'Diagnóstico preciso.':'Revisa algunos elementos.'}</strong> Has identificado ${correct} de 5 necesidades relevantes${bad?` y ${bad} distractor(es).`:'.'}<br><br><strong>Clave del Tema 6:</strong> el liderazgo educativo eficaz comienza comprendiendo el contexto para poder orientar la visión, las metas y las decisiones hacia la mejora de la enseñanza y el aprendizaje.<br><button class="primary" id="toTheory">Continuar</button>`,correct>=4&&bad===0?'good':'warn');document.getElementById('toTheory').addEventListener('click',()=>show('theory'));});

document.getElementById('evaluateTheory').addEventListener('click',()=>{let correct=0;theoryItems.forEach((item,i)=>{if(document.getElementById(`theory-${i}`).value===item.correct)correct++;});state.theoryScore=Math.round((correct/theoryItems.length)*20);feedback(document.getElementById('theoryFeedback'),`<strong>${correct===5?'Propósitos bien identificados.':'Hay relaciones que conviene revisar.'}</strong> Has resuelto ${correct} de 5 situaciones.<br><br><strong>Mapa del Tema 6:</strong> visión y misión, ambiente de aprendizaje, excelencia docente, innovación y participación comunitaria son propósitos fundamentales del liderazgo educativo.<br><button class="primary" id="toApply">Continuar</button>`,correct>=4?'good':'warn');document.getElementById('toApply').addEventListener('click',()=>show('apply'));});

document.getElementById('evaluateApply').addEventListener('click',()=>{let correct=0;const explanations=[];applyItems.forEach((item,i)=>{if(document.getElementById(`apply-${i}`).value===item.correct)correct++;explanations.push(`<li>${item.why}</li>`);});state.applyScore=Math.round((correct/applyItems.length)*15);feedback(document.getElementById('applyFeedback'),`<strong>${correct===applyItems.length?'Plan de liderazgo muy coherente.':'Revisa algunas decisiones.'}</strong> Has resuelto correctamente ${correct} de ${applyItems.length} situaciones.<ul>${explanations.join('')}</ul><p>El liderazgo educativo no se reduce a gestionar: conecta diagnóstico, visión, personas, innovación, comunidad y evaluación para mejorar el aprendizaje.</p><button class="primary" id="toOpen">Continuar</button>`,correct>=5?'good':'warn');document.getElementById('toOpen').addEventListener('click',()=>show('open'));});

function has(text,terms){return terms.some(t=>text.includes(t));}
function pts(text,groups){return groups.reduce((s,g)=>s+(has(text,g.terms)?g.points:0),0);}
document.getElementById('evaluateOpen').addEventListener('click',()=>{const raw=document.getElementById('openAnswer').value.trim();const text=raw.toLowerCase();

const concept=Math.min(15,pts(text,[
{terms:['liderazgo educativo','liderar la comunidad','dirigir la comunidad','influencia','influir'],points:5},
{terms:['visión','vision','metas','objetivos'],points:5},
{terms:['enseñanza y aprendizaje','ensenanza y aprendizaje','calidad de la educación','calidad de la educacion','máximo potencial','maximo potencial'],points:5}
]));
const vision=Math.min(20,pts(text,[
{terms:['evaluación del estado actual','evaluacion del estado actual','diagnóstico','diagnostico','analizar datos','datos de rendimiento'],points:7},
{terms:['feedback','retroalimentación','retroalimentacion','recoger opiniones','escuchar a'],points:5},
{terms:['visión y misión','vision y mision','visión compartida','vision compartida','dirección estratégica','direccion estrategica'],points:8}
]));
const strategy=Math.min(15,pts(text,[
{terms:['plan estratégico','plan estrategico','plan de acción','plan de accion','metas concretas','objetivos específicos','objetivos especificos'],points:5},
{terms:['innovación','innovacion','metodologías innovadoras','metodologias innovadoras','nuevas técnicas','nuevas tecnicas','tecnologías','tecnologias'],points:5},
{terms:['prácticas basadas en evidencia','practicas basadas en evidencia','evidencia','mejora de la enseñanza','mejora de la ensenanza'],points:5}
]));
const professional=Math.min(15,pts(text,[
{terms:['desarrollo profesional','formación continua','formacion continua','formación docente','formacion docente'],points:5},
{terms:['apoyo al profesorado','apoyar al profesorado','recursos','buenas prácticas','buenas practicas'],points:5},
{terms:['clima escolar positivo','ambiente positivo','inclusivo','estimulante','confianza','reconocimiento'],points:5}
]));
const community=Math.min(15,pts(text,[
{terms:['familias','padres','tutores','comunidad'],points:5},
{terms:['participación comunitaria','participacion comunitaria','entidades locales','asociaciones','implicación','implicacion'],points:4},
{terms:['habilidades del siglo xxi','pensamiento crítico','pensamiento critico','comunicación','comunicacion','colaboración','colaboracion','creatividad','competencia digital','habilidades digitales'],points:6}
]));
const distributed=Math.min(20,pts(text,[
{terms:['comunicación transparente','comunicacion transparente','canales de comunicación','canales de comunicacion','escucha','comunicar con transparencia'],points:5},
{terms:['delegar','delegación','delegacion','empoderamiento','liderazgo distribuido','responsabilidad compartida'],points:5},
{terms:['indicadores','monitorear','monitorizar','seguimiento','evaluación','evaluacion'],points:5},
{terms:['ajustar estrategias','mejora continua','revisión','revision','feedback','retroalimentación','retroalimentacion'],points:5}
]));
const rubric=concept+vision+strategy+professional+community+distributed;state.openRubric=rubric;state.openScore=Math.round(rubric*.45);state.openBreakdown={concept,vision,strategy,professional,community,distributed};
feedback(document.getElementById('openFeedback'),`<strong>Valoración de la respuesta: ${rubric}/100.</strong><div class="breakdown"><div>Concepto y propósito: ${concept}/15</div><div>Diagnóstico, visión y misión: ${vision}/20</div><div>Plan e innovación: ${strategy}/15</div><div>Desarrollo profesional y clima: ${professional}/15</div><div>Comunidad y siglo XXI: ${community}/15</div><div>Comunicación, distribución y evaluación: ${distributed}/20</div></div><p>${rubric===100?'La respuesta integra los componentes esenciales de un liderazgo educativo efectivo previstos en la primera parte del Tema 6.':'Revisa los apartados con menor puntuación e incorpora propósitos, acciones concretas y mecanismos de seguimiento.'}</p>`,rubric>=80?'good':'warn');});

document.getElementById('finishSurvey').addEventListener('click',()=>{const responses=surveyStatements.map((_,i)=>document.querySelector(`input[name="survey-${i}"]:checked`)?.value||'');if(responses.some(v=>!v)){feedback(document.getElementById('surveyFeedback'),'<strong>Completa las 10 valoraciones antes de finalizar.</strong>','warn');return;}state.survey={responses,best:document.getElementById('surveyBest').value.trim(),improve:document.getElementById('surveyImprove').value.trim(),useful:document.getElementById('surveyUseful').value};const total=Math.min(100,state.diagnosisScore+state.theoryScore+state.applyScore+state.openScore);document.getElementById('finalScore').textContent=total;document.getElementById('resultText').innerHTML=`<p><strong>Puntuación global: ${total}/100.</strong></p><div class="breakdown"><div>Diagnóstico: ${state.diagnosisScore}/20</div><div>Teoría: ${state.theoryScore}/20</div><div>Aplicación: ${state.applyScore}/15</div><div>Resolución: ${state.openScore}/45</div></div><p>La actividad diferencia entre el rendimiento demostrado en las tareas y tu percepción del aprendizaje en el cuestionario final.</p>`;localStorage.setItem('eaweb-sesion-11',JSON.stringify({session:'sesion-11',topic:'tema-06',score:total,state,completedAt:new Date().toISOString()}));show('result');});

document.getElementById('restart').addEventListener('click',()=>{localStorage.removeItem('eaweb-sesion-11');location.reload();});