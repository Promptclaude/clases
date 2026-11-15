// ═══ v34 · 73 — CONEXIÓN CON EL AULA (servidor del Profe: hoja «Notas y avance») ═══
// El motor define window.AULA_RESUMEN() con el contrato que lee aula-sync.js:
//   {materia, semana, avance 0-100, aciertos, preguntas, nota 0-5}  (+ campos extra que el servidor ignora y sirven para depurar).
// aula-sync.js (si la clase lo carga con meta.aula=true) copia al servidor TODO lo que esta clase guarda en el navegador,
// incluidos los puntos de los juegos y las respuestas «abiertas». Si el aula no está, esta función no se llama: no cambia nada.
window.AULA_RESUMEN = function () {
  const vistos = st.seen ? (st.seen.size !== undefined ? st.seen.size : st.seen.length) : 0, pregs = totalPreguntasReales();
  const juegos = SL.filter(x => CLAVE_HECHO[x.type]), hechos = juegos.filter(x => st.acts[CLAVE_HECHO[x.type] + x.id]).length; let pts = 0;
  SL.forEach(x => { const p = st.acts['pts_' + x.id]; if (typeof p === 'number') pts += p; });
  return { materia: (CONFIG_CLASE.materia + ' ' + CONFIG_CLASE.grado + '°').slice(0, 40), semana: CONFIG_CLASE.semana, avance: Math.min(100, Math.round(vistos / TOT * 100)),
    aciertos: Math.min(st.aciertos || 0, pregs), preguntas: pregs, nota: Math.round(notaOficial() * 10) / 10, juegos: hechos, juegosTotal: juegos.length, puntosJuegos: pts };
};

// ── Respuestas abiertas para el docente ──────────────────────────────────────────────────────────────────────────────
// Al guardar una respuesta abierta (o marcar el cuaderno) el motor deja en el navegador la clave «abiertas:<clase>:<grupo>:<nombre>» con
// {v:1, c:<clase>, g:<grupo>, a:[{s:slide, i:n.º, p:pregunta, r:respuesta, t:hora, tipo?}]}. aula-sync.js la copia al servidor como
// cualquier otra clave y el servidor (Abiertas.gs) la convierte en filas de la hoja «Respuestas abiertas». Solo se envía lo que el
// estudiante GUARDÓ (no los borradores). Si no hay aula, la clave queda en el navegador y no pasa nada.
// <clase> se calcula IGUAL que en aula-sync.js (nombre del archivo): así coincide aunque meta.claseId sea distinto.
const v34Stem = () => { let n = ''; try { n = decodeURIComponent((location.pathname.split('/').pop() || 'index').replace(/\.html?$/i, '')); } catch (e) { n = 'index'; } return n.replace(/[^A-Za-z0-9_.-]/g, '_').slice(0, 44); };
function v34Abiertas() {
  try {
    const a = [];
    SL.forEach(s => {
      if (s.type === 'abierta') { const env = st.acts['abierta_env_' + s.id]; if (env) s.prompts.forEach((p, i) => { if ((env[i] || '').trim()) a.push({ s: s.id, i, p: String(p).slice(0, 300), r: String(env[i]).slice(0, 1500), t: st.acts['abierta_ts_' + s.id] || 0 }); }); }
      if (s.type === 'cuaderno' && st.acts['cuaderno_ok_' + s.id]) a.push({ s: s.id, i: 0, tipo: 'cuaderno', p: String(s.titulo).slice(0, 300), r: 'El estudiante marcó que hizo la hoja a mano y la entregará.', t: st.acts['cuaderno_ts_' + s.id] || 0 });
    });
    if (!a.length) return;
    const stem = v34Stem(), clave = 'abiertas:' + stem + ':' + GRUPO_NORM + ':' + NOMBRE_NORM;
    let cargado = JSON.stringify({ v: 1, c: stem, g: GRUPO, a: a.slice(0, 12) }), tope = 1500;
    while (cargado.length > 28000 && tope > 200) { tope = Math.floor(tope * 0.7); cargado = JSON.stringify({ v: 1, c: stem, g: GRUPO, a: a.slice(0, 12).map(x => Object.assign({}, x, { r: x.r.slice(0, tope) })) }); }
    const ls = almacen(); if (ls.getItem(clave) !== cargado) ls.setItem(clave, cargado);   // única puerta al almacenamiento (si está bloqueado, no pasa nada)
  } catch (e) { /* nunca rompe la clase */ }
}
setTimeout(v34Abiertas, 2000);   // al abrir: si ya había respuestas guardadas (otro equipo), vuelve a dejar el paquete
