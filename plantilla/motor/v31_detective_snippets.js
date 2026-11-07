// ═══ v31 · 69 — JUEGO «DETECTIVE»: encuentra las señales sospechosas en un correo, mensaje o sitio web ═══
// El estudiante toca las partes que parecen sospechosas (🚩) y pulsa «Revisar». Cada revisión dice cuántas pistas
// encontró y cuántas señales eran falsas alarmas, SIN decir cuáles. 1.ª revisión perfecta = 1 punto · 2.ª = 0,5 ·
// si no lo logra en 2 revisiones se muestran todas las pistas con su explicación (0). No toca la nota ni retiene a nadie.

CLAVE_HECHO.detective = 'det_done_';
if (!TIPOS_ACTIVIDAD.includes('detective')) TIPOS_ACTIVIDAD.push('detective');

(function () {
  const c = document.createElement('style');
  c.textContent = '.v31-msg{border:2px solid #94a3b8;border-radius:14px;background:#fff;color:#1f2937;padding:10px 12px;margin:10px 0}.v31-msg .ctx{font-weight:800;color:#475569;margin-bottom:6px}' +
    '.v31-lin{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:6px 0}.v31-fijo{font-weight:700;color:#64748b}' +
    '.v31-seg{border:2px dashed #94a3b8;background:#f8fafc;color:#1f2937;border-radius:10px;padding:6px 9px;font:inherit;font-size:.92rem;cursor:pointer;text-align:left;touch-action:manipulation}' +
    '.v31-seg.sel{border:2px solid #dc2626;background:#fee2e2}.v31-seg.sel::before{content:"🚩 "}.v31-seg.ok{border:2px solid #16a34a;background:#dcfce7}.v31-seg.ok::before{content:"✅ "}' +
    '.v31-seg.miss{border:2px solid #f59e0b;background:#fef3c7}.v31-seg.miss::before{content:"🔎 "}.v31-seg.falsa{border:2px solid #94a3b8;background:#f1f5f9}.v31-seg.falsa::before{content:"👍 "}.v31-seg:disabled{cursor:default}' +
    '.v31-por{background:#eef6ff;border-left:5px solid #3b82f6;border-radius:10px;padding:8px 12px;margin:10px 0;color:#1e293b}.v31-por li{margin:4px 0}';
  document.head.appendChild(c);
})();

const v31G = s => { const k = 'v31_' + s.id; if (!st.acts[k]) st.acts[k] = { sel: [], rev: 0, r: null, h: 0 }; return st.acts[k]; };
const v31Claves = (s, soloPistas) => { const o = []; s.lineas.forEach((l, i) => l.forEach((p, j) => { if (!p.fijo && (!soloPistas || p.s)) o.push(i + ',' + j); })); return o; };

function rDetective(s) {
  const g = v31G(s), pistas = v31Claves(s, true), fin = g.r !== null, enc = g.sel.filter(k => pistas.includes(k)).length;
  const fb = fin ? (g.r === 1 ? '🕵️ ¡Detective de primera! Encontraste todas las pistas sin falsas alarmas.' : g.r === 0.5 ? '🕵️ ¡Lo lograste en la 2.ª revisión!' : '💡 Aquí tienes todas las pistas. ¡La próxima las encuentras!') : (g.rev === 1 ? '🔁 Encontraste ' + g.ult[0] + ' de ' + pistas.length + ' pistas' + (g.ult[1] ? ' y ' + g.ult[1] + ' señal(es) que en realidad estaban bien' : '') + '. Prueba otra vez (te queda 1 revisión).' : '');
  return '<h2>' + esc(s.titulo) + '</h2>' + (s.intro ? '<p>' + esc(s.intro) + '</p>' : '') +
    tarjeta('Encuentra las ' + pistas.length + ' señales sospechosas.', 'Toca las partes que te parezcan sospechosas 🚩 y pulsa «Revisar» (tienes 2 revisiones y un botón 💡 Pista).', 'Revisa (acierte o no) o pulsa «No me sale».', fin ? 'terminado' : g.sel.length + ' marcadas') +
    '<div class="v31-msg" data-test="det-msg"><div class="ctx">' + esc(s.contexto || 'Mensaje') + '</div>' + s.lineas.map((l, i) => '<div class="v31-lin">' + l.map((p, j) => {
      if (p.fijo) return '<span class="v31-fijo">' + esc(p.t) + '</span>';
      const k = i + ',' + j, m = g.sel.includes(k); let cl = m ? 'sel' : '';
      if (fin) cl = p.s ? (m ? 'ok' : 'miss') : (m ? 'falsa' : '');
      return '<button type="button" class="v31-seg ' + cl + '" data-test="det-seg" data-accion="v31-seg" data-k="' + k + '" data-s="' + (p.s ? 1 : 0) + '" aria-pressed="' + m + '"' + (fin ? ' disabled' : '') + '>' + esc(p.t) + '</button>'; }).join('') + '</div>').join('') + '</div>' +
    (fin ? '<div class="v31-por" data-test="det-porque"><strong>🔎 Las pistas eran:</strong><ul>' + s.lineas.flat().filter(p => p.s).map(p => '<li><strong>' + esc(p.t) + '</strong>: ' + esc(p.porQue) + '</li>').join('') + '</ul></div>' :
      '<button type="button" class="btn dorado" data-test="det-revisar" data-accion="v31-revisar">🔎 Revisar</button> <button type="button" class="btn" data-test="det-pista" data-accion="v31-pista">💡 Pista</button>' + (g.h ? '<p data-test="det-pista-txt">💡 ' + esc(s.pista || 'Mira con calma el remitente, el asunto, los enlaces y si te meten prisa o piden datos.') + '</p>' : '')) +
    '<p data-test="det-fb">' + fb + '</p>';
}

$('stage').addEventListener('click', e => {
  const b = e.target.closest('[data-accion^="v31-"]'); if (!b || b.disabled) return; const s = SL[st.slide], g = v31G(s), a = b.dataset.accion; if (g.r !== null) return;
  if (a === 'v31-seg') { const k = b.dataset.k, i = g.sel.indexOf(k); i < 0 ? g.sel.push(k) : g.sel.splice(i, 1); save(); return render(false); }
  if (a === 'v31-pista') { g.h = 1; save(); return render(false); }
  if (a === 'v31-revisar') {
    const pistas = v31Claves(s, true), enc = g.sel.filter(k => pistas.includes(k)).length, fal = g.sel.length - enc;
    if (!g.sel.length) { showToast('👆 Primero marca lo que te parezca sospechoso'); return; }
    if (fal === 0 && enc === pistas.length) { g.r = g.rev === 0 ? 1 : 0.5; sumarXP(g.r === 1 ? 14 : 9); Juego.evento('acierto'); }
    else { g.rev++; g.ult = [enc, fal]; Juego.evento('casi'); if (g.rev >= 2) { g.r = 0; } }
    if (g.r !== null) { st.acts['pts_' + s.id] = g.r; marcarActividadHecha(s.id, g.r === 1 ? 'acierto' : 'intento'); Juego.evento('actividad'); }
    save(); return render(false);
  }
});

RENDER.detective = s => { const h = rDetective(s); if (!s.ejemplo) return h; const k = h.indexOf('</h2>'), box = '<div class="v27-ex" data-test="ejemplo"><strong>📘 Ejemplo resuelto:</strong> ' + esc(s.ejemplo) + '<br><strong>✏️ Ahora tú:</strong> es lo mismo, solo cambian los datos.</div>'; return k < 0 ? box + h : h.slice(0, k + 5) + box + h.slice(k + 5); };
