// ═══ v38 · JUEGO PRO: lo que faltaba traer del juego de las tablas (Ninja Multiplicación), sin imágenes nuevas ═══
// Origen de cada pieza (repositorio del juego → clase):
//   assets/fonts + engine/ui/tokens.css   → tipografía de cartel «Lilita One» (títulos, botones, números del HUD) incrustada (≈14 KB)
//   engine/poderes/pista-reloj.js         → v38Pista(): 💡 comodín que se GANA con una racha ×3 y tacha 2 respuestas malas en los juegos de PRÁCTICA (minijuego y relámpago)
//   engine/educativo/repaso-errores.js    → v38Repaso(): en la pantalla final, «📚 Para repasar» con lo que se falló (respuesta y por qué)
//   engine/secretos/flores-doradas.js     → v38Secretos(): 3 ⭐ secretas escondidas en la clase (curiosidad; no suman nota)
//   engine/ui/hud-nuevo.js (compacto)     → HUD más bajo en celular: más pantalla para la actividad
// REGLAS (iguales a v36/v37): SOLO presentación. No toca nota, XP, monedas ni lo guardado en st. La pista NO se usa en quizzes ni en el reto
// final (esos dan nota): solo en minijuegos de práctica. Cada pieza va en try/catch; con «reducir movimiento» o modo ahorro se apaga lo animado.
const V38_FUENTE = 'data:font/woff2;base64,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';
let v38Pistas = 0, v38Usada = '', v38Listo = false, v38Hallazgos = null;

(function () {
  const c = document.createElement('style');
  c.textContent =
    '@font-face{font-family:"Lilita One";font-style:normal;font-weight:400;font-display:swap;src:url(' + V38_FUENTE + ') format("woff2")}' +
    ':root{--v38-display:"Lilita One","Trebuchet MS",system-ui,sans-serif}' +
    // tipografía de cartel: títulos, botones y números del HUD (las preguntas y opciones siguen en la letra de lectura)
    'h1,h2,.btn,.hud-nota-valor,.hud-nota-label,.v36-etapa,#xp-hud,#v35-cofre .mon,.v37-logros h3,.v38-repaso h3,.v38-pista,#v37-racha{font-family:var(--v38-display);font-synthesis:none;font-weight:400;letter-spacing:.02em}' +
    '#stage .btn.opcion,#stage .chip,#stage .zona,#modal-cuerpo .btn.opcion{font-family:var(--font-ui);font-weight:800;letter-spacing:0;text-shadow:none}' +
    '.btn{text-shadow:0 2px 0 rgba(0,0,0,.28)}.btn.dorado{text-shadow:0 1px 0 rgba(255,255,255,.55)}' +
    '#stage h2{font-size:1.6rem;text-shadow:0 2px 0 rgba(124,77,255,.2)}.hud-nota-valor{font-size:1.7rem;text-shadow:0 2px 0 rgba(90,52,0,.7)}' +
    '#stage{position:relative}' +
    // comodín 💡
    '.v38-pista{display:inline-flex;align-items:center;gap:6px;margin:4px 0 6px;min-height:44px;padding:6px 16px;border-radius:14px;border:3px solid #b45309;background:linear-gradient(#FFF0A0,#FFC53D);color:#4b2e00;font-size:1rem;cursor:pointer;box-shadow:0 4px 0 #8a5a00;text-shadow:0 1px 0 rgba(255,255,255,.55)}' +
    '.v38-pista:active{transform:translateY(3px);box-shadow:0 1px 0 #8a5a00}.v38-pista:focus-visible{outline:3px solid #7c4dff;outline-offset:3px}' +
    '.v38-pista.nueva{animation:v38pop .6s ease-out}@keyframes v38pop{0%{transform:scale(.7)}60%{transform:scale(1.12)}100%{transform:scale(1)}}' +
    '#stage .opcion.v38-tachada{opacity:.4;text-decoration:line-through;box-shadow:none!important;transform:none!important}' +
    // repaso de errores y secretos en la pantalla final
    '.v38-repaso{margin:10px 0;padding:10px 12px;border-radius:14px;background:#fff7ec;border:3px solid #f59e0b;color:#4b2e00}.v38-repaso h3{margin:0 0 6px;font-size:1.1rem}' +
    '.v38-repaso ul{margin:0;padding:0;list-style:none}.v38-repaso li{background:#fff;border-left:5px solid #f59e0b;border-radius:0 10px 10px 0;padding:6px 10px;margin:6px 0;font-size:.92rem;line-height:1.35}' +
    '.v38-repaso li small{display:block;opacity:.85}.v38-repaso .buena{color:#0f6a32;font-weight:800}.v38-repaso.bien{background:#ecfdf5;border-color:#34d399;color:#065f46}' +
    '.v38-sec{margin:8px 0;text-align:center;font-weight:800;color:#6d28d9}' +
    // estrella secreta
    '.v38-estrella{position:absolute;z-index:3;width:40px;height:40px;border:0;border-radius:50%;background:transparent;font-size:1.35rem;line-height:1;cursor:pointer;opacity:.5;padding:0;animation:v38brilla 2.6s ease-in-out infinite}' +
    '.v38-estrella:focus-visible{outline:3px solid #7c4dff;opacity:1}@keyframes v38brilla{0%,100%{opacity:.28;transform:scale(.9)}50%{opacity:.8;transform:scale(1.12)}}' +
    'html.fx-low .v38-estrella{animation:none}@media (prefers-reduced-motion:reduce){.v38-estrella,.v38-pista.nueva{animation:none}}' +
    // la racha 🔥 (v37) tapaba «XP» y «Próximo cofre»: ahora va en la primera fila, entre la nota y las oportunidades
    '#v37-racha{top:calc(env(safe-area-inset-top,0px) + 10px)!important}@media (max-width:520px){#v37-racha{left:62%!important}}' +
    // HUD compacto en celular: la actividad es lo importante
    '@media (max-width:520px){#barra{padding:6px 10px!important}.hud-nota-valor{font-size:1.45rem}#v35-cofre{margin-top:2px}#v35-cofre .barra{height:8px;margin:8px 14px 8px}' +
    '#v35-cofre .c{width:20px;height:20px;font-size:.7rem;border-width:1px}#progreso{height:8px;margin:5px 4px}#stage{padding:14px}}';
  document.head.appendChild(c);
})();

// ── 1) Comodín 💡: se gana con una racha ×3 (el contador de v37) y se guarda hasta usarlo; máximo 2 ──
(function () {
  if (typeof Juego === 'undefined' || Juego._v38) return;
  const original = Juego.evento; Juego._v38 = true;
  Juego.evento = function (nombre, datos) {
    const r = original.call(Juego, nombre, datos);
    try {
      if (nombre === 'acierto' && v37Racha_n > 0 && v37Racha_n % 3 === 0 && v38Pistas < 2) { v38Pistas++; v35Aviso('💡 ¡Ganaste una pista! Úsala en un minijuego', true); }
    } catch (e) { /* el comodín nunca rompe la clase */ }
    return r;
  };
})();
function v38Tachar(ops, ok, ronda) {
  const malas = ops.map((o, i) => i).filter(i => i !== ok).sort((a, b) => ((a * 31 + ronda * 17) % 7) - ((b * 31 + ronda * 17) % 7)).slice(0, Math.min(2, ops.length - 2));
  malas.forEach(i => { ops[i].disabled = true; ops[i].classList.add('v38-tachada'); ops[i].setAttribute('aria-label', ops[i].textContent + ' (descartada por la pista)'); });
}
function v38Contexto(s) {   // dónde puede ayudar la pista: solo juegos de práctica con opciones y una correcta conocida
  if (s.type === 'minijuego') { const m = st.acts['mj_' + s.id] || { r: 0, ac: 0, resp: null }; if (m.r >= s.rondas.length || m.resp !== null) return null; return { sel: '[data-accion="mj-op"]', ok: s.rondas[m.r].ok, ronda: m.r }; }
  if (s.type === 'relampago') { const g = v28G(s); if (!g || g.i === undefined || g.resp !== null || g.i >= s.items.length || g.vidas <= 0) return null; return { sel: '[data-accion="v28-rel"]', ok: s.items[g.i].correcta, ronda: g.i }; }
  return null;
}
function v38Pista(s) {
  const viejo = document.getElementById('v38-pista'); if (viejo) viejo.remove();
  if (TIPOS_EVALUABLES.includes(s.type)) return;   // nunca en lo que da nota
  const c = v38Contexto(s); if (!c) return;
  const ops = [...document.querySelectorAll('#stage ' + c.sel)]; if (ops.length < 3) return;
  const clave = s.id + ':' + c.ronda;
  if (v38Usada === clave) { v38Tachar(ops, c.ok, c.ronda); return; }
  if (!v38Pistas) return;
  const b = document.createElement('button'); b.type = 'button'; b.id = 'v38-pista'; b.className = 'v38-pista nueva'; b.setAttribute('data-test', 'pista-v38');
  b.setAttribute('aria-label', 'Usar una pista: descarta dos respuestas incorrectas'); b.textContent = '💡 Pista ×' + v38Pistas;
  b.addEventListener('click', () => {
    if (!v38Pistas || v38Usada === clave) return;
    v38Pistas--; v38Usada = clave; v38Tachar(ops, c.ok, c.ronda); b.remove();
    try { Juego.evento('hito'); } catch (e) { /* sin efectos no pasa nada */ }
  });
  ops[0].parentNode.insertBefore(b, ops[0]);
}

// ── 2) Repaso de errores + estrellas secretas en la pantalla final ──
function v38Repaso() {
  const fallos = [], vistos = {};
  SL.filter(x => TIPOS_EVALUABLES.includes(x.type)).forEach(s => {
    (st.acts['quiz_resps_' + s.id] || []).forEach(r => {
      if (r.correcta) return;
      let q = ''; try { q = vistaPregunta(s, r.pregIdx).preg.enunciado || ''; } catch (e) { /* sin enunciado se muestra solo la respuesta */ }
      const k = s.id + '|' + r.pregIdx; if (vistos[k]) return; vistos[k] = 1;
      fallos.push({ q, tu: r.tuTexto || '', buena: r.buenaTexto || '', porQue: r.porQue || r.retro || '' });
    });
  });
  if (!fallos.length) return '<div class="v38-repaso bien" data-test="repaso-v38" data-n="0"><h3>🌟 ¡Nada para repasar!</h3></div>';
  return '<div class="v38-repaso" data-test="repaso-v38" data-n="' + fallos.length + '"><h3>📚 Para repasar (' + fallos.length + ')</h3><ul>' +
    fallos.slice(0, 5).map(f => '<li>' + (f.q ? '<strong>' + esc(f.q) + '</strong><br>' : '') + 'Elegiste: ' + esc(f.tu) + ' → <span class="buena">Correcta: ' + esc(f.buena) + '</span>' + (f.porQue ? '<small>💡 ' + esc(f.porQue) + '</small>' : '') + '</li>').join('') + '</ul></div>';
}
function v38SecClave() { return 'clase_secretos_v1:' + CLASE_ID + ':' + GRUPO_NORM + ':' + NOMBRE_NORM; }
function v38SecLeer() { if (v38Hallazgos) return v38Hallazgos; try { v38Hallazgos = JSON.parse(almacen().getItem(v38SecClave()) || '[]') || []; } catch (e) { v38Hallazgos = []; } return v38Hallazgos; }
function v38SecSlides() {   // 3 pantallas fijas para cada clase (ni la primera ni la última)
  const c = SL.map((x, i) => i).filter(i => i > 0 && i < SL.length - 1); if (c.length < 4) return [];
  return barajar(c, rngDe(hash(CLASE_ID + '|secretos'))).slice(0, 3).map(i => SL[i].id);
}
function v38Secretos(s) {
  const viejo = document.getElementById('v38-estrella'); if (viejo) viejo.remove();
  const ids = v38SecSlides(), k = ids.indexOf(s.id), hechas = v38SecLeer(); if (k < 0 || hechas.includes(s.id)) return;
  const POS = [['right:8px', 'bottom:64px'], ['left:8px', 'top:58%'], ['right:12px', 'top:44%']][k], b = document.createElement('button');
  b.type = 'button'; b.id = 'v38-estrella'; b.className = 'v38-estrella'; b.textContent = '⭐'; b.style.cssText = POS.join(';'); b.setAttribute('data-test', 'estrella-secreta');
  b.setAttribute('aria-label', 'Estrella secreta: tócala si la encuentras');
  b.addEventListener('click', () => {
    if (hechas.includes(s.id)) return; hechas.push(s.id);
    try { almacen().setItem(v38SecClave(), JSON.stringify(hechas)); } catch (e) { /* si no guarda, la sesión sigue */ }
    b.remove(); v35Aviso(hechas.length >= 3 ? '🌟 ¡Encontraste las 3 estrellas secretas!' : '⭐ ¡Estrella secreta! ' + hechas.length + ' de 3', false);
    try { Juego.evento('hito'); } catch (e) { /* idem */ }
  });
  $('stage').appendChild(b);
}
function v38SecHtml() { if (!v38SecSlides().length) return ''; return '<p class="v38-sec" data-test="secretos-v38">⭐ Estrellas secretas: ' + v38SecLeer().length + ' de 3</p>'; }
const v38Final0 = RENDER.final;
RENDER.final = function (s) {
  const base = v38Final0(s);
  try { const k = base.indexOf('<div class="v29-cert"'), h = v38Repaso() + v38SecHtml(); return k < 0 ? base + h : base.slice(0, k) + h + base.slice(k); } catch (e) { return base; }
};

function v38Escena(s, entrando) {
  if (!v38Listo) { v38Listo = true; v38SecLeer(); }
  try { v38Pista(s); } catch (e) { /* idem */ }
  try { v38Secretos(s); } catch (e) { /* idem */ }
}
