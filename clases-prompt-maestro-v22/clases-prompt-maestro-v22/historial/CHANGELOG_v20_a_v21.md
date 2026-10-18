# CHANGELOG — v20 → v21

## Corregido (errores reales encontrados en la v20)
1. **Conflicto 8-J vs 8-K:** el "bloque único de claves" de 8-J declaraba `SKEY = PREFIX + '_session'` (sin estudiante) y `KEY_INDEX` con `prefijoCurso()`, contradiciendo a 8-K. Quedó una sola fórmula (8-K) y `KEY_RESUMEN` también lleva `NOMBRE_NORM`. **Conviene confirmar contra el index real** (el compañero `Prompt_Maestro_Index` no se subió).
2. **Checklist final incompleto:** el protocolo exigía confirmar "56 prioridades" pero el documento tenía 77; omitía de 12 a 29, 7-B, 10-D y la 16, y listaba una "18-C" que no existe. Ahora la lista (77) se genera desde los módulos y el verificador comprueba que coincida.
3. **ARIA desincronizada:** el prompt describía la ARIA antigua (`#mascota-fab`, 🤖 emoji) y el widget real es v2.8.0 (`#aria-fab`, imágenes, panel). Seguir ambos habría duplicado ARIA. Se retiró el código del prompt y el widget es la fuente única.
4. **Funciones repetidas:** `responderAria` ×4, `pedirReintento` ×2, `syncIndex` ×2, `normalizarTexto` ×2 y siete funciones de 30-E/30-F → una sola versión de cada una.
5. **Prueba duplicada:** 8-T embebía `prueba_clase.js` completa (idéntica al archivo): ahora es solo `tests/prueba_clase.js`.
6. **Regla CSS global** `img{width:100%;height:100%;object-fit:cover}` en el HTML de ARIA: pisaba TODAS las imágenes de la clase al pegarla. Eliminada del widget.
7. **Clave de Gemini** escrita en el HTML de ARIA: retirada (`PEGA_TU_CLAVE_AQUI`). **Debe revocarse.**
8. **Clave del panel docente** repetida 9 veces en el prompt: ahora vive solo en `plantillas/DATOS_DE_LA_CLASE.md`.

## Reorganizado
- 1 documento de 8.893 líneas / 664 KB → 15 módulos por tema (+ protocolo y checklists), manifiesto con hash y verificador.
- Títulos limpios (sin "v7.5 — NUEVO…"), 77 prioridades numeradas igual que antes (los IDs no cambian).
- Banners de versión, tablas de cambios y resúmenes ejecutivos → `historial/`.
- ARIA separada en widget + sprites (1.1 MB de base64 que nunca hay que leer).
- Herramientas: `aligerar_html.py` / `restaurar_html.py` (clases de 6 MB), `esqueleto_clase.py`, `insertar_aria.py`, `verificar_repo.py`.

## No cambiado
- Ninguna regla de comportamiento de las prioridades (solo se retiró código duplicado/obsoleto y notas de "ANULADO").

## Notas descartadas (no son instrucciones)
Se eliminaron del cuerpo las notas "🧹 v12.0 — se ELIMINÓ…" (explicaban qué código se había retirado en esa versión) y la subsección "32.1 — Qué se analizó y qué le faltaba al prompt anterior (v7.5)". El contenido normativo de esas secciones no cambió.
