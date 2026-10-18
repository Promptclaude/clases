/* nucleo.js — Núcleo seguro de la clase (v22). Sin dependencias, sin DOM. Probado con tests/prueba_nucleo.js
   Resuelve: (1) herencia de datos entre semanas/cursos, (2) mejor nota que solo sube, (3) billetera sin doble gasto,
   (4) almacenamiento que nunca rompe la clase. Se inserta tal cual en la clase (tools/insertar_nucleo.py) y NO se reescribe. */
(function (global) {
  'use strict';
  var SCHEMA = 3;

  /* Misma normalización que normalizarNombre()/normalizarGrupo() del index (8-K): recortar, minúsculas, sin tildes, espacios → "_" */
  function normalizarNombre(n) {
    return String(n == null ? '' : n).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '_') || 'sinregistro';
  }
  function normalizarGrupo(g) {
    return String(g == null ? '' : g).trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '') || 'sinregistro';
  }

  /* CFG es la ÚNICA fuente de identidad de la clase: { curso:'mat', grado:'4', periodo:'4', semana:5 } */
  function validarCFG(c) {
    if (!c || !c.curso || !c.grado || !c.periodo || !(Number(c.semana) > 0)) throw new Error('CFG incompleto: curso, grado, periodo y semana son obligatorios');
    return { curso: String(c.curso), grado: String(c.grado), periodo: String(c.periodo), semana: Number(c.semana) };
  }
  function claseId(c) { c = validarCFG(c); return c.curso + '_' + c.grado + '_p' + c.periodo + '_s' + c.semana; }

  /* Todas las claves salen de aquí (contrato 8-K/8-F con el index):
       PREFIX    = el storagePrefix que entrega el index SOLO si es de esta semana y de este grupo; si no, `${curso}_${grado}_${grupo}_p${periodo}_s${semana}`
       sesion    = PREFIX_usuario_session   (estado completo; la clase la lee)
       resumen   = PREFIX_usuario_data      (INDEX_KEY: lo que lee el index; NUNCA se lee como sesión)
       registro  = 'clases_guardadas'       (lista de INDEX_KEY que el index recorre)
     ctx = sessionStorage['clase_contexto'] ya parseado (o null). */
  function prefijo(cfg, grupo, ctx) {
    cfg = validarCFG(cfg); var g = normalizarGrupo(grupo);
    if (ctx && typeof ctx.storagePrefix === 'string' && ctx.storagePrefix.slice(-('_s' + cfg.semana).length) === '_s' + cfg.semana && normalizarGrupo(ctx.grupo) === g) return ctx.storagePrefix;
    return cfg.curso + '_' + cfg.grado + '_' + g + '_p' + cfg.periodo + '_s' + cfg.semana;
  }
  function claves(cfg, nombre, grupo, ctx) {
    var pre = prefijo(cfg, grupo, ctx), u = normalizarNombre(nombre);
    return {
      prefijo: pre, sesion: pre + '_' + u + '_session', resumen: pre + '_' + u + '_data', registro: 'clases_guardadas',
      identidad: cfg.curso + '_' + cfg.grado + '_p' + cfg.periodo + '__identidad',     // última identidad usada en este curso (sin nota ni avance)
      baul: cfg.curso + '_' + cfg.grado + '__baul__' + u                                // SOLO cosméticos/insignias acumulables entre semanas
    };
  }

  function sello(cfg, nombre, grupo) {
    return { schema: SCHEMA, claseId: claseId(cfg), semana: validarCFG(cfg).semana, est: normalizarNombre(nombre), grupo: normalizarGrupo(grupo) };
  }
  /* Un dato SIN sello completo es inválido (no "probablemente bueno"). */
  function selloValido(d, cfg, nombre, grupo) {
    if (!d || typeof d !== 'object' || !d.sello || typeof d.sello !== 'object') return false;
    var s = d.sello, e = sello(cfg, nombre, grupo);
    return s.schema === e.schema && s.claseId === e.claseId && s.semana === e.semana && s.est === e.est && s.grupo === e.grupo;
  }

  /* Almacenamiento seguro: si localStorage falla o no existe, usa memoria y avisa. */
  function crearAlmacen(real) {
    var mem = {}, usandoMemoria = false, errores = [];
    function ok() { try { return real && typeof real.getItem === 'function' ? real : null; } catch (e) { return null; } }
    return {
      get memoria() { return usandoMemoria; }, get errores() { return errores.slice(); },
      leer: function (k) {
        try { var s = ok(); var raw = s ? s.getItem(k) : (k in mem ? mem[k] : null); if (raw == null) raw = (k in mem ? mem[k] : null); return raw == null ? null : JSON.parse(raw); }
        catch (e) { errores.push('leer ' + k + ': ' + e.message); return null; }
      },
      escribir: function (k, v) {
        var raw = JSON.stringify(v); mem[k] = raw;
        try { var s = ok(); if (!s) { usandoMemoria = true; return false; } s.setItem(k, raw); return true; }
        catch (e) { usandoMemoria = true; errores.push('escribir ' + k + ': ' + e.message); return false; }
      },
      borrar: function (k) { delete mem[k]; try { var s = ok(); if (s) s.removeItem(k); } catch (e) {} }
    };
  }

  /* Estado en cero REAL: nada heredado. */
  function estadoCero(cfg, nombre, grupo) {
    return {
      sello: sello(cfg, nombre, grupo), nombre: nombre || '', grupo: grupo || '',
      slide: 0, vistos: [], quizActs: {}, acts: {},
      intentos: 1, vidasUsadas: 0, reintentoActivo: false, reintentoPendientes: [],
      aciertosIntento: 0, mejorNota: 0, mejorAciertos: 0, mejorIntento: 0, historial: [],
      eco: { gemas: 0, gastadas: 0, ganadasPorFuente: {}, tx: {}, inventario: [], poderes: {} },
      pistas: {}, ts: 0
    };
  }

  /* Carga: solo la clave exacta de ESTA clase+grupo+estudiante, y solo si el sello coincide. Si no, estado en cero. */
  function cargar(almacen, cfg, nombre, grupo, ctx) {
    var k = claves(cfg, nombre, grupo, ctx), d = almacen.leer(k.sesion);
    if (!selloValido(d, cfg, nombre, grupo)) return { estado: estadoCero(cfg, nombre, grupo), origen: d ? 'cuarentena' : 'nuevo' };
    var base = estadoCero(cfg, nombre, grupo);
    var merged = Object.assign(base, d); merged.eco = Object.assign(base.eco, d.eco || {}); merged.sello = sello(cfg, nombre, grupo);
    return { estado: merged, origen: 'sesion' };
  }

  /* Entrada que lee el index (8-F). `extra` = { totalSlides, xp, medallas, semaforo, notaIntentoActual, completada } la aporta la clase. */
  function resumenPublico(e, cfg, extra) {
    extra = extra || {}; var tot = extra.totalSlides || 0;
    return { studentUser: normalizarNombre(e.nombre), studentName: e.nombre, nota: e.mejorNota, notaIntentoActual: extra.notaIntentoActual == null ? 0 : extra.notaIntentoActual,
      mejorIntento: e.mejorIntento || 1, intentos: e.intentos, porcentajeAvance: tot ? Math.round((e.vistos.length / tot) * 100) : 0, xp: extra.xp || 0,
      medallas: extra.medallas || [], semaforo: extra.semaforo || 'amarillo', completada: !!extra.completada, vidasUsadas: e.vidasUsadas,
      semana: cfg.semana, grupo: normalizarGrupo(e.grupo), claseId: claseId(cfg), slideActual: e.slide, totalSlides: tot, ultimoAcceso: new Date().toISOString(), version: 1 };
  }
  function guardar(almacen, cfg, estado, extra, ctx) {
    var k = claves(cfg, estado.nombre, estado.grupo, ctx);
    estado.sello = sello(cfg, estado.nombre, estado.grupo); estado.ts = Date.now();
    var ok1 = almacen.escribir(k.sesion, estado);
    almacen.escribir(k.resumen, resumenPublico(estado, cfg, extra));
    var reg = almacen.leer(k.registro); reg = Array.isArray(reg) ? reg : [];
    if (reg.indexOf(k.resumen) === -1) { reg.push(k.resumen); almacen.escribir(k.registro, reg); }
    return ok1;
  }

  /* Nota: aciertos/total*5, 2 decimales. La OFICIAL es la mejor de todos los intentos y SOLO SUBE. */
  function nota(aciertos, total, max) { max = max || 5; if (!(total > 0)) return 0; var a = Math.max(0, Math.min(aciertos, total)); return Math.round((a / total) * max * 100) / 100; }
  function registrarIntento(estado, aciertos, total, max) {
    var n = nota(aciertos, total, max), primero = estado.mejorIntento === 0, subio = false;
    estado.historial.push({ intento: estado.intentos, aciertos: aciertos, nota: n, fecha: new Date().toISOString() });
    if (primero || n > estado.mejorNota) { subio = !primero || n > 0; estado.mejorNota = n; estado.mejorAciertos = aciertos; estado.mejorIntento = estado.intentos; }
    return { nota: n, oficial: estado.mejorNota, subio: subio };
  }
  function notaOficial(estado) { return estado.mejorNota || 0; }

  /* Billetera: sin doble gasto (idempotente por id de transacción), saldo nunca negativo, topes por fuente. */
  function ganar(estado, n, fuente, idTx, tope) {
    var eco = estado.eco; n = Math.floor(n); if (!(n > 0) || !idTx) return 0;
    if (eco.tx[idTx]) return 0;
    var ya = eco.ganadasPorFuente[fuente] || 0, permitido = tope == null ? n : Math.max(0, Math.min(n, tope - ya));
    eco.tx[idTx] = { t: 'g', n: permitido, fuente: fuente }; if (!permitido) return 0;
    eco.gemas += permitido; eco.ganadasPorFuente[fuente] = ya + permitido; return permitido;
  }
  function gastar(estado, n, motivo, idTx) {
    var eco = estado.eco; n = Math.floor(n); if (!(n > 0) || !idTx) return { ok: false, razon: 'datos' };
    if (eco.tx[idTx]) return { ok: eco.tx[idTx].t === 's', razon: 'repetida' };
    if (eco.gemas < n) return { ok: false, razon: 'saldo' };
    eco.gemas -= n; eco.gastadas += n; eco.tx[idTx] = { t: 's', n: n, motivo: motivo }; return { ok: true };
  }

  global.Nucleo = { SCHEMA: SCHEMA, normalizarNombre: normalizarNombre, normalizarGrupo: normalizarGrupo, validarCFG: validarCFG, claseId: claseId,
    prefijo: prefijo, claves: claves, sello: sello, selloValido: selloValido, crearAlmacen: crearAlmacen, estadoCero: estadoCero, cargar: cargar, guardar: guardar,
    nota: nota, registrarIntento: registrarIntento, notaOficial: notaOficial, ganar: ganar, gastar: gastar };
  if (typeof module !== 'undefined' && module.exports) module.exports = global.Nucleo;
})(typeof window !== 'undefined' ? window : globalThis);
