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
