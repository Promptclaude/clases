# MÓDULO 44 — FORMATO DEL `datos.json`

> Generado por `tools/generar_referencia_datos.py` desde `plantilla/ejemplos/*.datos.json` (clases que ya pasaron la puerta de calidad). No se edita a mano: la prueba falla si queda desfasado.

Una clase es **solo** un JSON `{ "meta": {…}, "slides": […] }`. El motor, los colores y el aspecto son de la plantilla y no van aquí. Copia los **nombres de campo exactos** de los ejemplos de abajo: el motor no conoce otros. Las listas de los ejemplos están acortadas: los mínimos y máximos de cada tipo están en su módulo (se indica debajo de cada ejemplo).

**Reglas de forma comunes**
- Cada slide lleva un `id` único (`r01`, `r02`… en orden; los ejemplos también usan `m01`…). Cada pregunta lleva `id` único dentro de su quiz (`q1`, `q2`… y en el reto final `e1`, `e2`…).
- `meta.claseId`: con `meta.aula: true` es el nombre del archivo sin `.html`, p. ej. `semana6_tec4_p4` (`semana<N>_<mat|tec><grado>_p<período>`). `meta.materia`: `Aritmética` o `Tecnología e Informática`. `meta.grado`: 4 o 5. `meta.dba`: texto que empieza por «DBA: ».
- `meta.aula: true` conecta la clase al Aula. `meta.aulaVersion` es solo un número (fecha `AAAAMMDD`) que obliga al navegador a recargar los scripts del Aula: copia el de la clase más reciente y no lo inventes; cámbialo solo si el docente avisa que actualizó esos scripts. Si no tienes una clase de referencia, pregúntalo.
- Preguntas (`quiz` y `evalFinal`): `nivel` ∈ `recordar` · `comprender` · `aplicar` · `analizar`. Una sola opción con `"correcta": true`; **toda opción incorrecta lleva `porQue`**. `calc` es `null` cuando no hay operación; con operación va `{"expr": "3.4+2.15", "resultado": "5,55"}` (decimales con coma o punto) y la puerta lo recalcula.
- Respuestas numéricas: pueden llevar `$` o `%` (`"$20"`, `"25 %"`); la puerta compara el número. Ninguna opción incorrecta puede valer lo mismo que la correcta.
- Imágenes: `"imagen": "asset://<id-del-banco>"` y su `"alt"` descriptivo. La mascota «así se hace» de un `info` va en `"aria": "asset://aria-asi-se-hace"`.

## meta

```json
{"claseId": "semana6_tec4_p4", "semana": 6, "grado": 4, "materia": "Tecnología e Informática", "titulo": "Mi primer documento: formato y tablas", "dba": "DBA: Usa un procesador de texto para dar formato a un documento e insertar tablas con orden y claridad", "aula": true, "aulaVersion": "20261110"}
```

## Un ejemplo por tipo de slide

<!-- TIPO:intro -->
### `intro`
```json
{"id": "m01", "type": "intro", "titulo": "¡Misión decimales!", "mision": ["🎯 Aprenderás: a leer, ubicar y comparar números decimales.", "👆 Harás: sombrear cuadrículas, usar la recta, comparar y ordenar un podio.", "🏆 Ganarás: estrellas y medallas."]}
```

<!-- TIPO:info -->
### `info`
```json
{"id": "m02", "type": "info", "titulo": "La coma separa lo entero de lo decimal", "texto": "En 3,7 el 3 es la parte entera y el 7 son siete décimas. Un cero a la derecha no cambia el valor: 2,5 es igual a 2,50.", "aria": "asset://aria-asi-se-hace", "ejemplo": "En 12,05 hay 12 enteros, 0 décimas y 5 centésimas. Se lee «doce enteros con cinco centésimas».", "imagen": "asset://tabla-de-valor-posicional-unidades-1-decim-b41e", "alt": "Tabla de valor posicional: Unidades 1 · Décimas 0,1 · Centésimas 0,01 · Milésimas 0,001"}
```

<!-- TIPO:quiz -->
### `quiz`
```json
{"id": "t05", "type": "quiz", "titulo": "Quiz 1: partes y funciones", "preguntas": [{"id": "q1", "dba": "Partes del computador", "nivel": "recordar", "enunciado": "¿Qué parte muestra las imágenes del computador?", "calc": null, "opciones": [{"id": "a", "texto": "La pantalla", "correcta": true}, {"id": "b", "texto": "El teclado", "correcta": false, "porQue": "El teclado sirve para escribir; no muestra imágenes."}, {"id": "c", "texto": "El ratón", "correcta": false, "porQue": "El ratón mueve el puntero; no muestra imágenes."}, {"id": "d", "texto": "La memoria", "correcta": false, "porQue": "La memoria guarda datos; no los muestra."}], "retroalimentacion": "La pantalla (monitor) es el dispositivo de salida que muestra imágenes.", "errorComun": "Piensa si la parte envía o muestra información."}]}
```
(Muestra 1 pregunta; las demás tienen la misma forma. Cuántas y de qué niveles: núcleo §5.)

<!-- TIPO:evalFinal -->
### `evalFinal`
```json
{"id": "t08", "type": "evalFinal", "titulo": "Reto final", "preguntas": [{"id": "e1", "dba": "Entrada y salida", "nivel": "aplicar", "enunciado": "¿Cuál es un dispositivo de salida?", "calc": null, "opciones": [{"id": "a", "texto": "La impresora", "correcta": true}, {"id": "b", "texto": "El ratón", "correcta": false, "porQue": "El ratón envía información: es de entrada."}, {"id": "c", "texto": "El teclado", "correcta": false, "porQue": "El teclado envía información: es de entrada."}, {"id": "d", "texto": "El micrófono", "correcta": false, "porQue": "El micrófono envía sonido: es de entrada."}], "retroalimentacion": "La impresora saca la información en papel.", "errorComun": "Salida = muestra o saca información."}]}
```
(Muestra 1 pregunta; las demás tienen la misma forma. Cuántas y de qué niveles: núcleo §5.)

<!-- TIPO:tf -->
### `tf`
```json
{"id": "t04", "type": "tf", "titulo": "¿Verdadero o falso?", "items": [{"t": "El ratón es un dispositivo de salida.", "v": false, "porQue": "El ratón envía información al computador: es de entrada."}, {"t": "La CPU es el cerebro del computador.", "v": true, "porQue": "La CPU procesa la información y ejecuta las órdenes."}]}
```

<!-- TIPO:fill -->
### `fill`
```json
{"id": "t07", "type": "fill", "titulo": "Completa", "items": [{"antes": "El dispositivo que muestra imágenes se llama", "ans": ["pantalla", "monitor"], "despues": ".", "porQue": "La pantalla o monitor muestra lo que hace el computador."}]}
```

<!-- TIPO:drag -->
### `drag`
```json
{"id": "t03", "type": "drag", "titulo": "¿Entrada o salida?", "zonas": [{"id": "e", "nombre": "Entrada"}, {"id": "s", "nombre": "Salida"}], "chips": [{"t": "Teclado", "z": "e", "porQue": "El teclado envía letras al computador: es de entrada."}, {"t": "Pantalla", "z": "s", "porQue": "La pantalla muestra lo que hace el computador: es de salida."}, {"t": "Ratón", "z": "e", "porQue": "El ratón envía movimientos y clics: es de entrada."}, {"t": "Parlantes", "z": "s", "porQue": "Los parlantes sacan el sonido: son de salida."}]}
```

<!-- TIPO:minijuego -->
### `minijuego`
```json
{"id": "t06", "type": "minijuego", "juego": "carrera", "titulo": "Carrera de dispositivos", "rondas": [{"q": "¿Cuál es de salida?", "ops": ["Ratón", "Teclado", "Impresora"], "ok": 2, "porQue": "La impresora saca información en papel."}, {"q": "¿Cuál es de entrada?", "ops": ["Parlantes", "Micrófono", "Monitor"], "ok": 1, "porQue": "El micrófono envía sonido al computador."}]}
```

<!-- TIPO:cuadricula -->
### `cuadricula`
```json
{"id": "p06", "type": "cuadricula", "titulo": "Sombrea el porcentaje", "intro": "La cuadrícula tiene 100 cuadritos: cada uno es el 1 %.", "ejemplo": "El 30 % son 30 cuadritos de los 100.", "items": [{"enunciado": "Sombrea el 25 %", "objetivo": 25, "pista": "25 % son 25 de cada 100 cuadritos.", "porQue": "25 % = 25 cuadritos = 1/4 de la cuadrícula."}, {"enunciado": "Sombrea 1/2 de la cuadrícula", "objetivo": 50, "pista": "La mitad de 100 es 50.", "porQue": "1/2 = 50 %: la mitad de 100 cuadritos."}, {"enunciado": "Sombrea 0,1 de la cuadrícula", "objetivo": 10, "pista": "0,1 es una décima: 10 de cada 100.", "porQue": "0,1 = 10 %: 10 cuadritos."}]}
```
Reglas y límites de `cuadricula`: módulo 34.

<!-- TIPO:recta -->
### `recta`
```json
{"id": "m05", "type": "recta", "titulo": "Ubica en la recta", "intro": "Cada marca vale 0,1.", "ejemplo": "Entre 0 y 1 la marca 3 es 0,3. Entre 2 y 3 la marca 3 es 2,3.", "items": [{"enunciado": "Toca la marca de 0,3", "inicio": 0, "valor": 0.3, "porQue": "Se cuentan 3 marcas desde el 0."}, {"enunciado": "Toca la marca de 0,8", "inicio": 0, "valor": 0.8, "porQue": "Se cuentan 8 marcas desde el 0."}, {"enunciado": "Toca la marca de 2,6 (recta de 2 a 3)", "inicio": 2, "valor": 2.6, "porQue": "Se cuentan 6 marcas desde el 2."}]}
```
Reglas y límites de `recta`: módulo 34.

<!-- TIPO:comparar -->
### `comparar`
```json
{"id": "p08", "type": "comparar", "titulo": "Compara con <, > o =", "ejemplo": "3/4 y 0,7: 3 ÷ 4 = 0,75 y 0,75 es mayor que 0,7, así que 3/4 > 0,7.", "items": [{"a": "3/4", "b": "0,7", "porQue": "3/4 = 0,75 y 0,75 > 0,70."}, {"a": "1/2", "b": "0,50", "porQue": "1/2 = 0,5 = 0,50."}, {"a": "1/4", "b": "0,3", "porQue": "1/4 = 0,25 y 0,25 < 0,30."}, {"a": "40 %", "b": "1/2", "porQue": "40 % = 0,4 y 1/2 = 0,5."}]}
```
Reglas y límites de `comparar`: módulo 34.

<!-- TIPO:podio -->
### `podio`
```json
{"id": "m07", "type": "podio", "titulo": "El podio de los 100 m", "intro": "Gana quien tarda menos tiempo. Elige el puesto de cada corredor.", "ejemplo": "Con 9,5 s · 9,05 s · 9,25 s: gana 9,05 s, luego 9,25 s y al final 9,5 s.", "items": [{"texto": "Valentina · 15,3 s", "puesto": 4, "porQue": "15,3 equivale a 15,30, el mayor tiempo."}, {"texto": "Camilo · 15,03 s", "puesto": 1, "porQue": "15,03 es el menor tiempo."}, {"texto": "Sofía · 15,25 s", "puesto": 3, "porQue": "15,25 es mayor que 15,205."}, {"texto": "Julián · 15,205 s", "puesto": 2, "porQue": "15,205 es mayor que 15,03 y menor que 15,25."}]}
```
Reglas y límites de `podio`: módulo 34.

<!-- TIPO:abierta -->
### `abierta`
```json
{"id": "d11", "type": "abierta", "titulo": "Explica con tus palabras", "intro": "Tu docente leerá tus respuestas.", "minPalabras": 6, "ejemplo": "«Un correo falso suele tener un remitente raro y me mete prisa para que no pregunte».", "prompts": ["Cuéntale a un amigo cómo reconoces un correo falso. Escribe al menos dos señales.", "¿Qué harías si un mensaje te pide tu contraseña?"]}
```
Reglas y límites de `abierta`: módulo 43.

<!-- TIPO:cuaderno -->
### `cuaderno`
```json
{"id": "m10", "type": "cuaderno", "titulo": "Trabajo escrito en tu cuaderno", "encabezado": "Misión decimales · Aritmética 4.° · tu nombre y la fecha", "partes": [{"titulo": "PARTE 1 · Investiga", "instrucciones": "Responde con mínimo 4 renglones y escribe tus fuentes.", "puntos": ["¿Qué es un número decimal y para qué se usa?", "Busca una profesión donde se usen decimales y cuenta cómo."]}, {"titulo": "PARTE 2 · Ejercicios", "instrucciones": "Muestra siempre el procedimiento.", "puntos": ["Escribe en cifras: seis enteros con nueve centésimas.", "Compara con <, > o =: 0,45 ___ 0,5.", "Ordena de menor a mayor: 8,2 · 8,02 · 8,25 · 8,205.", "Dibuja una recta de 0 a 1 y ubica 0,2 · 0,6 · 0,9."]}]}
```
Reglas y límites de `cuaderno`: módulo 34.

<!-- TIPO:enlazar -->
### `enlazar`
```json
{"id": "p04", "type": "enlazar", "titulo": "Une la fracción con su decimal", "intro": "Cada fracción tiene un decimal igual.", "ejemplo": "1/2 se une con 0,5 porque 1 ÷ 2 = 0,5.", "pares": [{"izq": "1/2", "der": "0,5", "porQue": "1 ÷ 2 = 0,5."}, {"izq": "1/4", "der": "0,25", "porQue": "1 ÷ 4 = 0,25."}, {"izq": "3/4", "der": "0,75", "porQue": "3 ÷ 4 = 0,75."}, {"izq": "1/10", "der": "0,1", "porQue": "1 ÷ 10 = 0,1."}, {"izq": "1/5", "der": "0,2", "porQue": "1 ÷ 5 = 0,2."}]}
```
Reglas y límites de `enlazar`: módulo 35.

<!-- TIPO:ordenar -->
### `ordenar`
```json
{"id": "p11", "type": "ordenar", "titulo": "El orden de los sabores", "instruccion": "Ordena de menor a mayor.", "orden": "asc", "items": ["0,1", "20 %", "1/4", "0,5", "3/4"], "porQue": "Se pasa todo a decimal: 0,1 · 0,2 · 0,25 · 0,5 · 0,75."}
```
Reglas y límites de `ordenar`: módulo 35.

<!-- TIPO:memoria -->
### `memoria`
```json
{"id": "p10", "type": "memoria", "titulo": "Memoria: fracción y porcentaje", "intro": "Encuentra cada fracción con su porcentaje.", "pares": [{"a": "1/2", "b": "50 %", "porQue": "La mitad es el 50 %."}, {"a": "1/4", "b": "25 %", "porQue": "Un cuarto es el 25 %."}, {"a": "3/4", "b": "75 %", "porQue": "Tres cuartos son el 75 %."}, {"a": "1/10", "b": "10 %", "porQue": "Un décimo es el 10 %."}]}
```
Reglas y límites de `memoria`: módulo 35.

<!-- TIPO:relampago -->
### `relampago`
```json
{"id": "p09", "type": "relampago", "titulo": "Relámpago: ¿son iguales?", "intro": "Decide rápido si las dos cantidades valen lo mismo.", "segundos": 8, "vidas": 3, "opciones": ["Son iguales", "No son iguales"], "items": [{"texto": "1/2 y 0,5", "correcta": 0, "porQue": "1 ÷ 2 = 0,5."}, {"texto": "1/4 y 0,4", "correcta": 1, "porQue": "1/4 = 0,25, no 0,4."}, {"texto": "3/4 y 75 %", "correcta": 0, "porQue": "3/4 = 0,75 = 75 %."}, {"texto": "1/10 y 0,01", "correcta": 1, "porQue": "1/10 = 0,1; 0,01 es 1/100."}, {"texto": "2/4 y 1/2", "correcta": 0, "porQue": "2/4 se simplifica a 1/2."}, {"texto": "1/5 y 0,2", "correcta": 0, "porQue": "1 ÷ 5 = 0,2."}, {"texto": "1/2 y 25 %", "correcta": 1, "porQue": "1/2 es el 50 %."}, {"texto": "3/10 y 0,3", "correcta": 0, "porQue": "3 ÷ 10 = 0,3."}]}
```
Reglas y límites de `relampago`: módulo 35.

<!-- TIPO:sopa -->
### `sopa`
```json
{"id": "j08", "type": "sopa", "titulo": "Sopa de hardware", "intro": "Lee la pista y encuentra la palabra escondida.", "tam": 10, "palabras": [{"palabra": "MOUSE", "pista": "Mueve la flecha en la pantalla"}, {"palabra": "TECLADO", "pista": "Tiene letras y números"}, {"palabra": "MONITOR", "pista": "Muestra lo que haces"}, {"palabra": "IMPRESORA", "pista": "Saca tu trabajo en papel"}]}
```
Reglas y límites de `sopa`: módulo 35.

<!-- TIPO:candado -->
### `candado`
```json
{"id": "j10", "type": "candado", "titulo": "El candado secreto", "intro": "Resuelve los acertijos, junta los 3 dígitos y abre el candado.", "tesoro": "¡Eres un experto en hardware! Te ganaste un tesoro de XP.", "acertijos": [{"q": "¿Cuál es un dispositivo de ENTRADA?", "ops": ["Monitor", "Teclado", "Parlantes"], "ok": 1, "digito": 4, "porQue": "El teclado envía datos al computador."}, {"q": "¿Cuál es un dispositivo de SALIDA?", "ops": ["Mouse", "Micrófono", "Impresora"], "ok": 2, "digito": 7, "porQue": "La impresora entrega información en papel."}, {"q": "¿Cuál es SOFTWARE?", "ops": ["Mouse", "Paint", "Monitor"], "ok": 1, "digito": 2, "porQue": "Paint es un programa, no se toca."}]}
```
Reglas y límites de `candado`: módulo 35.

<!-- TIPO:fraccion -->
### `fraccion`
```json
{"id": "p03", "type": "fraccion", "titulo": "Pinta la fracción", "intro": "Toca las partes que hay que pintar.", "ejemplo": "Para 1/4 de una pizza partida en 4 se pinta 1 parte: el numerador dice cuántas se pintan.", "items": [{"enunciado": "Pinta 1/4 de la pizza", "partes": 4, "objetivo": 1, "forma": "pizza", "porQue": "1/4: la pizza tiene 4 partes y se pinta 1."}, {"enunciado": "Pinta 3/4 de la pizza", "partes": 4, "objetivo": 3, "forma": "pizza", "porQue": "3/4: de 4 partes se pintan 3."}, {"enunciado": "Pinta 3/8 de la barra", "partes": 8, "objetivo": 3, "forma": "barra", "porQue": "3/8: la barra tiene 8 partes y se pintan 3."}]}
```
Reglas y límites de `fraccion`: módulo 37.

<!-- TIPO:detective -->
### `detective`
```json
{"id": "r07", "type": "detective", "titulo": "Detective del ticket", "contexto": "🧾 Ticket de precios de la papelería", "intro": "Alguien sumó en vez de multiplicar. Encuentra los 3 errores.", "ejemplo": "Si 1 lápiz cuesta $2, 2 lápices cuestan $4 (2 × 2), no $3.", "pista": "Compara el precio con «cantidad × $2» en cada línea.", "lineas": [[{"t": "Producto:", "fijo": true}, {"t": "Lápices"}], [{"t": "1 lápiz cuesta", "fijo": true}, {"t": "$2"}], [{"t": "2 lápices cuestan", "fijo": true}, {"t": "$4"}], [{"t": "3 lápices cuestan", "fijo": true}, {"t": "$5", "s": true, "porQue": "Debería ser $6: 3 × 2 = 6. Se sumó en vez de multiplicar."}], [{"t": "5 lápices cuestan", "fijo": true}, {"t": "$10"}], [{"t": "10 lápices cuestan", "fijo": true}, {"t": "$12", "s": true, "porQue": "Debería ser $20: 10 × 2 = 20. Se sumó en vez de multiplicar."}], [{"t": "Juan dice:"}, {"t": "«como 2 cuestan $4, 4 cuestan $6»", "s": true, "porQue": "Si los lápices se duplican, el precio se duplica: 4 lápices cuestan $8."}]]}
```
Reglas y límites de `detective`: módulo 38.

<!-- TIPO:tabla -->
### `tabla`
```json
{"id": "r06", "type": "tabla", "titulo": "Completa la tabla de precios", "intro": "Cada kilo de arroz cuesta lo mismo. Completa los precios que faltan.", "ejemplo": "Con 1 kg → $3, la regla es «× 3»: 2 kg → $6.", "relacion": "Regla: el precio es 3 veces los kilos (kilos × 3).", "columnas": ["Kilos", "Precio ($)"], "filas": [[1, 3], [2, 6], [3, {"r": 9}], [5, {"r": 15}], [10, {"r": 30}]], "proporcional": true, "pista": "Multiplica los kilos por 3.", "porQue": "Cada kilo cuesta $3, así que el precio es kilos × 3."}
```
Reglas y límites de `tabla`: módulo 40.

<!-- TIPO:editor -->
### `editor`
```json
{"id": "w03", "type": "editor", "titulo": "Dale formato a la mascota", "intro": "Sigue las instrucciones sobre la frase de Ana.", "ejemplo": "Para poner «Luna» en negrita: toca la palabra y luego el botón N.", "pista": "Toca la palabra (se encierra en un recuadro) y después el botón de formato.", "texto": ["Mi", "mascota", "Luna", "es", "muy", "juguetona", "y", "cariñosa"], "objetivos": [{"palabra": 2, "formatos": ["negrita"], "instr": "Pon «Luna» en negrita (N)."}, {"palabra": 5, "formatos": ["cursiva"], "instr": "Pon «juguetona» en cursiva (K)."}, {"palabra": 7, "formatos": ["subrayado"], "instr": "Subraya «cariñosa» (S)."}, {"palabra": 1, "formatos": ["color"], "instr": "Cambia «mascota» al color rojo (A)."}], "porQue": "Cada botón cambia la palabra seleccionada: negrita la engrosa, cursiva la inclina, subrayado le pone una línea y color la pinta."}
```
Reglas y límites de `editor`: módulo 41.

<!-- TIPO:final -->
### `final`
```json
{"id": "m11", "type": "final", "titulo": "¡Misión cumplida!", "aprendiste": ["Lees y escribes decimales con décimas y centésimas.", "Ubicas decimales en la recta numérica.", "Comparas y ordenas decimales con seguridad."], "siguiente": "Sumaremos y restaremos decimales en la tienda escolar."}
```
