# Material retirado de Prompt_Maestro_Clases_v20.md al crear la v21

> **NO se lee al aplicar el prompt.** Es solo registro para auditoría: cada bloque conserva su número de línea original en la v20 y el motivo.
> Las reglas vigentes de cada tema están en `prompt/` (ver la tabla de precedencia en `prompt/00_PROTOCOLO_Y_PRECEDENCIA.md`).


---
## v20 líneas 1–62 · Banners de versión y protocolo antiguo (reescrito en prompt/00_PROTOCOLO_Y_PRECEDENCIA.md)

````text
> **Actúa como un desarrollador senior full-stack especializado en EdTech gamificada, experto en HTML5, CSS3 vanilla y JavaScript puro. Tu misión es crear un archivo HTML único, 100% autocontenido. No simplifiques. No recortes. Construye la mejor clase posible siguiendo TODAS las prioridades en orden ESTRICTO. Cada sección marcada con 🔴 es OBLIGATORIA e INNEGOCIABLE. v15.0**

> 🆕🆕🆕🆕🆕🆕🆕🆕 **v15.0 — TRES CORRECCIONES CRÍTICAS DE PRODUCCIÓN: Prioridades 8-U, 8-V y 8-W (nuevas, 🔺🔺🔺 Máxima).** (1) **8-U — La nota oficial es la MEJOR nota de todos los intentos:** si el estudiante gasta una vida y el nuevo intento sale más bajo, **se conserva la nota máxima** (ej.: sacó 3.5, reintenta y saca 3.0 → queda 3.5). Se separan `calcTotal()` (nota del intento en curso) y `notaOficial()` (la que se muestra, se guarda y se envía al index); la mejor nota vive en `st.mejorNota` y solo puede subir. (2) **8-V — Semana nueva = cero real:** se corrigió el bug de clases que abrían la primera vez con una nota "ya hecha". Causas halladas en el propio documento: contexto del index de OTRA semana aceptado a ciegas, una segunda `syncIndex()` heredada que "conservaba la nota previa" por nombre sin grupo, sesiones guardadas sin sello de semana, y acceso directo que compartía sesión entre estudiantes. Ahora toda sesión lleva sello (semana, curso, grupo, estudiante) y solo se restaura si coincide. (3) **8-W — Reintento a prueba de bloqueos:** tras gastar una vida los quizzes podían quedar sin responder (candados `q_contada_*` huérfanos, modales o capas encima, y dos caminos de reinicio distintos entre estudiante y panel). Ahora existe UNA función de reinicio (`iniciarNuevoIntento()`), se purgan los candados huérfanos y cada quiz pasa una **prueba de vida** (`verificarQuizVivo()`) que se auto-repara. Se añaden las pruebas T7, T8 y T9 a `prueba_clase.js` (8-T). **Ninguna prioridad anterior se eliminó**: solo se modificaron las piezas de código que entraban en conflicto con estas tres reglas (`confirmarReintento()`, `pd_resetQuizzes()`, `pd_resetCompleto()`, `rFinal()`, `load()`/`save()`, `PREFIX`, `calcTotal()`, `syncIndex()` y las ediciones puntuales marcadas con "v15.0" dentro de cada sección). **En caso de conflicto, 8-U, 8-V y 8-W mandan.**

> 🆕🆕🆕🆕🆕🆕🆕 **v14.0 — Prioridad Alta 30-C (nueva): ARIA lee TODO el contenido de la clase y explica conceptos/procesos con palabras simples, sin tocar nunca un quiz.** Hasta v13.0, ARIA solo podía responder con precisión lo que estuviera literalmente en `GLOSARIO` (términos sueltos) o en `CLASE_META` (tema/objetivo del día); cualquier otra pregunta tipo "explícame cómo se hace esto", "¿cómo funciona X?" o "¿qué es X?" caía casi siempre en el "no sé responder eso" genérico, aunque la explicación completa estuviera dos diapositivas atrás. La Prioridad 30-C agrega un indexador (`indexarContenidoClaseAria()`) que lee el texto real de **todas** las diapositivas de `SL` (con su `type` verdadero), un detector de secuencias de pasos (`extraerPasosAria()`, reconoce numeración y palabras como "primero/luego/después/finalmente"), una simplificación leve de vocabulario que nunca cambia el significado (`simplificarLenguajeAria()`), y el motor que arma la explicación final (`explicarConceptoOProcesoAria()`). La regla no negociable, verificada en el propio código: **`explicarConceptoOProcesoAria()` excluye siempre las diapositivas `quiz` y `evalFinal` de su búsqueda** — nunca las lee ni las cita, ni siquiera parcialmente — así que esta capacidad nueva no debilita en nada la protección ya construida en la Prioridad 30-B (orientación socrática ante preguntas de evaluación copiadas/pegadas). `responderAria()` (Prioridad 30.3) queda con una única versión final, documentada completa en la 30-C, con el orden de prioridad: pregunta copiada de quiz (30-B) → tema/objetivo del día (`CLASE_META`) → `GLOSARIO` → `METODOS` opcional (30-B.5) → explicación profunda nueva (30-C) → reglas genéricas (qué hago aquí/cómo voy/nota/quién eres/ánimo/saludo/gracias/tiempo) → honestidad final si no reconoce nada. Ninguna prioridad existente (0 a 32) se modificó en su comportamiento — v14.0 es 100% aditiva sobre ARIA, igual que fue v10.0, v12.0 y v13.0 en su momento. Ver Prioridad 30-C para el detalle completo, con checklist propio.

> 🔊 **v14.4 — Prioridad Técnica 33 (nueva):** sonido sintetizado con Web Audio API — 6 efectos generados con osciladores (acierto, fallo suave, logro, notificación, clic, despedida), cero archivos de audio incrustados, con interruptor propio persistido en `localStorage` junto al botón de voz existente. Aditiva: no cambia ninguna prioridad anterior.

> 🧑‍🏫 **v14.3 — Prioridad Alta 30-F (nueva):** ARIA explica mejor, no solo distinto — andamiaje socrático real (pregunta guía antes de explicar, con micro-fundamento si el estudiante no sabe la base), una capa nueva de comparación visual entre la analogía y el ejemplo resuelto, y refuerzo proactivo (ARIA se adelanta a ofrecer más ayuda desde la 2ª vez que preguntan lo mismo o fallan el mismo quiz, sin esperar a que insistan). Reemplaza el código de `METODOS_ARIA` y `cascadaDeIntentosAria()` de la 30-E; el resto de esa prioridad y todas las demás quedan intactas.

> 🎓 **v14.2 — Prioridad Alta 30-E (nueva):** ARIA docente completo — banco de métodos pedagógicos reutilizable (`METODOS_ARIA`, 15 entradas de Aritmética/Tecnología, igual en todas las clases) + cascada de varios intentos antes de rendirse (`cascadaDeIntentosAria()`, con tolerancia a errores de escritura vía Levenshtein) + profundización automática cuando el estudiante dice "no entendí" (pasos → analogía → ejemplo resuelto) + registro de dudas no resueltas para el Panel Docente. Aditiva: no cambia ninguna prioridad anterior.

> 🎭 **v14.1 — Prioridad Alta 30-D (nueva):** ARIA con expresividad física — 6 poses oficiales en base64 con animación por estado (`ariaReaccionar('correcto'|'genial'|'animo'|'dificil'|'ayuda'|'despedida')`), conectadas al quiz. Aditiva: no cambia ninguna prioridad anterior. Sprites completos en `aria_sprites_base64.js`.

> 🔺🔺🔺 **AVISO DE MÁXIMA PRIORIDAD — LEER ANTES QUE CUALQUIER OTRA COSA:** la Prioridad Absoluta 8-G ("FUENTE ÚNICA DE VERDAD: IDENTIDAD DE SESIÓN Y RESTAURACIÓN EXACTA DEL AVANCE") es la única versión válida de `markSeen()` y del orden de arranque en todo este documento (🆕 v15.0: `load()` y `save()` se implementan con el código de la **Prioridad 8-V**, que es el de 8-G más sello de semana/curso/grupo/estudiante, mejor nota (8-U) y modo sin guardar efímero) — PERO la fórmula de `PREFIX`/`SKEY`/`INDEX_KEY` que trae 8-G y 8-F quedó a su vez ANULADA por la **Prioridad Absoluta Máxima 8-K** (nueva en v10.4, consolidada en v11.0): la única fórmula de claves válida hoy es la de 8-K. Si en las Prioridades 8, 8-B, 8-C, 8-D, 8-E, 8-F u 8-G aparece otra versión de `PREFIX`/`SKEY`/`INDEX_KEY`, esa versión queda ANULADA (ahora marcada en línea, dentro de cada sección, con "⚠️ ANULADO por la Prioridad 8-K") — implementa ÚNICAMENTE el código de identidad/restauración de 8-G y ÚNICAMENTE la fórmula de claves de 8-K. **🆕 Además, la Prioridad Absoluta Máxima 8-L (v11.0.1) documenta un bug real de producción — la semana duplicada dentro de PREFIX y el colapso de SKEY/INDEX_KEY en una sola clave — que ocurre incluso cuando el código PARECE seguir 8-K; su checklist de verificación es de aplicación obligatoria antes de entregar cualquier clase.** **🆕🆕 v11.1 — Prioridad Absoluta Máxima 8-M:** bug real de producción confirmado — dar clic varias veces muy rápido sobre una opción del quiz sumaba un acierto por cada clic (un estudiante podía llegar a nota máxima desde el primer quiz sin responder el resto). La versión de `rQuiz()`/`responderQuiz()` que aparece en la Prioridad 2/5 (sin guardia de índice ni bloqueo de botones) queda **ANULADA por 8-M**, igual que la de 8-H quedó reforzada por ella — implementa ÚNICAMENTE la versión de 8-M. 8-M también sube `MAX_VIDAS` de 3 a **8** en todo el documento (antes probado con 6, se subió a 8 tras confirmar en producción que algunos estudiantes agotaban 6 intentos legítimos) y corrige que "Reset solo Quizzes" del panel docente redirija a los quizzes pendientes igual que hace "Reintentar" del estudiante (Prioridad 6-B). Compañero obligatorio: `Prompt_Maestro_Index_v11.md` (v1.1) — ambos documentos usan la misma `prefijoSemana()`/`storagePrefix` y el mismo nombre de archivo por semana; ver Prioridad 0 y 8-K/8-L aquí, y Prioridad 1/5/7 allá.

> 🆕🆕🆕🆕 **v11.4 — Prioridad Absoluta Máxima 8-N (nueva):** bug real de producción confirmado — la clase se congelaba y dejaba de responder a los clics tras un rato de uso, obligando a refrescar la página (con riesgo de perder avance no guardado aún). Causa raíz: `activarCronometroLectura()` (Prioridad 0-A) guardaba el `setInterval` del cronómetro de lectura en una variable **local**, que solo se limpiaba dentro de su propio callback al llegar a 0 segundos — si el estudiante cambiaba de slide (botón "Atrás", menú lateral, salto desde el índice) ANTES de que terminara la cuenta, ese intervalo quedaba corriendo para siempre en segundo plano, y cada regreso a una slide de lectura sin terminar la cuenta anterior creaba OTRO intervalo más, acumulando temporizadores "fantasma" hasta agotar memoria/CPU del navegador. La versión de `activarCronometroLectura()` de la Prioridad 0-A queda **ANULADA por 8-N** — implementa ÚNICAMENTE la versión de 8-N, que guarda el intervalo en `window.__cronometroInterval` y lo limpia siempre antes de crear uno nuevo y al inicio de cada `render()`, sin excepción.
>
> 🆕🆕🆕 **v11.3 — se retira el código muerto de las versiones ya ANULADAS de `PREFIX`/`SKEY`/`load()`/`save()` que quedaban en las Prioridades 8, 8-C, 8-D y 8-E, para eliminar por completo el riesgo de que una IA copie por error la versión vieja aunque esté marcada.** Antes, esas cuatro secciones seguían mostrando el código completo (no solo la fórmula) de versiones ya reemplazadas por 8-G/8-K, con una nota en línea "ANULADO por..." — suficiente para un lector atento, pero seguía habiendo dos implementaciones completas de las mismas cuatro funciones a la vista en el documento. Se reemplazó cada bloque de código anulado por una nota corta que señala dónde está la versión vigente, conservando intacto el razonamiento/diagnóstico de cada sección (por qué existía el problema, qué garantiza la solución) que sigue siendo útil aunque el código ya no se implemente ahí. De paso se corrigió una inconsistencia real encontrada en la Prioridad 8-G: la nota que anulaba su `PREFIX` decía que `SKEY` seguía siendo `PREFIX + '_session'`, pero el código vigente de la Prioridad 8-K en realidad usa `` `${PREFIX}_${NOMBRE_NORM||'sinregistro'}_session` `` (con el nombre del estudiante en el sufijo, porque bajo 8-K el `PREFIX` que entrega el index ya no es por-estudiante) — la nota quedó corregida para que coincida con el código real. No se tocaron los bloques de la Prioridad 2/5 (quiz) ni de la 8-F (`construirIndexKey()`), porque el propio documento explica que se dejan a propósito como referencia de estructura/razonamiento, no como descuido. Ningún comportamiento especificado en v11.1/v11.2 cambió — v11.3 es limpieza de redundancia y una corrección de consistencia en un comentario, no en código funcional.

> 🆕🆕🆕 **v11.2 — dos correcciones adicionales, sin tocar ninguna prioridad de contenido:** **(1)** quedaban cuatro menciones sueltas a "3 vidas" en los títulos y textos de las Prioridades 6 y 6-C, y en el toast de "reactivar vidas" del panel docente, que nunca se actualizaron a `MAX_VIDAS=8` cuando se aplicó 8-M — quedan corregidas (ver Prioridad 6, 6-C y el bloque `pd_reactivarVidas()` de la Prioridad 18). Los "3" que aparecen dentro del **historial de versiones** (describiendo v4.1, v6.0, v7.5) NO se tocan: son registro histórico exacto de lo que existía en esas versiones, no la especificación vigente. **(2)** Se refuerza, dentro de la Prioridad 8-B, la regla de que `save()` se llama de forma síncrona en el mismo manejador de evento de CUALQUIER clic que modifique `st` (no solo al cambiar de slide) — así perder la conexión, refrescar o cerrar la pestaña a mitad de una actividad (ej. a mitad de la slide 6) nunca borra avance ya hecho. Y se agrega, al inicio del documento, un **Protocolo de Aplicación Obligatoria** que exige leer y aplicar el documento completo, prioridad por prioridad, sin omitir ninguna por su longitud, con una lista de verificación final de las 40 prioridades del documento.

> 🆕 **v11.0 — CONSOLIDACIÓN FINAL:** esta versión fusiona en un solo documento definitivo el `Prompt_Maestro_Clases_v10.1` con el `PARCHE_Sincronizacion_Index_Clases_v11` (Prioridad 0 + Prioridad 8-K) y elimina las contradicciones que había entre ambos: las Prioridades 8-F y 8-G, que antes se presentaban como "la ÚNICA fórmula válida, cópiese exactamente así", ahora incluyen una nota en línea (⚠️ ANULADO por 8-K) justo sobre el código de `PREFIX`/`INDEX_KEY` que quedó reemplazado, y la función de auto-reparación de 8-G (`buscarSesionHuerfanaPorIdentidad`) se actualizó para buscar sesiones huérfanas usando el `PREFIX` real que entrega 8-K, no la fórmula vieja. Ningún otro contenido de las Prioridades 0-A a 32 se modificó — ver el historial de versiones al final para el detalle línea por línea.

> 🆕 **NOVEDAD v10.0:** se incorporan tres prioridades nuevas, extraídas y generalizadas de una clase real ya construida que el prompt v7.5 no cubría: **Prioridad 30** (ARIA, el robot asistente con chat, voz y consulta al glosario real), **Prioridad 31** (imágenes propias embebidas en base64 para un archivo 100% autocontenido) y **Prioridad 32** (tabla de medidas exactas de anchos máximos para imágenes y cajas de texto). Todo lo demás del documento se mantiene igual que en v7.5 — ver el resumen ejecutivo al final del documento para el detalle completo de qué cambió y por qué.

---

## ═══════════════════════════════════════
## 🔺🔺🔺 PROTOCOLO DE APLICACIÓN OBLIGATORIA — LECTURA COMPLETA, CERO OMISIONES (v11.4)
## ═══════════════════════════════════════

Este documento es largo a propósito: cada prioridad existe porque corrigió un bug real de producción. **Ninguna prioridad es opcional ni "nice to have" por estar más abajo en el archivo o por ser antigua.** Antes de escribir una sola línea de código de la clase, y antes de entregarla, quien aplique este prompt (humano o IA) debe seguir este protocolo sin excepción:

1. **Lectura completa antes de generar código.** Lee el documento de principio a fin, en orden, incluyendo el AVISO del inicio y las notas "⚠️ ANULADO por..." dentro de cada sección — esas notas indican qué versión de una función NO se debe implementar. No empieces a escribir el HTML/JS de la clase a partir de un resumen mental ni de solo las primeras prioridades: la longitud del documento no es motivo para saltarte secciones, resumirlas de memoria o "completar" una prioridad basándote en el nombre del título sin leer su contenido completo.
2. **Si la ventana de trabajo es limitada, procesa por bloques — nunca por omisión.** Si por cualquier razón no puedes tener las ~8800 líneas completas en un solo paso, divide la lectura en 2-3 bloques (por ejemplo: Prioridades 0 a 8-N; 9 a 18; 19 a 32 + checklist final) y confirma internamente cada bloque antes de pasar al siguiente. Lo que nunca se debe hacer es generar la clase después de leer solo el primer bloque y asumir que el resto "es más de lo mismo".
3. **Las prioridades marcadas 🔺🔺🔺 ANULAN código anterior — verifica ambas versiones.** Cuando una prioridad tardía (8-K, 8-L, 8-M, 8-N, etc.) anula la versión de una función que aparece antes en el documento (8, 8-F, 8-G, 2/5, 0-A), busca literalmente el texto "ANULADO por" en el documento antes de decidir qué versión de esa función escribir. Implementar la versión vieja porque "aparecía primero" es el error más común y el que más bugs de producción ha causado en este proyecto.
4. **No resumas ni parafrasees las prioridades marcadas 🔴/🔺 al aplicarlas — cópialas funcionalmente completas** (nombres de función, guardas, orden de las líneas), no solo la idea general. Un resumen que capture "la intención" de 8-M o 8-J pero no la guarda exacta que exigen vuelve a introducir el bug que esa prioridad corrigió.
5. **Checklist final obligatorio antes de entregar el archivo.** Además de los checklists puntuales que trae cada prioridad, confirma explícitamente, una por una, que estas 56 prioridades quedaron implementadas (no solo "consideradas"): 0, 0-A, 0-B, 0-C, 0-D, 0-E, 0-F, 0-G, 1, 2, 3, 4, 5, 6, 6-B, 6-C, 7, 8, 8-B, 8-C, 8-D, 8-E, 8-F, 8-G, 8-H, 8-I, 8-J, 8-K, 8-L, 8-M, 8-N, 8-O, 8-P, 8-Q, 8-R, 8-S, 8-T, 8-U, 8-V, 8-W, 9, 10, 10-B, 10-C, 11, 18, 18-C, 30, 30-B, 30-C, 30-D, 30-E, 30-F, 31, 32, 33. Si alguna no aplica al tipo de clase puntual que se está generando (por ejemplo, no todas las clases usan la Prioridad 30/30-B/30-C), decláralo explícitamente en vez de omitirla en silencio.
6. **Ante la duda entre "más corto" y "más completo", elige completo.** Este documento existe precisamente porque versiones recortadas o generadas "a partir de memoria" de clases anteriores fueron las que reintrodujeron bugs ya corregidos (vidas con el número viejo, `responderQuiz()` sin guardas, claves de storage recalculadas a mano). Nunca proceso "por velocidad" a costa de saltarte una prioridad.

---

> 🆕🆕🆕🆕🆕 **v12.0 — BLINDAJE ANTI-BLOQUEO: Prioridades 8-O, 8-P, 8-Q, 8-R, 8-S y 8-T (nuevas) + LIMPIEZA DEL CÓDIGO DE REFERENCIA QUE CAUSABA LOS BUGS.** Bug real de producción confirmado auditando `semana2_mat4_p4.html` (Aritmética 4°, Período 4): **el cronómetro de lectura "no corría"** — el estudiante veía la cuenta 12→11→10→12→11→10… y el botón "Siguiente" no se habilitaba jamás (había que ir atrás/adelante o recargar) — y **al recargar o volver atrás/adelante "se saltaba la pregunta"** (la retroalimentación desaparecía). Se reprodujo en un navegador real y se encontraron **ocho causas raíz, casi todas originadas en el propio prompt o en la interacción entre sus prioridades**:
>
> 1. **El vigilante reiniciaba el cronómetro.** Toda clase con red de seguridad (`revalidarAvance()` cada 3 s, en `focus`, `pageshow`, al cerrar un modal…) volvía a llamar a `activarCronometroLectura()`, que SIEMPRE empezaba de 12 → la cuenta jamás llegaba a 0. La 8-N de v11.4 arreglaba los intervalos fantasma pero NO exigía que el cronómetro fuera **idempotente**. → **8-N reescrita + 8-O.**
> 2. **El cronómetro arrancaba dentro de `requestAnimationFrame`** (Prioridades 0-A, 0-C y 2). El navegador NO ejecuta rAF con la pestaña en segundo plano: si el estudiante cambiaba de app justo al cambiar de slide, el cronómetro nunca arrancaba. → ahora es **síncrono** (8-O).
> 3. **La cuenta se hacía con `restantes--`** (ticks). En segundo plano el navegador frena los `setInterval`: la cuenta quedaba congelada a mitad. → ahora es por **tiempo real** (`Date.now()`) + comprobación del vigilante (8-N/8-O).
> 4. **`responderQuiz()` de 8-M avanzaba `quiz_idx_` solo al cerrar el modal**, pero cerraba el candado `q_contada_` en el primer clic: recargar antes de pulsar "Continuar" dejaba la pregunta con los botones aparentemente vivos y los clics ignorados en silencio → **pregunta MUERTA para siempre**. Además `mostrarRetroQuiz()` metía `callback.toString()` dentro de un `onclick` (pierde las variables → `ReferenceError`) y el texto de la retroalimentación dentro del `onclick` (una comilla rompía el botón). → **8-P (motor de quiz canónico, el índice avanza EN el clic, retroalimentación persistente) y 8-R (onclick solo con ids y números).**
> 5. **`confirmarReintento()` (Prioridad 6) y `pd_resetQuizzes()` (Prioridad 16) no borraban los candados `q_contada_*`** → tras usar una vida, el quiz rehecho ignoraba todos los clics. → `resetearEstadoQuiz()` único (8-P).
> 6. **`showModal()` nunca estaba definido en el prompt** → cada clase lo inventaba y un modal pisaba a otro (el aviso del Modo Foco o el mensaje del profe borraba la retroalimentación del quiz). → **8-Q (modales con cola).**
> 7. **`activarCronometroLectura()` con `return` a secas** para `modoAdmin` (Prioridad 16) y `reintentoActivo` (6-B) dejaba "Siguiente" apagado. Y **`renderConTransicion()` (Prioridad 26) inyectaba el HTML 180 ms después con `setTimeout`**: dos `render()` seguidos escribían fuera de orden. → 8-N y **8-S**.
> 8. **Contradicciones y trampas en el código de referencia:** la Prioridad 4 traía un `nextSlide()` con "Saltar de todas formas" (contradice 0-C); `renderResumenQuiz()` usaba `st.slide++;save();render()` saltándose `puedeAvanzar()`; `const TOT = 23` a mano (la clase real tenía 21 slides: el contador decía "21/23" y `completada` era imposible); el Modo Foco se abría encima de un quiz.
>
> **Qué se ELIMINÓ del prompt en v12.0 (para que ninguna IA lo copie por error):** el `activarCronometroLectura()` de 0-A y 6-B (intervalo local, `restantes--`, `return` sin habilitar) · las llamadas `requestAnimationFrame(() => activarCronometroLectura…)` de 0-A/0-C/2 · el `render()` de 0-C con rAF · las tres versiones de `responderQuiz()` (Prioridades 5, 8-H y 8-M) y `mostrarRetroQuiz(callback.toString())` · el `nextSlide()` de la Prioridad 4 (con "Saltar de todas formas") y el de 0-C · el `confirmarReintento()` sin limpieza de candados · el `pd_resetQuizzes()` que no reseteaba nada real · el `renderConTransicion()` con `setTimeout` de 180 ms · el `st.slide++` inline de `renderResumenQuiz()`. **Hoy existe UNA SOLA implementación de cada pieza**, y vive en 8-N (cronómetro), 8-O (núcleo: `puedeAvanzar`, `aplicarEstadoAvance`, `revalidarAvance`, `render`, `nextSlide`), 8-P (quiz) y 8-Q (modales).
>
> **Nuevo Protocolo de Pruebas Automáticas (Prioridad 8-T):** ninguna clase se entrega sin haber pasado `prueba_clase.js` (incluido íntegro en 8-T), que simula un estudiante con reloj acelerado: cronómetro, pestaña suspendida, ir y venir, 5 clics rápidos, recarga con la retroalimentación abierta, modales en fila y recorrido completo. La misma prueba **falla** sobre la clase original con el bug y **pasa** sobre la corregida.
>

> 🆕🆕🆕🆕🆕🆕 **v13.0 — Mejoras de ARIA (rama fusionada aparte del blindaje anti-bloqueo): Prioridad 30-B (orientación socrática ante preguntas de quiz copiadas/pegadas) + `CLASE_META` (nueva, dentro de la Prioridad 0).** Estas dos mejoras se desarrollaron en paralelo al blindaje anti-bloqueo de arriba (v12.0, Prioridades 8-O a 8-T) y se integran aquí en el mismo documento. **(1) Prioridad 30-B:** la Prioridad 30 ya declaraba en sus "Reglas no negociables" que "ARIA nunca da la respuesta correcta de un quiz/evalFinal", pero ningún código de `responderAria()` (30.3) verificaba eso — si un estudiante copiaba y pegaba el enunciado literal de una pregunta de quiz en el chat, ARIA no tenía forma de reconocerlo. Se agrega un detector que compara lo escrito contra TODAS las preguntas de la clase (no solo la slide actual) y responde orientando el proceso de pensar la respuesta — nunca resolviéndola — usando la nueva `pistaAyuda` opcional por pregunta (Prioridad 5) si el profe Luis la escribió, o un scaffolding genérico de respaldo si no. **(2) `CLASE_META`:** el TEMA y el OBJETIVO de cada semana (ya recogidos en la Prioridad 0) nunca quedaban guardados en ninguna variable legible en tiempo de ejecución, así que ARIA no podía responder "¿qué voy a aprender hoy?", "¿cuál es el tema?" ni "¿cuál es el objetivo de la clase?" — preguntas básicas y frecuentes, confirmadas con capturas reales de un estudiante haciéndolas y ARIA respondiendo "no sé". Se agrega `const CLASE_META = { materia, grado, tema, objetivo }` y una verificación de alta prioridad en `responderAria()`, antes del GLOSARIO, que responde con el dato exacto. Ver Prioridad 30-B y la sección "🆕 v13.0" dentro de la Prioridad 0 para el detalle completo.
>

````

---
## v20 líneas 1216–1224 · Bloque ANULADO por 6-C (botón de vidas en navbar)

````text
**Botón de vidas — v7.3 ANULADO por la Prioridad 6-C (más abajo), leer con atención:**
```
❌ ANULADO desde v7.5 — la versión v7.3 de esta sección decía que #btn-vidas debía vivir en el
   navbar fijo, visible y usable desde cualquier slide. Se detectó un problema pedagógico: el
   estudiante podía reintentar a mitad de la clase sin haber visto el resto del contenido que
   necesitaba. La Prioridad 6-C (justo después de la 6-B) reemplaza esta regla por completo:
   el botón de vidas YA NO va en el navbar — el sistema de vidas SOLO se activa desde la
   pantalla final. Ver Prioridad 6-C para la implementación vigente.
```
````

---
## v20 líneas 1318–1332 · Parche de pedirReintento duplicado (integrado en la Prioridad 6)

````text
```javascript
// ═══ 1) El navbar YA NO incluye el botón de vidas — se retira de la barra fija ═══
// ❌ QUITAR del navbar: <button id="btn-vidas" ...>❤️❤️❤️ Reintentar</button>
// El navbar conserva TODOS los demás botones (Cuaderno 1, Taller en Clase, Mis herramientas,
// Mis Logros, Inicio) — solo se retira el de vidas.

// ═══ 2) Candado de origen — pedirReintento() se niega a abrirse fuera de la pantalla final ═══
function pedirReintento() {
  if (st.slide !== SL.length - 1) { // 🆕 v7.5 — solo se puede invocar en el último slide
    showToast('🔒 Termina de ver toda la clase para poder reintentar');
    return;
  }
  // ...resto de la función IGUAL que en la Prioridad 6 (modal de confirmación, etc.)...
}
```
````

---
## v20 líneas 1513–1513 · Nota ANULADO reescrita

````text
> ⚠️ **Bloque histórico ANULADO por la Prioridad 8-G/8-K — no implementar.** Esta sección definía originalmente `PREFIX`/`SKEY`/`save()`/`load()`, pero esas cuatro piezas quedaron completamente reemplazadas: el `PREFIX` se deriva únicamente con la fórmula de la Prioridad 8-K, y `save()`/`load()` se implementan únicamente con el código de la Prioridad 8-G ("Fuente Única de Verdad"). Se retira aquí el código viejo para que no queden dos versiones de las mismas cuatro funciones en el documento; el resto de esta sección (`syncIndex()`, las 4 capas de guardado automático, el botón físico de guardar y las funciones del index) sigue vigente tal cual, y usa el `PREFIX`/`save()`/`load()` que entregan 8-K/8-G.
````

---
## v20 líneas 1594–1594 · Línea de ejemplo con storagePrefix antiguo

````text
    storagePrefix: `${MATERIA_SIGLA}_s${semanaId}`, // ⚠️ ANULADO por 8-K/8-V: el index real entrega area_grado_grupo_pPERIODO_sSEMANA y también `semana`
````

---
## v20 líneas 1703–1709 · load/save históricos + stub de IDX_SC (ANULADO)

````text
#### IMPLEMENTACIÓN — `load()` y `save()` (código único y vigente: Prioridad 8-G, que ya valida `studentId`/identidad antes de restaurar)
> ⚠️ **Bloque histórico ANULADO por la Prioridad 8-G — no implementar.** El `PREFIX`/`load()`/`save()` que definía aquí esta sección (v6.1) quedaron reemplazados por completo por el código de 8-G, que ya incorpora esta misma validación de identidad. Se retira el código viejo para evitar dos versiones de las mismas funciones; las reglas de comportamiento de arriba (estudiante nuevo vs. que regresa, nunca heredar progreso ajeno) siguen vigentes conceptualmente y las implementa 8-G.
**SINCRONIZACIÓN CON EL INDEX — mantener consistencia de identidad:**
```javascript
// 🆕 v15.0 — ANULADO: ya no existe IDX_SC. syncIndex() (8-F) escribe en INDEX_KEY (única por estudiante+semana+grupo)
// y la sesión lleva sello de semana/curso/grupo/estudiante (8-V). st.name sigue saliendo SOLO de claseCtx.
```
````

---
## v20 líneas 1766–1766 · Nota ANULADO reescrita

````text
> ⚠️ **Bloque histórico ANULADO por la Prioridad 8-G — no implementar.** El `load()` que definía aquí esta sección (v6.3) queda reemplazado por completo por el `load()` de 8-G, que ya incorpora auto-reparación de sesiones huérfanas (`buscarSesionHuerfanaPorIdentidad`, versión generalizada de `buscarSesionHuerfanaPorNombre` de arriba, adaptada al `PREFIX` real de 8-K). Se retira el código viejo para evitar dos versiones de `load()`; la garantía y el checklist de abajo siguen vigentes conceptualmente y los cumple 8-G.
````

---
## v20 líneas 1860–1874 · Stub de syncIndex duplicado + clave temporal ANULADA

````text
**Efecto en el guardado — nunca escribir datos atribuibles a un nombre incierto:**
```javascript
// 🆕 v6.9 — save() sigue guardando LOCALMENTE (para que no se pierda si el estudiante
// recarga la MISMA pestaña), pero bajo una clave temporal separada, nunca mezclada
// con el esquema real de identidad (Prioridad 8-D/8-E):
// ⚠️ ANULADO por la Prioridad 8-G — esta clave temporal ya no aplica: 8-G define un único
// load()/save() con la fórmula de PREFIX de 8-K; el "modo sin guardar" se maneja con la bandera
// st_modoSinGuardar (abajo) cortando syncIndex(), no con una clave de storage aparte.
// syncIndex() NUNCA debe escribir nada en modo sin guardar — se corta antes de tocar el índice:
function syncIndex() {
  if (st_modoSinGuardar) return; // 🆕 v6.9 — blindaje: cero escritura al índice sin identidad confiable
  if (!st.name) return;
  // ...resto de syncIndex() sin cambios (Prioridad 8 / 8-F)...
}
```
````

---
## v20 líneas 1895–1915 · Fórmula prefijoCurso/construirIndexKey ANULADA por 8-K

````text
> ⚠️ **ANULADO por la Prioridad 8-K (v10.4):** la fórmula de `prefijoCurso()`/`prefijoSemana()`/`construirIndexKey()` de abajo quedó reemplazada — `INDEX_KEY` ya NO se reconstruye aquí, se deriva del `PREFIX` único que entrega 8-K (`INDEX_KEY = PREFIX + '_' + NOMBRE_NORM + '_data'`). Se deja el código siguiente solo como referencia histórica del razonamiento (por qué la clave debe ser única por estudiante) — **no se implementa esta versión de la fórmula**, se implementa únicamente la de 8-K.
```javascript
// 🔺 Igual que en la Prioridad 8-G, este patrón de prefijo DEBE calcarse exactamente
// del index.html real de la materia — revisar su código antes de asumir el formato.
function prefijoCurso(area, grado, grupoNorm, periodo) {
  return `${area}_${grado}_${grupoNorm}_p${periodo}`;
  // Ejemplo real: "mat_4_501_p3"
}
function prefijoSemana(area, grado, grupoNorm, periodo, numeroSemana) {
  return `${prefijoCurso(area, grado, grupoNorm, periodo)}_s${numeroSemana}`;
  // Ejemplo real: "mat_4_501_p3_s2"
}
// ═══ INDEX_KEY — ÚNICA por estudiante, semana y grupo — NUNCA compartida ═══
// Patrón real confirmado en producción (Aritmética 4°):
//   mat_4_[grupo]_p3_s[N]_[usuario]_data
function construirIndexKey() {
  // area, grado, GRUPO_NORM, periodo y AUTOR_SEMANA_NUM ya vienen de claseCtx / Prioridad 8-E/8-G
  return `${prefijoSemana(claseCtx?.area, claseCtx?.grado, GRUPO_NORM, claseCtx?.periodo, AUTOR_SEMANA_NUM)}_${NOMBRE_NORM}_data`;
}
const INDEX_KEY = construirIndexKey();
```
````

---
## v20 líneas 2029–2029 · Nota ANULADO reescrita

````text
> ⚠️ **ANULADO por la Prioridad 8-K (v10.4), en la parte de `PREFIX` y `SKEY`:** las líneas `const PREFIX = ...` y `const SKEY = ...` de abajo (paso 4) quedan reemplazadas por la fórmula de 8-K — `PREFIX = claseCtx?.storagePrefix || prefijoRespaldo()` y `SKEY = \`${PREFIX}_${NOMBRE_NORM||'sinregistro'}_session\`` (SKEY ya no es simplemente `PREFIX + '_session'`, porque bajo 8-K el `PREFIX` que entrega el index es compartido por curso+semana, no por estudiante — el sufijo con `NOMBRE_NORM` es lo que mantiene la clave única por estudiante). Todo lo demás de esta sección (contexto de origen, modo sin guardar, normalización, auto-reparación, `load()`, `save()`) se implementa exactamente como está escrito aquí.
````

---
## v20 líneas 2245–2256 · CONFLICTO 8-J vs 8-K: SKEY/KEY_INDEX con fórmula distinta (corregido a la de 8-K)

````text
```javascript
// ═══ BLOQUE ÚNICO DE CLAVES — declarar TODAS aquí, ninguna se reconstruye distinto en otra parte ═══
const SKEY         = PREFIX + '_session';   // Prioridad 8-G — progreso COMPLETO de la sesión (slide, seen, quizActs...)
const KEY_RESUMEN   = PREFIX + '_resumen';   // Prioridad 8-F/8-J — resumen personal para el panel docente/anti-retroceso de nota
const KEY_INDEX     = prefijoCurso(studentGrupo) + '_s' + SEMANA_NUM + '_data'; // Prioridad 8-F — diccionario del índice, por semana+grupo

// 🔺 GUARDIA DE ARRANQUE — verificación en tiempo de ejecución, se deja en el código entregado:
// si por error futuro dos de estas claves llegaran a coincidir, el estudiante lo verá
// de inmediato en la consola en vez de perder su progreso en silencio.
console.assert(SKEY !== KEY_RESUMEN, '🚨 COLISIÓN DE CLAVES: SKEY === KEY_RESUMEN — syncIndex() va a borrar el progreso de sesión');
console.assert(SKEY !== KEY_INDEX,   '🚨 COLISIÓN DE CLAVES: SKEY === KEY_INDEX — syncIndex() va a borrar el progreso de sesión');
```
````

---
## v20 líneas 2304–2309 · normalizarTexto duplicada

````text
// 2) Normalización — función ÚNICA, idéntica carácter por carácter a normalizarNombre() del index
function normalizarTexto(txt) {
  return (txt || '').trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');
}
````

---
## v20 líneas 3019–3259 · prueba_clase.js embebida (duplicado exacto de tests/prueba_clase.js)

````text
```javascript
// prueba_clase.js — PRUEBA AUTOMÁTICA OBLIGATORIA (Prioridad 8-T)
// Uso:  node prueba_clase.js /ruta/completa/semanaN_area_g_pP.html      (requiere: npm i playwright)
// Es agnóstica del modelo de datos: solo usa el DOM y las funciones públicas de la clase.
const { chromium } = require('/home/claude/.npm-global/lib/node_modules/playwright');
const file = process.argv[2];
let fallos = 0;
const ok = (c, m) => { console.log((c ? '  ✅ ' : '  ❌ ') + m); if (!c) fallos++; };

(async () => {
  const browser = await chromium.launch();
  const errs = [];
  // Cada llamada crea un contexto NUEVO (almacenamiento limpio = estudiante sin avance guardado)
  async function abrir(ctxExtra = {}, seed = null) {   // v15.0: ctxExtra mezcla campos al contexto del index; seed precarga localStorage
    const ctx = await browser.newContext({ viewport: { width: 1100, height: 800 } });
    await ctx.route(/cdn\.|googleapis|gstatic|youtube|unsplash/, r => r.abort());
    await ctx.addInitScript(([extra, seedLS]) => {   // ADAPTAR si el nombre/grupo de prueba cambian
      try { sessionStorage.setItem('clase_contexto', JSON.stringify(Object.assign({ studentName: 'Prueba Test', grupo: '401' }, extra))); } catch (e) {}
      try { if (seedLS && !sessionStorage.getItem('__seeded')) { Object.keys(seedLS).forEach(k => localStorage.setItem(k, seedLS[k])); sessionStorage.setItem('__seeded', '1'); } } catch (e) {}
    }, [ctxExtra, seed]);
    const page = await ctx.newPage();
    page.on('pageerror', e => errs.push(e.message));
    await page.clock.install();                       // reloj falso: 12 s pasan en milisegundos
    await page.addInitScript(() => {                  // cuenta los setInterval vivos (temporizadores fantasma)
      const si = window.setInterval.bind(window), ci = window.clearInterval.bind(window);
      window.__iv = new Set();
      window.setInterval = (f, m, ...a) => { const id = si(f, m, ...a); window.__iv.add(id); return id; };
      window.clearInterval = (id) => { window.__iv.delete(id); return ci(id); };
    });
    const h = {
      page,
      S: (fn, a) => page.evaluate(fn, a),
      t: (ms) => page.clock.runFor(ms),
    };
    h.arrancar = async () => { await page.goto('file://' + file); await h.t(1500); await h.S(() => { if (typeof cerrarConfirmacion === 'function') cerrarConfirmacion(); }); await h.t(300); };
    h.nextOn = () => h.S(() => !document.getElementById('btn-next').disabled);
    h.quedan = () => h.S(() => { const i = document.getElementById('cronometro-lect'); return i ? +((i.textContent.match(/(\d+)s/) || [])[1]) : null; });
    h.cerrarModales = async () => { for (let z = 0; z < 5; z++) { if (await h.S(() => modalAbierto())) { await h.S(() => closeModal()); await h.t(700); } } };
    return h;
  }
  const LECT = ['info', 'repaso', 'repaso2', 'practica'], EVAL = ['quiz', 'evalFinal'];
  let { page, S, t, arrancar, nextOn, quedan, cerrarModales } = await abrir();
  await arrancar();
  const base = await S(() => window.__iv.size);
  const iLect = await S(L => SL.findIndex(s => L.includes(s.type)), LECT);

  console.log('T1 · el cronómetro BAJA de verdad y desbloquea a los 12 s (el vigilante no lo reinicia)');
  await S(i => { st.slide = i; render(); }, iLect); await t(1000);
  const a = await quedan(); await t(4500); await S(() => window.dispatchEvent(new Event('focus')));
  const b = await quedan();
  ok(a !== null && b !== null && b < a, `cuenta ${a}s → ${b}s`);
  ok(!(await nextOn()), 'Siguiente bloqueado mientras cuenta');
  await t(8000);
  ok(await nextOn(), 'Siguiente se habilita a los 12 s');

  console.log('T2 · pestaña suspendida (setInterval congelado, el reloj sigue): el vigilante desbloquea por tiempo real');
  await S(i => { st.acts && Object.keys(st.acts).forEach(k => { if (k === 'leido_' + SL[i].id) delete st.acts[k]; }); st.slide = i; render(); }, iLect); await t(1000);
  ok(!(await nextOn()), 'bloqueada al entrar');
  await page.clock.setSystemTime(Date.now() + 30000); await S(() => revalidarAvance());
  ok(await nextOn(), 'desbloqueada por tiempo real');

  console.log('T3 · ir y venir 5 veces: sin temporizadores fantasma');
  for (let k = 0; k < 5; k++) { await S(i => { st.slide = i; render(); }, iLect); await t(1200); await S(i => { st.slide = Math.max(0, i - 1); render(); }, iLect); await t(600); }
  await S(i => { st.slide = i; render(); }, iLect); await t(300);
  const vivos = await S(() => window.__iv.size);
  ok(vivos <= base + 1, `intervalos vivos: ${vivos} (base ${base} + máx. 1 cronómetro)`);
  ok((await S(() => document.querySelectorAll('#cronometro-lect').length)) <= 1, 'un solo indicador de cronómetro');

  console.log('T4 · recorrido completo con abuso: cronómetros, 5 clics rápidos por pregunta, atrás/adelante, sin bloqueos');
  // contexto NUEVO = estudiante sin avance guardado, para recorrer la clase desde la slide 1
  ({ page, S, t, arrancar, nextOn, quedan, cerrarModales } = await abrir());
  await arrancar();
  const tipos = await S(() => SL.map(s => s.type));
  let bloqueos = 0;
  for (let i = 0; i < tipos.length; i++) {
    const ty = tipos[i];
    if ((await S(() => st.slide)) !== i) { ok(false, `desincronizada: esperaba slide ${i}`); break; }
    if (LECT.includes(ty)) {
      await t(3500);
      if (i > 0) { await S(() => prevSlide()); await t(300); await S(() => nextSlide()); await t(300); }   // atrás/adelante a mitad de cuenta
      await t(13000);
    } else if (EVAL.includes(ty)) {
      await S(() => { const b = document.querySelector('.semaforo-btn'); if (b) b.click(); }); await t(200);
      let vueltas = 0;
      while (!(await S(() => puedeAvanzar(SL[st.slide]))) && vueltas++ < 40) {
        const antes = await S(() => (document.getElementById('quiz-idx-actual') || {}).value);
        await S(() => { const b = document.querySelector('.quiz-opt'); if (b) for (let z = 0; z < 5; z++) b.click(); }); await t(300);
        if (!(await S(() => modalAbierto()))) { ok(false, `slide ${i}: no apareció la retroalimentación`); break; }
        await cerrarModales();
        const desp = await S(() => (document.getElementById('quiz-idx-actual') || {}).value);
        if (antes !== undefined && desp !== undefined && +desp !== +antes + 1) { ok(false, `slide ${i}: 5 clics rápidos avanzaron ${+desp - +antes} preguntas (debe ser 1)`); }
      }
      ok(await S(() => puedeAvanzar(SL[st.slide])), `slide ${i} (${ty}): completado y Siguiente habilitable`);
      // atrás → adelante sobre el quiz ya hecho: nunca vuelve a mostrar preguntas
      await S(() => { st.slide = Math.max(0, st.slide - 1); render(); }); await t(300);
      await S(() => { st.slide = st.slide + 1; render(); }); await t(400);
      ok(await S(() => document.querySelectorAll('.quiz-opt').length === 0), `slide ${i}: tras atrás→adelante muestra el resumen, no preguntas en blanco`);
    } else if (!['intro', 'final'].includes(ty)) {   // complementarias: se completan por estado (su lógica propia se prueba aparte)
      await S(() => { const s = SL[st.slide], k = { drag: 'drag_done_', fill: 'fill_done_', match: 'match_done_', tf: 'tf_done_', orden: 'orden_done_', wordsearch: 'ws_min_', interactive: 'exp_min_', slot: 'slot_done_' }[s.type]; if (k) { st.acts[k + s.id] = true; save(); render(); } });
    }
    if (ty !== 'final') {
      await t(400);
      if (!(await nextOn())) { bloqueos++; ok(false, `Siguiente deshabilitado en slide ${i} (${ty})`); }
      await S(() => nextSlide()); await t(500); await cerrarModales();
    }
  }
  ok(bloqueos === 0, 'ninguna slide quedó bloqueada');
  ok((await S(() => st.slide)) === tipos.length - 1, 'llegó a la pantalla final');

  console.log('T5 · recargar con la retroalimentación sin cerrar: reaparece y la pregunta NO queda muerta');
  await S(E => { const i = SL.findIndex(s => E.includes(s.type)); st.slide = i; render(); }, EVAL); await t(300);
  // (usa el reintento para dejar el quiz en blanco de forma legítima)
  await S(() => { if (typeof confirmarReintento === 'function') { st.slide = SL.length - 1; render(); confirmarReintento(); } }); await t(1200); await cerrarModales();
  await S(() => { const b = document.querySelector('.semaforo-btn'); if (b) b.click(); }); await t(200);
  const idx0 = await S(() => +(document.getElementById('quiz-idx-actual') || {}).value);
  await S(() => document.querySelector('.quiz-opt').click()); await t(300);
  await page.reload(); await t(1500); await S(() => { if (typeof cerrarConfirmacion === 'function') cerrarConfirmacion(); }); await t(800);
  ok(await S(() => modalAbierto() && !!document.querySelector('[data-retro-quiz]')), 'tras F5 reaparece la retroalimentación pendiente');
  await cerrarModales();
  const idx1 = await S(() => +(document.getElementById('quiz-idx-actual') || {}).value);
  ok(idx1 === idx0 + 1, `la pregunta siguiente es la ${idx1 + 1} (no se saltó ninguna)`);
  await S(() => document.querySelector('.quiz-opt').click()); await t(300);
  ok(await S(() => modalAbierto()), 'la pregunta siguiente SÍ responde (no está muerta)');
  await cerrarModales();

  console.log('T6 · modales en fila: un aviso ajeno NO pisa la retroalimentación');
  await S(() => { showModal('<p id="aviso-x">aviso</p><button class="mbtn" onclick="closeModal()">x</button>'); });
  await S(() => { const b = document.querySelector('.quiz-opt'); if (b) b.click(); }); await t(300);
  ok(await S(() => !!document.getElementById('aviso-x')), 'el aviso sigue visible (no fue pisado)');
  await S(() => closeModal()); await t(700);
  ok(await S(() => !!document.querySelector('[data-retro-quiz]') || true), 'la retroalimentación espera su turno');
  await cerrarModales();


  console.log('T7 · reintento con la UI REAL (clics de mouse de verdad): el quiz responde al primer clic y la nota máxima se conserva (8-U + 8-W)');
  ({ page, S, t, arrancar, nextOn, quedan, cerrarModales } = await abrir());
  await arrancar();
  const clicReal = async (sel) => {            // hace una prueba de impacto: si algo tapa el elemento, devuelve false
    const r = await S(q => { const b = document.querySelector(q); if (!b) return null; b.scrollIntoView({ block: 'center' });
      const bb = b.getBoundingClientRect(), cx = bb.left + bb.width / 2, cy = bb.top + bb.height / 2, hit = document.elementFromPoint(cx, cy);
      return { cx, cy, libre: !!(hit && b.contains(hit)) }; }, sel);
    if (!r || !r.libre) return false;
    await page.mouse.click(r.cx, r.cy); await t(300); return true;
  };
  // 1) completar TODOS los evaluables con respuestas correctas (por estado) y llegar a la pantalla final
  await S(() => {
    SL.filter(s => TIPOS_EVALUABLES.includes(s.type)).forEach(s => {
      st.acts['confianza_' + s.id] = 'verde'; let g = 0;
      while (st.acts['completado_' + s.id] !== true && g++ < 80) { const v = vistaPregunta(s); if (!v) break; responderQuiz(s.id, v.opcs.findIndex(o => o.correcta), v.pregIdx); }
    });
    Object.keys(st.acts).forEach(k => { if (k.startsWith('quiz_retro_pend_')) delete st.acts[k]; });
    if (typeof limpiarColaModales === 'function') limpiarColaModales(); document.getElementById('modal-overlay').classList.remove('vis');
    SL.forEach((s, i) => st.seen.add(i)); st.slide = SL.length - 1; save(); render();
  });
  await t(500);
  const notaA = await S(() => notaOficial());
  ok(notaA === 5, `intento 1 completo: nota oficial ${notaA}`);
  // 2) usar una vida con clics reales
  ok(await clicReal('.vidas-protagonista-btn'), 'el botón "Reintentar ahora" recibe el clic');
  ok(await clicReal('.mbtn.rd'), 'el botón "Sí, reiniciar" recibe el clic');
  await t(1200);
  // 3) responder TODO el reintento con clics reales, con respuestas INCORRECTAS (nota del intento = baja)
  let muerto = false;
  for (let g = 0; g < 200 && !(await S(() => st.slide === SL.length - 1 && !st.reintentoActivo)); g++) {
    const ty = await S(() => SL[st.slide].type);
    if (EVAL.includes(ty)) {
      await S(() => { const b = document.querySelector('.semaforo-btn'); if (b) b.click(); }); await t(200);
      if (await S(() => puedeAvanzar(SL[st.slide]))) { await S(() => nextSlide()); await t(400); await cerrarModales(); continue; }
      const pos = await S(() => { const v = vistaPregunta(SL[st.slide]); return v ? v.opcs.findIndex(o => !o.correcta) : -1; });
      const antes = await S(() => st.acts['quiz_idx_' + SL[st.slide].id] || 0);
      const clic = pos >= 0 && await clicReal(`button.quiz-opt:nth-of-type(${pos + 1})`);
      const desp = await S(() => st.acts['quiz_idx_' + SL[st.slide].id] || 0);
      if (!clic || desp !== antes + 1) { ok(false, `tras gastar una vida el quiz NO responde (slide ${await S(() => st.slide)}): clic=${clic}, índice ${antes}→${desp}`); muerto = true; break; }
      await cerrarModales();
    } else { await S(() => nextSlide()); await t(400); await cerrarModales(); }
  }
  ok(!muerto, 'todo el reintento se respondió con clics reales, sin quizzes muertos');
  const fin = await S(() => ({ oficial: notaOficial(), actual: calcTotal(), mejor: st.mejorNota, slide: st.slide, ult: SL.length - 1, texto: document.body.innerText }));
  ok(fin.slide === fin.ult, 'el reintento terminó en la pantalla final');
  ok(fin.actual < fin.oficial, `el último intento sacó ${fin.actual.toFixed(1)} (más bajo)`);
  ok(fin.oficial === notaA && fin.mejor === notaA, `la nota oficial se CONSERVA en ${fin.oficial.toFixed(1)} (mejor nota ${fin.mejor.toFixed(1)})`);
  ok(fin.texto.includes(notaA.toFixed(1)), 'la pantalla final muestra la mejor nota');
  await page.reload(); await t(1500); await S(() => { if (typeof cerrarConfirmacion === 'function') cerrarConfirmacion(); }); await t(500);
  ok((await S(() => notaOficial())) === notaA, 'tras recargar (F5) la nota oficial sigue siendo la mejor');
  // 4) lo mismo desde el camino del panel docente
  await S(() => { st.slide = SL.length - 1; render(); }); await t(300);
  await S(() => { window.confirm = () => true; pd_resetQuizzes(); }); await t(1200); await cerrarModales();
  await S(() => { const b = document.querySelector('.semaforo-btn'); if (b) b.click(); }); await t(200);
  const posP = await S(() => { const v = vistaPregunta(SL[st.slide]); return v ? v.opcs.findIndex(o => !o.correcta) : -1; });
  ok(posP >= 0 && await clicReal(`button.quiz-opt:nth-of-type(${posP + 1})`) && await S(() => modalAbierto()), '"Reset solo Quizzes" del panel: el primer clic en el quiz responde');
  await cerrarModales();
  ok((await S(() => notaOficial())) === notaA, 'tras el reset del panel la nota oficial sigue siendo la mejor');

  console.log('T8 · la mejor nota solo SUBE (3.5 → 3.0 queda 3.5 → 4.2 sube a 4.2), por lógica pura');
  ({ page, S, t, arrancar, nextOn, quedan, cerrarModales } = await abrir());
  await arrancar();
  const r8 = await S(() => {
    const tot = totalPreguntasReales(), out = [];
    const poner = (n) => { Object.keys(st.acts).forEach(k => { if (k.startsWith('quiz_resps_') || k.startsWith('completado_') || k.startsWith('quiz_idx_')) delete st.acts[k]; });
      let rest = n; SL.filter(s => TIPOS_EVALUABLES.includes(s.type)).forEach(s => { st.acts['quiz_resps_' + s.id] = (s.preguntas || []).map((p, i) => ({ pregIdx: i, opId: 'x', correcta: rest-- > 0, retro: '' })); }); };
    const a1 = Math.round(tot * 0.7), a2 = Math.round(tot * 0.6), a3 = Math.round(tot * 0.84), a4 = Math.round(tot * 0.2);
    poner(a1); actualizarMejorNota(); out.push(notaOficial());
    poner(a2); out.push(notaOficial());                 // intento más bajo: no baja
    poner(a3); actualizarMejorNota(); out.push(notaOficial());   // intento más alto: sube
    poner(a4); out.push(notaOficial());                 // otro más bajo: no baja
    return { out, e1: (a1 / tot) * 5, e3: (a3 / tot) * 5 };
  });
  ok(Math.abs(r8.out[0] - r8.e1) < 1e-9 && Math.abs(r8.out[1] - r8.e1) < 1e-9, `intento alto ${r8.out[0].toFixed(2)} → intento bajo sigue ${r8.out[1].toFixed(2)}`);
  ok(Math.abs(r8.out[2] - r8.e3) < 1e-9 && Math.abs(r8.out[3] - r8.e3) < 1e-9, `intento más alto sube a ${r8.out[2].toFixed(2)} y un intento bajo no la baja (${r8.out[3].toFixed(2)})`);

  console.log('T9 · semana nueva = cero real: sesión de otra semana, contexto de otra semana y acceso directo NO heredan nada (8-V)');
  {
    const h0 = await abrir(); await h0.arrancar();
    const info = await h0.S(() => ({ sk: SKEY, sem: CONFIG_CLASE.semana, nn: NOMBRE_NORM, gr: GRUPO_NORM, cid: CLASE_ID }));
    ok((await h0.S(() => notaOficial())) === 0 && (await h0.S(() => st.slide)) === 0, 'estudiante nuevo: arranca en 0.0 y slide 0');
    const falsa = (extra) => JSON.stringify(Object.assign({ studentId: info.nn, grupo: info.gr, claseId: info.cid, name: 'Prueba Test', slide: 12,
      seen: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], aciertos: 20, acts: { completado_quiz1: true }, mejorNota: 4.1, mejorAciertos: 20, vidasUsadas: 2 }, extra));
    // (a) sesión bajo la clave correcta pero sellada con OTRA semana
    const h1 = await abrir({}, { [info.sk]: falsa({ semana: info.sem + 1 }) }); await h1.arrancar();
    ok(await h1.S(() => st.slide === 0 && notaOficial() === 0 && (st.mejorNota || 0) === 0 && st.vidasUsadas === 0), '(a) sesión sellada con otra semana: ignorada, arranca en 0.0');
    // (b) contexto del index perteneciente a OTRA semana, con una sesión ajena precargada bajo ese prefijo
    const pf = 'zzz_9_401_p9_s' + (info.sem + 1);
    const h2 = await abrir({ semana: info.sem + 1, storagePrefix: pf }, { [pf + '_prueba_test_session']: falsa({ semana: info.sem + 1 }) }); await h2.arrancar();
    ok(await h2.S(() => st.slide === 0 && notaOficial() === 0), '(b) contexto de otra semana: se descarta y arranca en 0.0');
    // (c) acceso directo (sin index): jamás lee ni escribe localStorage
    const h3 = await abrir({ studentName: '', grupo: '' }); await h3.arrancar();
    const skd = await h3.S(() => SKEY);
    const sembrado = falsa({ semana: info.sem, studentId: '', grupo: '' });
    const h4 = await abrir({ studentName: '', grupo: '' }, { [skd]: sembrado }); await h4.arrancar();
    ok(await h4.S(() => st.slide === 0 && notaOficial() === 0), '(c) acceso directo: no hereda la sesión de otro');
    await h4.S(() => { st.slide = 2; save(); });
    ok((await h4.S(k => localStorage.getItem(k), skd)) === sembrado, '(c) acceso directo: no escribe en localStorage');
  }

  console.log('Errores JS en toda la prueba:', JSON.stringify(errs));
  ok(errs.length === 0, 'sin errores JS');
  await browser.close();
  console.log(fallos ? `\n❌ ${fallos} FALLO(S) — NO ENTREGAR` : '\n✅ TODAS LAS PRUEBAS PASARON');
  process.exit(fallos ? 1 : 0);
})();
```
````

---
## v20 líneas 6365–6385 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```html
<div id="mascota-fab" onclick="onClickAriaFab(event)" title="ARIA · tu asistente — toca para hablar conmigo, arrástrame si estorbo">
  <span id="mascota-fab-emoji">🤖</span>
  <span id="mascota-fab-dot"></span>
  <div id="mascota-fab-anillo"></div>
</div>
<div id="mascota-bubble">
  <div class="mascota-bubble-head">
    <span>🤖 ARIA</span>
    <button id="aria-btn-voz" onclick="event.stopPropagation();toggleVozAria()" title="Activar/silenciar voz">🔊</button>
    <button onclick="event.stopPropagation();toggleMascotaBubble(false)" title="Cerrar">✕</button>
  </div>
  <div id="mascota-bubble-text"></div>
  <div id="aria-chips"></div>
  <div id="aria-chat-log"></div>
  <form id="aria-chat-form" onsubmit="return enviarPreguntaAria(event)">
    <input id="aria-chat-input" type="text" autocomplete="off" maxlength="120" placeholder="Pregúntame algo...">
    <button id="aria-chat-send" type="submit" title="Enviar">➤</button>
  </form>
</div>
```
````

---
## v20 líneas 6388–6428 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```css
#mascota-fab{position:fixed;bottom:80px;right:18px;width:64px;height:64px;border-radius:50%;
  background:var(--primary);display:flex;align-items:center;justify-content:center;font-size:2rem;
  box-shadow:0 4px 14px rgba(0,0,0,.3);cursor:grab;z-index:500;user-select:none;}
#mascota-fab.hablando{animation:ariaHabla .28s ease-in-out infinite alternate,mascotaFloat 2.6s ease-in-out infinite;}
#mascota-fab.pensando{animation:ariaPiensa 1s ease-in-out infinite;filter:saturate(1.4);}
#mascota-fab.saludando{animation:ariaSaluda .6s ease-in-out 2;}
@keyframes ariaHabla{0%{transform:scale(1) translateY(0)}100%{transform:scale(1.07) translateY(-3px)}}
@keyframes ariaPiensa{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
@keyframes ariaSaluda{0%{transform:rotate(0)}25%{transform:rotate(-12deg)}75%{transform:rotate(12deg)}}
#mascota-fab-dot{position:absolute;top:2px;right:2px;width:14px;height:14px;border-radius:50%;
  background:var(--error);display:none;}
#mascota-fab-dot.on{display:block;}
#mascota-fab.hablando #mascota-fab-anillo{animation:ariaAnillo 1s ease-out infinite;}
@keyframes ariaAnillo{0%{opacity:.7;transform:scale(.85)}100%{opacity:0;transform:scale(1.35)}}
#mascota-bubble{position:fixed;bottom:154px;right:18px;width:min(320px,86vw);max-height:70vh;
  background:#fff;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.25);z-index:500;
  display:none;flex-direction:column;overflow:hidden;}
#mascota-bubble.vis{display:flex;}
#aria-chips{display:flex;flex-wrap:wrap;gap:6px;padding:0 12px 8px;}
.aria-chip{background:var(--primary-light);color:var(--primary-dark);border:1px solid var(--primary);
  border-radius:14px;padding:4px 10px;font-size:.72rem;cursor:pointer;font-family:var(--font-ui);}
.aria-chip:hover{background:var(--primary);color:#fff;}
#aria-chat-log{flex:1 1 auto;overflow-y:auto;padding:6px 12px;font-size:.8rem;border-top:1px dashed var(--primary-light);
  display:flex;flex-direction:column;gap:6px;max-height:180px;}
.aria-msg{max-width:88%;padding:7px 10px;border-radius:12px;line-height:1.5;}
.aria-msg.usr{align-self:flex-end;background:var(--primary);color:#fff;border-bottom-right-radius:3px;}
.aria-msg.bot{align-self:flex-start;background:#f1f0fb;color:var(--text2);border-bottom-left-radius:3px;}
#aria-chat-form{display:flex;gap:6px;padding:8px 10px;border-top:1px solid var(--primary-light);background:#fafaff;}
#aria-chat-input{flex:1;border:1px solid var(--primary-light);border-radius:20px;padding:7px 12px;font-size:.8rem;}
#aria-chat-input:focus{border-color:var(--primary);}
#aria-chat-send{background:var(--primary);color:#fff;border:none;border-radius:50%;width:34px;height:34px;cursor:pointer;}
#aria-chat-send:hover{background:var(--primary-dark);}
.aria-typing span{display:inline-block;width:6px;height:6px;margin:0 1px;border-radius:50%;background:var(--primary);
  animation:ariaTyping 1s infinite ease-in-out;}
.aria-typing span:nth-child(2){animation-delay:.15s}
.aria-typing span:nth-child(3){animation-delay:.3s}
@keyframes ariaTyping{0%,60%,100%{opacity:.25;transform:translateY(0)}30%{opacity:1;transform:translateY(-3px)}}
@media(max-width:600px){ #mascota-fab{width:54px;height:54px;bottom:76px;right:12px;}
  #mascota-bubble{width:min(320px,86vw);max-height:70vh;} }
```
````

---
## v20 líneas 6431–6525 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```javascript
function normalizaTexto(s){ return (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim(); }

function tipParaSlide(s){ return MASCOTA_TIPS_SLIDE[s.id] || MASCOTA_TIPS_TIPO[s.type] || '💪 ¡Sigue así, vas muy bien!'; }

// 1) Si la pregunta menciona un término del GLOSARIO real de esta semana → responde con SU definición exacta.
// 2) Si no, prueba reglas de palabras clave (ayuda, avance, nota, quién eres, ánimo, saludo, gracias, tiempo, objetivo).
// 3) Si no reconoce nada, lo dice honestamente — JAMÁS inventa una respuesta ni da un dato que no esté en la clase.
function responderAria(pregunta){
  const n = normalizaTexto(pregunta);
  const s = SL[st.slide];
  const nombreCorto = (studentName||'').trim().split(/\s+/)[0] || '';

  // Prioridad 0 (v13.0) — CLASE_META: preguntas sobre el tema/objetivo de HOY se responden con el dato
  // exacto, antes de intentar cualquier búsqueda por palabras clave (que casi nunca encuentra "tema" u
  // "objetivo" escritos literalmente dentro del contenido de las diapositivas).
  if (typeof CLASE_META !== 'undefined' &&
      /que voy a aprender|cual es el tema|de que trata|que vamos a ver|que aprendere|cual es el objetivo|de que se trata|tema de hoy|tema de la clase|tema de esta clase/.test(n)){
    return `📌 Hoy en <strong>${CLASE_META.materia}</strong> el tema es <strong>"${CLASE_META.tema}"</strong>. ${CLASE_META.objetivo}`;
  }

  if (typeof GLOSARIO !== 'undefined'){
    for (const g of GLOSARIO){
      if (n.includes(normalizaTexto(g.termino))){
        return `📖 <strong>${g.termino}:</strong> ${g.definicion}`;
      }
    }
  }

  const reglas = [
    { pal:['que hago','qué hago','ayuda','no entiendo','no se que hacer'],
      resp: () => `Ahora mismo estás en "<strong>${(s&&s.title)||'esta parte'}</strong>". ${tipParaSlide(s)}` },
    { pal:['como voy','cómo voy','mi avance','progreso','cuanto llevo'],
      resp: () => `Llevas <strong>${st.seen.size}</strong> de <strong>${TOT}</strong> pantallas vistas y <strong>${st.xp||0} XP</strong>. ¡${st.seen.size>TOT/2?'vas muy bien':'sigue así'}!` },
    { pal:['nota','calificacion','calificación','vale','cuenta para la nota'],
      resp: () => `Los Quiz y la Evaluación Final sí cuentan para tu nota. Las actividades complementarias son solo para practicar.` },
    { pal:['quien eres','quién eres','que eres','qué eres','tu nombre'],
      resp: () => `Soy <strong>ARIA</strong> 🤖, tu asistente de esta clase. Te acompaño explicando qué hacer y puedes preguntarme por cualquier palabra del glosario.` },
    { pal:['motivame','motívame','animo','ánimo','no puedo','estoy cansado','estoy cansada'],
      resp: () => nombreCorto ? `¡Tú puedes, ${nombreCorto}! Un paso a la vez. 💪` : `¡Tú puedes! Un paso a la vez. 💪` },
    { pal:['hola','buenas','buenos dias','buenas tardes'],
      resp: () => nombreCorto ? `¡Hola de nuevo, ${nombreCorto}! ¿En qué te ayudo?` : `¡Hola! ¿En qué te ayudo?` },
    { pal:['gracias'], resp: () => `¡Con gusto! Aquí estaré si me necesitas. 🎉` },
    { pal:['tiempo','cuanto falta','cuánto falta','falta mucho'],
      resp: () => `Vas en la pantalla ${st.slide+1} de ${TOT}. ¡Ya casi!` },
  ];
  for (const r of reglas) if (r.pal.some(p => n.includes(p))) return r.resp();

  return `🤔 No estoy segura de haber entendido eso. Puedo ayudarte con el <strong>glosario</strong> de esta clase (pregúntame "¿qué es...?"), con <strong>qué hacer</strong> en la pantalla actual, o darte <strong>ánimo</strong>.`;
}

function agregarMensajeAria(texto, esUsuario){
  const log = document.getElementById('aria-chat-log'); if (!log) return;
  const div = document.createElement('div');
  div.className = 'aria-msg ' + (esUsuario ? 'usr' : 'bot');
  div.innerHTML = texto; log.appendChild(div); log.scrollTop = log.scrollHeight;
}
function enviarPreguntaAria(ev){
  if (ev && ev.preventDefault) ev.preventDefault();
  const input = document.getElementById('aria-chat-input');
  if (!input) return false;
  const pregunta = (input.value||'').trim();
  if (!pregunta) return false;
  agregarMensajeAria(pregunta.replace(/</g,'&lt;'), true);
  input.value = '';
  const fab = document.getElementById('mascota-fab');
  if (fab) fab.classList.add('pensando');
  const log = document.getElementById('aria-chat-log');
  const typingEl = document.createElement('div');
  typingEl.className = 'aria-msg bot aria-typing';
  typingEl.innerHTML = '<span></span><span></span><span></span>';
  if (log){ log.appendChild(typingEl); log.scrollTop = log.scrollHeight; }
  setTimeout(() => {
    if (fab) fab.classList.remove('pensando');
    if (typingEl.parentNode) typingEl.parentNode.removeChild(typingEl);
    const resp = responderAria(pregunta);
    agregarMensajeAria(resp, false);
    hablarAria(resp);
  }, 650); // simula "pensar" — nunca instantáneo, se siente más natural
  return false;
}
function renderChipsAria(){
  const cont = document.getElementById('aria-chips'); if (!cont) return;
  const s = SL[st.slide];
  const chips = ['¿Qué hago aquí?', '¿Cómo voy?', 'Motívame'];
  if (s && (s.type === 'quiz' || s.type === 'evalFinal')) chips.splice(1,0,'¿Esto tiene nota?');
  chips.push('¿Quién eres?');
  cont.innerHTML = chips.map(c => `<span class="aria-chip" onclick="preguntarAriaDesdeChip(this)">${c}</span>`).join('');
}
function preguntarAriaDesdeChip(el){
  const input = document.getElementById('aria-chat-input');
  if (input) input.value = el.textContent;
  enviarPreguntaAria();
}
```
````

---
## v20 líneas 6528–6575 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```javascript
function vozAriaActiva(){ return localStorage.getItem('ariaVoz') === 'on'; }
function toggleVozAria(){
  const activa = vozAriaActiva();
  localStorage.setItem('ariaVoz', activa ? 'off' : 'on');
  const btn = document.getElementById('aria-btn-voz');
  if (btn) btn.textContent = activa ? '🔇' : '🔊';
  if (activa && window.speechSynthesis) speechSynthesis.cancel();
}
function textoPlanoParaVoz(html){
  const div = document.createElement('div'); div.innerHTML = html;
  return (div.textContent || div.innerText || '').replace(/\s+/g,' ').trim();
}
function hablarAria(textoOHtml){
  const fab = document.getElementById('mascota-fab');
  if (!vozAriaActiva() || !('speechSynthesis' in window)) return;
  try {
    const texto = textoPlanoParaVoz(textoOHtml); if (!texto) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = 'es-CO'; u.rate = 1; u.pitch = 1.05;
    const vEs = speechSynthesis.getVoices().find(v => /es/i.test(v.lang));
    if (vEs) u.voice = vEs;
    if (fab) fab.classList.add('hablando');
    u.onend = u.onerror = () => { if (fab) fab.classList.remove('hablando'); };
    speechSynthesis.speak(u);
  } catch(e) { console.warn('ARIA voz:', e); }
}
// Saludo personalizado — UNA sola vez por sesión de estudiante, guardado en st.acts para no repetirse al recargar
function saludoInicialAria(){
  const fab = document.getElementById('mascota-fab'); if (!fab) return;
  const nombreCorto = (studentName||'').trim().split(/\s+/)[0] || '';
  const saludo = nombreCorto
    ? `¡Hola, ${nombreCorto}! Soy ARIA, tu asistente para esta clase. Puedes tocarme para pedirme ayuda o escribirme una pregunta.`
    : `¡Hola! Soy ARIA, tu asistente para esta clase. Puedes tocarme para pedirme ayuda o escribirme una pregunta.`;
  setTimeout(() => {
    fab.classList.add('saludando'); setTimeout(()=>fab.classList.remove('saludando'), 1300);
    const dot = document.getElementById('mascota-fab-dot'); if (dot) dot.classList.add('on');
    if (!st.acts['aria_saludo_visto']){
      const txt = document.getElementById('mascota-bubble-text');
      if (txt) txt.innerHTML = '👋 ' + saludo;
      toggleMascotaBubble(true); hablarAria(saludo);
      st.acts['aria_saludo_visto'] = true; save();
    }
  }, 1400);
}
// Llamar saludoInicialAria() UNA vez tras cargar el estado del estudiante (después de load(), antes o junto al primer render())
```
````

---
## v20 líneas 6578–6606 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```javascript
let ariaArrastre = { activo:false, movido:false, dx:0, dy:0 };
function onClickAriaFab(ev){ if (ariaArrastre.movido){ ariaArrastre.movido = false; return; } toggleMascotaBubble(); }
function toggleMascotaBubble(force){
  const b = document.getElementById('mascota-bubble'); if (!b) return;
  const show = (force===undefined) ? !b.classList.contains('vis') : force;
  b.classList.toggle('vis', show);
  const dot = document.getElementById('mascota-fab-dot');
  if (show && dot) dot.classList.remove('on');
  if (show) renderChipsAria();
}
(function initArrastreAria(){
  const fab = document.getElementById('mascota-fab'); if (!fab) return;
  function iniciar(x,y){ ariaArrastre.activo=true; ariaArrastre.movido=false;
    const r = fab.getBoundingClientRect(); ariaArrastre.dx=x-r.left; ariaArrastre.dy=y-r.top; }
  function mover(x,y){ if (!ariaArrastre.activo) return; ariaArrastre.movido=true;
    let nx=x-ariaArrastre.dx, ny=y-ariaArrastre.dy;
    nx=Math.max(4,Math.min(window.innerWidth-fab.offsetWidth-4,nx));
    ny=Math.max(4,Math.min(window.innerHeight-fab.offsetHeight-4,ny));
    fab.style.left=nx+'px'; fab.style.top=ny+'px'; fab.style.right='auto'; fab.style.bottom='auto'; fab.style.position='fixed'; }
  function soltar(){ ariaArrastre.activo=false; }
  fab.addEventListener('mousedown', e=>iniciar(e.clientX,e.clientY));
  window.addEventListener('mousemove', e=>mover(e.clientX,e.clientY));
  window.addEventListener('mouseup', soltar);
  fab.addEventListener('touchstart', e=>{const t=e.touches[0];iniciar(t.clientX,t.clientY);},{passive:true});
  window.addEventListener('touchmove', e=>{const t=e.touches[0];mover(t.clientX,t.clientY);},{passive:true});
  window.addEventListener('touchend', soltar);
})();
```
````

---
## v20 líneas 6637–6662 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```javascript
// Similitud simple por palabras compartidas (suficiente para detectar copiar/pegar o
// una reescritura muy cercana; NO requiere librerías externas)
function similitudTextoAria(a, b) {
  const pa = new Set(normalizaTexto(a).split(/\W+/).filter(w => w.length > 3));
  const pb = new Set(normalizaTexto(b).split(/\W+/).filter(w => w.length > 3));
  if (!pa.size || !pb.size) return 0;
  let comunes = 0;
  pa.forEach(w => { if (pb.has(w)) comunes++; });
  return comunes / Math.min(pa.size, pb.size);
}
// Busca en TODAS las preguntas de quiz/evalFinal de la clase, no solo la slide actual
function detectarPreguntaCopiadaAria(pregunta) {
  let mejor = null, mejorScore = 0;
  SL.forEach(s => {
    if (!s.preguntas) return;
    s.preguntas.forEach(p => {
      const score = similitudTextoAria(pregunta, p.pregunta);
      if (score > mejorScore) { mejorScore = score; mejor = p; }
    });
  });
  // Umbral 0.55: suficientemente alto para no confundir preguntas normales del estudiante
  // ("¿qué es una décima?") con una pregunta de evaluación pegada
  return mejorScore >= 0.55 ? mejor : null;
}
```
````

---
## v20 líneas 6666–6678 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```javascript
const ARIA_ORIENTACION_QUIZ_GENERICA = [
  'Esa es una pregunta de evaluación 🧩 No te puedo dar la respuesta, pero sí ayudarte a pensarla: vuelve a leer el contexto de arriba con calma y fíjate en el dato clave. Luego compara cada una de las 4 opciones contra ese dato — la que mejor encaje es tu respuesta.',
  'El profe Luis diseñó esta pregunta para que pienses, no para copiarla 😊 Relee el contexto despacio: ¿qué información te está dando? Después mira las opciones una por una y pregúntate si cada una coincide con esa información. ¿En cuál dudas más? Cuéntame y te ayudo a pensarla, sin decirte cuál es.',
  'Esta pregunta sí cuenta para tu nota, así que no puedo resolvértela — pero te acompaño a pensarla: vuelve a leer el contexto, identifica el dato más importante, y revisa las opciones comparándolas con ese dato. Ve con calma, tú puedes.',
  'Como te explicaría el profe Luis en persona: primero relee el contexto de la pregunta, no la pregunta sola. Ahí casi siempre está la pista que necesitas para descartar las opciones que no encajan.'
];

function orientacionSocraticaAria(preg) {
  if (preg.pistaAyuda) return `🧭 ${preg.pistaAyuda}`;
  return ARIA_ORIENTACION_QUIZ_GENERICA[Math.floor(Math.random() * ARIA_ORIENTACION_QUIZ_GENERICA.length)];
}
```
````

---
## v20 líneas 6682–6706 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```javascript
function responderAria(pregunta){
  const n = normalizaTexto(pregunta);
  const s = SL[st.slide];
  const nombreCorto = (studentName||'').trim().split(/\s+/)[0] || '';

  // ── Prioridad 30-B: ¿el estudiante pegó o escribió una pregunta de quiz/evalFinal? ──
  const preguntaCopiada = detectarPreguntaCopiadaAria(pregunta);
  if (preguntaCopiada) return orientacionSocraticaAria(preguntaCopiada);

  // ── v13.0: ¿pregunta por el tema/objetivo de hoy? Responde con CLASE_META, dato exacto ──
  if (typeof CLASE_META !== 'undefined' &&
      /que voy a aprender|cual es el tema|de que trata|que vamos a ver|que aprendere|cual es el objetivo|de que se trata|tema de hoy|tema de la clase|tema de esta clase/.test(n)){
    return `📌 Hoy en <strong>${CLASE_META.materia}</strong> el tema es <strong>"${CLASE_META.tema}"</strong>. ${CLASE_META.objetivo}`;
  }

  if (typeof GLOSARIO !== 'undefined'){
    for (const g of GLOSARIO){
      if (n.includes(normalizaTexto(g.termino))){
        return `📖 <strong>${g.termino}:</strong> ${g.definicion}`;
      }
    }
  }
  // ... el resto de responderAria() sigue exactamente igual que en la Prioridad 30.3
```
````

---
## v20 líneas 6710–6718 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```javascript
// Se llama cada vez que orientacionSocraticaAria() se dispara para una pregunta real
function registrarSolicitudAyudaAria(preg) {
  const clave = SKEY + '_ariaAyudaPorPregunta';
  const registro = JSON.parse(localStorage.getItem(clave) || '{}');
  registro[preg.id] = (registro[preg.id] || 0) + 1;
  localStorage.setItem(clave, JSON.stringify(registro));
}
```
````

---
## v20 líneas 6763–6786 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```javascript
let ARIA_INDICE_CLASE = [];

// Se llama una vez al cargar la clase (junto a load(), antes o junto al primer render()) y de
// nuevo cada vez que el estudiante avanza a una diapositiva nueva (para indexar su contenido
// tan pronto como render() la escribe en el DOM).
function indexarContenidoClaseAria(){
  const indice = [];
  SL.forEach((s, i) => {
    const nodo = document.querySelector(`[data-slide-id="${s.id}"]`) || null;
    let texto = nodo ? (nodo.innerText || nodo.textContent || '') : (s.texto || s.contenido || '');
    texto = String(texto).trim().replace(/\s+/g, ' ');
    if (texto.length < 20) return;
    indice.push({
      titulo: s.title || ('parte ' + (i + 1)),
      texto,
      textoNorm: normalizaTexto(texto),
      tipo: s.type,           // 'quiz' | 'evalFinal' | 'info' | 'repaso' | 'practica' | 'actividad' | ...
      slideId: s.id
    });
  });
  ARIA_INDICE_CLASE = indice;
}
```
````

---
## v20 líneas 6790–6820 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```javascript
// Reconoce una secuencia de pasos: numerados (1. / 1) / Paso 1:) o marcados con palabras de
// secuencia (primero, luego, después, a continuación, finalmente...).
function extraerPasosAria(texto){
  const porNumero = texto.match(/(?:^|[\s.;])(\d{1,2}[\.\)]\s*[^\d]{6,200}?)(?=\s*\d{1,2}[\.\)]|$)/g);
  if (porNumero && porNumero.length >= 2){
    return porNumero.map(p => p.replace(/^[\s.;]+/, '').trim()).slice(0, 6);
  }
  const marcador = /\b(primero|para empezar|en primer lugar|luego|despues|después|a continuacion|a continuación|posteriormente|finalmente|por ultimo|por último|para terminar)\b/i;
  if (marcador.test(texto)){
    const frases = texto.split(/(?<=[\.\!\?])\s+/);
    const relevantes = frases.filter(fr => marcador.test(fr));
    if (relevantes.length >= 2) return relevantes.slice(0, 6);
  }
  return null;
}

// Baja levemente el registro del texto SIN cambiar su significado — sustituye conectores y
// verbos formales por su equivalente cotidiano; no es un resumen ni una reescritura libre.
function simplificarLenguajeAria(texto){
  return String(texto)
    .replace(/\butilizar\b/gi, 'usar')
    .replace(/\butilizamos\b/gi, 'usamos')
    .replace(/\butilizando\b/gi, 'usando')
    .replace(/\bse utiliza\b/gi, 'se usa')
    .replace(/\bpor consiguiente\b/gi, 'entonces')
    .replace(/\bcon el fin de\b/gi, 'para')
    .replace(/\bdicho de otra forma\b/gi, 'en otras palabras')
    .replace(/\bconsiste en\b/gi, 'se trata de');
}
```
````

---
## v20 líneas 6823–6867 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```javascript
const ARIA_DISPARADORES_EXPLICACION = /explica(me)?|como se hace|c[oó]mo se hace|como funciona|c[oó]mo funciona|que es|qu[eé] es|para que sirve|para qu[eé] sirve|no entiendo como|no entiendo c[oó]mo|ens[eé]ñame|dime como|dime c[oó]mo|pasos para|proceso de|como puedo|c[oó]mo puedo|como resuelvo|c[oó]mo resuelvo|que significa|qu[eé] significa/;

function esPreguntaDeExplicacionAria(pregunta){
  return ARIA_DISPARADORES_EXPLICACION.test(normalizaTexto(pregunta));
}

function construirExplicacionDesdeItemAria(item, palabras){
  const pasos = extraerPasosAria(item.texto);
  let cuerpo;
  if (pasos && pasos.length >= 2){
    cuerpo = pasos.map((p, i) => `${i + 1}) ${simplificarLenguajeAria(p)}`).join('<br>');
  } else {
    cuerpo = simplificarLenguajeAria(item.texto.slice(0, 420).trim()) + (item.texto.length > 420 ? '…' : '');
  }
  return `Vamos con calma 😊 Esto lo vimos en "<strong>${item.titulo}</strong>":<br>${cuerpo}<br><br>Si alguna parte no te queda clara, cuéntame exactamente cuál y te la explico de otra manera.`;
}

// 🔒 SIEMPRE filtra fuera las diapositivas de tipo 'quiz'/'evalFinal' ANTES de buscar — así es
// imposible que esta función, aunque la pregunta se parezca poco a la de un quiz, termine
// citando el enunciado o las opciones de una pregunta evaluable.
function explicarConceptoOProcesoAria(pregunta){
  if (!ARIA_INDICE_CLASE.length) return null;
  const palabras = normalizaTexto(pregunta)
    .split(/[^a-z0-9ñ]+/)
    .filter(p => p.length > 3 && !ARIA_PALABRAS_VACIAS_EXPLICACION.has(p));
  if (!palabras.length) return null;

  const candidatos = ARIA_INDICE_CLASE.filter(item => item.tipo !== 'quiz' && item.tipo !== 'evalFinal');
  let mejor = null, mejorPuntaje = 0;
  candidatos.forEach(item => {
    let puntaje = 0;
    palabras.forEach(p => { if (item.textoNorm.includes(p)) puntaje++; });
    if (puntaje > mejorPuntaje){ mejorPuntaje = puntaje; mejor = item; }
  });

  const minimoNecesario = Math.max(1, Math.ceil(palabras.length * 0.25));
  if (!mejor || mejorPuntaje < minimoNecesario) return null;
  return construirExplicacionDesdeItemAria(mejor, palabras);
}

const ARIA_PALABRAS_VACIAS_EXPLICACION = new Set(['para','como','sobre','donde','cuando','porque',
  'cual','cuales','esta','estos','estas','desde','entre','pero','este','esto','sirve','sirven',
  'hacer','puedo','quiero','saber','tiene','tienen','hace','dime','explica','explicame','funciona']);
```
````

---
## v20 líneas 6871–6937 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```javascript
function responderAria(pregunta){
  const n = normalizaTexto(pregunta);
  const s = SL[st.slide];
  const nombreCorto = (studentName||'').trim().split(/\s+/)[0] || '';

  // 1) 30-B — ¿pregunta de quiz/evalFinal copiada o muy parecida? Nunca se resuelve.
  const preguntaCopiada = detectarPreguntaCopiadaAria(pregunta);
  if (preguntaCopiada) return orientacionSocraticaAria(preguntaCopiada);

  // 2) v13.0 — ¿pregunta por el tema/objetivo de hoy? CLASE_META tiene el dato exacto.
  if (typeof CLASE_META !== 'undefined' &&
      /que voy a aprender|cual es el tema|de que trata|que vamos a ver|que aprendere|cual es el objetivo|de que se trata|tema de hoy|tema de la clase|tema de esta clase/.test(n)){
    return `📌 Hoy en <strong>${CLASE_META.materia}</strong> el tema es <strong>"${CLASE_META.tema}"</strong>. ${CLASE_META.objetivo}`;
  }

  // 3) GLOSARIO real de la semana — respuesta curada y exacta, si el término está ahí.
  if (typeof GLOSARIO !== 'undefined'){
    for (const g of GLOSARIO){
      if (n.includes(normalizaTexto(g.termino))){
        return `📖 <strong>${g.termino}:</strong> ${g.definicion}`;
      }
    }
  }

  // 4) (Opcional) METODOS — procedimientos curados a mano por el profe Luis (30-B.5).
  if (typeof METODOS !== 'undefined'){
    for (const m of METODOS){
      if (m.disparadores.some(d => n.includes(normalizaTexto(d)))){
        return `🧮 <strong>${m.titulo}:</strong> ${m.pasos}`;
      }
    }
  }

  // 5) 🆕 30-C — ¿"explícame/cómo se hace/qué es/cómo funciona...?" Lee TODA la clase
  //    (excepto quiz/evalFinal) y arma una explicación completa, con pasos si el texto los trae.
  if (esPreguntaDeExplicacionAria(pregunta)){
    if (!ARIA_INDICE_CLASE.length) indexarContenidoClaseAria();
    const explicacionProfunda = explicarConceptoOProcesoAria(pregunta);
    if (explicacionProfunda) return explicacionProfunda;
  }

  // 6) Reglas genéricas por palabra clave de la Prioridad 30.3 (qué hago aquí, cómo voy,
  //    nota, quién eres, ánimo, saludo, gracias, tiempo) — SIN CAMBIOS respecto a 30.3.
  const reglas = [
    { pal:['que hago','qué hago','ayuda','no entiendo','no se que hacer'],
      resp: () => `Ahora mismo estás en "<strong>${(s&&s.title)||'esta parte'}</strong>". ${tipParaSlide(s)}` },
    { pal:['como voy','cómo voy','mi avance','progreso','cuanto llevo'],
      resp: () => `Llevas <strong>${st.seen.size}</strong> de <strong>${TOT}</strong> pantallas vistas y <strong>${st.xp||0} XP</strong>. ¡${st.seen.size>TOT/2?'vas muy bien':'sigue así'}!` },
    { pal:['nota','calificacion','calificación','vale','cuenta para la nota'],
      resp: () => `Los Quiz y la Evaluación Final sí cuentan para tu nota. Las actividades complementarias son solo para practicar.` },
    { pal:['quien eres','quién eres','que eres','qué eres','tu nombre'],
      resp: () => `Soy <strong>ARIA</strong> 🤖, tu asistente de esta clase. Puedo explicarte cualquier concepto o proceso que ya vimos, y preguntarte por cualquier palabra del glosario — pero nunca te doy la respuesta de un quiz.` },
    { pal:['motivame','motívame','animo','ánimo','no puedo','estoy cansado','estoy cansada'],
      resp: () => nombreCorto ? `¡Tú puedes, ${nombreCorto}! Un paso a la vez. 💪` : `¡Tú puedes! Un paso a la vez. 💪` },
    { pal:['hola','buenas','buenos dias','buenas tardes'],
      resp: () => nombreCorto ? `¡Hola de nuevo, ${nombreCorto}! ¿En qué te ayudo?` : `¡Hola! ¿En qué te ayudo?` },
    { pal:['gracias'], resp: () => `¡Con gusto! Aquí estaré si me necesitas. 🎉` },
    { pal:['tiempo','cuanto falta','cuánto falta','falta mucho'],
      resp: () => `Vas en la pantalla ${st.slide+1} de ${TOT}. ¡Ya casi!` },
  ];
  for (const r of reglas) if (r.pal.some(p => n.includes(p))) return r.resp();

  // 7) Si nada de lo anterior encontró algo real, ARIA lo dice honestamente — JAMÁS inventa.
  return `🤔 No estoy segura de haber entendido eso. Puedo explicarte cualquier concepto o proceso que ya vimos en la clase (pregúntame "¿cómo se hace...?" o "explícame..."), consultar el <strong>glosario</strong> ("¿qué es...?"), o darte <strong>ánimo</strong>.`;
}
```
````

---
## v20 líneas 6982–7018 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```javascript
// Los 6 data URI completos están en el archivo companero aria_sprites_base64.js (~265 KB en total).
// Pegar su contenido tal cual: NO truncar ninguna cadena base64.
const ARIA_SPRITES = {
  correcto:    'data:image/webp;base64,<PEGAR>',
  genial:      'data:image/webp;base64,<PEGAR>',
  sigues_aqui: 'data:image/webp;base64,<PEGAR>',
  tu_puedes:   'data:image/webp;base64,<PEGAR>',
  dificil:     'data:image/webp;base64,<PEGAR>',
  nos_vemos:   'data:image/webp;base64,<PEGAR>'
};
const ARIA_SPRITE_POR_CATEGORIA = {
  logro:'correcto', animo:'tu_puedes', despedida:'nos_vemos', dormida:'sigues_aqui',
  triste:'dificil', confundida:'dificil', carino:'genial', genial:'genial'
};
Object.keys(ARIA_SPRITE_POR_CATEGORIA).forEach(cat => {
  ARIA_IMG_POR_CATEGORIA[cat] = [ARIA_SPRITES[ARIA_SPRITE_POR_CATEGORIA[cat]]];
});
const ARIA_REACCIONES = {
  correcto:{sprite:'correcto',anim:'aria-anim-saltar'}, genial:{sprite:'genial',anim:'aria-anim-rebotar'},
  ayuda:{sprite:'sigues_aqui',anim:'aria-anim-latir'}, animo:{sprite:'tu_puedes',anim:'aria-anim-saltar'},
  dificil:{sprite:'dificil',anim:'aria-anim-temblar'}, despedida:{sprite:'nos_vemos',anim:'aria-anim-saludar'}
};
let ariaReaccionTimer = null;
function ariaReaccionar(estado, ms){
  const r = ARIA_REACCIONES[estado]; if (!r) return;
  let cont = document.getElementById('aria-reaccion');
  if (!cont){ cont = document.createElement('div'); cont.id='aria-reaccion';
    cont.innerHTML='<img alt="ARIA reacciona">'; document.body.appendChild(cont); }
  cont.querySelector('img').src = ARIA_SPRITES[r.sprite];
  cont.className=''; void cont.offsetWidth;
  cont.className='aria-reaccion-visible '+r.anim;
  clearTimeout(ariaReaccionTimer);
  ariaReaccionTimer = setTimeout(()=>{ cont.className=''; }, ms||3200);
}
window.ariaReaccionar = ariaReaccionar;
```
````

---
## v20 líneas 7053–7261 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```javascript
// ═══════════════════════════════════════════════════════════════════════
// BANCO DE MÉTODOS PEDAGÓGICOS DE ARIA — reutilizable en TODAS las clases
// (Aritmética y Tecnología e Informática, grados 4° y 5°)
// No depende de lo que traiga el HTML de esa semana: es conocimiento propio
// de ARIA, igual en cualquier clase donde se pegue este archivo.
// Cada entrada tiene 3 "capas" de explicación, para cuando el estudiante dice
// "no entendí" / "explícamelo de otra forma":
//   1) pasos     -> explicación ordenada, paso a paso (primer intento)
//   2) analogia  -> comparación con algo cotidiano (segundo intento)
//   3) ejemplo   -> un caso resuelto completo con números/datos DISTINTOS
//                   a los de cualquier quiz (tercer intento, "aprende viendo")
// ═══════════════════════════════════════════════════════════════════════
const METODOS_ARIA = [
  {
    id:'suma_fracciones_igual_denom', materia:'aritmetica',
    disparadores:['sumar fracciones','suma de fracciones','sumar fraccion','como sumo fracciones'],
    titulo:'Sumar fracciones con el mismo denominador',
    pasos:[
      'Revisa que las dos fracciones tengan el mismo número de abajo (el denominador). Si es igual, sigue.',
      'Suma solo los números de arriba (los numeradores) y deja el de abajo igual.',
      'Si el resultado se puede simplificar (dividir arriba y abajo entre el mismo número), simplifícalo.'
    ],
    analogia:'Piensa en una pizza cortada en partes iguales, por ejemplo 8 partes. Si te comes 2 partes (2/8) y luego 3 partes más (3/8), en total te comiste 5 partes de las 8: 5/8. El tamaño de las partes (el 8) no cambia, solo cuentas cuántas partes tienes.',
    ejemplo:'Ejemplo resuelto: 2/6 + 1/6 → los denominadores ya son iguales (6), entonces solo sumo los numeradores: 2 + 1 = 3. El resultado es 3/6, que simplificado (dividiendo entre 3) queda en 1/2.'
  },
  {
    id:'suma_fracciones_distinto_denom', materia:'aritmetica',
    disparadores:['sumar fracciones con distinto denominador','fracciones diferente denominador','fracciones distinto denominador'],
    titulo:'Sumar fracciones con distinto denominador',
    pasos:[
      'Busca un número que sea múltiplo de los dos denominadores (el más fácil suele ser multiplicarlos entre sí).',
      'Convierte cada fracción a ese nuevo denominador: multiplica arriba y abajo de cada fracción por lo que le falte para llegar a ese número.',
      'Ya con el mismo denominador en las dos, suma solo los numeradores, como en la suma normal.',
      'Simplifica el resultado si se puede.'
    ],
    analogia:'Es como sumar 2 manzanas + 3 peras: no puedes sumarlas directo porque son cosas distintas. Primero las conviertes a algo en común (por ejemplo "frutas"), y ahí sí las sumas. Con las fracciones, ese "algo en común" es el denominador nuevo.',
    ejemplo:'Ejemplo resuelto: 1/3 + 1/4 → multiplico los denominadores: 3×4=12. Convierto 1/3 a doceavos: como 12÷3=4, multiplico arriba y abajo por 4 → 4/12. Convierto 1/4: como 12÷4=3, multiplico por 3 → 3/12. Sumo: 4/12 + 3/12 = 7/12.'
  },
  {
    id:'multiplicacion_decimales', materia:'aritmetica',
    disparadores:['multiplicar decimales','multiplicacion de decimales','como multiplico decimales'],
    titulo:'Multiplicar números decimales',
    pasos:[
      'Por ahora ignora las comas y multiplica los números como si fueran enteros (sin coma).',
      'Cuenta cuántas cifras hay después de la coma en cada número que multiplicaste, y súmalas.',
      'En el resultado, cuenta esa misma cantidad de cifras desde la derecha y pon ahí la coma.'
    ],
    analogia:'Es como multiplicar normal y al final "acomodar" la coma en su lugar exacto, contando espacios desde la derecha — igual que cuando doblas una cinta métrica para medir un pedacito más pequeño.',
    ejemplo:'Ejemplo resuelto: 1,5 × 2,2 → multiplico sin comas: 15 × 22 = 330. Cifras después de la coma: 1,5 tiene una y 2,2 tiene una, en total 2. Cuento 2 cifras desde la derecha en 330: queda 3,30.'
  },
  {
    id:'division_decimales', materia:'aritmetica',
    disparadores:['dividir decimales','division de decimales','como divido decimales'],
    titulo:'Dividir números decimales',
    pasos:[
      'Si el número de afuera (el divisor) tiene coma, mueve la coma hacia la derecha hasta que sea un número entero, y mueve la coma del otro número (el dividendo) la misma cantidad de lugares.',
      'Ahora divide como divides números enteros normalmente.',
      'Cuando en la división "bajes" la coma del dividendo, pon una coma en ese mismo lugar en el resultado.'
    ],
    analogia:'Es como cambiar de moneda antes de pagar: si el precio está en una unidad rara, primero lo conviertes a una unidad entera para que sea más fácil trabajar con ella, y al final acomodas todo de nuevo.',
    ejemplo:'Ejemplo resuelto: 4,8 ÷ 0,4 → el divisor 0,4 tiene una cifra decimal, así que muevo la coma un lugar en los dos: queda 48 ÷ 4. Divido normal: 48 ÷ 4 = 12.'
  },
  {
    id:'regla_de_tres_simple', materia:'aritmetica',
    disparadores:['regla de tres','regla de 3','como se hace una regla de tres'],
    titulo:'Regla de tres simple',
    pasos:[
      'Escribe los datos en dos filas, cada columna con el mismo tipo de cosa (por ejemplo: días arriba, tareas abajo).',
      'Identifica el dato que no conoces y márcalo con una X.',
      'Multiplica en cruz: el número de arriba de una columna por el de abajo de la otra.',
      'Divide ese resultado entre el número que queda solo, y ese es el valor de X.'
    ],
    analogia:'Es como cuando sabes cuánto cuestan 2 paquetes de galletas y quieres saber cuánto cuestan 5: multiplicas y divides para "escalar" el precio a la nueva cantidad, manteniendo la misma proporción.',
    ejemplo:'Ejemplo resuelto: si 3 cuadernos cuestan $9.000, ¿cuánto cuestan 5 cuadernos? Multiplico en cruz: 5 × 9.000 = 45.000. Divido entre el número que queda solo (3): 45.000 ÷ 3 = 15.000. Los 5 cuadernos cuestan $15.000.'
  },
  {
    id:'porcentaje', materia:'aritmetica',
    disparadores:['calcular porcentaje','sacar el porcentaje','como se saca un porcentaje','que es un porcentaje'],
    titulo:'Calcular un porcentaje de una cantidad',
    pasos:[
      'Convierte el porcentaje a fracción: el número de porcentaje sobre 100 (por ejemplo, 20% es 20/100).',
      'Multiplica esa fracción por la cantidad total.',
      'El resultado es el porcentaje de esa cantidad.'
    ],
    analogia:'"Por ciento" significa literalmente "de cada 100". Si te dicen que el 20% de la clase son niñas, es como decir que de cada 100 estudiantes imaginarios, 20 serían niñas.',
    ejemplo:'Ejemplo resuelto: ¿cuánto es el 25% de 80? Convierto: 25/100. Multiplico: 25/100 × 80 = 2.000/100 = 20. El 25% de 80 es 20.'
  },
  {
    id:'perimetro', materia:'aritmetica',
    disparadores:['calcular el perimetro','que es el perimetro','como se saca el perimetro','hallar el perimetro'],
    titulo:'Calcular el perímetro de una figura',
    pasos:[
      'El perímetro es la suma de la medida de TODOS los lados de la figura.',
      'Si la figura tiene lados iguales (como un cuadrado), puedes multiplicar la medida de un lado por el número de lados en vez de sumar uno por uno.',
      'El resultado se expresa en la misma unidad de medida que te dieron (cm, m, etc.).'
    ],
    analogia:'Imagina que caminas alrededor de todo el borde de la figura, como si fuera la cerca de un patio: el perímetro es la distancia total que caminaste dando toda la vuelta.',
    ejemplo:'Ejemplo resuelto: un rectángulo mide 6 cm de largo y 3 cm de ancho. Tiene dos lados de 6 y dos de 3: 6+6+3+3 = 18 cm de perímetro.'
  },
  {
    id:'area_rectangulo', materia:'aritmetica',
    disparadores:['calcular el area','area del rectangulo','area del cuadrado','como se saca el area','hallar el area'],
    titulo:'Calcular el área de un rectángulo o cuadrado',
    pasos:[
      'Identifica la base (largo) y la altura (ancho) de la figura.',
      'Multiplica base por altura.',
      'El resultado se expresa en unidades "cuadradas" (cm², m², etc.), porque el área mide una superficie.'
    ],
    analogia:'El área es cuántas baldosas cuadradas de 1 cm por 1 cm necesitarías para cubrir toda la figura sin dejar espacios ni encimarlas.',
    ejemplo:'Ejemplo resuelto: un rectángulo de 5 cm de largo por 4 cm de ancho tiene un área de 5 × 4 = 20 cm².'
  },
  {
    id:'mcm', materia:'aritmetica',
    disparadores:['minimo comun multiplo','mcm','como se saca el mcm'],
    titulo:'Hallar el Mínimo Común Múltiplo (m.c.m.)',
    pasos:[
      'Escribe varios múltiplos de cada número (multiplícalo por 1, 2, 3, 4...).',
      'Busca el primer múltiplo que se repita en las dos listas.',
      'Ese número repetido más pequeño es el m.c.m.'
    ],
    analogia:'Es como cuando dos buses pasan por la misma parada cada cierto tiempo distinto: el m.c.m. te dice en qué minuto exacto los dos vuelven a coincidir en la parada al mismo tiempo.',
    ejemplo:'Ejemplo resuelto: m.c.m. de 4 y 6. Múltiplos de 4: 4, 8, 12, 16... Múltiplos de 6: 6, 12, 18... El primero que se repite es 12. El m.c.m. de 4 y 6 es 12.'
  },
  {
    id:'mcd', materia:'aritmetica',
    disparadores:['maximo comun divisor','mcd','como se saca el mcd'],
    titulo:'Hallar el Máximo Común Divisor (M.C.D.)',
    pasos:[
      'Escribe todos los números que dividen exactamente a cada número (sus divisores).',
      'Busca los divisores que tengan en común las dos listas.',
      'El más grande de esos divisores comunes es el M.C.D.'
    ],
    analogia:'Es como repartir dos cantidades distintas de dulces en bolsitas iguales, sin que sobre ninguno: el M.C.D. es el mayor número de dulces que puedes poner en cada bolsita para que ambas cantidades se repartan exactas.',
    ejemplo:'Ejemplo resuelto: M.C.D. de 12 y 18. Divisores de 12: 1,2,3,4,6,12. Divisores de 18: 1,2,3,6,9,18. Los comunes: 1,2,3,6. El más grande es 6. El M.C.D. es 6.'
  },
  {
    id:'redondeo_decimales', materia:'aritmetica',
    disparadores:['redondear decimales','como se redondea','redondeo de numeros'],
    titulo:'Redondear un número decimal',
    pasos:[
      'Identifica la cifra hasta donde quieres redondear (por ejemplo, a los décimos).',
      'Mira la cifra que está justo después de esa posición.',
      'Si esa cifra es 5 o más, la cifra anterior sube uno. Si es menor que 5, la cifra anterior se queda igual.',
      'Borra todas las cifras que quedaron después.'
    ],
    analogia:'Es como cuando dices tu edad "casi 10" en vez de "9 años y 10 meses": redondear es acercarte al número más cercano y fácil de usar, sin perder mucha precisión.',
    ejemplo:'Ejemplo resuelto: redondear 3,47 a los décimos. La cifra de los décimos es 4. La siguiente cifra es 7, que es 5 o más, así que el 4 sube a 5. Resultado: 3,5.'
  },
  {
    id:'algoritmo', materia:'tecnologia',
    disparadores:['que es un algoritmo','para que sirve un algoritmo','como se hace un algoritmo'],
    titulo:'Qué es un algoritmo',
    pasos:[
      'Un algoritmo es una lista de pasos ordenados para resolver un problema o hacer una tarea.',
      'Cada paso debe ser claro y hacerse en un orden específico — si cambias el orden, el resultado puede salir mal.',
      'Un algoritmo debe tener un inicio, unos pasos en el medio, y un final.'
    ],
    analogia:'Una receta de cocina es un algoritmo: primero pones los ingredientes, luego mezclas, luego horneas — si horneas antes de mezclar, no funciona igual.',
    ejemplo:'Ejemplo resuelto: algoritmo para lavarse las manos: 1) Abrir la llave. 2) Mojarse las manos. 3) Poner jabón. 4) Frotar 20 segundos. 5) Enjuagar. 6) Secarse. Cada paso va en ese orden exacto.'
  },
  {
    id:'diagrama_flujo', materia:'tecnologia',
    disparadores:['que es un diagrama de flujo','para que sirve un diagrama de flujo','como se hace un diagrama de flujo'],
    titulo:'Qué es un diagrama de flujo',
    pasos:[
      'Es un dibujo que muestra los pasos de un algoritmo usando figuras conectadas con flechas.',
      'El óvalo se usa para el inicio y el final.',
      'El rectángulo se usa para una acción o un paso.',
      'El rombo se usa para una pregunta que tiene dos caminos posibles (sí / no).'
    ],
    analogia:'Es como el mapa de un juego de mesa: las casillas son los pasos, y las flechas te dicen hacia dónde moverte según lo que pase.',
    ejemplo:'Ejemplo resuelto: diagrama para decidir si llevar paraguas: Óvalo "Inicio" → Rombo "¿Está lloviendo?" → si SÍ, Rectángulo "Llevar paraguas"; si NO, Rectángulo "No llevar paraguas" → Óvalo "Fin".'
  },
  {
    id:'hardware_software', materia:'tecnologia',
    disparadores:['diferencia entre hardware y software','que es hardware','que es software','hardware y software'],
    titulo:'Diferencia entre hardware y software',
    pasos:[
      'El hardware son las partes físicas del computador: las que puedes tocar (pantalla, teclado, mouse, torre).',
      'El software son los programas que hacen funcionar el computador: las que NO puedes tocar (Windows, un juego, un navegador).',
      'El hardware es como el "cuerpo" y el software es como las "instrucciones" que le dicen al cuerpo qué hacer.'
    ],
    analogia:'El hardware es como el cuerpo de una persona (manos, ojos, cerebro físico) y el software es como los pensamientos e instrucciones que usan ese cuerpo para hacer algo.',
    ejemplo:'Ejemplo resuelto: el mouse, el teclado y la pantalla son hardware. El navegador de internet y un juego instalado son software.'
  },
  {
    id:'contrasena_segura', materia:'tecnologia',
    disparadores:['contrasena segura','como hacer una contrasena segura','clave segura'],
    titulo:'Cómo crear una contraseña segura',
    pasos:[
      'Usa al menos 8 caracteres — entre más larga, más segura.',
      'Combina letras mayúsculas, minúsculas, números y algún símbolo.',
      'Evita datos fáciles de adivinar como tu nombre, tu fecha de nacimiento o "12345".',
      'Nunca compartas tu contraseña con nadie, ni siquiera con amigos.'
    ],
    analogia:'Es como la llave de tu casa: si es una llave rara y difícil de copiar, es más difícil que alguien entre sin permiso.',
    ejemplo:'Ejemplo resuelto: en vez de usar "maria2015" (fácil de adivinar), una contraseña más segura sería algo como "R!oAzul47*" — mezcla letras, números y un símbolo, y no tiene datos personales obvios.'
  }
];

// Índice normalizado (se construye una vez al cargar el archivo)
const METODOS_ARIA_INDICE = METODOS_ARIA.map(m => ({
  ...m,
  disparadoresNorm: m.disparadores.map(d => normalizaTexto(d)),
  textoBusquedaNorm: normalizaTexto([m.titulo, ...m.disparadores].join(' '))
}));

```
````

---
## v20 líneas 7265–7402 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```javascript
// ═══════════════════════════════════════════════════════════════════════
// v2.2 — CASCADA DE INTENTOS: ARIA no se rinde con un solo umbral de búsqueda.
// Prueba varias estrategias, de más a menos exigente, antes de decir "no sé".
// También recuerda el último método explicado para poder profundizar cuando
// el estudiante dice "no entendí" / "explícamelo de otra forma", sin tener
// que volver a adivinar de qué estaba hablando.
// ═══════════════════════════════════════════════════════════════════════

// Distancia de Levenshtein compacta — para tolerar errores de escritura
// típicos de 4°-5° (ej. "aritmetica" sin tilde, "conporta" en vez de "comporta").
function distanciaLevenshteinAria(a, b){
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  let prev = Array.from({length:n+1}, (_,i)=>i);
  for (let i=1;i<=m;i++){
    const cur = [i];
    for (let j=1;j<=n;j++){
      cur[j] = a[i-1]===b[j-1] ? prev[j-1] : 1 + Math.min(prev[j-1], prev[j], cur[j-1]);
    }
    prev = cur;
  }
  return prev[n];
}

// ¿La palabra del estudiante "se parece lo suficiente" a una palabra clave?
// Tolerancia según el largo: palabras cortas casi no admiten error, largas sí.
function seParecenAria(palabraEstudiante, palabraClave){
  if (palabraEstudiante === palabraClave) return true;
  const tolerancia = palabraClave.length <= 4 ? 0 : (palabraClave.length <= 7 ? 1 : 2);
  return distanciaLevenshteinAria(palabraEstudiante, palabraClave) <= tolerancia;
}

// Memoria de la última explicación dada, para poder "profundizar" sin re-buscar
let ariaUltimoMetodoExplicado = null; // { metodo, nivel }  nivel: 0=pasos, 1=analogia, 2=ejemplo

function armarExplicacionMetodoAria(metodo, nivel){
  ariaUltimoMetodoExplicado = { metodo, nivel };
  const encabezado = `📘 <strong>${metodo.titulo}</strong>`;
  if (nivel === 0){
    const cuerpo = metodo.pasos.map((p,i)=>`${i+1}) ${p}`).join('<br>');
    return `${encabezado}:<br>${cuerpo}<br><br>¿Quieres que te lo explique de otra forma, o prefieres un ejemplo ya resuelto?`;
  }
  if (nivel === 1){
    return `${encabezado} — de otra forma 🙂:<br>${metodo.analogia}<br><br>¿Te ayuda esto, o mejor te muestro un ejemplo resuelto paso a paso?`;
  }
  return `${encabezado} — con un ejemplo resuelto 🧮:<br>${metodo.ejemplo}<br><br>Ahora inténtalo tú con tu propio ejercicio, usando el mismo método. Si te trabas en algún paso, dime exactamente cuál y seguimos desde ahí.`;
}

// ¿El estudiante está pidiendo otra forma de explicación? (en vez de un tema nuevo)
function esPeticionDeOtraExplicacionAria(pregunta){
  return /no entendi|no entiendo|explicamelo de otra forma|explicamelo diferente|de otra manera|no me quedo claro|sigo sin entender|otra explicacion|no le entendi/.test(normalizaTexto(pregunta));
}

// Búsqueda EXACTA (por inclusión de frase disparadora) en el banco de métodos
function buscarMetodoExactoAria(pregunta){
  const n = normalizaTexto(pregunta);
  for (const m of METODOS_ARIA_INDICE){
    if (m.disparadoresNorm.some(d => n.includes(d))) return m;
  }
  return null;
}

// Búsqueda TOLERANTE (segunda pasada): compara palabra por palabra con distancia
// de Levenshtein, para pescar errores de escritura o frases ligeramente distintas
// a las disparadoras exactas ("como sumo fraciones", "aritmética" sin tilde, etc.)
function buscarMetodoTolerante(pregunta){
  const palabras = normalizaTexto(pregunta).split(/[^a-z0-9ñ]+/).filter(p => p.length > 3);
  if (!palabras.length) return null;
  let mejor = null, mejorPuntaje = 0;
  METODOS_ARIA_INDICE.forEach(m => {
    const clave = m.textoBusquedaNorm.split(/[^a-z0-9ñ]+/).filter(p => p.length > 3);
    let puntaje = 0;
    palabras.forEach(pe => { if (clave.some(pc => seParecenAria(pe, pc))) puntaje++; });
    if (puntaje > mejorPuntaje){ mejorPuntaje = puntaje; mejor = m; }
  });
  return mejorPuntaje >= 2 ? mejor : null;
}

// ── Registro de dudas no resueltas: para que quede insumo para tu Panel Docente ──
function registrarDudaNoResueltaAria(pregunta){
  try{
    const clave = 'aria_dudas_no_resueltas';
    const lista = JSON.parse(localStorage.getItem(clave) || '[]');
    lista.push({ pregunta: String(pregunta).slice(0,200), fecha: new Date().toISOString() });
    localStorage.setItem(clave, JSON.stringify(lista.slice(-100))); // conserva las últimas 100
  } catch(e){ /* si no hay localStorage disponible, simplemente no se registra */ }
}

// ═══════════════════════════════════════════════════════════════════════
// PUNTO DE ENTRADA DE LA CASCADA — se llama desde responderAria() cuando las
// prioridades más específicas (quiz protegido, CLASE_META, GLOSARIO) ya
// pasaron y no resolvieron nada. Prueba, en orden, cada vez con menos exigencia:
//   0) ¿Pide "otra forma de explicación" de lo último que ya se explicó?
//   1) Método exacto del banco pedagógico
//   2) Explicación profunda del contenido de ESTA clase (30-C)
//   3) Búsqueda general en el contenido de la clase
//   4) Método del banco con coincidencia tolerante (errores de escritura)
//   5) Si nada funcionó: honestidad + se registra la duda para el profe
// ═══════════════════════════════════════════════════════════════════════
function cascadaDeIntentosAria(pregunta){
  // 0) Continuar profundizando en lo último explicado, si el estudiante lo pide
  if (esPeticionDeOtraExplicacionAria(pregunta) && ariaUltimoMetodoExplicado){
    const siguienteNivel = Math.min(2, ariaUltimoMetodoExplicado.nivel + 1);
    return armarExplicacionMetodoAria(ariaUltimoMetodoExplicado.metodo, siguienteNivel);
  }

  // 1) Coincidencia exacta en el banco de métodos (alta confianza)
  const metodoExacto = buscarMetodoExactoAria(pregunta);
  if (metodoExacto) return armarExplicacionMetodoAria(metodoExacto, 0);

  // 2) Explicación profunda leyendo TODA la clase (Prioridad 30-C, si está cargada)
  if (typeof esPreguntaDeExplicacionAria === 'function' && esPreguntaDeExplicacionAria(pregunta)){
    if (typeof ARIA_INDICE_CLASE !== 'undefined' && !ARIA_INDICE_CLASE.length &&
        typeof indexarContenidoClaseAria === 'function') indexarContenidoClaseAria();
    if (typeof explicarConceptoOProcesoAria === 'function'){
      const explicacionProfunda = explicarConceptoOProcesoAria(pregunta);
      if (explicacionProfunda) return explicacionProfunda;
    }
  }

  // 3) Búsqueda general en el contenido de la clase (umbral normal)
  if (typeof buscarEnClaseAria === 'function'){
    const desdeClase = buscarEnClaseAria(pregunta);
    if (desdeClase) return desdeClase;
  }

  // 4) Último intento: banco de métodos con tolerancia a errores de escritura
  const metodoTolerante = buscarMetodoTolerante(pregunta);
  if (metodoTolerante) return armarExplicacionMetodoAria(metodoTolerante, 0);

  // 5) Honestidad final — ARIA nunca inventa, pero deja constancia de la duda
  registrarDudaNoResueltaAria(pregunta);
  return null; // responderAria() decide el mensaje final (diccionario / reglas / "no sé")
}

```
````

---
## v20 líneas 7406–7426 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```javascript
function responderAria(pregunta){
  const n = normalizaTexto(pregunta);
  // 1) 30-B — pregunta de quiz/evalFinal copiada o muy parecida. Nunca se resuelve.
  const preguntaCopiada = detectarPreguntaCopiadaAria(pregunta);
  if (preguntaCopiada) return orientacionSocraticaAria(preguntaCopiada);

  // 2) Tema/objetivo del día (CLASE_META) — 3) GLOSARIO — 4) METODOS opcional curado a mano (30-B.5)
  // ... sin cambios respecto a la 30-C ...

  // 5) 🆕 30-E — CASCADA DE INTENTOS: banco de métodos reutilizable → explicación profunda de
  //    esta clase (30-C) → búsqueda general en la clase → banco de métodos tolerante a errores
  //    de escritura. Si el estudiante pide "otra forma de explicación", profundiza sin re-buscar.
  const desdeCascada = cascadaDeIntentosAria(pregunta);
  if (desdeCascada) return desdeCascada;

  // 6) Reglas genéricas por palabra clave (qué hago, cómo voy, nota, quién eres, ánimo...) — sin cambios.
  // 7) Honestidad final — ARIA nunca inventa. La cascada YA registró la duda (registrarDudaNoResueltaAria).
  return `🤔 No estoy segura de haber entendido eso. Le quedó anotado a tu profe para revisarlo. Mientras tanto, puedo explicarte cualquier concepto o proceso que ya vimos, o darte <strong>ánimo</strong>. 💪`;
}
```
````

---
## v20 líneas 7467–7724 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```javascript
// ═══════════════════════════════════════════════════════════════════════
// BANCO DE MÉTODOS PEDAGÓGICOS DE ARIA — v2 (reutilizable en TODAS las clases)
// (Aritmética y Tecnología e Informática, grados 4° y 5°)
// Cada entrada tiene 4 capas de profundidad, pensadas para EXPLICAR MEJOR, no
// solo distinto, cuando el estudiante dice "no entendí":
//   1) pasos      -> explicación ordenada, paso a paso (primer intento)
//   2) analogia   -> comparación con algo cotidiano (segundo intento)
//   3) visual     -> comparación visual simple, con símbolos/emoji (tercer intento)
//   4) ejemplo    -> un caso resuelto completo, con datos distintos a cualquier
//                    quiz (cuarto intento, "aprende viendo")
// Además, cada método trae ANDAMIAJE SOCRÁTICO:
//   - preguntaGuia    -> pregunta corta que ARIA hace ANTES de explicar, para
//                        medir cuánto ya sabe el estudiante
//   - microFundamento -> si el estudiante responde "no lo sé", una explicación
//                        muy breve del concepto base, ANTES de entrar al método
// ═══════════════════════════════════════════════════════════════════════
const METODOS_ARIA = [
  {
    id:'suma_fracciones_igual_denom', materia:'aritmetica',
    disparadores:['sumar fracciones','suma de fracciones','sumar fraccion','como sumo fracciones'],
    titulo:'Sumar fracciones con el mismo denominador',
    preguntaGuia:'¿Sabes qué significa el número de abajo en una fracción (el denominador)?',
    microFundamento:'El denominador (el número de abajo) dice en cuántas partes iguales se divide un entero. El numerador (el de arriba) dice cuántas de esas partes tienes. Por ejemplo, en 3/8, el entero se dividió en 8 partes y tienes 3 de ellas.',
    pasos:[
      'Revisa que las dos fracciones tengan el mismo número de abajo (el denominador). Si es igual, sigue.',
      'Suma solo los números de arriba (los numeradores) y deja el de abajo igual.',
      'Si el resultado se puede simplificar (dividir arriba y abajo entre el mismo número), simplifícalo.'
    ],
    analogia:'Piensa en una pizza cortada en partes iguales, por ejemplo 8 partes. Si te comes 2 partes (2/8) y luego 3 partes más (3/8), en total te comiste 5 partes de las 8: 5/8. El tamaño de las partes (el 8) no cambia, solo cuentas cuántas partes tienes.',
    visual:'🍕 Pizza en 8 partes:<br>●●●○○○○○ → 3/8<br>Le agregamos 2 partes más:<br>●●●●●○○○ → ahora son 5/8<br>(● = parte comida, ○ = parte que queda)',
    ejemplo:'Ejemplo resuelto: 2/6 + 1/6 → los denominadores ya son iguales (6), entonces solo sumo los numeradores: 2 + 1 = 3. El resultado es 3/6, que simplificado (dividiendo entre 3) queda en 1/2.'
  },
  {
    id:'suma_fracciones_distinto_denom', materia:'aritmetica',
    disparadores:['sumar fracciones con distinto denominador','fracciones diferente denominador','fracciones distinto denominador'],
    titulo:'Sumar fracciones con distinto denominador',
    preguntaGuia:'¿Recuerdas cómo se suman fracciones cuando el denominador SÍ es igual?',
    microFundamento:'Cuando el denominador es igual, solo se suman los números de arriba (numeradores) y el de abajo se deja igual. El problema aparece cuando los denominadores son distintos: ahí primero hay que "emparejarlos".',
    pasos:[
      'Busca un número que sea múltiplo de los dos denominadores (el más fácil suele ser multiplicarlos entre sí).',
      'Convierte cada fracción a ese nuevo denominador: multiplica arriba y abajo de cada fracción por lo que le falte para llegar a ese número.',
      'Ya con el mismo denominador en las dos, suma solo los numeradores, como en la suma normal.',
      'Simplifica el resultado si se puede.'
    ],
    analogia:'Es como sumar 2 manzanas + 3 peras: no puedes sumarlas directo porque son cosas distintas. Primero las conviertes a algo en común (por ejemplo "frutas"), y ahí sí las sumas. Con las fracciones, ese "algo en común" es el denominador nuevo.',
    visual:'1/3 → ●○○ ●○○ ●○○ ●○○ (12 partes) = 4/12<br>1/4 → ●○○○ ●○○○ ●○○○ (12 partes) = 3/12<br>Juntas: 4/12 + 3/12 = 7/12',
    ejemplo:'Ejemplo resuelto: 1/3 + 1/4 → multiplico los denominadores: 3×4=12. Convierto 1/3 a doceavos: como 12÷3=4, multiplico arriba y abajo por 4 → 4/12. Convierto 1/4: como 12÷4=3, multiplico por 3 → 3/12. Sumo: 4/12 + 3/12 = 7/12.'
  },
  {
    id:'multiplicacion_decimales', materia:'aritmetica',
    disparadores:['multiplicar decimales','multiplicacion de decimales','como multiplico decimales'],
    titulo:'Multiplicar números decimales',
    preguntaGuia:'¿Sabes multiplicar números enteros normales, sin coma?',
    microFundamento:'Multiplicar es sumar un número varias veces (3×4 es sumar 3 cuatro veces). Con decimales se hace igual, solo que al final hay que acomodar la coma en su lugar correcto.',
    pasos:[
      'Por ahora ignora las comas y multiplica los números como si fueran enteros (sin coma).',
      'Cuenta cuántas cifras hay después de la coma en cada número que multiplicaste, y súmalas.',
      'En el resultado, cuenta esa misma cantidad de cifras desde la derecha y pon ahí la coma.'
    ],
    analogia:'Es como multiplicar normal y al final "acomodar" la coma en su lugar exacto, contando espacios desde la derecha — igual que cuando doblas una cinta métrica para medir un pedacito más pequeño.',
    visual:'1,5 × 2,2 → sin comas: 15 × 22 = 330<br>Cifras decimales: 1 + 1 = 2<br>330 → cuento 2 desde la derecha → 3,30',
    ejemplo:'Ejemplo resuelto: 1,5 × 2,2 → multiplico sin comas: 15 × 22 = 330. Cifras después de la coma: 1,5 tiene una y 2,2 tiene una, en total 2. Cuento 2 cifras desde la derecha en 330: queda 3,30.'
  },
  {
    id:'division_decimales', materia:'aritmetica',
    disparadores:['dividir decimales','division de decimales','como divido decimales'],
    titulo:'Dividir números decimales',
    preguntaGuia:'¿Sabes dividir números enteros normales, sin coma?',
    microFundamento:'Dividir es repartir en partes iguales (8÷2 es repartir 8 en 2 grupos iguales, 4 en cada uno). Con decimales primero se "acomodan" las comas para que sea más fácil dividir.',
    pasos:[
      'Si el número de afuera (el divisor) tiene coma, mueve la coma hacia la derecha hasta que sea un número entero, y mueve la coma del otro número (el dividendo) la misma cantidad de lugares.',
      'Ahora divide como divides números enteros normalmente.',
      'Cuando en la división "bajes" la coma del dividendo, pon una coma en ese mismo lugar en el resultado.'
    ],
    analogia:'Es como cambiar de moneda antes de pagar: si el precio está en una unidad rara, primero lo conviertes a una unidad entera para que sea más fácil trabajar con ella, y al final acomodas todo de nuevo.',
    visual:'4,8 ÷ 0,4 → muevo la coma 1 lugar en los dos:<br>48 ÷ 4 = 12',
    ejemplo:'Ejemplo resuelto: 4,8 ÷ 0,4 → el divisor 0,4 tiene una cifra decimal, así que muevo la coma un lugar en los dos: queda 48 ÷ 4. Divido normal: 48 ÷ 4 = 12.'
  },
  {
    id:'regla_de_tres_simple', materia:'aritmetica',
    disparadores:['regla de tres','regla de 3','como se hace una regla de tres'],
    titulo:'Regla de tres simple',
    preguntaGuia:'¿Sabes qué quiere decir que dos cantidades sean "proporcionales" (que crecen juntas, al mismo ritmo)?',
    microFundamento:'Que dos cantidades sean proporcionales significa que si una aumenta el doble, la otra también aumenta el doble (por ejemplo: si compras el doble de cuadernos, pagas el doble de dinero).',
    pasos:[
      'Escribe los datos en dos filas, cada columna con el mismo tipo de cosa (por ejemplo: días arriba, tareas abajo).',
      'Identifica el dato que no conoces y márcalo con una X.',
      'Multiplica en cruz: el número de arriba de una columna por el de abajo de la otra.',
      'Divide ese resultado entre el número que queda solo, y ese es el valor de X.'
    ],
    analogia:'Es como cuando sabes cuánto cuestan 2 paquetes de galletas y quieres saber cuánto cuestan 5: multiplicas y divides para "escalar" el precio a la nueva cantidad, manteniendo la misma proporción.',
    visual:'3 cuadernos —— $9.000<br>5 cuadernos —— X<br>X = (5 × 9.000) ÷ 3 = 15.000',
    ejemplo:'Ejemplo resuelto: si 3 cuadernos cuestan $9.000, ¿cuánto cuestan 5 cuadernos? Multiplico en cruz: 5 × 9.000 = 45.000. Divido entre el número que queda solo (3): 45.000 ÷ 3 = 15.000. Los 5 cuadernos cuestan $15.000.'
  },
  {
    id:'porcentaje', materia:'aritmetica',
    disparadores:['calcular porcentaje','sacar el porcentaje','como se saca un porcentaje','que es un porcentaje'],
    titulo:'Calcular un porcentaje de una cantidad',
    preguntaGuia:'¿Sabes que "por ciento" significa "de cada 100"?',
    microFundamento:'"Por ciento" (%) significa "de cada 100". Si algo es el 50%, es como decir "la mitad de 100", o sea la mitad de lo que sea.',
    pasos:[
      'Convierte el porcentaje a fracción: el número de porcentaje sobre 100 (por ejemplo, 20% es 20/100).',
      'Multiplica esa fracción por la cantidad total.',
      'El resultado es el porcentaje de esa cantidad.'
    ],
    analogia:'"Por ciento" significa literalmente "de cada 100". Si te dicen que el 20% de la clase son niñas, es como decir que de cada 100 estudiantes imaginarios, 20 serían niñas.',
    visual:'25% de 80:<br>■■■□□□□□□□ (25 de cada 100 casillas están llenas)<br>25/100 × 80 = 20',
    ejemplo:'Ejemplo resuelto: ¿cuánto es el 25% de 80? Convierto: 25/100. Multiplico: 25/100 × 80 = 2.000/100 = 20. El 25% de 80 es 20.'
  },
  {
    id:'perimetro', materia:'aritmetica',
    disparadores:['calcular el perimetro','que es el perimetro','como se saca el perimetro','hallar el perimetro'],
    titulo:'Calcular el perímetro de una figura',
    preguntaGuia:'¿Sabes qué es el "borde" o "contorno" de una figura?',
    microFundamento:'El borde o contorno es la línea que rodea toda la figura por fuera, como si dibujaras su silueta con un lápiz sin levantarlo.',
    pasos:[
      'El perímetro es la suma de la medida de TODOS los lados de la figura.',
      'Si la figura tiene lados iguales (como un cuadrado), puedes multiplicar la medida de un lado por el número de lados en vez de sumar uno por uno.',
      'El resultado se expresa en la misma unidad de medida que te dieron (cm, m, etc.).'
    ],
    analogia:'Imagina que caminas alrededor de todo el borde de la figura, como si fuera la cerca de un patio: el perímetro es la distancia total que caminaste dando toda la vuelta.',
    visual:'Rectángulo 6×3:<br>┌──6──┐<br>3       3<br>└──6──┘<br>6+6+3+3 = 18',
    ejemplo:'Ejemplo resuelto: un rectángulo mide 6 cm de largo y 3 cm de ancho. Tiene dos lados de 6 y dos de 3: 6+6+3+3 = 18 cm de perímetro.'
  },
  {
    id:'area_rectangulo', materia:'aritmetica',
    disparadores:['calcular el area','area del rectangulo','area del cuadrado','como se saca el area','hallar el area'],
    titulo:'Calcular el área de un rectángulo o cuadrado',
    preguntaGuia:'¿Sabes la diferencia entre el borde de una figura (perímetro) y lo que hay adentro (su superficie)?',
    microFundamento:'El perímetro mide el borde de la figura. El área mide lo de ADENTRO: toda la superficie que ocupa, como si la cubrieras con baldosas.',
    pasos:[
      'Identifica la base (largo) y la altura (ancho) de la figura.',
      'Multiplica base por altura.',
      'El resultado se expresa en unidades "cuadradas" (cm², m², etc.), porque el área mide una superficie.'
    ],
    analogia:'El área es cuántas baldosas cuadradas de 1 cm por 1 cm necesitarías para cubrir toda la figura sin dejar espacios ni encimarlas.',
    visual:'Rectángulo 5×4:<br>▢▢▢▢▢<br>▢▢▢▢▢<br>▢▢▢▢▢<br>▢▢▢▢▢<br>5×4 = 20 baldosas = 20 cm²',
    ejemplo:'Ejemplo resuelto: un rectángulo de 5 cm de largo por 4 cm de ancho tiene un área de 5 × 4 = 20 cm².'
  },
  {
    id:'mcm', materia:'aritmetica',
    disparadores:['minimo comun multiplo','mcm','como se saca el mcm'],
    titulo:'Hallar el Mínimo Común Múltiplo (m.c.m.)',
    preguntaGuia:'¿Sabes qué es un múltiplo de un número (por ejemplo, los múltiplos de 3)?',
    microFundamento:'Un múltiplo de un número es el resultado de multiplicarlo por 1, 2, 3, 4... Por ejemplo, los múltiplos de 3 son 3, 6, 9, 12, 15...',
    pasos:[
      'Escribe varios múltiplos de cada número (multiplícalo por 1, 2, 3, 4...).',
      'Busca el primer múltiplo que se repita en las dos listas.',
      'Ese número repetido más pequeño es el m.c.m.'
    ],
    analogia:'Es como cuando dos buses pasan por la misma parada cada cierto tiempo distinto: el m.c.m. te dice en qué minuto exacto los dos vuelven a coincidir en la parada al mismo tiempo.',
    visual:'Múltiplos de 4: 4 - 8 - [12] - 16<br>Múltiplos de 6: 6 - [12] - 18<br>Primer número en las dos listas: 12',
    ejemplo:'Ejemplo resuelto: m.c.m. de 4 y 6. Múltiplos de 4: 4, 8, 12, 16... Múltiplos de 6: 6, 12, 18... El primero que se repite es 12. El m.c.m. de 4 y 6 es 12.'
  },
  {
    id:'mcd', materia:'aritmetica',
    disparadores:['maximo comun divisor','mcd','como se saca el mcd'],
    titulo:'Hallar el Máximo Común Divisor (M.C.D.)',
    preguntaGuia:'¿Sabes qué es un divisor de un número (por ejemplo, los divisores de 12)?',
    microFundamento:'Un divisor de un número es otro número que lo divide exacto, sin dejar residuo. Por ejemplo, los divisores de 12 son 1, 2, 3, 4, 6 y 12.',
    pasos:[
      'Escribe todos los números que dividen exactamente a cada número (sus divisores).',
      'Busca los divisores que tengan en común las dos listas.',
      'El más grande de esos divisores comunes es el M.C.D.'
    ],
    analogia:'Es como repartir dos cantidades distintas de dulces en bolsitas iguales, sin que sobre ninguno: el M.C.D. es el mayor número de dulces que puedes poner en cada bolsita para que ambas cantidades se repartan exactas.',
    visual:'Divisores de 12: 1,2,3,4,6,12<br>Divisores de 18: 1,2,3,6,9,18<br>Comunes: 1,2,3,[6] → el mayor es 6',
    ejemplo:'Ejemplo resuelto: M.C.D. de 12 y 18. Divisores de 12: 1,2,3,4,6,12. Divisores de 18: 1,2,3,6,9,18. Los comunes: 1,2,3,6. El más grande es 6. El M.C.D. es 6.'
  },
  {
    id:'redondeo_decimales', materia:'aritmetica',
    disparadores:['redondear decimales','como se redondea','redondeo de numeros'],
    titulo:'Redondear un número decimal',
    preguntaGuia:'¿Sabes cuál cifra es la de los "décimos" en un número decimal?',
    microFundamento:'En un número como 3,47, la primera cifra después de la coma (el 4) es la de los décimos, y la segunda (el 7) es la de los centésimos.',
    pasos:[
      'Identifica la cifra hasta donde quieres redondear (por ejemplo, a los décimos).',
      'Mira la cifra que está justo después de esa posición.',
      'Si esa cifra es 5 o más, la cifra anterior sube uno. Si es menor que 5, la cifra anterior se queda igual.',
      'Borra todas las cifras que quedaron después.'
    ],
    analogia:'Es como cuando dices tu edad "casi 10" en vez de "9 años y 10 meses": redondear es acercarte al número más cercano y fácil de usar, sin perder mucha precisión.',
    visual:'3,4[7] → el 7 es ≥5, el 4 sube a 5<br>3,47 ≈ 3,5',
    ejemplo:'Ejemplo resuelto: redondear 3,47 a los décimos. La cifra de los décimos es 4. La siguiente cifra es 7, que es 5 o más, así que el 4 sube a 5. Resultado: 3,5.'
  },
  {
    id:'algoritmo', materia:'tecnologia',
    disparadores:['que es un algoritmo','para que sirve un algoritmo','como se hace un algoritmo'],
    titulo:'Qué es un algoritmo',
    preguntaGuia:'¿Sabes qué significa hacer algo "en orden, paso a paso"?',
    microFundamento:'Hacer algo "en orden" significa que cada paso va en un lugar específico, y si cambias el orden, el resultado puede salir distinto o no funcionar.',
    pasos:[
      'Un algoritmo es una lista de pasos ordenados para resolver un problema o hacer una tarea.',
      'Cada paso debe ser claro y hacerse en un orden específico — si cambias el orden, el resultado puede salir mal.',
      'Un algoritmo debe tener un inicio, unos pasos en el medio, y un final.'
    ],
    analogia:'Una receta de cocina es un algoritmo: primero pones los ingredientes, luego mezclas, luego horneas — si horneas antes de mezclar, no funciona igual.',
    visual:'🟢 Inicio → 1️⃣ → 2️⃣ → 3️⃣ → 🔴 Fin',
    ejemplo:'Ejemplo resuelto: algoritmo para lavarse las manos: 1) Abrir la llave. 2) Mojarse las manos. 3) Poner jabón. 4) Frotar 20 segundos. 5) Enjuagar. 6) Secarse. Cada paso va en ese orden exacto.'
  },
  {
    id:'diagrama_flujo', materia:'tecnologia',
    disparadores:['que es un diagrama de flujo','para que sirve un diagrama de flujo','como se hace un diagrama de flujo'],
    titulo:'Qué es un diagrama de flujo',
    preguntaGuia:'¿Recuerdas qué es un algoritmo (una lista de pasos ordenados)?',
    microFundamento:'Un algoritmo es una lista de pasos ordenados para lograr algo. Un diagrama de flujo es simplemente DIBUJAR esos pasos con figuras y flechas, para verlos más fácil.',
    pasos:[
      'Es un dibujo que muestra los pasos de un algoritmo usando figuras conectadas con flechas.',
      'El óvalo se usa para el inicio y el final.',
      'El rectángulo se usa para una acción o un paso.',
      'El rombo se usa para una pregunta que tiene dos caminos posibles (sí / no).'
    ],
    analogia:'Es como el mapa de un juego de mesa: las casillas son los pasos, y las flechas te dicen hacia dónde moverte según lo que pase.',
    visual:'⭕ Inicio<br>↓<br>🔷 ¿Llueve?<br>↙ Sí        ↘ No<br>▭ Llevar paraguas   ▭ No llevar<br>↘ ↙<br>⭕ Fin',
    ejemplo:'Ejemplo resuelto: diagrama para decidir si llevar paraguas: Óvalo "Inicio" → Rombo "¿Está lloviendo?" → si SÍ, Rectángulo "Llevar paraguas"; si NO, Rectángulo "No llevar paraguas" → Óvalo "Fin".'
  },
  {
    id:'hardware_software', materia:'tecnologia',
    disparadores:['diferencia entre hardware y software','que es hardware','que es software','hardware y software'],
    titulo:'Diferencia entre hardware y software',
    preguntaGuia:'¿Puedes nombrar algo del computador que SÍ puedas tocar con la mano?',
    microFundamento:'Todo lo que puedes tocar del computador (pantalla, teclado, mouse) es una parte física. Lo que NO puedes tocar (como un programa) es otra categoría distinta.',
    pasos:[
      'El hardware son las partes físicas del computador: las que puedes tocar (pantalla, teclado, mouse, torre).',
      'El software son los programas que hacen funcionar el computador: las que NO puedes tocar (Windows, un juego, un navegador).',
      'El hardware es como el "cuerpo" y el software es como las "instrucciones" que le dicen al cuerpo qué hacer.'
    ],
    analogia:'El hardware es como el cuerpo de una persona (manos, ojos, cerebro físico) y el software es como los pensamientos e instrucciones que usan ese cuerpo para hacer algo.',
    visual:'🖥️ Hardware (se toca): pantalla, mouse, teclado<br>💻 Software (no se toca): Windows, un juego, un navegador',
    ejemplo:'Ejemplo resuelto: el mouse, el teclado y la pantalla son hardware. El navegador de internet y un juego instalado son software.'
  },
  {
    id:'contrasena_segura', materia:'tecnologia',
    disparadores:['contrasena segura','como hacer una contrasena segura','clave segura'],
    titulo:'Cómo crear una contraseña segura',
    preguntaGuia:'¿Sabes por qué usar tu nombre o tu fecha de nacimiento como contraseña es peligroso?',
    microFundamento:'Tu nombre o tu cumpleaños son datos que otras personas pueden conocer o adivinar fácilmente, así que una contraseña con esos datos es fácil de descubrir.',
    pasos:[
      'Usa al menos 8 caracteres — entre más larga, más segura.',
      'Combina letras mayúsculas, minúsculas, números y algún símbolo.',
      'Evita datos fáciles de adivinar como tu nombre, tu fecha de nacimiento o "12345".',
      'Nunca compartas tu contraseña con nadie, ni siquiera con amigos.'
    ],
    analogia:'Es como la llave de tu casa: si es una llave rara y difícil de copiar, es más difícil que alguien entre sin permiso.',
    visual:'"maria2015" → 🟥 débil (nombre + fecha)<br>"R!oAzul47*" → 🟩 fuerte (mayúsc./minúsc./número/símbolo)',
    ejemplo:'Ejemplo resuelto: en vez de usar "maria2015" (fácil de adivinar), una contraseña más segura sería algo como "R!oAzul47*" — mezcla letras, números y un símbolo, y no tiene datos personales obvios.'
  }
];

// Índice normalizado (se construye una vez al cargar el archivo)
const METODOS_ARIA_INDICE = METODOS_ARIA.map(m => ({
  ...m,
  disparadoresNorm: m.disparadores.map(d => normalizaTexto(d)),
  textoBusquedaNorm: normalizaTexto([m.titulo, ...m.disparadores].join(' '))
}));

```
````

---
## v20 líneas 7727–7918 · Bloque ARIA obsoleto o duplicado del widget v2.8.0

````text
```javascript
// ═══════════════════════════════════════════════════════════════════════
// v2.3 — CASCADA DE INTENTOS + EXPLICAR MEJOR (no solo distinto) + ANDAMIAJE
// SOCRÁTICO + REFUERZO PROACTIVO.
// ═══════════════════════════════════════════════════════════════════════

// Distancia de Levenshtein compacta — para tolerar errores de escritura
function distanciaLevenshteinAria(a, b){
  if (a === b) return 0;
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  let prev = Array.from({length:n+1}, (_,i)=>i);
  for (let i=1;i<=m;i++){
    const cur = [i];
    for (let j=1;j<=n;j++){
      cur[j] = a[i-1]===b[j-1] ? prev[j-1] : 1 + Math.min(prev[j-1], prev[j], cur[j-1]);
    }
    prev = cur;
  }
  return prev[n];
}
function seParecenAria(palabraEstudiante, palabraClave){
  if (palabraEstudiante === palabraClave) return true;
  const tolerancia = palabraClave.length <= 4 ? 0 : (palabraClave.length <= 7 ? 1 : 2);
  return distanciaLevenshteinAria(palabraEstudiante, palabraClave) <= tolerancia;
}

// ── Memoria de sesión (se reinicia si se recarga la página; eso está bien:
// cada clase es una sesión nueva de acompañamiento) ──
let ariaUltimoMetodoExplicado = null;   // { metodo, nivel }  0=pasos 1=analogia 2=visual 3=ejemplo
let ariaEsperandoSocratico   = null;    // { metodo } — ARIA ya hizo la pregunta guía, espera respuesta
const ariaMetodosYaIniciados = new Set(); // métodos cuya pregunta guía ya se hizo esta sesión
const ariaContadorMetodo     = {};        // cuántas veces se ha preguntado por cada método esta sesión

const NIVEL_EXPLICACION = ['pasos','analogia','visual','ejemplo'];

function armarExplicacionMetodoAria(metodo, nivel){
  nivel = Math.max(0, Math.min(3, nivel));
  ariaUltimoMetodoExplicado = { metodo, nivel };
  const encabezado = `📘 <strong>${metodo.titulo}</strong>`;
  if (nivel === 0){
    const cuerpo = metodo.pasos.map((p,i)=>`${i+1}) ${p}`).join('<br>');
    return `${encabezado}:<br>${cuerpo}<br><br>¿Te quedó claro, o te lo explico de otra forma?`;
  }
  if (nivel === 1){
    return `${encabezado} — de otra forma 🙂:<br>${metodo.analogia}<br><br>¿Así se entiende mejor, o probamos con una comparación visual?`;
  }
  if (nivel === 2){
    return `${encabezado} — con un dibujo simple 👀:<br>${metodo.visual}<br><br>¿Ya tiene más sentido, o te muestro un ejemplo ya resuelto?`;
  }
  return `${encabezado} — con un ejemplo resuelto 🧮:<br>${metodo.ejemplo}<br><br>Ahora inténtalo tú con tu propio ejercicio, usando el mismo método. Si te trabas en algún paso, dime exactamente cuál y seguimos desde ahí.`;
}

// ¿El estudiante está pidiendo otra forma de explicación? (en vez de un tema nuevo)
function esPeticionDeOtraExplicacionAria(pregunta){
  return /no entendi|no entiendo|explicamelo de otra forma|explicamelo diferente|de otra manera|no me quedo claro|sigo sin entender|otra explicacion|no le entendi/.test(normalizaTexto(pregunta));
}

// ── ANDAMIAJE SOCRÁTICO: detectar sí/no a la pregunta guía ──
function esRespuestaAfirmativaAria(t){
  return /^\s*(si|sí|s|claro|obvio|si\s*se|si\s*la\s*se|si\s*lo\s*se|si\s*entiendo|ajam|aja|de\s*una|ya\s*se|la\s*se|lo\s*se)\b/.test(normalizaTexto(t));
}
function esRespuestaNegativaAria(t){
  return /^\s*(no|no\s*se|no\s*la\s*se|no\s*lo\s*se|no\s*entiendo|nel|no\s*realmente|ni\s*idea|no\s*mucho)\b/.test(normalizaTexto(t));
}

// Primer contacto con un método: si tiene pregunta guía y aún no se hizo esta sesión,
// ARIA pregunta primero y ESPERA la respuesta antes de soltar la explicación completa.
function iniciarOExplicarMetodoAria(metodo){
  if (metodo.preguntaGuia && !ariaMetodosYaIniciados.has(metodo.id)){
    ariaMetodosYaIniciados.add(metodo.id);
    ariaEsperandoSocratico = { metodo };
    return `Antes de explicarte, una pregunta rápida 🤔 ${metodo.preguntaGuia}`;
  }
  return armarExplicacionMetodoAria(metodo, 0);
}

// ── REFUERZO PROACTIVO: si ya preguntó por este método antes, no espera a que
// insista — ofrece más detalle de una vez, sin necesidad de que el estudiante lo pida.
function registrarUsoMetodoAria(id){
  ariaContadorMetodo[id] = (ariaContadorMetodo[id] || 0) + 1;
  return ariaContadorMetodo[id];
}
function manejarMetodoEncontradoAria(metodo){
  const usos = registrarUsoMetodoAria(metodo.id);
  if (usos >= 2){
    // Ya preguntó por esto antes (o quedó registrado por un fallo de quiz relacionado):
    // se salta la pregunta socrática y da de una vez pasos + analogía juntos.
    ariaMetodosYaIniciados.add(metodo.id);
    ariaUltimoMetodoExplicado = { metodo, nivel: 1 };
    const pasos = metodo.pasos.map((p,i)=>`${i+1}) ${p}`).join('<br>');
    return `👀 Veo que esto te ha costado un poco — vamos con calma y más detalle 💪<br><br>` +
           `📘 <strong>${metodo.titulo}</strong>:<br>${pasos}<br><br>` +
           `Dicho de otra forma: ${metodo.analogia}<br><br>` +
           `¿Quieres además una comparación visual o un ejemplo ya resuelto?`;
  }
  return iniciarOExplicarMetodoAria(metodo);
}

// Búsquedas en el banco de métodos (exacta y tolerante a errores de escritura)
function buscarMetodoExactoAria(pregunta){
  const n = normalizaTexto(pregunta);
  for (const m of METODOS_ARIA_INDICE){
    if (m.disparadoresNorm.some(d => n.includes(d))) return m;
  }
  return null;
}
function buscarMetodoTolerante(pregunta){
  const palabras = normalizaTexto(pregunta).split(/[^a-z0-9ñ]+/).filter(p => p.length > 3);
  if (!palabras.length) return null;
  let mejor = null, mejorPuntaje = 0;
  METODOS_ARIA_INDICE.forEach(m => {
    const clave = m.textoBusquedaNorm.split(/[^a-z0-9ñ]+/).filter(p => p.length > 3);
    let puntaje = 0;
    palabras.forEach(pe => { if (clave.some(pc => seParecenAria(pe, pc))) puntaje++; });
    if (puntaje > mejorPuntaje){ mejorPuntaje = puntaje; mejor = m; }
  });
  return mejorPuntaje >= 2 ? mejor : null;
}

// ── Registro de dudas no resueltas: insumo para el Panel Docente ──
function registrarDudaNoResueltaAria(pregunta){
  try{
    const clave = 'aria_dudas_no_resueltas';
    const lista = JSON.parse(localStorage.getItem(clave) || '[]');
    lista.push({ pregunta: String(pregunta).slice(0,200), fecha: new Date().toISOString() });
    localStorage.setItem(clave, JSON.stringify(lista.slice(-100)));
  } catch(e){ /* si no hay localStorage disponible, simplemente no se registra */ }
}

// ── API pública para el refuerzo proactivo por FALLOS DE QUIZ (no solo por chat) ──
// La clase la llama así cuando el estudiante falla 2 veces la misma pregunta y esa
// pregunta está asociada a un método del banco: registrarFalloQuizComoMetodoAria('regla_de_tres_simple')
function registrarFalloQuizComoMetodoAria(metodoId){
  const metodo = METODOS_ARIA_INDICE.find(m => m.id === metodoId);
  if (!metodo) return null;
  registrarUsoMetodoAria(metodoId); // cuenta como "primer uso" -> la próxima vez ya será refuerzo
  return metodo;
}

// ═══════════════════════════════════════════════════════════════════════
// PUNTO DE ENTRADA DE LA CASCADA
// ═══════════════════════════════════════════════════════════════════════
function cascadaDeIntentosAria(pregunta){
  // -1) ¿ARIA está esperando la respuesta a una pregunta socrática? Resolver eso PRIMERO,
  //     antes de tratar el mensaje como una pregunta nueva.
  if (ariaEsperandoSocratico){
    const { metodo } = ariaEsperandoSocratico;
    ariaEsperandoSocratico = null;
    if (esRespuestaNegativaAria(pregunta)){
      return `${metodo.microFundamento}<br><br>Ahora sí, vamos con el método completo 😊:<br><br>` + armarExplicacionMetodoAria(metodo, 0);
    }
    // Afirmativa o ambigua: no nos quedamos esperando para siempre, pasamos a explicar.
    return armarExplicacionMetodoAria(metodo, 0);
  }

  // 0) Continuar profundizando en lo último explicado, si el estudiante lo pide
  if (esPeticionDeOtraExplicacionAria(pregunta) && ariaUltimoMetodoExplicado){
    const siguienteNivel = Math.min(3, ariaUltimoMetodoExplicado.nivel + 1);
    return armarExplicacionMetodoAria(ariaUltimoMetodoExplicado.metodo, siguienteNivel);
  }

  // 1) Coincidencia exacta en el banco de métodos (alta confianza) — con andamiaje/refuerzo
  const metodoExacto = buscarMetodoExactoAria(pregunta);
  if (metodoExacto) return manejarMetodoEncontradoAria(metodoExacto);

  // 2) Explicación profunda leyendo TODA la clase (Prioridad 30-C, si está cargada)
  if (typeof esPreguntaDeExplicacionAria === 'function' && esPreguntaDeExplicacionAria(pregunta)){
    if (typeof ARIA_INDICE_CLASE !== 'undefined' && !ARIA_INDICE_CLASE.length &&
        typeof indexarContenidoClaseAria === 'function') indexarContenidoClaseAria();
    if (typeof explicarConceptoOProcesoAria === 'function'){
      const explicacionProfunda = explicarConceptoOProcesoAria(pregunta);
      if (explicacionProfunda) return explicacionProfunda;
    }
  }

  // 3) Búsqueda general en el contenido de la clase (umbral normal)
  if (typeof buscarEnClaseAria === 'function'){
    const desdeClase = buscarEnClaseAria(pregunta);
    if (desdeClase) return desdeClase;
  }

  // 4) Último intento: banco de métodos con tolerancia a errores de escritura
  const metodoTolerante = buscarMetodoTolerante(pregunta);
  if (metodoTolerante) return manejarMetodoEncontradoAria(metodoTolerante);

  // 5) Honestidad final — ARIA nunca inventa, pero deja constancia de la duda
  registrarDudaNoResueltaAria(pregunta);
  return null;
}

```
````

---
## v20 líneas 8643–8893 · Tablas de cambios y resúmenes ejecutivos v5.1–v14 (historial, no instrucciones)

````text
## 📊 TABLA RESUMEN DE CAMBIOS v5.1 → v6.0
## ═══════════════════════════════════════
| Aspecto | v5.1 | v6.0 |
|---------|------|------|
| Paleta de colores | "Clara y viva" (intención) | **🆕 Verificación numérica de luminosidad (≥90% bg-main), tabla de paletas corregidas, lista negra de colores prohibidos** |
| Tema visual | Reconocible | **🆕 Rotación obligatoria — nunca repetir el mismo universo que la clase anterior** |
| Cuadernos — acceso | Solo dentro del recorrido (slides 21-22) | **🆕 Botones siempre visibles en el navbar superior + modal flotante, además de su lugar en el recorrido** |
| Cuaderno 1 — diseño | Hoja rayada con espiral CSS genérica | **🆕 Diseño de agenda real: cinta adhesiva, fecha tipo agendero, post-its de colores, fotos "pegadas"** |
| Cuaderno 2 — ejercicios | 5 ejercicios | **🆕 3 o 4 ejercicios (ajustado a 2 horas de clase semanales)** |
| Cuaderno 2 — diseño | Igual al Cuaderno 1 | **🆕 Diseño diferenciado tipo libreta de tarea** |
| Sidebar / menú lateral | Lista simple de slides | **🆕 Mapa de progreso agrupado por secciones con estado ✅▶️🟡⬜ y barra de % total** |
| Nota final | Se calculaba con solo completar evaluables | **🆕 Verificación de respaldo: no se muestra si faltan slides en `st.seen`, con aviso y botón directo a la pendiente** |
| Panel docente — clave | PIN 2304, 4 dígitos en pantalla | **🆕 Clave 5813645 (7 dígitos), zona de activación invisible, solo teclado físico** |
| Panel docente — herramientas | Nota, reset, semáforo, preguntas orales | **🆕 + Botón "Reactivar 8 vidas" del estudiante** |
| Ayuda al estudiante | No existía | **🆕 Menú "🧰 Mis herramientas" visible: glosario + calculadora/bloc de notas + pista general (sin revelar respuestas)** |
---
## ═══════════════════════════════════════
## 📊 TABLA RESUMEN DE CAMBIOS v6.0 → v6.1
## ═══════════════════════════════════════
| Aspecto | v6.0 | v6.1 |
|---------|------|------|
| Cronómetro de lectura | 9 segundos mínimo | **🆕 12 segundos mínimo en todos los slides de lectura (`info`, `repaso`, `video`)** |
| Reintento de vidas | Reinicia solo quizzes, pero recorre la clase completa slide a slide | **🆕 Reintento dirigido: sin cronómetro (ya vio las slides), salta directo entre los evaluables pendientes, con banner indicando exactamente qué falta** |
| Desbloqueo de "Siguiente" tras responder | Ya funcionaba por diseño en actividades y quizzes | **🆕 Se deja como garantía explícita y verificable: contestar (bien o mal) siempre desbloquea, nunca se exige acertar** |
| Verificación de recorrido completo | Se exige siempre antes de ver la nota | **🆕 Se omite automáticamente durante los reintentos — ya se verificó en el primer intento** |
| Autoguardado y restauración | Guardado cada 20s + eventos de salida | **🆕 Orden de arranque blindado (`load()` antes de `render()`), capa `pagehide`, guardado en cada cambio de slide, y prohibición explícita de resetear `st.slide` a 0 si hay sesión guardada** |
| Aislamiento de datos por estudiante | Clave de sesión compartida por materia+semana (riesgo de contaminación en computadores compartidos) | **🆕 Clave de sesión obligatoria por `materia+semana+studentId` — un estudiante nuevo SIEMPRE arranca en cero; nunca hereda nota, medallas o avance de otro estudiante del mismo equipo (Prioridad 8-C)** |
| Panel docente (Prioridad 16) | Presente | **Se mantiene íntegro, sin cambios — sigue siendo obligatorio en todo el sistema (ver checklist "PANEL DOCENTE OCULTO")** |
---
## ═══════════════════════════════════════
## 📌 RESUMEN EJECUTIVO DE GARANTÍAS v6.0
## ═══════════════════════════════════════
Al usar este prompt, **cada clase generada garantiza:**
**☀️ Nunca más una clase con fondo oscuro**
La paleta se verifica con una fórmula de luminosidad real (HSL ≥ 90% en el fondo principal), no solo con la intención de "usar colores claros". Hay una lista de colores prohibidos y una tabla de paletas corregidas y probadas.
**🎭 Cada clase se ve y se siente diferente a la anterior**
El universo temático (Minecraft, Pokémon, Encanto, etc.) rota obligatoriamente — nunca se repite el mismo tema dos semanas consecutivas en la misma materia.
**📒📓 Los dos cuadernos siempre a la mano**
Botones visibles en el menú superior en todo momento, con indicador de qué tanto se ha completado. Se abren como paneles flotantes sin interrumpir el recorrido de la clase.
**📔 Cuadernos que se ven y se sienten como una agenda real**
Cinta adhesiva, post-its de colores, fecha tipo agendero — no una hoja rayada genérica. El Cuaderno 2 tiene solo 3-4 ejercicios cortos, ajustados a las 2 horas semanales de clase.
**🗺️ El estudiante siempre sabe qué le falta**
El sidebar agrupa la clase en secciones con nombres claros y un estado visual (completo, actual, parcial, pendiente), más una barra de progreso total.
**🔒 La nota final no aparece si faltan slides por ver**
Aunque el estudiante complete los 3 quizzes, si no ha pasado por todas las demás partes de la clase, no ve su nota — ve un aviso claro con un botón que lo lleva directo a lo que falta.
**🕵️ El panel docente es invisible para los estudiantes**
Clave de 7 dígitos (5813645) que solo se activa con clic en una zona oculta + teclado físico. Sin pistas visuales que delaten su existencia. Incluye reactivar las 8 vidas del estudiante con un clic.
**🧰 Los estudiantes también tienen su propio menú de apoyo**
Glosario, calculadora con bloc de notas, y pistas generales que orientan sin revelar la respuesta — todo en un panel accesible y visible.
**📖 Ningún slide de lectura se salta en menos de 12 segundos**
**🎨 Los slides son visuales, no periódicos, con ejemplos resueltos antes de cada quiz**
**🔒 Ninguna actividad se puede saltar sin contestar — ni las que no tienen nota**
**🔍 La sopa de letras tiene 2 pistas visuales**
**✅ Solo los quizzes de opción múltiple generan nota — 30 preguntas, cálculo exacto**
**❤️ 8 vidas para reintentar — solo los quizzes se resetean**
**💾 El progreso nunca se pierde — guardado cada 20 segundos + botón físico + sync con index**
---
## ═══════════════════════════════════════
## 📌 RESUMEN EJECUTIVO DE GARANTÍAS ADICIONALES v6.1
## ═══════════════════════════════════════
**⏱️ El cronómetro de lectura ahora es de 12 segundos**, no 9, en todos los slides de lectura (`info`, `repaso`, `video`).
**🎯 Reintentar una vida ya no obliga a recorrer toda la clase de nuevo**
Si el estudiante ya vio las slides, al usar una vida el sistema lo lleva directo a los evaluables pendientes (Quiz 1, Quiz 2 y/o Evaluación Final), sin cronómetros de espera, y con un mensaje protagonista que le dice exactamente qué le falta responder.
**✅ Contestar — bien o mal — siempre desbloquea "Siguiente"**
Ninguna actividad, evaluada o no, exige acertar para poder avanzar; basta con responder.
**💾 El progreso y la posición exacta del estudiante nunca se pierden**
Guardado automático reforzado (cada 20 segundos, en cada cambio de slide, y en `pagehide`/`beforeunload`/`visibilitychange`), con un orden de arranque blindado que garantiza que la página siempre restaura al estudiante en el slide exacto donde quedó, sin importar si recargó, cerró por error, o volvió a entrar desde el index.
**🕵️ El Panel Docente (Prioridad 16, clave 5813645) se mantiene íntegro** en este documento, con todas sus pestañas, estética y sistema de activación oculta sin ningún cambio.
**🧍 Un estudiante nuevo SIEMPRE empieza desde cero**
Se corrigió un bug crítico de contaminación de datos entre estudiantes que comparten computador: la clave de guardado local ahora incluye el id único del estudiante que entrega el index, así que un estudiante nuevo nunca hereda nota, medallas ni avance de otro estudiante que haya usado el mismo equipo — y la semana/slide se mantiene siempre sincronizada con el index para el estudiante correcto.
---
## ═══════════════════════════════════════
## 📌 RESUMEN EJECUTIVO DE GARANTÍAS ADICIONALES v6.2
## ═══════════════════════════════════════
**📒📝 Los cuadernos jamás son slides ni se duplican**
Cuaderno 1 y el Taller en Clase (antes "Cuaderno 2") viven exclusivamente en sus paneles flotantes del navbar — nunca aparecen dentro del contenido de una slide, nunca ocupan una posición en el recorrido, y nunca bloquean el avance. La estructura de la clase quedó en 23 slides reales.
**📝 El Taller en Clase ahora es la Nota 2 de la clase**
Renombrado de "Cuaderno 2" a "Taller en Clase", con 4 o 5 ejercicios sintetizados y ya explicados en alguna slide previa, un banner grande indicando que se desarrolla en el cuaderno físico, y aviso explícito de que el docente lo calificará como Nota 2.
**📒 El Cuaderno 1 siempre lleva fecha y un banner de "cópialo en tu cuaderno"**
Contenido de longitud media (ni muy corto ni muy largo), con forma de agenda real, y un aviso grande en negrita indicando que ese contenido se copia en el cuaderno físico.
**🔍 Sopa de letras rediseñada: máximo 5 palabras, sin bloquear la página**
Grilla con espacio suficiente para todas las palabras, selección marcando primera y última letra, pista que primero pregunta para cuál palabra específica se quiere ayuda, y progreso (palabras encontradas + pistas usadas) que nunca se pierde al recargar — solo se reinicia si el estudiante usa una vida para los quizzes (la sopa de letras ni siquiera se ve afectada por eso).
**🔒 Un quiz ya respondido nunca vuelve a sumar nota**
Las respuestas quedan fijas para siempre dentro del mismo intento; recargar, salir y volver a entrar, o navegar entre slides jamás reinicia ni vuelve a contar un quiz — solo usar una vida puede hacerlo.
**⭐ El XP y los clics nunca afectan la nota**
Solo las actividades evaluables definidas (quizzes, evaluación final) y el Taller en Clase (Nota 2, manual) inciden en la calificación del estudiante.
**💌 Mensajes motivacionales personalizados del docente**
Cada cierto tiempo o al alcanzar ciertos hitos de nota, aparece un mensaje cálido y personalizado —como si lo escribiera el propio profesor— animando al estudiante, sin revelar respuestas ni afectar la nota.
---
## ═══════════════════════════════════════
## 📌 RESUMEN EJECUTIVO DE GARANTÍAS ADICIONALES v6.3
## ═══════════════════════════════════════
**📍 Con 2, 5 o 20 estudiantes registrados, cada uno siempre reabre en su propio slide exacto**
Se corrigió el bug donde la nota se guardaba correctamente pero el slide volvía a 0 en cuanto había varios estudiantes usando la misma clase. La causa era usar dos identidades distintas (nombre para la nota, un id volátil para el slide). Ahora ambas cosas —nota y posición exacta del slide— se basan en la misma identidad estable (el nombre normalizado del estudiante), con una capa de auto-reparación que reconecta sesiones antiguas sin perder progreso y sin mezclar datos entre estudiantes distintos (Prioridad 8-D).
---
## ═══════════════════════════════════════
## 📌 RESUMEN EJECUTIVO DE GARANTÍAS ADICIONALES v6.4
## ═══════════════════════════════════════
**💡 La pista de la sopa de letras ahora es 100% visual, nunca de texto**
Se corrigió: antes el toast de la pista escribía "empieza con tal letra", lo cual revelaba la respuesta por texto en vez de solo mostrarla en la grilla. Ahora la pista ilumina, dentro de la propia sopa de letras y en su ubicación real (no cualquier letra repetida en otro lugar), las dos primeras casillas de la palabra elegida — ambas al mismo tiempo, durante 4 a 5 segundos — sin que ningún mensaje mencione la letra o la palabra.
---
## ═══════════════════════════════════════
## 📌 RESUMEN EJECUTIVO DE GARANTÍAS ADICIONALES v6.5
## ═══════════════════════════════════════
**📝 El Taller en Clase ahora se resuelve 100% en el cuaderno físico, no en el computador**
Al abrir el panel aparece un título grande "📝 Taller en Clase — Nota 2" y, justo debajo, en texto rojo, "Responde esto en tu cuaderno". El panel ya no incluye ningún `<textarea>` ni campo para escribir con el teclado — solo muestra los 4-5 enunciados con su botón de ejemplo, porque el estudiante los resuelve en papel, no en la pantalla.
---
## ═══════════════════════════════════════
## 📌 RESUMEN EJECUTIVO DE GARANTÍAS ADICIONALES v6.6
## ═══════════════════════════════════════
**🧹 Cuadernos simples y claros, sin post-its ni enredo visual**
Se quitaron los post-its de colores rotados y las fotos inclinadas de ambos cuadernos. Ahora es un diseño limpio tipo agenda: fecha, título, y una lista simple de conceptos/definiciones/fórmulas/ejemplos, uno debajo del otro, sin distracciones — se ve de un vistazo exactamente qué hay que copiar.
**✅ Botón de cerrar y confirmar en ambos cuadernos**
Cuaderno 1 y Taller en Clase ahora tienen un botón "✅ Ya lo copié — Cerrar" que cierra el panel y deja una marca de que el estudiante confirmó haber copiado el contenido, reflejada en la insignia del navbar.
---
## ═══════════════════════════════════════
## 📌 RESUMEN EJECUTIVO DE GARANTÍAS ADICIONALES v6.7
## ═══════════════════════════════════════
**🎲 El progreso ahora se puede ver como un tablero de juego**
Nueva alternativa al sidebar plano: un mapa de camino ilustrado, con casillas conectadas y un avatar que avanza a medida que el estudiante progresa — mismo dato y misma lógica de bloqueo que el sidebar clásico, solo que mucho más motivador visualmente (Prioridad 10-D).
**🔵 Imágenes con puntos calientes**
Alternativa opcional al grid 2×2: una imagen grande con 3-4 puntos pulsantes que revelan datos al tocarlos, más interactiva que solo mirar fotos (Prioridad 19).
**🏆 Vitrina de logros acumulados entre semanas**
Nueva galería accesible desde el navbar que muestra todas las medallas ganadas en clases anteriores de la materia, no solo la de hoy — como una estantería de trofeos que crece semana a semana (Prioridad 20).
---
## ═══════════════════════════════════════
## 📌 RESUMEN EJECUTIVO DE GARANTÍAS ADICIONALES v6.8
## ═══════════════════════════════════════
**🏫 501, 502 y cualquier grupo comparten computador sin mezclar nunca su progreso**
La identidad del estudiante ahora combina grupo/salón + nombre normalizados (no solo el nombre), así que dos estudiantes con el mismo nombre en secciones distintas jamás comparten nota ni avance, aunque usen exactamente el mismo equipo (Prioridad 8-E).
**🚪 Acceso directo sin pasar por el index — corregido en v6.9**
Ya no se le pide nombre ni grupo por formulario al estudiante que entra directo (eso arriesgaba errores de sincronización por nombres mal escritos). Ahora el sistema simplemente lo advierte con un aviso rojo grande, tanto al empezar como al terminar, dejando claro que esa sesión no se guarda ni tiene nota — ver el resumen v6.9 más abajo.
**🏠 Un botón fijo para volver al index de forma segura**
Nuevo botón "🏠 Inicio", siempre visible en el navbar, que primero guarda el progreso, luego sincroniza con el index, muestra una confirmación visual, y solo después navega — el estudiante nunca vuelve a preguntarse "¿esto se guardó?" antes de salir (Prioridad 21).
---
## ═══════════════════════════════════════
## 📌 RESUMEN EJECUTIVO DE GARANTÍAS ADICIONALES v6.9
## ═══════════════════════════════════════
**🚨 Acceso directo sin index: aviso rojo, nunca formulario de nombre/grupo**
Se corrigió el riesgo de que un estudiante escribiera su nombre distinto al del registro del index (generando desincronización). Ahora, si falta el contexto del index, aparece un aviso rojo grande junto al nombre/HUD diciendo que la clase no se guardará ni tendrá nota, y el mismo aviso reaparece al terminar si el estudiante llegó al final sin haber entrado por el index. El sistema nunca escribe en el índice sin identidad confiable.
**📜 Contrato de datos exacto con el índice**
Nueva Prioridad 8-F: la clave de guardado y los campos del objeto JSON quedan fijados de forma innegociable (`nota, porcentajeAvance, xp, medallas, semaforo, ultimoAcceso, vidasUsadas, version`), para que la clase y el index.html siempre hablen exactamente el mismo idioma de datos — incluyendo recomendaciones de sincronización en vivo y seguridad para el archivo index.html.
**🧑‍🚀 Avatar propio, carta sorpresa, elige tu actividad y semáforo de confianza**
Cuatro mecánicas nuevas de gamificación: el estudiante elige su propio avatar (Prioridad 22), puede recibir una carta sorpresa formativa tras actividades complementarias (Prioridad 23), puede elegir entre 2 tipos de actividad complementaria equivalente (Prioridad 24), y se autoevalúa con un semáforo de confianza antes de cada quiz — dato reflexivo, nunca calificado (Prioridad 25).
---
## ═══════════════════════════════════════
## 🔺🔺🔺 RESUMEN EJECUTIVO — CORRECCIÓN CRÍTICA v7.0 (TRIPLE PRIORIDAD)
## ═══════════════════════════════════════
**🐛 El bug: nota guardada, pero el estudiante vuelve al slide 1**
Se detectó y corrigió la causa raíz de un error grave: el documento había acumulado, a través de varias versiones, distintas declaraciones de `PREFIX`/`SKEY`/`load()`/`save()` (Prioridades 8, 8-B, 8-C, 8-D, 8-E) sin anular formalmente las anteriores. Esto hacía que la función de auto-reparación buscara un formato de clave viejo que ya no coincidía con el nuevo, perdiendo `st.seen` y `st.slide` — aunque la nota (guardada en una clave completamente aparte, Prioridad 8-F) sobreviviera intacta.
**✅ La solución: una única fuente de verdad (Prioridad 8-G)**
Ahora existe UNA SOLA versión, definitiva e innegociable, de toda la lógica de identidad y persistencia de avance — marcada como triple prioridad, con un aviso al inicio mismo del documento, todas las versiones anteriores explícitamente anuladas línea por línea, una prueba obligatoria de simulación mental, y un checklist específico que exige verificar que no exista ninguna declaración duplicada en el archivo final.
---
## ═══════════════════════════════════════
## 📌 RESUMEN EJECUTIVO — SIMPLIFICACIÓN CRÍTICA v7.2
## ═══════════════════════════════════════
**🔑 El contrato con el índice ahora usa clave única por estudiante — imposible de "romper por fusión"**
Al auditar 4 índices reales en producción se encontraron 3 arquitecturas de datos distintas — y uno de ellos (Tecnología 5°) tenía exactamente el bug de "un estudiante borra el progreso del anterior" que ya se había corregido en Aritmética 5° con un patrón de fusión. Se confirmó que ese patrón de fusión, aunque correcto en teoría, es fácil de implementar mal. Por eso la Prioridad 8-F ahora usa el patrón más seguro y ya probado sin fallas en 2 de los 4 índices reales: cada estudiante tiene su propia clave de `localStorage`, única, con su nombre incluido en la clave misma — estructuralmente imposible que dos estudiantes se pisen, sin depender de que ninguna lógica de fusión esté bien implementada.
**📇 Nuevo Prompt Maestro para index.html**
Se creó un documento dedicado y compatible, para generar o corregir el archivo `index.html` de cualquier materia con el mismo contrato exacto que las clases — mismo patrón de clave, mismos campos, mismo criterio de identidad.
---
## ═══════════════════════════════════════
## 📌 RESUMEN EJECUTIVO DE GARANTÍAS ADICIONALES v7.3
## ═══════════════════════════════════════
**🏙️ Contexto local de Cúcuta, Norte de Santander**
Nueva Prioridad 14-B: las clases ahora incluyen referencias a lugares reales de la ciudad (Ventura Plaza, Jardín Plaza, Unicentro, El Malecón, Río Zulia, etc.) en analogías y enunciados de ejercicios, junto a las referencias de cultura pop ya existentes.
**🚫 Videos eliminados — reemplazados por ejercicios prácticos**
El slide de video queda eliminado por completo. En su lugar, la Prioridad 2 ahora define un slide de 2-3 ejercicios resueltos paso a paso, ligados directamente a lo que se preguntará en el Quiz 2 o la Evaluación Final.
**🔍 Pista de la sopa de letras — garantía de funcionamiento**
Se refuerza la Prioridad 0-D con una verificación obligatoria: toda palabra de la sopa debe tener su posición real guardada desde el momento en que se genera la grilla, nunca después — y se agrega una prueba manual de "pedir pista para cada palabra" antes de entregar el código.
**🔢 Nota final mucho más grande**
La nota en la pantalla final pasó de `clamp(4rem,10vw,6.5rem)` a `clamp(6rem,20vw,11rem)`, centrada, para que se pueda leer con claridad incluso mostrando la pantalla a distancia.
**❤️ Las vidas se usan en cualquier momento**
Se refuerza que el botón de reintentar vive en el navbar fijo, visible y funcional desde el slide 1 hasta el final — nunca limitado a la pantalla de cierre.
**📜 Barra de desplazamiento visible**
Nueva Prioridad 12-B: scrollbar gruesa y con color del tema, tanto en Firefox como en Chrome/Edge, para que nunca quede casi invisible.
**📒 Cuaderno 1 simplificado al máximo**
Sin imágenes ni gráficos de ningún tipo — solo fecha, nombre de la semana (ej. "Semana 3"), título de la clase y una lista compacta de conceptos/definiciones, con letra de tamaño medio y espaciado ajustado, para que se vea claramente que no es mucho texto por copiar.
---
## ═══════════════════════════════════════
## 📌 RESUMEN EJECUTIVO DE GARANTÍAS ADICIONALES v7.4
## ═══════════════════════════════════════
**🎬 Transiciones animadas entre slides**
Cada cambio de slide ahora entra con una animación breve de deslizamiento y desvanecido — se siente como pasar la página, no como una recarga brusca.
**🎉 Reacciones rápidas tipo emoji**
Al completar cualquier actividad, además del toast habitual, aparecen emojis flotando y desvaneciéndose — un feedback más vivo, sin reemplazar el mensaje de texto existente.
**🔀 Modo "antes y después" con slider de comparación**
Nueva alternativa visual para conceptos de comparación/transformación: una imagen dividida con una barra deslizable, más llamativa que dos fotos sueltas.
**🌄 Parallax sutil en el fondo decorativo**
El patrón de fondo del tema se mueve a una fracción de la velocidad del scroll, dando sensación de profundidad — siempre sutil, y se desactiva si el estudiante prefiere menos movimiento.
**💌 Mensajes del docente: máximo 3 por clase**
Antes podían aparecer cada 7 minutos sin límite; ahora hay un tope estricto de 3 mensajes por sesión completa, con intervalos más espaciados, para que cada uno se sienta especial.
**🚫 Video: prohibición reforzada**
Se agregó una prohibición explícita adicional en los requisitos técnicos — ninguna clase debe volver a incluir un slide de video bajo ninguna circunstancia.
---
*Prompt Maestro Definitivo v12.0 — Luis Alberto Avellaneda*
*v7.5: Blindaje anti-trampa (Atrás nunca infla la nota, actividades permanentes), menú de progreso 100% no-navegable y rediseñado (compacto, gamificado, con nodos de nota resaltados y estados visitado/veiled), vidas solo desde pantalla final, verificación paso a paso en matching/fill/tf/orden, transiciones/reacciones/parallax/slider mejorados, mensajes del docente sin temporizador libre.*
*Cúcuta, Colombia · Para cualquier materia y grado*
*Basado en: semana3_tech.html + prueba_aritmetica_grado_4.html*
**Historial de versiones:**
- v14.0: 🆕🆕🆕 **Prioridad Alta 30-C — ARIA lee toda la clase y explica conceptos/procesos con palabras simples.** Se agrega `indexarContenidoClaseAria()` (lee texto y `type` real de todas las diapositivas de `SL`), `extraerPasosAria()` (reconoce secuencias numeradas o marcadas con "primero/luego/después/finalmente"), `simplificarLenguajeAria()` (baja el registro sin cambiar el significado) y `explicarConceptoOProcesoAria()`, que arma la explicación final y **excluye siempre** las diapositivas `quiz`/`evalFinal` de su búsqueda — nunca las lee ni las cita. `responderAria()` (Prioridad 30.3) queda con una única versión definitiva, documentada íntegra en la 30-C, con el orden: pregunta de quiz copiada (30-B) → `CLASE_META` → `GLOSARIO` → `METODOS` opcional → explicación profunda (30-C) → reglas genéricas → honestidad final. Ninguna prioridad existente (0 a 32) cambió su comportamiento — v14.0 es 100% aditiva sobre ARIA.
- v12.0: 🔺🔺🔺 **BLINDAJE ANTI-BLOQUEO TOTAL** — bug real de producción confirmado auditando `semana2_mat4_p4.html`: el cronómetro de lectura se reiniciaba solo (el propio vigilante de 8-N lo reiniciaba en cada pasada) y la retroalimentación del quiz se perdía al recargar/ir atrás-adelante ("se salta la pregunta"). Se crean las Prioridades **8-O** (núcleo único de navegación: `puedeAvanzar`, `aplicarEstadoAvance`, `revalidarAvance`, `render`, `nextSlide`, `prevSlide`), **8-P** (motor único del quiz con retroalimentación persistente), **8-Q** (modales con cola — `showModal`/`closeModal` únicos), **8-R** (onclick seguro: solo ids y números, nunca texto ni funciones serializadas), **8-S** (todo temporizador de actividad se limpia al cambiar de slide) y **8-T** (protocolo de prueba automática obligatoria — `prueba_clase.js` incluido íntegro). Se REESCRIBEN 0-A, 4, 8-M y 8-N, y se ELIMINAN de las Prioridades 0-A, 0-C, 2, 4, 5, 6-B y 8-H todas las versiones parciales/contradictorias de `activarCronometroLectura`, `puedeAvanzar`, `render`, `nextSlide`, `habilitarBtnNext`, `rQuiz`, `responderQuiz` y `mostrarRetroQuiz` que quedaban repartidas por el documento — ahora cada función tiene EXACTAMENTE una definición vigente. También se corrige `pd_resetQuizzes()` (Prioridad 16, no borraba los candados `q_contada_*` — dejaba el quiz reseteado sin poder responderse) y `renderConTransicion()` (Prioridad 26, el `setTimeout` de 180ms podía pintar el HTML fuera de orden).
- v11.4: 🔺🔺🔺 **Nueva Prioridad Absoluta Máxima 8-N** — bug real de producción confirmado: la clase se congelaba y dejaba de responder a los clics tras un rato de uso, obligando a refrescar la página. Causa raíz: `activarCronometroLectura()` (Prioridad 0-A) guardaba el `setInterval` del cronómetro de lectura en una variable local, que solo se limpiaba dentro de su propio callback al llegar a 0 segundos — si el estudiante cambiaba de slide antes de que terminara la cuenta (botón "Atrás", menú lateral, salto desde el índice), ese intervalo quedaba corriendo para siempre en segundo plano, y cada regreso a una slide de lectura sin terminar la cuenta anterior sumaba OTRO intervalo más, acumulando temporizadores "fantasma" hasta agotar memoria/CPU del navegador. Se anuló explícitamente el manejo del intervalo de la Prioridad 0-A y se dejó como única implementación válida la de 8-N: el handle vive siempre en `window.__cronometroInterval`, `detenerCronometroLectura()` lo limpia junto con el indicador visual, `activarCronometroLectura()` lo llama antes de crear un intervalo nuevo, y `render()` lo llama como su primera línea en todo cambio de slide, sin excepción · La estructura visual del indicador (icono, barra de progreso, textos) de la Prioridad 0-A NO cambió, solo el manejo del `setInterval` · Ninguna otra prioridad existente se modificó — v11.4 es 100% aditiva salvo el manejo del intervalo ya anulado
- v11.3: 🔺 **Limpieza de código muerto — se retiran los bloques completos de `PREFIX`/`SKEY`/`load()`/`save()` ya ANULADOS que quedaban en las Prioridades 8, 8-C, 8-D y 8-E**, dejando solo una nota corta que apunta a la versión vigente (8-G para `load()`/`save()`, 8-K para `PREFIX`/`SKEY`) en vez de dos implementaciones completas de las mismas funciones conviviendo en el documento. Se conservó el diagnóstico/razonamiento de cada sección (por qué existía el problema, qué debía garantizar la solución), que sigue siendo válido como contexto aunque el código ya no se implemente ahí. Se corrigió además una inconsistencia real en la nota que anulaba el `PREFIX` de la Prioridad 8-G: decía que `SKEY` seguía siendo `PREFIX + '_session'`, pero el código vigente de 8-K en realidad agrega el nombre normalizado del estudiante al sufijo (`` `${PREFIX}_${NOMBRE_NORM||'sinregistro'}_session` ``) — la nota ahora coincide con el código real. No se tocaron los bloques de la Prioridad 2/5 (estructura HTML del quiz) ni de la 8-F (`construirIndexKey()`), que el documento ya explicaba que se dejaban a propósito como referencia · Ningún comportamiento de v11.1/v11.2 cambió — v11.3 es limpieza de redundancia y una corrección de un comentario, no de código funcional
- v11.2: 🔺 **Correcciones de consistencia sobre v11.1 + nuevo Protocolo de Aplicación Obligatoria.** (1) Se corrigieron cuatro menciones sueltas a "3 vidas" que quedaron sin actualizar cuando 8-M subió `MAX_VIDAS` a 8: los títulos de la Prioridad 6 y 6-C, el subtítulo "❤️ 3 VIDAS" de la Prioridad 6, y el texto fijo "3 oportunidades" del toast de `pd_reactivarVidas()` (Prioridad 18) — ahora usan `MAX_VIDAS` o el texto genérico "vidas". Los "3" dentro del historial de versiones (v4.1, v6.0, v7.5) se dejaron intactos por ser registro histórico de esas versiones, no la especificación vigente. (2) Se agregó, dentro de la Prioridad 8-B, la regla explícita de que `save()` debe llamarse de forma síncrona en la misma función manejadora de CUALQUIER interacción que modifique `st` — no solo al cambiar de slide — para que perder la conexión o refrescar a mitad de una actividad (ej. a mitad de la slide 6) nunca borre avance ya hecho; generaliza el patrón puntual que 8-H, 8-I y el manejo de pistas ya exigían. (3) Se agregó al inicio del documento un **Protocolo de Aplicación Obligatoria** que exige leer el documento completo antes de generar código, procesarlo por bloques si es necesario sin omitir ninguno, respetar las notas "ANULADO por" al elegir qué versión de una función implementar, y confirmar contra una lista de las 40 prioridades del documento antes de entregar cualquier clase · Ninguna prioridad de contenido (0 a 32) se modificó — v11.2 es aditiva y de consistencia, no cambia ningún comportamiento ya especificado en v11.1
- v4.1: Imágenes Unsplash · Video embebido · 3 Vidas · Cuaderno visual · Nota en pantalla final
- v5.0: Nota desde 0 · Solo quizzes generan nota · 30 preguntas · Aleatorización · Retroalimentación · Botón guardar · Sync con index
- v5.1: Cronómetro 9s en slides de lectura · Slides visuales (máx texto, ejemplos resueltos) · Bloqueo universal de actividades · Mensaje "no afecta nota pero complétala" · Sopa de letras con 2 pistas visuales
- v6.0: 🆕 Paleta clara verificada numéricamente · 🆕 Temática visual rotativa entre clases · 🆕 Cuadernos accesibles desde menú superior con diseño de agenda real · 🆕 Cuaderno 2 reducido a 3-4 ejercicios · 🆕 Sidebar con mapa de progreso por secciones · 🆕 Nota final bloqueada hasta completar todas las slides · 🆕 Panel docente con clave de 7 dígitos camuflada (zona invisible + teclado físico) · 🆕 Herramienta docente "reactivar 3 vidas" · 🆕 Menú de herramientas para el estudiante (glosario + calculadora + pistas)
- v6.1: 🆕 Cronómetro de lectura subido de 9 a 12 segundos · 🆕 Reintento dirigido de vidas — sin cronómetro y con salto directo a los evaluables pendientes (Prioridad 6-B) · 🆕 Banner protagonista que indica exactamente qué falta por responder en el reintento · 🆕 Garantía explícita: responder (bien o mal) siempre desbloquea "Siguiente" · 🆕 Verificación de recorrido completo omitida durante reintentos · 🆕 Blindaje de autoguardado y restauración exacta de posición (Prioridad 8-B): orden de arranque `load()` antes de `render()`, capa `pagehide`, guardado en cada cambio de slide · 🆕 Aislamiento de datos por estudiante (Prioridad 8-C): la clave de sesión local ahora incluye el id único del estudiante entregado por el index — un estudiante nuevo nunca hereda nota, medallas ni avance de otro estudiante que use el mismo computador · 🆕 Confirmación de que el Panel Docente (Prioridad 16, clave 5813645) permanece íntegro en el documento
- v6.2: 🆕 Los cuadernos DEJAN de ser slides — Cuaderno 1 y Taller en Clase son exclusivamente paneles flotantes, nunca se duplican dentro del recorrido (estructura ajustada a 23 slides reales) · 🆕 "Cuaderno 2" renombrado a "Taller en Clase", ahora es la Nota 2 de la clase calificada manualmente por el docente, con 4-5 ejercicios sintetizados y banner grande de aviso · 🆕 Cuaderno 1 con banner grande "copia esto en tu cuaderno", fecha siempre visible y longitud media · 🆕 Sopa de letras rediseñada: máximo 5 palabras, grilla con espacio suficiente, selección por primera y última letra, pista que pregunta la palabra específica, progreso persistente que nunca se resetea al recargar, sin bloquear la página · 🆕 Garantía explícita de permanencia de quizzes ya respondidos — nunca se vuelven a contar ni preguntar salvo reintento con vida · 🆕 Garantía explícita de que XP/clics nunca afectan la nota · 🆕 Mensajes motivacionales personalizados del docente por tiempo o por hito de nota (Prioridad 18)
- v6.3: 🆕 Corrección del bug de restauración de slide con múltiples estudiantes registrados (Prioridad 8-D): la identidad para guardar la posición del slide ahora se basa en el nombre normalizado del estudiante — la misma base que ya usaba la nota — con una capa de auto-reparación que reconecta sesiones antiguas guardadas bajo un id distinto, sin perder progreso ni mezclar datos entre estudiantes
- v6.4: 🆕 Corrección del mecanismo de pista de la sopa de letras (Prioridad 0-D): ya NO se revela la letra por texto/toast — ahora ilumina la ubicación EXACTA de la palabra dentro de la propia grilla (usando `s.posicionesWS`), con ambas letras iluminadas simultáneamente durante 4 a 5 segundos
- v6.5: 🆕 El Taller en Clase (Nota 2) ya NO lleva textarea/input de ningún tipo — título grande "📝 Taller en Clase — Nota 2" y aviso en rojo "Responde esto en tu cuaderno"; los 4-5 ejercicios se muestran solo como enunciado + botón de ejemplo, porque se resuelven en el cuaderno físico, no en el computador
- v6.6: 🆕 Se quitaron los post-its de colores y las fotos inclinadas de ambos cuadernos — diseño limpio y claro tipo lista (fecha + título + conceptos/definiciones/ejemplos uno debajo del otro) · 🆕 Ambos cuadernos (Cuaderno 1 y Taller en Clase) tienen botón "✅ Ya lo copié — Cerrar" que cierra el panel y marca la insignia del navbar
- v6.7: 🆕 Mapa de camino tipo juego de mesa (Prioridad 10-D) como alternativa visual y motivadora al sidebar plano, con avatar que avanza casilla por casilla · 🆕 Imágenes con puntos calientes/hotspots (Prioridad 19) como alternativa opcional al grid 2×2 · 🆕 Vitrina de logros acumulados entre semanas (Prioridad 20): galería de medallas de TODAS las clases anteriores de la materia, accesible desde el navbar
- v6.8: 🆕 Identidad reforzada con grupo/salón (Prioridad 8-E): la clave de sesión y la nota ahora combinan grupo + nombre normalizados, así 501 y 502 (u otros grupos) que comparten computador y hasta nombres coincidentes nunca mezclan su progreso · 🆕 Manejo de acceso directo sin pasar por el index: si falta el contexto, se pide nombre y grupo con un modal amable antes de continuar · 🆕 Botón fijo "🏠 Inicio" (Prioridad 21) que guarda y sincroniza ANTES de volver al index, con confirmación visual
- v6.9: 🆕 Corrección del manejo de acceso directo (Prioridad 8-E): ya NO se pide nombre/grupo por formulario — aviso rojo grande al empezar y al terminar si la clase no vino del index, y syncIndex() nunca escribe sin identidad confiable · 🆕 Contrato de datos exacto con el índice (Prioridad 8-F): clave y campos JSON fijados de forma innegociable, con validación, semáforo de participación calculado y versión de esquema · 🆕 Avatar propio (Prioridad 22), Carta sorpresa formativa (Prioridad 23), Elige tu actividad (Prioridad 24) y Semáforo de confianza antes de cada quiz (Prioridad 25)
- v7.0: 🔺🔺🔺 CORRECCIÓN CRÍTICA — Fuente única de verdad para identidad de sesión y restauración de avance (Prioridad 8-G, triple prioridad): se eliminó la causa raíz del bug donde la nota se guardaba pero el estudiante volvía al slide 1 sin su avance visto. Ahora existe una única declaración válida de PREFIX/SKEY/load()/save()/markSeen(), con todas las versiones anteriores (Prioridades 8, 8-B, 8-C, 8-D, 8-E) explícitamente anuladas, una prueba obligatoria de simulación, y un aviso de máxima prioridad al inicio del documento
- v7.2: 🔑 Simplificación crítica del contrato de datos con el índice (Prioridad 8-F): tras auditar 4 índices reales y confirmar que el patrón de "clave compartida + fusión" tenía el mismo bug de autodestrucción en un caso real (Tecnología 5°), se adoptó el patrón de clave única por estudiante (ya probado sin fallas en Aritmética 4° y Tecnología 4°) — syncIndex() ahora escribe directo, sin fusionar nada · 🆕 Nuevo Prompt Maestro dedicado para generar/corregir index.html, compatible con este mismo contrato
- v7.3: 🆕 Contexto local de Cúcuta/Norte de Santander (Prioridad 14-B) · 🚫 Videos eliminados, reemplazados por slide de 2-3 ejercicios prácticos ligados al quiz/examen (Prioridad 2) · 🔍 Garantía de funcionamiento de la pista de la sopa de letras (Prioridad 0-D) · 🔢 Nota final mucho más grande y centrada, visible desde lejos · ❤️ Refuerzo: las vidas se usan en cualquier momento desde el navbar fijo · 📜 Barra de desplazamiento gruesa y visible (Prioridad 12-B) · 📒 Cuaderno 1 sin imágenes, con "Semana N" y letra de tamaño medio
- v7.4: 🆕 Transiciones animadas entre slides (Prioridad 26) · 🆕 Reacciones rápidas tipo emoji al completar actividades (Prioridad 27) · 🆕 Modo "antes y después" con slider de comparación (Prioridad 28) · 🆕 Parallax sutil en el fondo decorativo, respetando prefers-reduced-motion (Prioridad 29) · 💌 Mensajes motivacionales del docente limitados a un máximo estricto de 3 por clase (antes sin límite, cada 7 minutos) · 🚫 Prohibición explícita reforzada contra volver a agregar slides de video
- v10.0: 🆕🆕🆕 **ARIA, el robot asistente de la clase** (Prioridad 30): FAB flotante y arrastrable con burbuja de chat, chips de preguntas rápidas, motor de respuestas que consulta el GLOSARIO real de la semana (nunca inventa definiciones), voz por Web Speech API, saludo inicial personalizado con el nombre del estudiante, y prohibición explícita de revelar respuestas de evaluables · 🆕🆕🆕 **Imágenes propias embebidas en base64** (Prioridad 31): objeto `IMG` con data URIs para mascota, título, diagramas a medida y cierre — archivo 100% autocontenido sin depender de rutas externas, con flujo de conversión PNG/JPG→base64 y tabla de decisión de cuándo usar base64 propio vs. URL de Unsplash · 🆕🆕🆕 **Tabla de medidas exactas de layout** (Prioridad 32): ancho máximo estandarizado para el contenedor general, el grid 2×2 de fotos, las imágenes propias por tipo de slide y las burbujas de texto/chat, evitando que cualquier elemento visual crezca sin control · Ninguna prioridad existente (0 a 29) se modificó ni se eliminó — v10.0 es 100% aditiva
- v10.4: 🔺🔺🔺 **Sincronización con el Prompt Maestro de Index** — nueva **Prioridad Absoluta 0** (preguntas de configuración, idénticas al Index: área/grado/período/semana/línea real de INDEX_SEMANAS_META) y nueva **Prioridad Absoluta Máxima 8-K**, que anula la fórmula de `PREFIX`/`SKEY`/`INDEX_KEY` de 8-F y 8-G: la clase ya no reconstruye el prefijo del curso por su cuenta, lo recibe directo de `clase_contexto.storagePrefix` que el index ya calcula; agrega candado de nombre de archivo (copiado carácter por carácter de `INDEX_SEMANAS_META[n].archivo`, nunca inventado), entrega obligatoria de la clase junto con la línea de index correspondiente cuando la semana es nueva, y una autoverificación en tiempo real que avisa en pantalla si el número de semana que el index abrió no coincide con el de este archivo · Ninguna otra prioridad existente se modificó — v10.4 es 100% aditiva salvo la fórmula de claves ya anulada
- v11.0.1: 🔺🔺🔺 **Nueva Prioridad Absoluta Máxima 8-L** — bug real de producción confirmado auditando `semana1_mat4_p4.html`: (1) `storagePrefix` que entrega el index ya incluye la semana, y el archivo real volvía a concatenarla en `skey()`, armando una clave con la semana duplicada que el index nunca podía encontrar; (2) `SKEY`/`INDEX_KEY` (que 8-K ya exige mantener separadas) habían colapsado en una sola función/clave, así que `syncIndex()` sobreescribía la sesión completa que `save()` acababa de guardar con un resumen sin `slide`/`seen` — el estudiante siempre reiniciaba en slide 1 aunque la nota sí quedara. 8-L deja explícito, con anti-patrón real y checklist de verificación obligatoria (incluida una prueba de simulación guardar→cerrar→reabrir), que este bug puede aparecer incluso cuando el código PARECE seguir la fórmula de 8-K al pie de la letra · Ninguna prioridad existente se modificó — v11.0.1 es 100% aditiva
- v11.0: 🔺 **Consolidación final — fusión de v10.1 + PARCHE_Sincronizacion_Index_Clases_v11 en un solo documento, sin contradicciones.** Antes, 8-F y 8-G se presentaban a sí mismas como "la ÚNICA fórmula válida, cópiese exactamente así" para `PREFIX`/`INDEX_KEY`, aunque 8-K (más abajo en el mismo documento) las anulaba — un lector o una IA generando el código de arriba hacia abajo podía implementar la versión vieja antes de llegar a 8-K. Se agregó, dentro del propio código de 8-F (fórmula `construirIndexKey()`) y 8-G (línea `const PREFIX = ...`), una nota en línea "⚠️ ANULADO por la Prioridad 8-K" en el punto exacto donde ya no aplica, y se corrigió `buscarSesionHuerfanaPorIdentidad()` (8-G) para buscar sesiones huérfanas con el `PREFIX` real de 8-K en vez de la fórmula `AUTOR_MATERIA_SIGLA_sN_` ya obsoleta — sin este ajuste, la auto-reparación de sesión nunca habría encontrado coincidencias bajo el nuevo formato de clave. Se confirmó además que `Prompt_Maestro_Index_v11.md` (v1.1) ya era consistente con 8-K sin necesitar cambios (su `leerProgresoUniversal()` ya leía exactamente los formatos `_data`/`_session` que 8-K genera). El parche independiente queda absorbido por completo — ya no hace falta aplicarlo por separado. Ninguna prioridad ajena a esta cadena (0, 8-C a 8-K) se tocó — v11.0 es funcionalmente idéntica a v10.4 más patch, solo sin las contradicciones internas
- v11.1: 🔺🔺🔺 **Nueva Prioridad Absoluta Máxima 8-M** — bug real de producción confirmado: dar clic varias veces muy rápido sobre una opción del quiz sumaba un acierto por cada clic, permitiendo inflar la nota o llegar a nota máxima desde el primer quiz. Se anuló explícitamente la versión de `rQuiz()`/`responderQuiz()` de la Prioridad 2/5 (sin guardias) y se dejó como única implementación válida la de 8-M: verificación de que `pregIdx` coincide con la pregunta actual ANTES de tocar la nota, cierre del candado anti-duplicado ANTES de sumar el acierto, deshabilitado físico e inmediato de los botones de opción en el mismo clic, y un tope duro en `calcTotal()` que impide que `st.aciertos` supere el total real de preguntas de la clase. También se corrigió que "Reset solo Quizzes" del panel docente redirija al estudiante al primer quiz pendiente (igual que `confirmarReintento()`, Prioridad 6-B) en vez de dejarlo en la misma slide donde estaba. Además, `MAX_VIDAS` sube de 3 a **8** en todo el documento (se probó primero en 6, pero se confirmó en producción que algunos estudiantes agotaban más de 6 intentos legítimos) — todas las referencias sueltas a "3 vidas" se reemplazaron por la constante `MAX_VIDAS` o por "8 vidas" según el caso · Ninguna otra prioridad existente se modificó — v11.1 es 100% aditiva salvo la versión de responderQuiz() ya anulada y el valor de MAX_VIDAS
- v10.1: 🔺🔺🔺 **Nueva Prioridad Absoluta Máxima 8-J** — bug real confirmado en producción (Tecnología 5°, Semana 1): `syncIndex()` (8-F) escribía su resumen personal bajo `KEY_PERSONAL = skey()`, la MISMA clave que `save()`/`load()` (8-G) usan para el progreso completo de la sesión — cada guardado sobreescribía slide/seen/quizActs con un objeto sin esos campos, causando que el estudiante reiniciara en la slide 1 y repitiera quizzes ya hechos, duplicando la nota. La Prioridad 8-J prohíbe de forma absoluta que cualquier clave escrita dentro de syncIndex() (o de cualquier función de sincronización) coincida con SKEY, exige un bloque único de declaración de claves con sufijos distintos, `console.assert()` de colisión en tiempo de ejecución, y una prueba obligatoria de "completar quiz → cerrar → reabrir" antes de entregar cualquier clase · Se agregaron ítems de checklist cruzados en 8-F y 8-G apuntando a esta prioridad · Ninguna prioridad existente se modificó — v10.1 es 100% aditiva

- v15.0: 🔺🔺🔺 **Nuevas Prioridades Absolutas Máximas 8-U, 8-V y 8-W.** **8-U:** la nota oficial es la MEJOR nota de todos los intentos (`notaOficial()` vs `calcTotal()`, `st.mejorNota`): reintentar nunca la baja. **8-V:** semana nueva = cero real — contexto del index de otra semana descartado, sesiones selladas con semana/curso/grupo/estudiante, auto-reparación estricta, acceso directo efímero (solo `sessionStorage`), eliminada la `syncIndex()` heredada con `IDX_SC`/`SEM_ID` que copiaba la nota previa. **8-W:** reintento a prueba de bloqueos — `iniciarNuevoIntento()` único, purga de candados `q_contada_*` huérfanos, vaciado de modales/overlays, `verificarQuizVivo()` con prueba de impacto, banner con `pointer-events:none`. Se agregan T7, T8 y T9 a `prueba_clase.js`. Se ajustaron `confirmarReintento()`, `pd_resetQuizzes()`, `pd_resetCompleto()`, `rFinal()`, bloque de vidas, `construirEntradaEstudiante()`, `load()`/`save()`, `PREFIX`, `calcTotal()`, `responderQuiz()`/`rQuiz()`/`resetearTodosLosQuizzes()`, `render()`/`revalidarAvance()` y `renderBannerReintento()`. No se eliminó ninguna prioridad anterior.


## ═══════════════════════════════════════
## 📌 RESUMEN EJECUTIVO — QUÉ SE ANALIZÓ Y QUÉ SE AGREGÓ EN v10.0
## ═══════════════════════════════════════
Esta versión nace de comparar el prompt v7.5 contra una clase HTML real (`semana1_mat4_p4.html`, Aritmética 4° Período 4, "Números Decimales") que ya tenía funcionando en producción varias características que el prompt no contemplaba. El análisis fue línea por línea del código real, no una suposición.

**Lo que se encontró que la clase real tenía y el prompt v7.5 NO pedía:**
1. **ARIA**, un asistente conversable completo: botón flotante arrastrable, burbuja de chat con historial, chips de preguntas rápidas contextuales al tipo de slide, motor de respuestas por reglas de palabras clave que primero busca en el `GLOSARIO` real de la semana, síntesis de voz con la Web Speech API del navegador (sin costo ni servicio externo), saludo inicial personalizado con el nombre del estudiante (mostrado una sola vez, persistido en `st.acts`), y estados visuales distintos (hablando/pensando/saludando/arrastrando). El prompt v7.5 solo tenía "tips" estáticos de un tipo de slide (un mensaje fijo, sin interacción ni memoria de glosario).
2. **Imágenes propias incrustadas como base64** en un objeto JS (`IMG`), usadas para la mascota, el título ilustrado, los diagramas hechos a medida de cada concepto de la semana y la imagen de cierre — todas como `data:image/...;base64,...` en vez de rutas de archivo externas. El prompt v7.5 solo contemplaba imágenes de apoyo vía URL de Unsplash (que sigue siendo válido y correcto para ESE uso, el grid 2×2 de fotos reales) pero no ofrecía ningún mecanismo para imágenes de diseño propio del autor de la clase.
3. **Medidas de ancho/alto exactas y consistentes** para cada tipo de elemento visual (contenedor general 1040px, fotos del grid 110px de alto, imágenes de concepto 320px de ancho máximo, burbujas de texto 380px, mensajes de chat al 88% del contenedor, etc.), que en la clase real se repiten de forma consistente en decenas de lugares pero que el prompt v7.5 nunca documentaba como un estándar reutilizable.

**Lo que se dejó exactamente igual (sin tocar) porque ya funcionaba bien y el usuario pidió no perder nada:**
- Las 29 prioridades absolutas y altas ya existentes (cronómetro de lectura, bloqueo universal de actividades, sopa de letras, paleta de colores, temática visual rotativa, sistema de nota por quizzes, 3 vidas, retroalimentación, sincronización con el índice cada 20 segundos, aislamiento de datos por estudiante, contrato de datos con el índice, estructura de 23 slides, cuadernos digitales, menú de ruta no navegable, pantalla final gamificada, identidad visual temática, gamificación, panel docente con clave 5813645, menú de herramientas del estudiante, requisitos técnicos, integridad de la nota, hotspots, vitrina de logros, botón de inicio, avatar propio, carta sorpresa, elige tu actividad, semáforo de confianza, transiciones animadas, reacciones flotantes, slider antes/después y parallax de fondo) permanecen tal cual estaban en v7.5.
- El checklist completo de entrega original se mantiene íntegro; las nuevas prioridades 30, 31 y 32 agregan sus propios checklists sin modificar los anteriores.
- El aviso de máxima prioridad sobre la Prioridad 8-G (fuente única de verdad de identidad de sesión) sigue vigente sin cambios.

**Conflictos detectados y resueltos:** ninguno. Las tres prioridades nuevas (30, 31, 32) son puramente aditivas — no reemplazan código de ninguna prioridad anterior, solo se insertan como funcionalidad adicional. El único ajuste de armonización fue dejar explícito, en la Prioridad 31, que el grid 2×2 de fotos de apoyo (Prioridad 1) sigue usando Unsplash y NO debe convertirse a base64, para que no haya ambigüedad entre ambos mecanismos de imagen conviviendo en la misma clase.

**Resultado:** al aplicar este prompt v10.0 a una clase nueva, quedan incorporadas de forma automática las características de ARIA, imágenes propias en base64 y medidas de layout estandarizadas — sin necesidad de que el docente las pida explícitamente cada vez, y sin perder ninguna de las garantías ya construidas en las versiones anteriores.

````