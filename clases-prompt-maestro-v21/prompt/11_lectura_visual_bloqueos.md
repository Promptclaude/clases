---
modulo: 11_lectura_visual_bloqueos
etapa_de_lectura: 1
prioridades: [0-A, 0-B, 0-C, 0-D, 0-E, 0-F, 0-G]
---

# 11 · Cronómetro de lectura, slides visuales, bloqueo de actividades, sopa de letras, paleta, temática, menú

## 🔴 PRIORIDAD 0-A · ABSOLUTA — CRONÓMETRO DE PERMANENCIA EN SLIDES DE LECTURA (reglas y visual; motor en 8-N, vigilante en 8-O)

### ⏱️ REGLA DE ORO: EL ESTUDIANTE NO PUEDE PASAR UNA SLIDE DE LECTURA EN MENOS DE 12 SEGUNDOS
**Aplica a:** todos los slides de tipo `info`, `repaso`, `repaso2`, `practica` y cualquier slide que sea de lectura/observación (sin actividad interactiva que responder).
**NO aplica a:** quiz, evalFinal, complementarias, cuadernos, wordsearch, explorador, intro, final.


#### LO ÚNICO QUE DEFINE ESTA PRIORIDAD
**1) El indicador visual** — grande y visible, para que el estudiante entienda por qué no puede avanzar. Esta función SOLO dibuja (no toca estado, no crea intervalos); la llama el motor de 8-N cada segundo:
```javascript
// Solo dibuja el indicador (no toca estado, no crea intervalos) — lo llama el motor de 8-N cada segundo
function htmlIndicadorCronometro(restantes, segundos) {
  const pct = ((segundos - restantes) / segundos) * 100;
  return `
    <div style="display:flex; align-items:center; gap:10px;
                background:linear-gradient(135deg, var(--primary-light), #fff8dc);
                border:3px solid var(--primary); border-radius:14px;
                padding:10px 16px; margin-bottom:10px;
                box-shadow:0 3px 0 var(--primary-dark); animation:pulse-border 1s infinite;">
      <span style="font-size:1.6rem; animation:floatY 1s infinite;">📖</span>
      <div style="flex:1">
        <p style="font-family:var(--font-ui); font-size:.82rem; color:var(--primary-dark);
                  margin-bottom:5px; font-weight:900">
          ⏱️ Lee con atención — continúa en
          <span style="font-size:1.15rem; color:var(--primary); background:#fff;
                       border-radius:8px; padding:1px 8px; border:2px solid var(--primary)">${restantes}s</span>
        </p>
        <div style="height:8px; background:var(--primary-light); border-radius:10px;
                    overflow:hidden; border:1px solid var(--primary)">
          <div style="height:100%; width:${pct}%;
                      background:linear-gradient(90deg,var(--primary),var(--accent));
                      border-radius:10px; transition:width 1s linear"></div>
        </div>
      </div>
    </div>`;
}
// CSS adicional — agregar al <style>:
/*
@keyframes pulse-border {
  0%,100% { box-shadow: 0 3px 0 var(--primary-dark), 0 0 0 0 rgba(var(--primary-rgb),.4); }
  50%      { box-shadow: 0 3px 0 var(--primary-dark), 0 0 0 6px rgba(var(--primary-rgb),.0); }
}
*/
```
**2) Las reglas de negocio:**
- La cuenta regresiva va de 12 a 0 — nunca menos de 12 segundos.
- El botón "Siguiente" está físicamente `disabled` durante la cuenta — no solo visual.
- Si el estudiante ya estuvo en ese slide (`st.acts['leido_'+id]`), NO vuelve a contar.
- Al llegar a 0: toast "✅ ¡Listo! Ya puedes continuar →" + el botón se habilita con animación.
- Durante el reintento dirigido (6-B) y en modo admin (Prioridad 16) NO hay cronómetro y el botón queda **habilitado** (nunca solo "no cuenta": habilitado).
- El cronómetro es **idempotente** y cuenta por **tiempo real**: nada de lo que llame a `aplicarEstadoAvance()` (vigilante, `focus`, cierre de modal, `render()`) puede reiniciarlo (8-N y 8-O).

**3) Quién lo arranca — REGLA DE ORO DE INTEGRACIÓN:** **ningún** `rInfo()`, `rRepaso()`, `rRepaso2()` ni `rPractica()` llama al cronómetro. Esas funciones solo devuelven HTML (y `markSeen()`). El cronómetro lo arranca `render()` a través de `aplicarEstadoAvance(s)` (Prioridad 8-O), de forma **síncrona**, para todos los tipos de lectura por igual.

**Checklist (0-A):**
```
[ ] Existe htmlIndicadorCronometro(restantes, segundos) y SOLO dibuja (sin estado, sin intervalos)
[ ] NINGUNA función rInfo/rRepaso/rRepaso2/rPractica llama a activarCronometroLectura() ni usa requestAnimationFrame para eso
[ ] CSS @keyframes pulse-border incluido en <style>
[ ] En reintento dirigido y en modo admin, las slides de lectura quedan con "Siguiente" HABILITADO (no solo "sin cronómetro")
[ ] Motor en 8-N, arranque en 8-O: ambos implementados tal cual
```

## 🔴 PRIORIDAD 0-B · ABSOLUTA — SLIDES DE LECTURA: VISUALES, NO TEXTUALES

### 🎨 REGLA DE ORO: MÁXIMO TEXTO, MÁXIMO VISUAL
**PROHIBIDO en slides de info/lectura:**
- Párrafos de más de 3 líneas seguidas
- Más de 2 bloques de texto por slide
- Listas de más de 4 ítems
- Texto explicativo sin imagen o gráfico que lo acompañe
- Preguntas de quiz sobre conceptos que NO se hayan explicado Y ejemplificado antes
**OBLIGATORIO en slides de info/lectura:**
- Mínimo 1 organizador gráfico, infografía SVG o esquema visual por slide
- Grid 2×2 de imágenes reales de Unsplash (ya definido en Prioridad 1)
- Ejemplos resueltos paso a paso ANTES de cada quiz
- Cada concepto explicado con una analogía de cultura pop (Prioridad 14)
#### ESTRUCTURA VISUAL OBLIGATORIA para slides de concepto:
```javascript
// PATRÓN 1 — Concepto + Imagen + Ejemplo resuelto (para slides previas al quiz)
{
  type: 'info',
  title: '🔍 [Concepto] — Ejemplo resuelto',
  body: `
    <!-- ZONA 1: Concepto visual breve -->
    <div class="g2" style="gap:14px;align-items:start;margin-bottom:12px">
      <div>
        <div class="ttag">📌 CONCEPTO CLAVE</div>
        <div class="mc" style="margin-bottom:8px">
          <p style="font-size:1rem;font-weight:900;color:var(--primary);line-height:1.5">
            [DEFINICIÓN EN 1 LÍNEA — sin párrafos]
          </p>
          <!-- Referencia cultural obligatoria -->
          <p style="font-size:.82rem;color:var(--text2);margin-top:6px">
            🎮 Como en [JUEGO/SERIE]: [ANALOGÍA BREVE en 1 línea]
          </p>
        </div>
        <!-- Ejemplo resuelto paso a paso — OBLIGATORIO antes de quiz -->
        <div style="background:#fffde0;border:3px solid var(--accent);border-radius:12px;padding:12px">
          <p style="font-family:var(--font-ui);color:var(--primary-dark);font-size:.82rem;margin-bottom:8px">
            ✏️ EJEMPLO RESUELTO:
          </p>
          <div style="font-size:.82rem;line-height:2;color:var(--text2)">
            <p>① [Paso 1 — dato o situación inicial]</p>
            <p>② [Paso 2 — proceso]</p>
            <p style="color:var(--success);font-weight:900">✅ [Resultado final]</p>
          </div>
        </div>
      </div>
      <!-- GRID DE IMÁGENES (obligatorio) -->
      <div class="g2" style="gap:9px">
        <div class="imgc"><img src="[URL_UNSPLASH]" alt="[desc]" loading="lazy"><div class="imgc-cap">🖼️ [Título]</div></div>
        <div class="imgc"><img src="[URL_UNSPLASH]" alt="[desc]" loading="lazy"><div class="imgc-cap">🖼️ [Título]</div></div>
        <div class="imgc"><img src="[URL_UNSPLASH]" alt="[desc]" loading="lazy"><div class="imgc-cap">🖼️ [Título]</div></div>
        <div class="imgc"><img src="[URL_UNSPLASH]" alt="[desc]" loading="lazy"><div class="imgc-cap">🖼️ [Título]</div></div>
      </div>
    </div>
    <!-- ZONA 2: Organizador gráfico SVG (obligatorio en al menos 1 slide por concepto) -->
    <svg viewBox="0 0 500 80" style="width:100%;max-height:80px;margin-top:4px">
      <!-- Diagrama de flujo, tabla comparativa, mapa mental mínimo inline SVG -->
      <rect x="10"  y="10" width="120" height="55" rx="10" fill="var(--primary-light)" stroke="var(--primary)" stroke-width="2"/>
      <text x="70"  y="42" text-anchor="middle" font-family="Fredoka One" font-size="11" fill="var(--primary-dark)">[Concepto 1]</text>
      <line x1="130" y1="37" x2="170" y2="37" stroke="var(--primary)" stroke-width="2" marker-end="url(#arr)"/>
      <rect x="170" y="10" width="120" height="55" rx="10" fill="var(--accent)" stroke="var(--primary-dark)" stroke-width="2" opacity=".7"/>
      <text x="230" y="42" text-anchor="middle" font-family="Fredoka One" font-size="11" fill="var(--primary-dark)">[Concepto 2]</text>
      <!-- Ampliar según el tema -->
    </svg>
  `
}
```
**REGLA PARA DISEÑO DE QUIZZES — "La respuesta ya fue enseñada antes":**
```
OBLIGATORIO — Para CADA pregunta de quiz o evaluación final:
  ✅ El concepto que se pregunta DEBE haberse explicado en un slide anterior
  ✅ DEBE haber al menos 1 ejemplo resuelto de ese tipo de problema/concepto
  ✅ La pregunta usa un CASO NUEVO (diferente al ejemplo), no el mismo
  ✅ El estudiante puede responder porque ya vio cómo se resuelve — solo aplica lo aprendido
  ❌ PROHIBIDO preguntar sobre algo que no se explicó ni ejemplificó en la clase
```

## 🔴 PRIORIDAD 0-C · ABSOLUTA — BLOQUEO UNIVERSAL DE ACTIVIDADES (TODAS)

### 🚫 REGLA DE ORO: NINGUNA ACTIVIDAD SE PUEDE SALTAR SIN HABER SIDO CONTESTADA
**Principio:** El botón "Siguiente" está DESACTIVADO en cualquier slide que tenga una actividad interactiva, hasta que el estudiante la conteste (bien o mal).
**La diferencia con los evaluables (quizzes):**
- Quizzes / EvalFinal: bloquean + afectan la nota
- Actividades complementarias (drag, match, fill, ordenar, explorador): bloquean + NO afectan la nota, pero igual deben completarse
| Tipo de slide | Bloquea "Siguiente" | Afecta nota | Cómo se desbloquea |
|---------------|---------------------|-------------|-------------------|
| `info` / `repaso` | ✅ Cronómetro 12s | ❌ | Al terminar los 12 segundos |
| `quiz` / `evalFinal` | ✅ Total | ✅ SÍ | Al responder TODAS las preguntas |
| `drag` | ✅ | ❌ | Al soltar al menos 2 elementos en alguna zona sin importar que no sea correcto |
| `match` | ✅ | ❌ | Al hacer mínimo 60% de  conexiones sin importar que no sea correcto |
| `fill` | ✅ | ❌ | Al rellenar TODOS los espacios en blanco sin importar que no sea correcto |
| `tf` (Verdadero/Falso) | ✅ | ❌ | Al seleccionar V o F en cada ítem |
| `orden` | ✅ | ❌ | Al pulsar el botón "Verificar" |
| `wordsearch` | ✅ Parcial | ❌ | Al encontrar mínimo 1 palabra |
| `interactive` (explorador) | ✅ Parcial | ❌ | Al abrir/clicar mínimo 1 elemento |
| `practica` | ✅ Cronómetro 12s | ❌ | Al terminar los 12 segundos (igual que info/repaso) |
| `intro` / `final` | ❌ Libre | — | Sin bloqueo |
** v6.2:** `cuaderno` y `cuaderno2` YA NO son tipos de slide — nunca deben aparecer en `SL` ni en esta tabla. Los cuadernos (Cuaderno 1 y Taller en Clase) son paneles flotantes independientes del recorrido; ver Prioridad 10 y Prioridad 18.
#### IMPLEMENTACIÓN EXACTA — función central de control:
```javascript
// ⚠️ v12.0 — `puedeAvanzar(s)` y `nextSlide()` tienen UNA SOLA versión, en la Prioridad 8-O
// (incluye modoAdmin, reintento dirigido, todos los tipos de lectura y la navegación con reintento).
// El código que estaba aquí se eliminó porque duplicaba —y contradecía— a 8-O y a 6-B.
// La tabla de arriba sigue siendo la especificación de QUÉ desbloquea cada tipo; 8-O es el código.
// Mensajes de bloqueo según el tipo — tono amable y claro
function mostrarMensajeBloqueo(s) {
  const esEvaluable = ['quiz','evalFinal'].includes(s.type);
  const esLectura   = ['info','repaso','practica'].includes(s.type);
  let emoji, titulo, cuerpo, boton;
  if (esLectura) {
    // No debería llegar aquí (el botón ya está disabled por el cronómetro)
    // pero como fallback:
    emoji  = '⏱️';
    titulo = '¡Espera un momento!';
    cuerpo = 'Quédate en esta slide al menos <strong>12 segundos</strong> para asegurarte de leer el contenido.';
    boton  = '📖 Volver a leer';
  } else if (esEvaluable) {
    emoji  = '🔒';
    titulo = '¡Esta actividad sí cuenta para tu nota!';
    cuerpo = 'Debes responder <strong>todas las preguntas</strong> antes de continuar.<br><span style="font-size:.78rem;color:var(--muted)">No puedes saltarte esta evaluación.</span>';
    boton  = '✍️ Volver a responder';
  } else {
    // Complementarias
    emoji  = '💪';
    titulo = '¡Completa la actividad antes de continuar!';
    cuerpo = `Esta actividad <strong>no afecta tu nota</strong> — puedes equivocarte sin problema.<br>
      Pero debes completarla para poder avanzar.<br>
      <span style="font-size:.78rem;color:var(--muted)">
        Hazlo lo mejor que puedas — ¡es para aprender! 😊
      </span>`;
    boton  = '🙌 ¡Voy a completarla!';
  }
  showModal(`
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:3rem;margin-bottom:8px">${emoji}</div>
      <h2 style="font-family:var(--font-ui);color:var(--primary);font-size:1.1rem;margin-bottom:10px">
        ${titulo}
      </h2>
      <p style="font-size:.88rem;color:var(--text2);line-height:1.7;margin-bottom:16px">
        ${cuerpo}
      </p>
      <button class="mbtn" onclick="closeModal()" style="width:100%;font-size:1rem;padding:12px">
        ${boton}
      </button>
    </div>
  `);
}
```
**MARCADO DE "HECHO" en cada tipo de actividad complementaria:**
```javascript
// Al terminar drag (soltar todos los chips):
function onDragComplete(sId) {
  st.acts['drag_done_'+sId] = true;
  save();
  habilitarBtnNext();  // quitar disabled del botón siguiente
  showToast('✅ ¡Actividad completada! Puedes continuar →');
}
// Al terminar match (todos los pares conectados):
function onMatchComplete(sId) {
  st.acts['match_done_'+sId] = true;
  save(); habilitarBtnNext();
  showToast('✅ ¡Actividad completada! Puedes continuar →');
}
// Al terminar fill (todos los blancos rellenados):
function onFillComplete(sId) {
  st.acts['fill_done_'+sId] = true;
  save(); habilitarBtnNext();
  showToast('✅ ¡Actividad completada! Puedes continuar →');
}
// Al terminar tf (todos los ítems con V o F):
function onTFComplete(sId) {
  st.acts['tf_done_'+sId] = true;
  save(); habilitarBtnNext();
  showToast('✅ ¡Actividad completada! Puedes continuar →');
}
// Al pulsar "Verificar" en orden:
function onOrdenVerificar(sId) {
  st.acts['orden_done_'+sId] = true;
  save(); habilitarBtnNext();
  // mostrar retroalimentación de si quedó bien o mal (sin afectar nota)
}
// Al clicar 1 elemento del explorador:
function onExploradorClick(sId) {
  if (!st.acts['exp_min_'+sId]) {
    st.acts['exp_min_'+sId] = true;
    save(); habilitarBtnNext();
  }
}
// Al escribir en el cuaderno:
function onCuadernoInput(sId) {
  if ((st.acts['reflexion_r1']||'').trim().length > 0) {
    save(); habilitarBtnNext();
  }
}
// ⚠️ v12.0 — `habilitarBtnNext()` y `deshabilitarBtnNext()` tienen UNA SOLA versión, en la Prioridad 8-O.
// Las funciones de "hecho" de arriba (onDragComplete, onMatchComplete, …) siguen llamando a habilitarBtnNext().

```
**LÓGICA DE RENDER — v12.0: la decisión de habilitar/deshabilitar "Siguiente" vive en UNA función, `aplicarEstadoAvance(s)` (Prioridad 8-O), y se llama de forma SÍNCRONA desde `render()`:**
```javascript
// Al final de render(), justo después de insertar el HTML de la slide:
aplicarEstadoAvance(s);   // ✅ síncrono. Habilita si puedeAvanzar(s); si no, deshabilita y —solo para slides de lectura— arranca el cronómetro
// ❌ PROHIBIDO (versión anterior de este prompt): envolverlo en requestAnimationFrame(() => { ... }).
// El navegador NO ejecuta rAF con la pestaña en segundo plano: si el estudiante cambia de app justo al
// cambiar de slide (o se apaga la pantalla de la tablet), el cronómetro nunca arrancaba y "Siguiente"
// quedaba apagado para siempre — solo se arreglaba recargando.
```
El esqueleto completo y obligatorio de `render()` está en la Prioridad 8-O.

## 🔴 PRIORIDAD 0-D · ABSOLUTA — SOPA DE LETRAS: MÁXIMO 5 PALABRAS, GRILLA CON ESPACIO, PISTA VISUAL EXACTA

### 🔍 REGLAS DE ORO DE LA SOPA DE LETRAS
- **Máximo 5 palabras** por sopa de letras (nunca más)
- La grilla debe tener **suficientes casillas** para que todas las palabras quepan con buen espacio — nunca una grilla apretada donde las palabras casi no entran
- El estudiante marca una palabra encontrada **presionando/clicando su primera letra y luego su última letra** (selección por extremos, en línea recta entre ambos puntos)
- El sistema de pistas **pregunta primero para cuál palabra específica** quiere la pista el estudiante — nunca la elige automáticamente el sistema
- **El progreso de la sopa de letras se guarda y persiste**: palabras ya encontradas y pistas ya usadas NUNCA se reinician al recargar la página, salir y volver a entrar, o navegar a otra slide y regresar
- La sopa de letras **nunca debe congelar ni bloquear la interacción general de la página** — la selección de letras debe ser robusta y no debe dejar la interfaz sin respuesta ante clics rápidos o repetidos
#### TAMAÑO DE GRILLA — CÁLCULO OBLIGATORIO SEGÚN LA PALABRA MÁS LARGA:
```javascript
// La grilla debe tener margen suficiente: mínimo la longitud de la palabra más larga + 4,
// y nunca menos de 8x8 para que las palabras no queden apretadas ni se corten
function calcularTamañoGrilla(palabras) {
  const masLarga = Math.max(...palabras.map(p => p.length));
  const lado = Math.max(8, masLarga + 4);
  return lado; // usar lado x lado como dimensiones de la grilla
}
```
### 💡 SISTEMA DE PISTAS — EL ESTUDIANTE ELIGE PARA CUÁL PALABRA QUIERE AYUDA
**Reglas de las pistas (v6.4 — corregido):**
- El estudiante tiene **exactamente 2 pistas** por sopa de letras (en total, sin importar cuántas palabras haya)
- Al pulsar "Pista", el sistema **pregunta para cuál palabra específica** (de las aún no encontradas) quiere la ayuda — mediante una lista de botones con las palabras pendientes, nunca eligiendo automáticamente
- **La pista NUNCA dice ni escribe con qué letra empieza la palabra.** La ayuda es 100% visual: ilumina, dentro de la propia grilla, las celdas exactas donde están ubicadas la primera y la segunda letra de esa palabra en su posición real (no cualquier celda que tenga esa letra en otro lugar de la sopa)
- Ambas letras se iluminan **al mismo tiempo**, durante **4 a 5 segundos**, y luego el resaltado desaparece solo
- El contador de pistas es visible: 💡💡 (disponibles) → 💡⬜ → ⬜⬜ (agotadas)
- Después de 2 usos, el botón se desactiva permanentemente
#### REQUISITO PREVIO — GUARDAR LA POSICIÓN REAL DE CADA PALABRA AL GENERAR LA GRILLA:
```javascript
// Al generar la sopa de letras, además de dibujar las celdas, se debe guardar
// DÓNDE quedó ubicada cada palabra (fila/columna de inicio + dirección), para que
// la pista pueda iluminar la posición exacta y no cualquier letra repetida en la grilla.
// s.posicionesWS = {
// "SUMA":  { filaInicio: 2, colInicio: 3, dir: {dr: 0, dc: 1} },  // horizontal
// "RESTA": { filaInicio: 5, colInicio: 1, dir: {dr: 1, dc: 0} },  // vertical
// // dir es el delta de fila/columna que se suma en cada paso de la palabra
// // (0,1)=horizontal → · (1,0)=vertical ↓ · (1,1)=diagonal ↘ · (1,-1)=diagonal ↙
// };
```
### 🔺🔺 GARANTÍA DE FUNCIONAMIENTO DE LA PISTA — LA PISTA DEBE FUNCIONAR SIEMPRE, SIN EXCEPCIÓN
**Regla no negociable:** `s.posicionesWS` se construye en el MISMO momento en que se genera/coloca cada palabra dentro de la grilla — NUNCA se agrega "aparte" ni se deja para después. Si el algoritmo de generación de la grilla coloca una palabra en una celda, en ESE mismo instante debe guardar su `filaInicio`, `colInicio` y `dir` en `s.posicionesWS[palabra]`. Antes de entregar el código, hay que verificar que **cada una** de las palabras de `s.palabras` tenga una entrada correspondiente en `s.posicionesWS` — nunca debe faltar ninguna.
```javascript
// 🔺 Verificación obligatoria al terminar de generar la grilla — nunca omitir:
function verificarPosicionesCompletas(s) {
  const faltantes = s.palabras.filter(p => !s.posicionesWS || !s.posicionesWS[p]);
  if (faltantes.length > 0) {
    console.error('⚠️ Faltan posiciones en s.posicionesWS para:', faltantes);
    // Esto NUNCA debe pasar en el archivo final — si pasa, hay que revisar el
    // algoritmo de generación de la grilla, no "parchar" con un valor inventado.
  }
}
// abrirSelectorPista() y usarPistaWS() (más arriba en esta misma prioridad) ya
// verifican con "if (!pos) return;" — pero eso es solo un respaldo de seguridad
// para no romper la página; NO reemplaza tener s.posicionesWS completo desde el inicio.
```
**Checklist de funcionamiento garantizado:**
```
[ ] s.posicionesWS se llena en el MISMO paso donde se coloca cada palabra en la grilla — nunca por separado
[ ] verificarPosicionesCompletas(s) confirma que TODAS las palabras de s.palabras tienen posición guardada
[ ] Probado manualmente: pedir pista para CADA una de las palabras de una sopa de letras — las 5 deben iluminar correctamente
[ ] El botón de pista nunca queda "sin hacer nada" al pulsarlo — si algo falla, muestra un toast de aviso, nunca silencio total
```
```javascript
// Estado persistente en el slide de wordsearch (se guarda en st.acts, sobrevive recargas):
// st.acts['ws_pistas_'+s.id]         = 0, 1 o 2 (pistas usadas)
// st.acts['ws_min_'+s.id]            = true si encontró ≥1 palabra
// st.acts['ws_found_'+s.id]          = array de palabras ya encontradas, ej: ["SUMA","RESTA"]
// Paso 1: preguntar para cuál palabra quiere la pista (nunca automático)
function abrirSelectorPista(sId, palabras) {
  const pistasUsadas = st.acts['ws_pistas_'+sId] || 0;
  if (pistasUsadas >= 2) {
    showToast('⬜ Ya usaste tus 2 pistas — ¡tú puedes encontrarlas! 💪');
    return;
  }
  const encontradas = st.acts['ws_found_'+sId] || [];
  const noEncontradas = palabras.filter(p => !encontradas.includes(p));
  if (noEncontradas.length === 0) {
    showToast('🎉 ¡Ya encontraste todas las palabras!');
    return;
  }
  // Modal ligero (no bloqueante) preguntando la palabra objetivo de la pista
  showModal(`
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:2.5rem;margin-bottom:8px">💡</div>
      <h2 style="font-family:var(--font-ui);color:var(--primary);font-size:1.05rem;margin-bottom:10px">
        ¿Para cuál palabra quieres la pista?
      </h2>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:10px">
        ${noEncontradas.map(p => `
          <button class="mbtn" onclick="closeModal();usarPistaWS('${sId}','${p}')">
            🔍 ${p}
          </button>
        `).join('')}
      </div>
      <button class="mbtn gy" onclick="closeModal()">Cancelar</button>
    </div>
  `);
}
// Paso 2: iluminar la UBICACIÓN REAL de las 2 primeras letras dentro de la grilla,
// nunca revelar la letra por texto/toast
function usarPistaWS(sId, palabraElegida) {
  const pistasUsadas = st.acts['ws_pistas_'+sId] || 0;
  if (pistasUsadas >= 2) return;
  iluminarPrimeraDosLetras(sId, palabraElegida);
  st.acts['ws_pistas_'+sId] = pistasUsadas + 1;
  save(); // se guarda de inmediato, la pista usada nunca se resetea al recargar
  actualizarBtnPista(sId);
  // el toast NUNCA menciona la letra ni el texto de la palabra, solo avisa que hay pista visual
  showToast('💡 Mira las dos casillas iluminadas en la sopa de letras 👀');
}
// Ilumina EXACTAMENTE las celdas donde está la palabra elegida, usando su
// posición real guardada en s.posicionesWS (no cualquier celda que repita esa letra)
function iluminarPrimeraDosLetras(sId, palabra) {
  const s = SL.find(x => x.id === sId);
  const pos = s?.posicionesWS?.[palabra];
  if (!pos) return; // seguridad: si no hay posición guardada, no se ilumina nada
  const { filaInicio, colInicio, dir } = pos;
  const fila2 = filaInicio + dir.dr;
  const col2  = colInicio + dir.dc;
  const celda1 = document.getElementById(`ws-cell-${sId}-${filaInicio}-${colInicio}`);
  const celda2 = document.getElementById(`ws-cell-${sId}-${fila2}-${col2}`);
  // Ambas celdas se iluminan AL MISMO TIEMPO, 4-5 segundos, luego se quita el resaltado
  [celda1, celda2].forEach(c => c && c.classList.add('ws-pista'));
  setTimeout(() => {
    [celda1, celda2].forEach(c => c && c.classList.remove('ws-pista'));
  }, 4500); // 4.5s — dentro del rango 4-5s requerido
}
function actualizarBtnPista(sId) {
  const btn = document.getElementById('ws-pista-btn-'+sId);
  if (!btn) return;
  const usadas = st.acts['ws_pistas_'+sId] || 0;
  const restantes = 2 - usadas;
  const iconos = '💡'.repeat(restantes) + '⬜'.repeat(usadas);
  btn.innerHTML = `${iconos} Pista (${restantes} restante${restantes!==1?'s':''})`;
  if (restantes <= 0) {
    btn.disabled = true;
    btn.style.opacity = '.4';
    btn.style.cursor = 'not-allowed';
    btn.title = 'Ya usaste tus 2 pistas';
  }
}
// Cada celda de la grilla debe tener id único ws-cell-${sId}-${fila}-${col}
// para que la pista pueda ubicarla exactamente. Ejemplo al generar la grilla:
// <span id="ws-cell-${s.id}-${fila}-${col}" class="ws-cell" onclick="onCeldaClickWS('${s.id}',${fila},${col},'${letra}')">${letra}</span>

// HTML del botón de pista — incluir en el render de la sopa de letras:
// <button id="ws-pista-btn-${s.id}"
// onclick="abrirSelectorPista('${s.id}', ${JSON.stringify(s.palabras)})"
// class="ws-pista-btn">
// 💡💡 Pista (2 restantes)
// </button>
```
### ✋ SELECCIÓN DE PALABRAS — PRIMERA Y ÚLTIMA LETRA, SIN BLOQUEAR LA PÁGINA
```javascript
// Mecánica de selección: el estudiante clica la primera letra de la palabra
// y luego su última letra (en línea recta: horizontal, vertical o diagonal).
// La selección se guarda de inmediato en st.acts y NUNCA se pierde al recargar.
let ws_celdaInicio = null; // referencia temporal en memoria (no persistente, solo mientras selecciona)
function onCeldaClickWS(sId, fila, col, letra) {
  if (!ws_celdaInicio) {
    ws_celdaInicio = { fila, col };
    return; // primera letra marcada, esperando la última
  }
  const inicio = ws_celdaInicio;
  ws_celdaInicio = null; // reset inmediato — evita que un doble clic bloquee la selección
  const s = SL[st.slide];
  const palabraDetectada = detectarPalabraEnLinea(s, inicio, { fila, col }); // valida línea recta
  if (!palabraDetectada) {
    showToast('🔸 Esa no es una palabra válida — intenta de nuevo');
    return; // NUNCA lanza error ni congela la interfaz, solo avisa y permite reintentar
  }
  marcarPalabraEncontradaWS(sId, palabraDetectada);
}
function marcarPalabraEncontradaWS(sId, palabra) {
  const encontradas = st.acts['ws_found_'+sId] || [];
  if (encontradas.includes(palabra)) return; // ya estaba encontrada, no duplicar
  encontradas.push(palabra);
  st.acts['ws_found_'+sId] = encontradas; // persiste de inmediato en localStorage
  st.acts['ws_min_'+sId] = true;
  save();
  document.getElementById('ws-count-'+sId).textContent = encontradas.length;
  const chipPalabra = document.getElementById('ws-word-'+sId+'-'+palabra);
  if (chipPalabra) chipPalabra.classList.add('ws-word-found');
  habilitarBtnNext();
  showToast(`✅ ¡Encontraste "${palabra}"!`);
}
// Al renderizar la sopa de letras, restaurar visualmente las palabras
// ya encontradas en intentos anteriores (antes de recargar la página):
function restaurarProgresoWS(sId) {
  const encontradas = st.acts['ws_found_'+sId] || [];
  encontradas.forEach(p => {
    const chip = document.getElementById('ws-word-'+sId+'-'+p);
    if (chip) chip.classList.add('ws-word-found');
  });
  const contador = document.getElementById('ws-count-'+sId);
  if (contador) contador.textContent = encontradas.length;
  actualizarBtnPista(sId);
}
// Llamar restaurarProgresoWS(s.id) justo después de insertar el HTML del slide wordsearch en render()
```
**CSS de las pistas y de las palabras encontradas — agregar al `<style>`:**
```css
/* — Celda iluminada de pista: se aplica a AMBAS letras (primera y segunda) al mismo tiempo */
.ws-pista {
  background: #FFD700 !important;
  color: #000 !important;
  border: 3px solid #FF8C00 !important;
  border-radius: 5px !important;
  animation: ws-glow 0.5s ease infinite alternate !important;
  font-weight: 900 !important;
  transform: scale(1.15) !important;
  z-index: 2;
  position: relative;
}
@keyframes ws-glow {
  from { box-shadow: 0 0 4px #FFD700; }
  to   { box-shadow: 0 0 14px #FF8C00, 0 0 4px #FFD700; }
}
/* Botón de pista */
.ws-pista-btn {
  background: linear-gradient(135deg, #FFF8DC, #FFD700);
  border: 3px solid #FFA500;
  border-radius: 10px;
  padding: 8px 16px;
  font-family: var(--font-ui);
  font-size: .88rem;
  cursor: pointer;
  box-shadow: 0 3px 0 #CC8400;
  transition: .15s;
  color: #5C3A00;
}
.ws-pista-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 0 #CC8400;
}
.ws-pista-btn:disabled {
  background: #ddd;
  border-color: #aaa;
  color: #888;
  box-shadow: none;
}
/* — Palabra ya encontrada en la lista */
.ws-word-found {
  background: var(--success) !important;
  color: #fff !important;
  text-decoration: line-through;
  opacity: .85;
}
```
**Posición del botón de pista y estructura del slide — incluir en el slide de sopa de letras:**
```javascript
// En rWS(s) — justo encima de la grilla. Tamaño de grilla calculado con calcularTamañoGrilla().
// Máximo 5 palabras en s.palabras. Llamar restaurarProgresoWS(s.id) tras insertar este HTML.
return `
  <div class="slide-title">${s.title}</div>
  <p class="slide-sub">🔍 Encuentra las ${s.palabras.length} palabras ocultas (máx. 5) — toca la primera y la última letra</p>
  <!-- BARRA DE PISTAS — visible y prominente -->
  <div style="display:flex;align-items:center;justify-content:space-between;
              margin-bottom:10px;background:var(--primary-light);
              border-radius:12px;padding:8px 14px;border:2px solid var(--primary)">
    <span style="font-family:var(--font-ui);font-size:.82rem;color:var(--primary-dark)">
      🔍 Palabras encontradas:
      <strong id="ws-count-${s.id}">0</strong> / ${s.palabras.length}
    </span>
    <button id="ws-pista-btn-${s.id}"
            onclick="abrirSelectorPista('${s.id}', ${JSON.stringify(s.palabras)})"
            class="ws-pista-btn">
      💡💡 Pista (2 restantes)
    </button>
  </div>
  <!-- GRILLA DE LA SOPA DE LETRAS (tamaño calculado con calcularTamañoGrilla) -->
  <div id="ws-grid-${s.id}" class="ws-grid">
    <!-- celdas generadas dinámicamente, cada una con onclick="onCeldaClickWS(...)" -->
  </div>
  <!-- Lista de palabras a encontrar -->
  <div id="ws-lista-${s.id}" class="ws-lista">
    ${s.palabras.map(p => `
      <span id="ws-word-${s.id}-${p}" class="ws-word">${p}</span>
    `).join('')}
  </div>
  <!-- Mensaje de desbloqueo -->
  <div id="ws-aviso-${s.id}"
       style="margin-top:10px;padding:8px 12px;background:#fff8dc;border-radius:10px;
              border:2px solid var(--accent);font-family:var(--font-ui);
              font-size:.78rem;color:var(--text2);text-align:center">
    🔑 Encuentra al menos <strong>1 palabra</strong> para poder continuar — tu avance nunca se pierde, aunque recargues la página
  </div>
`;
```
**Checklist de blindaje de la sopa de letras:**
```
[ ] Nunca más de 5 palabras por sopa de letras
[ ] Grilla dimensionada con calcularTamañoGrilla() — nunca apretada
[ ] Selección de palabra por clic en primera letra + clic en última letra (línea recta)
[ ] La pista SIEMPRE pregunta primero para cuál palabra específica (nunca automática)
[ ] La pista ilumina la ubicación EXACTA de la palabra (s.posicionesWS) — nunca revela la letra por texto
[ ] Ambas letras se iluminan al mismo tiempo, 4-5 segundos, dentro de la propia grilla
[ ] st.acts['ws_found_'+id] persiste el arreglo de palabras encontradas — se restaura en cada render()
[ ] st.acts['ws_pistas_'+id] persiste las pistas usadas — nunca se resetea al recargar
[ ] Ningún clic o selección inválida congela la página — siempre se puede reintentar
[ ] El progreso de la sopa de letras solo se borra si el estudiante usa una vida (Prioridad 6/6-B lo excluye — la sopa de letras NUNCA se resetea al reintentar, solo los quizzes)
```

## 🔴 PRIORIDAD 0-E · ABSOLUTA — PALETA DE COLORES CLARA OBLIGATORIA (VERIFICACIÓN ESTRICTA)

### ☀️ REGLA DE ORO: SI EL FONDO SE VE OSCURO, ESTÁ MAL HECHO
Esta sección reemplaza y refuerza con MÁS rigor la Prioridad 12 (identidad visual). Se ha detectado que algunas clases generadas terminan con fondos oscuros pese a la indicación general — por eso esta sección impone **valores numéricos verificables**, no solo intención.
**PRUEBA OBLIGATORIA DE LUMINOSIDAD — aplicar antes de fijar cualquier color:**
```javascript
// Toda variable de fondo (--bg-main, --bg-card, --bg-sidebar, --primary-light)
// DEBE tener un valor de luminosidad (L en HSL) MAYOR a 85% para fondos principales
// y MAYOR a 70% para fondos secundarios. Verificar así:
function calcularLuminosidad(hex) {
  const r = parseInt(hex.slice(1,3),16)/255;
  const g = parseInt(hex.slice(3,5),16)/255;
  const b = parseInt(hex.slice(5,7),16)/255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  return ((max+min)/2)*100;
}
// --bg-main      → luminosidad ≥ 90%  (ej: #FFFDF0, #FFF8E7, #EFF8FF)
// --bg-card      → SIEMPRE #FFFFFF (100%)
// --bg-sidebar   → puede ser oscuro PERO con texto blanco/amarillo legible (es la ÚNICA excepción permitida)
// --primary-light→ luminosidad ≥ 88%  (ej: #FFECEC, #E8F4FF, #FFFDE7)
```
**TABLA DE PALETAS CORREGIDA — valores exactos verificados (luminosidad ≥90% en bg-main):**
| Tema | --primary | --accent | --bg-main (claro) | --bg-sidebar (única zona oscura permitida) |
|------|-----------|----------|--------------------|---------------------------------------------|
| Super Mario | #E52B2B | #FFD700 | #EAF4FF | linear-gradient(180deg,#5C94FC,#2E5BB8) |
| Minecraft | #5D9E3A | #D4A017 | #F4FBE8 | linear-gradient(180deg,#3D6B28,#234017) |
| Pokémon | #EE1515 | #FFCB05 | #FFFDF0 | linear-gradient(180deg,#2A5298,#1A3A6E) |
| Among Us | #C51111 | #2D7DD2 | #F5FAFF | linear-gradient(180deg,#2C2C54,#1a1a2e) |
| Encanto | #2E7D32 | #F9A825 | #FFFDF5 | linear-gradient(180deg,#2E7D32,#1B5E20) |
| Spider-Man | #D32F2F | #1565C0 | #FAFAFA | linear-gradient(180deg,#1565C0,#0D1B2A) |
| Frozen | #1976D2 | #80D8FF | #F0F9FF | linear-gradient(180deg,#1976D2,#0D47A1) |
| Roblox | #E63946 | #457B9D | #F7FBF9 | linear-gradient(180deg,#457B9D,#1D3557) |
| Harry Potter | #7B1FA2 | #F9A825 | #FFFAF0 | linear-gradient(180deg,#7B1FA2,#4A148C) |
| Dragon Ball | #FF6F00 | #1976D2 | #FFFAF0 | linear-gradient(180deg,#1976D2,#0D3B66) |
| Stranger Things | #C0392B | #F39C12 | #FFF8F0 | linear-gradient(180deg,#C0392B,#5C0A0A) |
| LEGO | #D5001C | #FFD700 | #FFFCEF | linear-gradient(180deg,#0057A8,#003D75) |
**PROHIBICIÓN ABSOLUTA — la siguiente lista de colores NUNCA puede usarse en `--bg-main`, `--bg-card`, o `body { background }`:**
```
❌ #000000, #0a0a0a, #111111, #1a1a1a, #1a1a2e, #16213e, #0d1b2a
❌ Cualquier hex con los 3 canales RGB por debajo de 40 (casi negro)
❌ "background: black", "background: #111", gradientes oscuro→oscuro en el body
❌ Paletas "cyberpunk", "neón sobre negro", "modo oscuro"
```
**VERIFICACIÓN FINAL OBLIGATORIA antes de entregar el código:**
```
[ ] El color en --bg-main tiene luminosidad ≥ 90% (verificar con la fórmula arriba)
[ ] El color en --bg-card es #FFFFFF
[ ] El body NO tiene background oscuro aplicado directamente
[ ] Solo --bg-sidebar puede ser oscuro, y solo si el texto dentro es blanco/amarillo claro
[ ] Si tienes duda sobre un color, conviértelo a uno MÁS claro, nunca más oscuro
```

## 🔴 PRIORIDAD 0-F · ABSOLUTA — TEMÁTICA VISUAL ROTATIVA ENTRE CLASES (NO REPETIR TEMA)

### 🎭 CADA CLASE DEBE TENER UN UNIVERSO VISUAL DIFERENTE AL DE LA CLASE ANTERIOR
**Regla de rotación obligatoria:**
```javascript
// El autor debe registrar qué tema visual usó en la última clase de esa materia
// y el nuevo prompt NUNCA debe repetir el mismo tema dos semanas consecutivas.
const HISTORIAL_TEMAS = {
  // Ejemplo de registro — el autor completa esto en cada nueva clase
  tech4:  ['Minecraft', 'Pokémon', 'Among Us'],   // últimos 3 temas usados en Tecnología 4°
  arit5:  ['Roblox', 'Mario'],                     // últimos 2 temas usados en Aritmética 5°
};
// REGLA: el nuevo TEMA_VISUAL no puede coincidir con ninguno de los últimos 2 registrados
// para esa misma materia+grado.
```
**Catálogo ampliado de universos disponibles (rotar entre estos, nunca repetir consecutivamente):**
```
Videojuegos:     Minecraft, Roblox, Among Us, Fortnite, Mario, Pokémon, Free Fire, Clash Royale
Series/Películas: Encanto, Spider-Man, Dragon Ball, Frozen, Stranger Things, Harry Potter, Coco
Construcción:    LEGO
Deportes:        Fútbol Colombia / Selección, Mundial
Música/Cultura:  Festival de música urbana (genérico, sin marcas), Carnaval de Barranquilla
```
**Cada clase nueva, el modelo debe:**
1. Preguntar o asumir cuál fue el tema visual de la clase inmediatamente anterior (si el autor lo indica en los DATOS A COMPLETAR)
2. Elegir un tema DIFERENTE del catálogo
3. Aplicar throughout: colores, decoraciones, ByteBot, iconografía, nombres de secciones — TODO debe sentirse del universo elegido, no solo los colores

## 🔴 PRIORIDAD 0-G · ABSOLUTA — EL MENÚ/INDICADOR DE PROGRESO ES 100% VISUAL, NUNCA NAVEGABLE

### 🚨 BUG REAL DETECTADO: SE ESTÁ HACIENDO TRAMPA TOCANDO EL MENÚ DE PROGRESO
**Diagnóstico:** en clases anteriores, el sidebar de progreso permitía `onclick` en las secciones ya vistas o en la actual, con la intención de que el estudiante repasara. En la práctica, algunos estudiantes usan esos clics para **saltar directo a secciones avanzadas sin completar lo anterior**, evadiendo por completo el bloqueo de la Prioridad 0-C. Esta prioridad **ANULA Y REEMPLAZA cualquier `onclick` de navegación** que haya existido en el indicador de progreso, sin importar su forma visual (lista, tablero, o el menú compacto de la Prioridad 10-C rediseñada más abajo).
### ⚖️ REGLA ABSOLUTA E INAPELABLE
El menú/indicador de progreso **NUNCA** tiene un `onclick` que cambie `st.slide`. Es un indicador visual puro — como el marcador de un videojuego que el estudiante mira pero no toca para moverse. La ÚNICA forma de avanzar es el botón "Siguiente" (sujeto a `puedeAvanzar()`, Prioridad 0-C), y la ÚNICA forma de retroceder es el botón "Atrás" (sujeto a la Prioridad 8-H — nunca resetea progreso).
```javascript
// ❌ PROHIBIDO ABSOLUTO en cualquier función que dibuje el menú de progreso:
// `<div class="..." onclick="st.slide=${ini};save();render()">`
// ✅ OBLIGATORIO — el nodo/ítem nunca lleva onclick de navegación:
// `<div class="..." style="cursor:default">`
```
**Checklist:**
```
[ ] Ningún elemento del menú de progreso (sea cual sea su forma visual) tiene onclick que cambie st.slide
[ ] El estudiante entiende su avance de un vistazo, pero JAMÁS puede saltar de slide tocando el indicador
[ ] La única navegación hacia adelante es "Siguiente" (puedeAvanzar()); hacia atrás es "Atrás" (Prioridad 8-H)
[ ] Verificado manualmente: hacer clic/tap en cada nodo del menú — ninguno cambia el slide actual
```
