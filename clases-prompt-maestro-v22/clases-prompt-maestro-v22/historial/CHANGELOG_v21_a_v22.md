# v21 → v22

## Nuevo
- **Narrativa y personalización (módulo 24, prioridades 34–34-D):** el estudiante es el protagonista (`PROTA`, `hablarA()`), capítulos con argumento y mundos, **lecturas interactivas tipo cuento misterioso** (`historia`: tocar, buscar, predecir, elegir, ordenar), preguntas directas y decisiones.
- **Minijuegos (módulo 25, 35–35-B):** 3 por clase, 6 tipos, un contrato común (nunca tocan la nota, siempre se puede avanzar, un solo `terminar()`), y mundos oscuros solo dentro de `.escena`.
- **Economía (módulo 26, 36–36-D):** gemas con topes, 7 poderes que no regalan nota, mochila/tienda, baúl de cosméticos entre semanas, misiones, rachas y rangos.
- **ARIA (módulo 27, 37–37-C):** `CLASE_KB` estructurado, escalera de 5 pistas con costo, **filtro local anti-fuga** que también protege cuando ARIA usa IA, proactividad con límites.
- **Clonado y robustez (módulo 28, 38–38-E):** flujo "index + clase anterior", `CLASE_CFG` única, sello estricto y cuarentena, máquina de estados del reintento con vigilante, `window.CLASE_API`, higiene del código.
- **`motor/nucleo.js`** (código real, probado): claves del contrato 8-K/8-F, carga/guardado sellado, mejor nota que solo sube, billetera idempotente, almacenamiento seguro.
- **Herramientas:** `auditar_clase.py` (con `--previa`), `insertar_nucleo.py`, `verificar_imagenes.py`; `regenerar_manifest.py` ahora también reconstruye la lista de 00 y el `dist`.
- **Pruebas:** `prueba_nucleo.js` (36 comprobaciones), `prueba_snippets.js` (prueba el código que está dentro del propio prompt).

## Corregido
- **La nota se heredaba entre semanas:** causas reales documentadas en 38-B (claves y `SEMANA_NUM` copiados a medias, datos sin sello aceptados como válidos, recuperación "huérfana", vitrina sin semana). Ahora: sello estricto, cuarentena, estado cero real.
- **Quizzes que no responden tras reintentar:** 38-C (estados, limpieza única, decoración con `pointer-events:none`, vigilante).
- **Contradicción de posiciones:** la plantilla decía Quiz 1 = 9-10, Quiz 2 = 14-15, Final = 23-24; la Prioridad 9 decía 10, 15, 21-22. Fuente única: Prioridad 9.
- **"Autocontenida" vs imágenes remotas:** Prioridad 1-B (respaldo global de error, críticas embebidas, verificación).
- **Paleta clara vs mundos:** excepción controlada en 0-E + 35-B.
- **Niveles de obligatoriedad ambiguos:** regla única en 00 §3 y definición de "versión ligera".
- **Pruebas frágiles:** dependían de nombres internos; ahora `CLASE_API` (38-D). `prueba_clase.js` trata `historia` como lectura.
- **Posiciones de slides:** tabla de 23 slides con capítulos, minijuegos y mundos (misma cantidad, mismos evaluables).

## Decisiones que conviene revisar
- Las gemas **no pasan de una semana a otra** (solo cosméticos): evita confundirlas con una nota heredada. Si prefieres ahorro entre semanas, se agrega por el baúl con un tope.
- Las pistas de ARIA **sí están permitidas dentro de los quizzes** (nivel de proceso, con costo); el docente puede apagarlas con `PISTAS_EN_QUIZ`.
- El prompt completo pasó de ~141k a ~162k tokens. Lo compensa trabajar con la clase anterior como plantilla de código y con las herramientas, pero es un costo real.

## Pendiente (no verificado)
- Ninguna clase v22 completa se ha generado todavía: los módulos 24–27 y el flujo 38 están sin probar de punta a punta. Lo probado: el núcleo, los fragmentos de código del prompt, las herramientas de auditoría y la integridad del repo.
- `prueba_clase.js` (T1–T9) debe migrarse a `CLASE_API` cuando exista la primera clase v22.
- El `Prompt_Maestro_Index` no está en el repo: el contrato con el index (8-K/8-F) se implementó según el texto del prompt, y conviene verificarlo con tu index real.
