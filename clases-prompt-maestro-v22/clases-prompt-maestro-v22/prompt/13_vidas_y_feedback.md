---
modulo: 13_vidas_y_feedback
etapa_de_lectura: 1
prioridades: [6, 6-B, 6-C, 7, 7-B]
---

# 13 · Vidas/reintentos, reintento dirigido, retroalimentación y matching

## 🔴 PRIORIDAD 6 · ABSOLUTA — SISTEMA DE VIDAS / REINTENTOS (MAX_VIDAS = 8)

### ❤️ MAX_VIDAS (8) — SOLO RESETEAN QUIZZES DE OPCIÓN MÚLTIPLE
```javascript
const MAX_VIDAS = 8;  // NO CAMBIAR (v11.1 — antes 3, luego probado en 6, subido a 8 tras confirmar en producción intentos legítimos por encima de 6)
function pedirReintento() {
  if (st.slide !== SL.length - 1) { showToast('🔒 Termina de ver toda la clase para poder reintentar'); return; } // candado de origen (6-C): solo desde la pantalla final
  const vidasUsadas = st.vidasUsadas || 0;
  const vidasRestantes = MAX_VIDAS - vidasUsadas;
  if (vidasRestantes <= 0) {
    showModal(`
      <div style="text-align:center;padding:10px 0">
        <div style="font-size:3rem;margin-bottom:10px">🔒</div>
        <h2 style="font-family:var(--font-ui);color:var(--error);font-size:1.2rem;margin-bottom:10px">Sin intentos disponibles</h2>
        <p style="font-size:.9rem;color:var(--text2);line-height:1.7;margin-bottom:16px">
          Ya usaste los <strong>8 intentos</strong>.<br>Habla con tu profe para una nueva oportunidad.
        </p>
        <button class="mbtn gy" onclick="closeModal()">Entendido</button>
      </div>
    `);
    return;
  }
  showModal(`
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:3rem;margin-bottom:8px">❤️</div>
      <h2 style="font-family:var(--font-ui);color:var(--primary);font-size:1.2rem;margin-bottom:8px">
        ¿Volver a intentar?
      </h2>
      <p style="font-size:.88rem;color:var(--text2);line-height:1.7;margin-bottom:10px">
        Se reiniciarán <strong>solo los quizzes y la evaluación final</strong>.<br>
        Las lecturas, prácticas, sopas de letras y demás <strong>no se borran</strong>.<br>
        🏅 <strong>Tu mejor nota se conserva</strong>: si este intento sale más bajo, no pierdes nada.
      </p>
      <div style="display:flex;justify-content:center;gap:8px;margin:12px 0">
        ${Array.from({length:MAX_VIDAS}).map((_,i) =>
          `<span style="font-size:1.8rem">${i < vidasUsadas ? '🖤' : '❤️'}</span>`
        ).join('')}
      </div>
      <p style="font-size:.8rem;color:var(--muted);margin-bottom:16px">
        Vida ${vidasUsadas+1} de ${MAX_VIDAS}
        ${vidasRestantes===1 ? '<br><strong style="color:var(--error)">⚠️ ¡Este es tu último intento!</strong>' : ''}
      </p>
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
        <button class="mbtn rd" onclick="confirmarReintento()" style="flex:1;min-width:140px">
          ❤️ Sí, reiniciar
        </button>
        <button class="mbtn gy" onclick="closeModal()" style="flex:1;min-width:140px">
          ← Cancelar
        </button>
      </div>
    </div>
  `);
}
function confirmarReintento() {
  // UNA sola función de reinicio (Prioridad 8-W): iniciarNuevoIntento() asegura la mejor nota (8-U),
  // vacía modales/overlays, borra candados q_contada_*, resetea SOLO los quizzes, activa el reintento dirigido (6-B),
  // guarda, pinta y verifica que el quiz responda. NO reescribir esta secuencia a mano en ningún otro lugar.
  iniciarNuevoIntento('estudiante');
}
```
**Botón de vidas:** NO va en el navbar. El sistema de vidas solo se activa desde la pantalla final (Prioridad 6-C).
```javascript
function updateVidasBtn() {
  const btn = document.getElementById('btn-vidas');
  if (!btn) return;
  const usadas = st.vidasUsadas || 0;
  const restantes = MAX_VIDAS - usadas;
  btn.innerHTML = '❤️'.repeat(restantes) + '🖤'.repeat(usadas) + ' Reintentar';
  btn.disabled = restantes <= 0;
  btn.style.opacity = restantes <= 0 ? '.4' : '1';
  btn.style.cursor = restantes <= 0 ? 'not-allowed' : 'pointer';
}
```

## 🔴 PRIORIDAD 6-B · ABSOLUTA — REINTENTO DIRIGIDO: SIN CRONÓMETRO Y SALTO DIRECTO A LO EVALUABLE

### 🎯 REGLA DE ORO: SI YA VIO LA CLASE, AL REINTENTAR SOLO SE LE PIDE LO QUE TIENE NOTA
**Motivo:** el estudiante que usa una vida ya vio todas las slides de lectura, prácticas, actividades y cuadernos la primera vez. Obligarlo a esperar de nuevo el cronómetro de lectura o a navegar slide por slide entre contenidos ya vistos es una pérdida de tiempo. Esta sección se **suma** a la Prioridad 6 (no la reemplaza): amplía `confirmarReintento()` y agrega comportamiento nuevo al resto del sistema.
**Reglas obligatorias del reintento dirigido:**
- Al reintentar, **NO** debe volver a correr el cronómetro de 12 segundos en ningún slide de lectura (`info`, `repaso`, `practica`) — ya los vio.
- El botón "Siguiente", mientras dura el reintento, debe **saltar directamente** de un slide evaluable pendiente al siguiente slide evaluable pendiente — sin obligar a recorrer otra vez toda la clase.
- Debe mostrarse, en todo momento durante el reintento, un **mensaje/banner protagonista** que le diga exactamente al estudiante qué le falta volver a hacer (ej. "Te falta: Quiz 1 y Evaluación Final"), para que sepa con claridad qué actividades tienen nota pendiente.
- Solo se piden de nuevo: `quiz1`, `quiz2` y `evalFinal` (lo que tiene nota). Todo lo demás (lecturas, prácticas, sopa de letras, cuadernos, explorador) permanece tal cual quedó marcado la primera vez — nunca se vuelve a pedir.
- Cuando el estudiante termina de responder el último evaluable pendiente, el reintento se cierra automáticamente y lo lleva a la pantalla final con la nota recalculada.
#### IMPLEMENTACIÓN — v12.0: todo el código del reintento dirigido quedó integrado en piezas únicas
```javascript
// ═══ Campos de st ═══
// st.reintentoActivo     = false;   // true mientras el estudiante está reintentando
// st.reintentoPendientes = [];      // índices de slides evaluables aún no completados en este intento
//
// ▸ confirmarReintento() ............ Prioridad 6 (usa resetearTodosLosQuizzes() + iniciarReintentoDirigido(), de 8-P)
// ▸ puedeAvanzar() / nextSlide() .... Prioridad 8-O (ya incluyen el salto directo entre evaluables y el cierre del reintento)
// ▸ activarCronometroLectura() ...... Prioridad 8-N (con st.reintentoActivo NO cuenta tiempo Y DEJA "Siguiente" HABILITADO)
```

#### BANNER PROTAGONISTA — QUÉ LE FALTA AL ESTUDIANTE
```javascript
// NUEVO v6.1 — llamar al inicio de render(), e insertar el HTML devuelto
// justo antes del contenido normal del slide, mientras st.reintentoActivo sea true
function renderBannerReintento() {
  if (!st.reintentoActivo) return '';
  const nombresPendientes = st.reintentoPendientes
    .map(i => SL[i]?.title || `Actividad ${i+1}`)
    .join(' · ');
  return `
    <div class="reintento-banner">
      <div class="reintento-banner-ico">🎯</div>
      <div class="reintento-banner-txt">
        <p class="reintento-banner-tit">¡Ya casi! Solo debes volver a responder esto:</p>
        <p class="reintento-banner-sub"><strong>${nombresPendientes}</strong></p>
        <p class="reintento-banner-nota">
          Ya viste toda la clase — no tienes que repasar lecturas, prácticas ni actividades.
          Solo lo que tiene nota. 💪
        </p>
        ${(st.mejorNota || 0) > 0 ? `<p class="reintento-banner-nota">🏅 Tu mejor nota (<strong>${st.mejorNota.toFixed(1)}</strong>) está segura: este intento solo puede subirla, nunca bajarla.</p>` : ''}
      </div>
    </div>
  `;
}
```
```css
/* CSS del banner — agregar al <style> */
.reintento-banner {
  display: flex; align-items: flex-start; gap: 12px;
  background: linear-gradient(135deg, #fff8dc, #ffecb3);
  border: 3px solid var(--accent);
  border-radius: 14px;
  padding: 12px 16px;
  margin-bottom: 14px;
  box-shadow: 0 4px 0 var(--primary-dark);
  animation: pulse-border 1.4s infinite;
  position: sticky; top: 0; z-index: 50;
  pointer-events: none;   /* (8-W): informativo, nunca intercepta clics */
}
.reintento-banner-ico { font-size: 1.8rem; flex-shrink: 0; animation: floatY 1.2s infinite; }
.reintento-banner-tit { font-family: var(--font-ui); font-size: .88rem; color: var(--primary-dark); margin-bottom: 3px; }
.reintento-banner-sub { font-size: .82rem; color: var(--text); margin-bottom: 3px; }
.reintento-banner-nota { font-size: .74rem; color: var(--text2); }
```
**Regla adicional de blindaje:** ningún slide que no tenga nota (`info`, `repaso`, `practica`, `drag`, `match`, `fill`, `tf`, `orden`, `wordsearch`, `interactive`) puede volver a bloquear el avance ni exigir cronómetro mientras `st.reintentoActivo === true`. El estudiante solo interactúa con `quiz1`, `quiz2` y `evalFinal`. (Los cuadernos nunca fueron slides desde v6.2 — no aplica bloqueo alguno sobre ellos).

## 🔴 PRIORIDAD 6-C · ABSOLUTA — LAS VIDAS SOLO SE ACTIVAN DESDE LA PANTALLA FINAL

### 🚨 CAMBIO DE CRITERIO — MOTIVO
En v7.3 el botón de vidas vivía en el navbar fijo, usable desde cualquier slide. Esto generaba un problema pedagógico: un estudiante que fallaba el Quiz 1 a mitad de la clase podía pulsar "Reintentar" de inmediato, sin haber visto las slides que venían después — perdiéndose contenido que sí necesitaba. **Regla de oro nueva:** el sistema de vidas (MAX_VIDAS) **solo puede activarse desde la pantalla final** (`rFinal()`, Prioridad 11) — nunca antes. Así el estudiante siempre completa el recorrido completo antes de poder decidir si reintenta.
```
✅ TODO lo demás de las Prioridades 6 y 6-B (MAX_VIDAS=8 desde v11.1 — Prioridad 8-M, confirmarReintento(), reseteo solo de
   quizzes, reintento dirigido sin cronómetro con salto directo a evaluables, banner protagonista)
   se mantiene EXACTAMENTE IGUAL — solo cambia DÓNDE se puede activar el reintento.
```
### 🔒 IMPLEMENTACIÓN
```javascript
// ═══ El navbar YA NO incluye el botón de vidas — se retira de la barra fija ═══
// ❌ QUITAR del navbar: <button id="btn-vidas" ...>Reintentar</button>
// El navbar conserva los demás botones (Cuaderno 1, Taller en Clase, Mis herramientas, Mis Logros, Inicio).
// El candado de origen (pedirReintento() se niega fuera de la última pantalla) YA está integrado en la función de la Prioridad 6.
```
### 🎯 BLOQUE PROTAGONISTA EN LA PANTALLA FINAL — "¿QUIERES MEJORAR TU NOTA?"
Se ubica **justo debajo de la nota gigante**, nunca al final de la pantalla tras hacer scroll — es lo segundo que el estudiante ve, inmediatamente después de la nota.
```javascript
// Reemplaza la "SECCIÓN DE VIDAS" que traía rFinal() (Prioridad 11).
function renderBloqueVidasProtagonista() {
  const vidasUsadas = st.vidasUsadas || 0;
  const vidasRestantes = MAX_VIDAS - vidasUsadas;
  const t = notaOficial();   // (8-U): la nota oficial es la MEJOR nota
  const corazones = Array.from({length:MAX_VIDAS})
    .map((_,i) => `<span style="font-size:2.3rem">${i < vidasUsadas ? '🖤' : '❤️'}</span>`)
    .join('');
  return `
    <div class="vidas-protagonista">
      <p class="vidas-protagonista-titulo">${t < 3.0 ? '¿Quieres aprobar? 💪' : '¿Quieres mejorar tu nota? 🚀'}</p>
      <div class="vidas-protagonista-corazones">${corazones}</div>
      <p class="vidas-protagonista-sub">
        ${vidasRestantes > 0
          ? `Te ${vidasRestantes===1?'queda <strong>1 vida</strong>':'quedan <strong>'+vidasRestantes+' vidas</strong>'}`
          : '⛔ Sin vidas — habla con tu profe'}
      </p>
      <button onclick="pedirReintento()" ${vidasRestantes <= 0 ? 'disabled' : ''} class="vidas-protagonista-btn">
        ${vidasRestantes > 0 ? '❤️ Reintentar ahora' : '🔒 Sin intentos'}
      </button>
    </div>
  `;
}
```
```css
.vidas-protagonista {
  background: var(--bg-card); border: 5px solid var(--accent); border-radius: 20px;
  padding: 16px 20px; max-width: 420px; margin: 0 auto 16px; text-align: center;
  box-shadow: 0 6px 0 var(--primary-dark);
}
.vidas-protagonista-titulo { font-family: var(--font-ui); font-size: 1.15rem; color: var(--primary-dark); font-weight: 900; margin-bottom: 8px; }
.vidas-protagonista-corazones { display: flex; justify-content: center; gap: 8px; margin-bottom: 6px; }
.vidas-protagonista-sub { font-size: .82rem; color: var(--text2); margin-bottom: 10px; }
.vidas-protagonista-btn {
  width: 100%; background: linear-gradient(180deg, var(--primary), var(--primary-dark));
  border: 3px solid rgba(0,0,0,.2); color: #fff; border-radius: 14px; padding: 12px 20px;
  font-family: var(--font-ui); font-size: 1rem; cursor: pointer; box-shadow: 0 4px 0 var(--primary-dark);
}
.vidas-protagonista-btn:disabled { background: #aaa; box-shadow: none; cursor: not-allowed; opacity: .6; }
```
**Orden exacto dentro de `rFinal()` (Prioridad 11) — v7.5:** 1) fuegos artificiales · 2) "¡Misión Completada!" + nombre · 3) nota gigante · 4) **`renderBloqueVidasProtagonista()` aquí** · 5) mensaje de ByteBot · 6) retroalimentación de errores · 7) botones extra. El bloque de vidas NUNCA va debajo de la retroalimentación de errores ni de los botones extra.
**Checklist:**
```
[ ] El botón "❤️❤️❤️ Reintentar" YA NO está en el navbar fijo
[ ] pedirReintento() se niega a abrirse (con toast) si st.slide no es el último slide de SL
[ ] renderBloqueVidasProtagonista() está insertado justo debajo de la nota gigante en rFinal()
[ ] El bloque de vidas NUNCA queda debajo de la retroalimentación de errores ni de los botones extra
[ ] Toda la lógica interna de confirmarReintento() y el reintento dirigido (Prioridad 6-B) sigue intacta
[ ] Verificado: un estudiante no puede reintentar a mitad de la clase bajo ninguna circunstancia
```

## 🔴 PRIORIDAD 7 · ABSOLUTA — RETROALIMENTACIÓN EN ACTIVIDADES COMPLEMENTARIAS

### 💬 Actividades SIN nota: botón "Verificar" y feedback inmediato
```javascript
// TODAS las actividades complementarias (drag, match, fill, ordenar)
// deben tener:
// 1. Botón "✅ Verificar" que el estudiante presiona cuando termine
// 2. Al verificar: mostrar qué estuvo bien y qué estuvo mal
// 3. Mostrar la respuesta correcta si falló
// 4. NUNCA descontar nota
// Patrón para actividad complementaria:
function verificarComplementaria(sId, respUsuario, respCorrecta) {
  const correcta = JSON.stringify(respUsuario) === JSON.stringify(respCorrecta);
  showModal(`
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:2.5rem;margin-bottom:8px">${correcta ? '✅' : '💡'}</div>
      <h2 style="font-family:var(--font-ui);font-size:1.1rem;
                 color:${correcta?'var(--success)':'var(--primary)'};margin-bottom:10px">
        ${correcta ? '¡Lo hiciste perfecto!' : 'Así se hace correctamente'}
      </h2>
      ${!correcta ? `
        <div style="background:var(--primary-light);border-radius:10px;padding:12px;
                    text-align:left;font-size:.85rem;color:var(--text2);margin-bottom:12px">
          <p style="font-weight:700;color:var(--primary-dark);margin-bottom:6px">📌 Respuesta correcta:</p>
          <p style="line-height:1.7">[MOSTRAR RESPUESTA CORRECTA AQUÍ]</p>
        </div>
      ` : ''}
      <p style="font-size:.78rem;color:var(--muted);margin-bottom:14px">
        Esta actividad no afecta tu nota — es para practicar 💪
      </p>
      <button class="mbtn" onclick="closeModal()">Entendido ✓</button>
    </div>
  `);
  // Marcar como vista pero NO cambiar st.aciertos
  st.acts['verif_'+sId] = true;
  save();
}
```

## 🟠 PRIORIDAD 7-B · ALTA — MATCHING Y VERIFICACIÓN: FEEDBACK VISUAL INMEDIATO + VERIFICAR PASO A PASO

### 🚨 PROBLEMA DETECTADO: EL ESTUDIANTE NO VE SUS SELECCIONES HASTA "VERIFICAR"
En las actividades de emparejar columnas, la selección de un par se registra internamente pero no se refleja visualmente hasta pulsar un botón de verificar general — el estudiante no sabe si su clic funcionó. Además, un solo botón "Verificar" al final no permite corregir pregunta por pregunta.
### ✅ REGLA 1 — FEEDBACK VISUAL INMEDIATO AL SELECCIONAR (antes de verificar nada)
```javascript
// Al hacer clic en un ítem de la columna izquierda y luego uno de la derecha, ambos deben
// marcarse visualmente EN EL ACTO — sin esperar a ningún botón de verificar.
let match_seleccionIzq = null;
function onClickMatchIzq(sId, itemId, el) {
  document.querySelectorAll(`#match-${sId} .match-izq`).forEach(n => n.classList.remove('match-seleccionado'));
  el.classList.add('match-seleccionado'); // 🔺 feedback INMEDIATO — se ve al tocar
  match_seleccionIzq = itemId;
}
function onClickMatchDer(sId, itemId, el) {
  if (!match_seleccionIzq) { showToast('👈 Primero toca un elemento de la izquierda'); return; }
  const parKey = 'match_pares_'+sId;
  st.acts[parKey] = st.acts[parKey] || {};
  st.acts[parKey][match_seleccionIzq] = itemId;
  save();
  // 🔺 Marcar AMBOS elementos como "unidos" visualmente, con un color compartido — se ve YA
  const colorPar = coloresParesMatch[Object.keys(st.acts[parKey]).length % coloresParesMatch.length];
  document.querySelector(`#match-${sId} [data-izq="${match_seleccionIzq}"]`)?.style.setProperty('--par-color', colorPar);
  el.classList.add('match-unido');
  el.style.setProperty('--par-color', colorPar);
  match_seleccionIzq = null;
  render(); // refresca para mostrar el botón de "Verificar este par" (Regla 2)
}
const coloresParesMatch = ['#FFD700','#4FC3F7','#81C784','#F48FB1','#FFB74D','#CE93D8'];
```
```css
.match-seleccionado { outline: 3px solid var(--accent); transform: scale(1.04); }
.match-unido { border: 3px solid var(--par-color, var(--primary)) !important; background: color-mix(in srgb, var(--par-color, var(--primary)) 15%, #fff); }
```
### ✅ REGLA 2 — BOTÓN "VERIFICAR" INDIVIDUAL POR PAR/PREGUNTA, NUNCA UNO SOLO GENERAL
```javascript
// Cada par formado tiene SU PROPIO botón "✔️ Verificar este par" — no un botón único al final.
// Esto aplica IGUAL a fill (cada espacio en blanco), tf (cada afirmación) y orden (cada posición):
// el estudiante recibe control y feedback uno a uno, no todo junto al final.
function renderBotonVerificarPar(sId, izqId) {
  const yaVerificado = st.acts['match_verif_'+sId+'_'+izqId];
  if (yaVerificado) {
    const fueCorrecta = st.acts['match_ok_'+sId+'_'+izqId];
    return `<span class="match-verif-resultado">${fueCorrecta ? '✅ Correcto' : '❌ Revisa este par'}</span>`;
  }
  const tienePar = !!(st.acts['match_pares_'+sId] || {})[izqId];
  if (!tienePar) return ''; // no mostrar botón hasta que haya un par formado
  return `<button class="mbtn-sm" onclick="verificarParIndividual('${sId}','${izqId}')">✔️ Verificar este par</button>`;
}
function verificarParIndividual(sId, izqId) {
  const s = SL.find(x => x.id === sId);
  const parElegido = (st.acts['match_pares_'+sId] || {})[izqId];
  const parCorrecto = s.paresCorrectos?.[izqId]; // definido en los datos del slide
  const esCorrecta = parElegido === parCorrecto;
  st.acts['match_verif_'+sId+'_'+izqId] = true;
  st.acts['match_ok_'+sId+'_'+izqId] = esCorrecta;
  save();
  showToast(esCorrecta ? '✅ ¡Ese par es correcto!' : '💡 Ese par no es — inténtalo con otro');
  verificarSiMatchCompleto(sId, s);
  render();
}
function verificarSiMatchCompleto(sId, s) {
  const totalItems = Object.keys(s.paresCorrectos || {}).length;
  const verificados = Object.keys(s.paresCorrectos || {}).filter(k => st.acts['match_verif_'+sId+'_'+k]).length;
  if (verificados >= totalItems) {
    st.acts['match_done_'+sId] = true; // 🔺 desbloquea "Siguiente" — contestar (no acertar) desbloquea, Prioridad 0-C
    save();
    habilitarBtnNext();
  }
}
```
**Mismo principio para `fill`, `tf` y `orden`:** cada espacio en blanco / cada afirmación V-F / cada elemento de orden tiene su propio botón "✔️ Verificar" — el estudiante corrige sobre la marcha, con feedback inmediato ítem por ítem, en vez de un solo botón "Verificar todo" al final que oculta dónde estuvo el error.
**Checklist:**
```
[ ] Al seleccionar un ítem de matching, se ve marcado de inmediato — nunca hay que esperar a verificar para "ver" la selección
[ ] Cada par de matching tiene su propio botón "✔️ Verificar este par" — no existe un botón único "Verificar todo" al final
[ ] fill, tf y orden aplican el mismo patrón: verificación individual por ítem, con feedback inmediato
[ ] match_done_/fill_done_/tf_done_/orden_done_ se marcan true solo cuando TODOS los ítems fueron verificados individualmente
[ ] Ningún resultado de verificación individual afecta la nota (Prioridad 18-A) — sigue siendo formativo
[ ] Estas actividades también quedan cubiertas por la Prioridad 8-I: una vez completadas, nunca se vacían al recargar o ir atrás
```
