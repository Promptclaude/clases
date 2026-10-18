---
modulo: 28_clonacion_y_robustez
etapa_de_lectura: 2
prioridades: [38, 38-B, 38-C, 38-D, 38-E]
---

# 28 · Clonar la semana anterior sin heredar errores, y robustez ante bloqueos
> **Se lee en la Etapa 2**, junto con 14–16 (es parte del núcleo anti-bugs). Resuelve los tres problemas reportados en producción: (1) la clase nueva **heredaba la nota** de la anterior, (2) tras terminar y **reintentar** a veces **nada respondía** y había que dar F5, (3) los reintentos **bajaban la nota** (ya resuelto por 8-U; aquí se blinda con código probado).

## 🔴 PRIORIDAD 38 · ABSOLUTA — FLUJO "PLANTILLA VIVA": INDEX + CLASE ANTERIOR → CLASE DE LA SEMANA SIGUIENTE

Así se trabaja en la práctica (4 cursos: Aritmética 4.º y 5.º, Tecnología 4.º y 5.º). El docente entrega **(a)** el `index` del curso y **(b)** la clase de la semana anterior como plantilla. Con eso se crea la siguiente.

### 38.1 — Qué se hereda y qué NO
| Se hereda de la clase anterior (CÓDIGO) | NO se hereda nunca (DATOS) |
|---|---|
| Motor de navegación, quiz, vidas, modales, panel docente, menú, ARIA, estilos base | Número de semana, tema, objetivo, `CLASE_CFG`, nombre de archivo |
| Estructura de funciones y de la pantalla final | Todos los textos, preguntas, glosario, conceptos, historia, mundos, minijuegos, `CLASE_KB` |
| | Imágenes, tema visual (0-F), paleta y avatares del tema |
| | **Cualquier dato guardado: nota, avance, vidas, gemas, claves de almacenamiento** |

**La clase anterior es una plantilla de CÓDIGO, no una fuente de verdad.** Si contradice este prompt (por ejemplo, un fondo oscuro, una función duplicada o una regla vieja), **manda el prompt** y el defecto no se copia.

### 38.2 — Pasos obligatorios
1. **Leer el index:** de `INDEX_SEMANAS_META` sale la **semana siguiente** (la primera sin clase generada o el mayor `num` + 1), su **tema**, su `universo` y el `archivo` exacto (8-K). Si falta el tema, se **pregunta**; no se inventa.
2. **Resumir la anterior sin leerla completa:** `python3 tools/aligerar_html.py anterior.html` y `python3 tools/esqueleto_clase.py anterior.html` (jamás abrir el HTML pesado con `cat/view`).
3. **Clonar con `CLASE_CFG`:** el único lugar donde viven curso, grado, periodo y semana (38.3). Cambiarlo y **no escribir ninguna clave de almacenamiento a mano**.
4. **Sustituir todos los datos** (tabla de arriba), uno por uno.
5. **Auditar:** `python3 tools/auditar_clase.py nueva.html --previa anterior.html --semana N` → **cero ❌** (restos de la semana anterior, funciones duplicadas, fondo oscuro, claves manuales, sello débil).
6. **Probar:** `node tests/prueba_clase.js nueva.html` (T1–T9) → cero ❌.
7. **Confirmar** la lista de prioridades (00 §4) y el resumen de lo que cambió respecto a la anterior.

### 38.3 — `CLASE_CFG` y claves: una sola fuente
```javascript
const CLASE_CFG = { curso:'mat', grado:'4', periodo:'4', semana:5 };   // ÚNICO lugar con estos valores. Coinciden con CONFIG_CURSO del index (8-K)
const CLASE_ID  = Nucleo.claseId(CLASE_CFG);                            // 'mat_4_p4_s5'
const almacen   = Nucleo.crearAlmacen(window.localStorage);             // seguro: cae a memoria si el navegador lo bloquea
// Todo lo demás se DERIVA: Nucleo.claves(CLASE_CFG, nombre, grupo, claseCtx) → { prefijo, sesion, resumen, registro, identidad, baul }
//   sesion  = SKEY       = PREFIX_usuario_session   (la clase)
//   resumen = INDEX_KEY  = PREFIX_usuario_data      (lo que lee el index; entrada de 8-F con nota, avance, semana, claseId…)
//   PREFIX  = claseCtx.storagePrefix SOLO si es de esta semana y de este grupo; si no, curso_grado_grupo_pP_sS (8-K y 8-V)
// Guardar: Nucleo.guardar(almacen, CLASE_CFG, estado, { totalSlides, xp, medallas, semaforo, notaIntentoActual, completada }, claseCtx)
```
- **`motor/nucleo.js` se inserta tal cual** (`python3 tools/insertar_nucleo.py clase.html`); **no se reescribe**. **Implementa el contrato con el index (8-K y 8-F): mismas claves, misma normalización de nombre y la misma entrada para el index; reemplaza el bloque de PREFIX/SKEY/INDEX_KEY de 8-K/8-V y `syncIndex()` solo en cómo se obtienen y escriben las claves (los campos de la entrada siguen siendo los de 8-F).** Provee: claves, sello, carga/guardado, `registrarIntento` (mejor nota), billetera. Está probado (`node tests/prueba_nucleo.js`).
- **Prohibido:** literales como `'mat4p4_…'`, `'mat_4_'`, `'_s5'` o `SEMANA_NUM` repetido por el código. Si la clase anterior los trae, **se eliminan** y se reemplazan por llamadas al núcleo.
- Las funciones `PREFIX()`, `skey()`, `sessionKey()`, `resumeKey()`, `prefijoRespaldo()` y `buscarSesionHuerfanaPorNombre()` **desaparecen**: el núcleo las hace innecesarias. (La recuperación "huérfana" recorría claves de otras sesiones; con un sello estricto ya no hay nada que recuperar de otra semana.)

**Checklist:**
```
[ ] Semana y tema salen del index (o se preguntan); archivo = campo .archivo exacto
[ ] La anterior se usó solo como plantilla de CÓDIGO, resumida con las herramientas
[ ] CLASE_CFG es el único lugar con curso/grado/periodo/semana; el núcleo se insertó sin reescribirlo
[ ] Cero literales de claves o de semana dispersos en el código
[ ] auditar_clase.py con --previa: cero ❌; prueba_clase.js: cero ❌
```

## 🔴 PRIORIDAD 38-B · ABSOLUTA — LA NOTA (Y TODO LO DEMÁS) NO SE HEREDA: SELLO ESTRICTO Y CUARENTENA

### 38-B.1 — Por qué se heredaba (causas reales, encontradas en una clase generada)
1. `SEMANA_NUM`/`CLASE_ID` o los prefijos `'mat4p4_…'` **no se actualizaban en todos los sitios** al copiar la clase: la nueva leía las claves de la vieja.
2. La validación aceptaba datos **sin sello** (`d.semana !== undefined && d.semana !== SEMANA_NUM`): un dato antiguo sin campo `semana` pasaba como válido.
3. La **recuperación de sesión "huérfana"** buscaba en `clases_guardadas` por nombre y grupo: podía traer datos de otra clase.
4. El **respaldo de continuidad** (`resumeKey`) y el **resumen del index** compartían formatos fáciles de confundir; la vitrina de logros usaba una clave **sin semana**.

### 38-B.2 — Regla
1. **Toda lectura** de almacenamiento pasa por `Nucleo.cargar()`: lee **solo** la clave exacta de *esta clase + grupo + estudiante* y **valida el sello** `{schema, claseId, semana, est, grupo}`. **Un dato sin sello completo, o con cualquier campo distinto, es inválido.**
2. **Cuarentena, no borrado:** los datos inválidos **se ignoran y no se borran** (pueden ser de otra semana legítima). La clase arranca en **estado cero real** (`Nucleo.estadoCero`): nota 0, slide 0, sin vistos, sin gemas.
3. Orden de arranque: `CLASE_CFG` → identidad del index → `Nucleo.cargar` → `PROTA` (34) → `render()`. Ningún módulo lee `localStorage` por su cuenta.
4. **El baúl** (cosméticos/insignias) es lo único que viaja entre semanas y **no tiene** nota ni avance.
5. El **resumen para el index** se escribe con `Nucleo.guardar` en su propia clave (`resumen`), **nunca** se lee como sesión.
6. Al guardar, **siempre** se estampa el sello vigente (`Nucleo.guardar` lo hace).

**Prueba obligatoria (se agrega al protocolo 8-T):** sembrar en el almacenamiento una sesión de la semana anterior con nota 4.5 (con sello correcto de la anterior, y otra **sin sello**) y abrir la clase nueva: debe mostrar **nota 0, slide 1, 0 gemas** y no mencionar nada de la otra semana.

**Checklist:**
```
[ ] Todas las lecturas van por Nucleo.cargar con sello estricto; datos sin sello = inválidos
[ ] Cuarentena (ignorar, no borrar) y estado cero real al no haber sesión válida
[ ] Sin recuperación "huérfana" ni búsquedas por nombre en claves ajenas
[ ] El baúl solo guarda cosméticos/insignias; el resumen del index nunca se lee como sesión
[ ] Prueba de semana nueva con datos de la anterior (con y sin sello): abre en cero
```

## 🔴 PRIORIDAD 38-C · ABSOLUTA — REINTENTO A PRUEBA DE BLOQUEOS: MÁQUINA DE ESTADOS Y "NADA TAPA EL PRIMER CLIC"

(8-W sigue vigente; esto la formaliza y agrega el vigilante.)
### 38-C.1 — Estados explícitos (una sola variable `fase`)
`JUGANDO → FINAL → CONFIRMANDO_REINTENTO → REINTENTO(quiz1 → quiz2 → evalFinal) → FINAL`. Solo existen estas transiciones; cualquier otra se ignora y se registra. Cada transición ejecuta **siempre** el mismo bloque de limpieza, en este orden:
1. `registrarIntento` (guarda la mejor nota **antes** de borrar nada, `Nucleo.registrarIntento`), 2. vaciar la cola de modales, 3. detener cronómetros y temporizadores del slide, 4. **eliminar toda superposición decorativa** (portal, confeti, toasts, paneles), 5. reiniciar el estado de los quizzes del intento, 6. guardar, 7. `render()`, 8. **vigilante** (38-C.3).

### 38-C.2 — Causas clásicas de "no me deja contestar" (todas prohibidas)
- Una **superposición con `pointer-events` activo** que queda encima (confeti, portal de mundo, modal invisible, panel de ARIA, modo foco).
- **Botones `disabled`** que no se rehabilitan tras reiniciar el quiz.
- **Manejadores de eventos que se pierden** al reemplazar el DOM (se usan manejadores delegados en un contenedor estable, o `onclick` con solo ids y números, 8-R).
- **Un `setTimeout` de la vuelta anterior** que dispara después del reinicio y marca la pregunta como respondida.
- **Un modal en cola** que nunca se cierra (8-Q).
- Un `try/catch` que **traga el error** y deja la pantalla a medias.
Regla: **todo lo decorativo es `pointer-events:none`**, y todo `render()` de quiz es **idempotente** (puede llamarse 2 veces sin dañar nada).

### 38-C.3 — Vigilante (`verificarQuizVivo`) — obligatorio tras cada entrada a un evaluable
300 ms después de mostrar un quiz (o minijuego): (a) no hay modal abierto sin motivo, (b) el primer botón de opción **no está deshabilitado**, (c) `document.elementFromPoint` en el centro de ese botón devuelve el botón (o un hijo): **nada lo tapa**, (d) el estado de la pregunta actual coincide con `st.quizActs`. Si falla: **reparar** (cerrar superposiciones, rehabilitar, volver a pintar), registrar en el panel de salud (38-E) y mostrar un aviso discreto. **Máximo 2 reparaciones por pantalla**; si persiste, se ofrece el botón "🔧 Reparar esta pantalla" (que ejecuta `CLASE_API.autoReparar()`).

**Checklist:**
```
[ ] Existe una única variable `fase` con las transiciones permitidas y un único bloque de limpieza
[ ] La mejor nota se asegura ANTES de limpiar el intento
[ ] Toda decoración es pointer-events:none; las superposiciones se eliminan en finally
[ ] render() de quiz es idempotente; manejadores delegados o con solo ids/números
[ ] verificarQuizVivo corre tras cada entrada a un evaluable y repara; botón "Reparar esta pantalla" disponible
[ ] Probado con CLICS REALES (no solo funciones): terminar, usar una vida, contestar todo, repetir 3 veces
```

## 🔴 PRIORIDAD 38-D · ABSOLUTA — `window.CLASE_API`: INTERFAZ PÚBLICA ESTABLE PARA LAS PRUEBAS Y EL DOCENTE

**Problema:** las pruebas dependían de nombres internos (`vistaPregunta`, `pd_resetQuizzes`, `TIPOS_EVALUABLES`) que cambian de una versión a otra: una clase con `vistaPreguntaQuiz` hacía caer la prueba aunque funcionara. **Solución:** toda clase expone un contrato fijo y las pruebas solo usan eso.
```javascript
window.CLASE_API = {
  version: '22',
  cfg:        () => ({ ...CLASE_CFG }),
  slides:     () => SL.map((s, i) => ({ i, id: s.id, type: s.type, mundo: s.mundo || null })),
  actual:     () => st.slide,
  ir:         (i) => { /* navega respetando bloqueos (8-O) */ },
  siguienteHabilitado: () => !document.getElementById('btn-next').disabled,
  preguntaActual: () => { /* { slideId, idx, total, opciones:[{texto, correcta}] } o null. SOLO si window.__PRUEBA__ === true */ },
  responder:  (iOpcion) => { /* pasa por el mismo camino que un clic real */ },
  notaIntento:   () => /* nota del intento en curso */,
  notaOficial:   () => Nucleo.notaOficial(estado),
  intento:       () => estado.intentos,
  vidasUsadas:   () => estado.vidasUsadas,
  reintentar:    () => { /* equivale a "Reintentar ahora" + confirmar */ },
  gemas:         () => estado.eco.gemas,
  salud:         () => ({ errores: [...ERRORES_CLASE], almacenEnMemoria: almacen.memoria, reparaciones: REPARACIONES }),
  autoReparar:   () => { /* 38-C.3 */ },
  estadoCopia:   () => JSON.parse(JSON.stringify(estado))
};
```
Las pruebas nuevas y futuras **solo** llaman a `CLASE_API` y al DOM. Los datos de respuestas correctas **solo** se exponen si `window.__PRUEBA__ === true` (las pruebas lo activan con `addInitScript`).

**Checklist:**
```
[ ] CLASE_API presente con todos los métodos; preguntaActual() exige window.__PRUEBA__
[ ] responder() y reintentar() usan el mismo camino que un clic real
```

## 🟠 PRIORIDAD 38-E · ALTA — HIGIENE DEL CÓDIGO ENTREGADO, SALUD Y MIGRACIÓN

1. **El HTML entregado no lleva etiquetas del prompt** (`🔺`, `🆕`, "Prioridad 8-L", "v15.0"…) ni comentarios largos copiados del prompt: **comentarios solo de una línea y solo donde aclaran un porqué no obvio.** (En una clase real había ≈ 170 etiquetas de ese tipo; ensucian, pesan y hacen que se copien reglas viejas.) Presupuesto de referencia: **JS propio ≤ 900 KB** sin imágenes base64.
2. **Cero funciones declaradas dos veces** (`auditar_clase.py` lo verifica). Si al clonar aparece una duplicada, **gana la versión del prompt** y se borra la otra.
3. **Manejo global de errores:** `window.addEventListener('error', …)` y `'unhandledrejection'` registran en `ERRORES_CLASE` (máx. 50) y **nunca** muestran un mensaje técnico al estudiante; el Panel Docente tiene una pestaña **"Salud"** con errores, `almacenEnMemoria`, reparaciones y versión.
4. **Versión de datos:** el sello incluye `schema`. Si en el futuro cambia, `Nucleo` lo trata como inválido (cuarentena) y la clase arranca limpia; **jamás** se "migra" adivinando.
5. **Respaldo manual:** botón en el Panel Docente "Exportar / importar progreso (JSON)" para un estudiante; la importación **valida el sello** de la clase actual y rechaza el resto.
6. **Imágenes remotas** (Prioridad 1-B): un manejador global de error reemplaza toda imagen rota por un respaldo temático (emoji/SVG).

**Checklist:**
```
[ ] Sin etiquetas de prioridad/versión ni comentarios largos en el HTML; JS propio ≤ 900 KB
[ ] Cero funciones duplicadas (auditar_clase.py)
[ ] Manejo global de errores + pestaña "Salud" en el Panel Docente
[ ] Exportar/importar progreso con validación de sello
[ ] Manejador global de imágenes rotas
```
