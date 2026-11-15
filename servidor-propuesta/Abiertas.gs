/* ===========================================================================
   Abiertas.gs — hoja «Respuestas abiertas» para que el docente LEA y revise lo que escriben los estudiantes.
   Archivo NUEVO del proyecto de Apps Script (se pega junto a Code.gs). Ver INSTALACION.md.

   Cómo llega la información (sin tocar aula-sync.js):
     la clase guarda en el navegador la clave  abiertas:<clase>:<grupo>:<nombre>  con
        {"v":1,"c":"<clase>","g":"<grupo>","a":[{"s":"w08","i":0,"p":"pregunta","r":"respuesta","t":1699999999,"tipo":"cuaderno"?}]}
     aula-sync.js la copia al servidor como cualquier clave; _guardarEstadoItem (Code.gs) llama a guardarAbiertas() y aquí se
     convierte en UNA FILA por pregunta contestada. Los borradores no se envían: solo lo que el estudiante GUARDÓ.

   Columnas de la hoja:  Grupo · Estudiante · Clase · Slide · N.º · Pregunta · Respuesta · Palabras · Enviada ·
                         Revisión (menú) · Comentario del docente · ID · Llave
     — Revisión y Comentario son SUYAS: el servidor nunca las sobrescribe.
     — Si el estudiante CAMBIA una respuesta ya revisada, Revisión pasa a «🔄 Cambió» (el comentario se conserva).
   Seguridad: todo es texto (formato «@», nunca se evalúa como fórmula), longitudes limitadas, JSON validado y errores
   silenciosos: un paquete dañado jamás impide guardar el progreso del estudiante.
   =========================================================================== */
var ABI = { HOJA: 'Respuestas abiertas', GRUPO: 0, ESTUDIANTE: 1, CLASE: 2, SLIDE: 3, N: 4, PREGUNTA: 5, RESPUESTA: 6, PALABRAS: 7, ENVIADA: 8, REVISION: 9, COMENTARIO: 10, ID: 11, LLAVE: 12 };
var ABI_NC = 13, ABI_MAX_ITEMS = 12, ABI_MAX_P = 300, ABI_MAX_R = 1500;
var ABI_REVISIONES = ['✅ Bien', '🟡 Mejorar', '🔴 Repetir', '🔄 Cambió'];
var ABI_CAB = ['Grupo', 'Estudiante', 'Clase', 'Slide', 'N.º', 'Pregunta', 'Respuesta', 'Palabras', 'Enviada', 'Revisión', 'Comentario del docente', 'ID', 'Llave'];

// Crea la hoja la primera vez (también la llama configurar()). No pide volver a ejecutar configurar().
function hojaAbiertas() {
  var ss = libro(), h = ss.getSheetByName(ABI.HOJA);
  if (h) return h;
  h = ss.insertSheet(ABI.HOJA);
  h.getRange(1, 1, 1, ABI_NC).setValues([ABI_CAB]);
  try {
    var cab = h.getRange(1, 1, 1, ABI_NC); cab.setFontWeight('bold'); cab.setBackground('#1d4fd8'); cab.setFontColor('#ffffff'); h.setFrozenRows(1);
    if (h.getMaxRows() < 3000) h.insertRowsAfter(h.getMaxRows(), 3000 - h.getMaxRows());
    h.getRange(2, 1, h.getMaxRows() - 1, ABI_NC).setNumberFormat('@');                      // TODO es texto: ninguna respuesta se evalúa como fórmula
    h.getRange(2, ABI.RESPUESTA + 1, h.getMaxRows() - 1, 1).setWrap(true);
    h.getRange(2, ABI.PREGUNTA + 1, h.getMaxRows() - 1, 1).setWrap(true);
    h.getRange(2, ABI.COMENTARIO + 1, h.getMaxRows() - 1, 1).setWrap(true);
    h.setColumnWidth(ABI.ESTUDIANTE + 1, 220); h.setColumnWidth(ABI.CLASE + 1, 170); h.setColumnWidth(ABI.PREGUNTA + 1, 300); h.setColumnWidth(ABI.RESPUESTA + 1, 460);
    h.setColumnWidth(ABI.ENVIADA + 1, 130); h.setColumnWidth(ABI.REVISION + 1, 120); h.setColumnWidth(ABI.COMENTARIO + 1, 320);
    h.getRange(1, ABI.REVISION + 1, 1, 2).setBackground('#f59e0b');                          // columnas del docente resaltadas
    h.getRange(2, ABI.REVISION + 1, h.getMaxRows() - 1, 2).setBackground('#fff7e0');
    h.getRange(2, ABI.REVISION + 1, h.getMaxRows() - 1, 1).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(ABI_REVISIONES, true).setAllowInvalid(true).build());
    h.hideColumns(ABI.ID + 1, 2);                                                           // ID y Llave: internas
    if (!h.getFilter()) h.getRange(1, 1, 3000, ABI_NC).createFilter();                       // filtrar por grupo, clase o revisión
  } catch (e) { Logger.log('Formato opcional de Respuestas abiertas no aplicado: ' + e); }
  return h;
}
function asegurarHojaAbiertas() { return hojaAbiertas(); }

function _abiTxt(v, max) {
  v = String(v == null ? '' : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').replace(/\s+$/, '');
  return v.length > max ? v.slice(0, max) : v;
}
function _abiPalabras(t) { var m = String(t).trim().match(/\S+/g); return m ? m.length : 0; }

// Llamada desde _guardarEstadoItem(j, it) con las claves RECIBIDAS (k = nuevo.k). Devuelve cuántas filas escribió.
function guardarAbiertas(j, clave, k) {
  if (!k || typeof k !== 'object') return 0;
  var stem = String(clave).indexOf('l.') === 0 ? String(clave).slice(2) : '';
  if (!stem) return 0;
  var lista = null, x, p;
  for (x in k) {
    if (x.indexOf('abiertas:') !== 0 || typeof k[x] !== 'string') continue;
    try { p = JSON.parse(k[x]); } catch (e) { continue; }
    if (p && p.v === 1 && p.c === stem && Object.prototype.toString.call(p.a) === '[object Array]') { lista = p.a.slice(0, ABI_MAX_ITEMS); break; }
  }
  if (!lista || !lista.length) return 0;

  var h = hojaAbiertas(), id = String(j.p[P.ID]), n = h.getLastRow(), filas = {};
  if (n >= 2) {
    var ll = h.getRange(2, ABI.LLAVE + 1, n - 1, 1).getValues(), pre = id + '|';
    for (var i = 0; i < ll.length; i++) { var l = String(ll[i][0]); if (l.indexOf(pre) === 0) filas[l] = i + 2; }
  }
  var hecho = 0, grupo = String(j.p[P.GRUPO]), nombre = String(j.p[P.NOMBRE]), ahoraTxt = horaStr();
  lista.forEach(function (it) {
    if (!it || typeof it !== 'object') return;
    var s = String(it.s == null ? '' : it.s), idx = Number(it.i);
    if (!/^[A-Za-z0-9_-]{1,40}$/.test(s) || !isFinite(idx) || idx < 0 || idx > 19 || Math.floor(idx) !== idx) return;
    var resp = _abiTxt(it.r, ABI_MAX_R); if (!resp.trim()) return;
    var preg = _abiTxt(it.p, ABI_MAX_P), tipo = it.tipo === 'cuaderno' ? 'cuaderno' : 'abierta';
    if (tipo === 'cuaderno') preg = '📓 ' + preg;
    var llave = id + '|' + stem + '|' + s + '|' + idx, fila = filas[llave], pal = _abiPalabras(resp);
    if (fila) {
      var act = h.getRange(fila, 1, 1, ABI_NC).getValues()[0];
      if (String(act[ABI.RESPUESTA]) !== resp) {                                            // cambió lo que el estudiante escribió
        h.getRange(fila, ABI.PREGUNTA + 1, 1, 4).setValues([[preg, resp, pal, ahoraTxt]]);
        if (String(act[ABI.REVISION]).trim()) h.getRange(fila, ABI.REVISION + 1).setValue('🔄 Cambió');   // el docente ya había revisado: avisarle
        hecho++;
      } else if (String(act[ABI.PREGUNTA]) !== preg) { h.getRange(fila, ABI.PREGUNTA + 1).setValue(preg); }
    } else {
      h.appendRow([grupo, nombre, stem, s, idx + 1, preg, resp, pal, ahoraTxt, '', '', id, llave]);
      hecho++;
    }
  });
  return hecho;
}

// Privacidad: al eliminar un perfil se borran también sus respuestas.
function borrarAbiertasDe(id) {
  var h = libro().getSheetByName(ABI.HOJA); if (!h) return 0;
  var n = h.getLastRow(); if (n < 2) return 0;
  var ids = h.getRange(2, ABI.ID + 1, n - 1, 1).getValues(), borradas = 0;
  for (var i = ids.length - 1; i >= 0; i--) if (String(ids[i][0]) === String(id)) { h.deleteRow(i + 2); borradas++; }
  return borradas;
}
// «Empezar de cero»: vacía la hoja.
function limpiarAbiertas() {
  var h = libro().getSheetByName(ABI.HOJA); if (!h) return 0;
  var u = h.getLastRow(); if (u < 2) return 0;
  h.getRange(2, 1, u - 1, ABI_NC).clearContent(); return u - 1;
}

// Menú del docente
function menuAbiertasIr() { var h = hojaAbiertas(); libro().setActiveSheet(h); }
function resumenAbiertasPendientes() {
  var h = libro().getSheetByName(ABI.HOJA), n = h ? h.getLastRow() : 0;
  if (n < 2) return 'Todavía no hay respuestas abiertas guardadas por los estudiantes.';
  var filas = h.getRange(2, 1, n - 1, ABI_NC).getValues(), por = {}, tot = 0, pend = 0;
  filas.forEach(function (f) {
    if (!f[ABI.ID]) return; tot++; var r = String(f[ABI.REVISION]).trim();
    if (r === '' || r === '🔄 Cambió') { pend++; var k = f[ABI.GRUPO] + ' · ' + f[ABI.CLASE]; por[k] = (por[k] || 0) + 1; }
  });
  var lineas = Object.keys(por).sort().map(function (k) { return '• ' + k + ': ' + por[k]; });
  return 'Respuestas guardadas: ' + tot + '\nPor revisar (sin revisión o con cambios): ' + pend + (lineas.length ? '\n\n' + lineas.join('\n') : '');
}
function menuAbiertasPendientes() { _seguro(resumenAbiertasPendientes); }
