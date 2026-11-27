// ═══ v38 · AVENTURA: historia, villano, jefe con cara y misión de repaso (tomado del juego «Ninja Multiplicación») ═══
// Origen de cada pieza (repositorio del juego → clase):
//   assets/characters/villain/portrait.png (Rey del Caos)  → v38Cine(): cinemática de misión de 3 paneles ANTES de empezar (una sola vez por estudiante)
//   engine/combate/jefe-cinematica.js + villain-boss.js    → v38Jefe(): el jefe final tiene cara (el Rey del Caos), recibe «golpes» y cae al ser derrotado
//   engine/educativo/repaso-errores.js                     → v38Repaso(): en la pantalla final, «Misión de repaso» con lo que costó trabajo y un botón para volver a verlo
//   (nuevo) arreglos de diseño del celular: el texto de «por qué no puedo avanzar» ya no se pisa con el contenido, y el encabezado ocupa menos.
// REGLAS (iguales a v36/v37): es SOLO presentación. No escribe en `st`, no cambia nota, avance ni XP. Todo va en try/catch.
// La cinemática se recuerda con almacen() (clave propia, igual que el avatar): nunca toca las claves `aula:`.
// Texto de la historia: opcional en datos.json → meta.historia = ['panel 1', 'panel 2', 'panel 3'] (máx. 3, 180 caracteres c/u). Sin eso, se arma con el título.
// Para probar: ?cine=1 la muestra aunque ya se haya visto  ·  __TEST__.sinCine la apaga (las pruebas automáticas no la ven).

const V38_VILLANO = 'asset://villano-rey-caos', V38_BUSTO = 'asset://villano-rey-caos-busto', V38_ARIA = 'asset://aria-v2-saluda', V38_ARIA2 = 'asset://aria-v2-senala';
let v38Cine = null;
const v38Jefe0 = {};   // aciertos del jefe en la última pantalla pintada (solo en memoria), para saber cuándo hubo un golpe nuevo

(function () {
  const c = document.createElement('style');
  c.textContent =
    /* — pie pegajoso: el aviso «por qué no puedo avanzar» se leía encima del contenido — */
    '#pie{background:linear-gradient(to bottom,rgba(10,6,40,0),rgba(10,6,40,.95) 34%);margin:0 -6px;padding:12px 6px 6px}' +
    '#pie .razon-bloqueo{margin:0 0 4px}' +
    /* — celular: encabezado más bajo para que el juego quede a la vista — */
    '@media (max-width:520px){#barra{padding:5px 10px;gap:4px}#progreso{margin:5px 4px}#stage{margin:6px 0;padding:12px}' +
    '.hud-nota-valor{font-size:1.3rem}#vidas-hud img{width:19px;height:19px}' +
    '#v35-cofre{display:flex;align-items:center;gap:10px;flex:1 1 100%}#v35-cofre .top{flex:0 0 auto;display:flex;gap:10px;margin:0}#v35-cofre .prox{display:none}#v35-cofre .barra{flex:1 1 auto;margin:0}}' +
    /* — cinemática de misión — */
    '#v38-cine{position:fixed;inset:0;z-index:75;display:flex;flex-direction:column;color:#fff;background:radial-gradient(ellipse at 50% 28%,#4a2190 0,#1a0b45 48%,#060318 100%);animation:fxIn .4s both}' +
    '#v38-cine .v38-escena{flex:1;min-height:0;display:flex;align-items:flex-end;justify-content:center;position:relative;overflow:hidden;padding-top:44px}' +
    '#v38-cine .v38-actor{max-height:100%;max-width:78vw;object-fit:contain;filter:drop-shadow(0 0 26px rgba(168,85,247,.75)) drop-shadow(0 10px 14px #000a);animation:v38Entra .6s cubic-bezier(.2,.9,.3,1.1) both}' +
    '#v38-cine.villano .v38-actor{animation:v38Entra .6s cubic-bezier(.2,.9,.3,1.1) both,v38Flota 3.2s ease-in-out .6s infinite}' +
    '#v38-cine .v38-saltar{position:absolute;top:calc(10px + env(safe-area-inset-top));right:12px;z-index:2;background:#ffffff1f;color:#fff;border:2px solid #ffffff55;border-radius:99px;padding:8px 16px;font:800 .85rem var(--font-ui);cursor:pointer;min-height:40px}' +
    '#v38-cine .v38-caja{margin:0 12px calc(14px + env(safe-area-inset-bottom));padding:14px 16px;border-radius:20px;background:#120a35ee;border:3px solid var(--mundo-acento);box-shadow:0 6px 0 #0006,0 0 22px #a855f755;min-height:150px}' +
    '#v38-cine .v38-quien{display:block;font-size:.8rem;letter-spacing:.06em;text-transform:uppercase;color:var(--mundo-acento);margin-bottom:4px}' +
    '#v38-cine.villano .v38-quien{color:#e879f9}' +
    '#v38-cine .v38-texto{font-size:1.15rem;line-height:1.45;margin:0 0 10px;min-height:4.4em}' +
    '#v38-cine .v38-pie{display:flex;align-items:center;justify-content:space-between;gap:10px}' +
    '#v38-cine .v38-puntos{display:flex;gap:6px}#v38-cine .v38-puntos i{width:10px;height:10px;border-radius:50%;background:#ffffff44}#v38-cine .v38-puntos i.on{background:var(--mundo-acento);transform:scale(1.25)}' +
    '@keyframes v38Entra{from{opacity:0;transform:translateY(40px) scale(.92)}to{opacity:1;transform:none}}@keyframes v38Flota{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}' +
    /* — jefe final con cara — */
    '.v37-jefe.v38-con-cara{display:grid;grid-template-columns:64px 1fr;column-gap:10px;align-items:center}.v37-jefe.v38-con-cara>.v38-cara{grid-row:1/3;width:64px;height:64px;object-fit:contain;filter:drop-shadow(0 0 10px #a855f7aa)}' +
    '.v37-jefe.v38-con-cara.muerto>.v38-cara{filter:grayscale(1) brightness(.7);transform:rotate(-14deg) scale(.9);transition:all .5s}' +
    '.v37-jefe.v38-golpe>.v38-cara{animation:v38Golpe .55s}.v38-dano{position:absolute;right:14px;top:-6px;font-weight:900;font-size:1.3rem;color:#ff4d6d;text-shadow:0 2px 0 #fff;animation:v38Sube 1s ease-out forwards;pointer-events:none}' +
    '.v37-jefe{position:relative}@keyframes v38Golpe{0%{transform:translateX(0)}20%{transform:translateX(-8px) rotate(-6deg);filter:brightness(2.2)}45%{transform:translateX(8px) rotate(6deg)}100%{transform:none}}@keyframes v38Sube{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-30px)}}' +
    /* — misión de repaso — */
    '.v38-repaso{background:#f3f0ff;border:3px solid var(--mundo-primario);border-radius:16px;padding:10px 14px;margin:12px 0}.v38-repaso h3{margin:.1em 0 .3em}.v38-repaso ul{list-style:none;margin:0;padding:0}' +
    '.v38-repaso li{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;padding:8px 0;border-top:1px dashed #b9aef0}.v38-repaso li:first-child{border-top:0}.v38-repaso li span{flex:1 1 150px;font-weight:800}.v38-repaso li small{flex:1 1 100%;opacity:.8}' +
    '.v38-repaso .btn{min-height:40px;padding:6px 14px;font-size:.9rem}.v38-repaso.limpio{background:#e8fff0;border-color:var(--ok);text-align:center;font-weight:800}' +
    '@media (prefers-reduced-motion:reduce){#v38-cine,#v38-cine .v38-actor,.v37-jefe.v38-golpe>.v38-cara{animation:none!important}}';
  document.head.appendChild(c);
})();

// ── 1) Cinemática de misión ──
function v38CineClave() { return 'clase_cine_v1:' + CLASE_ID + ':' + GRUPO_NORM + ':' + NOMBRE_NORM; }
function v38Historia() {
  const h = Array.isArray(CONFIG_CLASE.historia) ? CONFIG_CLASE.historia.filter(x => typeof x === 'string' && x.trim()).slice(0, 3).map(x => x.trim().slice(0, 180)) : [];
  const t = CONFIG_CLASE.titulo || 'esta misión';
  return [
    h[0] || '¡Alerta! Algo raro pasa en «' + t + '». ¡Necesito tu ayuda!',
    h[1] || '¡Ja, ja, ja! Soy el Rey del Caos. Revolví todo y me llevé lo que necesitas saber. ¡Nunca lo recuperarás!',
    h[2] || 'Resuelve los retos, junta monedas y derrótalo en el Reto final. ¿Aceptas la misión?'
  ];
}
function v38CineAbrir() {
  if (v38Cine || document.getElementById('v38-cine')) return;
  const hist = v38Historia(), sin = v37SinMovimiento();
  const P = [
    { quien: '📡 ARIA', img: V38_ARIA, alt: 'ARIA, tu mascota, saluda', cls: '' },
    { quien: '😈 El Rey del Caos', img: V38_VILLANO, alt: 'El Rey del Caos, un mago malvado con capa morada', cls: 'villano' },
    { quien: '🎯 Tu misión', img: V38_ARIA2, alt: 'ARIA señala hacia adelante', cls: '' }
  ];
  const el = document.createElement('div'); el.id = 'v38-cine'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'Historia de la misión'); el.setAttribute('data-test', 'cine');
  el.innerHTML = '<button type="button" class="v38-saltar" data-accion="v38-saltar" data-test="cine-saltar">Saltar ›</button><div class="v38-escena"><img class="v38-actor" alt=""></div>' +
    '<div class="v38-caja"><b class="v38-quien"></b><p class="v38-texto" aria-live="polite" data-test="cine-texto"></p><div class="v38-pie"><div class="v38-puntos" aria-hidden="true">' + P.map(() => '<i></i>').join('') + '</div>' +
    '<button type="button" class="btn dorado" data-accion="v38-sig" data-test="cine-sig">Siguiente ▶</button></div></div>';
  document.body.appendChild(el);
  const estado = { i: 0, t: null, completo: false };
  v38Cine = estado;
  const txt = el.querySelector('.v38-texto'), sig = el.querySelector('[data-accion="v38-sig"]');
  function cerrar() {
    clearInterval(estado.t); el.remove(); v38Cine = null;
    try { almacen().setItem(v38CineClave(), '1'); } catch (e) { /* sin almacenamiento: se verá otra vez, no pasa nada */ }
    try { $('stage').focus({ preventScroll: true }); } catch (e) { /* idem */ }
  }
  function panel() {
    const p = P[estado.i], txtFull = hist[estado.i];
    el.className = p.cls; el.querySelector('.v38-actor').src = p.img; el.querySelector('.v38-actor').alt = p.alt;
    el.querySelector('.v38-quien').textContent = p.quien;
    el.querySelectorAll('.v38-puntos i').forEach((d, k) => d.classList.toggle('on', k === estado.i));
    sig.textContent = estado.i === P.length - 1 ? '¡Acepto la misión! 🚀' : 'Siguiente ▶';
    clearInterval(estado.t); estado.completo = false; txt.textContent = '';
    if (sin) { txt.textContent = txtFull; estado.completo = true; return; }
    let n = 0; estado.t = setInterval(() => { n += 2; txt.textContent = txtFull.slice(0, n); if (n >= txtFull.length) { clearInterval(estado.t); estado.completo = true; } }, 26);
  }
  el.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-accion]'); if (!b) return;
    if (b.dataset.accion === 'v38-saltar') return cerrar();
    if (b.dataset.accion === 'v38-sig') {
      if (!estado.completo) { clearInterval(estado.t); txt.textContent = hist[estado.i]; estado.completo = true; return; }   // primer toque: termina de escribir; segundo: avanza
      if (estado.i >= P.length - 1) return cerrar();
      estado.i++; panel();
    }
  });
  el.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });
  panel(); try { sig.focus({ preventScroll: true }); } catch (e) { /* idem */ }
}
function v38CineQuiza() {
  if (TEST && (TEST.sinCine || TEST.sinIntro)) return;
  let visto = false; try { visto = almacen().getItem(v38CineClave()) === '1'; } catch (e) { /* idem */ }
  if (visto && !/[?&]cine=1/.test(location.search)) return;
  v38CineAbrir();
}

// ── 2) Jefe final con cara: recibe golpes y cae al ser derrotado ──
function v38Jefe(s) {
  if (s.type !== 'evalFinal') return;
  const j = document.querySelector('#stage .v37-jefe'); if (!j || j.querySelector('.v38-cara')) return;
  const total = (s.preguntas || []).length, buenas = (st.acts['quiz_resps_' + s.id] || []).filter(r => r.correcta).length, antes = v38Jefe0[s.id];
  v38Jefe0[s.id] = buenas;
  const img = document.createElement('img'); img.className = 'v38-cara'; img.src = V38_BUSTO; img.alt = total && buenas >= total ? 'El Rey del Caos, derrotado' : 'El Rey del Caos, el jefe final';
  j.insertBefore(img, j.firstChild); j.classList.add('v38-con-cara');
  if (antes !== undefined && buenas > antes && !v37SinMovimiento()) {
    j.classList.add('v38-golpe'); const d = document.createElement('span'); d.className = 'v38-dano'; d.setAttribute('aria-hidden', 'true'); d.textContent = buenas >= total ? '💥 ¡K.O.!' : '-1 💥'; j.appendChild(d); setTimeout(() => d.remove(), 1100);
  }
}

// ── 3) Misión de repaso (de repaso-errores.js): lo que costó trabajo, con botón para volver a verlo. Solo lee `st`; no escribe nada. ──
function v38Pendientes() {
  const L = [];
  SL.forEach((x, i) => {
    if (TIPOS_EVALUABLES.includes(x.type)) {
      const r = st.acts['quiz_resps_' + x.id]; if (!r) return;
      const n = r.filter(q => !q.correcta).length; if (n) L.push({ i, t: x.titulo || 'Quiz', det: n + (n === 1 ? ' pregunta por reforzar' : ' preguntas por reforzar') });
    } else if (CLAVE_HECHO[x.type] && st.acts[CLAVE_HECHO[x.type] + x.id] && st.acts['ayuda_' + x.id]) L.push({ i, t: x.titulo || 'Actividad', det: 'La terminaste con ayuda' });
  });
  return L;
}
function v38RepasoHtml() {
  const L = v38Pendientes();
  if (!L.length) return '<div class="v38-repaso limpio" data-test="repaso" data-n="0">✨ ¡Sin pendientes! No quedó nada por reforzar.</div>';
  return '<div class="v38-repaso" data-test="repaso" data-n="' + L.length + '"><h3>🔁 Misión de repaso</h3><p>Para dominar el tema, vuelve a mirar esto:</p><ul>' +
    L.slice(0, 5).map(x => '<li data-test="repaso-item"><span>' + esc(x.t) + '</span><small>' + esc(x.det) + '</small><button type="button" class="btn" data-accion="v38-repasar" data-ir="' + x.i + '">Volver a verla</button></li>').join('') + '</ul></div>';
}
const v38Final0 = RENDER.final;
RENDER.final = function (s) {
  const base = v38Final0(s); let r = ''; try { r = v38RepasoHtml(); } catch (e) { /* el repaso nunca rompe el final */ }
  if (!r) return base; const k = base.indexOf('<div class="v29-cert"'); return k < 0 ? base + r : base.slice(0, k) + r + base.slice(k);
};
$('stage').addEventListener('click', e => { const b = e.target.closest && e.target.closest('[data-accion="v38-repasar"]'); if (b) { const i = parseInt(b.getAttribute('data-ir'), 10); if (i >= 0 && i < SL.length) irA(i); } });

// ── enganche único desde render() ──
(function () {   // el botón «Presiona para empezar» ya existe cuando se carga el motor: la historia arranca justo antes de entrar a la clase
  const ir = document.getElementById('btn-empezar');
  if (ir) ir.addEventListener('click', () => { try { v38CineQuiza(); } catch (e) { /* sin historia la clase funciona igual */ } });
})();
function v38Escena(s) {
  try { v38Jefe(s); } catch (e) { /* idem */ }
}
