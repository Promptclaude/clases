---
modulo: 24_narrativa_y_personalizacion
etapa_de_lectura: 3
prioridades: [34, 34-B, 34-C, 34-D]
---

# 24 · Narrativa, protagonista y personalización (la clase es una aventura, no una presentación)

> **Idea rectora (v22):** el estudiante NO "pasa diapositivas": es el **protagonista** de una misión. La clase le habla a él, lo necesita a él, y sus decisiones (pequeñas pero reales) cambian lo que ve. Todo lo pedagógico de las prioridades anteriores se conserva (cronómetros, bloqueos, quizzes, nota); esta capa cambia **cómo se siente** y **cuánto hace el estudiante con las manos**.
> Regla de oro de esta capa: **la narrativa nunca altera lo evaluable.** Las decisiones del cuento cambian palabras, escenas y premios; jamás las preguntas, la nota ni lo que hay que aprender.

## 🔴 PRIORIDAD 34 · ABSOLUTA — EL ESTUDIANTE ES EL PROTAGONISTA (OBJETO `PROTA` Y REGLAS DE PERSONALIZACIÓN)

### 34.1 — Objeto `PROTA` (se construye una sola vez, después de `load()`)
```javascript
// Se llena desde la identidad que llega del index. Nunca se inventa un nombre.
const PROTA = {
  nombre: '',          // nombre completo tal como llegó, para registros
  primer: '',          // primer nombre (para hablarle). Si el nombre es compuesto ("María José"), usa "María José" solo si ambos son cortos (≤ 12 letras en total); si no, el primero
  titulo: '',          // título de héroe elegido en la pantalla de inicio (de TITULOS_TEMA); se guarda en st.acts.titulo
  grupo: ''
};
function hablarA(plantilla) {            // reemplaza {nombre} y {titulo} en cualquier texto
  return String(plantilla).replace(/\{nombre\}/g, PROTA.primer || 'explorador').replace(/\{titulo\}/g, PROTA.titulo || 'Explorador');
}
```
- Si no hay nombre (acceso directo sin sesión), se usa el tratamiento neutro **"explorador"** y se muestra el aviso de 8-E; la clase sigue funcionando.
- `hablarA()` es la **única** vía para meter el nombre en un texto. Está prohibido concatenar `st.name` a mano en las plantillas.

### 34.2 — Cómo se le habla (tono y límites)
1. **Segunda persona ("tú"), frases cortas, verbos de acción** ("Abre el cofre", "Decide", "Descubre"). Nada de "el estudiante debe…".
2. **Sin género asumido:** no adjetivos con terminación de género dirigidos al estudiante (no "listo/lista", "preparado/a"). Se usan formas neutras: "¡Lo lograste!", "Tu equipo te espera", "Buen trabajo", "Eres quien lidera". El título de héroe viene de una lista **neutra** (`TITULOS_TEMA`, ej.: "Detective Decimal", "Cronometrista Estrella", "Capitanía del Podio").
3. **Frecuencia:** el nombre aparece **como máximo una vez por pantalla** y en los momentos que importan (apertura de capítulo, antes de un reto, después de un logro, tras un error para animar). Repetirlo en cada línea cansa y se siente falso.
4. **Nunca dentro de las opciones de una pregunta evaluable** ni en el enunciado de una pregunta de quiz (el nombre puede variar el orden visual de la pregunta y complicar la auditoría). Sí puede ir en el mensaje de retroalimentación, después de responder.
5. **Errores sin culpa:** el tono ante un error es de equipo ("Casi, {nombre}. Mira este paso…"), nunca de reproche. Prohibido: "mal", "incorrecto" sin explicación, "te equivocaste".
6. **Contexto cercano:** las referencias salen de `REFERENCIAS_CULTURALES` y de la Prioridad 14-B (Cúcuta, Norte de Santander). Se usan lugares y situaciones **generales y verificables** (el parque, la panadería del barrio, el partido del domingo, el bus). **No se inventan** nombres de negocios, personas reales ni datos locales concretos.

### 34.3 — Niveles de personalización (todos obligatorios)
| Nivel | Qué hace | Ejemplo |
|---|---|---|
| 1 · Identidad | Nombre y título de héroe en aperturas, retos y logros | "Bienvenida a la misión, Detective Decimal Ana." (usa `hablarA`) |
| 2 · Contexto | Los ejemplos usan el mundo del estudiante | "Tu equipo corre los 100 m en 12,45 s en la cancha del colegio" |
| 3 · Conducta | La clase reconoce lo que *hizo*: racha, pistas usadas, mejor nota de ESTA semana, insignias | "Llevas 3 aciertos seguidos: tu racha vale +2 gemas" |
| 4 · Memoria entre semanas | SOLO desde el baúl de cosméticos/insignias (36-C): "La semana pasada ganaste la insignia 🏅" | **Nunca** notas, vidas, avance ni gemas de otra semana (8-V y 38-B) |

### 34.4 — Pantalla de inicio (slide 1 `intro`) — el estudiante empieza eligiendo
La bienvenida deja de ser un texto estático. Contiene, en este orden:
1. Una frase de apertura **misteriosa y corta** que lo nombra ("Algo extraño pasó en la {tema}… y solo {nombre} puede resolverlo.").
2. **Elige tu título** (3–4 opciones neutras de `TITULOS_TEMA`) y **tu compañero/avatar** (Prioridad 22, ya existente). Ambas elecciones se guardan y se muestran en la barra superior.
3. Un botón único "Empezar la misión". Hasta que elija título y avatar el botón está deshabilitado con el texto "Elige tu título para empezar" (aplica el bloqueo universal 0-C).

**Checklist:**
```
[ ] PROTA se construye después de load() y solo con la identidad real del index
[ ] hablarA() es la única vía para insertar nombre/título; ningún texto concatena st.name a mano
[ ] Sin nombre → "explorador" + aviso 8-E, la clase sigue funcionando
[ ] Máximo una mención del nombre por pantalla; ninguna dentro de enunciados u opciones de quiz
[ ] Cero adjetivos con género dirigidos al estudiante; TITULOS_TEMA es neutra
[ ] Tono de error sin culpa en toda la retroalimentación
[ ] Referencias locales generales (nada inventado: ni negocios, ni personas reales)
[ ] Nivel 4 (memoria entre semanas) solo lee del baúl de cosméticos, nunca de nota/avance
[ ] La intro exige elegir título y avatar antes de empezar
```

## 🔴 PRIORIDAD 34-B · ABSOLUTA — CAPÍTULOS Y MUNDOS: LA CLASE TIENE ARGUMENTO

### 34-B.1 — `HISTORIA_SEMILLA` (se redacta una vez por clase, antes de cualquier slide)
```javascript
const HISTORIA_SEMILLA = {
  gancho:   'Una nota anónima llega al cuaderno de {nombre}: "El cronómetro oficial se rompió. Solo alguien que domine las milésimas puede arreglarlo."',
  misterio: 'Quién rompió el cronómetro y por qué',          // la pregunta que se resuelve en el último capítulo
  objeto:   'El cronómetro de oro',                           // lo que el estudiante recupera/restaura al terminar
  aliado:   'ARIA',                                           // guía fija (22/27)
  tono:     'misterio amable',                                // ver 34-C.4
  cierre:   'El cronómetro vuelve a latir gracias a {nombre}'  // pantalla final (11)
};
```
Reglas: el misterio **se resuelve** en el capítulo final y su solución **usa el tema de la clase** (no es un giro arbitrario). El objeto de la historia es el mismo que aparece en la pantalla final.

### 34-B.2 — Mundos (3 o 4 por clase) y mapa de capítulos
Cada clase se divide en **mundos**: escenarios con nombre, ícono y ambiente propio. No todas las slides comparten el mismo aspecto: el estudiante *entra a otros mundos*.
```javascript
const MUNDOS = [
  { id:1, nombre:'La Pista',       icono:'🏟️', tono:'energico',  slides:[1,9]  },   // llegada + conceptos 1-2
  { id:2, nombre:'El Laboratorio', icono:'🔬', tono:'curioso',   slides:[10,15] },  // quiz 1, conceptos 3-4, quiz 2
  { id:3, nombre:'Mundo Sorpresa', icono:'🌌', tono:'misterio',  slides:[16,20] },  // visita a OTRO ambiente (espacio, fondo del mar, desierto…)
  { id:4, nombre:'La Gran Final',  icono:'🏆', tono:'epico',     slides:[21,23] }
];
```
- **El Mundo 3 es obligatorio y distinto** del universo base de la clase (Prioridad 0-F): el estudiante "viaja" a otro ambiente solo para practicar o repasar ahí. Debe tener su propio fondo de escena, su propio color de acento y al menos un minijuego (Prioridad 35).
- Cada cambio de mundo usa una **transición de portal** de máx. 900 ms (Prioridad 26) y un mensaje del aliado ("Entramos a {mundo}, {nombre}").
- El indicador de progreso (0-G) sigue siendo **100 % visual y no navegable**; se le agrega el ícono del mundo actual.

### 34-B.3 — Capítulos
Cada mundo abre con una slide `historia` (34-C) llamada **"Capítulo N — título intrigante"**. El último slide de cada mundo termina con un **gancho** (una pregunta o pista que el capítulo siguiente responde).

**Checklist:**
```
[ ] HISTORIA_SEMILLA declarada, con misterio que se resuelve en el último capítulo usando el tema
[ ] 3–4 mundos con nombre, ícono, tono y rango de slides; el Mundo 3 es un ambiente distinto al universo base
[ ] Cada mundo abre con un capítulo (slide historia) y cierra con un gancho
[ ] Hay transición de portal entre mundos (≤ 900 ms) y el ícono del mundo aparece en el indicador de progreso
[ ] El objeto de la historia reaparece en la pantalla final
```

## 🔴 PRIORIDAD 34-C · ABSOLUTA — LECTURAS INTERACTIVAS: EL CUENTO MISTERIOSO CON EL ESTUDIANTE DE PROTAGONISTA

> Reemplaza a las lecturas planas de "información". Se conserva la idea que mejor funcionó: **pequeños cuentos con el nombre del estudiante, tono de misterio, donde aprende el tema porque lo necesita para avanzar en la historia**.

### 34-C.1 — Slide `type: 'historia'`
```javascript
{ id:'h1', type:'historia', mundo:1, titulo:'Capítulo 1 — La nota bajo la puerta',
  conceptoRef:'c1',                       // id de CONCEPTOS_CLAVE que este capítulo enseña
  beats:[
    { k:'tap',    texto:'{nombre}, a las 6:03 a. m. alguien deslizó una nota bajo tu puerta…' },
    { k:'buscar', texto:'Hay algo brillando en la escena. ¿Lo encuentras?', escena:'🏠🚪📄', pista:{ en:2, texto:'La nota dice: 12,45 s' } },
    { k:'predice',texto:'¿Cuál crees que es más rápido: 12,45 s o 12,5 s?', opciones:['12,45 s','12,5 s','Son iguales'], sinNota:true, revelaEn:4 },
    { k:'revela', texto:'Toca la lupa para ver las cifras.', objeto:'🔍', contenido:'Igualamos cifras: 12,50 s y 12,45 s…' },
    { k:'elige',  texto:'¿Cómo investigas primero?', opciones:['Mido en el cronómetro','Pregunto al entrenador'], efecto:'solo-texto' },
    { k:'tap',    texto:'Así descubriste el paso clave: …' }
  ],
  gemas:2 }
```
**Tipos de beat (todos con clic o toque del estudiante):**
| `k` | Qué hace el estudiante | Reglas |
|---|---|---|
| `tap` | Toca para avanzar la historia (texto aparece por partes) | ≤ 40 palabras por beat |
| `buscar` | Encuentra 1 objeto escondido en una escena de emojis/CSS (zona táctil ≥ 44 px) | Dar el hallazgo vale gemas (36); si no lo encuentra en 15 s, el objeto parpadea (ayuda sin costo) |
| `predice` | Responde una **predicción** antes de ver la explicación | **Nunca da nota.** Se revela el resultado más adelante ("¡Acertaste/casi!") |
| `revela` | Toca un objeto para abrir una definición, fórmula o ejemplo | Aquí vive el contenido que luego se pregunta |
| `elige` | Decide entre 2–3 caminos | `efecto:'solo-texto'`: ambos caminos llevan **al mismo contenido**; cambia el diálogo, el premio decorativo o el aliado que habla |
| `ordena` | Ordena 3–4 pasos arrastrando o tocando en secuencia | Máx. 4 elementos, con corrección inmediata |

### 34-C.2 — Reglas de contenido (para que el cuento enseñe, no solo entretenga)
1. **Cada capítulo enseña exactamente un concepto** (el de `conceptoRef`) y trae **un ejemplo trabajado** con números **distintos** a los de cualquier pregunta evaluable.
2. El contenido que se evalúa luego **aparece primero dentro del cuento** (principio de 0-B: "la respuesta ya fue enseñada").
3. **5–8 beats** por capítulo, ≥ 3 de ellos con acción distinta a `tap` (para que no sea "siguiente, siguiente").
4. El cuento **no puede decir nada falso ni ambiguo** sobre el tema: si hay duda, el beat se reescribe.
5. **Lenguaje de la edad:** frases de máx. 15 palabras, vocabulario de 4.º/5.º, sin tecnicismos que no estén en el glosario.
6. Cada capítulo cierra con un **mini resumen visual** de 1–2 líneas dentro de un cuadro ("Lo que ya sabes").

### 34-C.3 — Bloqueo, cronómetro y guardado (se integra con 0-A, 0-C y 8-N)
- El slide `historia` es de **lectura** para los motores: está dentro del conjunto de lectura (`LECT`) y respeta 8-N/8-O. Pero el cronómetro de 12 s se **reemplaza** por esta regla: **Siguiente se habilita cuando todos los beats están completos Y han pasado ≥ 10 s reales desde que entró** (ambas condiciones, medidas por tiempo real, como 8-N).
- El avance se guarda **beat por beat** en `st.acts['historia_'+id] = { beat:n, elecciones:[…], hallazgos:[…], predicciones:[…] }`. Al recargar, retoma exactamente en el beat en que iba.
- Un beat solo se marca completo **después** de que la acción ocurre. Doble clic o clic repetido no avanza dos beats (idempotencia, mismo principio de 8-M).
- Si el estudiante regresa a un capítulo ya completado, lo ve **completo y sin bloqueo** (8-I).
- **Cuaderno:** cada capítulo agrega 1 línea al "Diario del detective" (panel flotante, Prioridad 10); el contenido de copia sigue siendo el del Cuaderno 1.

### 34-C.4 — Tono "misterio amable" (límites)
Intriga, pistas, objetos que brillan, mensajes anónimos, sombras curiosas. **Prohibido:** miedo real, violencia, muerte, personas desaparecidas, presión de tiempo estresante, cualquier cosa inapropiada para 9–11 años. El "villano" es siempre un malentendido, un travieso inofensivo o un fenómeno natural.

**Checklist:**
```
[ ] Toda lectura de concepto es un capítulo `historia` con beats interactivos (no texto plano)
[ ] Cada capítulo: 5–8 beats, ≥ 3 con acción distinta a tap, ≤ 40 palabras por beat, un solo concepto
[ ] El ejemplo trabajado del capítulo NO coincide con ninguna pregunta evaluable
[ ] `predice` nunca da nota; `elige` con efecto solo-texto nunca cambia lo que se aprende
[ ] Siguiente se habilita con TODOS los beats + ≥10 s reales (por tiempo real, no solo por setInterval)
[ ] El avance se guarda beat a beat y se retoma tras recargar
[ ] Clics repetidos no saltan beats; volver a un capítulo completo lo muestra completo
[ ] Tono misterio amable; cero contenido de miedo o violencia
```

## 🟠 PRIORIDAD 34-D · ALTA — EL ESTUDIANTE TIENE EL CONTROL: DECISIONES, PREDICCIONES Y RUTA PROPIA

El estudiante debe sentir que dirige la clase **aunque la estructura sea fija**. Se logra con micro-decisiones reales:
1. **Predice antes de ver** (en historias y en prácticas): "¿Qué crees que pasará?" sin nota; después se muestra el resultado y se celebra el acierto o se normaliza el error.
2. **Elige tu reto** (Prioridad 24, "Elige tu actividad"): se amplía con **dificultad opcional** ("Ruta tranquila" / "Ruta veloz") en las complementarias y minijuegos. La dificultad solo cambia los datos del reto, nunca los quizzes evaluables.
3. **Elige tu aliado de pistas:** ARIA siempre está, pero el estudiante puede activar o silenciar sus avisos proactivos (37-C).
4. **Pregunta directa al estudiante:** al menos **una pregunta personal por mundo** que no se califica ("¿Con qué deporte compararías esto?"). Su respuesta (opción) se guarda y se usa **una vez** más adelante en un ejemplo ("Como elegiste el fútbol, imagina…").
5. **Reconocimiento visible:** después de cada actividad, una línea que diga *qué hizo bien* ("Igualaste las cifras antes de comparar: ese era el paso clave").

**Checklist:**
```
[ ] Hay al menos 1 predicción sin nota por mundo
[ ] Hay al menos 1 pregunta personal por mundo cuyo resultado se reutiliza una vez en un ejemplo posterior
[ ] "Ruta tranquila / veloz" en complementarias y minijuegos; los quizzes evaluables no cambian
[ ] Cada actividad cierra con un reconocimiento específico (qué hizo bien), no un "¡Bien hecho!" genérico
```
