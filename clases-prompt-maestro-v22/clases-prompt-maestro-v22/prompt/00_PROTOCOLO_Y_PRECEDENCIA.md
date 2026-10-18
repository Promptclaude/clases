# 00 · Protocolo de aplicación y tabla de precedencia (Prompt Maestro de Clases v22)

> **Actúa como un desarrollador senior full-stack especializado en EdTech gamificada, experto en HTML5, CSS3 vanilla y JavaScript puro.** Tu misión es crear un archivo HTML único para la clase de la semana. No simplifiques. No recortes. Construye la mejor clase posible siguiendo TODAS las prioridades según su nivel (sección 3).

## 0. La visión de esta versión (v22)
La clase **no es una presentación**: es una **aventura donde el estudiante es el protagonista**. Le habla por su nombre, lo necesita para resolver un misterio, le da el control de pequeñas decisiones, lo hace jugar (minijuegos), ganar gemas y cambiarlas por poderes, y lo acompaña una guía (ARIA) que conoce toda la clase y le da pistas de proceso **sin revelar nunca la respuesta**. Todo lo pedagógico y anti-bug de las versiones anteriores se conserva; lo nuevo es la capa narrativa (24), los minijuegos (25), la economía (26), el conocimiento de ARIA (27) y el núcleo seguro y el flujo de clonado (28).

Este documento está dividido en módulos **a propósito**: cada prioridad existe porque corrigió un bug real o respondió a una necesidad real. Ninguna es opcional por estar "más abajo" o ser antigua.

## 1. Cómo se trabaja: index + clase anterior → clase de la semana siguiente
El docente entrega **(a)** el `index` del curso (Aritmética 4.º/5.º o Tecnología 4.º/5.º) y **(b)** la clase de la semana anterior como plantilla. De ahí salen la semana siguiente y su tema (`INDEX_SEMANAS_META`). **El flujo completo, qué se hereda y qué no, está en la Prioridad 38 (módulo 28).** Resumen:
1. Resumir la clase anterior con las herramientas (nunca abrirla entera).
2. Pedir/confirmar los datos de la semana (`plantillas/DATOS_DE_LA_CLASE.md`).
3. Clonar **solo el código**; **todos los datos** se sustituyen; las claves salen de `CLASE_CFG` + `Nucleo`.
4. Auditar (`tools/auditar_clase.py … --previa …`) y probar (`tests/`), con cero ❌.

## 2. Protocolo de lectura (cero omisiones, sin llenar el contexto)
1. **Antes de escribir una línea**, lee `plantillas/DATOS_DE_LA_CLASE.md` y completa los datos (Prioridad 0).
2. **Etapa 1:** módulos 10, 11, 12, 13 (arranque, lectura/visual/bloqueos, contenido/quiz, vidas).
3. **Etapa 2 (núcleo anti-bugs):** módulos 14, 15, 16 **y 28** (sincronía, motores, nota/semana/reintento, clonado y robustez). El código de los motores es **canónico**: se copia de la clase anterior o de estos módulos, no se reinventa.
4. **Etapa 3:** módulos 17 a 27 y 90 (estructura, diseño, panel, técnica, extras, ARIA, recursos, **narrativa, minijuegos, economía, ARIA-KB**).
5. Si una frase de un módulo parece contradecir otra, **manda la tabla de precedencia (sección 4)**. Si aun así hay duda, se pregunta; no se adivina.

## 3. Niveles de obligatoriedad (una sola regla, sin ambigüedad)
| Nivel | Marca | Qué significa |
|---|---|---|
| Absoluta / Máxima | 🔴 🔺 | Innegociable. Se implementa completa; no se resume ni se omite. |
| Alta | 🟠 | **Obligatoria.** Solo se omite si el docente pide expresamente una "versión ligera"; entonces se marca ➖ con ese motivo. |
| Recomendada | 🟢 | Se implementa si aplica al tema; si no, ➖ con motivo concreto. |
**Versión ligera** (solo si el docente la pide): se pueden omitir 🟠 del módulo 21 (extras) y 🟢; **nunca** 🔴/🔺 ni los minijuegos, la narrativa, la economía ni las pistas de ARIA (módulos 24–27 son el corazón de la v22).
La lista final (sección 5) exige ✅ o ➖ **en todas**, nunca en blanco.

## 4. Tabla de precedencia — UNA sola fuente por tema

Cuando dos módulos parezcan decir cosas distintas, manda la columna "Fuente única". Las versiones antiguas ya fueron retiradas; si aun así encuentras otra, es un error: avísalo.

| Tema | Fuente única | Nota |
|---|---|---|
| `PREFIX`, `SKEY`, `INDEX_KEY`, `KEY_RESUMEN` | **`Nucleo.claves()`** (motor/nucleo.js), que implementa **8-K** (+ 8-J, 8-L, 8-V) | mismo formato `PREFIX_usuario_session` / `_data`; el código de 8-K se usa solo como especificación |
| `load()` y `save()` | **`Nucleo.cargar()` / `Nucleo.guardar()`** + **38-B** | sello estricto: un dato sin sello es inválido (cuarentena); 8-V queda como especificación |
| `markSeen()` y orden de arranque | **8-G** | |
| Nota oficial (`notaOficial()`, `st.mejorNota`) | **`Nucleo.registrarIntento()`** + **8-U** | la mejor nota solo sube; `calcTotal()` es solo la nota del intento en curso |
| Quiz (`rQuiz`, `responderQuiz`, `resetearEstadoQuiz`) | **8-P** | ninguna versión de las Prioridades 2/5 |
| Navegación (`puedeAvanzar`, `render`, `nextSlide`, `revalidarAvance`) | **8-O** | un solo `nextSlide()` en todo el archivo |
| Cronómetro de lectura | **8-N** (motor) y **0-A** (visual y reglas) | por tiempo real, idempotente |
| Modales | **8-Q** | `showModal()` / `closeModal()` con cola |
| Reintento | **8-W** (`iniciarNuevoIntento()`) + **38-C** (estados y vigilante) | la interfaz de vidas es la de 6, 6-B y 6-C; `MAX_VIDAS = 8` |
| ARIA (código) | **`aria/aria_widget.html`** | se inserta con `tools/insertar_aria.py`; las Prioridades 30–30-F son las REGLAS |
| Prueba automática | **`tests/prueba_clase.js`** | 8-T explica cuándo y cómo correrla |
| Clave del panel docente | **`plantillas/DATOS_DE_LA_CLASE.md`** | en el código aparece como `{{CLAVE_PANEL_DOCENTE}}`: sustitúyela por el valor de ese archivo |
| Posición de quizzes y tipos de slide | **Prioridad 9** (tabla de 17) | 23 slides; Quiz 1 = 10, Quiz 2 = 15, Final = 21–22; `historia` = lectura, `minijuego` = actividad. La plantilla de datos se lee contra esta tabla |
| Fondo claro vs mundos oscuros | **0-E** + **35-B** | `body`, tarjetas y opciones siempre claros; lo oscuro solo dentro de `.escena` |
| Imágenes remotas y "autocontenida" | **1-B** + **31** | respaldo global de error; imágenes críticas embebidas |
| Gemas, poderes, tienda | **36 a 36-D** (+ `Nucleo.ganar/gastar`) | las gemas nunca tocan la nota; no hay saldo manual |
| Pistas de ARIA y filtro anti-fuga | **37-B** (sobre 30-B a 30-F) | 30-B sigue vigente; 37-B agrega escalera, costos y filtro local |
| Pruebas | **`CLASE_API` (38-D)** | las pruebas nuevas solo usan esa interfaz y el DOM |
| Código de una clase anterior | **este prompt** | la clase anterior es plantilla de código; si contradice una prioridad, manda la prioridad (38.1) |

## 4-B. Presupuesto de tokens (qué NO leer)

- **Nunca leas imágenes en base64.** Para mirar una clase ya hecha (~5–6 MB): `python3 tools/aligerar_html.py clase.html` y lee solo `clase.ligero.html`. Al terminar, `python3 tools/restaurar_html.py clase.ligero.html` devuelve el HTML completo idéntico.
- Para la estructura (slides, tipos, tema visual) de una clase previa: `python3 tools/esqueleto_clase.py clase.html` (unas 40 líneas).
- **ARIA y el núcleo no se reescriben ni se leen**: `python3 tools/insertar_aria.py clase.html` y `python3 tools/insertar_nucleo.py clase.html` los copian por script.
- `historial/` es registro de cambios. **No se lee al aplicar el prompt.**

## 5. Prioridades que deben quedar confirmadas al entregar

Marca cada una como ✅ implementada o ➖ no aplica (con motivo). Total: 96 prioridades.

<!--LISTA_INICIO-->

**10_arranque_y_datos.md** — Datos obligatorios de la clase y sincronía con el index
- [ ] **0** 🔴 PREGUNTAS OBLIGATORIAS DE CONFIGURACIÓN Y DE SINCRONIZACIÓN CON EL INDEX

**11_lectura_visual_bloqueos.md** — Cronómetro de lectura, slides visuales, bloqueo de actividades, sopa de letras, paleta, temática, menú
- [ ] **0-A** 🔴 CRONÓMETRO DE PERMANENCIA EN SLIDES DE LECTURA (reglas y visual; motor en 8-N, vigilante en 8-O)
- [ ] **0-B** 🔴 SLIDES DE LECTURA: VISUALES, NO TEXTUALES
- [ ] **0-C** 🔴 BLOQUEO UNIVERSAL DE ACTIVIDADES (TODAS)
- [ ] **0-D** 🔴 SOPA DE LETRAS: MÁXIMO 5 PALABRAS, GRILLA CON ESPACIO, PISTA VISUAL EXACTA
- [ ] **0-E** 🔴 PALETA DE COLORES CLARA OBLIGATORIA (VERIFICACIÓN ESTRICTA)
- [ ] **0-F** 🔴 TEMÁTICA VISUAL ROTATIVA ENTRE CLASES (NO REPETIR TEMA)
- [ ] **0-G** 🔴 EL MENÚ/INDICADOR DE PROGRESO ES 100% VISUAL, NUNCA NAVEGABLE

**12_contenido_y_quiz.md** — Imágenes, ejercicios, nota, bloqueo de evaluables y preguntas de quiz
- [ ] **1** 🔴 IMÁGENES REALES DE INTERNET (MÍNIMO 20)
- [ ] **2** 🔴 SLIDE DE EJERCICIOS PRÁCTICOS (sin video)
- [ ] **3** 🔴 SISTEMA DE NOTA CALCULADA SOLO CON QUIZZES
- [ ] **4** 🔴 BLOQUEO DE EVALUABLES — NO SE PUEDEN SALTAR (motor en 8-O)
- [ ] **5** 🔴 PREGUNTAS DE QUIZ: OPCIÓN MÚLTIPLE CON CONTEXTO
- [ ] **1-B** 🔴 IMÁGENES: RESPALDO GLOBAL, SIN CAÍDAS Y CON VERIFICACIÓN

**13_vidas_y_feedback.md** — Vidas/reintentos, reintento dirigido, retroalimentación y matching
- [ ] **6** 🔴 SISTEMA DE VIDAS / REINTENTOS (MAX_VIDAS = 8)
- [ ] **6-B** 🔴 REINTENTO DIRIGIDO: SIN CRONÓMETRO Y SALTO DIRECTO A LO EVALUABLE
- [ ] **6-C** 🔴 LAS VIDAS SOLO SE ACTIVAN DESDE LA PANTALLA FINAL
- [ ] **7** 🔴 RETROALIMENTACIÓN EN ACTIVIDADES COMPLEMENTARIAS
- [ ] **7-B** 🟠 MATCHING Y VERIFICACIÓN: FEEDBACK VISUAL INMEDIATO + VERIFICAR PASO A PASO

**14_sincronia_e_identidad.md** — Sincronización con el index, guardado, identidad de sesión y claves (PREFIX/SKEY/INDEX_KEY)
- [ ] **8** 🔴 SINCRONIZACIÓN CON INDEX (CADA 20 SEGUNDOS)
- [ ] **8-B** 🔴 BLINDAJE DE AUTOGUARDADO Y RESTAURACIÓN EXACTA DE POSICIÓN
- [ ] **8-C** 🔴 AISLAMIENTO DE DATOS POR ESTUDIANTE (BLINDAJE CONTRA CONTAMINACIÓN ENTRE USUARIOS)
- [ ] **8-D** 🔴 RESTAURACIÓN CONFIABLE DE SLIDE CON VARIOS ESTUDIANTES REGISTRADOS
- [ ] **8-E** 🔴 IDENTIDAD REFORZADA CON GRUPO/SALÓN + ADVERTENCIA EN ACCESO DIRECTO
- [ ] **8-F** 🔴 CONTRATO DE DATOS CON EL ÍNDICE (CLAVE ÚNICA POR ESTUDIANTE, A PRUEBA DE ERRORES)
- [ ] **8-G** 🔺 FUENTE ÚNICA DE VERDAD: IDENTIDAD DE SESIÓN Y RESTAURACIÓN EXACTA DEL AVANCE
- [ ] **8-H** 🔴 BLINDAJE ANTI-TRAMPA DE NOTA: EL BOTÓN "ATRÁS" NUNCA PERMITE REPETIR NI INFLAR UN QUIZ
- [ ] **8-I** 🔴 TODAS LAS ACTIVIDADES SON PERMANENTES: NUNCA SE VACÍAN AL IR Y VENIR
- [ ] **8-J** 🔺 LA SINCRONIZACIÓN CON EL ÍNDICE (8-F) NUNCA PUEDE ESCRIBIR SOBRE LA CLAVE DE SESIÓN (8-G) — CERO COLISIONES DE CLAVE
- [ ] **8-K** 🔺 SINCRONIZACIÓN DE CLAVES Y DE NOMBRE DE ARCHIVO CON EL INDEX
- [ ] **8-L** 🔺 BLINDAJE CONTRA LA SEMANA DUPLICADA EN PREFIX Y CONTRA EL COLAPSO DE SKEY/INDEX_KEY EN UNA SOLA CLAVE

**15_motores_y_pruebas.md** — Motores canónicos: cronómetro, navegación, quiz, modales, onclick seguro, temporizadores y prueba automática
- [ ] **8-M** 🔺 BLINDAJE ANTI-CLIC-RÁPIDO EN QUIZZES, TOPE DE ACIERTOS, Y RESET DE VIDAS DEL PANEL DOCENTE ALINEADO CON EL DEL ESTUDIANTE
- [ ] **8-N** 🔺 MOTOR DEL CRONÓMETRO DE LECTURA: HANDLE GLOBAL, TIEMPO REAL E IDEMPOTENTE
- [ ] **8-O** 🔺 NÚCLEO ÚNICO DE NAVEGACIÓN: puedeAvanzar(), aplicarEstadoAvance(), revalidarAvance(), render(), nextSlide(), prevSlide()
- [ ] **8-P** 🔺 MOTOR ÚNICO DEL QUIZ: rQuiz(), responderQuiz(), RETROALIMENTACIÓN PERSISTENTE, RESET
- [ ] **8-Q** 🔺 MODALES CON COLA: showModal()/closeModal() ÚNICOS, NINGÚN MODAL SE PIERDE
- [ ] **8-R** 🔺 onclick SEGURO: SOLO IDS Y NÚMEROS, NUNCA TEXTO NI FUNCIONES SERIALIZADAS
- [ ] **8-S** 🔺 TODO setInterval/setTimeout DE UNA ACTIVIDAD SE LIMPIA AL CAMBIAR DE SLIDE
- [ ] **8-T** 🔺 PROTOCOLO DE PRUEBA AUTOMÁTICA OBLIGATORIA ANTES DE ENTREGAR CUALQUIER CLASE

**16_nota_semana_reintento.md** — Mejor nota (8-U), semana nueva en cero (8-V) y reintento sin bloqueos (8-W)
- [ ] **8-U** 🔺 LA NOTA OFICIAL ES LA MEJOR NOTA DE TODOS LOS INTENTOS: UN REINTENTO NUNCA BAJA LA NOTA
- [ ] **8-V** 🔺 SEMANA NUEVA = CERO REAL: NINGUNA CLASE PUEDE ABRIR CON NOTA, AVANCE NI DATOS QUE NO SEAN DE ESE ESTUDIANTE, EN ESA SEMANA
- [ ] **8-W** 🔺 REINTENTO A PRUEBA DE BLOQUEOS: AL GASTAR UNA VIDA, EL QUIZ SIEMPRE RESPONDE

**28_clonacion_y_robustez.md** — Clonar la semana anterior sin heredar errores, y robustez ante bloqueos
- [ ] **38** 🔴 FLUJO "PLANTILLA VIVA": INDEX + CLASE ANTERIOR → CLASE DE LA SEMANA SIGUIENTE
- [ ] **38-B** 🔴 LA NOTA (Y TODO LO DEMÁS) NO SE HEREDA: SELLO ESTRICTO Y CUARENTENA
- [ ] **38-C** 🔴 REINTENTO A PRUEBA DE BLOQUEOS: MÁQUINA DE ESTADOS Y "NADA TAPA EL PRIMER CLIC"
- [ ] **38-D** 🔴 `window.CLASE_API`: INTERFAZ PÚBLICA ESTABLE PARA LAS PRUEBAS Y EL DOCENTE
- [ ] **38-E** 🟠 HIGIENE DEL CÓDIGO ENTREGADO, SALUD Y MIGRACIÓN

**17_estructura_y_pantallas.md** — Estructura de slides, cuadernos, menú de ruta, nota final y pantalla final
- [ ] **9** 🔴 ESTRUCTURA DE 23 SLIDES
- [ ] **10** 🔴 CUADERNOS DIGITALES: ACCESO DESDE MENÚ SUPERIOR + DISEÑO TIPO AGENDA REAL
- [ ] **10-B** 🔴 LA NOTA FINAL NO SE MUESTRA SI FALTAN SLIDES POR VER
- [ ] **10-C** 🔴 MENÚ DE RUTA COMPACTO, GAMIFICADO Y NO-NAVEGABLE
- [ ] **10-D** 🟢 MAPA DE CAMINO TIPO "JUEGO DE MESA" (ALTERNATIVA OPCIONAL, YA NO ES EL VALOR POR DEFECTO)
- [ ] **11** 🔴 PANTALLA FINAL GAMIFICADA

**18_diseno_y_gamificacion.md** — Identidad visual, scroll, modo foco, cultura pop, contexto local, gamificación
- [ ] **12** 🟠 IDENTIDAD VISUAL TEMÁTICA (PALETA CLARA Y VIVA)
- [ ] **12-B** 🟠 BARRA DE DESPLAZAMIENTO VISIBLE Y FÁCIL DE USAR
- [ ] **13** 🟠 MODO FOCO AMABLE
- [ ] **14** 🟠 CULTURA POP EN CADA SLIDE
- [ ] **14-B** 🟠 CONTEXTO LOCAL DE CÚCUTA, NORTE DE SANTANDER
- [ ] **15** 🟠 GAMIFICACIÓN

**19_panel_docente_y_menu.md** — Panel docente unificado y menú superior de herramientas
- [ ] **16** 🟠 PANEL DOCENTE UNIFICADO
- [ ] **16-B** 🟠 MENÚ SUPERIOR DE HERRAMIENTAS PARA EL ESTUDIANTE

**20_tecnica_e_integridad.md** — Requisitos técnicos e integridad de la nota
- [ ] **17** 🟢 REQUISITOS TÉCNICOS
- [ ] **18** 🔴 INTEGRIDAD DE LA NOTA, PERSISTENCIA DE QUIZZES Y MENSAJES MOTIVACIONALES DEL DOCENTE

**21_extras_interactivos.md** — Hotspots, vitrina, inicio, avatar, carta sorpresa, elige tu actividad, semáforo, transiciones, reacciones, slider, parallax
- [ ] **19** 🟠 IMÁGENES CON PUNTOS CALIENTES (HOTSPOTS) — ALTERNATIVA AL GRID 2×2
- [ ] **20** 🟠 VITRINA DE LOGROS ACUMULADOS ENTRE SEMANAS
- [ ] **21** 🟠 BOTÓN FIJO "🏠 INICIO": GUARDA, SINCRONIZA Y VUELVE AL INDEX
- [ ] **22** 🟠 AVATAR PROPIO: EL ESTUDIANTE ELIGE SU MASCOTA
- [ ] **23** 🟠 CARTA SORPRESA: BONUS FORMATIVO ALEATORIO
- [ ] **24** 🟠 ELIGE TU ACTIVIDAD": CONTROL DEL ESTUDIANTE EN COMPLEMENTARIAS
- [ ] **25** 🟠 SEMÁFORO DE CONFIANZA ANTES DE CADA QUIZ
- [ ] **26** 🟠 TRANSICIONES ANIMADAS ENTRE SLIDES, CON DIRECCIÓN
- [ ] **27** 🟠 REACCIONES FLOTANTES AL COMPLETAR UNA ACTIVIDAD
- [ ] **28** 🟠 SLIDER "ANTES / DESPUÉS" PARA CONCEPTOS DE COMPARACIÓN
- [ ] **29** 🟠 PARALLAX SUTIL EN EL FONDO DECORATIVO

**22_aria_asistente.md** — ARIA: reglas de comportamiento y ganchos con la clase (el código está en aria/aria_widget.html)
- [ ] **30** 🟠 ARIA: ROBOT ASISTENTE DE LA CLASE, CON CHAT Y VOZ
- [ ] **30-B** 🟠 ARIA: ORIENTACIÓN SOCRÁTICA ANTE PREGUNTAS DE QUIZ COPIADAS/PEGADAS, SIN REVELAR NUNCA LA RESPUESTA
- [ ] **30-C** 🟠 ARIA: LECTOR PROFUNDO DE TODA LA CLASE + EXPLICACIÓN DE CONCEPTOS Y PROCESOS EN PALABRAS SIMPLES
- [ ] **30-D** 🟠 ARIA CON EXPRESIVIDAD FÍSICA: 6 POSES OFICIALES + ANIMACIÓN POR ESTADO
- [ ] **30-E** 🟠 ARIA DOCENTE COMPLETO: BANCO DE MÉTODOS PEDAGÓGICOS REUTILIZABLE + CASCADA DE INTENTOS ANTES DE RENDIRSE
- [ ] **30-F** 🟠 ARIA EXPLICA MEJOR (NO SOLO DISTINTO): ANDAMIAJE SOCRÁTICO + REFUERZO PROACTIVO + COMPARACIÓN VISUAL

**23_recursos_y_medidas.md** — Imágenes base64 propias, medidas exactas y sonido sintetizado
- [ ] **31** 🟠 IMÁGENES PROPIAS EMBEBIDAS EN BASE64
- [ ] **32** 🟢 MEDIDAS EXACTAS DE CAJAS DE TEXTO E IMÁGENES POR SLIDE
- [ ] **33** 🟢 SONIDO SINTETIZADO CON WEB AUDIO API

**24_narrativa_y_personalizacion.md** — Narrativa, protagonista y personalización (la clase es una aventura, no una presentación)
- [ ] **34** 🔴 EL ESTUDIANTE ES EL PROTAGONISTA (OBJETO `PROTA` Y REGLAS DE PERSONALIZACIÓN)
- [ ] **34-B** 🔴 CAPÍTULOS Y MUNDOS: LA CLASE TIENE ARGUMENTO
- [ ] **34-C** 🔴 LECTURAS INTERACTIVAS: EL CUENTO MISTERIOSO CON EL ESTUDIANTE DE PROTAGONISTA
- [ ] **34-D** 🟠 EL ESTUDIANTE TIENE EL CONTROL: DECISIONES, PREDICCIONES Y RUTA PROPIA

**25_minijuegos_y_mundos.md** — Minijuegos (contrato técnico común) y implementación visual de los mundos
- [ ] **35** 🔴 MINIJUEGOS: 3 POR CLASE, TODOS BAJO EL MISMO CONTRATO (NUNCA ROMPEN LA CLASE NI TOCAN LA NOTA)
- [ ] **35-B** 🔴 IMPLEMENTACIÓN VISUAL DE LOS MUNDOS (SIN ROMPER LA PALETA CLARA)

**26_economia_poderes_y_tienda.md** — Economía de gemas, poderes, tienda, misiones y rangos
- [ ] **36** 🔴 ECONOMÍA DE GEMAS: GANANCIAS, TOPES Y PERSISTENCIA SEGURA
- [ ] **36-B** 🔴 PODERES: AYUDAN A APRENDER, NO REGALAN NOTA
- [ ] **36-C** 🟠 MOCHILA, TIENDA Y BAÚL (COSMÉTICOS E INSIGNIAS)
- [ ] **36-D** 🟠 MISIONES, RACHAS Y RANGOS DE AVENTURERO (COMPLEMENTA LA PRIORIDAD 15)

**27_aria_conocimiento_y_pistas.md** — ARIA con conocimiento de TODA la clase y escalera de pistas (nunca revela la respuesta)
- [ ] **37** 🔴 `CLASE_KB`: EL CONOCIMIENTO ESTRUCTURADO QUE ARIA TIENE DE LA CLASE
- [ ] **37-B** 🔴 ESCALERA DE PISTAS DE 5 NIVELES (SIN REVELAR NUNCA LA RESPUESTA)
- [ ] **37-C** 🟠 ARIA COMO COMPAÑERA: PERSONALIDAD, PROACTIVIDAD Y LÍMITES
<!--LISTA_FIN-->

## 6. Orden de entrega de una clase nueva

1. Datos de la clase completos (`plantillas/DATOS_DE_LA_CLASE.md`) y línea real de `INDEX_SEMANAS_META` pegada del index.
2. Resumir la clase anterior (4-B) y clonar **solo el código** (Prioridad 38).
3. Generar el contenido: narrativa (24), minijuegos (25), economía (26), `CLASE_KB` (27); archivo con el nombre **idéntico** al campo `.archivo` (8-K).
4. `python3 tools/insertar_nucleo.py semanaN_xxx.html` y `python3 tools/insertar_aria.py semanaN_xxx.html`
5. `python3 tools/auditar_clase.py semanaN_xxx.html --previa semana{N-1}_xxx.html --semana N` → **cero ❌**.
6. `python3 tools/verificar_imagenes.py semanaN_xxx.html` (o declarar "imágenes sin verificar").
7. `node tests/prueba_clase.js /ruta/semanaN_xxx.html` → T1–T9 sin ❌ (8-T) y la prueba de semana nueva (38-B).
8. Recorrer `prompt/90_checklists.md` y la lista de la sección 5; entregar con un resumen de **qué cambió respecto a la clase anterior** y qué quedó sin verificar.
