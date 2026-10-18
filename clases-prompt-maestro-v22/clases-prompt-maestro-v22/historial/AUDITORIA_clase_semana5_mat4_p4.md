# Auditoría de la clase de ejemplo: semana5_mat4_p4.html

Método: `tools/auditar_clase.py` (estático) + `tests/prueba_clase.js` (navegador real). Es una clase generada con una versión anterior del prompt (no trae `NOMBRE_NORM`, `KEY_RESUMEN` ni `resetearEstadoQuiz` de la v21).

## Lo que funciona (probado)
- T1–T6 de la prueba automática pasan: el cronómetro baja y desbloquea a los 12 s; sigue funcionando con la pestaña suspendida; ir y venir 5 veces no deja temporizadores fantasma; recorrido completo con clics rápidos y atrás/adelante sin bloqueos; recargar con retroalimentación pendiente no deja la pregunta muerta; la cola de modales no pisa avisos.
- La mejor nota (8-U) y el sello de sesión están implementados en `save()`.
- Las imágenes están incrustadas en base64 (cero URL remotas): no depende de internet.

## Defectos encontrados
| # | Hallazgo | Impacto | Corrección en v22 |
|---|---|---|---|
| 1 | `sesionGuardadaEsValida` acepta datos **sin** campo `semana`/`claseId`/`studentId` (`!== undefined &&`) | Un dato antiguo sin sello se carga en la clase nueva: **causa probable de la nota heredada** | 38-B + `Nucleo` (sello estricto) |
| 2 | Claves escritas a mano en ≥ 11 sitios (`mat4p4_…`, `mat_4_…`, `_s5`) y `SEMANA_NUM` suelto | Al copiar la clase, cualquier literal olvidado lee/escribe en otra semana o curso | 38 (`CLASE_CFG`) + auditoría `--previa` |
| 3 | `buscarSesionHuerfanaPorNombre` recorre `clases_guardadas` | Puede recuperar sesiones de otro grupo/semana | Eliminada (38.3) |
| 4 | Vitrina de logros con clave `mat4_logros_…` sin semana | Puede arrastrar datos entre semanas si guarda algo más que cosméticos | Baúl solo cosméticos (36-C) |
| 5 | `--bg-main:#0A1230` (luminosidad 11 %) | Viola tu propia regla 0-E (paleta clara) | 0-E + 35-B (oscuro solo en `.escena`) |
| 6 | 4 funciones de ARIA declaradas dos veces (`normalizaTexto`, `distanciaLevenshteinAria`, `seParecenAria`, `esPreguntaOrientacionAria`) | La segunda pisa a la primera; comportamiento impredecible | Auditoría + 38-E |
| 7 | 21 slides, sin capítulos ni minijuegos; 8 slides `info` de lectura plana | Se siente "siguiente, siguiente" | Prioridad 9 nueva + 34-C + 35 |
| 8 | ≈ 173 etiquetas de prioridad/versión en el código y 1,98 MB de JS propio | Peso, ruido y reglas viejas copiadas | 38-E |
| 9 | La prueba T7 (reintento con clics reales) **no se pudo ejecutar**: espera `vistaPregunta()` y esta clase tiene `vistaPreguntaQuiz()` | No hay evidencia automática de que el reintento funcione en esta clase | `CLASE_API` (38-D) |

## Sin verificar
- El bug de "no deja contestar tras reintentar" **no se reprodujo**: la prueba que lo cubre no corrió en esta clase (hallazgo 9). La función `iniciarNuevoIntento` y el vigilante `verificarQuizVivo` existen y su lectura es razonable, pero falta la prueba con clics reales.
- Imágenes remotas: no aplica (no hay).
