const screens={case:'screen-case',diagnosis:'screen-diagnosis',theory:'screen-theory',apply:'screen-apply',open:'screen-open',survey:'screen-survey',result:'screen-result'};
const state={diagnosisScore:0,theoryScore:0,applyScore:0,openScore:0,openBreakdown:{},survey:{}};

const diagnosisOptions=[
{id:'new',title:'Nuevo compañero con trasfondo cultural diferente',text:'Ahmed necesita incorporarse a un grupo que no comparte necesariamente sus referentes culturales.',good:true},
{id:'stereotypes',title:'Presencia de estereotipos',text:'Algunos estudiantes parten de nociones preconcebidas sobre otras culturas.',good:true},
{id:'exposure',title:'Familiaridad cultural desigual',text:'No todos los alumnos han tenido el mismo contacto con culturas diferentes.',good:true},
{id:'integration',title:'Necesidad de integración real',text:'El objetivo no es solo recibir a Ahmed, sino construir aceptación, vínculos y participación.',good:true},
{id:'group',title:'Oportunidad educativa para todo el grupo',text:'La llegada de Ahmed puede enriquecer la comprensión cultural del conjunto del aula.',good:true},
{id:'academic',title:'Fracaso académico generalizado',text:'El caso señala como problema principal un descenso grave de resultados escolares.',good:false},
{id:'language',title:'Ausencia total de competencia lingüística',text:'El supuesto afirma que Ahmed no comprende la lengua vehicular del centro.',good:false},
{id:'discipline',title:'Problema principal de disciplina',text:'La dificultad central consiste en conductas disruptivas graves por parte de Ahmed.',good:false}
];

const theoryItems=[
{prompt:'Un alumno interpreta como “incorrecta” una costumbre de Ahmed porque no coincide con las normas que conoce en su entorno.',correct:'norms',options:[['norms','Diferencias en normas y valores culturales.'],['media','Influencia de los medios.'],['exposure','Falta de exposición a otras culturas.'],['adult','Transmisión de prejuicios por adultos.']]},
{prompt:'Varios estudiantes repiten una imagen simplificada de una cultura que han visto de forma recurrente en redes o televisión.',correct:'media',options:[['media','Influencia de los medios de comunicación y reproducción de estereotipos.'],['norms','Diferencias de normas y valores.'],['attachment','Formación del apego.'],['friendship','Amistad entre iguales.']]},
{prompt:'Un estudiante nunca ha convivido con compañeros de otros orígenes y completa lo que desconoce con ideas simplificadas.',correct:'exposure',options:[['exposure','Falta de exposición y conocimiento de otras culturas.'],['media','Influencia de los medios únicamente.'],['norms','Normas escolares.'],['decision','Participación democrática.']]},
{prompt:'Una idea negativa sobre un grupo cultural aparece en conversaciones familiares y después se reproduce en el aula.',correct:'adult',options:[['adult','Transmisión consciente o inconsciente de prejuicios por adultos.'],['media','Medios de comunicación.'],['norms','Diferencias culturales.'],['peer','Tutoría entre iguales.']]},
{prompt:'El alumnado aprende a ponerse en el lugar de Ahmed y a comprender que puede interpretar una situación desde referentes distintos.',correct:'empathy',options:[['empathy','Conciencia social, empatía y comprensión de otras perspectivas.'],['avoid','Evitar hablar de las diferencias.'],['assimilation','Asimilación cultural como objetivo.'],['competition','Competición entre grupos.']]},
{prompt:'El centro incorpora diferentes historias, voces y perspectivas culturales al trabajo ordinario del aula.',correct:'intercultural',options:[['intercultural','Educación intercultural integrada en el currículo.'],['festival','Actividad puntual sin continuidad.'],['neutral','Neutralidad entendida como no tratar la diversidad.'],['separate','Separación por afinidad cultural.']]}
];

const applyItems=[
{prompt:'Primeros días de Ahmed en el aula',correct:'buddy',options:[['buddy','Asignar un compañero de bienvenida y combinarlo con dinámicas para conocer al conjunto del grupo.'],['alone','Dejar que se adapte solo para no señalarlo.'],['speech','Pedirle que explique su cultura ante toda la clase como única medida.'],['same','Actuar como si su incorporación no requiriera ninguna acogida específica.']],why:'El acompañamiento entre iguales puede aportar seguridad y una referencia próxima, pero debe abrir el acceso de Ahmed al grupo y no convertirlo en dependiente de una única persona.'},
{prompt:'Descubrimiento mutuo',correct:'share',options:[['share','Realizar presentaciones personales y actividades de “mostrar y contar” donde todos compartan elementos significativos de su identidad.'],['Ahmed','Centrar toda la actividad exclusivamente en Ahmed.'],['quiz','Evaluar conocimientos sobre países mediante un test memorístico.'],['avoid','Evitar mencionar la cultura para impedir diferencias.']],why:'El descubrimiento mutuo reduce el desconocimiento, favorece la aceptación y evita presentar a Ahmed como “el diferente” frente a un grupo supuestamente homogéneo.'},
{prompt:'Construcción de vínculos',correct:'coop',options:[['coop','Organizar juegos de equipo y proyectos cooperativos con grupos diversos y objetivos compartidos.'],['random','Sentarlos juntos sin diseñar interacción.'],['competition','Crear competiciones permanentes entre grupos culturales.'],['separate','Permitir agrupamientos estables por origen.']],why:'Las interacciones cooperativas generan oportunidades para conocerse, negociar, colaborar y formar amistades.'},
{prompt:'Aparece un estereotipo cultural en clase',correct:'challenge',options:[['challenge','Analizar de dónde procede, contrastarlo y mostrar la diversidad interna de las culturas.'],['ignore','Ignorarlo para no darle importancia.'],['punish','Castigar al alumno sin trabajar la idea que expresa.'],['confirm','Explicar que todos los estereotipos contienen una verdad general.']],why:'El Tema 2 plantea contrarrestar activamente los estereotipos y cuestionar las imágenes simplificadas procedentes, entre otras fuentes, de los medios y del desconocimiento.'},
{prompt:'Trabajo curricular a medio plazo',correct:'curriculum',options:[['curriculum','Integrar distintas voces, historias y perspectivas culturales en actividades ordinarias del currículo.'],['day','Limitar la diversidad a un “día de las culturas” anual.'],['Ahmed','Pedir a Ahmed que sea portavoz permanente de su cultura.'],['extra','Trabajarlo solo en actividades extraescolares.']],why:'La educación intercultural debe incorporarse al currículo y no quedar reducida a actuaciones aisladas o folclóricas.'},
{prompt:'Clima y participación',correct:'voice',options:[['voice','Establecer normas de respeto y contra el acoso, dar participación al alumnado y mantener comunicación abierta con la familia.'],['adult','Tomar todas las decisiones entre adultos sin escuchar al grupo.'],['silence','Pedir que no se hable de diferencias culturales.'],['special','Aplicar normas diferentes según el origen cultural.']],why:'Un entorno seguro requiere normas claras, participación, trato equitativo y colaboración con las familias y la comunidad.'}
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
  card.innerHTML=`<strong>${item.prompt}</strong><select id="theory-${i}"><option value="">Selecciona la explicación</option>${item.options.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;
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
 feedback(document.getElementById('diagnosisFeedback'),`<strong>${correct===5&&bad===0?'Diagnóstico preciso.':'Revisa el diagnóstico.'}</strong> Has identificado ${correct} de 5 elementos relevantes${bad?` y has seleccionado ${bad} distractor(es).`:'.'}${missing.length?`<br><br>Faltaría considerar: ${missing.join(', ')}.`:''}<br><br><strong>Clave del Tema 2:</strong> integrar a un nuevo compañero implica trabajar vínculos, aceptación de las diferencias y conciencia social; el problema no reside en la diferencia cultural en sí, sino en cómo el grupo interpreta esa diferencia y en los prejuicios que pueden construirse alrededor de ella.<br><button class="primary" id="toTheory">Continuar</button>`,correct>=4&&bad===0?'good':'warn');
 document.getElementById('toTheory').addEventListener('click',()=>show('theory'));
});

document.getElementById('evaluateTheory').addEventListener('click',()=>{
 let correct=0;theoryItems.forEach((item,i)=>{if(document.getElementById(`theory-${i}`).value===item.correct)correct++;});
 state.theoryScore=Math.round((correct/theoryItems.length)*20);
 feedback(document.getElementById('theoryFeedback'),`<strong>${correct===theoryItems.length?'Muy buena lectura teórica.':'Hay relaciones que conviene revisar.'}</strong> Has identificado correctamente ${correct} de ${theoryItems.length} situaciones.<br><br><strong>Mapa del Tema 2:</strong> los prejuicios pueden alimentarse por diferencias percibidas en normas y valores, por estereotipos difundidos en los medios, por falta de exposición a otras culturas y por su transmisión desde los adultos. Frente a ello, la conciencia social, la empatía y la educación intercultural permiten comprender otras perspectivas, cuestionar generalizaciones y construir un aula inclusiva.<br><button class="primary" id="toApply">Continuar</button>`,correct>=5?'good':'warn');
 document.getElementById('toApply').addEventListener('click',()=>show('apply'));
});

document.getElementById('evaluateApply').addEventListener('click',()=>{
 let correct=0;const explanations=[];
 applyItems.forEach((item,i)=>{if(document.getElementById(`apply-${i}`).value===item.correct)correct++;explanations.push(`<li>${item.why}</li>`);});
 state.applyScore=Math.round((correct/applyItems.length)*15);
 feedback(document.getElementById('applyFeedback'),`<strong>${correct===applyItems.length?'Plan de integración coherente.':'Revisa algunas decisiones.'}</strong> Has resuelto correctamente ${correct} de ${applyItems.length} situaciones.<ul>${explanations.join('')}</ul><p><strong>Idea central:</strong> integrar a Ahmed no significa exigirle que se adapte unilateralmente al grupo. La intervención debe facilitar su seguridad y participación y, al mismo tiempo, ampliar la comprensión cultural de todos los estudiantes.</p><button class="primary" id="toOpen">Continuar</button>`,correct>=5?'good':'warn');
 document.getElementById('toOpen').addEventListener('click',()=>show('open'));
});

function includesAny(text,terms){return terms.some(t=>text.includes(t));}
function scoreGroup(text,groups,max){let score=0;groups.forEach(g=>{if(includesAny(text,g.terms))score+=g.points;});return Math.min(max,score);}

document.getElementById('evaluateOpen').addEventListener('click',()=>{
 const raw=document.getElementById('openAnswer').value.trim();const text=raw.toLowerCase();const notes=[];
 const integration=scoreGroup(text,[
  {terms:['descubrimiento mutuo','conocerse','mostrar y contar','presentaciones culturales','presentaciones personales'],points:7},
  {terms:['integración','integracion','adaptación','adaptacion','acogida'],points:6},
  {terms:['cooperativo','cooperativa','proyecto colaborativo','juego de equipo','objetivo común','objetivo comun'],points:7}
 ],20);
 const bonds=scoreGroup(text,[
  {terms:['vínculo','vinculo','confianza','seguridad'],points:5},
  {terms:['amistad','amistades','interacción social','interaccion social'],points:4},
  {terms:['compañero de bienvenida','companero de bienvenida','tutoría entre iguales','tutoria entre iguales','alumno veterano'],points:6}
 ],15);
 const prejudice=scoreGroup(text,[
  {terms:['prejuicio','prejuicios','estereotipo','estereotipos'],points:5},
  {terms:['normas y valores','valores culturales','normas culturales'],points:4},
  {terms:['medios de comunicación','medios de comunicacion','redes sociales'],points:4},
  {terms:['falta de exposición','falta de exposicion','desconocimiento','poco contacto'],points:4},
  {terms:['adultos','familia transmite','transmisión de prejuicios','transmision de prejuicios'],points:3}
 ],20);
 const intercultural=scoreGroup(text,[
  {terms:['educación intercultural','educacion intercultural','intercultural'],points:6},
  {terms:['currículo','curriculo','diversas voces','diferentes historias','perspectivas culturales'],points:5},
  {terms:['contrarrestar','cuestionar estereotipos','desafiar estereotipos','analizar estereotipos'],points:5},
  {terms:['empatía','empatia','ponerse en el lugar','comprender otras perspectivas'],points:4}
 ],20);
 const context=scoreGroup(text,[
  {terms:['familia','familias','comunidad'],points:4},
  {terms:['normas de respeto','contra el acoso','acoso','respeto'],points:3},
  {terms:['participación','participacion','toma de decisiones'],points:3}
 ],10);
 const theory=scoreGroup(text,[
  {terms:['conciencia social'],points:5},
  {terms:['aceptación de las diferencias','aceptacion de las diferencias','identidad'],points:3},
  {terms:['relaciones socioafectivas','vínculos afectivos','vinculos afectivos'],points:3},
  {terms:['entorno sociocultural','cultura','diversidad cultural'],points:2},
  {terms:['modelado','actitudes inclusivas','comportamientos inclusivos'],points:2}
 ],15);
 let rubricTotal=integration+bonds+prejudice+intercultural+context+theory;
 if(raw.length<550){rubricTotal=Math.min(rubricTotal,70);notes.push('La propuesta es bastante breve: desarrolla mejor cómo aplicarías las medidas y por qué responden al Tema 2.');}
 if(!includesAny(text,['prejuicio','prejuicios','estereotipo','estereotipos']))notes.push('Explica de forma explícita cómo pueden formarse prejuicios o estereotipos y cómo los abordarías.');
 if(!includesAny(text,['educación intercultural','educacion intercultural','intercultural']))notes.push('Incorpora la educación intercultural como estrategia curricular, no solo como actividad puntual.');
 if(!includesAny(text,['compañero de bienvenida','companero de bienvenida','tutoría entre iguales','tutoria entre iguales']))notes.push('Puedes concretar el apoyo inicial mediante un compañero de bienvenida o tutoría entre iguales.');
 state.openBreakdown={integration,bonds,prejudice,intercultural,context,theory};
 state.openScore=Math.round(rubricTotal*.45);
 const type=rubricTotal>=75?'good':'warn';
 feedback(document.getElementById('openFeedback'),`<strong>Revisión orientativa: ${rubricTotal}/100 en la rúbrica del caso.</strong><div class="breakdown"><div>Integración: ${integration}/20</div><div>Vínculos: ${bonds}/15</div><div>Prejuicios: ${prejudice}/20</div><div>Educación intercultural: ${intercultural}/20</div><div>Familia, normas y participación: ${context}/10</div><div>Coherencia con Tema 2: ${theory}/15</div></div>${notes.length?`<p><strong>Para mejorar:</strong></p><ul>${notes.map(n=>`<li>${n}</li>`).join('')}</ul>`:'<p>La respuesta conecta de forma sólida la integración de Ahmed con los factores que explican el prejuicio y con estrategias interculturales concretas.</p>'}<p><strong>Recuerda:</strong> una respuesta excelente no trata la cultura de Ahmed como un problema; analiza cómo el desconocimiento y los estereotipos pueden afectar a las relaciones y convierte la diversidad en una oportunidad de aprendizaje para todo el grupo.</p><button class="primary" id="toSurvey">Continuar</button>`,type);
 document.getElementById('toSurvey').addEventListener('click',()=>show('survey'));
});

document.getElementById('finishSurvey').addEventListener('click',()=>{
 const values=surveyStatements.map((_,i)=>document.querySelector(`input[name="survey-${i}"]:checked`)?.value||'');
 if(values.some(v=>!v)){
  feedback(document.getElementById('surveyFeedback'),'<strong>Faltan respuestas.</strong> Valora todas las afirmaciones antes de finalizar.','warn');return;
 }
 state.survey={ratings:values.map(Number),best:document.getElementById('surveyBest').value.trim(),improve:document.getElementById('surveyImprove').value.trim(),useful:document.getElementById('surveyUseful').value,version:commonSurvey.version};
 const total=Math.min(100,state.diagnosisScore+state.theoryScore+state.applyScore+state.openScore);
 const record={session:'sesion-04',topic:'tema-02',timestamp:new Date().toISOString(),scores:{diagnosis:state.diagnosisScore,theory:state.theoryScore,application:state.applyScore,open:state.openScore,total},openBreakdown:state.openBreakdown,openAnswer:document.getElementById('openAnswer').value.trim(),survey:state.survey};
 localStorage.setItem('eaweb-sesion-04',JSON.stringify(record));
 document.getElementById('finalScore').textContent=total;
 document.getElementById('resultText').innerHTML=`<p><strong>Resultado global:</strong> ${total}/100.</p><div class="breakdown"><div>Lectura del caso: ${state.diagnosisScore}/20</div><div>Teoría: ${state.theoryScore}/20</div><div>Aplicación: ${state.applyScore}/15</div><div>Resolución abierta: ${state.openScore}/45</div></div><p>La finalidad de esta sesión no es memorizar una lista de medidas, sino comprender que la integración, los vínculos y la prevención de prejuicios forman parte de un mismo proceso educativo. Una intervención adecuada protege a Ahmed y, al mismo tiempo, enseña a todo el grupo a convivir con la diversidad.</p>`;
 show('result');
});

document.getElementById('restart').addEventListener('click',()=>{localStorage.removeItem('eaweb-sesion-04');location.reload();});