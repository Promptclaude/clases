---
modulo: 27_aria_conocimiento_y_pistas
etapa_de_lectura: 3
prioridades: [37, 37-B, 37-C]
---

# 27 · ARIA con conocimiento de TODA la clase y escalera de pistas (nunca revela la respuesta)

> Esta capa **se suma** a las Prioridades 30 a 30-F (ARIA ya lee la clase, detecta preguntas copiadas y explica sin resolver). **No las reemplaza.** Lo nuevo: (1) un conocimiento **estructurado** de la clase (`CLASE_KB`) declarado al generar, en lugar de depender solo de leer el DOM; (2) una **escalera de pistas** con costo en gemas; (3) un **filtro local** que impide que ninguna respuesta —ni siquiera la de un modelo de IA— revele la opción correcta.
> El código de ARIA sigue en `aria/aria_widget.html` (se inserta por script). Lo que cambia es lo que la clase **le entrega** y las reglas que cumple.

## 🔴 PRIORIDAD 37 · ABSOLUTA — `CLASE_KB`: EL CONOCIMIENTO ESTRUCTURADO QUE ARIA TIENE DE LA CLASE

### 37.1 — Estructura (se declara junto a `SL`, `GLOSARIO` y `CLASE_META`)
```javascript
const CLASE_KB = {
  conceptos: [
    { id:'c1', nombre:'Décima, centésima, milésima', definicion:'…', slideId:'h1', claves:['décima','centésima','milésima'] }
  ],
  procedimientos: [
    { id:'p1', nombre:'Comparar decimales', tipoPregunta:'comparar-decimales',
      pasos:['Iguala la cantidad de cifras agregando ceros','Compara de izquierda a derecha','El primer dígito distinto decide'], slideId:'i3' }
  ],
  ejemplosParalelos: [          // resueltos paso a paso con NÚMEROS DISTINTOS a cualquier pregunta evaluable
    { id:'e1', tipoPregunta:'comparar-decimales', enunciado:'¿Cuál es mayor: 7,30 o 7,3?', pasosResueltos:['…','…'], resultado:'Son iguales' }
  ],
  erroresComunes: [
    { id:'x1', tipoPregunta:'comparar-decimales', error:'Creer que más cifras es mayor', porQue:'Se mira la longitud y no el valor de posición', pista:'Iguala cifras antes de comparar' }
  ],
  mapaPreguntas: {              // por cada pregunta evaluable: de qué tipo es y qué lo explica. SIN la respuesta.
    quiz1_p1: { tipoPregunta:'comparar-decimales', conceptos:['c1'], procedimiento:'p1' }
  }
};
```
### 37.2 — Reglas del KB
1. **Cada pregunta evaluable** (Quiz 1, Quiz 2, Evaluación Final: 30 en total) tiene una entrada en `mapaPreguntas` con `tipoPregunta`, al menos un `concepto` y un `procedimiento`.
2. **Cada `tipoPregunta` tiene al menos 1 `ejemploParalelo` resuelto** y 1 `errorComun`.
3. **El KB no contiene la respuesta de ninguna pregunta evaluable**, ni como texto ni como índice de opción, ni como resultado numérico idéntico. **Ejemplos paralelos: números diferentes siempre** (si la pregunta compara 12,45 con 12,5, el ejemplo compara otros números).
4. El KB se genera **a partir del mismo contenido** que enseña la clase (mismos pasos, mismo vocabulario del glosario). ARIA **no enseña un método distinto** al de las slides.
5. `indexarContenidoClaseAria()` (30-C) sigue existiendo; el KB tiene **prioridad** sobre el índice por DOM, y el DOM completa lo que el KB no cubra (excepto quiz/evalFinal, que siguen excluidos).

**Checklist:**
```
[ ] CLASE_KB declarado, con conceptos, procedimientos, ejemplosParalelos, erroresComunes y mapaPreguntas
[ ] Las 30 preguntas evaluables tienen entrada en mapaPreguntas (tipo, conceptos, procedimiento)
[ ] Cada tipoPregunta tiene ≥ 1 ejemplo paralelo resuelto y ≥ 1 error común
[ ] Ningún campo del KB contiene la respuesta de una pregunta evaluable; ejemplos con números distintos
[ ] El KB enseña el mismo método que las slides
```

## 🔴 PRIORIDAD 37-B · ABSOLUTA — ESCALERA DE PISTAS DE 5 NIVELES (SIN REVELAR NUNCA LA RESPUESTA)

Cuando el estudiante pide ayuda con una pregunta (botón "💡 Pista" dentro de la pregunta o al preguntarle a ARIA), ARIA responde **subiendo un escalón cada vez**. Una pregunta evaluable tiene su propio contador `st.pistas[qid] = nivelMaximoUsado`.

| Nivel | ARIA hace | Costo | Ejemplo |
|---|---|---|---|
| 1 · Pregunta guía | Devuelve una pregunta que enfoca el problema | Gratis | "¿Qué tienes que igualar primero para poder comparar?" |
| 2 · Dónde lo vimos | Muestra una tarjeta con el concepto o paso de `CLASE_KB` y de qué slide viene (sin salir de la pregunta) | 3 💎 (Linterna) | "Esto lo vimos en 'Comparar decimales en 3 pasos'" |
| 3 · Procedimiento | Da los pasos **generales** del `procedimiento` | 3 💎 (Linterna) | "Paso 1: iguala cifras. Paso 2: compara…" |
| 4 · Ejemplo paralelo | Resuelve paso a paso un `ejemploParalelo` **con otros números** | 5 💎 (Brújula) | "Mira cómo se hace con 7,30 y 7,3…" |
| 5 · Te acompaño | ARIA hace las preguntas del proceso **una por una**; el estudiante piensa/anota y toca "Listo" para pasar a la siguiente | Gratis (ya pagó el 4) | "Paso 1: ¿ya igualaste las cifras?" |

### 37-B.2 — Reglas de oro
1. **Jamás** nombra la opción correcta (A/B/C/D, posición ni texto), **jamás elimina opciones**, **jamás dice "es la primera" ni "no es la tercera"**, y **no confirma ni niega** la opción que el estudiante elegiría ("¿es la B?" → "No te digo cuál es, te ayudo a comprobarla tú: …").
2. **Después de responder**, cuando la retroalimentación ya mostró la respuesta, ARIA sí puede explicar el porqué completo (30-F).
3. Si el estudiante pide "dime la respuesta", ARIA lo reconoce con calidez, **no cede** y ofrece el siguiente escalón ("Todavía no, pero mira este paso…").
4. Una pregunta no puede subir más de **un nivel por solicitud**; los niveles 2–4 tienen **un retardo de 3 s** entre uno y otro (evita pedirlos en ráfaga).
5. **Costos con el núcleo:** `Nucleo.gastar(estado, costo, 'pista', 'pista:'+qid+':n'+nivel)`. Repetir el mismo nivel de la misma pregunta **no vuelve a cobrar**.
6. Con `PISTAS_EN_QUIZ` apagado, en quiz/evalFinal solo funciona el nivel 1 (gratis).
7. Todo se registra: el Panel Docente muestra **qué preguntas generaron más ayuda y hasta qué nivel** (insumo para reforzar en clase).

### 37-B.3 — Filtro local anti-fuga (obligatorio, también si ARIA usa un modelo de IA)
Toda respuesta de ARIA a una pregunta evaluable pasa por este filtro **antes de mostrarse**. Si lo reprueba, se sustituye por la pista local del KB.
```javascript
function respuestaAriaSegura(texto, preg) {          // preg: la pregunta evaluable en curso
  const t = normalizaTexto(texto);
  const correcta = normalizaTexto(preg.opciones.find(o => o.correcta).texto);
  if (correcta.length >= 3 && t.includes(correcta)) return false;                          // repite el texto de la opción correcta
  if (/\b(la|es la|opcion|opción)\s*(a|b|c|d)\b|\b(primera|segunda|tercera|cuarta)\s+opci/.test(t)) return false;   // señala una letra/posición
  const num = (correcta.match(/-?\d+[.,]?\d*/g) || []);
  if (num.length && num.every(n => t.includes(n))) return false;                           // contiene el resultado numérico
  if (/(respuesta|resultado)\s+(correcta|es|final)/.test(t)) return false;
  return true;
}
```
- El filtro es **deliberadamente conservador**: ante la duda reprueba, y entonces ARIA usa la pista local del KB (una pista de proceso que repite los números de la pregunta puede ser descartada: es preferible a filtrar una fuga).
- **Modo con IA (opcional):** el modelo solo **reformula** lo que el KB ya trae; el prompt que se le envía incluye únicamente `tipoPregunta`, concepto, procedimiento y ejemplo paralelo, **nunca** las opciones ni la pregunta con su respuesta. Si la llamada falla, tarda más de 6 s o devuelve algo que reprueba el filtro, ARIA responde con el KB local (sin red). Toda llamada tiene `AbortController`, un solo reintento y `try/catch`.
- **Sin IA:** ARIA funciona al 100 % con el KB local (esto es lo normal y debe bastar).

**Checklist:**
```
[ ] Escalera de 5 niveles implementada con costos 0 / 3 / 3 / 5 / 0 y un nivel por solicitud
[ ] Nunca nombra, señala, elimina ni confirma opciones; "dime la respuesta" no cede
[ ] Gasto con Nucleo.gastar y id 'pista:qid:nivel' (no cobra dos veces el mismo nivel)
[ ] respuestaAriaSegura() filtra TODA respuesta (local o de IA) sobre una pregunta evaluable
[ ] Con IA: solo recibe KB, nunca las opciones; timeout 6 s, AbortController, fallback local
[ ] st.pistas[qid] registrado y visible en el Panel Docente
[ ] Con PISTAS_EN_QUIZ apagado, en evaluables solo funciona el nivel 1
```

## 🟠 PRIORIDAD 37-C · ALTA — ARIA COMO COMPAÑERA: PERSONALIDAD, PROACTIVIDAD Y LÍMITES

1. **Voz del mundo:** ARIA adapta el tono al mundo actual (34-B): enérgica en La Pista, curiosa en El Laboratorio, misteriosa en el Mundo Sorpresa, épica en la Final. Siempre llama al estudiante por `PROTA.primer` (34) con `hablarA()`.
2. **Proactividad suave (nunca invasiva):** ARIA ofrece ayuda **solo** cuando (a) hay **2 errores seguidos** en el mismo tipo de pregunta, o (b) el estudiante lleva **40 s sin responder** una pregunta de práctica. **Máximo 1 aparición proactiva cada 90 s**, nunca mientras corre un cronómetro de lectura, nunca encima de un modal, y nunca en la primera pregunta de un quiz. El estudiante puede **silenciar** los avisos (se guarda).
3. **Celebra con precisión:** reconoce el esfuerzo concreto (la pista que usó, la racha, el paso que dominó), no solo "¡bien!".
4. **Memoria de la sesión:** recuerda lo que el estudiante ya preguntó **en esta clase** para no repetir la misma explicación; si repite la duda, cambia de método (banco de 30-E).
5. **Límites honestos:** si la clase no cubre lo que pregunta, lo dice (punto 7 de `responderAria()`), no inventa.
6. **Nunca interrumpe un minijuego en curso**; solo ofrece ayuda en la pantalla de resultado.

**Checklist:**
```
[ ] Tono por mundo y nombre vía hablarA()
[ ] Proactividad: dos errores seguidos o 40 s sin responder; máx. 1 cada 90 s; nunca sobre cronómetro, modal ni minijuego en curso
[ ] El estudiante puede silenciar los avisos y se guarda
[ ] Cambia de método ante una duda repetida; reconoce acciones concretas
```
