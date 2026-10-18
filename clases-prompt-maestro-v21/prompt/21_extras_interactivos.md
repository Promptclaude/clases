---
modulo: 21_extras_interactivos
etapa_de_lectura: 3
prioridades: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
---

# 21 · Hotspots, vitrina, inicio, avatar, carta sorpresa, elige tu actividad, semáforo, transiciones, reacciones, slider, parallax

## 🟠 PRIORIDAD 19 · ALTA — IMÁGENES CON PUNTOS CALIENTES (HOTSPOTS) — ALTERNATIVA AL GRID 2×2

### 🔵 REGLA DE ORO: UNA IMAGEN GRANDE CON PUNTOS TOCABLES, EN VEZ DE 4 FOTOS FIJAS
Como alternativa al grid 2×2 de imágenes obligatorio en cada slide de concepto (Prioridad 1), se puede usar — en algunos slides de concepto, no necesariamente todos — **una sola imagen grande de Unsplash con 3 o 4 puntos marcados (hotspots)** que el estudiante toca para revelar un dato, definición o ejemplo relacionado con esa parte de la imagen. Es más interactivo que solo mirar fotos estáticas.
**Reglas de los hotspots:**
- Cada hotspot es un círculo pulsante posicionado sobre un punto relevante de la imagen (ej. una pieza del computador, una parte de una célula, un elemento de un mapa)
- Al tocar un hotspot, se revela un dato breve (1 línea) — mediante un toast o un popover pequeño, nunca un modal que bloquee la lectura
- Cada imagen usada en este patrón sigue contando para el mínimo de 20 imágenes reales de la Prioridad 1 — pero como reemplaza a 4 imágenes por 1, el autor debe compensar usando el patrón de grid 2×2 en más slides, o combinando varios slides con hotspots, para no bajar del total de 20
- No reemplaza la regla de `alt` descriptivo ni el sistema de fallback emoji (Prioridad 1) — el hotspot es una capa adicional sobre la imagen, no un reemplazo de sus reglas base
```html
<!-- Patrón de imagen con hotspots — alternativa al grid 2×2 en un slide de concepto -->
<div class="hotspot-container">
  <img src="https://images.unsplash.com/photo-[ID]?w=500&h=320&fit=crop&auto=format&q=80"
       alt="[descripción]" loading="lazy" class="hotspot-img">
  <!-- 3-4 puntos, posicionados con top/left en % sobre la imagen -->
  <button class="hotspot-punto" style="top:28%;left:22%" onclick="mostrarHotspot('[Dato breve 1]')">+</button>
  <button class="hotspot-punto" style="top:55%;left:60%" onclick="mostrarHotspot('[Dato breve 2]')">+</button>
  <button class="hotspot-punto" style="top:70%;left:30%" onclick="mostrarHotspot('[Dato breve 3]')">+</button>
</div>
```
```javascript
function mostrarHotspot(dato) {
  showToast('💡 ' + dato);
  if (!st.acts['hotspot_click_'+st.slide]) {
    st.acts['hotspot_click_'+st.slide] = true;
    save(); // registra interacción formativa — nunca afecta la nota (Prioridad 18-A)
  }
}
```
```css
.hotspot-container { position: relative; border-radius: 12px; overflow: hidden; border: 4px solid var(--primary); box-shadow: 0 3px 0 var(--primary-dark); }
.hotspot-img { width: 100%; height: 220px; object-fit: cover; display: block; }
.hotspot-punto {
  position: absolute; width: 30px; height: 30px; border-radius: 50%;
  background: var(--accent); color: #000; border: 3px solid #fff;
  font-family: var(--font-ui); font-weight: 900; font-size: 1rem;
  cursor: pointer; animation: hotspot-pulse 1.4s infinite;
  transform: translate(-50%,-50%);
}
@keyframes hotspot-pulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(255,215,0,.6); }
  50%     { box-shadow: 0 0 0 10px rgba(255,215,0,0); }
}
```
**Nota importante:** este patrón es OPCIONAL y complementario al grid 2×2 (Prioridad 1) — el autor decide en qué slides de concepto usar cada estilo, según lo que mejor se preste para el tema. Los clics en los hotspots son formativos, nunca afectan la nota (Prioridad 18-A).

## 🟠 PRIORIDAD 20 · ALTA — VITRINA DE LOGROS ACUMULADOS ENTRE SEMANAS

### 🏆 REGLA DE ORO: LAS MEDALLAS SE ACUMULAN ENTRE CLASES, NO SOLO EN LA DE HOY
Además del sistema de badges de la clase actual (Prioridad 15), debe existir una **galería acumulada** — accesible desde un botón fijo en el navbar, igual que los cuadernos — que muestre TODAS las medallas que el estudiante ha ganado en TODAS las clases anteriores de esa materia, no solo en la de hoy. Es como una estantería de trofeos que crece semana a semana, dando sensación de progreso a largo plazo más allá de la nota de una sola clase.
**Reglas de la vitrina de logros:**
- Botón fijo en el navbar: "🏆 Mis Logros"
- Se abre como panel flotante (`showModalGrande`), igual que los cuadernos — nunca es un slide, nunca bloquea nada
- Usa como identidad la MISMA base estable que ya se usa para la nota y el slide (nombre normalizado del estudiante, Prioridad 8-D) — así nunca se mezclan logros entre estudiantes distintos, ni se pierden al pasar de una semana a otra
- Cada medalla nueva ganada en CUALQUIER clase de la materia se agrega a esta galería acumulada, indicando en qué semana se ganó
- Si el estudiante aún no tiene medallas, muestra un mensaje amable invitándolo a ganar la primera — nunca un espacio vacío sin contexto
```javascript
// ═══ CLAVE ACUMULADA — independiente de la semana actual, dura toda la materia ═══
// Usa NOMBRE_NORM (Prioridad 8-D) para que cada estudiante tenga su propia vitrina
const LOGROS_KEY = `${AUTOR_MATERIA_SIGLA}_logros_${NOMBRE_NORM}`;
// ═══ Registrar un logro nuevo — llamar junto al sistema de badges de la Prioridad 15,
// cada vez que se otorga una medalla en la clase actual ═══
function registrarLogroAcumulado(badgeId, nombreBadge, emojiBadge) {
  try {
    let logros = JSON.parse(localStorage.getItem(LOGROS_KEY) || '[]');
    const yaExiste = logros.some(l => l.semana === AUTOR_SEMANA_NUM && l.badgeId === badgeId);
    if (!yaExiste) {
      logros.push({
        semana: AUTOR_SEMANA_NUM,
        badgeId, nombre: nombreBadge, emoji: emojiBadge || '🏆',
        fecha: new Date().toLocaleDateString('es-CO'),
      });
      localStorage.setItem(LOGROS_KEY, JSON.stringify(logros));
    }
  } catch(e) {}
}
// ═══ Abrir la vitrina de logros ═══
function abrirVitrinaLogros() {
  showModalGrande(`
    <div class="nb-modal-header">
      <span>🏆 Mis Logros — ${AUTOR_MATERIA_FALLBACK}</span>
      <button onclick="closeModalGrande()" class="nb-modal-close">✕</button>
    </div>
    <div style="padding:16px">${renderVitrinaLogros()}</div>
  `);
}
function renderVitrinaLogros() {
  let logros = [];
  try { logros = JSON.parse(localStorage.getItem(LOGROS_KEY) || '[]'); } catch(e) {}
  if (logros.length === 0) {
    return `
      <div style="text-align:center;padding:20px 10px">
        <div style="font-size:2.5rem;margin-bottom:8px">🏆</div>
        <p style="font-size:.88rem;color:var(--text2)">
          Aún no tienes medallas — ¡sigue esforzándote, pronto ganarás la primera! 💪
        </p>
      </div>
    `;
  }
  // Ordenar por semana, más reciente primero
  const ordenados = [...logros].sort((a,b) => b.semana - a.semana);
  return `
    <div class="vitrina-grid">
      ${ordenados.map(l => `
        <div class="vitrina-trofeo">
          <span class="vitrina-ico">${l.emoji}</span>
          <p class="vitrina-nombre">${l.nombre}</p>
          <span class="vitrina-fecha">Semana ${l.semana} · ${l.fecha}</span>
        </div>
      `).join('')}
    </div>
  `;
}
```
```html
<!-- Botón fijo en el navbar, junto a los cuadernos y "Mis herramientas" -->
<button class="nav-btn" onclick="abrirVitrinaLogros()" title="Ver todas tus medallas">
  🏆 Mis Logros
</button>
```
```css
.vitrina-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(110px,1fr)); gap: 12px;
}
.vitrina-trofeo {
  background: linear-gradient(180deg,#fffde7,#fff3cd);
  border: 3px solid var(--gold); border-radius: 12px; padding: 12px 8px;
  text-align: center; box-shadow: 0 3px 0 #cc9a00;
}
.vitrina-ico { font-size: 2rem; display: block; margin-bottom: 4px; }
.vitrina-nombre { font-family: var(--font-ui); font-size: .74rem; color: var(--primary-dark); margin-bottom: 4px; }
.vitrina-fecha { font-size: .62rem; color: var(--muted); }
```
**Importante:** esta vitrina NUNCA afecta la nota (Prioridad 18-A) — es puramente motivacional y de reconocimiento acumulado. La clave `LOGROS_KEY` debe persistir entre semanas (nunca se borra al iniciar una nueva clase), y solo se resetea si el docente lo hace explícitamente desde el Panel Docente (Prioridad 16).

## 🟠 PRIORIDAD 21 · ALTA — BOTÓN FIJO "🏠 INICIO": GUARDA, SINCRONIZA Y VUELVE AL INDEX

### 🏠 REGLA DE ORO: UN SOLO CLIC GUARDA, SINCRONIZA Y LLEVA AL INDEX — EN ESE ORDEN
Debe existir un botón **fijo y siempre visible** en el navbar, con ícono de casa (🏠), que el estudiante reconozca de inmediato como "el camino de regreso seguro". Al presionarlo, la clase primero **guarda** el progreso, luego **sincroniza** con el index, muestra una confirmación visual breve, y solo DESPUÉS navega hacia el index — nunca al revés, y nunca salta directo sin guardar.
```html
<!-- Botón fijo en el navbar, siempre visible — icono de casa, posición constante -->
<button id="btn-inicio" class="nav-btn" onclick="volverAlIndex()" title="Guardar y volver al index">
  🏠 Inicio
</button>
```
```javascript
// ═══ URL DEL INDEX — el autor la define en los DATOS A COMPLETAR ═══
const INDEX_URL = '[URL o ruta relativa al index.html de la materia]';
function volverAlIndex() {
  // 1️⃣ Guardar SIEMPRE primero
  save();
  // 2️⃣ Sincronizar con el index (nota, progreso, slide, vidas — Prioridad 8)
  syncIndex();
  // 3️⃣ Confirmación visual breve — el estudiante VE que se guardó antes de salir
  showToast('💾 Guardado · 🔄 Sincronizado — volviendo al index...');
  // 4️⃣ Navegar al index, con una pequeña pausa para que el estudiante alcance a leer el toast
  setTimeout(() => {
    if (INDEX_URL) {
      window.location.href = INDEX_URL;
    } else if (window.history.length > 1) {
      window.history.back(); // respaldo si no hay INDEX_URL configurada
    } else {
      window.close(); // último respaldo si la clase se abrió en una pestaña nueva desde el index
    }
  }, 900);
}
```
```css
#btn-inicio {
  background: linear-gradient(180deg, #fff, #f0f0f0);
  border: 2.5px solid var(--primary);
  color: var(--primary-dark);
  font-weight: 900;
}
#btn-inicio:hover { transform: translateY(-2px); box-shadow: 0 4px 0 var(--primary-dark); }
```
**Reglas del botón de Inicio:**
- Posición FIJA en el navbar — siempre en el mismo lugar, para que el estudiante lo memorice como "mi salida segura"
- SIEMPRE guarda y sincroniza ANTES de navegar — nunca redirige primero y guarda después
- Muestra confirmación visual (toast) antes de salir, para que el estudiante sepa que su avance quedó a salvo
- Funciona igual sin importar en qué slide esté el estudiante, incluso a mitad de un quiz sin terminar (guarda el progreso parcial tal como está — el quiz retoma exactamente ahí al volver, Prioridad 18-B)
- Si `INDEX_URL` no está configurada por el autor, usa `history.back()` como respaldo automático — nunca debe quedar un botón que no haga nada
**Checklist de verificación:**
```
[ ] Botón "🏠 Inicio" fijo y siempre visible en el navbar, en la misma posición
[ ] volverAlIndex() llama save() y syncIndex() ANTES de cualquier redirección
[ ] Toast de confirmación visible antes de navegar fuera de la clase
[ ] INDEX_URL definida por el autor en los datos a completar; si falta, hay respaldo con history.back()
[ ] Funciona igual en cualquier slide, incluso con un quiz a medio contestar (guarda el progreso parcial)
```

## 🟠 PRIORIDAD 22 · ALTA — AVATAR PROPIO: EL ESTUDIANTE ELIGE SU MASCOTA

### 🧑‍🚀 REGLA DE ORO: EL ESTUDIANTE ELIGE, NO SE LE ASIGNA
En el slide `intro`, antes de comenzar el recorrido, el estudiante elige entre 3-4 opciones de avatar/mascota (acordes al universo visual de la semana, Prioridad 0-F). Esa elección lo acompaña durante toda la clase — en el HUD, en el mapa de camino (Prioridad 10-D) y en la pantalla final. Nunca afecta la nota (Prioridad 18-A); es pura identidad y diversión.
```javascript
// AVATARES_TEMA — el autor los define según TEMA_VISUAL, ej. para Minecraft:
// const AVATARES_TEMA = ['⛏️','🧟','🐷','💎'];
function renderSelectorAvatar() {
  const opciones = AVATARES_TEMA || ['🧑‍🚀','🦸','🧙','🐉'];
  return `
    <p style="font-family:var(--font-ui);color:var(--primary-dark);font-size:.95rem;margin-bottom:10px">
      🎭 Elige tu avatar para esta clase:
    </p>
    <div class="avatar-opciones">
      ${opciones.map(a => `
        <button class="avatar-btn ${st.avatarElegido===a?'avatar-sel':''}" onclick="elegirAvatar('${a}')">
          ${a}
        </button>
      `).join('')}
    </div>
  `;
}
function elegirAvatar(emoji) {
  st.avatarElegido = emoji;
  save();
  showToast('✅ ¡Avatar elegido! Te acompañará toda la clase');
  render();
}
```
```css
.avatar-opciones { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 14px; }
.avatar-btn {
  font-size: 2rem; width: 64px; height: 64px; border-radius: 16px;
  background: #fff; border: 3px solid var(--primary-light); cursor: pointer; transition: .15s;
}
.avatar-btn:hover { transform: translateY(-3px); border-color: var(--accent); }
.avatar-btn.avatar-sel { border-color: var(--primary); background: var(--primary-light); box-shadow: 0 3px 0 var(--primary-dark); }
```
**Integración obligatoria:** el avatar elegido (`st.avatarElegido`) reemplaza el ícono fijo `AVATAR_TEMA_ICONO` en el mapa de camino (Prioridad 10-D) y en cualquier lugar del HUD donde se muestre un avatar — con `AVATAR_TEMA_ICONO` solo como respaldo si el estudiante aún no ha elegido. Nunca bloquea el avance si no se elige (queda un emoji por defecto), pero sí se anima a elegir con el toast de confirmación.
**Checklist:**
```
[ ] Selector de avatar visible en el slide intro, con 3-4 opciones según el tema visual
[ ] st.avatarElegido persiste en localStorage — no se pierde al recargar
[ ] El avatar elegido se usa en el HUD y en el mapa de camino (Prioridad 10-D), con AVATAR_TEMA_ICONO como respaldo
[ ] Elegir avatar NUNCA afecta la nota ni bloquea el avance de ninguna slide
```

## 🟠 PRIORIDAD 23 · ALTA — CARTA SORPRESA: BONUS FORMATIVO ALEATORIO

### 🎴 REGLA DE ORO: UN PEQUEÑO IMPREVISTO DIVERTIDO, NUNCA UN RIESGO PARA LA NOTA
Cada cierto tramo de la clase (por ejemplo, al completar una actividad complementaria), existe una probabilidad de que aparezca una "carta sorpresa" — un mini-evento formativo aleatorio: un mensaje motivacional especial, un accesorio cosmético para el avatar, o un pequeño empujón de XP. Refresca la secuencia con algo impredecible, sin ningún riesgo académico.
```javascript
// SORPRESAS_CARTA — el autor puede personalizar el contenido de cada tipo
const SORPRESAS_CARTA = [
  { tipo: 'xp', valor: 15, texto: '¡Carta de energía! +15 XP de regalo 🔋' },
  { tipo: 'mensaje', texto: '¡Sigue así! Cada esfuerzo cuenta, aunque no se vea de inmediato 🌟' },
  { tipo: 'accesorio', valor: '🎩', texto: '¡Desbloqueaste un accesorio para tu avatar! 🎩' },
];
// Llamar tras completar una actividad complementaria (drag/match/fill/orden/wordsearch) —
// NUNCA tras un quiz o evalFinal, para no distraer de lo evaluable
function intentarCartaSorpresa() {
  const probabilidad = 0.35; // 35% de probabilidad — ajustable
  if (Math.random() > probabilidad) return; // no siempre sale, así se siente sorpresa real
  const carta = SORPRESAS_CARTA[Math.floor(Math.random() * SORPRESAS_CARTA.length)];
  mostrarCartaSorpresa(carta);
}
function mostrarCartaSorpresa(carta) {
  if (carta.tipo === 'xp' && typeof gainPts === 'function') gainPts(carta.valor);
  if (carta.tipo === 'accesorio') {
    st.avatarAccesorios = st.avatarAccesorios || [];
    if (!st.avatarAccesorios.includes(carta.valor)) st.avatarAccesorios.push(carta.valor);
    save();
  }
  showModal(`
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:3rem;margin-bottom:8px;animation:floatY 1s infinite">🎴</div>
      <h2 style="font-family:var(--font-ui);color:var(--primary);font-size:1.1rem;margin-bottom:10px">
        ¡Carta sorpresa!
      </h2>
      <p style="font-size:.9rem;color:var(--text2);line-height:1.7;margin-bottom:16px">${carta.texto}</p>
      <button class="mbtn" onclick="closeModal()" style="width:100%">✨ ¡Genial!</button>
    </div>
  `);
}
```
**Reglas de la carta sorpresa:**
- NUNCA aparece durante un quiz, evalFinal, ni ninguna actividad evaluable — solo tras actividades complementarias sin nota
- La probabilidad NUNCA es 100% — debe sentirse como una sorpresa real, no como un paso más del recorrido
- Ningún premio de la carta (XP, accesorio, mensaje) afecta la nota (Prioridad 18-A) — es puramente formativo/cosmético
**Checklist:**
```
[ ] intentarCartaSorpresa() se llama SOLO tras actividades complementarias sin nota, nunca tras evaluables
[ ] La probabilidad de aparición es menor al 100% (ej. 30-40%)
[ ] Ningún premio de la carta afecta st.aciertos ni calcTotal()
[ ] SORPRESAS_CARTA es personalizable por el autor de la clase
```

## 🟠 PRIORIDAD 24 · ALTA — ELIGE TU ACTIVIDAD": CONTROL DEL ESTUDIANTE EN COMPLEMENTARIAS

### 🎯 REGLA DE ORO: EL ESTUDIANTE DECIDE CÓMO DEMOSTRAR LO QUE SABE
En vez de forzar un único tipo de actividad complementaria (drag, match, fill u orden) en un slide, se puede ofrecer **una elección entre 2 tipos** para cumplir ese mismo punto del recorrido — el estudiante elige la que prefiera. Da sensación de control real sin bajar la exigencia pedagógica ni cambiar las reglas de bloqueo (Prioridad 0-C).
```javascript
// Slide tipo 'complementaria-eleccion' — define 2 sub-actividades equivalentes
// {
// type: 'complementaria-eleccion',
// opciones: [
// { tipo: 'drag',  id: 'act_a', config: {...} },
// { tipo: 'match', id: 'act_b', config: {...} },
// ]
// }
function rComplementariaEleccion(s) {
  markSeen();
  const elegida = st.acts['eleccion_'+s.id]; // 'act_a' o 'act_b', una vez elegida no cambia
  if (!elegida) {
    return `
      <div class="slide-title">${s.title}</div>
      <p class="slide-sub">🎯 Elige cómo quieres demostrar lo que aprendiste:</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:14px">
        ${s.opciones.map(op => `
          <button class="mbtn" style="flex:1;min-width:160px" onclick="elegirActividad('${s.id}','${op.id}')">
            ${op.tipo === 'drag' ? '🧲 Arrastrar y soltar' : op.tipo === 'match' ? '🔗 Emparejar' : op.tipo === 'fill' ? '✏️ Completar espacios' : '🔢 Ordenar'}
          </button>
        `).join('')}
      </div>
    `;
  }
  // Ya eligió — renderizar la sub-actividad elegida con su función normal (rDrag, rMatch, etc.)
  const opcionElegida = s.opciones.find(o => o.id === elegida);
  return renderActividadPorTipo(opcionElegida); // reutiliza las funciones ya existentes por tipo
}
function elegirActividad(sId, opId) {
  st.acts['eleccion_'+sId] = opId;
  save();
  render();
}
// AGREGAR a puedeAvanzar(s) (Prioridad 0-C), junto a los demás casos:
// case 'complementaria-eleccion': {
// const elegida = st.acts['eleccion_'+s.id];
// if (!elegida) return false; // debe elegir primero
// return !!st.acts[elegida+'_done_'+s.id]; // se desbloquea igual que cualquier complementaria
// }
```
**Reglas de "elige tu actividad":**
- Una vez elegida la actividad, esa elección queda fija para ese intento — no se puede cambiar de opinión a mitad de camino
- Ambas opciones deben ser equivalentes en dificultad y en tiempo — ninguna debe ser "la fácil" evidente
- Se desbloquea con la misma regla que cualquier complementaria (Prioridad 0-C): contestar, bien o mal
- NUNCA afecta la nota — sigue siendo una actividad complementaria sin nota
**Checklist:**
```
[ ] Slide tipo 'complementaria-eleccion' ofrece 2 opciones equivalentes en dificultad
[ ] La elección queda fija una vez tomada — no se puede cambiar a mitad de actividad
[ ] puedeAvanzar() maneja el nuevo tipo igual que las demás complementarias (contestar desbloquea)
[ ] Esta actividad sigue sin afectar la nota (Prioridad 18-A)
```

## 🟠 PRIORIDAD 25 · ALTA — SEMÁFORO DE CONFIANZA ANTES DE CADA QUIZ

### 🚦 REGLA DE ORO: EL ESTUDIANTE SE AUTOEVALÚA ANTES DE RESPONDER, SIN RIESGO
Justo antes de iniciar cada quiz (`quiz1`, `quiz2`, `evalFinal`), se le pregunta al estudiante qué tan seguro se siente con el tema, usando un semáforo simple (🟢🟡🔴). Es puramente reflexivo — nunca afecta la nota — y le da al docente, desde el Panel Docente (Prioridad 16), un dato valioso: confianza percibida vs. resultado real.
```javascript
// Llamar ANTES de renderizar la primera pregunta de un quiz, si aún no se ha registrado confianza
function rSemaforoConfianza(sId, callbackContinuar) {
  return `
    <div class="slide-title">🚦 Antes de empezar...</div>
    <p class="slide-sub">¿Qué tan seguro te sientes con este tema?</p>
    <div style="display:flex;gap:14px;justify-content:center;margin:20px 0">
      <button class="semaforo-btn" onclick="registrarConfianza('${sId}','verde','${callbackContinuar}')">🟢<br><span>Muy seguro</span></button>
      <button class="semaforo-btn" onclick="registrarConfianza('${sId}','amarillo','${callbackContinuar}')">🟡<br><span>Más o menos</span></button>
      <button class="semaforo-btn" onclick="registrarConfianza('${sId}','rojo','${callbackContinuar}')">🔴<br><span>Inseguro</span></button>
    </div>
    <p style="font-size:.76rem;color:var(--muted);text-align:center">
      Esto no afecta tu nota — es solo para que tu profe entienda mejor cómo te sientes 💬
    </p>
  `;
}
function registrarConfianza(sId, nivel, callbackContinuar) {
  st.acts['confianza_'+sId] = nivel; // se guarda para el Panel Docente, nunca para la nota
  save();
  render(); // continúa al quiz normalmente (rQuiz ya revisa que confianza_+id exista)
}
// AGREGAR en rQuiz(s) (Prioridad 5), justo antes de mostrar la primera pregunta:
// if (!st.acts['confianza_'+s.id] && !st.acts['completado_'+s.id]) return rSemaforoConfianza(s.id);
```
```css
.semaforo-btn {
  background: #fff; border: 3px solid var(--primary-light); border-radius: 16px;
  padding: 14px 18px; font-size: 1.8rem; cursor: pointer; transition: .15s;
  display: flex; flex-direction: column; align-items: center; gap: 6px;
}
.semaforo-btn span { font-size: .68rem; font-family: var(--font-ui); color: var(--text2); }
.semaforo-btn:hover { transform: translateY(-3px); border-color: var(--accent); }
```
**Integración con el Panel Docente (Prioridad 16):** el tab "Stats" puede mostrar, junto a cada quiz, el nivel de confianza que el estudiante marcó antes de responder (`st.acts['confianza_'+quizId]`) comparado con su resultado real — dato útil para detectar, por ejemplo, estudiantes que se sienten muy seguros pero fallan mucho (posible exceso de confianza) o al revés (inseguridad injustificada).
**Reglas del semáforo de confianza:**
- Aparece UNA sola vez por quiz, antes de la primera pregunta — nunca se repite si el estudiante ya respondió parte del quiz
- Es completamente reflexivo — ninguna opción es "correcta" ni afecta `calcTotal()`
- Nunca bloquea el avance más allá de elegir una opción (elegir cualquiera de las 3 continúa al quiz de inmediato)
**Checklist:**
```
[ ] rSemaforoConfianza() aparece antes de la primera pregunta de quiz1, quiz2 y evalFinal
[ ] st.acts['confianza_'+id] persiste y nunca afecta st.aciertos ni calcTotal()
[ ] No vuelve a preguntar si el estudiante ya avanzó en ese quiz (revisa confianza_+id antes de mostrar)
[ ] Panel Docente (Prioridad 16) puede mostrar confianza vs. resultado real, si se desea potenciar esa vista
```


## 🟠 PRIORIDAD 26 · ALTA — TRANSICIONES ANIMADAS ENTRE SLIDES, CON DIRECCIÓN

### 🎬 REGLA DE ORO: LA CLASE SE SIENTE COMO UNA APP, NUNCA COMO UN DOCUMENTO QUE SE RECARGA
Cada vez que `render()` cambia el contenido, debe aplicarse una animación breve de deslizamiento + desvanecido — y la DIRECCIÓN depende de si el estudiante avanza o retrocede.

```javascript
// En render() (Prioridad 8-O), en vez de wrap.innerHTML = html directo:
let _pd_slidePrevio = 0;
function pintarConDireccion(wrap, html) {
  const direccion = st.slide >= _pd_slidePrevio ? 'next' : 'back';
  _pd_slidePrevio = st.slide;
  wrap.classList.remove('slide-enter-next','slide-enter-back');
  wrap.innerHTML = html;                       // 🔺 SÍNCRONO — nunca dentro de un setTimeout
  void wrap.offsetWidth;                        // fuerza reflow para que la animación de reinicie siempre
  wrap.classList.add(direccion === 'next' ? 'slide-enter-next' : 'slide-enter-back');
}
```
```css
#slide-wrap { position: relative; }
.slide-enter-next { animation: slideInRight .28s cubic-bezier(.22,.9,.32,1) both; }
.slide-enter-back  { animation: slideInLeft  .28s cubic-bezier(.22,.9,.32,1) both; }
@keyframes slideInRight  { from { opacity:0; transform: translateX(24px); } to { opacity:1; transform: translateX(0); } }
@keyframes slideInLeft   { from { opacity:0; transform: translateX(-24px); } to { opacity:1; transform: translateX(0); } }
@media (prefers-reduced-motion: reduce) { .slide-enter-next, .slide-enter-back { animation: none !important; } }
```
**Reglas:**
- El HTML se escribe siempre de forma síncrona — la animación es un efecto puramente visual que nunca retrasa el contenido ni el cronómetro.
- Duración ~280ms — nunca más lento, para no frustrar al estudiante que navega rápido.
- Dirección: derecha→izquierda al avanzar (`nextSlide`), izquierda→derecha al retroceder (`prevSlide`, 8-O).
- Respeta `prefers-reduced-motion`.
**Checklist:**
```
[ ] pintarConDireccion() escribe wrap.innerHTML de forma SÍNCRONA — no existe ningún setTimeout entre calcular el HTML y pintarlo
[ ] Animación puramente CSS (clases + @keyframes), nunca JS animando opacidad/transform con setInterval
[ ] @media (prefers-reduced-motion: reduce) desactiva las animaciones
[ ] El cronómetro de lectura (8-N), el bloqueo de actividades (8-O) y el menú de ruta (10-C) funcionan exactamente igual con o sin la animación
```

## 🟠 PRIORIDAD 27 · ALTA — REACCIONES FLOTANTES AL COMPLETAR UNA ACTIVIDAD

### 🎉 REGLA DE ORO: CADA LOGRO SE CELEBRA CON EMOJIS QUE FLOTAN DESDE EL PUNTO DE ACCIÓN
Además (nunca en reemplazo) del toast de texto existente, deben aparecer 3-4 emojis que suben flotando **desde la zona del botón/actividad que el estudiante acaba de tocar** y se desvanecen — más natural que aparecer en el centro de la pantalla.
```javascript
// Llamar junto a (nunca en vez de) showToast() en los puntos donde ya se celebra un logro:
// onDragComplete, onMatchComplete, onFillComplete, onTFComplete, onOrdenVerificar,
// marcarPalabraEncontradaWS, responderQuiz (si correcta), otorgarBadge
function lanzarReaccionesFlotantes(origenEl, emojis) {
  const lista = emojis || ['🎉','✨','⭐','🌟'];
  const rect = (origenEl || document.getElementById('btn-next'))?.getBoundingClientRect();
  const baseX = rect ? rect.left + rect.width/2 : window.innerWidth/2;
  const baseY = rect ? rect.top : window.innerHeight/2;
  const cantidad = Math.min(4, lista.length + 1); // 3 a 4 emojis, nunca más
  for (let i = 0; i < cantidad; i++) {
    const span = document.createElement('span');
    span.textContent = lista[i % lista.length];
    span.className = 'reaccion-flotante';
    const desplazX = (Math.random() * 60 - 30);
    span.style.left = (baseX + desplazX) + 'px';
    span.style.top  = baseY + 'px';
    span.style.animationDelay = (i * 90) + 'ms';
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 1400);
  }
}
// Ejemplo: agregar DESPUÉS del showToast() ya existente:
// showToast('✅ ¡Actividad completada! Puedes continuar →');
// lanzarReaccionesFlotantes(document.getElementById('btn-next'), ['🎉','✨','⭐']); //
```
```css
.reaccion-flotante {
  position: fixed; font-size: 1.6rem; pointer-events: none; z-index: 950;
  animation: reaccionSubir 1.2s ease-out forwards; transform: translate(-50%, 0);
}
@keyframes reaccionSubir {
  0%   { opacity: 0; transform: translate(-50%, 0) scale(.6); }
  15%  { opacity: 1; transform: translate(-50%, -10px) scale(1.1); }
  100% { opacity: 0; transform: translate(-50%, -90px) scale(1); }
}
@media (prefers-reduced-motion: reduce) { .reaccion-flotante { display: none; } }
```
**Reglas:**
- Máximo 3-4 emojis por evento — nunca una lluvia excesiva
- Se lanza SIEMPRE junto al toast existente, nunca en su lugar
- NUNCA se dispara en una respuesta incorrecta de quiz — solo en aciertos y actividades completadas
- No se combina con los fuegos artificiales SVG de `rFinal()` (Prioridad 11) — sistemas independientes
- Respeta `prefers-reduced-motion`
**Checklist:**
```
[ ] lanzarReaccionesFlotantes() se llama junto a showToast() en: drag, match, fill, tf, orden, wordsearch, quiz (acierto), otorgarBadge
[ ] Nunca más de 4 emojis por evento, lanzados desde el elemento de origen (no del centro fijo de pantalla)
[ ] Nunca se dispara en una respuesta incorrecta de quiz
[ ] No se combina con los fuegos artificiales SVG de rFinal()
[ ] @media (prefers-reduced-motion: reduce) oculta las reacciones
```

## 🟠 PRIORIDAD 28 · ALTA — SLIDER "ANTES / DESPUÉS" PARA CONCEPTOS DE COMPARACIÓN

### 🔀 REGLA DE ORO: CUANDO EL CONCEPTO ES UNA TRANSFORMACIÓN O COMPARACIÓN, SE TOCA Y SE DESLIZA
Para slides de concepto donde el contenido sea una comparación real (antes/después, correcto/incorrecto, con/sin, antiguo/moderno) — alternativa opcional al grid 2×2 (Prioridad 1) o a los hotspots (Prioridad 19), nunca obligatoria — una imagen dividida con una manija deslizable que el estudiante arrastra con mouse o dedo.
```html
<div class="ad-slider" id="ad-slider-1">
  <img src="https://images.unsplash.com/photo-[ID_DESPUES]?w=500&h=320&fit=crop&auto=format&q=80"
       alt="[descripción DESPUÉS]" loading="lazy" class="ad-img ad-img-fondo">
  <div class="ad-img-recorte">
    <img src="https://images.unsplash.com/photo-[ID_ANTES]?w=500&h=320&fit=crop&auto=format&q=80"
         alt="[descripción ANTES]" loading="lazy" class="ad-img">
  </div>
  <div class="ad-linea"></div>
  <button class="ad-handle" aria-label="Deslizar para comparar">↔️</button>
  <span class="ad-etiqueta ad-etiqueta-izq">ANTES</span>
  <span class="ad-etiqueta ad-etiqueta-der">DESPUÉS</span>
</div>
```
```javascript
// Inicializar CADA slider antes/después presente en el slide actual (mouse Y touch)
function initAntesDepues(contId) {
  const cont = document.getElementById(contId);
  if (!cont) return;
  const recorte = cont.querySelector('.ad-img-recorte');
  const linea   = cont.querySelector('.ad-linea');
  const handle  = cont.querySelector('.ad-handle');
  let arrastrando = false;
  function mover(clientX) {
    const rect = cont.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(4, Math.min(96, pct));
    recorte.style.width = pct + '%';
    linea.style.left = pct + '%';
    handle.style.left = pct + '%';
  }
  handle.addEventListener('mousedown', () => arrastrando = true);
  handle.addEventListener('touchstart', () => arrastrando = true, {passive:true});
  window.addEventListener('mousemove', (e) => { if (arrastrando) mover(e.clientX); });
  window.addEventListener('touchmove', (e) => { if (arrastrando) mover(e.touches[0].clientX); }, {passive:true});
  window.addEventListener('mouseup', () => arrastrando = false);
  window.addEventListener('touchend', () => arrastrando = false);
  cont.addEventListener('click', (e) => { if (e.target !== handle) mover(e.clientX); });
  cont.addEventListener('pointerdown', () => {
    if (!st.acts['ad_click_'+contId]) { st.acts['ad_click_'+contId] = true; save(); } // formativo, nunca afecta nota
  });
}
// Llamar initAntesDepues('ad-slider-1') justo después de insertar el HTML del slide en render()
```
```css
.ad-slider {
  position: relative; width: 100%; max-width: 500px; margin: 10px auto;
  aspect-ratio: 500 / 320; border-radius: 14px; overflow: hidden;
  border: 4px solid var(--primary); box-shadow: 0 3px 0 var(--primary-dark);
  user-select: none; touch-action: pan-y;
}
.ad-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.ad-img-fondo { position: absolute; inset: 0; }
.ad-img-recorte { position: absolute; inset: 0; width: 50%; overflow: hidden; border-right: 3px solid #fff; }
.ad-img-recorte .ad-img { width: 500px; max-width: none; }
.ad-linea { position: absolute; top: 0; bottom: 0; left: 50%; width: 3px; background: #fff; box-shadow: 0 0 6px rgba(0,0,0,.4); pointer-events: none; }
.ad-handle {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
  width: 40px; height: 40px; border-radius: 50%; background: #fff; border: 3px solid var(--primary);
  color: var(--primary-dark); font-size: 1rem; cursor: ew-resize; box-shadow: 0 2px 6px rgba(0,0,0,.3);
  display: flex; align-items: center; justify-content: center;
}
.ad-etiqueta { position: absolute; bottom: 8px; background: rgba(0,0,0,.55); color: #fff; font-family: var(--font-ui); font-size: .68rem; padding: 3px 9px; border-radius: 8px; }
.ad-etiqueta-izq { left: 8px; } .ad-etiqueta-der { right: 8px; }
```
**Reglas:** uso opcional solo cuando el concepto sea comparación real · ambas imágenes cuentan para el mínimo de 20 (Prioridad 1) con alt + fallback emoji · funciona con mouse Y touch · nunca afecta la nota (Prioridad 18-A).
**Checklist:**
```
[ ] Patrón .ad-slider usado SOLO en slides donde el contenido es una comparación/transformación real
[ ] initAntesDepues() inicializado tras insertar el HTML del slide en render()
[ ] Funciona con mouse Y con touch, probado en ambos casos
[ ] Cada <img> interna tiene alt descriptivo y fallback emoji (Prioridad 1)
[ ] El uso del slider nunca afecta la nota (Prioridad 18-A)
```

## 🟠 PRIORIDAD 29 · ALTA — PARALLAX SUTIL EN EL FONDO DECORATIVO

### 🌫️ REGLA DE ORO: PROFUNDIDAD DISCRETA, NUNCA UNA DISTRACCIÓN
El patrón decorativo de fondo del tema visual (Prioridad 12) se mueve a una velocidad ligeramente distinta al contenido al hacer scroll dentro de `#slide-wrap` — usando una capa de fondo SEPARADA del contenido, con `requestAnimationFrame` para no afectar el rendimiento.
```javascript
// Requiere un elemento de fondo separado: <div id="fondo-parallax" class="fondo-parallax-capa"></div>
let _parallaxTicking = false;
function initParallaxFondo() {
  const wrap = document.getElementById('slide-wrap');
  const fondo = document.getElementById('fondo-parallax');
  if (!wrap || !fondo) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // respeta accesibilidad, ni se agrega el listener
  wrap.addEventListener('scroll', () => {
    if (_parallaxTicking) return;
    _parallaxTicking = true;
    requestAnimationFrame(() => {
      const desplazado = wrap.scrollTop * 0.25; // el fondo se mueve al 25% de la velocidad del scroll
      fondo.style.transform = `translateY(${desplazado}px)`;
      _parallaxTicking = false;
    });
  }, { passive: true });
}
// Llamar initParallaxFondo() UNA sola vez en el arranque (DOMContentLoaded), después del primer render()
```
```css
.fondo-parallax-capa {
  position: absolute; top: 0; left: 0; right: 0; height: 140%;
  z-index: 0; pointer-events: none; opacity: .12; background-repeat: repeat; will-change: transform;
}
#slide-wrap { position: relative; overflow-y: auto; }
#slide-wrap > *:not(.fondo-parallax-capa) { position: relative; z-index: 1; }
@media (prefers-reduced-motion: reduce) { .fondo-parallax-capa { transform: none !important; } }
```
**Reglas:** el fondo se mueve más lento que el contenido (25-35% del scroll) · opacidad baja (10-15%) · `z-index` siempre menor que el contenido, nunca tapa ni bloquea clics · usa `requestAnimationFrame`, nunca recalcula sin throttle · respeta `prefers-reduced-motion`.
**Checklist:**
```
[ ] initParallaxFondo() se llama una sola vez en el arranque, tras el primer render()
[ ] El fondo decorativo se mueve más lento que el contenido (aprox. 25-35% de la velocidad de scroll)
[ ] Opacidad del fondo entre 10-15% — nunca compite con el texto
[ ] z-index del fondo siempre por debajo del contenido — nunca bloquea clics ni tapa texto
[ ] requestAnimationFrame usado para el cálculo — sin recalcular de forma no optimizada en cada pixel de scroll
[ ] @media (prefers-reduced-motion: reduce) desactiva el movimiento del fondo (y ni siquiera agrega el listener)
```
