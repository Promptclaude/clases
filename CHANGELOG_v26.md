# v25 → v26 — Sistema de calidad: motor de referencia + puerta de entrega

**Idea central:** el 100 % sin errores no se logra con más texto en el prompt, sino **(1)** escribiendo el motor de la clase **una sola vez**, probándolo a fondo y reutilizándolo, y **(2)** impidiendo que se entregue cualquier clase que no pase una puerta de calidad automática.

## Nuevo
| Qué | Dónde |
|---|---|
| **Motor de referencia** (clase completa y funcional: slides, nota en vivo, quiz con retroalimentación, reintento con 2 oportunidades, rescate «No me sale», guardado con sello, index v2, efectos, accesibilidad) | `plantilla/clase_referencia.src.html` (+ `plantilla/motor/`) |
| Ejemplo de otra materia construido **solo cambiando datos** (Tecnología 4°) | `plantilla/ejemplos/tec4_partes_pc.datos.json` |
| **Puerta de calidad** (un comando → informe VERDE/ROJO) | `tools/puerta_de_calidad.py` |
| Auditoría estática (22 comprobaciones) y verificador de matemática exacta | `tools/auditar_clase.py`, `tools/verificar_matematica.py` |
| **56 pruebas con clics reales** (T10–T22), genéricas: sirven para cualquier clase | `tools/prueba_clase_e2e.js` |
| **Pruebas de mutaciones**: rompe la clase a propósito de 12 maneras y exige que se detecten | `tools/prueba_de_mutaciones.py` |
| Constructor y actualizador de clases (`--datos`, `--datos-de`) | `tools/construir_clase.py` |
| Módulo 32 del prompt (prioridades 58–64) | `Prompt_Maestro_Clases_v26_COMPLETO.md`, `prompt-modulos/32_*` |

## Errores reales que las pruebas encontraron mientras se construía esto
- Un **doble toque rápido contestaba dos preguntas** (el 2.º toque caía sobre el botón de la pregunta siguiente). Corregido con un intervalo mínimo entre respuestas.
- Imágenes armadas con `'asset://' + nombre` quedaban **rotas** tras empaquetar. El empaquetador ahora lo rechaza y el motor usa tokens literales.
- Las propias pruebas usaban posiciones fijas de la clase de ejemplo: se rehicieron **genéricas** y se comprobaron con una clase de otro tema.
- Una «avería» de prueba (M9) resultó equivalente y no detectable: se reemplazó por una avería real.

## Cómo se usa
```
npm install                                  # una sola vez
python3 tools/construir_clase.py plantilla/clase_referencia.src.html --datos datos.json -o clase.html
python3 tools/puerta_de_calidad.py clase.html --mutaciones     # VERDE = se puede entregar
npm test                                     # todas las pruebas del repositorio (~2,5 min)
```

## Qué NO está verificado (honesto)
- **Apariencia real en un navegador** y rendimiento en los equipos del laboratorio: las pruebas usan un DOM simulado (jsdom), sin pantalla.
- **Tipos de slide sin implementar en el motor:** `match`, `orden`, `wordsearch`, `interactive`, `historia`, `repaso`, `practica` (su regla existe en el prompt, pero la plantilla aún no los trae; no usarlos hasta agregarlos con su prueba, Prioridad 64).
- **Metacognición y repaso espaciado**: son normas de diseño; el motor aún no tiene un tipo propio para ellos.
- Calidad pedagógica real (que el tema se entienda): requiere tu revisión.
