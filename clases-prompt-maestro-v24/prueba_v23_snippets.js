// Prueba de los fragmentos v23 (lógica, DOM simulado). Uso: node prueba_v23_snippets.js
// NO reemplaza prueba_clase.js (navegador real): prueba que la LÓGICA nueva hace lo que dice el prompt.
const fs = require('fs'), vm = require('vm'), path = require('path');
let fallos = 0, pasos = 0;
const ok = (c, m) => { pasos++; if (!c) { fallos++; console.log('  ❌', m); } else console.log('  ✅', m); };

function crearEntorno() {
  const els = {};
  const mk = id => (els[id] = els[id] || { id, textContent: '', innerHTML: '', style: {}, offsetWidth: 1,
    classList: { _s: new Set(), add(c) { this._s.add(c); }, remove(c) { this._s.delete(c); }, toggle(c, f) { f ? this._s.add(c) : this._s.delete(c); } } });
  ['nota-hud', 'aciertos-hud', 'nota-intento-hud', 'nota-delta', 'razon-bloqueo', 'rescate-wrap', 'aviso-guardado'].forEach(mk);
  const timers = [];
  const box = {
    console, Date, Math, JSON, Object, Number, Set, parseInt,
    window: {}, document: { getElementById: id => els[id] || null },
    setTimeout: (f, ms) => { timers.push({ f, ms }); return timers.length; }, clearTimeout: () => {},
    showToast: () => {}, saves: 0, checarHitoNotaDocente: () => {},
    TIPOS_EVALUABLES: ['quiz', 'evalFinal'], TIPOS_LECTURA: ['info', 'repaso', 'repaso2', 'practica'],
    detenerCronometroLectura: () => {}, activarCronometroLectura: () => {}, habilitarBtnNext: () => { box.btnNext = true; },
    deshabilitarBtnNext: () => { box.btnNext = false; }, btnNext: false,
    NOMBRE_NORM: 'ana_perez', GRUPO_NORM: '501', CONFIG_CLASE: { semana: 5 }, CLASE_ID: 'mat_5_p4_s5', SKEY: 'k',
    almacen: () => ({ getItem: () => null }), calcularSemaforoParticipacion: () => 'verde',
    els, timers
  };
  box.save = () => { box.saves++; };
  box.SL = [
    { id: 'i1', type: 'intro' }, { id: 'h1', type: 'historia' }, { id: 'mj1', type: 'minijuego' }, { id: 'd1', type: 'drag' },
    { id: 'f1', type: 'fill' }, { id: 'w1', type: 'wordsearch' }, { id: 'q1', type: 'quiz', preguntas: Array.from({ length: 4 }, (_, i) => ({
      id: 'p' + i, opciones: [{ id: 'a', texto: 'Mala', correcta: false, porQue: 'Sumaste en vez de multiplicar' }, { id: 'b', texto: 'Buena', correcta: true }], retroalimentacion: 'Se multiplica.' })) },
    { id: 'q2', type: 'evalFinal', preguntas: Array.from({ length: 6 }, (_, i) => ({ id: 'e' + i, opciones: [{ id: 'a', texto: 'M', correcta: false }, { id: 'b', texto: 'B', correcta: true }] })) },
    { id: 'fin', type: 'final' }
  ];
  box.TOT = box.SL.length;
  box.st = { acts: {}, slide: 0, seen: new Set(), aciertos: 0, intentos: 1, vidasUsadas: 0, mejorNota: 0, mejorAciertos: 0, mejorIntento: 1, name: 'Ana', modoAdmin: false, reintentoActivo: false };
  vm.createContext(box);
  // funciones del prompt que los fragmentos usan (copiadas de 8-U / 8-P, sin cambios)
  vm.runInContext(`
    function totalPreguntasReales(){ return SL.filter(s=>TIPOS_EVALUABLES.includes(s.type)).reduce((a,s)=>a+(s.preguntas?.length||0),0); }
    function recalcularAciertosDesdeContadores(){ let n=0; Object.keys(st.acts).forEach(k=>{ if(k.startsWith('quiz_resps_')) (st.acts[k]||[]).forEach(r=>{ if(r.correcta) n++; }); }); st.aciertos=n; }
    function calcTotal(){ const tot=totalPreguntasReales(); recalcularAciertosDesdeContadores(); if(!tot) return 0; return Math.min(5,Math.max(0,(st.aciertos/tot)*5)); }
    function actualizarMejorNota(){ const a=calcTotal(); if(a>(st.mejorNota||0)+1e-9){ st.mejorNota=a; st.mejorAciertos=st.aciertos||0; st.mejorIntento=st.intentos||1; } }
    function notaOficial(){ return Math.max(calcTotal(), st.mejorNota||0); }
  `, box);
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'v23_snippets.js'), 'utf8'), box);
  return box;
}
const run = (box, code) => vm.runInContext(code, box);

console.log('T10 · Ninguna actividad sin nota exige acertar');
{
  const b = crearEntorno();
  ['h1', 'mj1', 'd1', 'f1', 'w1'].forEach(id => {
    const s = b.SL.find(x => x.id === id);
    ok(run(b, `puedeAvanzar(SL.find(x=>x.id==='${id}'))`) === false, `${s.type}: empieza bloqueada`);
    ok(run(b, `razonBloqueo(SL.find(x=>x.id==='${id}'))`).length > 5, `${s.type}: "Siguiente" apagado explica por qué`);
  });
  // verificar con TODO MAL en 'fill': debe desbloquear igual y decir cuál era la correcta
  const r = run(b, `cerrarVerificacion('f1',{aciertos:0,total:3,detalle:[{ok:false,tuRespuesta:'7',correcta:'12',porQue:'Sumaste en vez de multiplicar'}]})`);
  ok(r.perfecto === false && r.mostrarSolucion === true, 'fill con 0/3: no es perfecto, muestra solución');
  ok(run(b, `puedeAvanzar(SL.find(x=>x.id==='f1'))`) === true, 'fill con 0/3: IGUAL desbloquea Siguiente');
  ok(b.st.acts.modo_f1 === 'intento', 'se registra como "intento" (no como acierto)');
  const html = run(b, `htmlFeedbackActividad({detalle:[{ok:false,tuRespuesta:'7',correcta:'12',porQue:'Sumaste'}]})`);
  ok(/Tu respuesta/.test(html) && /La correcta/.test(html) && /Sumaste/.test(html), 'feedback muestra tu respuesta, la correcta y por qué');
  // minijuego perdido
  run(b, `finalizarMinijuego('mj1',{estrellas:0})`);
  ok(run(b, `puedeAvanzar(SL.find(x=>x.id==='mj1'))`) === true, 'minijuego perdido (0 estrellas) desbloquea');
  // idempotencia
  const g = b.saves; run(b, `marcarActividadHecha('mj1','intento'); marcarActividadHecha('mj1','intento');`);
  ok(b.st.acts.modo_mj1 === 'intento', 'doble llamada no cambia el modo');
}

console.log('T11 · Rescate: a los 25 s siempre hay salida');
{
  const b = crearEntorno();
  b.st.slide = 3;                                                     // drag
  run(b, `aplicarEstadoAvance(SL[3])`);
  ok(b.btnNext === false, 'drag sin hacer: Siguiente apagado');
  ok(b.timers.some(t => t.ms === 25000), 'se programó el rescate a 25 s');
  b.timers.find(t => t.ms === 25000).f();                             // pasan 25 s
  ok(/No me sale/.test(b.els['rescate-wrap'].innerHTML), 'aparece el botón "No me sale"');
  run(b, `usarRescate('d1')`);
  ok(run(b, `puedeAvanzar(SL[3])`) === true && b.btnNext === true, 'al usar el rescate Siguiente se habilita');
  ok(b.st.acts.ayuda_d1 === true, 'queda registrado como "con ayuda" para el docente');
  ok(b.els['rescate-wrap'].innerHTML === '', 'el botón de rescate desaparece');
  ok(/Ya puedes continuar/.test(b.els['razon-bloqueo'].textContent), 'la razón pasa a "Ya puedes continuar"');
  // el rescate NUNCA aplica a evaluables
  ok(run(b, `marcarActividadHecha('q1','rescate')`) === false, 'marcarActividadHecha rechaza quiz');
  ok(run(b, `marcarActividadHecha('q2','rescate')`) === false, 'marcarActividadHecha rechaza evalFinal');
  b.st.slide = 6; run(b, `aplicarEstadoAvance(SL[6])`);
  ok(!b.timers.slice(1).some(t => t.ms === 25000), 'el quiz no programa rescate');
}

console.log('T12 · Quiz: responder mal NO bloquea, y la retro dice la correcta y por qué');
{
  const b = crearEntorno();
  const s = b.SL[6];
  const v = { preg: s.preguntas[0] };
  const mala = s.preguntas[0].opciones[0];
  run(b, `registrarRespuestaQuiz(SL[6], { preg: SL[6].preguntas[0] }, SL[6].preguntas[0].opciones[0], 0, false)`);
  b.st.acts.quiz_idx_q1 = 1; b.st.acts.quiz_retro_pend_q1 = 0;
  const html = run(b, `htmlRetroQuiz('q1')`);
  ok(/Tu respuesta: <strong>Mala/.test(html), 'muestra lo que marcó');
  ok(/La correcta: <strong>Buena/.test(html), 'muestra la correcta');
  ok(/Sumaste en vez de multiplicar/.test(html), 'explica en qué se equivocó (porQue de la opción)');
  ok(/Se multiplica/.test(html), 'explica cómo se resuelve');
  ok(/Nota de este intento/.test(html), 'muestra la nota del intento en la propia retro');
  // responder las 4 mal completa el quiz y desbloquea
  for (let i = 1; i < 4; i++) run(b, `registrarRespuestaQuiz(SL[6], { preg: SL[6].preguntas[${i}] }, SL[6].preguntas[${i}].opciones[0], ${i}, false)`);
  b.st.acts.completado_q1 = true;
  ok(run(b, `puedeAvanzar(SL[6])`) === true, 'quiz respondido todo mal: Siguiente habilitado');
}

console.log('T13 · Nota en vivo, también después de gastar una vida (bug del 1.5 pegado)');
{
  const b = crearEntorno();
  const responder = (sid, i, correcta) => run(b, `registrarRespuestaQuiz(SL.find(x=>x.id==='${sid}'), {preg: SL.find(x=>x.id==='${sid}').preguntas[${i}]}, SL.find(x=>x.id==='${sid}').preguntas[${i}].opciones[${correcta ? 1 : 0}], ${i}, ${correcta}); updScore();`);
  const hud = () => b.els['nota-hud'].textContent;
  // intento 1: 4 de 10 bien → 2.0
  for (let i = 0; i < 4; i++) responder('q1', i, true);
  for (let i = 0; i < 6; i++) responder('q2', i, false);
  ok(hud() === '2.0', `intento 1: HUD = 2.0 (muestra ${hud()})`);
  // gasta una vida: igual que iniciarNuevoIntento() → reset de quizzes, aciertos 0
  run(b, `actualizarMejorNota(); ['q1','q2'].forEach(id=>{ delete st.acts['quiz_resps_'+id]; delete st.acts['quiz_idx_'+id]; delete st.acts['completado_'+id]; }); st.aciertos=0; st.vidasUsadas=1; st.intentos=2; updScore();`);
  ok(hud() === '0.0', `intento 2 arranca visible en 0.0 (muestra ${hud()})`);
  ok(/Mejor nota: 2\.0/.test(b.els['nota-intento-hud'].textContent), 'aparte se ve "Mejor nota: 2.0 (es la que cuenta)"');
  // con la lógica ANTIGUA el HUD habría dicho 2.0 hasta superar 2.0:
  const antiguo = () => run(b, `notaOficial().toFixed(1)`);
  const lecturas = [];
  for (let i = 0; i < 3; i++) { responder('q1', i, true); lecturas.push(hud()); }
  ok(lecturas.join() === '0.5,1.0,1.5', `cada acierto sube el HUD: ${lecturas.join(' → ')}`);
  ok(antiguo() === '2.0', 'comprobado: la nota OFICIAL sigue en 2.0 (es la que va al index y no baja)');
  ok(b.els['nota-delta'].textContent === '+0.50', `aparece el "+0.50" tras cada acierto (${b.els['nota-delta'].textContent})`);
  ok(b.els['aciertos-hud'].textContent === '3/10 ✅', `contador de aciertos (${b.els['aciertos-hud'].textContent})`);
  // el vigilante repara un HUD desfasado
  b.els['nota-hud'].textContent = '9.9'; run(b, `repararHudNota()`);
  ok(hud() === '1.5', 'repararHudNota() corrige un HUD desfasado');
  // supera la mejor: la oficial sube
  for (let i = 3; i < 4; i++) responder('q1', i, true);
  for (let i = 0; i < 3; i++) responder('q2', i, true);
  ok(run(b, `notaOficial().toFixed(1)`) === '3.5' && hud() === '3.5', 'al superar la mejor, oficial y HUD coinciden en 3.5');
}

console.log('T14 · Primera apertura = cero, sello estricto, y el index recibe todo el avance');
{
  const b = crearEntorno();
  const base = { studentId: 'ana_perez', grupo: '501', semana: 5, claseId: 'mat_5_p4_s5' };
  ok(run(b, `sesionGuardadaEsValida(${JSON.stringify(base)})`) === true, 'sesión sellada y correcta: válida');
  ok(run(b, `sesionGuardadaEsValida({ slide: 9, acts: {}, mejorNota: 4.5 })`) === false, 'sesión SIN sello: inválida (antes pasaba)');
  ok(run(b, `sesionGuardadaEsValida({ studentId: 'ana_perez', grupo: '501', claseId: 'mat_5_p4_s5' })`) === false, 'sin campo semana: inválida (antes pasaba)');
  ok(run(b, `sesionGuardadaEsValida(${JSON.stringify({ ...base, semana: 4 })})`) === false, 'semana anterior con nota 4.5: inválida');
  ok(run(b, `sesionGuardadaEsValida(${JSON.stringify({ ...base, grupo: '502' })})`) === false, 'otro grupo: inválida');
  ok(run(b, `sesionGuardadaEsValida(${JSON.stringify({ ...base, studentId: 'maria' })})`) === false, 'otro estudiante: inválida');
  ok(run(b, `esEstudianteNuevo()`) === true, 'esEstudianteNuevo usa almacen() (no localStorage directo)');
  b.st.slide = 11; b.st.seen = new Set([0, 1, 2, 3]); b.st.acts.quiz_resps_q1 = [{ pregIdx: 0, correcta: true }];
  const e = run(b, `construirEntradaEstudiante()`);
  ok(e.slideActual === 12 && e.totalSlides === 9, `slideActual/totalSlides para el index (${e.slideActual}/${e.totalSlides})`);
  ok(e.preguntasRespondidas === 1 && e.totalPreguntas === 10, 'preguntas respondidas / total');
  ok(e.completada === false && typeof e.mejorNota === 'number' && e.version === 2, 'completada, mejorNota y version 2');
  const n = run(b, `normalizarEntradaIndex(${JSON.stringify({ nota: 3.2, porcentaje: 40, ultimoAcceso: 'x' })})`);
  ok(n && n.pct === 40 && n.completada === false, 'el index sigue leyendo entradas viejas (porcentaje)');
  ok(run(b, `normalizarEntradaIndex({nota: 9})`) === null, 'entrada con nota imposible: se descarta');
  // fallo de guardado
  run(b, `reportarFalloGuardado(new Error('x'))`); ok(b.els['aviso-guardado'].style.display !== 'block', '1 fallo: aún sin alarma');
  run(b, `reportarFalloGuardado(new Error('x'))`); ok(b.els['aviso-guardado'].style.display === 'block', '2 fallos seguidos: avisa que no se guardó');
  run(b, `guardadoExitoso()`); ok(b.els['aviso-guardado'].style.display === 'none', 'al volver a guardar bien, el aviso se quita');
}


console.log('T15 · Mejora personal y preguntas falladas para el docente');
{
  const b = crearEntorno();
  ok(run(b, `mensajeMejora()`) === '', 'sin intentos previos: no hay mensaje');
  run(b, `st.historialIntentos=[{nota:2.0}]; st.acts.quiz_resps_q1=[{pregIdx:0,pregId:'p0',correcta:true},{pregIdx:1,pregId:'p1',correcta:true},{pregIdx:2,pregId:'p2',correcta:true},{pregIdx:3,pregId:'p3',correcta:true},{pregIdx:4,pregId:'p4',correcta:true}]`);
  ok(/Mejoraste 0\.5/.test(run(b, `mensajeMejora()`)), 'mejora frente al intento anterior (2.5 vs 2.0)');
  run(b, `st.acts.quiz_resps_q1=[{pregIdx:0,pregId:'p0',correcta:false},{pregIdx:1,pregId:'p1',correcta:false},{pregIdx:2,pregId:'p0',correcta:false}]`);
  ok(/Todavía/.test(run(b, `mensajeMejora()`)) && !/mal|fall|bajaste/i.test(run(b, `mensajeMejora()`)), 'si baja: lenguaje de crecimiento, sin reproche');
  ok(run(b, `preguntasFalladasIds()`).join() === 'p0,p1', 'ids de fallos únicos para el index');
  ok(run(b, `construirEntradaEstudiante().preguntasFalladas`).length === 2, 'la entrada del index trae preguntasFalladas');
}

console.log(`\n${pasos - fallos}/${pasos} comprobaciones OK${fallos ? ' · ' + fallos + ' ❌' : ''}`);
process.exit(fallos ? 1 : 0);
