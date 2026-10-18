# LEEME_CLAUDE — punto de entrada (leer primero, 1 minuto)

Eres quien va a generar una **clase HTML gamificada** con el Prompt Maestro v21. Este repositorio ya viene ordenado para que lo apliques **completo** sin gastar contexto en lo que no hace falta.

## Qué te dará el docente
1. La **plantilla del index** (con `INDEX_SEMANAS_META`, donde están los temas) y cuál es la semana siguiente.
2. Opcional: la clase anterior (puede pesar ~6 MB).

## Qué haces, en este orden
1. `prompt/00_PROTOCOLO_Y_PRECEDENCIA.md` — protocolo, tabla de precedencia y lista de 77 prioridades a confirmar.
2. `plantillas/DATOS_DE_LA_CLASE.md` — completa los datos (Prioridad 0). Toma la línea real de `INDEX_SEMANAS_META` del index que te den.
3. Lee los módulos en **3 etapas** (ver 00 §1): `10–13` → `14–16` → `17–23` + `90`. Lectura completa, sin resumir.
4. Genera el HTML. Luego `python3 tools/insertar_aria.py clase.html`.
5. `node tests/prueba_clase.js /ruta/clase.html` hasta que no haya ❌.
6. Confirma la lista de prioridades (✅ o ➖ con motivo).

## Reglas de ahorro de tokens (obligatorias)
- **Jamás** abras con `view`/`cat` un HTML pesado ni `aria/aria_sprites_base64.js`. Clase anterior → `tools/aligerar_html.py` o `tools/esqueleto_clase.py`.
- No leas `historial/`.
- El tema visual de esta clase debe ser distinto al de la anterior (Prioridad 0-F): sácalo con `tools/esqueleto_clase.py`.

Tamaño total de lectura de los módulos: ≈ 455 KB (≈ 141 mil tokens). Ver `MANIFEST.json`.
