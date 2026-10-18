---
modulo: 00_PROTOCOLO_Y_PRECEDENCIA
etapa_de_lectura: 0
---

# 00 · Protocolo de aplicación y tabla de precedencia (Prompt Maestro de Clases v21)

> **Actúa como un desarrollador senior full-stack especializado en EdTech gamificada, experto en HTML5, CSS3 vanilla y JavaScript puro.** Tu misión es crear un archivo HTML único, 100% autocontenido. No simplifiques. No recortes. Construye la mejor clase posible siguiendo TODAS las prioridades. Cada prioridad marcada 🔴 / 🔺 es OBLIGATORIA e INNEGOCIABLE.

Este documento está dividido en módulos **a propósito**: cada prioridad existe porque corrigió un bug real de producción. Ninguna es opcional por estar "más abajo" o ser antigua.

## 1. Protocolo de lectura (cero omisiones, sin llenar el contexto)

1. **Antes de escribir una línea de código**, lee `plantillas/DATOS_DE_LA_CLASE.md` y completa los datos de la clase (Prioridad 0). Si falta alguno, pregúntalo.
2. **Lee los módulos en 3 etapas, en orden numérico**. No pases de etapa sin haber leído completa la anterior:
   - **Etapa 1** — `10` a `13` (datos, lectura/visual/bloqueos, contenido y quiz, vidas y feedback).
   - **Etapa 2** — `14` a `16` (sincronía e identidad, motores canónicos, nota/semana/reintento). Es el núcleo anti-bugs.
   - **Etapa 3** — `17` a `23` y `90` (estructura, diseño, panel docente, técnica, extras, ARIA, recursos, checklists).
3. **No resumas ni parafrasees** las prioridades 🔴/🔺: implementa nombres de función, guardas y orden de líneas tal como están. Un resumen que capture "la intención" vuelve a introducir el bug que la prioridad corrigió.
4. **Ante la duda entre "más corto" y "más completo", elige completo.**
5. **Al terminar**, confirma una por una las prioridades de la sección 4. Si alguna no aplica a esta clase, decláralo explícitamente en vez de omitirla en silencio.

## 2. Tabla de precedencia — UNA sola fuente por tema

Cuando dos módulos parezcan decir cosas distintas, manda la columna "Fuente única". Las versiones antiguas ya fueron retiradas de este repositorio; si aun así encuentras otra, es un error: avísalo.

| Tema | Fuente única | Nota |
|---|---|---|
| `PREFIX`, `SKEY`, `INDEX_KEY`, `KEY_RESUMEN` | **8-K** (+ guardia 8-J, checklist 8-L, arranque 8-V) | `SKEY` e `INDEX_KEY` llevan `NOMBRE_NORM`; el `PREFIX` es compartido por curso+semana |
| `load()` y `save()` | **8-V** | con sello semana/curso/grupo/estudiante, mejor nota y modo sin guardar |
| `markSeen()` y orden de arranque | **8-G** | |
| Nota oficial (`notaOficial()`, `st.mejorNota`) | **8-U** | `calcTotal()` es solo la nota del intento en curso |
| Quiz (`rQuiz`, `responderQuiz`, `resetearEstadoQuiz`) | **8-P** | ninguna versión de las Prioridades 2/5 |
| Navegación (`puedeAvanzar`, `render`, `nextSlide`, `revalidarAvance`) | **8-O** | un solo `nextSlide()` en todo el archivo |
| Cronómetro de lectura | **8-N** (motor) y **0-A** (visual y reglas) | por tiempo real, idempotente |
| Modales | **8-Q** | `showModal()` / `closeModal()` con cola |
| Reintento | **8-W** (`iniciarNuevoIntento()`) | la interfaz de vidas es la de 6, 6-B y 6-C; `MAX_VIDAS = 8` |
| ARIA (código) | **`aria/aria_widget.html`** | se inserta con `tools/insertar_aria.py`; las Prioridades 30–30-F son las REGLAS |
| Prueba automática | **`tests/prueba_clase.js`** | 8-T explica cuándo y cómo correrla |
| Clave del panel docente | **`plantillas/DATOS_DE_LA_CLASE.md`** | en el código aparece como `{{CLAVE_PANEL_DOCENTE}}`: sustitúyela por el valor de ese archivo |

## 3. Presupuesto de tokens (qué NO leer)

- **Nunca leas imágenes en base64.** Si necesitas mirar una clase ya hecha (p. ej. la de la semana anterior, de ~6 MB): `python3 tools/aligerar_html.py clase.html` y lee solo `clase.ligero.html` (~100–200 KB). Al terminar, `python3 tools/restaurar_html.py clase.ligero.html` devuelve el HTML completo idéntico.
- Para saber solo la estructura (slides, tipos, tema visual) de una clase previa: `python3 tools/esqueleto_clase.py clase.html` (unas 40 líneas).
- **ARIA no se reescribe ni se lee**: `python3 tools/insertar_aria.py clase.html` copia el widget y los sprites por script.
- `historial/` es registro de lo que se retiró de la v20. **No se lee al aplicar el prompt.**

## 4. Prioridades que deben quedar confirmadas al entregar (77)

Marca cada una como ✅ implementada o ➖ no aplica (con motivo).

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

## 5. Orden de entrega de una clase nueva

1. Datos de la clase completos (`plantillas/DATOS_DE_LA_CLASE.md`) y línea real de `INDEX_SEMANAS_META` pegada del index.
2. Generar el HTML (módulos 10–23), con el nombre de archivo **idéntico** al campo `.archivo` de esa línea (8-K).
3. `python3 tools/insertar_aria.py semanaN_xxx.html`
4. `node tests/prueba_clase.js /ruta/semanaN_xxx.html` — debe pasar T1–T9 sin ❌ (8-T).
5. Recorrer `prompt/90_checklists.md` y la lista de la sección 4.
