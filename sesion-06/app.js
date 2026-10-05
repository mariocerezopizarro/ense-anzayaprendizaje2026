const screens={case:'screen-case',diagnosis:'screen-diagnosis',theory:'screen-theory',apply:'screen-apply',open:'screen-open',survey:'screen-survey',result:'screen-result'};
const state={diagnosisScore:0,theoryScore:0,applyScore:0,openScore:0,openRubric:0,openBreakdown:{},survey:{}};

const diagnosisOptions=[
{id:'exclusive-groups',title:'Grupos exclusivos',text:'Se forman grupos cerrados que dejan a algunos estudiantes fuera.',good:true},
{id:'isolation',title:'Aislamiento',text:'Parte del alumnado se siente aislado como consecuencia de estas dinámicas.',good:true},
{id:'stereotypes',title:'Estereotipos emergentes',text:'Aparecen ideas preconcebidas sobre otros grupos y compañeros.',good:true},
{id:'cultural-conflict',title:'Malentendidos culturales',text:'Las diferencias culturales están generando conflictos en aula y patio.',good:true},
{id:'playground',title:'Conflictos en distintos espacios',text:'El problema no se limita al aula: también aparece en el recreo.',good:true},
{id:'grades',title:'Descenso general del rendimiento',text:'El caso señala una bajada global de calificaciones en todo el centro.',good:false},
{id:'technology',title:'Brecha digital',text:'El problema principal es la falta de dispositivos tecnológicos.',good:false},
{id:'attendance',title:'Absentismo generalizado',text:'La cuestión central es la falta continuada de asistencia.',good:false}
];

const theoryItems=[
{prompt:'Un estereotipo cultural termina condicionando la manera en que un grupo trata a otro.',correct:'prejudice',options:[['prejudice','Prejuicios y estereotipos pueden convertirse en conductas discriminatorias.'],['neutral','Es solo una diferencia de opinión sin efectos.'],['ability','Depende únicamente de la capacidad individual.'],['chance','Es una coincidencia sin dimensión educativa.']]},
{prompt:'El centro incorpora derechos humanos, respeto, igualdad y participación en la enseñanza cotidiana.',correct:'democracy',options:[['democracy','Promoción de valores democráticos e inclusión.'],['punishment','Control disciplinario como única respuesta.'],['competition','Competición entre grupos.'],['avoid','Evitación de temas sociales.']]},
{prompt:'Los estudiantes intervienen en decisiones del centro y crean iniciativas contra la exclusión.',correct:'participation',options:[['participation','Participación activa del alumnado y ciudadanía democrática.'],['passive','Recepción pasiva de normas.'],['adultonly','Gestión exclusiva por adultos.'],['individual','Resolución individual de problemas colectivos.']]},
{prompt:'Ante un conflicto, el alumnado aprende a escuchar, negociar y buscar soluciones no violentas.',correct:'peace',options:[['peace','Educación para la paz, mediación y resolución pacífica de conflictos.'],['sanction','Sanción como única estrategia.'],['avoid','Evitar cualquier conversación sobre el conflicto.'],['rank','Clasificar públicamente quién tiene razón.']]},
{prompt:'Una actividad reúne a estudiantes de distintos orígenes y capacidades para colaborar en un objetivo común.',correct:'inclusive',options:[['inclusive','Actividad integradora que favorece encuentro, empatía y respeto por la diversidad.'],['segregated','Agrupamiento homogéneo para evitar diferencias.'],['selective','Actividad reservada a determinados perfiles.'],['isolated','Trabajo individual sin interacción.']]}
];

const applyItems=[
{prompt:'Para enseñar qué es la discriminación a alumnado de infantil y primaria...',correct:'age',options:[['age','Usar ejemplos cercanos, cuentos, situaciones del patio y actividades adaptadas a la edad sobre prejuicios, estereotipos y exclusión.'],['definition','Memorizar definiciones complejas sin ejemplos.'],['silence','Evitar el tema por ser demasiado sensible.'],['onlycase','Trabajarlo solo cuando aparezca un caso grave.']],why:'El aprendizaje debe permitir reconocer cómo prejuicios y estereotipos pueden producir exclusión y discriminación en situaciones reales y comprensibles.'},
{prompt:'Para convertir los valores democráticos en una práctica real...',correct:'voice',options:[['voice','Dar voz al alumnado en decisiones, comités o iniciativas que mejoren la convivencia y la inclusión.'],['rules','Limitarse a imponer normas sin participación.'],['lecture','Dar una charla anual sin continuidad.'],['adult','Reservar todas las decisiones a los adultos.']],why:'El Tema 3 relaciona los valores democráticos con la participación activa del alumnado en la vida escolar.'},
{prompt:'Para intervenir ante conflictos por estereotipos o malentendidos culturales...',correct:'mediate',options:[['mediate','Enseñar mediación, negociación, escucha, comunicación no violenta y resolución pacífica.'],['separate','Separar permanentemente a los grupos.'],['winner','Determinar rápidamente quién gana el conflicto.'],['ignore','Esperar a que el problema desaparezca.']],why:'La educación para la paz convierte los conflictos en oportunidades para practicar mediación, negociación y comunicación no violenta.'},
{prompt:'Para evitar que la diversidad quede solo en el discurso...',correct:'curriculum',options:[['curriculum','Revisar el currículo y las actividades para que representen diversidad cultural, de género, racial y de capacidades.'],['festival','Hacer únicamente un festival aislado al año.'],['same','Usar siempre los mismos referentes culturales.'],['optional','Tratar la diversidad solo como contenido optativo.']],why:'La inclusión debe estar presente en la enseñanza habitual y no reducirse a acciones puntuales.'},
{prompt:'Para ampliar la respuesta más allá del aula...',correct:'community',options:[['community','Implicar a familias y comunidad y colaborar, cuando sea útil, con organizaciones especializadas.'],['closed','Mantener el problema exclusivamente dentro del aula.'],['private','Evitar compartir estrategias con las familias.'],['studentonly','Responsabilizar solo al alumnado de resolverlo.']],why:'El Tema 3 reconoce el papel de familias, organizaciones y comunidad en la promoción de actitudes no discriminatorias.'},
{prompt:'Para favorecer relaciones inclusivas en la práctica...',correct:'activities',options:[['activities','Organizar actividades cooperativas, deportivas, culturales o artísticas con grupos diversos y objetivos compartidos.'],['homogeneous','Agrupar siempre por afinidades para evitar conflictos.'],['competitive','Aumentar la competición entre grupos existentes.'],['isolated','Priorizar tareas individuales sin interacción.']],why:'Las actividades integradoras favorecen el encuentro, el conocimiento mutuo, la empatía y el respeto a la diversidad.'}
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
 diagnosisOptions.forEach(o=>{const btn=document.createElement('button');btn.className='block-option';btn.dataset.id=o.id;btn.innerHTML=`<strong>${o.title}</strong><span>${o.text}</span>`;btn.addEventListener('click',()=>btn.classList.toggle('selected'));grid.appendChild(btn);});
}
function renderTheory(){
 const grid=document.getElementById('theoryGrid');
 theoryItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="theory-${i}"><option value="">Selecciona la explicación</option>${item.options.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});
}
function renderApply(){
 const grid=document.getElementById('applyGrid');
 applyItems.forEach((item,i)=>{const card=document.createElement('div');card.className='match-card';card.innerHTML=`<strong>${item.prompt}</strong><select id="apply-${i}"><option value="">Selecciona la actuación</option>${item.options.map(([v,l])=>`<option value="${v}">${l}</option>`).join('')}</select>`;grid.appendChild(card);});
}
function renderSurvey(){
 const box=document.getElementById('surveyItems');
 surveyStatements.forEach((s,i)=>{const div=document.createElement('div');div.className='survey-item';div.innerHTML=`<p><strong>${i+1}.</strong> ${s}</p><div class="likert">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="survey-${i}" value="${n}"> ${n}</label>`).join('')}</div>`;box.appendChild(div);});
 document.getElementById('surveyUseful').innerHTML='<option value="">Selecciona una opción</option>'+commonSurvey.usefulOptions.map(o=>`<option>${o}</option>`).join('');
}
renderDiagnosis();renderTheory();renderApply();renderSurvey();

document.getElementById('evaluateDiagnosis').addEventListener('click',()=>{
 const chosen=[...document.querySelectorAll('.block-option.selected')].map(x=>x.dataset.id);const good=diagnosisOptions.filter(o=>o.good).map(o=>o.id);const correct=chosen.filter(id=>good.includes(id)).length;const bad=chosen.filter(id=>!good.includes(id)).length;
 state.diagnosisScore=Math.max(0,Math.round((correct/good.length)*20-bad*3));
 feedback(document.getElementById('diagnosisFeedback'),`<strong>${correct===5&&bad===0?'Diagnóstico preciso.':'Revisa algunos elementos.'}</strong> Has identificado ${correct} de 5 señales relevantes${bad?` y has seleccionado ${bad} distractor(es).`:'.'}<br><br><strong>Clave del Tema 3:</strong> exclusión, estereotipos y malentendidos culturales pueden reproducir dinámicas discriminatorias y deben abordarse antes de que se consoliden.<br><button class="primary" id="toTheory">Continuar</button>`,correct>=4&&bad===0?'good':'warn');
 document.getElementById('toTheory').addEventListener('click',()=>show('theory'));
});

document.getElementById('evaluateTheory').addEventListener('click',()=>{
 let correct=0;theoryItems.forEach((item,i)=>{if(document.getElementById(`theory-${i}`).value===item.correct)correct++;});state.theoryScore=Math.round((correct/theoryItems.length)*20);
 feedback(document.getElementById('theoryFeedback'),`<strong>${correct===5?'Conexión teórica completa.':'Hay relaciones que conviene revisar.'}</strong> Has resuelto ${correct} de 5 situaciones.<br><br><strong>Mapa del Tema 3:</strong> la inclusión requiere reconocer prejuicios y estereotipos, enseñar valores democráticos y derechos humanos, favorecer la participación del alumnado y trabajar los conflictos mediante mediación y resolución pacífica.<br><button class="primary" id="toApply">Continuar</button>`,correct>=4?'good':'warn');
 document.getElementById('toApply').addEventListener('click',()=>show('apply'));
});

document.getElementById('evaluateApply').addEventListener('click',()=>{
 let correct=0;const explanations=[];applyItems.forEach((item,i)=>{if(document.getElementById(`apply-${i}`).value===item.correct)correct++;explanations.push(`<li>${item.why}</li>`);});state.applyScore=Math.round((correct/applyItems.length)*15);
 feedback(document.getElementById('applyFeedback'),`<strong>${correct===applyItems.length?'Plan educativo muy coherente.':'Revisa algunas decisiones.'}</strong> Has resuelto correctamente ${correct} de ${applyItems.length} situaciones.<ul>${explanations.join('')}</ul><p>La clave no es solo reaccionar ante incidentes, sino educar de forma preventiva para la convivencia democrática y la inclusión.</p><button class="primary" id="toOpen">Continuar</button>`,correct>=5?'good':'warn');
 document.getElementById('toOpen').addEventListener('click',()=>show('open'));
});

function has(text,terms){return terms.some(t=>text.includes(t));}
function pointsFor(text,checks){return checks.reduce((s,c)=>s+(has(text,c.terms)?c.points:0),0);}

document.getElementById('evaluateOpen').addEventListener('click',()=>{
 const raw=document.getElementById('openAnswer').value.trim();const text=raw.toLowerCase();const notes=[];
 const understanding=Math.min(15,pointsFor(text,[
  {terms:['prejuicio','prejuicios'],points:4},{terms:['estereotipo','estereotipos'],points:4},{terms:['discriminación','discriminacion'],points:4},{terms:['exclusión','exclusion','aislamiento'],points:3}
 ]));
 const policy=Math.min(20,pointsFor(text,[
  {terms:['políticas claras de no discriminación','politicas claras de no discriminacion','política de no discriminación','politica de no discriminacion'],points:5},
  {terms:['formación del profesorado','formacion del profesorado','formación docente','formacion docente','capacitar al profesorado'],points:5},
  {terms:['currículo inclusivo','curriculo inclusivo','currículum inclusivo','curriculum inclusivo','currículo educativo','curriculo educativo'],points:5},
  {terms:['diversidad cultural','diversidad de género','diversidad de genero','diversidad racial','diversidad de capacidades','representen la diversidad','reflejen la diversidad'],points:5}
 ]));
 const democracy=Math.min(20,pointsFor(text,[
  {terms:['valores democráticos','valores democraticos'],points:5},
  {terms:['derechos humanos'],points:5},
  {terms:['participación activa','participacion activa','toma de decisiones'],points:5},
  {terms:['comité de estudiantes','comites de estudiantes','comité estudiantil','comites estudiantiles','iniciativas inclusivas','grupos estudiantiles'],points:5}
 ]));
 const peace=Math.min(20,pointsFor(text,[
  {terms:['educación para la paz','educacion para la paz'],points:5},
  {terms:['mediación','mediacion'],points:5},
  {terms:['negociación','negociacion'],points:4},
  {terms:['resolución pacífica','resolucion pacifica','resolución de conflictos','resolucion de conflictos'],points:4},
  {terms:['comunicación no violenta','comunicacion no violenta'],points:2}
 ]));
 const community=Math.min(15,pointsFor(text,[
  {terms:['actividades cooperativas','actividad cooperativa','actividades integradoras','extracurriculares integradoras','deportivas','culturales','artísticas','artisticas'],points:5},
  {terms:['familias','familia'],points:4},
  {terms:['comunidad','comunidad educativa'],points:3},
  {terms:['organizaciones','ong','ongs','derechos humanos'],points:3}
 ]));
 const followup=Math.min(10,pointsFor(text,[
  {terms:['seguimiento','acompañamiento','acompanamiento'],points:4},
  {terms:['proteger','protección','proteccion','apoyar','apoyo'],points:3},
  {terms:['preventiva','preventivo','prevención','prevencion','respuesta integral','enfoque integral'],points:3}
 ]));
 const rubric=understanding+policy+democracy+peace+community+followup;
 state.openRubric=rubric;state.openScore=Math.round(rubric*.45);state.openBreakdown={understanding,policy,democracy,peace,community,followup};
 if(understanding<12)notes.push('Explica de forma más explícita prejuicios, estereotipos, discriminación y exclusión.');
 if(policy<16)notes.push('Incluye políticas, formación docente y currículo inclusivo con representación de la diversidad.');
 if(democracy<16)notes.push('Profundiza en valores democráticos, derechos humanos y participación activa del alumnado.');
 if(peace<16)notes.push('Desarrolla educación para la paz, mediación, negociación y resolución pacífica de conflictos.');
 if(community<12)notes.push('Añade actividades integradoras e implicación de familias, comunidad u organizaciones.');
 if(followup<8)notes.push('Incluye prevención, protección y seguimiento de quienes sufren exclusión o discriminación.');
 if(raw.length<650)notes.push('La respuesta es algo breve para justificar de forma completa todas las decisiones.');
 const perfect=rubric===100;
 feedback(document.getElementById('openFeedback'),`<strong>${perfect?'Respuesta de referencia: 100/100 en la rúbrica.':`Resultado de la rúbrica: ${rubric}/100.`}</strong><div class="breakdown"><div>Discriminación y estereotipos: ${understanding}/15</div><div>Políticas, profesorado y currículo: ${policy}/20</div><div>Democracia y participación: ${democracy}/20</div><div>Educación para la paz: ${peace}/20</div><div>Actividades y comunidad: ${community}/15</div><div>Seguimiento y coherencia: ${followup}/10</div></div>${notes.length?`<p><strong>Para mejorar:</strong></p><ul>${notes.map(n=>`<li>${n}</li>`).join('')}</ul>`:'<p>La propuesta conecta de forma completa los contenidos del Tema 3 con una intervención educativa concreta.</p>'}<button class="primary" id="toSurvey">Continuar</button>`,rubric>=75?'good':'warn');
 document.getElementById('toSurvey').addEventListener('click',()=>show('survey'));
});

document.getElementById('finishSurvey').addEventListener('click',()=>{
 const ratings=surveyStatements.map((_,i)=>{const x=document.querySelector(`input[name="survey-${i}"]:checked`);return x?Number(x.value):null;});
 if(ratings.some(v=>v===null)){feedback(document.getElementById('surveyFeedback'),'<strong>Falta alguna valoración.</strong> Responde los 10 ítems antes de finalizar.','warn');return;}
 state.survey={ratings,best:document.getElementById('surveyBest').value.trim(),improve:document.getElementById('surveyImprove').value.trim(),useful:document.getElementById('surveyUseful').value};
 const total=Math.min(100,state.diagnosisScore+state.theoryScore+state.applyScore+state.openScore);
 document.getElementById('finalScore').textContent=total;
 document.getElementById('resultText').innerHTML=`<p><strong>Puntuación global:</strong> ${total}/100.</p><div class="breakdown"><div>Diagnóstico: ${state.diagnosisScore}/20</div><div>Teoría: ${state.theoryScore}/20</div><div>Decisiones: ${state.applyScore}/15</div><div>Resolución abierta: ${state.openScore}/45</div></div><p>La puntuación combina desempeño demostrado y resolución del caso. El cuestionario final recoge tu percepción del aprendizaje y se registra por separado.</p>`;
 const record={session:'sesion-06',topic:'tema-03',timestamp:new Date().toISOString(),scores:{diagnosis:state.diagnosisScore,theory:state.theoryScore,apply:state.applyScore,open:state.openScore,total},openRubric:state.openRubric,openBreakdown:state.openBreakdown,openAnswer:document.getElementById('openAnswer').value,survey:state.survey};
 localStorage.setItem('eaweb-sesion-06',JSON.stringify(record));show('result');
});

document.getElementById('restart').addEventListener('click',()=>{localStorage.removeItem('eaweb-sesion-06');location.reload();});