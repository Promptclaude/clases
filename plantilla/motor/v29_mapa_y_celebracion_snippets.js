// ═══ v29 · 67 — MAPA DE MISIÓN + PANTALLA FINAL DE CELEBRACIÓN ═══
// 1) «Ruta» bajo la barra de avance: un nodo por slide con el ícono del juego (✔ si ya pasó, resaltado el actual).
//    Solo informa (no navega): el estudiante ve qué juegos vienen y siente que avanza por un mapa.
// 2) Final de celebración: medalla según la nota (siempre ≥ bronce), ARIA, ⭐, juegos completados, XP, nivel,
//    «lo que lograste hoy» (campo `aprendiste`), «próxima misión» (campo `siguiente`) e insignia imprimible con el nombre.
// Regla del motor que se mantiene: no cambia notas ni bloquea; si algo falla aquí, la clase sigue igual.

const V29_ICO = { intro: '🚀', info: '📘', tf: '🕵️', fill: '✏️', drag: '🧲', minijuego: '🎯', quiz: '❓', evalFinal: '🏆', cuadricula: '🟨', recta: '📏', comparar: '⚖️', podio: '🏅', abierta: '✍️', cuaderno: '📓', enlazar: '🔗', ordenar: '🔢', memoria: '🃏', relampago: '⚡', sopa: '🔎', candado: '🔐', detective: '🕵️', fraccion: '🍕', final: '🏁' };

(function () {
  const c = document.createElement('style');
  c.textContent = '#v29-ruta{display:flex;gap:0;align-items:center;overflow-x:auto;scrollbar-width:none;margin:6px 4px 10px;padding:4px 2px;position:relative}#v29-ruta::-webkit-scrollbar{display:none}' +
    '#v29-ruta .n{flex:0 0 auto;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.8rem;background:rgba(255,255,255,.12);color:#cbd5e1;border:2px solid rgba(255,255,255,.18);position:relative;margin-right:10px}' +
    '#v29-ruta .n:not(:last-child)::after{content:"";position:absolute;left:100%;top:50%;width:10px;height:2px;background:rgba(255,255,255,.25)}' +
    '#v29-ruta .n.ok{background:#16a34a;border-color:#86efac;color:#fff}#v29-ruta .n.ya{background:#fbbf24;border-color:#fff;color:#1f2937;transform:scale(1.25);box-shadow:0 0 10px #fbbf24;margin-right:12px}' +
    '@media (prefers-reduced-motion:no-preference){#v29-ruta .n.ya{animation:v28pop .5s}}' +
    '.v29-cel{text-align:center;margin:8px 0}.v29-cel .fila{display:flex;justify-content:center;align-items:flex-end;gap:10px}.v29-cel img{max-height:130px;width:auto}' +
    '.v29-est{font-size:2rem;letter-spacing:6px;margin:4px 0}.v29-chips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:8px 0}' +
    '.v29-chips span{background:#eef2ff;color:#312e81;border-radius:20px;padding:6px 12px;font-weight:700;font-size:.9rem}' +
    '.v29-logro{text-align:left;background:#f0fdf4;border-left:5px solid #22c55e;border-radius:10px;padding:8px 14px;margin:10px 0;color:#14532d}.v29-logro ul{margin:4px 0 0 18px}' +
    '.v29-sig{background:#fef3c7;border-radius:12px;padding:8px 12px;margin:10px 0;color:#78350f;text-align:left}' +
    '.v29-cert{border:4px double #b45309;border-radius:16px;background:#fffbeb;color:#78350f;padding:14px;margin:12px 0;text-align:center}.v29-cert h3{margin:2px 0}' +
    '@media print{body *{visibility:hidden}.v29-cert,.v29-cert *{visibility:visible}.v29-cert{position:absolute;left:0;top:0;width:100%}}';
  document.head.appendChild(c);
})();

function v29Ruta() {
  const prog = document.getElementById('progreso'); if (!prog) return;
  let r = document.getElementById('v29-ruta'); if (!r) { r = document.createElement('div'); r.id = 'v29-ruta'; r.setAttribute('role', 'img'); prog.insertAdjacentElement('afterend', r); }
  r.setAttribute('aria-label', 'Mapa de la misión: paso ' + (st.slide + 1) + ' de ' + TOT);
  r.setAttribute('data-test', 'ruta');
  r.innerHTML = SL.map((s, i) => '<span class="n ' + (i < st.slide ? 'ok' : i === st.slide ? 'ya' : '') + '" aria-hidden="true" data-i="' + i + '">' + (i < st.slide ? '✔' : (V29_ICO[s.type] || '•')) + '</span>').join('');
  const cur = r.querySelector('.ya'); if (cur) r.scrollLeft = cur.offsetLeft - r.clientWidth / 2 + 13;
}
(function () { const _render = render; render = function () { const out = _render.apply(this, arguments); try { v29Ruta(); } catch (e) { /* el mapa nunca rompe la clase */ } return out; }; })();

let v29Celebrado = false;
const v29Final0 = RENDER.final;
RENDER.final = function (s) {
  const base = v29Final0(s), nota = notaOficial(), est = nota >= 4.5 ? 3 : nota >= 3.5 ? 2 : 1;
  const med = est === 3 ? 'asset://medalla-oro' : est === 2 ? 'asset://medalla-plata' : 'asset://medalla-bronce', nom = ['', 'Bronce', 'Plata', 'Oro'][est];
  const juegos = SL.filter(x => CLAVE_HECHO[x.type]), hechos = juegos.filter(x => st.acts[CLAVE_HECHO[x.type] + x.id]).length;
  const nombre = (NOMBRE || 'Explorador'), fecha = new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
  const cel = '<div class="v29-cel" data-test="celebracion"><div class="fila"><img src="asset://aria-genial" alt="ARIA celebra" width="120"><img src="' + med + '" alt="Medalla de ' + nom + '" width="110" data-test="medalla"></div>' +
    '<p><strong>¡Felicitaciones, ' + esc(nombre) + '!</strong></p><div class="v29-est" data-test="estrellas" aria-label="' + est + ' de 3 estrellas">' + '⭐'.repeat(est) + '☆'.repeat(3 - est) + '</div>' +
    '<div class="v29-chips"><span data-test="chip-juegos">🎮 ' + hechos + ' de ' + juegos.length + ' juegos</span><span>⭐ ' + st.xp + ' XP</span><span>🏅 ' + NIVELES[nivelActual()] + '</span></div></div>' +
    (s.aprendiste && s.aprendiste.length ? '<div class="v29-logro" data-test="logros"><strong>🧠 Lo que lograste hoy:</strong><ul>' + s.aprendiste.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul></div>' : '') +
    (s.siguiente ? '<div class="v29-sig" data-test="siguiente-mision">🚀 <strong>Próxima misión:</strong> ' + esc(s.siguiente) + '</div>' : '') +
    '<div class="v29-cert" data-test="insignia"><div>🏅</div><h3>Insignia de misión</h3><p><strong>' + esc(nombre) + '</strong><br>completó «' + esc(CONFIG_CLASE.titulo) + '»<br>' + esc(CONFIG_CLASE.materia) + ' ' + CONFIG_CLASE.grado + '.° · Medalla de ' + nom + '<br><small>' + fecha + '</small></p></div>' +
    '<button type="button" class="btn" data-test="imprimir-insignia" data-accion="v29-imprimir">🖨 Imprimir mi insignia</button>';
  if (!v29Celebrado) { v29Celebrado = true; try { Juego.evento('hito'); } catch (e) { /* sin efectos no pasa nada */ } }
  const k = base.indexOf('</h1>'); return k < 0 ? cel + base : base.slice(0, k + 5) + cel + base.slice(k + 5);
};
$('stage').addEventListener('click', e => { const b = e.target.closest('[data-accion="v29-imprimir"]'); if (b) window.print(); });
try { v29Ruta(); } catch (e) { /* ruta inicial */ }
