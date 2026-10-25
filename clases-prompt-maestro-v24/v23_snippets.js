// ═══ v23 · 39 — NADIE SE QUEDA ATRAPADO: se completa INTENTANDO, no acertando ═══

// Clave de "hecho" por tipo de actividad NO evaluable (una sola tabla; nunca literales sueltos por el código)
const CLAVE_HECHO = {
  drag: 'drag_done_', match: 'match_done_', fill: 'fill_done_', tf: 'tf_done_', orden: 'orden_done_',
  wordsearch: 'ws_min_', interactive: 'exp_min_', minijuego: 'mj_done_', historia: 'historia_done_'
};
const TIPOS_ACTIVIDAD = Object.keys(CLAVE_HECHO);
const T_RESCATE_S = 25;   // a los 25 s aparece "🆘 No me sale" en TODA actividad no evaluable

// modo: 'acierto' | 'intento' | 'solucion' | 'rescate'. NUNCA toca nota, gemas ni XP. NUNCA se usa en quiz/evalFinal.
function marcarActividadHecha(sId, modo) {
  const s = SL.find(x => x.id === sId);
  if (!s || TIPOS_EVALUABLES.includes(s.type)) return false;
  const k = CLAVE_HECHO[s.type];
  if (!k) return false;
  if (!st.acts[k + sId]) {                         // idempotente: doble clic no repite nada
    st.acts[k + sId] = true;
    st.acts['modo_' + sId] = modo || 'intento';
    if (modo === 'rescate' || modo === 'solucion') st.acts['ayuda_' + sId] = true;   // dato para el Panel Docente
  }
  save();                                          // 8-B: en el mismo clic
  aplicarEstadoAvance(s);
  return true;
}

// Cierre universal de un "Verificar": SIEMPRE desbloquea, acierte o no. Devuelve qué mostrar.
// resultado: { aciertos, total, detalle:[{ ok, tuRespuesta, correcta, porQue }] }
function cerrarVerificacion(sId, resultado) {
  st.acts['intentos_' + sId] = (st.acts['intentos_' + sId] || 0) + 1;
  const total = resultado && resultado.total || 0;
  const perfecto = total > 0 && resultado.aciertos >= total;
  marcarActividadHecha(sId, perfecto ? 'acierto' : 'intento');
  return { perfecto, intento: st.acts['intentos_' + sId], mostrarSolucion: !perfecto };
}

// Tarjeta de retroalimentación de cualquier actividad sin nota: dice QUÉ falló, CUÁL era la correcta y POR QUÉ
function htmlFeedbackActividad(resultado) {
  const det = (resultado && resultado.detalle) || [];
  const malas = det.filter(d => !d.ok);
  if (!malas.length) return '<div class="fb-act fb-ok">🎉 ¡Todo bien! Ya puedes continuar.</div>';
  return `<div class="fb-act fb-mal">
    <p class="fb-tit">💡 Casi. Mira cómo se resuelve:</p>
    ${malas.map(d => `<div class="fb-item">
      <p>❌ Tu respuesta: <strong>${d.tuRespuesta || '(vacía)'}</strong></p>
      <p>✅ La correcta: <strong>${d.correcta}</strong></p>
      ${d.porQue ? `<p>🔎 ${d.porQue}</p>` : ''}</div>`).join('')}
    <p class="fb-pie">No pasa nada: equivocarse ayuda a aprender. Ya puedes continuar →</p></div>`;
}

// Minijuegos: ctx.terminar() de 35.3 llama a esto (ganando, perdiendo o saltando)
function finalizarMinijuego(sId, resultado) {
  const e = (resultado && resultado.estrellas) || 0;
  return marcarActividadHecha(sId, e > 0 ? 'acierto' : 'intento');
}
// Historia (34-C): al completar el último beat (cualquier respuesta cuenta)
function finalizarHistoria(sId) { return marcarActividadHecha(sId, 'acierto'); }

// ═══ Rescate universal: ninguna actividad sin nota puede retener a nadie más de T_RESCATE_S ═══
let rescateMarca = null;
window.__rescateTimeout = null;
function activarRescate(s) {
  if (!s || !TIPOS_ACTIVIDAD.includes(s.type)) return;
  if (rescateMarca && rescateMarca.id === s.id) return;                 // idempotente
  rescateMarca = { id: s.id, inicio: Date.now() };
  window.__rescateTimeout = setTimeout(() => mostrarBotonRescate(s.id), T_RESCATE_S * 1000);
}
function desactivarRescate() {
  if (window.__rescateTimeout) { clearTimeout(window.__rescateTimeout); window.__rescateTimeout = null; }
  rescateMarca = null;
  const w = document.getElementById('rescate-wrap'); if (w) w.innerHTML = '';
}
function mostrarBotonRescate(sId) {
  const s = SL[st.slide];
  const w = document.getElementById('rescate-wrap');
  if (!w || !s || s.id !== sId || puedeAvanzar(s)) return;
  w.innerHTML = `<button class="btn-rescate" onclick="usarRescate('${sId}')">🆘 No me sale: ver la respuesta y seguir</button>`;
}
function usarRescate(sId) {
  const s = SL.find(x => x.id === sId);
  if (!s) return;
  try { if (typeof mostrarSolucionActividad === 'function') mostrarSolucionActividad(s); } catch (e) { console.warn('solución:', e); }
  marcarActividadHecha(sId, 'rescate');
  try { showToast('👍 Sin problema: así se resuelve. ¡Sigamos!'); } catch (e) {}
}

// ═══ Razón de bloqueo: "Siguiente" apagado SIEMPRE dice por qué y qué falta ═══
function razonBloqueo(s) {
  if (!s || puedeAvanzar(s)) return '';
  switch (s.type) {
    case 'info': case 'repaso': case 'repaso2': case 'practica': return '⏱️ Lee con calma: en unos segundos podrás seguir.';
    case 'historia':   return st.acts['historia_done_' + s.id] ? '⏳ Un momento más y podrás seguir.' : '👆 Toca los objetos y elige para avanzar la historia.';
    case 'minijuego':  return '🎮 Termina la partida (¡aunque falles!) o pulsa «No me sale».';
    case 'quiz': case 'evalFinal': return '✍️ Responde todas las preguntas (si te equivocas, igual sigues).';
    case 'drag':       return '👆 Suelta al menos 2 fichas en una zona (no importa si no es la correcta).';
    case 'match':      return '🔗 Une algunos pares y pulsa «Verificar».';
    case 'fill':       return '✏️ Escribe lo que creas y pulsa «Verificar».';
    case 'tf':         return '👍 Elige verdadero o falso en cada frase.';
    case 'orden':      return '🔢 Ordena como creas y pulsa «Verificar».';
    case 'wordsearch': return '🔍 Encuentra 1 palabra, o espera y pulsa «No me sale».';
    case 'interactive':return '👆 Toca al menos 1 elemento de la imagen.';
    default: return '';
  }
}
function pintarRazonBloqueo(s) {
  const el = document.getElementById('razon-bloqueo');
  if (!el) return;
  s = s || SL[st.slide];
  const r = razonBloqueo(s);
  el.textContent = r || '🔓 ¡Listo! Ya puedes continuar.';
  el.classList.toggle('razon-ok', !r);
}

// ═══ puedeAvanzar(s) — versión ÚNICA v23 (reemplaza la de 8-O: ahora cubre historia y minijuego) ═══
function puedeAvanzar(s) {
  if (!s) return true;
  if (st.modoAdmin) return true;
  if (st.reintentoActivo && !TIPOS_EVALUABLES.includes(s.type)) return true;
  switch (s.type) {
    case 'info': case 'repaso': case 'repaso2': case 'practica':
      return !!st.acts['leido_' + s.id];
    case 'quiz': case 'evalFinal':
      return st.acts['completado_' + s.id] === true;            // responder (bien o mal) basta
    case 'historia':
      return !!st.acts['historia_done_' + s.id] && (Date.now() - (st.acts['historia_t0_' + s.id] || 0) >= 10000);
    case 'minijuego':  return !!st.acts['mj_done_'     + s.id];
    case 'drag':       return !!st.acts['drag_done_'   + s.id];
    case 'match':      return !!st.acts['match_done_'  + s.id];
    case 'fill':       return !!st.acts['fill_done_'   + s.id];
    case 'tf':         return !!st.acts['tf_done_'     + s.id];
    case 'orden':      return !!st.acts['orden_done_'  + s.id];
    case 'wordsearch': return !!st.acts['ws_min_'      + s.id];
    case 'interactive':return !!st.acts['exp_min_'     + s.id];
    default:           return true;                             // intro, final
  }
}

// ═══ aplicarEstadoAvance(s) — versión v23: igual que 8-O + razón visible + rescate ═══
function aplicarEstadoAvance(s) {
  s = s || SL[st.slide];
  if (!s) return;
  if (puedeAvanzar(s)) { detenerCronometroLectura(); habilitarBtnNext(); desactivarRescate(); pintarRazonBloqueo(s); return; }
  deshabilitarBtnNext();
  if (TIPOS_LECTURA.includes(s.type)) activarCronometroLectura(s.id, 12);   // lectura: la libera el cronómetro, no el rescate
  if (TIPOS_ACTIVIDAD.includes(s.type)) activarRescate(s);
  pintarRazonBloqueo(s);
}

// ═══ v23 · 40 — RETROALIMENTACIÓN QUE EDUCA (quiz): qué marcaste, cuál era, por qué falló, cómo se resuelve ═══
function registrarRespuestaQuiz(s, v, op, idxNum, correcta) {
  const buena = (v.preg.opciones || []).find(o => o.correcta) || {};
  if (!st.acts['quiz_resps_' + s.id]) st.acts['quiz_resps_' + s.id] = [];
  st.acts['quiz_resps_' + s.id].push({
    pregIdx: idxNum, pregId: v.preg.id || ('p' + idxNum), opId: op.id, correcta,
    retro: v.preg.retroalimentacion || '',
    tuTexto: op.texto || '', buenaTexto: buena.texto || '',
    porQue: correcta ? '' : (op.porQue || v.preg.errorComun || '')
  });
}
function htmlRetroQuiz(sId) {
  const idxPend = st.acts['quiz_retro_pend_' + sId];
  const r = (st.acts['quiz_resps_' + sId] || []).find(x => x.pregIdx === idxPend);
  if (!r) return '';
  const cerroQuiz = st.acts['completado_' + sId] === true;
  const nota = calcTotal().toFixed(1);
  const cuerpoMal = `
    <div class="retro-bloque retro-tu">Tu respuesta: <strong>${r.tuTexto || '—'}</strong></div>
    <div class="retro-bloque retro-buena">✅ La correcta: <strong>${r.buenaTexto || '—'}</strong></div>
    ${r.porQue ? `<div class="retro-bloque retro-porque">🔎 ¿En qué te equivocaste? ${r.porQue}</div>` : ''}`;
  return `<div data-retro-quiz="1" style="text-align:center;padding:10px 0">
    <div style="font-size:3rem;margin-bottom:8px">${r.correcta ? '✅' : '❌'}</div>
    <h2 style="font-family:var(--font-ui);font-size:1.1rem;color:${r.correcta ? 'var(--success)' : 'var(--error)'};margin-bottom:10px">
      ${r.correcta ? '¡Muy bien! +1 ⭐' : 'Esta vez no era esa. ¡Mira cómo se resuelve!'}</h2>
    ${r.correcta ? '' : cuerpoMal}
    ${r.retro ? `<div class="retro-bloque retro-como"><strong>💡 Así se resuelve:</strong><br>${r.retro}</div>` : ''}
    <div class="retro-nota">⭐ Nota de este intento: <strong>${nota}</strong> / 5.0</div>
    <button class="mbtn" onclick="closeModal()" style="width:100%">
      ${cerroQuiz ? '📊 Ver mi resultado' : (r.correcta ? '🚀 Siguiente pregunta' : '➡️ Entendido, continuar')}</button>
  </div>`;
}

// ═══ v23 · 41 — NOTA EN VIVO: el HUD muestra el INTENTO EN CURSO y, aparte, la mejor nota ═══
window.__notaMostrada = null;
function notaPrincipalHud() {
  // 1.er intento: nota oficial == nota del intento. En reintento: el intento en curso (la que sube con cada acierto).
  return (st.intentos || 1) > 1 ? calcTotal() : notaOficial();
}
function pintarNota() {
  try {
    const el = document.getElementById('nota-hud');
    if (!el) { window.__hudFaltante = true; return false; }          // el auditor exige que el HUD exista (41)
    const principal = notaPrincipalHud();
    const prev = window.__notaMostrada;
    el.textContent = principal.toFixed(1);
    const ac = document.getElementById('aciertos-hud');
    if (ac) ac.textContent = `${st.aciertos || 0}/${totalPreguntasReales()} ✅`;
    const sub = document.getElementById('nota-intento-hud');
    if (sub) {
      const mejor = st.mejorNota || 0;
      sub.textContent = ((st.intentos || 1) > 1 && mejor > 0) ? `🏅 Mejor nota: ${mejor.toFixed(1)} (es la que cuenta)` : '';
    }
    if (prev !== null && principal > prev + 1e-9) {
      const d = document.getElementById('nota-delta');
      if (d) {
        d.textContent = '+' + (principal - prev).toFixed(2);
        d.classList.remove('delta-vis'); void d.offsetWidth; d.classList.add('delta-vis');   // reinicia la animación
      }
      el.classList.remove('hud-pulso'); void el.offsetWidth; el.classList.add('hud-pulso');
    }
    window.__notaMostrada = principal;
    return true;
  } catch (e) { console.warn('pintarNota:', e); return false; }
}
function updScore() {                                                   // versión v23: pinta y luego avisa al docente
  actualizarMejorNota();
  pintarNota();
  try { checarHitoNotaDocente(); } catch (e) {}
}
function repararHudNota() {                                             // vigilante: si la pantalla no coincide con el estado, repinta
  const el = document.getElementById('nota-hud');
  if (!el) return;
  if (el.textContent !== notaPrincipalHud().toFixed(1)) pintarNota();
}

// ═══ v23 · 42 — GUARDADO QUE NO FALLA EN SILENCIO + ÍNDICE CON TODO EL AVANCE ═══
let fallosGuardado = 0;
function reportarFalloGuardado(e) {
  fallosGuardado++;
  console.warn('Error al guardar:', e);
  if (fallosGuardado >= 2) {
    const b = document.getElementById('aviso-guardado');
    if (b) b.textContent = '⚠️ No se pudo guardar tu avance en este equipo. Avísale al profe Luis (no cierres la pestaña).';
    if (b) b.style.display = 'block';
  }
}
function guardadoExitoso() {
  fallosGuardado = 0;
  const b = document.getElementById('aviso-guardado'); if (b) b.style.display = 'none';
}
function preguntasRespondidasTotal() {
  let n = 0;
  Object.keys(st.acts).forEach(k => { if (k.startsWith('quiz_resps_')) n += (st.acts[k] || []).length; });
  return n;
}
function preguntasFalladasIds() {                                        // ids únicos de preguntas falladas (máx. 40)
  const out = [];
  Object.keys(st.acts).forEach(k => { if (k.startsWith('quiz_resps_')) (st.acts[k] || []).forEach(r => { if (!r.correcta && r.pregId && !out.includes(r.pregId)) out.push(r.pregId); }); });
  return out.slice(0, 40);
}
// v24 (44): mensaje de crecimiento — compara contigo mismo, nunca con otros
function mensajeMejora() {
  const h = st.historialIntentos || [];
  if (!h.length) return '';
  const ant = h[h.length - 1].nota, ahora = calcTotal();
  if (ahora > ant + 1e-9) return `📈 ¡Mejoraste ${(ahora - ant).toFixed(1)} frente a tu intento anterior!`;
  if (ahora >= ant - 1e-9) return '💪 Igualaste tu intento anterior. ¡Vas firme!';
  return '🌱 Todavía estás aprendiendo este tema. Tu mejor nota sigue segura.';
}
function construirEntradaEstudiante() {
  const tot = TOT;                                                       // = SL.length (8-O), nunca un número escrito a mano
  const vistas = st.seen.size;
  const completada = vistas >= tot || (SL[st.slide] && SL[st.slide].type === 'final');
  return {
    studentUser: NOMBRE_NORM, studentName: st.name,
    nota: notaOficial(),                                                 // la mejor nota (8-U): es la oficial
    notaIntentoActual: calcTotal(),                                      // la del intento en curso
    mejorNota: st.mejorNota || 0, mejorIntento: st.mejorIntento || 1, intentos: st.intentos || 1,
    porcentajeAvance: Math.min(100, Math.round((vistas / tot) * 100)),
    slideActual: (st.slide || 0) + 1, totalSlides: tot,                  // v23: "Slide 12 de 23" que pide la tarjeta del index
    preguntasRespondidas: preguntasRespondidasTotal(), totalPreguntas: totalPreguntasReales(),
    completada: !!completada,                                            // v23: el index ya no tiene que adivinarlo
    actividadesConAyuda: Object.keys(st.acts).filter(k => k.startsWith('ayuda_')).length,
    preguntasFalladas: preguntasFalladasIds(),                           // v24: el docente ve qué preguntas se fallan más
    xp: st.xp || 0, medallas: st.badges || [], semaforo: calcularSemaforoParticipacion(),
    ultimoAcceso: new Date().toISOString(), vidasUsadas: st.vidasUsadas || 0,
    semana: CONFIG_CLASE.semana, grupo: GRUPO_NORM, claseId: CLASE_ID, version: 2
  };
}
// Lado del index: tolera entradas v1 (sin los campos nuevos) y v2
function normalizarEntradaIndex(d) {
  if (!d || typeof d !== 'object') return null;
  const nota = Number(d.nota);
  if (!(nota >= 0 && nota <= 5)) return null;
  const pct = Number(d.porcentajeAvance != null ? d.porcentajeAvance : d.porcentaje);
  return {
    nota, notaIntentoActual: d.notaIntentoActual != null ? Number(d.notaIntentoActual) : nota,
    pct: pct >= 0 && pct <= 100 ? pct : 0,
    slideActual: d.slideActual || null, totalSlides: d.totalSlides || null,
    completada: d.completada != null ? !!d.completada : pct >= 100,
    vidasUsadas: d.vidasUsadas || 0, intentos: d.intentos || 1, fecha: d.ultimoAcceso || d.fecha || ''
  };
}

// ═══ v23 · 42 — Sesión válida: SELLO ESTRICTO (reemplaza sesionGuardadaEsValida de 8-V) ═══
function sesionGuardadaEsValida(d) {
  if (!d || typeof d !== 'object') return false;
  return d.studentId === NOMBRE_NORM && d.grupo === GRUPO_NORM &&
         Number(d.semana) === Number(CONFIG_CLASE.semana) && d.claseId === CLASE_ID;   // sin sello completo = inválido (cuarentena)
}
function esEstudianteNuevo() { return almacen().getItem(SKEY) === null; }
