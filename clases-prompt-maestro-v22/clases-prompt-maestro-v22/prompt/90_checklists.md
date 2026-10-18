---
modulo: 90_checklists
etapa_de_lectura: 3
---

# 90 · Checklists de entrega

## CHECKLIST COMPLETO DE ENTREGA

### CRONÓMETRO DE PERMANENCIA (Prioridad 0-A + blindaje 8-N)
- [ ] `activarCronometroLectura(s.id, 12)` llamado al final de CADA `rInfo()`, `rRepaso()`, `rPractica()`
- [ ] Indicador visual grande y visible con cuenta regresiva y barra de progreso
- [ ] Botón "Siguiente" físicamente `disabled` durante la cuenta (no solo visual)
- [ ] Al terminar: toast "✅ ¡Listo! Ya puedes continuar →" + botón se habilita con animación
- [ ] Si el estudiante ya estuvo en ese slide (`st.acts['leido_'+id]`), NO vuelve a contar
- [ ] CSS `@keyframes pulse-border` incluido en `<style>`
- [ ]  v11.4 (Prioridad 8-N): el handle del `setInterval` se guarda en `window.__cronometroInterval`, nunca en una variable local
- [ ]  v11.4 (Prioridad 8-N): `detenerCronometroLectura()` existe y limpia intervalo + indicador visual
- [ ]  v11.4 (Prioridad 8-N): `render()` llama a `detenerCronometroLectura()` como su primera línea, en todo cambio de slide
- [ ]  v11.4 (Prioridad 8-N): prueba de entrar/salir 5 veces de una slide de lectura sin terminar la cuenta — la clase no se congela
- [ ]  v12.0 (8-N): activarCronometroLectura() es IDEMPOTENTE — llamarla repetidamente (vigilante cada 3s, focus, cierre de modal) NUNCA reinicia la cuenta
- [ ]  v12.0 (8-N): la cuenta se calcula con Date.now() (tiempo real), no con `restantes--`
- [ ]  v12.0 (8-O): aplicarEstadoAvance() se llama de forma SÍNCRONA en render() — cero requestAnimationFrame/setTimeout
- [ ]  v12.0 (8-P): quiz_idx_ avanza en el MISMO clic que responde — la retroalimentación es persistente (quiz_retro_pend_) y sobrevive a un F5
- [ ]  v12.0 (8-Q): showModal()/closeModal() únicos, con cola — ningún modal pisa a otro
- [ ]  v12.0 (8-T): prueba_clase.js ejecutada contra el archivo final — 0 fallos
### SLIDES VISUALES (Prioridad 0-B)
- [ ] Máximo 3 líneas de texto seguidas por bloque en slides de info
- [ ] Máximo 2 bloques de texto por slide
- [ ] Mínimo 1 organizador gráfico SVG o infografía por slide de concepto
- [ ] Ejemplo resuelto paso a paso incluido en el slide PREVIO a cada quiz
- [ ] Ninguna pregunta de quiz sobre un concepto que no haya sido explicado Y ejemplificado antes
- [ ] Cada slide de concepto tiene analogía de cultura pop visible
### BLOQUEO UNIVERSAL DE ACTIVIDADES (Prioridad 0-C)
- [ ] Función `puedeAvanzar(s)` implementada con todos los tipos de slide
- [ ] `nextSlide()` llama `puedeAvanzar()` antes de avanzar
- [ ] `mostrarMensajeBloqueo(s)` con mensajes diferenciados por tipo
- [ ] Mensaje claro en complementarias: "no afecta tu nota, pero debes completarla"
- [ ] Actividades drag: `st.acts['drag_done_'+id]` al soltar todos los chips
- [ ] Actividades match: `st.acts['match_done_'+id]` al conectar todos los pares
- [ ] Actividades fill: `st.acts['fill_done_'+id]` al rellenar todos los blancos
- [ ] Actividades tf: `st.acts['tf_done_'+id]` al seleccionar V/F en todos los ítems
- [ ] Actividades orden: `st.acts['orden_done_'+id]` al pulsar "Verificar"
- [ ] Explorador: `st.acts['exp_min_'+id]` al clicar mínimo 1 elemento
- [ ]  v6.2: los cuadernos (Cuaderno 1 / Taller en Clase) NUNCA aparecen aquí — no son slides, no bloquean ni habilitan "Siguiente"
- [ ] `habilitarBtnNext()` y `deshabilitarBtnNext()` implementadas
- [ ] `render()` llama `puedeAvanzar()` al terminar para configurar estado del botón
- [ ] Slides intro y final: sin bloqueo (libres)
- [ ]  GARANTÍA v6.1: en TODO tipo de actividad evaluada o no evaluada, basta con **responder** (correcta o incorrectamente) para que el botón "Siguiente" se desbloquee — nunca se exige acertar para avanzar, solo contestar
### MENÚ/INDICADOR DE PROGRESO NUNCA NAVEGABLE (Prioridad 0-G — v7.5)
- [ ] Ningún nodo del menú de progreso tiene onclick que cambie st.slide
- [ ] Verificado manualmente: clic/tap en cada nodo del menú — ninguno cambia el slide actual
- [ ] La única navegación es "Siguiente" (puedeAvanzar()) y "Atrás" (prevSlide(), Prioridad 8-H)
### SOPA DE LETRAS (Prioridad 0-D — v6.4)
- [ ] Nunca más de 5 palabras por sopa de letras
- [ ] Grilla dimensionada con `calcularTamañoGrilla()` — nunca apretada, mínimo 8x8
- [ ] Botón "💡💡 Pista (2 restantes)" visible encima de la grilla
- [ ] Función `abrirSelectorPista(sId, palabras)` pregunta SIEMPRE para cuál palabra específica (nunca automático)
- [ ] Función `usarPistaWS(sId, palabraElegida)` implementada
- [ ] `s.posicionesWS` guardado al generar la grilla, con la posición real (fila/columna/dirección) de cada palabra
- [ ] Función `iluminarPrimeraDosLetras(sId, palabra)` usa `s.posicionesWS` para iluminar la UBICACIÓN EXACTA de la palabra, no cualquier celda que repita esa letra en otro lugar de la grilla
- [ ] La pista NUNCA revela la letra por texto/toast — es 100% visual, iluminando dentro de la grilla
- [ ] Primera y segunda letra se iluminan **al mismo tiempo**, durante **4 a 5 segundos**, y luego se apaga el resaltado
- [ ] Cada celda tiene id único `ws-cell-${sId}-${fila}-${col}` para permitir la iluminación exacta
- [ ] Contador actualizado dinámicamente: 💡💡 → 💡⬜ → ⬜⬜
- [ ] Botón desactivado al llegar a 0 pistas (`disabled` + opacity .4)
- [ ] Selección de palabra por clic en primera letra + clic en última letra (línea recta)
- [ ] `st.acts['ws_pistas_'+id]` y `st.acts['ws_found_'+id]` guardados en localStorage — NUNCA se resetean al recargar
- [ ] `restaurarProgresoWS(sId)` llamada tras cada render() del slide, restaurando palabras ya encontradas
- [ ] CSS `.ws-pista`, `.ws-pista-btn`, `.ws-word-found`, `@keyframes ws-glow` incluidos
- [ ] Mensaje "Encuentra al menos 1 palabra para continuar — tu avance nunca se pierde" visible en el slide
- [ ] Ninguna selección inválida congela la página — siempre se puede reintentar sin recargar
### IMÁGENES
- [ ] Mínimo 20 imágenes Unsplash en el código (contar manualmente)
- [ ] Patrón URL exacto: `https://images.unsplash.com/photo-[ID]?w=NNN&h=NNN&fit=crop&auto=format&q=80`
- [ ] Todos los `<img>` con `alt` descriptivo en español y `loading="lazy"`
- [ ] Sistema de fallback emoji al final del archivo
- [ ] CSS de `.imgc`, `.hwp`, `.hw-detail` incluido
- [ ] Grid 2×2 de imágenes en CADA slide de concepto (info)
- [ ] Explorador interactivo con imágenes en thumbnail Y en detalle
### PRÁCTICA (Prioridad 2 — v7.3, reemplaza al video)
- [ ] Slide tipo 'practica' en posición 16 — NUNCA un slide tipo 'video' (eliminado)
- [ ] Entre 2 y 3 ejercicios resueltos paso a paso, nunca más de 3
- [ ] Cada ejercicio se relaciona directamente con una pregunta real de Quiz 2 o Evaluación Final
- [ ] Aplica cronómetro de 12s igual que cualquier slide de lectura (Prioridad 0-A)
- [ ] No afecta la nota directamente (la pregunta relacionada en el quiz sí la afecta)
### SISTEMA DE NOTA
- [ ] **Nota inicia en 0.0 y se CONSTRUYE con aciertos**
- [ ] `calcTotal() = (st.aciertos / totalPreguntas) * 5.0`
- [ ] SOLO quizzes de opción múltiple y evaluación final generan nota
- [ ] Drag, match, fill, ordenar, sopa: NO afectan la nota
- [ ] Calibración: 30 preguntas totales = fácil de calcular (1 acierto = 0.167 puntos)
- [ ] `calcTotal()` nunca retorna < 0.0 ni > 5.0
- [ ]  v15.0: la nota que se muestra/guarda es `notaOficial()` = MEJOR nota de todos los intentos (3.5 → reintento 3.0 = 3.5) — Prioridad 8-U
### BLOQUEO DE EVALUABLES
- [ ] Quiz 1 NO se puede saltar — botón "Siguiente" bloqueado hasta completar
- [ ] Quiz 2 NO se puede saltar — mismo bloqueo
- [ ] Evaluación Final NO se puede saltar — mismo bloqueo
- [ ] Sopa de letras: advertencia suave (mín. 1 palabra), pero se puede saltar de todas formas
- [ ] Actividades complementarias: se pueden saltar libremente
### PREGUNTAS DE QUIZ
- [ ] Quiz 1: 8 preguntas de opción múltiple (A, B, C, D)
- [ ] Quiz 2: 8 preguntas de opción múltiple
- [ ] Evaluación Final: 14 preguntas de opción múltiple
- [ ] Cada pregunta tiene CONTEXTO previo (situación a analizar)
- [ ] La respuesta NO está literal en el enunciado — requiere inferencia
- [ ] Orden de preguntas aleatorio (función `shuffleWithSeed`)
- [ ] Orden de opciones A/B/C/D aleatorio en cada pregunta
- [ ] Retroalimentación inmediata al responder (correcta o incorrecta)
- [ ] Resumen al finalizar cada quiz con errores detallados
### RETROALIMENTACIÓN COMPLEMENTARIAS Y VERIFICACIÓN PASO A PASO (Prioridad 7 y 7-B — v7.5)
- [ ] Todas las actividades complementarias tienen retroalimentación clara al verificar
- [ ] Mensaje claro: "Esta actividad no afecta tu nota"
- [ ]  v7.5: al seleccionar en matching, se ve marcado de inmediato — nunca hay que esperar a verificar para "ver" la selección
- [ ]  v7.5: cada par/ítem tiene su PROPIO botón "✔️ Verificar" — nunca un solo botón "Verificar todo" al final
- [ ]  v7.5: mismo patrón de verificación individual aplicado a fill, tf y orden
### SISTEMA DE VIDAS (Prioridad 6 — v7.5, ACTIVACIÓN SOLO DESDE LA PANTALLA FINAL)
- [ ] `MAX_VIDAS = 8` definida (v11.1 — Prioridad 8-M)
- [ ] `st.vidasUsadas` en el estado del estudiante
- [ ] Al reintentar: SOLO resetear quiz1, quiz2, evalFinal
- [ ] Info, practica, wordsearch, interactive, cuadernos: NO se resetean — cubierto también por la Prioridad 8-I
- [ ] `st.aciertos = 0` al reintentar (para recalcular la nota del intento) — la mejor nota queda en `st.mejorNota` (8-U)
- [ ]  v15.0: UNA sola función de reinicio, `iniciarNuevoIntento()` (8-W), usada por `confirmarReintento()` y `pd_resetQuizzes()`
- [ ]  v7.5: el botón de vidas YA NO está en el navbar — `pedirReintento()` se niega a abrirse si `st.slide` no es el último slide
- [ ]  v7.5: `renderBloqueVidasProtagonista()` está pegado justo debajo de la nota gigante en `rFinal()`
- [ ] Modal de confirmación con visualización de vidas antes de reintentar
- [ ] `vidasUsadas` guardado en localStorage
- [ ]  v6.1: Al reintentar, `st.reintentoActivo = true` y `st.reintentoPendientes` con los índices de quiz1/quiz2/evalFinal pendientes
- [ ]  v6.1: Durante el reintento, NINGÚN slide de lectura vuelve a correr el cronómetro
- [ ]  v6.1: El botón "Siguiente" salta directo entre evaluables pendientes durante el reintento
- [ ]  v6.1: Banner protagonista visible indicando exactamente qué falta por responder
- [ ]  v6.1: Al completar todos los evaluables pendientes, `st.reintentoActivo = false` y navega directo a la pantalla final
### PANTALLA FINAL
- [ ]  v7.3: Nota MUY gigante `clamp(6rem, 20vw, 11rem)`, centrada, con color semáforo — debe poder leerse desde lejos
- [ ] Nombre del estudiante grande `clamp(1.4rem, 3.5vw, 2.2rem)`
- [ ] Fuegos artificiales SVG animados
- [ ] Cantidad de aciertos visible (ej. "20 / 30 respuestas correctas")
- [ ] Retroalimentación de qué falló (máx. 5 errores mostrados)
- [ ] Sección de vidas visible con estado correcto
- [ ] Mensaje de ByteBot según rango de nota
### PALETA DE COLORES CLARA (Prioridad 0-E) — VERIFICACIÓN ESTRICTA
- [ ] `--bg-main` tiene luminosidad ≥ 90% (verificado con la fórmula HSL)
- [ ] `--bg-card` es exactamente `#FFFFFF`
- [ ] El `body` NO tiene background oscuro aplicado directamente
- [ ] Solo `--bg-sidebar` puede ser oscuro, con texto blanco/amarillo legible
- [ ] Ningún color de la lista prohibida (#000000, #111111, #1a1a2e, etc.) aparece en bg-main o bg-card
- [ ] Paleta usada corresponde a una de la tabla de temas corregida (o sigue el mismo estándar de luminosidad)
### TEMÁTICA ROTATIVA (Prioridad 0-F)
- [ ] El TEMA_VISUAL elegido es diferente al de la(s) última(s) clase(s) de la misma materia y grado
- [ ] Colores, iconografía, ByteBot y decoraciones corresponden coherentemente al universo elegido
### CUADERNOS (Prioridad 10 — v6.6)
- [ ] Botones "📒 Cuaderno 1" y "📝 Taller en Clase" SIEMPRE visibles en el navbar superior
- [ ] Ambos cuadernos se abren como modal flotante (`showModalGrande`) sin perder el slide actual
- [ ] Badges (✓) reflejan si el estudiante ya confirmó "Ya lo copié — Cerrar" en cada cuaderno
- [ ] Cuaderno 1: diseño tipo AGENDA simple y clara (fecha tipo agendero) — SIN post-its de colores, SIN rotaciones ni inclinaciones, SIN imágenes ni gráficos de ningún tipo
- [ ]  v7.3: Cuaderno 1 muestra el nombre de la semana (ej. "Semana 3"), sin imágenes/fotos, con letra de tamaño medio y espaciado compacto
- [ ] Cuaderno 1: conceptos/definiciones/fórmulas en una lista limpia, un ítem debajo del otro, título en negrita + texto — nunca en tarjetas de colores rotadas
- [ ] Cuaderno 1: siempre muestra la fecha del día
- [ ] Cuaderno 1: banner grande y en negrita "📌 COPIA ESTO EN TU CUADERNO" visible al inicio
- [ ] Cuaderno 1: contenido de longitud media — ni demasiado corto ni excesivamente largo
- [ ] Cuaderno 1: campo "¿Qué aprendí hoy?" (textarea guardado en localStorage) — este SÍ conserva sus campos de texto
- [ ] Cuaderno 1: campo "¿Qué te gustó / dificultó?" (textarea guardado)
- [ ] Cuaderno 1: botón "Copiar cuaderno al portapapeles"
- [ ]  v6.6: Cuaderno 1 tiene botón "✅ Ya lo copié — Cerrar" (`confirmarCopiaCuaderno(1)`) que cierra el panel
- [ ] Taller en Clase (antes Cuaderno 2): **4 o 5 ejercicios** según complejidad (NUNCA más de 5)
- [ ] Al abrir el Taller, título grande "📝 Taller en Clase — Nota 2"
- [ ] Justo debajo del título, en **texto rojo**: "Responde esto en tu cuaderno"
- [ ] El Taller en Clase **NUNCA** lleva `<textarea>` ni `<input>` de ningún tipo — solo muestra los enunciados y el botón de ejemplo; el estudiante escribe en su cuaderno físico, no en el computador
- [ ]  v6.6: Taller en Clase tiene botón "✅ Ya lo copié — Cerrar" (`confirmarCopiaCuaderno(2)`) que cierra el panel
- [ ] Taller en Clase: indica explícitamente que equivale a la **Nota 2** de la clase, calificada por el docente
- [ ] Taller en Clase: enunciados sintetizados y breves — sin contexto largo innecesario
- [ ] Taller en Clase: cada ejercicio corresponde a algo YA explicado en una slide específica de la clase
- [ ] Taller en Clase: diseño tipo libreta de tarea, diferenciado visualmente del Cuaderno 1, igual de limpio y sin elementos decorativos que generen enredo
- [ ] Taller en Clase: cada ejercicio tiene botón "💡 Ejemplo → Slide X"
- [ ] Taller en Clase: hipervínculo lleva al slide exacto donde se explicó el concepto
- [ ] NINGUNO de los dos cuadernos ocupa lugar en la secuencia de slides — no son tipos de slide, no están en `SL`, no aplican bloqueo de la Prioridad 0-C, y nunca se duplican dentro del contenido de otra slide
### MENÚ DE RUTA COMPACTO Y NO-NAVEGABLE (Prioridad 10-C — v7.5, REDISEÑO)
- [ ] Barra compacta tipo HUD (≈46px), nunca una columna lateral de 272px
- [ ] Etiquetas cortas y puntuales (máx. 10-12 caracteres) — nombre completo en el atributo title
- [ ] NINGÚN nodo tiene onclick que cambie st.slide (Prioridad 0-G) — 100% informativo
- [ ] Slides vistas: color completo + check + brillo. Slides pendientes: veladas (opacidad baja + grayscale) + 🔒
- [ ] Actividades con nota (Quiz 1, Quiz 2, Evaluación Final) con borde dorado + ⭐, distinguibles a simple vista
- [ ] El contenido (#slide-wrap) usa el espacio liberado al quitar el sidebar viejo — sin franjas vacías
- [ ] Los cuadernos NO aparecen en SECCIONES_MENU — no son slides
### MAPA DE CAMINO TIPO JUEGO DE MESA (Prioridad 10-D — v7.5, ahora alternativa opcional)
- [ ] Si se usa esta alternativa en vez de la 10-C, el onclick de navegación fue quitado (Prioridad 0-G)
- [ ] Casillas ilustradas conectadas en zigzag u horizontal, con ícono acorde al tema visual (Prioridad 0-F)
- [ ] Avatar/ficha visible sobre la casilla actual, animado al avanzar
- [ ] Mismos estados visuales que el menú compacto: visitado / actual / parcial / pendiente — nunca deben divergir
### VERIFICACIÓN DE RECORRIDO COMPLETO (Prioridad 10-B)
- [ ] `verificarRecorridoCompleto()` implementada — revisa `st.seen` contra todas las slides
- [ ] Si faltan slides: `rFinal()` NO muestra la nota — muestra mensaje de slides pendientes
- [ ] Modal de aviso lista las slides faltantes (máx 5 visibles + contador del resto)
- [ ] Botón directo "📍 Ir a [nombre de la slide]" que lleva exactamente a la primera faltante
- [ ] Esta verificación es un respaldo además del bloqueo secuencial de la Prioridad 0-C
- [ ]  v6.1: esta verificación se omite automáticamente cuando el estudiante viene de un reintento (`st.reintentoActivo` o `st.vidasUsadas > 0`)
### AUTOGUARDADO Y SINCRONIZACIÓN
- [ ] `save()` llamado en CADA interacción del usuario
- [ ] Intervalo automático cada 20 segundos
- [ ] `beforeunload` y `visibilitychange` → llamar `save()`
- [ ] **Botón físico "💾 Guardar" en el navbar**
- [ ] Al recargar: restaurar slide exacto donde quedó el estudiante
- [ ] `syncIndex()` llamado en cada `save()` y al finalizar
- [ ] El index ve: nota, % completado, slide actual, vidas, fecha/hora
- [ ]  v6.1: `load()` se ejecuta SIEMPRE antes que `render()` en el arranque de la página
- [ ]  v6.1: `pagehide` implementado como capa extra de guardado
- [ ]  v6.1: `st.slide` nunca se resetea a 0 si ya existe sesión guardada en `SKEY`
- [ ]  v6.3: `SKEY` se basa en el nombre normalizado del estudiante — la nota (por nombre) y el slide (por nombre) usan la MISMA identidad
- [ ]  v6.3: probado con 3+ estudiantes registrados — cada uno reabre exactamente en su propio slide, nunca en el slide 1
- [ ]  v6.3: `buscarSesionHuerfanaPorNombre()` implementada como capa de auto-reparación antes de asumir "estudiante nuevo"
### BLINDAJE ANTI-TRAMPA DE NOTA Y ACTIVIDADES PERMANENTES (Prioridad 8-H y 8-I — v7.5)
- [ ] prevSlide() existe como función única y NUNCA resetea acts/completado_/quiz_idx_
- [ ] rQuiz() tiene la guardia "if (completado_+id) return renderResumenQuiz(s)" como PRIMERA línea
- [ ] responderQuiz() usa marca única por pregunta (q_contada_+sId+pregIdx) — nunca vuelve a sumar esa pregunta
- [ ] recalcularAciertosDesdeContadores() deriva st.aciertos SIEMPRE desde quiz_resps_, nunca de un contador suelto
- [ ] Probada la navegación Atrás→Adelante sobre un quiz ya completo: la nota nunca cambia
- [ ] rDrag/rMatch/rFill/rTF/rOrden/rInteractive tienen la guardia "if (*_done_+id) return resumen" como primera línea
- [ ] rWS llama restaurarProgresoWS(s.id) en CADA render, no solo la primera vez
- [ ] Ninguna actividad se vacía al recargar, ir atrás, o navegar repetidamente
### AISLAMIENTO DE DATOS POR ESTUDIANTE (Prioridad 8-C)
- [ ] La clave `SKEY` incluye el id único del estudiante (`IDX_STUDENT_ID`), no solo materia+semana
- [ ] `load()` valida `d.studentId === IDX_STUDENT_ID` antes de restaurar cualquier progreso guardado
- [ ] Un estudiante nuevo (id sin registro previo) arranca 100% en cero: slide 0, nota 0.0, sin medallas, sin XP
- [ ] `save()` guarda siempre el `studentId` junto con el resto del progreso
- [ ] `st.name` nunca proviene de `localStorage.getItem('studentName')` ni de otra clave global compartida
- [ ] Verificado: en un mismo computador, un estudiante nuevo nunca ve nota/avance de otro estudiante
- [ ] La semana/slide que reporta la clase coincide siempre con lo que el index muestra para ese mismo estudiante
### IDENTIDAD REFORZADA CON GRUPO Y ADVERTENCIA EN ACCESO DIRECTO (Prioridad 8-E — v6.9)
- [ ] `SKEY` combina grupo normalizado + nombre normalizado (`IDENTIDAD_KEY`), nunca solo el nombre
- [ ] `verificarAccesoDirecto()` se ejecuta ANTES de `load()`, en cada arranque de la página
- [ ]  v6.9: NUNCA se pide nombre ni grupo por formulario en acceso directo — solo se advierte en rojo
- [ ]  v6.9: `renderBannerSinGuardar()` visible de forma persistente mientras dure la sesión sin index
- [ ]  v6.9: `renderAvisoFinalSinGuardar()` aparece también en la pantalla final si hubo acceso directo
- [ ]  v6.9: `syncIndex()` corta de inmediato si `st_modoSinGuardar` es true — cero escritura al índice
- [ ] Probado: mismo nombre en grupo 501 y en grupo 502, entrando SIEMPRE desde el index — progreso y nota NUNCA se mezclan
### CONTRATO DE DATOS CON EL ÍNDICE (Prioridad 8-F — v7.2, CLAVE ÚNICA POR ESTUDIANTE)
- [ ] 🔺 Se revisó el index.html REAL de la materia y `construirIndexKey()` copia EXACTAMENTE su patrón de clave (incluyendo periodo/bimestre si aplica)
- [ ] `INDEX_KEY` incluye SIEMPRE el nombre normalizado del estudiante en la clave misma — NUNCA es una clave compartida entre varios estudiantes
- [ ] `syncIndex()` escribe DIRECTAMENTE con `localStorage.setItem()` — sin necesidad de leer ni fusionar nada antes
- [ ] `SKEY` (Prioridad 8-G) e `INDEX_KEY` (8-F) son claves DISTINTAS, con sufijos distintos ("_session" vs "_data") — ninguna función que use una toca la otra
- [ ] Cada entrada tiene EXACTAMENTE los campos: `studentUser, studentName, nota, porcentajeAvance, xp, medallas, semaforo, ultimoAcceso, vidasUsadas, version`
- [ ] `calcularSemaforoParticipacion()` implementada — nunca un valor de semáforo inventado a mano
- [ ] `migrarFormatoAntiguoSiExiste()` se ejecuta una vez al arrancar, antes del primer `syncIndex()`
- [ ] Probado con 2+ estudiantes del mismo grupo: cada uno tiene su propia clave, ninguno toca la del otro
### 🔺🔺🔺 FUENTE ÚNICA DE VERDAD: IDENTIDAD Y RESTAURACIÓN DE AVANCE (Prioridad 8-G — v7.0 — TRIPLE PRIORIDAD)
- [ ] Existe UNA SOLA declaración de `const PREFIX` en todo el archivo HTML generado
- [ ] Existe UNA SOLA declaración de `const SKEY` en todo el archivo HTML generado
- [ ] Existe UNA SOLA `function load()` en todo el archivo HTML generado
- [ ] Existe UNA SOLA `function save()` en todo el archivo HTML generado
- [ ] Ninguna versión anterior (Prioridades 8, 8-B, 8-C, 8-D, 8-E) quedó duplicada — todas fueron reemplazadas por el código de 8-G
- [ ] `markSeen()` llama a `save()` inmediatamente al marcar una slide como vista, sin esperar al cambio de slide
- [ ] `buscarSesionHuerfanaPorIdentidad()` usa el MISMO `NOMBRE_NORM` que se usa para construir `PREFIX`
- [ ] `load()` se ejecuta ANTES que `render()`, en el ÚNICO bloque `DOMContentLoaded` del archivo
- [ ] Simulada la PRUEBA OBLIGATORIA de la Prioridad 8-G (avanzar a slide 5, cerrar, reabrir) con resultado ✅ en los 4 puntos
- [ ] `st.slide` y `st.seen` sobreviven a: recarga (F5), cierre y reapertura de pestaña, y regreso desde el index
### CONEXIÓN INDEX ↔ CLASE
- [ ] Clase lee `sessionStorage.getItem('clase_contexto')` al iniciar
- [ ] Clase escribe en `localStorage[INDEX_KEY]` (8-F/8-U) con datos completos — nunca en una clave `IDX_SC`
- [ ] Index muestra: 🔴 Sin iniciar / 🟡 En progreso / 🟢 Completada
- [ ] Index muestra barra de progreso (% slides vistos)
- [ ] Index muestra nota actual
- [ ] Index muestra "Slide X de 25"
- [ ] Index muestra fecha/hora del último acceso
- [ ] Index tiene botón "▶ Continuar" que abre la clase en el slide donde quedó
### IDENTIDAD VISUAL
- [ ] Tema visual reconocible, variables CSS completas
- [ ] Paleta CLARA verificada según Prioridad 0-E (no solo "intención" — valores numéricos)
- [ ] Patrón decorativo del universo en el fondo
- [ ] ByteBot adaptado al tema
- [ ] Tema diferente al usado en la clase anterior de la misma materia (Prioridad 0-F)
### PANEL DOCENTE OCULTO (Prioridad 16)
- [ ] Clave **`CLAVE_PANEL_DOCENTE`** (7 dígitos) — NO el PIN anterior de 4 dígitos
- [ ] Zona de activación totalmente invisible — sin ícono, sin hover, sin tooltip
- [ ] Requiere clic en la zona oculta + escribir la clave con teclado físico en 8 segundos
- [ ] Sin mensajes de error visibles si la clave es incorrecta (no delata el sistema)
- [ ] Panel ubicado conceptualmente en la parte superior de la clase (zona del navbar)
- [ ] Herramienta "🔁 Reactivar 8 vidas" presente y funcional
- [ ] Ver nota, desglose de quizzes, errores del estudiante
- [ ] Ajuste manual de nota con motivo
- [ ] Tab con selector de semana para reset
- [ ] Semáforo de participación [🔴🟡🟢]
- [ ] Ver slide actual del estudiante
### MENÚ DE HERRAMIENTAS DEL ESTUDIANTE (Prioridad 16-B)
- [ ] Botón visible "🧰 Mis herramientas" en el navbar (diferente del panel docente — este SÍ es visible)
- [ ] Pestaña 1: Glosario de términos de la clase
- [ ] Pestaña 2: Calculadora + bloc de notas rápido (no evaluado)
- [ ] Pestaña 3: Pista general — orienta sin dar la respuesta literal del quiz
- [ ] Las 3 pestañas combinadas en un solo panel modal
### ARIA: ORIENTACIÓN SOCRÁTICA ANTE PREGUNTAS COPIADAS (Prioridad 30-B — v12.0-ARIA) Y CLASE_META
- [ ] responderAria() revisa detectarPreguntaCopiadaAria() ANTES que CLASE_META y el GLOSARIO
- [ ] La comparación recorre todas las preguntas de SL, no solo la slide actual
- [ ] pistaAyuda por pregunta se usa si existe; si no, scaffolding genérico aleatorio
- [ ] Ninguna variante revela ni descarta opciones del quiz
- [ ] CLASE_META (materia/grado/tema/objetivo) está declarado y responderAria() lo consulta ante preguntas de tema/objetivo
### INTEGRIDAD DE NOTA, PERSISTENCIA Y MENSAJES DEL DOCENTE (Prioridad 18 — v6.2)
- [ ] XP, medallas, streak y clics del explorador NUNCA modifican `st.aciertos` ni `calcTotal()`
- [ ] Ninguna función fuera de `responderQuiz()` incrementa `st.aciertos`
- [ ] `rQuiz()` SIEMPRE muestra el resumen (`renderResumenQuiz`) si `completado_+id` ya es `true` — nunca vuelve a preguntar
- [ ] Un quiz a medio contestar retoma exactamente en `quiz_idx_+id` — nunca reinicia desde la pregunta 1
- [ ] Ningún evento de recarga, `visibilitychange`, ni navegación entre slides borra o reinicia respuestas de quiz — SOLO `confirmarReintento()` (con una vida) puede hacerlo
- [ ] `MENSAJES_DOCENTE` definido y personalizable, con tono cálido y cercano
- [ ] `MAX_MENSAJES_DOCENTE_POR_CLASE = 3` — NUNCA un número mayor
- [ ] `mostrarMensajeDocente()` es el ÚNICO punto de entrada visual y respeta el tope antes de mostrar cualquier mensaje
- [ ]  v7.5: NO existe ningún `setInterval` libre disparando mensajes — el disparador por tiempo fue eliminado
- [ ] Disparador por hito de nota (`checarHitoNotaDocente`) implementado, sin interrumpir quizzes abiertos, con máximo 2 hitos (4.0 y 5.0)
- [ ]  v7.5: `chequearMensajeMitadClase()` es el único disparador extra — se activa UNA sola vez, entre 45%-55% de avance
- [ ] `st.acts['msgDocenteUsados']` persiste — el conteo de mensajes mostrados nunca se reinicia al recargar
- [ ] Los mensajes del docente nunca revelan respuestas ni pistas de examen
- [ ]  v6.2: el cronómetro de lectura (`st.acts['leido_'+id]`) corre UNA sola vez por slide en toda la sesión del estudiante — nunca se reactiva al recargar, salir y volver a entrar, o regresar a esa slide
### IMÁGENES CON HOTSPOTS (Prioridad 19 — v6.7)
- [ ] Patrón de hotspots usado como alternativa OPCIONAL al grid 2×2, no obligatorio en todos los slides
- [ ] Cada imagen con hotspots tiene 3-4 puntos pulsantes (`.hotspot-punto`) posicionados sobre zonas relevantes
- [ ] Al tocar un hotspot se revela un dato breve (toast, nunca modal que bloquee la lectura)
- [ ] El total de imágenes reales de la clase sigue llegando a 20 (Prioridad 1), compensando con más slides si se usa este patrón
- [ ] Los clics en hotspots NUNCA afectan la nota (Prioridad 18-A)
- [ ] `alt` descriptivo y fallback emoji (Prioridad 1) siguen aplicando también a las imágenes con hotspots
### VITRINA DE LOGROS ACUMULADOS (Prioridad 20 — v6.7)
- [ ] Botón fijo "🏆 Mis Logros" en el navbar, junto a los cuadernos
- [ ] Se abre como panel flotante (`showModalGrande`) — nunca es un slide, nunca bloquea nada
- [ ] `LOGROS_KEY` usa `NOMBRE_NORM` (Prioridad 8-D) — nunca se mezclan logros entre estudiantes
- [ ] `registrarLogroAcumulado()` se llama dentro de `otorgarBadge()` (Prioridad 15), cada vez que se gana una medalla nueva
- [ ] La vitrina muestra medallas de TODAS las semanas anteriores, no solo la actual, indicando en qué semana se ganó cada una
- [ ] Mensaje amable si aún no hay medallas — nunca un espacio vacío sin contexto
- [ ] La vitrina NUNCA afecta la nota — es puramente motivacional (Prioridad 18-A)
- [ ] `LOGROS_KEY` persiste entre semanas — solo se resetea manualmente desde el Panel Docente (Prioridad 16)
### BOTÓN FIJO "🏠 INICIO" (Prioridad 21 — v6.8)
- [ ] Botón "🏠 Inicio" fijo y siempre visible en el navbar, en la misma posición en todas las clases
- [ ] `volverAlIndex()` llama `save()` y `syncIndex()` ANTES de cualquier redirección
- [ ] Toast de confirmación visible ("💾 Guardado · 🔄 Sincronizado") antes de navegar fuera de la clase
- [ ] `INDEX_URL` definida por el autor en los datos a completar; si falta, hay respaldo con `history.back()`
- [ ] Funciona igual en cualquier slide, incluso con un quiz a medio contestar (guarda el progreso parcial sin perder respuestas ya dadas)
### AVATAR PROPIO (Prioridad 22 — v6.9)
- [ ] Selector de avatar visible en el slide intro, con 3-4 opciones según el tema visual
- [ ] `st.avatarElegido` persiste en localStorage — no se pierde al recargar
- [ ] El avatar elegido se usa en el HUD y en el mapa de camino (Prioridad 10-D), con `AVATAR_TEMA_ICONO` como respaldo
- [ ] Elegir avatar NUNCA afecta la nota ni bloquea el avance de ninguna slide
### CARTA SORPRESA (Prioridad 23 — v6.9)
- [ ] `intentarCartaSorpresa()` se llama SOLO tras actividades complementarias sin nota, nunca tras evaluables
- [ ] La probabilidad de aparición es menor al 100% (ej. 30-40%)
- [ ] Ningún premio de la carta afecta `st.aciertos` ni `calcTotal()`
- [ ] `SORPRESAS_CARTA` es personalizable por el autor de la clase
### ELIGE TU ACTIVIDAD (Prioridad 24 — v6.9)
- [ ] Slide tipo `complementaria-eleccion` ofrece 2 opciones equivalentes en dificultad
- [ ] La elección queda fija una vez tomada — no se puede cambiar a mitad de actividad
- [ ] `puedeAvanzar()` maneja el nuevo tipo igual que las demás complementarias (contestar desbloquea)
- [ ] Esta actividad sigue sin afectar la nota (Prioridad 18-A)
### SEMÁFORO DE CONFIANZA (Prioridad 25 — v6.9)
- [ ] `rSemaforoConfianza()` aparece antes de la primera pregunta de quiz1, quiz2 y evalFinal
- [ ] `st.acts['confianza_'+id]` persiste y nunca afecta `st.aciertos` ni `calcTotal()`
- [ ] No vuelve a preguntar si el estudiante ya avanzó en ese quiz
- [ ] Panel Docente (Prioridad 16) puede mostrar confianza vs. resultado real, si se desea potenciar esa vista
### TRANSICIONES ANIMADAS ENTRE SLIDES (Prioridad 26 — v7.5)
- [ ] renderConTransicion() se usa en render() en vez de reemplazar innerHTML de golpe
- [ ] Dirección correcta: derecha→izquierda al avanzar, izquierda→derecha al retroceder (prevSlide, Prioridad 8-H)
- [ ] Duración total 300-500ms — ágil, no entorpece la navegación
- [ ] @media (prefers-reduced-motion: reduce) desactiva las animaciones
### REACCIONES FLOTANTES AL COMPLETAR ACTIVIDADES (Prioridad 27 — v7.5)
- [ ] lanzarReaccionesFlotantes() se llama junto a showToast() en los puntos de éxito de actividades, lanzada desde el elemento de origen
- [ ] Máximo 4 emojis por evento, nunca en respuestas incorrectas
- [ ] No se combina con los fuegos artificiales SVG de rFinal()
- [ ] @media (prefers-reduced-motion: reduce) oculta las reacciones
### SLIDER "ANTES Y DESPUÉS" (Prioridad 28 — v7.5)
- [ ] El comparador se usa solo cuando el concepto realmente tiene una comparación/transformación clara
- [ ] initAntesDepues() funciona con mouse Y con touch
- [ ] Ambas imágenes cuentan para el mínimo de 20 imágenes reales y llevan alt + fallback emoji
### PARALLAX SUTIL EN EL FONDO (Prioridad 29 — v7.5)
- [ ] Capa de fondo SEPARADA del contenido (#fondo-parallax), con requestAnimationFrame
- [ ] El fondo se mueve a 25-35% de la velocidad real del scroll, con opacidad 10-15%
- [ ] z-index del fondo siempre menor que el contenido — nunca intercepta clics
- [ ] Respeta prefers-reduced-motion — ni siquiera agrega el listener si el sistema lo pide
---

## CHECKLIST ADICIONAL — MEJOR NOTA (8-U), SEMANA NUEVA EN CERO (8-V), REINTENTO SIN BLOQUEOS (8-W)

### MEJOR NOTA CONSERVADA (Prioridad 8-U)
- [ ] `notaOficial()`, `actualizarMejorNota()`, `aciertosOficiales()` y `calcTotal()` (completa) existen, una sola vez cada una
- [ ] `st.mejorNota`, `mejorAciertos`, `mejorIntento`, `historialIntentos` se guardan y restauran (8-V `save()`/`load()`)
- [ ] `resetearTodosLosQuizzes()` llama a `actualizarMejorNota()` antes de `st.aciertos = 0`
- [ ] `rFinal()`, bloque de vidas, `syncIndex()`/`INDEX_KEY`, hitos del docente y HUD usan `notaOficial()`
- [ ] Probado: 3.5 → reintento 3.0 → sigue 3.5 (pantalla final, HUD, index y tras F5); 3.5 → 4.2 sube a 4.2
- [ ] Solo `pd_resetCompleto()` puede poner la mejor nota en 0.0
### SEMANA NUEVA = CERO REAL (Prioridad 8-V)
- [ ] `CONFIG_CLASE`, `CLASE_ID`, `CTX_VALIDO`, `PREFIX`, `almacen()`, `sesionGuardadaEsValida()`, `estadoEnCero()`, `load()` y `save()` existen una sola vez
- [ ] Un contexto del index de otra semana (`semana` distinta o `storagePrefix` que no termina en `_s{semana}`) se descarta
- [ ] La sesión guardada lleva sello (studentId, grupo, semana, claseId, prefix) y solo se restaura si coincide
- [ ] Auto-reparación estricta (sello completo), sin `includes()` sobre el nombre
- [ ] Modo sin guardar: solo `sessionStorage`, jamás `localStorage` ni índice
- [ ] No existe `IDX_SC`, `SEM_ID` ni `localStorage.setItem('studentName', …)`; existe UNA sola `syncIndex()`
- [ ] Sin sesión válida: `console.assert` de arranque en cero presente; los valores iniciales de `st` son ceros literales
### REINTENTO A PRUEBA DE BLOQUEOS (Prioridad 8-W)
- [ ] `iniciarNuevoIntento()` es el único reinicio; vacía cola de modales, cierra modal, retira overlays, detiene temporizadores y verifica el quiz
- [ ] `purgarCandadosHuerfanos()` corre en `load()`, `rQuiz()`, `responderQuiz()` (borra el candado de la pregunta actual) y `verificarQuizVivo()`
- [ ] `verificarQuizVivo()` + `programarVerificacionQuiz()` + invocación desde `revalidarAvance()`; `window.__vivoTimeout` limpiado por `detenerTemporizadoresSlide()`
- [ ] `.reintento-banner { pointer-events:none }` y toda capa decorativa de pantalla completa con clase `fx-overlay` + `pointer-events:none`
- [ ] `prueba_clase.js` con T7, T8 y T9 ejecutado antes de entregar: cero ❌
