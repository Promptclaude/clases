# 30 · v24 — Que se sienta como un juego: motivación, aprendizaje real, calidad y adaptación de clases existentes

> **Se lee en la Etapa 3.** Complementa el módulo 29 (sin bloqueos, nota en vivo, guardado). Objetivo: estudiantes de 4.º–5.º **contentos, motivados y aprendiendo de verdad**, con una clase que se siente como un juego digital **sin dejar de ser una clase**. Estas prioridades valen tanto para **clases nuevas** como para **adaptar las existentes** (44-F y 49).
> **Regla de oro:** la diversión sirve al aprendizaje, nunca lo reemplaza. Si un efecto de juego distrae de la idea matemática, se quita.

## 🔴 PRIORIDAD 44 · ALTA — EL BUCLE DE JUEGO Y LA MOTIVACIÓN SANA

### 44-A — Bucle en cada actividad (obligatorio)
**Meta clara → acción → reacción inmediata → recompensa de esfuerzo → siguiente reto.** Toda actividad responde en < 0,3 s a cada toque con **color + movimiento corto + sonido opcional + una frase** («¡Eso! Sumaste 3 decenas»). Nunca silencio tras un clic. Un efecto dura ≤ 1,5 s y no bloquea tocar de nuevo.

### 44-B — Qué se premia
Se premia el **esfuerzo y el progreso**, no solo el acierto: terminar una actividad, corregirse, usar una pista a tiempo, mejorar frente a uno mismo (`mensajeMejora()`), reintentar. Insignias de ejemplo: «🔧 Corregí mi error», «📈 Mejoré mi marca», «🧩 Terminé el reto difícil». La gema/XP **nunca** se quita por fallar.

### 44-C — Lenguaje de crecimiento (norma de redacción)
- Prohibido: «incorrecto», «mal», «fallaste», «error» a secas. Usar: «Casi», «Todavía no», «Mira cómo se resuelve», «Esta vez no era esa».
- Siempre un **siguiente paso** concreto después de un fallo («Prueba con otro número» / «Sigue →»).
- Si baja la nota en un reintento: «🌱 Todavía estás aprendiendo este tema. Tu mejor nota sigue segura.» (nunca un reproche).

### 44-D — Progreso visible, tipo aventura
Barra de **misión** (slide N de TOT) con 3–4 hitos con nombre y dibujo («🏝️ Isla de las decenas»), un mapa de ruta (ya existe en 10-C) y una **celebración proporcional al progreso** al pasar cada hito (confeti ≤ 2 s). La pantalla final celebra **lo aprendido** y la **mejora personal**, no solo el número.

### 44-E — Cero humillación, cero ranking de notas
- **Prohibido** mostrar a un estudiante la nota de otro o un ranking por nota. Lo único comparable es **contra uno mismo** («Mejoraste 0.5») o una **meta colectiva** opcional del grupo («¡El 501 ya completó el 80 % de la misión!», sin nombres).
- Las vidas se presentan como **«oportunidades de práctica»**, no como castigo.
- Elegir cosas da identidad: avatar y compañero (ARIA/ByteBot) ya existen; se mantiene la elección, sin costo.

### 44-F — Adaptar una clase que ya tienes
Para un archivo existente: **no se regenera el contenido**. Se aplican, en este orden, los parches 39 → 43 y luego 44-A/C/D. Ver el protocolo en la Prioridad 49.

**Checklist:**
```
[ ] Cada actividad responde en < 0,3 s a cada toque (color + movimiento + frase); efectos ≤ 1,5 s
[ ] Se premia esfuerzo/mejora/corrección; ninguna gema o XP se quita por fallar
[ ] Ninguna palabra prohibida de 44-C en toda la clase (buscar «incorrecto», «mal», «fallaste»)
[ ] Hay hitos con nombre y celebración proporcional; la pantalla final destaca lo aprendido y la mejora personal
[ ] Sin ranking de notas ni notas de otros; las vidas se llaman «oportunidades de práctica»
```

## 🔴 PRIORIDAD 45 · ALTA — AYUDA QUE SE ADAPTA (SIN TOCAR LA NOTA)

1. **Andamiaje tras fallos (solo en práctica y minijuegos, nunca en quiz/evalFinal):** 1.er fallo → pista corta; 2.º fallo → ejemplo resuelto con otros números y luego se reintenta; 3.º → se muestra la solución (39). Si acierta 3 seguidas, el siguiente ítem sube un nivel.
2. **«Mini-reto de revancha» (no califica):** al terminar un quiz con fallos, se ofrece **practicar solo los temas fallados** con 2–3 ejercicios parecidos (otros números), con retroalimentación y sin nota. Sirve para aprender; la nota solo se recupera con una vida (8-W).
3. **Ejemplo resuelto antes de practicar** (patrón *worked example → ejemplo con un hueco → ejercicio solo*): cada concepto nuevo se muestra resuelto paso a paso antes de pedir hacerlo.
4. **Pista graduada** en toda actividad: 💡 pista 1 (idea), 💡 pista 2 (primer paso), «Ver respuesta». Usar pistas no baja ninguna nota ni gema.
5. Los fallos quedan registrados por **id de pregunta** (`pregId`, `preguntasFalladas` en el index) para el Panel Docente (49).

**Checklist:**
```
[ ] Práctica y minijuegos tienen pista 1 → pista 2 → solución, sin penalizar
[ ] Cada concepto nuevo tiene ejemplo resuelto antes de la práctica
[ ] Tras un quiz con fallos se ofrece el mini-reto de revancha (no califica)
[ ] quiz/evalFinal no reciben andamiaje que cambie la nota
```

## 🔴 PRIORIDAD 46 · ALTA — RITMO Y VARIEDAD (PARA QUE NO CANSE)

1. **Duración objetivo 25–35 min.** Una idea por slide; texto ≤ 60 palabras por pantalla; nada de párrafos largos.
2. **Variedad:** nunca más de **2 slides seguidas del mismo tipo** (ni dos de lectura seguidas sin interacción). Alternar: ver → hacer → jugar → comprobar.
3. **Máx. 4 min sin que el estudiante toque algo**; si la clase pide más lectura, se parte con una pregunta de «¿qué crees que pasará?» (no califica).
4. **Calentamiento (repaso espaciado):** la 1.ª actividad retoma **1 idea de la clase anterior** (no califica, 1–2 preguntas).
5. **«¿Cuánto sabes?» → «¡Mira cuánto aprendiste!»:** 2 preguntas no calificadas al inicio y las mismas (otros números) al final, mostrando el crecimiento («antes 1/2, ahora 2/2»).
6. **Cierre:** «3 cosas que aprendí hoy» (el estudiante elige entre 5 frases) y un **siguiente paso** claro.
7. **Descanso activo** de 20 s (estirarse, respirar) si la clase pasa de 30 min.

**Checklist:**
```
[ ] ≤ 60 palabras por pantalla; una idea por slide
[ ] Nunca > 2 slides seguidas del mismo tipo; ≤ 4 min sin interacción
[ ] Calentamiento de repaso + «¿Cuánto sabes?» inicial y final sin nota
[ ] Cierre con «3 cosas que aprendí» y siguiente paso
```

## 🔴 PRIORIDAD 47 · ABSOLUTA — CALIDAD DEL CONTENIDO (QUE LAS NOTAS NO TENGAN FALLOS DE FONDO)

1. **Verificar toda respuesta numérica con cálculo real** (con herramienta de código cuando exista): se recalcula cada operación del enunciado, de la opción correcta y de los distractores. Una pregunta con la respuesta mal calculada **daña la nota injustamente**: no se entrega.
2. **Una sola respuesta correcta.** Se revisa que ningún distractor sea también correcto (p. ej., 0,5 y 1/2 como opciones distintas).
3. **Distractores con sentido:** cada uno representa un **error común** real (se escribe en `porQue`). Nada de opciones absurdas.
4. **Lectura de 4.º–5.º:** frases de ≤ 15 palabras, números en contextos cercanos (tiendita, fútbol, mercado), sin tecnicismos sin explicar.
5. **Alineación:** cada pregunta evaluable declara el **DBA/estándar** y la **idea** que mide; no se evalúa algo que la clase no enseñó.
6. **Dificultad en escalera** dentro de cada quiz (fácil → media → reto) para que haya éxitos tempranos.
7. **Sin trampas de formato:** misma longitud aproximada en las opciones; la correcta no es siempre la B (se reparte con semilla, 8-P).

**Checklist:**
```
[ ] Cada respuesta numérica recalculada; ninguna pregunta con dos respuestas válidas
[ ] Cada distractor trae porQue y representa un error común
[ ] Cada pregunta evaluable declara DBA/idea que mide y fue enseñada en la clase
[ ] Escalera de dificultad fácil → media → reto en cada quiz
```

## 🔴 PRIORIDAD 48 · ALTA — QUE FUNCIONE EN LOS EQUIPOS REALES DEL LABORATORIO

1. **Probar en pantalla pequeña (360 px) y en equipo lento:** un solo HTML < 1,5 MB sin imágenes pesadas; animaciones con `transform`/`opacity`; sin librerías externas obligatorias.
2. **Sonido siempre opcional** (hay botón 🔊/🔇; todo mensaje importante también es texto).
3. **Nunca depender solo del color** (✅/❌ con ícono y texto) y contraste mínimo 4,5:1; objetivos táctiles ≥ 44 px.
4. **Lectura en voz alta** de enunciados con la voz del navegador (botón 🔈) para estudiantes con dificultades lectoras.
5. Respetar `prefers-reduced-motion`.
6. **Sin conexión:** la clase funciona abierta desde archivo local o servidor del colegio; si algo requiere internet, tiene alternativa.

**Checklist:**
```
[ ] Probada a 360 px; HTML < 1,5 MB; sin dependencias externas obligatorias
[ ] Sonido opcional; nada importante vive solo en audio ni solo en color
[ ] Botón de lectura en voz alta; objetivos táctiles ≥ 44 px; contraste ≥ 4,5:1
[ ] Funciona sin internet
```

## 🔴 PRIORIDAD 49 · ABSOLUTA — CICLO DE MEJORA DEL DOCENTE, MODO «ADAPTAR CLASE» Y RÚBRICA DE ENTREGA

### 49-A — Panel docente que enseña a mejorar la clase
El index/Panel Docente muestra: **preguntas más falladas** (por `preguntasFalladas`), **actividades donde más usaron «No me sale»** (`actividadesConAyuda`), **slide donde más se quedan** y **notas por intento**. Con eso se corrige la clase (una pregunta fallada por > 60 % suele estar mal planteada, no mal estudiada).

### 49-B — Protocolo «ADAPTAR CLASE EXISTENTE» (sin regenerar contenido)
1. **Auditar** el HTML con la lista: ¿existe `#nota-hud`? ¿`puedeAvanzar` cubre `historia`/`minijuego`? ¿alguna condición exige acertar? ¿`sesionGuardadaEsValida` exige sello completo? ¿la entrada del index trae `slideActual/totalSlides/completada`? ¿las opciones incorrectas traen `porQue`? Registrar cada «no» como hallazgo.
2. **Parchar por orden:** sello y guardado (42) → desbloqueo (39) → HUD (41) → retroalimentación (40) → tarjeta de reto de cada actividad (39-B) → motivación (44).
3. **No tocar** el contenido pedagógico, las preguntas ni los DBA; solo se **añaden** `porQue`/`errorComun` y se corrigen respuestas erróneas halladas (47).
4. **Probar:** T10–T15 con clics reales; recorrido completo respondiendo siempre mal; abrir en un navegador limpio (debe arrancar en 0.0, slide 1).
5. Entregar con la lista de lo cambiado y lo que quedó sin verificar.

### 49-C — Rúbrica de entrega «Medidor de clase» (se imprime al final de cada entrega)
Puntuar 0–2 cada criterio; **no se entrega con < 16/20 ni con un 0 en los criterios 1–4**:
| # | Criterio | 0 | 1 | 2 |
|---|---|---|---|---|
| 1 | **Nadie se bloquea** (T10/T11) | hay bloqueo | no probado | probado |
| 2 | **Nota en vivo y correcta** (T13, 47) | falla | no probada | probada |
| 3 | **Guardado/primera apertura/index** (T14) | falla | no probado | probado |
| 4 | **Matemática verificada** (47) | sin verificar | parcial | todas recalculadas |
| 5 | Actividades se entienden en 10 s (39-B) | no | algunas | todas |
| 6 | Retroalimentación con correcta + porqué (40) | no | parcial | siempre |
| 7 | Bucle de juego y lenguaje de crecimiento (44) | no | parcial | sí |
| 8 | Ritmo y variedad (46) | no | parcial | sí |
| 9 | Accesibilidad y equipo lento (48) | no | parcial | sí |
| 10 | Panel docente con datos de mejora (49-A) | no | parcial | sí |
**Honestidad obligatoria:** lo no probado en navegador se declara «no verificado»; nunca se marca 2 por suposición.

**Checklist:**
```
[ ] El Medidor se imprime al final de cada entrega con puntaje real y lo no verificado
[ ] Adaptar una clase sigue 49-B y no regenera contenido
[ ] El Panel Docente muestra preguntas falladas, «No me sale» y slide donde se estancan
```
