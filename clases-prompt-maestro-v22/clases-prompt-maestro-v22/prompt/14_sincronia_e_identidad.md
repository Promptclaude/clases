---
modulo: 14_sincronia_e_identidad
etapa_de_lectura: 2
prioridades: [8, 8-B, 8-C, 8-D, 8-E, 8-F, 8-G, 8-H, 8-I, 8-J, 8-K, 8-L]
---

# 14 · Sincronización con el index, guardado, identidad de sesión y claves (PREFIX/SKEY/INDEX_KEY)

## 🔴 PRIORIDAD 8 · ABSOLUTA — SINCRONIZACIÓN CON INDEX (CADA 20 SEGUNDOS)

> **Nota:** `PREFIX`/`SKEY`/`save()`/`load()` NO se definen en esta sección: la fórmula de claves es la de **8-K** y `load()`/`save()` son los de **8-V**. El resto de esta sección (`syncIndex()`, autoguardado en capas, botón de guardar, funciones del index) sigue vigente y usa esas definiciones.
```javascript
// ═══ GUARDAR ESTADO COMPLETO Y CARGAR ESTADO — ver Prioridad 8-G ═══
// (PREFIX, SKEY, save(), load() y markSeen() se implementan ÚNICAMENTE ahí)
// ═══ SINCRONIZAR CON INDEX — ver Prioridad 8-F (única syncIndex() válida, con notaOficial() de 8-U) ═══
// ELIMINADA la syncIndex() heredada que estaba aquí (IDX_SC / SEM_ID / "conservar la nota previa"):
// guardaba por NOMBRE (sin grupo) con un SEM_ID que el documento nunca definía y copiaba la nota de la entrada
// anterior; con dos semanas o dos estudiantes homónimos compartiendo llave, una semana NUEVA abría con la nota
// de otra (bug de producción, Prioridad 8-V). Hoy existe UNA SOLA syncIndex(), en 8-F.
// ═══ CAPA 1: Guardar en cada interacción (save() ya lo hace)
// ═══ CAPA 2: Intervalo automático cada 20 segundos
setInterval(() => { save(); }, 20000);
// ═══ CAPA 3: Al salir de la página
window.addEventListener('beforeunload', () => { save(); syncIndex(); });
// ═══ CAPA 4: Al ocultar la pestaña
document.addEventListener('visibilitychange', () => { if (document.hidden) save(); });
// ═══ BOTÓN FÍSICO DE GUARDAR (en el navbar) ═══
// HTML:
// <button class="nav-btn" onclick="save();showToast('💾 ¡Guardado!')" title="Guardar progreso">
// 💾 Guardar
// </button>
// ═══ INDICADOR VISUAL DE GUARDADO ═══
function mostrarGuardado() {
  const el = document.getElementById('save-ind');
  if (!el) return;
  el.style.opacity = '1';
  setTimeout(() => el.style.opacity = '0', 2000);
}
// En navbar: <span id="save-ind" style="font-size:.62rem;color:var(--success);opacity:0;transition:opacity .5s">💾 guardado</span>
```
### 📊 LO QUE VE EL INDEX DE CADA ESTUDIANTE:
El index debe mostrar para cada semana:
- Nota actual (X.X / 5.0)
- Porcentaje completado (barra de progreso)
- Slide donde quedó ("Slide 12 de 25")
- Fecha y hora del último acceso
- Cantidad de intentos usados (vidas)
- Estado: 🔴 Sin iniciar / 🟡 En progreso / 🟢 Completada
```javascript
// FUNCIÓN PARA EL INDEX — leer progreso de cada clase
function getProgresoSemana(materiaKey, semanaId, studentName) {
  try {
    const sc = JSON.parse(localStorage.getItem(materiaKey+'_scores')||'{}');
    return sc[studentName]?.[semanaId] || null;
  } catch(e) { return null; }
}
// RENDER EN EL INDEX — tarjeta de semana con progreso
function renderTarjetaSemana(semana, progreso) {
  if (!progreso) {
    return `<div class="sem-card sin-iniciar">
      <span class="sem-estado">🔴 Sin iniciar</span>
      <span class="sem-nota">—</span>
    </div>`;
  }
  const pct = progreso.porcentaje || 0;
  const completada = progreso.completada || pct >= 90;
  return `
    <div class="sem-card ${completada?'completada':'en-progreso'}">
      <div class="sem-barra">
        <div style="width:${pct}%;background:${completada?'var(--success)':'var(--primary)'}"></div>
      </div>
      <div class="sem-info">
        <span class="sem-estado">${completada?'🟢 Completada':'🟡 En progreso'} — ${pct}%</span>
        <span class="sem-nota">${progreso.nota} / 5.0</span>
        <span class="sem-detalle">Slide ${progreso.slideActual||0} de ${progreso.totalSlides||25} · ${progreso.fecha||''}</span>
        <span class="sem-vidas">❤️ ${MAX_VIDAS-(progreso.vidasUsadas||0)} vidas restantes</span>
      </div>
      <button onclick="abrirClase('${semana.archivo}','${semana.id}')" class="sem-btn">
        ${completada ? '🔁 Repasar' : '▶ Continuar'}
      </button>
    </div>
  `;
}
// Al abrir una clase desde el index:
// ⚠️ v15.0 — ejemplo ILUSTRATIVO del lado del index. El contrato vigente (storagePrefix completo "area_grado_grupo_pPERIODO_sSEMANA" + semana) es el de 8-K/8-V.
function abrirClase(archivo, semanaId) {
  sessionStorage.setItem('desde_index', 'true');
  sessionStorage.setItem('clase_contexto', JSON.stringify({
    semana:        semanaId,
    materia:       MATERIA_NOMBRE,
    grado:         GRADO,
  storagePrefix: PREFIX_QUE_ENTREGA_EL_INDEX, // formato area_grado_grupo_pPERIODO_sSEMANA (ver 8-K); el index real también entrega `semana`
  }));
  window.open(archivo, '_blank');
}
```

## 🔴 PRIORIDAD 8-B · ABSOLUTA — BLINDAJE DE AUTOGUARDADO Y RESTAURACIÓN EXACTA DE POSICIÓN

### 📍 REGLA DE ORO: EL ESTUDIANTE SIEMPRE VUELVE EXACTO A DONDE QUEDÓ
Se han detectado clases donde, al recargar la página, cerrar por error, o volver a entrar desde el index, el estudiante NO queda en el slide exacto donde iba, sino que reinicia. Esta sección **refuerza** (no reemplaza) la Prioridad 8 con un orden de inicialización obligatorio y capas extra de respaldo.
**GARANTÍA OBLIGATORIA — el estudiante debe quedar exactamente donde estaba en TODOS estos casos:**
- Recarga manual de la página (F5 / botón recargar)
- Cierre accidental de la pestaña o el navegador y reingreso posterior
- Salida por error y reingreso desde el mismo enlace o desde el index
- Cambio de pestaña/ventana y regreso
- Pérdida de conexión momentánea

###  REGLA DE ORO ADICIONAL: `save()` SE LLAMA EN EL MISMO CLIC, NUNCA SE DEJA PARA DESPUÉS
**Diagnóstico exacto del bug que esta regla previene:** un estudiante avanza hasta, por ejemplo, el slide 6, refresca la página o se sale y vuelve a entrar, y la clase reinicia desde el principio — a pesar de que `save()` ya existe en `nextSlide()`/`prevSlide()`. Esto pasa cuando alguna interacción intermedia (arrastrar una ficha, marcar una casilla, usar una pista, seleccionar una opción de un ejercicio no evaluable) modifica `st` pero su `onclick`/`onchange`/`ondrop` NO llama a `save()` de inmediato — la app confía en que el intervalo de 20s (Prioridad 8) o el próximo cambio de slide guardarán ese avance, y si el estudiante recarga antes de que eso ocurra, ese progreso intermedio se pierde (o, peor, la app carga un `st` viejo que sobreescribe el nuevo al siguiente `save()` mal ordenado).
**Regla, sin excepción:** toda función manejadora de un evento (clic, drag-drop, cambio de input, selección) que modifique cualquier propiedad de `st` debe terminar con una llamada síncrona a `save()` **dentro de esa misma función**, antes de retornar — igual que ya hacen `nextSlide()`, `prevSlide()`, `responderQuiz()` y el manejo de pistas en este documento. No es válido:
```javascript
// ❌ PROHIBIDO — modifica st pero delega el guardado al intervalo de 20s o al próximo nextSlide()
function marcarCasillaWS(id) { st.acts['ws_'+id] = true; render(); }
```
```javascript
// ✅ OBLIGATORIO — guarda en el mismo clic que modifica st
function marcarCasillaWS(id) { st.acts['ws_'+id] = true; save(); render(); }
```
Esto es una generalización explícita del patrón que 8-I ya exige para actividades (drag/match/fill/orden nunca se vacían), 8-H exige para quizzes, y la Prioridad 5.34 (línea "se guarda de inmediato, la pista usada nunca se resetea al recargar") ya aplica puntualmente al uso de pistas — v11.2 lo deja como regla universal de la Prioridad 8-B para que cubra cualquier interacción nueva que se agregue en prioridades futuras, no solo las ya existentes.
[ ] Toda función que asigna algo a `st.acts[...]`, `st.slide`, `st.vidasUsadas`, `st.aciertos` o cualquier otra propiedad de `st` termina con `save()` antes de `render()`, en la misma función — nunca se delega solo al intervalo de 20s, a `beforeunload` ni al próximo cambio de slide

#### ORDEN DE INICIALIZACIÓN OBLIGATORIO — NUNCA invertir este orden:
```javascript
// NUEVO v6.1 — bloque de arranque OBLIGATORIO, único punto de entrada de la app
document.addEventListener('DOMContentLoaded', function() {
  load();                 // 1️⃣ PRIMERO: restaurar TODO el estado guardado (incluye st.slide exacto)
  render();                // 2️⃣ SEGUNDO: recién ahora se pinta la pantalla — en el slide restaurado
  setupModoFoco();          // 3️⃣ Resto de inicializaciones normales de la clase
  actualizarBadgesCuadernos();
  updateVidasBtn();
  // ❌ PROHIBIDO: nunca hacer st.slide = 0 en este bloque de arranque
  // ❌ PROHIBIDO: nunca llamar render() antes que load()
});
```
**REGLAS DE BLINDAJE — agregar SIN quitar nada de la Prioridad 8:**
```javascript
// NUEVO v6.1 — capa extra de guardado: al perder conexión o cambiar de página en móvil
window.addEventListener('pagehide', () => { save(); syncIndex(); });

// NUEVO v6.1 — guardar también inmediatamente después de CADA nextSlide() / cambio de slide,
// no solo esperar al intervalo de 20s (agregar save() al final de nextSlide() si no está ya):
// function nextSlide() { ... st.slide = ...; save(); render(); }  ← save() ya debe estar aquí, verificar SIEMPRE

// NUEVO v6.1 — nunca resetear st.slide a 0 al reabrir salvo que sea un estudiante NUEVO
// (es decir, salvo que localStorage.getItem(SKEY) sea null la primera vez)
function esEstudianteNuevo() {
  return localStorage.getItem(SKEY) === null;
}
```
**CHECKLIST DE VERIFICACIÓN MANUAL antes de entregar el código (recorrer siempre):**
```
[ ] load() se ejecuta ANTES que render() en el arranque de la página — sin excepción
[ ] st.slide NUNCA se fuerza a 0 en el arranque si ya existe una sesión guardada (SKEY)
[ ] Al recargar la página (F5) en cualquier slide intermedio, el estudiante reaparece en ESE mismo slide
[ ] Al cerrar la pestaña y volver a abrir el archivo, el progreso y el slide se restauran igual
[ ] save() se llama después de CADA cambio de slide, no solo cada 20 segundos
[ ] beforeunload, visibilitychange Y pagehide están los tres implementados
[ ] syncIndex() refleja el mismo slideActual que quedó guardado en SKEY
```

## 🔴 PRIORIDAD 8-C · ABSOLUTA — AISLAMIENTO DE DATOS POR ESTUDIANTE (BLINDAJE CONTRA CONTAMINACIÓN ENTRE USUARIOS)

### 🧍 REGLA DE ORO: UN ESTUDIANTE NUEVO SIEMPRE EMPIEZA EN CERO — NUNCA HEREDA DATOS DE OTRO
**Bug crítico detectado y corregido:** en salones con computadores compartidos (ej. Sala de Informática), varias clases guardaban TODO el progreso local (slide actual, XP, respuestas, medallas, nombre) bajo una clave de `localStorage` fija y **compartida por materia + semana**, sin incluir la identidad del estudiante:
```javascript
// ❌ PATRÓN INCORRECTO — NUNCA HACER ESTO (causa contaminación entre estudiantes):
const PFX = `${AUTOR_MATERIA_SIGLA}_s${AUTOR_SEMANA_NUM}`;   // ej: "tec4_s1" — IGUAL para TODOS los estudiantes
const SKEY = `${PFX}_session`;                                // "tec4_s1_session" — una sola clave global
```
Con este patrón, todos los estudiantes que usan el mismo computador leen y escriben la MISMA clave. Cuando un estudiante nuevo se registraba en el index y abría la clase, esta cargaba automáticamente el progreso, la nota y el avance de quien haya usado ese equipo antes — el estudiante nuevo aparecía con nota, medallas y slide adelantados que no le correspondían.
**REGLA OBLIGATORIA — la clave de sesión local SIEMPRE debe incluir el identificador único del estudiante que entrega el index, nunca solo materia+semana:**
```javascript
// ✅ PATRÓN CORRECTO — OBLIGATORIO en TODA clase generada:
// IDX_STUDENT_ID viene del sessionStorage/contexto que entrega el index al abrir la clase
// (el mismo id único con el que el index registra al estudiante, típicamente con sufijo de timestamp)
let claseCtx = null;
try {
  const raw = sessionStorage.getItem('clase_contexto');
  if (raw) claseCtx = JSON.parse(raw);
} catch(e) {}
const IDX_STUDENT_ID = claseCtx?.studentId || null;
// La clave de sesión SIEMPRE debe llevar el id del estudiante — nunca solo materia+semana
// (PREFIX/SKEY con este id ya los entrega la fórmula única de la Prioridad 8-K — no reconstruir aquí)
```
**PROHIBIDO ABSOLUTO — nunca usar estas fuentes para "adivinar" quién es el estudiante:**
```
❌ localStorage.getItem('studentName')  → clave GLOBAL compartida por todo el computador,
                                          muestra el nombre del ÚLTIMO estudiante que guardó algo ahí
❌ Cualquier clave de sesión que NO incluya el id único del estudiante entregado por el index
❌ Asumir "si hay datos guardados, son míos" sin verificar el id del estudiante actual
```
**REGLAS DE COMPORTAMIENTO OBLIGATORIAS:**
- **Estudiante NUEVO** (id nuevo, sin registro previo en `localStorage[SKEY]` para ESE id exacto) → la clase debe iniciar 100% en cero: `slide = 0`, `nota = 0.0`, `aciertos = 0`, sin medallas, sin XP, sin respuestas de nadie más.
- **Estudiante que regresa** (mismo id que ya tiene un registro en `localStorage[SKEY]`) → recupera exactamente SU propio avance, nunca el de otro estudiante que haya usado el mismo equipo.
- Si el estudiante no había avanzado nada, **no puede aparecer con nota ni con avance** — nunca se "hereda" progreso de otro usuario por compartir computador.
- La semana/slide actual que ve el estudiante debe estar siempre sincronizada con lo que el index reporta para ESE mismo id — nunca desfasada ni mezclada con datos de otro estudiante.
- El nombre mostrado en la clase (`st.name`) debe salir EXCLUSIVAMENTE del contexto de sesión que entrega el index al abrir la clase (`claseCtx`), nunca de una clave global adivinada.
#### IMPLEMENTACIÓN — `load()` y `save()`: código único en la **Prioridad 8-V** (valida identidad y sello antes de restaurar). `st.name` sale SOLO de `claseCtx`.
**CHECKLIST DE VERIFICACIÓN MANUAL — recorrer siempre antes de entregar el código:**
```
[ ] La clave de sesión (SKEY) incluye el id único del estudiante (IDX_STUDENT_ID), no solo materia+semana
[ ] load() valida que d.studentId === IDX_STUDENT_ID antes de restaurar cualquier dato guardado
[ ] Si el id no coincide o no hay registro previo, TODO arranca en cero (slide, nota, medallas, XP)
[ ] save() siempre guarda studentId junto con el resto del progreso
[ ] st.name NUNCA se toma de localStorage.getItem('studentName') ni de otra clave global compartida
[ ] Un estudiante nuevo registrado en el index NUNCA ve nota, medallas o avance de otro estudiante
[ ] Un estudiante que regresa (mismo id) recupera exactamente su propio progreso, nunca el de otro
[ ] La semana/slide que reporta la clase coincide siempre con lo que el index muestra para ese mismo id
```

## 🔴 PRIORIDAD 8-D · ABSOLUTA — RESTAURACIÓN CONFIABLE DE SLIDE CON VARIOS ESTUDIANTES REGISTRADOS

### 🧩 BUG DETECTADO: LA NOTA SE GUARDA BIEN, PERO EL SLIDE VUELVE A 0 CUANDO HAY 2+ ESTUDIANTES
**Diagnóstico de la causa raíz:** la Prioridad 8-C usa dos identidades DIFERENTES para dos cosas que deberían estar sincronizadas:
- La **nota/progreso que ve el index** (`syncIndex()`, Prioridad 8) se guardaba (en versiones antiguas) bajo `IDX_SC[st.name][SEM_ID]` — usaba el **nombre** del estudiante como llave, y por eso siempre funciona bien, sin importar cuántos estudiantes haya.
- La **posición exacta del slide** (`SKEY`, Prioridad 8-C) se guarda bajo una llave que incluye `IDX_STUDENT_ID` — un identificador que el index genera y entrega en `sessionStorage['clase_contexto']` cada vez que el estudiante abre la clase.
Cuando hay solo 1 estudiante registrado, ese id casi nunca cambia y todo funciona. Pero en cuanto hay **2 o más estudiantes registrados en el mismo index**, es fácil que el id que el index entrega en `clase_contexto` **no sea exactamente el mismo** en cada apertura (por ejemplo, si el index genera el id en el momento de dar clic en "Continuar" en vez de reutilizar siempre el mismo id ya asignado a ese estudiante desde su primer registro). Como `load()` (Prioridad 8-C) exige `d.studentId === IDX_STUDENT_ID` para restaurar el progreso, un id ligeramente distinto hace que el sistema trate al estudiante como "nuevo" — **la nota sigue viéndose bien en el index (porque esa parte usa el nombre), pero la clase reinicia el slide en 0 y vuelve a correr todos los cronómetros de lectura desde el principio.**
### ✅ REGLA DE ORO — LA IDENTIDAD DEBE SER LA MISMA PARA TODO: NOTA Y POSICIÓN DE SLIDE
**Solución obligatoria:** usar SIEMPRE la misma base de identidad — el **nombre normalizado del estudiante** (la misma que ya funciona de forma confiable para la nota) — tanto para `SKEY` (posición/progreso local) como para `INDEX_KEY` (nota/progreso del index; la antigua `IDX_SC` fue eliminada en v15.0). El `studentId` que entrega el index, si existe, se usa como complemento, NUNCA como único criterio de coincidencia.
```javascript
// Normalizar el nombre para usarlo como base de identidad estable
function normalizarNombre(nombre) {
  return (nombre || '')
    .trim()
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/\s+/g, '_');
}
// La clave de sesión ahora se basa en el nombre normalizado (estable),
// no solo en un studentId que puede variar entre aperturas
const NOMBRE_NORM = normalizarNombre(claseCtx?.studentName || st.name || '');
// (PREFIX/SKEY con este nombre normalizado ya los entrega la fórmula única de la Prioridad 8-K)
```
**CAPA DE AUTO-REPARACIÓN — recuperar sesiones que quedaron "huérfanas" por un id anterior distinto:**
```javascript
// Si por alguna razón existiera una sesión guardada bajo un studentId viejo
// distinto (de clases generadas antes de este fix), buscarla por nombre antes de rendirse
// y arrancar en cero. Esto NUNCA mezcla datos entre estudiantes distintos — solo reconecta
// al MISMO estudiante (mismo nombre normalizado) con su propio progreso anterior.
function buscarSesionHuerfanaPorNombre() {
  if (!NOMBRE_NORM) return null;
  try {
    const guardadas = JSON.parse(localStorage.getItem('clases_guardadas')||'[]');
    const candidata = guardadas.find(pfx =>
      pfx.startsWith(`${AUTOR_MATERIA_SIGLA}_s${AUTOR_SEMANA_NUM}_`) &&
      pfx.includes(NOMBRE_NORM)
    );
    if (!candidata) return null;
    const d = JSON.parse(localStorage.getItem(candidata + '_session') || 'null');
    return d;
  } catch(e) { return null; }
}
```
> **Nota:** el `load()` vigente es el de 8-V (con auto-reparación de sesiones huérfanas, `buscarSesionHuerfanaPorIdentidad`, adaptada al `PREFIX` de 8-K). Aquí solo permanecen la garantía y el checklist.
**GARANTÍA OBLIGATORIA:** con 2, 5, 20 o cualquier cantidad de estudiantes registrados en la misma clase, cada uno debe SIEMPRE reabrir exactamente en el slide donde quedó — nunca en el slide 1 — mientras su nombre coincida con el de su sesión anterior. La nota y la posición del slide deben estar permanentemente sincronizadas entre sí y con lo que el index reporta, sin importar cuántos estudiantes usen la clase simultáneamente o en distintos momentos.
**CHECKLIST DE VERIFICACIÓN MANUAL — recorrer siempre antes de entregar el código:**
```
[ ] SKEY se construye con el nombre normalizado del estudiante (normalizarNombre), no solo con un id volátil
[ ] load() intenta recuperar por nombre (buscarSesionHuerfanaPorNombre) antes de asumir "estudiante nuevo"
[ ] Al encontrar una sesión previa por nombre, se re-guarda de inmediato bajo la clave actual (auto-migración)
[ ] Probado con 3+ estudiantes registrados: cada uno reabre exactamente en su propio slide, nunca en el 1
[ ] La nota (INDEX_KEY) y el slide (SKEY) usan la MISMA base de identidad (nombre normalizado + grupo + semana)
[ ] Dos estudiantes con nombres distintos JAMÁS comparten ni mezclan su progreso, aunque usen el mismo equipo
```

## 🔴 PRIORIDAD 8-E · ABSOLUTA — IDENTIDAD REFORZADA CON GRUPO/SALÓN + ADVERTENCIA EN ACCESO DIRECTO

### 🏫 PROBLEMA A RESOLVER: 501, 502 Y OTROS GRUPOS COMPARTEN EL MISMO COMPUTADOR
La Prioridad 8-D ya resuelve la mezcla de progreso entre estudiantes DISTINTOS con nombres DISTINTOS. Pero en la práctica real de la Sala de Informática, el mismo computador lo usan estudiantes de **grupos diferentes** (501, 502, 503...) en distintas horas, y puede haber **coincidencia de nombres** entre grupos (dos estudiantes que se llaman igual en 501 y en 502). Además, algunos estudiantes **abren el archivo de la semana directamente** (por un enlace guardado, por WhatsApp, etc.) **sin pasar primero por el index** — en ese caso no existe `sessionStorage['clase_contexto']` y el sistema no sabe ni el nombre ni el grupo del estudiante.
### ✅ REGLA DE ORO — LA IDENTIDAD SE ARMA CON NOMBRE + GRUPO (SOLO SI VIENEN DEL INDEX)
```javascript
// Normalizar también el grupo/salón (igual que el nombre en Prioridad 8-D)
function normalizarGrupo(grupo) {
  return (grupo || '')
    .trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '');
}
// La identidad completa combina grupo + nombre normalizados
const GRUPO_NORM  = normalizarGrupo(claseCtx?.grupo || st.grupo || '');
// NOMBRE_NORM ya viene de la Prioridad 8-D
const IDENTIDAD_KEY = `${GRUPO_NORM || 'singrupo'}_${NOMBRE_NORM || 'pendiente'}`;
// La clave de sesión ahora incluye AMBOS — nunca solo el nombre a secas
// (PREFIX/SKEY con IDENTIDAD_KEY ya los entrega la fórmula única de la Prioridad 8-K — no reconstruir aquí)
// syncIndex() también debe anidar por grupo, para que el profe vea cada salón por separado:
// (v15.0: IDX_SC eliminada — el grupo ya viaja dentro del PREFIX/INDEX_KEY de 8-K/8-V)
```
### 🚨 MANEJO DE ACCESO DIRECTO — YA NO SE PIDE NOMBRE/GRUPO, SE ADVIERTE CLARO (v6.9 — corregido)
**Cambio de enfoque:** pedirle al estudiante que escriba su nombre y grupo manualmente cuando entra directo (sin index) es un riesgo — puede escribir su nombre distinto al del registro del index (con o sin apellido, con errores de tipeo, etc.), generando entradas duplicadas o desincronizadas. La solución más segura es **NO intentar reconstruir la identidad** y en su lugar **advertir con claridad, en rojo y grande, que esa sesión no se va a guardar ni a tener nota**, dejando que el estudiante decida si continúa así o va a buscar el index.
```javascript
// Detectar acceso directo: si falta el contexto del index, activar "modo sin guardar"
// NUNCA se pide nombre ni grupo por formulario — solo se advierte.
let st_modoSinGuardar = false;
function verificarAccesoDirecto() {
  if (claseCtx && claseCtx.studentName && claseCtx.grupo) {
    st_modoSinGuardar = false;
    return; // vino bien del index — todo normal, sin advertencias
  }
  st_modoSinGuardar = true; // acceso directo detectado
}
// Banner rojo, grande y persistente — se muestra en la zona del nombre/HUD
// mientras dure la sesión, y NUEVAMENTE en la pantalla final si el estudiante llega a terminar
function renderBannerSinGuardar() {
  if (!st_modoSinGuardar) return '';
  return `
    <div class="banner-sin-guardar">
      ⚠️ <strong>ESTA CLASE NO SE GUARDARÁ NI TENDRÁ NOTA</strong><br>
      Entraste sin pasar por el índice de tu materia. Si continúas así, tu avance
      <strong>se va a perder</strong> y tu profe no podrá verlo.<br>
      <span style="font-weight:900">Cierra esto y entra desde el índice para que sí cuente.</span>
    </div>
  `;
}
// Llamar renderBannerSinGuardar() e insertar su HTML SIEMPRE arriba del nombre/HUD del estudiante,
// en cada render(), mientras st_modoSinGuardar sea true — no solo en el intro
```
```css
.banner-sin-guardar {
  background: #ffe0e0;
  border: 3px solid #c0392b;
  color: #7a0000;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 12px;
  text-align: center;
  font-size: .85rem;
  line-height: 1.6;
  box-shadow: 0 3px 0 #a02020;
}
```
**En la pantalla final (`rFinal()`):** si `st_modoSinGuardar` es `true`, el mensaje rojo debe reaparecer ANTES o junto a la nota, dejando claro que esa nota que se ve en pantalla es solo una vista local y **no quedó registrada**:
```javascript
// Agregar al INICIO del HTML que devuelve rFinal() (Prioridad 11), antes de la nota:
// ${renderBannerSinGuardar()}
// más un texto adicional específico de cierre:
function renderAvisoFinalSinGuardar() {
  if (!st_modoSinGuardar) return '';
  return `
    <div class="banner-sin-guardar">
      ⚠️ <strong>ESTA CLASE NO SE ABRIÓ CORRECTAMENTE</strong><br>
      Como entraste sin pasar por el índice, tu nota <strong>no fue guardada</strong>.<br>
      Pídele a tu profe que te ayude a entrar desde el índice y vuelve a intentarlo.
    </div>
  `;
}
```
**Efecto en el guardado:** en modo sin guardar (`st_modoSinGuardar`) `syncIndex()` y toda escritura al índice se cortan ANTES de tocar `localStorage` (ver `syncIndex()` en 8-F).
**GARANTÍA OBLIGATORIA:** ningún estudiante que entre directo (sin index) puede terminar la clase pensando que su nota quedó guardada — el aviso rojo debe ser imposible de pasar por alto, tanto al empezar como al terminar, y el sistema JAMÁS debe escribir en el índice mientras la identidad no venga confirmada por el propio index.
**CHECKLIST DE VERIFICACIÓN MANUAL — recorrer siempre antes de entregar el código:**
```
[ ] SKEY combina grupo normalizado + nombre normalizado (IDENTIDAD_KEY) cuando SÍ viene del index
[ ] INDEX_KEY incluye el grupo (vía PREFIX, 8-K/8-V) para que el profe vea cada salón aparte
[ ] verificarAccesoDirecto() se ejecuta ANTES de load(), en cada arranque de la página
[ ] NUNCA se pide nombre ni grupo por formulario en acceso directo — solo se advierte en rojo
[ ] renderBannerSinGuardar() visible de forma persistente en toda la sesión si hubo acceso directo
[ ] renderAvisoFinalSinGuardar() aparece también en la pantalla final si hubo acceso directo
[ ] syncIndex() corta de inmediato (return) si st_modoSinGuardar es true — cero escritura al índice
[ ] Probado: mismo nombre en grupo 501 y en grupo 502 entrando SIEMPRE desde el index — progreso y nota nunca se mezclan
```

## 🔴 PRIORIDAD 8-F · ABSOLUTA — CONTRATO DE DATOS CON EL ÍNDICE (CLAVE ÚNICA POR ESTUDIANTE, A PRUEBA DE ERRORES)

### 🚨 HALLAZGO REAL DE PRODUCCIÓN — SE SIMPLIFICA EL CONTRATO EN ESTA VERSIÓN
Al auditar 4 índices reales ya en uso (Aritmética 4°, Aritmética 5°, Tecnología 4°, Tecnología 5°) se encontraron **3 arquitecturas de datos distintas** conviviendo. La versión anterior de esta prioridad usaba el patrón de "una clave compartida por semana+grupo, con un objeto anidado por estudiante dentro" — que exige que `syncIndex()` haga SIEMPRE "leer → fusionar solo mi entrada → escribir todo". Se confirmó que ese patrón, aunque correcto en teoría, es fácil de implementar mal: uno de los índices reales (Tecnología 5°) tiene exactamente ese diseño pero con el paso de "fusionar" roto — cada estudiante nuevo que termina una semana **borra** el progreso del anterior, porque el valor que se guarda es un objeto plano en vez de anidado.
**Por eso esta versión adopta el patrón MÁS SEGURO, ya probado sin fallas en 2 de los 4 índices reales (Aritmética 4° y Tecnología 4°): cada estudiante tiene su PROPIA clave de `localStorage`, única, con su nombre o id incluido en la clave misma.** Esto elimina por completo la posibilidad de que un estudiante pise a otro — no porque el código "fusione bien", sino porque estructuralmente nunca hay dos estudiantes escribiendo en el mismo lugar.
### 🔑 LA CLAVE EXACTA — UNA POR ESTUDIANTE, POR SEMANA, POR GRUPO
La clave exacta se deriva ÚNICAMENTE con la fórmula de **8-K**: `INDEX_KEY = PREFIX + '_' + NOMBRE_NORM + '_data'` (única por estudiante, semana y grupo). No se reconstruye aquí.
### 📦 ESTRUCTURA DEL OBJETO — PLANA, DE UN SOLO ESTUDIANTE (ya es seguro, porque la clave ya es única)
```javascript
// A diferencia de la v7.1, aquí SÍ es correcto un objeto plano — porque INDEX_KEY
// ya pertenece a un único estudiante, nunca se comparte con nadie más.
function construirEntradaEstudiante() {
  return {
    studentUser:      NOMBRE_NORM,           // 🔺 identidad — igual a la de la clave, nunca recalculada distinto
    studentName:      st.name,
    nota:             notaOficial(),                                  // (8-U): la MEJOR nota de todos los intentos, 0.0 a 5.0
    notaIntentoActual: calcTotal(),                                   // : nota del intento en curso (informativa)
    mejorIntento:     st.mejorIntento || 1,                           //
    intentos:         st.intentos || 1,                               //
    porcentajeAvance: Math.round((st.seen.size / SL.length) * 100),   // number, 0 a 100
    xp:               st.xp || 0,
    medallas:         st.badges || [],                               // array de strings (ids de badges)
    semaforo:         calcularSemaforoParticipacion(),                // 'verde' | 'amarillo' | 'rojo'
    ultimoAcceso:     new Date().toISOString(),
    vidasUsadas:      st.vidasUsadas || 0,
    semana:           CONFIG_CLASE.semana,                            // (8-V): sello — el index ignora la entrada si no coincide con la semana que muestra
    grupo:            GRUPO_NORM,                                     //
    claseId:          CLASE_ID,                                       //
    version:          1,                                              // (los campos nuevos son ADITIVOS: el index existente sigue leyendo igual)
  };
}
function calcularSemaforoParticipacion() {
  const pct = Math.round((st.seen.size / SL.length) * 100);
  const salidas = (st.salidas || []).length;
  if (pct === 0 || salidas > 20) return 'rojo';
  if (pct >= 70 && salidas <= 8) return 'verde';
  return 'amarillo';
}
```
### 🔒 syncIndex() — ESCRITURA DIRECTA, SIN NECESIDAD DE FUSIONAR NADA
> ⚠️ `INDEX_KEY` en el código de abajo es el que entrega la Prioridad 8-K (`PREFIX + '_' + NOMBRE_NORM + '_data'`), no `construirIndexKey()` — el resto de la lógica de `syncIndex()` (estructura del objeto, checklist, migración) sigue vigente tal cual.
```javascript
// 🔺🔺🔺 Como INDEX_KEY ya es única de este estudiante, syncIndex() puede escribir
// directamente, sin leer nada antes — no hay riesgo de pisar a otro estudiante,
// porque estructuralmente nadie más escribe jamás en esta misma clave.
function syncIndex() {
  if (st_modoSinGuardar) return;  // Prioridad 8-E — cero escritura sin identidad confiable
  if (!st.name || !NOMBRE_NORM) return;
  try {
    localStorage.setItem(INDEX_KEY, JSON.stringify(construirEntradaEstudiante()));
    // Registrar esta clave en el índice general de "clases guardadas", para que el
    // index.html pueda descubrir todas las claves existentes sin tener que adivinarlas
    const guardadas = JSON.parse(localStorage.getItem('clases_guardadas') || '[]');
    if (!guardadas.includes(INDEX_KEY)) {
      guardadas.push(INDEX_KEY);
      localStorage.setItem('clases_guardadas', JSON.stringify(guardadas));
    }
  } catch(e) { console.warn('Error al sincronizar con el índice:', e); }
}
```
### 🩹 MIGRACIÓN DE FORMATOS ANTIGUOS (nombre con/sin tildes, o formato de la v7.1)
```javascript
// Igual que en los índices reales ya corregidos (candidatosUsuario) — tolerar el
// nombre normalizado SIN tildes (oficial) pero seguir reconociendo el formato legacy
// (con tildes o con un formato de clave anterior), migrando en silencio.
function normalizarNombreLegacy(nombre) {
  return (nombre || '').trim().toLowerCase().replace(/\s+/g, '_');
}
function migrarFormatoAntiguoSiExiste() {
  if (!NOMBRE_NORM) return;
  const legacyUser = normalizarNombreLegacy(claseCtx?.studentName);
  if (legacyUser === NOMBRE_NORM) return; // no hay diferencia, nada que migrar
  const claveVieja = `${prefijoSemana(claseCtx?.area, claseCtx?.grado, GRUPO_NORM, claseCtx?.periodo, AUTOR_SEMANA_NUM)}_${legacyUser}_data`;
  const datosViejos = localStorage.getItem(claveVieja);
  if (datosViejos && !localStorage.getItem(INDEX_KEY)) {
    localStorage.setItem(INDEX_KEY, datosViejos); // migra el valor a la clave oficial
    localStorage.removeItem(claveVieja);           // limpia la clave vieja
  }
}
// Llamar migrarFormatoAntiguoSiExiste() UNA VEZ en el arranque, antes del primer syncIndex()
```
### ✅ VALIDACIÓN AL LEER (recomendación para el archivo index.html)
```javascript
function esEntradaValida(d) {
  if (!d || typeof d !== 'object') return false;
  if (typeof d.nota !== 'number' || d.nota < 0 || d.nota > 5) return false;
  if (typeof d.porcentajeAvance !== 'number' || d.porcentajeAvance < 0 || d.porcentajeAvance > 100) return false;
  if (!['verde','amarillo','rojo'].includes(d.semaforo)) return false;
  return true;
}
```
**CHECKLIST OBLIGATORIO — verificar SIEMPRE antes de entregar el código:**
```
[ ] 🔺 Se revisó el index.html REAL de la materia y construirIndexKey() copia EXACTAMENTE su patrón de clave
[ ] INDEX_KEY incluye SIEMPRE el nombre normalizado del estudiante en la clave misma — nunca es una clave compartida
[ ] syncIndex() escribe DIRECTAMENTE (localStorage.setItem), sin necesidad de leer/fusionar nada antes
[ ] SKEY (Prioridad 8-G) e INDEX_KEY (8-F) son claves DISTINTAS y con sufijos distintos ("_session" vs "_data")
[ ] 🔺🔺🔺 Ver Prioridad 8-J: TODAS las claves que syncIndex() escribe (INDEX_KEY y cualquier clave "personal"/"resumen" intermedia) se compararon una por una contra SKEY — ninguna coincide, ni por copiar/pegar ni por reusar la misma función que genera SKEY
[ ] Cada entrada tiene los campos del contrato: studentUser, studentName, nota (= notaOficial(), 8-U), porcentajeAvance, xp, medallas, semaforo, ultimoAcceso, vidasUsadas, version — más los campos aditivos v15.0: notaIntentoActual, mejorIntento, intentos, semana, grupo, claseId
[ ] migrarFormatoAntiguoSiExiste() se ejecuta una vez al arrancar, antes del primer syncIndex()
[ ] Probado con 2+ estudiantes del mismo grupo sincronizando la misma semana: cada uno tiene su propia clave, ninguno toca la del otro
```
### 🔄 SINCRONIZACIÓN EN VIVO DEL ÍNDICE (recomendación fuera del alcance de esta clase — aplica al archivo index.html)
```javascript
// Agregar esto en index.html, no en la clase — escucha cambios de localStorage y refresca el dashboard
window.addEventListener('storage', e => { if (sesionActiva) cargarDashboard(); });
document.addEventListener('visibilitychange', () => { if (!document.hidden && sesionActiva) cargarDashboard(); });
window.addEventListener('focus', () => { if (sesionActiva) cargarDashboard(); });
```
### 🛡️ SEGURIDAD E INTEGRIDAD ADICIONAL (recomendaciones para el archivo index.html)
Ver el **Prompt Maestro para index.html** (documento dedicado, compatible con este contrato), que desarrolla en detalle: rate-limit del PIN docente, backup automático con recordatorio, y versión de esquema para migraciones futuras.


## 🔺 PRIORIDAD 8-G · MÁXIMA — FUENTE ÚNICA DE VERDAD: IDENTIDAD DE SESIÓN Y RESTAURACIÓN EXACTA DEL AVANCE

### 🚨 ESTA ES LA PRIORIDAD MÁS IMPORTANTE DE TODO EL DOCUMENTO — TRIPLE PRIORIDAD
**Bug real detectado en producción:** varias clases muestran la nota correctamente sincronizada en el index, pero al volver a entrar el estudiante reinicia en el slide 1, con `st.seen` vacío, perdiendo todo el avance visual (aunque la nota sobreviva). **Causa raíz encontrada:** el documento fue acumulando, a través de las Prioridades 8, 8-B, 8-C, 8-D y 8-E, **varias declaraciones distintas y sucesivas** de `PREFIX`, `SKEY`, `load()` y `save()` — cada una pensada para resolver un problema puntual, pero sin anular formalmente a la anterior. Esto provoca que la función de auto-reparación (que busca una sesión guardada previamente) quede buscando un **formato de clave viejo** que ya no coincide con el formato nuevo, así que nunca la encuentra — y el sistema, al no encontrar coincidencia, trata al estudiante como si fuera nuevo: `st.slide = 0`, `st.seen = new Set()`. La nota sobrevive porque vive en una clave completamente aparte (Prioridad 8-F), por eso el síntoma es exactamente "la nota sí, el avance no".
### ⚖️ REGLA ABSOLUTA E INAPELABLE
**Esta sección 8-G es la ÚNICA fuente de verdad para identidad de sesión, `load()`, `save()` y `markSeen()`.** Anula y reemplaza CUALQUIER declaración de estas mismas funciones que aparezca en las Prioridades 8, 8-B, 8-C, 8-D u 8-E de este documento. Esas secciones siguen siendo válidas para todo lo demás que explican (autoguardado en capas, aislamiento conceptual, contrato con el índice, etc.), pero en cuanto a **el código exacto de `load()`/`save()`, SOLO se implementa el de la Prioridad 8-V (v15.0, que reemplaza el de esta sección) — nunca ambas versiones a la vez, nunca una mezcla de las dos.**
> **Claves:** `PREFIX` y `SKEY` se definen ÚNICAMENTE con la fórmula de **8-K** (y en el bloque de arranque de 8-V): `SKEY = \`${PREFIX}_${NOMBRE_NORM||'sinregistro'}_session\``. `load()`/`save()` son los de 8-V.
```
❌ PROHIBIDO ABSOLUTO: que el archivo HTML final tenga más de UNA declaración de "const PREFIX",
   más de UNA de "const SKEY", más de UNA "function load()" o más de UNA "function save()".
   Si al redactar el código aparecen dos versiones (una de una prioridad anterior y otra de esta
   Prioridad 8-G), se BORRA la anterior por completo y se deja SOLO el código de esta sección.
```
### 🔑 IMPLEMENTACIÓN ÚNICA Y DEFINITIVA — COPIAR EXACTAMENTE ASÍ, SIN VARIANTES
```javascript
// ═══ 1) Contexto de origen — index o acceso directo (Prioridad 8-E) ═══
let claseCtx = null;
try {
  const raw = sessionStorage.getItem('clase_contexto');
  if (raw) claseCtx = JSON.parse(raw);
} catch(e) { claseCtx = null; }

// ═══ 2) Modo sin guardar — SOLO advierte (Prioridad 8-E), nunca pide datos por formulario ═══
let st_modoSinGuardar = !(claseCtx && claseCtx.studentName && claseCtx.grupo);

// ═══ 3) Normalización — FUNCIÓN ÚNICA, reutilizada para nombre Y grupo, nunca reimplementada distinto ═══
function normalizarTexto(txt) {
  return (txt || '')
    .trim()
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita tildes
    .replace(/\s+/g, '_');
}
const NOMBRE_NORM = normalizarTexto(claseCtx?.studentName);
const GRUPO_NORM  = normalizarTexto(claseCtx?.grupo).replace(/_/g, ''); // ej: "501"

// ═══ 4) Identidad y clave de sesión — ÚNICA Y DEFINITIVA EN TODO EL ARCHIVO ═══
const IDENTIDAD_KEY = st_modoSinGuardar
  ? 'sinregistro_temporal'
  : `${GRUPO_NORM}_${NOMBRE_NORM}`;
// PREFIX/SKEY: NO se declaran aquí — la única fórmula válida es la de la Prioridad 8-K
// (PREFIX = claseCtx?.storagePrefix || prefijoRespaldo(); SKEY = `${PREFIX}_${NOMBRE_NORM||'sinregistro'}_session`).
// Se conserva IDENTIDAD_KEY porque buscarSesionHuerfanaPorIdentidad() (abajo) la sigue usando
// para reconocer formatos de clave antiguos al migrar sesiones guardadas antes de este fix.

// ═══ 5, 6 y 7) Auto-reparación, load() y save() — se implementan ÚNICAMENTE en el BLOQUE ÚNICO DE ARRANQUE
// de la Prioridad 8-V (secciones G, I y J de ese bloque), que añade el SELLO de semana/curso/grupo/estudiante,
// la mejor nota (8-U) y el modo sin guardar efímero. Implementar ÚNICAMENTE load()/save() de 8-V. ═══

// ═══ 8) markSeen() — DEBE guardar EN EL INSTANTE, no esperar al cambio de slide ═══
function markSeen() {
  if (!st.seen.has(st.slide)) {
    st.seen.add(st.slide);
    save(); // 🔺🔺🔺 CRÍTICO: si el estudiante cierra la pestaña a mitad de esta slide
             // (sin llegar a pulsar "Siguiente"), la marca de "vista" ya quedó guardada
  }
}

// ═══ 9) ORDEN DE ARRANQUE — el ÚNICO punto de entrada de la app, sin excepción ═══
document.addEventListener('DOMContentLoaded', function() {
  load();                    // 1️⃣ SIEMPRE primero — restaura slide, seen y todo lo demás
  render();                   // 2️⃣ SIEMPRE después — pinta ya en el slide restaurado
  setupModoFoco();
  actualizarBadgesCuadernos();
  updateVidasBtn();
  if (window.__avisoCtx) showToast(window.__avisoCtx);   // (8-V): contexto de otra semana descartado
  // ❌ PROHIBIDO: st.slide = 0 en este bloque, bajo cualquier circunstancia
  // ❌ PROHIBIDO: llamar render() antes que load()
  // ❌ PROHIBIDO: declarar una segunda vez PREFIX, SKEY, load() o save() en cualquier otra parte del archivo
});
```
### 🧪 PRUEBA OBLIGATORIA — SIMULAR MENTALMENTE ANTES DE ENTREGAR EL CÓDIGO
```
PASO 1: Estudiante entra desde el index, avanza hasta el slide 5, lee esa slide completa
        (el cronómetro de 12s termina, markSeen() se ejecuta y llama a save()).
PASO 2: Estudiante cierra la pestaña SIN hacer clic en "Siguiente" (o recarga con F5).
PASO 3: Estudiante vuelve a entrar (desde el index, o reabriendo el mismo archivo).
RESULTADO ESPERADO — OBLIGATORIO:
  ✅ st.slide debe ser 5 (no 0, no 1)
  ✅ st.seen debe incluir los índices 0,1,2,3,4,5 (todas las slides ya vistas)
  ✅ El cronómetro de la slide 5 NO debe volver a correr (st.acts['leido_'+id] ya estaba en true)
  ✅ La nota mostrada en el index debe coincidir exactamente con el porcentaje de avance real
Si cualquiera de estos puntos falla, el código tiene un error en PREFIX/SKEY/load()/save()
y debe corregirse ANTES de entregar — esta prueba es innegociable.
```
### 📋 CHECKLIST DE VERIFICACIÓN MANUAL — TRIPLE PRIORIDAD, REVISAR SIEMPRE
```
[ ] Existe UNA SOLA declaración de "const PREFIX" en todo el archivo HTML generado
[ ] Existe UNA SOLA declaración de "const SKEY" en todo el archivo HTML generado
[ ] Existe UNA SOLA "function load()" en todo el archivo HTML generado
[ ] Existe UNA SOLA "function save()" en todo el archivo HTML generado
[ ] Ninguna otra prioridad (8, 8-B, 8-C, 8-D, 8-E) dejó una segunda copia de estas declaraciones —
    si el borrador tenía otra versión, fue ELIMINADA y solo queda la de esta Prioridad 8-G
[ ] markSeen() llama a save() inmediatamente, no espera al cambio de slide
[ ] buscarSesionHuerfanaPorIdentidad() usa el MISMO NOMBRE_NORM que se usa para construir PREFIX
[ ] load() se ejecuta ANTES que render() en el único bloque DOMContentLoaded del archivo
[ ] Simulado el escenario de la PRUEBA OBLIGATORIA de arriba, con resultado ✅ en los 4 puntos
[ ] st.slide y st.seen sobreviven a: recarga (F5), cierre y reapertura de pestaña, y regreso desde el index
[ ] 🔺🔺🔺 Ver Prioridad 8-J: SKEY se comparó, línea por línea, contra cada `localStorage.setItem(...)` que aparece dentro de syncIndex() — SKEY no aparece ahí bajo ningún alias ni variable renombrada
```


## 🔴 PRIORIDAD 8-H · ABSOLUTA — BLINDAJE ANTI-TRAMPA DE NOTA: EL BOTÓN "ATRÁS" NUNCA PERMITE REPETIR NI INFLAR UN QUIZ

### 🚨 BUG CRÍTICO DE PRODUCCIÓN CONFIRMADO: LA NOTA SUBE CADA VEZ QUE SE VUELVE A UN QUIZ
**Diagnóstico exacto:** el botón "Atrás" mueve `st.slide` hacia un índice anterior sin pasar por ninguna validación. Cuando ese índice anterior es un slide `quiz`/`evalFinal` ya completado, si `rQuiz(s)` no verifica PRIMERO que ya está completo, el quiz aparece en blanco otra vez — permitiendo responder de nuevo. Como `responderQuiz()` suma a `st.aciertos` sin verificar si esa pregunta específica ya había sido contada, **la nota se infla cada vez que el estudiante repite el ciclo atrás → adelante → responder de nuevo**. Esto es exactamente el reporte real: "conteste un quiz y llevo 2.0 de nota, me devuelvo, está vacío de nuevo, contesto bien y ahora me sube la nota".
### ⚖️ REGLA ABSOLUTA E INAPELABLE
Un quiz/evalFinal con `st.acts['completado_'+id] === true` **NUNCA**, bajo ninguna ruta de navegación (Atrás, Adelante, recarga, menú de ruta, lo que sea), vuelve a mostrar preguntas — solo `renderResumenQuiz()`. Y **cada pregunta individual, una vez respondida, suma su acierto UNA SOLA VEZ para siempre**, con una marca a prueba de reintentos accidentales.

>  **v12.0 — Nueva Guardia 4:** `q_contada_<id>_<n>` **también** debe borrarse siempre que se borre `completado_<id>`/`quiz_idx_<id>`/`quiz_resps_<id>` (reintento, panel docente). Ver la función única `resetearEstadoQuiz()` en 8-P — no crear una versión propia de reseteo en ningún otro lugar del código.

```javascript
// ═══ 1) BOTÓN "ATRÁS" — v12.0: prevSlide() tiene UNA SOLA definición, en la Prioridad 8-O ═══
// Ya cumple esta regla de fábrica: NO resetea quiz_idx_, completado_, seen ni ninguna marca de actividad.
// HTML: <button id="btn-back" class="nav-btn" onclick="prevSlide()">← Atrás</button>

// ═══ 2) rQuiz() — v12.0: UNA SOLA definición, en la Prioridad 8-P ═══
// Ya cumple esta guardia como primera línea funcional: `if (st.acts['completado_'+s.id] === true) return renderResumenQuiz(s);`
// y retoma en `st.acts['quiz_idx_'+s.id] || 0` — nunca desde la pregunta 1.

// ═══ 3) responderQuiz() — CADA PREGUNTA SUMA SU ACIERTO UNA SOLA VEZ, con marca anti-duplicado ═══
// 🔺 Esta marca anti-duplicado sigue vigente, pero por sí sola NO alcanza contra clic rápido repetido
// sobre el MISMO botón antes de que el modal aparezca — ver Prioridad 8-M para el blindaje completo
// (guardia de índice + deshabilitar botones al instante + ignorar clics duplicados en silencio).
// ═══ 3) responderQuiz() — v12.0: UNA SOLA VERSIÓN, en la Prioridad 8-P ═══
// El código que estaba aquí (marca q_contada_ + avance del índice dentro del callback de un modal) se ELIMINÓ:
// dejaba la pregunta muerta si el estudiante recargaba antes de pulsar "Continuar". La regla de esta prioridad
// sigue igual —cada pregunta suma su acierto UNA sola vez, para siempre— y la cumple 8-P con la marca
// q_contada_ + el índice que avanza EN el clic + st.aciertos derivado siempre de quiz_resps_.

// ═══ 4) VERIFICACIÓN GLOBAL DE INTEGRIDAD ═══
// st.aciertos NUNCA es un contador libre — SIEMPRE se deriva de quiz_resps_. recalcularAciertosDesdeContadores()
// tiene UNA SOLA definición, en la Prioridad 8-P (la llaman responderQuiz() y calcTotal()/8-M en cada cálculo).
```
### 🧪 PRUEBA OBLIGATORIA — SIMULAR ANTES DE ENTREGAR
```
PASO 1: Estudiante responde Quiz 1 completo, nota queda en 2.0
PASO 2: Estudiante pulsa "Atrás" varias veces hasta llegar de nuevo al slide del Quiz 1
PASO 3: Estudiante pulsa "Siguiente" para volver a avanzar sobre ese mismo slide
RESULTADO ESPERADO — OBLIGATORIO:
  ✅ El slide del Quiz 1 muestra el RESUMEN (renderResumenQuiz), nunca preguntas en blanco
  ✅ No existe ningún botón para "responder de nuevo" una pregunta ya contada
  ✅ La nota sigue siendo exactamente 2.0 — no sube ni baja por navegar atrás/adelante
  ✅ Solo usar una vida (pedirReintento → confirmarReintento) puede volver a habilitar ese quiz
Si algún punto falla, hay un bug de navegación y debe corregirse antes de entregar — prueba innegociable.
```
**Checklist:**
```
[ ] prevSlide() existe como función única y NUNCA resetea acts/completado_/quiz_idx_
[ ] rQuiz() tiene la guardia "if (completado_+id) return renderResumenQuiz(s)" como PRIMERA línea funcional
[ ] responderQuiz() usa una marca única por pregunta (q_contada_+sId+pregIdx) y nunca vuelve a sumar esa pregunta
[ ] recalcularAciertosDesdeContadores() deriva st.aciertos SIEMPRE desde quiz_resps_, nunca de un contador suelto
[ ] Probada la navegación Atrás→Adelante sobre un quiz ya completo: la nota nunca cambia
[ ] Ningún botón, evento o slide permite "reabrir" preguntas de un quiz completado fuera del flujo de vidas (Prioridad 6)
```

## 🔴 PRIORIDAD 8-I · ABSOLUTA — TODAS LAS ACTIVIDADES SON PERMANENTES: NUNCA SE VACÍAN AL IR Y VENIR

### 🚨 REGLA DE ORO: LO YA HECHO, HECHO QUEDA — SIEMPRE, EN TODA ACTIVIDAD
Sopa de letras, drag, match, fill, tf, orden, explorador: **una vez que una actividad quedó marcada como completada, esa marca es DEFINITIVA para todo el intento actual.** Recargar la página, pulsar "Atrás", pulsar "Siguiente" varias veces, o cerrar y reabrir la pestaña **JAMÁS** debe borrar el estado guardado de ninguna actividad. Solo `confirmarReintento()` (Prioridad 6), que consume una vida, puede tocar los QUIZZES — ninguna otra actividad se resetea nunca, ni siquiera con una vida.
```javascript
// 🔺 GUARDIA UNIVERSAL — agregar al inicio de CADA función de render de actividad
// complementaria (rDrag, rMatch, rFill, rTF, rOrden, rInteractive):
function rDrag(s) {
  markSeen();
  if (st.acts['drag_done_'+s.id]) return renderResumenActividad(s, 'drag'); // 🔺 si ya se hizo, SOLO resumen — nunca en blanco de nuevo
  // ...resto de la función sin cambios...
}
// Aplicar el MISMO patrón (if ya_done → renderResumenActividad) en rMatch, rFill, rTF, rOrden, rInteractive.
// La sopa de letras (rWS) ya tiene su propia restauración (restaurarProgresoWS, Prioridad 0-D) —
// verificar que se llame SIEMPRE en cada render, no solo la primera vez que se abre.

// 🔺 Función genérica de "resumen" para actividades complementarias ya completadas —
// muestra lo que el estudiante ya hizo, sin poder rehacerla:
function renderResumenActividad(s, tipoLabel) {
  return `
    <div class="slide-title">${s.title}</div>
    <div style="background:#e8fff0;border:2px solid var(--success);border-radius:12px;padding:12px;margin-bottom:10px">
      <p style="font-family:var(--font-ui);color:var(--success);font-size:.85rem">
        ✅ Ya completaste esta actividad — tu avance quedó guardado
      </p>
    </div>
  `;
}
```
**Checklist:**
```
[ ] rDrag, rMatch, rFill, rTF, rOrden, rInteractive tienen la guardia "if (*_done_+id) return resumen" como primera línea
[ ] rWS (sopa de letras) llama restaurarProgresoWS(s.id) en CADA render, no solo la primera vez que se abre
[ ] Ninguna actividad complementaria se vacía al: recargar, pulsar Atrás, pulsar Siguiente repetidamente, cerrar/reabrir pestaña
[ ] Solo el flujo explícito de vidas (Prioridad 6) puede resetear QUIZZES — ninguna otra actividad se resetea nunca, ni siquiera con vidas
```


## 🔺 PRIORIDAD 8-J · MÁXIMA — LA SINCRONIZACIÓN CON EL ÍNDICE (8-F) NUNCA PUEDE ESCRIBIR SOBRE LA CLAVE DE SESIÓN (8-G) — CERO COLISIONES DE CLAVE

### 🚨 ESTA PRIORIDAD ANULA CUALQUIER IMPLEMENTACIÓN DE syncIndex() QUE NO LA CUMPLA LETRA POR LETRA — TRIPLE PRIORIDAD
**Bug real confirmado en producción (Tecnología 5°, Semana 1):** el estudiante contestaba el Quiz 1, veía su nota reflejada correctamente en el índice, salía de la clase y volvía a entrar — y la clase arrancaba otra vez en la slide 1, con el Quiz 1 en blanco, pidiéndole responder de nuevo. Al responder de nuevo, su nota quedaba duplicada.
**Causa raíz encontrada (código real, verificado línea por línea):** dentro de `syncIndex()` (Prioridad 8-F), la variable usada para guardar el "resumen personal" del estudiante (nota, aciertos, porcentaje — para uso del índice/panel docente) apuntaba **exactamente a la misma clave de `localStorage` que `SKEY`** (Prioridad 8-G), la clave que `save()`/`load()` usan para guardar el progreso COMPLETO de la sesión (`slide`, `seen`, `quizActs`, `acts`, `badges`...). Esto ocurrió porque esa variable se definió como `const KEY_PERSONAL = skey();` — reusando literalmente la función que genera `SKEY`, en vez de generar una clave propia y distinta.
La secuencia exacta del desastre, cada vez que se llamaba `save()`:
```
1) save()       → localStorage.setItem(SKEY, {slide, seen, quizActs, acts, badges, ...})   ✅ correcto
2) save()       → llama a syncIndex()
3) syncIndex()  → localStorage.setItem(KEY_PERSONAL, {nota, aciertos, porcentaje, ...})     ❌ KEY_PERSONAL === SKEY
                  → esto SOBREESCRIBE el objeto completo del paso 1 con un objeto que NO
                    tiene slide, ni seen, ni quizActs, ni acts, ni badges.
```
La siguiente vez que `load()` leía `SKEY`, encontraba el objeto-resumen (sin `slide`/`seen`/`quizActs`) en vez del objeto de sesión real. Por eso: `st.slide` volvía a `0`, `st.quizActs` quedaba vacío (el quiz se veía "no hecho" y se repetía), y `st.aciertos` sí sobrevivía (porque el resumen sí lo traía) — así que al repetir el quiz, `responderQuiz()` sumaba encima de un `aciertos` que ya no era cero, **duplicando la nota**.
### ⚖️ REGLA ABSOLUTA E INAPELABLE
**Ninguna línea de código dentro (o llamada desde) `syncIndex()`, ni de ninguna otra función de sincronización con el índice, puede ejecutar `localStorage.setItem(X, ...)` donde `X` sea igual a `SKEY`.** Esto aplica sin excepción a CUALQUIER clave que la función escriba: `INDEX_KEY`, un resumen "personal", un caché "anti-retroceso de nota", un log, lo que sea. Cada una de esas claves debe ser una función de generación de clave DISTINTA de la que genera `SKEY`, no un alias, no una copia por valor de la misma cadena, y jamás el resultado de llamar a la misma función (`skey()`/`SKEY`) sin transformarla.
```
❌ PROHIBIDO ABSOLUTO:              const KEY_PERSONAL = skey();              // idéntica a SKEY
❌ PROHIBIDO ABSOLUTO:              const KEY_PERSONAL = SKEY;                // idéntica a SKEY
❌ PROHIBIDO ABSOLUTO:              localStorage.setItem(SKEY, resumenPayload) // en cualquier función que no sea save()
✅ OBLIGATORIO:                     const KEY_PERSONAL = skey() + '_resumen'; // sufijo propio, nunca igual a SKEY
✅ TAMBIÉN VÁLIDO:                  const KEY_PERSONAL = PREFIX + '_resumen'; // usa el prefijo, nunca el SKEY completo
```
### 🔑 PATRÓN OBLIGATORIO — TODAS LAS CLAVES DE localStorage DE ESTE ARCHIVO, DECLARADAS JUNTAS Y CON SUFIJOS ÚNICOS
Para que sea imposible repetir este bug, **todas las claves de `localStorage` que use el archivo se declaran en un solo bloque, con sufijos que no se repiten entre sí**, nunca dispersas ni reconstruidas de formas distintas en cada función:
```javascript
// ═══ BLOQUE ÚNICO DE CLAVES — SKEY e INDEX_KEY se declaran SOLO en 8-K; aquí solo se añade KEY_RESUMEN y la guardia ═══
// 8-K:  SKEY      = `${PREFIX}_${NOMBRE_NORM || 'sinregistro'}_session`
// 8-K:  INDEX_KEY = `${PREFIX}_${NOMBRE_NORM || 'sinregistro'}_data`
const KEY_RESUMEN = `${PREFIX}_${NOMBRE_NORM || 'sinregistro'}_resumen`; // resumen personal para el panel docente / anti-retroceso de nota

// 🔺 GUARDIA DE ARRANQUE — se deja en el código entregado: si dos claves llegaran a coincidir, se ve en consola
// en vez de perder el progreso en silencio.
console.assert(SKEY !== KEY_RESUMEN, '🚨 COLISIÓN DE CLAVES: SKEY === KEY_RESUMEN — syncIndex() va a borrar el progreso de sesión');
console.assert(SKEY !== INDEX_KEY,   '🚨 COLISIÓN DE CLAVES: SKEY === INDEX_KEY — syncIndex() va a borrar el progreso de sesión');
console.assert(KEY_RESUMEN !== INDEX_KEY, '🚨 COLISIÓN DE CLAVES: KEY_RESUMEN === INDEX_KEY');
```
`save()` (Prioridad 8-G) es la ÚNICA función de todo el archivo que puede hacer `localStorage.setItem(SKEY, ...)`. Ninguna otra función — ni `syncIndex()`, ni el panel docente, ni ningún atajo de guardado manual — escribe jamás en `SKEY`.
### 🧪 PRUEBA OBLIGATORIA — SIMULAR MENTALMENTE ANTES DE ENTREGAR EL CÓDIGO (además de la prueba de la Prioridad 8-G)
```
PASO 1: Estudiante entra desde el index, completa el Quiz 1 por completo (todas sus preguntas).
PASO 2: Inmediatamente después de la última pregunta, save() se ejecuta y (dentro de save())
        syncIndex() también se ejecuta — revisar en el código exactamente qué claves toca.
PASO 3: Leer manualmente localStorage[SKEY] en ese instante (simulado).
RESULTADO ESPERADO — OBLIGATORIO:
  ✅ localStorage[SKEY] TODAVÍA contiene slide, seen y quizActs con el Quiz 1 marcado "completado: true"
  ✅ localStorage[SKEY] NO fue sobreescrito por el payload de syncIndex() en ningún momento
PASO 4: Estudiante cierra la pestaña y vuelve a abrir la clase (misma identidad).
RESULTADO ESPERADO — OBLIGATORIO:
  ✅ st.slide se restaura exactamente donde quedó (no vuelve a 0 ni a 1)
  ✅ Quiz 1 se muestra con renderResumenQuiz() (ya completado) — JAMÁS vuelve a mostrar preguntas en blanco
  ✅ st.aciertos es el mismo valor de antes de cerrar — nunca se duplica al volver a entrar
Si cualquiera de estos puntos falla, hay una colisión de claves entre syncIndex() y SKEY —
localizarla comparando, una por una, cada localStorage.setItem() del archivo contra el valor de SKEY.
```
### 📋 CHECKLIST DE VERIFICACIÓN MANUAL — TRIPLE PRIORIDAD, REVISAR SIEMPRE
```
[ ] Existe un ÚNICO bloque de declaración de claves (SKEY, KEY_RESUMEN, KEY_INDEX, y cualquier otra) — nada se reconstruye distinto en otra función
[ ] Los tres console.assert() de colisión de claves están presentes en el código entregado
[ ] Se buscó en TODO el archivo cada aparición de "localStorage.setItem(" y se verificó, una por una, que ninguna clave coincide con SKEY salvo la de save()
[ ] syncIndex() no contiene ninguna variable llamada "KEY_PERSONAL", "KEY_PROGRESO" ni similar que sea igual a skey()/SKEY — si el borrador la tenía, se le dio un sufijo propio distinto
[ ] Simulada la PRUEBA OBLIGATORIA de arriba con resultado ✅ en los 4 puntos
[ ] Ningún dato de "solo lectura para el panel docente" (nota, porcentaje, semáforo) vive jamás en la misma clave que el progreso real de la sesión
```


## 🔺 PRIORIDAD 8-K · MÁXIMA — SINCRONIZACIÓN DE CLAVES Y DE NOMBRE DE ARCHIVO CON EL INDEX

### 🚨 ESTA PRIORIDAD ANULA LA FÓRMULA DE `PREFIX`/`SKEY`/`INDEX_KEY` DE LAS PRIORIDADES 8-F Y 8-G — TRIPLE PRIORIDAD
**Bug real de sincronización (distinto del bug de colisión que resuelve 8-J):** aunque `SKEY` e `INDEX_KEY` no choquen entre sí (8-J), las Prioridades 8-F y 8-G construían el `PREFIX` del curso **cada una con su propia fórmula local** (`AUTOR_MATERIA_SIGLA`/`AUTOR_SEMANA_NUM`/`IDENTIDAD_KEY` en 8-G; `prefijoCurso()/prefijoSemana()` reimplementadas en 8-F). El `index.html` de ese mismo curso, en su Prioridad 5 (Contrato Universal de Lectura), ya calcula y **entrega** ese prefijo en `sessionStorage['clase_contexto'].storagePrefix` — pero nada obligaba a la clase a usar ese valor en vez de recalcularlo. Si la clase reconstruye el prefijo por su cuenta y se equivoca en un solo carácter (un guion, el orden de grado/período, una sigla distinta a la del index), el resultado es el síntoma exacto que reporta el docente: **la nota y el avance existen en el navegador del estudiante, pero el index nunca los encuentra.** A esto se suma un segundo problema, independiente del storage: si el **nombre del archivo HTML** de la clase no coincide, letra por letra, con el que el index tiene escrito en `INDEX_SEMANAS_META[n].archivo`, el botón de esa semana en el index simplemente no abre el archivo correcto.
### ⚖️ REGLA ABSOLUTA E INAPELABLE
**El `PREFIX` de esta clase NUNCA se reconstruye "a ojo" — se recibe del index (salvo que el contexto sea de otra semana: Prioridad 8-V).** Esta es la ÚNICA declaración válida de `PREFIX`, `SKEY` e `INDEX_KEY` de todo el documento; anula cualquier fórmula de estas mismas variables que aparezca en 8-F u 8-G.
```javascript
// ═══ ÚNICA declaración válida de PREFIX/SKEY/INDEX_KEY — anula 8-F y 8-G en este punto ═══

// 1) Contexto de origen (sin cambios respecto a 8-G)
let claseCtx = null;
try {
  const raw = sessionStorage.getItem('clase_contexto');
  if (raw) claseCtx = JSON.parse(raw);
} catch(e) { claseCtx = null; }
let st_modoSinGuardar = !(claseCtx && claseCtx.studentName && claseCtx.grupo);

// 2) Normalización — `normalizarTexto()` se declara UNA sola vez (8-G, paso 3); aquí se reutiliza y debe ser idéntica a `normalizarNombre()` del index.
const NOMBRE_NORM = normalizarTexto(claseCtx?.studentName);

// 3) y 4)  v15.0 — CONFIG_CLASE (valores LITERALES de la Prioridad 0 de esta sesión, nunca de un ejemplo), CLASE_ID, GRUPO_NORM,
// CTX_VALIDO, prefijoRespaldo() y PREFIX se declaran UNA SOLA VEZ, en el BLOQUE ÚNICO DE ARRANQUE de la Prioridad 8-V
// (secciones B, C y D). NO se repiten aquí. Regla de PREFIX: el del index SOLO si es de ESTA semana; si no, el respaldo
// `${area}_${grado}_${grupo||'sinregistro'}_p${periodo}_s${semana}` (misma fórmula de prefijoSemana() del index).
// ⚠️ El bloque de 8-V debe ir ANTES del paso 5 de abajo (SKEY/INDEX_KEY usan PREFIX).

// 5) Claves derivadas — sufijos fijos, nunca renombrados, nunca coincidentes entre sí (ver 8-J)
const SKEY      = `${PREFIX}_${NOMBRE_NORM || 'sinregistro'}_session`;
const INDEX_KEY = `${PREFIX}_${NOMBRE_NORM || 'sinregistro'}_data`;
console.assert(SKEY !== INDEX_KEY, '🚨 COLISIÓN: SKEY === INDEX_KEY — revisar sufijos');

// 6)  v15.0 — Autoverificación semana-index: YA NO solo avisa. Si claseCtx.semana ≠ CONFIG_CLASE.semana (o el
// storagePrefix no termina en _s{semana}) el contexto se DESCARTA (CTX_VALIDO=false) y la clase arranca en cero,
// avisando con showToast(window.__avisoCtx) al arrancar. Ver 8-V (secciones C y D). `mostrarToast` NO existe: es showToast.
```
`markSeen()` y el orden de arranque siguen siendo EXACTAMENTE los de la Prioridad 8-G. `load()` y `save()` son los de la Prioridad 8-V (con sello y mejor nota). Lo que cambia respecto de la 8-K original es de dónde sale `PREFIX` (solo del index si es de esta semana — 8-V).

### 🔒 CANDADO DE NOMBRE DE ARCHIVO — obligatorio, se verifica ANTES de entregar el archivo
El nombre con el que se guarda/entrega el HTML de esta clase **es copia carácter por carácter** del campo `.archivo` de la línea de `INDEX_SEMANAS_META` recogida en la Prioridad 0 — nunca un nombre "parecido" ni inventado. Patrón fijo cuando la semana es nueva: `semana{N}_{area}{grado}p{periodo}.html` (ej. `semana4_mat5p3.html`). Si la semana es nueva, la clase se entrega **junto con** la línea exacta que hay que agregar a `INDEX_SEMANAS_META` del index — nunca se entrega una sola de las dos partes.

### 🔗 Sincronía de metadatos (no solo de storage)
El tema/universo visual de esta clase (título, mascota, narrativa — Prioridad 0-F) debe ser el mismo que el index promete en `INDEX_SEMANAS_META[n].tema`/`.universo` para esta semana. Si el docente cambia el tema en un lado, se avisa explícitamente que hay que actualizarlo también en el otro — esto es texto libre, no se sincroniza solo.

### ✅ Checklist de esta prioridad (verificar SIEMPRE antes de entregar)
```
[ ] PREFIX viene de claseCtx.storagePrefix cuando existe — ninguna función reconstruye
    "area_grado_grupo_periodo" por su cuenta en ningún otro punto del archivo
[ ] SKEY e INDEX_KEY se derivan de ese mismo PREFIX con los sufijos fijos _session/_data
[ ] El nombre de archivo final coincide EXACTAMENTE con INDEX_SEMANAS_META[n].archivo del index
[ ] Si la semana es nueva, se entregó también la línea para agregar a INDEX_SEMANAS_META
[ ] El bloque de autoverificación semana-index (paso 6) está presente en el archivo entregado
[ ] El tema visual de la clase coincide con el tema declarado para esa semana en el index
[ ] Probado: registrar usuario en el index → abrir esta semana → completar un quiz → volver al
    index → la nota aparece en el dashboard sin recargar a mano
```


## 🔺 PRIORIDAD 8-L · MÁXIMA — BLINDAJE CONTRA LA SEMANA DUPLICADA EN PREFIX Y CONTRA EL COLAPSO DE SKEY/INDEX_KEY EN UNA SOLA CLAVE

### 🚨 Bug real documentado, encontrado auditando `semana1_mat4_p4.html` en producción
Un archivo de clase real, generado siguiendo (en teoría) la Prioridad 8-K, tenía **dos bugs concretos** que reproducen exactamente el síntoma "la nota sí, el avance no; siempre reinicia en slide 1":

**① La semana quedó duplicada en la clave.** `claseCtx.storagePrefix` que entrega el index **YA incluye la semana** (ej. `"mat_4_401_p4_s1"` — ver `prefijoSemana()` en el index). La clase, al construir su propia clave, volvió a pegarle la semana encima:
```javascript
// ❌ ANTI-PATRÓN REAL ENCONTRADO — NUNCA HACER ESTO:
function skey() { return PREFIX + '_s' + SEMANA_NUM + '_' + usuarioKey() + '_data'; }
// PREFIX ya es "mat_4_401_p4_s1" → resultado real: "mat_4_401_p4_s1_s1_juan_data"
// El index busca "mat_4_401_p4_s1_juan_data" (semana UNA sola vez) → JAMÁS coincide.
```
**② `SKEY` e `INDEX_KEY` colapsaron en una sola clave.** La 8-K ya exige que sean dos claves DISTINTAS con sufijos `_session`/`_data` — pero el archivo real usaba una única función (`skey()`, sufijo `_data`) tanto para guardar la sesión completa (`slide`, `seen`, `quizActs`) como para el resumen que sincroniza con el index. Como `save()` escribe primero la sesión completa ahí y, en la MISMA llamada, `syncIndex()` vuelve a escribir en esa idéntica clave un resumen SIN `slide` ni `seen`, el resultado es que **cada guardado se autodestruye a sí mismo un instante después**. Al reabrir, `load()` encuentra "algo" en esa clave (no está vacía) pero sin `slide` — y arranca en 0 sin siquiera mirar el respaldo de continuidad, porque ese respaldo solo se consulta cuando la clave principal está vacía, y aquí nunca lo estaba.

### ⚖️ REGLA ABSOLUTA — verificación obligatoria antes de entregar CUALQUIER clase
```
[ ] Si PREFIX viene de claseCtx.storagePrefix, NINGUNA función le vuelve a concatenar
    "_s" + SEMANA_NUM (ni "_p" + periodo, ni ningún otro fragmento que storagePrefix ya traiga).
    Antes de escribir SKEY/INDEX_KEY, imprimir en consola el resultado y confirmar a ojo que
    NO aparece la semana dos veces ni ningún segmento repetido.
[ ] SKEY (sufijo _session) es la ÚNICA clave que recibe la sesión completa (slide/seen/quizActs/etc.)
    vía save(). INDEX_KEY (sufijo _data) es la ÚNICA clave que recibe el resumen de syncIndex()
    (nota/porcentajeAvance/etc., SIN slide ni seen). Ninguna función escribe sesión completa en
    INDEX_KEY, ni escribe el resumen de syncIndex() en SKEY — son dos objetos de forma distinta,
    nunca deben compartir clave (esto ya lo exige 8-J; 8-L lo hace explícito con nombres de función).
[ ] load() SIEMPRE lee primero de SKEY (la clave de sesión completa) — nunca de INDEX_KEY. Si
    en algún punto del código load() o cualquier función de restauración lee de INDEX_KEY
    esperando encontrar slide/seen ahí, ese es el bug de 8-L reapareciendo.
[ ] Prueba obligatoria de simulación (no solo leer el código): guardar avance en la slide 10,
    completar un quiz, simular cierre/reapertura, y confirmar en consola que load() restaura
    slide 10 (no 0) Y que la clave que el index espera (INDEX_KEY) contiene datos legibles.
```
### 📌 Por qué esto no lo cubría ya la 8-K
La 8-K exige la fórmula correcta de `PREFIX`/`SKEY`/`INDEX_KEY` — y esa fórmula, seguida al pie de la letra, ya es correcta. Pero un asistente o desarrollador puede desviarse de ella al escribir el código real (nombrar todo con una sola función `skey()` ambigua, o volver a concatenar la semana "por si acaso") sin darse cuenta de que rompe el contrato. La 8-L existe para que, incluso si el código generado no copia textualmente el bloque de 8-K, se verifique explícitamente contra estos dos síntomas conocidos antes de entregar el archivo.

