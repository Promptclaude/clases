# LEEME_CLAUDE — punto de entrada (leer primero, 1 minuto)

Vas a generar la **clase HTML de la semana siguiente** con el Prompt Maestro v22: una aventura gamificada donde el estudiante es el protagonista. El repositorio ya viene ordenado para que lo apliques **completo** sin gastar contexto en lo que no hace falta.

## Qué te dará el docente
1. El **index** del curso (con `INDEX_SEMANAS_META`: ahí están el tema y el nombre de archivo de cada semana).
2. La **clase de la semana anterior** como plantilla de código (puede pesar ~5 MB). **Es plantilla de código, no verdad absoluta:** si contradice una prioridad, manda la prioridad.

## Qué haces, en este orden
1. `prompt/00_PROTOCOLO_Y_PRECEDENCIA.md` — visión, niveles de obligatoriedad, precedencia y lista de prioridades a confirmar.
2. `plantillas/DATOS_DE_LA_CLASE.md` — completa los datos (Prioridad 0 + los nuevos campos v22). La semana y el tema salen del index; si falta el tema, **pregunta**.
3. Resume la clase anterior (`tools/aligerar_html.py`, `tools/esqueleto_clase.py`); nunca la abras entera.
4. Lee los módulos en **3 etapas** (00 §2): `10–13` → `14–16 + 28` → `17–27 + 90`. Lectura completa, sin resumir.
5. Genera la clase **clonando solo el código** (Prioridad 38) y sustituyendo todos los datos. Contenido nuevo: capítulos `historia`, 3 minijuegos, `CLASE_KB`, economía.
6. `python3 tools/insertar_nucleo.py clase.html` y `python3 tools/insertar_aria.py clase.html`
7. `python3 tools/auditar_clase.py clase.html --previa anterior.html --semana N` → cero ❌. `python3 tools/verificar_imagenes.py clase.html`.
8. `node tests/prueba_clase.js /ruta/clase.html` → sin ❌.
9. Confirma la lista (✅ o ➖ con motivo) y entrega con un resumen de **qué cambió respecto a la anterior** y **qué quedó sin verificar**.

## Reglas de ahorro de tokens (obligatorias)
- **Jamás** abras con `view`/`cat` un HTML pesado ni `aria/aria_sprites_base64.js`.
- No leas `historial/`.
- El tema visual debe ser distinto al de la anterior (0-F).
- El núcleo (`motor/nucleo.js`) y ARIA **no se reescriben**: se insertan por script.

Tamaño de lectura de los módulos: ≈ 530 KB (≈ 160 mil tokens). Ver `MANIFEST.json`.
