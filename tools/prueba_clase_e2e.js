#!/usr/bin/env node
/* prueba_clase_e2e.js — pruebas con clics reales (jsdom) de una clase v26+.
   Uso:  npm install jsdom   (una vez)   →   node tools/prueba_clase_e2e.js clase.html
   Verifica T10–T23 (ver Prioridad 59/60). Sale con código 1 si algo falla. */
const fs = require('fs'), path = require('path');
const { JSDOM } = require('jsdom');
const archivo = process.argv[2]; if (!archivo) { console.log('Uso: node tools/prueba_clase_e2e.js clase.html'); process.exit(2); }
const HTML = fs.readFileSync(archivo, 'utf8');
let pasos = 0, fallos = 0, bloque = '';
const ok = (c, m) => { pasos++; if (!c) { fallos++; console.log('  ❌', m); } else console.log('  ✅', m); };
const T = n => { bloque = n; console.log('\n' + n); };
const sleep = ms => new Promise(r => setTimeout(r, ms));

function abrir({ est = 'ana', grupo = '501', storage = null, test = {}, rompeStorage = false } = {}) {
  const dom = new JSDOM(HTML, { runScripts: 'dangerously', pretendToBeVisual: true, url: `http://localhost/clase.html?est=${est}&grupo=${grupo}`,
    beforeParse(w) {
      w.__TEST__ = Object.assign({ factor: 0.02, rescateS: 0.4, sinIntro: true, antiDobleMs: 60 }, test);
      if (storage) for (const [k, v] of Object.entries(storage)) w.localStorage.setItem(k, v);
      if (rompeStorage) w.Storage.prototype.setItem = function () { throw new Error('cuota llena'); };
    } });
  return dom;
}
const snap = w => { const o = {}; for (let i = 0; i < w.localStorage.length; i++) { const k = w.localStorage.key(i); o[k] = w.localStorage.getItem(k); } return o; };
const q = (w, s) => w.document.querySelector(s), qa = (w, s) => [...w.document.querySelectorAll(s)];
const clic = el => el.dispatchEvent(new el.ownerDocument.defaultView.MouseEvent('click', { bubbles: true, cancelable: true }));
const next = w => q(w, '#btn-next'), tipo = w => q(w, '#stage').dataset.tipo, hud = w => q(w, '#nota-hud').textContent;
const habil = w => !next(w).disabled;
async function esperaHabil(w, ms = 1500) { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (habil(w)) return true; await sleep(20); } return habil(w); }
const idxTipo = (w, ...tipos) => w.CLASE_API.SL.findIndex(x => tipos.includes(x.type));
const idxEvaluables = w => w.CLASE_API.SL.map((x, i) => ['quiz', 'evalFinal'].includes(x.type) ? i : -1).filter(i => i >= 0);
const val27 = x => { const t = String(x).trim(), pc = t.endsWith('%'), u = t.replace('%', '').replace(/\s/g, ''); let v; if (u.includes('/')) { const [a, b] = u.split('/'); v = parseFloat(a.replace(',', '.')) / parseFloat(b.replace(',', '.')); } else v = parseFloat(u.replace(',', '.')); return pc ? v / 100 : v; };
const NUEVOS27 = ['fraccion', 'cuadricula', 'recta', 'comparar', 'podio', 'abierta', 'cuaderno'];
const NUEVOS31 = ['detective', 'tabla'];
const NUEVOS28 = ['enlazar', 'ordenar', 'memoria', 'relampago', 'sopa', 'candado'];
const ACTIVIDADES = ['tf', 'fill', 'drag', 'match', 'orden', 'wordsearch', 'interactive', 'minijuego', 'historia', ...NUEVOS27, ...NUEVOS28, ...NUEVOS31];
const cerrarModal = w => { if (!q(w, '#modal').hidden) { const b = q(w, '#modal button'); if (b) clic(b); } };

async function jugarSlide(w, modo /* 'mal' | 'bien' */) {
  const t = tipo(w), api = w.CLASE_API, s = api.SL[api.estado().slide];
  if (t === 'info') await esperaHabil(w);
  if (t === 'tf') s.items.forEach((it, i) => { const v = modo === 'bien' ? it.v : !it.v; clic(q(w, `[data-test=tf][data-i="${i}"][data-v="${v ? 1 : 0}"]`)); });
  if (t === 'fill') { qa(w, '[data-test=fill-input]').forEach((inp, i) => { inp.value = modo === 'bien' ? s.items[i].ans[0] : 'zzz'; }); clic(q(w, '[data-test=verificar]')); }
  if (t === 'drag') { const ids = s.chips.map((c, i) => i).slice(0, 2); for (const i of ids) { for (let k = 0; k < 2; k++) { clic(q(w, `[data-test=chip][data-i="${i}"]`)); const bien = s.chips[i].z, mala = s.zonas.find(z => z.id !== bien).id; clic(q(w, `[data-test=zona][data-z="${modo === 'bien' ? bien : mala}"]`)); if (modo === 'bien') break; } } }
  if (NUEVOS27.includes(t)) await jugarNuevo27(w, s, t, modo);
  if (NUEVOS28.includes(t)) await jugarNuevo28(w, s, t, modo);
  if (t === 'tabla') { const bl = s.filas.flatMap((f, i) => f.map((x, j) => ({ x, k: i + ',' + j }))).filter(o => o.x && typeof o.x === 'object'); const poner = (o, v) => { const e = q(w, `[data-test=tabla-in][data-k="${o.k}"]`); e.value = v; e.dispatchEvent(new w.Event('input', { bubbles: true })); }; bl.forEach(o => poner(o, modo === 'bien' ? String(o.x.r).replace('.', ',') : '0')); clic(q(w, '[data-test=tabla-revisar]')); if (modo !== 'bien') clic(q(w, '[data-test=tabla-revisar]')); }
  if (t === 'detective') { const cl = (s.lineas.flatMap((l, i) => l.map((p, j) => ({ p, k: i + ',' + j }))).filter(x => !x.p.fijo)); const mk = x => clic(q(w, `[data-test=det-seg][data-k="${x.k}"]`)); if (modo === 'bien') { cl.filter(x => x.p.s).forEach(mk); clic(q(w, '[data-test=det-revisar]')); } else { mk(cl.find(x => !x.p.s)); clic(q(w, '[data-test=det-revisar]')); clic(q(w, '[data-test=det-revisar]')); } }
  if (t === 'minijuego') { for (let r = 0; r < s.rondas.length; r++) { const R = s.rondas[r], i = modo === 'bien' ? R.ok : (R.ok + 1) % R.ops.length; clic(q(w, `[data-test=mj-op][data-i="${i}"]`)); await sleep(60); } }
  if (t === 'quiz' || t === 'evalFinal') { for (let n = 0; n < s.preguntas.length; n++) { const c = api.opcionCorrectaActual(); if (!c) break; const ops = qa(w, '[data-test=opcion]'); const el = modo === 'bien' ? ops.find(o => o.dataset.op === c.id) : ops.find(o => o.dataset.op !== c.id); clic(el); cerrarModal(w); await sleep(75); } }
  if (ACTIVIDADES.includes(t) && !['tf', 'fill', 'drag', 'minijuego', ...NUEVOS27].includes(t)) { await esperaHabil(w, 100); if (!habil(w)) { await sleep(520); const b = q(w, '#rescate-wrap button'); if (b) { clic(b); notas.push('«' + t + '» solo se probó con rescate'); } } }
  return esperaHabil(w);
}

// v27: actividades nuevas (cuadrícula, recta, comparar, podio, abierta, cuaderno) jugadas con clics reales
async function jugarNuevo27(w, s, t, modo) {
  const sel = (a, i, extra = '') => q(w, `[data-test=${a}][data-i="${i}"]${extra}`), ver = i => clic(sel('verificar-item', i));
  if (t === 'abierta') { qa(w, '[data-test=abierta-txt]').forEach(x => { x.value = 'Respondo con mis propias palabras escribiendo bastantes palabras aqui'; x.dispatchEvent(new w.Event('input', { bubbles: true })); }); clic(q(w, '[data-test=abierta-guardar]')); return; }
  if (t === 'cuaderno') { const c = q(w, '[data-test=cuaderno-ok]'); c.checked = true; c.dispatchEvent(new w.Event('change', { bubbles: true })); return; }
  for (let i = 0; i < s.items.length; i++) {
    const x = s.items[i], bien = modo === 'bien';
    if (t === 'cuadricula') { const n = bien ? x.objetivo : 1; for (let c = 0; c < n; c++) clic(sel('cuad-celda', i, `[data-c="${c}"]`)); }
    if (t === 'fraccion') { const n = bien ? x.objetivo : (x.objetivo === 1 ? 2 : 1); for (let c = 0; c < n; c++) clic(sel('frac-parte', i, `[data-c="${c}"]`)); }
    if (t === 'recta') { const p = x.paso || 0.1, d = x.divisiones || 10, ok = Math.round((x.valor - (x.inicio || 0)) / p); clic(sel('marca', i, `[data-m="${bien ? ok : (ok + 1) % (d + 1)}"]`)); }
    if (t === 'comparar') { const a = val27(x.a), b = val27(x.b), real = Math.abs(a - b) < 1e-9 ? '=' : a < b ? '<' : '>'; clic(sel('cmp', i, `[data-v="${bien ? real : (real === '<' ? '>' : '<')}"]`)); }
    if (t === 'podio') { const e = sel('puesto', i); e.value = String(bien ? x.puesto : (x.puesto % s.items.length) + 1); e.dispatchEvent(new w.Event('change', { bubbles: true })); }
    ver(i);
    if (!bien) { const b2 = q(w, `[data-test=verificar-item][data-i="${i}"]`); if (b2) clic(b2); }   // 2.º intento: se resuelve solo
  }
}
const sel0 = (w, a, i, c) => q(w, `[data-test=${a}][data-i="${i}"][data-c="${c}"]`);

// v28: juegos (enlazar, ordenar, memoria, relámpago, sopa, candado) con clics reales. «bien» los resuelve; «mal» falla y sale por «No me sale».
async function jugarNuevo28(w, s, t, modo) {
  const bien = modo === 'bien', c = sel => { const e = q(w, sel); if (e) clic(e); };
  if (t === 'enlazar') for (let i = 0; i < s.pares.length; i++) { c(`[data-test=enl-izq][data-i="${i}"]`); c(`[data-test=enl-der][data-k="${bien ? i : (i + 1) % s.pares.length}"]`); if (!bien) break; }
  if (t === 'ordenar') { if (bien) for (let p = 0; p < s.items.length; p++) { const cur = qa(w, '[data-test=ord-item]').map(e => +e.dataset.k); if (cur[p] !== p) { c(`[data-test=ord-item][data-k="${p}"]`); c(`[data-test=ord-item][data-p="${p}"]`); } } c('[data-test=ord-comprobar]'); }
  if (t === 'memoria') { const n = s.pares.length; if (bien) for (let p = 0; p < n; p++) { c(`[data-test=mem-carta][data-p="${p}"][data-l="a"]`); c(`[data-test=mem-carta][data-p="${p}"][data-l="b"]`); } else { c('[data-test=mem-carta][data-p="0"][data-l="a"]'); c('[data-test=mem-carta][data-p="1"][data-l="b"]'); } }
  if (t === 'relampago') for (let i = 0; i < s.items.length + 1; i++) { if (!q(w, '[data-test=rel-op]')) break; c(`[data-test=rel-op][data-k="${bien ? s.items[i].correcta : 1 - s.items[i].correcta}"]`); c('[data-test=rel-sig]'); }
  if (t === 'sopa') { if (bien) { const pos = w.V28.sopa(s).pos; for (const k of Object.keys(pos)) { const [r, cc, dr, dc, L] = pos[k]; c(`[data-test=sopa-celda][data-r="${r}"][data-c="${cc}"]`); c(`[data-test=sopa-celda][data-r="${r + dr * (L - 1)}"][data-c="${cc + dc * (L - 1)}"]`); } } else { c('[data-test=sopa-celda][data-r="0"][data-c="0"]'); c('[data-test=sopa-celda][data-r="0"][data-c="1"]'); } }
  if (t === 'candado') { s.acertijos.forEach((a, j) => c(`[data-test=cand-op][data-j="${j}"][data-o="${bien ? a.ok : (a.ok + 1) % a.ops.length}"]`)); if (bien) { s.acertijos.forEach(a => c(`[data-test=cand-tecla][data-d="${a.digito}"]`)); c('[data-test=cand-abrir]'); } }
}
const notas = [];
async function recorrer(w, modo, tope = 40) { let n = 0; const vistos = []; while (tipo(w) !== 'final' && n++ < tope) { const t = tipo(w); const h = await jugarSlide(w, modo); vistos.push(t + (h ? '' : '✗')); if (!h) return { ok: false, vistos, trabado: t }; clic(next(w)); } return { ok: tipo(w) === 'final', vistos }; }

(async () => {
  const base = abrir({ est: 'sonda' }).window, API0 = base.CLASE_API, SL0 = API0.SL, claseId = API0.claseId, semana = API0.semana;
  const iQuiz = idxEvaluables(base), iAct = SL0.findIndex(x => ACTIVIDADES.includes(x.type));
  const iDrag = SL0.findIndex(x => ACTIVIDADES.includes(x.type)), iFinal = SL0.length - 1;
  const NQ = SL0.filter(x => ['quiz', 'evalFinal'].includes(x.type)).reduce((a, x) => a + x.preguntas.length, 0), NQ1 = SL0[iQuiz[0]].preguntas.length, paso = 5 / NQ;
  base.close();
  console.log(`Clase: ${claseId} · ${SL0.length} slides · ${NQ} preguntas evaluables · motor ${API0.MOTOR_VERSION || '?'}`);

  T('T10 · Responder todo mal NUNCA bloquea (recorrido completo hasta la pantalla final)');
  { const w = abrir().window; const r = await recorrer(w, 'mal');
    ok(r.ok, 'llega a la pantalla final respondiendo mal (' + r.vistos.join(' → ') + ')' + (r.trabado ? ' · TRABADO en ' + r.trabado : ''));
    ok(w.CLASE_API.estado().aciertos === 0 && hud(w) === '0.0', 'la nota refleja los errores: 0 aciertos y HUD ' + hud(w));
    ok(w.CLASE_API.ERRORES.length === 0, 'cero errores de JavaScript en todo el recorrido' + (w.CLASE_API.ERRORES.length ? ': ' + w.CLASE_API.ERRORES[0] : '')); notas.forEach(n => console.log('  ℹ️ ', n)); w.close(); }

  T('T10b · Responder todo bien también llega al final con nota 5.0');
  { const w = abrir({ est: 'bruno' }).window; const r = await recorrer(w, 'bien'); ok(r.ok, 'llega al final (' + r.vistos.length + ' slides)');
    ok(q(w, '[data-test=final-nota]').textContent.includes('5.0'), 'nota oficial 5.0 en la pantalla final: «' + q(w, '[data-test=final-nota]').textContent.trim() + '»'); ok(!q(w, '[data-test=reintentar]'), 'con 5.0 no ofrece practicar de nuevo'); w.close(); }

  T('T11 · «No me sale»: a los 25 s (0,4 s en la prueba) toda actividad sin nota ofrece salida; en quiz no existe');
  if (iDrag < 0) console.log('  ⚠️  la clase no tiene actividades sin nota: no aplica');
  else { const w = abrir({ est: 'carla' }).window; w.CLASE_API.irA(iDrag); const tp = tipo(w);
    ok(!habil(w), `${tp} sin tocar: «Siguiente» apagado`); ok(q(w, '#razon-bloqueo').textContent.length > 8, 'dice por qué: «' + q(w, '#razon-bloqueo').textContent + '»');
    await sleep(520); const b = q(w, '#rescate-wrap button'); ok(!!b, 'aparece el botón «No me sale»');
    if (b) { clic(b); ok(habil(w), 'al usarlo «Siguiente» se habilita'); ok(w.CLASE_API.actividadesConAyuda() === 1, 'queda registrado como «con ayuda»'); ok(/Ya puedes continuar/.test(q(w, '#razon-bloqueo').textContent), 'la razón pasa a «Ya puedes continuar»'); }
    w.CLASE_API.irA(iQuiz[0]); await sleep(560); ok(!q(w, '#rescate-wrap button') && !habil(w), 'en el quiz NO hay botón de rescate y «Siguiente» sigue apagado hasta responder'); w.close(); }

  T('T12 · Quiz: responder mal avanza y la retroalimentación dice la correcta y en qué falló');
  { const w = abrir({ est: 'dario' }).window; w.CLASE_API.irA(iQuiz[0]); const sid = SL0[iQuiz[0]].id;
    const c = w.CLASE_API.opcionCorrectaActual(), mala = qa(w, '[data-test=opcion]').find(o => o.dataset.op !== c.id); clic(mala); const m = q(w, '#modal-cuerpo').textContent;
    ok(!q(w, '#modal').hidden, 'se muestra la retroalimentación'); ok(/Tu respuesta/.test(m) && /La correcta/.test(m), 'muestra tu respuesta y la correcta'); ok(/En qué te equivocaste/.test(m), 'explica en qué se equivocó');
    ok(/Así se resuelve/.test(m), 'explica cómo se resuelve'); ok(/Nota de este intento/.test(m), 'muestra la nota del intento'); ok(!/incorrecto|fallaste|\bmal\b/i.test(m), 'lenguaje de crecimiento: sin «incorrecto/fallaste/mal»');
    ok((w.CLASE_API.estado().acts['quiz_idx_' + sid] || 0) === 1, 'el índice avanzó en el mismo clic (no depende de cerrar el modal)');
    await sleep(75); clic(q(w, '[data-test=opcion]')); ok(w.CLASE_API.estado().acts['quiz_resps_' + sid].length === 2, 'se puede responder la siguiente con el modal aún abierto en pantalla'); w.close(); }

  T('T16b · Doble toque rápido en el mismo lugar cuenta UNA sola respuesta (no contesta la pregunta siguiente por accidente)');
  { const w = abrir({ est: 'eva' }).window, sid = SL0[iQuiz[0]].id; w.CLASE_API.irA(iQuiz[0]); clic(qa(w, '[data-test=opcion]')[0]); clic(qa(w, '[data-test=opcion]')[0]);
    ok(w.CLASE_API.estado().acts['quiz_resps_' + sid].length === 1, 'una respuesta registrada, no dos (' + w.CLASE_API.estado().acts['quiz_resps_' + sid].length + ')');
    await sleep(80); cerrarModal(w); clic(qa(w, '[data-test=opcion]')[0]); ok(w.CLASE_API.estado().acts['quiz_resps_' + sid].length === 2, 'pasado el instante, la siguiente respuesta sí cuenta'); w.close(); }

  T('T13 · La nota se ve subir en vivo, también tras gastar una oportunidad');
  { const w = abrir({ est: 'fabio' }).window, resp = async (modo) => { const c = w.CLASE_API.opcionCorrectaActual(), ops = qa(w, '[data-test=opcion]'); clic(modo ? ops.find(o => o.dataset.op === c.id) : ops.find(o => o.dataset.op !== c.id)); cerrarModal(w); await sleep(75); };
    w.CLASE_API.irA(iQuiz[0]); const lect = [], esp = []; const k = Math.min(4, NQ1);
    for (let i = 1; i <= k; i++) { await resp(true); lect.push(hud(w)); esp.push((i * paso).toFixed(1)); }
    ok(lect.join() === esp.join(), `cada acierto sube el HUD en vivo: ${lect.join(' → ')} (esperado ${esp.join(' → ')})`);
    for (let i = k; i < NQ1; i++) await resp(false); for (const j of iQuiz.slice(1)) { w.CLASE_API.irA(j); for (let n = 0; n < SL0[j].preguntas.length; n++) await resp(n === 0); }
    const aciertos1 = k + (iQuiz.length > 1 ? 1 : 0), mejor = w.CLASE_API.notaOficial(); ok(Math.abs(mejor - aciertos1 * paso) < 0.01, `primer intento: ${aciertos1} de ${NQ} → nota oficial ${(aciertos1 * paso).toFixed(2)} (${mejor.toFixed(2)})`);
    w.CLASE_API.irA(iFinal); clic(q(w, '[data-test=reintentar]')); ok(!q(w, '#modal').hidden, 'pide confirmación antes de gastar la oportunidad'); clic(q(w, '[data-test=confirmar-reintento]'));
    ok(hud(w) === '0.0' && tipo(w) === SL0[iQuiz[0]].type, 'reintento: el HUD arranca en 0.0 y vuelve al quiz'); ok(new RegExp('Mejor nota: ' + mejor.toFixed(1).replace('.', '\\.')).test(q(w, '#nota-intento-hud').textContent), `aparte se ve «Mejor nota: ${mejor.toFixed(1)} (es la que cuenta)»`);
    ok(qa(w, '#vidas-hud img').filter(i => /usada/.test(i.alt)).length === 1, 'las oportunidades muestran 1 usada');
    const l2 = []; for (let i = 0; i < 3; i++) { await resp(true); l2.push(hud(w)); }
    ok(parseFloat(l2[0]) > 0 && parseFloat(l2[0]) < parseFloat(l2[1]) && parseFloat(l2[1]) < parseFloat(l2[2]), 'tras gastar una oportunidad cada acierto mueve el número (aunque esté por debajo de la mejor): ' + l2.join(' → '));
    ok(Math.abs(w.CLASE_API.notaOficial() - mejor) < 0.01, 'la nota OFICIAL sigue en ' + mejor.toFixed(1) + ' mientras no la supere'); w.close(); }

  T('T19 · Máximo 2 oportunidades de práctica y la mejor nota nunca baja');
  { const w = abrir({ est: 'gina' }).window; await recorrer(w, 'mal'); ok(w.CLASE_API.notaOficial() === 0, 'intento 1 todo mal: nota 0.0');
    const reint = async (primero) => { clic(q(w, '[data-test=reintentar]')); clic(q(w, '[data-test=confirmar-reintento]')); let n = 0; while (tipo(w) !== 'final' && n++ < 10) { await jugarSlide(w, primero && tipo(w) && n === 1 ? 'bien' : 'mal'); clic(next(w)); } };
    await reint(true); const n1 = NQ1 * paso; ok(tipo(w) === 'final' && Math.abs(w.CLASE_API.notaOficial() - n1) < 0.01, `oportunidad 1: acierta el primer quiz → nota oficial ${n1.toFixed(2)} (${w.CLASE_API.notaOficial().toFixed(2)})`);
    ok(!!q(w, '[data-test=reintentar]'), 'le queda 1 oportunidad: el botón sigue disponible'); await reint(false);
    ok(tipo(w) === 'final' && Math.abs(w.CLASE_API.notaOficial() - n1) < 0.01, `oportunidad 2 toda mal: la nota oficial NO baja (sigue ${n1.toFixed(2)})`);
    ok(!q(w, '[data-test=reintentar]'), 'con 2 oportunidades gastadas ya no se ofrece una tercera'); ok(w.CLASE_API.estado().vidasUsadas === 2 && w.CLASE_API.estado().intentos === 3, 'vidasUsadas = 2, intentos = 3'); ok(w.CLASE_API.ERRORES.length === 0, 'sin errores de JavaScript'); w.close(); }

  T('T14 · Primera apertura en cero (sin heredar), guardado inmediato y retomar donde iba');
  { const sk = `aula:${claseId}:501:hugo`, sid = SL0[iQuiz[0]].id;
    let d = abrir({ est: 'hugo', storage: { [sk]: JSON.stringify({ slide: 3, acts: {}, mejorNota: 4.5, aciertos: 9, intentos: 2, xp: 400 }) } }), w = d.window;
    ok(hud(w) === '0.0' && w.CLASE_API.estado().slide === 0 && w.CLASE_API.estado().xp === 0, 'sesión SIN sello (nota 4.5): se ignora y la clase abre en 0.0 / slide 1'); w.close();
    d = abrir({ est: 'hugo', storage: { [sk]: JSON.stringify({ studentId: 'hugo', grupo: '501', semana: semana + 1, claseId, slide: 3, acts: {}, mejorNota: 4.5 }) } }); ok(hud(d.window) === '0.0' && d.window.CLASE_API.estado().slide === 0, 'sesión sellada de OTRA semana: se ignora'); d.window.close();
    d = abrir({ est: 'hugo', storage: { [sk]: JSON.stringify({ studentId: 'hugo', grupo: '777', semana, claseId, slide: 3, acts: {}, mejorNota: 4.5 }) } }); ok(hud(d.window) === '0.0', 'sesión sellada de OTRO grupo: se ignora'); d.window.close();
    d = abrir({ est: 'hugo' }); w = d.window; w.CLASE_API.irA(iQuiz[0]); const k = Math.min(3, NQ1 - 1); for (let i = 0; i < k; i++) { const c = w.CLASE_API.opcionCorrectaActual(); clic(qa(w, '[data-test=opcion]').find(o => o.dataset.op === c.id)); cerrarModal(w); await sleep(75); }
    const antes = { h: hud(w), e: w.CLASE_API.estado() }, almacenado = snap(w); w.close();
    const w2 = abrir({ est: 'hugo', storage: almacenado }).window, e2 = w2.CLASE_API.estado();
    ok(e2.slide === antes.e.slide && e2.acts['quiz_idx_' + sid] === k, `al reabrir vuelve al MISMO slide y a la MISMA pregunta (slide ${e2.slide + 1}, pregunta ${e2.acts['quiz_idx_' + sid] + 1})`); ok(hud(w2) === antes.h && e2.aciertos === k, `conserva la nota (${hud(w2)}) y los aciertos`);
    const ent = Object.values(JSON.parse(almacenado['aula_progreso_v2']))[0];
    ok(ent.slideActual === iQuiz[0] + 1 && ent.totalSlides === SL0.length, `el index recibe «Slide ${ent.slideActual} de ${ent.totalSlides}»`); ok(ent.preguntasRespondidas === k && ent.totalPreguntas === NQ && ent.version === 2 && ent.completada === false, `el index recibe preguntas (${k}/${NQ}), version 2 y completada=false`);
    ok(typeof ent.nota === 'number' && typeof ent.mejorNota === 'number', 'el index recibe nota y mejor nota'); w2.close(); }

  T('T15 · Si no se puede guardar, el estudiante lo ve');
  { const w = abrir({ est: 'ivan', rompeStorage: true }).window; for (let i = 0; i < 3; i++) w.CLASE_API.irA(Math.min(i + 1, iFinal));
    ok(q(w, '#aviso-guardado').style.display === 'block' && /No se pudo guardar/.test(q(w, '#aviso-guardado').textContent), 'aparece «No se pudo guardar…» tras 2 fallos seguidos'); w.close(); }

  T('T17 · Generadores paramétricos: siempre UNA correcta, datos coherentes, determinista');
  { const w = abrir({ est: 'juan' }).window, G = w.CLASE_API, gens = Object.keys(G.GENERADORES), bad = []; const num = x => parseFloat(String(x).replace(',', '.'));
    if (!gens.length) console.log('  ⚠️  la clase no define generadores: no aplica');
    for (const g of gens) for (let seed = 1; seed <= 400; seed++) { const a = G.GENERAR(g, seed), b = G.GENERAR(g, seed), cor = a.opciones.filter(o => o.correcta), tx = a.opciones.map(o => o.texto);
      if (JSON.stringify(a) !== JSON.stringify(b)) bad.push(g + ' no determinista ' + seed); if (cor.length !== 1) bad.push(g + ' ' + seed + ': ' + cor.length + ' correctas'); if (new Set(tx).size !== tx.length) bad.push(g + ' ' + seed + ': opciones repetidas');
      if (a.opciones.some(o => !o.correcta && !o.porQue)) bad.push(g + ' ' + seed + ': falta porQue');
      if (g === 'comparar' && num(cor[0].texto) !== Math.max(...tx.map(num))) bad.push('comparar ' + seed + ': la correcta no es el mayor');
      if (g === 'suma') { const m = a.enunciado.match(/Calcula ([\d,]+) \+ ([\d,]+)/); if (m && Math.abs(num(cor[0].texto) - Math.round((num(m[1]) + num(m[2])) * 100) / 100) > 1e-9) bad.push('suma ' + seed + ': ' + m[1] + '+' + m[2] + '≠' + cor[0].texto); } }
    if (gens.length) ok(bad.length === 0, `${gens.length * 400} preguntas generadas válidas` + (bad.length ? ' · fallos: ' + bad.slice(0, 3).join(' | ') : '')); w.close(); }

  T('T18 · Todo onclick="" del HTML apunta a una función que existe');
  { const w = abrir({ est: 'kira' }).window, faltan = []; w.CLASE_API.irA(iQuiz[0]); clic(qa(w, '[data-test=opcion]')[0]);
    const revisar = () => qa(w, '[onclick]').forEach(e => { const m = e.getAttribute('onclick').match(/^\s*([A-Za-z_$][\w$]*)\s*\(/); if (m && typeof w[m[1]] !== 'function') faltan.push(m[1]); }); revisar();
    if (iDrag >= 0) { w.CLASE_API.irA(iDrag); await sleep(520); revisar(); } ok(faltan.length === 0, 'funciones de los onclick existen' + (faltan.length ? ': faltan ' + [...new Set(faltan)].join(', ') : '')); w.close(); }

  T('T20 · Efectos: el fallo es suave; «reducir movimiento» apaga las partículas');
  { let w = abrir({ est: 'lia' }).window; w.CLASE_API.irA(iQuiz[0]); let c = w.CLASE_API.opcionCorrectaActual();
    clic(qa(w, '[data-test=opcion]').find(o => o.dataset.op !== c.id)); ok(qa(w, '.fx-chispa').length === 0, 'fallo: sin partículas'); cerrarModal(w);
    await sleep(900); c = w.CLASE_API.opcionCorrectaActual(); clic(qa(w, '[data-test=opcion]').find(o => o.dataset.op === c.id)); ok(qa(w, '.fx-chispa').length > 0, 'acierto: hay destello de partículas'); w.close();
    w = abrir({ est: 'lia2', test: { sinMovimiento: true } }).window; w.CLASE_API.irA(iQuiz[0]); c = w.CLASE_API.opcionCorrectaActual(); clic(qa(w, '[data-test=opcion]').find(o => o.dataset.op === c.id)); ok(qa(w, '.fx-chispa').length === 0, 'con «reducir movimiento»: acierto SIN partículas'); w.close(); }

  T('T21 · Accesibilidad básica del DOM (todos los slides)');
  { const w = abrir({ est: 'mara' }).window, malos = []; const rev = () => { qa(w, 'button').forEach(b => { if (!(b.textContent.trim() || b.getAttribute('aria-label'))) malos.push('botón sin nombre'); }); qa(w, 'img').forEach(i => { if (!i.hasAttribute('alt')) malos.push('img sin alt'); }); qa(w, 'input').forEach(i => { if (!i.getAttribute('aria-label')) malos.push('input sin etiqueta'); }); };
    SL0.forEach((_, i) => { w.CLASE_API.irA(i); rev(); }); ok(w.document.documentElement.lang === 'es', 'html lang="es"'); ok(!!q(w, 'meta[name=viewport]'), 'meta viewport'); ok(malos.length === 0, 'botones, imágenes e inputs con nombre/alt' + (malos.length ? ': ' + [...new Set(malos)].join(', ') : '')); w.close(); }

  T('T22 · Cada slide bloqueado explica por qué (nunca un botón gris mudo)');
  { const w = abrir({ est: 'nico' }).window, mudos = []; SL0.forEach((s, i) => { w.CLASE_API.irA(i); if (!habil(w) && q(w, '#razon-bloqueo').textContent.trim().length < 8) mudos.push(s.type); });
    ok(mudos.length === 0, 'todo slide bloqueado tiene #razon-bloqueo' + (mudos.length ? ': mudos ' + mudos.join(',') : '')); w.close(); }

  T('T23 · Actividades v27: 2 intentos por punto, pista, medio punto y «Ahora tú»');
  { const iC = SL0.findIndex(x => x.type === 'cuadricula'), iA = SL0.findIndex(x => x.type === 'abierta'), iR = SL0.findIndex(x => x.type === 'recta');
    if (iC < 0) console.log('  ⚠️  la clase no usa actividades v27: no aplica');
    else { const w = abrir({ est: 'olga' }).window, API = w.CLASE_API, sc = SL0[iC]; API.irA(iC);
      const fb = i => q(w, `.v27-it[data-i="${i}"] [data-test=item-fb]`).textContent, vacio = () => clic(q(w, '[data-test=verificar-item][data-i="0"]'));
      ok(sc.ejemplo ? !!q(w, '[data-test=ejemplo]') : true, 'si la actividad trae «ejemplo», se muestra el ejemplo resuelto con «Ahora tú»');
      vacio(); ok(fb(0) === '', 'verificar sin responder no gasta intento');
      clic(sel0(w, 'cuad-celda', 0, 0)); clic(q(w, '[data-test=verificar-item][data-i="0"]'));
      ok(/te queda 1 intento/.test(fb(0)), '1.er error: avisa que queda 1 intento (sin la palabra «incorrecto»)');
      clic(q(w, '[data-test=pista-item][data-i="0"]')); ok(!!q(w, '.v27-it[data-i="0"] [data-test=pista-txt]'), 'el botón 💡 Pista muestra la pista del punto');
      for (let c = 1; c < sc.items[0].objetivo; c++) clic(sel0(w, 'cuad-celda', 0, c)); clic(q(w, '[data-test=verificar-item][data-i="0"]'));
      ok(/2\.º intento/.test(fb(0)), 'acertar en el 2.º intento queda reconocido (medio punto)');
      clic(sel0(w, 'cuad-celda', 1, 0)); clic(q(w, '[data-test=verificar-item][data-i="1"]')); clic(q(w, '[data-test=verificar-item][data-i="1"]'));
      ok(/Así se resuelve/.test(fb(1)), '2 errores: muestra cómo se resuelve y sigue');
      for (let i = 2; i < sc.items.length; i++) { for (let c = 0; c < sc.items[i].objetivo; c++) clic(sel0(w, 'cuad-celda', i, c)); clic(q(w, `[data-test=verificar-item][data-i="${i}"]`)); }
      ok(habil(w), 'al resolver todos los puntos se habilita «Siguiente»');
      const guard = JSON.parse(w.localStorage.getItem(API.SKEY)); const pts = guard.acts['pts_' + sc.id];
      ok(Math.abs(pts - (0.5 + 0 + (sc.items.length - 2))) < 1e-9, 'puntos guardados para el docente: 0,5 + 0 + ' + (sc.items.length - 2) + ' = ' + pts);
      ok(API.estado().aciertos === 0 && hud(w) === '0.0', 'estas actividades NO tocan la nota del quiz (HUD ' + hud(w) + ')');
      if (iA >= 0) { API.irA(iA); const need = SL0[iA].minPalabras || 5; clic(q(w, '[data-test=abierta-guardar]')); ok(!habil(w), 'abierta: con respuestas vacías no se guarda ni avanza');
        qa(w, '[data-test=abierta-txt]').forEach(x => { x.value = 'una dos'; x.dispatchEvent(new w.Event('input', { bubbles: true })); }); clic(q(w, '[data-test=abierta-guardar]')); ok(!habil(w), 'abierta: con menos de ' + need + ' palabras no avanza');
        qa(w, '[data-test=abierta-txt]').forEach(x => { x.value = 'palabra '.repeat(need); x.dispatchEvent(new w.Event('input', { bubbles: true })); }); clic(q(w, '[data-test=abierta-guardar]')); ok(habil(w), 'abierta: con las palabras mínimas guarda y avanza'); }
      if (iR >= 0) { API.irA(iR); await sleep(520); ok(!habil(w) && !!q(w, '#rescate-wrap button'), 'recta: sin responder aparece «No me sale» y Siguiente sigue apagado'); }
      w.close(); } }

  T('T24 · Juegos v28: enlazar, ordenar, memoria, relámpago, sopa y candado (reglas, rescate y sin tocar la nota)');
  { const hay = NUEVOS28.some(x => SL0.some(y => y.type === x)); if (!hay) console.log('  ⚠️  la clase no usa juegos v28: no aplica');
    else { const w = abrir({ est: 'olga' }).window, API = w.CLASE_API, idx = t => SL0.findIndex(x => x.type === t), c = sel => { const e = q(w, sel); if (e) clic(e); }, txt = sel => (q(w, sel) || { textContent: '' }).textContent;
      let i;
      if ((i = idx('enlazar')) >= 0) { API.irA(i); const n = SL0[i].pares.length; c('[data-test=enl-izq][data-i="0"]'); c('[data-test=enl-der][data-k="1"]'); ok(/no van juntas/.test(txt('[data-test=enl-fb]')) && !habil(w), 'enlazar: una pareja equivocada avisa «casi» y no completa');
        c('[data-test=enl-izq][data-i="0"]'); c('[data-test=enl-der][data-k="0"]'); await sleep(40); ok(!!q(w, '#v28-svg line'), 'enlazar: la pareja acertada dibuja su línea');
        for (let k = 1; k < n; k++) { c(`[data-test=enl-izq][data-i="${k}"]`); c(`[data-test=enl-der][data-k="${k}"]`); } ok(habil(w), 'enlazar: con todas las parejas se habilita «Siguiente»'); }
      if ((i = idx('ordenar')) >= 0) { API.irA(i); c('[data-test=ord-comprobar]'); ok(/en su lugar/.test(txt('[data-test=ord-fb]')) && !habil(w), 'ordenar: desordenado muestra «x de n en su lugar» y no completa');
        const n = SL0[i].items.length; for (let p = 0; p < n; p++) { const cur = qa(w, '[data-test=ord-item]').map(e => +e.dataset.k); if (cur[p] !== p) { c(`[data-test=ord-item][data-k="${p}"]`); c(`[data-test=ord-item][data-p="${p}"]`); } } c('[data-test=ord-comprobar]'); ok(habil(w), 'ordenar: en el orden correcto completa'); }
      if ((i = idx('memoria')) >= 0) { API.irA(i); c('[data-test=mem-carta][data-p="0"][data-l="a"]'); c('[data-test=mem-carta][data-p="1"][data-l="b"]'); ok(/No son pareja/.test(txt('[data-test=mem-fb]')), 'memoria: dos cartas distintas avisan que no son pareja');
        await sleep(1000); ok(qa(w, '[data-test=mem-carta]').filter(e => e.textContent === '❓').length === 2 * SL0[i].pares.length, 'memoria: las cartas fallidas se voltean de nuevo');
        const n = SL0[i].pares.length; for (let p = 0; p < n; p++) { c(`[data-test=mem-carta][data-p="${p}"][data-l="a"]`); c(`[data-test=mem-carta][data-p="${p}"][data-l="b"]`); } ok(habil(w) && /Todas las parejas/.test(txt('[data-test=mem-fb]')), 'memoria: con todas las parejas completa y da estrellas'); }
      if ((i = idx('relampago')) >= 0) { const s = API.SL[i]; s.segundos = 0.15; API.irA(i); await sleep(400); ok(/Se acabó el tiempo/.test(txt('[data-test=rel-fb]')), 'relámpago: si se acaba el tiempo cuenta como fallo y muestra la respuesta'); s.segundos = 8;
        c('[data-test=rel-sig]'); const v = txt('[data-test=rel-vidas]'); ok((v.match(/❤️/g) || []).length === (s.vidas || 3) - 1, 'relámpago: el tiempo agotado resta una vida');
        c('[data-test=rel-op][data-k="' + s.items[1].correcta + '"]'); ok(/¡Eso!/.test(txt('[data-test=rel-fb]')), 'relámpago: acertar da «¡Eso!»'); ok(!!q(w, '[data-accion=v28-rel-reloj]'), 'relámpago: existe el interruptor «Jugar sin reloj» (accesibilidad)');
        for (let k = 2; k <= s.items.length + 1; k++) { c('[data-test=rel-sig]'); if (!q(w, '[data-test=rel-op]')) break; c('[data-test=rel-op][data-k="' + (1 - s.items[Math.min(k, s.items.length - 1)].correcta) + '"]'); } c('[data-test=rel-sig]');
        ok(!!q(w, '[data-test=rel-fin]') && habil(w), 'relámpago: sin vidas o sin frases termina la ronda y deja continuar (aunque falle)'); }
      if ((i = idx('sopa')) >= 0) { API.irA(i); const s = SL0[i], A = w.V28.sopa(s), B = w.V28.sopa(s); ok(JSON.stringify(A) === JSON.stringify(B), 'sopa: la cuadrícula es la misma cada vez (se puede guardar y continuar)');
        ok(Object.keys(A.pos).length === s.palabras.length, 'sopa: todas las palabras quedaron escondidas');
        c('[data-test=sopa-celda][data-r="0"][data-c="0"]'); c('[data-test=sopa-celda][data-r="0"][data-c="0"]'); const k0 = Object.keys(A.pos)[0], [r, cc, dr, dc, L] = A.pos[k0];
        c(`[data-test=sopa-celda][data-r="${r}"][data-c="${cc}"]`); c(`[data-test=sopa-celda][data-r="${r + dr * (L - 1)}"][data-c="${cc + dc * (L - 1)}"]`); ok(txt('[data-test=sopa-fb]').includes(k0) && qa(w, '.hall').length === L, 'sopa: marcar primera y última letra de una palabra la encuentra');
        for (const k of Object.keys(A.pos).slice(1)) { const [r1, c1, d1, e1, L1] = A.pos[k]; c(`[data-test=sopa-celda][data-r="${r1}"][data-c="${c1}"]`); c(`[data-test=sopa-celda][data-r="${r1 + d1 * (L1 - 1)}"][data-c="${c1 + e1 * (L1 - 1)}"]`); } ok(habil(w), 'sopa: con todas las palabras completa'); }
      if ((i = idx('candado')) >= 0) { API.irA(i); const s = SL0[i]; c('[data-test=cand-abrir]'); ok(/Primero resuelve/.test(txt('[data-test=cand-fb]')), 'candado: sin los dígitos no abre y explica por qué');
        s.acertijos.forEach((a, j) => { c(`[data-test=cand-op][data-j="${j}"][data-o="${(a.ok + 1) % a.ops.length}"]`); c(`[data-test=cand-op][data-j="${j}"][data-o="${a.ok}"]`); }); ok(qa(w, '[data-test=cand-digito]').length === s.acertijos.length, 'candado: cada acertijo correcto revela su dígito (el error no bloquea)');
        c('[data-test=cand-tecla][data-d="0"]'); c('[data-test=cand-tecla][data-d="0"]'); c('[data-test=cand-tecla][data-d="0"]'); c('[data-test=cand-abrir]'); ok(/no abre/.test(txt('[data-test=cand-fb]')) && !habil(w), 'candado: un código equivocado no abre y se puede reintentar');
        s.acertijos.forEach(a => c(`[data-test=cand-tecla][data-d="${a.digito}"]`)); c('[data-test=cand-abrir]'); ok(!!q(w, '[data-test=cand-tesoro]') && habil(w), 'candado: el código correcto abre y muestra el tesoro'); }
      ok(API.estado().aciertos === 0 && hud(w) === '0.0', 'los juegos NO tocan la nota del quiz (HUD ' + hud(w) + ')');
      w.close(); } }

  T('T25 · Bienvenida de ESTA clase, mapa de misión y pantalla final de celebración (v29)');
  { const w = abrir({ est: 'olga', sinIntro: false }).window, API = w.CLASE_API, meta = API.SL ? null : null, M = JSON.parse(w.document.getElementById('datos-clase').textContent).meta;
    const h1 = w.document.querySelector('#fx-intro h1'); ok(!h1 || h1.textContent.trim() === M.titulo.trim(), 'la bienvenida muestra el título de ESTA clase («' + (h1 ? h1.textContent.trim() : '—') + '»), no el de la plantilla');
    ok(w.document.title.includes(M.titulo.slice(0, 20)), 'la pestaña del navegador dice «' + w.document.title + '»');
    const ruta = () => qa(w, '#v29-ruta .n'); ok(ruta().length === SL0.length, 'el mapa de misión tiene un nodo por slide (' + ruta().length + ')');
    ok(ruta().filter(x => x.classList.contains('ya')).length === 1, 'exactamente un nodo marca dónde estás');
    API.irA(3); ok(ruta().filter(x => x.classList.contains('ok')).length === 3 && ruta()[3].classList.contains('ya'), 'al avanzar: 3 nodos ✔ y el 4.º resaltado');
    ok(!!q(w, '#v29-ruta[aria-label]') && ruta().every(x => x.getAttribute('aria-hidden') === 'true'), 'el mapa es accesible (un solo aria-label, nodos decorativos)');
    const iF = SL0.findIndex(x => x.type === 'final'); API.irA(iF);
    ok(!!q(w, '[data-test=celebracion]') && !!q(w, '[data-test=medalla]'), 'la pantalla final muestra celebración y medalla');
    ok(/data:image/.test(q(w, '[data-test=medalla]').src), 'la medalla viene empaquetada (funciona sin internet)');
    ok(/⭐/.test(q(w, '[data-test=estrellas]').textContent), 'siempre hay al menos 1 estrella (nadie termina con las manos vacías)');
    const nAct = SL0.filter(x => ['tf', 'fill', 'drag', 'minijuego', ...NUEVOS27, ...NUEVOS28, ...NUEVOS31].includes(x.type)).length; ok(new RegExp('de ' + nAct + ' juegos').test(q(w, '[data-test=chip-juegos]').textContent), 'cuenta los juegos de la clase: ' + q(w, '[data-test=chip-juegos]').textContent.trim());
    ok(/olga/i.test(q(w, '[data-test=insignia]').textContent) && q(w, '[data-test=insignia]').textContent.includes(M.titulo.slice(0, 15)), 'la insignia lleva el nombre del estudiante y el título de la clase');
    if (SL0[iF].aprendiste) ok(qa(w, '[data-test=logros] li').length === SL0[iF].aprendiste.length, '«Lo que lograste hoy» muestra los ' + SL0[iF].aprendiste.length + ' logros');
    ok(!!q(w, '[data-test=final-nota]'), 'la nota oficial sigue visible en la pantalla final');
    w.close(); }

  T('T26 · Imágenes de apoyo, fracciones pintables y comparar con fracciones/porcentajes');
  { const iI = SL0.findIndex(x => x.imagen), iF = SL0.findIndex(x => x.type === 'fraccion');
    if (iI < 0 && iF < 0) console.log('  ⚠️  la clase no usa imágenes de apoyo ni fracciones: no aplica');
    else { const w = abrir({ est: 'olga' }).window, API = w.CLASE_API, c = sel => { const e = q(w, sel); if (e) clic(e); };
      if (iI >= 0) { API.irA(iI); const im = q(w, '[data-test=img-apoyo]'); ok(!!im && /^data:image/.test(im.src), 'la imagen de apoyo viene empaquetada (sin internet)'); ok(!!im && im.alt.split(' ').length >= 2 && !/Imagen de apoyo$/.test(im.alt), 'la imagen de apoyo tiene texto alternativo descriptivo: «' + (im ? im.alt : '') + '»'); }
      const iQ = SL0.findIndex(x => (x.preguntas || []).some(p => p.imagen));
      if (iQ >= 0) { API.irA(iQ); const k = SL0[iQ].preguntas.findIndex(p => p.imagen); for (let n = 0; n < k; n++) { const cc = API.opcionCorrectaActual(); clic(qa(w, '[data-test=opcion]').find(o => o.dataset.op === cc.id)); cerrarModal(w); await sleep(90); }
        const iq = q(w, '[data-test=img-apoyo]'); ok(!!iq && /^data:image/.test(iq.src) && iq.alt.split(' ').length >= 3, 'quiz: la pregunta ' + (k + 1) + ' muestra su imagen de apoyo con «alt»: «' + (iq ? iq.alt.slice(0, 40) : '') + '…»'); ok(!!q(w, '[data-test=enunciado]') && qa(w, '[data-test=opcion]').length >= 3, 'quiz: con imagen, el enunciado y las opciones siguen visibles'); }
      if (iF >= 0) { API.irA(iF); const s = SL0[iF], x0 = s.items[0];
        ok(qa(w, '[data-test=frac-parte][data-i="0"]').length === x0.partes, 'fraccion: la figura se dibuja con ' + x0.partes + ' partes');
        const mal = x0.objetivo === 1 ? 2 : 1; for (let k = 0; k < mal; k++) c(`[data-test=frac-parte][data-i="0"][data-c="${k}"]`); c('[data-test=verificar-item][data-i="0"]'); ok(/te queda 1 intento/.test(q(w, '.v27-it[data-i="0"] [data-test=item-fb]').textContent), 'fraccion: pintar de más/menos avisa y deja otro intento');
        const p0 = q(w, '[data-test=frac-parte][data-i="0"][data-c="0"]'); p0.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); await sleep(20);
        ok(q(w, '[data-test=frac-parte][data-i="0"][data-c="0"]').getAttribute('aria-label').includes('pintada') !== (mal >= 1), 'fraccion: se puede pintar con teclado (Enter)');
        w.close(); } } }
  T('T27 · Detective: 2 revisiones, falsas alarmas, pistas explicadas y sin tocar la nota');
  { const iD = SL0.findIndex(x => x.type === 'detective'); if (iD < 0) console.log('  ⚠️  la clase no usa detective: no aplica');
    else { const w = abrir({ est: 'olga' }).window, API = w.CLASE_API, s = SL0[iD]; API.irA(iD); const c = sel => { const e = q(w, sel); if (e) clic(e); }, txt = sel => (q(w, sel) || { textContent: '' }).textContent;
      const todos = s.lineas.flatMap((l, i) => l.map((p, j) => ({ p, k: i + ',' + j }))).filter(x => !x.p.fijo), pis = todos.filter(x => x.p.s), falsa = todos.find(x => !x.p.s);
      c('[data-test=det-revisar]'); ok(!habil(w) && txt('[data-test=det-fb]') === '', 'detective: revisar sin marcar nada no gasta la revisión');
      pis.slice(0, pis.length - 1).forEach(x => c(`[data-test=det-seg][data-k="${x.k}"]`)); c(`[data-test=det-seg][data-k="${falsa.k}"]`); c('[data-test=det-revisar]');
      ok(new RegExp('Encontraste ' + (pis.length - 1) + ' de ' + pis.length + ' pistas y 1 señal').test(txt('[data-test=det-fb]')) && !habil(w), 'detective: dice cuántas pistas hay y cuántas falsas alarmas, sin decir cuáles');
      ok(!q(w, '[data-test=det-porque]'), 'detective: mientras no termina, las pistas NO se revelan');
      c('[data-test=det-pista]'); ok(!!q(w, '[data-test=det-pista-txt]'), 'detective: el botón 💡 Pista ayuda');
      c(`[data-test=det-seg][data-k="${falsa.k}"]`); c(`[data-test=det-seg][data-k="${pis[pis.length - 1].k}"]`); c('[data-test=det-revisar]');
      ok(habil(w) && /2\.ª revisión/.test(txt('[data-test=det-fb]')), 'detective: lograrlo en la 2.ª revisión completa con medio punto');
      ok(qa(w, '[data-test=det-porque] li').length === pis.length, 'detective: al terminar explica cada pista (' + pis.length + ')');
      ok(API.estado().aciertos === 0 && hud(w) === '0.0', 'detective NO toca la nota del quiz (HUD ' + hud(w) + ')'); w.close();
      const w2 = abrir({ est: 'pedro' }).window; w2.CLASE_API.irA(iD); const c2 = sel => { const e = q(w2, sel); if (e) clic(e); };
      c2(`[data-test=det-seg][data-k="${falsa.k}"]`); c2('[data-test=det-revisar]'); c2('[data-test=det-revisar]'); ok(habil(w2) && qa(w2, '.v31-seg.miss').length === pis.length, 'detective: tras 2 revisiones fallidas muestra las pistas que faltaron y deja continuar'); w2.close(); } }

  T('T28 · Tabla: celdas correctas se bloquean, 2 revisiones, comas/puntos/fracciones y sin tocar la nota');
  { const iT = SL0.findIndex(x => x.type === 'tabla'); if (iT < 0) console.log('  ⚠️  la clase no usa tabla: no aplica');
    else { const w = abrir({ est: 'olga' }).window, API = w.CLASE_API, s = SL0[iT]; API.irA(iT); const c = sel => { const e = q(w, sel); if (e) clic(e); }, txt = sel => (q(w, sel) || { textContent: '' }).textContent;
      const bl = s.filas.flatMap((f, i) => f.map((x, j) => ({ x, k: i + ',' + j }))).filter(o => o.x && typeof o.x === 'object'), poner = (o, v) => { const e = q(w, `[data-test=tabla-in][data-k="${o.k}"]`); e.value = v; e.dispatchEvent(new w.Event('input', { bubbles: true })); };
      c('[data-test=tabla-revisar]'); ok(!habil(w) && txt('[data-test=tabla-fb]') === '', 'tabla: revisar sin escribir nada no gasta la revisión');
      poner(bl[0], '0,001'); for (let k = 1; k < bl.length; k++) poner(bl[k], k % 2 ? String(bl[k].x.r) : String(bl[k].x.r).replace('.', ',')); c('[data-test=tabla-revisar]');
      ok(new RegExp('Acertaste ' + (bl.length - 1) + ' de ' + bl.length).test(txt('[data-test=tabla-fb]')) && !habil(w), 'tabla: una celda mal da el aviso con el conteo («Acertaste ' + (bl.length - 1) + ' de ' + bl.length + '») y no completa');
      ok(q(w, `[data-test=tabla-in][data-k="${bl[1].k}"]`).classList.contains('ok') && q(w, `[data-test=tabla-in][data-k="${bl[1].k}"]`).disabled && !q(w, `[data-test=tabla-in][data-k="${bl[0].k}"]`).disabled, 'tabla: las celdas correctas se marcan ✅ y se bloquean; la mala sigue editable (acepta coma o punto)');
      c('[data-test=tabla-pista]'); ok(!!q(w, '[data-test=tabla-pista-txt]'), 'tabla: el botón 💡 Pista ayuda');
      poner(bl[0], String(bl[0].x.r).replace('.', ',')); c('[data-test=tabla-revisar]'); ok(habil(w) && /2\.ª revisión/.test(txt('[data-test=tabla-fb]')), 'tabla: corregir la celda en la 2.ª revisión da medio punto y deja continuar');
      ok(!!q(w, '[data-test=tabla-porque]') || !s.porQue, 'tabla: al terminar explica la regla');
      ok(API.estado().aciertos === 0 && hud(w) === '0.0', 'tabla NO toca la nota del quiz (HUD ' + hud(w) + ')'); w.close();
      const w2 = abrir({ est: 'pedro' }).window; w2.CLASE_API.irA(iT); const p2 = (o, v) => { const e = q(w2, `[data-test=tabla-in][data-k="${o.k}"]`); e.value = v; e.dispatchEvent(new w2.Event('input', { bubbles: true })); }, c2 = sel => { const e = q(w2, sel); if (e) clic(e); };
      bl.forEach(o => p2(o, '9999')); c2('[data-test=tabla-revisar]'); c2('[data-test=tabla-revisar]'); ok(habil(w2) && qa(w2, '.v32-tab input.rev').length === bl.length, 'tabla: tras 2 revisiones fallidas muestra los valores y deja continuar'); w2.close(); } }

  console.log(`\n${pasos - fallos}/${pasos} comprobaciones OK${fallos ? ' · ' + fallos + ' ❌' : ''}`); process.exit(fallos ? 1 : 0);
})().catch(e => { console.error('ERROR del runner:', e); process.exit(3); });
