// prueba_nucleo.js — pruebas del núcleo (sin navegador): node tests/prueba_nucleo.js
const N = require('../motor/nucleo.js');
let fallos = 0; const ok = (c, m) => { console.log((c ? '  ✅ ' : '  ❌ ') + m); if (!c) fallos++; };
const fake = () => { const m = {}; return { getItem: k => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); }, removeItem: k => { delete m[k]; }, _m: m }; };
const S4 = { curso: 'mat', grado: '4', periodo: '4', semana: 4 }, S5 = { curso: 'mat', grado: '4', periodo: '4', semana: 5 };

console.log('N1 · claves distintas por semana, curso, grupo y estudiante');
const ks = [N.claves(S4, 'Ana', '401').sesion, N.claves(S5, 'Ana', '401').sesion, N.claves(S5, 'Ana', '402').sesion, N.claves(S5, 'Luis', '401').sesion,
  N.claves({ ...S5, curso: 'tec' }, 'Ana', '401').sesion, N.claves({ ...S5, grado: '5' }, 'Ana', '401').sesion];
ok(new Set(ks).size === ks.length, 'las 6 combinaciones producen 6 claves diferentes');
ok(N.claves(S5, 'Ana', '401').sesion !== N.claves(S5, 'Ana', '401').resumen, 'sesión y resumen NUNCA comparten clave');
ok(!N.claves(S5, 'Ana', '401').baul.includes('_s5'), 'el baúl acumulable no depende de la semana (solo cosméticos)');

console.log('N2 · semana nueva = cero real aunque haya datos de la semana anterior');
{ const al = N.crearAlmacen(fake()); let r = N.cargar(al, S4, 'María José Peña', '401'); r.estado.mejorNota = 4; r.estado.eco.gemas = 50; N.guardar(al, S4, r.estado);
  const nuevo = N.cargar(al, S5, 'María José Peña', '401');
  ok(nuevo.estado.mejorNota === 0 && nuevo.estado.eco.gemas === 0 && nuevo.estado.slide === 0, 'la semana 5 abre con nota 0, 0 gemas y slide 0');
  ok(N.cargar(al, S4, 'María José Peña', '401').estado.mejorNota === 4, 'la semana 4 sigue intacta');
  // fuga: alguien copia a mano el dato de la semana 4 bajo la clave de la semana 5 (el bug de la clase copiada)
  const st = fake(); const al2 = N.crearAlmacen(st); const a4 = N.cargar(al2, S4, 'Ana', '401').estado; a4.mejorNota = 4.5; N.guardar(al2, S4, a4);
  st.setItem(N.claves(S5, 'Ana', '401').sesion, st.getItem(N.claves(S4, 'Ana', '401').sesion));
  const f = N.cargar(al2, S5, 'Ana', '401'); ok(f.estado.mejorNota === 0 && f.origen === 'cuarentena', 'dato de otra semana copiado bajo la clave nueva → cuarentena y nota 0'); }

console.log('N3 · un dato SIN sello se rechaza (el hueco de la v21)');
{ const st = fake(); const al = N.crearAlmacen(st); st.setItem(N.claves(S5, 'Ana', '401').sesion, JSON.stringify({ mejorNota: 4.8, slide: 9, nombre: 'Ana' }));
  const r = N.cargar(al, S5, 'Ana', '401'); ok(r.estado.mejorNota === 0 && r.origen === 'cuarentena', 'sin sello → nota 0, no se hereda'); }

console.log('N4 · otra persona / otro grupo no contamina');
{ const al = N.crearAlmacen(fake()); const a = N.cargar(al, S5, 'Ana', '401').estado; a.mejorNota = 5; N.guardar(al, S5, a);
  ok(N.cargar(al, S5, 'Luis', '401').estado.mejorNota === 0, 'otro estudiante empieza en 0');
  ok(N.cargar(al, S5, 'Ana', '402').estado.mejorNota === 0, 'mismo nombre en otro grupo empieza en 0'); }

console.log('N5 · la mejor nota solo SUBE (3.5 → 2.0 → 4.2)');
{ const e = N.estadoCero(S5, 'Ana', '401');
  let r = N.registrarIntento(e, 21, 30); ok(r.nota === 3.5 && r.oficial === 3.5, 'intento 1: 3.5'); e.intentos = 2;
  r = N.registrarIntento(e, 12, 30); ok(r.nota === 2 && r.oficial === 3.5 && !r.subio, 'intento 2 saca 2.0 → oficial se queda en 3.5'); e.intentos = 3;
  r = N.registrarIntento(e, 25, 30); ok(r.nota === 4.17 && r.oficial === 4.17 && r.subio, 'intento 3 saca 4.17 → oficial sube');
  ok(e.historial.length === 3 && e.mejorIntento === 3, 'el historial guarda los 3 intentos');
  const e0 = N.estadoCero(S5, 'Ana', '401'); N.registrarIntento(e0, 0, 30); ok(N.notaOficial(e0) === 0, 'primer intento de 0 aciertos → oficial 0 sin errores');
  ok(N.nota(99, 30) === 5 && N.nota(-3, 30) === 0 && N.nota(5, 0) === 0, 'la nota se acota entre 0 y 5'); }

console.log('N6 · la mejor nota sobrevive a recargar');
{ const al = N.crearAlmacen(fake()); const e = N.cargar(al, S5, 'Ana', '401').estado; N.registrarIntento(e, 27, 30); e.intentos = 2; N.registrarIntento(e, 6, 30); N.guardar(al, S5, e);
  const e2 = N.cargar(al, S5, 'Ana', '401'); ok(e2.origen === 'sesion' && e2.estado.mejorNota === 4.5 && e2.estado.historial.length === 2, 'tras recargar: mejor 4.5, 2 intentos'); }

console.log('N7 · billetera: sin doble gasto, sin saldo negativo, con topes');
{ const e = N.estadoCero(S5, 'Ana', '401');
  ok(N.ganar(e, 5, 'minijuego', 'mj1') === 5 && N.ganar(e, 5, 'minijuego', 'mj1') === 0 && e.eco.gemas === 5, 'el mismo premio no se cobra dos veces');
  ok(N.ganar(e, 10, 'lectura', 'l1', 6) === 6 && N.ganar(e, 10, 'lectura', 'l2', 6) === 0, 'el tope por fuente se respeta');
  ok(N.gastar(e, 50, 'pista', 'p1').ok === false && e.eco.gemas === 11, 'saldo insuficiente: no gasta');
  ok(N.gastar(e, 3, 'pista', 'p2').ok && e.eco.gemas === 8, 'gasta 3');
  ok(N.gastar(e, 3, 'pista', 'p2').razon === 'repetida' && e.eco.gemas === 8, 'doble clic rápido: no cobra dos veces');
  ok(N.gastar(e, -4, 'x', 'p3').ok === false && N.gastar(e, 2, 'x', '').ok === false, 'montos negativos o sin id se rechazan'); }

console.log('N8 · almacenamiento roto o corrupto no rompe la clase');
{ const roto = { getItem() { throw new Error('bloqueado'); }, setItem() { throw new Error('lleno'); }, removeItem() {} };
  const al = N.crearAlmacen(roto); let r; try { r = N.cargar(al, S5, 'Ana', '401'); N.guardar(al, S5, r.estado); } catch (e) { r = null; }
  ok(r && r.estado.slide === 0 && al.memoria === true, 'sin localStorage: arranca en cero y avisa que está en memoria');
  const st = fake(); st.setItem(N.claves(S5, 'Ana', '401').sesion, '{esto no es json'); const r2 = N.cargar(N.crearAlmacen(st), S5, 'Ana', '401'); ok(r2.estado.mejorNota === 0, 'JSON corrupto → estado en cero'); }

console.log('N9 · CFG incompleto falla fuerte (mejor que una clase con claves "undefined")');
ok((() => { try { N.claves({ curso: 'mat', grado: '4', semana: 5 }, 'Ana', '401'); return false; } catch (e) { return true; } })(), 'sin periodo → error claro');
ok((() => { try { N.claves({ curso: 'mat', grado: '4', periodo: '4' }, 'Ana', '401'); return false; } catch (e) { return true; } })(), 'sin semana → error claro');

console.log('N10 · contrato con el index (8-K / 8-F)');
{ const k = N.claves(S5, 'María José Peña', ' 401 ');
  ok(k.sesion === 'mat_4_401_p4_s5_maria_jose_pena_session' && k.resumen === 'mat_4_401_p4_s5_maria_jose_pena_data', 'formato PREFIX_usuario_session / _data igual al del index');
  ok(N.claves(S5, 'Ana', '401', { storagePrefix: 'mat_4_401_p4_s5', grupo: '401' }).prefijo === 'mat_4_401_p4_s5', 'usa el storagePrefix del index cuando es de esta semana y grupo');
  ok(N.claves(S5, 'Ana', '401', { storagePrefix: 'mat_4_401_p4_s4', grupo: '401' }).prefijo === 'mat_4_401_p4_s5', 'IGNORA el storagePrefix del index si es de otra semana (8-V)');
  ok(N.claves(S5, 'Ana', '401', { storagePrefix: 'mat_4_402_p4_s5', grupo: '402' }).prefijo === 'mat_4_401_p4_s5', 'IGNORA el storagePrefix si es de otro grupo');
  ok(N.claves(S5, 'Ana', '').prefijo === 'mat_4_sinregistro_p4_s5', 'sin grupo → "sinregistro" (8-K)');
  const st = fake(), al = N.crearAlmacen(st), e = N.cargar(al, S5, 'Ana', '401').estado; e.vistos = [0, 1, 2, 3]; N.registrarIntento(e, 24, 30);
  N.guardar(al, S5, e, { totalSlides: 23, xp: 40, medallas: ['b1'], semaforo: 'verde', notaIntentoActual: 4 });
  const entrada = JSON.parse(st.getItem(N.claves(S5, 'Ana', '401').resumen));
  ok(entrada.nota === 4 && entrada.porcentajeAvance === 17 && entrada.semana === 5 && entrada.claseId === 'mat_4_p4_s5' && entrada.studentUser === 'ana' && entrada.version === 1, 'la entrada para el index trae nota, avance, semana, claseId y sello');
  ok(JSON.parse(st.getItem('clases_guardadas')).includes(N.claves(S5, 'Ana', '401').resumen), 'la clave se registra en clases_guardadas (el index la descubre)');
  ok(JSON.parse(st.getItem(N.claves(S5, 'Ana', '401').sesion)).sello.semana === 5 && !('porcentajeAvance' in JSON.parse(st.getItem(N.claves(S5, 'Ana', '401').sesion))), 'la sesión (con sello) y el resumen son objetos distintos');
  // el index de la semana 5 solo ve su semana: la clave de la semana 4 es otra
  ok(N.claves(S4, 'Ana', '401').resumen !== N.claves(S5, 'Ana', '401').resumen, 'cada semana tiene su propia clave para el index'); }

console.log(fallos ? `\n❌ ${fallos} fallos` : '\n✅ núcleo OK'); process.exit(fallos ? 1 : 0);
