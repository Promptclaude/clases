// ═══ v35 · INCENTIVO PARA LA PRÁCTICA SIN NOTA: monedas 🪙 y cofres que se abren ═══
// Las actividades sin nota (tf, fill, drag, enlazar, memoria, sopa, abierta…) dan MONEDAS al terminarse:
//   acertar todo = 10 · intentarlo = 5 · pedir ayuda («No me sale») = 2   → intentar siempre suma, acertar suma el doble.
// La barra dorada del encabezado se llena y abre 5 cofres (coleccionables); el último abre el «premio de la clase»
// que fija el docente (meta.premio). Los cofres pueden llevar el tema de la clase (meta.cofres).
// REGLAS DEL MOTOR QUE SE MANTIENEN: no toca la nota, no bloquea nada y no guarda estado propio:
// las monedas se CALCULAN desde st.acts (lo ya guardado), así una semana nueva arranca en cero sola.
// Si algo falla aquí, la clase sigue igual (todo va envuelto en try/catch donde lo llaman).

const V35_VALOR = { acierto: 10, intento: 5, solucion: 2, rescate: 2 };
const V35_COFRES0 = [
  { icono: '🧢', nombre: 'Gorra de explorador' }, { icono: '🔭', nombre: 'Lupa de detective' }, { icono: '🚀', nombre: 'Cohete de práctica' },
  { icono: '👑', nombre: 'Corona del saber' }, { icono: '🏆', nombre: 'Trofeo de la misión' }
];
const V35_FRAC = [0.2, 0.4, 0.6, 0.8, 0.95];      // fracción de las monedas posibles que pide cada cofre
let v35Prev = null, v35Abiertos = null, v35TimerToast = null;

function v35Actividades() { return SL.filter(x => CLAVE_HECHO[x.type]); }
function v35Posibles() { return v35Actividades().length * V35_VALOR.acierto; }
function v35Monedas() {
  let n = 0;
  v35Actividades().forEach(x => { if (st.acts[CLAVE_HECHO[x.type] + x.id]) n += V35_VALOR[st.acts['modo_' + x.id]] || V35_VALOR.intento; });
  return n;
}
function v35Cofres() {
  const meta = CONFIG_CLASE.cofres, lista = (Array.isArray(meta) && meta.length === 5) ? meta : V35_COFRES0, pos = v35Posibles();
  let previo = 0;
  return lista.map((c, i) => { const u = Math.max(previo + 5, Math.round(pos * V35_FRAC[i] / 5) * 5); previo = u; return { icono: String(c.icono), nombre: String(c.nombre), umbral: u }; });
}

(function () {
  const c = document.createElement('style');
  c.textContent = '#v35-cofre{flex:1 1 100%;margin-top:4px;position:relative}' +
    '#v35-cofre .top{display:flex;justify-content:space-between;align-items:baseline;gap:8px;font-size:.78rem;font-weight:800;color:#fde68a}' +
    '#v35-cofre .mon{font-size:1rem;color:#ffe27a}#v35-cofre .prox{opacity:.9;font-weight:700;color:#fff}' +
    '#v35-cofre .barra{position:relative;height:12px;margin:12px 16px 14px;border-radius:99px;background:#ffffff22;border:2px solid var(--contorno)}' +
    '#v35-cofre .barra>i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#fbbf24,#f59e0b,#fde047);transition:width .5s}' +
    '#v35-cofre .c{position:absolute;top:50%;transform:translate(-50%,-50%);width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.9rem;background:#334155;border:2px solid #94a3b8;filter:grayscale(.7);opacity:.85}' +
    '#v35-cofre .c.ab{background:#fbbf24;border-color:#fff;filter:none;opacity:1;box-shadow:0 0 10px #fbbf24;transform:translate(-50%,-50%) scale(1.15)}' +
    '#v35-cofre .pop{position:absolute;right:6px;top:-6px;font-weight:900;color:#fde047;pointer-events:none;animation:v35pop 1.3s ease forwards}' +
    '@keyframes v35pop{0%{opacity:0;transform:translateY(8px) scale(.8)}20%{opacity:1;transform:translateY(0) scale(1.2)}100%{opacity:0;transform:translateY(-18px)}}' +
    '#v35-toast{position:fixed;left:50%;bottom:96px;transform:translateX(-50%);z-index:40;max-width:92vw;background:#fef3c7;color:#78350f;border:3px solid #f59e0b;border-radius:16px;padding:10px 16px;font-weight:900;box-shadow:0 6px 0 #b45309;text-align:center;pointer-events:none}' +
    '#v35-toast.peq{background:#ecfdf5;color:#065f46;border-color:#34d399;box-shadow:0 4px 0 #047857;font-size:.9rem;padding:6px 14px}#v35-toast[hidden]{display:none}' +
    '.v35-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}' +
    '.v35-final{background:#fffbeb;border:3px solid #f59e0b;border-radius:16px;padding:10px 12px;margin:10px 0;color:#78350f;text-align:center}' +
    '.v35-final .fila{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:6px}' +
    '.v35-final .it{display:flex;flex-direction:column;align-items:center;font-size:.72rem;font-weight:800;width:74px}' +
    '.v35-final .it b{font-size:1.7rem}.v35-final .it.no{filter:grayscale(1);opacity:.45}' +
    '.v35-premio{background:#dcfce7;border:3px solid #16a34a;border-radius:14px;padding:8px 12px;margin-top:8px;color:#14532d;font-weight:800}';
  document.head.appendChild(c);
})();

function v35Cofre() {
  const cont = document.getElementById('barra'); if (!cont || v35Actividades().length < 3) return;
  const mon = v35Monedas(), cofres = v35Cofres(), max = cofres[4].umbral, pct = Math.min(100, Math.round(mon / max * 100));
  const abiertos = cofres.filter(x => mon >= x.umbral).length, prox = cofres.find(x => mon < x.umbral);
  let el = document.getElementById('v35-cofre');
  if (!el) { el = document.createElement('div'); el.id = 'v35-cofre'; el.setAttribute('data-test', 'cofre'); cont.appendChild(el); }
  el.innerHTML = '<div class="top"><span class="mon" data-test="monedas">🪙 ' + mon + '</span><span class="prox">' +
      (prox ? 'Próximo cofre: ' + esc(prox.icono) + ' a ' + prox.umbral + ' 🪙' : '¡Todos los cofres abiertos!') + '</span></div>' +
    '<div class="barra" role="progressbar" aria-label="Cofres de práctica: ' + abiertos + ' de 5 abiertos" aria-valuemin="0" aria-valuemax="' + max + '" aria-valuenow="' + Math.min(mon, max) + '">' +
      '<i style="width:' + pct + '%"></i>' +
      cofres.map((x, i) => '<span class="c' + (mon >= x.umbral ? ' ab' : '') + '" style="left:' + Math.round(x.umbral / max * 100) + '%" data-test="cofre-item" data-abierto="' + (mon >= x.umbral ? 1 : 0) + '" title="' + esc(x.nombre) + '">' + (mon >= x.umbral ? esc(x.icono) : '🔒') + '</span>').join('') +
    '</div><span class="v35-sr" aria-live="polite" id="v35-live"></span>';
  if (v35Prev !== null && mon > v35Prev) {                       // ganó monedas ahora (no al recargar la página)
    const p = document.createElement('span'); p.className = 'pop'; p.setAttribute('aria-hidden', 'true'); p.textContent = '+' + (mon - v35Prev) + ' 🪙'; el.appendChild(p); setTimeout(() => p.remove(), 1400);
    const live = document.getElementById('v35-live'); if (live) live.textContent = 'Ganaste ' + (mon - v35Prev) + ' monedas. Llevas ' + mon + '.';
    if (v35Abiertos !== null && abiertos > v35Abiertos) v35Toast(cofres[abiertos - 1], abiertos);
    else v35Aviso('+' + (mon - v35Prev) + ' 🪙' + (prox ? ' · ' + prox.icono + ' ' + mon + '/' + prox.umbral : ''), true);   // visible aunque la barra quede fuera de pantalla
  }
  v35Prev = mon; v35Abiertos = abiertos;
}

function v35Aviso(texto, pequeno) {
  let t = document.getElementById('v35-toast');
  if (!t) { t = document.createElement('div'); t.id = 'v35-toast'; t.setAttribute('role', 'status'); t.setAttribute('data-test', 'cofre-toast'); document.body.appendChild(t); }
  t.className = pequeno ? 'peq' : ''; t.hidden = false; t.textContent = texto;
  clearTimeout(v35TimerToast); v35TimerToast = setTimeout(() => { t.hidden = true; }, pequeno ? 2200 : 3800);
}
function v35Toast(cofre, n) {
  v35Aviso('🔓 ¡Cofre ' + n + ' abierto! ' + cofre.icono + ' ' + cofre.nombre, false);
  try { Juego.evento('hito'); } catch (e) { /* sin efectos no pasa nada */ }
}

// Pantalla final: colección + premio del docente (solo si abrió todos los cofres)
function v35FinalHtml() {
  if (v35Actividades().length < 3) return '';
  const mon = v35Monedas(), cofres = v35Cofres(), abiertos = cofres.filter(x => mon >= x.umbral).length, premio = CONFIG_CLASE.premio;
  return '<div class="v35-final" data-test="cofres-final"><strong>🪙 ' + mon + ' monedas · ' + abiertos + ' de 5 cofres abiertos</strong><div class="fila">' +
    cofres.map(x => '<div class="it' + (mon >= x.umbral ? '' : ' no') + '"><b>' + (mon >= x.umbral ? esc(x.icono) : '🔒') + '</b>' + esc(x.nombre) + '</div>').join('') + '</div>' +
    (premio && abiertos === 5 ? '<div class="v35-premio" data-test="premio">🎁 Premio de la clase: ' + esc(premio) + '<br><small>Muéstrale tu insignia a tu docente para reclamarlo.</small></div>' : '') +
    (premio && abiertos < 5 ? '<p style="margin:8px 0 0"><small>🎁 Abre los 5 cofres para ganar el premio de la clase.</small></p>' : '') + '</div>';
}

// Insignia imprimible: deja constancia de las monedas, los cofres y el premio para mostrárselo al docente
function v35InsigniaHtml() {
  if (v35Actividades().length < 3) return '';
  const mon = v35Monedas(), cofres = v35Cofres(), abiertos = cofres.filter(x => mon >= x.umbral).length, premio = CONFIG_CLASE.premio;
  return '<br>🪙 ' + mon + ' monedas · 🔓 ' + abiertos + ' de 5 cofres' + (premio && abiertos === 5 ? '<br><strong>🎁 Premio: ' + esc(premio) + '</strong>' : '');
}
