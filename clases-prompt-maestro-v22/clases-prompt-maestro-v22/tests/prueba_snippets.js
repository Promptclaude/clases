// prueba_snippets.js — extrae del PROPIO prompt (módulos 24 y 27) el código de referencia y lo prueba. node tests/prueba_snippets.js
const fs = require('fs'), path = require('path');
const leer = f => fs.readFileSync(path.join(__dirname, '..', 'prompt', f), 'utf8');
let fallos = 0; const ok = (c, m) => { console.log((c ? '  ✅ ' : '  ❌ ') + m); if (!c) fallos++; };
function extraer(md, nombre) {            // devuelve el texto de la función `nombre` tal como está en el prompt
  const i = md.indexOf('function ' + nombre); if (i < 0) throw new Error('no está en el prompt: ' + nombre);
  let d = 0, j = md.indexOf('{', i), k = j; for (; k < md.length; k++) { if (md[k] === '{') d++; else if (md[k] === '}') { d--; if (!d) break; } }
  return md.slice(i, k + 1);
}
const m24 = leer('24_narrativa_y_personalizacion.md'), m27 = leer('27_aria_conocimiento_y_pistas.md');
// el texto de PROTA y normalizaTexto (la real del widget de ARIA)
const PROTA = { primer: 'Ana', titulo: 'Detective Decimal' };
const normalizaTexto = t => (t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
const hablarA = eval('(' + extraer(m24, 'hablarA') + ')');
const seguro = eval('(' + extraer(m27, 'respuestaAriaSegura') + ')');

console.log('S1 · hablarA (34.1)');
ok(hablarA('Hola {nombre}, {titulo}') === 'Hola Ana, Detective Decimal', 'reemplaza nombre y título');
ok(hablarA('{nombre} y {nombre}') === 'Ana y Ana', 'reemplaza todas las apariciones');
PROTA.primer = ''; PROTA.titulo = ''; ok(hablarA('Hola {nombre}') === 'Hola explorador', 'sin nombre → "explorador"');

console.log('S2 · respuestaAriaSegura (37-B.3): bloquea fugas, permite pistas de proceso');
const preg = { opciones: [{ texto: '12,45 s', correcta: true }, { texto: '12,5 s' }, { texto: 'Son iguales' }] };
const bloquea = [
  'La respuesta es 12,45 s', 'Es la opción B', 'Te diría que es la primera opción', 'la respuesta correcta es la A',
  'El resultado es 12,45', 'Sin duda 12,45 s gana la carrera'];
const permite = [
  '¿Qué tienes que igualar primero para poder comparar?', 'Iguala las cifras agregando ceros y compara de izquierda a derecha.',
  'Mira este ejemplo: 7,30 y 7,3 son iguales porque agregamos un cero.'];
bloquea.forEach(t => ok(seguro(t, preg) === false, 'BLOQUEA: "' + t + '"'));
permite.forEach(t => ok(seguro(t, preg) === true, 'PERMITE: "' + t.slice(0, 50) + '…"'));
console.log(fallos ? `\n❌ ${fallos} fallos` : '\n✅ fragmentos OK'); process.exit(fallos ? 1 : 0);
