# PROMPT MAESTRO DE CLASES v21 — COMPLETO (generado desde prompt/*.md; no editar aquí)

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

---

# 10 · Datos obligatorios de la clase y sincronía con el index

## 🔴 PRIORIDAD 0 · ABSOLUTA — PREGUNTAS OBLIGATORIAS DE CONFIGURACIÓN Y DE SINCRONIZACIÓN CON EL INDEX

Este documento es **universal**: el mismo prompt debe poder generar la clase de Aritmética 4°, Aritmética 5°, Tecnología 4°, Tecnología 5° o cualquier curso futuro. Para que el archivo resultante sea encontrado y leído correctamente por el `index.html` de ese curso (Prompt Maestro de Index, compañero de este documento), **antes de generar o corregir cualquier archivo de clase se deben responder estos datos** (preguntando al docente si no vienen ya en el mensaje):

```
[ ] Área/materia exacta y su sigla corta   → DEBE ser la misma sigla que usa CONFIG_CURSO.area en el
                                               index de este curso (ej. "mat", "tec") — no se inventa aparte
[ ] Grado                                   → igual que CONFIG_CURSO.grado del index ("4" o "5")
[ ] Período académico                       → igual que CONFIG_CURSO.periodo del index (1, 2, 3 o 4)
[ ] Número de esta semana puntual           → ej. 4
[ ] Tema real de esta semana                → el mismo tema que declara/declarará INDEX_SEMANAS_META[n].tema
[ ] La línea REAL de INDEX_SEMANAS_META para esta semana, pegada tal cual del index de este curso
    → ej. { num: 4, tema: "Operación Táctica", universo: "…", icon: "🎯", archivo: "semana4_mat5p3.html" }
    → si la semana es nueva y esa línea todavía no existe, se avisa explícitamente y se genera una
      propuesta de línea nueva siguiendo la Prioridad 8-K, para que el docente la agregue al index
[ ] Tema visual/gráfico de esta semana (libre, puede rotar semana a semana — Prioridad 0-F)
```

🚫 **Regla anti-colisión:** estos valores nunca se copian de un ejemplo de este documento, de otra materia, ni de un curso generado en otra conversación — se preguntan siempre, para ESTA clase, en ESTA sesión, y deben calzar EXACTAMENTE con el `CONFIG_CURSO` del index real de este curso.

**Checklist:**
```
[ ] area/grado/periodo/semana de esta clase son EXACTAMENTE los mismos valores que el index de este curso
[ ] Se pegó (o se generó de cero) la línea real de INDEX_SEMANAS_META ANTES de nombrar el archivo final
[ ] El nombre de archivo con el que se entrega la clase es copia carácter por carácter del campo .archivo
    de esa línea (ver Prioridad 8-K para el mecanismo completo)
```

###  v13.0 — `CLASE_META`: el TEMA y OBJETIVO de la semana, expuestos como variable global para que ARIA los pueda leer (complementa la Prioridad 30)
**Bug real detectado:** el TEMA y el OBJETIVO de la clase (Prioridad 0, arriba, y "DATOS A COMPLETAR POR EL AUTOR" al final del documento) se usaban para redactar los textos de la clase, pero **nunca quedaban guardados en ninguna variable que el código JavaScript pudiera leer en tiempo de ejecución**. Consecuencia: cuando el estudiante le preguntaba a ARIA "¿qué voy a aprender hoy?", "¿cuál es el tema de hoy?" o "¿cuál es el objetivo de la clase?", el motor de `responderAria()` no tenía ningún dato exacto de dónde sacar la respuesta — esas palabras ("tema", "objetivo", "hoy", "aprender") casi nunca aparecen literalmente dentro del texto de las diapositivas, así que la búsqueda por palabras clave (Prioridad 30.3) fallaba y ARIA caía en el "no sé responder eso" genérico, justo en una de las preguntas más básicas y más frecuentes de cualquier estudiante.

**Solución — declarar `CLASE_META` junto a `SL`/`GLOSARIO`, con los mismos datos que ya se recogen en esta Prioridad 0:**
```javascript
const CLASE_META = {
  materia:  'Aritmética',                          // dato "MATERIA" de esta Prioridad 0
  grado:    '5°',                                   // dato "GRADO"
  tema:     'Fracciones equivalentes',               // dato "Tema real de esta semana" / "TEMA"
  objetivo: 'Hoy vas a aprender a reconocer y crear fracciones que representan la misma cantidad.' // dato "OBJETIVO"
};
```
Ver Prioridad 30 (30.3) para cómo `responderAria()` debe consultar `CLASE_META` con prioridad ALTA ante preguntas sobre el tema/objetivo de la clase — antes de intentar buscarlo por palabras clave en el contenido.

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

---

# 12 · Imágenes, ejercicios, nota, bloqueo de evaluables y preguntas de quiz

## 🔴 PRIORIDAD 1 · ABSOLUTA — IMÁGENES REALES DE INTERNET (MÍNIMO 20)

### 📸 REGLA DE ORO: MÍNIMO 20 IMÁGENES REALES POR CLASE
**FUENTE EXCLUSIVA — Unsplash (sin API key, siempre funciona):**
```javascript
// PATRÓN EXACTO que funciona — NO cambiar la estructura de la URL:
'https://images.unsplash.com/photo-[ID_FOTO]?w=400&h=250&fit=crop&auto=format&q=80'
// Para thumbnails en tarjetas interactivas:
'https://images.unsplash.com/photo-[ID_FOTO]?w=120&h=120&fit=crop&auto=format&q=80'
// Para imágenes de detalle (cuando el usuario hace clic):
'https://images.unsplash.com/photo-[ID_FOTO]?w=500&h=300&fit=crop&auto=format&q=80'
```
**IDs de Unsplash confiables por categoría temática:**
```javascript
// TECNOLOGÍA / COMPUTADORES
const IMGS_TECH = {
  teclado:    '1587829741301-dc798b83add3',
  mouse:      '1527814050087-3793815479db',
  monitor:    '1547082299-de196ea013d6',
  laptop:     '1496181133206-80ce9b88a853',
  disco_hdd:  '1597872200969-2b65d56bd16b',
  usb:        '1601972599720-36938d4ecd31',
  ram:        '1531492746076-161ca9bcad58',
  cpu:        '1518770660439-4636190af475',
  impresora:  '1544117519-31a4b719223d',
  redes:      '1558618666-fcd25c85cd64',
  router:     '1544197150-b99a580bb7a8',
  internet:   '1451187580459-43490279c0fa',
  codigo:     '1461749280684-dccba630e2f6',
  apps:       '1512941937669-90a1b58e7e9c',
  celular:    '1511707171634-5f897ff02aa9',
  videojuego: '1612287230202-1ff1d85d1bdf',
  gamer_setup:'1593508512255-86ab42a8e620',
  so_windows: '1551650975-87deedd944c3',
};
// NATURALEZA / CIENCIAS
const IMGS_CIENCIAS = {
  planta:       '1416879595882-3373a0480b5b',
  animal:       '1474511320723-9a56873867b5',
  agua:         '1505118380757-91f5f5632de0',
  sol:          '1508739773434-c26b3d09e071',
  tierra:       '1446776811953-b23d57bd21aa',
  ecosistema:   '1441974231531-c6227db76b6e',
  laboratorio:  '1532094349884-32413686ca0c',
  microscopio:  '1507003211169-0a1dd7228f2d',
  celula:       '1559757148-5c350d0d3c56',
  cuerpo:       '1530026405845-74d57adf5e44',
};
// MATEMÁTICAS
const IMGS_MATH = {
  numeros:      '1509228468518-180b8abb5fa6',
  geometria:    '1509236841566-9f7efd7ce929',
  calculadora:  '1587145820266-a5951ee6f620',
  regla:        '1611532736597-de2d4265fba3',
  reloj:        '1516574187841-cb9cc2ca948b',
  monedas:      '1518458028785-8fbcd101ebb9',
  fracciones:   '1578662996442-48f60103fc96',
};
// LENGUAJE / ESPAÑOL
const IMGS_LENGUAJE = {
  libro:        '1481627834876-b7833e8f5570',
  escritura:    '1455390582262-e97a8c80a394',
  lectura:      '1512820790803-83ca734da794',
  lapiz:        '1513001900722-370f803f498d',
  biblioteca:   '1507842217343-583bb7270b66',
  periodico:    '1504711434969-e33886168f5c',
};
// SOCIAL / COLOMBIA
const IMGS_SOCIAL = {
  ciudad:       '1512917774080-9991f1c7a03d',
  campo:        '1500382017468-9049fed747ef',
  familia:      '1511895426328-dc8714191011',
  colombia:     '1580063665421-a10acfdb2a3a',
  escuela:      '1580582932707-520aed937b7b',
  mapa:         '1524661135-423995f22d0b',
};
```
**DISTRIBUCIÓN OBLIGATORIA — MÍNIMO 20 IMÁGENES POR CLASE:**
| Ubicación | Cantidad mínima |
|-----------|----------------|
| Slide intro | 1–2 imágenes decorativas |
| Cada slide 'info' (mín. 4 slides de info) | 4 imágenes en grid 2×2 cada uno = 16 |
| Explorador interactivo (6 elementos) | 6 thumbnails + 6 detalle = 12 |
| Repaso/resumen | 2 imágenes |
|  v7.3: Cuadernos | 0 — el Cuaderno 1 y el Taller en Clase NUNCA llevan imágenes (Prioridad 10); compensar el total en los slides 'info'/repaso/explorador |
| **TOTAL GARANTIZADO** | **≥ 20 imágenes reales** (todas fuera de los cuadernos) |
**IMPLEMENTACIÓN EXACTA en slides de contenido:**
```html
<!-- Grid 2×2 obligatorio en cada slide info -->
<div class="g2" style="gap:9px">
  <div class="imgc">
    <img src="https://images.unsplash.com/photo-[ID]?w=300&h=130&fit=crop&auto=format&q=80"
         alt="[descripción]" loading="lazy">
    <div class="imgc-cap">🖼️ [Título]</div>
  </div>
  <!-- repetir 3 veces más -->
</div>
```
**CSS de imágenes — incluir SIEMPRE:**
```css
.imgc { border-radius:10px; overflow:hidden; border:4px solid var(--primary); box-shadow:0 3px 0 var(--primary-dark); }
.imgc img { width:100%; height:130px; object-fit:cover; display:block; }
.imgc-cap { background:var(--primary); color:#fff; padding:5px 8px; font-family:var(--font-ui); font-size:.75rem; text-align:center; }
.hwp { background:linear-gradient(180deg,#fff,#f8f8f0); border:3px solid var(--primary); border-radius:11px; padding:11px; cursor:pointer; transition:.15s; text-align:center; box-shadow:0 4px 0 var(--primary-dark); }
.hwp:hover { transform:translateY(-2px); border-color:var(--accent); box-shadow:0 6px 0 var(--accent2); }
.hwp img { width:65px; height:65px; object-fit:cover; border-radius:7px; display:block; margin:0 auto 6px; }
.hw-detail { background:#fffde0; border:4px solid var(--accent); border-radius:var(--radius); padding:14px; margin-top:11px; display:none; animation:sIn .3s; box-shadow:0 5px 0 var(--accent2); }
.hw-detail.show { display:flex; gap:12px; align-items:flex-start; }
.hw-detail img { width:120px; height:90px; object-fit:cover; border-radius:7px; border:3px solid var(--accent); flex-shrink:0; }
```
**SISTEMA DE FALLBACK EMOJI — OBLIGATORIO al final del archivo:**
```javascript
document.addEventListener('DOMContentLoaded', function() {
  const emojiMap = {
    'teclado':'⌨️','keyboard':'⌨️','mouse':'🖱️','monitor':'🖥️','laptop':'💻',
    'computador':'💻','disco':'💾','hdd':'💾','usb':'🔌','cpu':'⚙️','ram':'💾',
    'impresora':'🖨️','cámara':'📷','red':'🌐','router':'📡','internet':'🌐',
    'código':'👨‍💻','apps':'📱','videojuego':'🎮','gamer':'🎮','hardware':'🔧',
    'software':'💻','planta':'🌱','animal':'🐾','célula':'🔬','sistema':'🫀',
    'agua':'💧','tierra':'🌍','sol':'☀️','luna':'🌙','laboratorio':'🧪',
    'número':'🔢','suma':'➕','resta':'➖','fracciones':'🔢','geometría':'📐',
    'calculadora':'🧮','libro':'📚','escritura':'✍️','lectura':'📖','lapiz':'✏️',
    'ciudad':'🏙️','campo':'🌾','colombia':'🇨🇴','mapa':'🗺️','música':'🎵','arte':'🎨',
  };
  function fixImg(img) {
    img.onerror = null;
    const alt = (img.alt||'').toLowerCase();
    let icon = '🖼️';
    for (const k in emojiMap) { if (alt.includes(k)) { icon = emojiMap[k]; break; } }
    const ph = document.createElement('div');
    ph.style.cssText = 'font-size:2.8rem;display:flex;align-items:center;justify-content:center;min-height:70px;width:100%;background:var(--primary-light,#e8f4ff);border-radius:9px;border:2px dashed var(--primary,#4a90d9);flex-direction:column;gap:5px;padding:8px;';
    const cap = img.closest('.imgc')?.querySelector('.imgc-cap')?.textContent || img.alt || '';
    ph.innerHTML = `<span>${icon}</span><span style="font-size:.65rem;font-family:Fredoka One;color:var(--primary-dark,#2c5282)">${cap}</span>`;
    img.parentNode.insertBefore(ph, img);
    img.style.display = 'none';
  }
  document.querySelectorAll('img').forEach(function(img) {
    if (img.complete && img.naturalWidth === 0) fixImg(img);
    else img.addEventListener('error', function() { fixImg(this); });
  });
});
```

## 🔴 PRIORIDAD 2 · ABSOLUTA — SLIDE DE EJERCICIOS PRÁCTICOS (sin video)

### 🚫 v7.3 — LOS VIDEOS QUEDAN ELIMINADOS DE LAS CLASES
**Cambio de criterio:** el slide de video (`type: 'video'`) queda eliminado de la estructura de la clase. En su lugar, en esa misma posición del recorrido (slide 16), va un **slide de ejercicios prácticos resueltos paso a paso**, cuyo contenido debe corresponder EXACTAMENTE a algo que luego se pregunte en el Quiz 2 o en la Evaluación Final — reforzando justo antes la habilidad que se va a evaluar (mismo principio de la Prioridad 0-B: "la respuesta ya fue enseñada antes").
### ✏️ REGLA DE ORO: 2-3 EJERCICIOS RESUELTOS, DIRECTAMENTE LIGADOS A LO QUE SE VA A PREGUNTAR
```javascript
// Slide tipo 'practica' — posición 16, reemplaza al antiguo 'video'
{
  type: 'practica',
  title: '✏️ Practiquemos juntos',
  ejercicios: [
    {
      enunciado: '[Situación o problema breve — el mismo tipo que aparecerá en el quiz]',
      pasos: ['[Paso 1]', '[Paso 2]', '[Paso 3]'],
      resultado: '[Resultado final]',
    },
    // 2 o 3 ejercicios en total — nunca más de 3, para no alargar el slide
  ]
}
function rPractica(s) {
  markSeen();
  const html = `
    <div class="slide-title">${s.title}</div>
    <p class="slide-sub">💪 Resuelve mentalmente cada paso — esto es justo lo que verás en el próximo quiz</p>
    ${s.ejercicios.map((ej, i) => `
      <div class="mc" style="margin-bottom:12px;padding:14px">
        <p style="font-family:var(--font-ui);color:var(--primary-dark);font-size:.92rem;margin-bottom:8px">
          ✏️ Ejercicio ${i+1}: ${ej.enunciado}
        </p>
        <div style="background:#fffde0;border:3px solid var(--accent);border-radius:12px;padding:12px;font-size:.85rem;line-height:2;color:var(--text2)">
          ${ej.pasos.map((p, j) => `<p>${['①','②','③','④'][j]||'•'} ${p}</p>`).join('')}
          <p style="color:var(--success);font-weight:900">✅ ${ej.resultado}</p>
        </div>
      </div>
    `).join('')}
  `;
  // ⏱️ v12.0: NO se llama al cronómetro aquí (antes: requestAnimationFrame → activarCronometroLectura). render() lo arranca por aplicarEstadoAvance() (Prioridad 8-O), igual que en cualquier slide de lectura.
  return html;
}
```
**Reglas de la slide de práctica:**
- Entre 2 y 3 ejercicios resueltos completos — nunca más de 3, para que no se vuelva pesada de leer
- Cada ejercicio debe usar el MISMO tipo de situación/problema que luego aparecerá en Quiz 2 o en la Evaluación Final — nunca un tema suelto sin relación
- Sigue contando como slide de lectura: aplica el cronómetro de 12 segundos (Prioridad 0-A) y las reglas de "máximo texto, máximo visual" (Prioridad 0-B)
- NUNCA afecta la nota directamente — es preparación; lo que sí afecta la nota es la pregunta relacionada que aparece después, en el quiz correspondiente
**CHECKLIST:**
```
[ ] El slide tipo 'video' fue eliminado por completo — no debe aparecer en ningún lugar del código generado
[ ] El slide tipo 'practica' ocupa la posición 16 de la estructura (Prioridad 9)
[ ] Entre 2 y 3 ejercicios resueltos paso a paso, nunca más de 3
[ ] Cada ejercicio de práctica se relaciona directamente con una pregunta real de Quiz 2 o Evaluación Final
[ ] Aplica cronómetro de 12s (Prioridad 0-A) igual que cualquier slide de lectura
```

## 🔴 PRIORIDAD 3 · ABSOLUTA — SISTEMA DE NOTA CALCULADA SOLO CON QUIZZES

### ⭐ REGLA DE ORO: SOLO LOS QUIZZES DE OPCIÓN MÚLTIPLE GENERAN NOTA
**ESTRUCTURA OBLIGATORIA DE EVALUACIÓN POR CLASE:**
```javascript
// CONFIGURACIÓN DE EVALUACIÓN — DEFINIR AL INICIO
const EVAL_CONFIG = {
  quiz1: {
    nombre: 'Quiz 1',
    preguntas: 8,      // Entre 7 y 10 preguntas
    peso: 33.3,        // % del total de preguntas
  },
  quiz2: {
    nombre: 'Quiz 2',
    preguntas: 8,      // Entre 7 y 10 preguntas
    peso: 33.3,
  },
  evalFinal: {
    nombre: 'Evaluación Final',
    preguntas: 14,     // Entre 12 y 15 preguntas
    peso: 33.4,
  }
};
// TOTAL PREGUNTAS = quiz1 + quiz2 + evalFinal
// Ej: 8 + 8 + 14 = 30 preguntas totales
// NOTA = (aciertos / total_preguntas) × 5.0
// Nota mínima = 0.0 · Nota máxima = 5.0 · Nota aprobatoria = 3.0
```
**SISTEMA DE PUNTUACIÓN — NOTA DESDE CERO:**
```javascript
// La nota NO inicia en 5.0 — se CONSTRUYE con aciertos
// Nota = (total_aciertos / total_preguntas_evaluables) × 5.0
let st = {
  aciertos: 0,        // contador de respuestas correctas en evaluables
  totalPregs: 0,      // total de preguntas evaluables respondidas
  // ...otros campos
};
// 🧾 v12.0 — Lo de arriba es la FÓRMULA conceptual de la nota (para entender qué mide calcTotal), no el código a copiar:
// calcTotal() real, con el tope anti-clic-rápido, vive en la Prioridad 8-M.
// registrarRespuesta() NO se implementa tal cual — sumar st.aciertos++ sin candado es exactamente el bug de 8-M.
// El único punto que suma un acierto es responderQuiz() (Prioridad 8-P), a través de recalcularAciertosDesdeContadores() (8-H).
```
**ACTIVIDADES SIN NOTA (complementarias) — NO afectan el cálculo:**
| Tipo | Nota | Obligatoria para avanzar | Nota si falla |
|------|------|--------------------------|---------------|
| Quiz opción múltiple | ✅ SÍ | ✅ NO se puede saltar | Simplemente no suma acierto |
| Evaluación final | ✅ SÍ | ✅ NO se puede saltar | Simplemente no suma acierto |
| Sopa de letras | ❌ NO | ⚠️ Mín. 1 palabra encontrada | Sin efecto en nota |
| Drag & drop | ❌ NO | ❌ Se puede saltar | Sin efecto en nota |
| Matching | ❌ NO | ❌ Se puede saltar | Sin efecto en nota |
| Fill in the blank | ❌ NO | ❌ Se puede saltar | Sin efecto en nota |
| Ordenar | ❌ NO | ❌ Se puede saltar | Sin efecto en nota |
| Explorador | ❌ NO | ❌ Se puede saltar | Sin efecto en nota |
| Cuadernos | ❌ NO | ❌ Se puede saltar | Sin efecto en nota |

>  **v15.0 — Nota oficial = MEJOR nota de todos los intentos (Prioridad 8-U).** `calcTotal()` es la nota del intento EN CURSO; la nota que se muestra, se guarda y se envía al index es `notaOficial()` = `max(calcTotal(), st.mejorNota)`. Reintentar con una vida **nunca baja la nota** (3.5 → reintento 3.0 → queda 3.5).

## 🔴 PRIORIDAD 4 · ABSOLUTA — BLOQUEO DE EVALUABLES — NO SE PUEDEN SALTAR (motor en 8-O)

### 🚫 LOS QUIZZES Y EVALUACIÓN FINAL SON OBLIGATORIOS — NO SE PUEDEN SALTAR
Un `quiz`/`evalFinal` bloquea "Siguiente" hasta que `st.acts['completado_'+id] === true` (es decir, hasta responder TODAS sus preguntas). La lógica vive en `puedeAvanzar(s)` y `nextSlide()` de la **Prioridad 8-O** (versión única); el mensaje amable de bloqueo es `mostrarMensajeBloqueo(s)` de la Prioridad 0-C.


**Reglas que se mantienen:**
- Ningún botón, atajo, menú lateral ni enlace permite pasar un quiz/evalFinal sin completarlo (el menú de progreso es 100% visual — Prioridad 0-G).
- La sopa de letras (`wordsearch`) exige **al menos 1 palabra encontrada** (`ws_min_`) — **sin opción de "saltar"**.
- El mensaje de bloqueo de un evaluable dice que "sí cuenta para tu nota" y no ofrece ninguna salida salvo volver a responder.

**Checklist:**
```
[ ] Existe UN SOLO nextSlide() en todo el archivo (el de la Prioridad 8-O) — buscar "function nextSlide" y confirmar que aparece una vez
[ ] No existe goNextForce() ni ningún botón "Saltar de todas formas"
[ ] Un quiz/evalFinal incompleto bloquea "Siguiente" tanto en el botón como en cualquier otra ruta
```

## 🔴 PRIORIDAD 5 · ABSOLUTA — PREGUNTAS DE QUIZ: OPCIÓN MÚLTIPLE CON CONTEXTO

### 📝 REGLAS DE DISEÑO DE PREGUNTAS
**PROHIBIDO:**
- Preguntas cuya respuesta esté literalmente en el enunciado
- Preguntas sin contexto previo — siempre referenciar un concepto explicado ANTES en la clase
- Preguntas que un estudiante pueda responder sin haber leído la clase
**OBLIGATORIO:**
- Cada pregunta tiene un **CONTEXTO** (párrafo breve o imagen) que da información suficiente para analizar
- La respuesta correcta requiere **INFERENCIA** — el estudiante debe pensar, no solo copiar
- El contexto menciona una situación, personaje o dato real que el estudiante debe interpretar
- Las 4 opciones son plausibles (no hay opciones ridículas o claramente incorrectas)
- Las opciones A, B, C, D se mezclan aleatoriamente cada vez que se muestra
**ESTRUCTURA OBLIGATORIA DE CADA PREGUNTA:**
```javascript
{
  id: 'q1',
  contexto: `
    <div style="background:var(--primary-light);border-left:4px solid var(--primary);
                padding:12px;border-radius:0 10px 10px 0;margin-bottom:12px;font-size:.85rem">
      <p style="font-weight:700;color:var(--primary-dark);margin-bottom:6px">📖 Lee con atención:</p>
      <p style="line-height:1.8;color:var(--text2)">
        [SITUACIÓN O DATO que requiere análisis — NO incluir la respuesta directamente]
      </p>
    </div>
  `,
  pregunta: '❓ [PREGUNTA que requiere inferencia a partir del contexto]',
  opciones: [
    { id:'a', texto:'[Opción A]', correcta: false },
    { id:'b', texto:'[Opción B]', correcta: true  },  // <- la correcta
    { id:'c', texto:'[Opción C]', correcta: false },
    { id:'d', texto:'[Opción D]', correcta: false },
  ],
  retroalimentacion: '[Explicación de POR QUÉ la respuesta correcta es correcta]',
  pistaAyuda: '[OPCIONAL — ver Prioridad 30-B. Orientación socrática que el profe Luis escribe para ESTA pregunta puntual: qué revisar, en qué fijarse, cómo pensarla — NUNCA la respuesta ni una pista tan directa que la delate. Si se deja vacío, ARIA usa un scaffolding genérico de respaldo.]'
}
```
> 📌 **`pistaAyuda` es opcional pero muy recomendado** en preguntas donde el estudiante suele trabarse: es lo que ARIA usa (Prioridad 30-B) cuando detecta que el estudiante pegó o escribió esta pregunta en el chat, en vez de darle la respuesta o dejarlo sin apoyo.
**FUNCIONES DEL QUIZ — v12.0: UNA SOLA IMPLEMENTACIÓN, en la Prioridad 8-P** (`vistaPregunta()`, `rQuiz()`, `responderQuiz()`, retroalimentación persistente, `resetearEstadoQuiz()`, `shuffleWithSeed()`). El HTML del quiz (barra de progreso, contexto, opciones aleatorias, aviso de obligatoriedad) sigue siendo el que esta prioridad especificaba y ahora está dentro de `rQuiz()` de 8-P.


**Lo que sí sigue vigente aquí — `renderResumenQuiz()`** (el botón usa `nextSlide()`, jamás `st.slide++`):
```javascript
function renderResumenQuiz(s) {
  const resps = st.acts['quiz_resps_'+s.id] || [];
  const correctas = resps.filter(r => r.correcta).length;
  const totalP = s.preguntas.length;
  return `
    <div class="slide-title">📊 Resumen — ${s.title}</div>
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:3.5rem;margin-bottom:8px">${correctas>=totalP*0.7?'🏆':correctas>=totalP*0.5?'⭐':'💪'}</div>
      <p style="font-family:var(--font-ui);font-size:1.3rem;color:var(--primary-dark);margin-bottom:6px">
        ${correctas} / ${totalP} correctas
      </p>
      <p style="font-size:.85rem;color:var(--muted);margin-bottom:16px">
        ${((correctas/totalP)*100).toFixed(0)}% de aciertos en este quiz
      </p>
      <!-- Detalle de respuestas incorrectas -->
      ${resps.filter(r=>!r.correcta).length > 0 ? `
        <div style="text-align:left;background:var(--primary-light);border-radius:12px;padding:12px;margin-bottom:14px">
          <p style="font-family:var(--font-ui);color:var(--primary-dark);font-size:.88rem;margin-bottom:8px">
            📌 Preguntas que fallaste:
          </p>
          ${resps.filter(r=>!r.correcta).map((r,i) => `
            <div style="background:#fff;border-left:3px solid var(--error);
                        border-radius:0 8px 8px 0;padding:8px 10px;margin-bottom:7px;font-size:.78rem">
              <p style="color:var(--error);font-weight:700;margin-bottom:3px">❌ Pregunta ${r.pregIdx+1}</p>
              <p style="color:var(--text2);line-height:1.6">${r.retro||'Revisa el contenido de la clase.'}</p>
            </div>
          `).join('')}
        </div>
      ` : `
        <div style="background:#e8fff0;border-radius:12px;padding:12px;margin-bottom:14px;
                    border:2px solid var(--success)">
          <p style="font-family:var(--font-ui);color:var(--success);font-size:.9rem">
            🎉 ¡Perfecto! No tuviste errores en este quiz.
          </p>
        </div>
      `}
      <button class="mbtn" onclick="nextSlide()">Continuar →</button>
    </div>
  `;
}
```

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

---

# 14 · Sincronización con el index, guardado, identidad de sesión y claves (PREFIX/SKEY/INDEX_KEY)

## 🔴 PRIORIDAD 8 · ABSOLUTA — SINCRONIZACIÓN CON INDEX (CADA 20 SEGUNDOS)

> **Nota:** `PREFIX`/`SKEY`/`save()`/`load()` NO se definen en esta sección: la fórmula de claves es la de **8-K** y `load()`/`save()` son los de **8-V**. El resto de esta sección (`syncIndex()`, autoguardado en capas, botón de guardar, funciones del index) sigue vigente y usa esas definiciones.
```javascript
// ═══ GUARDAR ESTADO COMPLETO Y CARGAR ESTADO — ver Prioridad 8-G ═══
// (PREFIX, SKEY, save(), load() y markSeen() se implementan ÚNICAMENTE ahí)
// ═══ SINCRONIZAR CON INDEX — ver Prioridad 8-F (única syncIndex() válida, con notaOficial() de 8-U) ═══
// ELIMINADA la syncIndex() heredada que estaba aquí (IDX_SC / SEM_ID / "conservar la nota previa"):
// guardaba por NOMBRE (sin grupo) con un SEM_ID que el documento nunca definía y copiaba la nota de la entrada
// anterior; con dos semanas o dos estudiantes homónimos compartiendo llave, una semana NUEVA abría con la nota
// de otra (bug de producción, Prioridad 8-V). Hoy existe UNA SOLA syncIndex(), en 8-F.
// ═══ CAPA 1: Guardar en cada interacción (save() ya lo hace)
// ═══ CAPA 2: Intervalo automático cada 20 segundos
setInterval(() => { save(); }, 20000);
// ═══ CAPA 3: Al salir de la página
window.addEventListener('beforeunload', () => { save(); syncIndex(); });
// ═══ CAPA 4: Al ocultar la pestaña
document.addEventListener('visibilitychange', () => { if (document.hidden) save(); });
// ═══ BOTÓN FÍSICO DE GUARDAR (en el navbar) ═══
// HTML:
// <button class="nav-btn" onclick="save();showToast('💾 ¡Guardado!')" title="Guardar progreso">
// 💾 Guardar
// </button>
// ═══ INDICADOR VISUAL DE GUARDADO ═══
function mostrarGuardado() {
  const el = document.getElementById('save-ind');
  if (!el) return;
  el.style.opacity = '1';
  setTimeout(() => el.style.opacity = '0', 2000);
}
// En navbar: <span id="save-ind" style="font-size:.62rem;color:var(--success);opacity:0;transition:opacity .5s">💾 guardado</span>
```
### 📊 LO QUE VE EL INDEX DE CADA ESTUDIANTE:
El index debe mostrar para cada semana:
- Nota actual (X.X / 5.0)
- Porcentaje completado (barra de progreso)
- Slide donde quedó ("Slide 12 de 25")
- Fecha y hora del último acceso
- Cantidad de intentos usados (vidas)
- Estado: 🔴 Sin iniciar / 🟡 En progreso / 🟢 Completada
```javascript
// FUNCIÓN PARA EL INDEX — leer progreso de cada clase
function getProgresoSemana(materiaKey, semanaId, studentName) {
  try {
    const sc = JSON.parse(localStorage.getItem(materiaKey+'_scores')||'{}');
    return sc[studentName]?.[semanaId] || null;
  } catch(e) { return null; }
}
// RENDER EN EL INDEX — tarjeta de semana con progreso
function renderTarjetaSemana(semana, progreso) {
  if (!progreso) {
    return `<div class="sem-card sin-iniciar">
      <span class="sem-estado">🔴 Sin iniciar</span>
      <span class="sem-nota">—</span>
    </div>`;
  }
  const pct = progreso.porcentaje || 0;
  const completada = progreso.completada || pct >= 90;
  return `
    <div class="sem-card ${completada?'completada':'en-progreso'}">
      <div class="sem-barra">
        <div style="width:${pct}%;background:${completada?'var(--success)':'var(--primary)'}"></div>
      </div>
      <div class="sem-info">
        <span class="sem-estado">${completada?'🟢 Completada':'🟡 En progreso'} — ${pct}%</span>
        <span class="sem-nota">${progreso.nota} / 5.0</span>
        <span class="sem-detalle">Slide ${progreso.slideActual||0} de ${progreso.totalSlides||25} · ${progreso.fecha||''}</span>
        <span class="sem-vidas">❤️ ${MAX_VIDAS-(progreso.vidasUsadas||0)} vidas restantes</span>
      </div>
      <button onclick="abrirClase('${semana.archivo}','${semana.id}')" class="sem-btn">
        ${completada ? '🔁 Repasar' : '▶ Continuar'}
      </button>
    </div>
  `;
}
// Al abrir una clase desde el index:
// ⚠️ v15.0 — ejemplo ILUSTRATIVO del lado del index. El contrato vigente (storagePrefix completo "area_grado_grupo_pPERIODO_sSEMANA" + semana) es el de 8-K/8-V.
function abrirClase(archivo, semanaId) {
  sessionStorage.setItem('desde_index', 'true');
  sessionStorage.setItem('clase_contexto', JSON.stringify({
    semana:        semanaId,
    materia:       MATERIA_NOMBRE,
    grado:         GRADO,
  storagePrefix: PREFIX_QUE_ENTREGA_EL_INDEX, // formato area_grado_grupo_pPERIODO_sSEMANA (ver 8-K); el index real también entrega `semana`
  }));
  window.open(archivo, '_blank');
}
```

## 🔴 PRIORIDAD 8-B · ABSOLUTA — BLINDAJE DE AUTOGUARDADO Y RESTAURACIÓN EXACTA DE POSICIÓN

### 📍 REGLA DE ORO: EL ESTUDIANTE SIEMPRE VUELVE EXACTO A DONDE QUEDÓ
Se han detectado clases donde, al recargar la página, cerrar por error, o volver a entrar desde el index, el estudiante NO queda en el slide exacto donde iba, sino que reinicia. Esta sección **refuerza** (no reemplaza) la Prioridad 8 con un orden de inicialización obligatorio y capas extra de respaldo.
**GARANTÍA OBLIGATORIA — el estudiante debe quedar exactamente donde estaba en TODOS estos casos:**
- Recarga manual de la página (F5 / botón recargar)
- Cierre accidental de la pestaña o el navegador y reingreso posterior
- Salida por error y reingreso desde el mismo enlace o desde el index
- Cambio de pestaña/ventana y regreso
- Pérdida de conexión momentánea

###  REGLA DE ORO ADICIONAL: `save()` SE LLAMA EN EL MISMO CLIC, NUNCA SE DEJA PARA DESPUÉS
**Diagnóstico exacto del bug que esta regla previene:** un estudiante avanza hasta, por ejemplo, el slide 6, refresca la página o se sale y vuelve a entrar, y la clase reinicia desde el principio — a pesar de que `save()` ya existe en `nextSlide()`/`prevSlide()`. Esto pasa cuando alguna interacción intermedia (arrastrar una ficha, marcar una casilla, usar una pista, seleccionar una opción de un ejercicio no evaluable) modifica `st` pero su `onclick`/`onchange`/`ondrop` NO llama a `save()` de inmediato — la app confía en que el intervalo de 20s (Prioridad 8) o el próximo cambio de slide guardarán ese avance, y si el estudiante recarga antes de que eso ocurra, ese progreso intermedio se pierde (o, peor, la app carga un `st` viejo que sobreescribe el nuevo al siguiente `save()` mal ordenado).
**Regla, sin excepción:** toda función manejadora de un evento (clic, drag-drop, cambio de input, selección) que modifique cualquier propiedad de `st` debe terminar con una llamada síncrona a `save()` **dentro de esa misma función**, antes de retornar — igual que ya hacen `nextSlide()`, `prevSlide()`, `responderQuiz()` y el manejo de pistas en este documento. No es válido:
```javascript
// ❌ PROHIBIDO — modifica st pero delega el guardado al intervalo de 20s o al próximo nextSlide()
function marcarCasillaWS(id) { st.acts['ws_'+id] = true; render(); }
```
```javascript
// ✅ OBLIGATORIO — guarda en el mismo clic que modifica st
function marcarCasillaWS(id) { st.acts['ws_'+id] = true; save(); render(); }
```
Esto es una generalización explícita del patrón que 8-I ya exige para actividades (drag/match/fill/orden nunca se vacían), 8-H exige para quizzes, y la Prioridad 5.34 (línea "se guarda de inmediato, la pista usada nunca se resetea al recargar") ya aplica puntualmente al uso de pistas — v11.2 lo deja como regla universal de la Prioridad 8-B para que cubra cualquier interacción nueva que se agregue en prioridades futuras, no solo las ya existentes.
[ ] Toda función que asigna algo a `st.acts[...]`, `st.slide`, `st.vidasUsadas`, `st.aciertos` o cualquier otra propiedad de `st` termina con `save()` antes de `render()`, en la misma función — nunca se delega solo al intervalo de 20s, a `beforeunload` ni al próximo cambio de slide

#### ORDEN DE INICIALIZACIÓN OBLIGATORIO — NUNCA invertir este orden:
```javascript
// NUEVO v6.1 — bloque de arranque OBLIGATORIO, único punto de entrada de la app
document.addEventListener('DOMContentLoaded', function() {
  load();                 // 1️⃣ PRIMERO: restaurar TODO el estado guardado (incluye st.slide exacto)
  render();                // 2️⃣ SEGUNDO: recién ahora se pinta la pantalla — en el slide restaurado
  setupModoFoco();          // 3️⃣ Resto de inicializaciones normales de la clase
  actualizarBadgesCuadernos();
  updateVidasBtn();
  // ❌ PROHIBIDO: nunca hacer st.slide = 0 en este bloque de arranque
  // ❌ PROHIBIDO: nunca llamar render() antes que load()
});
```
**REGLAS DE BLINDAJE — agregar SIN quitar nada de la Prioridad 8:**
```javascript
// NUEVO v6.1 — capa extra de guardado: al perder conexión o cambiar de página en móvil
window.addEventListener('pagehide', () => { save(); syncIndex(); });

// NUEVO v6.1 — guardar también inmediatamente después de CADA nextSlide() / cambio de slide,
// no solo esperar al intervalo de 20s (agregar save() al final de nextSlide() si no está ya):
// function nextSlide() { ... st.slide = ...; save(); render(); }  ← save() ya debe estar aquí, verificar SIEMPRE

// NUEVO v6.1 — nunca resetear st.slide a 0 al reabrir salvo que sea un estudiante NUEVO
// (es decir, salvo que localStorage.getItem(SKEY) sea null la primera vez)
function esEstudianteNuevo() {
  return localStorage.getItem(SKEY) === null;
}
```
**CHECKLIST DE VERIFICACIÓN MANUAL antes de entregar el código (recorrer siempre):**
```
[ ] load() se ejecuta ANTES que render() en el arranque de la página — sin excepción
[ ] st.slide NUNCA se fuerza a 0 en el arranque si ya existe una sesión guardada (SKEY)
[ ] Al recargar la página (F5) en cualquier slide intermedio, el estudiante reaparece en ESE mismo slide
[ ] Al cerrar la pestaña y volver a abrir el archivo, el progreso y el slide se restauran igual
[ ] save() se llama después de CADA cambio de slide, no solo cada 20 segundos
[ ] beforeunload, visibilitychange Y pagehide están los tres implementados
[ ] syncIndex() refleja el mismo slideActual que quedó guardado en SKEY
```

## 🔴 PRIORIDAD 8-C · ABSOLUTA — AISLAMIENTO DE DATOS POR ESTUDIANTE (BLINDAJE CONTRA CONTAMINACIÓN ENTRE USUARIOS)

### 🧍 REGLA DE ORO: UN ESTUDIANTE NUEVO SIEMPRE EMPIEZA EN CERO — NUNCA HEREDA DATOS DE OTRO
**Bug crítico detectado y corregido:** en salones con computadores compartidos (ej. Sala de Informática), varias clases guardaban TODO el progreso local (slide actual, XP, respuestas, medallas, nombre) bajo una clave de `localStorage` fija y **compartida por materia + semana**, sin incluir la identidad del estudiante:
```javascript
// ❌ PATRÓN INCORRECTO — NUNCA HACER ESTO (causa contaminación entre estudiantes):
const PFX = `${AUTOR_MATERIA_SIGLA}_s${AUTOR_SEMANA_NUM}`;   // ej: "tec4_s1" — IGUAL para TODOS los estudiantes
const SKEY = `${PFX}_session`;                                // "tec4_s1_session" — una sola clave global
```
Con este patrón, todos los estudiantes que usan el mismo computador leen y escriben la MISMA clave. Cuando un estudiante nuevo se registraba en el index y abría la clase, esta cargaba automáticamente el progreso, la nota y el avance de quien haya usado ese equipo antes — el estudiante nuevo aparecía con nota, medallas y slide adelantados que no le correspondían.
**REGLA OBLIGATORIA — la clave de sesión local SIEMPRE debe incluir el identificador único del estudiante que entrega el index, nunca solo materia+semana:**
```javascript
// ✅ PATRÓN CORRECTO — OBLIGATORIO en TODA clase generada:
// IDX_STUDENT_ID viene del sessionStorage/contexto que entrega el index al abrir la clase
// (el mismo id único con el que el index registra al estudiante, típicamente con sufijo de timestamp)
let claseCtx = null;
try {
  const raw = sessionStorage.getItem('clase_contexto');
  if (raw) claseCtx = JSON.parse(raw);
} catch(e) {}
const IDX_STUDENT_ID = claseCtx?.studentId || null;
// La clave de sesión SIEMPRE debe llevar el id del estudiante — nunca solo materia+semana
// (PREFIX/SKEY con este id ya los entrega la fórmula única de la Prioridad 8-K — no reconstruir aquí)
```
**PROHIBIDO ABSOLUTO — nunca usar estas fuentes para "adivinar" quién es el estudiante:**
```
❌ localStorage.getItem('studentName')  → clave GLOBAL compartida por todo el computador,
                                          muestra el nombre del ÚLTIMO estudiante que guardó algo ahí
❌ Cualquier clave de sesión que NO incluya el id único del estudiante entregado por el index
❌ Asumir "si hay datos guardados, son míos" sin verificar el id del estudiante actual
```
**REGLAS DE COMPORTAMIENTO OBLIGATORIAS:**
- **Estudiante NUEVO** (id nuevo, sin registro previo en `localStorage[SKEY]` para ESE id exacto) → la clase debe iniciar 100% en cero: `slide = 0`, `nota = 0.0`, `aciertos = 0`, sin medallas, sin XP, sin respuestas de nadie más.
- **Estudiante que regresa** (mismo id que ya tiene un registro en `localStorage[SKEY]`) → recupera exactamente SU propio avance, nunca el de otro estudiante que haya usado el mismo equipo.
- Si el estudiante no había avanzado nada, **no puede aparecer con nota ni con avance** — nunca se "hereda" progreso de otro usuario por compartir computador.
- La semana/slide actual que ve el estudiante debe estar siempre sincronizada con lo que el index reporta para ESE mismo id — nunca desfasada ni mezclada con datos de otro estudiante.
- El nombre mostrado en la clase (`st.name`) debe salir EXCLUSIVAMENTE del contexto de sesión que entrega el index al abrir la clase (`claseCtx`), nunca de una clave global adivinada.
#### IMPLEMENTACIÓN — `load()` y `save()`: código único en la **Prioridad 8-V** (valida identidad y sello antes de restaurar). `st.name` sale SOLO de `claseCtx`.
**CHECKLIST DE VERIFICACIÓN MANUAL — recorrer siempre antes de entregar el código:**
```
[ ] La clave de sesión (SKEY) incluye el id único del estudiante (IDX_STUDENT_ID), no solo materia+semana
[ ] load() valida que d.studentId === IDX_STUDENT_ID antes de restaurar cualquier dato guardado
[ ] Si el id no coincide o no hay registro previo, TODO arranca en cero (slide, nota, medallas, XP)
[ ] save() siempre guarda studentId junto con el resto del progreso
[ ] st.name NUNCA se toma de localStorage.getItem('studentName') ni de otra clave global compartida
[ ] Un estudiante nuevo registrado en el index NUNCA ve nota, medallas o avance de otro estudiante
[ ] Un estudiante que regresa (mismo id) recupera exactamente su propio progreso, nunca el de otro
[ ] La semana/slide que reporta la clase coincide siempre con lo que el index muestra para ese mismo id
```

## 🔴 PRIORIDAD 8-D · ABSOLUTA — RESTAURACIÓN CONFIABLE DE SLIDE CON VARIOS ESTUDIANTES REGISTRADOS

### 🧩 BUG DETECTADO: LA NOTA SE GUARDA BIEN, PERO EL SLIDE VUELVE A 0 CUANDO HAY 2+ ESTUDIANTES
**Diagnóstico de la causa raíz:** la Prioridad 8-C usa dos identidades DIFERENTES para dos cosas que deberían estar sincronizadas:
- La **nota/progreso que ve el index** (`syncIndex()`, Prioridad 8) se guardaba (en versiones antiguas) bajo `IDX_SC[st.name][SEM_ID]` — usaba el **nombre** del estudiante como llave, y por eso siempre funciona bien, sin importar cuántos estudiantes haya.
- La **posición exacta del slide** (`SKEY`, Prioridad 8-C) se guarda bajo una llave que incluye `IDX_STUDENT_ID` — un identificador que el index genera y entrega en `sessionStorage['clase_contexto']` cada vez que el estudiante abre la clase.
Cuando hay solo 1 estudiante registrado, ese id casi nunca cambia y todo funciona. Pero en cuanto hay **2 o más estudiantes registrados en el mismo index**, es fácil que el id que el index entrega en `clase_contexto` **no sea exactamente el mismo** en cada apertura (por ejemplo, si el index genera el id en el momento de dar clic en "Continuar" en vez de reutilizar siempre el mismo id ya asignado a ese estudiante desde su primer registro). Como `load()` (Prioridad 8-C) exige `d.studentId === IDX_STUDENT_ID` para restaurar el progreso, un id ligeramente distinto hace que el sistema trate al estudiante como "nuevo" — **la nota sigue viéndose bien en el index (porque esa parte usa el nombre), pero la clase reinicia el slide en 0 y vuelve a correr todos los cronómetros de lectura desde el principio.**
### ✅ REGLA DE ORO — LA IDENTIDAD DEBE SER LA MISMA PARA TODO: NOTA Y POSICIÓN DE SLIDE
**Solución obligatoria:** usar SIEMPRE la misma base de identidad — el **nombre normalizado del estudiante** (la misma que ya funciona de forma confiable para la nota) — tanto para `SKEY` (posición/progreso local) como para `INDEX_KEY` (nota/progreso del index; la antigua `IDX_SC` fue eliminada en v15.0). El `studentId` que entrega el index, si existe, se usa como complemento, NUNCA como único criterio de coincidencia.
```javascript
// Normalizar el nombre para usarlo como base de identidad estable
function normalizarNombre(nombre) {
  return (nombre || '')
    .trim()
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/\s+/g, '_');
}
// La clave de sesión ahora se basa en el nombre normalizado (estable),
// no solo en un studentId que puede variar entre aperturas
const NOMBRE_NORM = normalizarNombre(claseCtx?.studentName || st.name || '');
// (PREFIX/SKEY con este nombre normalizado ya los entrega la fórmula única de la Prioridad 8-K)
```
**CAPA DE AUTO-REPARACIÓN — recuperar sesiones que quedaron "huérfanas" por un id anterior distinto:**
```javascript
// Si por alguna razón existiera una sesión guardada bajo un studentId viejo
// distinto (de clases generadas antes de este fix), buscarla por nombre antes de rendirse
// y arrancar en cero. Esto NUNCA mezcla datos entre estudiantes distintos — solo reconecta
// al MISMO estudiante (mismo nombre normalizado) con su propio progreso anterior.
function buscarSesionHuerfanaPorNombre() {
  if (!NOMBRE_NORM) return null;
  try {
    const guardadas = JSON.parse(localStorage.getItem('clases_guardadas')||'[]');
    const candidata = guardadas.find(pfx =>
      pfx.startsWith(`${AUTOR_MATERIA_SIGLA}_s${AUTOR_SEMANA_NUM}_`) &&
      pfx.includes(NOMBRE_NORM)
    );
    if (!candidata) return null;
    const d = JSON.parse(localStorage.getItem(candidata + '_session') || 'null');
    return d;
  } catch(e) { return null; }
}
```
> **Nota:** el `load()` vigente es el de 8-V (con auto-reparación de sesiones huérfanas, `buscarSesionHuerfanaPorIdentidad`, adaptada al `PREFIX` de 8-K). Aquí solo permanecen la garantía y el checklist.
**GARANTÍA OBLIGATORIA:** con 2, 5, 20 o cualquier cantidad de estudiantes registrados en la misma clase, cada uno debe SIEMPRE reabrir exactamente en el slide donde quedó — nunca en el slide 1 — mientras su nombre coincida con el de su sesión anterior. La nota y la posición del slide deben estar permanentemente sincronizadas entre sí y con lo que el index reporta, sin importar cuántos estudiantes usen la clase simultáneamente o en distintos momentos.
**CHECKLIST DE VERIFICACIÓN MANUAL — recorrer siempre antes de entregar el código:**
```
[ ] SKEY se construye con el nombre normalizado del estudiante (normalizarNombre), no solo con un id volátil
[ ] load() intenta recuperar por nombre (buscarSesionHuerfanaPorNombre) antes de asumir "estudiante nuevo"
[ ] Al encontrar una sesión previa por nombre, se re-guarda de inmediato bajo la clave actual (auto-migración)
[ ] Probado con 3+ estudiantes registrados: cada uno reabre exactamente en su propio slide, nunca en el 1
[ ] La nota (INDEX_KEY) y el slide (SKEY) usan la MISMA base de identidad (nombre normalizado + grupo + semana)
[ ] Dos estudiantes con nombres distintos JAMÁS comparten ni mezclan su progreso, aunque usen el mismo equipo
```

## 🔴 PRIORIDAD 8-E · ABSOLUTA — IDENTIDAD REFORZADA CON GRUPO/SALÓN + ADVERTENCIA EN ACCESO DIRECTO

### 🏫 PROBLEMA A RESOLVER: 501, 502 Y OTROS GRUPOS COMPARTEN EL MISMO COMPUTADOR
La Prioridad 8-D ya resuelve la mezcla de progreso entre estudiantes DISTINTOS con nombres DISTINTOS. Pero en la práctica real de la Sala de Informática, el mismo computador lo usan estudiantes de **grupos diferentes** (501, 502, 503...) en distintas horas, y puede haber **coincidencia de nombres** entre grupos (dos estudiantes que se llaman igual en 501 y en 502). Además, algunos estudiantes **abren el archivo de la semana directamente** (por un enlace guardado, por WhatsApp, etc.) **sin pasar primero por el index** — en ese caso no existe `sessionStorage['clase_contexto']` y el sistema no sabe ni el nombre ni el grupo del estudiante.
### ✅ REGLA DE ORO — LA IDENTIDAD SE ARMA CON NOMBRE + GRUPO (SOLO SI VIENEN DEL INDEX)
```javascript
// Normalizar también el grupo/salón (igual que el nombre en Prioridad 8-D)
function normalizarGrupo(grupo) {
  return (grupo || '')
    .trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '');
}
// La identidad completa combina grupo + nombre normalizados
const GRUPO_NORM  = normalizarGrupo(claseCtx?.grupo || st.grupo || '');
// NOMBRE_NORM ya viene de la Prioridad 8-D
const IDENTIDAD_KEY = `${GRUPO_NORM || 'singrupo'}_${NOMBRE_NORM || 'pendiente'}`;
// La clave de sesión ahora incluye AMBOS — nunca solo el nombre a secas
// (PREFIX/SKEY con IDENTIDAD_KEY ya los entrega la fórmula única de la Prioridad 8-K — no reconstruir aquí)
// syncIndex() también debe anidar por grupo, para que el profe vea cada salón por separado:
// (v15.0: IDX_SC eliminada — el grupo ya viaja dentro del PREFIX/INDEX_KEY de 8-K/8-V)
```
### 🚨 MANEJO DE ACCESO DIRECTO — YA NO SE PIDE NOMBRE/GRUPO, SE ADVIERTE CLARO (v6.9 — corregido)
**Cambio de enfoque:** pedirle al estudiante que escriba su nombre y grupo manualmente cuando entra directo (sin index) es un riesgo — puede escribir su nombre distinto al del registro del index (con o sin apellido, con errores de tipeo, etc.), generando entradas duplicadas o desincronizadas. La solución más segura es **NO intentar reconstruir la identidad** y en su lugar **advertir con claridad, en rojo y grande, que esa sesión no se va a guardar ni a tener nota**, dejando que el estudiante decida si continúa así o va a buscar el index.
```javascript
// Detectar acceso directo: si falta el contexto del index, activar "modo sin guardar"
// NUNCA se pide nombre ni grupo por formulario — solo se advierte.
let st_modoSinGuardar = false;
function verificarAccesoDirecto() {
  if (claseCtx && claseCtx.studentName && claseCtx.grupo) {
    st_modoSinGuardar = false;
    return; // vino bien del index — todo normal, sin advertencias
  }
  st_modoSinGuardar = true; // acceso directo detectado
}
// Banner rojo, grande y persistente — se muestra en la zona del nombre/HUD
// mientras dure la sesión, y NUEVAMENTE en la pantalla final si el estudiante llega a terminar
function renderBannerSinGuardar() {
  if (!st_modoSinGuardar) return '';
  return `
    <div class="banner-sin-guardar">
      ⚠️ <strong>ESTA CLASE NO SE GUARDARÁ NI TENDRÁ NOTA</strong><br>
      Entraste sin pasar por el índice de tu materia. Si continúas así, tu avance
      <strong>se va a perder</strong> y tu profe no podrá verlo.<br>
      <span style="font-weight:900">Cierra esto y entra desde el índice para que sí cuente.</span>
    </div>
  `;
}
// Llamar renderBannerSinGuardar() e insertar su HTML SIEMPRE arriba del nombre/HUD del estudiante,
// en cada render(), mientras st_modoSinGuardar sea true — no solo en el intro
```
```css
.banner-sin-guardar {
  background: #ffe0e0;
  border: 3px solid #c0392b;
  color: #7a0000;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 12px;
  text-align: center;
  font-size: .85rem;
  line-height: 1.6;
  box-shadow: 0 3px 0 #a02020;
}
```
**En la pantalla final (`rFinal()`):** si `st_modoSinGuardar` es `true`, el mensaje rojo debe reaparecer ANTES o junto a la nota, dejando claro que esa nota que se ve en pantalla es solo una vista local y **no quedó registrada**:
```javascript
// Agregar al INICIO del HTML que devuelve rFinal() (Prioridad 11), antes de la nota:
// ${renderBannerSinGuardar()}
// más un texto adicional específico de cierre:
function renderAvisoFinalSinGuardar() {
  if (!st_modoSinGuardar) return '';
  return `
    <div class="banner-sin-guardar">
      ⚠️ <strong>ESTA CLASE NO SE ABRIÓ CORRECTAMENTE</strong><br>
      Como entraste sin pasar por el índice, tu nota <strong>no fue guardada</strong>.<br>
      Pídele a tu profe que te ayude a entrar desde el índice y vuelve a intentarlo.
    </div>
  `;
}
```
**Efecto en el guardado:** en modo sin guardar (`st_modoSinGuardar`) `syncIndex()` y toda escritura al índice se cortan ANTES de tocar `localStorage` (ver `syncIndex()` en 8-F).
**GARANTÍA OBLIGATORIA:** ningún estudiante que entre directo (sin index) puede terminar la clase pensando que su nota quedó guardada — el aviso rojo debe ser imposible de pasar por alto, tanto al empezar como al terminar, y el sistema JAMÁS debe escribir en el índice mientras la identidad no venga confirmada por el propio index.
**CHECKLIST DE VERIFICACIÓN MANUAL — recorrer siempre antes de entregar el código:**
```
[ ] SKEY combina grupo normalizado + nombre normalizado (IDENTIDAD_KEY) cuando SÍ viene del index
[ ] INDEX_KEY incluye el grupo (vía PREFIX, 8-K/8-V) para que el profe vea cada salón aparte
[ ] verificarAccesoDirecto() se ejecuta ANTES de load(), en cada arranque de la página
[ ] NUNCA se pide nombre ni grupo por formulario en acceso directo — solo se advierte en rojo
[ ] renderBannerSinGuardar() visible de forma persistente en toda la sesión si hubo acceso directo
[ ] renderAvisoFinalSinGuardar() aparece también en la pantalla final si hubo acceso directo
[ ] syncIndex() corta de inmediato (return) si st_modoSinGuardar es true — cero escritura al índice
[ ] Probado: mismo nombre en grupo 501 y en grupo 502 entrando SIEMPRE desde el index — progreso y nota nunca se mezclan
```

## 🔴 PRIORIDAD 8-F · ABSOLUTA — CONTRATO DE DATOS CON EL ÍNDICE (CLAVE ÚNICA POR ESTUDIANTE, A PRUEBA DE ERRORES)

### 🚨 HALLAZGO REAL DE PRODUCCIÓN — SE SIMPLIFICA EL CONTRATO EN ESTA VERSIÓN
Al auditar 4 índices reales ya en uso (Aritmética 4°, Aritmética 5°, Tecnología 4°, Tecnología 5°) se encontraron **3 arquitecturas de datos distintas** conviviendo. La versión anterior de esta prioridad usaba el patrón de "una clave compartida por semana+grupo, con un objeto anidado por estudiante dentro" — que exige que `syncIndex()` haga SIEMPRE "leer → fusionar solo mi entrada → escribir todo". Se confirmó que ese patrón, aunque correcto en teoría, es fácil de implementar mal: uno de los índices reales (Tecnología 5°) tiene exactamente ese diseño pero con el paso de "fusionar" roto — cada estudiante nuevo que termina una semana **borra** el progreso del anterior, porque el valor que se guarda es un objeto plano en vez de anidado.
**Por eso esta versión adopta el patrón MÁS SEGURO, ya probado sin fallas en 2 de los 4 índices reales (Aritmética 4° y Tecnología 4°): cada estudiante tiene su PROPIA clave de `localStorage`, única, con su nombre o id incluido en la clave misma.** Esto elimina por completo la posibilidad de que un estudiante pise a otro — no porque el código "fusione bien", sino porque estructuralmente nunca hay dos estudiantes escribiendo en el mismo lugar.
### 🔑 LA CLAVE EXACTA — UNA POR ESTUDIANTE, POR SEMANA, POR GRUPO
La clave exacta se deriva ÚNICAMENTE con la fórmula de **8-K**: `INDEX_KEY = PREFIX + '_' + NOMBRE_NORM + '_data'` (única por estudiante, semana y grupo). No se reconstruye aquí.
### 📦 ESTRUCTURA DEL OBJETO — PLANA, DE UN SOLO ESTUDIANTE (ya es seguro, porque la clave ya es única)
```javascript
// A diferencia de la v7.1, aquí SÍ es correcto un objeto plano — porque INDEX_KEY
// ya pertenece a un único estudiante, nunca se comparte con nadie más.
function construirEntradaEstudiante() {
  return {
    studentUser:      NOMBRE_NORM,           // 🔺 identidad — igual a la de la clave, nunca recalculada distinto
    studentName:      st.name,
    nota:             notaOficial(),                                  // (8-U): la MEJOR nota de todos los intentos, 0.0 a 5.0
    notaIntentoActual: calcTotal(),                                   // : nota del intento en curso (informativa)
    mejorIntento:     st.mejorIntento || 1,                           //
    intentos:         st.intentos || 1,                               //
    porcentajeAvance: Math.round((st.seen.size / SL.length) * 100),   // number, 0 a 100
    xp:               st.xp || 0,
    medallas:         st.badges || [],                               // array de strings (ids de badges)
    semaforo:         calcularSemaforoParticipacion(),                // 'verde' | 'amarillo' | 'rojo'
    ultimoAcceso:     new Date().toISOString(),
    vidasUsadas:      st.vidasUsadas || 0,
    semana:           CONFIG_CLASE.semana,                            // (8-V): sello — el index ignora la entrada si no coincide con la semana que muestra
    grupo:            GRUPO_NORM,                                     //
    claseId:          CLASE_ID,                                       //
    version:          1,                                              // (los campos nuevos son ADITIVOS: el index existente sigue leyendo igual)
  };
}
function calcularSemaforoParticipacion() {
  const pct = Math.round((st.seen.size / SL.length) * 100);
  const salidas = (st.salidas || []).length;
  if (pct === 0 || salidas > 20) return 'rojo';
  if (pct >= 70 && salidas <= 8) return 'verde';
  return 'amarillo';
}
```
### 🔒 syncIndex() — ESCRITURA DIRECTA, SIN NECESIDAD DE FUSIONAR NADA
> ⚠️ `INDEX_KEY` en el código de abajo es el que entrega la Prioridad 8-K (`PREFIX + '_' + NOMBRE_NORM + '_data'`), no `construirIndexKey()` — el resto de la lógica de `syncIndex()` (estructura del objeto, checklist, migración) sigue vigente tal cual.
```javascript
// 🔺🔺🔺 Como INDEX_KEY ya es única de este estudiante, syncIndex() puede escribir
// directamente, sin leer nada antes — no hay riesgo de pisar a otro estudiante,
// porque estructuralmente nadie más escribe jamás en esta misma clave.
function syncIndex() {
  if (st_modoSinGuardar) return;  // Prioridad 8-E — cero escritura sin identidad confiable
  if (!st.name || !NOMBRE_NORM) return;
  try {
    localStorage.setItem(INDEX_KEY, JSON.stringify(construirEntradaEstudiante()));
    // Registrar esta clave en el índice general de "clases guardadas", para que el
    // index.html pueda descubrir todas las claves existentes sin tener que adivinarlas
    const guardadas = JSON.parse(localStorage.getItem('clases_guardadas') || '[]');
    if (!guardadas.includes(INDEX_KEY)) {
      guardadas.push(INDEX_KEY);
      localStorage.setItem('clases_guardadas', JSON.stringify(guardadas));
    }
  } catch(e) { console.warn('Error al sincronizar con el índice:', e); }
}
```
### 🩹 MIGRACIÓN DE FORMATOS ANTIGUOS (nombre con/sin tildes, o formato de la v7.1)
```javascript
// Igual que en los índices reales ya corregidos (candidatosUsuario) — tolerar el
// nombre normalizado SIN tildes (oficial) pero seguir reconociendo el formato legacy
// (con tildes o con un formato de clave anterior), migrando en silencio.
function normalizarNombreLegacy(nombre) {
  return (nombre || '').trim().toLowerCase().replace(/\s+/g, '_');
}
function migrarFormatoAntiguoSiExiste() {
  if (!NOMBRE_NORM) return;
  const legacyUser = normalizarNombreLegacy(claseCtx?.studentName);
  if (legacyUser === NOMBRE_NORM) return; // no hay diferencia, nada que migrar
  const claveVieja = `${prefijoSemana(claseCtx?.area, claseCtx?.grado, GRUPO_NORM, claseCtx?.periodo, AUTOR_SEMANA_NUM)}_${legacyUser}_data`;
  const datosViejos = localStorage.getItem(claveVieja);
  if (datosViejos && !localStorage.getItem(INDEX_KEY)) {
    localStorage.setItem(INDEX_KEY, datosViejos); // migra el valor a la clave oficial
    localStorage.removeItem(claveVieja);           // limpia la clave vieja
  }
}
// Llamar migrarFormatoAntiguoSiExiste() UNA VEZ en el arranque, antes del primer syncIndex()
```
### ✅ VALIDACIÓN AL LEER (recomendación para el archivo index.html)
```javascript
function esEntradaValida(d) {
  if (!d || typeof d !== 'object') return false;
  if (typeof d.nota !== 'number' || d.nota < 0 || d.nota > 5) return false;
  if (typeof d.porcentajeAvance !== 'number' || d.porcentajeAvance < 0 || d.porcentajeAvance > 100) return false;
  if (!['verde','amarillo','rojo'].includes(d.semaforo)) return false;
  return true;
}
```
**CHECKLIST OBLIGATORIO — verificar SIEMPRE antes de entregar el código:**
```
[ ] 🔺 Se revisó el index.html REAL de la materia y construirIndexKey() copia EXACTAMENTE su patrón de clave
[ ] INDEX_KEY incluye SIEMPRE el nombre normalizado del estudiante en la clave misma — nunca es una clave compartida
[ ] syncIndex() escribe DIRECTAMENTE (localStorage.setItem), sin necesidad de leer/fusionar nada antes
[ ] SKEY (Prioridad 8-G) e INDEX_KEY (8-F) son claves DISTINTAS y con sufijos distintos ("_session" vs "_data")
[ ] 🔺🔺🔺 Ver Prioridad 8-J: TODAS las claves que syncIndex() escribe (INDEX_KEY y cualquier clave "personal"/"resumen" intermedia) se compararon una por una contra SKEY — ninguna coincide, ni por copiar/pegar ni por reusar la misma función que genera SKEY
[ ] Cada entrada tiene los campos del contrato: studentUser, studentName, nota (= notaOficial(), 8-U), porcentajeAvance, xp, medallas, semaforo, ultimoAcceso, vidasUsadas, version — más los campos aditivos v15.0: notaIntentoActual, mejorIntento, intentos, semana, grupo, claseId
[ ] migrarFormatoAntiguoSiExiste() se ejecuta una vez al arrancar, antes del primer syncIndex()
[ ] Probado con 2+ estudiantes del mismo grupo sincronizando la misma semana: cada uno tiene su propia clave, ninguno toca la del otro
```
### 🔄 SINCRONIZACIÓN EN VIVO DEL ÍNDICE (recomendación fuera del alcance de esta clase — aplica al archivo index.html)
```javascript
// Agregar esto en index.html, no en la clase — escucha cambios de localStorage y refresca el dashboard
window.addEventListener('storage', e => { if (sesionActiva) cargarDashboard(); });
document.addEventListener('visibilitychange', () => { if (!document.hidden && sesionActiva) cargarDashboard(); });
window.addEventListener('focus', () => { if (sesionActiva) cargarDashboard(); });
```
### 🛡️ SEGURIDAD E INTEGRIDAD ADICIONAL (recomendaciones para el archivo index.html)
Ver el **Prompt Maestro para index.html** (documento dedicado, compatible con este contrato), que desarrolla en detalle: rate-limit del PIN docente, backup automático con recordatorio, y versión de esquema para migraciones futuras.


## 🔺 PRIORIDAD 8-G · MÁXIMA — FUENTE ÚNICA DE VERDAD: IDENTIDAD DE SESIÓN Y RESTAURACIÓN EXACTA DEL AVANCE

### 🚨 ESTA ES LA PRIORIDAD MÁS IMPORTANTE DE TODO EL DOCUMENTO — TRIPLE PRIORIDAD
**Bug real detectado en producción:** varias clases muestran la nota correctamente sincronizada en el index, pero al volver a entrar el estudiante reinicia en el slide 1, con `st.seen` vacío, perdiendo todo el avance visual (aunque la nota sobreviva). **Causa raíz encontrada:** el documento fue acumulando, a través de las Prioridades 8, 8-B, 8-C, 8-D y 8-E, **varias declaraciones distintas y sucesivas** de `PREFIX`, `SKEY`, `load()` y `save()` — cada una pensada para resolver un problema puntual, pero sin anular formalmente a la anterior. Esto provoca que la función de auto-reparación (que busca una sesión guardada previamente) quede buscando un **formato de clave viejo** que ya no coincide con el formato nuevo, así que nunca la encuentra — y el sistema, al no encontrar coincidencia, trata al estudiante como si fuera nuevo: `st.slide = 0`, `st.seen = new Set()`. La nota sobrevive porque vive en una clave completamente aparte (Prioridad 8-F), por eso el síntoma es exactamente "la nota sí, el avance no".
### ⚖️ REGLA ABSOLUTA E INAPELABLE
**Esta sección 8-G es la ÚNICA fuente de verdad para identidad de sesión, `load()`, `save()` y `markSeen()`.** Anula y reemplaza CUALQUIER declaración de estas mismas funciones que aparezca en las Prioridades 8, 8-B, 8-C, 8-D u 8-E de este documento. Esas secciones siguen siendo válidas para todo lo demás que explican (autoguardado en capas, aislamiento conceptual, contrato con el índice, etc.), pero en cuanto a **el código exacto de `load()`/`save()`, SOLO se implementa el de la Prioridad 8-V (v15.0, que reemplaza el de esta sección) — nunca ambas versiones a la vez, nunca una mezcla de las dos.**
> **Claves:** `PREFIX` y `SKEY` se definen ÚNICAMENTE con la fórmula de **8-K** (y en el bloque de arranque de 8-V): `SKEY = \`${PREFIX}_${NOMBRE_NORM||'sinregistro'}_session\``. `load()`/`save()` son los de 8-V.
```
❌ PROHIBIDO ABSOLUTO: que el archivo HTML final tenga más de UNA declaración de "const PREFIX",
   más de UNA de "const SKEY", más de UNA "function load()" o más de UNA "function save()".
   Si al redactar el código aparecen dos versiones (una de una prioridad anterior y otra de esta
   Prioridad 8-G), se BORRA la anterior por completo y se deja SOLO el código de esta sección.
```
### 🔑 IMPLEMENTACIÓN ÚNICA Y DEFINITIVA — COPIAR EXACTAMENTE ASÍ, SIN VARIANTES
```javascript
// ═══ 1) Contexto de origen — index o acceso directo (Prioridad 8-E) ═══
let claseCtx = null;
try {
  const raw = sessionStorage.getItem('clase_contexto');
  if (raw) claseCtx = JSON.parse(raw);
} catch(e) { claseCtx = null; }

// ═══ 2) Modo sin guardar — SOLO advierte (Prioridad 8-E), nunca pide datos por formulario ═══
let st_modoSinGuardar = !(claseCtx && claseCtx.studentName && claseCtx.grupo);

// ═══ 3) Normalización — FUNCIÓN ÚNICA, reutilizada para nombre Y grupo, nunca reimplementada distinto ═══
function normalizarTexto(txt) {
  return (txt || '')
    .trim()
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/\s+/g, '_');
}
const NOMBRE_NORM = normalizarTexto(claseCtx?.studentName);
const GRUPO_NORM  = normalizarTexto(claseCtx?.grupo).replace(/_/g, ''); // ej: "501"

// ═══ 4) Identidad y clave de sesión — ÚNICA Y DEFINITIVA EN TODO EL ARCHIVO ═══
const IDENTIDAD_KEY = st_modoSinGuardar
  ? 'sinregistro_temporal'
  : `${GRUPO_NORM}_${NOMBRE_NORM}`;
// PREFIX/SKEY: NO se declaran aquí — la única fórmula válida es la de la Prioridad 8-K
// (PREFIX = claseCtx?.storagePrefix || prefijoRespaldo(); SKEY = `${PREFIX}_${NOMBRE_NORM||'sinregistro'}_session`).
// Se conserva IDENTIDAD_KEY porque buscarSesionHuerfanaPorIdentidad() (abajo) la sigue usando
// para reconocer formatos de clave antiguos al migrar sesiones guardadas antes de este fix.

// ═══ 5, 6 y 7) Auto-reparación, load() y save() — se implementan ÚNICAMENTE en el BLOQUE ÚNICO DE ARRANQUE
// de la Prioridad 8-V (secciones G, I y J de ese bloque), que añade el SELLO de semana/curso/grupo/estudiante,
// la mejor nota (8-U) y el modo sin guardar efímero. Implementar ÚNICAMENTE load()/save() de 8-V. ═══

// ═══ 8) markSeen() — DEBE guardar EN EL INSTANTE, no esperar al cambio de slide ═══
function markSeen() {
  if (!st.seen.has(st.slide)) {
    st.seen.add(st.slide);
    save(); // 🔺🔺🔺 CRÍTICO: si el estudiante cierra la pestaña a mitad de esta slide
             // (sin llegar a pulsar "Siguiente"), la marca de "vista" ya quedó guardada
  }
}

// ═══ 9) ORDEN DE ARRANQUE — el ÚNICO punto de entrada de la app, sin excepción ═══
document.addEventListener('DOMContentLoaded', function() {
  load();                    // 1️⃣ SIEMPRE primero — restaura slide, seen y todo lo demás
  render();                   // 2️⃣ SIEMPRE después — pinta ya en el slide restaurado
  setupModoFoco();
  actualizarBadgesCuadernos();
  updateVidasBtn();
  if (window.__avisoCtx) showToast(window.__avisoCtx);   // (8-V): contexto de otra semana descartado
  // ❌ PROHIBIDO: st.slide = 0 en este bloque, bajo cualquier circunstancia
  // ❌ PROHIBIDO: llamar render() antes que load()
  // ❌ PROHIBIDO: declarar una segunda vez PREFIX, SKEY, load() o save() en cualquier otra parte del archivo
});
```
### 🧪 PRUEBA OBLIGATORIA — SIMULAR MENTALMENTE ANTES DE ENTREGAR EL CÓDIGO
```
PASO 1: Estudiante entra desde el index, avanza hasta el slide 5, lee esa slide completa
        (el cronómetro de 12s termina, markSeen() se ejecuta y llama a save()).
PASO 2: Estudiante cierra la pestaña SIN hacer clic en "Siguiente" (o recarga con F5).
PASO 3: Estudiante vuelve a entrar (desde el index, o reabriendo el mismo archivo).
RESULTADO ESPERADO — OBLIGATORIO:
  ✅ st.slide debe ser 5 (no 0, no 1)
  ✅ st.seen debe incluir los índices 0,1,2,3,4,5 (todas las slides ya vistas)
  ✅ El cronómetro de la slide 5 NO debe volver a correr (st.acts['leido_'+id] ya estaba en true)
  ✅ La nota mostrada en el index debe coincidir exactamente con el porcentaje de avance real
Si cualquiera de estos puntos falla, el código tiene un error en PREFIX/SKEY/load()/save()
y debe corregirse ANTES de entregar — esta prueba es innegociable.
```
### 📋 CHECKLIST DE VERIFICACIÓN MANUAL — TRIPLE PRIORIDAD, REVISAR SIEMPRE
```
[ ] Existe UNA SOLA declaración de "const PREFIX" en todo el archivo HTML generado
[ ] Existe UNA SOLA declaración de "const SKEY" en todo el archivo HTML generado
[ ] Existe UNA SOLA "function load()" en todo el archivo HTML generado
[ ] Existe UNA SOLA "function save()" en todo el archivo HTML generado
[ ] Ninguna otra prioridad (8, 8-B, 8-C, 8-D, 8-E) dejó una segunda copia de estas declaraciones —
    si el borrador tenía otra versión, fue ELIMINADA y solo queda la de esta Prioridad 8-G
[ ] markSeen() llama a save() inmediatamente, no espera al cambio de slide
[ ] buscarSesionHuerfanaPorIdentidad() usa el MISMO NOMBRE_NORM que se usa para construir PREFIX
[ ] load() se ejecuta ANTES que render() en el único bloque DOMContentLoaded del archivo
[ ] Simulado el escenario de la PRUEBA OBLIGATORIA de arriba, con resultado ✅ en los 4 puntos
[ ] st.slide y st.seen sobreviven a: recarga (F5), cierre y reapertura de pestaña, y regreso desde el index
[ ] 🔺🔺🔺 Ver Prioridad 8-J: SKEY se comparó, línea por línea, contra cada `localStorage.setItem(...)` que aparece dentro de syncIndex() — SKEY no aparece ahí bajo ningún alias ni variable renombrada
```


## 🔴 PRIORIDAD 8-H · ABSOLUTA — BLINDAJE ANTI-TRAMPA DE NOTA: EL BOTÓN "ATRÁS" NUNCA PERMITE REPETIR NI INFLAR UN QUIZ

### 🚨 BUG CRÍTICO DE PRODUCCIÓN CONFIRMADO: LA NOTA SUBE CADA VEZ QUE SE VUELVE A UN QUIZ
**Diagnóstico exacto:** el botón "Atrás" mueve `st.slide` hacia un índice anterior sin pasar por ninguna validación. Cuando ese índice anterior es un slide `quiz`/`evalFinal` ya completado, si `rQuiz(s)` no verifica PRIMERO que ya está completo, el quiz aparece en blanco otra vez — permitiendo responder de nuevo. Como `responderQuiz()` suma a `st.aciertos` sin verificar si esa pregunta específica ya había sido contada, **la nota se infla cada vez que el estudiante repite el ciclo atrás → adelante → responder de nuevo**. Esto es exactamente el reporte real: "conteste un quiz y llevo 2.0 de nota, me devuelvo, está vacío de nuevo, contesto bien y ahora me sube la nota".
### ⚖️ REGLA ABSOLUTA E INAPELABLE
Un quiz/evalFinal con `st.acts['completado_'+id] === true` **NUNCA**, bajo ninguna ruta de navegación (Atrás, Adelante, recarga, menú de ruta, lo que sea), vuelve a mostrar preguntas — solo `renderResumenQuiz()`. Y **cada pregunta individual, una vez respondida, suma su acierto UNA SOLA VEZ para siempre**, con una marca a prueba de reintentos accidentales.

>  **v12.0 — Nueva Guardia 4:** `q_contada_<id>_<n>` **también** debe borrarse siempre que se borre `completado_<id>`/`quiz_idx_<id>`/`quiz_resps_<id>` (reintento, panel docente). Ver la función única `resetearEstadoQuiz()` en 8-P — no crear una versión propia de reseteo en ningún otro lugar del código.

```javascript
// ═══ 1) BOTÓN "ATRÁS" — v12.0: prevSlide() tiene UNA SOLA definición, en la Prioridad 8-O ═══
// Ya cumple esta regla de fábrica: NO resetea quiz_idx_, completado_, seen ni ninguna marca de actividad.
// HTML: <button id="btn-back" class="nav-btn" onclick="prevSlide()">← Atrás</button>

// ═══ 2) rQuiz() — v12.0: UNA SOLA definición, en la Prioridad 8-P ═══
// Ya cumple esta guardia como primera línea funcional: `if (st.acts['completado_'+s.id] === true) return renderResumenQuiz(s);`
// y retoma en `st.acts['quiz_idx_'+s.id] || 0` — nunca desde la pregunta 1.

// ═══ 3) responderQuiz() — CADA PREGUNTA SUMA SU ACIERTO UNA SOLA VEZ, con marca anti-duplicado ═══
// 🔺 Esta marca anti-duplicado sigue vigente, pero por sí sola NO alcanza contra clic rápido repetido
// sobre el MISMO botón antes de que el modal aparezca — ver Prioridad 8-M para el blindaje completo
// (guardia de índice + deshabilitar botones al instante + ignorar clics duplicados en silencio).
// ═══ 3) responderQuiz() — v12.0: UNA SOLA VERSIÓN, en la Prioridad 8-P ═══
// El código que estaba aquí (marca q_contada_ + avance del índice dentro del callback de un modal) se ELIMINÓ:
// dejaba la pregunta muerta si el estudiante recargaba antes de pulsar "Continuar". La regla de esta prioridad
// sigue igual —cada pregunta suma su acierto UNA sola vez, para siempre— y la cumple 8-P con la marca
// q_contada_ + el índice que avanza EN el clic + st.aciertos derivado siempre de quiz_resps_.

// ═══ 4) VERIFICACIÓN GLOBAL DE INTEGRIDAD ═══
// st.aciertos NUNCA es un contador libre — SIEMPRE se deriva de quiz_resps_. recalcularAciertosDesdeContadores()
// tiene UNA SOLA definición, en la Prioridad 8-P (la llaman responderQuiz() y calcTotal()/8-M en cada cálculo).
```
### 🧪 PRUEBA OBLIGATORIA — SIMULAR ANTES DE ENTREGAR
```
PASO 1: Estudiante responde Quiz 1 completo, nota queda en 2.0
PASO 2: Estudiante pulsa "Atrás" varias veces hasta llegar de nuevo al slide del Quiz 1
PASO 3: Estudiante pulsa "Siguiente" para volver a avanzar sobre ese mismo slide
RESULTADO ESPERADO — OBLIGATORIO:
  ✅ El slide del Quiz 1 muestra el RESUMEN (renderResumenQuiz), nunca preguntas en blanco
  ✅ No existe ningún botón para "responder de nuevo" una pregunta ya contada
  ✅ La nota sigue siendo exactamente 2.0 — no sube ni baja por navegar atrás/adelante
  ✅ Solo usar una vida (pedirReintento → confirmarReintento) puede volver a habilitar ese quiz
Si algún punto falla, hay un bug de navegación y debe corregirse antes de entregar — prueba innegociable.
```
**Checklist:**
```
[ ] prevSlide() existe como función única y NUNCA resetea acts/completado_/quiz_idx_
[ ] rQuiz() tiene la guardia "if (completado_+id) return renderResumenQuiz(s)" como PRIMERA línea funcional
[ ] responderQuiz() usa una marca única por pregunta (q_contada_+sId+pregIdx) y nunca vuelve a sumar esa pregunta
[ ] recalcularAciertosDesdeContadores() deriva st.aciertos SIEMPRE desde quiz_resps_, nunca de un contador suelto
[ ] Probada la navegación Atrás→Adelante sobre un quiz ya completo: la nota nunca cambia
[ ] Ningún botón, evento o slide permite "reabrir" preguntas de un quiz completado fuera del flujo de vidas (Prioridad 6)
```

## 🔴 PRIORIDAD 8-I · ABSOLUTA — TODAS LAS ACTIVIDADES SON PERMANENTES: NUNCA SE VACÍAN AL IR Y VENIR

### 🚨 REGLA DE ORO: LO YA HECHO, HECHO QUEDA — SIEMPRE, EN TODA ACTIVIDAD
Sopa de letras, drag, match, fill, tf, orden, explorador: **una vez que una actividad quedó marcada como completada, esa marca es DEFINITIVA para todo el intento actual.** Recargar la página, pulsar "Atrás", pulsar "Siguiente" varias veces, o cerrar y reabrir la pestaña **JAMÁS** debe borrar el estado guardado de ninguna actividad. Solo `confirmarReintento()` (Prioridad 6), que consume una vida, puede tocar los QUIZZES — ninguna otra actividad se resetea nunca, ni siquiera con una vida.
```javascript
// 🔺 GUARDIA UNIVERSAL — agregar al inicio de CADA función de render de actividad
// complementaria (rDrag, rMatch, rFill, rTF, rOrden, rInteractive):
function rDrag(s) {
  markSeen();
  if (st.acts['drag_done_'+s.id]) return renderResumenActividad(s, 'drag'); // 🔺 si ya se hizo, SOLO resumen — nunca en blanco de nuevo
  // ...resto de la función sin cambios...
}
// Aplicar el MISMO patrón (if ya_done → renderResumenActividad) en rMatch, rFill, rTF, rOrden, rInteractive.
// La sopa de letras (rWS) ya tiene su propia restauración (restaurarProgresoWS, Prioridad 0-D) —
// verificar que se llame SIEMPRE en cada render, no solo la primera vez que se abre.

// 🔺 Función genérica de "resumen" para actividades complementarias ya completadas —
// muestra lo que el estudiante ya hizo, sin poder rehacerla:
function renderResumenActividad(s, tipoLabel) {
  return `
    <div class="slide-title">${s.title}</div>
    <div style="background:#e8fff0;border:2px solid var(--success);border-radius:12px;padding:12px;margin-bottom:10px">
      <p style="font-family:var(--font-ui);color:var(--success);font-size:.85rem">
        ✅ Ya completaste esta actividad — tu avance quedó guardado
      </p>
    </div>
  `;
}
```
**Checklist:**
```
[ ] rDrag, rMatch, rFill, rTF, rOrden, rInteractive tienen la guardia "if (*_done_+id) return resumen" como primera línea
[ ] rWS (sopa de letras) llama restaurarProgresoWS(s.id) en CADA render, no solo la primera vez que se abre
[ ] Ninguna actividad complementaria se vacía al: recargar, pulsar Atrás, pulsar Siguiente repetidamente, cerrar/reabrir pestaña
[ ] Solo el flujo explícito de vidas (Prioridad 6) puede resetear QUIZZES — ninguna otra actividad se resetea nunca, ni siquiera con vidas
```


## 🔺 PRIORIDAD 8-J · MÁXIMA — LA SINCRONIZACIÓN CON EL ÍNDICE (8-F) NUNCA PUEDE ESCRIBIR SOBRE LA CLAVE DE SESIÓN (8-G) — CERO COLISIONES DE CLAVE

### 🚨 ESTA PRIORIDAD ANULA CUALQUIER IMPLEMENTACIÓN DE syncIndex() QUE NO LA CUMPLA LETRA POR LETRA — TRIPLE PRIORIDAD
**Bug real confirmado en producción (Tecnología 5°, Semana 1):** el estudiante contestaba el Quiz 1, veía su nota reflejada correctamente en el índice, salía de la clase y volvía a entrar — y la clase arrancaba otra vez en la slide 1, con el Quiz 1 en blanco, pidiéndole responder de nuevo. Al responder de nuevo, su nota quedaba duplicada.
**Causa raíz encontrada (código real, verificado línea por línea):** dentro de `syncIndex()` (Prioridad 8-F), la variable usada para guardar el "resumen personal" del estudiante (nota, aciertos, porcentaje — para uso del índice/panel docente) apuntaba **exactamente a la misma clave de `localStorage` que `SKEY`** (Prioridad 8-G), la clave que `save()`/`load()` usan para guardar el progreso COMPLETO de la sesión (`slide`, `seen`, `quizActs`, `acts`, `badges`...). Esto ocurrió porque esa variable se definió como `const KEY_PERSONAL = skey();` — reusando literalmente la función que genera `SKEY`, en vez de generar una clave propia y distinta.
La secuencia exacta del desastre, cada vez que se llamaba `save()`:
```
1) save()       → localStorage.setItem(SKEY, {slide, seen, quizActs, acts, badges, ...})   ✅ correcto
2) save()       → llama a syncIndex()
3) syncIndex()  → localStorage.setItem(KEY_PERSONAL, {nota, aciertos, porcentaje, ...})     ❌ KEY_PERSONAL === SKEY
                  → esto SOBREESCRIBE el objeto completo del paso 1 con un objeto que NO
                    tiene slide, ni seen, ni quizActs, ni acts, ni badges.
```
La siguiente vez que `load()` leía `SKEY`, encontraba el objeto-resumen (sin `slide`/`seen`/`quizActs`) en vez del objeto de sesión real. Por eso: `st.slide` volvía a `0`, `st.quizActs` quedaba vacío (el quiz se veía "no hecho" y se repetía), y `st.aciertos` sí sobrevivía (porque el resumen sí lo traía) — así que al repetir el quiz, `responderQuiz()` sumaba encima de un `aciertos` que ya no era cero, **duplicando la nota**.
### ⚖️ REGLA ABSOLUTA E INAPELABLE
**Ninguna línea de código dentro (o llamada desde) `syncIndex()`, ni de ninguna otra función de sincronización con el índice, puede ejecutar `localStorage.setItem(X, ...)` donde `X` sea igual a `SKEY`.** Esto aplica sin excepción a CUALQUIER clave que la función escriba: `INDEX_KEY`, un resumen "personal", un caché "anti-retroceso de nota", un log, lo que sea. Cada una de esas claves debe ser una función de generación de clave DISTINTA de la que genera `SKEY`, no un alias, no una copia por valor de la misma cadena, y jamás el resultado de llamar a la misma función (`skey()`/`SKEY`) sin transformarla.
```
❌ PROHIBIDO ABSOLUTO:              const KEY_PERSONAL = skey();              // idéntica a SKEY
❌ PROHIBIDO ABSOLUTO:              const KEY_PERSONAL = SKEY;                // idéntica a SKEY
❌ PROHIBIDO ABSOLUTO:              localStorage.setItem(SKEY, resumenPayload) // en cualquier función que no sea save()
✅ OBLIGATORIO:                     const KEY_PERSONAL = skey() + '_resumen'; // sufijo propio, nunca igual a SKEY
✅ TAMBIÉN VÁLIDO:                  const KEY_PERSONAL = PREFIX + '_resumen'; // usa el prefijo, nunca el SKEY completo
```
### 🔑 PATRÓN OBLIGATORIO — TODAS LAS CLAVES DE localStorage DE ESTE ARCHIVO, DECLARADAS JUNTAS Y CON SUFIJOS ÚNICOS
Para que sea imposible repetir este bug, **todas las claves de `localStorage` que use el archivo se declaran en un solo bloque, con sufijos que no se repiten entre sí**, nunca dispersas ni reconstruidas de formas distintas en cada función:
```javascript
// ═══ BLOQUE ÚNICO DE CLAVES — SKEY e INDEX_KEY se declaran SOLO en 8-K; aquí solo se añade KEY_RESUMEN y la guardia ═══
// 8-K:  SKEY      = `${PREFIX}_${NOMBRE_NORM || 'sinregistro'}_session`
// 8-K:  INDEX_KEY = `${PREFIX}_${NOMBRE_NORM || 'sinregistro'}_data`
const KEY_RESUMEN = `${PREFIX}_${NOMBRE_NORM || 'sinregistro'}_resumen`; // resumen personal para el panel docente / anti-retroceso de nota

// 🔺 GUARDIA DE ARRANQUE — se deja en el código entregado: si dos claves llegaran a coincidir, se ve en consola
// en vez de perder el progreso en silencio.
console.assert(SKEY !== KEY_RESUMEN, '🚨 COLISIÓN DE CLAVES: SKEY === KEY_RESUMEN — syncIndex() va a borrar el progreso de sesión');
console.assert(SKEY !== INDEX_KEY,   '🚨 COLISIÓN DE CLAVES: SKEY === INDEX_KEY — syncIndex() va a borrar el progreso de sesión');
console.assert(KEY_RESUMEN !== INDEX_KEY, '🚨 COLISIÓN DE CLAVES: KEY_RESUMEN === INDEX_KEY');
```
`save()` (Prioridad 8-G) es la ÚNICA función de todo el archivo que puede hacer `localStorage.setItem(SKEY, ...)`. Ninguna otra función — ni `syncIndex()`, ni el panel docente, ni ningún atajo de guardado manual — escribe jamás en `SKEY`.
### 🧪 PRUEBA OBLIGATORIA — SIMULAR MENTALMENTE ANTES DE ENTREGAR EL CÓDIGO (además de la prueba de la Prioridad 8-G)
```
PASO 1: Estudiante entra desde el index, completa el Quiz 1 por completo (todas sus preguntas).
PASO 2: Inmediatamente después de la última pregunta, save() se ejecuta y (dentro de save())
        syncIndex() también se ejecuta — revisar en el código exactamente qué claves toca.
PASO 3: Leer manualmente localStorage[SKEY] en ese instante (simulado).
RESULTADO ESPERADO — OBLIGATORIO:
  ✅ localStorage[SKEY] TODAVÍA contiene slide, seen y quizActs con el Quiz 1 marcado "completado: true"
  ✅ localStorage[SKEY] NO fue sobreescrito por el payload de syncIndex() en ningún momento
PASO 4: Estudiante cierra la pestaña y vuelve a abrir la clase (misma identidad).
RESULTADO ESPERADO — OBLIGATORIO:
  ✅ st.slide se restaura exactamente donde quedó (no vuelve a 0 ni a 1)
  ✅ Quiz 1 se muestra con renderResumenQuiz() (ya completado) — JAMÁS vuelve a mostrar preguntas en blanco
  ✅ st.aciertos es el mismo valor de antes de cerrar — nunca se duplica al volver a entrar
Si cualquiera de estos puntos falla, hay una colisión de claves entre syncIndex() y SKEY —
localizarla comparando, una por una, cada localStorage.setItem() del archivo contra el valor de SKEY.
```
### 📋 CHECKLIST DE VERIFICACIÓN MANUAL — TRIPLE PRIORIDAD, REVISAR SIEMPRE
```
[ ] Existe un ÚNICO bloque de declaración de claves (SKEY, KEY_RESUMEN, KEY_INDEX, y cualquier otra) — nada se reconstruye distinto en otra función
[ ] Los tres console.assert() de colisión de claves están presentes en el código entregado
[ ] Se buscó en TODO el archivo cada aparición de "localStorage.setItem(" y se verificó, una por una, que ninguna clave coincide con SKEY salvo la de save()
[ ] syncIndex() no contiene ninguna variable llamada "KEY_PERSONAL", "KEY_PROGRESO" ni similar que sea igual a skey()/SKEY — si el borrador la tenía, se le dio un sufijo propio distinto
[ ] Simulada la PRUEBA OBLIGATORIA de arriba con resultado ✅ en los 4 puntos
[ ] Ningún dato de "solo lectura para el panel docente" (nota, porcentaje, semáforo) vive jamás en la misma clave que el progreso real de la sesión
```


## 🔺 PRIORIDAD 8-K · MÁXIMA — SINCRONIZACIÓN DE CLAVES Y DE NOMBRE DE ARCHIVO CON EL INDEX

### 🚨 ESTA PRIORIDAD ANULA LA FÓRMULA DE `PREFIX`/`SKEY`/`INDEX_KEY` DE LAS PRIORIDADES 8-F Y 8-G — TRIPLE PRIORIDAD
**Bug real de sincronización (distinto del bug de colisión que resuelve 8-J):** aunque `SKEY` e `INDEX_KEY` no choquen entre sí (8-J), las Prioridades 8-F y 8-G construían el `PREFIX` del curso **cada una con su propia fórmula local** (`AUTOR_MATERIA_SIGLA`/`AUTOR_SEMANA_NUM`/`IDENTIDAD_KEY` en 8-G; `prefijoCurso()/prefijoSemana()` reimplementadas en 8-F). El `index.html` de ese mismo curso, en su Prioridad 5 (Contrato Universal de Lectura), ya calcula y **entrega** ese prefijo en `sessionStorage['clase_contexto'].storagePrefix` — pero nada obligaba a la clase a usar ese valor en vez de recalcularlo. Si la clase reconstruye el prefijo por su cuenta y se equivoca en un solo carácter (un guion, el orden de grado/período, una sigla distinta a la del index), el resultado es el síntoma exacto que reporta el docente: **la nota y el avance existen en el navegador del estudiante, pero el index nunca los encuentra.** A esto se suma un segundo problema, independiente del storage: si el **nombre del archivo HTML** de la clase no coincide, letra por letra, con el que el index tiene escrito en `INDEX_SEMANAS_META[n].archivo`, el botón de esa semana en el index simplemente no abre el archivo correcto.
### ⚖️ REGLA ABSOLUTA E INAPELABLE
**El `PREFIX` de esta clase NUNCA se reconstruye "a ojo" — se recibe del index (salvo que el contexto sea de otra semana: Prioridad 8-V).** Esta es la ÚNICA declaración válida de `PREFIX`, `SKEY` e `INDEX_KEY` de todo el documento; anula cualquier fórmula de estas mismas variables que aparezca en 8-F u 8-G.
```javascript
// ═══ ÚNICA declaración válida de PREFIX/SKEY/INDEX_KEY — anula 8-F y 8-G en este punto ═══

// 1) Contexto de origen (sin cambios respecto a 8-G)
let claseCtx = null;
try {
  const raw = sessionStorage.getItem('clase_contexto');
  if (raw) claseCtx = JSON.parse(raw);
} catch(e) { claseCtx = null; }
let st_modoSinGuardar = !(claseCtx && claseCtx.studentName && claseCtx.grupo);

// 2) Normalización — `normalizarTexto()` se declara UNA sola vez (8-G, paso 3); aquí se reutiliza y debe ser idéntica a `normalizarNombre()` del index.
const NOMBRE_NORM = normalizarTexto(claseCtx?.studentName);

// 3) y 4)  v15.0 — CONFIG_CLASE (valores LITERALES de la Prioridad 0 de esta sesión, nunca de un ejemplo), CLASE_ID, GRUPO_NORM,
// CTX_VALIDO, prefijoRespaldo() y PREFIX se declaran UNA SOLA VEZ, en el BLOQUE ÚNICO DE ARRANQUE de la Prioridad 8-V
// (secciones B, C y D). NO se repiten aquí. Regla de PREFIX: el del index SOLO si es de ESTA semana; si no, el respaldo
// `${area}_${grado}_${grupo||'sinregistro'}_p${periodo}_s${semana}` (misma fórmula de prefijoSemana() del index).
// ⚠️ El bloque de 8-V debe ir ANTES del paso 5 de abajo (SKEY/INDEX_KEY usan PREFIX).

// 5) Claves derivadas — sufijos fijos, nunca renombrados, nunca coincidentes entre sí (ver 8-J)
const SKEY      = `${PREFIX}_${NOMBRE_NORM || 'sinregistro'}_session`;
const INDEX_KEY = `${PREFIX}_${NOMBRE_NORM || 'sinregistro'}_data`;
console.assert(SKEY !== INDEX_KEY, '🚨 COLISIÓN: SKEY === INDEX_KEY — revisar sufijos');

// 6)  v15.0 — Autoverificación semana-index: YA NO solo avisa. Si claseCtx.semana ≠ CONFIG_CLASE.semana (o el
// storagePrefix no termina en _s{semana}) el contexto se DESCARTA (CTX_VALIDO=false) y la clase arranca en cero,
// avisando con showToast(window.__avisoCtx) al arrancar. Ver 8-V (secciones C y D). `mostrarToast` NO existe: es showToast.
```
`markSeen()` y el orden de arranque siguen siendo EXACTAMENTE los de la Prioridad 8-G. `load()` y `save()` son los de la Prioridad 8-V (con sello y mejor nota). Lo que cambia respecto de la 8-K original es de dónde sale `PREFIX` (solo del index si es de esta semana — 8-V).

### 🔒 CANDADO DE NOMBRE DE ARCHIVO — obligatorio, se verifica ANTES de entregar el archivo
El nombre con el que se guarda/entrega el HTML de esta clase **es copia carácter por carácter** del campo `.archivo` de la línea de `INDEX_SEMANAS_META` recogida en la Prioridad 0 — nunca un nombre "parecido" ni inventado. Patrón fijo cuando la semana es nueva: `semana{N}_{area}{grado}p{periodo}.html` (ej. `semana4_mat5p3.html`). Si la semana es nueva, la clase se entrega **junto con** la línea exacta que hay que agregar a `INDEX_SEMANAS_META` del index — nunca se entrega una sola de las dos partes.

### 🔗 Sincronía de metadatos (no solo de storage)
El tema/universo visual de esta clase (título, mascota, narrativa — Prioridad 0-F) debe ser el mismo que el index promete en `INDEX_SEMANAS_META[n].tema`/`.universo` para esta semana. Si el docente cambia el tema en un lado, se avisa explícitamente que hay que actualizarlo también en el otro — esto es texto libre, no se sincroniza solo.

### ✅ Checklist de esta prioridad (verificar SIEMPRE antes de entregar)
```
[ ] PREFIX viene de claseCtx.storagePrefix cuando existe — ninguna función reconstruye
    "area_grado_grupo_periodo" por su cuenta en ningún otro punto del archivo
[ ] SKEY e INDEX_KEY se derivan de ese mismo PREFIX con los sufijos fijos _session/_data
[ ] El nombre de archivo final coincide EXACTAMENTE con INDEX_SEMANAS_META[n].archivo del index
[ ] Si la semana es nueva, se entregó también la línea para agregar a INDEX_SEMANAS_META
[ ] El bloque de autoverificación semana-index (paso 6) está presente en el archivo entregado
[ ] El tema visual de la clase coincide con el tema declarado para esa semana en el index
[ ] Probado: registrar usuario en el index → abrir esta semana → completar un quiz → volver al
    index → la nota aparece en el dashboard sin recargar a mano
```


## 🔺 PRIORIDAD 8-L · MÁXIMA — BLINDAJE CONTRA LA SEMANA DUPLICADA EN PREFIX Y CONTRA EL COLAPSO DE SKEY/INDEX_KEY EN UNA SOLA CLAVE

### 🚨 Bug real documentado, encontrado auditando `semana1_mat4_p4.html` en producción
Un archivo de clase real, generado siguiendo (en teoría) la Prioridad 8-K, tenía **dos bugs concretos** que reproducen exactamente el síntoma "la nota sí, el avance no; siempre reinicia en slide 1":

**① La semana quedó duplicada en la clave.** `claseCtx.storagePrefix` que entrega el index **YA incluye la semana** (ej. `"mat_4_401_p4_s1"` — ver `prefijoSemana()` en el index). La clase, al construir su propia clave, volvió a pegarle la semana encima:
```javascript
// ❌ ANTI-PATRÓN REAL ENCONTRADO — NUNCA HACER ESTO:
function skey() { return PREFIX + '_s' + SEMANA_NUM + '_' + usuarioKey() + '_data'; }
// PREFIX ya es "mat_4_401_p4_s1" → resultado real: "mat_4_401_p4_s1_s1_juan_data"
// El index busca "mat_4_401_p4_s1_juan_data" (semana UNA sola vez) → JAMÁS coincide.
```
**② `SKEY` e `INDEX_KEY` colapsaron en una sola clave.** La 8-K ya exige que sean dos claves DISTINTAS con sufijos `_session`/`_data` — pero el archivo real usaba una única función (`skey()`, sufijo `_data`) tanto para guardar la sesión completa (`slide`, `seen`, `quizActs`) como para el resumen que sincroniza con el index. Como `save()` escribe primero la sesión completa ahí y, en la MISMA llamada, `syncIndex()` vuelve a escribir en esa idéntica clave un resumen SIN `slide` ni `seen`, el resultado es que **cada guardado se autodestruye a sí mismo un instante después**. Al reabrir, `load()` encuentra "algo" en esa clave (no está vacía) pero sin `slide` — y arranca en 0 sin siquiera mirar el respaldo de continuidad, porque ese respaldo solo se consulta cuando la clave principal está vacía, y aquí nunca lo estaba.

### ⚖️ REGLA ABSOLUTA — verificación obligatoria antes de entregar CUALQUIER clase
```
[ ] Si PREFIX viene de claseCtx.storagePrefix, NINGUNA función le vuelve a concatenar
    "_s" + SEMANA_NUM (ni "_p" + periodo, ni ningún otro fragmento que storagePrefix ya traiga).
    Antes de escribir SKEY/INDEX_KEY, imprimir en consola el resultado y confirmar a ojo que
    NO aparece la semana dos veces ni ningún segmento repetido.
[ ] SKEY (sufijo _session) es la ÚNICA clave que recibe la sesión completa (slide/seen/quizActs/etc.)
    vía save(). INDEX_KEY (sufijo _data) es la ÚNICA clave que recibe el resumen de syncIndex()
    (nota/porcentajeAvance/etc., SIN slide ni seen). Ninguna función escribe sesión completa en
    INDEX_KEY, ni escribe el resumen de syncIndex() en SKEY — son dos objetos de forma distinta,
    nunca deben compartir clave (esto ya lo exige 8-J; 8-L lo hace explícito con nombres de función).
[ ] load() SIEMPRE lee primero de SKEY (la clave de sesión completa) — nunca de INDEX_KEY. Si
    en algún punto del código load() o cualquier función de restauración lee de INDEX_KEY
    esperando encontrar slide/seen ahí, ese es el bug de 8-L reapareciendo.
[ ] Prueba obligatoria de simulación (no solo leer el código): guardar avance en la slide 10,
    completar un quiz, simular cierre/reapertura, y confirmar en consola que load() restaura
    slide 10 (no 0) Y que la clave que el index espera (INDEX_KEY) contiene datos legibles.
```
### 📌 Por qué esto no lo cubría ya la 8-K
La 8-K exige la fórmula correcta de `PREFIX`/`SKEY`/`INDEX_KEY` — y esa fórmula, seguida al pie de la letra, ya es correcta. Pero un asistente o desarrollador puede desviarse de ella al escribir el código real (nombrar todo con una sola función `skey()` ambigua, o volver a concatenar la semana "por si acaso") sin darse cuenta de que rompe el contrato. La 8-L existe para que, incluso si el código generado no copia textualmente el bloque de 8-K, se verifique explícitamente contra estos dos síntomas conocidos antes de entregar el archivo.

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

---

# 16 · Mejor nota (8-U), semana nueva en cero (8-V) y reintento sin bloqueos (8-W)

## 🔺 PRIORIDAD 8-U · MÁXIMA — LA NOTA OFICIAL ES LA MEJOR NOTA DE TODOS LOS INTENTOS: UN REINTENTO NUNCA BAJA LA NOTA

### 🚨 REGLA ABSOLUTA E INAPELABLE
Cuando el estudiante gasta una vida para mejorar su nota, **la nota que queda es la MÁS ALTA que haya sacado en cualquiera de sus intentos — jamás la del último**. Ejemplo exacto: si en el intento 1 sacó **3.5** y en el intento 2 sacó **3.0**, su nota oficial sigue siendo **3.5**. Si en un tercer intento saca **4.2**, la nota oficial pasa a **4.2**. La nota solo puede **subir o mantenerse**; nunca baja por reintentar.

Para que esto sea imposible de romper, el estado distingue **dos notas**:

| Concepto | Función | Qué es |
|---|---|---|
| Nota del intento actual | `calcTotal()` | Se construye con los aciertos del intento en curso (parte de 0.0 en cada reintento). Es solo un dato de trabajo. |
| **Nota oficial** | **`notaOficial()`** | `max(nota del intento actual, st.mejorNota)`. **Es la ÚNICA que se muestra como "NOTA", se guarda como nota en el index y se usa para mensajes, colores, hitos y título del bloque de vidas.** |

**Candados anti-trampa (no se pierde ninguna garantía de 8-H/8-M):** `st.mejorNota` se alimenta **exclusivamente** de `calcTotal()` (que a su vez sale solo de `quiz_resps_`). No existe ningún camino para "regalar" nota: un clic rápido, ir atrás/adelante o recargar siguen sin poder inflarla, y `st.mejorNota` nunca se lee de `localStorage` de otra clave ni del index (ver 8-V: así una nota falsa del index no puede contaminar la clase).
```javascript
// ═══ 1) CAMPOS NUEVOS DE st — todos los guarda save() (8-V) y los restaura load() (8-V) ═══
// st.mejorNota          → number 0..5   — la nota MÁS ALTA lograda en cualquier intento (nunca baja sola)
// st.mejorAciertos      → number        — aciertos de ese mejor intento
// st.mejorIntento       → number        — número de intento en que se logró (1 = primer intento)
// st.historialIntentos  → [{ intento, nota, aciertos, fecha, origen }] — una fila por cada intento que se reinicia
// En el objeto st inicial (let st = {...}) van en cero: mejorNota:0, mejorAciertos:0, mejorIntento:1, historialIntentos:[]

// ═══ 2) calcTotal() COMPLETA (completa el cuerpo que 8-M dejaba abierto) — nota del intento ACTUAL ═══
function totalPreguntasReales() {
  return SL.filter(s => TIPOS_EVALUABLES.includes(s.type)).reduce((a, s) => a + (s.preguntas?.length || 0), 0);
}
function calcTotal() {
  const tot = totalPreguntasReales();
  recalcularAciertosDesdeContadores();                       // 8-H: st.aciertos SIEMPRE sale de quiz_resps_
  if (st.aciertos > tot) st.aciertos = tot;                  // 8-M Guardia 3
  if (!tot) return 0;
  return Math.min(5, Math.max(0, (st.aciertos / tot) * 5));  // nunca < 0.0 ni > 5.0
}

// ═══ 3) LA MEJOR NOTA ═══
function actualizarMejorNota() {
  const act = calcTotal();
  if (act > (st.mejorNota || 0) + 1e-9) {        // solo SUBE
    st.mejorNota     = act;
    st.mejorAciertos = st.aciertos || 0;
    st.mejorIntento  = st.intentos || 1;
  }
}
function notaOficial()       { const act = calcTotal(); return Math.max(act, st.mejorNota || 0); }
function aciertosOficiales() { calcTotal(); return Math.max(st.aciertos || 0, st.mejorAciertos || 0); }

// ═══ 4) updScore() — el HUD muestra SIEMPRE la nota oficial (adaptar los ids #nota-hud / #nota-intento-hud al HUD real) ═══
function updScore() {
  actualizarMejorNota();
  const oficial = notaOficial();
  const el = document.getElementById('nota-hud');
  if (el) el.textContent = oficial.toFixed(1);
  const sub = document.getElementById('nota-intento-hud');
  if (sub) sub.textContent = (st.reintentoActivo && (st.mejorNota || 0) > 0)
    ? `Intento actual: ${calcTotal().toFixed(1)} · Tu mejor nota: ${st.mejorNota.toFixed(1)}` : '';
  try { checarHitoNotaDocente(); } catch (e) {}              // 18-D: los hitos se miden con notaOficial()
}

// ═══ 5) Aviso en la pantalla final cuando el último intento salió MÁS BAJO que el mejor ═══
function renderAvisoMejorNota() {
  const act = calcTotal(), mejor = st.mejorNota || 0;
  if ((st.vidasUsadas || 0) === 0 || act >= mejor - 1e-9) return '';
  return `<div class="aviso-mejor-nota">🏅 Tu nota se mantiene en <strong>${mejor.toFixed(1)}</strong> — es tu mejor intento
    (el intento ${st.mejorIntento || 1}).<br><span>Este último intento sacó ${act.toFixed(1)}, pero <strong>no baja tu nota</strong>. ¡Puedes seguir intentando!</span></div>`;
}
```
```css
.aviso-mejor-nota { background:#fff8dc; border:3px solid var(--accent); border-radius:14px; padding:10px 14px; margin:8px auto 0;
  max-width:480px; font-family:var(--font-ui); font-size:.85rem; color:var(--primary-dark); line-height:1.6; }
.aviso-mejor-nota span { font-size:.78rem; color:var(--text2); }
```
### 📍 DÓNDE SE APLICA `notaOficial()` (obligatorio, sin excepción)
1. `rFinal()` (Prioridad 11): `const t = notaOficial();` y `const aciertos = aciertosOficiales();` + `${renderAvisoMejorNota()}` justo debajo de "X / Y respuestas correctas".
2. `renderBloqueVidasProtagonista()` (6-C): `const t = notaOficial();`.
3. `construirEntradaEstudiante()` / `syncIndex()` (8-F): el campo `nota` es `notaOficial()`; `notaIntentoActual` es `calcTotal()`.
4. `checarHitoNotaDocente()` (18-D), mensajes de ByteBot/ARIA sobre "cómo voy" y el HUD (`updScore()`).
5. `resetearTodosLosQuizzes()` (8-P) llama a `actualizarMejorNota()` **como primera línea**, antes de poner `st.aciertos = 0` — así ninguna ruta de reinicio (estudiante, panel docente) puede borrar la mejor nota sin guardarla antes.
6. `responderQuiz()` (8-P) llama a `actualizarMejorNota()` justo después de `recalcularAciertosDesdeContadores()`.
7. **Solo `pd_resetCompleto()` (Panel Docente) pone `mejorNota`, `mejorAciertos` e `historialIntentos` en cero** — es el único "borrón total" permitido. "Reset solo Quizzes" y "Reintentar" CONSERVAN la mejor nota.
8. Durante un reintento, el banner (6-B) recuerda al estudiante que su mejor nota está segura y que el intento solo puede subirla.

### 🧪 PRUEBA OBLIGATORIA
```
PASO 1: Completar los 3 evaluables con 3.5 de nota (ej. 21/30). Pantalla final: NOTA 3.5.
PASO 2: Usar una vida y completar el reintento con 3.0 (18/30).
RESULTADO ESPERADO: pantalla final muestra NOTA 3.5 + aviso "Tu nota se mantiene en 3.5"; el index recibe 3.5; recargar (F5) sigue en 3.5.
PASO 3: Usar otra vida y sacar 4.2 → NOTA 4.2 (sube). Otra vida y sacar 1.0 → sigue 4.2.
PASO 4: Panel Docente → "Reset completo": nota oficial vuelve a 0.0 y el index también.
```
**Checklist:**
```
[ ] Existen notaOficial(), actualizarMejorNota(), aciertosOficiales() y calcTotal() completa (una sola definición de cada una)
[ ] st.mejorNota/mejorAciertos/mejorIntento/historialIntentos se guardan en save() y se restauran en load()
[ ] resetearTodosLosQuizzes() llama a actualizarMejorNota() ANTES de st.aciertos = 0
[ ] rFinal, bloque de vidas, syncIndex/INDEX_KEY, hitos del docente y HUD usan notaOficial(), no calcTotal()
[ ] Intento 3.5 → reintento 3.0 deja 3.5 (en pantalla final, en el HUD, en el index y tras recargar)
[ ] Solo pd_resetCompleto() puede bajar la mejor nota
[ ] Ninguna ruta lee st.mejorNota desde el index u otra clave (8-V)
```


## 🔺 PRIORIDAD 8-V · MÁXIMA — SEMANA NUEVA = CERO REAL: NINGUNA CLASE PUEDE ABRIR CON NOTA, AVANCE NI DATOS QUE NO SEAN DE ESE ESTUDIANTE, EN ESA SEMANA

### 🚨 BUG REAL DE PRODUCCIÓN: LAS CLASES ABREN LA PRIMERA VEZ CON UNA NOTA "YA HECHA"
Síntoma: un estudiante abre una semana por primera vez y la clase (o el index) ya muestra nota/avance, como si hubiera arrastrado la de la semana anterior. Se auditó el propio documento y se encontraron **cinco causas raíz**, todas originadas en código o reglas de referencia que se contradecían:
1. **Contexto de otra semana aceptado a ciegas.** `PREFIX = claseCtx?.storagePrefix || …` (8-K) confiaba siempre en `sessionStorage['clase_contexto']`. Si la pestaña venía de otra semana (el estudiante navega de una clase a otra, usa "atrás", o el index entrega un contexto viejo), el `storagePrefix` era el de **la semana anterior** y la clase cargaba **su sesión y su nota**. La autoverificación de 8-K (paso 6) solo mostraba un aviso, no corregía nada.
2. **Dos `syncIndex()` en el mismo documento.** La Prioridad 8 traía una versión heredada que guardaba en `IDX_SC[st.name][SEM_ID]` (por **nombre**, sin grupo, con un `SEM_ID` que el documento nunca definía) y que **"conservaba la mejor nota" de la entrada previa** (`if (prev && prev.nota > t) nueva.nota = prev.nota`). Si dos semanas o dos estudiantes homónimos compartían `SEM_ID`/nombre, la semana nueva **heredaba la nota de la otra**. Esa versión queda **ELIMINADA**; solo existe la de 8-F/8-U.
3. **Sesión guardada sin sello de semana.** `save()` no guardaba a qué semana/curso/grupo pertenecía la sesión, y `load()` aceptaba cualquier cosa que encontrara bajo la clave. Además la auto-reparación buscaba por coincidencia parcial (`pfx.includes(NOMBRE_NORM)`: "ana" coincide con "mariana"/"susana") sin verificar semana.
4. **Acceso directo compartía sesión.** En "modo sin guardar" (sin index) `load()`/`save()` seguían usando `localStorage` bajo una clave `…sinregistro…` **común a todos** en ese computador: el siguiente que entraba directo heredaba el avance del anterior.
5. **Estado inicial no verificado.** Nada comprobaba que, sin sesión válida, la nota fuera exactamente 0.0.

### ⚖️ REGLAS ABSOLUTAS E INAPELABLES
1. **El contexto del index solo vale si es de ESTA semana.** `claseCtx.semana` debe ser igual a `CONFIG_CLASE.semana` y `claseCtx.storagePrefix` debe **terminar en `_s{semana}`**. Si no, el `storagePrefix` se **descarta** (la identidad —nombre y grupo— sí se conserva) y el prefijo se arma con `CONFIG_CLASE` + grupo, con la misma fórmula del index (`area_grado_grupo_pPERIODO_sSEMANA`, ver 8-L).
2. **Toda sesión guardada lleva sello** (`semana`, `claseId`, `prefix`, `grupo`, `studentId`) y **solo se restaura si el sello coincide** con esta clase y este estudiante. Lo que no coincide se ignora: arranque en cero.
3. **La auto-reparación es estricta:** solo adopta sesiones con sello completo (mismo `claseId`, `studentId` y `grupo`), buscadas por contenido, **nunca por coincidencia parcial de texto en la clave**.
4. **Modo sin guardar = sesión efímera.** No lee ni escribe `localStorage`; usa `sessionStorage` (propio de la pestaña). Cada acceso directo empieza en cero y no deja nada para el siguiente.
5. **Existe UNA SOLA `syncIndex()`** (8-F, con `notaOficial()` de 8-U). Prohibidos `IDX_SC`, `SEM_ID`, `localStorage.setItem('studentName', …)` y cualquier "conservar la nota previa del index": **la mejor nota vive solo en `st.mejorNota`** (SKEY de esta semana), nunca se lee del index.
6. **Arranque verificado:** si no se encontró sesión válida, el estado se pone en cero explícito (`estadoEnCero()`) y se verifica con `console.assert` que `calcTotal() === 0`, `slide === 0`, `seen` vacío y `acts` vacío. Los valores iniciales de `st` en el código son siempre ceros literales (nunca datos de ejemplo).
7. **Recomendación para el index** (archivo aparte): al leer `INDEX_KEY`, ignorar la entrada si `entry.semana !== número de esa semana` o `entry.claseId` no coincide.
```javascript
// ═══ BLOQUE ÚNICO DE ARRANQUE — REEMPLAZA el paso 4 (PREFIX) y el paso 6 (autoverificación) de 8-K,
// y los pasos 5, 6 y 7 (auto-reparación, load, save) de 8-G. Todo lo demás de 8-G/8-K sigue igual. ═══

// A) claseCtx, st_modoSinGuardar, normalizarTexto y NOMBRE_NORM: EXACTAMENTE como en 8-K.
const GRUPO_NORM = normalizarTexto(claseCtx?.grupo).replace(/_/g, '');   // ej.: "501"

// B) CONFIG_CLASE (literal de la Prioridad 0) y el id de ESTA clase
const CONFIG_CLASE = { area: "mat", grado: "5", periodo: "3", semana: 4 };   // ← valores REALES de esta sesión
const CLASE_ID = `${CONFIG_CLASE.area}_${CONFIG_CLASE.grado}_p${CONFIG_CLASE.periodo}_s${CONFIG_CLASE.semana}`;

// C) El contexto del index solo vale si pertenece a ESTA semana
function contextoEsDeEstaSemana(ctx) {
  if (!ctx) return false;
  const sem = Number(CONFIG_CLASE.semana);
  if (ctx.semana !== undefined && ctx.semana !== null && Number(ctx.semana) !== sem) return false;
  const pfx = String(ctx.storagePrefix || '');
  if (pfx && !pfx.endsWith('_s' + sem)) return false;      // el prefijo del index TERMINA en la semana
  return true;
}
const CTX_VALIDO = contextoEsDeEstaSemana(claseCtx);
if (claseCtx && !CTX_VALIDO) {
  console.warn('⚠️ El contexto que entregó el index es de OTRA semana — se descarta; esta clase arranca en cero.');
  window.__avisoCtx = '⚠️ Esta clase se abrió con datos de otra semana. Empezó en cero. Entra desde el índice para que tu nota quede bien registrada.';
}

// D) PREFIX — el del index SOLO si es de esta semana; si no, el respaldo con la MISMA fórmula del index
function prefijoRespaldo() {
  return `${CONFIG_CLASE.area}_${CONFIG_CLASE.grado}_${GRUPO_NORM || 'sinregistro'}_p${CONFIG_CLASE.periodo}_s${CONFIG_CLASE.semana}`;
}
const PREFIX = (CTX_VALIDO && claseCtx && claseCtx.storagePrefix) ? claseCtx.storagePrefix : prefijoRespaldo();
// SKEY / INDEX_KEY / KEY_RESUMEN: exactamente como en 8-K y 8-J (derivadas de este PREFIX, sufijos _session / _data / _resumen)

// E) Almacén: el modo sin guardar NUNCA toca localStorage
function almacen() { return st_modoSinGuardar ? sessionStorage : localStorage; }

// F) ¿Esta sesión guardada es de ESTE estudiante y de ESTA semana?
function sesionGuardadaEsValida(d) {
  if (!d || typeof d !== 'object') return false;
  if (d.studentId !== undefined && d.studentId !== NOMBRE_NORM) return false;                  // otra persona
  if (d.semana    !== undefined && Number(d.semana) !== Number(CONFIG_CLASE.semana)) return false; // otra semana
  if (d.claseId   !== undefined && d.claseId !== CLASE_ID) return false;                        // otro curso/período
  if (d.grupo     !== undefined && d.grupo !== GRUPO_NORM) return false;                        // otro grupo
  return true;   // (una sesión antigua SIN sello solo llega aquí si estaba en la clave EXACTA SKEY, ya única por prefijo+nombre)
}

// G) Auto-reparación ESTRICTA: solo sesiones con sello completo; jamás por coincidencia parcial de texto
function buscarSesionHuerfanaPorIdentidad() {
  if (st_modoSinGuardar || !NOMBRE_NORM) return null;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || k === SKEY || !k.endsWith('_session')) continue;
      let d = null;
      try { d = JSON.parse(localStorage.getItem(k)); } catch (e) { continue; }
      if (d && d.claseId === CLASE_ID && d.studentId === NOMBRE_NORM && d.grupo === GRUPO_NORM &&
          Number(d.semana) === Number(CONFIG_CLASE.semana)) return d;
    }
  } catch (e) {}
  return null;
}

// H) Estado en cero REAL
function estadoEnCero() {
  st.name = claseCtx?.studentName || '';
  st.slide = 0; st.seen = new Set(); st.aciertos = 0; st.acts = {};
  st.badges = []; st.avatar = {}; st.avatarElegido = null; st.streak = 0; st.xp = 0;
  st.vidasUsadas = 0; st.intentos = 1;
  st.reintentoActivo = false; st.reintentoPendientes = [];
  st.mejorNota = 0; st.mejorAciertos = 0; st.mejorIntento = 1; st.historialIntentos = [];
  st.modoAdmin = false;
}

// I) load() — ÚNICA. Restaura solo sesiones VÁLIDAS; si no hay, cero verificado
function load() {
  let encontrada = false;
  try {
    let d = JSON.parse(almacen().getItem(SKEY) || 'null');
    if (d && !sesionGuardadaEsValida(d)) { console.warn('⚠️ Sesión guardada descartada: no es de este estudiante/semana.'); d = null; }
    if (!d) d = buscarSesionHuerfanaPorIdentidad();
    if (d) {
      encontrada = true;
      st.name          = d.name || claseCtx?.studentName || '';
      st.slide         = d.slide || 0;                 // 🔺 el slide SIEMPRE se restaura si hay sesión válida
      st.seen          = new Set(d.seen || []);        // 🔺 las slides vistas SIEMPRE se restauran
      st.aciertos      = d.aciertos || 0;
      st.acts          = d.acts || {};
      st.badges        = d.badges || [];
      st.avatar        = d.avatar || {};
      st.avatarElegido = d.avatarElegido || null;
      st.streak        = d.streak || 0;
      st.xp            = d.xp || 0;
      st.vidasUsadas   = d.vidasUsadas || 0;
      st.intentos      = d.intentos || 1;
      st.reintentoActivo     = d.reintentoActivo || false;
      st.reintentoPendientes = d.reintentoPendientes || [];
      st.mejorNota           = d.mejorNota || 0;        // 8-U
      st.mejorAciertos       = d.mejorAciertos || 0;
      st.mejorIntento        = d.mejorIntento || 1;
      st.historialIntentos   = d.historialIntentos || [];
      purgarCandadosHuerfanos();                        // 8-W: candados q_contada_* viejos nunca dejan un quiz muerto
      actualizarMejorNota();                            // 8-U: sesiones antiguas sin mejorNota se migran aquí
      save();                                           // re-guardar ya con sello (auto-migración silenciosa)
    } else {
      estadoEnCero();
    }
  } catch (e) { console.warn('Error al cargar:', e); estadoEnCero(); }
  if (!encontrada) {
    console.assert(calcTotal() === 0 && st.slide === 0 && st.seen.size === 0 && Object.keys(st.acts).length === 0,
      '🚨 Clase nueva que NO arrancó en cero: revisar 8-V');
  }
}

// J) save() — ÚNICA. Siempre con sello. En modo sin guardar solo sessionStorage y sin tocar el índice
function save() {
  try {
    actualizarMejorNota();
    const data = {
      studentId: NOMBRE_NORM, grupo: GRUPO_NORM, semana: CONFIG_CLASE.semana, claseId: CLASE_ID, prefix: PREFIX,   // 8-V: SELLO
      name: st.name,
      slide: st.slide, seen: [...st.seen],
      aciertos: st.aciertos || 0, acts: st.acts,
      badges: st.badges, avatar: st.avatar, avatarElegido: st.avatarElegido || null,
      streak: st.streak, xp: st.xp || 0,
      vidasUsadas: st.vidasUsadas || 0, intentos: st.intentos || 1,
      reintentoActivo: st.reintentoActivo || false, reintentoPendientes: st.reintentoPendientes || [],
      mejorNota: st.mejorNota || 0, mejorAciertos: st.mejorAciertos || 0, mejorIntento: st.mejorIntento || 1,   // 8-U
      historialIntentos: st.historialIntentos || [],
      timestamp: Date.now(),
    };
    almacen().setItem(SKEY, JSON.stringify(data));
    if (!st_modoSinGuardar) {
      const guardadas = JSON.parse(localStorage.getItem('clases_guardadas') || '[]');
      if (!guardadas.includes(PREFIX)) { guardadas.push(PREFIX); localStorage.setItem('clases_guardadas', JSON.stringify(guardadas)); }
    }
    mostrarGuardado();
    syncIndex();   // 8-F/8-U — en modo sin guardar syncIndex() corta de inmediato (8-E)
  } catch (e) { console.warn('Error al guardar:', e); }
}
```
**Checklist:**
```
[ ] CONFIG_CLASE, CLASE_ID, CTX_VALIDO, prefijoRespaldo(), PREFIX, almacen(), sesionGuardadaEsValida(), estadoEnCero(), load() y save() existen UNA sola vez
[ ] Si claseCtx.semana ≠ CONFIG_CLASE.semana (o storagePrefix no termina en _s{semana}) el prefijo del index se descarta y la clase arranca en 0.0
[ ] save() guarda el sello (studentId, grupo, semana, claseId, prefix) y load() descarta sesiones cuyo sello no coincide
[ ] buscarSesionHuerfanaPorIdentidad() exige claseId + studentId + grupo + semana; no usa includes() sobre el nombre
[ ] En modo sin guardar load()/save() usan sessionStorage y NUNCA localStorage ni el índice
[ ] No existe IDX_SC, SEM_ID, ni localStorage.setItem('studentName', …), ni ninguna lectura de la nota previa del index
[ ] Sin sesión válida: console.assert de arranque en cero presente; los valores iniciales de st son ceros literales
[ ] Prueba T9 (Prioridad 8-T) pasada: sesión de otra semana, contexto de otra semana y acceso directo no heredan nada
```


## 🔺 PRIORIDAD 8-W · MÁXIMA — REINTENTO A PRUEBA DE BLOQUEOS: AL GASTAR UNA VIDA, EL QUIZ SIEMPRE RESPONDE

### 🚨 BUG REAL DE PRODUCCIÓN: TRAS GASTAR UNA VIDA LLEVA A LOS QUIZZES, PERO NO SE PUEDEN SELECCIONAR LAS RESPUESTAS
Síntoma: el estudiante usa una vida, la clase lo lleva directo al Quiz, pero **las opciones no responden**; el docente debe usar el Panel ("Reset completo") y volver a gastar la vida desde el panel. Un quiz puede quedar "vivo en pantalla pero muerto por dentro" por cuatro motivos, y esta prioridad los cierra **todos a la vez** (no basta con arreglar uno):
1. **Candados `q_contada_*` huérfanos.** Un candado de pregunta que no se borró en el reinicio (sesiones guardadas por versiones antiguas, un reset parcial, una recarga a mitad) hace que `responderQuiz()` ignore **todos** los clics en silencio. Por construcción, un candado es válido **solo si su pregunta ya fue respondida** (`n < quiz_idx_`, porque el índice avanza en el mismo clic); cualquier candado con `n ≥ quiz_idx_` es huérfano y se elimina.
2. **Una pantalla encima del quiz.** Un modal en cola (mensaje del docente, Modo Foco) o una capa decorativa de pantalla completa (fuegos artificiales, confeti, reacciones) de la pantalla final que sigue por encima de la clase intercepta los clics. El reintento debe vaciar la cola de modales y retirar toda capa decorativa antes de pintar el quiz.
3. **Dos caminos de reinicio distintos.** El estudiante (`confirmarReintento()`) y el panel (`pd_resetQuizzes()`) repetían a mano cada uno su propia secuencia de pasos, con diferencias sutiles (uno cerraba el modal primero, otro no; uno anotaba el intento en una clave aparte, otro no). Ahora hay **UNA sola función**, `iniciarNuevoIntento(origen)`, y los dos caminos solo la llaman.
4. **Nadie comprobaba que el quiz realmente respondiera.** Ahora, después de pintar un quiz, `verificarQuizVivo()` hace una **prueba de vida**: botones habilitados, ningún candado huérfano y ningún elemento tapando el primer botón (`elementFromPoint`). Si algo falla, se auto-repara y repinta; el vigilante `revalidarAvance()` (8-O) repite la prueba cada 3 s.
### ⚖️ REGLAS ABSOLUTAS E INAPELABLES
1. `confirmarReintento()` y `pd_resetQuizzes()` **solo** llaman a `iniciarNuevoIntento(...)`; ninguna otra función reinicia quizzes ni cambia `vidasUsadas`/`intentos`.
2. `responderQuiz()` (8-P) trata un candado sobre la pregunta ACTUAL como huérfano: lo borra y sigue. La protección contra clics rápidos **no se pierde**: el primer clic avanza `quiz_idx_` de forma síncrona, así que los clics siguientes caen en la Guardia 1.
3. `.reintento-banner` lleva `pointer-events:none` (es solo informativo y nunca debe tapar ni interceptar nada).
4. Toda capa decorativa de pantalla completa lleva la clase `fx-overlay` **y** `pointer-events:none`; `render()` retira las que estén fuera de `#slide-wrap`.
5. El temporizador de la prueba de vida se guarda en `window.__vivoTimeout` y lo limpia `detenerTemporizadoresSlide()` (8-S).
```javascript
// ═══ 1) Utilidades ═══
function limpiarColaModales() { if (typeof _modalCola !== 'undefined') _modalCola.length = 0; }       // 8-Q
function forzarCerrarModal() {
  const ov = document.getElementById('modal-overlay'); if (ov) ov.classList.remove('vis');
  const bx = document.getElementById('modal-box');     if (bx) bx.innerHTML = '';
}
function limpiarOverlaysDecorativos() {
  document.querySelectorAll('.fx-overlay').forEach(el => {
    if (!el.closest('#slide-wrap')) el.remove(); else el.style.pointerEvents = 'none';
  });
}

// ═══ 2) Candados huérfanos: q_contada_<id>_<n> solo es válido si n < quiz_idx_<id> ═══
function purgarCandadosHuerfanos(sOpcional) {
  const lista = sOpcional ? [sOpcional] : SL.filter(s => TIPOS_EVALUABLES.includes(s.type));
  let cambio = false;
  lista.forEach(s => {
    const idx = st.acts['quiz_idx_' + s.id] || 0;
    const pref = 'q_contada_' + s.id + '_';
    Object.keys(st.acts).forEach(k => {
      if (!k.startsWith(pref)) return;
      const n = parseInt(k.slice(pref.length), 10);
      if (isNaN(n) || n >= idx) { delete st.acts[k]; cambio = true; }
    });
    // coherencia mínima: si el índice ya pasó la última pregunta, el quiz está completado
    if (s.preguntas && idx >= s.preguntas.length && st.acts['completado_' + s.id] !== true) { st.acts['completado_' + s.id] = true; cambio = true; }
  });
  return cambio;   // quien llama decide si guarda (load() y verificarQuizVivo() lo hacen)
}

// ═══ 3) LA ÚNICA FUNCIÓN QUE REINICIA UN INTENTO (estudiante y panel) ═══
function iniciarNuevoIntento(origen) {            // origen: 'estudiante' | 'panel'
  if (origen === 'estudiante' && (st.vidasUsadas || 0) >= MAX_VIDAS) return;
  // 1) la mejor nota se asegura ANTES de borrar nada (8-U)
  actualizarMejorNota();
  st.historialIntentos = st.historialIntentos || [];
  st.historialIntentos.push({ intento: st.intentos || 1, nota: calcTotal(), aciertos: st.aciertos || 0, fecha: new Date().toISOString(), origen });
  // 2) silenciar todo lo que pueda quedar encima o corriendo
  limpiarColaModales(); forzarCerrarModal();
  detenerCronometroLectura(); detenerTemporizadoresSlide(); lecturaMarca = null;
  limpiarOverlaysDecorativos();
  // 3) vidas e intentos
  st.vidasUsadas = Math.min(MAX_VIDAS, (st.vidasUsadas || 0) + 1);
  st.intentos = (st.intentos || 1) + 1;
  // 4) reset de quizzes (candados q_contada_*, retro pendiente y mejor nota segura: 8-P/8-U) + reintento dirigido (6-B)
  resetearTodosLosQuizzes();
  purgarCandadosHuerfanos();
  iniciarReintentoDirigido();
  save();
  render();                                       // pinta el primer evaluable pendiente
  verificarQuizVivo();                            // prueba de vida inmediata
  updScore();
  showToast(`❤️ Intento ${st.vidasUsadas}/${MAX_VIDAS} — Ve directo a lo que falta 🎯 (tu mejor nota ${(st.mejorNota || 0).toFixed(1)} está segura)`);
}

// ═══ 4) Prueba de vida del quiz ═══
window.__vivoTimeout = null;
window.__vivoReparaciones = 0;
function programarVerificacionQuiz() {            // se llama al FINAL de render() (8-O)
  if (window.__vivoTimeout) clearTimeout(window.__vivoTimeout);
  window.__vivoTimeout = setTimeout(verificarQuizVivo, 300);
}
function verificarQuizVivo() {
  try {
    const s = SL[st.slide];
    if (!s || !TIPOS_EVALUABLES.includes(s.type)) { window.__vivoReparaciones = 0; return true; }
    if (st.acts['completado_' + s.id] === true) return true;
    if (modalAbierto()) return true;                               // un modal legítimo (retroalimentación) está encima: no es un bloqueo
    const opts = [...document.querySelectorAll('.quiz-opt')];
    if (!opts.length) return true;                                 // semáforo de confianza u otra pantalla legítima
    let problema = false;
    if (purgarCandadosHuerfanos(s)) { problema = true; save(); }   // candado huérfano
    if (opts.every(b => b.disabled)) problema = true;              // pintado muerto
    const b0 = opts.find(b => !b.disabled) || opts[0];
    const r = b0.getBoundingClientRect();
    if (r.width > 0 && r.bottom > 0 && r.top < window.innerHeight) {
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      if (hit && !b0.contains(hit)) {                              // algo está tapando el botón
        const cs = getComputedStyle(hit);
        const grande = hit.getBoundingClientRect().width >= window.innerWidth * 0.8 && hit.getBoundingClientRect().height >= window.innerHeight * 0.8;
        if ((cs.position === 'fixed' || cs.position === 'absolute') && grande && hit.id !== 'modal-overlay' && hit.id !== 'pd-overlay') {
          hit.style.pointerEvents = 'none'; problema = true;        // capa decorativa de pantalla completa: se neutraliza
        } else { console.warn('verificarQuizVivo: el botón está cubierto por', hit); }
      }
    }
    if (problema && window.__vivoReparaciones < 3) { window.__vivoReparaciones++; render(); return false; }
    if (!problema) window.__vivoReparaciones = 0;
    return !problema;
  } catch (e) { console.warn('verificarQuizVivo:', e); return true; }
}
```
```css
.reintento-banner { pointer-events: none; }   /* informativo: nunca intercepta clics (se suma al CSS de 6-B) */
```
### 🧪 PRUEBA OBLIGATORIA (la automatiza `prueba_clase.js`, Prioridad 8-T: prueba T7)
```
PASO 1: Completar todos los quizzes y llegar a la pantalla final.
PASO 2: Con el MOUSE (clics reales, no llamadas a funciones): "❤️ Reintentar ahora" → "Sí, reiniciar".
RESULTADO ESPERADO: llega al primer quiz pendiente; el PRIMER clic en una opción abre la retroalimentación (ningún elemento tapa el botón).
PASO 3: Responder todo el reintento con clics reales hasta volver a la pantalla final.
RESULTADO ESPERADO: la nota oficial nunca bajó (8-U) y ningún quiz quedó muerto.
PASO 4: Repetir el reintento desde "Reset solo Quizzes" del Panel Docente: mismo resultado.
```
**Checklist:**
```
[ ] confirmarReintento() y pd_resetQuizzes() llaman SOLO a iniciarNuevoIntento() — una sola función de reinicio
[ ] iniciarNuevoIntento() vacía la cola de modales, cierra el modal, retira overlays decorativos y detiene temporizadores ANTES de pintar
[ ] purgarCandadosHuerfanos() se ejecuta en load(), en rQuiz()/responderQuiz() (8-P) y en la prueba de vida
[ ] verificarQuizVivo() existe y se programa al final de render() (programarVerificacionQuiz) y se invoca en revalidarAvance()
[ ] window.__vivoTimeout lo limpia detenerTemporizadoresSlide()
[ ] .reintento-banner tiene pointer-events:none; toda capa decorativa de pantalla completa tiene clase fx-overlay + pointer-events:none
[ ] Prueba T7 con clics reales de mouse: tras gastar una vida, el quiz responde al primer clic
```

---

# 17 · Estructura de slides, cuadernos, menú de ruta, nota final y pantalla final

## 🔴 PRIORIDAD 9 · ABSOLUTA — ESTRUCTURA DE 23 SLIDES

** CAMBIO CRÍTICO v6.2:** los cuadernos (Cuaderno 1 y Taller en Clase / antes "Cuaderno 2") **NUNCA** ocupan una posición dentro de la secuencia de slides. Son EXCLUSIVAMENTE paneles flotantes accesibles desde el navbar superior (ver Prioridad 10, actualizada en v6.2). Esto corrige clases anteriores que los integraban como slides duplicadas dentro del recorrido — eso queda PROHIBIDO. La estructura correcta, sin cuadernos, es de 23 slides:
| Slides | Tipo | Contenido | Nota |
|--------|------|-----------|------|
| 1 | intro | Bienvenida, nombre, ByteBot | ❌ |
| 2–3 | info | Concepto 1 + 4 imágenes Unsplash | ❌ |
| 4–5 | info | Concepto 2 + 4 imágenes Unsplash | ❌ |
| 6 | interactive | Explorador clickeable + 6 imágenes Unsplash | ❌ |
| 7–8 | info | Concepto 3 + 4 imágenes Unsplash | ❌ |
| 9 | complementaria | Drag & drop / Matching (sin nota) + botón Verificar | ❌ |
| 10 | **quiz** | **QUIZ 1: 8 preguntas opción múltiple** | ✅ NOTA |
| 11 | complementaria | Fill in the blank / Ordenar (sin nota) + botón Verificar | ❌ |
| 12–13 | info | Concepto 4 + 4 imágenes Unsplash | ❌ |
| 14 | complementaria | Matching / Drag (sin nota) + botón Verificar | ❌ |
| 15 | **quiz** | **QUIZ 2: 8 preguntas opción múltiple** | ✅ NOTA |
| 16 | practica | Ejercicios prácticos resueltos (ligados al Quiz 2/Eval. Final) | ❌ |
| 17 | info | Profundización + ¿Sabías que…? + 2 imágenes | ❌ |
| 18 | wordsearch | Sopa de letras (máx. 5 palabras, mín. 1 encontrada) | ❌ |
| 19–20 | repaso | Mapa mental / resumen visual + 2 imágenes | ❌ |
| 21–22 | **evalFinal** | **Evaluación Final: 14 preguntas opción múltiple** | ✅ NOTA |
| 23 | final | Pantalla cierre: nota + vidas + retroalimentación | — |
**Los cuadernos NO aparecen en esta tabla porque NO son slides.** Se acceden en cualquier momento desde los botones fijos del navbar (📒 Cuaderno 1 / 📝 Taller en Clase), como paneles flotantes independientes del recorrido — nunca deben duplicarse dentro del contenido de ninguna slide, ni contarse en `SL`, ni aparecer en el sidebar de progreso, ni bloquear `nextSlide()`.
**CÁLCULO DE NOTA CON ESTA ESTRUCTURA:**
```
Total preguntas evaluables = 8 (Q1) + 8 (Q2) + 14 (EF) = 30 preguntas
Nota = (aciertos / 30) × 5.0
Ejemplo: 20 aciertos de 30 → (20/30) × 5.0 = 3.33 (aprobado)
Ejemplo: 30 aciertos → 5.0 (perfecto)
Ejemplo: 0 aciertos → 0.0 (reprueba → se activan las 8 vidas)
```
**Nota 2 de la clase (independiente de esta nota automática):** el Taller en Clase (antes "Cuaderno 2") se califica aparte, manualmente por el docente — ver Prioridad 10 y Prioridad 18.

## 🔴 PRIORIDAD 10 · ABSOLUTA — CUADERNOS DIGITALES: ACCESO DESDE MENÚ SUPERIOR + DISEÑO TIPO AGENDA REAL

### 📒📓 LOS DOS CUADERNOS SIEMPRE VISIBLES Y ACCESIBLES DESDE EL MENÚ SUPERIOR
** Cambio de comportamiento CRÍTICO v6.2:** los cuadernos **NUNCA** son slides — ni ahora ni antes deberían haberlo sido de forma duplicada. Son **exclusivamente paneles flotantes** accesibles en cualquier momento desde dos botones siempre visibles en el menú/navbar superior. **NO ocupan lugar en la secuencia de `SL`, no aparecen en el sidebar de progreso, no bloquean `nextSlide()`, y bajo ninguna circunstancia deben duplicarse dentro del contenido de una slide.** Si una clase integra contenido de cuaderno directamente dentro de una slide del recorrido, eso es un error a corregir — el cuaderno vive únicamente en su panel flotante propio.
```html
<!-- En el NAVBAR superior — siempre visibles, junto a los demás botones -->
<div class="nb-tabs-top">
  <button id="btn-cuaderno1" class="nb-tab-btn" onclick="abrirCuadernoFlotante(1)" title="Cuaderno 1 — Teoría">
    📒 Cuaderno 1
    <span class="nb-tab-badge" id="nb1-badge"></span>
  </button>
  <button id="btn-cuaderno2" class="nb-tab-btn" onclick="abrirCuadernoFlotante(2)" title="Taller en Clase — Nota 2">
    📝 Taller en Clase
    <span class="nb-tab-badge" id="nb2-badge"></span>
  </button>
</div>
```
```css
.nb-tabs-top {
  display: flex;
  gap: 8px;
}
.nb-tab-btn {
  position: relative;
  background: linear-gradient(180deg, #fff, #f5f0e0);
  border: 2.5px solid var(--primary);
  border-radius: 10px;
  padding: 6px 14px;
  font-family: var(--font-ui);
  font-size: .78rem;
  color: var(--primary-dark);
  cursor: pointer;
  box-shadow: 0 3px 0 var(--primary-dark);
  transition: .15s;
}
.nb-tab-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 0 var(--primary-dark); }
.nb-tab-badge {
  position: absolute;
  top: -7px; right: -7px;
  background: var(--success);
  color: #fff;
  border-radius: 50%;
  width: 18px; height: 18px;
  font-size: .62rem;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #fff;
}
```
```javascript
// Panel flotante (modal grande) que muestra el cuaderno sin perder el slide actual
function abrirCuadernoFlotante(num) {
  const html = num === 1 ? renderCuaderno1Contenido() : renderCuaderno2Contenido();
  showModalGrande(`
    <div class="nb-modal-header">
      <span>${num === 1 ? '📒 Cuaderno 1 — Teoría' : '📝 Taller en Clase — Nota 2'}</span>
      <button onclick="closeModalGrande()" class="nb-modal-close">✕</button>
    </div>
    ${html}
  `);
}
// Actualizar las insignias (badges) del menú superior según completitud
function actualizarBadgesCuadernos() {
  const b1 = document.getElementById('nb1-badge');
  const b2 = document.getElementById('nb2-badge');
  // la insignia ✓ ahora refleja que el estudiante confirmó "Ya lo copié — Cerrar"
  if (b1) b1.textContent = st.acts['cuaderno1_confirmado'] ? '✓' : '';
  if (b2) b2.textContent = st.acts['cuaderno2_confirmado'] ? '✓' : '';
}
// Llamar actualizarBadgesCuadernos() dentro de updateUI()
```
---
### 📒 CUADERNO 1 — Diseño de AGENDA/HOJA REAL (no genérico) — v6.2
**Objetivo visual (v7.3 — corregido):** que el estudiante sienta que está viendo una página de agenda física bonita — con textura de papel, cinta adhesiva decorativa y fecha tipo agendero — pero **SIN post-its de colores, sin rotaciones ni tarjetas inclinadas, y SIN imágenes ni gráficos de ningún tipo**. La prioridad es que se vea claro y ordenado de un vistazo qué es exactamente lo que hay que copiar: fecha, nombre de la semana (ej. "Semana 3"), título de la clase, y una lista simple de conceptos/definiciones/fórmulas/ejemplos, uno debajo del otro, con letra de tamaño medio y sin espacios de más.
**Reglas de contenido:** el Cuaderno 1 es para definiciones, conceptos clave, fórmulas o la teoría que se requiera de la clase. Debe llevar SIEMPRE la fecha del día visible. No debe ser demasiado corto (que no aporte nada) ni demasiado largo (que abrume) — un punto medio claro y resumido. Debe verse claramente con forma de cuaderno/agenda (no una lista plana), y debe especificar en grande y en negrita que ese contenido se debe copiar en el cuaderno físico del estudiante.
```javascript
function renderCuaderno1Contenido() {
  return `
    <div class="agenda-page">
      <!-- Cinta adhesiva decorativa en la esquina (decoración mínima, no estorba la lectura) -->
      <div class="agenda-tape"></div>
      <!-- Banner grande y en negrita — indica que esto se copia en el cuaderno físico -->
      <div class="cuaderno-copia-banner">
        📌 <strong>COPIA ESTO EN TU CUADERNO</strong>
      </div>
      <!-- Encabezado tipo agenda — SIEMPRE con la fecha del día + nombre de la semana -->
      <!--  v7.3 — SIN imágenes/gráficos en el Cuaderno 1: solo fecha, título y "Semana N" -->
      <div class="agenda-header">
        <div class="agenda-fecha-box">
          <span class="agenda-dia">${new Date().getDate()}</span>
          <span class="agenda-mes">${new Date().toLocaleDateString('es-CO',{month:'short'}).toUpperCase()}</span>
        </div>
        <div>
          <p class="agenda-titulo">${st.tema || 'Mi resumen de la clase'}</p>
          <p class="agenda-sub">Semana ${AUTOR_SEMANA_NUM} · ${AUTOR_MATERIA_FALLBACK} · ${AUTOR_GRADO_FALLBACK}</p>
        </div>
      </div>
      <!--  v7.3 — Conceptos clave: lista LIMPIA, sin imágenes ni post-its —
           título en negrita + definición/concepto/fórmula/ejemplo, uno debajo del otro.
           Letra de tamaño medio (ni muy grande ni muy pequeña) y SIN espacios de más,
           para que se vea claramente que no es mucho texto por copiar. -->
      <div class="agenda-conceptos-lista">
        ${(st.conceptosClase||[]).map((c) => `
          <div class="concepto-item">
            <p class="concepto-titulo">${c.titulo}</p>
            <p class="concepto-texto">${c.definicion}</p>
          </div>
        `).join('')}
      </div>
      <!-- REFLEXIÓN 1 -->
      <div class="agenda-reflexion r1">
        <p class="agenda-reflexion-label">✍️ ¿Qué aprendí hoy?</p>
        <textarea id="reflexion1" placeholder="Escribe con tus propias palabras lo que aprendiste..."
          oninput="guardarReflexion('r1', this.value)" class="agenda-textarea"
        >${st.acts['reflexion_r1']||''}</textarea>
      </div>
      <!-- REFLEXIÓN 2 -->
      <div class="agenda-reflexion r2">
        <p class="agenda-reflexion-label">💭 ¿Qué te gustó más o qué se te dificultó?</p>
        <textarea id="reflexion2" placeholder="Cuéntame qué fue lo más fácil o lo más difícil..."
          oninput="guardarReflexion('r2', this.value)" class="agenda-textarea"
        >${st.acts['reflexion_r2']||''}</textarea>
      </div>
      <!--  v6.6 — Botones de acción: copiar y CERRAR/CONFIRMAR que ya se copió -->
      <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
        <button class="mbtn" style="flex:1;min-width:140px" onclick="copiarCuaderno()">
          📋 Copiar mi cuaderno
        </button>
        <button class="mbtn gd" style="flex:1;min-width:140px" onclick="confirmarCopiaCuaderno(1)">
          ✅ Ya lo copié — Cerrar
        </button>
      </div>
    </div>
  `;
}
// Confirmar que el estudiante ya copió el contenido y cerrar el panel
function confirmarCopiaCuaderno(num) {
  st.acts['cuaderno'+num+'_confirmado'] = true;
  save();
  actualizarBadgesCuadernos();
  closeModalGrande();
  showToast('✅ ¡Listo! Sigamos con la clase');
}
function guardarReflexion(key, valor) {
  st.acts['reflexion_'+key] = valor;
  save();
  actualizarBadgesCuadernos();
  // : NO llama habilitarBtnNext() — el Cuaderno 1 no es un slide y no bloquea nada
}
function copiarCuaderno() {
  const r1 = st.acts['reflexion_r1'] || '(sin escribir)';
  const r2 = st.acts['reflexion_r2'] || '(sin escribir)';
  const txt = `📒 MI CUADERNO — IE SIMÓN BOLÍVAR\n${new Date().toLocaleDateString('es-CO')}\n\n✍️ Qué aprendí hoy:\n${r1}\n\n💭 Lo que me gustó / dificultó:\n${r2}`;
  navigator.clipboard.writeText(txt).then(() => showToast('📋 ¡Cuaderno copiado!'));
}
```
**CSS del banner "copia esto en tu cuaderno" — agregar al `<style>`:**
```css
.cuaderno-copia-banner {
  background: linear-gradient(135deg, #fff3cd, #ffe08a);
  border: 3px solid var(--accent);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 12px;
  text-align: center;
  font-family: var(--font-ui);
  font-size: 1.05rem;
  color: var(--primary-dark);
  box-shadow: 0 3px 0 var(--primary-dark);
}
```
**CSS de la agenda — reemplaza al cuaderno rayado genérico anterior:**
```css
.agenda-page {
  background: #fffdf7;
  background-image:
    linear-gradient(90deg, transparent 0, transparent 38px, rgba(255,123,172,.25) 38px, rgba(255,123,172,.25) 40px, transparent 40px),
    repeating-linear-gradient(transparent, transparent 26px, rgba(180,200,230,.4) 26px, rgba(180,200,230,.4) 27px);
  border-radius: 14px;
  padding: 18px 20px 20px 48px;
  position: relative;
  box-shadow: 0 6px 0 var(--primary-dark), 0 10px 24px rgba(0,0,0,.15);
  border: 1px solid #eee;
  max-height: 70vh;
  overflow-y: auto;
}
.agenda-tape {
  position: absolute;
  top: -10px; right: 30px;
  width: 70px; height: 26px;
  background: repeating-linear-gradient(45deg, rgba(255,209,102,.85), rgba(255,209,102,.85) 6px, rgba(255,193,7,.85) 6px, rgba(255,193,7,.85) 12px);
  transform: rotate(-4deg);
  box-shadow: 0 2px 4px rgba(0,0,0,.15);
  opacity: .9;
}
.agenda-header {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 2px dashed var(--primary-light);
}
.agenda-fecha-box {
  background: var(--primary);
  color: #fff;
  border-radius: 12px;
  width: 56px; height: 56px;
  flex-shrink: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  box-shadow: 0 3px 0 var(--primary-dark);
}
.agenda-dia { font-family: var(--font-ui); font-size: 1.3rem; line-height: 1; }
.agenda-mes { font-size: .6rem; letter-spacing: .05em; opacity: .9; }
.agenda-titulo { font-family: var(--font-ui); font-size: 1.05rem; color: var(--primary-dark); margin-bottom: 2px; }
.agenda-sub { font-size: .72rem; color: var(--muted); font-style: italic; }
/* — .agenda-fotos y .agenda-foto-card YA NO se usan en el Cuaderno 1 (sin imágenes, ver Prioridad 10) — se dejan definidas por si se reutilizan en otro contexto, pero no se referencian en renderCuaderno1Contenido() */
.agenda-fotos { display: flex; gap: 14px; margin-bottom: 14px; flex-wrap: wrap; }
.agenda-foto-card {
  background: #fff;
  padding: 8px 8px 24px;
  box-shadow: 0 2px 6px rgba(0,0,0,.12);
  border-radius: 4px;
  width: 140px;
}
/* — SIN inclinación: fotos derechas, orden limpio (antes tenían rotate()) */
.agenda-foto-card img { width: 100%; height: 90px; object-fit: cover; border-radius: 2px; }
.agenda-foto-card p { font-family: var(--font-ui); font-size: .62rem; text-align: center; color: var(--text2); margin-top: 6px; }
/* — Lista de conceptos LIMPIA y compacta — SIN post-its, SIN imágenes.
   Tamaño de letra MEDIO a propósito (ni muy grande ni muy pequeño) y espaciado
   ajustado, para que se vea de un vistazo que no es mucho texto por copiar. */
.agenda-conceptos-lista {
  display: flex;
  flex-direction: column;
  gap: 8px;              /* 🔺 v7.3: menos separación entre conceptos */
  margin-bottom: 12px;    /* 🔺 v7.3: menos margen general */
}
.concepto-item {
  background: #fff;
  border-left: 5px solid var(--primary);
  border-radius: 0 8px 8px 0;
  padding: 8px 12px;      /* 🔺 v7.3: relleno más ajustado, sin espacio sobrante */
  box-shadow: 0 2px 4px rgba(0,0,0,.06);
}
.concepto-titulo { font-weight: 800; color: var(--primary-dark); margin-bottom: 2px; font-size: .9rem; }  /* tamaño medio */
.concepto-texto { color: var(--text2); line-height: 1.45; font-size: .85rem; }  /* tamaño medio, sin interlineado exagerado */
.agenda-reflexion { border-radius: 12px; padding: 12px; margin-bottom: 10px; }
.agenda-reflexion.r1 { background: #f0f8ff; border: 2px solid var(--primary); }
.agenda-reflexion.r2 { background: #fff8e1; border: 2px solid var(--accent); }
.agenda-reflexion-label { font-family: var(--font-ui); font-size: .85rem; color: var(--primary-dark); margin-bottom: 8px; }
.agenda-textarea {
  width: 100%; min-height: 65px; padding: 8px; border: 2px solid var(--primary-light);
  border-radius: 8px; font-family: var(--font-body); font-size: .82rem; resize: vertical;
  background: #fff; color: var(--text);
}
```
---
### 📝 TALLER EN CLASE (antes "Cuaderno 2") — 4 A 5 EJERCICIOS, ES LA NOTA 2 DE LA CLASE
**Renombrado y actualizado:** lo que antes se llamaba "Cuaderno 2" ahora se llama **"Taller en Clase"** en todos los textos, botones y títulos visibles. Es una actividad **calificada manualmente por el docente** — funciona como una **Nota 2** independiente de la nota automática de los quizzes (Prioridad 3).
**Reglas del Taller en Clase (v6.5 — corregido, SIN escritura en el computador):**
- **4 o 5 ejercicios** exactos, según la complejidad del tema (nunca más de 5, nunca menos de 4)
- Cada ejercicio debe corresponder a algo **ya explicado específicamente en una slide de la clase** — el estudiante debe poder resolverlo porque ya vio cómo se hace
- El enunciado de cada ejercicio debe ser **sintetizado y breve** — evitar contexto largo o innecesario; ir directo a lo que se pide
- Al abrir el panel, debe mostrar un **título grande**: "📝 Taller en Clase — Nota 2"
- Justo debajo del título, en **texto rojo**: "Responde esto en tu cuaderno"
- ** v6.5 — PROHIBIDO** incluir `<textarea>`, `<input>` ni ningún campo donde el estudiante escriba con el teclado. El panel SOLO muestra los 4-5 enunciados de los ejercicios (con su botón de "Ejemplo → Slide X") — el estudiante los resuelve físicamente en su cuaderno de papel, no en el computador
- Es un panel flotante (Prioridad 10) — NUNCA es un slide, nunca bloquea `nextSlide()`, nunca se duplica dentro de una slide
```javascript
// REGLAS DEL TALLER EN CLASE:
// - 4 o 5 ejercicios exactos según complejidad (NUNCA más de 5)
// - Cada ejercicio referencia un slide de ejemplo ya visto
// - Enunciados sintetizados y breves — sin contexto largo
// - Título grande "📝 Taller en Clase — Nota 2" + subtítulo en rojo "Responde esto en tu cuaderno"
// - SOLO lectura: NUNCA lleva textarea/input — el estudiante escribe en su cuaderno físico, no en el PC
function renderCuaderno2Contenido() {
  const ejercicios = CUADERNO2_EJERCICIOS || [];
  return `
    <div class="agenda-page agenda-ejercicios">
      <div class="agenda-tape" style="left:30px;right:auto;background:repeating-linear-gradient(45deg,rgba(129,199,132,.85),rgba(129,199,132,.85) 6px,rgba(76,175,80,.85) 6px,rgba(76,175,80,.85) 12px)"></div>
      <!--  v6.5 — Título grande del taller -->
      <h2 class="taller-titulo-grande">📝 Taller en Clase — Nota 2</h2>
      <!--  v6.5 — Aviso en rojo, justo debajo del título -->
      <p class="taller-aviso-rojo">Responde esto en tu cuaderno</p>
      <div class="agenda-header">
        <div class="agenda-fecha-box" style="background:var(--success)">
          <span class="agenda-dia">✏️</span>
          <span class="agenda-mes">TAREA</span>
        </div>
        <div>
          <p class="agenda-titulo">🖊️ Demuestra lo que aprendiste</p>
          <p class="agenda-sub">${ejercicios.length} ejercicios cortos · iguales a los ejemplos de la clase</p>
        </div>
      </div>
      <!--  v6.5 — SOLO enunciado + botón de ejemplo, SIN textarea ni input de ningún tipo -->
      ${ejercicios.map((ej, i) => `
        <div class="ej-card">
          <div class="ej-card-head">
            <span class="ej-num">${i+1}</span>
            <p class="ej-enunciado">${ej.enunciado}</p>
          </div>
          <button onclick="irASlide(${ej.slideEjemplo})" class="ej-link-ejemplo">
            💡 Ejemplo → Slide ${ej.slideEjemplo}
          </button>
        </div>
      `).join('') || '<p>Ejercicios no definidos</p>'}
      <!--  v6.6 — Botón de cerrar/confirmar que ya se copió el taller -->
      <button class="mbtn gd" style="width:100%;margin-top:12px" onclick="confirmarCopiaCuaderno(2)">
        ✅ Ya lo copié — Cerrar
      </button>
    </div>
  `;
}
// Ir a un slide específico (hipervínculo del taller) — abre dentro del mismo flujo,
// cerrando el modal flotante si estaba abierto desde el menú superior
function irASlide(num) {
  closeModalGrande();
  st.acts['volver_desde'] = st.slide;
  st.slide = num;
  save();
  render();
  showToast(`📍 Viendo el ejemplo — usa "Taller en Clase" en el menú para volver a tu ejercicio`);
}
```
**CSS del título grande y aviso en rojo — agregar al `<style>`:**
```css
.taller-titulo-grande {
  font-family: var(--font-ui);
  font-size: 1.5rem;
  color: var(--primary-dark);
  text-align: center;
  margin-bottom: 4px;
  font-weight: 900;
}
.taller-aviso-rojo {
  color: var(--error);
  font-weight: 900;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 14px;
}
```
**CSS del banner y aviso de Nota 2 — agregar al `<style>`:**
```css
.taller-banner {
  background: linear-gradient(135deg, #fff3cd, #ffe08a);
  border: 3px solid var(--accent);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 12px;
  text-align: center;
  font-family: var(--font-ui);
  font-size: 1.05rem;
  color: var(--primary-dark);
  box-shadow: 0 3px 0 var(--primary-dark);
}
.taller-nota2-aviso {
  background: #fff0f0;
  border: 2px dashed var(--error);
  border-radius: 10px;
  padding: 9px 13px;
  margin-bottom: 14px;
  font-size: .8rem;
  color: var(--text2);
  text-align: center;
}
```
**CSS adicional para las tarjetas de ejercicio:**
```css
.ej-card {
  background: #fff;
  border-radius: 10px;
  border: 3px solid var(--primary-light);
  padding: 12px;
  margin-bottom: 12px;
}
.ej-card-head { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; }
.ej-num {
  background: var(--success); color: #fff; border-radius: 50%;
  width: 26px; height: 26px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-ui); font-size: .85rem;
}
.ej-enunciado { font-size: .88rem; color: var(--text); line-height: 1.7; margin: 0; }
.ej-link-ejemplo {
  background: none; border: 2px solid var(--accent); color: var(--primary-dark);
  border-radius: 8px; padding: 4px 10px; font-family: var(--font-ui);
  font-size: .72rem; cursor: pointer; margin-bottom: 8px; display: inline-block;
}
```
---
### 🪟 MODAL GRANDE PARA CUADERNOS FLOTANTES
```javascript
function showModalGrande(html) {
  let overlay = document.getElementById('modal-grande-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'modal-grande-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:800;display:flex;align-items:center;justify-content:center;padding:20px';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = `
    <div style="background:var(--bg-card);border-radius:18px;max-width:560px;width:100%;
                max-height:88vh;overflow-y:auto;box-shadow:0 12px 40px rgba(0,0,0,.3);
                border:4px solid var(--primary)">
      ${html}
    </div>
  `;
  overlay.style.display = 'flex';
  overlay.onclick = (e) => { if (e.target === overlay) closeModalGrande(); };
}
function closeModalGrande() {
  const overlay = document.getElementById('modal-grande-overlay');
  if (overlay) overlay.style.display = 'none';
}
```
```css
.nb-modal-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 18px; background: var(--primary); color: #fff;
  font-family: var(--font-ui); font-size: 1.05rem;
  border-radius: 14px 14px 0 0;
}
.nb-modal-close {
  background: rgba(255,255,255,.2); border: none; color: #fff;
  border-radius: 8px; width: 30px; height: 30px; cursor: pointer; font-size: 1rem;
}
```
** Nota importante v6.2 sobre el avance obligatorio:** los cuadernos son EXCLUSIVAMENTE paneles flotantes — nunca ocupan lugar en la secuencia de slides, nunca se duplican dentro del contenido de una slide, y nunca bloquean `nextSlide()`. El estudiante puede abrirlos, escribir en ellos o copiarlos en cualquier momento de la clase (incluso repetidamente) sin que eso afecte su avance por las slides. Completarlos se anima con las insignias del navbar (Prioridad 10), pero jamás condiciona el paso de una slide a otra.

## 🔴 PRIORIDAD 10-B · ABSOLUTA — LA NOTA FINAL NO SE MUESTRA SI FALTAN SLIDES POR VER

## ═══════════════════════════════════════
### 🚧 REGLA DE ORO: NO SE PUEDE LLEGAR AL FINAL "SALTANDO" DIRECTO A LOS QUIZZES
Aunque el sistema de bloqueo de la Prioridad 0-C ya impide saltar evaluables y complementarias sin contestar, esta sección agrega una **verificación final de respaldo**: antes de mostrar la pantalla de cierre con la nota, el sistema revisa que TODAS las slides de la clase (no solo las evaluables) hayan sido marcadas como vistas (`st.seen`).
**Excepción v6.1:** esta verificación de recorrido completo aplica SOLO al primer intento (`st.reintentoActivo === false` y `st.vidasUsadas === 0`). Cuando el estudiante está dentro de un reintento dirigido (Prioridad 6-B), NO se le vuelve a exigir haber "visto" todo — ya lo vio en su primer intento; solo se le exige completar los evaluables pendientes.
```javascript
// Llamar esta función ANTES de renderizar rFinal() — en el lugar donde se navega al slide final
function verificarRecorridoCompleto() {
  // NUEVO v6.1 — si el estudiante viene de un reintento, no se vuelve a exigir el recorrido completo
  if (st.reintentoActivo || (st.vidasUsadas||0) > 0) return [];
  const totalSlides = SL.length;
  // El slide final (último índice) no cuenta como "pendiente de ver"
  const slidesAVerificar = SL.slice(0, totalSlides - 1);
  const faltantes = [];
  slidesAVerificar.forEach((s, idx) => {
    if (!st.seen.has(idx)) {
      faltantes.push({ idx, titulo: s.title || `Slide ${idx+1}`, tipo: s.type });
    }
  });
  return faltantes; // array vacío = recorrido completo
}
// Modificar la función de navegación al slide final para interceptar:
function irASlideFinal() {
  const faltantes = verificarRecorridoCompleto();
  if (faltantes.length > 0) {
    mostrarAvisoSlidesFaltantes(faltantes);
    return; // NO mostrar la nota todavía
  }
  // Todo completo — proceder normalmente
  st.slide = SL.length - 1;
  save();
  render();
}
function mostrarAvisoSlidesFaltantes(faltantes) {
  const primera = faltantes[0];
  showModal(`
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:3rem;margin-bottom:10px">📋</div>
      <h2 style="font-family:var(--font-ui);color:var(--primary);font-size:1.15rem;margin-bottom:10px">
        ¡Casi llegas! Te falta ver ${faltantes.length} slide${faltantes.length!==1?'s':''}
      </h2>
      <p style="font-size:.88rem;color:var(--text2);line-height:1.7;margin-bottom:14px">
        Para que tu <strong>nota final</strong> se muestre completa, primero debes pasar por
        <strong>todas las partes de la clase</strong> — no solo por los quizzes.
      </p>
      <div style="background:var(--primary-light);border-radius:10px;padding:10px;margin-bottom:16px;
                  text-align:left;max-height:140px;overflow-y:auto">
        ${faltantes.slice(0,5).map(f => `
          <p style="font-size:.78rem;color:var(--primary-dark);padding:3px 0">
            📍 ${f.titulo}
          </p>
        `).join('')}
        ${faltantes.length > 5 ? `<p style="font-size:.74rem;color:var(--muted)">...y ${faltantes.length-5} más</p>` : ''}
      </div>
      <button class="mbtn" style="width:100%" onclick="closeModal();irASlide(${primera.idx})">
        📍 Ir a "${primera.titulo}" ahora
      </button>
    </div>
  `);
}
```
**Importante:** esta verificación es un respaldo adicional — el bloqueo principal (Prioridad 0-C) ya impide saltar slides una por una. Esta capa extra cubre casos donde el estudiante pudo haber llegado al final por otra vía (ej. recargando la página en un slide avanzado) sin haber completado el recorrido real. En reintentos (Prioridad 6-B), la responsabilidad de "llegar al final" pasa a `st.reintentoPendientes` — cuando esa lista queda vacía, el sistema navega solo a la pantalla final.

## 🔴 PRIORIDAD 10-C · ABSOLUTA — MENÚ DE RUTA COMPACTO, GAMIFICADO Y NO-NAVEGABLE

### 🎮 REGLA DE ORO: SE VE COMO EL HUD DE UN VIDEOJUEGO, NUNCA COMO UNA LISTA LARGA, Y NUNCA SE TOCA PARA SALTAR
**Rediseño completo v7.5:** el viejo sidebar de 272px queda reemplazado por defecto por una **barra compacta de nodos** (estilo "quest tracker" de videojuego), fija y visible, pero mucho más pequeña — libera espacio para que el contenido de la clase sea protagonista. Cada nodo representa una sección con una etiqueta corta y puntual (ej. "Quiz 1", "Sopa", "Final" — nunca frases largas). Aplica sin excepción la Prioridad 0-G: **ningún nodo tiene `onclick` que cambie `st.slide`** — es 100% informativo.
**Reglas visuales del menú:**
- **Slide ya vista** → color completo/vivo, con un check ✅ y un leve brillo — se ve claramente "desbloqueada y superada"
- **Slide actual** → resaltada con pulso/glow, sin necesidad de check todavía
- **Slide NO vista aún** → con un "velo" de transparencia (opacidad baja + un toque de blanco/negro encima) y un ícono de candado 🔒 pequeño — se ve claramente "esperando a ser desbloqueada", nunca a todo color
- **Actividades que SÍ tienen nota** (Quiz 1, Quiz 2, Evaluación Final) → llevan un borde dorado/acento distinto y una pequeña ⭐ — se diferencian de un vistazo de las actividades sin nota
- Etiquetas cortas SIEMPRE (máx. 10-12 caracteres visibles) — el nombre completo puede ir en el `title` HTML (tooltip), nunca ocupando espacio en el nodo
```javascript
// Reutiliza la MISMA estructura de datos que antes (ahora fuente única, sin variante de sidebar/camino separadas)
const SECCIONES_MENU = [
  { nombre: 'Inicio',        rango: [0,0],   nota: false },
  { nombre: 'Concepto 1',    rango: [1,2],   nota: false },
  { nombre: 'Concepto 2',    rango: [3,4],   nota: false },
  { nombre: 'Explorador',    rango: [5,5],   nota: false },
  { nombre: 'Concepto 3',    rango: [6,7],   nota: false },
  { nombre: 'Actividad',     rango: [8,8],   nota: false },
  { nombre: 'Quiz 1',        rango: [9,9],   nota: true  }, // 🔺 lleva nota — se resalta distinto
  { nombre: 'Actividad',     rango: [10,10], nota: false },
  { nombre: 'Concepto 4',    rango: [11,12], nota: false },
  { nombre: 'Actividad',     rango: [13,13], nota: false },
  { nombre: 'Quiz 2',        rango: [14,14], nota: true  }, // 🔺 lleva nota
  { nombre: 'Práctica',      rango: [15,15], nota: false },
  { nombre: 'Curioso',       rango: [16,16], nota: false },
  { nombre: 'Sopa',          rango: [17,17], nota: false },
  { nombre: 'Repaso',        rango: [18,19], nota: false },
  { nombre: 'Final',         rango: [20,21], nota: true  }, // 🔺 Evaluación Final — lleva nota
  { nombre: 'Cierre',        rango: [22,22], nota: false },
];
// Los cuadernos NUNCA aparecen aquí — no son slides (Prioridad 10)
function renderMenuRuta() {
  const totalSlides = SL.length;
  const vistos = st.seen.size;
  const pctTotal = Math.round((vistos/totalSlides)*100);
  const nodos = SECCIONES_MENU.map(sec => {
    const [ini, fin] = sec.rango;
    const idxs = []; for (let i = ini; i <= fin; i++) idxs.push(i);
    const todasVistas = idxs.every(i => st.seen.has(i));
    const esActual     = idxs.includes(st.slide);
    const algunaVista  = idxs.some(i => st.seen.has(i));
    let estadoClase, iconoEstado;
    if (todasVistas)      { estadoClase = 'nodo-visitado'; iconoEstado = '✅'; }
    else if (esActual)    { estadoClase = 'nodo-actual';   iconoEstado = '▶️'; }
    else if (algunaVista) { estadoClase = 'nodo-parcial';  iconoEstado = '🟡'; }
    else                  { estadoClase = 'nodo-pendiente';iconoEstado = '🔒'; }
    const claseNota = sec.nota ? 'nodo-con-nota' : '';
    // 🔺🔺 Prioridad 0-G: JAMÁS onclick que cambie st.slide — solo informativo, cursor:default
    return `
      <div class="menu-nodo ${estadoClase} ${claseNota}" title="${sec.nombre}" style="cursor:default">
        ${sec.nota ? '<span class="nodo-estrella">⭐</span>' : ''}
        <span class="nodo-estado">${iconoEstado}</span>
        <span class="nodo-etiqueta">${sec.nombre}</span>
      </div>
    `;
  }).join('<div class="menu-linea"></div>');
  return `
    <div class="menu-ruta-wrap">
      <div class="menu-ruta-pct" title="Tu avance total">📍 ${pctTotal}%</div>
      <div class="menu-ruta-scroll"><div class="menu-ruta-track">${nodos}</div></div>
    </div>
  `;
}
```
```css
/* — Barra compacta tipo HUD de videojuego, NUNCA una columna lateral de 272px */
.menu-ruta-wrap {
  display: flex; align-items: center; gap: 8px;
  background: var(--bg-sidebar, var(--primary-dark));
  padding: 6px 10px; height: 46px; /* compacta — nunca ocupa media pantalla */
  border-bottom: 3px solid rgba(255,255,255,.15);
}
.menu-ruta-pct {
  flex-shrink: 0; font-family: var(--font-ui); font-size: .72rem; color: #fff;
  background: rgba(255,255,255,.12); border-radius: 20px; padding: 4px 10px;
}
.menu-ruta-scroll { overflow-x: auto; flex: 1; }
.menu-ruta-track { display: flex; align-items: center; gap: 0; min-width: max-content; }
.menu-nodo {
  display: flex; align-items: center; gap: 4px;
  padding: 5px 9px; border-radius: 20px; flex-shrink: 0;
  font-size: .66rem; white-space: nowrap;
  background: rgba(255,255,255,.08); border: 2px solid rgba(255,255,255,.15);
  transition: all .2s;
}
.menu-linea { width: 14px; height: 2px; background: rgba(255,255,255,.2); flex-shrink: 0; }
/* Estado: ya vista — color completo, check, leve brillo */
.menu-nodo.nodo-visitado {
  background: rgba(34,197,94,.28); border-color: var(--success); color: #fff; opacity: 1;
  box-shadow: 0 0 6px rgba(34,197,94,.35);
}
/* Estado: actual — resaltado con pulso */
.menu-nodo.nodo-actual {
  background: var(--accent); border-color: #fff; color: #1a1a1a; font-weight: 800;
  opacity: 1; animation: pulse 1.3s infinite;
}
/* Estado: parcial */
.menu-nodo.nodo-parcial { background: rgba(255,215,0,.18); border-color: #FFD700; color: #fff; opacity: .9; }
/* Estado: pendiente — VELO de transparencia + candado, "esperando a desbloquear" */
.menu-nodo.nodo-pendiente {
  background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.12);
  color: rgba(255,255,255,.45); opacity: .5; filter: grayscale(.4);
}
/* Actividades CON nota — borde dorado + estrella, se diferencian del resto */
.menu-nodo.nodo-con-nota { border-width: 3px; }
.menu-nodo.nodo-con-nota.nodo-pendiente { border-color: rgba(255,215,0,.35); }
.menu-nodo.nodo-con-nota:not(.nodo-pendiente) { border-color: var(--gold, #FFD700); box-shadow: 0 0 8px rgba(255,215,0,.4); }
.nodo-estrella { font-size: .65rem; }
.nodo-estado { font-size: .68rem; }
.nodo-etiqueta { font-family: var(--font-ui); }
```
### 📐 LA PANTALLA SE ADAPTA AL ESPACIO LIBERADO — SIN MÁRGENES VACÍOS
Al quitar la columna lateral de 272px, el contenido de la clase (`#slide-wrap`) debe **usar todo el ancho disponible** — nunca dejar franjas vacías a los costados donde antes vivía el sidebar.
```css
/* — Layout general: navbar arriba, menu-ruta-wrap debajo del navbar, contenido a todo el ancho */
.layout-clase { display: flex; flex-direction: column; height: 100vh; }
#slide-wrap {
  flex: 1; width: 100%; max-width: 900px; /* centrado, con buen margen de lectura, no 100vw sin límite */
  margin: 0 auto; padding: 16px 20px; overflow-y: auto;
}
```
**Checklist:**
```
[ ] El menú de progreso es una barra compacta (≈46px de alto), nunca una columna lateral de 272px
[ ] Etiquetas cortas y puntuales (máx. 10-12 caracteres visibles) — el nombre completo va en el atributo title
[ ] Ningún nodo tiene onclick que cambie st.slide (Prioridad 0-G) — 100% informativo
[ ] Slides ya vistas: color completo + check + brillo. Slides no vistas: veladas (opacidad baja + grayscale) + candado 🔒
[ ] Actividades con nota (Quiz 1, Quiz 2, Evaluación Final) tienen borde dorado + ⭐, distinguibles de un vistazo
[ ] Al quitar el sidebar de 272px, el contenido (#slide-wrap) usa el espacio liberado — sin franjas vacías a los costados
[ ] Los cuadernos NO aparecen en SECCIONES_MENU — no son slides (Prioridad 10)
```

## 🟢 PRIORIDAD 10-D · TÉCNICA — MAPA DE CAMINO TIPO "JUEGO DE MESA" (ALTERNATIVA OPCIONAL, YA NO ES EL VALOR POR DEFECTO)

** v7.5 — Cambio de estado:** el mapa de camino (tablero con casillas y avatar) sigue siendo una opción visual válida, pero **DEJA de ser la recomendación por defecto** — la Prioridad 10-C (menú compacto rediseñado) es ahora el estándar. Si el autor de la clase prefiere usar este mapa de camino en su lugar, DEBE aplicarle la misma regla de la Prioridad 0-G: **quitar el `onclick` de navegación** que tenía en versiones anteriores a v7.5.
```javascript
// PROHIBIDO: el onclick de camino-casilla que existía en versiones previas queda PROHIBIDO.
// ❌ ANTES: `<div class="camino-casilla ..." onclick="${todasVistas||esActual ? `st.slide=${ini};save();render()` : ''}">`
// ✅ AHORA (si se usa este mapa como alternativa): `<div class="camino-casilla ..." style="cursor:default">`
```
Todo lo demás del mapa de camino (casillas ilustradas, avatar/ficha, estados visuales, zigzag) se mantiene igual como referencia de diseño — solo cambia que ya no es clickeable y que ya no es la opción recomendada por defecto (esa es ahora la Prioridad 10-C).

## 🔴 PRIORIDAD 11 · ABSOLUTA — PANTALLA FINAL GAMIFICADA

```javascript
function rFinal() {
  // VERIFICACIÓN OBLIGATORIA — antes de cualquier otra cosa
  const faltantes = verificarRecorridoCompleto();
  if (faltantes.length > 0) {
    mostrarAvisoSlidesFaltantes(faltantes);
    // Renderizar un slide "puente" en lugar de la nota — sin nota visible todavía
    return `
      <div style="text-align:center;padding:40px 20px">
        <div style="font-size:3rem;margin-bottom:10px">🔒</div>
        <p style="font-family:var(--font-ui);color:var(--primary-dark);font-size:1.1rem">
          Completa toda la clase para ver tu nota final
        </p>
      </div>
    `;
  }
  markSeen();
  const t = notaOficial();   // (8-U): la MEJOR nota de todos los intentos, nunca la del último
  const vidasUsadas = st.vidasUsadas || 0;
  const vidasRestantes = MAX_VIDAS - vidasUsadas;
  const nombre = st.name || 'Estudiante';
  const totalPregs = EVAL_CONFIG.quiz1.preguntas + EVAL_CONFIG.quiz2.preguntas + EVAL_CONFIG.evalFinal.preguntas;
  const aciertos = aciertosOficiales();   // (8-U): aciertos del mejor intento
  // Recopilar errores de todos los quizzes
  const errores = [];
  ['quiz1','quiz2','evalFinal'].forEach(qId => {
    const resps = st.acts['quiz_resps_'+qId] || [];
    resps.filter(r=>!r.correcta).forEach(r => {
      errores.push({ quiz: qId, retro: r.retro });
    });
  });
  let msg, emoji, colorNota;
  if (t >= 4.5)      { msg = `🏆 ¡${nombre}, eres una leyenda!`; emoji = '🏆'; colorNota = 'var(--success)'; }
  else if (t >= 3.5) { msg = `🚀 ¡Muy bien, ${nombre}! Sigue así.`; emoji = '🌟'; colorNota = 'var(--success)'; }
  else if (t >= 3.0) { msg = `💪 ¡Bien hecho, ${nombre}! Con un reintento puedes mejorar.`; emoji = '💪'; colorNota = 'var(--warning)'; }
  else               { msg = `📚 No te rindas, ${nombre}. Usa una vida para intentarlo de nuevo.`; emoji = '📚'; colorNota = 'var(--error)'; }
  return `
    <!-- Fuegos artificiales SVG -->
    <svg style="position:fixed;inset:0;pointer-events:none;z-index:500;width:100%;height:100%" viewBox="0 0 600 300">
      ${['#FFD700','#FF6B35','#44B531','#5C94FC','#FF4444','#FF9E00'].map((c,i) => `
        <circle cx="${80+i*90}" cy="${40+Math.sin(i)*40}" r="2" fill="${c}">
          <animate attributeName="r" values="0;15;0" dur="${1.2+i*.2}s" repeatCount="indefinite" begin="${i*.25}s"/>
          <animate attributeName="opacity" values="1;0" dur="${1.2+i*.2}s" repeatCount="indefinite" begin="${i*.25}s"/>
        </circle>
      `).join('')}
    </svg>
    <div style="text-align:center;padding:10px 0 20px">
      <div style="font-size:4rem;margin-bottom:8px;animation:floatY 2s infinite">${emoji}</div>
      <p style="font-family:var(--font-ui);font-size:clamp(1.4rem,3.5vw,2.2rem);
                color:var(--primary-dark);font-weight:900;margin-bottom:4px">¡Misión Completada!</p>
      <p style="font-family:var(--font-body);font-size:clamp(1rem,2.5vw,1.4rem);
                color:var(--text2);font-weight:700;margin-bottom:14px">${nombre}</p>
      <!--  v7.3 — NOTA GIGANTE: mucho más grande y centrada, para verse desde lejos
           (el docente suele mostrar la pantalla del PC a distancia al estudiante) -->
      <div style="background:var(--bg-card);border:6px solid var(--primary);border-radius:24px;
                  padding:28px 36px;display:block;max-width:520px;margin:0 auto 16px;
                  box-shadow:0 10px 0 var(--primary-dark);text-align:center">
        <p style="font-size:1.1rem;font-family:var(--font-ui);color:var(--muted);margin-bottom:6px;letter-spacing:.05em">
          NOTA FINAL
        </p>
        <p style="font-family:var(--font-ui);font-size:clamp(6rem,20vw,11rem);line-height:1;
                  font-weight:900;color:${colorNota};text-shadow:4px 4px 0 rgba(0,0,0,.15);margin:0">
          ${t.toFixed(1)}
        </p>
        <p style="font-size:1.1rem;color:var(--muted);margin-top:6px;font-family:var(--font-ui)">de 5.0</p>
        <p style="font-size:.95rem;color:var(--text2);margin-top:4px">
          ${aciertos} / ${totalPregs} respuestas correctas
        </p>
      </div>
      ${renderAvisoMejorNota()}   <!--  v15.0 (8-U): si el último intento salió más bajo, avisa que la nota se mantiene -->
      <!--  v7.5 — Bloque de vidas PROTAGONISTA, inmediatamente después de la nota (Prioridad 6-C) -->
      ${renderBloqueVidasProtagonista()}
      <!-- Mensaje ByteBot -->
      <div class="mc" style="max-width:480px;margin:0 auto 14px;padding:12px">
        <p style="font-size:.92rem;color:var(--text2);line-height:1.7">${msg}</p>
      </div>
      <!-- RETROALIMENTACIÓN DE ERRORES -->
      ${errores.length > 0 ? `
        <div style="background:var(--primary-light);border-radius:14px;padding:14px;
                    max-width:480px;margin:0 auto 16px;text-align:left">
          <p style="font-family:var(--font-ui);color:var(--primary-dark);font-size:.88rem;margin-bottom:10px">
            📌 Preguntas que fallaste — para que estudies:
          </p>
          ${errores.slice(0,5).map((e,i) => `
            <div style="background:#fff;border-left:3px solid var(--error);border-radius:0 8px 8px 0;
                        padding:8px 10px;margin-bottom:7px">
              <p style="font-size:.75rem;color:var(--error);font-weight:700;margin-bottom:2px">❌ Error ${i+1}</p>
              <p style="font-size:.78rem;color:var(--text2);line-height:1.6">${e.retro||'Revisa el contenido de la clase.'}</p>
            </div>
          `).join('')}
          ${errores.length > 5 ? `<p style="font-size:.72rem;color:var(--muted);text-align:center;margin-top:4px">...y ${errores.length-5} más. Usa una vida para mejorar.</p>` : ''}
        </div>
      ` : `
        <div style="background:#e8fff0;border-radius:14px;padding:12px;max-width:480px;
                    margin:0 auto 16px;border:2px solid var(--success)">
          <p style="font-family:var(--font-ui);color:var(--success);font-size:.9rem">
            🎉 ¡No tuviste errores! Eres increíble, ${nombre}.
          </p>
        </div>
      `}
      <!-- Botones extra -->
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
        <button class="mbtn gd" onclick="save();syncIndex();showToast('✅ Nota guardada')">
          💾 Guardar nota
        </button>
        <button class="mbtn" onclick="st.slide=0;save();render()">
          🔁 Repasar clase
        </button>
      </div>
    </div>
  `;
}
```

---

# 18 · Identidad visual, scroll, modo foco, cultura pop, contexto local, gamificación

## 🟠 PRIORIDAD 12 · ALTA — IDENTIDAD VISUAL TEMÁTICA (PALETA CLARA Y VIVA)

**Esta sección se rige por las reglas estrictas y verificables de la Prioridad Absoluta 0-E y 0-F (luminosidad mínima, prohibición de fondos oscuros y rotación de temas).** Usar siempre la tabla de paletas corregidas de la 0-E como fuente de los valores exactos — nunca inventar un `--primary-light` o `--bg-main` sin pasar la prueba de luminosidad ≥85-90%.
```css
:root {
  --tema-nombre:    "[UNIVERSO — diferente al de la clase anterior, ver 0-F]";
  --primary:        [COLOR_PRINCIPAL_VIVO — tomar de la tabla 0-E];
  --primary-light:  [VERSIÓN_MUY_CLARA — luminosidad ≥88%];
  --primary-dark:   [VERSIÓN_OSCURA — solo para texto y sombras, NUNCA para fondos grandes];
  --accent:         [COLOR_SECUNDARIO];
  --accent2:        [TERCER_COLOR];
  --bg-main:        [FONDO_CLARO — luminosidad ≥90%, tomar de la tabla 0-E];
  --bg-card:        #FFFFFF;
  --bg-sidebar:     [SIDEBAR — única zona donde se permite oscuro, con texto blanco/amarillo];
  --text:           #2B1A00;
  --text2:          #5C3A00;
  --muted:          #888888;
  --font-title:     '[FUENTE_DISPLAY]', sans-serif;
  --font-body:      'Nunito', sans-serif;
  --font-ui:        'Fredoka One', cursive;
  --success:        #22C55E;
  --error:          #EF4444;
  --warning:        #F59E0B;
  --gold:           #FFD700;
  --radius:         14px;
  --shadow:         0 4px 20px rgba(0,0,0,0.12);
}
```

## 🟠 PRIORIDAD 12-B · ALTA — BARRA DE DESPLAZAMIENTO VISIBLE Y FÁCIL DE USAR

### 📜 REGLA DE ORO: EL SCROLL NUNCA DEBE SER INVISIBLE O DIFÍCIL DE AGARRAR
Se detectó que en algunas clases la barra de desplazamiento vertical del contenedor principal (`#slide-wrap`) casi no se ve — muy delgada, del mismo color que el fondo, o sin contraste. Debe ser gruesa, con color del tema, y fácil de tomar con el mouse o el dedo (en pantallas táctiles).
```css
/* Aplicar SIEMPRE al contenedor principal de scroll (#slide-wrap o equivalente) */
#slide-wrap {
  scrollbar-width: auto;              /* Firefox: nunca "thin" en el contenedor principal */
  scrollbar-color: var(--primary) var(--primary-light);
}
#slide-wrap::-webkit-scrollbar {
  width: 14px;                        /* suficientemente ancha para agarrar fácil */
}
#slide-wrap::-webkit-scrollbar-track {
  background: var(--primary-light);
  border-radius: 10px;
}
#slide-wrap::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 10px;
  border: 3px solid var(--primary-light); /* efecto "flotante" que resalta el thumb */
}
#slide-wrap::-webkit-scrollbar-thumb:hover {
  background: var(--primary-dark);
}
```
**Checklist:**
```
[ ] La barra de scroll del contenedor principal es gruesa (≥12px) y con color contrastante del tema
[ ] scrollbar-color (Firefox) y ::-webkit-scrollbar (Chrome/Edge) están ambos definidos
[ ] La barra se distingue claramente del fondo en cualquiera de las paletas de la tabla 0-E
```

## 🟠 PRIORIDAD 13 · ALTA — MODO FOCO AMABLE

```javascript
function setupModoFoco() {
  let _blurTimer = null;
  let fueraCount = 0;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      fueraCount++;
      _blurTimer = setTimeout(() => mostrarMsgFoco(fueraCount), 2000);
    } else {
      clearTimeout(_blurTimer);
    }
  });
  window.addEventListener('blur', () => {
    _blurTimer = setTimeout(() => mostrarMsgFoco(fueraCount), 2500);
  });
  window.addEventListener('focus', () => clearTimeout(_blurTimer));
}
function mostrarMsgFoco(n) {
  // : nunca compite con la retroalimentación de un quiz — usa la cola de 8-Q, así que en la
  // práctica esto ya no puede "perder" al estudiante ninguna retroalimentación; se muestra en orden.
  const nombre = st.name || 'campeón';
  const msgs = [
    { emoji:'👋', titulo:`¡Hola de nuevo, ${nombre}!`,
      msg:'Notamos que saliste un momento. ¡La clase sigue aquí esperándote! Tu progreso ya se guardó automáticamente.' },
    { emoji:'🌟', titulo:'¡Bienvenido de vuelta!',
      msg:`Ya van ${n} salidas registradas — el profe puede verlo. ¡Vamos, tú puedes concentrarte! 💪` },
    { emoji:'🤝', titulo:'¡Ánimo!',
      msg:`${n} salidas registradas. Termina la clase y demuestra lo que sabes. ¡Ya casi acabas!` }
  ];
  const m = msgs[Math.min(n-1, msgs.length-1)];
  showModal(`
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:3rem;margin-bottom:8px">${m.emoji}</div>
      <h2 style="font-family:var(--font-ui);color:var(--primary);font-size:1.2rem;margin-bottom:10px">${m.titulo}</h2>
      <p style="font-size:.9rem;color:var(--text2);line-height:1.7;margin-bottom:16px">${m.msg}</p>
      <button class="mbtn" onclick="closeModal()" style="width:100%;font-size:1rem;padding:12px">
        ✅ ¡Entendido! Volver a la clase
      </button>
    </div>
  `);
}
```

## 🟠 PRIORIDAD 14 · ALTA — CULTURA POP EN CADA SLIDE

```html
<!-- OBLIGATORIO antes de cada actividad -->
<details class="dyk">
  <summary>💡 ¿Sabías que…? (pista)</summary>
  <p>[CONCEPTO] es como [REFERENCIA_CULTURAL]: [EXPLICACIÓN en 1-2 oraciones]</p>
</details>
```
Mínimo 5 referencias distintas: Free Fire / Fortnite / Roblox / Among Us / Minecraft / TikTok / YouTube / Bad Bunny / Karol G / Barcelona / Selección Colombia / Encanto / Spider-Man / Dragon Ball.

## 🟠 PRIORIDAD 14-B · ALTA — CONTEXTO LOCAL DE CÚCUTA, NORTE DE SANTANDER

### 🏙️ REGLA DE ORO: LA CLASE TAMBIÉN SE VE, SE USA O SE VIVE EN CÚCUTA
Además de las referencias de cultura pop (Prioridad 14), algunas analogías, ejemplos o situaciones de los ejercicios deben usar **lugares y cosas reales de Cúcuta, Norte de Santander** — para que el estudiante reconozca su propia ciudad en la clase, no solo referencias genéricas de internet.
```html
<!-- Ejemplo de uso — en un ejemplo resuelto (Prioridad 0-B) o en un enunciado de quiz/práctica (Prioridad 2) -->
<p style="font-size:.82rem;color:var(--text2);margin-top:6px">
  📍 Como cuando vas al <strong>Ventura Plaza</strong>: [ANALOGÍA BREVE en 1 línea]
</p>
```
**Catálogo de lugares y referencias locales — usar mínimo 2-3 a lo largo de la clase, en ejemplos, enunciados de ejercicios o analogías (nunca forzado en todos los slides):**
```
Centros comerciales:  Ventura Plaza, Jardín Plaza, Unicentro Cúcuta, Alejandría, Bochalema Plaza
Lugares emblemáticos: El Malecón (ribera del río Pamplonita), Parque Colón, Puente Internacional
                      Simón Bolívar, Catedral San José, Torre del Reloj
Naturaleza/geografía: Río Zulia, Río Pamplonita, Área Metropolitana de Cúcuta, Cerro Tasajero
Cultura/tradición:    Feria Internacional de Cúcuta, Salsa y música vallenata en la región,
                      gastronomía nortesantandereana (mute, pastel de garbanzo, hayaca santandereana)
Deporte local:        Cúcuta Deportivo
```
**Reglas del uso de contexto local:**
- Se usa como analogía o como parte del ENUNCIADO de un ejercicio/ejemplo (ej. un problema de matemáticas ambientado en "si en el Ventura Plaza..."), nunca como dato forzado sin relación con el contenido
- No reemplaza las referencias de cultura pop (Prioridad 14) — ambas conviven, mínimo 2-3 menciones locales por clase además de las 5 de cultura pop
- Debe sentirse natural y reconocible para un estudiante de Cúcuta — nunca forzado ni genérico ("una ciudad colombiana" no cuenta, debe ser el lugar real y nombrado)
**Checklist:**
```
[ ] Al menos 2-3 referencias a lugares reales de Cúcuta/Norte de Santander a lo largo de la clase
[ ] Las referencias se usan en analogías o enunciados de ejercicios, con relación real al contenido
[ ] Conviven con las referencias de cultura pop (Prioridad 14) — no las reemplazan
```

## 🟠 PRIORIDAD 15 · ALTA — GAMIFICACIÓN

- XP con barra animada (gainPts, showFPts) — el XP no afecta la nota
- 5 badges/medallas con condiciones reales
- Sistema de avatar SVG inline con piezas desbloqueables
- Nivel basado en XP con título del tema visual
- Toast de celebración al ganar badge
```javascript
// GANCHO OBLIGATORIO: cada vez que se otorga una medalla nueva en esta clase,
// también debe registrarse en la vitrina acumulada entre semanas (Prioridad 20)
function otorgarBadge(badgeId, nombreBadge, emojiBadge) {
  if (st.badges.includes(badgeId)) return; // ya la tenía, no repetir
  st.badges.push(badgeId);
  save();
  showToast(`🏅 ¡Medalla desbloqueada: ${nombreBadge}!`);
  registrarLogroAcumulado(badgeId, nombreBadge, emojiBadge); // ver Prioridad 20
}
```

---

# 19 · Panel docente unificado y menú superior de herramientas

## 🟠 PRIORIDAD 16 · ALTA — PANEL DOCENTE UNIFICADO

 
### 🕵️ DESCRIPCIÓN GENERAL
 
El Panel Docente es un modal de control total al que SOLO accede el docente. Es INVISIBLE para los
estudiantes. No existe ningún botón, ícono, tooltip, cursor especial ni pista visual que delate su
existencia. El acceso es por clave de 7 dígitos escrita con el teclado físico del computador.
 
---
 
### 🔑 SISTEMA DE ACTIVACIÓN OCULTA — IMPLEMENTACIÓN EXACTA
 
**Punto de activación:** La letra **ℒ** (tipografía `UnifrakturMaguntia` o `'Old English Text MT'`,
importada desde Google Fonts) ubicada en el extremo izquierdo del navbar. En reposo visual esta
letra es indistinguible del resto del título de la clase — mismo color blanco, sin cursor pointer,
sin hover effect, sin ningún atributo `title`.
 
```javascript
// ═══ VARIABLES GLOBALES ═══
const CLAVE_DOCENTE = '{{CLAVE_PANEL_DOCENTE}}';
let pd_escuchando = false;
let pd_buffer = '';
let pd_timerInterval = null;
let pd_secsLeft = 0;
 
// ═══ HTML DE LA "L" EN EL NAVBAR (pegar dentro del nav, a la izquierda) ═══
// <span id="secret-L" style="
// font-family:'UnifrakturMaguntia',serif;
// font-size:2.1rem; color:#fff; line-height:1;
// cursor:default; user-select:none; padding:2px 7px;
// -webkit-font-smoothing:antialiased;
// ">ℒ</span>
// <span id="pd-key-ind" style="display:none;font-size:.68rem;color:rgba(255,255,255,.8);
// background:rgba(0,0,0,.3);border-radius:6px;padding:2px 9px;letter-spacing:3px;
// font-weight:900;font-family:var(--font-ui)"></span>
// <span id="pd-listen-timer" style="display:none;font-size:.65rem;
// color:rgba(255,255,255,.6);font-family:var(--font-ui)"></span>
 
// ═══ LÓGICA DE ACTIVACIÓN ═══
document.getElementById('secret-L').addEventListener('click', pd_activar);
 
function pd_activar() {
if (pd_escuchando) return;
pd_escuchando = true;
pd_buffer = '';
pd_secsLeft = 8;
 
// Feedback visual MUY sutil solo durante la espera
document.getElementById('pd-key-ind').style.display = 'inline-block';
document.getElementById('pd-listen-timer').style.display = 'inline-block';
document.getElementById('pd-key-ind').textContent = '○'.repeat(CLAVE_DOCENTE.length);
document.getElementById('pd-listen-timer').textContent = pd_secsLeft + 's';
 
pd_timerInterval = setInterval(() => {
pd_secsLeft--;
document.getElementById('pd-listen-timer').textContent = pd_secsLeft + 's';
if (pd_secsLeft <= 0) pd_desactivar(false);
}, 1000);
 
document.addEventListener('keydown', pd_onKey);
}
 
function pd_desactivar(exito) {
pd_escuchando = false;
pd_buffer = '';
clearInterval(pd_timerInterval);
document.removeEventListener('keydown', pd_onKey);
document.getElementById('pd-key-ind').style.display = 'none';
document.getElementById('pd-listen-timer').style.display = 'none';
if (exito) pd_abrirPanel('stats'); // abre en tab Stats por defecto
}
 
function pd_onKey(e) {
if (!pd_escuchando) return;
if (e.key >= '0' && e.key <= '9') {
pd_buffer += e.key;
const n = pd_buffer.length;
const max = CLAVE_DOCENTE.length;
document.getElementById('pd-key-ind').textContent =
'●'.repeat(n) + '○'.repeat(Math.max(0, max - n));
if (pd_buffer.length >= max) {
pd_desactivar(pd_buffer === CLAVE_DOCENTE);
// Si es incorrecta: pd_desactivar(false) → silencio total, sin toast, sin alerta
}
} else if (e.key === 'Backspace') {
pd_buffer = pd_buffer.slice(0, -1);
const n = pd_buffer.length;
document.getElementById('pd-key-ind').textContent =
'●'.repeat(n) + '○'.repeat(Math.max(0, CLAVE_DOCENTE.length - n));
} else if (e.key === 'Escape') {
pd_desactivar(false);
}
}
```
 
**REGLAS de la activación:**
- Solo funciona si: (1) clic en la zona `#secret-L` Y (2) se escribe la clave completa con el teclado físico en los siguientes 8 segundos
- Si escribe mal → silencio total. Sin mensajes de error. Sin alertas. El sistema no se delata
- Después de 8 segundos sin completar → se desactiva la escucha. Hay que volver a hacer clic
- La letra `ℒ` NO tiene cursor:pointer, NO tiene :hover, NO tiene title=""
 
---
 
### 🎨 DISEÑO DEL PANEL — ESTÉTICA DEATH NOTE
 
El panel usa una estética inspirada en Death Note: fondo negro profundo, detalles en rojo sangre
y dorado. Es un modal flotante con scroll interno. No hay nada de esto visible en la UI del
estudiante; el overlay se superpone sobre la clase.
 
```css
/* ── Fuente requerida (agregar al <head>) ── */
/* <link href="https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Orbitron:wght@700;900&display=swap" rel="stylesheet"> */
 
/* ── Variables del panel (no afectan al tema de la clase) ── */
:root {
--dn-bg: #0d0d14;
--dn-bg2: #12121c;
--dn-red: #c0392b;
--dn-red-bright: #e74c3c;
--dn-gold: #d4a017;
--dn-gold-bright: #f5c842;
--dn-text: #e8e0d0;
--dn-text2: #9a9080;
--dn-border: rgba(192,57,43,.3);
--dn-border-gold: rgba(212,160,23,.25);
--dn-card: #14141f;
}
 
/* ── Overlay ── */
#pd-overlay {
display: none; position: fixed; inset: 0;
background: rgba(0,0,0,.82); z-index: 9000;
backdrop-filter: blur(5px);
align-items: center; justify-content: center;
}
#pd-overlay.visible { display: flex; }
 
/* ── Contenedor principal ── */
#pd-panel {
background: var(--dn-bg);
border: 1.5px solid var(--dn-red);
border-radius: 18px;
width: min(95vw, 640px);
max-height: 92vh;
overflow: hidden;
display: flex; flex-direction: column;
box-shadow: 0 0 50px rgba(192,57,43,.25), 0 0 100px rgba(0,0,0,.7);
animation: pdEntrada .4s cubic-bezier(.175,.885,.32,1.275);
}
@keyframes pdEntrada {
from { opacity:0; transform: scale(.86) translateY(-24px); }
to { opacity:1; transform: scale(1) translateY(0); }
}
 
/* ── Header ── */
.pd-header {
background: linear-gradient(160deg, #160404 0%, #1a0606 40%, #0e0e1c 100%);
border-bottom: 1.5px solid var(--dn-red);
padding: 18px 22px 16px; flex-shrink: 0; position: relative; overflow: hidden;
}
.pd-header::before {
content: ''; position: absolute; inset: 0;
background: repeating-linear-gradient(-48deg, transparent, transparent 22px,
rgba(192,57,43,.04) 22px, rgba(192,57,43,.04) 44px);
pointer-events: none;
}
.pd-header-row { display:flex; align-items:flex-start; gap:14px; position:relative; }
.pd-L-deco {
font-family: 'UnifrakturMaguntia',serif;
font-size: 4.2rem; line-height:.95; color: var(--dn-red);
text-shadow: 0 0 24px rgba(192,57,43,.5); flex-shrink:0; margin-top:2px;
}
.pd-eyebrow {
font-size:.58rem; color:var(--dn-red); letter-spacing:4px;
text-transform:uppercase; font-weight:900; margin-bottom:3px;
}
.pd-main-title {
font-family:'Orbitron',sans-serif; font-size:1.05rem;
color:var(--dn-text); font-weight:900; line-height:1.25; margin-bottom:5px;
}
.pd-sub { font-size:.7rem; color:var(--dn-text2); line-height:1.5; }
 
/* ── Quick stats en el header ── */
.pd-quick-stats {
display:grid; grid-template-columns:repeat(5,1fr); gap:8px; margin-top:14px;
}
.pd-qs-item {
background:rgba(0,0,0,.35); border:1px solid var(--dn-border);
border-radius:9px; padding:7px 6px 6px; text-align:center;
}
.pd-qs-val {
font-family:'Orbitron',sans-serif; font-size:.88rem;
color:var(--dn-gold-bright); font-weight:900; display:block;
}
.pd-qs-lbl {
font-size:.55rem; color:var(--dn-text2); text-transform:uppercase;
letter-spacing:.5px; display:block; margin-top:2px;
}
 
/* ── Tabs ── */
.pd-tabs {
display:flex; background:var(--dn-bg2);
border-bottom:1.5px solid var(--dn-border); flex-shrink:0; overflow-x:auto;
}
.pd-tab {
flex:1; min-width:72px; padding:11px 8px 10px;
font-size:.7rem; font-weight:700; color:var(--dn-text2);
border:none; background:transparent; cursor:pointer;
border-bottom:2.5px solid transparent; transition:color .2s, border-color .2s;
text-align:center; display:flex; flex-direction:column; align-items:center; gap:3px;
}
.pd-tab:hover { color:var(--dn-text); }
.pd-tab.active { color:var(--dn-gold-bright); border-bottom-color:var(--dn-gold-bright); }
 
/* ── Área scrollable ── */
.pd-body {
flex:1; overflow-y:auto; padding:18px 20px;
scrollbar-width:thin; scrollbar-color:var(--dn-red) var(--dn-bg2);
}
 
/* ── Paneles de tab ── */
.pd-panel { display:none; }
.pd-panel.active { display:block; }
 
/* ── Section title ── */
.pd-section {
font-size:.6rem; color:var(--dn-red); letter-spacing:3px;
text-transform:uppercase; font-weight:900;
margin:16px 0 10px; display:flex; align-items:center; gap:8px;
}
.pd-section:first-child { margin-top:0; }
.pd-section::after { content:''; flex:1; height:1px; background:var(--dn-border); }
 
/* ── Tool cards ── */
.pd-card {
background:var(--dn-card); border:1px solid var(--dn-border-gold);
border-radius:12px; padding:13px 14px; margin-bottom:10px;
}
.pd-card:last-child { margin-bottom:0; }
.pd-card-head { display:flex; align-items:center; gap:9px; margin-bottom:6px; }
.pd-card-ico { font-size:1.3rem; flex-shrink:0; }
.pd-card-title { font-size:.82rem; color:var(--dn-text); font-weight:900; }
.pd-card-desc { font-size:.7rem; color:var(--dn-text2); line-height:1.5; margin-bottom:10px; }
 
/* ── Botones ── */
.pd-btn {
display:inline-flex; align-items:center; justify-content:center; gap:6px;
border:none; border-radius:9px; padding:9px 16px;
font-family:var(--font-ui); font-size:.76rem; font-weight:900;
cursor:pointer; transition:filter .15s, transform .1s; width:100%;
}
.pd-btn:active { transform:translateY(1px); }
.pd-btn-red { background:linear-gradient(135deg,#c0392b,#7a1c1c); color:#fff; box-shadow:0 3px 0 #5a0000; }
.pd-btn-red:hover { filter:brightness(1.18); }
.pd-btn-gold { background:linear-gradient(135deg,#c9940f,#996b08); color:#fff8e8; box-shadow:0 3px 0 #6b4500; }
.pd-btn-gold:hover { filter:brightness(1.2); }
.pd-btn-ghost { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); color:var(--dn-text); }
.pd-btn-ghost:hover { background:rgba(255,255,255,.11); }
.pd-btn-outline-red { background:transparent; border:1px solid var(--dn-red); color:#e74c3c; }
.pd-btn-outline-red:hover { background:rgba(192,57,43,.13); }
.pd-btn-sm { padding:7px 12px; font-size:.7rem; width:auto; flex:1; }
 
/* ── Select ── */
.pd-select {
width:100%; background:rgba(255,255,255,.05);
border:1px solid var(--dn-border-gold); border-radius:8px;
color:var(--dn-text); padding:8px 12px; font-family:var(--font-ui);
font-size:.76rem; margin-bottom:9px; appearance:none; cursor:pointer;
}
.pd-select option { background:#1a1a2e; }
 
/* ── Stats table ── */
.pd-stats-table { width:100%; border-collapse:collapse; }
.pd-stats-table tr { border-bottom:1px solid rgba(255,255,255,.06); }
.pd-stats-table tr:last-child { border-bottom:none; }
.pd-stats-table td { padding:8px 4px; font-size:.78rem; }
.pd-stats-table td:first-child { color:var(--dn-text2); }
.pd-stats-table td:last-child { color:var(--dn-text); text-align:right; font-weight:900; }
.pd-val-good { color:#27ae60 !important; }
.pd-val-warn { color:var(--dn-gold-bright) !important; }
.pd-val-bad { color:#e74c3c !important; }
.pd-val-muted { color:var(--dn-text2) !important; font-weight:400 !important; font-style:italic; }
 
/* ── Nota bar ── */
.pd-nota-bar-wrap {
background:rgba(255,255,255,.06); border-radius:20px; height:7px;
overflow:hidden; margin-top:4px;
}
.pd-nota-bar {
height:100%; border-radius:20px;
background:linear-gradient(90deg,var(--dn-red),var(--dn-gold-bright));
transition:width .6s ease;
}
 
/* ── Salidas / Foco ── */
.pd-salidas-list {
max-height:180px; overflow-y:auto; scrollbar-width:thin;
scrollbar-color:var(--dn-red) var(--dn-card);
}
.pd-salida-item {
display:flex; justify-content:space-between;
padding:4px 0; border-bottom:1px solid rgba(255,255,255,.05);
font-size:.68rem; color:var(--dn-text2);
}
.pd-salida-item span:last-child { color:var(--dn-text); }
 
/* ── Foco stats grid ── */
.pd-foco-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px; }
.pd-foco-stat {
background:var(--dn-card); border:1px solid var(--dn-border-gold);
border-radius:10px; padding:10px; text-align:center;
}
.pd-foco-val { font-family:'Orbitron',sans-serif; font-size:1.3rem; color:#e74c3c; font-weight:900; }
.pd-foco-lbl { font-size:.62rem; color:var(--dn-text2); text-transform:uppercase; margin-top:3px; }
 
/* ── Admin mode card ── */
.pd-admin-card {
background:linear-gradient(135deg,#1c0f00,#221000);
border:1.5px solid var(--dn-gold); border-radius:14px;
padding:15px; margin-bottom:12px; position:relative; overflow:hidden;
}
.pd-admin-card::before {
content:'◈ MODO ADMINISTRADOR ◈';
position:absolute; top:0; left:0; right:0; text-align:center;
font-size:.54rem; letter-spacing:3.5px; color:var(--dn-gold);
background:rgba(212,160,23,.1); padding:4px 0;
border-bottom:1px solid rgba(212,160,23,.2);
}
.pd-admin-inner { display:flex; align-items:flex-start; gap:12px; margin-top:18px; }
.pd-admin-title { font-family:'Orbitron',sans-serif; font-size:.78rem; color:var(--dn-gold-bright); font-weight:900; margin-bottom:4px; }
.pd-admin-desc { font-size:.7rem; color:var(--dn-text2); line-height:1.55; margin-bottom:8px; }
.pd-admin-status {
display:inline-flex; align-items:center; gap:5px;
background:rgba(212,160,23,.12); border:1px solid rgba(212,160,23,.3);
border-radius:20px; padding:3px 10px; font-size:.62rem;
color:var(--dn-gold-bright); font-weight:700; margin-bottom:9px;
}
.pd-admin-status.on { background:rgba(212,160,23,.28); }
 
/* ── Timer ── */
.pd-timer-display {
font-family:'Orbitron',sans-serif; font-size:2.1rem;
color:var(--dn-gold-bright); text-align:center; letter-spacing:5px;
padding:11px; background:rgba(0,0,0,.3); border-radius:10px;
margin-bottom:9px; border:1px solid var(--dn-border-gold); transition:color .3s;
}
.pd-timer-display.red { color:#e74c3c; }
.pd-timer-presets { display:grid; grid-template-columns:repeat(4,1fr); gap:6px; margin-bottom:8px; }
.pd-timer-actions { display:grid; grid-template-columns:1fr 1fr; gap:6px; }
 
/* ── Pregunta oral ── */
#pd-pregunta {
background:rgba(255,255,255,.04); border:1px dashed var(--dn-border-gold);
border-radius:10px; padding:11px 13px;
font-size:.78rem; color:var(--dn-text2); font-style:italic;
line-height:1.6; min-height:54px; margin-bottom:9px; transition:color .3s, border-color .3s;
}
#pd-pregunta.loaded { color:var(--dn-gold-bright); border-color:rgba(212,160,23,.45); font-style:normal; }
 
/* ── Footer ── */
.pd-footer {
border-top:1px solid var(--dn-border); padding:11px 20px;
background:rgba(0,0,0,.25); flex-shrink:0;
display:flex; align-items:center; justify-content:space-between; gap:10px;
}
.pd-footer-note { font-size:.6rem; color:var(--dn-text2); }
.pd-footer-note::before { content:'🔒 '; }
 
/* ── Badge Admin en navbar ── */
#pd-admin-badge {
display:none; align-items:center; gap:5px;
background:var(--dn-gold-bright); color:#000;
border-radius:20px; padding:3px 11px;
font-size:.63rem; font-weight:900;
}
#pd-admin-badge.active { display:flex; }
```
 
---
 
### 🏗️ HTML DEL PANEL COMPLETO — FUNCIÓN buildPanelDocente()
 
```javascript
// ═══ ESTADO GLOBAL REQUERIDO EN EL OBJETO st ═══
// st.modoAdmin = false; // ← agregar al objeto st si no existe
 
// ═══ VARIABLE DE TAB ACTIVO ═══
let pd_activeTab = 'stats';
 
// ═══ ABRIR PANEL ═══
function pd_abrirPanel(tab) {
if (tab) pd_activeTab = tab;
const ov = document.getElementById('pd-overlay');
ov.innerHTML = pd_buildPanel();
ov.classList.add('visible');
document.body.style.overflow = 'hidden';
}
 
// ═══ CERRAR PANEL ═══
function pd_cerrarPanel() {
const ov = document.getElementById('pd-overlay');
ov.classList.remove('visible');
ov.innerHTML = '';
document.body.style.overflow = '';
clearInterval(window._pd_timerInt);
}
 
// ═══ CERRAR AL HACER CLIC EN EL OVERLAY ═══
// (agregar al overlay en el HTML)
// onclick="if(event.target===this) pd_cerrarPanel()"
 
// ═══ BUILD HTML ═══
function pd_buildPanel() {
const vidas = MAX_VIDAS - (st.vidasUsadas || 0); // 🔺 v11.1 (Prioridad 8-M): usar SIEMPRE MAX_VIDAS, nunca un 3 fijo
const progPct = Math.round(((st.slideActual||0) / (st.totalSlides||1)) * 100);
const nota = (st.nota || 0).toFixed(1);
const notaPct = Math.round(((st.nota||0) / 5.0) * 100);
const totalSal = (st.salidas||[]).length;
 
const tabs = [
{ id:'stats', ico:'📊', lbl:'Stats' },
{ id:'respuestas', ico:'📋', lbl:'Respuestas' },
{ id:'reset', ico:'♻️', lbl:'Reset' },
{ id:'herramientas', ico:'🛠️', lbl:'Herramientas' },
{ id:'foco', ico:'👁️', lbl:'Foco' },
];
 
const tabsHtml = tabs.map(t =>
`<button class="pd-tab ${pd_activeTab===t.id?'active':''}"
onclick="pd_switchTab('${t.id}')">
<span style="font-size:.95rem">${t.ico}</span>${t.lbl}
</button>`
).join('');
 
// ── CONTENIDO TAB STATS ──
const tabStats = `
<div class="pd-section">Información del estudiante</div>
<div class="pd-card">
<table class="pd-stats-table">
<tr><td>👤 Estudiante</td><td>${st.nombre||'—'}</td></tr>
<tr><td>🏫 Grupo</td><td>${st.grupo||'—'}</td></tr>
<tr><td>⭐ Nota</td>
<td class="${(st.nota||0)>=3.5?'pd-val-good':(st.nota||0)>=3.0?'pd-val-warn':'pd-val-bad'}">${nota}/5.0</td></tr>
</table>
<div class="pd-nota-bar-wrap"><div class="pd-nota-bar" style="width:${notaPct}%"></div></div>
</div>
<div class="pd-section">Desempeño</div>
<div class="pd-card">
<table class="pd-stats-table">
<tr><td>✅ Aciertos totales</td>
<td class="${(st.aciertos||0)>0?'pd-val-good':'pd-val-muted'}">${st.aciertos||0}/${st.totalPregs||30}</td></tr>
<tr><td>📝 Quiz 1 (${(st.quiz1||{total:8}).total} preg.)</td>
<td class="${((st.quiz1||{}).correctas||0)>0?'pd-val-good':'pd-val-muted'}">${((st.quiz1||{}).correctas||0)>0?(st.quiz1.correctas+'/'+st.quiz1.total):'pend.'}</td></tr>
<tr><td>📝 Quiz 2 (${(st.quiz2||{total:8}).total} preg.)</td>
<td class="${((st.quiz2||{}).correctas||0)>0?'pd-val-good':'pd-val-muted'}">${((st.quiz2||{}).correctas||0)>0?(st.quiz2.correctas+'/'+st.quiz2.total):'pend.'}</td></tr>
<tr><td>🏆 Eval. Final (${(st.evalFinal||{total:14}).total} preg.)</td>
<td class="${((st.evalFinal||{}).correctas||0)>0?'pd-val-good':'pd-val-muted'}">${((st.evalFinal||{}).correctas||0)>0?(st.evalFinal.correctas+'/'+st.evalFinal.total):'pend.'}</td></tr>
<tr><td>❤️ Vidas usadas</td>
<td class="${(st.vidasUsadas||0)===0?'pd-val-good':(st.vidasUsadas||0)<=2?'pd-val-warn':'pd-val-bad'}">${st.vidasUsadas||0}/${MAX_VIDAS}</td></tr>
<tr><td>📍 Slide actual</td><td>${st.slideActual||0}/${st.totalSlides||0}</td></tr>
<tr><td>👁️ Salidas foco</td>
<td class="${totalSal>10?'pd-val-bad':totalSal>5?'pd-val-warn':'pd-val-good'}">${totalSal}</td></tr>
<tr><td>🔑 Clave index</td>
<td style="font-size:.63rem;color:var(--dn-text2);font-weight:400">${st.claveIndex||'—'}</td></tr>
</table>
</div>`;
 
// ── CONTENIDO TAB RESPUESTAS ──
const incorrectas = Object.entries(st.acts||{})
.filter(([k]) => k.startsWith('wrong_'))
.map(([k,v]) => `<div class="pd-salida-item"><span>${k.replace('wrong_','')}</span><span style="color:#e74c3c">${v}</span></div>`)
.join('') || `<div style="font-size:.75rem;color:var(--dn-text2);padding:8px 0;font-style:italic">Sin respuestas incorrectas registradas.</div>`;
 
const tabRespuestas = `
<div class="pd-section">Respuestas incorrectas</div>
<div class="pd-card">
<div style="font-size:.72rem;color:#e74c3c;font-weight:900;margin-bottom:10px">Respuestas incorrectas del estudiante:</div>
${incorrectas}
</div>
<div class="pd-section">Estado por evaluación</div>
<div class="pd-card">
<div class="pd-salida-item"><span>📝 Quiz 1</span><span style="color:var(--dn-text2);font-style:italic">pendiente</span></div>
<div class="pd-salida-item"><span>📝 Quiz 2</span><span style="color:var(--dn-text2);font-style:italic">pendiente</span></div>
<div class="pd-salida-item"><span>🏆 Eval. Final</span><span style="color:var(--dn-text2);font-style:italic">pendiente</span></div>
</div>`;
 
// ── CONTENIDO TAB RESET ──
const tabReset = `
<div style="background:rgba(192,57,43,.1);border:1px solid rgba(192,57,43,.3);border-radius:10px;
padding:10px 12px;font-size:.72rem;color:var(--dn-text2);line-height:1.5;margin-bottom:12px">
<strong style="color:#e74c3c">⚠️ Atención:</strong> El reset completo borra TODO el progreso.
El reset solo quizzes consume 1 vida. Estas acciones no se pueden deshacer.
</div>
<div class="pd-section">Reset rápido</div>
<div class="pd-card">
<div class="pd-card-head"><span class="pd-card-ico">⚠️</span><span class="pd-card-title">Reset COMPLETO</span></div>
<div class="pd-card-desc">Borra todo: progreso, XP, respuestas y marcas de slides.</div>
<button class="pd-btn pd-btn-red" onclick="pd_resetCompleto()">⚠️ Reset COMPLETO (todo)</button>
</div>
<div class="pd-card">
<div class="pd-card-head"><span class="pd-card-ico">🔄</span><span class="pd-card-title">Reset solo Quizzes</span></div>
<div class="pd-card-desc">Borra solo respuestas de quizzes y eval. final. Consume 1 vida.</div>
<button class="pd-btn pd-btn-gold" onclick="pd_resetQuizzes()">🔄 Reset solo Quizzes (1 vida)</button>
</div>
<div class="pd-section">Reset por semana</div>
<div class="pd-card">
<div class="pd-card-head"><span class="pd-card-ico">♻️</span><span class="pd-card-title">Resetear semana específica</span></div>
<div class="pd-card-desc">Borra el progreso completo de la semana seleccionada desde el índice.</div>
<select class="pd-select" id="pd-reset-sel">
<option value="">— Seleccionar semana —</option>
<option value="s1">Semana 1</option>
<option value="s2">Semana 2</option>
<option value="s3">Semana 3 (actual)</option>
<option value="s4">Semana 4</option>
<option value="s5">Semana 5</option>
<option value="s6">Semana 6</option>
<option value="all">⚠️ TODAS las semanas</option>
</select>
<button class="pd-btn pd-btn-outline-red" onclick="pd_resetSemana()">♻️ Confirmar reset de semana</button>
</div>
<div class="pd-section">Vidas</div>
<div class="pd-card">
<div class="pd-card-head"><span class="pd-card-ico">❤️</span><span class="pd-card-title">Reactivar las 8 vidas</span></div>
<div class="pd-card-desc">Estado actual: <strong style="color:var(--dn-gold-bright)">${vidas}/${MAX_VIDAS} vidas disponibles</strong>.</div>
<button class="pd-btn pd-btn-red" onclick="pd_reactivarVidas()">🔁 Reactivar 8 vidas ahora</button>
</div>`;
 
// ── CONTENIDO TAB HERRAMIENTAS ──
const tabHerramientas = `
<div class="pd-admin-card">
<div class="pd-admin-inner">
<div style="font-size:2rem;flex-shrink:0;line-height:1">⚡</div>
<div style="flex:1">
<div class="pd-admin-title">Entrar en Modo Administrador</div>
<div class="pd-admin-desc">
Navega por <strong style="color:var(--dn-gold-bright)">todas las slides libremente</strong>:
sin cronómetros activos, sin bloqueos de actividad, sin necesidad de completar quizzes.
Ideal para chequeo visual de la clase antes de presentarla a los estudiantes.
</div>
<div class="pd-admin-status ${st.modoAdmin?'on':''}">${st.modoAdmin?'✅ MODO ACTIVO':'⚪ Inactivo'}</div>
<button class="pd-btn ${st.modoAdmin?'pd-btn-outline-red':'pd-btn-gold'}"
onclick="pd_toggleAdmin()">
${st.modoAdmin?'🚪 Salir del Modo Admin':'⚡ Entrar en Modo Administrador'}
</button>
</div>
</div>
</div>
<div class="pd-section">Temporizador de clase</div>
<div class="pd-card">
<div class="pd-card-head"><span class="pd-card-ico">⏱️</span><span class="pd-card-title">Cronómetro de cuenta regresiva</span></div>
<div class="pd-card-desc">Controla el tiempo de actividades y evaluaciones en clase.</div>
<div class="pd-timer-display" id="pd-timer">00:00</div>
<div class="pd-timer-presets">
<button class="pd-btn pd-btn-ghost pd-btn-sm" onclick="pd_setTimer(5)">5 min</button>
<button class="pd-btn pd-btn-ghost pd-btn-sm" onclick="pd_setTimer(10)">10 min</button>
<button class="pd-btn pd-btn-ghost pd-btn-sm" onclick="pd_setTimer(15)">15 min</button>
<button class="pd-btn pd-btn-ghost pd-btn-sm" onclick="pd_setTimer(20)">20 min</button>
</div>
<div class="pd-timer-actions">
<button class="pd-btn pd-btn-gold pd-btn-sm" onclick="pd_startTimer()">▶ Iniciar</button>
<button class="pd-btn pd-btn-outline-red pd-btn-sm" onclick="pd_stopTimer()">⏹ Detener</button>
</div>
</div>
<div class="pd-section">Pregunta oral aleatoria</div>
<div class="pd-card">
<div class="pd-card-head"><span class="pd-card-ico">🎲</span><span class="pd-card-title">Generador de preguntas orales</span></div>
<div class="pd-card-desc">Pregunta sobre el tema de la clase para lanzar al grupo oralmente.</div>
<div id="pd-pregunta">Pulsa el botón para generar una pregunta…</div>
<button class="pd-btn pd-btn-ghost" onclick="pd_generarPregunta()" style="margin-top:4px">🎲 Generar pregunta</button>
</div>`;
 
// ── CONTENIDO TAB FOCO ──
const salidas = st.salidas || [];
const salidaItems = salidas.map(s =>
`<div class="pd-salida-item"><span>${s.hora}</span><span>Slide ${s.slide} — ${s.tipo}</span></div>`
).join('') || `<div style="color:var(--dn-text2);font-size:.75rem;text-align:center;padding:12px">Sin salidas registradas ✅</div>`;
 
const tabFoco = `
<div class="pd-section">Resumen de salidas de foco</div>
<div class="pd-foco-grid">
<div class="pd-foco-stat"><div class="pd-foco-val">${totalSal}</div><div class="pd-foco-lbl">Total salidas</div></div>
<div class="pd-foco-stat"><div class="pd-foco-val">${salidas.filter(s=>s.tipo==='pestaña').length}</div><div class="pd-foco-lbl">Cambios pestaña</div></div>
<div class="pd-foco-stat"><div class="pd-foco-val">${salidas.filter(s=>s.tipo==='ventana').length}</div><div class="pd-foco-lbl">Cambios ventana</div></div>
<div class="pd-foco-stat"><div class="pd-foco-val">${[...new Set(salidas.map(s=>s.slide))].length}</div><div class="pd-foco-lbl">Slides afectadas</div></div>
</div>
<div class="pd-section">Registro detallado</div>
<div class="pd-card">
<div style="font-size:.7rem;color:#e74c3c;font-weight:900;margin-bottom:8px">👁️ Salidas (${totalSal}):</div>
<div class="pd-salidas-list">${salidaItems}</div>
</div>
<div class="pd-card" style="margin-top:2px">
<div style="font-size:.72rem;color:var(--dn-text2)">
${totalSal>20?'🔴 Alto número de salidas — revisar con el estudiante.':totalSal>8?'🟡 Número moderado — continuar monitoreando.':'🟢 Número bajo de salidas — desempeño normal.'}
</div>
</div>`;
 
// ── ARMAR EL PANEL COMPLETO ──
return `
<div id="pd-panel">
<div class="pd-header">
<div class="pd-header-row">
<span class="pd-L-deco">ℒ</span>
<div>
<div class="pd-eyebrow">◈ Acceso restringido · Solo docente ◈</div>
<div class="pd-main-title">Panel de Control Docente</div>
<div class="pd-sub">IE Simón Bolívar · Sede San Martín · ${st.materia||'Clase'}</div>
</div>
<button class="pd-btn pd-btn-outline-red" style="width:auto;padding:6px 12px;font-size:.73rem;flex-shrink:0" onclick="pd_cerrarPanel()">✕ Cerrar</button>
</div>
<div class="pd-quick-stats">
<div class="pd-qs-item"><span class="pd-qs-val">${st.slideActual||0}/${st.totalSlides||0}</span><span class="pd-qs-lbl">Slide</span></div>
<div class="pd-qs-item"><span class="pd-qs-val">${progPct}%</span><span class="pd-qs-lbl">Avance</span></div>
<div class="pd-qs-item"><span class="pd-qs-val">${nota}</span><span class="pd-qs-lbl">Nota</span></div>
<div class="pd-qs-item"><span class="pd-qs-val">${'❤️'.repeat(vidas)}${'🖤'.repeat(MAX_VIDAS-vidas)}</span><span class="pd-qs-lbl">Vidas</span></div>
<div class="pd-qs-item"><span class="pd-qs-val" style="color:#e74c3c;font-size:.8rem">${totalSal}</span><span class="pd-qs-lbl">Salidas</span></div>
</div>
</div>
<div class="pd-tabs">${tabsHtml}</div>
<div class="pd-body">
<div class="pd-panel ${pd_activeTab==='stats'?'active':''}" id="pd-tab-stats">${tabStats}</div>
<div class="pd-panel ${pd_activeTab==='respuestas'?'active':''}" id="pd-tab-respuestas">${tabRespuestas}</div>
<div class="pd-panel ${pd_activeTab==='reset'?'active':''}" id="pd-tab-reset">${tabReset}</div>
<div class="pd-panel ${pd_activeTab==='herramientas'?'active':''}" id="pd-tab-herramientas">${tabHerramientas}</div>
<div class="pd-panel ${pd_activeTab==='foco'?'active':''}" id="pd-tab-foco">${tabFoco}</div>
</div>
<div class="pd-footer">
<span class="pd-footer-note">Panel oculto · Clave 7 dígitos · Solo teclado físico</span>
<button class="pd-btn pd-btn-outline-red" style="width:auto;padding:7px 18px;font-size:.7rem" onclick="pd_cerrarPanel()">✕ Cerrar panel</button>
</div>
</div>`;
}
 
// ═══ SWITCH DE TABS ═══
function pd_switchTab(id) {
pd_activeTab = id;
document.querySelectorAll('.pd-panel').forEach(p => p.classList.remove('active'));
document.querySelectorAll('.pd-tab').forEach(t => t.classList.remove('active'));
const panel = document.getElementById('pd-tab-' + id);
if (panel) panel.classList.add('active');
document.querySelectorAll('.pd-tab').forEach(t => {
if ((t.getAttribute('onclick')||'').includes("'"+id+"'")) t.classList.add('active');
});
}
```
 
---
 
### ⚡ ACCIONES DEL PANEL — FUNCIONES COMPLETAS
 
```javascript
// ─── RESET COMPLETO ───
function pd_resetCompleto() {
if (!confirm('¿Seguro? Se borrará TODO el progreso. No se puede deshacer.')) return;
// borrón TOTAL: es el ÚNICO lugar donde la mejor nota (8-U) vuelve a 0.0
limpiarColaModales(); forzarCerrarModal(); detenerCronometroLectura(); detenerTemporizadoresSlide(); lecturaMarca = null;
Object.keys(st.acts).forEach(k => delete st.acts[k]);
st.aciertos = 0; st.slide = 0; st.seen = new Set();
st.vidasUsadas = 0; st.intentos = 1; st.reintentoActivo = false; st.reintentoPendientes = [];
st.mejorNota = 0; st.mejorAciertos = 0; st.mejorIntento = 1; st.historialIntentos = [];
save();
render(); updScore();
showToast('♻️ Reset completo — el estudiante empieza desde cero (nota 0.0, vidas completas)');
pd_cerrarPanel(); pd_abrirPanel('reset');
}
 
// ─── RESET SOLO QUIZZES — v12.0: usa las funciones únicas de la Prioridad 8-P ───
function pd_resetQuizzes(){
if (!confirm('¿Resetear solo quizzes? Consumirá 1 vida del estudiante. Su mejor nota se conserva.')) return;
iniciarNuevoIntento('panel');   // (8-W): MISMA función que "Reintentar" del estudiante — un solo camino de reinicio
pd_cerrarPanel(); pd_abrirPanel('reset');
}
 
// ─── RESET DE SEMANA ───
function pd_resetSemana() {
const sel = document.getElementById('pd-reset-sel');
if (!sel || !sel.value) { showToast('⚠️ Selecciona una semana primero'); return; }
const nombre = sel.options[sel.selectedIndex].text;
// En producción: filtrar localStorage por prefijo de semana y borrar
// localStorage.removeItem(KEY_SEMANA + sel.value);
showToast('♻️ ' + nombre + ' reseteada correctamente');
pd_cerrarPanel(); pd_abrirPanel('reset');
}
 
// ─── REACTIVAR VIDAS ───
function pd_reactivarVidas() {
st.vidasUsadas = 0;
save();
showToast(`❤️❤️❤️ Vidas reactivadas — el estudiante tiene ${MAX_VIDAS} oportunidades de nuevo`);
if (typeof updateVidasBtn === 'function') updateVidasBtn();
pd_cerrarPanel(); pd_abrirPanel('reset');
}
 
// ─── MODO ADMINISTRADOR ───
function pd_toggleAdmin() {
st.modoAdmin = !st.modoAdmin;
save();
const badge = document.getElementById('pd-admin-badge');
if (badge) badge.classList.toggle('active', st.modoAdmin);
showToast(st.modoAdmin
? '⚡ Modo Admin ACTIVADO — sin cronómetros ni bloqueos'
: '🔒 Modo Admin desactivado — clase en modo normal'
);
pd_cerrarPanel(); pd_abrirPanel('herramientas');
}
 
// ─── TEMPORIZADOR ───
let _pd_secs = 0;
window._pd_timerInt = null;
window._pd_ticking = false;
 
function pd_setTimer(mins) {
pd_stopTimer();
_pd_secs = mins * 60;
pd_updateTimer();
}
function pd_startTimer() {
if (window._pd_ticking) return;
if (_pd_secs <= 0) { showToast('⚠️ Selecciona un tiempo primero'); return; }
window._pd_ticking = true;
window._pd_timerInt = setInterval(() => {
_pd_secs--;
pd_updateTimer();
if (_pd_secs <= 0) { pd_stopTimer(); showToast('⏱️ ¡Tiempo terminado!'); }
}, 1000);
}
function pd_stopTimer() {
window._pd_ticking = false;
clearInterval(window._pd_timerInt);
}
function pd_updateTimer() {
const el = document.getElementById('pd-timer');
if (!el) return;
const m = String(Math.floor(_pd_secs/60)).padStart(2,'0');
const s = String(_pd_secs%60).padStart(2,'0');
el.textContent = m+':'+s;
el.classList.toggle('red', _pd_secs <= 60 && _pd_secs > 0);
}
 
// ─── PREGUNTA ORAL ───
// IMPORTANTE: personalizar PREGUNTAS_ORALES con el tema específico de la clase
const PREGUNTAS_ORALES_DOCENTE = [
// Reemplazar con preguntas del tema de la semana actual
'Pregunta 1 del tema',
'Pregunta 2 del tema',
// ... agregar las que correspondan
];
function pd_generarPregunta() {
const el = document.getElementById('pd-pregunta');
if (!el) return;
const idx = Math.floor(Math.random() * PREGUNTAS_ORALES_DOCENTE.length);
el.textContent = PREGUNTAS_ORALES_DOCENTE[idx];
el.classList.add('loaded');
}
```
 
---
 
### 🔌 INTEGRACIÓN EN EL SISTEMA DE SLIDES — SOLO 2 LÍNEAS
 
```javascript
// ya NO hay nada que agregar aquí: puedeAvanzar() (8-O) y activarCronometroLectura() (8-N)
// YA incluyen `if (st.modoAdmin) return true;` / `if (st.modoAdmin) { habilitarBtnNext(); return; }` de fábrica.
// Basta con que st.modoAdmin exista en el objeto st — no hay que tocar ninguna otra función.
```
 
---
 
### 📋 HTML A PEGAR EN EL `<body>` (overlay + "L" en navbar)
 
```html
<!-- ═══ PEGAR EN EL NAVBAR, EXTREMO IZQUIERDO ═══ -->
<span id="secret-L" style="
font-family:'UnifrakturMaguntia',serif;
font-size:2.1rem; color:#fff; line-height:1;
cursor:default; user-select:none; padding:2px 7px;
-webkit-font-smoothing:antialiased;
transition:color .2s, text-shadow .2s;
">ℒ</span>
<span id="pd-key-ind" style="display:none; font-size:.68rem; color:rgba(255,255,255,.8);
background:rgba(0,0,0,.3); border-radius:6px; padding:2px 9px;
letter-spacing:3px; font-weight:900; font-family:var(--font-ui)"></span>
<span id="pd-listen-timer" style="display:none; font-size:.65rem;
color:rgba(255,255,255,.6); font-family:var(--font-ui)"></span>
 
<!-- ═══ Badge de modo admin en navbar (oculto por defecto) ═══ -->
<div id="pd-admin-badge" style="
display:none; align-items:center; gap:5px;
background:var(--dn-gold-bright,#f5c842); color:#000;
border-radius:20px; padding:3px 11px;
font-size:.63rem; font-weight:900; font-family:var(--font-ui);
">⚡ MODO ADMIN</div>
 
<!-- ═══ OVERLAY DEL PANEL (pegar antes del </body>) ═══ -->
<div id="pd-overlay"
style="display:none; position:fixed; inset:0; background:rgba(0,0,0,.82);
z-index:9000; backdrop-filter:blur(5px);
align-items:center; justify-content:center;"
onclick="if(event.target===this) pd_cerrarPanel()">
</div>
```
 
---
 
### 📦 CHECKLIST DE INTEGRACIÓN
 
- [ ] `UnifrakturMaguntia` importada en el `<head>` desde Google Fonts
- [ ] `Orbitron` importada en el `<head>` desde Google Fonts
- [ ] Letra `ℒ` (`#secret-L`) en el extremo izquierdo del navbar, sin pistas visuales
- [ ] `#pd-key-ind` y `#pd-listen-timer` junto a la `ℒ`, ocultos por defecto
- [ ] `#pd-admin-badge` en el navbar, oculto por defecto
- [ ] `#pd-overlay` antes del `</body>`
- [ ] Todo el bloque CSS copiado al `<style>` global
- [ ] Todas las funciones `pd_*` copiadas al `<script>` global
- [ ] `st.modoAdmin = false` agregado al objeto `st`
- [ ] `st.salidas = []` agregado al objeto `st` (con estructura `{hora, slide, tipo}`)
- [ ] `st.quiz1`, `st.quiz2`, `st.evalFinal` con propiedad `.correctas` y `.total`
- [ ] `if (st.modoAdmin) return true;` en `puedeAvanzar(s)`
- [ ] `if (st.modoAdmin) return;` en `activarCronometroLectura()`
- [ ] `PREGUNTAS_ORALES_DOCENTE` personalizada con el tema de la semana
- [ ] Evento de registro de salidas: cuando el estudiante cambia de pestaña/ventana,
hacer `st.salidas.push({ hora: new Date().toLocaleTimeString(), slide: st.slideActual, tipo: 'pestaña' }); save();`

## 🟠 PRIORIDAD 16-B · ALTA — MENÚ SUPERIOR DE HERRAMIENTAS PARA EL ESTUDIANTE

### 🧰 UN BOTÓN VISIBLE "🧰 Mis herramientas" — PANEL CON 3 AYUDAS COMBINADAS
A diferencia del panel docente (oculto), este SÍ es un botón visible y amigable en el navbar, pensado para apoyar al estudiante durante la clase.
```html
<!-- Botón visible en el navbar, junto a los cuadernos -->
<button class="nav-btn" onclick="abrirHerramientasEstudiante()" title="Herramientas para ti">
  🧰 Mis herramientas
</button>
```
```javascript
function abrirHerramientasEstudiante() {
  showModalGrande(`
    <div class="nb-modal-header">
      <span>🧰 Mis herramientas</span>
      <button onclick="closeModalGrande()" class="nb-modal-close">✕</button>
    </div>
    <div style="padding:16px">
      <!-- Pestañas internas -->
      <div style="display:flex;gap:6px;margin-bottom:14px">
        <button class="ht-tab active" onclick="cambiarTabHerramientas('glosario')" id="ht-tab-glosario">📖 Glosario</button>
        <button class="ht-tab" onclick="cambiarTabHerramientas('calc')" id="ht-tab-calc">🧮 Calculadora</button>
        <button class="ht-tab" onclick="cambiarTabHerramientas('ayuda')" id="ht-tab-ayuda">💡 Pista</button>
      </div>
      <div id="ht-contenido">${renderGlosarioHerramientas()}</div>
    </div>
  `);
}
function cambiarTabHerramientas(tab) {
  document.querySelectorAll('.ht-tab').forEach(b => b.classList.remove('active'));
  document.getElementById('ht-tab-'+tab).classList.add('active');
  const cont = document.getElementById('ht-contenido');
  if (tab === 'glosario') cont.innerHTML = renderGlosarioHerramientas();
  if (tab === 'calc')     cont.innerHTML = renderCalculadoraHerramientas();
  if (tab === 'ayuda')    cont.innerHTML = renderPistaGeneralHerramientas();
}
// 1. GLOSARIO de términos de la clase
function renderGlosarioHerramientas() {
  const glosario = GLOSARIO_CLASE || [];
  return `
    <p style="font-size:.8rem;color:var(--muted);margin-bottom:10px">Términos importantes de esta clase:</p>
    ${glosario.map(g => `
      <div style="background:var(--primary-light);border-radius:10px;padding:10px;margin-bottom:8px">
        <p style="font-family:var(--font-ui);color:var(--primary-dark);font-size:.85rem">${g.termino}</p>
        <p style="font-size:.78rem;color:var(--text2);line-height:1.6">${g.definicion}</p>
      </div>
    `).join('') || '<p style="font-size:.8rem;color:var(--muted)">El glosario se completará con los términos de la clase.</p>'}
  `;
}
// 2. CALCULADORA / bloc de notas rápido
function renderCalculadoraHerramientas() {
  return `
    <p style="font-size:.8rem;color:var(--muted);margin-bottom:10px">Usa esta calculadora si la necesitas para resolver algún ejercicio:</p>
    <input id="ht-calc-display" readonly style="width:100%;padding:10px;font-size:1.3rem;text-align:right;
           border:2px solid var(--primary);border-radius:8px;margin-bottom:8px;font-family:monospace" value="0">
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">
      ${['7','8','9','÷','4','5','6','×','1','2','3','-','C','0','=','+'].map(k => `
        <button onclick="htCalcPress('${k}')" style="padding:12px;font-size:1.1rem;border-radius:8px;
                border:2px solid var(--primary-light);background:#fff;cursor:pointer;font-family:var(--font-ui)">${k}</button>
      `).join('')}
    </div>
    <!-- Bloc de notas rápido -->
    <p style="font-size:.8rem;color:var(--muted);margin:14px 0 6px">📝 Bloc de notas rápido (no se evalúa):</p>
    <textarea id="ht-bloc-notas" placeholder="Escribe aquí lo que necesites mientras trabajas..."
      oninput="localStorage.setItem(SKEY+'_blocnotas', this.value)"
      style="width:100%;min-height:60px;padding:8px;border:2px solid var(--primary-light);
             border-radius:8px;font-size:.82rem">${localStorage.getItem(SKEY+'_blocnotas')||''}</textarea>
  `;
}
let htCalcExpr = '';
function htCalcPress(k) {
  const disp = document.getElementById('ht-calc-display');
  if (k === 'C') { htCalcExpr = ''; disp.value = '0'; return; }
  if (k === '=') {
    try {
      const expr = htCalcExpr.replace(/×/g,'*').replace(/÷/g,'/');
      disp.value = String(Function('"use strict";return ('+expr+')')());
    } catch(e) { disp.value = 'Error'; }
    return;
  }
  htCalcExpr += k;
  disp.value = htCalcExpr;
}
// 3. PISTA general (botón de "pedir ayuda")
function renderPistaGeneralHerramientas() {
  const s = SL[st.slide];
  const pistaGenerica = s.pistaAyuda ||
    'Recuerda revisar los ejemplos resueltos en los slides anteriores — ahí está la clave para resolver esta actividad.';
  return `
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:2.5rem;margin-bottom:8px">💡</div>
      <p style="font-size:.88rem;color:var(--text2);line-height:1.7;background:#fff8dc;
                border-radius:10px;padding:14px;border:2px solid var(--accent)">
        ${pistaGenerica}
      </p>
      <p style="font-size:.74rem;color:var(--muted);margin-top:10px">
        Esta pista no te da la respuesta — solo te orienta sobre dónde buscarla 😊
      </p>
    </div>
  `;
}
```
**CSS del menú de herramientas:**
```css
.ht-tab {
  flex: 1; padding: 8px; border: 2px solid var(--primary-light); border-radius: 8px;
  background: #fff; font-family: var(--font-ui); font-size: .76rem; cursor: pointer; color: var(--text2);
}
.ht-tab.active { background: var(--primary); color: #fff; border-color: var(--primary-dark); }
```
**Regla importante:** la pista general NUNCA da la respuesta literal de un quiz — solo orienta hacia dónde mirar (ej. "revisa el ejemplo del slide 8"). Esto mantiene la integridad de la evaluación mientras apoya al estudiante que se siente perdido.

---

# 20 · Requisitos técnicos e integridad de la nota

## 🟢 PRIORIDAD 17 · TÉCNICA — REQUISITOS TÉCNICOS

### ✅ Obligatorio
- Un solo archivo `.html` 100% autocontenido
- JavaScript vanilla puro — sin React, Vue, jQuery
- CSS puro — sin Tailwind, Bootstrap
- Google Fonts como única CDN de fuentes
- **Mínimo 20 imágenes Unsplash** con fallback emoji
- **2-3 ejercicios prácticos resueltos** ligados directamente al quiz/examen (slide `practica`, Prioridad 2)
- **Sistema de 8 vidas** — solo resetean quizzes de opción múltiple
- **Nota desde 0.0** — se construye con aciertos, nunca desde 5.0
- Paleta de colores CLARA y VIVA
- Sin scroll de página — solo scroll en `#slide-wrap`
- Layout: sidebar 272px + main, navbar 60px
- **Botón físico "💾 Guardar"** en el navbar
- Sincronización con el index cada 20 segundos como máximo
- LocalStorage para persistencia de: slide actual, aciertos, respuestas, reflexiones, vidas
- Compatible Chrome, Firefox, Edge modernos
- Todo el texto en español colombiano natural
### 🚫 Prohibido
- Paletas oscuras / fondos negros / cyberpunk
- Nota que inicia en 5.0 (para que el cálculo sea correcto)
- Nota mínima hardcodeada en 1.0 (la mínima es 0.0)
- Scroll de página completa
- Imágenes sin sistema de fallback emoji
- Más de 1 quiz completo por slide (el quiz tiene múltiples preguntas en su propio slide)
- Que el estudiante pueda saltar quizzes o la evaluación final
- Actividades de drag/ordenar que afecten la nota
- Botón de reintentar sin modal de confirmación
- Taller en Clase con más de 5 ejercicios
- 🔺 v7.4: Cualquier slide tipo 'video', iframe de YouTube, o reproductor embebido — los videos quedan eliminados de las clases (Prioridad 2); esa posición del recorrido es SIEMPRE un slide tipo 'practica'
- 🔺 v7.4: Más de 3 mensajes motivacionales del docente en una misma sesión (Prioridad 18-D)
### 📦 CDN opcional permitida
```html
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
```

## 🔴 PRIORIDAD 18 · ABSOLUTA — INTEGRIDAD DE LA NOTA, PERSISTENCIA DE QUIZZES Y MENSAJES MOTIVACIONALES DEL DOCENTE

### 🎯 18-A. LA XP, LOS CLICS Y LA INTERACCIÓN NUNCA AFECTAN LA NOTA
**Regla de oro:** el XP, las medallas, los clics en elementos del explorador, o cualquier interacción visual/gamificada **NUNCA** modifican `st.aciertos` ni `calcTotal()`. Solo las actividades explícitamente definidas como evaluables (`quiz`, `evalFinal`) generan nota automática, y el Taller en Clase genera la Nota 2 manual (Prioridad 10/18-C). Todo lo demás — XP, badges, streak, clics del explorador, sopa de letras, drag/match/fill/orden — es puramente formativo y gamificado, sin ningún efecto en la calificación.
```javascript
// ✅ CORRECTO — el XP se calcula y muestra de forma completamente independiente de la nota:
function gainPts(cantidad) {
  st.xp = (st.xp || 0) + cantidad;
  save();
  showFPts(cantidad); // solo feedback visual, NUNCA toca st.aciertos ni calcTotal()
}
// ❌ PROHIBIDO — cualquier función que sume aciertos o modifique la nota fuera de responderQuiz():
// function onExploradorClick(sId) { st.aciertos++; }  ← NUNCA hacer esto
```
### 🔒 18-B. UN QUIZ YA RESPONDIDO NUNCA VUELVE A SUMAR NOTA — PERMANENCIA TOTAL
**Regla de oro:** una vez que una pregunta de quiz fue respondida, esa respuesta **queda fija para siempre** dentro del mismo intento. Si el estudiante recarga la página, sale y vuelve a entrar, o navega a otra slide y regresa al quiz, **NUNCA se vuelve a mostrar la pregunta ya respondida ni se vuelve a sumar el acierto**. Lo único que puede reiniciar un quiz ya completado es usar una de las 8 vidas (Prioridad 6/6-B) — ningún otro evento (recarga, navegación, cierre accidental) puede borrar o repetir respuestas.
```javascript
// Esto YA está garantizado por el diseño de rQuiz() (Prioridad 5) + save()/load() (Prioridad 8):
// - st.acts['quiz_idx_'+id]     → pregunta en la que va (persiste)
// - st.acts['quiz_resps_'+id]   → respuestas ya dadas (persiste, nunca se sobreescriben)
// - st.acts['completado_'+id]   → true cuando terminó TODAS las preguntas
// GARANTÍA EXPLÍCITA: rQuiz() SIEMPRE debe verificar esto primero:
// rQuiz() real vive en la Prioridad 8-P; ya cumple exactamente esta garantía:
// primera línea `if (st.acts['completado_'+s.id] === true) return renderResumenQuiz(s);`,
// y retoma en `st.acts['quiz_idx_'+s.id] || 0` — nunca desde la pregunta 1.
// PROHIBIDO ABSOLUTO: ningún evento de recarga, visibilitychange, o navegación
// puede llamar a algo como "delete st.acts['completado_'+id]" o "st.acts['quiz_idx_'+id] = 0"
// fuera de confirmarReintento() (Prioridad 6). Revisar que NINGÚN otro punto del código reinicie
// el progreso de un quiz salvo el flujo explícito de reintentar con una vida.
```
### 🎨 18-C. RECORDATORIO — TALLER EN CLASE (NOTA 2) Y CUADERNOS SOLO EN EL PANEL FLOTANTE
Ver Prioridad 10 (actualizada v6.2): los cuadernos jamás son slides, jamás se duplican dentro de una slide del recorrido, y el Taller en Clase (antes "Cuaderno 2") se presenta como la Nota 2 de la clase, calificada manualmente por el docente — con 4 o 5 ejercicios sintetizados y ya explicados previamente en alguna slide.
### 💌 18-D. MENSAJES MOTIVACIONALES PERSONALIZADOS DEL DOCENTE (v7.5 — MÁXIMO 3, SIN TEMPORIZADOR LIBRE)
**Regla de oro:** a lo largo de TODA la clase, debe aparecer un mensaje bonito y personalizado —como si lo escribiera el propio docente— animando e incentivando al estudiante, pero **NUNCA más de 3 veces en total por sesión completa**. Estos mensajes son puramente emocionales/motivacionales, NUNCA revelan respuestas ni afectan la nota.
```
🔺 PROHIBIDO: el disparador por tiempo libre (setInterval cada 18 minutos de la v7.4)
   queda ELIMINADO por completo. Un temporizador libre puede seguir disparando mensajes sin
   relación con lo que el estudiante está haciendo. Se reemplaza por dos disparadores puntuales
   y controlados: hitos de nota, y UN único chequeo a mitad de clase.
```
```javascript
// ═══ CONFIGURACIÓN — el docente personaliza este arreglo de mensajes ═══
const MENSAJES_DOCENTE = [
  "¡Vas muy bien! Sigue así, se nota tu esfuerzo. — Profe Luis",
  "Recuerda: equivocarte también es parte de aprender. ¡Tú puedes! — Profe Luis",
  "Estoy orgulloso de tu dedicación en esta clase. ¡Vamos con toda! — Profe Luis",
  // El docente puede editar estos mensajes, en tono cálido y cercano — pero el TOTAL
  // de veces que se muestran en una sesión nunca debe superar el límite de abajo
];
const MAX_MENSAJES_DOCENTE_POR_CLASE = 3; // 🔺 NUNCA CAMBIAR a un número mayor

// ═══ ÚNICO PUNTO DE ENTRADA VISUAL — todo disparador DEBE pasar por aquí ═══
function mostrarMensajeDocente(esCelebracion) {
  const usados = st.acts['msgDocenteUsados'] || 0;
  if (usados >= MAX_MENSAJES_DOCENTE_POR_CLASE) return; // 🔒 tope alcanzado, no mostrar más
  st.acts['msgDocenteUsados'] = usados + 1;
  save();
  const msg = MENSAJES_DOCENTE[Math.floor(Math.random() * MENSAJES_DOCENTE.length)];
  showModal(`
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:2.8rem;margin-bottom:8px">${esCelebracion ? '🎉' : '💌'}</div>
      <h2 style="font-family:var(--font-ui);color:var(--primary);font-size:1.05rem;margin-bottom:10px">
        ${esCelebracion ? '¡Vas increíble!' : 'Un mensaje de tu profe'}
      </h2>
      <p style="font-size:.9rem;color:var(--text2);line-height:1.8;font-style:italic;margin-bottom:16px">
        "${msg}"
      </p>
      <button class="mbtn" onclick="closeModal()" style="width:100%">💪 ¡Gracias, sigo adelante!</button>
    </div>
  `);
}
// ═══ DISPARADOR 1 (preferente) — por hito de nota/avance alcanzado ═══
// Llamar checarHitoNotaDocente() después de cada responderQuiz() y cada save()
function checarHitoNotaDocente() {
  const t = notaOficial();   // (8-U)
  const hitos = [4.0, 5.0];
  hitos.forEach(h => {
    const clave = 'hito_msg_docente_' + h;
    if (t >= h && !st.acts[clave]) {
      st.acts[clave] = true;
      save();
      mostrarMensajeDocente(true); // true = mensaje de celebración por nota
    }
  });
}
// ═══ DISPARADOR 2 (único extra) — UN SOLO chequeo a mitad de clase, nunca un timer libre ═══
let _msgDocenteMitadUsado = false;
function chequearMensajeMitadClase() {
  if (_msgDocenteMitadUsado) return;
  const pct = Math.round((st.seen.size / SL.length) * 100);
  if (pct >= 45 && pct <= 55) {
    _msgDocenteMitadUsado = true;
    mostrarMensajeDocente(false);
  }
}
// 🔺 Llamar chequearMensajeMitadClase() dentro de markSeen() o render() — NUNCA con setInterval libre
```
**Reglas del mensaje motivacional:**
- **Máximo 3 mensajes en total por sesión completa** — nunca más, sin importar cuánto dure la clase
- Tono cálido, cercano y personalizado — como si lo escribiera el docente directamente
- Nunca interrumpe una actividad evaluable a mitad de respuesta (no debe aparecer sobre un quiz abierto)
- Nunca revela respuestas correctas ni pistas de examen
- El arreglo `MENSAJES_DOCENTE` debe quedar fácil de personalizar por el autor de la clase
- `st.acts['msgDocenteUsados']` persiste (Prioridad 8-G) — al recargar o volver a entrar, el conteo NO se reinicia

---

# 21 · Hotspots, vitrina, inicio, avatar, carta sorpresa, elige tu actividad, semáforo, transiciones, reacciones, slider, parallax

## 🟠 PRIORIDAD 19 · ALTA — IMÁGENES CON PUNTOS CALIENTES (HOTSPOTS) — ALTERNATIVA AL GRID 2×2

### 🔵 REGLA DE ORO: UNA IMAGEN GRANDE CON PUNTOS TOCABLES, EN VEZ DE 4 FOTOS FIJAS
Como alternativa al grid 2×2 de imágenes obligatorio en cada slide de concepto (Prioridad 1), se puede usar — en algunos slides de concepto, no necesariamente todos — **una sola imagen grande de Unsplash con 3 o 4 puntos marcados (hotspots)** que el estudiante toca para revelar un dato, definición o ejemplo relacionado con esa parte de la imagen. Es más interactivo que solo mirar fotos estáticas.
**Reglas de los hotspots:**
- Cada hotspot es un círculo pulsante posicionado sobre un punto relevante de la imagen (ej. una pieza del computador, una parte de una célula, un elemento de un mapa)
- Al tocar un hotspot, se revela un dato breve (1 línea) — mediante un toast o un popover pequeño, nunca un modal que bloquee la lectura
- Cada imagen usada en este patrón sigue contando para el mínimo de 20 imágenes reales de la Prioridad 1 — pero como reemplaza a 4 imágenes por 1, el autor debe compensar usando el patrón de grid 2×2 en más slides, o combinando varios slides con hotspots, para no bajar del total de 20
- No reemplaza la regla de `alt` descriptivo ni el sistema de fallback emoji (Prioridad 1) — el hotspot es una capa adicional sobre la imagen, no un reemplazo de sus reglas base
```html
<!-- Patrón de imagen con hotspots — alternativa al grid 2×2 en un slide de concepto -->
<div class="hotspot-container">
  <img src="https://images.unsplash.com/photo-[ID]?w=500&h=320&fit=crop&auto=format&q=80"
       alt="[descripción]" loading="lazy" class="hotspot-img">
  <!-- 3-4 puntos, posicionados con top/left en % sobre la imagen -->
  <button class="hotspot-punto" style="top:28%;left:22%" onclick="mostrarHotspot('[Dato breve 1]')">+</button>
  <button class="hotspot-punto" style="top:55%;left:60%" onclick="mostrarHotspot('[Dato breve 2]')">+</button>
  <button class="hotspot-punto" style="top:70%;left:30%" onclick="mostrarHotspot('[Dato breve 3]')">+</button>
</div>
```
```javascript
function mostrarHotspot(dato) {
  showToast('💡 ' + dato);
  if (!st.acts['hotspot_click_'+st.slide]) {
    st.acts['hotspot_click_'+st.slide] = true;
    save(); // registra interacción formativa — nunca afecta la nota (Prioridad 18-A)
  }
}
```
```css
.hotspot-container { position: relative; border-radius: 12px; overflow: hidden; border: 4px solid var(--primary); box-shadow: 0 3px 0 var(--primary-dark); }
.hotspot-img { width: 100%; height: 220px; object-fit: cover; display: block; }
.hotspot-punto {
  position: absolute; width: 30px; height: 30px; border-radius: 50%;
  background: var(--accent); color: #000; border: 3px solid #fff;
  font-family: var(--font-ui); font-weight: 900; font-size: 1rem;
  cursor: pointer; animation: hotspot-pulse 1.4s infinite;
  transform: translate(-50%,-50%);
}
@keyframes hotspot-pulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(255,215,0,.6); }
  50%     { box-shadow: 0 0 0 10px rgba(255,215,0,0); }
}
```
**Nota importante:** este patrón es OPCIONAL y complementario al grid 2×2 (Prioridad 1) — el autor decide en qué slides de concepto usar cada estilo, según lo que mejor se preste para el tema. Los clics en los hotspots son formativos, nunca afectan la nota (Prioridad 18-A).

## 🟠 PRIORIDAD 20 · ALTA — VITRINA DE LOGROS ACUMULADOS ENTRE SEMANAS

### 🏆 REGLA DE ORO: LAS MEDALLAS SE ACUMULAN ENTRE CLASES, NO SOLO EN LA DE HOY
Además del sistema de badges de la clase actual (Prioridad 15), debe existir una **galería acumulada** — accesible desde un botón fijo en el navbar, igual que los cuadernos — que muestre TODAS las medallas que el estudiante ha ganado en TODAS las clases anteriores de esa materia, no solo en la de hoy. Es como una estantería de trofeos que crece semana a semana, dando sensación de progreso a largo plazo más allá de la nota de una sola clase.
**Reglas de la vitrina de logros:**
- Botón fijo en el navbar: "🏆 Mis Logros"
- Se abre como panel flotante (`showModalGrande`), igual que los cuadernos — nunca es un slide, nunca bloquea nada
- Usa como identidad la MISMA base estable que ya se usa para la nota y el slide (nombre normalizado del estudiante, Prioridad 8-D) — así nunca se mezclan logros entre estudiantes distintos, ni se pierden al pasar de una semana a otra
- Cada medalla nueva ganada en CUALQUIER clase de la materia se agrega a esta galería acumulada, indicando en qué semana se ganó
- Si el estudiante aún no tiene medallas, muestra un mensaje amable invitándolo a ganar la primera — nunca un espacio vacío sin contexto
```javascript
// ═══ CLAVE ACUMULADA — independiente de la semana actual, dura toda la materia ═══
// Usa NOMBRE_NORM (Prioridad 8-D) para que cada estudiante tenga su propia vitrina
const LOGROS_KEY = `${AUTOR_MATERIA_SIGLA}_logros_${NOMBRE_NORM}`;
// ═══ Registrar un logro nuevo — llamar junto al sistema de badges de la Prioridad 15,
// cada vez que se otorga una medalla en la clase actual ═══
function registrarLogroAcumulado(badgeId, nombreBadge, emojiBadge) {
  try {
    let logros = JSON.parse(localStorage.getItem(LOGROS_KEY) || '[]');
    const yaExiste = logros.some(l => l.semana === AUTOR_SEMANA_NUM && l.badgeId === badgeId);
    if (!yaExiste) {
      logros.push({
        semana: AUTOR_SEMANA_NUM,
        badgeId, nombre: nombreBadge, emoji: emojiBadge || '🏆',
        fecha: new Date().toLocaleDateString('es-CO'),
      });
      localStorage.setItem(LOGROS_KEY, JSON.stringify(logros));
    }
  } catch(e) {}
}
// ═══ Abrir la vitrina de logros ═══
function abrirVitrinaLogros() {
  showModalGrande(`
    <div class="nb-modal-header">
      <span>🏆 Mis Logros — ${AUTOR_MATERIA_FALLBACK}</span>
      <button onclick="closeModalGrande()" class="nb-modal-close">✕</button>
    </div>
    <div style="padding:16px">${renderVitrinaLogros()}</div>
  `);
}
function renderVitrinaLogros() {
  let logros = [];
  try { logros = JSON.parse(localStorage.getItem(LOGROS_KEY) || '[]'); } catch(e) {}
  if (logros.length === 0) {
    return `
      <div style="text-align:center;padding:20px 10px">
        <div style="font-size:2.5rem;margin-bottom:8px">🏆</div>
        <p style="font-size:.88rem;color:var(--text2)">
          Aún no tienes medallas — ¡sigue esforzándote, pronto ganarás la primera! 💪
        </p>
      </div>
    `;
  }
  // Ordenar por semana, más reciente primero
  const ordenados = [...logros].sort((a,b) => b.semana - a.semana);
  return `
    <div class="vitrina-grid">
      ${ordenados.map(l => `
        <div class="vitrina-trofeo">
          <span class="vitrina-ico">${l.emoji}</span>
          <p class="vitrina-nombre">${l.nombre}</p>
          <span class="vitrina-fecha">Semana ${l.semana} · ${l.fecha}</span>
        </div>
      `).join('')}
    </div>
  `;
}
```
```html
<!-- Botón fijo en el navbar, junto a los cuadernos y "Mis herramientas" -->
<button class="nav-btn" onclick="abrirVitrinaLogros()" title="Ver todas tus medallas">
  🏆 Mis Logros
</button>
```
```css
.vitrina-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(110px,1fr)); gap: 12px;
}
.vitrina-trofeo {
  background: linear-gradient(180deg,#fffde7,#fff3cd);
  border: 3px solid var(--gold); border-radius: 12px; padding: 12px 8px;
  text-align: center; box-shadow: 0 3px 0 #cc9a00;
}
.vitrina-ico { font-size: 2rem; display: block; margin-bottom: 4px; }
.vitrina-nombre { font-family: var(--font-ui); font-size: .74rem; color: var(--primary-dark); margin-bottom: 4px; }
.vitrina-fecha { font-size: .62rem; color: var(--muted); }
```
**Importante:** esta vitrina NUNCA afecta la nota (Prioridad 18-A) — es puramente motivacional y de reconocimiento acumulado. La clave `LOGROS_KEY` debe persistir entre semanas (nunca se borra al iniciar una nueva clase), y solo se resetea si el docente lo hace explícitamente desde el Panel Docente (Prioridad 16).

## 🟠 PRIORIDAD 21 · ALTA — BOTÓN FIJO "🏠 INICIO": GUARDA, SINCRONIZA Y VUELVE AL INDEX

### 🏠 REGLA DE ORO: UN SOLO CLIC GUARDA, SINCRONIZA Y LLEVA AL INDEX — EN ESE ORDEN
Debe existir un botón **fijo y siempre visible** en el navbar, con ícono de casa (🏠), que el estudiante reconozca de inmediato como "el camino de regreso seguro". Al presionarlo, la clase primero **guarda** el progreso, luego **sincroniza** con el index, muestra una confirmación visual breve, y solo DESPUÉS navega hacia el index — nunca al revés, y nunca salta directo sin guardar.
```html
<!-- Botón fijo en el navbar, siempre visible — icono de casa, posición constante -->
<button id="btn-inicio" class="nav-btn" onclick="volverAlIndex()" title="Guardar y volver al index">
  🏠 Inicio
</button>
```
```javascript
// ═══ URL DEL INDEX — el autor la define en los DATOS A COMPLETAR ═══
const INDEX_URL = '[URL o ruta relativa al index.html de la materia]';
function volverAlIndex() {
  // 1️⃣ Guardar SIEMPRE primero
  save();
  // 2️⃣ Sincronizar con el index (nota, progreso, slide, vidas — Prioridad 8)
  syncIndex();
  // 3️⃣ Confirmación visual breve — el estudiante VE que se guardó antes de salir
  showToast('💾 Guardado · 🔄 Sincronizado — volviendo al index...');
  // 4️⃣ Navegar al index, con una pequeña pausa para que el estudiante alcance a leer el toast
  setTimeout(() => {
    if (INDEX_URL) {
      window.location.href = INDEX_URL;
    } else if (window.history.length > 1) {
      window.history.back(); // respaldo si no hay INDEX_URL configurada
    } else {
      window.close(); // último respaldo si la clase se abrió en una pestaña nueva desde el index
    }
  }, 900);
}
```
```css
#btn-inicio {
  background: linear-gradient(180deg, #fff, #f0f0f0);
  border: 2.5px solid var(--primary);
  color: var(--primary-dark);
  font-weight: 900;
}
#btn-inicio:hover { transform: translateY(-2px); box-shadow: 0 4px 0 var(--primary-dark); }
```
**Reglas del botón de Inicio:**
- Posición FIJA en el navbar — siempre en el mismo lugar, para que el estudiante lo memorice como "mi salida segura"
- SIEMPRE guarda y sincroniza ANTES de navegar — nunca redirige primero y guarda después
- Muestra confirmación visual (toast) antes de salir, para que el estudiante sepa que su avance quedó a salvo
- Funciona igual sin importar en qué slide esté el estudiante, incluso a mitad de un quiz sin terminar (guarda el progreso parcial tal como está — el quiz retoma exactamente ahí al volver, Prioridad 18-B)
- Si `INDEX_URL` no está configurada por el autor, usa `history.back()` como respaldo automático — nunca debe quedar un botón que no haga nada
**Checklist de verificación:**
```
[ ] Botón "🏠 Inicio" fijo y siempre visible en el navbar, en la misma posición
[ ] volverAlIndex() llama save() y syncIndex() ANTES de cualquier redirección
[ ] Toast de confirmación visible antes de navegar fuera de la clase
[ ] INDEX_URL definida por el autor en los datos a completar; si falta, hay respaldo con history.back()
[ ] Funciona igual en cualquier slide, incluso con un quiz a medio contestar (guarda el progreso parcial)
```

## 🟠 PRIORIDAD 22 · ALTA — AVATAR PROPIO: EL ESTUDIANTE ELIGE SU MASCOTA

### 🧑‍🚀 REGLA DE ORO: EL ESTUDIANTE ELIGE, NO SE LE ASIGNA
En el slide `intro`, antes de comenzar el recorrido, el estudiante elige entre 3-4 opciones de avatar/mascota (acordes al universo visual de la semana, Prioridad 0-F). Esa elección lo acompaña durante toda la clase — en el HUD, en el mapa de camino (Prioridad 10-D) y en la pantalla final. Nunca afecta la nota (Prioridad 18-A); es pura identidad y diversión.
```javascript
// AVATARES_TEMA — el autor los define según TEMA_VISUAL, ej. para Minecraft:
// const AVATARES_TEMA = ['⛏️','🧟','🐷','💎'];
function renderSelectorAvatar() {
  const opciones = AVATARES_TEMA || ['🧑‍🚀','🦸','🧙','🐉'];
  return `
    <p style="font-family:var(--font-ui);color:var(--primary-dark);font-size:.95rem;margin-bottom:10px">
      🎭 Elige tu avatar para esta clase:
    </p>
    <div class="avatar-opciones">
      ${opciones.map(a => `
        <button class="avatar-btn ${st.avatarElegido===a?'avatar-sel':''}" onclick="elegirAvatar('${a}')">
          ${a}
        </button>
      `).join('')}
    </div>
  `;
}
function elegirAvatar(emoji) {
  st.avatarElegido = emoji;
  save();
  showToast('✅ ¡Avatar elegido! Te acompañará toda la clase');
  render();
}
```
```css
.avatar-opciones { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 14px; }
.avatar-btn {
  font-size: 2rem; width: 64px; height: 64px; border-radius: 16px;
  background: #fff; border: 3px solid var(--primary-light); cursor: pointer; transition: .15s;
}
.avatar-btn:hover { transform: translateY(-3px); border-color: var(--accent); }
.avatar-btn.avatar-sel { border-color: var(--primary); background: var(--primary-light); box-shadow: 0 3px 0 var(--primary-dark); }
```
**Integración obligatoria:** el avatar elegido (`st.avatarElegido`) reemplaza el ícono fijo `AVATAR_TEMA_ICONO` en el mapa de camino (Prioridad 10-D) y en cualquier lugar del HUD donde se muestre un avatar — con `AVATAR_TEMA_ICONO` solo como respaldo si el estudiante aún no ha elegido. Nunca bloquea el avance si no se elige (queda un emoji por defecto), pero sí se anima a elegir con el toast de confirmación.
**Checklist:**
```
[ ] Selector de avatar visible en el slide intro, con 3-4 opciones según el tema visual
[ ] st.avatarElegido persiste en localStorage — no se pierde al recargar
[ ] El avatar elegido se usa en el HUD y en el mapa de camino (Prioridad 10-D), con AVATAR_TEMA_ICONO como respaldo
[ ] Elegir avatar NUNCA afecta la nota ni bloquea el avance de ninguna slide
```

## 🟠 PRIORIDAD 23 · ALTA — CARTA SORPRESA: BONUS FORMATIVO ALEATORIO

### 🎴 REGLA DE ORO: UN PEQUEÑO IMPREVISTO DIVERTIDO, NUNCA UN RIESGO PARA LA NOTA
Cada cierto tramo de la clase (por ejemplo, al completar una actividad complementaria), existe una probabilidad de que aparezca una "carta sorpresa" — un mini-evento formativo aleatorio: un mensaje motivacional especial, un accesorio cosmético para el avatar, o un pequeño empujón de XP. Refresca la secuencia con algo impredecible, sin ningún riesgo académico.
```javascript
// SORPRESAS_CARTA — el autor puede personalizar el contenido de cada tipo
const SORPRESAS_CARTA = [
  { tipo: 'xp', valor: 15, texto: '¡Carta de energía! +15 XP de regalo 🔋' },
  { tipo: 'mensaje', texto: '¡Sigue así! Cada esfuerzo cuenta, aunque no se vea de inmediato 🌟' },
  { tipo: 'accesorio', valor: '🎩', texto: '¡Desbloqueaste un accesorio para tu avatar! 🎩' },
];
// Llamar tras completar una actividad complementaria (drag/match/fill/orden/wordsearch) —
// NUNCA tras un quiz o evalFinal, para no distraer de lo evaluable
function intentarCartaSorpresa() {
  const probabilidad = 0.35; // 35% de probabilidad — ajustable
  if (Math.random() > probabilidad) return; // no siempre sale, así se siente sorpresa real
  const carta = SORPRESAS_CARTA[Math.floor(Math.random() * SORPRESAS_CARTA.length)];
  mostrarCartaSorpresa(carta);
}
function mostrarCartaSorpresa(carta) {
  if (carta.tipo === 'xp' && typeof gainPts === 'function') gainPts(carta.valor);
  if (carta.tipo === 'accesorio') {
    st.avatarAccesorios = st.avatarAccesorios || [];
    if (!st.avatarAccesorios.includes(carta.valor)) st.avatarAccesorios.push(carta.valor);
    save();
  }
  showModal(`
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:3rem;margin-bottom:8px;animation:floatY 1s infinite">🎴</div>
      <h2 style="font-family:var(--font-ui);color:var(--primary);font-size:1.1rem;margin-bottom:10px">
        ¡Carta sorpresa!
      </h2>
      <p style="font-size:.9rem;color:var(--text2);line-height:1.7;margin-bottom:16px">${carta.texto}</p>
      <button class="mbtn" onclick="closeModal()" style="width:100%">✨ ¡Genial!</button>
    </div>
  `);
}
```
**Reglas de la carta sorpresa:**
- NUNCA aparece durante un quiz, evalFinal, ni ninguna actividad evaluable — solo tras actividades complementarias sin nota
- La probabilidad NUNCA es 100% — debe sentirse como una sorpresa real, no como un paso más del recorrido
- Ningún premio de la carta (XP, accesorio, mensaje) afecta la nota (Prioridad 18-A) — es puramente formativo/cosmético
**Checklist:**
```
[ ] intentarCartaSorpresa() se llama SOLO tras actividades complementarias sin nota, nunca tras evaluables
[ ] La probabilidad de aparición es menor al 100% (ej. 30-40%)
[ ] Ningún premio de la carta afecta st.aciertos ni calcTotal()
[ ] SORPRESAS_CARTA es personalizable por el autor de la clase
```

## 🟠 PRIORIDAD 24 · ALTA — ELIGE TU ACTIVIDAD": CONTROL DEL ESTUDIANTE EN COMPLEMENTARIAS

### 🎯 REGLA DE ORO: EL ESTUDIANTE DECIDE CÓMO DEMOSTRAR LO QUE SABE
En vez de forzar un único tipo de actividad complementaria (drag, match, fill u orden) en un slide, se puede ofrecer **una elección entre 2 tipos** para cumplir ese mismo punto del recorrido — el estudiante elige la que prefiera. Da sensación de control real sin bajar la exigencia pedagógica ni cambiar las reglas de bloqueo (Prioridad 0-C).
```javascript
// Slide tipo 'complementaria-eleccion' — define 2 sub-actividades equivalentes
// {
// type: 'complementaria-eleccion',
// opciones: [
// { tipo: 'drag',  id: 'act_a', config: {...} },
// { tipo: 'match', id: 'act_b', config: {...} },
// ]
// }
function rComplementariaEleccion(s) {
  markSeen();
  const elegida = st.acts['eleccion_'+s.id]; // 'act_a' o 'act_b', una vez elegida no cambia
  if (!elegida) {
    return `
      <div class="slide-title">${s.title}</div>
      <p class="slide-sub">🎯 Elige cómo quieres demostrar lo que aprendiste:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:14px">
        ${s.opciones.map(op => `
          <button class="mbtn" style="flex:1;min-width:160px" onclick="elegirActividad('${s.id}','${op.id}')">
            ${op.tipo === 'drag' ? '🧲 Arrastrar y soltar' : op.tipo === 'match' ? '🔗 Emparejar' : op.tipo === 'fill' ? '✏️ Completar espacios' : '🔢 Ordenar'}
          </button>
        `).join('')}
      </div>
    `;
  }
  // Ya eligió — renderizar la sub-actividad elegida con su función normal (rDrag, rMatch, etc.)
  const opcionElegida = s.opciones.find(o => o.id === elegida);
  return renderActividadPorTipo(opcionElegida); // reutiliza las funciones ya existentes por tipo
}
function elegirActividad(sId, opId) {
  st.acts['eleccion_'+sId] = opId;
  save();
  render();
}
// AGREGAR a puedeAvanzar(s) (Prioridad 0-C), junto a los demás casos:
// case 'complementaria-eleccion': {
// const elegida = st.acts['eleccion_'+s.id];
// if (!elegida) return false; // debe elegir primero
// return !!st.acts[elegida+'_done_'+s.id]; // se desbloquea igual que cualquier complementaria
// }
```
**Reglas de "elige tu actividad":**
- Una vez elegida la actividad, esa elección queda fija para ese intento — no se puede cambiar de opinión a mitad de camino
- Ambas opciones deben ser equivalentes en dificultad y en tiempo — ninguna debe ser "la fácil" evidente
- Se desbloquea con la misma regla que cualquier complementaria (Prioridad 0-C): contestar, bien o mal
- NUNCA afecta la nota — sigue siendo una actividad complementaria sin nota
**Checklist:**
```
[ ] Slide tipo 'complementaria-eleccion' ofrece 2 opciones equivalentes en dificultad
[ ] La elección queda fija una vez tomada — no se puede cambiar a mitad de actividad
[ ] puedeAvanzar() maneja el nuevo tipo igual que las demás complementarias (contestar desbloquea)
[ ] Esta actividad sigue sin afectar la nota (Prioridad 18-A)
```

## 🟠 PRIORIDAD 25 · ALTA — SEMÁFORO DE CONFIANZA ANTES DE CADA QUIZ

### 🚦 REGLA DE ORO: EL ESTUDIANTE SE AUTOEVALÚA ANTES DE RESPONDER, SIN RIESGO
Justo antes de iniciar cada quiz (`quiz1`, `quiz2`, `evalFinal`), se le pregunta al estudiante qué tan seguro se siente con el tema, usando un semáforo simple (🟢🟡🔴). Es puramente reflexivo — nunca afecta la nota — y le da al docente, desde el Panel Docente (Prioridad 16), un dato valioso: confianza percibida vs. resultado real.
```javascript
// Llamar ANTES de renderizar la primera pregunta de un quiz, si aún no se ha registrado confianza
function rSemaforoConfianza(sId, callbackContinuar) {
  return `
    <div class="slide-title">🚦 Antes de empezar...</div>
    <p class="slide-sub">¿Qué tan seguro te sientes con este tema?</p>
    <div style="display:flex;gap:14px;justify-content:center;margin:20px 0">
      <button class="semaforo-btn" onclick="registrarConfianza('${sId}','verde','${callbackContinuar}')">🟢<br><span>Muy seguro</span></button>
      <button class="semaforo-btn" onclick="registrarConfianza('${sId}','amarillo','${callbackContinuar}')">🟡<br><span>Más o menos</span></button>
      <button class="semaforo-btn" onclick="registrarConfianza('${sId}','rojo','${callbackContinuar}')">🔴<br><span>Inseguro</span></button>
    </div>
    <p style="font-size:.76rem;color:var(--muted);text-align:center">
      Esto no afecta tu nota — es solo para que tu profe entienda mejor cómo te sientes 💬
    </p>
  `;
}
function registrarConfianza(sId, nivel, callbackContinuar) {
  st.acts['confianza_'+sId] = nivel; // se guarda para el Panel Docente, nunca para la nota
  save();
  render(); // continúa al quiz normalmente (rQuiz ya revisa que confianza_+id exista)
}
// AGREGAR en rQuiz(s) (Prioridad 5), justo antes de mostrar la primera pregunta:
// if (!st.acts['confianza_'+s.id] && !st.acts['completado_'+s.id]) return rSemaforoConfianza(s.id);
```
```css
.semaforo-btn {
  background: #fff; border: 3px solid var(--primary-light); border-radius: 16px;
  padding: 14px 18px; font-size: 1.8rem; cursor: pointer; transition: .15s;
  display: flex; flex-direction: column; align-items: center; gap: 6px;
}
.semaforo-btn span { font-size: .68rem; font-family: var(--font-ui); color: var(--text2); }
.semaforo-btn:hover { transform: translateY(-3px); border-color: var(--accent); }
```
**Integración con el Panel Docente (Prioridad 16):** el tab "Stats" puede mostrar, junto a cada quiz, el nivel de confianza que el estudiante marcó antes de responder (`st.acts['confianza_'+quizId]`) comparado con su resultado real — dato útil para detectar, por ejemplo, estudiantes que se sienten muy seguros pero fallan mucho (posible exceso de confianza) o al revés (inseguridad injustificada).
**Reglas del semáforo de confianza:**
- Aparece UNA sola vez por quiz, antes de la primera pregunta — nunca se repite si el estudiante ya respondió parte del quiz
- Es completamente reflexivo — ninguna opción es "correcta" ni afecta `calcTotal()`
- Nunca bloquea el avance más allá de elegir una opción (elegir cualquiera de las 3 continúa al quiz de inmediato)
**Checklist:**
```
[ ] rSemaforoConfianza() aparece antes de la primera pregunta de quiz1, quiz2 y evalFinal
[ ] st.acts['confianza_'+id] persiste y nunca afecta st.aciertos ni calcTotal()
[ ] No vuelve a preguntar si el estudiante ya avanzó en ese quiz (revisa confianza_+id antes de mostrar)
[ ] Panel Docente (Prioridad 16) puede mostrar confianza vs. resultado real, si se desea potenciar esa vista
```


## 🟠 PRIORIDAD 26 · ALTA — TRANSICIONES ANIMADAS ENTRE SLIDES, CON DIRECCIÓN

### 🎬 REGLA DE ORO: LA CLASE SE SIENTE COMO UNA APP, NUNCA COMO UN DOCUMENTO QUE SE RECARGA
Cada vez que `render()` cambia el contenido, debe aplicarse una animación breve de deslizamiento + desvanecido — y la DIRECCIÓN depende de si el estudiante avanza o retrocede.

```javascript
// En render() (Prioridad 8-O), en vez de wrap.innerHTML = html directo:
let _pd_slidePrevio = 0;
function pintarConDireccion(wrap, html) {
  const direccion = st.slide >= _pd_slidePrevio ? 'next' : 'back';
  _pd_slidePrevio = st.slide;
  wrap.classList.remove('slide-enter-next','slide-enter-back');
  wrap.innerHTML = html;                       // 🔺 SÍNCRONO — nunca dentro de un setTimeout
  void wrap.offsetWidth;                        // fuerza reflow para que la animación de reinicie siempre
  wrap.classList.add(direccion === 'next' ? 'slide-enter-next' : 'slide-enter-back');
}
```
```css
#slide-wrap { position: relative; }
.slide-enter-next { animation: slideInRight .28s cubic-bezier(.22,.9,.32,1) both; }
.slide-enter-back  { animation: slideInLeft  .28s cubic-bezier(.22,.9,.32,1) both; }
@keyframes slideInRight  { from { opacity:0; transform: translateX(24px); } to { opacity:1; transform: translateX(0); } }
@keyframes slideInLeft   { from { opacity:0; transform: translateX(-24px); } to { opacity:1; transform: translateX(0); } }
@media (prefers-reduced-motion: reduce) { .slide-enter-next, .slide-enter-back { animation: none !important; } }
```
**Reglas:**
- El HTML se escribe siempre de forma síncrona — la animación es un efecto puramente visual que nunca retrasa el contenido ni el cronómetro.
- Duración ~280ms — nunca más lento, para no frustrar al estudiante que navega rápido.
- Dirección: derecha→izquierda al avanzar (`nextSlide`), izquierda→derecha al retroceder (`prevSlide`, 8-O).
- Respeta `prefers-reduced-motion`.
**Checklist:**
```
[ ] pintarConDireccion() escribe wrap.innerHTML de forma SÍNCRONA — no existe ningún setTimeout entre calcular el HTML y pintarlo
[ ] Animación puramente CSS (clases + @keyframes), nunca JS animando opacidad/transform con setInterval
[ ] @media (prefers-reduced-motion: reduce) desactiva las animaciones
[ ] El cronómetro de lectura (8-N), el bloqueo de actividades (8-O) y el menú de ruta (10-C) funcionan exactamente igual con o sin la animación
```

## 🟠 PRIORIDAD 27 · ALTA — REACCIONES FLOTANTES AL COMPLETAR UNA ACTIVIDAD

### 🎉 REGLA DE ORO: CADA LOGRO SE CELEBRA CON EMOJIS QUE FLOTAN DESDE EL PUNTO DE ACCIÓN
Además (nunca en reemplazo) del toast de texto existente, deben aparecer 3-4 emojis que suben flotando **desde la zona del botón/actividad que el estudiante acaba de tocar** y se desvanecen — más natural que aparecer en el centro de la pantalla.
```javascript
// Llamar junto a (nunca en vez de) showToast() en los puntos donde ya se celebra un logro:
// onDragComplete, onMatchComplete, onFillComplete, onTFComplete, onOrdenVerificar,
// marcarPalabraEncontradaWS, responderQuiz (si correcta), otorgarBadge
function lanzarReaccionesFlotantes(origenEl, emojis) {
  const lista = emojis || ['🎉','✨','⭐','🌟'];
  const rect = (origenEl || document.getElementById('btn-next'))?.getBoundingClientRect();
  const baseX = rect ? rect.left + rect.width/2 : window.innerWidth/2;
  const baseY = rect ? rect.top : window.innerHeight/2;
  const cantidad = Math.min(4, lista.length + 1); // 3 a 4 emojis, nunca más
  for (let i = 0; i < cantidad; i++) {
    const span = document.createElement('span');
    span.textContent = lista[i % lista.length];
    span.className = 'reaccion-flotante';
    const desplazX = (Math.random() * 60 - 30);
    span.style.left = (baseX + desplazX) + 'px';
    span.style.top  = baseY + 'px';
    span.style.animationDelay = (i * 90) + 'ms';
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 1400);
  }
}
// Ejemplo: agregar DESPUÉS del showToast() ya existente:
// showToast('✅ ¡Actividad completada! Puedes continuar →');
// lanzarReaccionesFlotantes(document.getElementById('btn-next'), ['🎉','✨','⭐']); //
```
```css
.reaccion-flotante {
  position: fixed; font-size: 1.6rem; pointer-events: none; z-index: 950;
  animation: reaccionSubir 1.2s ease-out forwards; transform: translate(-50%, 0);
}
@keyframes reaccionSubir {
  0%   { opacity: 0; transform: translate(-50%, 0) scale(.6); }
  15%  { opacity: 1; transform: translate(-50%, -10px) scale(1.1); }
  100% { opacity: 0; transform: translate(-50%, -90px) scale(1); }
}
@media (prefers-reduced-motion: reduce) { .reaccion-flotante { display: none; } }
```
**Reglas:**
- Máximo 3-4 emojis por evento — nunca una lluvia excesiva
- Se lanza SIEMPRE junto al toast existente, nunca en su lugar
- NUNCA se dispara en una respuesta incorrecta de quiz — solo en aciertos y actividades completadas
- No se combina con los fuegos artificiales SVG de `rFinal()` (Prioridad 11) — sistemas independientes
- Respeta `prefers-reduced-motion`
**Checklist:**
```
[ ] lanzarReaccionesFlotantes() se llama junto a showToast() en: drag, match, fill, tf, orden, wordsearch, quiz (acierto), otorgarBadge
[ ] Nunca más de 4 emojis por evento, lanzados desde el elemento de origen (no del centro fijo de pantalla)
[ ] Nunca se dispara en una respuesta incorrecta de quiz
[ ] No se combina con los fuegos artificiales SVG de rFinal()
[ ] @media (prefers-reduced-motion: reduce) oculta las reacciones
```

## 🟠 PRIORIDAD 28 · ALTA — SLIDER "ANTES / DESPUÉS" PARA CONCEPTOS DE COMPARACIÓN

### 🔀 REGLA DE ORO: CUANDO EL CONCEPTO ES UNA TRANSFORMACIÓN O COMPARACIÓN, SE TOCA Y SE DESLIZA
Para slides de concepto donde el contenido sea una comparación real (antes/después, correcto/incorrecto, con/sin, antiguo/moderno) — alternativa opcional al grid 2×2 (Prioridad 1) o a los hotspots (Prioridad 19), nunca obligatoria — una imagen dividida con una manija deslizable que el estudiante arrastra con mouse o dedo.
```html
<div class="ad-slider" id="ad-slider-1">
  <img src="https://images.unsplash.com/photo-[ID_DESPUES]?w=500&h=320&fit=crop&auto=format&q=80"
       alt="[descripción DESPUÉS]" loading="lazy" class="ad-img ad-img-fondo">
  <div class="ad-img-recorte">
    <img src="https://images.unsplash.com/photo-[ID_ANTES]?w=500&h=320&fit=crop&auto=format&q=80"
         alt="[descripción ANTES]" loading="lazy" class="ad-img">
  </div>
  <div class="ad-linea"></div>
  <button class="ad-handle" aria-label="Deslizar para comparar">↔️</button>
  <span class="ad-etiqueta ad-etiqueta-izq">ANTES</span>
  <span class="ad-etiqueta ad-etiqueta-der">DESPUÉS</span>
</div>
```
```javascript
// Inicializar CADA slider antes/después presente en el slide actual (mouse Y touch)
function initAntesDepues(contId) {
  const cont = document.getElementById(contId);
  if (!cont) return;
  const recorte = cont.querySelector('.ad-img-recorte');
  const linea   = cont.querySelector('.ad-linea');
  const handle  = cont.querySelector('.ad-handle');
  let arrastrando = false;
  function mover(clientX) {
    const rect = cont.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(4, Math.min(96, pct));
    recorte.style.width = pct + '%';
    linea.style.left = pct + '%';
    handle.style.left = pct + '%';
  }
  handle.addEventListener('mousedown', () => arrastrando = true);
  handle.addEventListener('touchstart', () => arrastrando = true, {passive:true});
  window.addEventListener('mousemove', (e) => { if (arrastrando) mover(e.clientX); });
  window.addEventListener('touchmove', (e) => { if (arrastrando) mover(e.touches[0].clientX); }, {passive:true});
  window.addEventListener('mouseup', () => arrastrando = false);
  window.addEventListener('touchend', () => arrastrando = false);
  cont.addEventListener('click', (e) => { if (e.target !== handle) mover(e.clientX); });
  cont.addEventListener('pointerdown', () => {
    if (!st.acts['ad_click_'+contId]) { st.acts['ad_click_'+contId] = true; save(); } // formativo, nunca afecta nota
  });
}
// Llamar initAntesDepues('ad-slider-1') justo después de insertar el HTML del slide en render()
```
```css
.ad-slider {
  position: relative; width: 100%; max-width: 500px; margin: 10px auto;
  aspect-ratio: 500 / 320; border-radius: 14px; overflow: hidden;
  border: 4px solid var(--primary); box-shadow: 0 3px 0 var(--primary-dark);
  user-select: none; touch-action: pan-y;
}
.ad-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.ad-img-fondo { position: absolute; inset: 0; }
.ad-img-recorte { position: absolute; inset: 0; width: 50%; overflow: hidden; border-right: 3px solid #fff; }
.ad-img-recorte .ad-img { width: 500px; max-width: none; }
.ad-linea { position: absolute; top: 0; bottom: 0; left: 50%; width: 3px; background: #fff; box-shadow: 0 0 6px rgba(0,0,0,.4); pointer-events: none; }
.ad-handle {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 40px; height: 40px; border-radius: 50%; background: #fff; border: 3px solid var(--primary);
  color: var(--primary-dark); font-size: 1rem; cursor: ew-resize; box-shadow: 0 2px 6px rgba(0,0,0,.3);
  display: flex; align-items: center; justify-content: center;
}
.ad-etiqueta { position: absolute; bottom: 8px; background: rgba(0,0,0,.55); color: #fff; font-family: var(--font-ui); font-size: .68rem; padding: 3px 9px; border-radius: 8px; }
.ad-etiqueta-izq { left: 8px; } .ad-etiqueta-der { right: 8px; }
```
**Reglas:** uso opcional solo cuando el concepto sea comparación real · ambas imágenes cuentan para el mínimo de 20 (Prioridad 1) con alt + fallback emoji · funciona con mouse Y touch · nunca afecta la nota (Prioridad 18-A).
**Checklist:**
```
[ ] Patrón .ad-slider usado SOLO en slides donde el contenido es una comparación/transformación real
[ ] initAntesDepues() inicializado tras insertar el HTML del slide en render()
[ ] Funciona con mouse Y con touch, probado en ambos casos
[ ] Cada <img> interna tiene alt descriptivo y fallback emoji (Prioridad 1)
[ ] El uso del slider nunca afecta la nota (Prioridad 18-A)
```

## 🟠 PRIORIDAD 29 · ALTA — PARALLAX SUTIL EN EL FONDO DECORATIVO

### 🌫️ REGLA DE ORO: PROFUNDIDAD DISCRETA, NUNCA UNA DISTRACCIÓN
El patrón decorativo de fondo del tema visual (Prioridad 12) se mueve a una velocidad ligeramente distinta al contenido al hacer scroll dentro de `#slide-wrap` — usando una capa de fondo SEPARADA del contenido, con `requestAnimationFrame` para no afectar el rendimiento.
```javascript
// Requiere un elemento de fondo separado: <div id="fondo-parallax" class="fondo-parallax-capa"></div>
let _parallaxTicking = false;
function initParallaxFondo() {
  const wrap = document.getElementById('slide-wrap');
  const fondo = document.getElementById('fondo-parallax');
  if (!wrap || !fondo) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // respeta accesibilidad, ni se agrega el listener
  wrap.addEventListener('scroll', () => {
    if (_parallaxTicking) return;
    _parallaxTicking = true;
    requestAnimationFrame(() => {
      const desplazado = wrap.scrollTop * 0.25; // el fondo se mueve al 25% de la velocidad del scroll
      fondo.style.transform = `translateY(${desplazado}px)`;
      _parallaxTicking = false;
    });
  }, { passive: true });
}
// Llamar initParallaxFondo() UNA sola vez en el arranque (DOMContentLoaded), después del primer render()
```
```css
.fondo-parallax-capa {
  position: absolute; top: 0; left: 0; right: 0; height: 140%;
  z-index: 0; pointer-events: none; opacity: .12; background-repeat: repeat; will-change: transform;
}
#slide-wrap { position: relative; overflow-y: auto; }
#slide-wrap > *:not(.fondo-parallax-capa) { position: relative; z-index: 1; }
@media (prefers-reduced-motion: reduce) { .fondo-parallax-capa { transform: none !important; } }
```
**Reglas:** el fondo se mueve más lento que el contenido (25-35% del scroll) · opacidad baja (10-15%) · `z-index` siempre menor que el contenido, nunca tapa ni bloquea clics · usa `requestAnimationFrame`, nunca recalcula sin throttle · respeta `prefers-reduced-motion`.
**Checklist:**
```
[ ] initParallaxFondo() se llama una sola vez en el arranque, tras el primer render()
[ ] El fondo decorativo se mueve más lento que el contenido (aprox. 25-35% de la velocidad de scroll)
[ ] Opacidad del fondo entre 10-15% — nunca compite con el texto
[ ] z-index del fondo siempre por debajo del contenido — nunca bloquea clics ni tapa texto
[ ] requestAnimationFrame usado para el cálculo — sin recalcular de forma no optimizada en cada pixel de scroll
[ ] @media (prefers-reduced-motion: reduce) desactiva el movimiento del fondo (y ni siquiera agrega el listener)
```

---

# 22 · ARIA: reglas de comportamiento y ganchos con la clase (el código está en aria/aria_widget.html)

## 🟠 PRIORIDAD 30 · ALTA — ARIA: ROBOT ASISTENTE DE LA CLASE, CON CHAT Y VOZ

### 🤖 REGLA DE ORO: ARIA ES UN COMPAÑERO PERMANENTE, NO UN ADORNO — RESPONDE SOLO CON LO QUE SABE, NUNCA INVENTA
Toda clase generada con este prompt DEBE incluir **ARIA**, un asistente flotante (FAB) que:
1. Explica qué hay que hacer y cómo se hace en la pantalla actual (basado en el `type` y `title` del slide real, no un texto genérico fijo).
2. Da frases motivacionales personalizadas con el nombre del estudiante.
3. Permite **chatear**: el estudiante escribe una pregunta y ARIA responde con un motor de reglas por palabras clave que consulta el `GLOSARIO` real de la clase y el estado (`st`) actual — **nunca inventa una definición que no esté en el glosario de esa semana.**
4. Puede **hablar en voz alta** (Web Speech API del navegador, sin servicios externos ni costo).
5. Es arrastrable (no estorba) y tiene chips de preguntas rápidas según el momento de la clase.

**Por qué es distinto de un simple tip fijo:** los tips estáticos (Prioridad existente de "consejo por tipo de slide") son un mensaje que aparece una vez. ARIA además **conversa**: el estudiante puede preguntarle "¿qué es una décima?" en medio de un quiz y recibe la definición exacta del glosario de esa semana, sin salir de la pantalla.

### 30.1 — HTML del FAB y la burbuja de chat (COPIAR Y ADAPTAR)
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (marcado HTML/CSS del avatar). No se reescribe: se inserta con `tools/insertar_aria.py`.

### 30.2 — CSS del FAB (estados: hablando, pensando, saludando, arrastrando)
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (marcado HTML/CSS del avatar). No se reescribe: se inserta con `tools/insertar_aria.py`.

### 30.3 — Motor de respuestas: consulta el GLOSARIO real, nunca inventa (COPIAR Y ADAPTAR)
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (`normalizaTexto`, `responderAria`, `agregarMensajeAria`). No se reescribe: se inserta con `tools/insertar_aria.py`.

### 30.4 — Voz (Web Speech API — sin servicios de pago) y saludo inicial personalizado
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (HTML/CSS/JS del avatar). No se reescribe: se inserta con `tools/insertar_aria.py`.

### 30.5 — Arrastre del FAB (para que nunca tape contenido importante)
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (`soltar`). No se reescribe: se inserta con `tools/insertar_aria.py`.

**Reglas no negociables de ARIA:**
- ARIA **nunca da la respuesta correcta** de un quiz/evalFinal — si le preguntan por una respuesta de evaluación, redirige a "revisa el ejemplo resuelto" (igual que la Pista del menú de herramientas).
- ARIA **nunca inventa** una definición: solo usa `GLOSARIO`. Si el término no está, lo dice honestamente.
- El saludo inicial y cada "tip nuevo" se guardan en `st.acts` para no repetirse cada vez que el estudiante recarga o navega.
- La voz es 100% opcional y depende de `speechSynthesis` del navegador — si el navegador no la soporta, ARIA simplemente no habla, sin error visible.

**Checklist:**
```
[ ] #aria-fab presente (widget insertado con tools/insertar_aria.py, UNA sola vez), arrastrable, con efectos de expresión (ARIA_FX)
[ ] Burbuja de chat con chips rápidos + input + botón enviar
[ ] responderAria() consulta CLASE_META ante preguntas de tema/objetivo, antes que el GLOSARIO
[ ] responderAria() consulta el GLOSARIO real antes que cualquier regla genérica
[ ] responderAria() nunca inventa: si no reconoce la pregunta, lo dice honestamente
[ ] ARIA nunca revela la respuesta correcta de un quiz/evalFinal
[ ] hablarAria() usa Web Speech API, con manejo seguro si el navegador no la soporta
[ ] saludoInicialAria() se muestra una sola vez por estudiante (persistido en st.acts)
[ ] Chips de ARIA cambian según el tipo de slide actual (quiz/evalFinal agrega "¿Esto tiene nota?")
```


## 🟠 PRIORIDAD 30-B · ALTA — ARIA: ORIENTACIÓN SOCRÁTICA ANTE PREGUNTAS DE QUIZ COPIADAS/PEGADAS, SIN REVELAR NUNCA LA RESPUESTA

### 🧭 REGLA DE ORO: SI EL ESTUDIANTE PEGA UNA PREGUNTA DE EVALUACIÓN, ARIA ORIENTA COMO LO HARÍA EL PROFE LUIS — NUNCA LA RESUELVE

**Por qué existe esta prioridad:** la Prioridad 30 declara que "ARIA nunca da la respuesta correcta de un quiz", pero esa regla vivía solo como texto — ningún código de `responderAria()` la verificaba. Esta prioridad la implementa de verdad, y de paso convierte a ARIA en un apoyo real para cuando el profe Luis no está presente (tarea en casa, estudiante repasando solo): si el estudiante copia y pega el enunciado de una pregunta —o escribe algo muy parecido, sin copiarlo literal—, ARIA lo reconoce y responde orientando el proceso de pensar la respuesta, tal como lo haría el profesor en persona, sin resolvérsela nunca.

### 30-B.1 — Detector de pregunta copiada o parecida (compara contra TODAS las preguntas de la clase, no solo la de la slide actual)
El estudiante puede pegar la pregunta desde cualquier parte (una captura, un cuaderno, otra pestaña) sin estar necesariamente en esa slide — por eso el detector recorre `SL` completo, no solo `SL[st.slide]`.
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (`similitudTextoAria`, `detectarPreguntaCopiadaAria`). No se reescribe: se inserta con `tools/insertar_aria.py`.

### 30-B.2 — Generador de orientación socrática: usa la `pistaAyuda` del profe Luis si existe; si no, un scaffolding genérico de respaldo
**Nunca** revela cuál opción es la correcta, ni siquiera indirectamente descartando opciones por su cuenta — eso podría delatar la respuesta por eliminación. Lo que hace es orientar el PROCESO: releer el contexto, identificar el dato clave, comparar cada opción contra ese dato. Varias variantes para que no suene repetitiva, y con referencia al profe Luis solo en algunas, no en todas.
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (`orientacionSocraticaAria`, `ARIA_ORIENTACION_QUIZ_GENERICA`). No se reescribe: se inserta con `tools/insertar_aria.py`.

### 30-B.3 — Integración obligatoria dentro de `responderAria()` (Prioridad 30.3)
Esta verificación va **primero**, antes de la consulta al `CLASE_META` y al `GLOSARIO` — así una pregunta de quiz pegada nunca se confunde con una simple pregunta de vocabulario y termina revelando el dato clave por accidente.
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (`responderAria`). No se reescribe: se inserta con `tools/insertar_aria.py`.

### 30-B.4 (opcional pero recomendado) — Registrar en el Panel Docente qué preguntas generan más pedidos de ayuda
Esto es información real de diagnóstico para el profe Luis, disponible aunque no esté presente cuando el estudiante pregunta: saber qué preguntas confunden más ayuda a decidir qué reforzar en la siguiente clase.
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (HTML/CSS/JS del avatar). No se reescribe: se inserta con `tools/insertar_aria.py`.
Llamar `registrarSolicitudAyudaAria(preguntaCopiada)` justo antes del `return` en 30-B.3. El Panel Docente (Prioridad 16) puede sumar estos contadores entre estudiantes (mismo patrón que ya usa para leer otras claves con el `PREFIX` de la semana) y mostrar un pequeño listado "📊 Preguntas con más solicitudes de ayuda" — no es obligatorio para el checklist de esta prioridad, pero se deja documentado porque es una extensión natural y de bajo costo.

### 30-B.5 (opcional) — Objeto `METODOS`: la misma idea del `GLOSARIO`, pero para procedimientos ("¿cómo se hace...?")
Útil para dudas de proceso que no son una pregunta puntual del quiz (ej. "¿cómo se resta llevando?", "¿cómo se hace una regla de tres?"). El profe Luis lo llena solo si aplica al tema de la semana; si no existe, ARIA simplemente no lo consulta.
```javascript
// const METODOS = [
// { titulo: 'Resta llevando', disparadores: ['restar llevando','como se resta','resta con present'],
// pasos: 'Como lo explica el profe Luis: 1) resta las unidades; 2) si el de arriba es menor, "pide prestado" 1 a la decena; 3) resta esa columna; 4) sigue con las siguientes columnas.' }
// ];
if (typeof METODOS !== 'undefined'){
  for (const m of METODOS){
    if (m.disparadores.some(d => n.includes(normalizaTexto(d)))){
      return `🧮 <strong>${m.titulo}:</strong> ${m.pasos}`;
    }
  }
}
```
Este bloque va justo después de la consulta al `GLOSARIO` en `responderAria()` (30-B.3), antes de las reglas genéricas por palabra clave de la Prioridad 30.3.

**Reglas no negociables adicionales de esta prioridad:**
- `orientacionSocraticaAria()` **nunca** menciona cuál opción es correcta, ni la descarta por su cuenta — solo orienta el proceso de análisis, igual que la "Pista" de la Prioridad 16-B.
- El umbral de similitud (0.55) es deliberadamente conservador: es preferible que ARIA no detecte una pregunta pegada de vez en cuando, a que confunda una pregunta normal del estudiante con una de evaluación y responda de forma extraña.
- Si el profe Luis no escribió `pistaAyuda` en ninguna pregunta, la clase sigue funcionando perfecto: ARIA usa el scaffolding genérico de `ARIA_ORIENTACION_QUIZ_GENERICA`.

**Checklist:**
```
[ ] responderAria() verifica detectarPreguntaCopiadaAria() ANTES que la consulta a CLASE_META y al GLOSARIO
[ ] detectarPreguntaCopiadaAria() compara contra TODAS las preguntas de SL, no solo la slide actual
[ ] orientacionSocraticaAria() usa pistaAyuda si existe; si no, elige al azar entre las variantes genéricas
[ ] Ninguna variante de ARIA_ORIENTACION_QUIZ_GENERICA revela ni descarta opciones
[ ] El esquema de cada pregunta (Prioridad 5) incluye el campo opcional pistaAyuda
[ ] (Opcional) registrarSolicitudAyudaAria() guarda el conteo por pregunta en localStorage
```


## 🟠 PRIORIDAD 30-C · ALTA — ARIA: LECTOR PROFUNDO DE TODA LA CLASE + EXPLICACIÓN DE CONCEPTOS Y PROCESOS EN PALABRAS SIMPLES

### 🧠 REGLA DE ORO: ARIA PUEDE EXPLICAR "CÓMO SE HACE" O "QUÉ ES" CUALQUIER COSA QUE YA ESTÉ ESCRITA EN LA CLASE, CON SUS PROPIAS PALABRAS — PERO NUNCA RESUELVE UNA PREGUNTA CON NOTA

**Por qué existe esta prioridad:** la Prioridad 30 le da a ARIA un motor de reglas por palabras clave y consulta del `GLOSARIO`, y la 30-B le enseña a detectar y NO resolver una pregunta de quiz copiada/pegada. Pero ninguna de las dos le daba a ARIA la capacidad de **leer el contenido completo de la clase** (todas las diapositivas, no solo el `GLOSARIO` de términos sueltos) y **explicar con sus propias palabras un concepto o un proceso paso a paso** cuando el estudiante pregunta "¿cómo se hace esto?", "explícame X", "¿qué es X?" o "¿cómo funciona X?" — quedaba limitado a lo que estuviera literalmente en `GLOSARIO`, y si el término no estaba ahí, ARIA respondía "no sé", aunque la explicación completa SÍ estuviera dos diapositivas atrás. Esta prioridad agrega ese lector profundo, con una regla no negociable: **nunca** toca el contenido de una diapositiva `quiz`/`evalFinal` para esto — esa protección ya la implementa la 30-B, y aquí se refuerza filtrando esas diapositivas del índice antes de buscar.

### 30-C.1 — Indexador de todo el contenido de la clase (todas las diapositivas, con su `type` real de `SL`)
A diferencia de la 30-B (que compara contra `SL[i].preguntas`), este indexador lee el **texto completo** de cada diapositiva ya renderizada en el DOM (o, si `SL[i].id` coincide, usa directamente el arreglo `SL` de la Prioridad 9) para poder citarlo y explicarlo — nunca inventa contenido que la clase no tenga.
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (`indexarContenidoClaseAria`). No se reescribe: se inserta con `tools/insertar_aria.py`.
> 📌 Si el `data-slide-id` no está presente en el HTML real de la clase (algunas clases más antiguas no lo tienen en el nodo raíz de la diapositiva), agrega el atributo `data-slide-id="${s.id}"` al contenedor de cada diapositiva al renderizarla — es un cambio de una sola línea en `render()` y no afecta ninguna otra prioridad.

### 30-C.2 — Detección de secuencias de pasos y simplificación leve del lenguaje (nunca cambia el significado)
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (`extraerPasosAria`, `simplificarLenguajeAria`). No se reescribe: se inserta con `tools/insertar_aria.py`.

### 30-C.3 — Motor de explicación: busca en TODA la clase (excepto quiz/evalFinal) y arma la respuesta
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (`esPreguntaDeExplicacionAria`, `construirExplicacionDesdeItemAria`, `explicarConceptoOProcesoAria`, `ARIA_DISPARADORES_EXPLICACION`). No se reescribe: se inserta con `tools/insertar_aria.py`.

### 30-C.4 — Integración obligatoria dentro de `responderAria()` (encaja justo después del bloque de la 30-B.3, ANTES de las reglas genéricas de la 30.3)
El orden completo y definitivo de `responderAria()` queda así — de más a menos específico, siempre respetando primero el bloqueo de la 30-B:
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (`responderAria`). No se reescribe: se inserta con `tools/insertar_aria.py`.
> ⚠️ Esta función **ANULA Y REEMPLAZA** la versión de `responderAria()` de la Prioridad 30.3 y la del bloque 30-B.3 — hoy existe **UNA SOLA** implementación, la de arriba, que incluye ambas piezas más el paso 5 nuevo. Ninguna otra prioridad llama a `responderAria()` de forma distinta.

### 30-C.5 — Cuándo se indexa el contenido (integración con `render()`)
`indexarContenidoClaseAria()` se llama una vez justo después de `load()` (para que el chat funcione desde la primera pregunta, aunque el estudiante todavía no haya avanzado ninguna diapositiva) y de nuevo al final de cada `render()` — así el índice siempre incluye el contenido real tal como quedó escrito en el DOM, con las variables de esa sesión ya resueltas (nombres, valores de ejercicios, etc., si la clase los interpola).
```javascript
// Dentro de render(), como última línea (después de escribir el HTML de la diapositiva actual):
indexarContenidoClaseAria();
```

**Reglas no negociables de esta prioridad:**
- `explicarConceptoOProcesoAria()` **filtra siempre** las diapositivas `quiz`/`evalFinal` de su búsqueda — nunca las lee, nunca las cita, sin excepción, sin importar cuántas palabras coincidan.
- La explicación siempre cita explícitamente el título de la diapositiva de origen ("Esto lo vimos en..."), para que el estudiante pueda volver a leerla completa si quiere.
- `simplificarLenguajeAria()` solo cambia conectores y verbos por su equivalente cotidiano — nunca resume, nunca omite información, nunca agrega un dato que la clase no tenga.
- Si el estudiante pregunta por un proceso que la clase no cubre, ARIA no inventa pasos: cae al mensaje honesto del punto 7 de `responderAria()`.

**Checklist:**
```
[ ] indexarContenidoClaseAria() indexa TODAS las diapositivas de SL con su título, texto y type real
[ ] indexarContenidoClaseAria() se llama tras load() y al final de cada render()
[ ] explicarConceptoOProcesoAria() excluye SIEMPRE type 'quiz' y 'evalFinal' de sus candidatos
[ ] extraerPasosAria() numera correctamente una secuencia de pasos cuando el texto los trae
[ ] simplificarLenguajeAria() no cambia el significado del texto original, solo el registro
[ ] responderAria() tiene el orden exacto: 30-B (copiada) → CLASE_META → GLOSARIO → METODOS → 30-C (explicación) → reglas genéricas → honestidad final
[ ] Existe UNA SOLA implementación de responderAria() en todo el archivo (buscar "function responderAria" y confirmar que aparece una vez)
```


## 🟠 PRIORIDAD 30-D · ALTA — ARIA CON EXPRESIVIDAD FÍSICA: 6 POSES OFICIALES + ANIMACIÓN POR ESTADO

### 🎭 REGLA DE ORO: ARIA REACCIONA CON EL CUERPO, NO SOLO CON TEXTO — CADA EVENTO DE LA CLASE TIENE SU POSE Y SU ANIMACIÓN

**Qué es:** ARIA tiene 6 poses oficiales (WebP con fondo transparente, cada una con su globo de texto dibujado). Se incrustan en base64 (Prioridad 31) dentro de `ARIA_SPRITES`. La función `ariaReaccionar(estado)` muestra la pose sobre el botón de ARIA con una animación distinta por estado (salto, rebote, latido, temblor, saludo) y la oculta sola a los ~3 s. Además, las categorías afines del avatar (`logro`, `animo`, `despedida`, `dormida`, `triste`, `confundida`, `carino`, `genial`) pasan a usar estas poses.

| Estado | Pose | Animación | Cuándo llamarlo |
|---|---|---|---|
| `correcto` | ¡Correcto! (salta con check) | saltar | Al responder bien un quiz |
| `genial` | ¡Lo estás haciendo genial! (pulgar arriba) | rebotar | Racha de aciertos, pantalla completada, subida de nivel |
| `animo` | ¡Tú puedes! (puños arriba) | saltar | Al perder una vida o al fallar el primer intento |
| `dificil` | ¡Uy! Parece difícil... (preocupada) | temblar | Al fallar 2 veces seguidas o tras pedir ayuda repetida |
| `ayuda` | ¿Sigues aquí? ¿Necesitas ayuda? | latir | Tras ~90 s sin actividad en una diapositiva |
| `despedida` | ¡Nos vemos! (saluda) | saludar | Al terminar la clase o cerrar el chat |

### 30-D.1 — Código (COPIAR Y ADAPTAR; va en un `<script>` DESPUÉS de `ARIA_IMG_POR_CATEGORIA` de la Prioridad 30)
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (`ariaReaccionar`, `ARIA_SPRITES`, `ARIA_SPRITE_POR_CATEGORIA`, `ARIA_REACCIONES`). No se reescribe: se inserta con `tools/insertar_aria.py`.
CSS obligatorio (con `!important` en la imagen para que un `img{...}` global de la clase no la deforme): contenedor `#aria-reaccion` fijo a `right:18px; bottom:225px; width:190px; pointer-events:none; opacity:0`, clase `.aria-reaccion-visible{opacity:1}` y cinco `@keyframes` (`aria-r-saltar`, `aria-r-rebotar`, `aria-r-latir`, `aria-r-temblar`, `aria-r-saludar`) — copiarlos idénticos del demo `aria_avatar_demo_v2_1.html`. Incluir `@media (prefers-reduced-motion:reduce){ #aria-reaccion{animation:none !important} }`.

### 30-D.2 — Conexión con el quiz (la pieza que faltaba)
```javascript
// Dentro del manejador de respuesta del quiz (Prioridad 5), tras evaluar:
if (esCorrecta){ ariaReaccionar(st.rachaAciertos >= 3 ? 'genial' : 'correcto'); }
else           { ariaReaccionar(st.fallosSeguidos >= 2 ? 'dificil' : 'animo'); }
// Al finalizar la clase / cerrar el chat:  ariaReaccionar('despedida');
// En reiniciarIdle() (90 s sin actividad):  ariaReaccionar('ayuda');
```
`ariaReaccionar` NUNCA revela ni sugiere la respuesta: solo comunica emoción. Es compatible con la 30-B.

**Checklist:**
```
[ ] ARIA_SPRITES tiene las 6 cadenas base64 completas (sin truncar)
[ ] ariaReaccionar() existe y las 6 animaciones @keyframes están en el CSS
[ ] El quiz llama a ariaReaccionar('correcto'|'genial'|'animo'|'dificil') según el resultado
[ ] La despedida y el aviso de inactividad ('ayuda') están conectados
[ ] La imagen de reacción usa !important para no deformarse con img{} globales
[ ] Respeta prefers-reduced-motion
```


## 🟠 PRIORIDAD 30-E · ALTA — ARIA DOCENTE COMPLETO: BANCO DE MÉTODOS PEDAGÓGICOS REUTILIZABLE + CASCADA DE INTENTOS ANTES DE RENDIRSE

### 🎓 REGLA DE ORO: ARIA NUNCA SE RINDE EN EL PRIMER INTENTO, Y SABE EXPLICAR ARITMÉTICA Y TECNOLOGÍA DE 4°-5° AUNQUE ESE CONCEPTO NO ESTÉ ESCRITO EN LA CLASE DE ESA SEMANA

**Por qué existe esta prioridad:** hasta la 30-D, todo lo que ARIA "sabía" explicar dependía de que estuviera literalmente en el `GLOSARIO` de esa semana o en el contenido de esa clase puntual (30-C). Si un estudiante preguntaba por un método que no estaba en esa clase — por ejemplo, "regla de tres" en una clase que no la menciona, aunque ya la vieron semanas atrás — ARIA caía directo en "no sé". La 30-E resuelve esto con dos piezas:
1. **`METODOS_ARIA`**: un banco de conocimiento **propio de ARIA**, igual en TODAS tus clases (no depende del HTML de esa semana), con explicaciones curadas de Aritmética y Tecnología para 4°-5°. Se pega tal cual, sin cambios, en cada clase nueva.
2. **`cascadaDeIntentosAria()`**: en vez de un único intento con un único umbral, ARIA prueba varias estrategias en orden, de más a menos exigente, antes de darse por vencida — y si el estudiante dice "no entendí", profundiza automáticamente la MISMA explicación (pasos → analogía → ejemplo resuelto) en vez de repetir lo mismo o rendirse.

### 30-E.1 — `METODOS_ARIA`: banco de métodos pedagógicos reutilizable (COPIAR IDÉNTICO EN CADA CLASE)
Cada entrada tiene 3 capas de profundidad — `pasos` (explicación ordenada), `analogia` (comparación cotidiana) y `ejemplo` (un caso resuelto con números/datos DISTINTOS a los de cualquier quiz, para enseñar el método sin filtrar ninguna respuesta evaluable). Trae 15 métodos base (fracciones, decimales, regla de tres, porcentaje, perímetro, área, m.c.m., M.C.D., redondeo, algoritmo, diagrama de flujo, hardware/software, contraseña segura) — se puede seguir ampliando con el mismo formato.
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (`METODOS_ARIA`, `METODOS_ARIA_INDICE`). No se reescribe: se inserta con `tools/insertar_aria.py`.
> 📌 Este archivo es **independiente del contenido semanal**: aunque la clase de hoy no mencione "regla de tres", si un estudiante pregunta por eso, ARIA sabe explicarlo igual, porque este banco viaja completo en cada clase que generes. Amplíalo con el tiempo agregando nuevas entradas con el mismo formato — es la forma más rápida de hacer que ARIA "sepa más" sin tener que escribirlo dentro de cada clase puntual.

### 30-E.2 — `cascadaDeIntentosAria()`: varios intentos antes de rendirse, y profundización cuando dicen "no entendí"
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (`distanciaLevenshteinAria`, `seParecenAria`, `armarExplicacionMetodoAria`, `esPeticionDeOtraExplicacionAria`, `buscarMetodoExactoAria`, `buscarMetodoTolerante`, `registrarDudaNoResueltaAria`, `cascadaDeIntentosAria`). No se reescribe: se inserta con `tools/insertar_aria.py`.

### 30-E.3 — Integración obligatoria dentro de `responderAria()` (REEMPLAZA el paso 5 y siguientes de la versión final documentada en la 30-C)
La cascada de la 30-E va exactamente donde antes iba solo el paso 5 (la explicación profunda de la 30-C) — la incluye y la amplía. El orden completo y definitivo de `responderAria()` queda así:
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (`responderAria`). No se reescribe: se inserta con `tools/insertar_aria.py`.
> ⚠️ Esta función **ANULA Y REEMPLAZA** la versión de `responderAria()` documentada en la 30-C — hoy existe **UNA SOLA** implementación, la de arriba, con el paso 5 ampliado. Ninguna otra prioridad llama a `responderAria()` de forma distinta.

### 30-E.4 — Registro de dudas no resueltas (insumo directo para tu Panel Docente)
`registrarDudaNoResueltaAria()` ya viene incluida en `cascadaDeIntentosAria()` (30-E.2) y guarda cada pregunta sin resolver en `localStorage['aria_dudas_no_resueltas']` (las últimas 100, con fecha). Si tu clase ya tiene un Panel Docente (Prioridad 8-K u otra), agrega ahí una sección que lea esa clave y te muestre qué preguntas quedaron sin responder — así sabes qué reforzar en la próxima clase presencial, aunque el estudiante nunca te lo haya dicho directamente.
```javascript
// Dentro del Panel Docente, para listar las dudas no resueltas:
const dudas = JSON.parse(localStorage.getItem('aria_dudas_no_resueltas') || '[]');
```

**Reglas no negociables de esta prioridad:**
- El banco `METODOS_ARIA` explica **métodos y procesos generales** (cómo se suma una fracción, cómo se calcula un porcentaje) — nunca debe contener, ni por accidente, el enunciado o la respuesta de una pregunta puntual de un quiz de la clase. Sus ejemplos usan siempre números/datos distintos a los de cualquier evaluación.
- La cascada sigue respetando al 100% el bloqueo de la 30-B: `cascadaDeIntentosAria()` se llama DESPUÉS de la protección anti-quiz, nunca antes ni en paralelo.
- Cuando el estudiante dice "no entendí", ARIA **profundiza la misma explicación** (pasos → analogía → ejemplo) — nunca repite exactamente el mismo texto, y nunca cambia de tema sin que el estudiante lo pida.
- Toda pregunta que ninguna estrategia logra resolver queda registrada — ARIA nunca la ignora en silencio.

**Checklist:**
```
[ ] METODOS_ARIA está pegado completo (15 entradas) y METODOS_ARIA_INDICE se construye sin errores
[ ] cascadaDeIntentosAria() prueba, en orden: "otra forma" → método exacto → 30-C → búsqueda en clase → método tolerante
[ ] armarExplicacionMetodoAria() profundiza correctamente: nivel 0 (pasos) → 1 (analogía) → 2 (ejemplo)
[ ] distanciaLevenshteinAria()/seParecenAria() toleran errores de escritura típicos de 4°-5°
[ ] registrarDudaNoResueltaAria() guarda en localStorage cada pregunta que nadie logró resolver
[ ] responderAria() tiene una única implementación final, con el paso 5 ampliado por la cascada
[ ] Ningún ejemplo de METODOS_ARIA usa números/datos iguales a los de un quiz real de la clase
```


## 🟠 PRIORIDAD 30-F · ALTA — ARIA EXPLICA MEJOR (NO SOLO DISTINTO): ANDAMIAJE SOCRÁTICO + REFUERZO PROACTIVO + COMPARACIÓN VISUAL

### 🧑‍🏫 REGLA DE ORO: ARIA NO SUELTA TODA LA EXPLICACIÓN DE GOLPE, PRIMERO MIDE QUÉ SABE EL ESTUDIANTE — Y SI ALGO LE CUESTA, ARIA SE ADELANTA A OFRECER AYUDA EN VEZ DE ESPERAR A QUE INSISTA

**Por qué existe esta prioridad:** la 30-E le dio a ARIA un banco de métodos y una cascada de intentos, pero seguía teniendo dos huecos pedagógicos: (1) siempre entraba directo con los pasos completos, sin medir primero cuánto ya sabía el estudiante, y (2) solo reaccionaba SI el estudiante volvía a preguntar o a escribir "no entendí" — nunca por iniciativa propia. La 30-F cierra ambos huecos y además agrega una **tercera capa de explicación** (comparación visual simple) entre la analogía y el ejemplo resuelto, para que "explicar de otra forma" sea progresivamente distinto y no se quede en solo 2 variantes.

**Las 3 piezas de esta prioridad:**
1. **Andamiaje socrático real**: antes de explicar un método por primera vez en la sesión, ARIA hace una `preguntaGuia` corta ("¿sabes qué significa dividir en partes iguales?"). Si el estudiante responde que no sabe, ARIA da primero un `microFundamento` (una explicación base brevísima) antes de entrar al método completo. Si responde que sí sabe (o la respuesta no es clara), ARIA va directo al método — no hace perder tiempo con un concepto que ya domina.
2. **Comparación visual simple** (`visual`): nueva capa entre la analogía y el ejemplo resuelto. Usa símbolos/emoji sencillos (● ○ ▢ ■ □ flechas) para representar el concepto — pensada para estudiantes más visuales. La escalada por "no entendí" ahora tiene 4 pasos: pasos → analogía → visual → ejemplo resuelto.
3. **Refuerzo proactivo**: si el estudiante pregunta por el MISMO método una segunda vez en la sesión (o falla 2 veces la misma pregunta de un quiz asociada a ese método), ARIA no espera a que lo pida de nuevo — automáticamente salta la pregunta socrática (ya se hizo antes) y entrega pasos + analogía juntos, con un tono que reconoce la dificultad ("Veo que esto te ha costado un poco").

### 30-F.1 — `METODOS_ARIA`: banco con las 4 capas + andamiaje socrático (REEMPLAZA por completo el bloque de código de la 30-E.1 — mismas 15 entradas, con 3 campos nuevos: `preguntaGuia`, `microFundamento`, `visual`)
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (`METODOS_ARIA`, `METODOS_ARIA_INDICE`). No se reescribe: se inserta con `tools/insertar_aria.py`.

### 30-F.2 — `cascadaDeIntentosAria()` con andamiaje socrático y refuerzo proactivo (REEMPLAZA por completo el bloque de código de la 30-E.2)
> ▸ _Código de referencia retirado:_ lo implementa **`aria/aria_widget.html`** (`distanciaLevenshteinAria`, `seParecenAria`, `armarExplicacionMetodoAria`, `esPeticionDeOtraExplicacionAria`, `esRespuestaAfirmativaAria`, `esRespuestaNegativaAria`, `iniciarOExplicarMetodoAria`, `registrarUsoMetodoAria`, `manejarMetodoEncontradoAria`, `buscarMetodoExactoAria`). No se reescribe: se inserta con `tools/insertar_aria.py`.

### 30-F.3 — Refuerzo proactivo conectado a fallos de QUIZ (no solo a preguntas del chat)
Cuando una pregunta de un quiz (Prioridad 5) esté claramente asociada a un método del banco (por ejemplo, una pregunta sobre regla de tres), conecta el conteo de fallos de esa pregunta con el contador de refuerzo de ARIA, y si el estudiante ya lleva 2 fallos, abre el chat de ARIA SOLA (sin esperar a que el estudiante pregunte) con la explicación reforzada:
```javascript
// Dentro del manejador de respuesta incorrecta del quiz (Prioridad 5):
if (!esCorrecta){
  st.fallosPorPregunta[q.id] = (st.fallosPorPregunta[q.id] || 0) + 1;
  if (st.fallosPorPregunta[q.id] === 2 && q.metodoAriaId){
    const metodo = registrarFalloQuizComoMetodoAria(q.metodoAriaId); // cuenta como "1er uso"
    // La siguiente vez que el estudiante toque el tema (o si ya usa el chat), será refuerzo directo.
    // Para ofrecerlo YA MISMO sin esperar, usa el hook de la Prioridad 30-D/panel de chat:
    if (metodo && typeof window.ARIA_MENSAJE_PROACTIVO === 'function'){
      window.ARIA_MENSAJE_PROACTIVO(
        `Vi que esta pregunta te ha costado un par de intentos 😊 ¿Te explico "${metodo.titulo}" con calma?`,
        'triste'
      );
    }
  }
}
```
> 📌 `q.metodoAriaId` es un campo opcional que le agregas a la pregunta del quiz en tu HTML (Prioridad 5) cuando esa pregunta corresponde a un método del banco — así ARIA sabe exactamente qué explicar sin tener que adivinar. Si la pregunta no tiene `metodoAriaId` (es específica de esa clase y no está en el banco), usa un mensaje genérico como en el demo `aria_avatar_demo_v2_3.html`.

**Reglas no negociables de esta prioridad:**
- La pregunta socrática (`preguntaGuia`) se hace **una sola vez por método por sesión** — nunca interrumpe una segunda vez con la misma pregunta.
- Si la respuesta del estudiante a la pregunta socrática es ambigua (ni claramente sí ni claramente no), ARIA **nunca se queda esperando indefinidamente**: sigue adelante con la explicación completa.
- El refuerzo proactivo se activa por REPETICIÓN real (2ª vez preguntando lo mismo, o 2° fallo del mismo quiz) — nunca por adivinar que el estudiante "parece confundido" sin evidencia.
- Todo esto sigue respetando al 100% el bloqueo de la 30-B: nada de esto revela nunca la respuesta de un quiz, solo el método general para llegar a ella.

**Checklist:**
```
[ ] Cada entrada de METODOS_ARIA tiene preguntaGuia, microFundamento y visual además de pasos/analogia/ejemplo
[ ] ariaEsperandoSocratico se resuelve ANTES que cualquier otra interpretación del mensaje del estudiante
[ ] Si el estudiante responde "no sé" a la pregunta guía, se muestra el microFundamento antes del método
[ ] La escalada por "no entendí" recorre 4 niveles: pasos → analogía → visual → ejemplo
[ ] manejarMetodoEncontradoAria() salta la pregunta socrática y da refuerzo directo desde la 2ª vez
[ ] (Si aplica) las preguntas del quiz con metodoAriaId disparan ARIA_MENSAJE_PROACTIVO al 2° fallo
```

---

# 23 · Imágenes base64 propias, medidas exactas y sonido sintetizado

## 🟠 PRIORIDAD 31 · ALTA — IMÁGENES PROPIAS EMBEBIDAS EN BASE64

### 🖼️ REGLA DE ORO: TODA IMAGEN QUE NO SEA UNA FOTO DE STOCK VA EMBEBIDA COMO DATA URI, NUNCA COMO ARCHIVO EXTERNO
La Prioridad Absoluta 1 (imágenes reales de Unsplash) sigue vigente para el grid 2×2 de fotografías de apoyo en los slides de concepto. Pero para las **imágenes propias de diseño de la clase** — el título ilustrado, los personajes/mascota, los diagramas hechos a medida para un concepto puntual (parte entera/decimal, recta numérica, comparación de decimales, etc.) — la clase real analizada usa un patrón distinto y más confiable: **incrustar el PNG/JPG directamente como base64 dentro de un objeto JS**, en vez de enlazar a un archivo externo.

**Por qué esto es mejor que un `<img src="archivo.png">` externo:**
- El HTML queda 100% autocontenido (cumple la Prioridad Técnica 17 de "un solo archivo") — no depende de que el archivo `.png` viaje junto al `.html`, ni de rutas relativas que se rompen al mover el archivo.
- No hay riesgo de "imagen rota" si el profesor copia el HTML a otro computador o lo sube a otra plataforma sin la carpeta de imágenes.
- Convive perfectamente con el fallback de imágenes de la Prioridad 1 (si por algún motivo el data URI no carga, el `onerror` de esa prioridad muestra el emoji-placeholder igual que con una URL normal).

### 31.1 — Estructura: objeto `IMG` con constantes base64 (COPIAR Y ADAPTAR)
```javascript
// ═══ IMÁGENES PROPIAS DE LA CLASE — EMBEBIDAS EN BASE64, 100% AUTOCONTENIDAS ═══
// Cada clave es un nombre descriptivo del concepto que ilustra (NO el nombre de archivo original).
// El valor es el data URI completo, listo para usarse directo en cualquier atributo src o background.
const IMG = {
  char_robot:   "data:image/png;base64,iVBORw0KGgo...",   // mascota/personaje guía de la clase
  logo_lockup:  "data:image/png;base64,iVBORw0KGgo...",   // logo institucional o de marca de la serie de clases
  t_titulo:     "data:image/jpeg;base64,/9j/4AAQSkZJRg...", // imagen decorativa del slide de bienvenida
  t_concepto_1: "data:image/jpeg;base64,/9j/4AAQSkZJRg...", // diagrama a medida para el primer concepto de la semana
  t_concepto_2: "data:image/jpeg;base64,/9j/4AAQSkZJRg...", // diagrama a medida para el segundo concepto
  t_recuerda:   "data:image/jpeg;base64,/9j/4AAQSkZJRg...", // imagen del slide de cierre/repaso
  // ... una entrada por cada imagen propia que la clase necesite
};
```
Uso en el HTML de un slide (idéntico a cualquier `<img>`, porque un data URI ES una URL válida):
```html
<div style="text-align:center;margin-bottom:14px">
  <img src="${IMG.t_concepto_1}" alt="[Descripción real del concepto]"
       style="max-width:320px;width:100%;border-radius:16px;border:3px solid var(--accent);
              box-shadow:0 6px 18px rgba(10,20,60,.28)">
</div>
```

### 31.2 — Cómo convertir un PNG/JPG a base64 (flujo de trabajo para quien genera la clase)
1. Partir de la imagen ya diseñada (PNG o JPG, idealmente ya recortada/optimizada al tamaño final de uso — no subir un archivo de varios MB sin comprimir).
2. Convertirla a texto base64 puro. En un entorno con Python disponible: `base64.b64encode(open('archivo.png','rb').read()).decode()`. En un entorno con Node: `Buffer.from(fs.readFileSync('archivo.png')).toString('base64')`. También sirve cualquier conversor online confiable si no hay acceso a consola.
3. Anteponer el prefijo correcto según el formato real del archivo: `data:image/png;base64,` para PNG (fondos transparentes, íconos, mascota) o `data:image/jpeg;base64,` para JPG/JPEG (fotografías, ilustraciones sin transparencia).
4. Pegar el resultado completo (prefijo + cadena base64) como el valor de la clave correspondiente en el objeto `IMG`.
5. **Nunca** cortar ni truncar la cadena base64 al pegarla — una cadena incompleta rompe la imagen igual que un archivo corrupto.

### 31.3 — Cuándo usar base64 propio vs. Unsplash (regla de decisión)
| Tipo de imagen | Método |
|---|---|
| Foto real de un objeto/situación de la vida cotidiana (grid 2×2 de apoyo, Prioridad 1) | URL de Unsplash (`?w=300&h=130&fit=crop`) |
| Mascota/personaje guía de la clase | Base64 propio (PNG con transparencia si aplica) |
| Diagrama o ilustración diseñada a medida para UN concepto específico de esta semana (ej. "parte entera y parte decimal", "la recta numérica con decimales") | Base64 propio |
| Imagen decorativa del slide de bienvenida o de cierre | Base64 propio |
| Logo institucional / de la serie de clases | Base64 propio |

**Peso:** cada imagen base64 aumenta el tamaño del archivo HTML final (aprox. 33% más pesada que el binario original). Es un costo aceptable a cambio de la portabilidad total del archivo — pero evita incrustar más de 8-10 imágenes propias grandes en una sola clase; para el resto de apoyo visual, usa el grid de Unsplash de la Prioridad 1.

**Checklist:**
```
[ ] Existe un objeto IMG con una clave por cada imagen propia de diseño de la clase
[ ] Cada valor es un data URI completo (con su prefijo data:image/...;base64, correcto) y sin truncar
[ ] Las imágenes propias de diseño (mascota, diagramas a medida, título, cierre) usan IMG.xxx — nunca una ruta de archivo externo
[ ] El grid 2×2 de fotos de apoyo (Prioridad 1) SIGUE usando URLs de Unsplash, no base64
[ ] El fallback de imágenes (Prioridad 1) sigue funcionando igual con estas imágenes (probado con onerror)
[ ] No hay más de ~10 imágenes propias grandes embebidas en base64 en una sola clase (control de peso del archivo)
```


## 🟢 PRIORIDAD 32 · TÉCNICA — MEDIDAS EXACTAS DE CAJAS DE TEXTO E IMÁGENES POR SLIDE

### 📐 REGLA DE ORO: CADA ELEMENTO VISUAL TIENE UN ANCHO MÁXIMO FIJO — NADA CRECE LIBRE Y DESCONTROLADO
La revisión de una clase real construida con este sistema mostró que el diseño se mantiene limpio y consistente porque **cada tipo de elemento respeta un ancho máximo predefinido**, nunca "lo que quepa". Estas son las medidas exactas a reutilizar en toda clase nueva:

| Elemento | Medida exacta | Notas |
|---|---|---|
| Contenedor general del slide (`.si-wrap`) | `max-width:1040px; margin:0 auto;` | Todo el contenido de un slide vive dentro de este ancho, centrado |
| Grid de fotos de apoyo 2×2 (`.g2` + `.imgc`, Prioridad 1) | 2 columnas (`grid-template-columns:1fr 1fr; gap:12px`), cada foto `height:110px; object-fit:cover` | En móvil (`max-width:600px`) baja a **1 columna** |
| Pie de foto del grid (`.imgc-cap`) | `font-size:.65rem`, padding `4px 7px` | Texto corto, una línea, nunca un párrafo |
| Imagen propia de un concepto específico (diagrama base64, Prioridad 31) | `max-width:320px; width:100%` centrada, con borde de 3px y sombra | Para el slide de cierre/cierre motivacional puede subir hasta `max-width:460px` |
| Imagen del slide de bienvenida (título ilustrado) | `width:260px; max-width:75%` | Con animación suave tipo flotante, borde de acento |
| Burbuja de texto de la mascota/tip (`.mc`) | `max-width:380px` (hasta `460px` en pantallas de cierre) | Texto alineado a la izquierda dentro de la burbuja |
| Mensaje individual del chat de ARIA (`.aria-msg`) | `max-width:88%` del ancho de la burbuja de chat | Nunca ocupa el 100% — deja aire a los lados |
| Panel de chat de ARIA (`#aria-panel`) | `width:82vw` en móvil (definido en el widget) | Nunca se sale de la pantalla; no se redefine en la clase |

## 🟢 PRIORIDAD 33 · TÉCNICA — SONIDO SINTETIZADO CON WEB AUDIO API

### 🔊 REGLA DE ORO: CERO ARCHIVOS DE AUDIO — TODO SE GENERA EN EL MOMENTO CON OSCILADORES

**Qué es:** refuerzo sonoro para los eventos clave de la clase (acierto, fallo suave, logro, notificación de ARIA, despedida) generado 100% con la Web Audio API — osciladores que crean el sonido en tiempo real. Cero KB de `.mp3`/`.wav` incrustados, así que no pesa nada extra en el HTML. Respeta un interruptor propio (persistido en `localStorage`, igual que la voz de ARIA) y se desbloquea solo en el primer toque del estudiante, sin que el profe tenga que configurar nada — es el requisito de autoplay de casi todos los navegadores.

### 33.1 — Código (COPIAR TAL CUAL, en un `<script>` propio antes de cualquier lugar donde se use `ariaSonar()`)
```javascript
// ═══════════════════════════════════════════════════════════════════════
// SONIDO SINTETIZADO CON WEB AUDIO API (cero archivos de audio, ~2 KB de código)
// Todos los efectos se generan con osciladores en el momento — no se descarga ni se
// incrusta ningún .mp3/.wav, así que no pesa nada extra en el HTML.
// Respeta el interruptor de sonido (localStorage) y arranca en silencio si el
// navegador no ha tenido ninguna interacción todavía (política de autoplay).
// ═══════════════════════════════════════════════════════════════════════
let ariaAudioCtx = null;
let ariaSonidoActivo = (localStorage.getItem('aria_sonido_activo') ?? '1') === '1';

function ariaObtenerAudioCtx(){
  if (!ariaAudioCtx){
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ariaAudioCtx = new AC();
  }
  if (ariaAudioCtx.state === 'suspended') ariaAudioCtx.resume();
  return ariaAudioCtx;
}

// Reproduce una nota simple: frecuencia (Hz), duración (s), tipo de onda y volumen
function ariaTono(freq, duracion, tipo, volumen, retardo){
  if (!ariaSonidoActivo) return;
  const ctx = ariaObtenerAudioCtx();
  if (!ctx) return;
  const inicio = ctx.currentTime + (retardo || 0);
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = tipo || 'sine';
  osc.frequency.setValueAtTime(freq, inicio);
  gain.gain.setValueAtTime(0, inicio);
  gain.gain.linearRampToValueAtTime(volumen ?? 0.18, inicio + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, inicio + duracion);
  osc.connect(gain).connect(ctx.destination);
  osc.start(inicio);
  osc.stop(inicio + duracion + 0.02);
}

// Biblioteca de efectos — cada uno es una secuencia corta de ariaTono()
const ARIA_SONIDOS = {
  acierto:   () => { ariaTono(880,.11,'sine',.16,0); ariaTono(1318,.16,'sine',.14,.09); },
  falloSuave:() => { ariaTono(220,.16,'sine',.12,0); ariaTono(180,.18,'sine',.10,.07); },
  logro:     () => { [523,659,784,1047].forEach((f,i)=>ariaTono(f,.16,'triangle',.15,i*.09)); },
  clic:      () => { ariaTono(600,.05,'sine',.08,0); },
  notificacion:()=>{ ariaTono(740,.09,'sine',.12,0); ariaTono(988,.12,'sine',.12,.08); },
  despedida: () => { [659,523,392].forEach((f,i)=>ariaTono(f,.14,'sine',.12,i*.09)); }
};
function ariaSonar(nombre){ if (ARIA_SONIDOS[nombre]) ARIA_SONIDOS[nombre](); }
window.ariaSonar = ariaSonar;

// Interruptor de sonido — persiste entre sesiones igual que la voz
function ariaAlternarSonido(){
  ariaSonidoActivo = !ariaSonidoActivo;
  localStorage.setItem('aria_sonido_activo', ariaSonidoActivo ? '1' : '0');
  if (ariaSonidoActivo) ariaSonar('clic');
  return ariaSonidoActivo;
}
window.ariaAlternarSonido = ariaAlternarSonido;
window.ariaSonidoEstaActivo = () => ariaSonidoActivo;

// Desbloquea el audio en el primer toque del usuario (requisito de casi todos los
// navegadores móviles) sin que el profe tenga que hacer nada especial.
['pointerdown','keydown'].forEach(ev => {
  window.addEventListener(ev, () => { ariaObtenerAudioCtx(); }, { once:true, passive:true });
});

```

### 33.2 — Dónde se conecta cada sonido
| Momento | Sonido | Dónde va la llamada |
|---|---|---|
| Estudiante envía un mensaje al chat de ARIA | `clic` | Al inicio de `enviar()`, junto con `agregarMensajeAria('usuario', ...)` |
| ARIA abre su panel (manual o proactivo, 30-D/30-F) | `notificacion` | Al inicio de `abrirPanel()` |
| ARIA responde algo normal | `notificacion` | Dentro de `reaccionarAria()`, antes de `hablar()` |
| ARIA responde con categoría `logro` | `logro` (fanfarria de 4 notas) | Mismo punto, según la categoría detectada |
| ARIA responde con categoría `despedida` | `despedida` | Mismo punto, según la categoría detectada |
| Quiz — respuesta correcta | `acierto` | Junto con `ariaReaccionar('correcto')` (Prioridad 30-D) |
| Quiz — respuesta incorrecta | `falloSuave` | Junto con el conteo de fallos, ANTES de decidir si ya toca refuerzo proactivo (30-F) |

### 33.3 — Botón de silencio (junto al botón de voz existente)
```html
<button id="aria-sonido-btn" type="button" class="aria-voz-off">🔈 Sonidos: activados</button>
```
```javascript
function pintarBotonSonido(){
  const activo = window.ariaSonidoEstaActivo ? ariaSonidoEstaActivo() : true;
  $sonidoBtn.textContent = activo ? '🔈 Sonidos: activados' : '🔇 Sonidos: apagados';
  $sonidoBtn.classList.toggle('aria-voz-on', activo);
  $sonidoBtn.classList.toggle('aria-voz-off', !activo);
}
pintarBotonSonido();
$sonidoBtn.addEventListener('click', () => { ariaAlternarSonido(); pintarBotonSonido(); });
```

**Reglas no negociables de esta prioridad:**
- Ningún sonido dura más de ~0.4 s en total — son refuerzos discretos, nunca interrumpen ni distraen de la clase.
- El volumen de cada nota es bajo (`0.08`–`0.18` de ganancia) — nunca deben sonar como una alarma.
- El interruptor de sonido es independiente del de voz — el estudiante puede apagar uno sin apagar el otro.
- Si el navegador no soporta `AudioContext` (muy raro hoy en día), `ariaSonar()` simplemente no hace nada — nunca debe lanzar un error que rompa el resto de la clase.

**Checklist:**
```
[ ] ariaSonar() existe y no lanza error si AudioContext no está disponible
[ ] El interruptor de sonido persiste en localStorage y arranca en el valor guardado
[ ] Los 6 momentos de la tabla 33.2 están conectados
[ ] El botón de sonido está junto al de voz, con el mismo estilo visual (activado/apagado)
[ ] Ningún efecto dura más de ~0.4s ni suena como alarma
```

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
