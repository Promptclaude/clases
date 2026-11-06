## 🔴 PRIORIDAD 68 · ALTA — IMÁGENES DE APOYO, FRACCIONES Y FLUJO PARA CREAR UNA CLASE (motor 30)

### 1. Imágenes del banco dentro de la clase
Una clase debe ser **muy visual**. Las slides `info` y cada pregunta de `quiz`/`evalFinal` aceptan una imagen del banco:
```json
{"type":"info","titulo":"…","texto":"…","imagen":"asset://img-8995c501b5","alt":"Pizza partida en cuatro con una porción señalada: un cuarto es 0,25"}
{"id":"q2","enunciado":"…","imagen":"asset://img-f2193e0d36","alt":"Vaso de jugo con un medio señalado, igual a 0,50", "opciones":[…]}
```
- `imagen` = `asset://<id>` de `banco-imagenes/banco.json` (módulo 33). Un id inexistente o `descartada` **detiene la construcción**.
- `alt` es **obligatorio** (mínimo 2 palabras): describe la imagen para lectores de pantalla (el auditor da error si falta).
- Una imagen por slide o pregunta, la más clara y relacionada con el concepto. Para buscar: `python3 banco-imagenes/_herramientas/buscar_banco.py <tema> --sin-texto`.
- En `info`, el orden es: **concepto → imagen → «Ejemplo resuelto / Ahora tú»**.

### 2. Juego `fraccion` (pintar partes de una pizza o una barra)
`{"type":"fraccion","titulo":"Pinta la fracción","ejemplo":"…","items":[{"enunciado":"Pinta 3/4 de la pizza","partes":4,"objetivo":3,"forma":"pizza"|"barra","pista":"(opcional)","porQue":"…"}]}`
`partes` de 2 a 12 y `objetivo` de 1 a `partes`. Mínimo 2 puntos. Mismas reglas de Prioridad 65 (2 intentos, 💡 Pista, 1 / 0,5 / 0 puntos, sin tocar la nota, «No me sale»). Se puede pintar con el dedo o con el teclado (Enter).

### 3. Fracciones y porcentajes en `comparar` y `ordenar`
- En `comparar`, `a` y `b` pueden ser decimales (`"0,75"`), fracciones (`"3/4"`) o porcentajes (`"25 %"`); el motor calcula el signo y el auditor verifica que `signo` (si lo escribes) sea correcto.
- En `ordenar`, si todos los items son números (decimales, fracciones o %), **el auditor comprueba que estén en el orden correcto**: de menor a mayor por defecto o de mayor a menor con `"orden":"desc"`. Mezclar formas (`"0,1"`, `"20 %"`, `"1/4"`) es lo que hace interesante el juego.
- En `recta`, `paso` puede ser `0.25` (cuartos) o `0.1` (décimas); `valor` debe caer exactamente en una marca.

### 4. FLUJO OBLIGATORIO para crear una clase (siempre en este orden)
1. **Tema y DBA**: fija `meta` (titulo, materia, grado, semana, dba) y 3 objetivos en la `intro`.
2. **Imágenes**: busca en el banco lo necesario y anota los ids. **Si falta una imagen clave, créala ORIGINAL (SVG) o pídela, no la inventes, y anótala como recurso faltante.**
3. **Guion de ritmo** (Prioridad 66): intro → info → juegos variados (≥4 tipos) → quiz → … → evalFinal → candado → final.
4. **Datos JSON** con `porQue` en cada punto, `ejemplo` en cada concepto y `aprendiste` + `siguiente` en la slide final (Prioridad 67).
5. **Construir y revisar**: `construir_clase.py` → `auditar_clase.py` (verde) → `prueba_clase_e2e.js` → `puerta_de_calidad.py` (🟢 VERDE). Si algo falla, **corregir los datos y repetir**; no entregar con ROJO.
6. **Informe final al docente** (5 líneas): qué juegos lleva y por qué, qué imágenes del banco usó (ids), **qué imágenes faltaron** y cuál sería el siguiente paso.
7. Matemática: revisar a mano **cada** cuenta, equivalencia y orden; el auditor atrapa muchos errores, pero no todos.

### Pruebas
El e2e (T26) comprueba que las imágenes viajan empaquetadas (sin internet) con `alt` descriptivo, que la figura de `fraccion` tiene el número de partes pedido, que se pinta con teclado y que `comparar` entiende fracciones y %. Ejemplo completo: `plantilla/ejemplos/mat5_pizzeria_fracciones.datos.json`.
