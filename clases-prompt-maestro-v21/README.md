# Prompt Maestro de Clases — v21

Generador de clases HTML gamificadas (Aritmética y Tecnología, 4.º y 5.º) para la Institución Educativa Simón Bolívar. Un solo prompt, dividido en módulos, con ARIA (asistente) y una prueba automática.

```
LEEME_CLAUDE.md                 ← entrada para la IA (leer primero)
MANIFEST.json                   ← módulos, orden, etapas, hashes
prompt/00_…90_*.md              ← las 77 prioridades, agrupadas por tema (15 módulos + protocolo + checklists)
plantillas/DATOS_DE_LA_CLASE.md ← datos que se completan en cada clase (+ clave del panel docente)
aria/                           ← widget de ARIA v2.8.0 + sprites + README_ARIA.md
tests/prueba_clase.js           ← prueba automática (T1–T9) con Playwright
tools/                          ← insertar_aria, aligerar/restaurar_html, esqueleto_clase, verificar_repo
dist/Prompt_Maestro_Clases_v21_COMPLETO.md ← todo el prompt en un solo archivo (para adjuntar en el chat)
historial/                      ← qué se retiró de la v20 y por qué (no se lee al aplicar)
```

## Flujo para crear la clase siguiente
1. Adjunta en el chat: `LEEME_CLAUDE.md` + `dist/Prompt_Maestro_Clases_v21_COMPLETO.md` + la plantilla del index (+ `aria/`, `tools/`, `tests/` si la herramienta de archivos de Claude está activa).
2. Pídele la clase de la semana N. Si le das la clase anterior, que sea la versión aligerada (`python3 tools/aligerar_html.py clase.html`).
3. Al recibir el HTML: `python3 tools/insertar_aria.py semanaN.html` y `node tests/prueba_clase.js semanaN.html`.

## Antes de hacer público el repositorio
- 🔐 **Revoca la clave de Gemini** que traía el HTML original de ARIA (se retiró de aquí, pero estuvo en un archivo compartido).
- 🔐 `plantillas/DATOS_DE_LA_CLASE.md` contiene la clave del panel docente: usa repositorio **privado** o cámbiala.
- `python3 tools/verificar_repo.py` debe terminar en OK.

## Mantenimiento
Si editas un módulo a propósito: `python3 tools/regenerar_manifest.py && python3 tools/verificar_repo.py`.
