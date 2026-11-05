## 🔴 PRIORIDAD 65 · ALTA — ACTIVIDADES VISUALES TIPO «PROCESO DE NIVELACIÓN» (motor 27)

Inspiradas en el documento «Proceso de subir de grado · Aritmética 4.°». Son **actividades de práctica con ejemplo, pista y 2 intentos**, hechas para que el estudiante **vea, toque y explique** (no solo marque opciones). Se escriben **solo como datos JSON** (el motor ya sabe pintarlas; Prioridad 58: no se reescribe el motor).

### Regla de oro (no negociable)
Estas actividades **NO cambian la nota del quiz** y **nadie se queda atrapado** (Prioridad 39): al resolver todos los puntos —acierte o no— se habilita «Siguiente», y a los 25 s aparece «No me sale». Los puntos (1 · 0,5 · 0) se guardan solo como dato para el docente. Nunca escribir «incorrecto» ni «fallaste»: usar «Casi, prueba otra vez».

### Mecánica común (los 4 tipos con `items`)
Cada punto se verifica por separado: **1.er intento correcto = 1 punto · 2.º = 0,5 · dos errores = se muestra cómo se resuelve y se sigue**. Cada punto tiene botón **💡 Pista**. Campos comunes: `titulo`, `intro` (opcional), `ejemplo` (texto del ejemplo resuelto; el motor agrega «✏️ Ahora tú»), `items` (mínimo 2) y en cada item `porQue` (explicación corta) y `pista` (opcional; si falta, el motor pone una genérica).

| `type` | Para qué | Campos de cada item |
|---|---|---|
| `cuadricula` | Sombrear una parte (decimales, fracciones, porcentajes) en una cuadrícula de 100 | `enunciado`, `objetivo` (nº entero de cuadritos), `total` (opcional, 100) |
| `recta` | Ubicar un número en una recta de 10 marcas | `enunciado`, `inicio` (0), `paso` (0,1), `divisiones` (10), `valor` (debe caer exactamente en una marca) |
| `comparar` | Elegir `<`, `>` o `=` | `a`, `b` (texto con coma decimal: `"0,5"`), `signo` (opcional: el motor lo calcula; si lo pones debe ser el correcto) |
| `podio` | Ordenar participantes (carrera, precios, medidas) | `texto`, `puesto` (1..n sin repetir; la regla va en `intro`) |

### Los 2 tipos de escritura
- **`abierta`** — redactar o explicar con palabras propias. Campos: `prompts` (lista de preguntas, cada una de mínimo 4 palabras), `minPalabras` (por defecto 5), `ejemplo` (ejemplo de buena respuesta). Se guarda la respuesta y **la revisa el docente** (no se califica sola). No avanza con respuestas vacías o cortas (salvo «No me sale»).
- **`cuaderno`** — hoja para hacer **a mano** y entregar. Campos: `encabezado`, `partes` (cada una con `titulo`, `instrucciones`, `puntos`). Estructura recomendada de 3 partes: **Investiga** (con fuentes) → **Con mis propias palabras** → **Ejercicios con procedimiento (10–15 puntos, incluir 1 problema de Cúcuta y «inventa tu problema»)**. Trae casilla «Lo hice» y botón de imprimir.

### Cómo usarlas bien en una clase
1. **Ejemplo resuelto siempre** (`ejemplo`) antes de «ahora tú», con **los mismos pasos** que se piden, solo cambian los datos.
2. **Una actividad visual por concepto**: decimales → `cuadricula` y `recta`; comparar/ordenar → `comparar` y `podio`; razonamiento → `abierta`; cierre de semana → `cuaderno`.
3. **Detective del error**: en `tf` usar afirmaciones de **errores típicos** («Pedro: 2,5 × 10 = 2,50») con `porQue` que explique el error.
4. **Mezclar tipos**: máximo 2 slides seguidas del mismo tipo (auditor); una clase típica lleva 2–3 de estos tipos nuevos, no todos.
5. **Cada concepto: info corta → ejemplo → actividad → quiz** (Prioridad 62). Un resumen de 3 líneas al cerrar cada bloque.
6. **Matemática exacta**: `valor` en `recta` y `signo` en `comparar` los valida el auditor; los precios y medidas con coma decimal y unidades.
7. Imágenes: del banco (módulo 33), sin texto horneado, transparentes; nunca personajes ni marcas de terceros.

### Cómo se prueba
`python3 tools/construir_clase.py plantilla/clase_referencia.src.html --datos clase.json -o clase.html` → `puerta_de_calidad.py` en verde. El e2e (T10–T23) juega estos tipos con clics reales: verifica 2 intentos, pista, medio punto, mínimo de palabras, «No me sale» y que la nota del quiz no cambia. Ejemplo completo: `plantilla/ejemplos/mat4_decimales.datos.json`.

### Ideas del documento que NO están en el motor (se piden aparte)
Nota global sobre 5,0 que sume actividades, panel docente con PIN, exportar CSV y respaldo de estudiantes, y revisión de respuestas abiertas desde un panel. Hoy las respuestas abiertas quedan en el progreso guardado del estudiante.
