#!/usr/bin/env node
/* Prueba del servidor «Respuestas abiertas»: ejecuta el Code.gs PARCHEADO + Abiertas.gs reales dentro de un simulador de Apps Script
   (hojas en memoria) y comprueba filas, revisión del docente, seguridad y borrado. Incluye una PRUEBA CRUZADA: la clase real (jsdom) guarda
   una respuesta abierta y el paquete que genera lo procesa el servidor. Uso: node pruebas/prueba_servidor_abiertas.js */
const fs = require('fs'), vm = require('vm'), path = require('path');
const RAIZ = path.join(__dirname, '..'), SERV = path.join(RAIZ, 'servidor-propuesta');
let pasos = 0, fallos = 0; const ok = (c, m) => { pasos++; if (!c) fallos++; console.log((c ? '  ✅ ' : '  ❌ ') + m); }; const T = t => console.log('\n' + t);

// ── Simulador mínimo de hojas de cálculo ──
class Rango { constructor(h, r, c, nr, nc) { this.h = h; this.r = r; this.c = c; this.nr = nr; this.nc = nc; }
  getValues() { const o = []; for (let i = 0; i < this.nr; i++) { const f = []; for (let j = 0; j < this.nc; j++) { const v = (this.h.filas[this.r - 1 + i] || [])[this.c - 1 + j]; f.push(v === undefined ? '' : v); } o.push(f); } return o; }
  setValues(m) { m.forEach((f, i) => f.forEach((v, j) => this.h._set(this.r + i, this.c + j, v))); return this; }
  setValue(v) { this.h._set(this.r, this.c, v); return this; }
  clearContent() { for (let i = 0; i < this.nr; i++) for (let j = 0; j < this.nc; j++) this.h._set(this.r + i, this.c + j, ''); return this; }
  setNumberFormat(f) { this.h.formatos.push({ c: this.c, nc: this.nc, f }); return this; }
  setDataValidation(v) { this.h.validaciones.push({ c: this.c, lista: v && v.lista }); return this; }
  createFilter() { this.h._filtro = true; return this; } }
const sinEfecto = o => new Proxy(o, { get(t, p) { if (p in t) return t[p]; if (typeof p === 'symbol' || p === 'then') return undefined; return () => proxy(t); } });
const proxy = o => o;
class Hoja { constructor(n) { this.name = n; this.filas = []; this.max = 1000; this.formatos = []; this.validaciones = []; this._filtro = false; }
  _set(r, c, v) { while (this.filas.length < r) this.filas.push([]); const f = this.filas[r - 1]; while (f.length < c) f.push(''); f[c - 1] = v; }
  getLastRow() { for (let i = this.filas.length - 1; i >= 0; i--) if (this.filas[i].some(v => v !== '' && v !== undefined)) return i + 1; return 0; }
  getMaxRows() { return Math.max(this.max, this.filas.length); } insertRowsAfter(r, n) { this.max += n; }
  getRange(r, c, nr, nc) { return sinEfecto(new Rango(this, r, c, nr || 1, nc || 1)); } appendRow(a) { const r = this.getLastRow() + 1; a.forEach((v, j) => this._set(r, j + 1, v)); }
  deleteRow(r) { this.filas.splice(r - 1, 1); } getFilter() { return this._filtro ? {} : null; } }
const hojaProxy = n => sinEfecto(new Hoja(n));
function nuevoServidor() {
  const hojas = {}; const libro = { getSheetByName: n => hojas[n] || null, insertSheet: n => (hojas[n] = hojaProxy(n)), setActiveSheet: h => { libro.activa = h; } };
  ['_Estados'].forEach(n => { hojas[n] = hojaProxy(n); hojas[n]._set(1, 1, 'ID'); }); const props = { SS_ID: 'x' };
  const ctx = vm.createContext({ console, Date, JSON, Math, Object, Array, String, Number, isFinite, parseInt, parseFloat, RegExp, Error, Logger: { log() {} },
    PropertiesService: { getScriptProperties: () => ({ getProperty: k => props[k], setProperty: (k, v) => { props[k] = v; } }) }, CacheService: { getScriptCache: () => ({ get: () => null, put() {}, remove() {} }) },
    SpreadsheetApp: { openById: () => libro, getActiveSpreadsheet: () => libro, newDataValidation: () => { const b = { requireValueInList(l) { b.lista = l; return b; }, setAllowInvalid() { return b; }, build() { return { lista: b.lista }; } }; return b; } },
    Utilities: { formatDate: d => new Date(d).toISOString().slice(0, 16).replace('T', ' ') }, ContentService: {}, LockService: {}, HtmlService: {}, UrlFetchApp: {}, Session: {} });
  vm.runInContext(fs.readFileSync(path.join(SERV, 'Code.gs.con-cambios'), 'utf8') + '\n' + fs.readFileSync(path.join(SERV, 'Abiertas.gs'), 'utf8'), ctx, { filename: 'Code.gs+Abiertas.gs' });
  return { ctx, hojas, libro, abiertas: () => hojas['Respuestas abiertas'] };
}
const est = (id, nombre, grupo) => ({ p: [id, nombre, 'lista', 'apodo' + id, 1, 5, grupo, 1, 0, 0, 0, '', '', 'activo'] });
const paquete = (stem, a, extra) => JSON.stringify(Object.assign({ v: 1, c: stem, g: '501', a }, extra || {}));
const guardar = (s, j, stem, k, merge) => s.ctx._guardarEstadoItem(j, { clave: 'l.' + stem, datos: JSON.stringify({ n: j.p[1], k }), merge: merge !== false });
const filasAb = s => { const h = s.abiertas(); const n = h ? h.getLastRow() : 0; return n < 2 ? [] : h.getRange(2, 1, n - 1, 13).getValues(); };
const AB = { GRUPO: 0, ESTUDIANTE: 1, CLASE: 2, SLIDE: 3, N: 4, PREGUNTA: 5, RESPUESTA: 6, PALABRAS: 7, ENVIADA: 8, REVISION: 9, COMENTARIO: 10, ID: 11, LLAVE: 12 };
const A = (i, r, p) => ({ s: 'w08', i, p: p || 'Explica con tus palabras', r, t: 1 });

(async () => {
  T('S1 · El parche conecta Abiertas.gs sin romper el guardado de progreso');
  { const s = nuevoServidor(), j = est('u1', 'María Pérez', '501');
    guardar(s, j, 'semana6_tec4_p4', { 'aula:otra:clave': 'x' }); ok(!s.abiertas(), 'un progreso sin respuestas abiertas NO crea la hoja ni filas');
    ok(s.hojas['_Estados'].getLastRow() >= 2, 'el progreso se guarda igual que antes (hoja _Estados)');
    guardar(s, j, 'semana6_tec4_p4', { ['abiertas:semana6_tec4_p4:501:maria']: paquete('semana6_tec4_p4', [A(0, 'Para mí un decimal es un número con coma'), A(1, 'Comparo enteros, décimas y centésimas')]) });
    const f = filasAb(s); ok(f.length === 2, 'un paquete válido crea 1 fila por pregunta contestada (' + f.length + ')');
    ok(f[0][AB.GRUPO] === '501' && f[0][AB.ESTUDIANTE] === 'María Pérez' && f[0][AB.CLASE] === 'semana6_tec4_p4' && f[0][AB.SLIDE] === 'w08' && f[0][AB.N] === 1 && f[1][AB.N] === 2, 'cada fila trae grupo, estudiante (nombre real), clase, slide y n.º de pregunta');
    ok(f[0][AB.RESPUESTA] === 'Para mí un decimal es un número con coma' && f[0][AB.PALABRAS] === 9 && /^\d{4}-\d\d-\d\d \d\d:\d\d$/.test(f[0][AB.ENVIADA]), 'guarda la respuesta íntegra, cuenta las palabras y la hora de envío');
    const h = s.abiertas(); ok(h.formatos.some(x => x.f === '@'), 'la hoja usa formato de TEXTO: ninguna respuesta se evalúa como fórmula');
    ok(h.validaciones.some(v => v.lista && v.lista.indexOf('✅ Bien') >= 0 && v.lista.indexOf('🔄 Cambió') >= 0), 'la columna Revisión tiene menú desplegable (Bien · Mejorar · Repetir · Cambió)');
    ok(h._filtro, 'la hoja tiene filtro para ver por grupo, clase o revisión'); }

  T('S2 · Revisión del docente: nunca se pierde');
  { const s = nuevoServidor(), j = est('u1', 'María Pérez', '501'), st = 'semana6_tec4_p4', k = r => ({ ['abiertas:' + st + ':501:maria']: paquete(st, [A(0, r)]) });
    guardar(s, j, st, k('Mi primera respuesta')); const h = s.abiertas(); h.getRange(2, AB.REVISION + 1).setValue('🟡 Mejorar'); h.getRange(2, AB.COMENTARIO + 1).setValue('Agrega un ejemplo, por favor');
    guardar(s, j, st, k('Mi primera respuesta')); let f = filasAb(s)[0]; ok(filasAb(s).length === 1 && f[AB.REVISION] === '🟡 Mejorar' && f[AB.COMENTARIO] === 'Agrega un ejemplo, por favor', 'reenviar lo mismo NO duplica ni borra la revisión ni el comentario del docente');
    guardar(s, j, st, k('Mi respuesta mejorada con un ejemplo: 0,5 = 0,50')); f = filasAb(s)[0];
    ok(filasAb(s).length === 1 && f[AB.RESPUESTA].startsWith('Mi respuesta mejorada') && f[AB.REVISION] === '🔄 Cambió' && f[AB.COMENTARIO] === 'Agrega un ejemplo, por favor', 'si el estudiante CAMBIA una respuesta ya revisada: se actualiza, Revisión pasa a «🔄 Cambió» y el comentario se conserva');
    const s2 = nuevoServidor(); guardar(s2, j, st, k('Borrador uno')); guardar(s2, j, st, k('Borrador dos más largo')); ok(filasAb(s2)[0][AB.REVISION] === '', 'si el docente aún no había revisado, cambiar la respuesta no marca nada'); }

  T('S3 · Varios estudiantes y varias clases');
  { const s = nuevoServidor(), a = est('u1', 'María Pérez', '501'), b = est('u2', 'Juan López', '502');
    guardar(s, a, 'semana6_tec4_p4', { ['abiertas:x']: paquete('semana6_tec4_p4', [A(0, 'resp de María')]) }); guardar(s, b, 'semana6_tec4_p4', { ['abiertas:x']: paquete('semana6_tec4_p4', [A(0, 'resp de Juan')]) });
    guardar(s, a, 'semana7_tec4_p4', { ['abiertas:x']: paquete('semana7_tec4_p4', [A(0, 'María en otra clase')]) });
    const f = filasAb(s); ok(f.length === 3, 'dos estudiantes y dos clases = 3 filas separadas'); ok(f.filter(x => x[AB.ID] === 'u1').length === 2 && f.filter(x => x[AB.ID] === 'u2').length === 1, 'cada fila queda ligada a su estudiante');
    ok(f.find(x => x[AB.ID] === 'u2')[AB.GRUPO] === '502', 'el grupo sale del perfil del estudiante en el servidor (no de lo que diga la clase)'); }

  T('S4 · Seguridad: paquetes dañados o malintencionados');
  { const s = nuevoServidor(), j = est('u1', 'María Pérez', '501'), st = 'semana6_tec4_p4'; let lanzo = false;
    const casos = [['JSON roto', '{esto no es json'], ['versión distinta', JSON.stringify({ v: 2, c: st, a: [A(0, 'x')] })], ['clase que no coincide con la clave', paquete('otra_clase', [A(0, 'hola')])], ['a no es lista', JSON.stringify({ v: 1, c: st, a: 'no' })],
      ['slide inválido', paquete(st, [{ s: 'a b;c', i: 0, p: 'p', r: 'hola' }])], ['n.º fuera de rango', paquete(st, [{ s: 'w1', i: 99, p: 'p', r: 'hola' }])], ['respuesta vacía', paquete(st, [A(0, '   ')])], ['ítem no es objeto', paquete(st, [null, 5, 'x'])]];
    casos.forEach(([n, v]) => { try { guardar(s, j, st, { ['abiertas:y']: v }); } catch (e) { lanzo = true; } }); ok(!lanzo, 'ningún paquete dañado hace fallar el guardado del progreso'); ok(filasAb(s).length === 0, 'los 8 casos dañados NO escriben filas');
    guardar(s, j, st, { ['abiertas:y']: paquete(st, [A(0, 'x'.repeat(5000), 'p'.repeat(2000))]) }); const f = filasAb(s)[0]; ok(f[AB.RESPUESTA].length === 1500 && f[AB.PREGUNTA].length === 300, 'respuesta y pregunta se limitan a 1500 y 300 caracteres');
    const s2 = nuevoServidor(); guardar(s2, j, st, { ['abiertas:y']: paquete(st, Array.from({ length: 30 }, (_, i) => A(i % 20, 'r' + i))) }); ok(filasAb(s2).length <= 12, 'como máximo 12 respuestas por envío (' + filasAb(s2).length + ')');
    const s3 = nuevoServidor(); guardar(s3, j, st, { ['abiertas:y']: paquete(st, [A(0, '=IMPORTXML("http://malo.com","//a")'), A(1, '+cmd|calc'), A(2, '@SUMA(1)')]) }); const g = filasAb(s3);
    ok(g[0][AB.RESPUESTA] === '=IMPORTXML("http://malo.com","//a")' && g[1][AB.RESPUESTA] === '+cmd|calc' && s3.abiertas().formatos.some(x => x.f === '@'), 'respuestas que parecen fórmulas (=, +, @) se guardan como TEXTO literal, sin evaluarse');
    const s4 = nuevoServidor(); s4.ctx.guardarAbiertas = () => { throw new Error('hoja rota'); }; let fallo4 = false; try { guardar(s4, j, st, { ['abiertas:y']: paquete(st, [A(0, 'x')]) }); } catch (e) { fallo4 = true; }
    ok(!fallo4 && s4.hojas['_Estados'].getLastRow() >= 2, 'aunque Abiertas.gs falle por dentro, el progreso del estudiante se guarda igual'); }

  T('S5 · Cuaderno entregado, privacidad y menú del docente');
  { const s = nuevoServidor(), a = est('u1', 'María Pérez', '501'), b = est('u2', 'Juan López', '501'), st = 'semana6_tec4_p4';
    guardar(s, a, st, { ['abiertas:y']: paquete(st, [A(0, 'resp 1'), { s: 'w13', i: 0, tipo: 'cuaderno', p: 'Trabajo escrito', r: 'El estudiante marcó que hizo la hoja a mano', t: 1 }]) }); guardar(s, b, st, { ['abiertas:y']: paquete(st, [A(0, 'resp de Juan')]) });
    const f = filasAb(s); ok(f.some(x => /^📓 /.test(x[AB.PREGUNTA]) && x[AB.SLIDE] === 'w13'), 'la marca de «cuaderno entregado» aparece como fila 📓 para que el docente sepa quién entrega');
    s.abiertas().getRange(2, AB.REVISION + 1).setValue('✅ Bien'); const r = s.ctx.resumenAbiertasPendientes(); ok(/Respuestas guardadas: 3/.test(r) && /Por revisar[^\n]*: 2/.test(r) && /501 · semana6_tec4_p4: 2/.test(r), 'el resumen del menú cuenta lo guardado (3) y lo pendiente (2) por grupo y clase');
    ok(s.ctx.borrarAbiertasDe('u1') === 2 && filasAb(s).length === 1 && filasAb(s)[0][AB.ID] === 'u2', 'al eliminar un perfil se borran SOLO sus respuestas (privacidad)'); ok(s.ctx.limpiarAbiertas() === 1 && filasAb(s).length === 0, '«Empezar de cero» vacía la hoja'); ok(s.ctx.resumenAbiertasPendientes().includes('Todavía no hay'), 'con la hoja vacía el resumen lo dice con claridad'); }

  T('PRUEBA CRUZADA · la clase real guarda una respuesta y el servidor la convierte en filas');
  { let JSDOM; try { JSDOM = require(path.join(RAIZ, 'node_modules', 'jsdom')).JSDOM; } catch (e) { JSDOM = null; }
    if (!JSDOM) console.log('  ⚠️  jsdom no instalado (npm install): se omite la prueba cruzada'); else {
      const html = fs.readFileSync(path.join(RAIZ, 'plantilla', 'ejemplos', 'mat4_decimales.html'), 'utf8'), datos = JSON.parse(html.match(/<script type="application\/json" id="datos-clase">([\s\S]*?)<\/script>/)[1].replace(/<\\\//g, '</'));
      const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, url: 'http://localhost/semana6_mat4_p4.html?est=Olga&grupo=401', beforeParse(w) { w.__TEST__ = { factor: 0.02, rescateS: 0.4, sinIntro: true, antiDobleMs: 60 }; w.HTMLElement.prototype.scrollIntoView = () => {}; } });
      const w = dom.window, sleep = ms => new Promise(r => setTimeout(r, ms)); await sleep(300); const API = w.CLASE_API, iA = datos.slides.findIndex(x => x.type === 'abierta'), iC = datos.slides.findIndex(x => x.type === 'cuaderno'), sl = datos.slides[iA];
      API.irA(iA); await sleep(80); [...w.document.querySelectorAll('[data-test=abierta-txt]')].forEach((x, i) => { x.value = ['Un decimal es un número con coma que separa lo entero de lo que sobra', 'Comparo primero las unidades, luego las décimas y luego las centésimas'][i]; x.dispatchEvent(new w.Event('input', { bubbles: true })); });
      ok(![...Object.keys(w.localStorage)].some(k => k.startsWith('abiertas:')), 'mientras el estudiante escribe (borrador) NO se envía nada al docente');
      w.document.querySelector('[data-test=abierta-guardar]').click(); await sleep(80); API.irA(iC); await sleep(80); const cb = w.document.querySelector('[data-test=cuaderno-ok]'); cb.checked = true; cb.dispatchEvent(new w.Event('change', { bubbles: true })); await sleep(80);
      const clave = Object.keys(w.localStorage).find(k => k.startsWith('abiertas:')); ok(!!clave && /^abiertas:semana6_mat4_p4:401:/.test(clave), 'al guardar, la clase deja la clave «' + (clave || '—') + '» (nombre del archivo + grupo + estudiante)');
      const val = w.localStorage.getItem(clave), pq = JSON.parse(val); ok(pq.v === 1 && pq.c === 'semana6_mat4_p4' && pq.a.length === sl.prompts.length + 1 && val.length < 28000, 'el paquete tiene el formato esperado (' + pq.a.length + ' elementos, ' + val.length + ' de 30.000 caracteres)');
      const s = nuevoServidor(), j = est('alum1', 'Olga Gómez', '401'); guardar(s, j, 'semana6_mat4_p4', { [clave]: val }); const f = filasAb(s);
      ok(f.length === sl.prompts.length + 1 && f[0][AB.PREGUNTA] === sl.prompts[0] && f[0][AB.RESPUESTA].startsWith('Un decimal es un número con coma') && f[1][AB.RESPUESTA].startsWith('Comparo primero'), 'el servidor real convierte el paquete de la clase real en filas con la pregunta y la respuesta exactas');
      ok(f.some(x => /^📓 /.test(x[AB.PREGUNTA])), 'y el cuaderno marcado aparece como entregado'); w.close(); } }
  console.log(`\n${pasos - fallos}/${pasos} comprobaciones OK` + (fallos ? ` · ${fallos} ❌` : '')); process.exit(fallos ? 1 : 0);
})();
