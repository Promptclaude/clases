---
modulo: 15_motores_y_pruebas
etapa_de_lectura: 2
prioridades: [8-M, 8-N, 8-O, 8-P, 8-Q, 8-R, 8-S, 8-T]
---

# 15 · Motores canónicos: cronómetro, navegación, quiz, modales, onclick seguro, temporizadores y prueba automática

## 🔺 PRIORIDAD 8-M · MÁXIMA — BLINDAJE ANTI-CLIC-RÁPIDO EN QUIZZES, TOPE DE ACIERTOS, Y RESET DE VIDAS DEL PANEL DOCENTE ALINEADO CON EL DEL ESTUDIANTE

### 🚨 BUG CRÍTICO DE PRODUCCIÓN CONFIRMADO: DAR CLIC VARIAS VECES RÁPIDO EN UNA OPCIÓN INFLABA LA NOTA
**Reporte real:** un estudiante daba clic varias veces muy rápido sobre la opción de respuesta (ej. 5 veces sobre la opción B) y cada clic sumaba +1 acierto — la nota subía como si hubiera respondido varias preguntas, cuando en realidad solo había una pregunta visible. Esto permitía sacar nota máxima desde el primer quiz sin responder el resto.
**Causa raíz:** el `responderQuiz()` original no verificaba nada antes de sumar el acierto — cada clic ejecutaba la función de nuevo. La regla de oro de 8-M es que **el candado debe cerrarse ANTES de tocar la nota, y los botones deben quedar físicamente inutilizables en el mismo instante del primer clic** — no depender solo de una marca en `st.acts`.
### ⚖️ REGLA ABSOLUTA E INAPELABLE
1. `responderQuiz()` **primero** verifica que `pregIdx` sea exactamente el índice actual (`st.acts['quiz_idx_'+sId] || 0`) — si no coincide (clic tardío/duplicado) se ignora en silencio, sin tocar la nota ni mostrar error. *(Guardia 1)*
2. **En el mismo instante del primer clic válido**, antes de cualquier otra línea que toque la nota, se cierra el candado `q_contada_<id>_<n>` y se deshabilitan **de forma síncrona** todos los botones `.quiz-opt`. *(Guardia 2)*
3. `st.aciertos` **nunca** puede ser mayor que el número real de preguntas de la clase — tope de seguridad en `calcTotal()`, independiente de las anteriores. *(Guardia 3)*
4.  **v12.0 —** el candado se cierra en el primer clic, **y por eso el índice de pregunta TAMBIÉN avanza en ese mismo clic** (nunca dentro del callback de un modal). Un candado cerrado con el índice sin avanzar es la receta exacta de una **pregunta muerta**: el estudiante recarga antes de pulsar "Continuar", la pregunta reaparece con las opciones habilitadas y todos sus clics son ignorados en silencio, para siempre.


```javascript
// ═══ Guardia 3 — calcTotal(): tope duro contra cualquier desincronización futura ═══
// la ÚNICA calcTotal() vive en la Prioridad 8-U (incluye este tope: st.aciertos nunca supera el total real de
// preguntas, y recalcularAciertosDesdeContadores() de 8-H). No declarar una segunda función calcTotal() aquí.
```
### ❤️ Reset de vidas del panel docente alineado con el reintento del estudiante
**Bug relacionado:** "Reset solo Quizzes" del panel docente borraba los quizzes pero dejaba al estudiante en la misma slide donde estaba — a diferencia de "Reintentar" del estudiante (Prioridad 6-B), que salta directo a los evaluables pendientes. Y (hallazgo v12.0) ni uno ni otro borraban los candados `q_contada_*`, así que el quiz rehecho quedaba **muerto**. La solución está en las funciones únicas de 8-P: `pd_resetQuizzes()` (Prioridad 16) y `confirmarReintento()` (Prioridad 6) terminan **exactamente igual**: `resetearTodosLosQuizzes()` + `iniciarReintentoDirigido()`.
### 🧪 PRUEBA OBLIGATORIA — se ejecuta con `prueba_clase.js` (Prioridad 8-T) o, sin ejecución de código, a mano:
```
PASO 1: Abrir un quiz y dar clic 5 veces MUY rápido (o doble clic) sobre la misma opción
RESULTADO ESPERADO: st.aciertos sube en 1 como máximo; el índice avanza exactamente 1; no aparecen 5 modales
PASO 2: Revisar que solo existe UNA entrada en quiz_resps_<id> para esa pregunta
PASO 3: Usar "Reset solo Quizzes" del panel docente: el estudiante queda en el primer quiz pendiente Y su PRIMER clic cuenta
        (si el clic no hace nada, quedaron candados q_contada_* sin borrar)
PASO 4: Responder una pregunta, recargar (F5) con la retroalimentación abierta: la retro reaparece y la pregunta siguiente responde
```
**Checklist:**
```
[ ] responderQuiz() verifica pregIdx === quiz_idx_ ANTES de tocar st.aciertos (Guardia 1)
[ ] El candado (q_contada_) se cierra ANTES de sumar el acierto, no después (Guardia 2)
[ ] Los botones .quiz-opt quedan disabled/pointer-events:none en el MISMO clic que cuenta, de forma síncrona
[ ]  quiz_idx_ avanza en ese MISMO clic (nunca en el callback de un modal)
[ ] calcTotal() incluye el tope: st.aciertos nunca supera el total real de preguntas (Guardia 3)
[ ] pd_resetQuizzes() y confirmarReintento() usan resetearTodosLosQuizzes() + iniciarReintentoDirigido()
[ ] Prueba de 5 clics rápidos: la nota sube como máximo en 1 acierto
[ ] Existe UNA sola función responderQuiz() en todo el archivo
```


## 🔺 PRIORIDAD 8-N · MÁXIMA — MOTOR DEL CRONÓMETRO DE LECTURA: HANDLE GLOBAL, TIEMPO REAL E IDEMPOTENTE

### 🚨 TRES BUGS REALES DE PRODUCCIÓN, UN MISMO MOTOR
**Bug 1 — temporizadores fantasma → la clase se congelaba.** `activarCronometroLectura()` guardaba el `setInterval` en una variable **local** que solo se limpiaba al llegar a 0. Si el estudiante cambiaba de slide antes (Atrás, salto, reintento), el intervalo seguía vivo para siempre y cada regreso creaba otro más; con suficientes idas y vueltas la pestaña dejaba de responder a los clics. Además, al llegar a 0, un cronómetro viejo habilitaba el "Siguiente" de OTRA slide todavía bloqueada.
**Bug 2 — la cuenta jamás llegaba a 0.** Toda clase con una red de seguridad (`revalidarAvance()` cada 3 s, en `focus`, `pageshow`, al cerrar cualquier modal…) volvía a llamar a `activarCronometroLectura()`. Como esa función empezaba SIEMPRE con `detenerCronometroLectura()` y reiniciaba el instante de inicio, la cuenta de 12 s se reiniciaba cada ≤3 s: el estudiante veía **12 → 11 → 10 → 12 → 11 → 10…** y "Siguiente" no se habilitaba jamás. El vigilante que debía evitar el bloqueo lo provocaba. (La versión de v11.4 de esta prioridad tenía este mismo defecto.)
**Bug 3 — pestaña en segundo plano.** El motor contaba ticks (`restantes--`) y arrancaba dentro de `requestAnimationFrame`. Con la pestaña o la tablet en segundo plano el navegador frena los `setInterval` y NO ejecuta rAF: la cuenta quedaba congelada a mitad o nunca arrancaba.
### ⚖️ REGLAS ABSOLUTAS E INAPELABLES
1. **Handle único y global:** el `setInterval` se guarda SIEMPRE en `window.__cronometroInterval`, nunca en una variable local.
2. **IDEMPOTENTE:** si ya corre el cronómetro de ESTA slide, `activarCronometroLectura()` **no hace nada** (ni toca el intervalo, ni el instante de inicio). Llamarla 1 o 1000 veces produce el mismo cronómetro. **Un vigilante solo repara: jamás reinicia un proceso sano.**
3. **Tiempo real:** el restante se calcula con `Date.now()` contra un instante de inicio guardado — jamás con `restantes--`.
4. **El instante de inicio se recuerda por slide** (`lecturaMarca`) y solo lo descarta `render()` al CAMBIAR de slide: ni siquiera un `render()` repetido sobre la misma slide reinicia la cuenta.
5. **Un solo punto de desbloqueo:** `completarLectura(slideId)`. La llaman el tick del cronómetro y el vigilante `revalidarAvance()` (8-O) cuando comprueba por tiempo real que ya pasaron los segundos aunque el intervalo no haya alcanzado a ejecutarse.
6. **Los casos "sin cuenta" HABILITAN el botón:** modo admin, reintento dirigido y slide ya leída terminan con `habilitarBtnNext(); return;` — **nunca con un `return` a secas** (`render()` ya lo había deshabilitado: slide trabada). En admin/reintento NO se marca `leido_`, para no contaminar el estado del estudiante.
7. **`render()` llama a `detenerCronometroLectura()` como su primera línea, sin excepción** (ver 8-O), y arranca el cronómetro solo por `aplicarEstadoAvance()`, **de forma síncrona** (nunca `requestAnimationFrame`/`setTimeout`).
```javascript
// ═══ 1) ESTADO GLOBAL DEL CRONÓMETRO — declarar a nivel de script (nunca dentro de una función) ═══
let cronoActivo  = null;   // { slideId, segs, inicio } — el cronómetro vivo, o null
let lecturaMarca = null;   // { id, t0 } — instante en que el estudiante EMPEZÓ a leer la slide actual
window.__cronometroInterval = null;   // handle ÚNICO y global del setInterval — nunca una variable local

// ═══ 2) detenerCronometroLectura() — único punto que mata el intervalo Y borra el indicador ═══
function detenerCronometroLectura() {
  if (window.__cronometroInterval) { clearInterval(window.__cronometroInterval); window.__cronometroInterval = null; }
  cronoActivo = null;
  const ind = document.getElementById('cronometro-lect');
  if (ind) ind.remove();
}

// ═══ 3) completarLectura() — ÚNICO punto que desbloquea una slide de lectura ═══
// La llaman: el tick del cronómetro, y el vigilante revalidarAvance() (8-O) cuando comprueba
// por TIEMPO REAL que ya pasaron los segundos aunque el navegador haya frenado el setInterval.
function completarLectura(slideId) {
  detenerCronometroLectura();
  lecturaMarca = null;
  st.acts['leido_' + slideId] = true;
  save();
  habilitarBtnNext();
  const b = document.getElementById('btn-next');
  if (b) b.style.animation = 'pulse 0.4s ease';
  showToast('✅ ¡Listo! Ya puedes continuar →');
}

// ═══ 4) activarCronometroLectura() — IDEMPOTENTE, por tiempo real, handle global ═══
function activarCronometroLectura(slideId, segundos) {
  segundos = segundos || 12;   // 12 s mínimo — no bajar
  // 🔺🔺🔺 IDEMPOTENTE (8-O): si ya corre el cronómetro de ESTA slide, no se toca NADA — ni el
  // intervalo ni el instante de inicio. Quien llame esto 100 veces (vigilante, focus, render…)
  // obtiene siempre el mismo cronómetro, nunca un reinicio.
  if (cronoActivo && cronoActivo.slideId === slideId &&
      window.__cronometroInterval && document.getElementById('cronometro-lect')) return;
  detenerCronometroLectura();   // 🔺 jamás dos cronómetros a la vez (8-N)
  // Casos que NUNCA cuentan tiempo y que SIEMPRE dejan el botón HABILITADO. (Un `return` a secas
  // aquí dejaría el botón apagado por render() → slide trabada: bug real del reintento y del modo admin.)
  if (st.modoAdmin || st.reintentoActivo || st.acts['leido_' + slideId]) { habilitarBtnNext(); return; }
  const btnNext = document.getElementById('btn-next');
  if (!btnNext) return;
  deshabilitarBtnNext();
  let ind = document.getElementById('cronometro-lect');
  if (!ind) { ind = document.createElement('div'); ind.id = 'cronometro-lect'; btnNext.parentNode.insertBefore(ind, btnNext); }
  // 🔺 El instante de inicio se recuerda por slide y solo lo descarta render() al CAMBIAR de slide.
  if (!lecturaMarca || lecturaMarca.id !== slideId) lecturaMarca = { id: slideId, t0: Date.now() };
  const inicio = lecturaMarca.t0;
  cronoActivo = { slideId, segs: segundos, inicio };
  function tick() {
    if (!cronoActivo || cronoActivo.slideId !== slideId) return;                    // otro cronómetro tomó el lugar
    if (SL[st.slide] && SL[st.slide].id !== slideId) { detenerCronometroLectura(); return; } // ya cambió de slide
    const restantes = Math.max(0, Math.ceil(segundos - (Date.now() - inicio) / 1000));  // TIEMPO REAL, nunca `restantes--`
    if (restantes <= 0) { completarLectura(slideId); return; }
    ind.innerHTML = htmlIndicadorCronometro(restantes, segundos);
  }
  tick();
  if (!cronoActivo || cronoActivo.slideId !== slideId) return;   // tick() ya pudo completar la lectura
  window.__cronometroInterval = setInterval(tick, 1000);          // handle GLOBAL (8-N)
}
```
### 🧪 PRUEBA OBLIGATORIA — SIMULAR ANTES DE ENTREGAR (la automatiza `prueba_clase.js`, Prioridad 8-T: pruebas T1, T2 y T3)
```
PASO 1: Entrar a una slide de lectura y esperar 4-5 s mientras el vigilante (cada 3 s) y un evento "focus" corren
RESULTADO ESPERADO: la cuenta BAJA de forma continua (11 → 7 …); NUNCA vuelve a 12
PASO 2: Esperar hasta pasar los 12 s → "Siguiente" se habilita solo
PASO 3: Simular pestaña suspendida (adelantar el reloj 30 s SIN ejecutar timers) y llamar revalidarAvance() → "Siguiente" se habilita
PASO 4: Entrar/salir de slides de lectura 5 veces sin terminar la cuenta → window.__cronometroInterval contiene como máximo UN id;
        el número de setInterval vivos no crece; existe como máximo un #cronometro-lect en pantalla
Si algún punto falla, el blindaje de 8-N no quedó bien implementado — prueba innegociable.
```
**Checklist:**
```
[ ] El intervalo se guarda SIEMPRE en window.__cronometroInterval, nunca en una variable local
[ ] detenerCronometroLectura() limpia el intervalo (clearInterval + null) Y elimina #cronometro-lect
[ ] activarCronometroLectura() es IDEMPOTENTE: si ya corre el cronómetro de esa slide, retorna sin tocar nada
[ ] La cuenta usa Date.now() contra lecturaMarca.t0 — no existe `restantes--` en el código
[ ] completarLectura() es el único punto que marca leido_ y habilita "Siguiente"; lo llama también revalidarAvance()
[ ] modoAdmin / reintentoActivo / ya-leída terminan con habilitarBtnNext(), no con `return` a secas
[ ] render() llama a detenerCronometroLectura() como primera línea y borra lecturaMarca al cambiar de slide
[ ] NO existe requestAnimationFrame ni setTimeout envolviendo el arranque del cronómetro
[ ] Prueba T1-T3: la cuenta baja sin reiniciarse, desbloquea a los 12 s y no acumula intervalos
```


## 🔺 PRIORIDAD 8-O · MÁXIMA — NÚCLEO ÚNICO DE NAVEGACIÓN: puedeAvanzar(), aplicarEstadoAvance(), revalidarAvance(), render(), nextSlide(), prevSlide()

### 🚨 POR QUÉ EXISTE ESTA PRIORIDAD
Antes de v12.0, `puedeAvanzar()`, `render()`, `nextSlide()` y `habilitarBtnNext()` aparecían con distintas versiones en las Prioridades 0-A, 0-C, 4, 6-B y 8-N — cada una "agregaba" o "anulaba" código de otra. Auditando `semana2_mat4_p4.html` se confirmó el bug exacto que esto produce: una IA (u otra persona) copia una versión de `render()` con `requestAnimationFrame`, o un `nextSlide()` con "Saltar de todas formas", y el resultado se congela. **Esta prioridad es la ÚNICA fuente de verdad de las seis funciones siguientes — ninguna otra prioridad de este documento vuelve a definirlas.**
```javascript
// ═══ 1) TOT — nunca un número escrito a mano ═══
// Inmediatamente DESPUÉS de definir el arreglo SL:
const TOT = SL.length;   // ❌ PROHIBIDO `const TOT = 23`: si la clase tiene 21 slides el contador dice "21/23",
                         // la barra nunca llega a 100% y `completada` (syncIndex) exige un slide imposible.

// ═══ 2) Tipos — listas ÚNICAS (no repetir literales ['info','repaso',...] por el código) ═══
const TIPOS_LECTURA    = ['info', 'repaso', 'repaso2', 'practica'];   // cronómetro de 12 s (0-A)
const TIPOS_EVALUABLES = ['quiz', 'evalFinal'];                         // llevan nota

// ═══ 3) puedeAvanzar(s) — versión ÚNICA. ANULA las de 0-C y 6-B ═══
function puedeAvanzar(s) {
  if (!s) return true;
  if (st.modoAdmin) return true;                                            // panel docente (16)
  if (st.reintentoActivo && !TIPOS_EVALUABLES.includes(s.type)) return true; // reintento dirigido (6-B)
  switch (s.type) {
    case 'info': case 'repaso': case 'repaso2': case 'practica':
      return !!st.acts['leido_' + s.id];
    case 'quiz': case 'evalFinal':
      return st.acts['completado_' + s.id] === true;
    case 'drag':       return !!st.acts['drag_done_'  + s.id];
    case 'match':      return !!st.acts['match_done_' + s.id];
    case 'fill':       return !!st.acts['fill_done_'  + s.id];
    case 'tf':         return !!st.acts['tf_done_'    + s.id];
    case 'orden':      return !!st.acts['orden_done_' + s.id];
    case 'wordsearch': return !!st.acts['ws_min_'     + s.id];
    case 'interactive':return !!st.acts['exp_min_'    + s.id];
    default:           return true;   // intro, final
  }
}

// ═══ 4) Botón "Siguiente" ═══
function habilitarBtnNext() {
  const b = document.getElementById('btn-next');
  if (b) { b.disabled = false; b.style.opacity = '1'; b.style.cursor = 'pointer'; }
  const c = document.getElementById('cronometro-lect');
  if (c) c.remove();
}
function deshabilitarBtnNext() {
  const b = document.getElementById('btn-next');
  if (b) { b.disabled = true; b.style.opacity = '0.35'; b.style.cursor = 'not-allowed'; }
}

// ═══ 5) aplicarEstadoAvance(s) — ÚNICA función que decide si "Siguiente" va habilitado ═══
// Es IDEMPOTENTE: se puede llamar 1 o 1000 veces sobre la misma slide con el mismo resultado.
function aplicarEstadoAvance(s) {
  s = s || SL[st.slide];
  if (!s) return;
  if (puedeAvanzar(s)) { detenerCronometroLectura(); habilitarBtnNext(); return; }
  deshabilitarBtnNext();
  if (TIPOS_LECTURA.includes(s.type)) activarCronometroLectura(s.id, 12);   // idempotente: no reinicia si ya corre
}

// ═══ 6) revalidarAvance() — el VIGILANTE. Compara ESTADO vs PANTALLA y corrige la diferencia ═══
// 🔺 REGLA: un vigilante solo REPARA; jamás reinicia un proceso sano. Por eso todo lo que llama
// (aplicarEstadoAvance → activarCronometroLectura) es idempotente.
function revalidarAvance() {
  try {
    const s = SL[st.slide];
    if (!s) return;
    // (a) Red de seguridad por TIEMPO REAL: si ya pasaron los segundos de lectura pero el
    // setInterval no alcanzó a correr (pestaña en segundo plano, tablet suspendida) → desbloquear.
    if (cronoActivo && cronoActivo.slideId === s.id &&
        (Date.now() - cronoActivo.inicio) / 1000 >= cronoActivo.segs) { completarLectura(s.id); return; }
    // (b) Quiz desincronizado: la pantalla no coincide con el estado guardado → repintar.
    if (TIPOS_EVALUABLES.includes(s.type) && !modalAbierto()) {
      const idxEstado = st.acts['quiz_idx_' + s.id] || 0;
      const inp  = document.getElementById('quiz-idx-actual');
      const opts = document.querySelectorAll('.quiz-opt');
      const pintadoMuerto    = opts.length > 0 && [...opts].every(b => b.disabled);
      const resumenPendiente = st.acts['completado_' + s.id] === true && opts.length > 0;
      const desfasado        = !!inp && parseInt(inp.value, 10) !== idxEstado;
      if (pintadoMuerto || resumenPendiente || desfasado) { render(); return; }
      if (!verificarQuizVivo()) return;   // (8-W): candados huérfanos / botones muertos / capa encima → se repara y repinta
      mostrarRetroQuizPendiente();   // (8-P) retroalimentación que el estudiante aún no cerró
    }
    // (c) Botón "Siguiente" y cronómetro coherentes con el estado.
    aplicarEstadoAvance(s);
  } catch (e) { console.warn('revalidarAvance:', e); }
}
setInterval(revalidarAvance, 3000);                        // vigilante permanente (barato: solo lee estado)
window.addEventListener('focus', revalidarAvance);
window.addEventListener('pageshow', revalidarAvance);
document.addEventListener('visibilitychange', () => { if (!document.hidden) revalidarAvance(); });

// ═══ 7) Temporizadores de actividades (8-S) ═══
window.__slotInterval = null;      // ejemplo: giro de una ruleta
window.__pistaTimeout = null;      // ejemplo: resplandor de la pista de la sopa de letras
window.__vivoTimeout  = null;      // (8-W): prueba de vida del quiz
function detenerTemporizadoresSlide() {
  if (window.__slotInterval) { clearInterval(window.__slotInterval); window.__slotInterval = null; }
  if (window.__pistaTimeout) { clearTimeout(window.__pistaTimeout);  window.__pistaTimeout = null; }
  if (window.__vivoTimeout)  { clearTimeout(window.__vivoTimeout);   window.__vivoTimeout  = null; }   // (8-W)
}

// ═══ 8) render() — esqueleto OBLIGATORIO. Todo cambio de slide pasa por aquí ═══
function render() {
  detenerCronometroLectura();          // 1ª línea, sin excepción (8-N)
  detenerTemporizadoresSlide();        // 2ª línea (8-S)
  // Blindaje de índice: un dato viejo guardado con otra cantidad de slides dejaba la clase en blanco.
  if (!Number.isInteger(st.slide) || st.slide < 0) st.slide = 0;
  if (st.slide > SL.length - 1) st.slide = SL.length - 1;
  const s = SL[st.slide];
  if (lecturaMarca && lecturaMarca.id !== s.id) lecturaMarca = null;   // la marca solo vive en la MISMA slide
  markSeen();
  limpiarOverlaysDecorativos();        // (8-W): ninguna capa decorativa de la slide anterior queda encima
  const wrap = document.getElementById('slide-wrap');
  wrap.innerHTML = renderBannerReintento() + construirHtmlSlide(s);    // construirHtmlSlide: switch por s.type → rIntro, rInfo, rQuiz…
  document.getElementById('slide-counter').textContent = `Slide ${st.slide + 1} / ${TOT}`;
  actualizarUIGeneral();               // sidebar/menú de ruta, nota, badges, vidas… (cada una en su prioridad)
  // 🔺🔺 SÍNCRONO. PROHIBIDO envolver esto en requestAnimationFrame o setTimeout: el navegador NO ejecuta
  // rAF con la pestaña en segundo plano; si el estudiante cambia de app justo al cambiar de slide, el
  // cronómetro no arrancaba nunca y "Siguiente" quedaba apagado para siempre (había que recargar).
  aplicarEstadoAvance(s);
  // ...post-render propio de cada tipo (initWS, initDrag, restaurarProgresoWS…) aquí...
  mostrarRetroQuizPendiente();         // (8-P) si quedó una retroalimentación de quiz sin cerrar, se vuelve a mostrar
  programarVerificacionQuiz();         // (8-W): prueba de vida del quiz (guarda su handle en window.__vivoTimeout)
}

// ═══ 9) Navegación — versión ÚNICA (anula las de 0-C, 4 y 6-B) ═══
function nextSlide() {
  const s = SL[st.slide];
  if (!puedeAvanzar(s)) { mostrarMensajeBloqueo(s); return; }
  if (st.reintentoActivo) {                     // reintento dirigido (6-B): salto directo entre evaluables pendientes
    if (TIPOS_EVALUABLES.includes(s.type) && st.acts['completado_' + s.id]) {
      st.reintentoPendientes = (st.reintentoPendientes || []).filter(i => i !== st.slide);
    }
    if ((st.reintentoPendientes || []).length > 0) st.slide = st.reintentoPendientes[0];
    else { st.reintentoActivo = false; st.reintentoPendientes = []; st.slide = SL.length - 1; }
    save(); render();
    return;
  }
  if (st.slide >= SL.length - 1) return;
  st.slide++; save(); render();
}
function prevSlide() {                          // 8-H: no resetea NADA al retroceder
  if (st.slide <= 0) return;
  st.slide--; save(); render();
}

// ═══ 10) Red de seguridad global — un error de JS jamás debe dejar la clase congelada y muda ═══
window.addEventListener('error', (e) => {
  console.error('Error no capturado:', e.error || e.message);
  try { save(); } catch (e2) {}
  try { showToast('⚠️ Ocurrió un error inesperado. Si la clase no responde, recarga la página (tu avance ya está guardado).'); } catch (e3) {}
});
window.addEventListener('unhandledrejection', (e) => { console.error('Promesa rechazada no capturada:', e.reason); });
```
### 🧷 POR QUÉ CADA PIEZA ES COMO ES (para que una IA no la "optimice" de vuelta a la versión rota)
- **`aplicarEstadoAvance(s)` es IDEMPOTENTE** (llamarla varias veces seguidas produce el mismo resultado) — por eso puede ser tanto el final de `render()` como el corazón de `revalidarAvance()` sin ningún riesgo de reiniciar nada.
- **`aplicarEstadoAvance(s)` se llama de forma SÍNCRONA**, nunca dentro de `requestAnimationFrame` ni `setTimeout`: eso es lo que garantiza que el cronómetro arranque incluso si la pestaña pasa a segundo plano justo después.
- **`revalidarAvance()` solo REPARA, nunca REINICIA.** Es barato (solo lee estado) y corre cada 3 s + en `focus`/`pageshow`/`visibilitychange`, así que cualquier pieza que llame no puede depender de "arrancar limpio" cada vez — de ahí la obligación de que 8-N sea idempotente.
- **`render()` limpia primero, pinta después, decide al final:** `detenerCronometroLectura()` y `detenerTemporizadoresSlide()` como primeras líneas (nunca queda un cronómetro o una ruleta de otra slide corriendo), y `aplicarEstadoAvance(s)` como una de las últimas.
- **`nextSlide()`/`prevSlide()` son las ÚNICAS puertas de navegación** — ningún botón, tecla ni menú debe mover `st.slide` por su cuenta; todos llaman a estas dos funciones.
### 🧪 PRUEBA OBLIGATORIA
```
Recorrer las 100% de las slides de la clase con un reloj acelerado (prueba_clase.js, Prioridad 8-T), abusando de
Atrás/Adelante a mitad de cada cronómetro y dando 5 clics rápidos en cada pregunta. Ninguna slide debe quedar
bloqueada, y el recorrido debe terminar en la pantalla final.
```
**Checklist:**
```
[ ] Existe UNA SOLA función puedeAvanzar(s) en todo el archivo (contar "function puedeAvanzar" = 1)
[ ] Existe UNA SOLA función render(s) — su primera línea es detenerCronometroLectura()
[ ] Existe UNA SOLA función nextSlide() y UNA SOLA prevSlide()
[ ] aplicarEstadoAvance() se llama de forma SÍNCRONA al final de render() — cero requestAnimationFrame/setTimeout
[ ] revalidarAvance() está corriendo (setInterval 3000ms + focus + pageshow + visibilitychange)
[ ] TOT se calcula como SL.length — no hay ningún número de slides escrito a mano en el código
[ ] Existe window.addEventListener('error', …) que guarda el estado y avisa sin dejar la clase muda
[ ]  v15.0: render() llama a limpiarOverlaysDecorativos() antes de pintar y a programarVerificacionQuiz() al final; revalidarAvance() invoca verificarQuizVivo() (8-W)
```


## 🔺 PRIORIDAD 8-P · MÁXIMA — MOTOR ÚNICO DEL QUIZ: rQuiz(), responderQuiz(), RETROALIMENTACIÓN PERSISTENTE, RESET

### 🚨 POR QUÉ EXISTE ESTA PRIORIDAD — EL BUG DE "SE SALTA LA PREGUNTA"
Auditando `semana2_mat4_p4.html` se reprodujo así: el estudiante responde la pregunta 1, se abre el modal de retroalimentación, **recarga la página (o pierde la conexión) antes de pulsar "Continuar"**. Al volver a entrar, la clase mostraba directamente la pregunta 2 — la retroalimentación de la 1 se perdía en silencio y, si el índice no había avanzado en el clic original, la pregunta 1 podía quedar sin poder responderse nunca más. Causa raíz: el índice de pregunta avanzaba **dentro del callback del modal**, y la retroalimentación vivía solo en el DOM del modal, sin respaldo en `st`.
### ⚖️ REGLAS ABSOLUTAS E INAPELABLES
1. El índice de pregunta (`quiz_idx_<id>`) avanza **en el mismo clic** que responde — nunca en el callback de un modal (así lo exige también 8-M).
2. La retroalimentación queda marcada como **pendiente** en `st.acts['quiz_retro_pend_'+id]` hasta que el estudiante la cierra. Si recarga, cambia de slide y vuelve, o el navegador tapa el modal, `render()` y `revalidarAvance()` la vuelven a mostrar — nunca se pierde y nunca se salta una pregunta en silencio.
3. `onclick` de cada opción lleva **solo el id del slide y números** (`responderQuiz('${s.id}', ${i}, ${v.pregIdx})`) — **jamás** texto de retroalimentación ni una función serializada con `.toString()` dentro de un atributo HTML (ver 8-R).
4. Reiniciar un quiz (vida del estudiante o panel docente) borra **también** los candados `q_contada_*` y la retroalimentación pendiente — si no, el quiz "rehecho" queda muerto (ver 8-M).
```javascript
// ═══ ESTADO DE CADA QUIZ — todo en st.acts, todo lo persiste save() ═══
// quiz_idx_<id>        → índice de la pregunta ACTUAL. AVANZA EN EL MISMO CLIC de respuesta.
// quiz_resps_<id>      → [{ pregIdx, opId, correcta, retro }]  (fuente de verdad de la nota)
// completado_<id>      → true cuando se respondió la última pregunta
// q_contada_<id>_<n>   → candado anti-duplicado de la pregunta n (8-H/8-M)
// quiz_retro_pend_<id> → índice de la respuesta cuya retroalimentación el estudiante AÚN NO cerró (8-P)

// ═══ 1) Orden de preguntas/opciones — UNA sola función, compartida por rQuiz() y responderQuiz() ═══
function vistaPregunta(s) {
  const pregIdx = st.acts['quiz_idx_' + s.id] || 0;
  if (!s.preguntas || pregIdx >= s.preguntas.length) return null;
  const seed = (st.intentos || 1) * 31 + (st.vidasUsadas || 0) * 17;   // estable dentro de un intento, distinto entre intentos
  const preg = shuffleWithSeed([...s.preguntas], seed)[pregIdx];
  if (!preg) return null;
  return { pregIdx, preg, opcs: shuffleWithSeed([...preg.opciones], seed + pregIdx) };
}

// ═══ 2) rQuiz(s) — el onclick lleva SOLO el id del slide y NÚMEROS (8-R) ═══
function rQuiz(s) {
  markSeen();
  if (st.acts['completado_' + s.id] === true) return renderResumenQuiz(s);          // 8-H: guardia de entrada
  purgarCandadosHuerfanos(s);                                                       // (8-W): un candado de una pregunta aún no respondida es huérfano
  if (!st.acts['confianza_' + s.id] && !(st.acts['quiz_idx_' + s.id] > 0)) return rSemaforoConfianza(s.id);   // Prioridad 25
  const v = vistaPregunta(s);
  if (!v) { st.acts['completado_' + s.id] = true; save(); return renderResumenQuiz(s); }
  const letras = ['A', 'B', 'C', 'D'];
  const total  = s.preguntas.length;
  return `
    <div class="slide-title">${s.title}</div>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
      <div style="flex:1;height:8px;background:var(--primary-light);border-radius:10px;overflow:hidden">
        <div style="height:100%;width:${(v.pregIdx / total) * 100}%;background:var(--primary);border-radius:10px;transition:width .4s"></div>
      </div>
      <span style="font-family:var(--font-ui);font-size:.82rem;color:var(--primary-dark);white-space:nowrap">${v.pregIdx + 1} / ${total}</span>
    </div>
    ${v.preg.contexto || ''}
    <div class="mc" style="margin-bottom:12px">
      <p style="font-family:var(--font-ui);font-size:1rem;color:var(--primary-dark);line-height:1.6">${v.preg.pregunta}</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:9px">
      ${v.opcs.map((op, i) => `
        <button class="quiz-opt" onclick="responderQuiz('${s.id}',${i},${v.pregIdx})">
          <span class="quiz-letra">${letras[i]}</span><span>${op.texto}</span>
        </button>`).join('')}
    </div>
    <input type="hidden" id="quiz-idx-actual" value="${v.pregIdx}">
    <div style="margin-top:14px;padding:10px 14px;background:rgba(255,200,0,.15);border-radius:10px;border:2px solid var(--accent);
                font-family:var(--font-ui);font-size:.78rem;color:var(--text2);text-align:center">
      ⚠️ Esta actividad <strong>sí cuenta para tu nota</strong> — debes completarla para avanzar
    </div>`;
}

// ═══ 3) responderQuiz(sId, opPos, pregIdx) — VERSIÓN ÚNICA. ANULA las de 5, 8-H y 8-M ═══
function responderQuiz(sId, opPos, pregIdx) {
  const s = SL.find(x => x.id === sId);
  if (!s) return;
  const idxNum = parseInt(pregIdx, 10);
  // GUARDIA 1 — solo vale la pregunta que el estado dice que es la actual (clic tardío/duplicado → se ignora en silencio)
  if (idxNum !== (st.acts['quiz_idx_' + sId] || 0)) return;
  if (st.acts['completado_' + sId] === true) return;
  // GUARDIA 2 — candado por pregunta
  const claveUnica = 'q_contada_' + sId + '_' + idxNum;
  // (8-W): como el índice avanza EN EL MISMO CLIC que cierra el candado, un candado sobre la pregunta ACTUAL
  // (idxNum === quiz_idx_) es HUÉRFANO por construcción (resto de un reset parcial o de una versión antigua).
  // Antes se ignoraba el clic en silencio → quiz muerto tras usar una vida. Ahora se borra y se sigue.
  // El clic rápido repetido NO se pierde: ya cayó en la GUARDIA 1 (el índice avanzó en el primer clic).
  if (st.acts[claveUnica]) delete st.acts[claveUnica];
  const v = vistaPregunta(s);
  if (!v) { render(); return; }
  const op = v.opcs[parseInt(opPos, 10)];
  if (!op) { render(); return; }
  // 🔺🔺🔺 CIERRE DEL CANDADO — ANTES de tocar la nota, y botones inutilizados en el mismo instante (síncrono)
  st.acts[claveUnica] = true;
  document.querySelectorAll('.quiz-opt').forEach(b => { b.disabled = true; b.style.pointerEvents = 'none'; });
  const correcta = !!op.correcta;
  if (!st.acts['quiz_resps_' + sId]) st.acts['quiz_resps_' + sId] = [];
  st.acts['quiz_resps_' + sId].push({ pregIdx: idxNum, opId: op.id, correcta, retro: v.preg.retroalimentacion || '' });
  recalcularAciertosDesdeContadores();                 // 8-H: st.aciertos SIEMPRE se deriva de quiz_resps_
  actualizarMejorNota();                               // (8-U): la mejor nota solo sube
  // 🔺🔺🔺 EL ÍNDICE AVANZA AQUÍ, EN EL MISMO CLIC — jamás dentro del callback de un modal.
  // (Si avanzara al cerrar el modal, recargar antes de pulsar "Continuar" dejaría la pregunta con
  // el candado ya cerrado y los botones aparentemente vivos: pregunta MUERTA para siempre.)
  st.acts['quiz_idx_' + sId] = idxNum + 1;
  if (idxNum + 1 >= s.preguntas.length) st.acts['completado_' + sId] = true;
  st.acts['quiz_retro_pend_' + sId] = idxNum;          // 8-P: la retroalimentación queda pendiente hasta que la cierre
  save();                                              // 8-B: en el mismo clic
  aplicarEstadoAvance(s);                              // si esta respuesta cerró el quiz, "Siguiente" se habilita YA
  mostrarRetroQuizPendiente();                         // se muestra ANTES de updScore(): el aviso del profe por hito hace fila (8-Q)
  updScore();
  setTimeout(revalidarAvance, 120);                    // seguro contra "pregunta trabada"
}

// ═══ 4) Retroalimentación PERSISTENTE (8-P) ═══
function htmlRetroQuiz(sId) {
  const idxPend = st.acts['quiz_retro_pend_' + sId];
  const r = (st.acts['quiz_resps_' + sId] || []).find(x => x.pregIdx === idxPend);
  if (!r) return '';
  const cerroQuiz = st.acts['completado_' + sId] === true;
  return `<div data-retro-quiz="1" style="text-align:center;padding:10px 0">
    <div style="font-size:3rem;margin-bottom:8px">${r.correcta ? '✅' : '❌'}</div>
    <h2 style="font-family:var(--font-ui);font-size:1.1rem;color:${r.correcta ? 'var(--success)' : 'var(--error)'};margin-bottom:10px">
      ${r.correcta ? '¡Muy bien! +1 ⭐' : 'Respuesta incorrecta'}</h2>
    ${r.retro ? `<div style="background:var(--primary-light);border-radius:10px;padding:12px;text-align:left;font-size:.85rem;
                             color:var(--text2);line-height:1.7;margin-bottom:14px">
      <strong style="color:var(--primary-dark)">💡 Retroalimentación:</strong><br>${r.retro}</div>` : ''}
    <button class="mbtn" onclick="closeModal()" style="width:100%">
      ${cerroQuiz ? '📊 Ver mi resultado' : (r.correcta ? '🚀 Siguiente pregunta' : '➡️ Continuar')}</button>
  </div>`;
}
function mostrarRetroQuizPendiente() {
  try {
    const s = SL[st.slide];
    if (!s || !TIPOS_EVALUABLES.includes(s.type)) return;
    const idxPend = st.acts['quiz_retro_pend_' + s.id];
    if (idxPend === undefined || idxPend === null) return;
    // Solo vale la retro de la respuesta inmediatamente anterior al índice actual; cualquier otra es un resto viejo.
    if (idxPend !== (st.acts['quiz_idx_' + s.id] || 0) - 1) { delete st.acts['quiz_retro_pend_' + s.id]; save(); return; }
    const box = document.getElementById('modal-box');
    const yaVisible = modalAbierto() && box && box.querySelector('[data-retro-quiz]');
    const yaEnCola  = _modalCola.some(h => String(h).indexOf('data-retro-quiz') !== -1);
    if (yaVisible || yaEnCola) return;                 // sin duplicados
    const html = htmlRetroQuiz(s.id);
    if (!html) { delete st.acts['quiz_retro_pend_' + s.id]; save(); return; }
    showModal(html);
  } catch (e) { console.warn('mostrarRetroQuizPendiente:', e); }
}
function limpiarRetroQuizPendiente() {
  let cambio = false;
  Object.keys(st.acts).forEach(k => { if (k.startsWith('quiz_retro_pend_')) { delete st.acts[k]; cambio = true; } });
  if (cambio) save();
}

// ═══ 5) Reseteo de quizzes — ÚNICA función, la usan confirmarReintento() (6) y pd_resetQuizzes() (16) ═══
// 🔺 Borra TAMBIÉN los candados q_contada_* y la retro pendiente: si quedaran, el quiz rehecho ignoraría
// todos los clics en silencio (candado ya cerrado) → quiz muerto tras usar una vida.
function resetearEstadoQuiz(s) {
  ['completado_', 'quiz_idx_', 'quiz_resps_', 'quiz_retro_pend_'].forEach(p => delete st.acts[p + s.id]);
  Object.keys(st.acts).forEach(k => { if (k.startsWith('q_contada_' + s.id + '_')) delete st.acts[k]; });
  // 'confianza_'+id (semáforo, Prioridad 25) NO se borra: no se vuelve a preguntar en el reintento.
}
function resetearTodosLosQuizzes() {
  actualizarMejorNota();   // (8-U): ANTES de borrar nada — la mejor nota queda asegurada en st.mejorNota
  SL.filter(s => TIPOS_EVALUABLES.includes(s.type)).forEach(resetearEstadoQuiz);
  st.aciertos = 0;
}
function iniciarReintentoDirigido() {               // 6-B
  st.reintentoActivo = true;
  st.reintentoPendientes = SL.map((s, i) => ({ s, i })).filter(o => TIPOS_EVALUABLES.includes(o.s.type)).map(o => o.i);
  st.slide = st.reintentoPendientes[0] ?? 0;
}

// ═══ 6) Auxiliares (8-H) ═══
function recalcularAciertosDesdeContadores() {
  let n = 0;
  Object.keys(st.acts).forEach(k => { if (k.startsWith('quiz_resps_')) (st.acts[k] || []).forEach(r => { if (r.correcta) n++; }); });
  st.aciertos = n;
}
function shuffleWithSeed(arr, seed) {
  const a = [...arr]; let s = seed || 42;
  for (let i = a.length - 1; i > 0; i--) { s = (s * 1664525 + 1013904223) & 0xFFFFFFFF; const j = Math.abs(s) % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
```
### 🧪 PRUEBA OBLIGATORIA (la automatiza `prueba_clase.js`, Prioridad 8-T: prueba T5)
```
PASO 1: Responder una pregunta de un quiz — se abre la retroalimentación
PASO 2: SIN pulsar "Continuar", recargar la página (F5)
RESULTADO ESPERADO: la retroalimentación de esa pregunta reaparece igual que antes de recargar
PASO 3: Cerrarla y responder la siguiente pregunta
RESULTADO ESPERADO: responde con normalidad — ninguna pregunta quedó "muerta"
PASO 4: Ir Atrás y Adelante sobre un quiz ya completado
RESULTADO ESPERADO: se ve el resumen, nunca las preguntas en blanco; la nota no cambia
```
**Checklist:**
```
[ ] Existe UNA SOLA función responderQuiz(sId, opPos, pregIdx) — onclick solo con id + números (8-R)
[ ] quiz_idx_<id> avanza en el MISMO clic que responde, nunca en un callback de modal
[ ] quiz_retro_pend_<id> se guarda al responder y se borra solo al cerrar esa retroalimentación
[ ] render() y revalidarAvance() llaman a mostrarRetroQuizPendiente()
[ ] resetearEstadoQuiz()/resetearTodosLosQuizzes() borran completado_, quiz_idx_, quiz_resps_, quiz_retro_pend_ Y todos los q_contada_<id>_*
[ ] confirmarReintento() (Prioridad 6) y pd_resetQuizzes() (Prioridad 16) llaman a resetearTodosLosQuizzes() + iniciarReintentoDirigido()
[ ] Prueba T5: recargar con la retroalimentación abierta no salta ninguna pregunta
[ ]  v15.0: rQuiz() purga candados huérfanos; responderQuiz() borra el candado de la pregunta ACTUAL en vez de ignorar el clic; resetearTodosLosQuizzes() llama a actualizarMejorNota() primero
```


## 🔺 PRIORIDAD 8-Q · MÁXIMA — MODALES CON COLA: showModal()/closeModal() ÚNICOS, NINGÚN MODAL SE PIERDE

### 🚨 POR QUÉ EXISTE ESTA PRIORIDAD
Este documento usa `showModal(html)` en más de 15 prioridades distintas (retroalimentación de quiz, bloqueo de actividades, Modo Foco, mensajes del docente, reintento de vidas, carta sorpresa…) pero **nunca definía la función en sí**. Cada clase real la improvisaba de forma distinta, y cuando dos modales querían abrirse casi al mismo tiempo (ej. el aviso del Modo Foco justo cuando se abre la retroalimentación de un quiz), el segundo `showModal()` **pisaba** el contenido del primero — el estudiante perdía la retroalimentación sin verla nunca.
### ⚖️ REGLA ABSOLUTA
`showModal()` **nunca sobreescribe un modal abierto**: si ya hay uno visible, el nuevo se pone en una cola y se muestra automáticamente al cerrar el anterior. `closeModal()` siempre revisa la cola antes de re-sincronizar la pantalla.
```javascript
// ═══ MODALES CON COLA — showModal() NUNCA pisa un modal abierto ═══
let _modalCola = [];
function modalAbierto() {
  const ov = document.getElementById('modal-overlay');
  return !!(ov && ov.classList.contains('vis'));
}
function showModal(html) {
  if (modalAbierto()) { if (_modalCola.length < 4) _modalCola.push(html); return; }   // se pone en FILA, jamás se sobreescribe
  document.getElementById('modal-box').innerHTML = html;
  document.getElementById('modal-overlay').classList.add('vis');
}
function closeModal() {
  // Si el modal visible es la retroalimentación de un quiz, cerrarlo (botón, clic afuera o Esc) = ya la vio (8-P)
  const box = document.getElementById('modal-box');
  const eraRetroQuiz = modalAbierto() && !!(box && box.querySelector('[data-retro-quiz]'));
  document.getElementById('modal-overlay').classList.remove('vis');
  if (eraRetroQuiz) limpiarRetroQuizPendiente();
  if (_modalCola.length) {
    const sig = _modalCola.shift();
    setTimeout(() => { if (!modalAbierto()) showModal(sig); }, 260);
    return;
  }
  // Al cerrar el ÚLTIMO modal se re-sincroniza pantalla y estado: nunca queda una slide trabada.
  revalidarAvance();
  setTimeout(revalidarAvance, 60);
}
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modalAbierto()) closeModal(); });
// (8-W): limpiarColaModales() y forzarCerrarModal() (definidas en 8-W) vacían la cola y cierran el modal al reiniciar un intento.
```
**Checklist:**
```
[ ] Existe UNA SOLA función showModal(html) y UNA SOLA closeModal() en todo el archivo
[ ] showModal() jamás sobreescribe #modal-box si ya hay un modal visible — lo encola
[ ] closeModal() muestra el siguiente de la cola si existe
[ ] closeModal() llama a revalidarAvance() al final (re-sincroniza pantalla y estado tras cerrar)
[ ] Tecla Esc cierra el modal abierto
[ ] Prueba: abrir un modal ajeno y responder un quiz al mismo tiempo — ningún modal pisa al otro (Prioridad 8-T, T6)
```


## 🔺 PRIORIDAD 8-R · MÁXIMA — onclick SEGURO: SOLO IDS Y NÚMEROS, NUNCA TEXTO NI FUNCIONES SERIALIZADAS

### 🚨 POR QUÉ EXISTE ESTA PRIORIDAD
Dos patrones aparecían repetidos en el código de referencia de varias prioridades y ambos rompen la clase en producción:
1. **Texto libre dentro de un atributo `onclick`:** `onclick="responderQuiz('${sId}','${op.id}','${esCorrecta}','${pregIdx}','${retro.replace(/'/g,"\\'")}')"`. Si la retroalimentación (escrita por el docente) trae una comilla doble, un salto de línea, o cualquier carácter que el `.replace()` no contempló, el atributo se corta a mitad y el botón deja de responder — con el estudiante viendo la pregunta perfectamente normal, sin ningún error visible.
2. **Una función serializada dentro de un atributo:** `onclick="closeModal();(${callback.toString()})()"`. Al ejecutarse en el navegador, esa función pierde TODO su cierre léxico (las variables `s`, `pregIdx`, `sId` que tenía disponibles cuando se creó) — dispara `ReferenceError` en cuanto intenta usarlas.
### ⚖️ REGLA ABSOLUTA E INAPELABLE
Todo `onclick` generado dinámicamente (dentro de un `.map()`, de una plantilla de pregunta, de una opción, de un elemento de drag/match/fill) lleva **únicamente**: el id del slide/elemento (string simple, sin caracteres especiales) y/o índices numéricos. **Nunca** texto libre (enunciados, retroalimentación, nombres escritos por el docente) ni una función convertida a texto con `.toString()`.
```javascript
// ❌ PROHIBIDO
onclick="responderQuiz('${s.id}','${op.id}','${op.correcta}','${pregIdx}','${preg.retroalimentacion.replace(/'/g,"\\'")}')"
onclick="closeModal();(${callback.toString()})()"

// ✅ OBLIGATORIO — el onclick solo lleva ids y números; la función RECONSTRUYE lo que necesita desde SL/st
onclick="responderQuiz('${s.id}', ${i}, ${pregIdx})"
onclick="closeModal()"   // la lógica de "qué pasa después" vive DENTRO de closeModal()/responderQuiz(), nunca serializada en el HTML
```
**Dónde se aplica ya en este documento:** `responderQuiz()` (8-P), las opciones de drag/match/fill/tf/orden (Prioridad 0-C — sus manejadores reciben el id del slide y el índice del elemento, nunca el texto de la opción), y cualquier botón de un modal generado dinámicamente.
**Checklist:**
```
[ ] Ningún onclick generado dentro de un .map()/template string contiene texto libre (enunciados, retroalimentación, nombres)
[ ] Ningún onclick contiene una función convertida con .toString()
[ ] Todo onclick dinámico usa solo ids (string simple) y/o índices numéricos
[ ] Probado con una retroalimentación que contiene comillas simples, dobles y saltos de línea — el botón sigue funcionando
```


## 🔺 PRIORIDAD 8-S · MÁXIMA — TODO setInterval/setTimeout DE UNA ACTIVIDAD SE LIMPIA AL CAMBIAR DE SLIDE

### 🚨 POR QUÉ EXISTE ESTA PRIORIDAD
8-N obliga a que el cronómetro de lectura tenga handle global y se limpie en cada `render()`. Esa misma regla **no estaba escrita para ningún otro temporizador** de la clase — y este documento sí pide varios: el giro de una ruleta/slot (Prioridad "slot"), el resplandor de la pista de la sopa de letras (`setTimeout` que ilumina la palabra 4-5 s, Prioridad 0-D), el parpadeo del Modo Foco (Prioridad 13), el timer del panel docente (Prioridad 16). Cualquiera de ellos, si se deja sin limpiar, sigue corriendo sobre una slide que el estudiante ya abandonó — en el mejor caso gasta batería, en el peor pinta sobre un DOM que ya no existe y lanza un error que puede dejar la clase muda.
### ⚖️ REGLA ABSOLUTA
Toda actividad que cree un `setInterval`/`setTimeout` propio (fuera del cronómetro de lectura, que ya lo resuelve 8-N) guarda su handle en una variable `window.__<algo>` dedicada, y `render()` la limpia junto con el cronómetro:
```javascript
// detenerTemporizadoresSlide() YA está declarada una sola vez en el núcleo de la Prioridad 8-O — aquí solo se
// AGREGAN entradas nuevas dentro de ese mismo cuerpo, nunca una segunda función con el mismo nombre:
window.__slotInterval = null;      // ejemplo: giro de una ruleta
window.__pistaTimeout = null;      // ejemplo: resplandor de la pista de la sopa de letras
// dentro del CUERPO de detenerTemporizadoresSlide() (8-O), agregar:
// if (window.__slotInterval) { clearInterval(window.__slotInterval); window.__slotInterval = null; }
// if (window.__pistaTimeout) { clearTimeout(window.__pistaTimeout);  window.__pistaTimeout = null; }
```
**Checklist:**
```
[ ] Cada setInterval/setTimeout de una actividad (fuera del cronómetro de lectura) guarda su handle en window.__*
[ ] detenerTemporizadoresSlide() los limpia todos
[ ] render() llama a detenerTemporizadoresSlide() como 2ª línea (justo después de detenerCronometroLectura())
[ ] Prueba: iniciar una ruleta/pista y cambiar de slide de inmediato — no sigue sonando/parpadeando en segundo plano
```


## 🔺 PRIORIDAD 8-T · MÁXIMA — PROTOCOLO DE PRUEBA AUTOMÁTICA OBLIGATORIA ANTES DE ENTREGAR CUALQUIER CLASE

### 🚨 POR QUÉ EXISTE ESTA PRIORIDAD
Todas las prioridades 8-* anteriores traen su "prueba obligatoria" como una lista de pasos para hacer a mano — y a mano es exactamente como el bug de `semana2_mat4_p4.html` pasó desapercibido: entrar y salir 5 veces de una slide de lectura, o recargar en mitad de una retroalimentación, es tedioso de repetir cada vez y fácil de saltarse. Esta prioridad reúne esas pruebas en **un solo script automático** que corre en segundos con un reloj de navegador acelerado (12 s de espera se simulan sin esperar 12 s reales) y que **cualquier clase generada con este prompt debe pasar íntegro antes de entregarse**.
### ⚖️ REGLA ABSOLUTA
Antes de entregar el archivo `.html` final de cualquier clase, se ejecuta `prueba_clase.js` contra ese archivo (requiere Node.js y el paquete `playwright`: `npm i playwright`). **Si el script reporta algún ❌, la clase NO se entrega** hasta corregir la causa — casi siempre una copia parcial de 8-N/8-O/8-P/8-Q, o una función duplicada de una versión antigua que no fue reemplazada del todo.
> El código completo de la prueba está en **`tests/prueba_clase.js`** (idéntico al que antes se incluía aquí). Uso: `node tests/prueba_clase.js /ruta/semanaN_area_g_pP.html` (requiere `npm i playwright`).
### 🧭 Cómo leer el resultado
- **T1-T3** prueban el cronómetro (8-N): que la cuenta baje de verdad, que se desbloquee aunque la pestaña esté en segundo plano, y que ir/venir no acumule temporizadores.
- **T4** recorre TODA la clase con un reloj acelerado, abusando de Atrás/Adelante a mitad de cada cronómetro y dando 5 clics rápidos en cada pregunta — si algo queda bloqueado en cualquier slide, lo reporta con el número exacto.
- **T5** simula la recarga a mitad de una retroalimentación de quiz (8-P): confirma que reaparece y que ninguna pregunta queda muerta.
- **T6** confirma que un modal ajeno (aviso del Modo Foco, mensaje del docente) nunca pisa la retroalimentación del quiz (8-Q).
- **T7 (nueva v15.0)** usa la interfaz REAL: completa la clase, pulsa con el mouse "Reintentar ahora" → "Sí, reiniciar", y responde todo el reintento con clics de mouse reales (haciendo antes una prueba de impacto con `elementFromPoint`, que detecta cualquier capa encima del botón). Confirma que el quiz responde al primer clic (8-W), que la nota oficial se conserva aunque el reintento salga más bajo (8-U), que sobrevive a F5 y que el camino del Panel Docente ("Reset solo Quizzes") se comporta igual.
- **T8 (nueva v15.0)** verifica por lógica la regla de la mejor nota: alto → bajo se mantiene, más alto sube, bajo no baja (8-U).
- **T9 (nueva v15.0)** verifica 8-V: estudiante nuevo en 0.0, sesión sellada con otra semana, contexto del index de otra semana y acceso directo (sin leer ni escribir `localStorage`) — ninguno hereda notas ni avance.
- Si el script está adaptado a otra clase con nombres de función distintos a los de este prompt (por ejemplo si una prioridad futura renombra algo), **el script se actualiza, nunca se elimina o se deja de correr** — es la garantía de que el bug de `semana2_mat4_p4.html` no vuelve a pasar desapercibido.
**Checklist:**
```
[ ] prueba_clase.js se ejecutó contra el archivo final antes de entregarlo
[ ] El resultado fue "✅ TODAS LAS PRUEBAS PASARON" — cero ❌ (incluye T7, T8 y T9 de v15.0)
[ ] Si algo falló, se corrigió la causa raíz (no se "arregló" el síntoma con un parche puntual) y se volvió a correr la prueba completa
```

