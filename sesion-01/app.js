const screens={case:'screen-case',diagnosis:'screen-diagnosis',order:'screen-order',match:'screen-match',open:'screen-open',survey:'screen-survey',result:'screen-result'};
const state={diagnosisScore:0,orderScore:0,matchScore:0,openScore:0,openBreakdown:{},survey:{}};

const diagnosisOptions=[
{id:'infra',title:'Mejorar infraestructura y conectividad',text:'Asegurar pizarras digitales, tabletas u otros dispositivos y conexión a internet.',good:true},
{id:'digital',title:'Desarrollar competencias digitales',text:'Trabajar alfabetización informacional, pensamiento computacional y manejo de herramientas tecnológicas.',good:true},
{id:'training',title:'Formación docente continua',text:'Capacitar al profesorado en tecnología educativa y metodologías didácticas actuales.',good:true},
{id:'innovation',title:'Cultura de innovación',text:'Favorecer apertura al cambio, nuevas estrategias y adaptación del currículo.',good:true},
{id:'active',title:'Metodologías activas',text:'Incorporar ABP, aprendizaje cooperativo y propuestas de aprender haciendo.',good:true},
{id:'assessment',title:'Evaluación competencial',text:'Utilizar proyectos, rúbricas, portafolios y evidencias de desempeño.',good:true},
{id:'pdf',title:'Digitalizar sin cambiar la metodología',text:'Sustituir los libros de texto por PDF en tabletas manteniendo exactamente las mismas tareas.',good:false},
{id:'equipment',title:'Comprar tecnología como único cambio',text:'Centrar toda la transformación en adquirir dispositivos sin modificar metodología ni formación.',good:false}
];

let orderItems=[
{id:'train',label:'Formar y acompañar al profesorado en tecnología educativa y metodologías actuales.'},
{id:'diagnose',label:'Analizar las necesidades del centro, del alumnado y la situación de partida.'},
{id:'implement',label:'Diseñar e implementar actividades activas, interdisciplinarias y apoyadas en tecnología.'},
{id:'resources',label:'Planificar recursos, conectividad e infraestructura coherentes con los objetivos educativos.'},
{id:'evaluate',label:'Evaluar el impacto de los cambios y ajustar el plan de innovación.'}
];
const idealOrder=['diagnose','resources','train','implement','evaluate'];

const matchItems=[
{prompt:'Pensamiento crítico y alfabetización informacional',correct:'research',options:[['research','Investigar un problema real, contrastar fuentes y justificar conclusiones.'],['slides','Copiar información de internet en una presentación.'],['drill','Completar ejercicios repetitivos en una aplicación.'],['video','Ver un vídeo y responder preguntas literales.']]},
{prompt:'Creatividad y competencia digital',correct:'create',options:[['create','Diseñar un producto digital, prototipo o recurso multimedia para resolver una necesidad.'],['notes','Tomar apuntes digitales del libro de texto.'],['quiz','Responder un test autocorregible.'],['scan','Escanear una ficha ya realizada en papel.']]},
{prompt:'Colaboración y comunicación efectiva',correct:'team',options:[['team','Desarrollar un proyecto cooperativo con reparto de roles y presentación pública de resultados.'],['solo','Realizar individualmente la misma tarea y comparar notas al final.'],['copy','Compartir un documento para copiar una respuesta común.'],['listen','Escuchar una explicación sin interacción entre iguales.']]},
{prompt:'Evaluación competencial',correct:'portfolio',options:[['portfolio','Valorar proceso y desempeño mediante proyecto, rúbrica y portafolio de evidencias.'],['exam','Utilizar únicamente un examen memorístico final.'],['attendance','Calificar principalmente la asistencia.'],['speed','Puntuar solo la rapidez con la que se termina la tarea.']]}
];

const commonSurvey=window.COMMON_SURVEY;
const surveyStatements=commonSurvey.statements;

function show(name){
 Object.values(screens).forEach(id=>document.getElementById(id).classList.remove('active'));
 document.getElementById(screens[name]).classList.add('active');
 const steps={case:1,diagnosis:2,order:3,match:4,open:5,survey:6,result:6};
 const step=steps[name];
 document.getElementById('progressLabel').textContent=name==='result'?'Actividad completada':`Paso ${step} de 6`;
 document.getElementById('progressBar').style.width=`${name==='result'?100:(step/6)*100}%`;
 window.scrollTo({top:0,behavior:'smooth'});
}

document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.next)));
document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.back)));

function feedback(el,html,type='good'){el.className=`feedback ${type}`;el.innerHTML=html;}

function renderDiagnosis(){
 const grid=document.getElementById('diagnosisGrid');grid.innerHTML='';
 diagnosisOptions.forEach(o=>{
  const btn=document.createElement('button');btn.className='block-option';btn.dataset.id=o.id;
  btn.innerHTML=`<strong>${o.title}</strong><span>${o.text}</span>`;
  btn.addEventListener('click',()=>btn.classList.toggle('selected'));
  grid.appendChild(btn);
 });
}

function renderOrder(){
 const list=document.getElementById('orderList');list.innerHTML='';
 orderItems.forEach((item,index)=>{
  const li=document.createElement('li');li.className='order-item';
  li.innerHTML=`<span>${index+1}. ${item.label}</span><div class="order-controls"><button aria-label="Subir">↑</button><button aria-label="Bajar">↓</button></div>`;
  const [up,down]=li.querySelectorAll('button');
  up.addEventListener('click',()=>move(index,-1));down.addEventListener('click',()=>move(index,1));list.appendChild(li);
 });
}
function move(index,delta){const target=index+delta;if(target<0||target>=orderItems.length)return;[orderItems[index],orderItems[target]]=[orderItems[target],orderItems[index]];renderOrder();}

function renderMatch(){
 const grid=document.getElementById('matchGrid');grid.innerHTML='';
 matchItems.forEach((item,i)=>{
  const card=document.createElement('div');card.className='match-card';
  card.innerHTML=`<strong>${item.prompt}</strong><select id="match-${i}"><option value="">Selecciona la práctica más adecuada</option>${item.options.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;
  grid.appendChild(card);
 });
}

function renderSurvey(){
 const box=document.getElementById('surveyItems');box.innerHTML='';
 surveyStatements.forEach((s,i)=>{
  const div=document.createElement('div');div.className='survey-item';
  div.innerHTML=`<p><strong>${i+1}.</strong> ${s}</p><div class="likert">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="survey-${i}" value="${n}"> ${n}</label>`).join('')}</div>`;
  box.appendChild(div);
 });
 const useful=document.getElementById('surveyUseful');
 useful.innerHTML='<option value="">Selecciona una opción</option>'+commonSurvey.usefulOptions.map(option=>`<option>${option}</option>`).join('');
}

document.getElementById('evaluateDiagnosis').addEventListener('click',()=>{
 const chosen=[...document.querySelectorAll('.block-option.selected')].map(x=>x.dataset.id);
 const good=diagnosisOptions.filter(o=>o.good).map(o=>o.id);
 const goodChosen=chosen.filter(id=>good.includes(id)).length;
 const badChosen=chosen.filter(id=>!good.includes(id)).length;
 state.diagnosisScore=Math.max(0,Math.round((goodChosen/good.length)*20-badChosen*3));
 const missing=diagnosisOptions.filter(o=>o.good&&!chosen.includes(o.id)).map(o=>o.title);
 const el=document.getElementById('diagnosisFeedback');
 const html=`<strong>${goodChosen>=5&&badChosen===0?'Diagnóstico sólido.':'Revisa el diagnóstico.'}</strong> Has identificado ${goodChosen} de 6 líneas relevantes${badChosen?` y has seleccionado ${badChosen} medida(s) que digitalizan sin transformar realmente el aprendizaje.`:'.'}${missing.length?`<br><br>Conviene considerar también: ${missing.join(', ')}.`:''}<br><button class="primary" id="toOrder">Continuar</button>`;
 feedback(el,html,goodChosen>=5&&badChosen===0?'good':'warn');
 document.getElementById('toOrder').addEventListener('click',()=>show('order'));
});

document.getElementById('evaluateOrder').addEventListener('click',()=>{
 let matches=0;orderItems.forEach((x,i)=>{if(x.id===idealOrder[i])matches++;});
 state.orderScore=Math.round((matches/idealOrder.length)*15);
 const el=document.getElementById('orderFeedback');
 const ok=matches>=4;
 feedback(el,`<strong>${ok?'Secuencia coherente.':'La secuencia puede mejorarse.'}</strong> Has situado ${matches} de 5 pasos en la posición de referencia. Una lógica posible es: diagnosticar → planificar recursos → formar al profesorado → implementar cambios → evaluar y ajustar.<br><button class="primary" id="toMatch">Continuar</button>`,ok?'good':'warn');
 document.getElementById('toMatch').addEventListener('click',()=>show('match'));
});

document.getElementById('evaluateMatch').addEventListener('click',()=>{
 let correct=0;matchItems.forEach((item,i)=>{if(document.getElementById(`match-${i}`).value===item.correct)correct++;});
 state.matchScore=Math.round((correct/matchItems.length)*20);
 const el=document.getElementById('matchFeedback');
 feedback(el,`<strong>${correct===4?'Muy buena aplicación.':'Revisa algunas relaciones.'}</strong> Has conectado correctamente ${correct} de 4 objetivos con prácticas de aprendizaje coherentes. La clave es que la tecnología y la evaluación estén al servicio de creación, colaboración, pensamiento crítico y desempeño auténtico.<br><button class="primary" id="toOpen">Continuar</button>`,correct>=3?'good':'warn');
 document.getElementById('toOpen').addEventListener('click',()=>show('open'));
});

function includesAny(text,terms){return terms.some(t=>text.includes(t));}
function countActivitySignals(text){
 const signals=['actividad','proyecto','reto','taller','robótica','robotica','programación','programacion','impresión 3d','impresion 3d','diseño','investig','crear','prototipo','presentación','presentacion','portfolio','portafolio','google classroom','classroom','padlet','canva','genially','kahoot','edpuzzle','powtoon','muro virtual','infografía','infografia','cartel','vídeo interactivo','video interactivo','vídeo animado','video animado','cuestionario interactivo','encuesta interactiva'];
 return signals.filter(s=>text.includes(s)).length;
}

document.getElementById('evaluateOpen').addEventListener('click',()=>{
 const raw=document.getElementById('openAnswer').value.trim();const text=raw.toLowerCase();
 let tech=0,methods=0,skills=0,activities=0,assessment=0;const notes=[];

 if(includesAny(text,['pizarra digital','tableta','dispositivo','conectividad','internet','infraestructura'])) tech+=7;
 if(includesAny(text,['alfabetización informacional','alfabetizacion informacional','pensamiento computacional','competencia digital','habilidades digitales'])) tech+=5;
 if(includesAny(text,['formación docente','formacion docente','capacitación','capacitacion','formación continua','formacion continua'])) tech+=4;
 if(includesAny(text,['cultura de innovación','cultura de innovacion','apertura al cambio','innovación','innovacion','adaptar el currículo','adaptar el curriculo'])) tech+=4;
 if(tech<14) notes.push('Profundiza en infraestructura, competencias digitales, formación docente y cultura de innovación.');

 if(includesAny(text,['aprendizaje basado en proyectos','abp','aprendizaje cooperativo','metodologías activas','metodologias activas','aprender haciendo'])) methods+=12;
 if(includesAny(text,['interdisciplin','diferentes áreas','diferentes areas','integrar áreas','integrar areas'])) methods+=4;
 if(includesAny(text,['crear contenidos','crear contenido','colabor','comunicar resultados','producto digital','google classroom','padlet','canva','genially','powtoon'])) methods+=4;
 if(methods<14) notes.push('Explica mejor cómo cambiarían las metodologías y el papel activo del alumnado.');

 if(includesAny(text,['pensamiento crítico','pensamiento critico'])) skills+=4;
 if(includesAny(text,['creatividad'])) skills+=4;
 if(includesAny(text,['resolución de problemas','resolucion de problemas','problemas reales'])) skills+=4;
 if(includesAny(text,['comunicación efectiva','comunicacion efectiva','comunicación','comunicacion'])) skills+=4;
 if(includesAny(text,['ciudadanía digital','ciudadania digital','manejo de información','manejo de informacion'])) skills+=4;
 if(skills<12) notes.push('Haz explícitas varias competencias del siglo XXI que pretendes desarrollar.');

 const activitySignals=countActivitySignals(text);
 activities=Math.min(25,activitySignals*5);
 if(raw.length>=450) activities=Math.min(25,activities+5);
 if(activities<15) notes.push('Incluye al menos tres actividades o actuaciones concretas y suficientemente desarrolladas. Puedes concretarlas con recursos como Google Classroom, Padlet, Canva, Genially, Kahoot, Edpuzzle o PowToon, explicando siempre su finalidad pedagógica.');

 if(includesAny(text,['rúbrica','rubrica','portafolio','portfolio','proyecto','evaluación competencial','evaluacion competencial','desempeño','desempeno','kahoot','edpuzzle'])) assessment+=10;
 if(includesAny(text,['evaluación','evaluacion','seguimiento','evidencias','cuestionario','encuesta'])) assessment+=3;
 if(raw.length>=650) assessment+=2;
 assessment=Math.min(15,assessment);
 if(assessment<10) notes.push('Concreta cómo evaluarías mediante rúbricas, portafolios, proyectos u otras evidencias de desempeño.');

 state.openBreakdown={tech:Math.min(20,tech),methods:Math.min(20,methods),skills:Math.min(20,skills),activities:Math.min(25,activities),assessment};
 const rawOpen=Object.values(state.openBreakdown).reduce((a,b)=>a+b,0);
 state.openScore=Math.round((rawOpen/100)*45);
 const totalPreview=state.diagnosisScore+state.orderScore+state.matchScore+state.openScore;
 const el=document.getElementById('openFeedback');
 feedback(el,`<strong>Revisión formativa de la propuesta:</strong><div class="breakdown"><div>Transformación tecnológica: ${state.openBreakdown.tech}/20</div><div>Metodologías activas: ${state.openBreakdown.methods}/20</div><div>Competencias: ${state.openBreakdown.skills}/20</div><div>Actividades concretas: ${state.openBreakdown.activities}/25</div><div>Evaluación y coherencia: ${state.openBreakdown.assessment}/15</div></div>${notes.length?'<ul>'+notes.map(n=>`<li>${n}</li>`).join('')+'</ul>':'La respuesta incorpora de forma equilibrada los elementos esperados para el caso.'}<p class="muted">Puntuación provisional global: ${totalPreview}/100. La revisión es automática y orientativa, basada en criterios explícitos; no utiliza todavía IA para interpretar el significado completo de la respuesta.</p><button class="primary" id="toSurvey">Continuar al cuestionario final</button>`,rawOpen>=70?'good':'warn');
 document.getElementById('toSurvey').addEventListener('click',()=>show('survey'));
});

document.getElementById('finishSurvey').addEventListener('click',()=>{
 const likert=[];let complete=true;
 surveyStatements.forEach((_,i)=>{const checked=document.querySelector(`input[name="survey-${i}"]:checked`);if(!checked)complete=false;likert.push(checked?Number(checked.value):null);});
 const useful=document.getElementById('surveyUseful').value;
 if(!complete||!useful){feedback(document.getElementById('surveyFeedback'),'<strong>Antes de finalizar</strong>, responde los 10 ítems y selecciona qué parte de la experiencia te ha resultado más útil.','warn');return;}
 state.survey={instrumentVersion:commonSurvey.version,likert,best:document.getElementById('surveyBest').value.trim(),improve:document.getElementById('surveyImprove').value.trim(),useful};
 saveSession();finish();
});

function saveSession(){
 const record={session:'sesion-01',timestamp:new Date().toISOString(),scores:{diagnosis:state.diagnosisScore,order:state.orderScore,match:state.matchScore,open:state.openScore,total:state.diagnosisScore+state.orderScore+state.matchScore+state.openScore},openBreakdown:state.openBreakdown,openAnswer:document.getElementById('openAnswer').value.trim(),survey:state.survey};
 const key='ensenanza-aprendizaje-sesion-01';
 const previous=JSON.parse(localStorage.getItem(key)||'[]');previous.push(record);localStorage.setItem(key,JSON.stringify(previous));
}

function finish(){
 const total=state.diagnosisScore+state.orderScore+state.matchScore+state.openScore;
 document.getElementById('finalScore').textContent=total;
 let level='Necesita revisión',msg='Conviene revisar el contenido de la sesión y reforzar la conexión entre transformación tecnológica, metodología y competencias.';
 if(total>=85){level='Dominio sólido';msg='Has construido una propuesta coherente que integra transformación del centro, metodologías activas, competencias y evaluación.';}
 else if(total>=65){level='Buen progreso';msg='La propuesta es adecuada, aunque todavía puede ganar concreción o profundidad en algunos componentes.';}
 document.getElementById('resultText').innerHTML=`<h3>${level}</h3><p>${msg}</p><div class="breakdown"><div>Diagnóstico: ${state.diagnosisScore}/20</div><div>Priorización: ${state.orderScore}/15</div><div>Aplicación: ${state.matchScore}/20</div><div>Resolución del caso: ${state.openScore}/45</div></div><p class="muted">Las respuestas del cuestionario y esta sesión se han guardado únicamente en este navegador. No se han enviado a ningún servidor.</p>`;
 show('result');
}

document.getElementById('restart').addEventListener('click',()=>{
 state.diagnosisScore=state.orderScore=state.matchScore=state.openScore=0;state.openBreakdown={};state.survey={};
 orderItems=[{id:'train',label:'Formar y acompañar al profesorado en tecnología educativa y metodologías actuales.'},{id:'diagnose',label:'Analizar las necesidades del centro, del alumnado y la situación de partida.'},{id:'implement',label:'Diseñar e implementar actividades activas, interdisciplinarias y apoyadas en tecnología.'},{id:'resources',label:'Planificar recursos, conectividad e infraestructura coherentes con los objetivos educativos.'},{id:'evaluate',label:'Evaluar el impacto de los cambios y ajustar el plan de innovación.'}];
 document.getElementById('openAnswer').value='';document.getElementById('surveyBest').value='';document.getElementById('surveyImprove').value='';document.getElementById('surveyUseful').value='';
 document.querySelectorAll('input[type="radio"]').forEach(x=>x.checked=false);document.querySelectorAll('.feedback').forEach(x=>{x.className='feedback hidden';x.innerHTML='';});
 renderDiagnosis();renderOrder();renderMatch();renderSurvey();show('case');
});

renderDiagnosis();renderOrder();renderMatch();renderSurvey();