---
modulo: 10_arranque_y_datos
etapa_de_lectura: 1
prioridades: [0]
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

