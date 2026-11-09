// ═══ v33 · 72 — JUEGO «EDITOR»: aplica formato (negrita, cursiva, subrayado, color) a las palabras que pide cada instrucción ═══
// Mini procesador de texto: el estudiante TOCA una palabra y luego un botón de formato (N, K, S, A). Sigue las instrucciones y pulsa «Revisar».
// Cada revisión dice cuántas instrucciones cumplió y cuántas palabras tienen formato que no se pidió, SIN decir cuáles. 2 revisiones:
// 1.ª perfecta = 1 punto · 2.ª = 0,5 · tras 2 fallos se muestra el resultado correcto (0). No toca la nota ni retiene a nadie («No me sale»).

CLAVE_HECHO.editor = 'edit_done_';
if (!TIPOS_ACTIVIDAD.includes('editor')) TIPOS_ACTIVIDAD.push('editor');

const V33_HERR = { negrita: ['N', 'Negrita'], cursiva: ['K', 'Cursiva'], subrayado: ['S', 'Subrayado'], color: ['A', 'Color rojo'] };

(function () {
  const c = document.createElement('style');
  c.textContent = '.v33-bar{display:flex;gap:6px;margin:8px 0;padding:6px;background:#e0e7ff;border-radius:12px;position:sticky;top:4px;z-index:3}' +
    '.v33-bar button{min-width:46px;min-height:46px;border:2px solid #4338ca;border-radius:10px;background:#fff;color:#1e1b4b;font:inherit;font-size:1.15rem;cursor:pointer;touch-action:manipulation}' +
    '.v33-bar button.on{background:#4338ca;color:#fff}.v33-bar button[data-t=negrita]{font-weight:900}.v33-bar button[data-t=cursiva]{font-style:italic}.v33-bar button[data-t=subrayado]{text-decoration:underline}.v33-bar button[data-t=color]{color:#dc2626;font-weight:800}' +
    '.v33-hoja{background:#fff;color:#111827;border:2px solid #94a3b8;border-radius:10px;padding:14px;margin:8px 0;font-size:1.25rem;line-height:2.1;box-shadow:inset 0 0 0 4px #f1f5f9}' +
    '.v33-pal{display:inline-block;border:2px dashed transparent;border-radius:6px;padding:0 3px;margin:0 1px;background:none;font:inherit;color:inherit;cursor:pointer;touch-action:manipulation}' +
    '.v33-pal.sel{border-color:#4338ca;background:#e0e7ff}.v33-pal.f-negrita{font-weight:900}.v33-pal.f-cursiva{font-style:italic}.v33-pal.f-subrayado{text-decoration:underline}.v33-pal.f-color{color:#dc2626}' +
    '.v33-pal.rev{border-color:#f59e0b;background:#fef3c7}.v33-pal.ok{border-color:#16a34a;background:#dcfce7}' +
    '.v33-ins{margin:6px 0 6px 18px}.v33-ins li{margin:3px 0}';
  document.head.appendChild(c);
})();

const v33G = s => { const k = 'v33_' + s.id; if (!st.acts[k]) st.acts[k] = { f: {}, sel: null, rev: 0, r: null, h: 0 }; return st.acts[k]; };
const v33Set = (g, i) => new Set(g.f[i] || []);
const v33Meta = s => { const o = {}; s.objetivos.forEach(x => { o[x.palabra] = x.formatos; }); return o; };
function v33Eval(s, g) { const m = v33Meta(s); let cumplidas = 0, sobrantes = 0;
  s.objetivos.forEach(x => { const a = v33Set(g, x.palabra); if (a.size === x.formatos.length && x.formatos.every(f => a.has(f))) cumplidas++; });
  s.texto.forEach((_, i) => { if (!(i in m) && v33Set(g, i).size) sobrantes++; }); return [cumplidas, sobrantes]; }

function rEditor(s) {
  const g = v33G(s), fin = g.r !== null, m = v33Meta(s), herr = s.herramientas || ['negrita', 'cursiva', 'subrayado', 'color'];
  const fb = fin ? (g.r === 1 ? '✅ ¡Todas las instrucciones, sin formato de más!' : g.r === 0.5 ? '✅ ¡Lo lograste en la 2.ª revisión!' : '💡 Así debía quedar el texto (marcado en amarillo). ¡La próxima lo logras!') :
    (g.rev === 1 ? '🔁 Cumpliste ' + g.ult[0] + ' de ' + s.objetivos.length + ' instrucciones' + (g.ult[1] ? ' y hay ' + g.ult[1] + ' palabra(s) con formato que no se pedía' : '') + '. Prueba otra vez (te queda 1 revisión).' : '');
  return '<h2>' + esc(s.titulo) + '</h2>' + (s.intro ? '<p>' + esc(s.intro) + '</p>' : '') +
    tarjeta('Dale formato al texto siguiendo las instrucciones.', 'Toca una palabra y luego un botón de formato. Pulsa «Revisar» cuando termines (2 revisiones y 💡 Pista).', 'Revisa (acierte o no) o pulsa «No me sale».', fin ? 'terminado' : 'en práctica') +
    '<ol class="v33-ins" data-test="ed-instr">' + s.objetivos.map(x => '<li>' + esc(x.instr) + '</li>').join('') + '</ol>' +
    '<div class="v33-bar" role="toolbar" aria-label="Formato">' + herr.map(t => '<button type="button" data-test="ed-tool" data-accion="v33-tool" data-t="' + t + '" class="' + (g.sel !== null && v33Set(g, g.sel).has(t) ? 'on' : '') + '" aria-label="' + V33_HERR[t][1] + '" aria-pressed="' + (g.sel !== null && v33Set(g, g.sel).has(t)) + '"' + (fin ? ' disabled' : '') + '>' + V33_HERR[t][0] + '</button>').join('') + '</div>' +
    '<div class="v33-hoja" data-test="ed-hoja">' + s.texto.map((w, i) => {
      const a = fin && g.r === 0 ? new Set(i in m ? m[i] : []) : v33Set(g, i), cl = ['v33-pal'].concat([...a].map(t => 'f-' + t)); if (g.sel === i && !fin) cl.push('sel'); if (fin && g.r === 0 && i in m) cl.push('rev');
      return '<button type="button" class="' + cl.join(' ') + '" data-test="ed-pal" data-accion="v33-pal" data-i="' + i + '"' + (fin ? ' disabled' : '') + '>' + esc(w) + '</button>'; }).join(' ') + '</div>' +
    (fin ? (s.porQue ? '<div class="v31-por" data-test="ed-porque"><strong>🔎 Recuerda:</strong> ' + esc(s.porQue) + '</div>' : '') : '<button type="button" class="btn dorado" data-test="ed-revisar" data-accion="v33-revisar">🔎 Revisar</button> <button type="button" class="btn" data-test="ed-pista" data-accion="v33-pista">💡 Pista</button>' + (g.h ? '<p data-test="ed-pista-txt">💡 ' + esc(s.pista || 'Primero toca la palabra (se encierra en un recuadro) y después el botón de formato. Si te equivocas, vuelve a tocar el botón para quitarlo.') + '</p>' : '')) +
    '<p data-test="ed-fb">' + fb + '</p>';
}

$('stage').addEventListener('click', e => {
  const b = e.target.closest('[data-accion^="v33-"]'); if (!b || b.disabled) return; const s = SL[st.slide], g = v33G(s), a = b.dataset.accion; if (g.r !== null) return;
  if (a === 'v33-pal') { const i = +b.dataset.i; g.sel = g.sel === i ? null : i; save(); return render(false); }
  if (a === 'v33-tool') { if (g.sel === null) { showToast('👆 Primero toca una palabra'); return; } const t = b.dataset.t, set = v33Set(g, g.sel); set.has(t) ? set.delete(t) : set.add(t); g.f[g.sel] = [...set]; save(); return render(false); }
  if (a === 'v33-pista') { g.h = 1; save(); return render(false); }
  if (a === 'v33-revisar') {
    if (!Object.values(g.f).some(x => x.length)) { showToast('✍️ Aplica algún formato antes de revisar'); return; }
    const [cum, sob] = v33Eval(s, g);
    if (cum === s.objetivos.length && sob === 0) { g.r = g.rev === 0 ? 1 : 0.5; sumarXP(g.r === 1 ? 14 : 9); Juego.evento('acierto'); }
    else { g.rev++; g.ult = [cum, sob]; Juego.evento('casi'); if (g.rev >= 2) g.r = 0; }
    if (g.r !== null) { st.acts['pts_' + s.id] = g.r; marcarActividadHecha(s.id, g.r === 1 ? 'acierto' : 'intento'); Juego.evento('actividad'); }
    save(); return render(false);
  }
});

RENDER.editor = s => { const h = rEditor(s); if (!s.ejemplo) return h; const k = h.indexOf('</h2>'), box = '<div class="v27-ex" data-test="ejemplo"><strong>📘 Ejemplo resuelto:</strong> ' + esc(s.ejemplo) + '<br><strong>✏️ Ahora tú:</strong> es lo mismo, solo cambian los datos.</div>'; return k < 0 ? box + h : h.slice(0, k + 5) + box + h.slice(k + 5); };
