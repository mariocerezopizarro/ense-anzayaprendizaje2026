const screens={case:'screen-case',diagnosis:'screen-diagnosis',theory:'screen-theory',apply:'screen-apply',open:'screen-open',survey:'screen-survey',result:'screen-result'};
const state={diagnosisScore:0,theoryScore:0,applyScore:0,openScore:0,openRubric:0,openBreakdown:{},survey:{}};

const diagnosisOptions=[
{id:'methodologies',title:'Metodologías dispares',text:'Existen diferencias importantes entre las prácticas utilizadas por el profesorado.',good:true},
{id:'diversity',title:'Atención desigual a la diversidad',text:'No todas las propuestas responden del mismo modo a las necesidades del alumnado.',good:true},
{id:'isolation',title:'Buenas prácticas aisladas',text:'Las experiencias innovadoras e inclusivas apenas se comparten.',good:true},
{id:'coordination',title:'Falta de coordinación',text:'No existen suficientes espacios estables para reflexionar e intercambiar recursos.',good:true},
{id:'collective',title:'Necesidad de aprendizaje colectivo',text:'El centro necesita transformar experiencias individuales en conocimiento compartido.',good:true},
{id:'discipline',title:'Problemas graves de convivencia',text:'La causa principal es una crisis disciplinaria generalizada.',good:false},
{id:'building',title:'Deficiencias de infraestructura',text:'El problema central es el estado físico del edificio.',good:false},
{id:'attendance',title:'Absentismo escolar',text:'El reto principal es la falta de asistencia del alumnado.',good:false}
];

const theoryItems=[
{prompt:'El profesorado se reúne regularmente para reflexionar, compartir experiencias y acordar mejoras.',correct:'cap',options:[['cap','Comunidad de Aprendizaje Profesional.'],['network','Red externa de centros.'],['mentor','Mentoría individual.'],['portfolio','Portafolio docente.']]},
{prompt:'Dos docentes visitan sus aulas y después dialogan sobre fortalezas y posibles mejoras.',correct:'peers',options:[['peers','Observación y retroalimentación entre iguales.'],['research','Investigación-acción.'],['network','Red profesional intercentros.'],['management','Supervisión directiva.']]},
{prompt:'El equipo detecta un problema, introduce una mejora, recoge evidencias y analiza su impacto.',correct:'research',options:[['research','Investigación-acción colaborativa.'],['cap','Reunión ordinaria de CAP.'],['mentor','Mentoría.'],['network','Difusión externa.']]},
{prompt:'Docentes con diferentes experiencias trabajan en parejas para compartir recursos y desarrollar nuevas metodologías.',correct:'mentor',options:[['mentor','Mentoría y parejas pedagógicas.'],['audit','Auditoría docente.'],['research','Investigación individual.'],['formal','Formación externa obligatoria.']]},
{prompt:'El centro organiza encuentros con otros colegios y comparte recursos en un repositorio digital.',correct:'network',options:[['network','Redes de intercambio profesional.'],['cap','CAP limitada al propio centro.'],['peer','Observación de aula exclusivamente.'],['evaluation','Evaluación del alumnado.']]},
{prompt:'El equipo crea conjuntamente actividades adaptadas a distintas realidades culturales, familiares y lingüísticas.',correct:'inclusive',options:[['inclusive','Diseño colaborativo de propuestas inclusivas.'],['uniform','Homogeneización metodológica.'],['individual','Planificación individual.'],['standard','Aplicación de una única actividad estándar.']]}
];

const applyItems=[
{prompt:'Las buenas prácticas innovadoras quedan aisladas en algunas aulas. ¿Qué hacer?',correct:'share',options:[['share','Presentarlas en reuniones de CAP, analizarlas conjuntamente y adaptar las que resulten útiles.'],['keep','Crear un repositorio interno donde cada docente pueda consultar voluntariamente las experiencias de sus compañeros.'],['copy','Seleccionar desde dirección las prácticas con mejores resultados y proponer su aplicación común durante un periodo de prueba.'],['archive','Documentarlas y presentarlas en una jornada interna anual de buenas prácticas.']],why:'La CAP transforma experiencias individuales en conocimiento profesional compartido.'},
{prompt:'El centro quiere mejorar la atención a la diversidad cultural, familiar y lingüística.',correct:'inclusive',options:[['inclusive','Diseñar conjuntamente actividades, materiales accesibles y proyectos adaptados a esa diversidad.'],['same','Diseñar una propuesta común para todo el nivel y permitir ajustes individuales cuando aparezcan dificultades.'],['external','Pedir a especialistas que diseñen adaptaciones y que el profesorado ordinario las incorpore a sus actividades.'],['reduce','Utilizar agrupamientos más homogéneos en determinadas tareas para facilitar una atención más ajustada.']],why:'El diseño colaborativo permite construir respuestas inclusivas y contextualizadas.'},
{prompt:'El equipo quiere comprobar si una nueva metodología realmente mejora la participación.',correct:'action',options:[['action','Desarrollar un pequeño proyecto de investigación-acción, recoger evidencias y revisar sus resultados.'],['impression','Recoger opiniones del profesorado y del alumnado como principal evidencia para decidir si mantener la metodología.'],['wait','Aplicar la metodología durante un periodo amplio para evitar cambios prematuros y evaluarla al final.'],['survey','Realizar una encuesta de satisfacción al terminar el trimestre y utilizarla para decidir su continuidad.']],why:'La investigación-acción conecta necesidad, intervención, evidencias, análisis y reajuste.'},
{prompt:'Una docente domina una metodología inclusiva que otros quieren aprender.',correct:'mentor',options:[['mentor','Crear parejas pedagógicas o un proceso de mentoría y acompañamiento.'],['lecture','Organizar una sesión práctica en la que muestre la metodología y compartir después materiales para que otros la prueben por su cuenta.'],['private','Documentar la experiencia y dejarla disponible para quienes quieran replicarla de manera autónoma.'],['directive','Nombrarla coordinadora metodológica para orientar al equipo y revisar periódicamente la aplicación de la propuesta.']],why:'La mentoría favorece un intercambio sostenido de conocimiento entre profesionales con experiencias distintas.'},
{prompt:'El profesorado quiere aprender de prácticas reales de sus compañeros.',correct:'observe',options:[['observe','Organizar visitas a otras aulas y sesiones posteriores de retroalimentación constructiva.'],['report','Compartir vídeos, materiales y relatos de práctica antes de realizar encuentros de discusión entre docentes.'],['inspect','Utilizar una pauta común de observación y entregar un informe individual al docente observado.'],['avoid','Observar prácticas mediante grabaciones seleccionadas por cada docente y comentarlas posteriormente en grupo.']],why:'La observación entre iguales permite analizar prácticas reales dentro de un clima de confianza y aprendizaje.'},
{prompt:'El centro quiere ampliar el aprendizaje más allá de su propio claustro.',correct:'network',options:[['network','Crear redes con otros centros, organizar talleres intercentros y compartir recursos digitales.'],['close','Invitar ocasionalmente a profesionales externos a las reuniones de la CAP para ampliar perspectivas.'],['individual','Facilitar contactos y recursos externos y permitir que cada docente construya su propia red profesional.'],['event','Organizar un encuentro anual intercentros acompañado de un intercambio digital de materiales durante el curso.']],why:'Las redes profesionales amplían las fuentes de conocimiento y permiten compartir buenas prácticas entre centros.'},
{prompt:'¿Qué necesita una CAP para mantenerse en el tiempo?',correct:'conditions',options:[['conditions','Tiempo y recursos institucionales, objetivos claros, liderazgo distribuido y seguimiento periódico.'],['voluntary','Reservar algunas reuniones institucionales y complementar el resto del trabajo colaborativo con participación voluntaria.'],['director','Mantener en dirección las decisiones estratégicas y distribuir la ejecución entre equipos de trabajo.'],['informal','Definir orientaciones generales y permitir que cada grupo establezca sus propios objetivos sin un sistema común de seguimiento.']],why:'Las CAP sostenibles requieren condiciones organizativas, corresponsabilidad y evaluación continua.'}
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
orderedDiagnosisOptions().forEach(o=>{const btn=document.createElement('button');btn.className='block-option';btn.dataset.id=o.id;btn.innerHTML=`<strong>${o.title}</strong><span>${o.text}</span>`;btn.addEventListener('click',()=>btn.classList.toggle('selected'));grid.appendChild(btn);});
}
function renderTheory(){
const grid=document.getElementById('theoryGrid');
theoryItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="theory-${i}"><option value="">Selecciona la estrategia</option>${orderedChoices(item.options,item.correct,i).map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});
}
function renderApply(){
const grid=document.getElementById('applyGrid');
applyItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="apply-${i}"><option value="">Selecciona la actuación</option>${orderedChoices(item.options,item.correct,i).map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});
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
feedback(document.getElementById('diagnosisFeedback'),`<strong>${correct===5&&bad===0?'Diagnóstico colaborativo preciso.':'Revisa algunos elementos.'}</strong> Has identificado ${correct} de 5 necesidades relevantes${bad?` y ${bad} distractor(es).`:'.'}<br><br><strong>Clave del Tema 8:</strong> una CAP surge cuando el centro transforma el aislamiento profesional en reflexión, aprendizaje y mejora compartidos.<br><button class="primary" id="toTheory">Continuar</button>`,correct>=4&&bad===0?'good':'warn');
document.getElementById('toTheory').addEventListener('click',()=>show('theory'));
});

document.getElementById('evaluateTheory').addEventListener('click',()=>{
let correct=0;theoryItems.forEach((item,i)=>{if(document.getElementById(`theory-${i}`).value===item.correct)correct++;});
state.theoryScore=Math.round((correct/theoryItems.length)*20);
feedback(document.getElementById('theoryFeedback'),`<strong>${correct===theoryItems.length?'Estrategias colaborativas bien relacionadas.':'Hay relaciones que conviene revisar.'}</strong> Has resuelto ${correct} de ${theoryItems.length} situaciones.<br><br><strong>Mapa del Tema 8:</strong> CAP, observación entre pares, investigación-acción, mentoría, redes profesionales y diseño inclusivo son mecanismos complementarios de desarrollo docente.<br><button class="primary" id="toApply">Continuar</button>`,correct>=5?'good':'warn');
document.getElementById('toApply').addEventListener('click',()=>show('apply'));
});

document.getElementById('evaluateApply').addEventListener('click',()=>{
let correct=0;const explanations=[];
applyItems.forEach((item,i)=>{if(document.getElementById(`apply-${i}`).value===item.correct)correct++;explanations.push(`<li>${item.why}</li>`);});
state.applyScore=Math.round((correct/applyItems.length)*15);
feedback(document.getElementById('applyFeedback'),`<strong>${correct===applyItems.length?'Plan colaborativo coherente.':'Revisa algunas decisiones.'}</strong> Has resuelto correctamente ${correct} de ${applyItems.length} situaciones.<ul>${explanations.join('')}</ul><p>La colaboración se vuelve aprendizaje profesional cuando existe reflexión, experimentación, evidencia, apoyo mutuo y seguimiento.</p><button class="primary" id="toOpen">Continuar</button>`,correct>=6?'good':'warn');
document.getElementById('toOpen').addEventListener('click',()=>show('open'));
});

function has(text,terms){return terms.some(t=>text.includes(t));}
function pts(text,groups){return groups.reduce((s,g)=>s+(has(text,g.terms)?g.points:0),0);}

document.getElementById('evaluateOpen').addEventListener('click',()=>{
const text=document.getElementById('openAnswer').value.trim().toLowerCase();

const cap=Math.min(20,pts(text,[
{terms:['comunidad de aprendizaje profesional','comunidades de aprendizaje profesional','cap'],points:6},
{terms:['espacios estables','reuniones periódicas','reuniones periodicas','reunirse periódicamente','reunirse periodicamente'],points:5},
{terms:['compartir experiencias','analizar dificultades','reflexión compartida','reflexion compartida','aprendizaje conjunto'],points:5},
{terms:['confianza','respeto','diálogo','dialogo','colaboración genuina','colaboracion genuina'],points:4}
]));

const inclusion=Math.min(15,pts(text,[
{terms:['diseño colaborativo','diseno colaborativo','planificar conjuntamente','crear conjuntamente'],points:5},
{terms:['diversidad cultural','diversidad familiar','diversidad lingüística','diversidad linguistica','atención a la diversidad','atencion a la diversidad'],points:5},
{terms:['materiales accesibles','actividades adaptadas','propuestas inclusivas','proyectos interdisciplinares','proyectos interdisciplinarios'],points:5}
]));

const research=Math.min(20,pts(text,[
{terms:['investigación-acción','investigacion-accion','investigación acción','investigacion accion'],points:5},
{terms:['detectar necesidades','identificar necesidades','analizar problemas del aula'],points:5},
{terms:['introducir mejoras','proyectos de innovación','proyectos de innovacion','experimentar','innovación pedagógica','innovacion pedagogica'],points:5},
{terms:['recoger evidencias','analizar resultados','valorar su impacto','evaluar su impacto'],points:5}
]));

const peer=Math.min(20,pts(text,[
{terms:['observación entre iguales','observacion entre iguales','observación entre pares','observacion entre pares','visitas a otras aulas','visitas a las aulas'],points:5},
{terms:['retroalimentación constructiva','retroalimentacion constructiva','feedback constructivo'],points:5},
{terms:['mentoría','mentoria','acompañamiento docente','acompanamiento docente'],points:5},
{terms:['parejas pedagógicas','parejas pedagogicas','aprendizaje entre iguales','apoyo entre docentes'],points:5}
]));

const networks=Math.min(10,pts(text,[
{terms:['redes de intercambio profesional','redes profesionales','otros centros','intercentros'],points:5},
{terms:['talleres conjuntos','talleres intercentros','repositorios digitales','repositorio digital','compartir recursos digitales'],points:5}
]));

const conditions=Math.min(15,pts(text,[
{terms:['liderazgo distribuido','corresponsabilidad','responsabilidades compartidas'],points:4},
{terms:['tiempo y recursos','tiempo institucional','recursos institucionales','espacios de coordinación','espacios de coordinacion'],points:4},
{terms:['objetivos claros','objetivos compartidos','metas compartidas'],points:3},
{terms:['evaluación y seguimiento','evaluacion y seguimiento','seguimiento periódico','seguimiento periodico','mejora continua','ajustar estrategias','reajustar'],points:4}
]));

const rubric=cap+inclusion+research+peer+networks+conditions;
state.openRubric=rubric;state.openScore=Math.round(rubric*.45);state.openBreakdown={cap,inclusion,research,peer,networks,conditions};

feedback(document.getElementById('openFeedback'),`<strong>Valoración de la respuesta: ${rubric}/100.</strong><div class="breakdown"><div>CAP y cultura colaborativa: ${cap}/20</div><div>Diseño inclusivo y diversidad: ${inclusion}/15</div><div>Investigación-acción e innovación: ${research}/20</div><div>Observación, mentoría y aprendizaje entre iguales: ${peer}/20</div><div>Redes y recursos compartidos: ${networks}/10</div><div>Liderazgo, condiciones y seguimiento: ${conditions}/15</div></div><p>${rubric===100?'La respuesta integra los componentes esenciales del Tema 8 y propone una comunidad profesional inclusiva, innovadora y sostenible.':'Revisa los apartados con menor puntuación y concreta cómo se organiza, aprende, experimenta y evalúa la comunidad profesional.'}</p><button class="primary" id="toSurvey">Continuar</button>`,rubric>=80?'good':'warn');
document.getElementById('toSurvey').addEventListener('click',()=>show('survey'));
});

document.getElementById('finishSurvey').addEventListener('click',()=>{
const responses=surveyStatements.map((_,i)=>document.querySelector(`input[name="survey-${i}"]:checked`)?.value||'');
if(responses.some(v=>!v)){feedback(document.getElementById('surveyFeedback'),'<strong>Completa las 10 valoraciones antes de finalizar.</strong>','warn');return;}
state.survey={responses,best:document.getElementById('surveyBest').value.trim(),improve:document.getElementById('surveyImprove').value.trim(),useful:document.getElementById('surveyUseful').value};
const total=Math.min(100,state.diagnosisScore+state.theoryScore+state.applyScore+state.openScore);
document.getElementById('finalScore').textContent=total;
document.getElementById('resultText').innerHTML=`<p><strong>Puntuación global: ${total}/100.</strong></p><div class="breakdown"><div>Diagnóstico: ${state.diagnosisScore}/20</div><div>Teoría: ${state.theoryScore}/20</div><div>Aplicación: ${state.applyScore}/15</div><div>Resolución: ${state.openScore}/45</div></div><p>La actividad diferencia entre el rendimiento demostrado en las tareas y tu percepción del aprendizaje en el cuestionario final.</p>`;
localStorage.setItem('eaweb-sesion-16',JSON.stringify({session:'sesion-16',topic:'tema-08',score:total,state,completedAt:new Date().toISOString()}));
show('result');
});

document.getElementById('restart').addEventListener('click',()=>{localStorage.removeItem('eaweb-sesion-16');location.reload();});