# Migración v26 → v27 (núcleo)

Qué pasa con cada bloque del prompt v26 y qué hay que comprobar **antes de borrar nada**.
Lo que sigue es un diagnóstico por lectura del repositorio; **no se ejecutaron las pruebas**.

## Disposición por bloque

| Prioridades v26 | Tema | Destino | Estado |
|---|---|---|---|
| 0, 38, 62, 61, 44–47, 49 | Datos, flujo, pedagogía, preguntas, ritmo | **Núcleo** §3, §5 | Condensado |
| 0-B, 0-E, 0-F, 12, 14-B | Visual, paleta clara, tema rotativo, contexto Cúcuta | **Núcleo** §5 | Condensado |
| 50, 56, módulo 33, 39 (imágenes) | Imágenes propias y banco | **Núcleo** §6 | Condensado |
| 58, 59, 60, 63, 64 | Motor, pruebas, puerta, errores históricos, versiones | **Núcleo** §2, §3, §7, §8 + módulo 32 (consulta) | Condensado |
| 8-A … 8-W, 6, 6-B, 6-C, 8, 8-B…8-L, 38-B/C/D, 39, 39-B, 40, 41, 42, 43, 3, 4, 5, 7, 18, 52 | Sincronía, guardado, identidad, nota, bloqueos, quiz, reintento, modales, cronómetro | **Motor + puerta** (`plantilla/motor/`, T10–T31, mutaciones) | **Verificar** que cada una tenga su prueba (ver abajo) y luego archivar |
| 65–74 (módulos 34–43) | Tipos de actividad y Aula | **Se quedan como módulos**, uno por tipo, leídos solo si se usa | Sin cambios |
| 1, 1-B | Imágenes de Unsplash (mín. 20) | **Eliminar** | Contradice módulo 33; cita `verificar_imagenes.py`, que no existe |
| 9 | Estructura fija de 23 slides | **Eliminar** | Los ejemplos reales tienen 9–14 slides y usan tipos que 9 no conoce; sustituida por el guion de ritmo |
| 31 | Imágenes en base64 | **Eliminar** | Contradice 58 (prohíbe base64 a mano; lo hace el empaquetador) |
| 6 (MAX_VIDAS = 8) | Vidas | **Decidir** | El motor habla de reintento con 2 oportunidades; ver abajo |

## Funciones del prompt viejo que el motor v34 no implementa

Búsqueda en `plantilla/clase_referencia.src.html` y `plantilla/motor/*.js` (142 KB):

| Función pedida por el prompt | Coincidencias en el motor |
|---|---|
| Tienda, mochila y baúl (36-C) | 0 |
| Avatar propio / protagonista `PROTA` (22, 34) | 0 |
| `CLASE_KB` y ARIA con conocimiento de toda la clase (37) | 0 |
| ARIA con voz (`speechSynthesis`) y chat (30) | 0 |
| Hotspots (19) | 0 |
| Panel docente unificado (16) | 1 (solo una mención); hoy el docente ve el avance por el Aula |

ARIA existe en el motor como mascota (imágenes y poses), no como chat.

**Recomendación:** moverlas a `archivo/ideas_no_implementadas.md`. Si alguna te importa de verdad, se agrega a la plantilla con su prueba (Prioridad 64) y entonces sube al núcleo. Mientras tanto, el prompt viejo le exige a la IA entregar cosas que el motor no sabe construir.

## Referencias a archivos que no existen en el repositorio

El prompt v26 manda ejecutar o leer, entre otros:
`plantillas/DATOS_DE_LA_CLASE.md`, `tests/prueba_clase.js`, `aria/aria_widget.html`, `tools/insertar_aria.py`, `tools/insertar_nucleo.py`, `tools/aligerar_html.py`, `tools/restaurar_html.py`, `tools/esqueleto_clase.py`, `tools/verificar_imagenes.py`, `prompt/90_checklists.md`.
En `tools/` solo existen: `auditar_clase.py`, `construir_clase.py`, `empaquetar_assets.py`, `extraer_imagenes_de_clase.py`, `limpiar_recortes.py`, `prueba_clase_e2e.js`, `prueba_de_mutaciones.py`, `puerta_de_calidad.py`, `verificar_matematica.py`. El núcleo v27 solo cita herramientas que existen.

## Antes de borrar: comprobaciones

1. `npm install && npm test` (unos 2,5 min; la prueba del Aula necesita Chromium). Todo debe pasar en verde **antes** de tocar el prompt.
2. Para cada prioridad del grupo «Motor + puerta», anotar qué prueba la vigila (el catálogo E1–E20 del módulo 32 cubre 20 casos; el resto hay que mapearlo). **Una regla sin prueba no se archiva: se sube al núcleo o se escribe la prueba.**
3. Resolver MAX_VIDAS = 8 frente a «reintento con 2 oportunidades» (consultar qué hace realmente `iniciarNuevoIntento` / la prueba T13) y dejar un solo valor en el motor.
4. Probar el núcleo: generar una clase real con él (por ejemplo, la semana siguiente de Aritmética 5.°) y comparar con lo que habría dado el prompt completo. Si la puerta da VERDE y el resultado es igual de bueno, se adopta.

## Estructura propuesta del repositorio

```
prompt/
  NUCLEO.md                  ← lo que se pega siempre (v27)
prompt-modulos/              ← módulos 32–43, uno por tipo de actividad (consulta)
archivo/
  Prompt_Maestro_Clases_v26_COMPLETO.md
  ideas_no_implementadas.md  ← prioridades 16, 19–23, 30–30-F, 34–37 y similares
```
