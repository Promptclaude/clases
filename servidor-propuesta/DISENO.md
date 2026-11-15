# Diseño · hoja «Respuestas abiertas» (decisiones y fase 2)

## El problema
Las clases del motor tienen preguntas `abierta` («explica con tus palabras») y la hoja `cuaderno` («hice la hoja a mano»). Se guardaban en el progreso del estudiante (`_Estados`, un JSON por estudiante y clase) pero el docente no tenía dónde **leerlas**.

## Decisiones
| Decisión | Por qué |
|---|---|
| La clase guarda una clave propia `abiertas:<clase>:<grupo>:<nombre>` | `aula-sync.js` ya copia al servidor **cualquier** clave nueva (salvo las que empiezan por `aula_`): **no se toca ningún script compartido** |
| El servidor lee solo esa clave y la convierte en filas (1 fila por pregunta) | La hoja es legible y filtrable; `_Estados` no se toca |
| Solo se envía lo **guardado** (no los borradores) | El docente ve respuestas finales; el estudiante puede escribir tranquilo |
| `<clase>` se calcula igual que en `aula-sync.js` (nombre del archivo) | Coincide siempre, aunque `meta.claseId` sea distinto |
| Grupo y nombre salen del **perfil en el servidor**, no de lo que diga la clase | La clase no puede suplantar a otro estudiante |
| Columnas Revisión y Comentario nunca se sobrescriben | El trabajo del docente es intocable |
| Si el estudiante cambia una respuesta ya revisada → «🔄 Cambió» | El docente se entera sin buscar |
| Todo texto (formato `@`), longitudes limitadas (300 / 1500), máx. 12 por envío, JSON validado | Una respuesta como `=IMPORTXML(...)` no puede ejecutarse; un paquete roto no daña nada |
| `guardarAbiertas` va en `try/catch` dentro de `_guardarEstadoItem` | **Nunca** impide guardar el progreso |
| La lógica va en un archivo nuevo (`Abiertas.gs`) | `Code.gs` solo recibe 6 líneas; fácil de auditar y de revertir |

## Límites conocidos
- Máximo **12** respuestas abiertas + cuadernos por clase (el auditor lo exige).
- El estado de la clase no debe pasar de 30.000 caracteres (límite de `aula-sync.js`); la prueba lo comprueba.
- Las clases hechas antes del motor 34 no envían respuestas abiertas (hay que reconstruirlas con `construir_clase.py`).
- Los datos viajan como texto: no se envían imágenes ni archivos.

## Fase 2 (propuesta, NO implementada)
**Devolver la retroalimentación al estudiante.** Hoy el docente comenta en la hoja, pero el estudiante no lo ve. Diseño:
1. Ruta nueva `abiertasMias` en `RUTAS` (+1 línea en Code.gs): con el token del estudiante devuelve **solo sus filas** de la clase `{slide, n, revision, comentario}`.
2. La clase la consulta al abrir la slide `abierta` y muestra «💬 Tu docente dice: …» (con ✅/🟡/🔴).
3. Privacidad: solo filas del propio estudiante; el comentario se muestra únicamente cuando el docente lo escribió.
4. Prueba: simulador de servidor (ya existe) + e2e con la ruta simulada.
Otras ideas: exportar la hoja a CSV por grupo, resumen de «pendientes por revisar» en «Notas y avance», insignia por respuestas bien explicadas.
