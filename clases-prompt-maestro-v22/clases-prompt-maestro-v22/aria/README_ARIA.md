# ARIA v2.8.0 — widget insertable

ARIA es el asistente de cada clase (chat, voz opcional, 25 expresiones + 6 poses, efectos, banco de métodos, lector de la clase, orientación socrática ante preguntas de quiz).

## Archivos
| Archivo | Para qué |
|---|---|
| `aria_widget.html` | CSS + HTML + JS del widget (≈160 KB). **No se edita a mano.** |
| `aria_sprites_base64.js` | `ARIA_AVATAR_IMG` (25) y `ARIA_SPRITES` (6) en base64 (≈1.1 MB). **No se lee ni se edita.** |
| `../tools/insertar_aria.py` | Inserta ambos antes de `</body>`, una sola vez (idempotente). |

Uso: `python3 tools/insertar_aria.py semanaN_xxx.html` — consume cero tokens.

## Lo que SÍ personaliza cada clase (en el JS de la clase, antes de insertar ARIA)
- `SL` (slides con `type`, `title`, texto y quizzes) y `GLOSARIO` — ARIA los lee y no inventa fuera de ellos.
- `CLASE_META = { materia, grado, tema, objetivo }` (Prioridad 0).
- Ganchos de la clase hacia ARIA: `ariaReaccionar('correcto'|'genial'|'animo'|'dificil'|'ayuda'|'despedida')`, `ariaSonar('acierto'|'falloSuave'|'logro'|'notificacion'|'clic'|'despedida')`, `window.ARIA_MENSAJE_PROACTIVO(texto)`, `registrarFalloQuizComoMetodoAria(id)` e `indexarContenidoClaseAria()` al final de `render()` (ver Prioridades 30-C, 30-D y 30-F en `prompt/22_aria_asistente.md`).
- Dudas no resueltas: se guardan en `localStorage['aria_dudas_no_resueltas']` (el Panel Docente las lista).

## Formato de una entrada del banco `METODOS_ARIA` (muestra, de `aria_widget.html`)
```javascript

  {
    id:'suma_fracciones_igual_denom', materia:'aritmetica',
    disparadores:['sumar fracciones','suma de fracciones','sumar fraccion','como sumo fracciones'],
    titulo:'Sumar fracciones con el mismo denominador',
    preguntaGuia:'¿Sabes qué significa el número de abajo en una fracción (el denominador)?',
    microFundamento:'El denominador (el número de abajo) dice en cuántas partes iguales se divide un entero. El numerador (el de arriba) dice cuántas de esas partes tienes. Por ejemplo, en 3/8, el entero se dividió en 8 partes y tienes 3 de ellas.',
    pasos:[
      'Revisa que las dos fracciones tengan el mismo número de abajo (el denominador). Si es igual, sigue.',
      'Suma solo los números de arriba (los numeradores) y deja el de abajo igual.',
      'Si el resultado se puede simplificar (dividir arriba y abajo entre el mismo número), simplifícalo.'
    ],
    analogia:'Piensa en una pizza cortada en partes iguales, por ejemplo 8 partes. Si te comes 2 partes (2/8) y luego 3 partes más (3/8), en total te comiste 5 partes de las 8: 5/8. El tamaño de las partes (el 8) no cambia, solo cuentas cuántas partes tienes.',
    visual:'🍕 Pizza en 8 partes:<br>●●●○○○○○ → 3/8<br>Le agregamos 2 partes más:<br>●●●●●○○○ → ahora son 5/8<br>(● = parte comida, ○ = parte que queda)',
    ejemplo:'Ejemplo resuelto: 2/6 + 1/6 → los denominadores ya son iguales (6), entonces solo sumo los numeradores: 2 + 1 = 3. El resultado es 3/6, que simplificado (dividiendo entre 3) queda en 1/2.'
  }
```
Las 15 entradas completas viven en el widget; para añadir métodos propios de una materia nueva se agregan entradas con ese mismo formato.

## Orden de decisión de `responderAria()` (v2.8.0)
1. Filtro de lenguaje inapropiado → 2. Intento romántico hacia ARIA (respuesta cálida, nunca romántica) → 3. Base (saludos, glosario) → 4. Conversación social → 5. Tema/objetivo de la clase (`CLASE_META`) → 6. **Pregunta de quiz copiada → orientación socrática, JAMÁS la respuesta** → 7. "¿Qué hago aquí?" (orientación de la slide) → 8. Cascada: banco de métodos → explicación profunda de la clase → búsqueda en la clase → método tolerante a errores de escritura → 9. Diccionario ampliado → 10. Respuesta honesta + duda registrada.
Después, si la respuesta fue "no sé" (`enviar()`): IA externa (Gemini, solo con clave) y luego Wikipedia (solo si la pregunta parece de datos).

## 🔐 Seguridad y privacidad — leer antes de subir a GitHub
- **La v2.8.0 original traía una clave de Gemini escrita en el HTML. En este repo se retiró** (`window.ARIA_CLAVE_GEMINI = 'PEGA_TU_CLAVE_AQUI'`). **Revoca esa clave en Google AI Studio** y crea otra: estuvo en un archivo que ya circuló.
- Una clave pegada en un HTML de clase la ve cualquiera que abra "Ver código fuente". No subas claves reales a GitHub ni las pongas en clases que usen estudiantes.
- Con clave, la pregunta del estudiante (niños de 4.º y 5.º) se envía a Google; con Wikipedia, el término buscado se envía a Wikipedia. **Sin clave, ARIA funciona igual** con sus reglas y el banco de métodos. Valora si quieres activar la IA externa en clases con menores.
