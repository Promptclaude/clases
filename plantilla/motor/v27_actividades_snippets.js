// ═══ v27 · 65 — ACTIVIDADES VISUALES TIPO «PROCESO DE NIVELACIÓN» ═══
// Tipos nuevos: cuadricula · recta · comparar · podio (con 2 intentos + pista por punto) · abierta · cuaderno
// + «ejemplo resuelto → ahora tú» (campo `ejemplo`) en cualquier actividad.
// Regla del motor que se mantiene: NINGUNA de estas actividades toca la nota del quiz ni retiene a nadie.
// Los puntos (1 · 0,5 · 0) quedan en st.acts['pts_<id>'] solo como dato para el docente.

Object.assign(CLAVE_HECHO, { cuadricula: 'cuad_done_', recta: 'recta_done_', comparar: 'cmp_done_', podio: 'podio_done_', abierta: 'abierta_done_', cuaderno: 'cuaderno_done_' });
['cuadricula', 'recta', 'comparar', 'podio', 'abierta', 'cuaderno'].forEach(t => { if (!TIPOS_ACTIVIDAD.includes(t)) TIPOS_ACTIVIDAD.push(t); });

(function () {
  const css = document.createElement('style');
  css.textContent = '.v27-it{border:2px solid rgba(127,127,127,.35);border-radius:14px;padding:10px 12px;margin:10px 0}' +
    '.v27-it.ok{border-color:#22c55e}.v27-it.mal{border-color:#f59e0b}' +
    '.v27-cuad{display:grid;grid-template-columns:repeat(10,1fr);gap:3px;max-width:340px;margin:8px 0}' +
    '.v27-cuad button{aspect-ratio:1;border:1px solid #64748b;background:#fff;border-radius:3px;cursor:pointer;padding:0}' +
    '.v27-cuad button.on{background:#fbbf24}.v27-cuad button:disabled{cursor:default}' +
    '.v27-recta{display:flex;gap:3px;align-items:flex-end;margin:8px 0;padding-bottom:4px}' +
    '.v27-recta button{flex:1 1 0;min-width:0;border:2px solid #64748b;background:#fff;border-radius:8px;padding:10px 0;cursor:pointer;font-size:.72rem;color:#1f2937}' +
    '.v27-recta button.on{background:#fbbf24;border-color:#b45309}' +
    '.v27-ex{background:#eef6ff;border-left:5px solid #3b82f6;border-radius:10px;padding:10px 12px;margin:10px 0;color:#1e293b}' +
    '.v27-cmp button{font-size:1.4rem;min-width:56px;margin:0 4px}.v27-cmp button.on{outline:3px solid #fbbf24}' +
    '.v27-abierta textarea{width:100%;min-height:90px;border-radius:10px;border:2px solid #94a3b8;padding:8px;font:inherit}' +
    '.v27-cuaderno{background:#fffbeb;border:2px dashed #d97706;border-radius:12px;padding:12px;margin:10px 0;color:#1f2937}' +
    '@media print{.v27-noprint{display:none!important}}';
  document.head.appendChild(css);
})();

const v27N = x => String(x).replace(/\s/g, '').replace(',', '.');
const v27Fmt = n => String(Math.round(n * 1000) / 1000).replace('.', ',');
const v27Est = s => { const k = 'v27_' + s.id; if (!st.acts[k]) st.acts[k] = {}; return st.acts[k]; };
const v27Item = (s, i) => { const e = v27Est(s); if (!e[i]) e[i] = { v: null, t: 0, r: null, h: 0 }; return e[i]; };
const v27Items = s => s.type === 'cuadricula' || s.type === 'recta' || s.type === 'comparar' || s.type === 'podio' ? s.items : [];

// ── por tipo: qué se muestra, qué es correcto, pista y solución ──
const V27 = {
  cuadricula: {
    vacio: it => !(it.v && it.v.length),
    ok: (s, i, v) => v.length === s.items[i].objetivo,
    pista: (s, i) => s.items[i].pista || 'Cuenta cuántos cuadritos necesitas y sombréalos.',
    sol: (s, i) => 'Había que sombrear ' + s.items[i].objetivo + ' cuadritos.',
    ctl: (s, i, it, bloq) => { const n = s.items[i].total || 100, sel = it.v || [];
      return '<div class="v27-cuad" role="group" aria-label="Cuadrícula">' + Array.from({ length: n }, (_, c) => '<button type="button" data-test="cuad-celda" data-accion="v27-celda" data-i="' + i + '" data-c="' + c + '" class="' + (sel.includes(c) ? 'on' : '') + '" aria-label="Cuadrito ' + (c + 1) + '"' + (bloq ? ' disabled' : '') + '></button>').join('') + '</div><p>Sombreados: <strong>' + sel.length + '</strong></p>'; }
  },
  recta: {
    vacio: it => it.v == null,
    marca: (s, i) => { const x = s.items[i], p = x.paso || 0.1; return Math.round((x.valor - (x.inicio || 0)) / p); },
    ok(s, i, v) { return v === this.marca(s, i); },
    pista: (s, i) => s.items[i].pista || 'Cada marca vale ' + v27Fmt(s.items[i].paso || 0.1) + '. Cuenta las marcas desde ' + v27Fmt(s.items[i].inicio || 0) + '.',
    sol(s, i) { return 'Era la marca ' + v27Fmt(s.items[i].valor) + '.'; },
    ctl: (s, i, it, bloq) => { const x = s.items[i], p = x.paso || 0.1, d = x.divisiones || 10, a = x.inicio || 0;
      return '<div class="v27-recta" role="group" aria-label="Recta numérica">' + Array.from({ length: d + 1 }, (_, m) => '<button type="button" data-test="marca" data-accion="v27-marca" data-i="' + i + '" data-m="' + m + '" class="' + (it.v === m ? 'on' : '') + '"' + (bloq ? ' disabled' : '') + '>' + ((m === 0 || m === d || m % 5 === 0) ? v27Fmt(a + m * p) : '·') + '</button>').join('') + '</div>'; }
  },
  comparar: {
    vacio: it => it.v == null,
    signo: x => x.signo || (parseFloat(v27N(x.a)) < parseFloat(v27N(x.b)) ? '<' : parseFloat(v27N(x.a)) > parseFloat(v27N(x.b)) ? '>' : '='),
    ok(s, i, v) { return v === this.signo(s.items[i]); },
    pista: (s, i) => s.items[i].pista || 'Compara primero la parte entera; si es igual, las décimas, luego las centésimas. Iguala las cifras con ceros.',
    sol(s, i) { return s.items[i].a + ' ' + this.signo(s.items[i]) + ' ' + s.items[i].b; },
    ctl: (s, i, it, bloq) => '<span class="v27-cmp">' + ['<', '=', '>'].map(sg => '<button type="button" class="btn ' + (it.v === sg ? 'on' : '') + '" data-test="cmp" data-accion="v27-signo" data-i="' + i + '" data-v="' + sg + '"' + (bloq ? ' disabled' : '') + '>' + (sg === '<' ? '&lt;' : sg === '>' ? '&gt;' : '=') + '</button>').join('') + '</span>'
  },
  podio: {
    vacio: it => it.v == null || it.v === '',
    ok: (s, i, v) => +v === s.items[i].puesto,
    pista: (s, i) => s.items[i].pista || 'Compara los valores: el puesto 1 es el primero según la regla del enunciado.',
    sol: (s, i) => 'Iba en el puesto ' + s.items[i].puesto + '.',
    ctl: (s, i, it, bloq) => '<select data-test="puesto" data-accion="v27-puesto" data-i="' + i + '" aria-label="Puesto"' + (bloq ? ' disabled' : '') + '><option value="">Puesto…</option>' + s.items.map((_, p) => '<option value="' + (p + 1) + '"' + (+it.v === p + 1 ? ' selected' : '') + '>' + (p + 1) + '.º</option>').join('') + '</select>'
  }
};
const v27Texto = (s, i) => { const x = s.items[i]; return s.type === 'comparar' ? '<strong>' + esc(x.a) + '</strong> ___ <strong>' + esc(x.b) + '</strong>' : s.type === 'podio' ? esc(x.texto) : esc(x.enunciado || ''); };

function rItems27(s) {
  const e = v27Est(s), n = s.items.length, hechos = s.items.filter((_, i) => v27Item(s, i).r !== null).length, T = V27[s.type];
  const misiones = { cuadricula: 'Sombrea la cantidad de cuadritos que pide cada punto.', recta: 'Toca la marca de la recta que corresponde a cada número.', comparar: 'Elige el signo &lt;, &gt; o = para cada pareja.', podio: 'Elige el puesto de cada participante.' };
  return '<h2>' + esc(s.titulo) + '</h2>' + (s.intro ? '<p>' + esc(s.intro) + '</p>' : '') +
    tarjeta(misiones[s.type], 'Cada punto tiene <strong>2 intentos</strong> y un botón 💡 Pista.', 'Resuelve cada punto (¡aunque dudes!) o pulsa «No me sale».', hechos + ' de ' + n + ' puntos') +
    s.items.map((x, i) => { const it = v27Item(s, i), bloq = it.r !== null, ok = it.r === 1 || it.r === 0.5;
      const fb = it.r === 1 ? '✅ ¡Eso! ' + esc(x.porQue || '') : it.r === 0.5 ? '✅ ¡Lo lograste en el 2.º intento! ' + esc(x.porQue || '') : it.r === 0 ? '💡 Así se resuelve: ' + esc(T.sol(s, i)) + ' ' + esc(x.porQue || '') : (it.t === 1 ? '🔁 Casi. Prueba otra vez (te queda 1 intento).' : '');
      return '<div class="v27-it ' + (bloq ? (ok ? 'ok' : 'mal') : '') + '" data-i="' + i + '"><p>' + v27Texto(s, i) + '</p>' + T.ctl(s, i, it, bloq) +
        (bloq ? '' : '<button type="button" class="btn dorado" data-test="verificar-item" data-accion="v27-verificar" data-i="' + i + '">✔ Verificar</button> <button type="button" class="btn" data-test="pista-item" data-accion="v27-pista" data-i="' + i + '">💡 Pista</button>') +
        (it.h ? '<p data-test="pista-txt">💡 ' + esc(T.pista(s, i)) + '</p>' : '') + '<p data-test="item-fb">' + fb + '</p></div>'; }).join('');
}

function rAbierta(s) {
  const txt = st.acts['abierta_txt_' + s.id] || [], min = s.minPalabras || 5, ok = !!st.acts['abierta_done_' + s.id];
  return '<h2>' + esc(s.titulo) + '</h2>' + (s.intro ? '<p>' + esc(s.intro) + '</p>' : '') +
    tarjeta('Escribe con tus propias palabras.', 'Responde cada punto (mínimo ' + min + ' palabras) y pulsa «Guardar respuesta».', 'Guarda tus respuestas (tu docente las revisa).', ok ? 'guardado' : 'sin guardar') +
    '<div class="v27-abierta">' + s.prompts.map((p, j) => '<p><strong>' + (j + 1) + '.</strong> ' + esc(p) + '</p><textarea data-test="abierta-txt" data-accion="v27-texto" data-j="' + j + '" aria-label="Respuesta ' + (j + 1) + '">' + esc(txt[j] || '') + '</textarea><p><small>Palabras: <span data-wc="' + j + '">' + ((txt[j] || '').trim() ? (txt[j] || '').trim().split(/\s+/).length : 0) + '</span> / ' + min + '</small></p>').join('') + '</div>' +
    '<button type="button" class="btn dorado" data-test="abierta-guardar" data-accion="v27-guardar-abierta">💾 Guardar respuesta</button><p data-test="abierta-fb">' + (ok ? '✅ Respuesta guardada. Tu docente la revisará.' : '') + '</p>';
}

function rCuaderno(s) {
  const ok = !!st.acts['cuaderno_ok_' + s.id];
  return '<h2>' + esc(s.titulo) + '</h2><div class="v27-cuaderno"><strong>📓 Esta hoja se hace a mano, en tu cuaderno.</strong> Escribe arriba: <em>' + esc(s.encabezado || (CONFIG_CLASE.titulo + ' · tu nombre y la fecha')) + '</em>. Usa lápiz, letra clara y deja visibles tus operaciones.</div>' +
    s.partes.map(p => '<div class="v27-cuaderno"><h3>' + esc(p.titulo) + '</h3>' + (p.instrucciones ? '<p>' + esc(p.instrucciones) + '</p>' : '') + '<ol>' + p.puntos.map(x => '<li>' + esc(x) + '</li>').join('') + '</ol></div>').join('') +
    '<label class="v27-noprint"><input type="checkbox" data-test="cuaderno-ok" data-accion="v27-cuaderno" aria-label="Hice la hoja en mi cuaderno"' + (ok ? ' checked' : '') + '> ✅ Hice la hoja a mano en mi cuaderno y la entregaré a mi docente.</label> ' +
    '<button type="button" class="btn v27-noprint" data-test="imprimir" data-accion="v27-imprimir">🖨 Imprimir esta hoja</button>';
}

// «ejemplo resuelto → ahora tú» en cualquier actividad con campo `ejemplo`
const v27Ejemplo = html => s => { const h = html(s); if (!s.ejemplo) return h; const box = '<div class="v27-ex" data-test="ejemplo"><strong>📘 Ejemplo resuelto:</strong> ' + esc(s.ejemplo) + '<br><strong>✏️ Ahora tú:</strong> es lo mismo, solo cambian los datos.</div>', k = h.indexOf('</h2>'); return k < 0 ? box + h : h.slice(0, k + 5) + box + h.slice(k + 5); };
Object.assign(RENDER, { cuadricula: rItems27, recta: rItems27, comparar: rItems27, podio: rItems27, abierta: rAbierta, cuaderno: rCuaderno });
Object.keys(RENDER).forEach(t => { if (!['intro', 'final', 'quiz', 'evalFinal'].includes(t)) RENDER[t] = v27Ejemplo(RENDER[t]); });

// ── eventos ──
function v27Cerrar(s) {
  const n = s.items.length, ps = s.items.map((_, i) => v27Item(s, i).r);
  if (ps.some(r => r === null)) return;
  st.acts['pts_' + s.id] = ps.reduce((a, r) => a + r, 0);
  marcarActividadHecha(s.id, ps.every(r => r === 1) ? 'acierto' : 'intento'); sumarXP(10); Juego.evento('actividad');
}
$('stage').addEventListener('click', e => {
  const b = e.target.closest('[data-accion^="v27-"]'); if (!b || b.disabled) return; const s = SL[st.slide], a = b.dataset.accion, i = +b.dataset.i;
  if (a === 'v27-celda') { const it = v27Item(s, i); if (it.r !== null) return; const sel = it.v || (it.v = []), c = +b.dataset.c, k = sel.indexOf(c); k < 0 ? sel.push(c) : sel.splice(k, 1); save(); return render(false); }
  if (a === 'v27-marca') { const it = v27Item(s, i); if (it.r !== null) return; it.v = +b.dataset.m; save(); return render(false); }
  if (a === 'v27-signo') { const it = v27Item(s, i); if (it.r !== null) return; it.v = b.dataset.v; save(); return render(false); }
  if (a === 'v27-pista') { v27Item(s, i).h = 1; save(); return render(false); }
  if (a === 'v27-verificar') { const it = v27Item(s, i), T = V27[s.type]; if (it.r !== null) return; if (T.vacio(it)) { showToast('👆 Primero responde'); return; }
    it.t++; const ok = T.ok(s, i, it.v); if (ok) { it.r = it.t === 1 ? 1 : 0.5; sumarXP(it.t === 1 ? 8 : 5); } else if (it.t >= 2) it.r = 0;
    Juego.evento(ok ? 'acierto' : 'casi'); v27Cerrar(s); save(); return render(false); }
  if (a === 'v27-guardar-abierta') { const min = s.minPalabras || 5, txt = st.acts['abierta_txt_' + s.id] || [];
    const faltan = s.prompts.filter((_, j) => ((txt[j] || '').trim().split(/\s+/).filter(Boolean).length) < min).length;
    if (faltan) { showToast('✍️ Escribe al menos ' + min + ' palabras en cada punto'); return; }
    st.acts['abierta_ok_' + s.id] = true; marcarActividadHecha(s.id, 'acierto'); sumarXP(10); Juego.evento('actividad'); save(); return render(false); }
  if (a === 'v27-imprimir') { window.print(); return; }
});
$('stage').addEventListener('input', e => {
  const t = e.target; if (!t || t.dataset.accion !== 'v27-texto') return; const s = SL[st.slide], j = +t.dataset.j;
  const arr = st.acts['abierta_txt_' + s.id] = st.acts['abierta_txt_' + s.id] || []; arr[j] = t.value;
  const w = t.value.trim() ? t.value.trim().split(/\s+/).length : 0, c = document.querySelector('[data-wc="' + j + '"]'); if (c) c.textContent = w;
});
$('stage').addEventListener('change', e => {
  const t = e.target; if (!t || !t.dataset || !t.dataset.accion) return; const s = SL[st.slide];
  if (t.dataset.accion === 'v27-puesto') { const it = v27Item(s, +t.dataset.i); if (it.r !== null) return; it.v = t.value; save(); }
  if (t.dataset.accion === 'v27-cuaderno') { st.acts['cuaderno_ok_' + s.id] = t.checked; if (t.checked) { marcarActividadHecha(s.id, 'acierto'); sumarXP(10); Juego.evento('actividad'); } save(); render(false); }
});
