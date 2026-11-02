# 29 · v23 — Nadie se queda atrapado, retroalimentación que educa, nota en vivo y guardado verificable

> **Se lee en la Etapa 2**, junto con 14, 15, 16 y 28. Nace de un reporte real de aula (4.º–5.º, Aritmética): (1) actividades que **no dejaban pasar** si la respuesta no era correcta, (2) minijuegos y slides interactivas **confusas** (no se entendía qué hacer para continuar), (3) **el visor de la nota no se movía** al contestar bien (se quedaba en 1.5), (4) dudas sobre que la clase nueva abra **en cero** y que el avance **se guarde y se vea en el index**.
> **Esta prioridad manda sobre cualquier texto anterior que diga lo contrario** (ver la tabla de precedencia, sección 4). Donde 0-C, 3, 4, 8-O, 8-P, 8-U, 8-V, 8-F o 35 tenían su propia versión de una función de abajo, esa versión **ya no existe allí**: el código vigente es el de esta sección.

## 🔴 PRIORIDAD 39 · ABSOLUTA — INTENTAR ≠ ACERTAR: NINGUNA SLIDE SE BLOQUEA POR RESPONDER MAL

### 39.1 — Principio
**Una slide se desbloquea por haber INTENTADO, nunca por haber acertado.** Equivocarse nunca puede ser una razón para no poder seguir. Lo que sí hace una respuesta incorrecta: (a) se **valora** (✅/❌), (b) se le dice **cuál era la correcta** y **por qué** (Prioridad 40), (c) y **sigue**.
- **Quizzes / Evaluación final:** responder mal **avanza igual** (el índice sube en el mismo clic, 8-P) y simplemente no suma acierto. Siguen siendo obligatorios (hay que responder todas, bien o mal) y siguen sin poder saltarse.
- **Todo lo demás (sin nota):** se completa **intentando**. Ninguna condición de desbloqueo puede depender de que el resultado sea correcto.

### 39.2 — Qué desbloquea cada tipo (tabla ÚNICA; reemplaza las de 0-C, 3 y 4)
| Tipo | Se desbloquea cuando… | ¿Exige acertar? |
|---|---|---|
| `info` / `repaso` / `repaso2` / `practica` | pasan 12 s (8-N) | No |
| `historia` | todos los beats completos (**cualquier respuesta cuenta**) **y** ≥ 10 s reales desde que entró | No |
| `minijuego` | termina la partida **ganando, perdiendo o saltando** (`finalizarMinijuego`) | No |
| `quiz` / `evalFinal` | responde **todas** las preguntas, bien o mal | No |
| `drag` | suelta ≥ 2 fichas en alguna zona **o** pulsa «Verificar» | No |
| `match` | une ≥ 3 pares **o** pulsa «Verificar» | No |
| `fill` | pulsa «Verificar» (aunque haya espacios vacíos o mal) | No |
| `tf` | elige V o F en cada frase | No |
| `orden` | pulsa «Verificar» | No |
| `wordsearch` | encuentra ≥ 1 palabra **o** usa «No me sale» | No |
| `interactive` | toca ≥ 1 elemento | No |
| `intro` / `final` | libre | — |
**Red de seguridad universal:** en **todo** tipo de la tabla que no sea de lectura ni evaluable, a los **25 s** aparece el botón «🆘 No me sale: ver la respuesta y seguir». Al pulsarlo se muestra la solución con su explicación y se desbloquea. No da gemas, XP ni insignias y **no toca la nota**; se registra como «con ayuda» (`ayuda_<id>`) para el Panel Docente. **Nunca existe para `quiz`/`evalFinal`** (ahí responder mal ya avanza).
> 🔎 Esto **no reabre** el bug de v12 («Saltar de todas formas» congelaba la clase): no modifica `nextSlide()` ni abre otra puerta de navegación; solo marca la actividad como hecha por el mismo camino que cualquier otra (`marcarActividadHecha`), y `nextSlide()` sigue preguntando a `puedeAvanzar()`.

### 39.3 — Reglas por actividad (qué pasa al fallar)
1. **Verificar** siempre cierra con `cerrarVerificacion()`: muestra por ítem ❌ *tu respuesta* / ✅ *la correcta* / 🔎 *por qué* (`htmlFeedbackActividad`) y desbloquea. Un botón «Intentar de nuevo» es **opcional**, nunca requisito.
2. **Verificación inmediata (drag/match):** un error muestra pista y deja reintentar; al **2.º error en el mismo ítem**, la pieza se coloca sola con la explicación (sin penalización).
3. **Sopa de letras:** además de «No me sale» (25 s), tras 3 intentos fallidos de selección se ofrece resaltar una palabra. La pista de 0-D sigue igual.
4. **Historia (34-C):** `predice` y `elige` cuentan con cualquier opción; `buscar` parpadea a los 15 s y se **revela sola a los 30 s** («¡Aquí estaba!»); `ordena` permite 2 intentos y luego se ordena sola explicando el porqué.
5. **Minijuegos (35):** cada tipo define *qué pasa al fallar* y *cuándo termina* (39-B.3). Ninguno puede quedarse esperando un acierto para terminar.
6. Todo desbloqueo guarda en el mismo clic (8-B) y llama a `aplicarEstadoAvance()`.

### 39.4 — «Siguiente» apagado SIEMPRE dice por qué
Debajo del botón hay una línea `#razon-bloqueo` que, mientras esté bloqueado, dice **qué falta** en una frase («👆 Suelta al menos 2 fichas en una zona (no importa si no es la correcta)») y, al desbloquear, dice «🔓 ¡Listo! Ya puedes continuar». Un botón gris sin explicación está prohibido.

### 39.5 — HTML y CSS obligatorios (junto al botón «Siguiente»)
```html
<div id="razon-bloqueo" class="razon-bloqueo" aria-live="polite"></div>
<div id="rescate-wrap" class="rescate-wrap"></div>
<div id="aviso-guardado" class="aviso-guardado" role="alert" style="display:none"></div>
```
```css
.razon-bloqueo { font-family:var(--font-ui); font-size:.8rem; color:var(--text2); text-align:center; margin:6px 0; min-height:1.2em; }
.razon-bloqueo.razon-ok { color:var(--success); font-weight:700; }
.rescate-wrap { text-align:center; margin:6px 0; }
.btn-rescate { min-height:44px; padding:10px 16px; border-radius:12px; border:2px solid var(--accent); background:#fff8dc; color:var(--primary-dark); font-family:var(--font-ui); font-size:.9rem; cursor:pointer; }
.aviso-guardado { background:#fff0f0; border:3px solid var(--error); color:var(--error); border-radius:12px; padding:10px 14px; margin:8px auto; max-width:520px; font-family:var(--font-ui); font-size:.85rem; text-align:center; }
.fb-act { text-align:left; border-radius:12px; padding:10px 14px; margin:10px 0; font-size:.85rem; line-height:1.6; }
.fb-ok  { background:#e8fff0; border:2px solid var(--success); }
.fb-mal { background:#fff8e1; border:2px solid var(--accent); }
.fb-item { background:#fff; border-left:3px solid var(--error); border-radius:0 8px 8px 0; padding:6px 10px; margin:6px 0; }
.fb-tit { font-family:var(--font-ui); color:var(--primary-dark); margin-bottom:4px; }
.fb-pie { color:var(--text2); font-size:.78rem; margin-top:6px; }
```

### 39.6 — Código (fuente única; los fragmentos se prueban con `prueba_v23_snippets.js`)
```javascript
@@SNIPPETS@@
```
**Integración (obligatoria, en este orden):**
1. `render()` (8-O) llama a `pintarNota()` justo después de `actualizarUIGeneral()`, y para slides `historia` fija `st.acts['historia_t0_'+id]` la primera vez que entran. Si `rescateMarca && rescateMarca.id !== s.id`, `rescateMarca = null`.
2. `detenerTemporizadoresSlide()` (8-S) también limpia `window.__rescateTimeout`.
3. `revalidarAvance()` (8-O), en su paso (c): si `rescateMarca` y ya pasaron `T_RESCATE_S` s **reales**, llama a `mostrarBotonRescate(s.id)` (pestaña suspendida); luego `aplicarEstadoAvance(s)` y `repararHudNota()`.
4. Los manejadores `onDragComplete`, `onMatchComplete`, `onFillComplete`, `onTFComplete`, `onOrdenVerificar`, `onExploradorClick` de 0-C **llaman a** `cerrarVerificacion()` / `marcarActividadHecha()`; ninguno comprueba si la respuesta es correcta antes de desbloquear.
5. `ctx.terminar()` de los minijuegos (35.3) llama a `finalizarMinijuego()`; el último beat de una historia llama a `finalizarHistoria()`.
6. Cada tipo define `mostrarSolucionActividad(s)` (o hereda el genérico): resalta/coloca la respuesta correcta y muestra su explicación. Si no existe, `usarRescate()` solo desbloquea.

### 39.7 — Prueba obligatoria (T10 y T11 de 43)
```
T10: en cada slide sin nota, responder TODO MAL (o no acertar nunca) → «Siguiente» se habilita igual; el feedback muestra la correcta y el porqué.
T11: dejar cada actividad sin tocar 25 s → aparece «No me sale»; al pulsarlo se desbloquea; en quiz/evalFinal ese botón NO existe.
Recorrido completo respondiendo siempre mal: debe terminar en la pantalla final.
```
**Checklist:**
```
[ ] puedeAvanzar() existe UNA vez (v23, con historia y minijuego); ninguna condición exige acertar
[ ] Drag/match/fill/tf/orden/wordsearch/interactive/minijuego/historia desbloquean por intento; «Verificar» siempre desbloquea
[ ] A los 25 s aparece «No me sale» en toda actividad sin nota; NO existe en quiz/evalFinal; no da gemas ni toca la nota
[ ] «Siguiente» apagado muestra #razon-bloqueo con lo que falta; al desbloquear dice «Ya puedes continuar»
[ ] Recorrido completo respondiendo siempre mal llega a la pantalla final sin bloqueos
[ ] Cada desbloqueo guarda en el mismo clic (8-B)
```

## 🔴 PRIORIDAD 39-B · ABSOLUTA — ACTIVIDADES Y MINIJUEGOS QUE UN NIÑO DE 9 AÑOS ENTIENDE SIN AYUDA

### 39-B.1 — Tarjeta de reto (obligatoria en cada minijuego, historia interactiva y actividad sin nota)
Antes de empezar, **4 líneas fijas**, visibles sin hacer scroll, con ícono y una frase de **máx. 12 palabras** cada una (verbos en imperativo, vocabulario de 4.º/5.º, cero tecnicismos):
| Línea | Responde a | Ejemplo (carrera de decimales) |
|---|---|---|
| 🎯 **Misión** | ¿Qué tengo que lograr? | «Elige el número más pequeño antes de que se acabe la barra.» |
| 👆 **Cómo** | ¿Qué hago con las manos? | «Toca la tarjeta que creas correcta.» |
| ✅ **Para seguir** | ¿Cuándo puedo continuar? | «Cuando termines la partida. ¡Aunque falles, sigues!» |
| 📊 **Progreso** | ¿Cómo voy? | «Ronda 3 de 6» (siempre visible y actualizado) |
Más: botón **«¿Cómo se juega?»** (animación de 5 s, 3 pasos con dibujos) y una **ronda de práctica** sin tiempo ni puntaje la primera vez.

### 39-B.2 — Reglas de claridad
1. **Una sola cosa nueva a la vez:** una mecánica por pantalla; si hay dos pasos, van en dos pantallas.
2. **Todo lo que se puede tocar se ve tocable** (borde, sombra, ≥ 44 px, cursor); lo que no, no lo parece.
3. **Reacción inmediata a cada toque** (color + sonido corto + texto): nunca silencio tras un clic.
4. **Nada de reglas ocultas:** si hay que hacer algo para continuar, está escrito en «Para seguir» y en `#razon-bloqueo`.
5. **El tiempo nunca castiga:** la barra de la `carrera` pasa a la siguiente ronda mostrando la correcta; sin «Game Over» que obligue a repetir.
6. **Estados siempre visibles:** «Te falta: …» / «🔓 Ya puedes continuar» (mismo texto que `#razon-bloqueo`).
7. **Prueba del lector de 9 años:** si un adulto que no vio la clase no puede explicar en 10 s qué hay que hacer, la actividad se reescribe.

### 39-B.3 — Contrato de fallo y de fin por tipo de minijuego
| Tipo | Si falla… | Termina cuando… |
|---|---|---|
| `carrera` | muestra la correcta 1,5 s y pasa a la siguiente ronda | se juegan todas las rondas (con o sin aciertos) |
| `puente` | la pieza vuelve con pista; **al 2.º error en ese paso se coloca sola** con la explicación | todas las piezas colocadas |
| `detective` | «Ese paso está bien»; a los 2 intentos se **señala el error** y se muestra `porQue` | se identifica o se revela el paso con error |
| `parejas` | las cartas se voltean de nuevo; tras 8 fallos se revelan las parejas restantes | todas emparejadas o reveladas |
| `manipulable` | muestra cuánto falta para el objetivo; tras 3 intentos ofrece el resultado resuelto | cumple el objetivo o ve la solución |
| `candados` | cada candado da **2 intentos**; al fallar el 2.º se abre solo mostrando la respuesta y la explicación | los 3 candados abiertos (por acierto o por revelación) |
Todos: `ctx.terminar()` → `finalizarMinijuego()`, **más** «No me sale» a los 25 s (39.2).

**Checklist:**
```
[ ] Cada minijuego/historia/actividad tiene la tarjeta de 4 líneas (Misión · Cómo · Para seguir · Progreso), ≤ 12 palabras por línea
[ ] «¿Cómo se juega?» (5 s) y ronda de práctica sin puntaje
[ ] Cada toque tiene reacción inmediata; las zonas tocables se ven tocables (≥ 44 px)
[ ] Cada tipo de minijuego cumple su fila de 39-B.3: nunca espera un acierto para terminar
[ ] El texto de «Para seguir» coincide con la condición real de puedeAvanzar()
[ ] Superada la prueba del lector de 9 años
```

## 🔴 PRIORIDAD 40 · ABSOLUTA — LA RETROALIMENTACIÓN EDUCA: QUÉ MARQUÉ, CUÁL ERA, EN QUÉ ME EQUIVOQUÉ, CÓMO SE RESUELVE

### 40.1 — Formato de pregunta (amplía el de la Prioridad 5)
```javascript
opciones: [
  { id:'a', texto:'12,45', correcta:false, porQue:'Comparaste los números como si fueran enteros: 45 > 5, pero 12,5 = 12,50.' },
  { id:'b', texto:'12,5',  correcta:true  },
  // …
],
retroalimentacion: 'Igualamos cifras: 12,50 y 12,45. Como 50 > 45, 12,5 es el mayor.',   // cómo se resuelve
errorComun: 'Revisa que ambos números tengan las mismas cifras decimales antes de comparar.' // respaldo si una opción no trae porQue
```
**Obligatorio:** **cada opción incorrecta** lleva `porQue` (el error de pensamiento que representa, ≤ 25 palabras, tono amable); la pregunta lleva `retroalimentacion` (el procedimiento) y `errorComun`.

### 40.2 — Qué ve el estudiante al responder
- **Si falla:** ❌ «Esta vez no era esa. ¡Mira cómo se resuelve!» + **Tu respuesta** + **✅ La correcta** + **🔎 ¿En qué te equivocaste?** + **💡 Así se resuelve** + **⭐ Nota de este intento** (se ve el número moverse) + botón «➡️ Entendido, continuar».
- **Si acierta:** ✅ «¡Muy bien! +1 ⭐» + la explicación breve + la nota del intento.
- El modal **nunca bloquea**: el índice ya avanzó en el mismo clic (8-P). Recargar con la retro abierta la vuelve a mostrar (persistente), con los textos guardados en `quiz_resps_`.
- El **resumen del quiz** (`renderResumenQuiz`) lista cada pregunta fallada con *tu respuesta*, *la correcta* y *cómo se resuelve*.
- Las actividades sin nota usan `htmlFeedbackActividad()` (39.6) con el mismo formato.
> ⚠️ Decisión consciente: como se muestra la correcta, un reintento con vida podría repetir preguntas ya vistas. Es aceptable (aprender de la corrección es el objetivo). Si se quiere evitar, `PREGUNTAS_RESERVA` (variantes con otros números) por pregunta, usadas en los reintentos.

**Checklist:**
```
[ ] Cada opción incorrecta trae porQue; cada pregunta trae retroalimentacion y errorComun
[ ] Al fallar se muestra: tu respuesta · la correcta · en qué te equivocaste · cómo se resuelve · nota del intento
[ ] El resumen del quiz muestra la correcta de cada fallo
[ ] Las actividades sin nota usan htmlFeedbackActividad (nunca un «Incorrecto» a secas)
[ ] La retroalimentación sobrevive a un F5 y nunca bloquea
```

## 🔴 PRIORIDAD 41 · ABSOLUTA — LA NOTA SE VE SUBIR EN VIVO (INTENTO EN CURSO) Y LA MEJOR NOTA VA APARTE

### 41.1 — Causa raíz del «se queda en 1.5» (auditada)
1. **El HUD mostraba `notaOficial()` = `max(intento actual, mejorNota)`** (8-U). Tras gastar una vida el intento vuelve a 0 y `mejorNota` conserva, por ejemplo, 1.5: **mientras el intento no superara 1.5, cada acierto se sumaba por dentro pero el número en pantalla no se movía.** La suma era correcta; lo visible no.
2. **El HUD no estaba definido:** `updScore()` escribía en `#nota-hud` y `#nota-intento-hud`, que **ningún bloque de HTML del prompt creaba** («adaptar al HUD real»). En una clase clonada sin ese id, el visor simplemente no existía o quedaba congelado.
3. **`updScore()` solo se llamaba tras responder, y después del modal:** al recargar o cambiar de slide la nota no se repintaba, y un fallo en el modal impedía pintarla.
4. **La retroalimentación no mostraba la nota**, así que no había un segundo lugar donde verla cambiar.

### 41.2 — Regla
- **HUD principal = nota del INTENTO EN CURSO** (`calcTotal()` en reintento; igual a la oficial en el 1.er intento): sube con cada acierto.
- **Aparte, una línea:** «🏅 Mejor nota: X.X (es la que cuenta)» cuando `intentos > 1`.
- **La nota OFICIAL (la que va al index, a la pantalla final y a los hitos) sigue siendo `notaOficial()` = la mejor.** 8-U no cambia: solo cambia **qué se muestra en vivo**.
- Cada acierto: pulso del número + «+0.17» flotante + contador «9/30 ✅». La nota también aparece en la propia retroalimentación.
- `pintarNota()` se llama desde: `responderQuiz()` (**antes** del modal), `render()`, `iniciarNuevoIntento()`, `load()` (vía `render()`), el Panel Docente y el vigilante `revalidarAvance()` (`repararHudNota()`). `updScore()` = `pintarNota()` + hito del docente.

### 41.3 — HTML y CSS del HUD (obligatorio en la barra compacta de 10-C)
```html
<div id="hud-nota" class="hud-nota" aria-live="polite">
  <span class="hud-nota-label">NOTA</span>
  <span id="nota-hud" class="hud-nota-valor">0.0</span><span class="hud-nota-max">/5.0</span>
  <span id="nota-delta" class="hud-nota-delta" aria-hidden="true"></span>
  <span id="aciertos-hud" class="hud-nota-aciertos">0/0 ✅</span>
  <span id="nota-intento-hud" class="hud-nota-sub"></span>
</div>
```
```css
.hud-nota { display:flex; align-items:baseline; gap:6px; flex-wrap:wrap; font-family:var(--font-ui); }
.hud-nota-valor { font-size:1.4rem; font-weight:800; color:var(--primary-dark); display:inline-block; }
.hud-nota-max, .hud-nota-aciertos, .hud-nota-sub { font-size:.72rem; color:var(--text2); }
.hud-nota-delta { font-size:.8rem; font-weight:700; color:var(--success); opacity:0; pointer-events:none; }
.hud-pulso { animation:hudPulso .6s ease; }
.delta-vis { animation:deltaUp 1.6s ease forwards; }
@keyframes hudPulso { 0%{transform:scale(1)} 40%{transform:scale(1.35);color:var(--success)} 100%{transform:scale(1)} }
@keyframes deltaUp { 0%{opacity:0;transform:translateY(6px)} 15%{opacity:1} 100%{opacity:0;transform:translateY(-10px)} }
@media (prefers-reduced-motion:reduce) { .hud-pulso{animation:none} .delta-vis{animation:none;opacity:1} }
```
**Prueba T13 (obligatoria):** sacar 2.0 → usar una vida → el HUD dice 0.0 y «Mejor nota: 2.0»; tres aciertos seguidos → 0.5 → 1.0 → 1.5 (cada uno visible, con «+0.50»); la nota oficial/index siguen en 2.0 hasta superarla.
**Checklist:**
```
[ ] Existen #nota-hud, #nota-delta, #aciertos-hud, #nota-intento-hud en la barra compacta (el auditor falla si falta #nota-hud)
[ ] El HUD muestra el intento en curso; la mejor nota va aparte; el index y la pantalla final usan notaOficial()
[ ] pintarNota() se llama ANTES del modal en responderQuiz() y también desde render(), iniciarNuevoIntento() y revalidarAvance()
[ ] Tras gastar una vida, cada acierto mueve el número (probado T13)
[ ] La retroalimentación muestra «Nota de este intento»
```

## 🔴 PRIORIDAD 42 · ABSOLUTA — GUARDADO QUE NO FALLA EN SILENCIO, PRIMERA APERTURA EN CERO E INDEX CON TODO EL AVANCE

### 42.1 — Primera apertura = cero real (cierra la última grieta)
- **`sesionGuardadaEsValida()` es ESTRICTA:** exige `studentId`, `grupo`, `semana` y `claseId` **presentes y coincidentes**. Antes, un dato sin esos campos o con alguno ausente pasaba como válido (`!== undefined &&`), que es la vía por la que una clase nueva heredaba nota o avance. Un dato sin sello completo se **ignora (cuarentena, sin borrarlo)** y la clase arranca en `estadoEnCero()`.
- `esEstudianteNuevo()` usa `almacen()` (no `localStorage` directo): en «sin guardar» no hay falsos positivos.
- Contar `HUD = 0.0`, `slide 1`, 0 gemas y `mejorNota = 0` al abrir por primera vez es parte de la prueba T14.
- **Reintento (vida):** sigue siendo `iniciarNuevoIntento()` (8-W). Solo se rehacen los **evaluables**; las vidas no tocan nada más. La mejor nota se asegura antes de limpiar.

### 42.2 — Guardar en cada evento (ampliación de 8-B)
`save()` síncrono, en el mismo clic, tras: **cada respuesta de quiz, cada «hecho» de una actividad (`marcarActividadHecha`), cada beat de historia, cada fin de minijuego, cada cambio de slide y cada uso de vida**; más los tres respaldos (`beforeunload`, `visibilitychange`, `pagehide`) y el intervalo de 20 s.
- **El fallo de guardado ya no es silencioso:** `save()` captura el error con `reportarFalloGuardado(e)`; tras **2 fallos seguidos** aparece `#aviso-guardado` («no se pudo guardar… avísale al profe Luis») y desaparece solo al volver a guardar bien (`guardadoExitoso()` al final de un `save()` correcto). Navegador en modo privado, almacenamiento lleno o bloqueado dejaban a los estudiantes sin avance sin avisarles.
- Al reabrir: `load()` → `render()` en el **mismo slide**, la **misma pregunta de quiz**, con la **misma nota**.

### 42.3 — Lo que ve el index (entrada v2, aditiva; el index viejo sigue leyendo)
La entrada de 8-F **no traía** `slideActual`, `totalSlides` ni `completada`, pero la tarjeta del index de la Prioridad 8 los lee («Slide 12 de 23», «🟢 Completada»). Ahora `construirEntradaEstudiante()` los escribe, junto con `mejorNota`, `notaIntentoActual`, `preguntasRespondidas/totalPreguntas`, `actividadesConAyuda` y `version: 2`. El **index** debe leer con `normalizarEntradaIndex()` (acepta v1 y v2) y refrescar con `storage`, `focus` y `visibilitychange` (8-F).
Orden de verdad: **la sesión (`SKEY`) es la fuente; la entrada del index es un resumen** que nunca se lee como sesión.

**Prueba T14:** sembrar una sesión de la semana anterior (con nota 4.5, con y sin sello) y otra de otro grupo: la clase nueva abre en 0.0, slide 1. Responder 3 preguntas, recargar: vuelve al mismo slide/pregunta con 3 aciertos. El index muestra nota, «Slide N de 23» y porcentaje.
**Checklist:**
```
[ ] sesionGuardadaEsValida() estricta; datos sin sello completo = inválidos (cuarentena)
[ ] esEstudianteNuevo() usa almacen()
[ ] Cada respuesta, actividad hecha, beat, minijuego y cambio de slide guarda en el mismo clic
[ ] save() reporta fallos (reportarFalloGuardado) y avisa tras 2 seguidos; guardadoExitoso() lo limpia
[ ] La entrada del index incluye slideActual, totalSlides, completada, mejorNota, notaIntentoActual, preguntasRespondidas, totalPreguntas, version:2
[ ] El index lee con normalizarEntradaIndex() (acepta v1 y v2) y se refresca en vivo
[ ] T14 pasada: abre en cero; recarga vuelve exacto; el index refleja nota y avance
```

## 🔴 PRIORIDAD 43 · ABSOLUTA — PRUEBAS NUEVAS T10–T14 Y `CLASE_API`
- **T10** responder todo mal en toda actividad sin nota → siempre se puede seguir; **T11** rescate a los 25 s y ausencia de rescate en evaluables; **T12** quiz respondido mal avanza y la retro muestra la correcta y el porqué; **T13** nota en vivo tras gastar una vida; **T14** primera apertura en cero, recarga exacta e index completo.
- `prueba_v23_snippets.js` (Node, sin navegador) comprueba **la lógica** de estos fragmentos; `prueba_clase.js` (navegador real, 8-T) debe ampliarse con T10–T14 usando clics reales. **Hasta que exista una clase v23 completa y pase T10–T14 en navegador, el resultado se declara «lógica verificada, clase no probada de punta a punta».**
- `CLASE_API` (38-D) suma: `notaHud()` (texto de `#nota-hud`), `razonBloqueo()`, `rescate()` (equivale a pulsar «No me sale»), `actividadesConAyuda()`.

**Checklist:**
```
[ ] prueba_v23_snippets.js sin ❌ (56 comprobaciones)
[ ] T10–T14 agregadas a prueba_clase.js y pasadas con clics reales, o declaradas «sin verificar»
[ ] CLASE_API incluye notaHud, razonBloqueo, rescate y actividadesConAyuda
```
