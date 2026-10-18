---
modulo: 22_aria_asistente
etapa_de_lectura: 3
prioridades: [30, 30-B, 30-C, 30-D, 30-E, 30-F]
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

