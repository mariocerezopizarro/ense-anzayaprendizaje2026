const screens={case:'screen-case',diagnosis:'screen-diagnosis',theory:'screen-theory',apply:'screen-apply',open:'screen-open',survey:'screen-survey',result:'screen-result'};
const state={diagnosisScore:0,theoryScore:0,applyScore:0,openScore:0,openBreakdown:{},survey:{}};

const diagnosisOptions=[
{id:'communication',title:'Comunicación inefectiva',text:'Las interacciones no favorecen una expresión y escucha adecuadas.',good:true},
{id:'empathy',title:'Falta de empatía',text:'Existe dificultad para comprender emociones y perspectivas ajenas.',good:true},
{id:'collaboration',title:'Problemas de colaboración',text:'Las dificultades interpersonales repercuten en el trabajo conjunto.',good:true},
{id:'relationships',title:'Relaciones poco armoniosas',text:'El clima relacional del aula necesita mejorar.',good:true},
{id:'perspective',title:'Dificultad para tomar perspectiva',text:'Comprender pensamientos y sentimientos diferentes es una necesidad implícita en el caso.',good:true},
{id:'academic',title:'Bajo rendimiento académico generalizado',text:'El problema central es una caída significativa de las calificaciones.',good:false},
{id:'devices',title:'Falta de tecnología',text:'La causa principal es la ausencia de dispositivos digitales en el aula.',good:false},
{id:'competition',title:'Poca competitividad entre estudiantes',text:'La solución pasa por aumentar la rivalidad individual para mejorar las relaciones.',good:false}
];

const theoryItems=[
{prompt:'Un estudiante comprende que un compañero puede pensar y sentir de manera diferente ante la misma situación.',correct:'mind',options:[['mind','Teoría de la Mente: comprender pensamientos, sentimientos y perspectivas diferentes.'],['social','Inteligencia social: capacidad general de relación.'],['critical','Conciencia crítica: análisis de estructuras sociales.'],['citizenship','Ciudadanía democrática: derechos y convivencia.']]},
{prompt:'El alumnado reconoce emociones propias y ajenas y aprende a cooperar, negociar y resolver conflictos.',correct:'social',options:[['social','Inteligencia social de Goleman: conciencia social y habilidad para la relación.'],['mind','Teoría de la Mente únicamente.'],['critical','Conciencia crítica de Freire.'],['citizenship','Educación para la ciudadanía democrática.']]},
{prompt:'El aula trabaja la capacidad de comprender cómo las propias acciones afectan a los demás y de responder constructivamente a problemas sociales.',correct:'awareness',options:[['awareness','Conciencia social: comprensión, empatía, responsabilidad y participación constructiva.'],['mind','Teoría de la Mente como único proceso.'],['critical','Educación bancaria.'],['competition','Competencia interpersonal.']]},
{prompt:'Un grupo analiza situaciones de desigualdad, dialoga sobre sus experiencias y cuestiona supuestos sociales.',correct:'critical',options:[['critical','Conciencia crítica de Freire: diálogo y análisis crítico de experiencias e ideas.'],['social','Inteligencia social de Goleman.'],['mind','Teoría de la Mente.'],['attachment','Apego seguro.']]},
{prompt:'Los compañeros aprenden a considerar perspectivas distintas, negociar acuerdos y resolver conflictos a través de sus interacciones.',correct:'peers',options:[['peers','Interacciones entre iguales como contexto de desarrollo de conciencia social y habilidades sociales.'],['individual','Aprendizaje estrictamente individual.'],['punishment','Control conductual mediante sanciones.'],['avoid','Evitación de conflictos.']]}
];

const applyItems=[
{prompt:'Para practicar empatía y toma de perspectiva...',correct:'roles',options:[['roles','Representar conflictos o situaciones emocionales mediante juegos de roles y discutir después cómo se sintió cada personaje.'],['memorize','Memorizar definiciones de empatía sin interacción.'],['avoid','Evitar hablar de emociones para no generar conflicto.'],['rank','Comparar públicamente quién es más empático.']],why:'Los juegos de roles permiten comprender perspectivas y emociones ajenas y se relacionan directamente con la Teoría de la Mente y la conciencia social.'},
{prompt:'Para mejorar expresión emocional y comprensión mutua...',correct:'dialogue',options:[['dialogue','Crear círculos de diálogo periódicos con escucha activa, turnos de palabra y respeto.'],['lecture','Sustituir el diálogo por una explicación magistral sobre convivencia.'],['silence','Reducir las conversaciones entre iguales.'],['report','Hablar de relaciones solo cuando aparece un problema grave.']],why:'Las discusiones sobre emociones y relaciones ayudan a comprender emociones propias y ajenas y a desarrollar empatía.'},
{prompt:'Para desarrollar cooperación y habilidades para la relación...',correct:'cooperative',options:[['cooperative','Diseñar tareas cooperativas con objetivo común, coordinación, apoyo mutuo y responsabilidad compartida.'],['parallel','Hacer la misma tarea individualmente sin interacción.'],['competition','Usar una clasificación competitiva permanente.'],['delegate','Dejar que una sola persona resuelva la tarea del grupo.']],why:'Goleman vincula la inteligencia social con cooperar, negociar y resolver conflictos; los proyectos grupales ofrecen un contexto real para practicar estas habilidades.'},
{prompt:'Para enseñar conductas comunicativas adecuadas...',correct:'model',options:[['model','El docente modela escucha empática, respeto, comunicación asertiva y formas constructivas de responder al conflicto.'],['rules','Limitarse a entregar una lista escrita de normas.'],['punish','Aplicar castigos sin explicar alternativas.'],['ignore','No intervenir para que el alumnado aprenda solo.']],why:'El modelado convierte conductas sociales abstractas en ejemplos observables y coherentes con la interacción cotidiana del aula.'},
{prompt:'Para consolidar cambios en las relaciones...',correct:'reflect',options:[['reflect','Combinar retroalimentación guiada con auto-reflexión sobre fortalezas, dificultades y objetivos de mejora.'],['grade','Poner una nota final sin comentarios.'],['label','Etiquetar a cada estudiante según su habilidad social.'],['repeat','Repetir la actividad sin analizar lo ocurrido.']],why:'La retroalimentación constructiva y la auto-reflexión ayudan a reconocer avances, identificar áreas de crecimiento y orientar cambios de conducta.'},
{prompt:'Ante un conflicto entre compañeros...',correct:'resolve',options:[['resolve','Guiar una negociación donde expresen emociones, escuchen perspectivas, busquen acuerdos y revisen después el proceso.'],['separate','Separarlos siempre para evitar cualquier interacción futura.'],['decide','Resolver el adulto el conflicto sin escuchar a las partes.'],['winner','Determinar quién gana y quién pierde.']],why:'El Tema 2 considera la resolución de conflictos y la negociación habilidades esenciales para la conciencia social y las relaciones entre iguales.'}
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
 diagnosisOptions.forEach(o=>{
  const btn=document.createElement('button');btn.className='block-option';btn.dataset.id=o.id;
  btn.innerHTML=`<strong>${o.title}</strong><span>${o.text}</span>`;
  btn.addEventListener('click',()=>btn.classList.toggle('selected'));
  grid.appendChild(btn);
 });
}

function renderTheory(){
 const grid=document.getElementById('theoryGrid');
 theoryItems.forEach((item,i)=>{
  const card=document.createElement('div');card.className='match-card';
  card.innerHTML=`<strong>${item.prompt}</strong><select id="theory-${i}"><option value="">Selecciona el concepto</option>${item.options.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;
  grid.appendChild(card);
 });
}

function renderApply(){
 const grid=document.getElementById('applyGrid');
 applyItems.forEach((item,i)=>{
  const card=document.createElement('div');card.className='match-card';
  card.innerHTML=`<strong>${item.prompt}</strong><select id="apply-${i}"><option value="">Selecciona la actuación más adecuada</option>${item.options.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;
  grid.appendChild(card);
 });
}

function renderSurvey(){
 const box=document.getElementById('surveyItems');
 surveyStatements.forEach((s,i)=>{
  const div=document.createElement('div');div.className='survey-item';
  div.innerHTML=`<p><strong>${i+1}.</strong> ${s}</p><div class="likert">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="survey-${i}" value="${n}"> ${n}</label>`).join('')}</div>`;
  box.appendChild(div);
 });
 document.getElementById('surveyUseful').innerHTML='<option value="">Selecciona una opción</option>'+commonSurvey.usefulOptions.map(o=>`<option>${o}</option>`).join('');
}

renderDiagnosis();renderTheory();renderApply();renderSurvey();

document.getElementById('evaluateDiagnosis').addEventListener('click',()=>{
 const chosen=[...document.querySelectorAll('.block-option.selected')].map(x=>x.dataset.id);
 const good=diagnosisOptions.filter(o=>o.good).map(o=>o.id);
 const correct=chosen.filter(id=>good.includes(id)).length;
 const bad=chosen.filter(id=>!good.includes(id)).length;
 state.diagnosisScore=Math.max(0,Math.round((correct/good.length)*20-bad*3));
 const missing=diagnosisOptions.filter(o=>o.good&&!chosen.includes(o.id)).map(o=>o.title);
 feedback(document.getElementById('diagnosisFeedback'),`<strong>${correct===5&&bad===0?'Diagnóstico preciso.':'Revisa el diagnóstico.'}</strong> Has identificado ${correct} de 5 necesidades relevantes${bad?` y has seleccionado ${bad} distractor(es).`:'.'}${missing.length?`<br><br>Faltaría considerar: ${missing.join(', ')}.`:''}<br><br><strong>Clave del Tema 2:</strong> la conciencia social influye directamente en cómo el alumnado interactúa, colabora y se comunica; comprender emociones y perspectivas diferentes es una base de las relaciones socioafectivas positivas.<br><button class="primary" id="toTheory">Continuar</button>`,correct>=4&&bad===0?'good':'warn');
 document.getElementById('toTheory').addEventListener('click',()=>show('theory'));
});

document.getElementById('evaluateTheory').addEventListener('click',()=>{
 let correct=0;theoryItems.forEach((item,i)=>{if(document.getElementById(`theory-${i}`).value===item.correct)correct++;});
 state.theoryScore=Math.round((correct/theoryItems.length)*20);
 feedback(document.getElementById('theoryFeedback'),`<strong>${correct===5?'Excelente conexión teórica.':'Hay conceptos que conviene revisar.'}</strong> Has identificado correctamente ${correct} de 5 relaciones.<br><br><strong>Mapa conceptual del Tema 2:</strong> la conciencia social implica comprender y responder a los demás; la Teoría de la Mente permite reconocer pensamientos y sentimientos diferentes de los propios; Goleman distingue conciencia social y habilidad para la relación; Freire incorpora el diálogo y la reflexión crítica; y las interacciones entre iguales son un contexto esencial para aprender a considerar perspectivas, negociar y resolver conflictos.<br><button class="primary" id="toApply">Continuar</button>`,correct>=4?'good':'warn');
 document.getElementById('toApply').addEventListener('click',()=>show('apply'));
});

document.getElementById('evaluateApply').addEventListener('click',()=>{
 let correct=0;const explanations=[];
 applyItems.forEach((item,i)=>{if(document.getElementById(`apply-${i}`).value===item.correct)correct++;explanations.push(`<li>${item.why}</li>`);});
 state.applyScore=Math.round((correct/applyItems.length)*15);
 feedback(document.getElementById('applyFeedback'),`<strong>${correct===applyItems.length?'Intervención muy coherente.':'Revisa algunas decisiones.'}</strong> Has resuelto correctamente ${correct} de ${applyItems.length} situaciones.<ul>${explanations.join('')}</ul><p>Una intervención sólida combina experiencias prácticas, diálogo, cooperación y reflexión; no basta con explicar verbalmente qué es la empatía.</p><button class="primary" id="toOpen">Continuar</button>`,correct>=5?'good':'warn');
 document.getElementById('toOpen').addEventListener('click',()=>show('open'));
});

function includesAny(text,terms){return terms.some(t=>text.includes(t));}
function scoreGroup(text,groups,max){let score=0;groups.forEach(g=>{if(includesAny(text,g.terms))score+=g.points;});return Math.min(max,score);}

document.getElementById('evaluateOpen').addEventListener('click',()=>{
 const raw=document.getElementById('openAnswer').value.trim();const text=raw.toLowerCase();const notes=[];
 const awareness=scoreGroup(text,[
  {terms:['conciencia social'],points:6},
  {terms:['empatía','empatia','comprender emociones','comprensión de emociones','comprension de emociones'],points:7},
  {terms:['perspectiva','punto de vista','afectar a los demás','afectar a los demas','comportamiento prosocial'],points:7}
 ],20);
 const theory=scoreGroup(text,[
  {terms:['teoría de la mente','teoria de la mente'],points:8},
  {terms:['pensamientos','sentimientos','perspectivas diferentes'],points:4},
  {terms:['goleman','inteligencia social'],points:4},
  {terms:['conciencia social','habilidad para la relación','habilidad para la relacion'],points:4}
 ],20);
 const strategies=scoreGroup(text,[
  {terms:['juego de rol','juegos de rol','role play','role-play'],points:5},
  {terms:['círculo de diálogo','circulo de dialogo','círculos de diálogo','circulos de dialogo','debate','discusión','discusion'],points:5},
  {terms:['actividad cooperativa','actividades cooperativas','aprendizaje cooperativo','proyecto de grupo','trabajo cooperativo'],points:5},
  {terms:['escucha activa','expresión emocional','expresion emocional'],points:3},
  {terms:['reflexión posterior','reflexion posterior','discutir después','discutir despues'],points:3},
  {terms:['objetivo común','objetivo comun','apoyo mutuo','coordinación','coordinacion'],points:4}
 ],25);
 const conflict=scoreGroup(text,[
  {terms:['resolución de conflictos','resolucion de conflictos'],points:6},
  {terms:['negociación','negociacion','acuerdo','acuerdos'],points:5},
  {terms:['colaboración','colaboracion','cooperación','cooperacion'],points:4}
 ],15);
 const reflection=scoreGroup(text,[
  {terms:['modelado','modelo docente','docente modela','observación de modelos','observacion de modelos'],points:4},
  {terms:['retroalimentación','retroalimentacion','feedback','refuerzo positivo'],points:3},
  {terms:['auto-reflexión','autorreflexión','auto reflexión','autoreflection','fortalezas','áreas de mejora','areas de mejora'],points:3}
 ],10);
 const coherence=scoreGroup(text,[
  {terms:['porque','por tanto','de este modo','así','asi','fundamenta','relaciona'],points:3},
  {terms:['relaciones socioafectivas','relación socioafectiva','relacion socioafectiva','relaciones positivas'],points:3},
  {terms:['interacciones entre iguales','entre iguales','compañeros','companeros'],points:2},
  {terms:['ambiente de aprendizaje','aula','clima'],points:2}
 ],10);
 state.openBreakdown={awareness,theory,strategies,conflict,reflection,coherence};
 const rawOpen=Object.values(state.openBreakdown).reduce((a,b)=>a+b,0);
 state.openScore=Math.round((rawOpen/100)*45);
 if(awareness<14)notes.push('Explica mejor la conciencia social: empatía, comprensión de perspectivas y reflexión sobre cómo las propias acciones afectan a los demás.');
 if(theory<14)notes.push('Conecta explícitamente la intervención con la Teoría de la Mente y con la inteligencia social de Goleman, no solo con la palabra “empatía”.');
 if(strategies<18)notes.push('Concreta varias estrategias: juegos de roles con reflexión posterior, círculos de diálogo o discusiones estructuradas y actividades cooperativas con objetivo común.');
 if(conflict<10)notes.push('Incluye cómo se practicarán negociación, resolución de conflictos, cooperación y acuerdos entre iguales.');
 if(reflection<7)notes.push('Añade modelado docente, retroalimentación guiada y auto-reflexión para consolidar los aprendizajes socioemocionales.');
 if(coherence<7)notes.push('Justifica por qué cada estrategia desarrolla las habilidades señaladas en el Tema 2 y cómo contribuirá a relaciones más positivas.');
 if(raw.length<650)notes.push('Desarrolla más la respuesta: se espera explicar la aplicación y el fundamento de las estrategias, no limitarse a enumerarlas.');
 const totalPreview=state.diagnosisScore+state.theoryScore+state.applyScore+state.openScore;
 feedback(document.getElementById('openFeedback'),`<strong>Revisión formativa de la propuesta:</strong><div class="breakdown"><div>Conciencia social y empatía: ${awareness}/20</div><div>Teoría de la Mente e inteligencia social: ${theory}/20</div><div>Estrategias socioeducativas: ${strategies}/25</div><div>Cooperación y conflictos: ${conflict}/15</div><div>Modelado, feedback y auto-reflexión: ${reflection}/10</div><div>Coherencia teoría-práctica: ${coherence}/10</div></div>${notes.length?'<ul>'+notes.map(n=>`<li>${n}</li>`).join('')+'</ul>':'La propuesta integra de forma equilibrada la teoría del Tema 2 con estrategias concretas de comunicación, empatía y colaboración.'}<p class="muted">Puntuación provisional global: ${totalPreview}/100. La revisión es automática y orientativa: detecta conceptos y conexiones explícitas, pero no sustituye la valoración docente del significado global de la respuesta.</p><button class="primary" id="toSurvey">Continuar al cuestionario final</button>`,rawOpen>=70?'good':'warn');
 document.getElementById('toSurvey').addEventListener('click',()=>show('survey'));
});

document.getElementById('finishSurvey').addEventListener('click',()=>{
 const likert=[];let complete=true;
 surveyStatements.forEach((_,i)=>{const checked=document.querySelector(`input[name="survey-${i}"]:checked`);if(!checked)complete=false;likert.push(checked?Number(checked.value):null);});
 if(!complete){feedback(document.getElementById('surveyFeedback'),'<strong>Falta completar el cuestionario.</strong> Responde a todos los ítems antes de finalizar.','warn');return;}
 state.survey={session:'sesion-03',instrumentVersion:commonSurvey.version,likert,best:document.getElementById('surveyBest').value.trim(),improve:document.getElementById('surveyImprove').value.trim(),useful:document.getElementById('surveyUseful').value,timestamp:new Date().toISOString()};
 const total=state.diagnosisScore+state.theoryScore+state.applyScore+state.openScore;
 const record={session:'sesion-03',topic:'tema-02',score:total,components:{diagnosis:state.diagnosisScore,theory:state.theoryScore,application:state.applyScore,open:state.openScore},openBreakdown:state.openBreakdown,openAnswer:document.getElementById('openAnswer').value.trim(),survey:state.survey};
 localStorage.setItem('eaweb-sesion-03',JSON.stringify(record));
 document.getElementById('finalScore').textContent=total;
 document.getElementById('resultText').innerHTML=`<p><strong>Has completado la Sesión 3.</strong> El resultado combina diagnóstico, comprensión del Tema 2, decisiones de intervención y resolución abierta del caso.</p><div class="breakdown"><div>Diagnóstico: ${state.diagnosisScore}/20</div><div>Teoría en acción: ${state.theoryScore}/20</div><div>Aplicación: ${state.applyScore}/15</div><div>Resolución abierta: ${state.openScore}/45</div></div><p>La finalidad es aprender a convertir conceptos como conciencia social, Teoría de la Mente e inteligencia social en actuaciones concretas que mejoren las relaciones entre iguales.</p>`;
 show('result');
});

document.getElementById('restart').addEventListener('click',()=>location.reload());