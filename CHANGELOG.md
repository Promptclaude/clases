# Historial de cambios (versión vigente: v26 + módulo 33)

> Las versiones anteriores del prompt (v24, v25) ya no están en el repositorio. Se pueden recuperar con `git checkout archivo-v24-v25`.

## v26 + banco de imágenes (módulo 33) + actividades v27 (módulo 34) + juegos v28 (módulo 35) + mapa y celebración v29 (módulo 36) + imágenes y fracciones v30 (módulo 37) + detective v31 (módulo 38) + herramientas de imágenes (módulo 39) + tabla v32 (módulo 40)
- **Motor 32:** actividad `tabla` (completar celdas de proporcionalidad/conversiones con 2 revisiones, celdas correctas bloqueadas, pista y regla; acepta coma, punto, fracción y %). El auditor verifica que una tabla marcada `proporcional` realmente lo sea. Clase real `mat5_tienda_razones` (13 slides, 9 tipos de juego) con las imágenes importadas. Corrección: el mensaje de «qué falta» de comparar mostraba `&lt;` literal. Prueba e2e T28.
- **Banco +165 imágenes** importadas de los 4 documentos «Proceso de subir de grado» (Aritmética y Tecnología 4.° y 5.°), cada una con descripción, `alt`, tags, materia, grado, texto OCR y slide de origen. Nuevos temas: medidas, razones, documentos-word, verificar-informacion, historia-internet, trabajo-escrito; carpeta `institucional/`. `buscar_banco.py` busca por contenido; `CATALOGO.md` visual; regla `texto_es_contenido` en el módulo 33.
- **Banco:** `quitar_fondo.py` (color o IA U²-Net, recorte al contenido, `--lamina` separa varias figuras), `agregar_al_banco.py` (flujo completo con calidad, OCR, cortes y duplicados), `reparar_recortes.py` (39 imágenes limpiadas de restos de figuras vecinas; originales en `_originales/`; etiqueta git `antes-limpieza-fragmentos`), kit SVG de matemáticas (64 imágenes originales) y guía para generar nuevas imágenes.
- **Motor 31:** juego `detective` (marcar señales sospechosas en un correo, mensaje o sitio; 2 revisiones, falsas alarmas sin revelar, pistas explicadas al final). Banco: `medir_recortes.py` marca las imágenes que tocan el borde (`recorte`), el empaquetador avisa y el buscador acepta `--sin-recorte`. Clase real `tec5_detectives_internet`. Prueba e2e T27.
- **Motor 30:** imágenes del banco en lecturas y preguntas de quiz (`imagen` + `alt` obligatorio), juego `fraccion` (pizza o barra pintables, con teclado), `comparar` con fracciones y porcentajes, `ordenar` con verificación matemática del orden en el auditor, y «ejemplo resuelto» después del concepto en las lecturas. Surgieron al crear una clase real de fracciones (`mat5_pizzeria_fracciones`). Flujo obligatorio de creación e informe de imágenes faltantes en el prompt. Prueba e2e T26.
- **Motor 29.0:** mapa de misión (un nodo con ícono por slide) y pantalla final de celebración (medalla, ⭐, juegos completados, «lo que lograste hoy», próxima misión e insignia imprimible con el nombre). **Corrección de un error:** la bienvenida y el título de la pestaña mostraban siempre «Reino de los decimales · Aritmética 5°» en cualquier clase nueva; ahora salen de `meta` y el auditor lo vigila. Prueba e2e T25.
- **Motor 28.0:** 6 juegos táctiles nuevos: `enlazar` (líneas de colores, tocar o arrastrar), `ordenar` («x de n en su lugar»), `memoria` (cartas, ⭐ por jugadas), `relampago` (vidas, racha, reloj con interruptor «sin reloj»), `sopa` (palabras por pista, cuadrícula estable al guardar/continuar) y `candado` (escape room con dígitos y tesoro). Auditor: valida datos de cada juego y avisa si la clase tiene menos de 4 tipos de juego (variedad). Prueba e2e T24 y clase de ejemplo `tec4_juegos_hardware`.
- **Motor 27.0:** 6 tipos de actividad nuevos inspirados en «Proceso de subir de grado»: `cuadricula`, `recta`, `comparar`, `podio` (2 intentos por punto, 💡 Pista, 1/0,5/0 puntos para el docente), `abierta` (redactar, revisa el docente) y `cuaderno` (hoja a mano, imprimible); campo `ejemplo` («Ejemplo resuelto → Ahora tú») en cualquier actividad. Auditor con validación de datos (marcas exactas en la recta, signo correcto, puestos 1..n). Prueba e2e T23 y clase de ejemplo `mat4_decimales`.
- Se retira `assets-reutilizables/` (sus 46 imágenes y ids viven ahora en `banco-imagenes/`); el prompt, `limpiar_recortes.py --registrar` y el empaquetador apuntan al banco.
- Revisión completa del banco: 181 imágenes aprobadas por tema (decimales, dinero, detectives, fábrica, internet, seguridad digital…), 250 específicas, 62 descartadas (propiedad intelectual, baja resolución o recorte cortado), 14 poses de ARIA cortadas por el borde (no recuperables, a regenerar) y 3 limpiadas con `limpiar_recortes.py`.
- Banco central `banco-imagenes/` (505 recursos, `banco.json`), `empaquetar_assets.py` y `construir_clase.py` lo leen por defecto; las imágenes `descartada` se bloquean.

## v25 → v26 — Sistema de calidad: motor de referencia + puerta de entrega

**Idea central:** el 100 % sin errores no se logra con más texto en el prompt, sino **(1)** escribiendo el motor de la clase **una sola vez**, probándolo a fondo y reutilizándolo, y **(2)** impidiendo que se entregue cualquier clase que no pase una puerta de calidad automática.

## Nuevo
| Qué | Dónde |
|---|---|
| **Motor de referencia** (clase completa y funcional: slides, nota en vivo, quiz con retroalimentación, reintento con 2 oportunidades, rescate «No me sale», guardado con sello, index v2, efectos, accesibilidad) | `plantilla/clase_referencia.src.html` (+ `plantilla/motor/`) |
| Ejemplo de otra materia construido **solo cambiando datos** (Tecnología 4°) | `plantilla/ejemplos/tec4_partes_pc.datos.json` |
| **Puerta de calidad** (un comando → informe VERDE/ROJO) | `tools/puerta_de_calidad.py` |
| Auditoría estática (22 comprobaciones) y verificador de matemática exacta | `tools/auditar_clase.py`, `tools/verificar_matematica.py` |
| **56 pruebas con clics reales** (T10–T22), genéricas: sirven para cualquier clase | `tools/prueba_clase_e2e.js` |
| **Pruebas de mutaciones**: rompe la clase a propósito de 12 maneras y exige que se detecten | `tools/prueba_de_mutaciones.py` |
| Constructor y actualizador de clases (`--datos`, `--datos-de`) | `tools/construir_clase.py` |
| Módulo 32 del prompt (prioridades 58–64) | `Prompt_Maestro_Clases_v26_COMPLETO.md`, `prompt-modulos/32_*` |

## Errores reales que las pruebas encontraron mientras se construía esto
- Un **doble toque rápido contestaba dos preguntas** (el 2.º toque caía sobre el botón de la pregunta siguiente). Corregido con un intervalo mínimo entre respuestas.
- Imágenes armadas con `'asset://' + nombre` quedaban **rotas** tras empaquetar. El empaquetador ahora lo rechaza y el motor usa tokens literales.
- Las propias pruebas usaban posiciones fijas de la clase de ejemplo: se rehicieron **genéricas** y se comprobaron con una clase de otro tema.
- Una «avería» de prueba (M9) resultó equivalente y no detectable: se reemplazó por una avería real.

## Cómo se usa
```
npm install                                  # una sola vez
python3 tools/construir_clase.py plantilla/clase_referencia.src.html --datos datos.json -o clase.html
python3 tools/puerta_de_calidad.py clase.html --mutaciones     # VERDE = se puede entregar
npm test                                     # todas las pruebas del repositorio (~2,5 min)
```

## Qué NO está verificado (honesto)
- **Apariencia real en un navegador** y rendimiento en los equipos del laboratorio: las pruebas usan un DOM simulado (jsdom), sin pantalla.
- **Tipos de slide sin implementar en el motor:** `match`, `orden`, `wordsearch`, `interactive`, `historia`, `repaso`, `practica` (su regla existe en el prompt, pero la plantilla aún no los trae; no usarlos hasta agregarlos con su prueba, Prioridad 64).
- **Metacognición y repaso espaciado**: son normas de diseño; el motor aún no tiene un tipo propio para ellos.
- Calidad pedagógica real (que el tema se entienda): requiere tu revisión.

## v24 → v25 — Experiencia visual de videojuego + pack de imágenes reutilizable

**Prompt:** `Prompt_Maestro_Clases_v25_COMPLETO.md` (módulo nuevo 31, prioridades 50–57; las v22–v24 se conservan intactas).
**Nuevo en el repositorio:** `assets-reutilizables/` (46 imágenes + manifiesto), `tools/` (3 herramientas), `prompt-modulos/` (módulos 29, 30, 31 sueltos), `pruebas/` (motor de efectos y su prueba).

## Qué trae el módulo 31
| Prioridad | Norma |
|---|---|
| 50 | Dirección de arte unificada y **solo personajes/imágenes propios** (ARIA + originales; nada de marcas de terceros) |
| 51 | Intro en 3 tiempos (≤ 4 s, «Presiona para empezar»), portada con misión y recompensas, zonas y transiciones |
| 52 | **Motor central `Juego`**: todo efecto sale de un solo lugar; fallo suave (sin rojo ni sacudida), reduce-motion, sin sonido, máx. 3 efectos simultáneos, sonidos sintetizados (0 KB) |
| 53 | XP de esfuerzo, niveles, monedas, cofres, tienda cosmética, racha con día de gracia, jefe final **solo de presentación** |
| 54 | Portal «Aula Gamificada», liga por **XP de esfuerzo** con apodos (nunca por nota, sin lista de últimos), carrera de grupos |
| 55 | ARIA expresiva: mapa momento → imagen, 1 reacción cada 8 s |
| 56 | Pipeline del pack: limpiar recortes, detectar cortados, empaquetar solo lo usado (≤ 1,5 MB) |
| 57 | Medidor visual (0–20) y cómo adaptar clases existentes |

## Hallazgos sobre las imágenes de las clases actuales
- Cada clase incrusta ~69 imágenes en base64 (3 MB+); los archivos pesan 4–9 MB y las imágenes se repiten entre clases.
- Casi todos los recortes traían **fragmentos de la imagen vecina y halo blanco**; 18 de 31 expresiones de ARIA y los botones con texto fijo están **cortados por el borde** de la lámina (no recuperables sin el original).
- Hay personajes y logos de videojuegos de terceros en las infografías y en varios recortes: **no se extrajeron** (repositorio público, derechos ajenos).

## Verificado y no verificado
✅ Lógica del motor de efectos (14 comprobaciones), herramientas de limpieza/empaquetado/extracción probadas con archivos reales, inspección visual del pack.
⚠️ Sin verificar: apariencia y rendimiento de una clase v25 completa en navegador y en los equipos del laboratorio (hay que generar y recorrer la primera).

## v22–v24 (auditoría y cambios)
### Auditoría del Prompt Maestro v22 → v23

**Alcance:** `Prompt_Maestro_Clases_v22_COMPLETO.md` (7 698 líneas), `CHANGELOG_v21_a_v22.md` y `AUDITORIA_clase_semana5_mat4_p4.md`.
**Método:** lectura completa de las prioridades que tocan bloqueo, quiz, nota, vidas, guardado e index; búsqueda de contradicciones entre módulos; corrección con parches verificados uno a uno (52 reemplazos, cada uno comprobado como único); prueba de la lógica nueva en Node (56 comprobaciones, todas ✅).
**Lo que NO pude auditar:** `motor/nucleo.js`, `aria/aria_widget.html`, `tools/*` y `tests/*` **no venían en el ZIP**. Ver «Pendiente» al final.

---

## 1. Errores encontrados (y su causa real)

### A. «Algunas actividades no dejan pasar si no contestas bien»
| # | Hallazgo | Dónde | Efecto |
|---|---|---|---|
| A1 | **Tres reglas contradictorias para lo mismo.** Prioridad 0-C: complementarias *bloquean*. Prioridad 3: «drag/match/fill/ordenar… **se pueden saltar**». Prioridad 4: sopa de letras «**sin opción de saltar**». Checklist 90: «se pueden saltar libremente». | 0-C, 3, 4, 90 | Cada vez que se genera una clase, la IA aplica la versión que lee primero. |
| A2 | **Condiciones de desbloqueo que exigían un resultado:** «al rellenar **TODOS** los blancos», «al hacer mínimo **60 %** de conexiones», «al soltar **todos** los chips», «encontrar ≥ 1 palabra **sin salida**». Quien no sabía la respuesta quedaba atrapado (justo en aritmética difícil). | 0-C, 0-D, 4 | Bloqueo real. |
| A3 | **`puedeAvanzar()` no tenía los tipos `historia` ni `minijuego`** (caían en `default: true`), y `historia` no estaba en `TIPOS_LECTURA`; el texto de 34-C.3 hablaba de un conjunto `LECT` que no existe. | 8-O, 34-C, 35 | Las reglas de 34-C/35 («completar beats», «completar una partida») **no estaban implementadas** en el motor. |
| A4 | **Los minijuegos solo describían su mecánica de acierto** (abrir candados con su mini-reto, armar el puente en orden, tocar el paso equivocado…) y **no definían qué pasa al fallar ni cuándo terminan**, ni mostraban en pantalla qué hacer para continuar. La única salida era «Saltar este reto» a los 25 s. | 35.2/35.3 | Confusión («no se entiende la dinámica») y riesgo de bloqueo. |
| A5 | **«Siguiente» gris sin explicación.** | 0-C/8-O | El estudiante no sabía qué faltaba. |
| A6 | **Los quizzes sí avanzan al responder mal** (el índice sube en el mismo clic): ahí **no** había bloqueo. Pero la retroalimentación solo traía el texto de `retroalimentacion` (por qué la correcta es correcta): **no decía qué había marcado, cuál era la correcta ni en qué se equivocó.** | 8-P `htmlRetroQuiz`, 5 | Retroalimentación pobre. |

### B. «La nota se queda en 1.5 aunque conteste bien»
| # | Hallazgo | Efecto |
|---|---|---|
| B1 | **Causa principal.** `updScore()` pintaba `notaOficial()` = `max(intento actual, mejorNota)`. Al **gastar una vida** el intento vuelve a 0 pero `mejorNota` conserva la anterior (ej. 1.5): **mientras el nuevo intento no superara 1.5 el número en pantalla no se movía.** La suma interna era correcta; lo visible no. Coincide exactamente con lo que viste («contestó bien una pregunta, se quedó en 1.5…»). | Visor «congelado». |
| B2 | **El HUD nunca se define en el prompt.** `updScore()` escribe en `#nota-hud` / `#nota-intento-hud`, pero ningún bloque HTML los crea («adaptar al HUD real»). En una clase clonada el id puede no existir o apuntar a otra cosa. | Visor inexistente o desfasado. |
| B3 | `updScore()` solo se llamaba **al responder**, y **después** del modal. No se repintaba en `render()`, al recargar ni al volver a la pestaña. | Nota vieja en pantalla. |
| B4 | La retroalimentación no mostraba la nota, así que no había un segundo sitio donde verla cambiar. | — |

### C. Guardado, primera apertura en cero e index
| # | Hallazgo | Efecto |
|---|---|---|
| C1 | **`sesionGuardadaEsValida()` seguía aceptando datos sin sello** (`d.semana !== undefined && …`). El propio `AUDITORIA_clase_semana5` la identifica como causa probable de la nota heredada, y el CHANGELOG v22 dice que está corregida, **pero el texto de 8-V (que sigue en el prompt) conservaba la versión laxa.** La corrección vivía solo en `Nucleo` (que no pude ver). | Una clase nueva podía abrir con la nota/avance de otra. |
| C2 | `esEstudianteNuevo()` leía `localStorage` directo (ignora el modo «sin guardar»). | Falsos positivos en acceso directo. |
| C3 | **Desajuste con el index:** la tarjeta del index (Prioridad 8) lee `slideActual`, `totalSlides` y `completada`, pero `construirEntradaEstudiante()` (8-F) **no escribía ninguno** (solo `porcentajeAvance` y `ultimoAcceso`). El index no podía mostrar «Slide 12 de 23» ni «Completada». | El avance no se veía bien en el index. |
| C4 | **`save()` fallaba en silencio** (`console.warn`). Con el almacenamiento bloqueado o lleno, el estudiante seguía creyendo que se guardaba. | Pérdida de avance sin aviso. |

### D. Hallazgos menores corregidos
- `rSemaforoConfianza(sId)` se llamaba sin el 2.º parámetro y se serializaba como `'undefined'` dentro del `onclick` (viola el espíritu de 8-R). Quitado el parámetro.
- Handlers `onDragComplete/onMatchComplete/onFillComplete/onTFComplete` desbloqueaban sin pasar por `aplicarEstadoAvance()` ni registrar el modo; ahora pasan por `marcarActividadHecha()`.

---

## 2. Qué cambió (v22 → v23)

**Módulo nuevo `29_v23_sin_bloqueos_nota_en_vivo.md`** (se inserta antes del módulo 90; también va suelto en el ZIP para tu carpeta `prompt/`):

| Prioridad | Qué hace |
|---|---|
| **39** 🔴 | *Intentar ≠ acertar.* Tabla única de qué desbloquea cada tipo (todas por **intento**). **«🆘 No me sale: ver la respuesta y seguir» a los 25 s** en toda actividad sin nota (no existe en quiz/evalFinal; no da gemas; no toca la nota; queda registrado como «con ayuda» para el docente). `puedeAvanzar()` ahora cubre `historia` y `minijuego`. «Siguiente» apagado muestra **por qué** (`#razon-bloqueo`). |
| **39-B** 🔴 | *Claridad para 4.º–5.º.* **Tarjeta de 4 líneas** en cada minijuego/historia/actividad (🎯 Misión · 👆 Cómo · ✅ Para seguir · 📊 Progreso, ≤ 12 palabras), «¿Cómo se juega?», ronda de práctica, reglas de claridad y **contrato de fallo y de fin por tipo de minijuego** (ninguno espera un acierto para terminar). |
| **40** 🔴 | *Retroalimentación que educa.* Cada opción incorrecta lleva `porQue`; al fallar se muestra **tu respuesta · la correcta · en qué te equivocaste · cómo se resuelve · nota del intento**. Mismo formato en actividades sin nota y en el resumen del quiz. |
| **41** 🔴 | *Nota en vivo.* El HUD muestra el **intento en curso** (sube con cada acierto, con pulso, «+0.17» y contador «9/30 ✅»); la **mejor nota va aparte** («🏅 Mejor nota: X (es la que cuenta)»). La nota **oficial** (8-U: la mejor) sigue siendo la del index y la pantalla final. HTML/CSS del HUD definidos; `pintarNota()` se llama antes del modal, en cada `render()` y en el vigilante. |
| **42** 🔴 | *Guardado y primera apertura.* **Sello estricto** (sin sello completo = inválido); `esEstudianteNuevo()` con `almacen()`; **aviso visible si `save()` falla**; **entrada del index v2** con `slideActual`, `totalSlides`, `completada`, `mejorNota`, `notaIntentoActual`, `preguntasRespondidas/totalPreguntas`, `actividadesConAyuda`; `normalizarEntradaIndex()` para que el index lea v1 y v2. |
| **43** 🔴 | Pruebas **T10–T14** y ampliación de `CLASE_API`. |

**Parches en módulos existentes** (lista completa en `parches_aplicados.txt`): 0-C (principio, tabla, handlers), 3 y 4 (tablas/sopa), 5 (formato de pregunta + resumen), 8 (index), 8-F, 8-O, 8-P, 8-S, 8-U, 8-V, 8-B, 34-C.3, 35.3, 38-D, 25, 90 (checklists), tabla de precedencia (sección 4), lista de prioridades (sección 5: 96 → 102).

**Garantías que ahora están escritas y probadas (a nivel de lógica):**
1. Responder todo mal en toda actividad sin nota **siempre** permite seguir (T10).
2. A los 25 s siempre hay salida en actividades sin nota; en quizzes responder mal ya avanza (T11, T12).
3. Tras gastar una vida, **cada acierto mueve el número** del HUD: 0.5 → 1.0 → 1.5 mientras la oficial sigue en 2.0 (T13).
4. Una sesión de otra semana, sin sello o de otro grupo **no** se carga; la primera apertura es 0.0 / slide 1 (T14).
5. El index recibe nota, «Slide N de 23», porcentaje y «Completada».

---

## 3. Decisiones que conviene revisar
1. **El HUD ya no muestra la nota oficial, sino la del intento.** Es lo que pediste (verla subir). El estudiante verá, en reintento, 0.0 arriba y «Mejor nota: 2.0 (es la que cuenta)» debajo. Si prefieres otra presentación, solo cambia `notaPrincipalHud()`.
2. **Al mostrar la respuesta correcta,** un reintento con vida puede repetir preguntas ya vistas. Es el efecto que pediste (aprender de la corrección). Si quieres evitarlo: variantes por pregunta (`PREGUNTAS_RESERVA`) para los reintentos; lo dejé descrito, no implementado.
3. **Sello estricto = sesiones antiguas sin sello se ignoran** (cuarentena, no se borran). Un estudiante con progreso guardado por una versión muy vieja empezará de cero. Es el precio de cortar la herencia de notas; si hay casos, el Panel Docente permite importar el progreso (38-E).
4. **«No me sale» a los 25 s** es configurable (`T_RESCATE_S`). Con 25 s un niño puede pedir la respuesta sin intentar; la protección es que queda registrado («con ayuda») y no da gemas. Si ves abuso, súbelo a 40 s.
5. **Mejora sugerida (no incluida):** Panel Docente con la lista de actividades donde cada estudiante usó «No me sale» (ya existe el dato `ayuda_<id>`): te dice qué temas no se entienden.

---

## 4. Pendiente / no verificado (honesto)
- **Ninguna clase v23 completa se ha generado ni probado en navegador.** Lo verificado: la lógica nueva (`prueba_v23_snippets.js`, 56/56 ✅), la sintaxis de los bloques de código modificados, y que cada función clave existe una sola vez en el prompt. **T10–T14 con clics reales en navegador siguen pendientes** hasta que exista la primera clase v23.
- **`motor/nucleo.js` (no incluido en el ZIP) debe alinearse** con este cambio — es el punto de mayor riesgo:
  1. `Nucleo.cargar` debe exigir sello completo `{schema, claseId, semana, est, grupo}` (el CHANGELOG v22 dice que ya lo hace; verifícalo con la prueba de «sesión sin sello»).
  2. `Nucleo.guardar` debe escribir en la entrada del index los campos nuevos (`slideActual`, `totalSlides`, `completada`, `mejorNota`, `preguntasRespondidas`, `totalPreguntas`, `version: 2`).
  3. **Dos fuentes de estado:** los motores de 8-O/8-P/8-U usan `st`, pero `CLASE_API` (38-D) y `Nucleo` usan `estado`. Si ambos guardan la nota, **pueden divergir**. Conviene que `Nucleo.notaOficial(estado)` y `notaOficial()` lean los mismos datos (o eliminar uno).
- **`tools/auditar_clase.py`** debería: fallar si no existe `#nota-hud`; fallar si algún `puedeAvanzar` no cubre `historia`/`minijuego`; fallar si encuentra `d.semana !== undefined` en validaciones; avisar si una opción incorrecta no tiene `porQue`.
- **`tests/prueba_clase.js`**: agregar T10–T14 con clics reales (descritos en la Prioridad 43).
- Tamaño: el prompt pasó de 7 698 a ~8 160 líneas (+~460). Sigue el costo de tokens señalado en el CHANGELOG v22; el módulo 29 es compacto y el código está en un solo bloque reutilizable.

---

## Anexo v24 — mejoras añadidas (módulo 30, prioridades 44–49)

Respuesta a: «¿qué más puedes corregir para que las clases se sientan como un juego digital, motiven y enseñen mejor, y que quede como norma?»

| Prioridad | Norma que queda escrita |
|---|---|
| **44** Bucle de juego y motivación sana | Reacción < 0,3 s a cada toque; se premia esfuerzo, corrección y mejora propia; lenguaje de crecimiento (prohibido «incorrecto/mal/fallaste»); hitos tipo aventura; **sin ranking de notas**; vidas = «oportunidades de práctica». |
| **45** Ayuda adaptativa sin tocar la nota | Pista 1 → pista 2 → solución; ejemplo resuelto antes de practicar; «mini-reto de revancha» no calificado con los temas fallados. |
| **46** Ritmo y variedad | 25–35 min, ≤ 60 palabras por pantalla, nunca > 2 slides seguidas del mismo tipo, calentamiento de repaso, «¿Cuánto sabes?» inicial/final, cierre «3 cosas que aprendí». |
| **47** Calidad del contenido | Toda respuesta numérica recalculada, una sola respuesta correcta, distractores = errores comunes, lectura de 4.º–5.º, escalera de dificultad. Evita notas injustas por preguntas mal planteadas. |
| **48** Equipos del laboratorio | 360 px, < 1,5 MB, sonido opcional, no solo color, voz alta, sin internet. |
| **49** Ciclo de mejora, adaptar clases, rúbrica | Panel docente con preguntas más falladas y «No me sale»; **protocolo para adaptar tus clases ya hechas sin regenerar contenido**; **Medidor 0–20** que se imprime en cada entrega (no se entrega con < 16 ni con un 0 en los criterios 1–4). |

Código nuevo probado (T15, 61/61 en total): `mensajeMejora()`, `preguntasFalladasIds()` y el campo `preguntasFalladas` en la entrada del index. Las normas de 44–48 son reglas de redacción y diseño: **no están probadas en una clase real**.
