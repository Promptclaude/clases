// ═══ v37 · MODO JUEGO: lo que ya funciona en el juego de las tablas (Ninja Multiplicación), llevado a las clases ═══
// Origen de cada pieza (repositorio del juego → clase):
//   engine/ui/rendimiento-2026.js   → v37Rendimiento(): modo ahorro automático (html.fx-low) para los PC lentos del laboratorio
//   engine/fx-engine.js (weather)   → v37Clima(): partículas de ambiente según meta.tema (estrellas, burbujas, luciérnagas, brasas…)
//   engine/ui/interaccion-2026.js   → v37Toques(): chispas al tocar botones y opciones
//   engine/ui/transicion-2026.js    → v37Portal(): portal de color del tema al cambiar de pantalla
//   engine/combate/racha.js         → v37Racha(): «🔥 Racha ×N» que crece con cada acierto seguido
//   engine/combate/jefe-cinematica  → v37Jefe(): el «Reto final» es un JEFE con barra de vida que baja con cada acierto
// REGLAS (iguales a v36): es SOLO presentación. No toca nota, avance ni lo guardado (st). No bloquea: todo es pointer-events:none.
// Si algo falla, la clase sigue igual (cada pieza va en try/catch). Con «reducir movimiento» o en modo ahorro se apaga lo pesado.
// Forzar el modo ahorro a mano: ?fx=low  ·  forzar efectos completos: ?fx=high  ·  automático: ?fx=auto

const V37_CLIMA = {   // partícula por tema: color y forma (todo con CSS, sin imágenes: 0 KB)
  espacio:  { color: '#ffffff', forma: 'estrella', n: 16 },
  oceano:   { color: '#bfe9ff', forma: 'burbuja',  n: 14 },
  bosque:   { color: '#e9ff7a', forma: 'luz',      n: 14 },
  volcan:   { color: '#ff9a3c', forma: 'brasa',    n: 16 },
  dulce:    { color: '#ffd1f0', forma: 'confeti',  n: 14 },
  desierto: { color: '#f5d9a0', forma: 'arena',    n: 16 }
};
const V37_FONDO = 'asset://fondo-tema';   // construir_clase.py lo cambia por el fondo del tema de ESTA clase (o '' si no hay tema)
let v37RachaMax = 0, v37Listo = false, v37Racha_n = 0, v37UltSlide = -1, v37Activos = 0, v37Cine = {};

(function () {
  const c = document.createElement('style');
  c.textContent =
    // fondo ilustrado: montañas del juego en el borde inferior (imagen quieta: barata aun en modo ahorro)
    '#v37-fondo{position:fixed;left:0;right:0;bottom:0;height:min(30vh,260px);z-index:0;pointer-events:none;background-repeat:repeat-x;background-position:center bottom;background-size:auto 100%;opacity:.7;-webkit-mask-image:linear-gradient(to top,#000 55%,transparent);mask-image:linear-gradient(to top,#000 55%,transparent)}' +
    '#fx-intro .v37-fondo-intro{position:absolute;left:0;right:0;bottom:0;height:26vh;pointer-events:none;background-repeat:repeat-x;background-position:center bottom;background-size:auto 100%;opacity:.95;-webkit-mask-image:linear-gradient(to top,#000 60%,transparent);mask-image:linear-gradient(to top,#000 60%,transparent)}' +
    // logros de la pantalla final
    '.v37-logros{margin:10px 0;padding:10px;border-radius:14px;background:#f5f0ff;border:3px solid #b45cff}.v37-logros h3{margin:0 0 8px;font-size:1rem}' +
    '.v37-logros ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:8px}' +
    '.v37-logros li{text-align:center;font-size:.74rem;font-weight:800;line-height:1.15;padding:6px 4px;border-radius:10px;background:#fff;border:2px solid #d9c9ff}' +
    '.v37-logros li img{width:44px;height:44px;display:block;margin:0 auto 4px}.v37-logros li small{display:block;font-weight:600;opacity:.85}' +
    '.v37-logros li.ok{border-color:#FFB800;box-shadow:0 0 10px #ffb80088}.v37-logros li.no img{filter:grayscale(1) opacity(.45)}.v37-logros li.no{color:#555}' +
    // capa de clima (detrás de la tarjeta, nunca tapa nada)
    '#app{z-index:1}#v37-clima{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}' +
    '#v37-clima i{position:absolute;top:-5vh;left:var(--x);width:var(--s);height:var(--s);background:var(--c);opacity:0;animation:v37cae var(--d) linear var(--r) infinite}' +
    '#v37-clima i.estrella{border-radius:50%;box-shadow:0 0 6px var(--c);animation-name:v37titila}' +
    '#v37-clima i.burbuja{border-radius:50%;background:transparent;border:2px solid var(--c);top:auto;bottom:-6vh;animation-name:v37sube}' +
    '#v37-clima i.luz{border-radius:50%;box-shadow:0 0 10px 2px var(--c);animation-name:v37flota}' +
    '#v37-clima i.brasa{border-radius:50%;box-shadow:0 0 8px 2px var(--c);top:auto;bottom:-6vh;animation-name:v37sube}' +
    '#v37-clima i.confeti{border-radius:3px;animation-name:v37cae}' +
    '#v37-clima i.arena{border-radius:50%;animation-name:v37viento;top:var(--y)}' +
    '@keyframes v37cae{0%{opacity:0;transform:translateY(0) rotate(0)}10%{opacity:.8}90%{opacity:.6}100%{opacity:0;transform:translateY(108vh) rotate(300deg)}}' +
    '@keyframes v37sube{0%{opacity:0;transform:translateY(0) translateX(0)}15%{opacity:.7}100%{opacity:0;transform:translateY(-108vh) translateX(var(--w))}}' +
    '@keyframes v37titila{0%,100%{opacity:.1;top:var(--y)}50%{opacity:.9;top:var(--y)}}' +
    '@keyframes v37flota{0%,100%{opacity:.15;transform:translate(0,0);top:var(--y)}50%{opacity:.95;transform:translate(var(--w),-3vh);top:var(--y)}}' +
    '@keyframes v37viento{0%{opacity:0;transform:translateX(-8vw)}15%{opacity:.6}100%{opacity:0;transform:translateX(112vw)}}' +
    // chispas al tocar
    '.v37-chispa{position:fixed;z-index:80;width:9px;height:9px;border-radius:50%;pointer-events:none;animation:v37chispa .6s ease-out forwards}' +
    '@keyframes v37chispa{from{opacity:1;transform:translate(-50%,-50%) scale(1)}to{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(.2)}}' +
    // portal entre pantallas (el color sale del tema de la clase)
    '#v37-portal{position:fixed;inset:0;z-index:35;pointer-events:none;background:radial-gradient(circle at 50% 55%,transparent 0,var(--mundo-primario) 55%,var(--mundo-fondo) 100%);animation:v37portal .55s ease-out forwards}' +
    '@keyframes v37portal{0%{opacity:0;clip-path:circle(0% at 50% 55%)}30%{opacity:.85}100%{opacity:0;clip-path:circle(95% at 50% 55%)}}' +
    // tarjeta: franja del color de la etapa + textura suave (la clase deja de verse como una sola tarjeta blanca)
    '#stage{background-image:radial-gradient(circle at 1px 1px,rgba(60,40,140,.07) 1px,transparent 0);background-size:16px 16px;box-shadow:0 8px 0 #1d1450,inset 0 7px 0 var(--etapa,transparent)}' +
    // «Siguiente» llama la atención cuando se habilita (3 latidos y se calma)
    '#btn-next:not(:disabled):not([aria-disabled=true]){animation:v37latido 1.3s ease-in-out 3}' +
    '@keyframes v37latido{0%,100%{transform:scale(1)}40%{transform:scale(1.07)}}' +
    // racha
    '#v37-racha{position:fixed;left:50%;top:calc(env(safe-area-inset-top,0px) + 52px);transform:translateX(-50%) scale(.8);z-index:55;pointer-events:none;opacity:0;transition:opacity .25s,transform .25s;' +
    'font-weight:900;font-size:.95rem;color:#fff;padding:5px 14px;border-radius:99px;background:linear-gradient(90deg,#FF6A00,#FF2E2E);border:3px solid #FFD54A;box-shadow:0 0 16px #FF7A00;text-shadow:0 1px 0 #0006}' +
    '#v37-racha.on{opacity:1;transform:translateX(-50%) scale(1)}#v37-racha.pop{animation:v37pop .35s ease-out}' +
    '@keyframes v37pop{0%{transform:translateX(-50%) scale(1.5)}100%{transform:translateX(-50%) scale(1)}}' +
    '#stage.v37-fuego{box-shadow:0 8px 0 #1d1450,inset 0 7px 0 var(--etapa,transparent),0 0 0 3px #FFB800,0 0 22px #ff7a00}' +
    // jefe final
    '.v37-jefe{margin:6px 0 10px;padding:8px 12px;border-radius:14px;background:#2a0a3d;color:#fff;border:3px solid #b45cff}' +
    '.v37-jefe-cab{display:flex;align-items:center;justify-content:space-between;gap:8px;font-weight:900;letter-spacing:.04em}.v37-jefe-cab small{font-size:.78rem;opacity:.9}' +
    '.v37-hp{height:14px;margin-top:6px;border-radius:99px;background:#0006;border:2px solid #b45cff;overflow:hidden}.v37-hp i{display:block;height:100%;background:linear-gradient(90deg,#ff3b5c,#ff9a3c);transition:width .5s}' +
    '.v37-jefe.muerto{background:#0b3d1d;border-color:#22c55e}.v37-jefe.muerto .v37-hp i{width:0!important}' +
    '#v37-cine{position:fixed;inset:0;z-index:48;pointer-events:none;color:#fff;animation:v37cine 1.7s ease forwards}' +
    '#v37-cine::before,#v37-cine::after{content:"";position:absolute;left:0;right:0;height:11vh;background:#000}#v37-cine::before{top:0}#v37-cine::after{bottom:0}' +
    '#v37-cine b{position:absolute;left:0;right:0;top:44%;text-align:center;font-size:clamp(1.6rem,8vw,3rem);text-shadow:0 0 16px #b45cff,0 4px 0 #000;background:linear-gradient(90deg,transparent,#2a0a3dcc,transparent);padding:10px 0}' +
    '@keyframes v37cine{0%{opacity:0}15%{opacity:1}80%{opacity:1}100%{opacity:0}}' +
    // sin movimiento o equipo lento: se apaga lo decorativo (lo importante sigue siendo texto)
    'html.fx-low #v37-clima,html.fx-low #v37-portal,html.fx-low #v37-cine{display:none}html.fx-low #btn-next{animation:none!important}' +
    '@media (prefers-reduced-motion:reduce){#v37-clima,#v37-portal,#v37-cine,.v37-chispa{display:none}}';
  document.head.appendChild(c);
})();

function v37SinMovimiento() {
  return (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) || !!(TEST && TEST.sinMovimiento) || document.documentElement.classList.contains('fx-low');
}

// ── 1) Rendimiento: pista rápida del equipo + medición real de fotogramas (se recuerda en este navegador) ──
function v37Rendimiento() {
  const H = document.documentElement, KEY = 'clase_fx_v1';
  const set = m => H.classList.toggle('fx-low', m === 'low');
  const get = () => { try { return almacen().getItem(KEY) || ''; } catch (e) { return ''; } };
  const save = v => { try { v ? almacen().setItem(KEY, v) : almacen().removeItem(KEY); } catch (e) { /* sin almacenamiento: no pasa nada */ } };
  const q = ((location.search.match(/[?&]fx=(low|high|auto)/) || [])[1]) || '';
  const n = navigator, cx = n.connection || {};
  const pista = !TEST && ((n.hardwareConcurrency && n.hardwareConcurrency <= 2) || (n.deviceMemory && n.deviceMemory <= 2) || cx.saveData === true);   // en las pruebas automáticas la pista de hardware no cuenta: el resultado no depende de la máquina
  if (q === 'low' || q === 'high') { save(q); set(q); return; }
  if (q === 'auto') save('');
  const g = get(); set(g || (pista ? 'low' : ''));
  if (g || TEST || typeof requestAnimationFrame !== 'function') return;   // ya medido, o pruebas automáticas: no medir
  setTimeout(() => {
    const dts = []; let last = 0, t0 = 0;
    const f = t => {
      if (document.hidden) return;
      if (last) { const d = t - last; if (d < 250) dts.push(d); } last = t; t0 = t0 || t;
      if (t - t0 < 3000) return requestAnimationFrame(f);
      if (dts.length < 30) return;
      dts.sort((a, b) => a - b); const med = dts[dts.length >> 1], p90 = dts[Math.floor(dts.length * .9)], lento = med > 26 || p90 > 45;
      if (lento) { set('low'); save('low'); } else save('high');
      window.__fxInfo = { medianaMs: Math.round(med * 10) / 10, p90Ms: Math.round(p90 * 10) / 10, modo: lento ? 'low' : 'high' };
    };
    requestAnimationFrame(f);
  }, 4000);
}

// ── 2) Clima de ambiente por tema ──
function v37Clima() {
  const cfg = V37_CLIMA[CONFIG_CLASE.tema]; let capa = document.getElementById('v37-clima');
  if (!cfg || v37SinMovimiento()) { if (capa) capa.remove(); return; }
  if (capa) return;
  capa = document.createElement('div'); capa.id = 'v37-clima'; capa.setAttribute('aria-hidden', 'true');
  let h = '';
  for (let i = 0; i < cfg.n; i++) {   // posiciones repartidas (sin azar): la clase se ve igual en cada equipo
    const x = (i * 37 + 11) % 100, s = 3 + (i * 5) % 7, d = 9 + (i * 7) % 11, r = -((i * 3) % 12), w = ((i % 2) ? 1 : -1) * (3 + (i * 2) % 9);
    h += '<i class="' + cfg.forma + '" style="--x:' + x + 'vw;--y:' + ((i * 23 + 7) % 88) + 'vh;--s:' + s + 'px;--c:' + cfg.color + ';--d:' + d + 's;--r:' + r + 's;--w:' + w + 'vw"></i>';
  }
  capa.innerHTML = h; document.body.insertBefore(capa, document.body.firstChild);
}

// ── 2b) Fondo ilustrado del tema (una sola vez; no depende de las partículas) ──
function v37Fondo() {
  if (!V37_FONDO || document.getElementById('v37-fondo')) return;
  const f = document.createElement('div'); f.id = 'v37-fondo'; f.setAttribute('aria-hidden', 'true'); f.style.backgroundImage = 'url(' + V37_FONDO + ')';
  document.body.insertBefore(f, document.body.firstChild);
  const intro = document.getElementById('fx-intro');   // la pantalla de bienvenida también estrena las montañas
  if (intro) { const g = document.createElement('div'); g.className = 'v37-fondo-intro'; g.setAttribute('aria-hidden', 'true'); g.style.backgroundImage = 'url(' + V37_FONDO + ')'; intro.insertBefore(g, intro.firstChild); }
}

// ── 3) Chispas al tocar ──
function v37Toques() {
  const cols = ['#ffd23f', '#5eeaff', '#a855f7', '#ff5d8f', '#8cf0a0'];
  document.addEventListener('pointerdown', e => {
    if (v37SinMovimiento()) return;
    const b = e.target && e.target.closest && e.target.closest('.btn,.opcion,.chip,.zona'); if (!b || b.disabled || v37Activos > 24) return;
    for (let i = 0; i < 6; i++) {
      const el = document.createElement('i'), a = (i / 6) * 6.283 + Math.random() * .6, d = 28 + Math.random() * 26; el.className = 'v37-chispa';
      el.style.cssText = 'left:' + e.clientX + 'px;top:' + e.clientY + 'px;background:' + cols[i % cols.length] + ';--dx:' + Math.round(Math.cos(a) * d) + 'px;--dy:' + Math.round(Math.sin(a) * d) + 'px';
      document.body.appendChild(el); v37Activos++; setTimeout(() => { el.remove(); v37Activos--; }, 650);
    }
  }, { capture: true, passive: true });
}

// ── 4) Portal entre pantallas ──
function v37Portal() {
  if (v37SinMovimiento()) return;
  const prev = document.getElementById('v37-portal'); if (prev) prev.remove();
  const p = document.createElement('div'); p.id = 'v37-portal'; p.setAttribute('aria-hidden', 'true'); document.body.appendChild(p); setTimeout(() => p.remove(), 600);
}

// ── 5) Racha: se alimenta de los mismos eventos del motor Juego (acierto suma, «casi» reinicia sin castigo) ──
function v37Racha(nombre) {
  let b = document.getElementById('v37-racha');
  if (!b) { b = document.createElement('div'); b.id = 'v37-racha'; b.setAttribute('aria-live', 'polite'); document.body.appendChild(b); }
  if (nombre === 'acierto') { v37Racha_n++; if (v37Racha_n > v37RachaMax) v37RachaMax = v37Racha_n; } else if (nombre === 'casi') v37Racha_n = 0; else return;
  const stage = document.getElementById('stage'), n = v37Racha_n;
  if (n >= 2) { b.textContent = '🔥 Racha ×' + n; b.classList.add('on'); if (!v37SinMovimiento()) { b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); } } else b.classList.remove('on');
  if (stage) stage.classList.toggle('v37-fuego', n >= 3 && !v37SinMovimiento());
}
(function () {   // se engancha UNA vez al motor Juego sin cambiarle nada: llama al original y después observa
  if (typeof Juego === 'undefined' || Juego._v37) return;
  const original = Juego.evento; Juego._v37 = true;
  Juego.evento = function (nombre, datos) { const r = original.call(Juego, nombre, datos); try { v37Racha(nombre); } catch (e) { /* la racha nunca rompe la clase */ } return r; };
})();

// ── 6) Jefe final: el evalFinal muestra la vida del jefe (= preguntas que faltan por acertar) ──
function v37Jefe(s) {
  if (s.type !== 'evalFinal') return;
  const total = (s.preguntas || []).length; if (!total) return;
  const buenas = (st.acts['quiz_resps_' + s.id] || []).filter(r => r.correcta).length, hp = Math.max(0, total - buenas), stage = $('stage');
  const html = '<div class="v37-jefe' + (hp === 0 ? ' muerto' : '') + '" data-test="jefe"><div class="v37-jefe-cab"><span>👑 JEFE FINAL</span><small>' +
    (hp === 0 ? '¡Derrotado! 🎉' : buenas + ' de ' + total + ' golpes') + '</small></div><div class="v37-hp" role="progressbar" aria-label="Vida del jefe" aria-valuemin="0" aria-valuemax="' + total + '" aria-valuenow="' + hp + '"><i style="width:' + Math.round((hp / total) * 100) + '%"></i></div></div>';
  const cinta = stage.querySelector('.v36-etapa'); if (cinta) cinta.insertAdjacentHTML('afterend', html); else stage.insertAdjacentHTML('afterbegin', html);
  if (!v37Cine[s.id] && buenas === 0 && !v37SinMovimiento()) {   // entrada dramática solo la primera vez (en memoria: no se guarda nada)
    v37Cine[s.id] = true; const c = document.createElement('div'); c.id = 'v37-cine'; c.setAttribute('aria-hidden', 'true'); c.innerHTML = '<b>👑 ¡JEFE FINAL!</b>'; document.body.appendChild(c); setTimeout(() => c.remove(), 1750);
  }
}

// ── 7) Logros coleccionables en la pantalla final (de achievements.js): dan una meta clara para volver a intentarlo ──
// Se calculan con lo que YA está guardado (vidas, juegos hechos, quiz, monedas, nota) y con la racha de esta sesión. No suman nada.
function v37Logros() {
  const juegos = SL.filter(x => CLAVE_HECHO[x.type]), hechos = juegos.filter(x => st.acts[CLAVE_HECHO[x.type] + x.id]).length;
  const ef = SL.find(x => x.type === 'evalFinal'), buenas = ef ? (st.acts['quiz_resps_' + ef.id] || []).filter(r => r.correcta).length : 0;
  const cofres = v35Cofres(), todos = v35Monedas() >= cofres[4].umbral;
  const L = [
    { id: 'sin-perder', img: 'asset://escudo', nom: 'Sin perder vidas', pista: 'Termina sin gastar oportunidades', ok: st.vidasUsadas === 0 },
    { id: 'racha', img: 'asset://llama', nom: 'Imparable', pista: '5 aciertos seguidos', ok: v37RachaMax >= 5 },
    { id: 'juegos', img: 'asset://cohete', nom: 'Todos los juegos', pista: 'Completa todos los juegos', ok: juegos.length > 0 && hechos === juegos.length },
    { id: 'cofres', img: 'asset://cofre', nom: 'Coleccionista', pista: 'Abre los 5 cofres', ok: todos },
    { id: 'jefe', img: 'asset://gema', nom: 'Rompe-jefes', pista: 'Derrota al jefe final', ok: !!ef && buenas === ef.preguntas.length },
    { id: 'nota', img: 'asset://estrella', nom: 'Nota de oro', pista: 'Llega a 4.5 o más', ok: notaOficial() >= 4.5 }
  ], n = L.filter(x => x.ok).length;
  return '<div class="v37-logros" data-test="logros-v37"><h3>🏆 Tus logros: ' + n + ' de ' + L.length + '</h3><ul>' +
    L.map(x => '<li class="' + (x.ok ? 'ok' : 'no') + '" data-test="logro-v37" data-logro="' + x.id + '" data-ok="' + (x.ok ? 1 : 0) + '"><img src="' + x.img + '" alt=""><span>' + esc(x.nom) + '</span><small>' + (x.ok ? '¡Conseguido!' : esc(x.pista)) + '</small></li>').join('') + '</ul></div>';
}
const v37Final0 = RENDER.final;
RENDER.final = function (s) {
  const base = v37Final0(s); try { const k = base.indexOf('<div class="v29-cert"'); const h = v37Logros(); return k < 0 ? base + h : base.slice(0, k) + h + base.slice(k); } catch (e) { return base; }
};

// ── enganche único desde render(): arranca lo que falta la primera vez y coordina lo de cada pantalla ──
function v37Escena(s, entrando) {
  if (!v37Listo) {
    v37Listo = true;
    try { v37Rendimiento(); } catch (e) { /* sin esto la clase funciona igual */ }
    try { v37Toques(); } catch (e) { /* idem */ }
  }
  try { v37Fondo(); } catch (e) { /* idem */ }
  try { v37Clima(); } catch (e) { /* idem */ }
  try { const c = document.querySelector('#stage .v36-etapa'); if (c) $('stage').style.setProperty('--etapa', c.style.background || ''); } catch (e) { /* idem */ }
  try { v37Jefe(s); } catch (e) { /* idem */ }
  try { if (entrando && v37UltSlide >= 0 && v37UltSlide !== st.slide) v37Portal(); } catch (e) { /* idem */ }
  v37UltSlide = st.slide;
}
