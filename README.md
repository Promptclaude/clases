# Clases — Prompt Maestro, motor probado y recursos

Clases gamificadas en HTML para primaria (Aritmética y Tecnología e Informática, 4.° y 5.°), generadas con Claude a partir de un prompt, un motor ya probado y un banco de imágenes.

## Inicio rápido
```
# Docente: no necesitas comandos para pedir una clase → lee GUIA_DOCENTE.md y copia prompt_armado.md
npm install                      # una sola vez (pruebas)
npm run prompt                   # vuelve a armar prompt_armado.md (ya viene hecho y se verifica solo)
# Claude devuelve un datos.json  →  construir y verificar:
python3 tools/construir_clase.py plantilla/clase_referencia.src.html --datos datos.json -o clase.html
python3 tools/puerta_de_calidad.py clase.html     # 🟢 VERDE = lista; 🔴 ROJO se corrige
npm test                         # todas las pruebas del repositorio (≈7 min)
```
**Guía para el docente:** `GUIA_DOCENTE.md` (cómo pegar el prompt, qué pedir y cómo verificar).

El formato exacto de `datos.json` está en `prompt-modulos/44_formato_de_datos.md` (un ejemplo real por tipo de actividad).

## Versiones: qué es cada número
| Qué | Versión | Dónde se define |
|---|---|---|
| Motor de las clases | **37.0** | `MOTOR_VERSION` en `plantilla/clase_referencia.src.html` |
| Prompt vigente | **v26** (+ revisión de coherencia v26.1 y módulos 33–43) | `Prompt_Maestro_Clases_v26_COMPLETO.md` |
| Prompt propuesto | **v27 núcleo** (≈25.000 tokens armado) | `Prompt_Maestro_Clases_v27_NUCLEO.md` |
| `package.json` | 26.0.0 | Solo identifica el paquete de pruebas; **no** es la versión del motor ni del prompt |

## Mapa del repositorio
| Qué | Dónde |
|---|---|
| **Prompt vigente (v26 + módulo 33 del banco)** | `Prompt_Maestro_Clases_v26_COMPLETO.md` |
| **Propuesta en revisión: núcleo v27** (≈3.000 tokens) y plan de migración | `Prompt_Maestro_Clases_v27_NUCLEO.md` · `MIGRACION_v26_a_v27.md` (aún no reemplaza al v26) |
| **Motor de referencia** (se reutiliza, no se reescribe) | `plantilla/clase_referencia.src.html`, `plantilla/motor/` |
| Ejemplo de otra materia solo con datos | `plantilla/ejemplos/` |
| **Puerta de calidad** y demás herramientas | `tools/` (`puerta_de_calidad.py`, `construir_clase.py`, `auditar_clase.py`, `prueba_clase_e2e.js`, …) |
| Pruebas del repositorio | `pruebas/` · `npm test` |
| **Banco de imágenes y base de datos** (822 recursos registrados en `banco.json`; solo los de estado `aprobada` se usan en clases) | `banco-imagenes/` (ver su README, `banco.json` y `vistas-previas/`) · módulo `prompt-modulos/33_banco_imagenes.md` |
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
| **Hoja «Respuestas abiertas» para el docente** (servidor) | carpeta `servidor-propuesta/` (`INSTALACION.md`, `Abiertas.gs`, `DISENO.md`, parche de 6 líneas) · módulo `prompt-modulos/43_respuestas_abiertas_para_el_docente.md` · `pruebas/prueba_servidor_abiertas.js` |
| **Modo juego** (clima por tema, racha 🔥, jefe final, modo ahorro, portal y chispas) | módulo `prompt-modulos/45_modo_juego.md` · motor `plantilla/motor/v37_modo_juego_snippets.js` · e2e T37 |
| Módulos del prompt sueltos | `prompt-modulos/` |
| Historial | `CHANGELOG.md` (versiones previas recuperables con `git checkout archivo-v24-v25`) |

## Crear una clase
1. Escribe `datos.json` (forma exacta en `prompt-modulos/44_formato_de_datos.md`; ejemplos completos en `plantilla/ejemplos/*.datos.json`).
2. `python3 tools/construir_clase.py plantilla/clase_referencia.src.html --datos datos.json -o clase.html`
3. `python3 tools/puerta_de_calidad.py clase.html` → **VERDE** para entregar; ROJO se corrige.
4. Ábrela una vez en un equipo del laboratorio (lo único que las pruebas automáticas no cubren: apariencia y rendimiento reales).

Requisitos: Python 3 con `Pillow`, `scipy`, `numpy`; Node con `npm install` (jsdom).

## Cómo usar el prompt para que se lea completo

Pegar el prompt v26 completo (≈630.000 caracteres) hace que partes importantes se lean con poca atención o se pierdan. La propuesta v27 lo evita:

```
npm run prompt                       # arma prompt_armado.md (≈25.000 tokens): núcleo + módulos 33–45 (incluye el formato del `datos.json`) + tarjeta final
python3 tools/armar_prompt.py --tipos enlazar,sopa,detective   # solo los módulos de esos tipos
python3 tools/armar_prompt.py --motor                          # añade el módulo 32 si vas a cambiar el motor
```

- Pega `prompt_armado.md` **como mensaje** (o como instrucciones del proyecto), no como archivo de conocimiento: los archivos grandes de un Proyecto de Claude se consultan por fragmentos y no se leen enteros.
- El prompt abre con la **tarjeta de reglas críticas R1–R16**, la repite al final y exige que Claude confirme lo que leyó en su primera respuesta y marque R1–R16 en el informe de entrega.
- `python3 pruebas/prueba_armar_prompt.py` falla si el prompt se pasa de 27.000 tokens, si falta un módulo o si una regla crítica deja de estar al principio y al final.
