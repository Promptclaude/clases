# Clases — Prompt Maestro, motor probado y recursos

| Qué | Dónde |
|---|---|
| **Prompt vigente (v26 + módulo 33 del banco)** | `Prompt_Maestro_Clases_v26_COMPLETO.md` |
| **Motor de referencia** (se reutiliza, no se reescribe) | `plantilla/clase_referencia.src.html`, `plantilla/motor/` |
| Ejemplo de otra materia solo con datos | `plantilla/ejemplos/` |
| **Puerta de calidad** y demás herramientas | `tools/` (`puerta_de_calidad.py`, `construir_clase.py`, `auditar_clase.py`, `prueba_clase_e2e.js`, …) |
| Pruebas del repositorio | `pruebas/` · `npm test` |
| Pack original de 46 imágenes (ya incluido en el banco) | `assets-reutilizables/` |
| **Banco de imágenes y base de datos** (505 recursos revisados y clasificados) | `banco-imagenes/` (ver su README, `banco.json` y `vistas-previas/`) · módulo `prompt-modulos/33_banco_imagenes.md` |
| Módulos del prompt sueltos | `prompt-modulos/` |
| Historial | `CHANGELOG.md` (versiones previas recuperables con `git checkout archivo-v24-v25`) |

## Crear una clase
1. Escribe `datos.json` (misma forma que `plantilla/ejemplos/*.json`).
2. `python3 tools/construir_clase.py plantilla/clase_referencia.src.html --datos datos.json -o clase.html`
3. `python3 tools/puerta_de_calidad.py clase.html` → **VERDE** para entregar; ROJO se corrige.
4. Ábrela una vez en un equipo del laboratorio (lo único que las pruebas automáticas no cubren: apariencia y rendimiento reales).

Requisitos: Python 3 con `Pillow`, `scipy`, `numpy`; Node con `npm install` (jsdom).
