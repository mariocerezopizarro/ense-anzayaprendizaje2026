const screens={case:'screen-case',blocks:'screen-blocks',order:'screen-order',open:'screen-open',result:'screen-result'};
const state={blocksScore:0,orderScore:0,openScore:0};

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

function show(name){Object.values(screens).forEach(id=>document.getElementById(id).classList.remove('active'));document.getElementById(screens[name]).classList.add('active');const steps={case:1,blocks:2,order:3,open:4,result:4};const step=steps[name];document.getElementById('progressLabel').textContent=name==='result'?'Actividad completada':`Paso ${step} de 4`;document.getElementById('progressBar').style.width=`${name==='result'?100:step*25}%`;window.scrollTo({top:0,behavior:'smooth'});}

document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.next)));
document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.back)));

function renderBlocks(){const grid=document.getElementById('blocksGrid');grid.innerHTML='';blockOptions.forEach(o=>{const btn=document.createElement('button');btn.className='block-option';btn.dataset.id=o.id;btn.innerHTML=`<strong>${o.title}</strong><span>${o.text}</span>`;btn.addEventListener('click',()=>btn.classList.toggle('selected'));grid.appendChild(btn);});}

function renderOrder(){const list=document.getElementById('orderList');list.innerHTML='';orderItems.forEach((item,index)=>{const li=document.createElement('li');li.className='order-item';li.innerHTML=`<span>${index+1}. ${item.label}</span><div class="order-controls"><button aria-label="Subir">↑</button><button aria-label="Bajar">↓</button></div>`;const [up,down]=li.querySelectorAll('button');up.addEventListener('click',()=>move(index,-1));down.addEventListener('click',()=>move(index,1));list.appendChild(li);});}
function move(index,delta){const target=index+delta;if(target<0||target>=orderItems.length)return;[orderItems[index],orderItems[target]]=[orderItems[target],orderItems[index]];renderOrder();}

function feedback(el,html,type='good'){el.className=`feedback ${type}`;el.innerHTML=html;}

document.getElementById('evaluateBlocks').addEventListener('click',()=>{const chosen=[...document.querySelectorAll('.block-option.selected')].map(x=>x.dataset.id);const good=blockOptions.filter(o=>o.good).map(o=>o.id);const goodChosen=chosen.filter(id=>good.includes(id)).length;const badChosen=chosen.filter(id=>!good.includes(id)).length;state.blocksScore=Math.max(0,Math.round((goodChosen/good.length)*35-badChosen*6));const missing=blockOptions.filter(o=>o.good&&!chosen.includes(o.id)).map(o=>o.title);const el=document.getElementById('blocksFeedback');if(goodChosen>=3&&badChosen===0){feedback(el,`<strong>Buena selección.</strong> Has incorporado ${goodChosen} de los 4 elementos clave del tema.${missing.length?` Te falta considerar: ${missing.join(', ')}.`:''}<br><button class="primary" id="toOrder">Continuar</button>`);}else{feedback(el,`<strong>Revisa tu intervención.</strong> Has incluido ${goodChosen} elementos adecuados y ${badChosen} poco coherentes con el enfoque del tema.${missing.length?` Conviene valorar también: ${missing.join(', ')}.`:''}<br><button class="primary" id="toOrder">Continuar</button>`,'warn');}document.getElementById('toOrder').addEventListener('click',()=>show('order'));});

document.getElementById('evaluateOrder').addEventListener('click',()=>{let matches=0;orderItems.forEach((x,i)=>{if(x.id===idealOrder[i])matches++;});state.orderScore=Math.round(matches/idealOrder.length*25);const el=document.getElementById('orderFeedback');if(matches===4){feedback(el,'<strong>Secuencia muy coherente.</strong> Partes del análisis, intervienes, coordinas con las familias y finalmente revisas el resultado.<br><button class="primary" id="toOpen">Continuar</button>');}else{feedback(el,`<strong>Tu secuencia es defendible, pero puede mejorarse.</strong> Has situado ${matches} de 4 pasos en la posición esperada. Una lógica posible sería: analizar → intervenir → coordinar con familias → revisar.<br><button class="primary" id="toOpen">Continuar</button>`,'warn');}document.getElementById('toOpen').addEventListener('click',()=>show('open'));});

function includesAny(text,terms){return terms.some(t=>text.includes(t));}
document.getElementById('evaluateOpen').addEventListener('click',()=>{const raw=document.getElementById('openAnswer').value.trim();const text=raw.toLowerCase();let score=0;const notes=[];
 if(raw.length>=180){score+=10}else notes.push('Desarrolla algo más la respuesta para justificar tus decisiones.');
 if(includesAny(text,['empatía','respeto','inclus','diversidad','habilidades sociales','cooper'])){score+=8}else notes.push('Añade alguna medida concreta sobre inclusión, convivencia o habilidades sociales.');
 if(includesAny(text,['familia','familias','padres','madres'])){score+=7}else notes.push('Explica cómo coordinarías la actuación con las familias.');
 if(includesAny(text,['vygotsky','bandura','sociocultural','aprendizaje social'])){score+=10}else notes.push('Fundamenta la propuesta con Vygotsky y/o Bandura, que aparecen vinculados al caso en el tema.');
 if(includesAny(text,['andamiaje','modelar','observación','imitación','interacción social'])){score+=5}else notes.push('Relaciona la teoría con una actuación concreta, no solo con el nombre del autor.');
 state.openScore=Math.min(40,score);const total=state.blocksScore+state.orderScore+state.openScore;const el=document.getElementById('openFeedback');const quality=state.openScore>=30?'good':'warn';feedback(el,`<strong>Revisión formativa:</strong> ${state.openScore}/40 puntos en esta fase.<br>${notes.length?'<ul>'+notes.map(n=>`<li>${n}</li>`).join('')+'</ul>':'La respuesta recoge los principales elementos esperados según el Tema 1.'}<button class="primary" id="finish">Ver informe final</button>`,quality);document.getElementById('finish').addEventListener('click',()=>finish(total));});

function finish(total){document.getElementById('finalScore').textContent=total;let level='Necesita revisión';let msg='Conviene volver al tema y reforzar la conexión entre las decisiones prácticas y su fundamentación.';if(total>=80){level='Dominio sólido';msg='La intervención integra adecuadamente selección de estrategias, priorización y fundamentación.';}else if(total>=60){level='Buen progreso';msg='La propuesta es adecuada, aunque todavía puede ganar precisión y profundidad en algunos apartados.';}document.getElementById('resultText').innerHTML=`<h3>${level}</h3><p>${msg}</p><p><strong>Construcción por bloques:</strong> ${state.blocksScore}/35<br><strong>Priorización:</strong> ${state.orderScore}/25<br><strong>Respuesta abierta:</strong> ${state.openScore}/40</p><p class="muted">Esta versión utiliza una revisión local basada en criterios explícitos del Tema 1. No utiliza todavía un modelo de IA para interpretar semánticamente la respuesta.</p>`;show('result');}

document.getElementById('restart').addEventListener('click',()=>{state.blocksScore=state.orderScore=state.openScore=0;orderItems=[{id:'families',label:'Comunicar a las familias lo observado y explicar las medidas adoptadas.'},{id:'observe',label:'Analizar los incidentes y necesidades del grupo antes de intervenir.'},{id:'intervene',label:'Aplicar actividades de inclusión, habilidades sociales y cooperación.'},{id:'review',label:'Revisar los resultados y ajustar las medidas si los problemas continúan.'}];document.getElementById('openAnswer').value='';document.querySelectorAll('.feedback').forEach(x=>{x.className='feedback hidden';x.innerHTML='';});renderBlocks();renderOrder();show('case');});

renderBlocks();renderOrder();