---
modulo: 19_panel_docente_y_menu
etapa_de_lectura: 3
prioridades: [16, 16-B]
---

# 19 · Panel docente unificado y menú superior de herramientas

## 🟠 PRIORIDAD 16 · ALTA — PANEL DOCENTE UNIFICADO

 
### 🕵️ DESCRIPCIÓN GENERAL
 
El Panel Docente es un modal de control total al que SOLO accede el docente. Es INVISIBLE para los
estudiantes. No existe ningún botón, ícono, tooltip, cursor especial ni pista visual que delate su
existencia. El acceso es por clave de 7 dígitos escrita con el teclado físico del computador.
 
---
 
### 🔑 SISTEMA DE ACTIVACIÓN OCULTA — IMPLEMENTACIÓN EXACTA
 
**Punto de activación:** La letra **ℒ** (tipografía `UnifrakturMaguntia` o `'Old English Text MT'`,
importada desde Google Fonts) ubicada en el extremo izquierdo del navbar. En reposo visual esta
letra es indistinguible del resto del título de la clase — mismo color blanco, sin cursor pointer,
sin hover effect, sin ningún atributo `title`.
 
```javascript
// ═══ VARIABLES GLOBALES ═══
const CLAVE_DOCENTE = '{{CLAVE_PANEL_DOCENTE}}';
let pd_escuchando = false;
let pd_buffer = '';
let pd_timerInterval = null;
let pd_secsLeft = 0;
 
// ═══ HTML DE LA "L" EN EL NAVBAR (pegar dentro del nav, a la izquierda) ═══
// <span id="secret-L" style="
// font-family:'UnifrakturMaguntia',serif;
// font-size:2.1rem; color:#fff; line-height:1;
// cursor:default; user-select:none; padding:2px 7px;
// -webkit-font-smoothing:antialiased;
// ">ℒ</span>
// <span id="pd-key-ind" style="display:none;font-size:.68rem;color:rgba(255,255,255,.8);
// background:rgba(0,0,0,.3);border-radius:6px;padding:2px 9px;letter-spacing:3px;
// font-weight:900;font-family:var(--font-ui)"></span>
// <span id="pd-listen-timer" style="display:none;font-size:.65rem;
// color:rgba(255,255,255,.6);font-family:var(--font-ui)"></span>
 
// ═══ LÓGICA DE ACTIVACIÓN ═══
document.getElementById('secret-L').addEventListener('click', pd_activar);
 
function pd_activar() {
if (pd_escuchando) return;
pd_escuchando = true;
pd_buffer = '';
pd_secsLeft = 8;
 
// Feedback visual MUY sutil solo durante la espera
document.getElementById('pd-key-ind').style.display = 'inline-block';
document.getElementById('pd-listen-timer').style.display = 'inline-block';
document.getElementById('pd-key-ind').textContent = '○'.repeat(CLAVE_DOCENTE.length);
document.getElementById('pd-listen-timer').textContent = pd_secsLeft + 's';
 
pd_timerInterval = setInterval(() => {
pd_secsLeft--;
document.getElementById('pd-listen-timer').textContent = pd_secsLeft + 's';
if (pd_secsLeft <= 0) pd_desactivar(false);
}, 1000);
 
document.addEventListener('keydown', pd_onKey);
}
 
function pd_desactivar(exito) {
pd_escuchando = false;
pd_buffer = '';
clearInterval(pd_timerInterval);
document.removeEventListener('keydown', pd_onKey);
document.getElementById('pd-key-ind').style.display = 'none';
document.getElementById('pd-listen-timer').style.display = 'none';
if (exito) pd_abrirPanel('stats'); // abre en tab Stats por defecto
}
 
function pd_onKey(e) {
if (!pd_escuchando) return;
if (e.key >= '0' && e.key <= '9') {
pd_buffer += e.key;
const n = pd_buffer.length;
const max = CLAVE_DOCENTE.length;
document.getElementById('pd-key-ind').textContent =
'●'.repeat(n) + '○'.repeat(Math.max(0, max - n));
if (pd_buffer.length >= max) {
pd_desactivar(pd_buffer === CLAVE_DOCENTE);
// Si es incorrecta: pd_desactivar(false) → silencio total, sin toast, sin alerta
}
} else if (e.key === 'Backspace') {
pd_buffer = pd_buffer.slice(0, -1);
const n = pd_buffer.length;
document.getElementById('pd-key-ind').textContent =
'●'.repeat(n) + '○'.repeat(Math.max(0, CLAVE_DOCENTE.length - n));
} else if (e.key === 'Escape') {
pd_desactivar(false);
}
}
```
 
**REGLAS de la activación:**
- Solo funciona si: (1) clic en la zona `#secret-L` Y (2) se escribe la clave completa con el teclado físico en los siguientes 8 segundos
- Si escribe mal → silencio total. Sin mensajes de error. Sin alertas. El sistema no se delata
- Después de 8 segundos sin completar → se desactiva la escucha. Hay que volver a hacer clic
- La letra `ℒ` NO tiene cursor:pointer, NO tiene :hover, NO tiene title=""
 
---
 
### 🎨 DISEÑO DEL PANEL — ESTÉTICA DEATH NOTE
 
El panel usa una estética inspirada en Death Note: fondo negro profundo, detalles en rojo sangre
y dorado. Es un modal flotante con scroll interno. No hay nada de esto visible en la UI del
estudiante; el overlay se superpone sobre la clase.
 
```css
/* ── Fuente requerida (agregar al <head>) ── */
/* <link href="https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Orbitron:wght@700;900&display=swap" rel="stylesheet"> */
 
/* ── Variables del panel (no afectan al tema de la clase) ── */
:root {
--dn-bg: #0d0d14;
--dn-bg2: #12121c;
--dn-red: #c0392b;
--dn-red-bright: #e74c3c;
--dn-gold: #d4a017;
--dn-gold-bright: #f5c842;
--dn-text: #e8e0d0;
--dn-text2: #9a9080;
--dn-border: rgba(192,57,43,.3);
--dn-border-gold: rgba(212,160,23,.25);
--dn-card: #14141f;
}
 
/* ── Overlay ── */
#pd-overlay {
display: none; position: fixed; inset: 0;
background: rgba(0,0,0,.82); z-index: 9000;
backdrop-filter: blur(5px);
align-items: center; justify-content: center;
}
#pd-overlay.visible { display: flex; }
 
/* ── Contenedor principal ── */
#pd-panel {
background: var(--dn-bg);
border: 1.5px solid var(--dn-red);
border-radius: 18px;
width: min(95vw, 640px);
max-height: 92vh;
overflow: hidden;
display: flex; flex-direction: column;
box-shadow: 0 0 50px rgba(192,57,43,.25), 0 0 100px rgba(0,0,0,.7);
animation: pdEntrada .4s cubic-bezier(.175,.885,.32,1.275);
}
@keyframes pdEntrada {
from { opacity:0; transform: scale(.86) translateY(-24px); }
to { opacity:1; transform: scale(1) translateY(0); }
}
 
/* ── Header ── */
.pd-header {
background: linear-gradient(160deg, #160404 0%, #1a0606 40%, #0e0e1c 100%);
border-bottom: 1.5px solid var(--dn-red);
padding: 18px 22px 16px; flex-shrink: 0; position: relative; overflow: hidden;
}
.pd-header::before {
content: ''; position: absolute; inset: 0;
background: repeating-linear-gradient(-48deg, transparent, transparent 22px,
rgba(192,57,43,.04) 22px, rgba(192,57,43,.04) 44px);
pointer-events: none;
}
.pd-header-row { display:flex; align-items:flex-start; gap:14px; position:relative; }
.pd-L-deco {
font-family: 'UnifrakturMaguntia',serif;
font-size: 4.2rem; line-height:.95; color: var(--dn-red);
text-shadow: 0 0 24px rgba(192,57,43,.5); flex-shrink:0; margin-top:2px;
}
.pd-eyebrow {
font-size:.58rem; color:var(--dn-red); letter-spacing:4px;
text-transform:uppercase; font-weight:900; margin-bottom:3px;
}
.pd-main-title {
font-family:'Orbitron',sans-serif; font-size:1.05rem;
color:var(--dn-text); font-weight:900; line-height:1.25; margin-bottom:5px;
}
.pd-sub { font-size:.7rem; color:var(--dn-text2); line-height:1.5; }
 
/* ── Quick stats en el header ── */
.pd-quick-stats {
display:grid; grid-template-columns:repeat(5,1fr); gap:8px; margin-top:14px;
}
.pd-qs-item {
background:rgba(0,0,0,.35); border:1px solid var(--dn-border);
border-radius:9px; padding:7px 6px 6px; text-align:center;
}
.pd-qs-val {
font-family:'Orbitron',sans-serif; font-size:.88rem;
color:var(--dn-gold-bright); font-weight:900; display:block;
}
.pd-qs-lbl {
font-size:.55rem; color:var(--dn-text2); text-transform:uppercase;
letter-spacing:.5px; display:block; margin-top:2px;
}
 
/* ── Tabs ── */
.pd-tabs {
display:flex; background:var(--dn-bg2);
border-bottom:1.5px solid var(--dn-border); flex-shrink:0; overflow-x:auto;
}
.pd-tab {
flex:1; min-width:72px; padding:11px 8px 10px;
font-size:.7rem; font-weight:700; color:var(--dn-text2);
border:none; background:transparent; cursor:pointer;
border-bottom:2.5px solid transparent; transition:color .2s, border-color .2s;
text-align:center; display:flex; flex-direction:column; align-items:center; gap:3px;
}
.pd-tab:hover { color:var(--dn-text); }
.pd-tab.active { color:var(--dn-gold-bright); border-bottom-color:var(--dn-gold-bright); }
 
/* ── Área scrollable ── */
.pd-body {
flex:1; overflow-y:auto; padding:18px 20px;
scrollbar-width:thin; scrollbar-color:var(--dn-red) var(--dn-bg2);
}
 
/* ── Paneles de tab ── */
.pd-panel { display:none; }
.pd-panel.active { display:block; }
 
/* ── Section title ── */
.pd-section {
font-size:.6rem; color:var(--dn-red); letter-spacing:3px;
text-transform:uppercase; font-weight:900;
margin:16px 0 10px; display:flex; align-items:center; gap:8px;
}
.pd-section:first-child { margin-top:0; }
.pd-section::after { content:''; flex:1; height:1px; background:var(--dn-border); }
 
/* ── Tool cards ── */
.pd-card {
background:var(--dn-card); border:1px solid var(--dn-border-gold);
border-radius:12px; padding:13px 14px; margin-bottom:10px;
}
.pd-card:last-child { margin-bottom:0; }
.pd-card-head { display:flex; align-items:center; gap:9px; margin-bottom:6px; }
.pd-card-ico { font-size:1.3rem; flex-shrink:0; }
.pd-card-title { font-size:.82rem; color:var(--dn-text); font-weight:900; }
.pd-card-desc { font-size:.7rem; color:var(--dn-text2); line-height:1.5; margin-bottom:10px; }
 
/* ── Botones ── */
.pd-btn {
display:inline-flex; align-items:center; justify-content:center; gap:6px;
border:none; border-radius:9px; padding:9px 16px;
font-family:var(--font-ui); font-size:.76rem; font-weight:900;
cursor:pointer; transition:filter .15s, transform .1s; width:100%;
}
.pd-btn:active { transform:translateY(1px); }
.pd-btn-red { background:linear-gradient(135deg,#c0392b,#7a1c1c); color:#fff; box-shadow:0 3px 0 #5a0000; }
.pd-btn-red:hover { filter:brightness(1.18); }
.pd-btn-gold { background:linear-gradient(135deg,#c9940f,#996b08); color:#fff8e8; box-shadow:0 3px 0 #6b4500; }
.pd-btn-gold:hover { filter:brightness(1.2); }
.pd-btn-ghost { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); color:var(--dn-text); }
.pd-btn-ghost:hover { background:rgba(255,255,255,.11); }
.pd-btn-outline-red { background:transparent; border:1px solid var(--dn-red); color:#e74c3c; }
.pd-btn-outline-red:hover { background:rgba(192,57,43,.13); }
.pd-btn-sm { padding:7px 12px; font-size:.7rem; width:auto; flex:1; }
 
/* ── Select ── */
.pd-select {
width:100%; background:rgba(255,255,255,.05);
border:1px solid var(--dn-border-gold); border-radius:8px;
color:var(--dn-text); padding:8px 12px; font-family:var(--font-ui);
font-size:.76rem; margin-bottom:9px; appearance:none; cursor:pointer;
}
.pd-select option { background:#1a1a2e; }
 
/* ── Stats table ── */
.pd-stats-table { width:100%; border-collapse:collapse; }
.pd-stats-table tr { border-bottom:1px solid rgba(255,255,255,.06); }
.pd-stats-table tr:last-child { border-bottom:none; }
.pd-stats-table td { padding:8px 4px; font-size:.78rem; }
.pd-stats-table td:first-child { color:var(--dn-text2); }
.pd-stats-table td:last-child { color:var(--dn-text); text-align:right; font-weight:900; }
.pd-val-good { color:#27ae60 !important; }
.pd-val-warn { color:var(--dn-gold-bright) !important; }
.pd-val-bad { color:#e74c3c !important; }
.pd-val-muted { color:var(--dn-text2) !important; font-weight:400 !important; font-style:italic; }
 
/* ── Nota bar ── */
.pd-nota-bar-wrap {
background:rgba(255,255,255,.06); border-radius:20px; height:7px;
overflow:hidden; margin-top:4px;
}
.pd-nota-bar {
height:100%; border-radius:20px;
background:linear-gradient(90deg,var(--dn-red),var(--dn-gold-bright));
transition:width .6s ease;
}
 
/* ── Salidas / Foco ── */
.pd-salidas-list {
max-height:180px; overflow-y:auto; scrollbar-width:thin;
scrollbar-color:var(--dn-red) var(--dn-card);
}
.pd-salida-item {
display:flex; justify-content:space-between;
padding:4px 0; border-bottom:1px solid rgba(255,255,255,.05);
font-size:.68rem; color:var(--dn-text2);
}
.pd-salida-item span:last-child { color:var(--dn-text); }
 
/* ── Foco stats grid ── */
.pd-foco-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:12px; }
.pd-foco-stat {
background:var(--dn-card); border:1px solid var(--dn-border-gold);
border-radius:10px; padding:10px; text-align:center;
}
.pd-foco-val { font-family:'Orbitron',sans-serif; font-size:1.3rem; color:#e74c3c; font-weight:900; }
.pd-foco-lbl { font-size:.62rem; color:var(--dn-text2); text-transform:uppercase; margin-top:3px; }
 
/* ── Admin mode card ── */
.pd-admin-card {
background:linear-gradient(135deg,#1c0f00,#221000);
border:1.5px solid var(--dn-gold); border-radius:14px;
padding:15px; margin-bottom:12px; position:relative; overflow:hidden;
}
.pd-admin-card::before {
content:'◈ MODO ADMINISTRADOR ◈';
position:absolute; top:0; left:0; right:0; text-align:center;
font-size:.54rem; letter-spacing:3.5px; color:var(--dn-gold);
background:rgba(212,160,23,.1); padding:4px 0;
border-bottom:1px solid rgba(212,160,23,.2);
}
.pd-admin-inner { display:flex; align-items:flex-start; gap:12px; margin-top:18px; }
.pd-admin-title { font-family:'Orbitron',sans-serif; font-size:.78rem; color:var(--dn-gold-bright); font-weight:900; margin-bottom:4px; }
.pd-admin-desc { font-size:.7rem; color:var(--dn-text2); line-height:1.55; margin-bottom:8px; }
.pd-admin-status {
display:inline-flex; align-items:center; gap:5px;
background:rgba(212,160,23,.12); border:1px solid rgba(212,160,23,.3);
border-radius:20px; padding:3px 10px; font-size:.62rem;
color:var(--dn-gold-bright); font-weight:700; margin-bottom:9px;
}
.pd-admin-status.on { background:rgba(212,160,23,.28); }
 
/* ── Timer ── */
.pd-timer-display {
font-family:'Orbitron',sans-serif; font-size:2.1rem;
color:var(--dn-gold-bright); text-align:center; letter-spacing:5px;
padding:11px; background:rgba(0,0,0,.3); border-radius:10px;
margin-bottom:9px; border:1px solid var(--dn-border-gold); transition:color .3s;
}
.pd-timer-display.red { color:#e74c3c; }
.pd-timer-presets { display:grid; grid-template-columns:repeat(4,1fr); gap:6px; margin-bottom:8px; }
.pd-timer-actions { display:grid; grid-template-columns:1fr 1fr; gap:6px; }
 
/* ── Pregunta oral ── */
#pd-pregunta {
background:rgba(255,255,255,.04); border:1px dashed var(--dn-border-gold);
border-radius:10px; padding:11px 13px;
font-size:.78rem; color:var(--dn-text2); font-style:italic;
line-height:1.6; min-height:54px; margin-bottom:9px; transition:color .3s, border-color .3s;
}
#pd-pregunta.loaded { color:var(--dn-gold-bright); border-color:rgba(212,160,23,.45); font-style:normal; }
 
/* ── Footer ── */
.pd-footer {
border-top:1px solid var(--dn-border); padding:11px 20px;
background:rgba(0,0,0,.25); flex-shrink:0;
display:flex; align-items:center; justify-content:space-between; gap:10px;
}
.pd-footer-note { font-size:.6rem; color:var(--dn-text2); }
.pd-footer-note::before { content:'🔒 '; }
 
/* ── Badge Admin en navbar ── */
#pd-admin-badge {
display:none; align-items:center; gap:5px;
background:var(--dn-gold-bright); color:#000;
border-radius:20px; padding:3px 11px;
font-size:.63rem; font-weight:900;
}
#pd-admin-badge.active { display:flex; }
```
 
---
 
### 🏗️ HTML DEL PANEL COMPLETO — FUNCIÓN buildPanelDocente()
 
```javascript
// ═══ ESTADO GLOBAL REQUERIDO EN EL OBJETO st ═══
// st.modoAdmin = false; // ← agregar al objeto st si no existe
 
// ═══ VARIABLE DE TAB ACTIVO ═══
let pd_activeTab = 'stats';
 
// ═══ ABRIR PANEL ═══
function pd_abrirPanel(tab) {
if (tab) pd_activeTab = tab;
const ov = document.getElementById('pd-overlay');
ov.innerHTML = pd_buildPanel();
ov.classList.add('visible');
document.body.style.overflow = 'hidden';
}
 
// ═══ CERRAR PANEL ═══
function pd_cerrarPanel() {
const ov = document.getElementById('pd-overlay');
ov.classList.remove('visible');
ov.innerHTML = '';
document.body.style.overflow = '';
clearInterval(window._pd_timerInt);
}
 
// ═══ CERRAR AL HACER CLIC EN EL OVERLAY ═══
// (agregar al overlay en el HTML)
// onclick="if(event.target===this) pd_cerrarPanel()"
 
// ═══ BUILD HTML ═══
function pd_buildPanel() {
const vidas = MAX_VIDAS - (st.vidasUsadas || 0); // 🔺 v11.1 (Prioridad 8-M): usar SIEMPRE MAX_VIDAS, nunca un 3 fijo
const progPct = Math.round(((st.slideActual||0) / (st.totalSlides||1)) * 100);
const nota = (st.nota || 0).toFixed(1);
const notaPct = Math.round(((st.nota||0) / 5.0) * 100);
const totalSal = (st.salidas||[]).length;
 
const tabs = [
{ id:'stats', ico:'📊', lbl:'Stats' },
{ id:'respuestas', ico:'📋', lbl:'Respuestas' },
{ id:'reset', ico:'♻️', lbl:'Reset' },
{ id:'herramientas', ico:'🛠️', lbl:'Herramientas' },
{ id:'foco', ico:'👁️', lbl:'Foco' },
];
 
const tabsHtml = tabs.map(t =>
`<button class="pd-tab ${pd_activeTab===t.id?'active':''}"
onclick="pd_switchTab('${t.id}')">
<span style="font-size:.95rem">${t.ico}</span>${t.lbl}
</button>`
).join('');
 
// ── CONTENIDO TAB STATS ──
const tabStats = `
<div class="pd-section">Información del estudiante</div>
<div class="pd-card">
<table class="pd-stats-table">
<tr><td>👤 Estudiante</td><td>${st.nombre||'—'}</td></tr>
<tr><td>🏫 Grupo</td><td>${st.grupo||'—'}</td></tr>
<tr><td>⭐ Nota</td>
<td class="${(st.nota||0)>=3.5?'pd-val-good':(st.nota||0)>=3.0?'pd-val-warn':'pd-val-bad'}">${nota}/5.0</td></tr>
</table>
<div class="pd-nota-bar-wrap"><div class="pd-nota-bar" style="width:${notaPct}%"></div></div>
</div>
<div class="pd-section">Desempeño</div>
<div class="pd-card">
<table class="pd-stats-table">
<tr><td>✅ Aciertos totales</td>
<td class="${(st.aciertos||0)>0?'pd-val-good':'pd-val-muted'}">${st.aciertos||0}/${st.totalPregs||30}</td></tr>
<tr><td>📝 Quiz 1 (${(st.quiz1||{total:8}).total} preg.)</td>
<td class="${((st.quiz1||{}).correctas||0)>0?'pd-val-good':'pd-val-muted'}">${((st.quiz1||{}).correctas||0)>0?(st.quiz1.correctas+'/'+st.quiz1.total):'pend.'}</td></tr>
<tr><td>📝 Quiz 2 (${(st.quiz2||{total:8}).total} preg.)</td>
<td class="${((st.quiz2||{}).correctas||0)>0?'pd-val-good':'pd-val-muted'}">${((st.quiz2||{}).correctas||0)>0?(st.quiz2.correctas+'/'+st.quiz2.total):'pend.'}</td></tr>
<tr><td>🏆 Eval. Final (${(st.evalFinal||{total:14}).total} preg.)</td>
<td class="${((st.evalFinal||{}).correctas||0)>0?'pd-val-good':'pd-val-muted'}">${((st.evalFinal||{}).correctas||0)>0?(st.evalFinal.correctas+'/'+st.evalFinal.total):'pend.'}</td></tr>
<tr><td>❤️ Vidas usadas</td>
<td class="${(st.vidasUsadas||0)===0?'pd-val-good':(st.vidasUsadas||0)<=2?'pd-val-warn':'pd-val-bad'}">${st.vidasUsadas||0}/${MAX_VIDAS}</td></tr>
<tr><td>📍 Slide actual</td><td>${st.slideActual||0}/${st.totalSlides||0}</td></tr>
<tr><td>👁️ Salidas foco</td>
<td class="${totalSal>10?'pd-val-bad':totalSal>5?'pd-val-warn':'pd-val-good'}">${totalSal}</td></tr>
<tr><td>🔑 Clave index</td>
<td style="font-size:.63rem;color:var(--dn-text2);font-weight:400">${st.claveIndex||'—'}</td></tr>
</table>
</div>`;
 
// ── CONTENIDO TAB RESPUESTAS ──
const incorrectas = Object.entries(st.acts||{})
.filter(([k]) => k.startsWith('wrong_'))
.map(([k,v]) => `<div class="pd-salida-item"><span>${k.replace('wrong_','')}</span><span style="color:#e74c3c">${v}</span></div>`)
.join('') || `<div style="font-size:.75rem;color:var(--dn-text2);padding:8px 0;font-style:italic">Sin respuestas incorrectas registradas.</div>`;
 
const tabRespuestas = `
<div class="pd-section">Respuestas incorrectas</div>
<div class="pd-card">
<div style="font-size:.72rem;color:#e74c3c;font-weight:900;margin-bottom:10px">Respuestas incorrectas del estudiante:</div>
${incorrectas}
</div>
<div class="pd-section">Estado por evaluación</div>
<div class="pd-card">
<div class="pd-salida-item"><span>📝 Quiz 1</span><span style="color:var(--dn-text2);font-style:italic">pendiente</span></div>
<div class="pd-salida-item"><span>📝 Quiz 2</span><span style="color:var(--dn-text2);font-style:italic">pendiente</span></div>
<div class="pd-salida-item"><span>🏆 Eval. Final</span><span style="color:var(--dn-text2);font-style:italic">pendiente</span></div>
</div>`;
 
// ── CONTENIDO TAB RESET ──
const tabReset = `
<div style="background:rgba(192,57,43,.1);border:1px solid rgba(192,57,43,.3);border-radius:10px;
padding:10px 12px;font-size:.72rem;color:var(--dn-text2);line-height:1.5;margin-bottom:12px">
<strong style="color:#e74c3c">⚠️ Atención:</strong> El reset completo borra TODO el progreso.
El reset solo quizzes consume 1 vida. Estas acciones no se pueden deshacer.
</div>
<div class="pd-section">Reset rápido</div>
<div class="pd-card">
<div class="pd-card-head"><span class="pd-card-ico">⚠️</span><span class="pd-card-title">Reset COMPLETO</span></div>
<div class="pd-card-desc">Borra todo: progreso, XP, respuestas y marcas de slides.</div>
<button class="pd-btn pd-btn-red" onclick="pd_resetCompleto()">⚠️ Reset COMPLETO (todo)</button>
</div>
<div class="pd-card">
<div class="pd-card-head"><span class="pd-card-ico">🔄</span><span class="pd-card-title">Reset solo Quizzes</span></div>
<div class="pd-card-desc">Borra solo respuestas de quizzes y eval. final. Consume 1 vida.</div>
<button class="pd-btn pd-btn-gold" onclick="pd_resetQuizzes()">🔄 Reset solo Quizzes (1 vida)</button>
</div>
<div class="pd-section">Reset por semana</div>
<div class="pd-card">
<div class="pd-card-head"><span class="pd-card-ico">♻️</span><span class="pd-card-title">Resetear semana específica</span></div>
<div class="pd-card-desc">Borra el progreso completo de la semana seleccionada desde el índice.</div>
<select class="pd-select" id="pd-reset-sel">
<option value="">— Seleccionar semana —</option>
<option value="s1">Semana 1</option>
<option value="s2">Semana 2</option>
<option value="s3">Semana 3 (actual)</option>
<option value="s4">Semana 4</option>
<option value="s5">Semana 5</option>
<option value="s6">Semana 6</option>
<option value="all">⚠️ TODAS las semanas</option>
</select>
<button class="pd-btn pd-btn-outline-red" onclick="pd_resetSemana()">♻️ Confirmar reset de semana</button>
</div>
<div class="pd-section">Vidas</div>
<div class="pd-card">
<div class="pd-card-head"><span class="pd-card-ico">❤️</span><span class="pd-card-title">Reactivar las 8 vidas</span></div>
<div class="pd-card-desc">Estado actual: <strong style="color:var(--dn-gold-bright)">${vidas}/${MAX_VIDAS} vidas disponibles</strong>.</div>
<button class="pd-btn pd-btn-red" onclick="pd_reactivarVidas()">🔁 Reactivar 8 vidas ahora</button>
</div>`;
 
// ── CONTENIDO TAB HERRAMIENTAS ──
const tabHerramientas = `
<div class="pd-admin-card">
<div class="pd-admin-inner">
<div style="font-size:2rem;flex-shrink:0;line-height:1">⚡</div>
<div style="flex:1">
<div class="pd-admin-title">Entrar en Modo Administrador</div>
<div class="pd-admin-desc">
Navega por <strong style="color:var(--dn-gold-bright)">todas las slides libremente</strong>:
sin cronómetros activos, sin bloqueos de actividad, sin necesidad de completar quizzes.
Ideal para chequeo visual de la clase antes de presentarla a los estudiantes.
</div>
<div class="pd-admin-status ${st.modoAdmin?'on':''}">${st.modoAdmin?'✅ MODO ACTIVO':'⚪ Inactivo'}</div>
<button class="pd-btn ${st.modoAdmin?'pd-btn-outline-red':'pd-btn-gold'}"
onclick="pd_toggleAdmin()">
${st.modoAdmin?'🚪 Salir del Modo Admin':'⚡ Entrar en Modo Administrador'}
</button>
</div>
</div>
</div>
<div class="pd-section">Temporizador de clase</div>
<div class="pd-card">
<div class="pd-card-head"><span class="pd-card-ico">⏱️</span><span class="pd-card-title">Cronómetro de cuenta regresiva</span></div>
<div class="pd-card-desc">Controla el tiempo de actividades y evaluaciones en clase.</div>
<div class="pd-timer-display" id="pd-timer">00:00</div>
<div class="pd-timer-presets">
<button class="pd-btn pd-btn-ghost pd-btn-sm" onclick="pd_setTimer(5)">5 min</button>
<button class="pd-btn pd-btn-ghost pd-btn-sm" onclick="pd_setTimer(10)">10 min</button>
<button class="pd-btn pd-btn-ghost pd-btn-sm" onclick="pd_setTimer(15)">15 min</button>
<button class="pd-btn pd-btn-ghost pd-btn-sm" onclick="pd_setTimer(20)">20 min</button>
</div>
<div class="pd-timer-actions">
<button class="pd-btn pd-btn-gold pd-btn-sm" onclick="pd_startTimer()">▶ Iniciar</button>
<button class="pd-btn pd-btn-outline-red pd-btn-sm" onclick="pd_stopTimer()">⏹ Detener</button>
</div>
</div>
<div class="pd-section">Pregunta oral aleatoria</div>
<div class="pd-card">
<div class="pd-card-head"><span class="pd-card-ico">🎲</span><span class="pd-card-title">Generador de preguntas orales</span></div>
<div class="pd-card-desc">Pregunta sobre el tema de la clase para lanzar al grupo oralmente.</div>
<div id="pd-pregunta">Pulsa el botón para generar una pregunta…</div>
<button class="pd-btn pd-btn-ghost" onclick="pd_generarPregunta()" style="margin-top:4px">🎲 Generar pregunta</button>
</div>`;
 
// ── CONTENIDO TAB FOCO ──
const salidas = st.salidas || [];
const salidaItems = salidas.map(s =>
`<div class="pd-salida-item"><span>${s.hora}</span><span>Slide ${s.slide} — ${s.tipo}</span></div>`
).join('') || `<div style="color:var(--dn-text2);font-size:.75rem;text-align:center;padding:12px">Sin salidas registradas ✅</div>`;
 
const tabFoco = `
<div class="pd-section">Resumen de salidas de foco</div>
<div class="pd-foco-grid">
<div class="pd-foco-stat"><div class="pd-foco-val">${totalSal}</div><div class="pd-foco-lbl">Total salidas</div></div>
<div class="pd-foco-stat"><div class="pd-foco-val">${salidas.filter(s=>s.tipo==='pestaña').length}</div><div class="pd-foco-lbl">Cambios pestaña</div></div>
<div class="pd-foco-stat"><div class="pd-foco-val">${salidas.filter(s=>s.tipo==='ventana').length}</div><div class="pd-foco-lbl">Cambios ventana</div></div>
<div class="pd-foco-stat"><div class="pd-foco-val">${[...new Set(salidas.map(s=>s.slide))].length}</div><div class="pd-foco-lbl">Slides afectadas</div></div>
</div>
<div class="pd-section">Registro detallado</div>
<div class="pd-card">
<div style="font-size:.7rem;color:#e74c3c;font-weight:900;margin-bottom:8px">👁️ Salidas (${totalSal}):</div>
<div class="pd-salidas-list">${salidaItems}</div>
</div>
<div class="pd-card" style="margin-top:2px">
<div style="font-size:.72rem;color:var(--dn-text2)">
${totalSal>20?'🔴 Alto número de salidas — revisar con el estudiante.':totalSal>8?'🟡 Número moderado — continuar monitoreando.':'🟢 Número bajo de salidas — desempeño normal.'}
</div>
</div>`;
 
// ── ARMAR EL PANEL COMPLETO ──
return `
<div id="pd-panel">
<div class="pd-header">
<div class="pd-header-row">
<span class="pd-L-deco">ℒ</span>
<div>
<div class="pd-eyebrow">◈ Acceso restringido · Solo docente ◈</div>
<div class="pd-main-title">Panel de Control Docente</div>
<div class="pd-sub">IE Simón Bolívar · Sede San Martín · ${st.materia||'Clase'}</div>
</div>
<button class="pd-btn pd-btn-outline-red" style="width:auto;padding:6px 12px;font-size:.73rem;flex-shrink:0" onclick="pd_cerrarPanel()">✕ Cerrar</button>
</div>
<div class="pd-quick-stats">
<div class="pd-qs-item"><span class="pd-qs-val">${st.slideActual||0}/${st.totalSlides||0}</span><span class="pd-qs-lbl">Slide</span></div>
<div class="pd-qs-item"><span class="pd-qs-val">${progPct}%</span><span class="pd-qs-lbl">Avance</span></div>
<div class="pd-qs-item"><span class="pd-qs-val">${nota}</span><span class="pd-qs-lbl">Nota</span></div>
<div class="pd-qs-item"><span class="pd-qs-val">${'❤️'.repeat(vidas)}${'🖤'.repeat(MAX_VIDAS-vidas)}</span><span class="pd-qs-lbl">Vidas</span></div>
<div class="pd-qs-item"><span class="pd-qs-val" style="color:#e74c3c;font-size:.8rem">${totalSal}</span><span class="pd-qs-lbl">Salidas</span></div>
</div>
</div>
<div class="pd-tabs">${tabsHtml}</div>
<div class="pd-body">
<div class="pd-panel ${pd_activeTab==='stats'?'active':''}" id="pd-tab-stats">${tabStats}</div>
<div class="pd-panel ${pd_activeTab==='respuestas'?'active':''}" id="pd-tab-respuestas">${tabRespuestas}</div>
<div class="pd-panel ${pd_activeTab==='reset'?'active':''}" id="pd-tab-reset">${tabReset}</div>
<div class="pd-panel ${pd_activeTab==='herramientas'?'active':''}" id="pd-tab-herramientas">${tabHerramientas}</div>
<div class="pd-panel ${pd_activeTab==='foco'?'active':''}" id="pd-tab-foco">${tabFoco}</div>
</div>
<div class="pd-footer">
<span class="pd-footer-note">Panel oculto · Clave 7 dígitos · Solo teclado físico</span>
<button class="pd-btn pd-btn-outline-red" style="width:auto;padding:7px 18px;font-size:.7rem" onclick="pd_cerrarPanel()">✕ Cerrar panel</button>
</div>
</div>`;
}
 
// ═══ SWITCH DE TABS ═══
function pd_switchTab(id) {
pd_activeTab = id;
document.querySelectorAll('.pd-panel').forEach(p => p.classList.remove('active'));
document.querySelectorAll('.pd-tab').forEach(t => t.classList.remove('active'));
const panel = document.getElementById('pd-tab-' + id);
if (panel) panel.classList.add('active');
document.querySelectorAll('.pd-tab').forEach(t => {
if ((t.getAttribute('onclick')||'').includes("'"+id+"'")) t.classList.add('active');
});
}
```
 
---
 
### ⚡ ACCIONES DEL PANEL — FUNCIONES COMPLETAS
 
```javascript
// ─── RESET COMPLETO ───
function pd_resetCompleto() {
if (!confirm('¿Seguro? Se borrará TODO el progreso. No se puede deshacer.')) return;
// borrón TOTAL: es el ÚNICO lugar donde la mejor nota (8-U) vuelve a 0.0
limpiarColaModales(); forzarCerrarModal(); detenerCronometroLectura(); detenerTemporizadoresSlide(); lecturaMarca = null;
Object.keys(st.acts).forEach(k => delete st.acts[k]);
st.aciertos = 0; st.slide = 0; st.seen = new Set();
st.vidasUsadas = 0; st.intentos = 1; st.reintentoActivo = false; st.reintentoPendientes = [];
st.mejorNota = 0; st.mejorAciertos = 0; st.mejorIntento = 1; st.historialIntentos = [];
save();
render(); updScore();
showToast('♻️ Reset completo — el estudiante empieza desde cero (nota 0.0, vidas completas)');
pd_cerrarPanel(); pd_abrirPanel('reset');
}
 
// ─── RESET SOLO QUIZZES — v12.0: usa las funciones únicas de la Prioridad 8-P ───
function pd_resetQuizzes(){
if (!confirm('¿Resetear solo quizzes? Consumirá 1 vida del estudiante. Su mejor nota se conserva.')) return;
iniciarNuevoIntento('panel');   // (8-W): MISMA función que "Reintentar" del estudiante — un solo camino de reinicio
pd_cerrarPanel(); pd_abrirPanel('reset');
}
 
// ─── RESET DE SEMANA ───
function pd_resetSemana() {
const sel = document.getElementById('pd-reset-sel');
if (!sel || !sel.value) { showToast('⚠️ Selecciona una semana primero'); return; }
const nombre = sel.options[sel.selectedIndex].text;
// En producción: filtrar localStorage por prefijo de semana y borrar
// localStorage.removeItem(KEY_SEMANA + sel.value);
showToast('♻️ ' + nombre + ' reseteada correctamente');
pd_cerrarPanel(); pd_abrirPanel('reset');
}
 
// ─── REACTIVAR VIDAS ───
function pd_reactivarVidas() {
st.vidasUsadas = 0;
save();
showToast(`❤️❤️❤️ Vidas reactivadas — el estudiante tiene ${MAX_VIDAS} oportunidades de nuevo`);
if (typeof updateVidasBtn === 'function') updateVidasBtn();
pd_cerrarPanel(); pd_abrirPanel('reset');
}
 
// ─── MODO ADMINISTRADOR ───
function pd_toggleAdmin() {
st.modoAdmin = !st.modoAdmin;
save();
const badge = document.getElementById('pd-admin-badge');
if (badge) badge.classList.toggle('active', st.modoAdmin);
showToast(st.modoAdmin
? '⚡ Modo Admin ACTIVADO — sin cronómetros ni bloqueos'
: '🔒 Modo Admin desactivado — clase en modo normal'
);
pd_cerrarPanel(); pd_abrirPanel('herramientas');
}
 
// ─── TEMPORIZADOR ───
let _pd_secs = 0;
window._pd_timerInt = null;
window._pd_ticking = false;
 
function pd_setTimer(mins) {
pd_stopTimer();
_pd_secs = mins * 60;
pd_updateTimer();
}
function pd_startTimer() {
if (window._pd_ticking) return;
if (_pd_secs <= 0) { showToast('⚠️ Selecciona un tiempo primero'); return; }
window._pd_ticking = true;
window._pd_timerInt = setInterval(() => {
_pd_secs--;
pd_updateTimer();
if (_pd_secs <= 0) { pd_stopTimer(); showToast('⏱️ ¡Tiempo terminado!'); }
}, 1000);
}
function pd_stopTimer() {
window._pd_ticking = false;
clearInterval(window._pd_timerInt);
}
function pd_updateTimer() {
const el = document.getElementById('pd-timer');
if (!el) return;
const m = String(Math.floor(_pd_secs/60)).padStart(2,'0');
const s = String(_pd_secs%60).padStart(2,'0');
el.textContent = m+':'+s;
el.classList.toggle('red', _pd_secs <= 60 && _pd_secs > 0);
}
 
// ─── PREGUNTA ORAL ───
// IMPORTANTE: personalizar PREGUNTAS_ORALES con el tema específico de la clase
const PREGUNTAS_ORALES_DOCENTE = [
// Reemplazar con preguntas del tema de la semana actual
'Pregunta 1 del tema',
'Pregunta 2 del tema',
// ... agregar las que correspondan
];
function pd_generarPregunta() {
const el = document.getElementById('pd-pregunta');
if (!el) return;
const idx = Math.floor(Math.random() * PREGUNTAS_ORALES_DOCENTE.length);
el.textContent = PREGUNTAS_ORALES_DOCENTE[idx];
el.classList.add('loaded');
}
```
 
---
 
### 🔌 INTEGRACIÓN EN EL SISTEMA DE SLIDES — SOLO 2 LÍNEAS
 
```javascript
// ya NO hay nada que agregar aquí: puedeAvanzar() (8-O) y activarCronometroLectura() (8-N)
// YA incluyen `if (st.modoAdmin) return true;` / `if (st.modoAdmin) { habilitarBtnNext(); return; }` de fábrica.
// Basta con que st.modoAdmin exista en el objeto st — no hay que tocar ninguna otra función.
```
 
---
 
### 📋 HTML A PEGAR EN EL `<body>` (overlay + "L" en navbar)
 
```html
<!-- ═══ PEGAR EN EL NAVBAR, EXTREMO IZQUIERDO ═══ -->
<span id="secret-L" style="
font-family:'UnifrakturMaguntia',serif;
font-size:2.1rem; color:#fff; line-height:1;
cursor:default; user-select:none; padding:2px 7px;
-webkit-font-smoothing:antialiased;
transition:color .2s, text-shadow .2s;
">ℒ</span>
<span id="pd-key-ind" style="display:none; font-size:.68rem; color:rgba(255,255,255,.8);
background:rgba(0,0,0,.3); border-radius:6px; padding:2px 9px;
letter-spacing:3px; font-weight:900; font-family:var(--font-ui)"></span>
<span id="pd-listen-timer" style="display:none; font-size:.65rem;
color:rgba(255,255,255,.6); font-family:var(--font-ui)"></span>
 
<!-- ═══ Badge de modo admin en navbar (oculto por defecto) ═══ -->
<div id="pd-admin-badge" style="
display:none; align-items:center; gap:5px;
background:var(--dn-gold-bright,#f5c842); color:#000;
border-radius:20px; padding:3px 11px;
font-size:.63rem; font-weight:900; font-family:var(--font-ui);
">⚡ MODO ADMIN</div>
 
<!-- ═══ OVERLAY DEL PANEL (pegar antes del </body>) ═══ -->
<div id="pd-overlay"
style="display:none; position:fixed; inset:0; background:rgba(0,0,0,.82);
z-index:9000; backdrop-filter:blur(5px);
align-items:center; justify-content:center;"
onclick="if(event.target===this) pd_cerrarPanel()">
</div>
```
 
---
 
### 📦 CHECKLIST DE INTEGRACIÓN
 
- [ ] `UnifrakturMaguntia` importada en el `<head>` desde Google Fonts
- [ ] `Orbitron` importada en el `<head>` desde Google Fonts
- [ ] Letra `ℒ` (`#secret-L`) en el extremo izquierdo del navbar, sin pistas visuales
- [ ] `#pd-key-ind` y `#pd-listen-timer` junto a la `ℒ`, ocultos por defecto
- [ ] `#pd-admin-badge` en el navbar, oculto por defecto
- [ ] `#pd-overlay` antes del `</body>`
- [ ] Todo el bloque CSS copiado al `<style>` global
- [ ] Todas las funciones `pd_*` copiadas al `<script>` global
- [ ] `st.modoAdmin = false` agregado al objeto `st`
- [ ] `st.salidas = []` agregado al objeto `st` (con estructura `{hora, slide, tipo}`)
- [ ] `st.quiz1`, `st.quiz2`, `st.evalFinal` con propiedad `.correctas` y `.total`
- [ ] `if (st.modoAdmin) return true;` en `puedeAvanzar(s)`
- [ ] `if (st.modoAdmin) return;` en `activarCronometroLectura()`
- [ ] `PREGUNTAS_ORALES_DOCENTE` personalizada con el tema de la semana
- [ ] Evento de registro de salidas: cuando el estudiante cambia de pestaña/ventana,
hacer `st.salidas.push({ hora: new Date().toLocaleTimeString(), slide: st.slideActual, tipo: 'pestaña' }); save();`

## 🟠 PRIORIDAD 16-B · ALTA — MENÚ SUPERIOR DE HERRAMIENTAS PARA EL ESTUDIANTE

### 🧰 UN BOTÓN VISIBLE "🧰 Mis herramientas" — PANEL CON 3 AYUDAS COMBINADAS
A diferencia del panel docente (oculto), este SÍ es un botón visible y amigable en el navbar, pensado para apoyar al estudiante durante la clase.
```html
<!-- Botón visible en el navbar, junto a los cuadernos -->
<button class="nav-btn" onclick="abrirHerramientasEstudiante()" title="Herramientas para ti">
  🧰 Mis herramientas
</button>
```
```javascript
function abrirHerramientasEstudiante() {
  showModalGrande(`
    <div class="nb-modal-header">
      <span>🧰 Mis herramientas</span>
      <button onclick="closeModalGrande()" class="nb-modal-close">✕</button>
    </div>
    <div style="padding:16px">
      <!-- Pestañas internas -->
      <div style="display:flex;gap:6px;margin-bottom:14px">
        <button class="ht-tab active" onclick="cambiarTabHerramientas('glosario')" id="ht-tab-glosario">📖 Glosario</button>
        <button class="ht-tab" onclick="cambiarTabHerramientas('calc')" id="ht-tab-calc">🧮 Calculadora</button>
        <button class="ht-tab" onclick="cambiarTabHerramientas('ayuda')" id="ht-tab-ayuda">💡 Pista</button>
      </div>
      <div id="ht-contenido">${renderGlosarioHerramientas()}</div>
    </div>
  `);
}
function cambiarTabHerramientas(tab) {
  document.querySelectorAll('.ht-tab').forEach(b => b.classList.remove('active'));
  document.getElementById('ht-tab-'+tab).classList.add('active');
  const cont = document.getElementById('ht-contenido');
  if (tab === 'glosario') cont.innerHTML = renderGlosarioHerramientas();
  if (tab === 'calc')     cont.innerHTML = renderCalculadoraHerramientas();
  if (tab === 'ayuda')    cont.innerHTML = renderPistaGeneralHerramientas();
}
// 1. GLOSARIO de términos de la clase
function renderGlosarioHerramientas() {
  const glosario = GLOSARIO_CLASE || [];
  return `
    <p style="font-size:.8rem;color:var(--muted);margin-bottom:10px">Términos importantes de esta clase:</p>
    ${glosario.map(g => `
      <div style="background:var(--primary-light);border-radius:10px;padding:10px;margin-bottom:8px">
        <p style="font-family:var(--font-ui);color:var(--primary-dark);font-size:.85rem">${g.termino}</p>
        <p style="font-size:.78rem;color:var(--text2);line-height:1.6">${g.definicion}</p>
      </div>
    `).join('') || '<p style="font-size:.8rem;color:var(--muted)">El glosario se completará con los términos de la clase.</p>'}
  `;
}
// 2. CALCULADORA / bloc de notas rápido
function renderCalculadoraHerramientas() {
  return `
    <p style="font-size:.8rem;color:var(--muted);margin-bottom:10px">Usa esta calculadora si la necesitas para resolver algún ejercicio:</p>
    <input id="ht-calc-display" readonly style="width:100%;padding:10px;font-size:1.3rem;text-align:right;
           border:2px solid var(--primary);border-radius:8px;margin-bottom:8px;font-family:monospace" value="0">
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">
      ${['7','8','9','÷','4','5','6','×','1','2','3','-','C','0','=','+'].map(k => `
        <button onclick="htCalcPress('${k}')" style="padding:12px;font-size:1.1rem;border-radius:8px;
                border:2px solid var(--primary-light);background:#fff;cursor:pointer;font-family:var(--font-ui)">${k}</button>
      `).join('')}
    </div>
    <!-- Bloc de notas rápido -->
    <p style="font-size:.8rem;color:var(--muted);margin:14px 0 6px">📝 Bloc de notas rápido (no se evalúa):</p>
    <textarea id="ht-bloc-notas" placeholder="Escribe aquí lo que necesites mientras trabajas..."
      oninput="localStorage.setItem(SKEY+'_blocnotas', this.value)"
      style="width:100%;min-height:60px;padding:8px;border:2px solid var(--primary-light);
             border-radius:8px;font-size:.82rem">${localStorage.getItem(SKEY+'_blocnotas')||''}</textarea>
  `;
}
let htCalcExpr = '';
function htCalcPress(k) {
  const disp = document.getElementById('ht-calc-display');
  if (k === 'C') { htCalcExpr = ''; disp.value = '0'; return; }
  if (k === '=') {
    try {
      const expr = htCalcExpr.replace(/×/g,'*').replace(/÷/g,'/');
      disp.value = String(Function('"use strict";return ('+expr+')')());
    } catch(e) { disp.value = 'Error'; }
    return;
  }
  htCalcExpr += k;
  disp.value = htCalcExpr;
}
// 3. PISTA general (botón de "pedir ayuda")
function renderPistaGeneralHerramientas() {
  const s = SL[st.slide];
  const pistaGenerica = s.pistaAyuda ||
    'Recuerda revisar los ejemplos resueltos en los slides anteriores — ahí está la clave para resolver esta actividad.';
  return `
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:2.5rem;margin-bottom:8px">💡</div>
      <p style="font-size:.88rem;color:var(--text2);line-height:1.7;background:#fff8dc;
                border-radius:10px;padding:14px;border:2px solid var(--accent)">
        ${pistaGenerica}
      </p>
      <p style="font-size:.74rem;color:var(--muted);margin-top:10px">
        Esta pista no te da la respuesta — solo te orienta sobre dónde buscarla 😊
      </p>
    </div>
  `;
}
```
**CSS del menú de herramientas:**
```css
.ht-tab {
  flex: 1; padding: 8px; border: 2px solid var(--primary-light); border-radius: 8px;
  background: #fff; font-family: var(--font-ui); font-size: .76rem; cursor: pointer; color: var(--text2);
}
.ht-tab.active { background: var(--primary); color: #fff; border-color: var(--primary-dark); }
```
**Regla importante:** la pista general NUNCA da la respuesta literal de un quiz — solo orienta hacia dónde mirar (ej. "revisa el ejemplo del slide 8"). Esto mantiene la integridad de la evaluación mientras apoya al estudiante que se siente perdido.
