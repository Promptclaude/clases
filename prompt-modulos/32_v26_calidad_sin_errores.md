# 32 · v26 — Sistema de calidad: motor de referencia, puerta de entrega, pedagogía y cero regresiones

> **Se lee en la Etapa 2**, antes de escribir una sola línea de una clase. **Manda sobre todo lo demás en cómo se construye una clase.**
> **Verdad incómoda que este módulo asume:** ningún prompt, por largo que sea, garantiza «100 % sin errores»: una IA que reescribe el motor en cada clase vuelve a cometer errores distintos cada vez. Lo que sí se puede garantizar es **que nada se entregue sin pasar una puerta de calidad automática**, y que el motor (la parte que más falla) **se escriba una sola vez, se pruebe a fondo y se reutilice**. Eso es lo que impone este módulo.

## 🔴 PRIORIDAD 58 · ABSOLUTA — EL MOTOR NO SE REESCRIBE: SE REUTILIZA EL MOTOR DE REFERENCIA

1. **Una clase nueva = `plantilla/clase_referencia.src.html` + un `datos.json` + (opcional) colores y assets.** El motor (slides, `puedeAvanzar`, quiz, nota en vivo, guardado con sello, reintento con oportunidades, rescate, efectos `Juego`, index v2, accesibilidad) **ya está escrito y probado**. La IA **no lo reescribe, no lo «mejora» y no lo copia a mano**: lo usa.
2. **Se construye con una orden:** `python3 tools/construir_clase.py plantilla/clase_referencia.src.html --datos datos.json -o clase.html` (inyecta el motor de `plantilla/motor/`, pone los datos y empaqueta los `asset://`).
3. **Zonas:**
   | Zona | Qué se puede cambiar | Quién |
   |---|---|---|
   | 🟢 Verde | `datos.json` (textos, preguntas, orden de slides, DBA), variables de color `--mundo-*`, imágenes `asset://` | la IA |
   | 🟡 Amarilla | agregar un **tipo de slide nuevo** o un **generador** | solo en la plantilla, **con su prueba**, antes de usarlo en una clase (ver 64) |
   | 🔴 Roja | `puedeAvanzar`, `aplicarEstadoAvance`, guardado/sello, nota, reintento, `Juego`, `construirEntradaEstudiante` | nadie, salvo corrección del motor con prueba nueva (63) |
4. **Tipos que el motor ya implementa y prueba:** `intro`, `info`, `tf`, `fill`, `drag`, `minijuego` (carrera), `quiz`, `evalFinal`, `final`. Los demás tipos del prompt (`match`, `orden`, `wordsearch`, `interactive`, `historia`, `repaso`, `practica`) **tienen su regla en 39 pero aún no tienen implementación probada en la plantilla**: **no se usan en una clase hasta agregarlos a la plantilla con su prueba** (64). La puerta lo avisa («solo se probó con rescate»).
5. **Datos separados del motor:** todo el contenido vive en `<script type="application/json" id="datos-clase">`. Así una clase vieja se pasa al motor nuevo **sin rehacerla**: `construir_clase.py plantilla.src.html --datos-de clase_vieja.html -o clase_nueva.html` (conserva los datos, cambia el motor; `MOTOR_VERSION` dice cuál lleva).
6. **Prohibido** para la IA: pegar imágenes en base64, armar `'asset://' + nombre` (el empaquetador lo rechaza), usar `localStorage` fuera de `almacen()`, crear una segunda definición de una función crítica, agregar `onclick` con funciones que no sean globales.

**Checklist:**
```
[ ] La clase salió de construir_clase.py (plantilla + datos.json); el motor no fue tocado
[ ] Solo se usan tipos de slide que la plantilla implementa y prueba (o se agregó el tipo con su prueba)
[ ] Todo el contenido está en datos-clase (JSON); las imágenes son asset:// literales
```

## 🔴 PRIORIDAD 59 · ABSOLUTA — CONTRATO DE PRUEBAS (para que cualquier clase pueda probarse sola)

Toda clase expone lo mismo, para que **el mismo runner** pruebe cualquier tema:
- **Selectores `data-test`:** `siguiente`, `anterior`, `nota`, `stage`, `razon`, `rescate`, `aviso-guardado`, `opcion` (con `data-op` y `data-q`), `tf`, `fill-input`, `verificar`, `chip`, `zona`, `mj-op`, `reintentar`, `confirmar-reintento`, `final-nota`, `resumen`, `modal`. `#stage` lleva `data-tipo` y `data-slide`.
- **Modo prueba:** `window.__TEST__ = { factor, rescateS, sinIntro, antiDobleMs, sinMovimiento }` acorta los tiempos (lectura, rescate, minijuego, doble toque); **sin él, todo corre en tiempo real**.
- **`window.CLASE_API`:** `MOTOR_VERSION`, `SL`, `claseId`, `semana`, `estado()`, `notaHud()`, `notaOficial()`, `calcTotal()`, `razonBloqueo()`, `rescate()`, `puedeAvanzar()`, `irA(i)`, `opcionCorrectaActual()`, `actividadesConAyuda()`, `ERRORES` (errores de JavaScript capturados), `GENERADORES`, `GENERAR(nombre, semilla)`.
- **Anti doble toque:** entre dos respuestas de quiz pasan ≥ 350 ms: un doble toque nunca contesta la pregunta siguiente por accidente.

## 🔴 PRIORIDAD 60 · ABSOLUTA — LA PUERTA DE CALIDAD: SIN INFORME VERDE NO SE ENTREGA

**Comando único:** `python3 tools/puerta_de_calidad.py clase.html [--mutaciones]` → escribe `informe_calidad.md` y devuelve 🟢 VERDE o 🔴 ROJO.
Corre, en orden:
1. **Auditoría estática** (`auditar_clase.py`, ~22 comprobaciones): idioma, viewport, peso ≤ 1,5 MB, sin recursos externos, sin `asset://` sin resolver, sin imágenes > 150 KB, elementos obligatorios, **funciones críticas una sola vez**, **sello estricto**, `localStorage` solo en `almacen()`, reducir movimiento, capas FX sin bloquear toques, **sin marcas ni personajes de terceros**, ids únicos, empieza en intro y termina en final, **nunca > 2 slides seguidas del mismo tipo**, DBA declarado, **cada pregunta con 1 correcta, ≥ 3 opciones, `porQue` en cada distractor, retroalimentación, errorComun y DBA**, matemática recalculada.
2. **Verificación matemática** (`verificar_matematica.py`): recalcula con aritmética exacta cada pregunta con `calc`, comprueba que la correcta vale el resultado y que **ningún distractor equivale** (0,5 = 0,50).
3. **Pruebas con clics reales** (`prueba_clase_e2e.js`, T10–T22): recorrido respondiendo **todo mal** y **todo bien**, rescate, retroalimentación, doble toque, nota en vivo y reintento con 2 oportunidades (la nota oficial nunca baja), primera apertura en cero (sesión sin sello / de otra semana / de otro grupo se ignoran), retomar en la misma pregunta, index v2, aviso de fallo de guardado, generadores (400 semillas × generador), `onclick` existentes, efectos, accesibilidad en **todos** los slides, razón de bloqueo en **todos** los slides.
4. **Mutaciones** (`prueba_de_mutaciones.py`, opcional pero obligatoria al cambiar el motor): rompe la clase a propósito de 12 maneras y exige que alguna prueba falle en cada una (si una avería «sobrevive», esa prueba no protege nada).

**Reglas de entrega:**
- **ROJO = no se entrega.** Se corrige y se vuelve a correr; nunca se «explica» un rojo.
- **Todo entregable lleva su `informe_calidad.md`** y, al final del mensaje, el bloque:
  ```
  INFORME DE ENTREGA — <clase>
  Puerta de calidad: 🟢 VERDE (auditoría 22/22 · E2E N/N · [mutaciones 12/12])
  No verificado: apariencia visual real en navegador · rendimiento en equipos del laboratorio · calidad pedagógica (revisión docente)
  ```
- **Si las herramientas no pueden ejecutarse** (sin Node/Python), el informe dice **«NO VERIFICADO»** y **está prohibido** decir «100 % sin errores», «probado» o «garantizado».
- La puerta **no sustituye** a la revisión del docente ni a abrir la clase una vez en un equipo real del laboratorio.

## 🔴 PRIORIDAD 61 · ABSOLUTA — PREGUNTAS BIEN HECHAS: MATEMÁTICA VERIFICADA, DISTRACTORES CON SENTIDO, VARIANTES PARA REINTENTOS

1. **Toda pregunta con una operación lleva `calc`** (`{"expr":"3.4+2.15","resultado":"5,55"}`); la puerta la recalcula. Sin `calc` en una pregunta con operación = aviso (error con `--estricto`).
2. **Distractores = errores comunes reales**, nunca opciones absurdas, cada uno con `porQue` (≤ 25 palabras, tono amable). Catálogo mínimo de errores por tema (la IA lo amplía):
   | Tema | Errores comunes que deben aparecer como distractores |
   |---|---|
   | Decimales (comparar) | creer que «más cifras = mayor» (12,45 > 12,5); comparar como enteros; ignorar la parte entera |
   | Decimales (sumar/restar) | no alinear la coma; no llevar/devolver; coma en lugar equivocado |
   | Valor posicional | confundir décimas con centésimas; contar desde la izquierda |
   | Multiplicar/dividir | olvidar mover la coma; multiplicar solo una parte |
   | Fracciones | sumar numeradores y denominadores; confundir equivalentes |
   | Tecnología | confundir entrada con salida; confundir almacenamiento con memoria |
3. **Generadores paramétricos (`gen`)**: para que un **reintento tenga números nuevos** (y mostrar la respuesta correcta no «regale» la prueba), las preguntas numéricas repetibles se escriben como generadores con semilla `(claseId, estudiante, grupo, intento, slide, pregunta)`: **deterministas** (recargar no cambia la pregunta) y **siempre con UNA sola correcta**. Cada generador nuevo **se agrega a la plantilla y la prueba T17 lo recorre con 400 semillas**.
4. **Escalera de dificultad** (fácil → media → reto) dentro de cada quiz; reparto cognitivo en 62.
5. **Una sola respuesta correcta, sin ambigüedad** (la puerta lo exige); enunciados ≤ 40 palabras y frases ≤ 25.

## 🔴 PRIORIDAD 62 · ALTA — DISEÑO PEDAGÓGICO DE LA CLASE (QUE SE APRENDA, NO SOLO SE JUEGUE)

1. **Secuencia obligatoria de la clase:** **Gancho** (misión + pregunta que despierta curiosidad) → **Explicación breve** (1 idea por slide) → **Ejemplo resuelto** paso a paso → **Práctica guiada** (con pistas, sin nota) → **Práctica autónoma** (minijuego) → **Evaluación** (quiz) → **Cierre** («3 cosas que aprendí» + siguiente paso). Ninguna evaluación aparece antes de haber explicado y practicado.
2. **Reparto de las preguntas evaluables (taxonomía de Bloom, `nivel`):** ≈ 30 % recordar/comprender · ≈ 50 % aplicar · ≈ 20 % analizar/resolver problemas contextualizados. La auditoría **avisa** si todas las preguntas son del mismo nivel (el reparto exacto 30/50/20 es una guía, no una regla que la puerta pueda comprobar).
3. **Alineación:** cada pregunta declara `dba` y solo mide lo **enseñado en esa clase**; el DBA de la clase va en `meta.dba`.
4. **Retroalimentación formativa:** mostrar la respuesta correcta + el error común + cómo se resuelve (40) y **ofrecer práctica del tema fallado sin nota** (45); la nota solo mide el desempeño, nunca castiga el esfuerzo.
5. **Diseño Universal para el Aprendizaje (DUA):** *múltiples formas de representación* (texto + dibujo + lectura en voz alta), *de acción* (tocar, escribir, arrastrar; nunca solo una), *de motivación* (misión, elección de avatar, metas visibles). Sin tiempo límite que penalice; textos con vocabulario de 4.º–5.º.
6. **Repaso espaciado:** cada clase inicia con 1–2 preguntas sin nota de la clase anterior y cierra con la que se retomará en la siguiente. *(Norma de diseño: se escribe con los tipos que el motor ya tiene, p. ej. un `tf` o `quiz` corto sin nota.)*
7. **Metacognición:** al terminar, el estudiante marca «cómo me sentí» (😀😐😟) y «qué me costó». *(Aún **no existe** este tipo de slide en el motor: se agrega a la plantilla con su prueba, Prioridad 64, antes de exigirlo.)*

**Checklist:**
```
[ ] Secuencia gancho → explicación → ejemplo resuelto → práctica guiada → práctica autónoma → evaluación → cierre
[ ] Reparto de niveles ≈ 30/50/20 y cada pregunta con dba y nivel
[ ] Retroalimentación con correcta + error común + cómo se resuelve; práctica del tema fallado sin nota
[ ] DUA: representación, acción y motivación múltiples; sin tiempo que penalice
[ ] Repaso espaciado al inicio y metacognición al final
```

## 🔴 PRIORIDAD 63 · ABSOLUTA — CATÁLOGO DE ERRORES HISTÓRICOS (CERO REGRESIONES)

Cada error que alguna vez existió tiene una prueba que lo vigila. **Si se cambia el motor, la puerta (con `--mutaciones`) debe seguir detectando todos.**
| # | Error real encontrado | Quién lo vigila |
|---|---|---|
| E1 | Actividades que exigían acertar para continuar («rellenar todos», «60 % de pares») | T10 (recorrido todo mal) · M3, M5 |
| E2 | Reglas contradictorias sobre saltar actividades (3 versiones) | auditoría de funciones únicas · T10 |
| E3 | `puedeAvanzar` sin `historia`/`minijuego` | T10, T22 |
| E4 | «Siguiente» apagado sin decir por qué | T22 |
| E5 | Sin salida para quien no sabe | T11 · M4 |
| E6 | **Nota «pegada» en 1.5 tras gastar una vida** (el HUD mostraba la mejor nota) | T13 · M2 |
| E7 | HUD de nota nunca definido en el HTML | auditoría (#nota-hud) |
| E8 | La nota solo se repintaba al responder | T13, T14 |
| E9 | Sesión sin sello aceptada → clase nueva heredaba nota/avance | T14 · M1 · auditoría |
| E10 | Index sin `slideActual`/`totalSlides`/`completada` | T14 · M11 |
| E11 | `save()` fallaba en silencio | T15 · M7 |
| E12 | Retroalimentación sin la respuesta correcta ni el porqué | T12 · M6 |
| E13 | Reintento heredaba aciertos del intento anterior | T13 · M9 |
| E14 | La nota oficial podía bajar al reintentar | T19 · M10 |
| E15 | **Doble toque contestaba dos preguntas** (la 2.ª caía sobre la pregunta siguiente) | T16b · M8 |
| E16 | Imágenes armadas con `'asset://' + nombre` quedaban rotas | empaquetador (rechaza) · auditoría |
| E17 | `onclick` en texto apuntando a funciones no globales | T18 |
| E18 | Preguntas generadas con 2 respuestas correctas / opciones repetidas | T17 · M12 |
| E19 | Respuesta mal calculada / distractor equivalente a la correcta | `verificar_matematica.py` |
| E20 | Imágenes de terceros y recortes con halo o cortados | auditoría (marcas) · `limpiar_recortes.py` |
**Regla:** al descubrir un error nuevo, **primero se escribe la prueba que lo reproduce (debe fallar), luego se corrige, luego se agrega a este catálogo.**

## 🔴 PRIORIDAD 64 · ALTA — MANTENIMIENTO Y VERSIONES DEL MOTOR

1. **Versión del motor** (`MOTOR_VERSION`, hoy 26.0): sube con cada cambio. La clase la muestra en `CLASE_API` y el informe de entrega la imprime.
2. **Cambiar el motor** = editar `plantilla/` + `plantilla/motor/`, correr la puerta **con `--mutaciones`** sobre la clase de referencia **y** sobre un ejemplo (`plantilla/ejemplos/*.datos.json`), y registrar el cambio en el `CHANGELOG`.
3. **Actualizar clases ya entregadas:** `construir_clase.py plantilla.src.html --datos-de clase_vieja.html -o clase_nueva.html` y volver a pasar la puerta. Las clases anteriores a v26 (sin bloque `datos-clase`) no se actualizan solas: se **migran una vez** (se extraen sus preguntas a `datos.json`) y desde entonces quedan actualizables.
4. **Agregar un tipo de slide o un generador:** (a) escribirlo en la plantilla, (b) agregar su prueba en `prueba_clase_e2e.js`, (c) agregar su avería a `prueba_de_mutaciones.py`, (d) pasar la puerta en verde, (e) recién entonces usarlo en una clase.
5. **Registro:** cada entrega guarda `informe_calidad.md` junto a la clase (repositorio), para saber con qué motor y qué resultado salió.

**Checklist de la Prioridad 64:**
```
[ ] MOTOR_VERSION actualizada y changelog escrito
[ ] Puerta con --mutaciones en verde sobre la referencia y sobre un ejemplo distinto
[ ] Clases anteriores actualizadas con --datos-de y vueltas a pasar por la puerta
[ ] Tipo/generador nuevo: prueba + avería + puerta verde ANTES de usarlo
```
