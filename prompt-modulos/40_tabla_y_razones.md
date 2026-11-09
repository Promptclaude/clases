## 🔴 PRIORIDAD 71 · ALTA — ACTIVIDAD «TABLA» (proporcionalidad, conversiones, tablas de valores) · motor 32

El estudiante **escribe** en las celdas vacías de una tabla y pulsa «Revisar». Las celdas correctas se marcan ✅ y se bloquean; las demás se pueden corregir. **2 revisiones**: 1.ª perfecta = 1 punto · 2.ª = 0,5 · tras 2 fallos se muestran los valores (0) y la regla. Botón 💡 Pista. No toca la nota del quiz y nadie se queda atrapado («No me sale»). Acepta `3,5`, `3.5`, `7/2` y `50 %`.

```json
{"id":"r06","type":"tabla","titulo":"Completa la tabla de precios","intro":"…","ejemplo":"Con 1 kg → $3, la regla es «× 3»: 2 kg → $6.",
 "relacion":"Regla: el precio es 3 veces los kilos (kilos × 3).",
 "columnas":["Kilos","Precio ($)"],
 "filas":[[1,3],[2,6],[3,{"r":9}],[5,{"r":15}],[10,{"r":30}]],
 "proporcional":true,"pista":"Multiplica los kilos por 3.","porQue":"Cada kilo cuesta $3, así que el precio es kilos × 3."}
```
- `columnas`: 2 a 4 nombres (con unidad). `filas`: 3 a 6 filas con el mismo número de celdas. Una celda **vacía** se escribe `{"r": respuesta}` (número); las demás son números o textos.
- **De 2 a 6 celdas vacías**, y en tablas proporcionales **mínimo 2 filas completas** para que el estudiante pueda deducir la regla.
- `"proporcional": true` (2 columnas): **el auditor comprueba que todas las razones sean iguales**; atrapa el error típico de poner un valor que no corresponde.
- `relacion` (opcional): la regla en una frase; úsala solo si ayuda (en la 1.ª tabla sí; en la 2.ª puedes quitarla para subir la dificultad). `porQue`: explicación de la regla que se muestra al terminar.
- Úsala para: proporcionalidad directa, precios por unidad, conversión de unidades (km ↔ m, h ↔ min), tablas de multiplicar, equivalencias de fracciones, tablas de valores de una regla.

### Cómo enseñar razones y proporcionalidad (receta probada en `mat5_tienda_razones`)
`info` (razón, con imagen del banco) → `enlazar` (situación ↔ razón) → `quiz` → `info` (proporcionalidad) → **`tabla`** → `detective` (ticket con errores de **sumar en vez de multiplicar**) → `relampago` (¿proporcionales?) → `comparar` (razones equivalentes como fracciones: `2/3` vs `4/6`) → `ordenar` (pasos de la regla de tres) → `evalFinal` → `candado`.
- **Error conceptual a atacar siempre**: «sumar en vez de multiplicar». Ponlo en el `detective` y en los distractores del quiz.
- En `relampago`, no uses pares «proporcionales» que sean ambiguos: revisa a mano cada razón (ej. 1,4 m a 10 años y 2,8 m a 20 años SÍ serían proporcionales).
- Imágenes del banco: `buscar_banco.py --tema razones --alt` y `--tema dinero`.

### Pruebas
El e2e (T28) comprueba: revisar sin escribir no gasta revisión, el conteo «Acertaste x de n», las celdas correctas bloqueadas, la pista, completar en la 2.ª revisión (0,5), la explicación de la regla y que tras 2 fallos muestra los valores y deja continuar. Ejemplo real: `plantilla/ejemplos/mat5_tienda_razones.datos.json`.
