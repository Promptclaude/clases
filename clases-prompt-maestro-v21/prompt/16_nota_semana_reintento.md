---
modulo: 16_nota_semana_reintento
etapa_de_lectura: 2
prioridades: [8-U, 8-V, 8-W]
---

# 16 · Mejor nota (8-U), semana nueva en cero (8-V) y reintento sin bloqueos (8-W)

## 🔺 PRIORIDAD 8-U · MÁXIMA — LA NOTA OFICIAL ES LA MEJOR NOTA DE TODOS LOS INTENTOS: UN REINTENTO NUNCA BAJA LA NOTA

### 🚨 REGLA ABSOLUTA E INAPELABLE
Cuando el estudiante gasta una vida para mejorar su nota, **la nota que queda es la MÁS ALTA que haya sacado en cualquiera de sus intentos — jamás la del último**. Ejemplo exacto: si en el intento 1 sacó **3.5** y en el intento 2 sacó **3.0**, su nota oficial sigue siendo **3.5**. Si en un tercer intento saca **4.2**, la nota oficial pasa a **4.2**. La nota solo puede **subir o mantenerse**; nunca baja por reintentar.

Para que esto sea imposible de romper, el estado distingue **dos notas**:

| Concepto | Función | Qué es |
|---|---|---|
| Nota del intento actual | `calcTotal()` | Se construye con los aciertos del intento en curso (parte de 0.0 en cada reintento). Es solo un dato de trabajo. |
| **Nota oficial** | **`notaOficial()`** | `max(nota del intento actual, st.mejorNota)`. **Es la ÚNICA que se muestra como "NOTA", se guarda como nota en el index y se usa para mensajes, colores, hitos y título del bloque de vidas.** |

**Candados anti-trampa (no se pierde ninguna garantía de 8-H/8-M):** `st.mejorNota` se alimenta **exclusivamente** de `calcTotal()` (que a su vez sale solo de `quiz_resps_`). No existe ningún camino para "regalar" nota: un clic rápido, ir atrás/adelante o recargar siguen sin poder inflarla, y `st.mejorNota` nunca se lee de `localStorage` de otra clave ni del index (ver 8-V: así una nota falsa del index no puede contaminar la clase).
```javascript
// ═══ 1) CAMPOS NUEVOS DE st — todos los guarda save() (8-V) y los restaura load() (8-V) ═══
// st.mejorNota          → number 0..5   — la nota MÁS ALTA lograda en cualquier intento (nunca baja sola)
// st.mejorAciertos      → number        — aciertos de ese mejor intento
// st.mejorIntento       → number        — número de intento en que se logró (1 = primer intento)
// st.historialIntentos  → [{ intento, nota, aciertos, fecha, origen }] — una fila por cada intento que se reinicia
// En el objeto st inicial (let st = {...}) van en cero: mejorNota:0, mejorAciertos:0, mejorIntento:1, historialIntentos:[]

// ═══ 2) calcTotal() COMPLETA (completa el cuerpo que 8-M dejaba abierto) — nota del intento ACTUAL ═══
function totalPreguntasReales() {
  return SL.filter(s => TIPOS_EVALUABLES.includes(s.type)).reduce((a, s) => a + (s.preguntas?.length || 0), 0);
}
function calcTotal() {
  const tot = totalPreguntasReales();
  recalcularAciertosDesdeContadores();                       // 8-H: st.aciertos SIEMPRE sale de quiz_resps_
  if (st.aciertos > tot) st.aciertos = tot;                  // 8-M Guardia 3
  if (!tot) return 0;
  return Math.min(5, Math.max(0, (st.aciertos / tot) * 5));  // nunca < 0.0 ni > 5.0
}

// ═══ 3) LA MEJOR NOTA ═══
function actualizarMejorNota() {
  const act = calcTotal();
  if (act > (st.mejorNota || 0) + 1e-9) {        // solo SUBE
    st.mejorNota     = act;
    st.mejorAciertos = st.aciertos || 0;
    st.mejorIntento  = st.intentos || 1;
  }
}
function notaOficial()       { const act = calcTotal(); return Math.max(act, st.mejorNota || 0); }
function aciertosOficiales() { calcTotal(); return Math.max(st.aciertos || 0, st.mejorAciertos || 0); }

// ═══ 4) updScore() — el HUD muestra SIEMPRE la nota oficial (adaptar los ids #nota-hud / #nota-intento-hud al HUD real) ═══
function updScore() {
  actualizarMejorNota();
  const oficial = notaOficial();
  const el = document.getElementById('nota-hud');
  if (el) el.textContent = oficial.toFixed(1);
  const sub = document.getElementById('nota-intento-hud');
  if (sub) sub.textContent = (st.reintentoActivo && (st.mejorNota || 0) > 0)
    ? `Intento actual: ${calcTotal().toFixed(1)} · Tu mejor nota: ${st.mejorNota.toFixed(1)}` : '';
  try { checarHitoNotaDocente(); } catch (e) {}              // 18-D: los hitos se miden con notaOficial()
}

// ═══ 5) Aviso en la pantalla final cuando el último intento salió MÁS BAJO que el mejor ═══
function renderAvisoMejorNota() {
  const act = calcTotal(), mejor = st.mejorNota || 0;
  if ((st.vidasUsadas || 0) === 0 || act >= mejor - 1e-9) return '';
  return `<div class="aviso-mejor-nota">🏅 Tu nota se mantiene en <strong>${mejor.toFixed(1)}</strong> — es tu mejor intento
    (el intento ${st.mejorIntento || 1}).<br><span>Este último intento sacó ${act.toFixed(1)}, pero <strong>no baja tu nota</strong>. ¡Puedes seguir intentando!</span></div>`;
}
```
```css
.aviso-mejor-nota { background:#fff8dc; border:3px solid var(--accent); border-radius:14px; padding:10px 14px; margin:8px auto 0;
  max-width:480px; font-family:var(--font-ui); font-size:.85rem; color:var(--primary-dark); line-height:1.6; }
.aviso-mejor-nota span { font-size:.78rem; color:var(--text2); }
```
### 📍 DÓNDE SE APLICA `notaOficial()` (obligatorio, sin excepción)
1. `rFinal()` (Prioridad 11): `const t = notaOficial();` y `const aciertos = aciertosOficiales();` + `${renderAvisoMejorNota()}` justo debajo de "X / Y respuestas correctas".
2. `renderBloqueVidasProtagonista()` (6-C): `const t = notaOficial();`.
3. `construirEntradaEstudiante()` / `syncIndex()` (8-F): el campo `nota` es `notaOficial()`; `notaIntentoActual` es `calcTotal()`.
4. `checarHitoNotaDocente()` (18-D), mensajes de ByteBot/ARIA sobre "cómo voy" y el HUD (`updScore()`).
5. `resetearTodosLosQuizzes()` (8-P) llama a `actualizarMejorNota()` **como primera línea**, antes de poner `st.aciertos = 0` — así ninguna ruta de reinicio (estudiante, panel docente) puede borrar la mejor nota sin guardarla antes.
6. `responderQuiz()` (8-P) llama a `actualizarMejorNota()` justo después de `recalcularAciertosDesdeContadores()`.
7. **Solo `pd_resetCompleto()` (Panel Docente) pone `mejorNota`, `mejorAciertos` e `historialIntentos` en cero** — es el único "borrón total" permitido. "Reset solo Quizzes" y "Reintentar" CONSERVAN la mejor nota.
8. Durante un reintento, el banner (6-B) recuerda al estudiante que su mejor nota está segura y que el intento solo puede subirla.

### 🧪 PRUEBA OBLIGATORIA
```
PASO 1: Completar los 3 evaluables con 3.5 de nota (ej. 21/30). Pantalla final: NOTA 3.5.
PASO 2: Usar una vida y completar el reintento con 3.0 (18/30).
RESULTADO ESPERADO: pantalla final muestra NOTA 3.5 + aviso "Tu nota se mantiene en 3.5"; el index recibe 3.5; recargar (F5) sigue en 3.5.
PASO 3: Usar otra vida y sacar 4.2 → NOTA 4.2 (sube). Otra vida y sacar 1.0 → sigue 4.2.
PASO 4: Panel Docente → "Reset completo": nota oficial vuelve a 0.0 y el index también.
```
**Checklist:**
```
[ ] Existen notaOficial(), actualizarMejorNota(), aciertosOficiales() y calcTotal() completa (una sola definición de cada una)
[ ] st.mejorNota/mejorAciertos/mejorIntento/historialIntentos se guardan en save() y se restauran en load()
[ ] resetearTodosLosQuizzes() llama a actualizarMejorNota() ANTES de st.aciertos = 0
[ ] rFinal, bloque de vidas, syncIndex/INDEX_KEY, hitos del docente y HUD usan notaOficial(), no calcTotal()
[ ] Intento 3.5 → reintento 3.0 deja 3.5 (en pantalla final, en el HUD, en el index y tras recargar)
[ ] Solo pd_resetCompleto() puede bajar la mejor nota
[ ] Ninguna ruta lee st.mejorNota desde el index u otra clave (8-V)
```


## 🔺 PRIORIDAD 8-V · MÁXIMA — SEMANA NUEVA = CERO REAL: NINGUNA CLASE PUEDE ABRIR CON NOTA, AVANCE NI DATOS QUE NO SEAN DE ESE ESTUDIANTE, EN ESA SEMANA

### 🚨 BUG REAL DE PRODUCCIÓN: LAS CLASES ABREN LA PRIMERA VEZ CON UNA NOTA "YA HECHA"
Síntoma: un estudiante abre una semana por primera vez y la clase (o el index) ya muestra nota/avance, como si hubiera arrastrado la de la semana anterior. Se auditó el propio documento y se encontraron **cinco causas raíz**, todas originadas en código o reglas de referencia que se contradecían:
1. **Contexto de otra semana aceptado a ciegas.** `PREFIX = claseCtx?.storagePrefix || …` (8-K) confiaba siempre en `sessionStorage['clase_contexto']`. Si la pestaña venía de otra semana (el estudiante navega de una clase a otra, usa "atrás", o el index entrega un contexto viejo), el `storagePrefix` era el de **la semana anterior** y la clase cargaba **su sesión y su nota**. La autoverificación de 8-K (paso 6) solo mostraba un aviso, no corregía nada.
2. **Dos `syncIndex()` en el mismo documento.** La Prioridad 8 traía una versión heredada que guardaba en `IDX_SC[st.name][SEM_ID]` (por **nombre**, sin grupo, con un `SEM_ID` que el documento nunca definía) y que **"conservaba la mejor nota" de la entrada previa** (`if (prev && prev.nota > t) nueva.nota = prev.nota`). Si dos semanas o dos estudiantes homónimos compartían `SEM_ID`/nombre, la semana nueva **heredaba la nota de la otra**. Esa versión queda **ELIMINADA**; solo existe la de 8-F/8-U.
3. **Sesión guardada sin sello de semana.** `save()` no guardaba a qué semana/curso/grupo pertenecía la sesión, y `load()` aceptaba cualquier cosa que encontrara bajo la clave. Además la auto-reparación buscaba por coincidencia parcial (`pfx.includes(NOMBRE_NORM)`: "ana" coincide con "mariana"/"susana") sin verificar semana.
4. **Acceso directo compartía sesión.** En "modo sin guardar" (sin index) `load()`/`save()` seguían usando `localStorage` bajo una clave `…sinregistro…` **común a todos** en ese computador: el siguiente que entraba directo heredaba el avance del anterior.
5. **Estado inicial no verificado.** Nada comprobaba que, sin sesión válida, la nota fuera exactamente 0.0.

### ⚖️ REGLAS ABSOLUTAS E INAPELABLES
1. **El contexto del index solo vale si es de ESTA semana.** `claseCtx.semana` debe ser igual a `CONFIG_CLASE.semana` y `claseCtx.storagePrefix` debe **terminar en `_s{semana}`**. Si no, el `storagePrefix` se **descarta** (la identidad —nombre y grupo— sí se conserva) y el prefijo se arma con `CONFIG_CLASE` + grupo, con la misma fórmula del index (`area_grado_grupo_pPERIODO_sSEMANA`, ver 8-L).
2. **Toda sesión guardada lleva sello** (`semana`, `claseId`, `prefix`, `grupo`, `studentId`) y **solo se restaura si el sello coincide** con esta clase y este estudiante. Lo que no coincide se ignora: arranque en cero.
3. **La auto-reparación es estricta:** solo adopta sesiones con sello completo (mismo `claseId`, `studentId` y `grupo`), buscadas por contenido, **nunca por coincidencia parcial de texto en la clave**.
4. **Modo sin guardar = sesión efímera.** No lee ni escribe `localStorage`; usa `sessionStorage` (propio de la pestaña). Cada acceso directo empieza en cero y no deja nada para el siguiente.
5. **Existe UNA SOLA `syncIndex()`** (8-F, con `notaOficial()` de 8-U). Prohibidos `IDX_SC`, `SEM_ID`, `localStorage.setItem('studentName', …)` y cualquier "conservar la nota previa del index": **la mejor nota vive solo en `st.mejorNota`** (SKEY de esta semana), nunca se lee del index.
6. **Arranque verificado:** si no se encontró sesión válida, el estado se pone en cero explícito (`estadoEnCero()`) y se verifica con `console.assert` que `calcTotal() === 0`, `slide === 0`, `seen` vacío y `acts` vacío. Los valores iniciales de `st` en el código son siempre ceros literales (nunca datos de ejemplo).
7. **Recomendación para el index** (archivo aparte): al leer `INDEX_KEY`, ignorar la entrada si `entry.semana !== número de esa semana` o `entry.claseId` no coincide.
```javascript
// ═══ BLOQUE ÚNICO DE ARRANQUE — REEMPLAZA el paso 4 (PREFIX) y el paso 6 (autoverificación) de 8-K,
// y los pasos 5, 6 y 7 (auto-reparación, load, save) de 8-G. Todo lo demás de 8-G/8-K sigue igual. ═══

// A) claseCtx, st_modoSinGuardar, normalizarTexto y NOMBRE_NORM: EXACTAMENTE como en 8-K.
const GRUPO_NORM = normalizarTexto(claseCtx?.grupo).replace(/_/g, '');   // ej.: "501"

// B) CONFIG_CLASE (literal de la Prioridad 0) y el id de ESTA clase
const CONFIG_CLASE = { area: "mat", grado: "5", periodo: "3", semana: 4 };   // ← valores REALES de esta sesión
const CLASE_ID = `${CONFIG_CLASE.area}_${CONFIG_CLASE.grado}_p${CONFIG_CLASE.periodo}_s${CONFIG_CLASE.semana}`;

// C) El contexto del index solo vale si pertenece a ESTA semana
function contextoEsDeEstaSemana(ctx) {
  if (!ctx) return false;
  const sem = Number(CONFIG_CLASE.semana);
  if (ctx.semana !== undefined && ctx.semana !== null && Number(ctx.semana) !== sem) return false;
  const pfx = String(ctx.storagePrefix || '');
  if (pfx && !pfx.endsWith('_s' + sem)) return false;      // el prefijo del index TERMINA en la semana
  return true;
}
const CTX_VALIDO = contextoEsDeEstaSemana(claseCtx);
if (claseCtx && !CTX_VALIDO) {
  console.warn('⚠️ El contexto que entregó el index es de OTRA semana — se descarta; esta clase arranca en cero.');
  window.__avisoCtx = '⚠️ Esta clase se abrió con datos de otra semana. Empezó en cero. Entra desde el índice para que tu nota quede bien registrada.';
}

// D) PREFIX — el del index SOLO si es de esta semana; si no, el respaldo con la MISMA fórmula del index
function prefijoRespaldo() {
  return `${CONFIG_CLASE.area}_${CONFIG_CLASE.grado}_${GRUPO_NORM || 'sinregistro'}_p${CONFIG_CLASE.periodo}_s${CONFIG_CLASE.semana}`;
}
const PREFIX = (CTX_VALIDO && claseCtx && claseCtx.storagePrefix) ? claseCtx.storagePrefix : prefijoRespaldo();
// SKEY / INDEX_KEY / KEY_RESUMEN: exactamente como en 8-K y 8-J (derivadas de este PREFIX, sufijos _session / _data / _resumen)

// E) Almacén: el modo sin guardar NUNCA toca localStorage
function almacen() { return st_modoSinGuardar ? sessionStorage : localStorage; }

// F) ¿Esta sesión guardada es de ESTE estudiante y de ESTA semana?
function sesionGuardadaEsValida(d) {
  if (!d || typeof d !== 'object') return false;
  if (d.studentId !== undefined && d.studentId !== NOMBRE_NORM) return false;                  // otra persona
  if (d.semana    !== undefined && Number(d.semana) !== Number(CONFIG_CLASE.semana)) return false; // otra semana
  if (d.claseId   !== undefined && d.claseId !== CLASE_ID) return false;                        // otro curso/período
  if (d.grupo     !== undefined && d.grupo !== GRUPO_NORM) return false;                        // otro grupo
  return true;   // (una sesión antigua SIN sello solo llega aquí si estaba en la clave EXACTA SKEY, ya única por prefijo+nombre)
}

// G) Auto-reparación ESTRICTA: solo sesiones con sello completo; jamás por coincidencia parcial de texto
function buscarSesionHuerfanaPorIdentidad() {
  if (st_modoSinGuardar || !NOMBRE_NORM) return null;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || k === SKEY || !k.endsWith('_session')) continue;
      let d = null;
      try { d = JSON.parse(localStorage.getItem(k)); } catch (e) { continue; }
      if (d && d.claseId === CLASE_ID && d.studentId === NOMBRE_NORM && d.grupo === GRUPO_NORM &&
          Number(d.semana) === Number(CONFIG_CLASE.semana)) return d;
    }
  } catch (e) {}
  return null;
}

// H) Estado en cero REAL
function estadoEnCero() {
  st.name = claseCtx?.studentName || '';
  st.slide = 0; st.seen = new Set(); st.aciertos = 0; st.acts = {};
  st.badges = []; st.avatar = {}; st.avatarElegido = null; st.streak = 0; st.xp = 0;
  st.vidasUsadas = 0; st.intentos = 1;
  st.reintentoActivo = false; st.reintentoPendientes = [];
  st.mejorNota = 0; st.mejorAciertos = 0; st.mejorIntento = 1; st.historialIntentos = [];
  st.modoAdmin = false;
}

// I) load() — ÚNICA. Restaura solo sesiones VÁLIDAS; si no hay, cero verificado
function load() {
  let encontrada = false;
  try {
    let d = JSON.parse(almacen().getItem(SKEY) || 'null');
    if (d && !sesionGuardadaEsValida(d)) { console.warn('⚠️ Sesión guardada descartada: no es de este estudiante/semana.'); d = null; }
    if (!d) d = buscarSesionHuerfanaPorIdentidad();
    if (d) {
      encontrada = true;
      st.name          = d.name || claseCtx?.studentName || '';
      st.slide         = d.slide || 0;                 // 🔺 el slide SIEMPRE se restaura si hay sesión válida
      st.seen          = new Set(d.seen || []);        // 🔺 las slides vistas SIEMPRE se restauran
      st.aciertos      = d.aciertos || 0;
      st.acts          = d.acts || {};
      st.badges        = d.badges || [];
      st.avatar        = d.avatar || {};
      st.avatarElegido = d.avatarElegido || null;
      st.streak        = d.streak || 0;
      st.xp            = d.xp || 0;
      st.vidasUsadas   = d.vidasUsadas || 0;
      st.intentos      = d.intentos || 1;
      st.reintentoActivo     = d.reintentoActivo || false;
      st.reintentoPendientes = d.reintentoPendientes || [];
      st.mejorNota           = d.mejorNota || 0;        // 8-U
      st.mejorAciertos       = d.mejorAciertos || 0;
      st.mejorIntento        = d.mejorIntento || 1;
      st.historialIntentos   = d.historialIntentos || [];
      purgarCandadosHuerfanos();                        // 8-W: candados q_contada_* viejos nunca dejan un quiz muerto
      actualizarMejorNota();                            // 8-U: sesiones antiguas sin mejorNota se migran aquí
      save();                                           // re-guardar ya con sello (auto-migración silenciosa)
    } else {
      estadoEnCero();
    }
  } catch (e) { console.warn('Error al cargar:', e); estadoEnCero(); }
  if (!encontrada) {
    console.assert(calcTotal() === 0 && st.slide === 0 && st.seen.size === 0 && Object.keys(st.acts).length === 0,
      '🚨 Clase nueva que NO arrancó en cero: revisar 8-V');
  }
}

// J) save() — ÚNICA. Siempre con sello. En modo sin guardar solo sessionStorage y sin tocar el índice
function save() {
  try {
    actualizarMejorNota();
    const data = {
      studentId: NOMBRE_NORM, grupo: GRUPO_NORM, semana: CONFIG_CLASE.semana, claseId: CLASE_ID, prefix: PREFIX,   // 8-V: SELLO
      name: st.name,
      slide: st.slide, seen: [...st.seen],
      aciertos: st.aciertos || 0, acts: st.acts,
      badges: st.badges, avatar: st.avatar, avatarElegido: st.avatarElegido || null,
      streak: st.streak, xp: st.xp || 0,
      vidasUsadas: st.vidasUsadas || 0, intentos: st.intentos || 1,
      reintentoActivo: st.reintentoActivo || false, reintentoPendientes: st.reintentoPendientes || [],
      mejorNota: st.mejorNota || 0, mejorAciertos: st.mejorAciertos || 0, mejorIntento: st.mejorIntento || 1,   // 8-U
      historialIntentos: st.historialIntentos || [],
      timestamp: Date.now(),
    };
    almacen().setItem(SKEY, JSON.stringify(data));
    if (!st_modoSinGuardar) {
      const guardadas = JSON.parse(localStorage.getItem('clases_guardadas') || '[]');
      if (!guardadas.includes(PREFIX)) { guardadas.push(PREFIX); localStorage.setItem('clases_guardadas', JSON.stringify(guardadas)); }
    }
    mostrarGuardado();
    syncIndex();   // 8-F/8-U — en modo sin guardar syncIndex() corta de inmediato (8-E)
  } catch (e) { console.warn('Error al guardar:', e); }
}
```
**Checklist:**
```
[ ] CONFIG_CLASE, CLASE_ID, CTX_VALIDO, prefijoRespaldo(), PREFIX, almacen(), sesionGuardadaEsValida(), estadoEnCero(), load() y save() existen UNA sola vez
[ ] Si claseCtx.semana ≠ CONFIG_CLASE.semana (o storagePrefix no termina en _s{semana}) el prefijo del index se descarta y la clase arranca en 0.0
[ ] save() guarda el sello (studentId, grupo, semana, claseId, prefix) y load() descarta sesiones cuyo sello no coincide
[ ] buscarSesionHuerfanaPorIdentidad() exige claseId + studentId + grupo + semana; no usa includes() sobre el nombre
[ ] En modo sin guardar load()/save() usan sessionStorage y NUNCA localStorage ni el índice
[ ] No existe IDX_SC, SEM_ID, ni localStorage.setItem('studentName', …), ni ninguna lectura de la nota previa del index
[ ] Sin sesión válida: console.assert de arranque en cero presente; los valores iniciales de st son ceros literales
[ ] Prueba T9 (Prioridad 8-T) pasada: sesión de otra semana, contexto de otra semana y acceso directo no heredan nada
```


## 🔺 PRIORIDAD 8-W · MÁXIMA — REINTENTO A PRUEBA DE BLOQUEOS: AL GASTAR UNA VIDA, EL QUIZ SIEMPRE RESPONDE

### 🚨 BUG REAL DE PRODUCCIÓN: TRAS GASTAR UNA VIDA LLEVA A LOS QUIZZES, PERO NO SE PUEDEN SELECCIONAR LAS RESPUESTAS
Síntoma: el estudiante usa una vida, la clase lo lleva directo al Quiz, pero **las opciones no responden**; el docente debe usar el Panel ("Reset completo") y volver a gastar la vida desde el panel. Un quiz puede quedar "vivo en pantalla pero muerto por dentro" por cuatro motivos, y esta prioridad los cierra **todos a la vez** (no basta con arreglar uno):
1. **Candados `q_contada_*` huérfanos.** Un candado de pregunta que no se borró en el reinicio (sesiones guardadas por versiones antiguas, un reset parcial, una recarga a mitad) hace que `responderQuiz()` ignore **todos** los clics en silencio. Por construcción, un candado es válido **solo si su pregunta ya fue respondida** (`n < quiz_idx_`, porque el índice avanza en el mismo clic); cualquier candado con `n ≥ quiz_idx_` es huérfano y se elimina.
2. **Una pantalla encima del quiz.** Un modal en cola (mensaje del docente, Modo Foco) o una capa decorativa de pantalla completa (fuegos artificiales, confeti, reacciones) de la pantalla final que sigue por encima de la clase intercepta los clics. El reintento debe vaciar la cola de modales y retirar toda capa decorativa antes de pintar el quiz.
3. **Dos caminos de reinicio distintos.** El estudiante (`confirmarReintento()`) y el panel (`pd_resetQuizzes()`) repetían a mano cada uno su propia secuencia de pasos, con diferencias sutiles (uno cerraba el modal primero, otro no; uno anotaba el intento en una clave aparte, otro no). Ahora hay **UNA sola función**, `iniciarNuevoIntento(origen)`, y los dos caminos solo la llaman.
4. **Nadie comprobaba que el quiz realmente respondiera.** Ahora, después de pintar un quiz, `verificarQuizVivo()` hace una **prueba de vida**: botones habilitados, ningún candado huérfano y ningún elemento tapando el primer botón (`elementFromPoint`). Si algo falla, se auto-repara y repinta; el vigilante `revalidarAvance()` (8-O) repite la prueba cada 3 s.
### ⚖️ REGLAS ABSOLUTAS E INAPELABLES
1. `confirmarReintento()` y `pd_resetQuizzes()` **solo** llaman a `iniciarNuevoIntento(...)`; ninguna otra función reinicia quizzes ni cambia `vidasUsadas`/`intentos`.
2. `responderQuiz()` (8-P) trata un candado sobre la pregunta ACTUAL como huérfano: lo borra y sigue. La protección contra clics rápidos **no se pierde**: el primer clic avanza `quiz_idx_` de forma síncrona, así que los clics siguientes caen en la Guardia 1.
3. `.reintento-banner` lleva `pointer-events:none` (es solo informativo y nunca debe tapar ni interceptar nada).
4. Toda capa decorativa de pantalla completa lleva la clase `fx-overlay` **y** `pointer-events:none`; `render()` retira las que estén fuera de `#slide-wrap`.
5. El temporizador de la prueba de vida se guarda en `window.__vivoTimeout` y lo limpia `detenerTemporizadoresSlide()` (8-S).
```javascript
// ═══ 1) Utilidades ═══
function limpiarColaModales() { if (typeof _modalCola !== 'undefined') _modalCola.length = 0; }       // 8-Q
function forzarCerrarModal() {
  const ov = document.getElementById('modal-overlay'); if (ov) ov.classList.remove('vis');
  const bx = document.getElementById('modal-box');     if (bx) bx.innerHTML = '';
}
function limpiarOverlaysDecorativos() {
  document.querySelectorAll('.fx-overlay').forEach(el => {
    if (!el.closest('#slide-wrap')) el.remove(); else el.style.pointerEvents = 'none';
  });
}

// ═══ 2) Candados huérfanos: q_contada_<id>_<n> solo es válido si n < quiz_idx_<id> ═══
function purgarCandadosHuerfanos(sOpcional) {
  const lista = sOpcional ? [sOpcional] : SL.filter(s => TIPOS_EVALUABLES.includes(s.type));
  let cambio = false;
  lista.forEach(s => {
    const idx = st.acts['quiz_idx_' + s.id] || 0;
    const pref = 'q_contada_' + s.id + '_';
    Object.keys(st.acts).forEach(k => {
      if (!k.startsWith(pref)) return;
      const n = parseInt(k.slice(pref.length), 10);
      if (isNaN(n) || n >= idx) { delete st.acts[k]; cambio = true; }
    });
    // coherencia mínima: si el índice ya pasó la última pregunta, el quiz está completado
    if (s.preguntas && idx >= s.preguntas.length && st.acts['completado_' + s.id] !== true) { st.acts['completado_' + s.id] = true; cambio = true; }
  });
  return cambio;   // quien llama decide si guarda (load() y verificarQuizVivo() lo hacen)
}

// ═══ 3) LA ÚNICA FUNCIÓN QUE REINICIA UN INTENTO (estudiante y panel) ═══
function iniciarNuevoIntento(origen) {            // origen: 'estudiante' | 'panel'
  if (origen === 'estudiante' && (st.vidasUsadas || 0) >= MAX_VIDAS) return;
  // 1) la mejor nota se asegura ANTES de borrar nada (8-U)
  actualizarMejorNota();
  st.historialIntentos = st.historialIntentos || [];
  st.historialIntentos.push({ intento: st.intentos || 1, nota: calcTotal(), aciertos: st.aciertos || 0, fecha: new Date().toISOString(), origen });
  // 2) silenciar todo lo que pueda quedar encima o corriendo
  limpiarColaModales(); forzarCerrarModal();
  detenerCronometroLectura(); detenerTemporizadoresSlide(); lecturaMarca = null;
  limpiarOverlaysDecorativos();
  // 3) vidas e intentos
  st.vidasUsadas = Math.min(MAX_VIDAS, (st.vidasUsadas || 0) + 1);
  st.intentos = (st.intentos || 1) + 1;
  // 4) reset de quizzes (candados q_contada_*, retro pendiente y mejor nota segura: 8-P/8-U) + reintento dirigido (6-B)
  resetearTodosLosQuizzes();
  purgarCandadosHuerfanos();
  iniciarReintentoDirigido();
  save();
  render();                                       // pinta el primer evaluable pendiente
  verificarQuizVivo();                            // prueba de vida inmediata
  updScore();
  showToast(`❤️ Intento ${st.vidasUsadas}/${MAX_VIDAS} — Ve directo a lo que falta 🎯 (tu mejor nota ${(st.mejorNota || 0).toFixed(1)} está segura)`);
}

// ═══ 4) Prueba de vida del quiz ═══
window.__vivoTimeout = null;
window.__vivoReparaciones = 0;
function programarVerificacionQuiz() {            // se llama al FINAL de render() (8-O)
  if (window.__vivoTimeout) clearTimeout(window.__vivoTimeout);
  window.__vivoTimeout = setTimeout(verificarQuizVivo, 300);
}
function verificarQuizVivo() {
  try {
    const s = SL[st.slide];
    if (!s || !TIPOS_EVALUABLES.includes(s.type)) { window.__vivoReparaciones = 0; return true; }
    if (st.acts['completado_' + s.id] === true) return true;
    if (modalAbierto()) return true;                               // un modal legítimo (retroalimentación) está encima: no es un bloqueo
    const opts = [...document.querySelectorAll('.quiz-opt')];
    if (!opts.length) return true;                                 // semáforo de confianza u otra pantalla legítima
    let problema = false;
    if (purgarCandadosHuerfanos(s)) { problema = true; save(); }   // candado huérfano
    if (opts.every(b => b.disabled)) problema = true;              // pintado muerto
    const b0 = opts.find(b => !b.disabled) || opts[0];
    const r = b0.getBoundingClientRect();
    if (r.width > 0 && r.bottom > 0 && r.top < window.innerHeight) {
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      if (hit && !b0.contains(hit)) {                              // algo está tapando el botón
        const cs = getComputedStyle(hit);
        const grande = hit.getBoundingClientRect().width >= window.innerWidth * 0.8 && hit.getBoundingClientRect().height >= window.innerHeight * 0.8;
        if ((cs.position === 'fixed' || cs.position === 'absolute') && grande && hit.id !== 'modal-overlay' && hit.id !== 'pd-overlay') {
          hit.style.pointerEvents = 'none'; problema = true;        // capa decorativa de pantalla completa: se neutraliza
        } else { console.warn('verificarQuizVivo: el botón está cubierto por', hit); }
      }
    }
    if (problema && window.__vivoReparaciones < 3) { window.__vivoReparaciones++; render(); return false; }
    if (!problema) window.__vivoReparaciones = 0;
    return !problema;
  } catch (e) { console.warn('verificarQuizVivo:', e); return true; }
}
```
```css
.reintento-banner { pointer-events: none; }   /* informativo: nunca intercepta clics (se suma al CSS de 6-B) */
```
### 🧪 PRUEBA OBLIGATORIA (la automatiza `prueba_clase.js`, Prioridad 8-T: prueba T7)
```
PASO 1: Completar todos los quizzes y llegar a la pantalla final.
PASO 2: Con el MOUSE (clics reales, no llamadas a funciones): "❤️ Reintentar ahora" → "Sí, reiniciar".
RESULTADO ESPERADO: llega al primer quiz pendiente; el PRIMER clic en una opción abre la retroalimentación (ningún elemento tapa el botón).
PASO 3: Responder todo el reintento con clics reales hasta volver a la pantalla final.
RESULTADO ESPERADO: la nota oficial nunca bajó (8-U) y ningún quiz quedó muerto.
PASO 4: Repetir el reintento desde "Reset solo Quizzes" del Panel Docente: mismo resultado.
```
**Checklist:**
```
[ ] confirmarReintento() y pd_resetQuizzes() llaman SOLO a iniciarNuevoIntento() — una sola función de reinicio
[ ] iniciarNuevoIntento() vacía la cola de modales, cierra el modal, retira overlays decorativos y detiene temporizadores ANTES de pintar
[ ] purgarCandadosHuerfanos() se ejecuta en load(), en rQuiz()/responderQuiz() (8-P) y en la prueba de vida
[ ] verificarQuizVivo() existe y se programa al final de render() (programarVerificacionQuiz) y se invoca en revalidarAvance()
[ ] window.__vivoTimeout lo limpia detenerTemporizadoresSlide()
[ ] .reintento-banner tiene pointer-events:none; toda capa decorativa de pantalla completa tiene clase fx-overlay + pointer-events:none
[ ] Prueba T7 con clics reales de mouse: tras gastar una vida, el quiz responde al primer clic
```

