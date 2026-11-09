// ═══ v32 · 71 — ACTIVIDAD «TABLA»: completa las celdas vacías (proporcionalidad, conversiones, tablas de valores) ═══
// El estudiante escribe en las celdas vacías y pulsa «Revisar». Las celdas correctas se marcan ✅ y se bloquean; las demás se pueden
// corregir. 2 revisiones: 1.ª perfecta = 1 punto · 2.ª = 0,5 · tras 2 fallos se muestran los valores (0). Acepta «3,5», «3.5», «7/2», «50 %».
// No toca la nota del quiz ni retiene a nadie («No me sale»).

CLAVE_HECHO.tabla = 'tab_done_';
if (!TIPOS_ACTIVIDAD.includes('tabla')) TIPOS_ACTIVIDAD.push('tabla');

(function () {
  const c = document.createElement('style');
  c.textContent = '.v32-tab{border-collapse:separate;border-spacing:0;margin:10px auto;max-width:100%;font-size:1.05rem;color:#1f2937}' +
    '.v32-tab th{background:#6d28d9;color:#fff;padding:8px 12px;font-weight:800}.v32-tab th:first-child{border-radius:10px 0 0 0}.v32-tab th:last-child{border-radius:0 10px 0 0}' +
    '.v32-tab td{border:2px solid #cbd5e1;padding:6px 10px;text-align:center;background:#fff;font-weight:700;min-width:76px}' +
    '.v32-tab input{width:84px;font:inherit;font-weight:800;text-align:center;border:3px solid #6d28d9;border-radius:8px;padding:6px 4px;background:#faf5ff;color:#1f2937}' +
    '.v32-tab input.ok{border-color:#16a34a;background:#dcfce7}.v32-tab input.rev{border-color:#f59e0b;background:#fef3c7}.v32-rel{background:#eef6ff;border-left:5px solid #3b82f6;border-radius:10px;padding:8px 12px;margin:8px 0;color:#1e293b}';
  document.head.appendChild(c);
})();

const v32G = s => { const k = 'v32_' + s.id; if (!st.acts[k]) st.acts[k] = { v: {}, ok: {}, rev: 0, r: null, h: 0 }; return st.acts[k]; };
const v32Blancos = s => { const o = []; s.filas.forEach((f, i) => f.forEach((x, j) => { if (x !== null && typeof x === 'object') o.push({ k: i + ',' + j, r: x.r }); })); return o; };
const v32Txt = x => typeof x === 'number' ? v27Fmt(x) : String(x);

function rTabla(s) {
  const g = v32G(s), bl = v32Blancos(s), fin = g.r !== null, buenas = Object.keys(g.ok).length;
  const fb = fin ? (g.r === 1 ? '✅ ¡Toda la tabla bien a la primera!' : g.r === 0.5 ? '✅ ¡Lo lograste en la 2.ª revisión!' : '💡 Estos son los valores. Mira la regla y vuelve a intentarlo la próxima vez.') :
    (g.rev === 1 ? '🔁 Acertaste ' + g.ult + ' de ' + bl.length + ' celdas (las verdes ya están bien). Corrige las demás (te queda 1 revisión).' : '');
  return '<h2>' + esc(s.titulo) + '</h2>' + (s.intro ? '<p>' + esc(s.intro) + '</p>' : '') +
    tarjeta('Completa las celdas vacías de la tabla.', 'Escribe el número que falta en cada celda y pulsa «Revisar» (2 revisiones y un botón 💡 Pista).', 'Revisa (acierte o no) o pulsa «No me sale».', fin ? 'terminada' : buenas + ' de ' + bl.length + ' celdas') +
    (s.relacion ? '<div class="v32-rel" data-test="tabla-relacion">' + esc(s.relacion) + '</div>' : '') +
    '<table class="v32-tab" data-test="tabla"><thead><tr>' + s.columnas.map(c => '<th>' + esc(c) + '</th>').join('') + '</tr></thead><tbody>' +
    s.filas.map((f, i) => '<tr>' + f.map((x, j) => {
      if (x === null || typeof x !== 'object') return '<td>' + esc(v32Txt(x)) + '</td>';
      const k = i + ',' + j, ok = !!g.ok[k], rev = fin && !ok, val = ok || rev ? v27Fmt(x.r) : (g.v[k] || '');
      return '<td><input type="text" inputmode="decimal" autocomplete="off" data-test="tabla-in" data-accion="v32-in" data-k="' + k + '" class="' + (ok ? 'ok' : rev ? 'rev' : '') + '" value="' + esc(val) + '" aria-label="' + esc(s.columnas[j]) + ', fila ' + (i + 1) + '"' + (ok || fin ? ' disabled' : '') + '></td>'; }).join('') + '</tr>').join('') + '</tbody></table>' +
    (fin ? '' : '<button type="button" class="btn dorado" data-test="tabla-revisar" data-accion="v32-revisar">🔎 Revisar</button> <button type="button" class="btn" data-test="tabla-pista" data-accion="v32-pista">💡 Pista</button>' + (g.h ? '<p data-test="tabla-pista-txt">💡 ' + esc(s.pista || 'Mira cómo cambia una columna cuando cambia la otra: ¿se multiplica, se divide o se suma?') + '</p>' : '')) +
    (fin && s.porQue ? '<div class="v31-por" data-test="tabla-porque"><strong>🔎 La regla:</strong> ' + esc(s.porQue) + '</div>' : '') + '<p data-test="tabla-fb">' + fb + '</p>';
}

$('stage').addEventListener('input', e => { const t = e.target; if (t && t.dataset && t.dataset.accion === 'v32-in') { const s = SL[st.slide]; v32G(s).v[t.dataset.k] = t.value; } });
$('stage').addEventListener('keydown', e => { const t = e.target; if (e.key === 'Enter' && t && t.dataset && t.dataset.accion === 'v32-in') { e.preventDefault(); const b = document.querySelector('[data-accion="v32-revisar"]'); if (b) b.click(); } });
$('stage').addEventListener('click', e => {
  const b = e.target.closest('[data-accion^="v32-"]'); if (!b || b.disabled) return; const s = SL[st.slide], g = v32G(s), a = b.dataset.accion; if (g.r !== null) return;
  if (a === 'v32-pista') { g.h = 1; save(); return render(false); }
  if (a === 'v32-revisar') {
    const bl = v32Blancos(s); if (!bl.some(x => (g.v[x.k] || '').trim() !== '' || g.ok[x.k])) { showToast('✍️ Escribe algún número en la tabla'); return; }
    bl.forEach(x => { const t = (g.v[x.k] || '').trim(); if (!g.ok[x.k] && t !== '') { const v = v27Val(t); if (!isNaN(v) && Math.abs(v - x.r) < 1e-9) g.ok[x.k] = true; } });
    const buenas = Object.keys(g.ok).length;
    if (buenas === bl.length) { g.r = g.rev === 0 ? 1 : 0.5; sumarXP(g.r === 1 ? 14 : 9); Juego.evento('acierto'); }
    else { g.rev++; g.ult = buenas; Juego.evento('casi'); if (g.rev >= 2) g.r = 0; }
    if (g.r !== null) { st.acts['pts_' + s.id] = g.r; marcarActividadHecha(s.id, g.r === 1 ? 'acierto' : 'intento'); Juego.evento('actividad'); }
    save(); return render(false);
  }
});

RENDER.tabla = s => { const h = rTabla(s); if (!s.ejemplo) return h; const k = h.indexOf('</h2>'), box = '<div class="v27-ex" data-test="ejemplo"><strong>📘 Ejemplo resuelto:</strong> ' + esc(s.ejemplo) + '<br><strong>✏️ Ahora tú:</strong> es lo mismo, solo cambian los datos.</div>'; return k < 0 ? box + h : h.slice(0, k + 5) + box + h.slice(k + 5); };
