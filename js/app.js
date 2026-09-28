const screens={case:'screen-case',blocks:'screen-blocks',order:'screen-order',open:'screen-open',survey:'screen-survey',result:'screen-result'};
const state={blocksScore:0,orderScore:0,openScore:0,selectedBlocks:[],openAnswer:'',survey:{}};

const blockOptions=[
 {id:'multi',title:'Educación multicultural',text:'Incorporar actividades que permitan conocer y valorar las culturas presentes en el aula.',good:true},
 {id:'social',title:'Habilidades sociales',text:'Trabajar empatía, respeto, colaboración y resolución de conflictos.',good:true},
 {id:'teams',title:'Formación de equipos',text:'Diseñar proyectos, juegos y retos cooperativos que valoren la contribución de todos.',good:true},
 {id:'family',title:'Trabajo con las familias',text:'Mantener una comunicación proactiva y transparente e implicarlas en la solución.',good:true},
 {id:'punish',title:'Castigo colectivo',text:'Aplicar una sanción general a toda la clase para frenar rápidamente los conflictos.',good:false},
 {id:'ignore',title:'Esperar a que se resuelva solo',text:'Evitar intervenir para no dar más importancia a los conflictos.',good:false}
];

let orderItems=[
 {id:'families',label:'Comunicar a las familias lo observado y explicar las medidas adoptadas.'},
 {id:'observe',label:'Analizar los incidentes y necesidades del grupo antes de intervenir.'},
 {id:'intervene',label:'Aplicar actividades de inclusión, habilidades sociales y cooperación.'},
 {id:'review',label:'Revisar los resultados y ajustar las medidas si los problemas continúan.'}
];
const idealOrder=['observe','intervene','families','review'];

const surveyStatements=[
 'La herramienta me ha ayudado a comprender mejor los contenidos del tema.',
 'Las actividades me han ayudado a aplicar los contenidos a situaciones educativas concretas.',
 'El caso práctico me ha permitido relacionar la teoría con la práctica profesional.',
 'Construir y ordenar una respuesta me ha ayudado a reflexionar sobre cómo resolver el caso.',
 'La herramienta me ha ayudado a identificar contenidos del tema que todavía necesito revisar.',
 'El feedback recibido me ha ayudado a comprender cómo podría mejorar mis respuestas.',
 'La forma de trabajar los contenidos me ha resultado más estimulante que una actividad tradicional de repaso.',
 'Después de utilizar la herramienta considero que podría resolver mejor un caso práctico similar.',
 'Me gustaría utilizar actividades de este tipo para trabajar otros temas de la asignatura.',
 'En general, considero que esta herramienta ha contribuido positivamente a mi aprendizaje.'
];

function show(name){
  Object.values(screens).forEach(id=>document.getElementById(id).classList.remove('active'));
  document.getElementById(screens[name]).classList.add('active');
  const steps={case:1,blocks:2,order:3,open:4,survey:5,result:5};
  const step=steps[name];
  document.getElementById('progressLabel').textContent=name==='result'?'Actividad completada':`Paso ${step} de 5`;
  document.getElementById('progressBar').style.width=`${name==='result'?100:step*20}%`;
  window.scrollTo({top:0,behavior:'smooth'});
}

document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.next)));
document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.back)));

function renderBlocks(){
  const grid=document.getElementById('blocksGrid');grid.innerHTML='';
  blockOptions.forEach(o=>{
    const btn=document.createElement('button');btn.className='block-option';btn.dataset.id=o.id;
    btn.innerHTML=`<strong>${o.title}</strong><span>${o.text}</span>`;
    btn.addEventListener('click',()=>btn.classList.toggle('selected'));grid.appendChild(btn);
  });
}

function renderOrder(){
  const list=document.getElementById('orderList');list.innerHTML='';
  orderItems.forEach((item,index)=>{
    const li=document.createElement('li');li.className='order-item';
    li.innerHTML=`<span>${index+1}. ${item.label}</span><div class="order-controls"><button aria-label="Subir">↑</button><button aria-label="Bajar">↓</button></div>`;
    const [up,down]=li.querySelectorAll('button');up.addEventListener('click',()=>move(index,-1));down.addEventListener('click',()=>move(index,1));list.appendChild(li);
  });
}
function move(index,delta){const target=index+delta;if(target<0||target>=orderItems.length)return;[orderItems[index],orderItems[target]]=[orderItems[target],orderItems[index]];renderOrder();}
function feedback(el,html,type='good'){el.className=`feedback ${type}`;el.innerHTML=html;}

function renderSurvey(){
  const root=document.getElementById('surveyItems');root.innerHTML='';
  surveyStatements.forEach((text,i)=>{
    const wrap=document.createElement('div');wrap.className='survey-item';
    wrap.innerHTML=`<p><strong>${i+1}.</strong> ${text}</p><div class="likert" role="radiogroup" aria-label="${text}">${[1,2,3,4,5].map(v=>`<label><input type="radio" name="s${i}" value="${v}"><span>${v}</span></label>`).join('')}</div>`;
    root.appendChild(wrap);
  });
}

document.getElementById('evaluateBlocks').addEventListener('click',()=>{
  const chosen=[...document.querySelectorAll('.block-option.selected')].map(x=>x.dataset.id);state.selectedBlocks=chosen;
  const good=blockOptions.filter(o=>o.good).map(o=>o.id);const goodChosen=chosen.filter(id=>good.includes(id)).length;const badChosen=chosen.filter(id=>!good.includes(id)).length;
  state.blocksScore=Math.max(0,Math.round((goodChosen/good.length)*35-badChosen*6));
  const missing=blockOptions.filter(o=>o.good&&!chosen.includes(o.id)).map(o=>o.title);const el=document.getElementById('blocksFeedback');
  if(goodChosen>=3&&badChosen===0){feedback(el,`<strong>Buena selección.</strong> Has incorporado ${goodChosen} de los 4 elementos clave del tema.${missing.length?` Te falta considerar: ${missing.join(', ')}.`:''}<br><button class="primary" id="toOrder">Continuar</button>`);}else{feedback(el,`<strong>Revisa tu intervención.</strong> Has incluido ${goodChosen} elementos adecuados y ${badChosen} poco coherentes con el enfoque del tema.${missing.length?` Conviene valorar también: ${missing.join(', ')}.`:''}<br><button class="primary" id="toOrder">Continuar</button>`,'warn');}
  document.getElementById('toOrder').addEventListener('click',()=>show('order'));
});

document.getElementById('evaluateOrder').addEventListener('click',()=>{
  let matches=0;orderItems.forEach((x,i)=>{if(x.id===idealOrder[i])matches++;});state.orderScore=Math.round(matches/idealOrder.length*25);
  const el=document.getElementById('orderFeedback');
  if(matches===4){feedback(el,'<strong>Secuencia muy coherente.</strong> Partes del análisis, intervienes, coordinas con las familias y finalmente revisas el resultado.<br><button class="primary" id="toOpen">Continuar</button>');}
  else{feedback(el,`<strong>Tu secuencia es defendible, pero puede mejorarse.</strong> Has situado ${matches} de 4 pasos en la posición esperada. Una lógica posible sería: analizar → intervenir → coordinar con familias → revisar.<br><button class="primary" id="toOpen">Continuar</button>`,'warn');}
  document.getElementById('toOpen').addEventListener('click',()=>show('open'));
});

function includesAny(text,terms){return terms.some(t=>text.includes(t));}
function countActivitySignals(text){
  const signals=['actividad','dinámica','proyecto','taller','juego','debate','asamblea','role','cooperativ','grupo','sesión','reto','programa'];
  return signals.reduce((n,s)=>n+(text.includes(s)?1:0),0);
}

document.getElementById('evaluateOpen').addEventListener('click',()=>{
  const raw=document.getElementById('openAnswer').value.trim();const text=raw.toLowerCase();state.openAnswer=raw;
  let score=0;const notes=[];
  let content=0,caseScore=0,activities=0,theory=0,families=0;

  if(includesAny(text,['inclus','diversidad','competencia','educación emocional','habilidades sociales','aprendizaje social','sociocultural','aprendizaje a lo largo'])) content+=12;
  if(includesAny(text,['vygotsky','bandura','bisquerra','bowlby','erikson','piaget'])) content+=13;
  content=Math.min(25,content);if(content<18)notes.push('Haz más explícito el manejo de conceptos y autores trabajados en el Tema 1.');

  if(includesAny(text,['problema','conflicto','burla','exclus','margin','convivencia','interacción'])) caseScore+=12;
  if(includesAny(text,['observar','analizar','seguimiento','evaluar','revisar','prioridad','intervenir'])) caseScore+=13;
  caseScore=Math.min(25,caseScore);if(caseScore<18)notes.push('Analiza mejor el problema y explica cómo comprobarías la evolución del caso.');

  const activitySignals=countActivitySignals(text);activities=Math.min(25,activitySignals*6);
  if(includesAny(text,['empatía','multicultural','resolución de conflictos','aprendizaje cooperativo']))activities=Math.min(25,activities+5);
  if(activities<18)notes.push('Concreta al menos tres actividades o actuaciones y explica brevemente cómo se desarrollarían.');

  if(includesAny(text,['vygotsky','bandura','sociocultural','aprendizaje social']))theory+=8;
  if(includesAny(text,['porque','por ello','de este modo','desde esta teoría','andamiaje','modelar','observación','imitación','interacción social']))theory+=7;
  theory=Math.min(15,theory);if(theory<10)notes.push('Relaciona las teorías con decisiones concretas de intervención, no solo con el nombre del autor.');

  if(includesAny(text,['familia','familias','padres','madres']))families+=5;
  if(includesAny(text,['comunicación','coordinar','particip','colabor','reunión','informar']))families+=5;
  families=Math.min(10,families);if(families<7)notes.push('Explica con mayor precisión cómo implicarías a las familias.');

  score=content+caseScore+activities+theory+families;state.openScore=score;
  const el=document.getElementById('openFeedback');const quality=score>=70?'good':'warn';
  feedback(el,`<strong>Revisión formativa: ${score}/100 en la resolución abierta.</strong><br><div class="mini-scores"><span>Contenido: ${content}/25</span><span>Resolución: ${caseScore}/25</span><span>Actividades: ${activities}/25</span><span>Fundamentación: ${theory}/15</span><span>Familias: ${families}/10</span></div>${notes.length?'<ul>'+notes.map(n=>`<li>${n}</li>`).join('')+'</ul>':'La respuesta recoge de forma equilibrada los elementos esperados.'}<button class="primary" id="toSurvey">Continuar al cuestionario final</button>`,quality);
  document.getElementById('toSurvey').addEventListener('click',()=>show('survey'));
});

document.getElementById('finishSurvey').addEventListener('click',()=>{
  const ratings=surveyStatements.map((_,i)=>{const checked=document.querySelector(`input[name="s${i}"]:checked`);return checked?Number(checked.value):null;});
  if(ratings.some(v=>v===null)){feedback(document.getElementById('surveyFeedback'),'<strong>Falta alguna valoración.</strong> Responde los 10 ítems antes de finalizar.','warn');return;}
  state.survey={ratings,best:document.getElementById('surveyBest').value.trim(),improve:document.getElementById('surveyImprove').value.trim(),mostUseful:document.getElementById('surveyUseful').value};
  saveLocalSession();finish();
});

function saveLocalSession(){
  const record={id:`local-${Date.now()}`,timestamp:new Date().toISOString(),scores:{blocks:state.blocksScore,order:state.orderScore,open:state.openScore},selectedBlocks:state.selectedBlocks,order:orderItems.map(x=>x.id),openAnswer:state.openAnswer,survey:state.survey};
  const existing=JSON.parse(localStorage.getItem('sembrandoSaberSessions')||'[]');existing.push(record);localStorage.setItem('sembrandoSaberSessions',JSON.stringify(existing));
}

function finish(){
  const weighted=Math.round(state.blocksScore*.25+state.orderScore*.25+state.openScore*.5);
  document.getElementById('finalScore').textContent=weighted;
  let level='Necesita revisión';let msg='Conviene volver al tema y reforzar la conexión entre los contenidos, las decisiones prácticas y las actividades propuestas.';
  if(weighted>=80){level='Dominio sólido';msg='La intervención integra adecuadamente selección de estrategias, priorización y resolución fundamentada del caso.';}else if(weighted>=60){level='Buen progreso';msg='La propuesta es adecuada, aunque todavía puede ganar precisión y profundidad en algunos apartados.';}
  document.getElementById('resultText').innerHTML=`<h3>${level}</h3><p>${msg}</p><p><strong>Construcción por bloques:</strong> ${state.blocksScore}/35<br><strong>Priorización:</strong> ${state.orderScore}/25<br><strong>Resolución abierta:</strong> ${state.openScore}/100</p><p class="muted">La respuesta abierta sigue usando una revisión local basada en criterios explícitos. El cuestionario final se guarda únicamente en este navegador y no se envía a ningún servidor.</p>`;
  show('result');
}

document.getElementById('restart').addEventListener('click',()=>{
  state.blocksScore=state.orderScore=state.openScore=0;state.selectedBlocks=[];state.openAnswer='';state.survey={};
  orderItems=[{id:'families',label:'Comunicar a las familias lo observado y explicar las medidas adoptadas.'},{id:'observe',label:'Analizar los incidentes y necesidades del grupo antes de intervenir.'},{id:'intervene',label:'Aplicar actividades de inclusión, habilidades sociales y cooperación.'},{id:'review',label:'Revisar los resultados y ajustar las medidas si los problemas continúan.'}];
  document.getElementById('openAnswer').value='';document.getElementById('surveyBest').value='';document.getElementById('surveyImprove').value='';document.getElementById('surveyUseful').value='';
  document.querySelectorAll('input[type="radio"]').forEach(x=>x.checked=false);document.querySelectorAll('.feedback').forEach(x=>{x.className='feedback hidden';x.innerHTML='';});
  renderBlocks();renderOrder();show('case');
});

renderBlocks();renderOrder();renderSurvey();