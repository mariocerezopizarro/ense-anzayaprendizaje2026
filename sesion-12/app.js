const screens={case:'screen-case',diagnosis:'screen-diagnosis',theory:'screen-theory',apply:'screen-apply',open:'screen-open',survey:'screen-survey',result:'screen-result'};
const state={diagnosisScore:0,theoryScore:0,applyScore:0,openScore:0,openRubric:0,openBreakdown:{},survey:{}};

const diagnosisOptions=[
{id:'change',title:'Cambio curricular relevante',text:'El centro quiere introducir pensamiento informático en el currículo.',good:true},
{id:'acceptance',title:'Necesidad de apoyo y aceptación',text:'El cambio requiere implicación del profesorado, alumnado y familias.',good:true},
{id:'skills',title:'Mejora de habilidades analíticas',text:'La innovación busca desarrollar análisis y resolución de problemas.',good:true},
{id:'dialogue',title:'Talleres y reuniones',text:'La directora abre espacios para discutir cómo implementar el cambio.',good:true},
{id:'culture',title:'Impacto sobre la cultura escolar',text:'La manera de liderar puede modificar colaboración, compromiso e innovación.',good:true},
{id:'failure',title:'Fracaso escolar generalizado',text:'El problema central es una alta tasa de fracaso escolar.',good:false},
{id:'conflict',title:'Conflicto disciplinario grave',text:'La prioridad es resolver problemas severos de convivencia.',good:false},
{id:'resources',title:'Falta absoluta de recursos',text:'El caso señala que no existen recursos tecnológicos disponibles.',good:false}
];

const theoryItems=[
{prompt:'La directora toma una decisión rápida y centralizada porque una situación urgente exige claridad inmediata.',correct:'autocratic',options:[['autocratic','Liderazgo autocrático.'],['democratic','Liderazgo democrático.'],['transformational','Liderazgo transformacional.'],['distributed','Liderazgo distribuido.']]},
{prompt:'La directora invita a profesorado, alumnado y familias a participar en decisiones sobre la implementación.',correct:'democratic',options:[['democratic','Liderazgo democrático.'],['autocratic','Liderazgo autocrático.'],['transformational','Liderazgo transformacional.'],['distributed','Liderazgo distribuido.']]},
{prompt:'La directora comunica una visión inspiradora, motiva al equipo y presenta el cambio como oportunidad de crecimiento.',correct:'transformational',options:[['transformational','Liderazgo transformacional.'],['democratic','Liderazgo democrático.'],['autocratic','Liderazgo autocrático.'],['distributed','Liderazgo distribuido.']]},
{prompt:'Distintos docentes asumen la coordinación de recursos, formación y actividades de pensamiento informático.',correct:'distributed',options:[['distributed','Liderazgo distribuido.'],['transformational','Liderazgo transformacional.'],['democratic','Liderazgo democrático.'],['autocratic','Liderazgo autocrático.']]},
{prompt:'La directora cambia su manera de liderar según el momento, la urgencia y las necesidades del centro.',correct:'adaptive',options:[['adaptive','Liderazgo adaptado al contexto.'],['fixed','Aplicación rígida de un solo estilo.'],['neutral','Ausencia de liderazgo.'],['delegated','Delegación total sin coordinación.']]}
];

const applyItems=[
{prompt:'Hay resistencia inicial y el equipo no ve sentido al pensamiento informático. ¿Qué conviene priorizar?',correct:'transform',options:[['transform','Liderazgo transformacional: visión clara, inspiración, apoyo y motivación hacia el cambio.'],['autocratic','Imponer el cambio sin explicación ni participación.'],['distributed','Repartir tareas antes de construir una visión común.'],['avoid','Posponer el cambio indefinidamente.']],why:'El liderazgo transformacional es especialmente útil para movilizar a la comunidad hacia una visión compartida e innovadora.'},
{prompt:'Hay que decidir cómo adaptar la propuesta a diferentes etapas y necesidades.',correct:'democratic',options:[['democratic','Liderazgo democrático: recoger aportaciones y tomar decisiones participadas.'],['autocratic','Decidir todos los detalles desde dirección.'],['isolated','Pedir solo opinión a un pequeño grupo.'],['none','Aplicar exactamente la misma propuesta a todo el centro.']],why:'La participación activa aumenta compromiso, colaboración y cohesión, aunque puede requerir más tiempo.'},
{prompt:'El proyecto ya está en marcha y se necesitan responsables de formación, recursos y seguimiento.',correct:'distributed',options:[['distributed','Liderazgo distribuido: asignar roles claros y autonomía coordinada.'],['autocratic','Concentrar todas las funciones en la directora.'],['democratic','Debatir cada microdecisión entre toda la comunidad.'],['random','Repartir tareas sin coordinación ni objetivos comunes.']],why:'El liderazgo distribuido favorece responsabilidad y propiedad compartida, pero necesita coordinación.'},
{prompt:'Surge una incidencia urgente que exige una decisión inmediata para mantener el funcionamiento.',correct:'autocratic',options:[['autocratic','Usar puntualmente una decisión directiva clara y rápida.'],['democratic','Abrir un proceso largo de consenso antes de actuar.'],['transform','Limitarse a inspirar sin decidir.'],['distributed','Delegar la urgencia sin establecer quién decide.']],why:'El liderazgo autocrático puede ser útil en situaciones que requieren rapidez y determinación, aunque no conviene usarlo como estilo predominante.'},
{prompt:'¿Qué enfoque debería guiar todo el proceso de cambio?',correct:'adapt',options:[['adapt','Combinar estilos según contexto, necesidad y momento del proceso.'],['single','Mantener un único estilo desde el principio hasta el final.'],['transformonly','Usar siempre liderazgo transformacional, sin excepciones.'],['democraticonly','Buscar consenso para cualquier decisión, incluso las urgentes.']],why:'El Tema 6 subraya que los líderes eficaces adaptan su estilo a las circunstancias y necesidades del entorno.'},
{prompt:'¿Qué resultado debería perseguirse con esta combinación?',correct:'culture',options:[['culture','Una cultura más innovadora, colaborativa y comprometida, con alumnado motivado y mejor preparado para resolver problemas.'],['control','Mayor control directivo aunque baje la participación.'],['speed','Tomar decisiones más rápido como objetivo principal.'],['technology','Incrementar dispositivos sin cambiar prácticas ni cultura.']],why:'El estilo de liderazgo impacta la cultura escolar y, a través de ella, el compromiso y el rendimiento del alumnado.'}
];

const commonSurvey=window.COMMON_SURVEY;
const surveyStatements=commonSurvey.statements;
function show(name){Object.values(screens).forEach(id=>document.getElementById(id).classList.remove('active'));document.getElementById(screens[name]).classList.add('active');const steps={case:1,diagnosis:2,theory:3,apply:4,open:5,survey:6,result:6};const step=steps[name];document.getElementById('progressLabel').textContent=name==='result'?'Actividad completada':`Paso ${step} de 6`;document.getElementById('progressBar').style.width=`${name==='result'?100:(step/6)*100}%`;window.scrollTo({top:0,behavior:'smooth'});}
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.next)));document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.back)));
function feedback(el,html,type='good'){el.className=`feedback ${type}`;el.innerHTML=html;}
function renderDiagnosis(){const grid=document.getElementById('diagnosisGrid');diagnosisOptions.forEach(o=>{const btn=document.createElement('button');btn.className='block-option';btn.dataset.id=o.id;btn.innerHTML=`<strong>${o.title}</strong><span>${o.text}</span>`;btn.addEventListener('click',()=>btn.classList.toggle('selected'));grid.appendChild(btn);});}
function renderTheory(){const grid=document.getElementById('theoryGrid');theoryItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="theory-${i}"><option value="">Selecciona el estilo</option>${item.options.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});}
function renderApply(){const grid=document.getElementById('applyGrid');applyItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="apply-${i}"><option value="">Selecciona la actuación</option>${item.options.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});}
function renderSurvey(){const box=document.getElementById('surveyItems');surveyStatements.forEach((s,i)=>{const div=document.createElement('div');div.className='survey-item';div.innerHTML=`<p><strong>${i+1}.</strong> ${s}</p><div class="likert">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="survey-${i}" value="${n}"> ${n}</label>`).join('')}</div>`;box.appendChild(div);});document.getElementById('surveyUseful').innerHTML='<option value="">Selecciona una opción</option>'+commonSurvey.usefulOptions.map(o=>`<option>${o}</option>`).join('');}
renderDiagnosis();renderTheory();renderApply();renderSurvey();

document.getElementById('evaluateDiagnosis').addEventListener('click',()=>{const chosen=[...document.querySelectorAll('.block-option.selected')].map(x=>x.dataset.id);const good=diagnosisOptions.filter(o=>o.good).map(o=>o.id);const correct=chosen.filter(id=>good.includes(id)).length;const bad=chosen.filter(id=>!good.includes(id)).length;state.diagnosisScore=Math.max(0,Math.round((correct/good.length)*20-bad*3));feedback(document.getElementById('diagnosisFeedback'),`<strong>${correct===5&&bad===0?'Diagnóstico preciso.':'Revisa algunos elementos.'}</strong> Has identificado ${correct} de 5 elementos relevantes${bad?` y ${bad} distractor(es).`:'.'}<br><br><strong>Clave del Tema 6:</strong> introducir una innovación curricular no es solo una decisión técnica; exige liderar la aceptación, la participación y la cultura de cambio del centro.<br><button class="primary" id="toTheory">Continuar</button>`,correct>=4&&bad===0?'good':'warn');document.getElementById('toTheory').addEventListener('click',()=>show('theory'));});

document.getElementById('evaluateTheory').addEventListener('click',()=>{let correct=0;theoryItems.forEach((item,i)=>{if(document.getElementById(`theory-${i}`).value===item.correct)correct++;});state.theoryScore=Math.round((correct/theoryItems.length)*20);feedback(document.getElementById('theoryFeedback'),`<strong>${correct===5?'Estilos bien identificados.':'Hay relaciones que conviene revisar.'}</strong> Has resuelto ${correct} de 5 situaciones.<br><br><strong>Mapa del Tema 6:</strong> el liderazgo autocrático aporta rapidez; el democrático, participación; el transformacional, inspiración para el cambio; y el distribuido, responsabilidad compartida. Ninguno debe aplicarse de forma rígida.<br><button class="primary" id="toApply">Continuar</button>`,correct>=4?'good':'warn');document.getElementById('toApply').addEventListener('click',()=>show('apply'));});

document.getElementById('evaluateApply').addEventListener('click',()=>{let correct=0;const explanations=[];applyItems.forEach((item,i)=>{if(document.getElementById(`apply-${i}`).value===item.correct)correct++;explanations.push(`<li>${item.why}</li>`);});state.applyScore=Math.round((correct/applyItems.length)*15);feedback(document.getElementById('applyFeedback'),`<strong>${correct===applyItems.length?'Liderazgo bien adaptado al contexto.':'Revisa algunas decisiones.'}</strong> Has resuelto correctamente ${correct} de ${applyItems.length} situaciones.<ul>${explanations.join('')}</ul><p>Un líder eficaz selecciona y combina estilos según el objetivo, la urgencia, las personas implicadas y la fase del cambio.</p><button class="primary" id="toOpen">Continuar</button>`,correct>=5?'good':'warn');document.getElementById('toOpen').addEventListener('click',()=>show('open'));});

function has(text,terms){return terms.some(t=>text.includes(t));}
function pts(text,groups){return groups.reduce((s,g)=>s+(has(text,g.terms)?g.points:0),0);}
document.getElementById('evaluateOpen').addEventListener('click',()=>{const raw=document.getElementById('openAnswer').value.trim();const text=raw.toLowerCase();

const styles=Math.min(20,pts(text,[
{terms:['autocrático','autocratico'],points:5},
{terms:['democrático','democratico'],points:5},
{terms:['transformacional'],points:5},
{terms:['distribuido'],points:5}
]));
const transformational=Math.min(20,pts(text,[
{terms:['inspirar','inspira','visión','vision','motivar','motiva'],points:7},
{terms:['innovación','innovacion','mejora continua','experimentación','experimentacion','esfuerzo'],points:7},
{terms:['habilidades analíticas','habilidades analiticas','resolución de problemas','resolucion de problemas','motivación','motivacion','compromiso'],points:6}
]));
const democratic=Math.min(15,pts(text,[
{terms:['profesorado','docentes'],points:4},
{terms:['alumnado','estudiantes'],points:3},
{terms:['familias','padres'],points:3},
{terms:['toma de decisiones','participación','participacion','feedback','colaboración','colaboracion','cohesión','cohesion'],points:5}
]));
const distributed=Math.min(15,pts(text,[
{terms:['asignar roles','roles específicos','roles especificos','responsabilidades'],points:5},
{terms:['autonomía','autonomia','delegar','delegación','delegacion'],points:5},
{terms:['responsabilidad compartida','liderazgo compartido','propiedad compartida','coordinación','coordinacion'],points:5}
]));
const autocratic=Math.min(10,pts(text,[
{terms:['decisiones rápidas','decisiones rapidas','rapidez','urgente','urgencia','claridad'],points:5},
{terms:['puntual','de forma puntual','no debería','no deberia','no predominante','limitar colaboración','limitar la colaboración'],points:5}
]));
const adaptation=Math.min(20,pts(text,[
{terms:['adaptar','adaptativo','adaptada al contexto','según el contexto','segun el contexto','flexible','combinar estilos','combinación','combinacion'],points:7},
{terms:['cultura escolar','cultura de innovación','cultura de innovacion','colaborativa','compromiso','respeto mutuo'],points:6},
{terms:['rendimiento','aprendizaje','motivación del alumnado','motivacion del alumnado','autónomo','autonomo','autoaprendizaje','resolver problemas'],points:7}
]));
const rubric=styles+transformational+democratic+distributed+autocratic+adaptation;state.openRubric=rubric;state.openScore=Math.round(rubric*.45);state.openBreakdown={styles,transformational,democratic,distributed,autocratic,adaptation};
feedback(document.getElementById('openFeedback'),`<strong>Valoración de la respuesta: ${rubric}/100.</strong><div class="breakdown"><div>Identificación de estilos: ${styles}/20</div><div>Transformacional: ${transformational}/20</div><div>Democrático: ${democratic}/15</div><div>Distribuido: ${distributed}/15</div><div>Autocrático contextual: ${autocratic}/10</div><div>Adaptación, cultura y rendimiento: ${adaptation}/20</div></div><p>${rubric===100?'La respuesta compara los estilos, justifica su combinación y conecta liderazgo, cultura escolar y rendimiento del alumnado.':'Revisa los apartados con menor puntuación y explica no solo qué estilo usarías, sino por qué y con qué efecto.'}</p>`,rubric>=80?'good':'warn');});

document.getElementById('finishSurvey').addEventListener('click',()=>{const responses=surveyStatements.map((_,i)=>document.querySelector(`input[name="survey-${i}"]:checked`)?.value||'');if(responses.some(v=>!v)){feedback(document.getElementById('surveyFeedback'),'<strong>Completa las 10 valoraciones antes de finalizar.</strong>','warn');return;}state.survey={responses,best:document.getElementById('surveyBest').value.trim(),improve:document.getElementById('surveyImprove').value.trim(),useful:document.getElementById('surveyUseful').value};const total=Math.min(100,state.diagnosisScore+state.theoryScore+state.applyScore+state.openScore);document.getElementById('finalScore').textContent=total;document.getElementById('resultText').innerHTML=`<p><strong>Puntuación global: ${total}/100.</strong></p><div class="breakdown"><div>Diagnóstico: ${state.diagnosisScore}/20</div><div>Teoría: ${state.theoryScore}/20</div><div>Aplicación: ${state.applyScore}/15</div><div>Resolución: ${state.openScore}/45</div></div><p>La actividad diferencia entre el rendimiento demostrado en las tareas y tu percepción del aprendizaje en el cuestionario final.</p>`;localStorage.setItem('eaweb-sesion-12',JSON.stringify({session:'sesion-12',topic:'tema-06',score:total,state,completedAt:new Date().toISOString()}));show('result');});

document.getElementById('restart').addEventListener('click',()=>{localStorage.removeItem('eaweb-sesion-12');location.reload();});