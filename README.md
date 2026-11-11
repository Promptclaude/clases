# Clases — Prompt Maestro, motor probado y recursos

| Qué | Dónde |
|---|---|
| **Prompt vigente (v26 + módulo 33 del banco)** | `Prompt_Maestro_Clases_v26_COMPLETO.md` |
| **Motor de referencia** (se reutiliza, no se reescribe) | `plantilla/clase_referencia.src.html`, `plantilla/motor/` |
| Ejemplo de otra materia solo con datos | `plantilla/ejemplos/` |
| **Puerta de calidad** y demás herramientas | `tools/` (`puerta_de_calidad.py`, `construir_clase.py`, `auditar_clase.py`, `prueba_clase_e2e.js`, …) |
| Pruebas del repositorio | `pruebas/` · `npm test` |
| **Banco de imágenes y base de datos** (505 recursos revisados y clasificados) | `banco-imagenes/` (ver su README, `banco.json` y `vistas-previas/`) · módulo `prompt-modulos/33_banco_imagenes.md` |
| **Actividades visuales tipo nivelación** (cuadrícula, recta, comparar, podio, abierta, cuaderno) | módulo `prompt-modulos/34_actividades_tipo_nivelacion.md` · ejemplo `plantilla/ejemplos/mat4_decimales.datos.json` · motor `plantilla/motor/v27_actividades_snippets.js` |
| **Juegos de aplicación y ritmo de clase** (enlazar, ordenar, memoria, relámpago, sopa de letras, candado secreto) | módulo `prompt-modulos/35_juegos_y_ritmo_de_clase.md` · ejemplo `plantilla/ejemplos/tec4_juegos_hardware.datos.json` · motor `plantilla/motor/v28_juegos_snippets.js` |
| **Mapa de misión y final de celebración** (medalla, estrellas, logros, insignia imprimible) | módulo `prompt-modulos/36_mapa_y_celebracion.md` · motor `plantilla/motor/v29_mapa_y_celebracion_snippets.js` |
| **Imágenes de apoyo, fracciones y flujo para crear una clase** | módulo `prompt-modulos/37_imagenes_fracciones_y_flujo.md` · ejemplo real `plantilla/ejemplos/mat5_pizzeria_fracciones.datos.json` · `npm run test:rapido` (la batería completa `npm test` tarda varios minutos) |
| **Juego detective y calidad de imágenes** (señales de engaño, recortes del banco) | módulo `prompt-modulos/38_detective_y_recortes.md` · ejemplo real `plantilla/ejemplos/tec5_detectives_internet.datos.json` · motor `plantilla/motor/v31_detective_snippets.js` |
| **Ampliar el banco: quitar fondos, separar láminas, kit SVG de matemáticas** | `banco-imagenes/GUIA_NUEVAS_IMAGENES.md` · módulo `prompt-modulos/39_banco_nuevas_imagenes.md` · `banco-imagenes/_herramientas/` |
| **Catálogo visual del banco** (miniaturas, qué contiene cada imagen, alt, grado) | `banco-imagenes/CATALOGO.md` y `banco-imagenes/catalogo/` |
| **Actividad tabla y clase de razones/proporcionalidad** | módulo `prompt-modulos/40_tabla_y_razones.md` · ejemplo real `plantilla/ejemplos/mat5_tienda_razones.datos.json` · motor `plantilla/motor/v32_tabla_snippets.js` |
| **Juego editor (formato de texto) y clase de ofimática** | módulo `prompt-modulos/41_editor_de_formato.md` · ejemplo real `plantilla/ejemplos/tec4_documento_formato_tablas.datos.json` · motor `plantilla/motor/v33_editor_snippets.js` |
| **Conexión con el Aula (Notas y avance), nombre del archivo y mascotas** | módulo `prompt-modulos/42_aula_y_mascotas.md` · `pruebas/prueba_aula_integracion.py` · motor `plantilla/motor/v34_aula_snippets.js` |
| Módulos del prompt sueltos | `prompt-modulos/` |
| Historial | `CHANGELOG.md` (versiones previas recuperables con `git checkout archivo-v24-v25`) |

## Crear una clase
1. Escribe `datos.json` (misma forma que `plantilla/ejemplos/*.json`).
2. `python3 tools/construir_clase.py plantilla/clase_referencia.src.html --datos datos.json -o clase.html`
3. `python3 tools/puerta_de_calidad.py clase.html` → **VERDE** para entregar; ROJO se corrige.
4. Ábrela una vez en un equipo del laboratorio (lo único que las pruebas automáticas no cubren: apariencia y rendimiento reales).

Requisitos: Python 3 con `Pillow`, `scipy`, `numpy`; Node con `npm install` (jsdom).
