const screens={case:'screen-case',diagnosis:'screen-diagnosis',theory:'screen-theory',apply:'screen-apply',exam:'screen-exam',survey:'screen-survey',result:'screen-result'};
const state={diagnosisScore:0,theoryScore:0,applyScore:0,examRubric:0,openScore:0,examBreakdown:{},survey:{}};

const diagnosisOptions=[
{id:'disability',title:'Discapacidad como motivo de exclusión',text:'Algunos compañeros evitan incluir a Claudia debido a las dificultades que atribuyen a su discapacidad auditiva.',good:true},
{id:'participation',title:'Barreras de participación',text:'La situación afecta a la participación de Claudia en actividades grupales y en la convivencia cotidiana.',good:true},
{id:'communication',title:'Necesidades de comunicación y accesibilidad',text:'Los apoyos visuales, la lectura labial y la forma de comunicarse son relevantes para su inclusión real.',good:true},
{id:'social',title:'Necesidad de conciencia social y empatía',text:'El grupo necesita comprender perspectivas diferentes y aprender a relacionarse sin prejuicios.',good:true},
{id:'family',title:'Prevención compartida con las familias',text:'El centro plantea sensibilización y colaboración con familias y comunidad educativa.',good:true},
{id:'academic',title:'Problema principalmente académico',text:'La prioridad sería recuperar contenidos porque la discapacidad auditiva implica necesariamente menor rendimiento.',good:false},
{id:'individual',title:'Dificultad individual de Claudia',text:'El aislamiento podría explicarse principalmente por una preferencia personal de la alumna por relacionarse menos.',good:false},
{id:'technical',title:'Solución centrada en el dispositivo',text:'El problema se resolvería fundamentalmente revisando los audífonos y aumentando el volumen de las explicaciones.',good:false}
];

const theoryItems=[
{prompt:'Algunos compañeros excluyen a Claudia de actividades precisamente por su discapacidad auditiva.',correct:'direct',options:[['barrier','Barrera de acceso sin componente discriminatorio entre iguales.'],['direct','Discriminación directa por discapacidad.'],['indirect','Discriminación indirecta producida por una norma neutral.'],['adapt','Necesidad ordinaria de adaptación metodológica.']]},
{prompt:'Una actividad escolar se desarrolla únicamente mediante instrucciones orales y, sin pretender excluir, dificulta especialmente la participación de alumnado con discapacidad auditiva.',correct:'indirect',options:[['access','Falta de accesibilidad que no puede relacionarse con discriminación.'],['direct','Discriminación directa por rechazo explícito.'],['indirect','Posible discriminación indirecta derivada de una práctica aparentemente neutral.'],['individual','Dificultad individual que debe compensar la alumna.']]},
{prompt:'Un compañero comprende que Claudia puede percibir e interpretar una conversación de forma diferente y trata de situarse en su perspectiva.',correct:'mind',options:[['goleman','Inteligencia social de Goleman centrada en habilidades de relación.'],['freire','Conciencia crítica sobre estructuras sociales.'],['mind','Teoría de la Mente.'],['citizenship','Educación para la ciudadanía democrática.']]},
{prompt:'El alumnado aprende a reconocer emociones ajenas, mostrar empatía y relacionarse de forma eficaz con compañeros diversos.',correct:'goleman',options:[['mind','Teoría de la Mente como comprensión de estados mentales.'],['citizenship','Ciudadanía democrática y derechos humanos.'],['freire','Conciencia crítica y cuestionamiento social.'],['goleman','Inteligencia social de Goleman.']]},
{prompt:'La escuela mantiene canales regulares, accesibles y bidireccionales con las familias para prevenir situaciones de exclusión.',correct:'communication',options:[['participation','Participación familiar en actividades puntuales del centro.'],['communication','Comunicación abierta y regular entre escuela y familia.'],['home','Colaboración en el aprendizaje en el hogar.'],['association','Asociación de familias y maestros como única vía de relación.']]},
{prompt:'El docente diseña ambientes inclusivos, selecciona metodologías adecuadas al contexto y revisa críticamente sus propios prejuicios.',correct:'architect',options:[['facilitator','Facilitador centrado principalmente en acompañar la autonomía del alumnado.'],['manager','Gestor del aula centrado en normas, tiempos y organización.'],['architect','Maestro como arquitecto del aprendizaje.'],['specialist','Especialista responsable de adaptar exclusivamente al alumnado con discapacidad.']]}
];

const applyItems=[
{prompt:'Para la actividad destinada al grupo, ¿qué planteamiento sería más sólido?',correct:'activity',options:[['discussion','Realizar una conversación guiada sobre discapacidad y pedir una reflexión individual final.'],['activity','Desarrollar una dinámica cooperativa sobre formas diversas de comunicación: retos con apoyos visuales, cambio de perspectivas, diálogo y acuerdos inclusivos, concretando materiales, espacio y agrupamiento.'],['campaign','Diseñar una campaña de sensibilización elaborada por un pequeño grupo voluntario y exponerla en el centro.'],['story','Leer un cuento sobre inclusión y debatir de forma general su mensaje.']],why:'La pregunta 1 exige una actividad completa, no solo una idea: debe concretar desarrollo, recursos, espacio y agrupamiento.'},
{prompt:'Para fortalecer la relación familia-escuela, ¿qué estrategia responde mejor al caso?',correct:'family',options:[['information','Enviar información frecuente sobre convivencia y accesibilidad y pedir a las familias que consulten dudas cuando sea necesario.'],['association','Canalizar las propuestas de inclusión principalmente a través de la asociación de familias.'],['family','Establecer comunicación bidireccional y participación activa, creando un clima acogedor y complementándolo con formación para familias sobre diversidad e inclusión.'],['home','Proponer actividades inclusivas para realizar en casa y compartir posteriormente sus resultados.']],why:'El Tema 5 plantea comunicación abierta, programas de participación, ambiente acogedor y formación para familias como vías complementarias.'},
{prompt:'¿Qué actuación familiar está mejor concretada para el examen?',correct:'workshop',options:[['meeting','Convocar una reunión general trimestral para explicar las medidas de atención a la diversidad y resolver dudas.'],['materials','Enviar mensualmente recursos sobre discapacidad, comunicación e inclusión para trabajar voluntariamente en casa.'],['volunteer','Invitar a algunas familias a colaborar como voluntarias en actividades de sensibilización del centro.'],['workshop','Organizar un taller participativo de 60 minutos para familias sobre diversidad, barreras de comunicación, análisis de situaciones y estrategias inclusivas, con una fecha y seguimiento posterior.']],why:'Una actuación completa debe incluir finalidad, desarrollo y temporalización concreta.'},
{prompt:'Si eliges la pregunta sobre discriminación, ¿qué debe aparecer necesariamente?',correct:'discrimination',options:[['society','Explicar principalmente los estereotipos sociales asociados a la discapacidad y sus efectos en la convivencia.'],['discrimination','Definir discriminación, aplicar el concepto al caso, explicar la tipología directa e indirecta y relacionar la situación con factores sociales que alimentan prejuicios y exclusión.'],['policy','Describir las medidas inclusivas del centro y proponer un protocolo específico para discapacidad.'],['impact','Analizar sobre todo el impacto emocional, relacional y académico que la exclusión puede provocar en Claudia.']],why:'La pregunta 3 exige definición, tipología y factores sociales, además de aplicar el concepto al caso.'},
{prompt:'Si eliges la pregunta sobre conciencia social, ¿qué estructura sería más completa?',correct:'consciousness',options:[['theory','Explicar con detalle una teoría del desarrollo social y añadir un ejemplo de aplicación.'],['importance','Argumentar por qué la empatía y la convivencia son importantes durante la infancia.'],['consciousness','Explicar la importancia de la conciencia social para empatía, relaciones y participación, desarrollar una teoría del temario y conectarla con la situación de Claudia.'],['citizenship','Centrarse en ciudadanía democrática, derechos y normas de convivencia como marco general.']],why:'La pregunta 4 exige justificar su importancia, explicar una teoría y, en este simulacro, relacionarla con el caso.'},
{prompt:'Si eliges la pregunta sobre el maestro arquitecto, ¿qué respuesta sería más completa?',correct:'teacher',options:[['methods','Enumerar tres metodologías inclusivas y explicar de forma breve cómo podrían aplicarse.'],['role','Describir el papel general del docente en la prevención de la discriminación y añadir ejemplos de aula.'],['teacher','Definir el papel proactivo, flexible y reflexivo del maestro arquitecto, proponer tres metodologías o estrategias aplicables al caso y argumentar cómo favorecen igualdad, participación e inclusión.'],['climate','Describir las características de un clima escolar seguro y accesible para todo el alumnado.']],why:'La pregunta 5 exige papel docente, tres ejemplos y argumentación de su efectividad.'}
];

const commonSurvey=window.COMMON_SURVEY;
const surveyStatements=commonSurvey.statements;

function orderedDiagnosisOptions(){
  const good=diagnosisOptions.filter(o=>o.good),bad=diagnosisOptions.filter(o=>!o.good);
  return [bad[0],good[0],good[1],bad[1],good[2],bad[2],good[3],good[4]].filter(Boolean);
}
function orderedChoices(options,correct,index){
  const right=options.find(([v])=>v===correct);
  const wrong=options.filter(([v])=>v!==correct);
  const positions=[1,2,3,1,3,2];
  const out=[...wrong];out.splice(positions[index%positions.length],0,right);return out;
}
function show(name){
  Object.values(screens).forEach(id=>document.getElementById(id).classList.remove('active'));
  document.getElementById(screens[name]).classList.add('active');
  const steps={case:1,diagnosis:2,theory:3,apply:4,exam:5,survey:6,result:6};
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
 theoryItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="theory-${i}"><option value="">Selecciona el concepto</option>${orderedChoices(item.options,item.correct,i).map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});
}
function renderApply(){
 const grid=document.getElementById('applyGrid');
 applyItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="apply-${i}"><option value="">Selecciona la opción más completa</option>${orderedChoices(item.options,item.correct,i).map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});
}
function renderSurvey(){
 const box=document.getElementById('surveyItems');
 surveyStatements.forEach((s,i)=>{const div=document.createElement('div');div.className='survey-item';div.innerHTML=`<p><strong>${i+1}.</strong> ${s}</p><div class="likert">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="survey-${i}" value="${n}"> ${n}</label>`).join('')}</div>`;box.appendChild(div);});
 document.getElementById('surveyUseful').innerHTML='<option value="">Selecciona una opción</option>'+commonSurvey.usefulOptions.map(o=>`<option>${o}</option>`).join('');
}
renderDiagnosis();renderTheory();renderApply();renderSurvey();

document.querySelectorAll('.choice-question').forEach(cb=>cb.addEventListener('change',()=>{
 const checked=[...document.querySelectorAll('.choice-question:checked')];
 if(checked.length>2){cb.checked=false;feedback(document.getElementById('examFeedback'),'<strong>Debes seleccionar exactamente dos preguntas entre la 3, la 4 y la 5.</strong>','warn');}
}));

document.getElementById('evaluateDiagnosis').addEventListener('click',()=>{
 const chosen=[...document.querySelectorAll('.block-option.selected')].map(x=>x.dataset.id);
 const good=diagnosisOptions.filter(o=>o.good).map(o=>o.id);
 const correct=chosen.filter(id=>good.includes(id)).length;
 const bad=chosen.filter(id=>!good.includes(id)).length;
 state.diagnosisScore=Math.max(0,Math.round((correct/good.length)*20-bad*3));
 feedback(document.getElementById('diagnosisFeedback'),`<strong>${correct===5&&bad===0?'Lectura del supuesto completa.':'Hay elementos que conviene revisar.'}</strong> Has identificado ${correct} de 5 dimensiones relevantes${bad?` y ${bad} distractor(es).`:'.'}<br><br><strong>Clave:</strong> el caso combina discriminación por discapacidad, barreras de participación y comunicación, conciencia social, colaboración familiar y diseño docente inclusivo.<br><button class="primary" id="toTheory">Continuar</button>`,correct>=4&&bad===0?'good':'warn');
 document.getElementById('toTheory').addEventListener('click',()=>show('theory'));
});

document.getElementById('evaluateTheory').addEventListener('click',()=>{
 let correct=0;theoryItems.forEach((item,i)=>{if(document.getElementById(`theory-${i}`).value===item.correct)correct++;});
 state.theoryScore=Math.round((correct/theoryItems.length)*20);
 feedback(document.getElementById('theoryFeedback'),`<strong>${correct===theoryItems.length?'Conexiones teóricas sólidas.':'Revisa algunas relaciones.'}</strong> Has resuelto ${correct} de ${theoryItems.length}.<br><br>Recuerda diferenciar <strong>discriminación directa e indirecta</strong> y distinguir las teorías de conciencia social de las simples medidas organizativas de inclusión.<br><button class="primary" id="toApply">Continuar</button>`,correct>=5?'good':'warn');
 document.getElementById('toApply').addEventListener('click',()=>show('apply'));
});

document.getElementById('evaluateApply').addEventListener('click',()=>{
 let correct=0;const explanations=[];
 applyItems.forEach((item,i)=>{if(document.getElementById(`apply-${i}`).value===item.correct)correct++;explanations.push(`<li>${item.why}</li>`);});
 state.applyScore=Math.round((correct/applyItems.length)*15);
 feedback(document.getElementById('applyFeedback'),`<strong>${correct===applyItems.length?'Decisiones bien fundamentadas.':'Hay alternativas razonables, pero no todas responden con la misma precisión al examen.'}</strong> Has resuelto ${correct} de ${applyItems.length}.<ul>${explanations.join('')}</ul><button class="primary" id="toExam">Ir a la simulación</button>`,correct>=5?'good':'warn');
 document.getElementById('toExam').addEventListener('click',()=>show('exam'));
});

function norm(s){return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
function has(t,terms){return terms.some(x=>t.includes(norm(x)));}
function countGroups(t,groups){return groups.reduce((n,g)=>n+(has(t,g)?1:0),0);}

function scoreQ1(raw){
 const t=norm(raw);let s=0;
 if(has(t,['actividad','dinamica','taller','juego de roles','role playing','debate','proyecto cooperativo','aprendizaje cooperativo']))s+=5;
 if(has(t,['empatia','inclusion','discapacidad auditiva','diversidad','comunicacion','participacion','no discriminacion','igualdad']))s+=5;
 if(has(t,['recursos','materiales','cartulina','tarjetas','cuento','imagenes','pictogramas','pizarra','folios','rotuladores','video','apoyos visuales']))s+=5;
 if(has(t,['aula','biblioteca','patio','salon','gimnasio','espacio']))s+=5;
 if(has(t,['grupos','pequenos grupos','gran grupo','parejas','cooperativo','agrupamiento','equipos','heterogeneos']))s+=5;
 return Math.min(25,s);
}
function scoreQ2(raw){
 const t=norm(raw);let s=0;
 if(has(t,['comunicacion abierta','comunicacion regular','comunicacion bidireccional','participacion familiar','alianza escuela familia','colaboracion familia escuela','ambiente acogedor']))s+=8;
 if(has(t,['confianza','coherencia','corresponsabilidad','prevencion','respeto mutuo','participacion activa','inclusion','accesibilidad']))s+=5;
 if(has(t,['taller','escuela de familias','escuela para padres','encuentro con familias','sesion formativa','actividad con familias','formacion para familias']))s+=7;
 if(has(t,['semanal','quincenal','mensual','trimestral','primera semana','60 minutos','una hora','temporalizacion','durante el trimestre','una vez al mes','seguimiento']))s+=5;
 return Math.min(25,s);
}
function scoreQ3(raw){
 const t=norm(raw);let s=0;
 if(has(t,['si','discriminacion por discapacidad','discriminacion por su discapacidad','discapacidad auditiva','exclusion','comentarios','rechazo']))s+=6;
 if(has(t,['trato diferencial','trato desigual','caracteristica','discapacidad','afecta negativamente','oportunidades educativas','experiencias educativas','exclusion','rechazo','marginacion','acoso']))s+=7;
 if(has(t,['discriminacion directa'])&&has(t,['discriminacion indirecta']))s+=6;
 const social=countGroups(t,[['prejuicio','prejuicios'],['estereotipo','estereotipos'],['capacitismo','capacitista'],['medios','redes sociales'],['familia','entorno familiar'],['falta de contacto','falta de exposicion','desconocimiento'],['normas sociales','creencias sociales','cultura']]);
 if(social>=2)s+=6; else if(social===1)s+=3;
 return Math.min(25,s);
}
function scoreQ4(raw){
 const t=norm(raw);let s=0;
 const imp=countGroups(t,[['empatia'],['relaciones','vinculos'],['convivencia'],['participacion','ciudadania'],['comportamiento prosocial','prosocial'],['comprender a los demas','perspectivas'],['aceptacion de las diferencias','diversidad']]);
 if(imp>=3)s+=8; else if(imp>=2)s+=5; else if(imp===1)s+=3;
 if(has(t,['conciencia social','comprender y responder a problemas sociales','responsabilidades y roles','como nuestras acciones afectan a los demas']))s+=5;
 if(has(t,['teoria de la mente','goleman','inteligencia social','freire','conciencia critica','ciudadania democratica','mestre']))s+=8;
 if(has(t,['claudia','discapacidad auditiva','caso','aula','juego de roles','debate','proyecto','cooperacion','discusion','ejemplo','aplicacion']))s+=4;
 return Math.min(25,s);
}
function scoreQ5(raw){
 const t=norm(raw);let s=0;
 if(has(t,['arquitecto del aprendizaje','disenar ambientes','experiencias de aprendizaje','metodologias adecuadas','adaptar al contexto','aprendizaje significativo','aprendizaje critico','ambientes inclusivos']))s+=8;
 if(has(t,['reflexion','reflexionar','prejuicios propios','sesgos','actitud proactiva','observacion','autoobservacion','formacion continua','flexible','creativa']))s+=5;
 const methods=countGroups(t,[['aprendizaje basado en proyectos','abp'],['aprendizaje cooperativo','cooperacion'],['mediacion'],['educacion emocional','aprendizaje emocional'],['juego de roles','role playing'],['aprendizaje servicio','aps'],['realidad virtual','rv'],['debate','dialogo'],['comite de inclusion','comites de inclusion'],['recursos visuales','apoyos visuales','multimedia']]);
 s+=Math.min(9,methods*3);
 if(has(t,['efectiva','efectividad','favorece la empatia','favorece la inclusion','participacion','pensamiento critico','igualdad','convivencia','reduce prejuicios','previene discriminacion','elimina barreras','accesibilidad']))s+=3;
 return Math.min(25,s);
}

document.getElementById('evaluateExam').addEventListener('click',()=>{
 const selected=[...document.querySelectorAll('.choice-question:checked')].map(x=>x.value);
 if(selected.length!==2){feedback(document.getElementById('examFeedback'),'<strong>Selecciona exactamente dos preguntas entre la 3, la 4 y la 5.</strong>','warn');return;}
 const q1=scoreQ1(document.getElementById('q1').value);
 const q2=scoreQ2(document.getElementById('q2').value);
 const scores={q3:scoreQ3(document.getElementById('q3').value),q4:scoreQ4(document.getElementById('q4').value),q5:scoreQ5(document.getElementById('q5').value)};
 const missing=[['q1',document.getElementById('q1').value],['q2',document.getElementById('q2').value],...selected.map(id=>[id,document.getElementById(id).value])].filter(([,v])=>!v.trim());
 if(missing.length){feedback(document.getElementById('examFeedback'),'<strong>Completa las cuatro respuestas que forman tu examen antes de corregirlo.</strong>','warn');return;}
 const exam=q1+q2+selected.reduce((n,id)=>n+scores[id],0);
 state.examRubric=exam;state.openScore=Math.round(exam*.45);state.examBreakdown={q1,q2,...scores,selected};
 const grade=(exam/10).toFixed(1).replace('.',',');
 feedback(document.getElementById('examFeedback'),`<strong>Calificación orientativa del examen: ${grade}/10.</strong><div class="breakdown"><div>Pregunta 1: ${(q1/10).toFixed(2).replace('.',',')}/2,5</div><div>Pregunta 2: ${(q2/10).toFixed(2).replace('.',',')}/2,5</div>${selected.map(id=>`<div>Pregunta ${id.slice(1)}: ${(scores[id]/10).toFixed(2).replace('.',',')}/2,5</div>`).join('')}</div><p>${exam===100?'La resolución contiene todos los componentes esenciales que exige este simulacro.':'La corrección es orientativa. Revisa especialmente las preguntas con menor puntuación y comprueba que respondes a todos los verbos del enunciado: proponer, describir, argumentar, definir, explicar, relacionar y ejemplificar.'}</p><p><strong>Recuerda:</strong> el modelo está planteado para responderse en un máximo de 3 caras.</p><button class="primary" id="toSurvey">Continuar</button>`,exam>=75?'good':'warn');
 document.getElementById('toSurvey').addEventListener('click',()=>show('survey'));
});

document.getElementById('finishSurvey').addEventListener('click',()=>{
 const responses=surveyStatements.map((_,i)=>document.querySelector(`input[name="survey-${i}"]:checked`)?.value||'');
 if(responses.some(v=>!v)){feedback(document.getElementById('surveyFeedback'),'<strong>Completa las 10 valoraciones antes de finalizar.</strong>','warn');return;}
 state.survey={responses,best:document.getElementById('surveyBest').value.trim(),improve:document.getElementById('surveyImprove').value.trim(),useful:document.getElementById('surveyUseful').value};
 const total=Math.min(100,state.diagnosisScore+state.theoryScore+state.applyScore+state.openScore);
 const grade=(state.examRubric/10).toFixed(1).replace('.',',');
 document.getElementById('finalScore').textContent=total;
 document.getElementById('resultText').innerHTML=`<p><strong>Puntuación global de preparación: ${total}/100.</strong></p><div class="breakdown"><div>Lectura del supuesto: ${state.diagnosisScore}/20</div><div>Conexión con el temario: ${state.theoryScore}/20</div><div>Toma de decisiones: ${state.applyScore}/15</div><div>Simulación escrita: ${state.openScore}/45</div></div><p><strong>Calificación orientativa de la simulación de examen: ${grade}/10.</strong></p>`;
 localStorage.setItem('eaweb-examen-plan-2016-02',JSON.stringify({session:'examen-plan-2016-02',topic:'plan-2016-examen',score:total,state,completedAt:new Date().toISOString()}));
 show('result');
});

document.getElementById('restart').addEventListener('click',()=>{localStorage.removeItem('eaweb-examen-plan-2016-02');location.reload();});