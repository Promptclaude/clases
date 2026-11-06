// ═══ v28 · 66 — JUEGOS DE APLICACIÓN: enlazar · ordenar · memoria · relampago · sopa · candado ═══
// Misma regla de oro que v27: NO tocan la nota del quiz, nadie se queda atrapado («No me sale» a los 25 s),
// y todo funciona con un dedo (tocar–tocar) además de arrastrar. Sin reloj obligatorio: «relampago» tiene interruptor ⏱.

Object.assign(CLAVE_HECHO, { enlazar: 'enl_done_', ordenar: 'ord_done_', memoria: 'mem_done_', relampago: 'rel_done_', sopa: 'sopa_done_', candado: 'cand_done_' });
['enlazar', 'ordenar', 'memoria', 'relampago', 'sopa', 'candado'].forEach(t => { if (!TIPOS_ACTIVIDAD.includes(t)) TIPOS_ACTIVIDAD.push(t); });

(function () {
  const c = document.createElement('style');
  c.textContent = '@keyframes v28sh{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}75%{transform:translateX(7px)}}' +
    '@keyframes v28pop{0%{transform:scale(.85)}60%{transform:scale(1.08)}100%{transform:scale(1)}}@keyframes v28bar{from{width:100%}to{width:0}}' +
    '.v28-sh{animation:v28sh .35s}.v28-pop{animation:v28pop .35s}' +
    '@media (prefers-reduced-motion:reduce){.v28-sh,.v28-pop{animation:none}.v28-barra i{animation:none!important}}' +
    '.v28-enl{position:relative;display:flex;gap:18%;justify-content:space-between;margin:10px 0}.v28-enl .col{flex:1;display:flex;flex-direction:column;gap:10px;z-index:2}' +
    '.v28-enl button{min-height:46px;padding:8px;border:2px solid #64748b;border-radius:12px;background:#fff;color:#1f2937;font:inherit;font-size:.9rem;cursor:pointer;touch-action:manipulation}' +
    '.v28-enl button.sel{outline:4px solid #fbbf24}.v28-enl button.hecho{cursor:default;color:#fff;border-color:transparent}' +
    '.v28-enl svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}' +
    '.v28-ord{list-style:none;padding:0;margin:10px 0}.v28-ord li{display:flex;gap:6px;align-items:center;margin:6px 0}' +
    '.v28-ord .it{flex:1;min-height:46px;text-align:left;padding:8px 10px;border:2px solid #64748b;border-radius:12px;background:#fff;color:#1f2937;font:inherit;cursor:pointer}' +
    '.v28-ord .it.sel{outline:4px solid #fbbf24}.v28-ord .it.bien{border-color:#22c55e;background:#dcfce7}.v28-ord .it.mal{border-color:#f59e0b;background:#fef3c7}' +
    '.v28-ord .n{min-width:28px;height:28px;border-radius:50%;background:#6d28d9;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700}' +
    '.v28-mem{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:10px 0}' +
    '.v28-mem button{aspect-ratio:1/1.05;border:3px solid #6d28d9;border-radius:14px;background:linear-gradient(135deg,#6d28d9,#3b82f6);color:#fff;font:inherit;font-size:1.6rem;cursor:pointer;padding:4px;touch-action:manipulation}' +
    '.v28-mem button.vista{background:#fff;color:#1f2937;font-size:.8rem;font-weight:600}.v28-mem button.par{background:#dcfce7;color:#14532d;border-color:#22c55e;font-size:.8rem;font-weight:600;cursor:default}' +
    '.v28-hud{display:flex;justify-content:space-between;align-items:center;font-weight:700;margin:6px 0}.v28-barra{height:12px;background:#e2e8f0;border-radius:8px;overflow:hidden;margin:6px 0}' +
    '.v28-barra i{display:block;height:100%;background:linear-gradient(90deg,#22c55e,#f59e0b,#ef4444);border-radius:8px}' +
    '.v28-rel .grande{display:block;width:100%;min-height:58px;margin:8px 0;font-size:1.1rem}.v28-rel .enun{font-size:1.2rem;text-align:center;padding:14px 6px}' +
    '.v28-sopa{display:grid;gap:2px;margin:8px auto;max-width:360px;touch-action:manipulation}.v28-sopa button{aspect-ratio:1;border:1px solid #94a3b8;background:#fff;color:#1f2937;font:inherit;font-weight:700;font-size:.85rem;padding:0;border-radius:4px;cursor:pointer}' +
    '.v28-sopa button.ini{background:#fde68a;outline:2px solid #b45309}.v28-sopa button.hall{background:#bbf7d0;color:#14532d}' +
    '.v28-cand .acer{border:2px solid rgba(127,127,127,.35);border-radius:14px;padding:10px;margin:8px 0}.v28-cand .acer.ok{border-color:#22c55e}' +
    '.v28-cand .slot{display:inline-flex;width:44px;height:56px;margin:0 4px;border:3px solid #92400e;border-radius:10px;background:#fffbeb;color:#92400e;font-size:1.8rem;font-weight:800;align-items:center;justify-content:center}' +
    '.v28-cand .teclas button{min-width:52px;min-height:48px;margin:3px}.v28-cand .tesoro{background:#fef3c7;border:3px solid #f59e0b;border-radius:14px;padding:14px;text-align:center;font-size:1.1rem;margin:10px 0}';
  document.head.appendChild(c);
})();

const v28G = s => { const k = 'v28_' + s.id; if (!st.acts[k]) st.acts[k] = {}; return st.acts[k]; };
function v28Rng(seed) { let h = 1779033703 ^ String(seed).length; for (let i = 0; i < String(seed).length; i++) { h = Math.imul(h ^ String(seed).charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; } let a = h >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function v28Mezcla(n, seed, evitarOrden) { const r = v28Rng(seed), a = Array.from({ length: n }, (_, i) => i); for (let i = n - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } if (evitarOrden && a.every((v, i) => v === i)) a.push(a.shift()); return a; }
const v28Norm = t => String(t).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-ZÑ]/g, '');
function v28Fin(s, perfecto, xp) { marcarActividadHecha(s.id, perfecto ? 'acierto' : 'intento'); sumarXP(xp || 12); Juego.evento('actividad'); }
const v28Pal = ['#7c3aed', '#0891b2', '#16a34a', '#db2777', '#ea580c', '#2563eb'];

// ───────── 1 · ENLAZAR (une con líneas) ─────────
function rEnlazar(s) {
  const g = v28G(s); if (!g.ord) { g.ord = v28Mezcla(s.pares.length, s.id + 'e', true); g.hechos = {}; g.err = 0; }
  const n = s.pares.length, hechos = Object.keys(g.hechos).length, sh = g.sh ? ' v28-sh' : ''; g.sh = false;
  setTimeout(v28Lineas, 0);
  return '<h2>' + esc(s.titulo) + '</h2>' + (s.intro ? '<p>' + esc(s.intro) + '</p>' : '') +
    tarjeta('Une cada elemento con su pareja.', 'Toca uno de la izquierda y su pareja de la derecha (o arrastra de uno al otro).', 'Une todas las parejas (¡aunque te equivoques!) o pulsa «No me sale».', hechos + ' de ' + n + ' parejas') +
    '<div class="v28-enl' + sh + '" id="v28-enl"><div class="col">' + s.pares.map((p, i) => '<button type="button" data-test="enl-izq" data-accion="v28-enl" data-lado="i" data-i="' + i + '" class="' + (g.hechos[i] !== undefined ? 'hecho' : (g.sel && g.sel.l === 'i' && g.sel.i === i ? 'sel' : '')) + '" style="' + (g.hechos[i] !== undefined ? 'background:' + v28Pal[i % 6] : '') + '"' + (g.hechos[i] !== undefined ? ' disabled' : '') + '>' + esc(p.izq) + '</button>').join('') + '</div>' +
    '<div class="col">' + g.ord.map(k => '<button type="button" data-test="enl-der" data-accion="v28-enl" data-lado="d" data-k="' + k + '" class="' + (g.hechos[k] !== undefined ? 'hecho' : (g.sel && g.sel.l === 'd' && g.sel.i === k ? 'sel' : '')) + '" style="' + (g.hechos[k] !== undefined ? 'background:' + v28Pal[k % 6] : '') + '"' + (g.hechos[k] !== undefined ? ' disabled' : '') + '>' + esc(s.pares[k].der) + '</button>').join('') + '</div><svg id="v28-svg" aria-hidden="true"></svg></div>' +
    '<p data-test="enl-fb">' + (g.fb || '') + '</p>';
}
function v28Lineas() {
  const box = document.getElementById('v28-enl'), svg = document.getElementById('v28-svg'), s = SL[st.slide]; if (!box || !svg || !s || s.type !== 'enlazar') return;
  const g = v28G(s), R = box.getBoundingClientRect(); svg.setAttribute('viewBox', '0 0 ' + R.width + ' ' + R.height);
  svg.innerHTML = Object.keys(g.hechos || {}).map(i => { const a = box.querySelector('[data-lado="i"][data-i="' + i + '"]'), b = box.querySelector('[data-lado="d"][data-k="' + i + '"]'); if (!a || !b) return ''; const A = a.getBoundingClientRect(), B = b.getBoundingClientRect();
    return '<line x1="' + (A.right - R.left) + '" y1="' + (A.top + A.height / 2 - R.top) + '" x2="' + (B.left - R.left) + '" y2="' + (B.top + B.height / 2 - R.top) + '" stroke="' + v28Pal[i % 6] + '" stroke-width="6" stroke-linecap="round"/>'; }).join('');
}
window.addEventListener('resize', v28Lineas);
function v28EnlTocar(s, lado, idx) {
  const g = v28G(s); if (g.hechos[lado === 'i' ? idx : idx] !== undefined) return;
  if (!g.sel || g.sel.l === lado) { g.sel = { l: lado, i: idx }; g.fb = ''; save(); return render(false); }
  const i = lado === 'i' ? idx : g.sel.i, k = lado === 'd' ? idx : g.sel.i; g.sel = null;
  if (i === k) { g.hechos[i] = k; g.fb = '✅ ¡Pareja! ' + esc(s.pares[i].porQue || ''); Juego.evento('acierto'); sumarXP(4); if (Object.keys(g.hechos).length === s.pares.length) v28Fin(s, g.err === 0); }
  else { g.err++; g.sh = true; g.fb = '🔁 Casi: esas dos no van juntas. Prueba otra vez.'; Juego.evento('casi'); }
  save(); render(false);
}

// ───────── 2 · ORDENAR (secuencia, estilo «x de n en su lugar») ─────────
function rOrdenar(s) {
  const g = v28G(s); if (!g.ord) { g.ord = v28Mezcla(s.items.length, s.id + 'o', true); g.intentos = 0; g.res = null; }
  const n = s.items.length, ok = !!st.acts['ord_done_' + s.id];
  return '<h2>' + esc(s.titulo) + '</h2>' + (s.intro ? '<p>' + esc(s.intro) + '</p>' : '') +
    tarjeta(s.instruccion || 'Pon los pasos en el orden correcto.', 'Toca un paso y luego otro para cambiarlos de lugar, o usa ▲ ▼. Luego pulsa «Comprobar».', 'Ordénalos (o pulsa «No me sale»).', ok ? 'completo' : (g.res === null ? 'sin comprobar' : g.res + ' de ' + n + ' en su lugar')) +
    '<ol class="v28-ord">' + g.ord.map((k, p) => '<li><span class="n">' + (p + 1) + '</span><button type="button" class="it' + (g.sel === p ? ' sel' : '') + (g.res !== null && g.ver ? (k === p ? ' bien' : ' mal') : '') + '" data-test="ord-item" data-accion="v28-ord" data-p="' + p + '" data-k="' + k + '"' + (ok ? ' disabled' : '') + '>' + esc(s.items[k]) + '</button>' +
      (ok ? '' : '<button type="button" class="btn" data-test="ord-sube" data-accion="v28-ord-mov" data-p="' + p + '" data-d="-1" aria-label="Subir">▲</button><button type="button" class="btn" data-test="ord-baja" data-accion="v28-ord-mov" data-p="' + p + '" data-d="1" aria-label="Bajar">▼</button>') + '</li>').join('') + '</ol>' +
    (ok ? '<p data-test="ord-fb">✅ ¡Secuencia perfecta! ' + esc(s.porQue || '') + '</p>' : '<button type="button" class="btn dorado" data-test="ord-comprobar" data-accion="v28-ord-ver">✔ Comprobar orden</button><p data-test="ord-fb">' + (g.res !== null ? '🔁 ' + g.res + ' de ' + n + ' en su lugar. ¡Ya casi! (verde = bien, amarillo = cambia de sitio)' : '') + '</p>');
}

// ───────── 3 · MEMORIA (parejas de cartas) ─────────
function rMemoria(s) {
  const g = v28G(s), n = s.pares.length; if (!g.cartas) { g.cartas = v28Mezcla(2 * n, s.id + 'm', false); g.vol = []; g.hechos = []; g.jug = 0; }
  const estrellas = g.hechos.length === n ? (g.jug <= n + 2 ? 3 : g.jug <= 2 * n ? 2 : 1) : 0;
  return '<h2>' + esc(s.titulo) + '</h2>' + (s.intro ? '<p>' + esc(s.intro) + '</p>' : '') +
    tarjeta('Encuentra las parejas ocultas.', 'Toca dos cartas: si son pareja se quedan descubiertas.', 'Descubre todas las parejas (o «No me sale»).', 'Jugadas: ' + g.jug + ' · Parejas: ' + g.hechos.length + '/' + n) +
    '<div class="v28-mem">' + g.cartas.map((c, i) => { const p = c % n, cara = c < n ? 'a' : 'b', par = g.hechos.includes(p), vis = par || g.vol.includes(i);
      return '<button type="button" data-test="mem-carta" data-accion="v28-mem" data-i="' + i + '" data-p="' + p + '" data-l="' + cara + '" class="' + (par ? 'par' : vis ? 'vista' : '') + '"' + (par ? ' disabled' : '') + ' aria-label="' + (vis ? esc(s.pares[p][cara]) : 'Carta oculta') + '">' + (vis ? esc(s.pares[p][cara]) : '❓') + '</button>'; }).join('') + '</div>' +
    (g.hechos.length === n ? '<p data-test="mem-fb">🎉 ¡Todas las parejas! ' + '⭐'.repeat(estrellas) + '☆'.repeat(3 - estrellas) + ' en ' + g.jug + ' jugadas.</p>' : '<p data-test="mem-fb">' + (g.fb || '') + '</p>');
}

// ───────── 4 · RELÁMPAGO (ronda rápida con vidas, racha y reloj opcional) ─────────
let v28Tok = 0;
function rRelampago(s) {
  const g = v28G(s), V = s.vidas || 3, seg = s.segundos || 8;
  if (g.i === undefined) { g.i = 0; g.vidas = V; g.pts = 0; g.racha = 0; g.mejor = 0; g.ac = 0; g.resp = null; g.sinReloj = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; }
  const n = s.items.length, fin = g.resp === null && (g.i >= n || g.vidas <= 0);
  if (fin) { if (!st.acts['rel_done_' + s.id]) v28Fin(s, g.ac === n, 14);
    return '<h2>' + esc(s.titulo) + '</h2><div class="v28-rel" data-test="rel-fin"><p class="enun">' + (g.vidas <= 0 ? '💔 Se acabaron las vidas.' : '🏁 ¡Ronda terminada!') + '</p><p>Aciertos: <strong>' + g.ac + ' de ' + n + '</strong> · Puntos: <strong>' + g.pts + '</strong> · Mejor racha: <strong>' + g.mejor + '</strong> 🔥</p><p>Ya puedes continuar →</p></div>'; }
  const it = s.items[g.i], tok = ++v28Tok, idx = g.i;
  if (!g.sinReloj && g.resp === null) setTimeout(() => { if (tok !== v28Tok || !SL[st.slide] || SL[st.slide].id !== s.id || g.i !== idx || g.resp !== null) return; v28Resp(s, -1); }, seg * 1000);
  return '<h2>' + esc(s.titulo) + '</h2>' + (s.intro ? '<p>' + esc(s.intro) + '</p>' : '') +
    tarjeta('Responde lo más rápido que puedas.', 'Toca la opción correcta para cada frase.', 'Termina la ronda (¡acierte o no!) o pulsa «No me sale».', (g.i + 1) + ' de ' + n) +
    '<div class="v28-rel"><div class="v28-hud"><span data-test="rel-vidas">' + '❤️'.repeat(g.vidas) + '🖤'.repeat(Math.max(0, V - g.vidas)) + '</span><span>⚡ Racha ' + g.racha + '</span><span>⭐ ' + g.pts + '</span></div>' +
    (g.sinReloj ? '' : '<div class="v28-barra" aria-hidden="true"><i ' + (g.resp === null ? 'style="animation:v28bar ' + seg + 's linear forwards"' : 'style="width:0"') + '></i></div>') +
    '<p class="enun" data-test="rel-enun"><strong>' + esc(it.texto) + '</strong></p>' +
    s.opciones.map((o, k) => '<button type="button" class="btn grande' + (g.resp !== null ? (k === it.correcta ? ' ok' : (k === g.resp ? ' mal' : '')) : '') + '" data-test="rel-op" data-accion="v28-rel" data-k="' + k + '"' + (g.resp !== null ? ' disabled' : '') + '>' + esc(o) + '</button>').join('') +
    (g.resp !== null ? '<p data-test="rel-fb">' + (g.resp === it.correcta ? '✅ ¡Eso!' : (g.resp === -1 ? '⏱ Se acabó el tiempo.' : '💡 Casi.') + ' Era «' + esc(s.opciones[it.correcta]) + '».') + ' ' + esc(it.porQue || '') + '</p><button type="button" class="btn dorado" data-test="rel-sig" data-accion="v28-rel-sig">Siguiente ➜</button>' : '') +
    '<p><label><input type="checkbox" data-accion="v28-rel-reloj" aria-label="Jugar sin reloj"' + (g.sinReloj ? ' checked' : '') + '> ⏱ Jugar sin reloj</label></p></div>';
}
function v28Resp(s, k) {
  const g = v28G(s), it = s.items[g.i]; if (g.resp !== null) return; g.resp = k;
  if (k === it.correcta) { g.ac++; g.racha++; g.mejor = Math.max(g.mejor, g.racha); g.pts += 10 + 2 * (g.racha - 1); Juego.evento('acierto'); sumarXP(3); }
  else { g.vidas--; g.racha = 0; Juego.evento('casi'); }
  save(); render(false); const idx = g.i, tok = v28Tok; setTimeout(() => { if (SL[st.slide] && SL[st.slide].id === s.id && g.i === idx && g.resp !== null) v28Sig(s); }, 2600);
}
function v28Sig(s) { const g = v28G(s); if (g.resp === null) return; g.i++; g.resp = null; save(); render(false); }

// ───────── 5 · SOPA DE LETRAS (palabras por pista) ─────────
function v28Sopa(s) {
  const tam = s.tam || 10, r = v28Rng(s.id + 's'), dirs = [[0, 1], [1, 0], [1, 1]], G = Array.from({ length: tam }, () => Array(tam).fill('')), pos = {};
  s.palabras.map(p => v28Norm(p.palabra)).sort((a, b) => b.length - a.length).forEach(w => {
    for (let t = 0; t < 400; t++) { const d = dirs[Math.floor(r() * 3)], r0 = Math.floor(r() * tam), c0 = Math.floor(r() * tam), r1 = r0 + d[0] * (w.length - 1), c1 = c0 + d[1] * (w.length - 1); if (r1 >= tam || c1 >= tam) continue;
      let ok = true; for (let i = 0; i < w.length; i++) { const x = G[r0 + d[0] * i][c0 + d[1] * i]; if (x && x !== w[i]) { ok = false; break; } } if (!ok) continue;
      for (let i = 0; i < w.length; i++) G[r0 + d[0] * i][c0 + d[1] * i] = w[i]; pos[w] = [r0, c0, d[0], d[1], w.length]; return; } });
  const abc = 'ABCDEFGHIJLMNOPQRSTUVXZ'; for (let i = 0; i < tam; i++) for (let j = 0; j < tam; j++) if (!G[i][j]) G[i][j] = abc[Math.floor(r() * abc.length)];
  return { G, pos, tam };
}
window.V28 = { sopa: v28Sopa };
function rSopa(s) {
  const g = v28G(s), S = v28Sopa(s); if (!g.hall) { g.hall = []; g.ini = null; }
  const ws = s.palabras.map(p => v28Norm(p.palabra)), ocup = new Set(); g.hall.forEach(w => { const [r0, c0, dr, dc, L] = S.pos[w]; for (let i = 0; i < L; i++) ocup.add((r0 + dr * i) + ',' + (c0 + dc * i)); });
  return '<h2>' + esc(s.titulo) + '</h2>' + (s.intro ? '<p>' + esc(s.intro) + '</p>' : '') +
    tarjeta('Encuentra las palabras escondidas.', 'Toca la primera letra y luego la última (en línea recta →, ↓ o ↘), o arrastra el dedo.', 'Encuéntralas todas (o pulsa «No me sale»).', g.hall.length + ' de ' + ws.length + ' palabras') +
    '<ul>' + s.palabras.map((p, i) => '<li data-test="sopa-pista">' + (g.hall.includes(ws[i]) ? '✅ <strong>' + esc(ws[i]) + '</strong>' : '🔎 ' + esc(p.pista) + ' <small>(' + ws[i].length + ' letras)</small>') + '</li>').join('') + '</ul>' +
    '<div class="v28-sopa" style="grid-template-columns:repeat(' + S.tam + ',1fr)">' + S.G.map((fila, i) => fila.map((ch, j) => '<button type="button" data-test="sopa-celda" data-accion="v28-sopa" data-r="' + i + '" data-c="' + j + '" class="' + (ocup.has(i + ',' + j) ? 'hall' : (g.ini && g.ini[0] === i && g.ini[1] === j ? 'ini' : '')) + '" aria-label="Letra ' + ch + '">' + ch + '</button>').join('')).join('') + '</div><p data-test="sopa-fb">' + (g.fb || '') + '</p>';
}
function v28SopaTocar(s, r, c) {
  const g = v28G(s), S = v28Sopa(s); if (!g.ini) { g.ini = [r, c]; g.fb = ''; save(); return render(false); }
  const [r0, c0] = g.ini; g.ini = null; if (r0 === r && c0 === c) { save(); return render(false); }
  const dr = Math.sign(r - r0), dc = Math.sign(c - c0), L = Math.max(Math.abs(r - r0), Math.abs(c - c0)) + 1; let txt = '';
  if ((r - r0 === 0 || c - c0 === 0 || Math.abs(r - r0) === Math.abs(c - c0))) for (let i = 0; i < L; i++) txt += S.G[r0 + dr * i][c0 + dc * i];
  const w = Object.keys(S.pos).find(k => (k === txt) && !g.hall.includes(k));
  if (w) { g.hall.push(w); g.fb = '✅ ¡Encontraste ' + w + '!'; Juego.evento('acierto'); sumarXP(4); if (g.hall.length === s.palabras.length) v28Fin(s, true); }
  else { g.fb = '🔁 Esa línea no forma una palabra de la lista. Prueba otra.'; Juego.evento('casi'); }
  save(); render(false);
}

// ───────── 6 · CANDADO SECRETO (escape room: cada acertijo da un dígito) ─────────
function rCandado(s) {
  const g = v28G(s); if (!g.ok) { g.ok = {}; g.cod = ''; g.err = 0; g.abierto = false; }
  const n = s.acertijos.length, resueltos = Object.keys(g.ok).length, cl = s.acertijos.map(a => a.digito).join(''), sh = g.sh ? ' v28-sh' : ''; g.sh = false;
  return '<h2>' + esc(s.titulo) + '</h2>' + (s.intro ? '<p>' + esc(s.intro) + '</p>' : '') +
    tarjeta('Resuelve los acertijos para descubrir el código del candado.', 'Cada acertijo correcto te da un dígito 🔑. Luego escribe el código en el candado.', 'Abre el candado (o pulsa «No me sale»).', resueltos + ' de ' + n + ' dígitos') +
    '<div class="v28-cand">' + s.acertijos.map((a, j) => '<div class="acer' + (g.ok[j] ? ' ok' : '') + '"><p><strong>' + (j + 1) + '.</strong> ' + esc(a.q) + '</p>' +
      (g.ok[j] ? '<p data-test="cand-digito">🔑 Dígito: <strong>' + a.digito + '</strong> — ' + esc(a.porQue || '') + '</p>' : a.ops.map((o, k) => '<button type="button" class="btn" data-test="cand-op" data-accion="v28-cand-op" data-j="' + j + '" data-o="' + k + '">' + esc(o) + '</button>').join(' ') + ((g.fbj === j) ? '<p>🔁 Casi. Prueba otra opción.</p>' : '')) + '</div>').join('') +
    '<div class="' + sh.trim() + '" style="text-align:center;margin:12px 0"><div>' + Array.from({ length: n }, (_, i) => '<span class="slot" data-test="cand-slot">' + (g.abierto ? cl[i] : (g.cod[i] || '·')) + '</span>').join('') + '</div>' +
    (g.abierto ? '<div class="tesoro" data-test="cand-tesoro">🔓 ¡Candado abierto! 🎁 ' + esc(s.tesoro || '¡Lo lograste!') + '</div>' :
      '<div class="teclas">' + '1234567890'.split('').map(d => '<button type="button" class="btn" data-test="cand-tecla" data-accion="v28-cand-tecla" data-d="' + d + '">' + d + '</button>').join('') + '<button type="button" class="btn" data-test="cand-borrar" data-accion="v28-cand-borrar" aria-label="Borrar">⌫</button></div><button type="button" class="btn dorado" data-test="cand-abrir" data-accion="v28-cand-abrir">🔓 Abrir candado</button>') +
    '<p data-test="cand-fb">' + (g.fb || '') + '</p></div></div>';
}

// ───────── eventos ─────────
let v28Down = null;
$('stage').addEventListener('pointerdown', e => { const b = e.target.closest('[data-accion^="v28-"]'); v28Down = b && !b.disabled ? b : null; });
$('stage').addEventListener('pointerup', e => {
  const a = v28Down; v28Down = null; if (!a) return; const s = SL[st.slide], f = document.elementFromPoint(e.clientX, e.clientY), b = f && f.closest ? f.closest('[data-accion^="v28-"]') : null; if (!b || b === a || b.disabled) return;
  if (a.dataset.accion === 'v28-enl' && b.dataset.accion === 'v28-enl' && a.dataset.lado !== b.dataset.lado) { v28EnlTocar(s, a.dataset.lado, +(a.dataset.lado === 'i' ? a.dataset.i : a.dataset.k)); v28EnlTocar(s, b.dataset.lado, +(b.dataset.lado === 'i' ? b.dataset.i : b.dataset.k)); e.preventDefault(); }
  if (a.dataset.accion === 'v28-sopa' && b.dataset.accion === 'v28-sopa') { v28SopaTocar(s, +a.dataset.r, +a.dataset.c); v28SopaTocar(s, +b.dataset.r, +b.dataset.c); e.preventDefault(); }
});
$('stage').addEventListener('click', e => {
  const b = e.target.closest('[data-accion^="v28-"]'); if (!b || b.disabled) return; const s = SL[st.slide], a = b.dataset.accion, g = v28G(s);
  if (a === 'v28-enl') return v28EnlTocar(s, b.dataset.lado, +(b.dataset.lado === 'i' ? b.dataset.i : b.dataset.k));
  if (a === 'v28-ord') { const p = +b.dataset.p; if (g.sel === undefined || g.sel === null) g.sel = p; else { if (g.sel !== p) { [g.ord[g.sel], g.ord[p]] = [g.ord[p], g.ord[g.sel]]; g.res = null; g.ver = false; } g.sel = null; } save(); return render(false); }
  if (a === 'v28-ord-mov') { const p = +b.dataset.p, q = p + +b.dataset.d; if (q >= 0 && q < g.ord.length) { [g.ord[p], g.ord[q]] = [g.ord[q], g.ord[p]]; g.res = null; g.ver = false; g.sel = null; save(); render(false); } return; }
  if (a === 'v28-ord-ver') { g.intentos++; g.res = g.ord.filter((k, p) => k === p).length; g.ver = true; if (g.res === s.items.length) { v28Fin(s, g.intentos === 1); Juego.evento('acierto'); } else Juego.evento('casi'); save(); return render(false); }
  if (a === 'v28-mem') { if (g.bloq) return; const i = +b.dataset.i; if (g.vol.includes(i)) return; g.vol.push(i);
    if (g.vol.length === 2) { g.jug++; const n = s.pares.length, [x, y] = g.vol, px = g.cartas[x] % n, py = g.cartas[y] % n;
      if (px === py) { g.hechos.push(px); g.vol = []; g.fb = '✅ ¡Pareja! ' + esc(s.pares[px].porQue || ''); Juego.evento('acierto'); sumarXP(4); if (g.hechos.length === n) v28Fin(s, g.jug <= n + 2); }
      else { g.bloq = true; g.fb = '🔁 No son pareja. ¡Recuerda dónde están!'; Juego.evento('casi'); setTimeout(() => { g.vol = []; g.bloq = false; if (SL[st.slide] && SL[st.slide].id === s.id) { save(); render(false); } }, 900); } }
    save(); return render(false); }
  if (a === 'v28-rel') return v28Resp(s, +b.dataset.k);
  if (a === 'v28-rel-sig') return v28Sig(s);
  if (a === 'v28-sopa') return v28SopaTocar(s, +b.dataset.r, +b.dataset.c);
  if (a === 'v28-cand-op') { const j = +b.dataset.j, a2 = s.acertijos[j]; if (+b.dataset.o === a2.ok) { g.ok[j] = true; g.fbj = -1; Juego.evento('acierto'); sumarXP(3); } else { g.fbj = j; g.err++; Juego.evento('casi'); } save(); return render(false); }
  if (a === 'v28-cand-tecla') { if (g.cod.length < s.acertijos.length) g.cod += b.dataset.d; g.fb = ''; save(); return render(false); }
  if (a === 'v28-cand-borrar') { g.cod = g.cod.slice(0, -1); save(); return render(false); }
  if (a === 'v28-cand-abrir') { const n = s.acertijos.length, cl = s.acertijos.map(x => x.digito).join('');
    if (Object.keys(g.ok).length < n) { g.fb = '🔎 Primero resuelve todos los acertijos para tener todos los dígitos.'; g.sh = true; }
    else if (g.cod === cl) { g.abierto = true; g.fb = ''; v28Fin(s, g.err === 0, 15); Juego.evento('hito'); }
    else { g.fb = '🔁 Ese código no abre. ¿Pusiste los dígitos en el orden de los acertijos?'; g.cod = ''; g.sh = true; Juego.evento('casi'); }
    save(); return render(false); }
});
$('stage').addEventListener('change', e => { const t = e.target; if (t && t.dataset && t.dataset.accion === 'v28-rel-reloj') { const s = SL[st.slide], g = v28G(s); g.sinReloj = t.checked; v28Tok++; save(); render(false); } });

Object.assign(RENDER, { enlazar: rEnlazar, ordenar: rOrdenar, memoria: rMemoria, relampago: rRelampago, sopa: rSopa, candado: rCandado });
['enlazar', 'ordenar', 'memoria', 'relampago', 'sopa', 'candado'].forEach(t => { const f = RENDER[t]; RENDER[t] = s => { const h = f(s); if (!s.ejemplo) return h; const k = h.indexOf('</h2>'), box = '<div class="v27-ex" data-test="ejemplo"><strong>📘 Ejemplo resuelto:</strong> ' + esc(s.ejemplo) + '<br><strong>✏️ Ahora tú:</strong> es lo mismo, solo cambian los datos.</div>'; return k < 0 ? box + h : h.slice(0, k + 5) + box + h.slice(k + 5); }; });
