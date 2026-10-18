# Prompt Maestro de Clases — v22

Generador de clases HTML gamificadas (Aritmética y Tecnología, 4.º y 5.º) para la Institución Educativa Simón Bolívar. Un solo prompt, dividido en módulos, con ARIA (asistente) y una prueba automática.

```
LEEME_CLAUDE.md                 ← entrada para la IA (leer primero)
MANIFEST.json                   ← módulos, orden, etapas, hashes
prompt/00_…90_*.md              ← las 96 prioridades, agrupadas por tema (20 módulos + protocolo + checklists)
plantillas/DATOS_DE_LA_CLASE.md ← datos que se completan en cada clase (+ clave del panel docente)
aria/                           ← widget de ARIA v2.8.0 + sprites + README_ARIA.md
tests/prueba_clase.js           ← prueba automática de la clase (T1–T9) con Playwright
tests/prueba_nucleo.js          ← 36 pruebas del núcleo (sin navegador)
tests/prueba_snippets.js        ← prueba el código de referencia que está dentro del propio prompt
motor/nucleo.js                 ← núcleo seguro: claves, sello, mejor nota, billetera (se inserta, no se reescribe)
tools/                          ← insertar_aria, insertar_nucleo, aligerar/restaurar_html, esqueleto_clase, auditar_clase, verificar_imagenes, verificar_repo, regenerar_manifest
dist/Prompt_Maestro_Clases_v22_COMPLETO.md ← todo el prompt en un solo archivo (para adjuntar en el chat)
historial/                      ← qué cambió entre versiones y por qué (no se lee al aplicar)
```

## Flujo para crear la clase siguiente
1. Adjunta en el chat: `LEEME_CLAUDE.md` + `dist/Prompt_Maestro_Clases_v22_COMPLETO.md` + la plantilla del index (+ `aria/`, `tools/`, `tests/` si la herramienta de archivos de Claude está activa).
2. Pídele la clase de la semana N. Si le das la clase anterior, que sea la versión aligerada (`python3 tools/aligerar_html.py clase.html`).
3. Al recibir el HTML: `python3 tools/insertar_aria.py semanaN.html` y `node tests/prueba_clase.js semanaN.html`.

## Antes de hacer público el repositorio
- 🔐 **Revoca la clave de Gemini** que traía el HTML original de ARIA (se retiró de aquí, pero estuvo en un archivo compartido).
- 🔐 `plantillas/DATOS_DE_LA_CLASE.md` contiene la clave del panel docente: usa repositorio **privado** o cámbiala.
- `python3 tools/verificar_repo.py` debe terminar en OK.

## Mantenimiento
Si editas un módulo a propósito: `python3 tools/regenerar_manifest.py && python3 tools/verificar_repo.py`.

## Novedades de la v22 (resumen)
Clase como aventura: estudiante protagonista, capítulos tipo cuento misterioso, mundos, 3 minijuegos, gemas/poderes/tienda, ARIA con conocimiento estructurado y escalera de pistas, y un **núcleo probado** que impide que la nota se herede entre semanas. Detalle en `historial/CHANGELOG_v21_a_v22.md`.

## Flujo semanal (4 cursos) en 6 pasos
1. Entrega a Claude: `LEEME_CLAUDE.md` + el dist + el **index** del curso + la **clase anterior** (aligerada).
2. Claude determina la semana y el tema desde `INDEX_SEMANAS_META` y completa los datos.
3. Clona solo el código, sustituye todos los datos; claves vía `CLASE_CFG` + `Nucleo`.
4. `python3 tools/insertar_nucleo.py` · `python3 tools/insertar_aria.py`
5. `python3 tools/auditar_clase.py nueva.html --previa anterior.html --semana N` (cero ❌) y `node tests/prueba_clase.js`
6. Revisión de la lista de prioridades y entrega con resumen de cambios.
