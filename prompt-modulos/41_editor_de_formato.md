## 🔴 PRIORIDAD 72 · ALTA — JUEGO «EDITOR» (ofimática: formato de texto) · motor 33

Un mini procesador de texto dentro de la clase: el estudiante **toca una palabra y luego un botón** (N negrita, K cursiva, S subrayado, A color rojo) para cumplir las instrucciones. Es la forma de que **hagan** lo que luego harán en el computador, no solo que lo reconozcan. Sirve para formato de letra, resaltar ideas, listas visuales y, en general, cualquier destreza de «seleccionar y aplicar».

```json
{"id":"w03","type":"editor","titulo":"Dale formato a la mascota","intro":"Sigue las instrucciones sobre la frase de Ana.",
 "ejemplo":"Para poner «Luna» en negrita: toca la palabra y luego el botón N.","pista":"(opcional)",
 "texto":["Mi","mascota","Luna","es","muy","juguetona","y","cariñosa"],
 "objetivos":[{"palabra":2,"formatos":["negrita"],"instr":"Pon «Luna» en negrita (N)."},
              {"palabra":5,"formatos":["cursiva"],"instr":"Pon «juguetona» en cursiva (K)."}],
 "herramientas":["negrita","cursiva","subrayado","color"],"porQue":"Cada botón cambia la palabra seleccionada…"}
```
- `texto`: **lista de palabras sueltas** (6 a 18; sin espacios dentro de una palabra). `objetivos`: 2 a 5; `palabra` es el **índice** en `texto` (empieza en 0), `formatos` ⊂ `negrita|cursiva|subrayado|color` y `instr` es la instrucción en 2.ª persona.
- **La instrucción debe nombrar la palabra** exacta que está en ese índice (el auditor lo comprueba: evita que el estudiante marque otra). Un objetivo por palabra; se pueden combinar formatos en una palabra (`["negrita","color"]`).
- Mecánica: 2 revisiones. Cada revisión dice «Cumpliste x de n instrucciones y hay y palabra(s) con formato que no se pedía» **sin decir cuáles**. 1.ª perfecta = 1 punto · 2.ª = 0,5 · tras 2 fallos se muestra el texto con el formato correcto (solo lo pedido). No toca la nota ni retiene a nadie («No me sale»).
- Dificultad: 3 a 4 objetivos, uno con formato combinado a partir del 2.º intento de la clase; deja **palabras sin tocar** (son la falsa alarma: formatear de más cuenta como error, como en un documento real: «sin exagerar»).

### Clase de ofimática (receta probada en `tec4_documento_formato_tablas`)
`info` (formato, con imagen de `documentos-word`) → **`editor`** → `enlazar` (botón ↔ función) → `quiz` (con imágenes de alineación y tamaños de letra) → `info` (tablas) → `memoria` (partes de una tabla) → `ordenar` (pasos para insertar una tabla) → `relampago` (¿letra o alineación?) → `sopa` → `evalFinal` → `candado`.
- Usa **nombres genéricos** («procesador de texto»); no pongas logos ni marcas de programas.
- Imágenes: `buscar_banco.py --tema documentos-word --alt`.
- Cuando el tema sea tablas, combina con la actividad `tabla` (Prioridad 71) si hay datos numéricos que completar.

### Pruebas
El e2e (T29) comprueba: tocar un botón sin palabra no aplica nada, revisar sin formato no gasta revisión, el aviso «x de n instrucciones y y palabras de más» sin revelar cuáles, el formato visible en la hoja, la pista, la 2.ª revisión (0,5) y que tras 2 fallos muestra el resultado correcto. El auditor atrapa: índice fuera de rango, formato inexistente, dos objetivos sobre la misma palabra, palabras con espacio e instrucción que no menciona la palabra del índice.
