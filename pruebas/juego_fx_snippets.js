// ═══ v25 · 52 — MOTOR CENTRAL DE EFECTOS «Juego»: todo evento del juego pasa por aquí (nunca efectos sueltos por el código) ═══
const Juego = (function () {
  const cfg = { sonido: true, movimiento: true, maxSimultaneos: 3 };
  let activos = 0, combo = 0, ej = {};                         // ej = ejecutores reales, inyectados por la clase
  // Tabla de efectos por evento. prio: 3 = nunca se descarta, 1 = se descarta si hay saturación.
  const TABLA = {
    acierto:    { prio: 1, sfx: 'acierto', burst: 'chico',  hud: 'pulso',                    aria: 'correcto',      ms: 900  },
    combo3:     { prio: 2, sfx: 'racha',   burst: 'medio',  hud: 'pulso', toast: '🔥 ¡Combo x3!', aria: 'genial',    ms: 1300 },
    combo5:     { prio: 2, sfx: 'racha',   burst: 'medio',  confeti: true, toast: '🔥 ¡Combo x5!', aria: 'genial',    ms: 1500 },
    casi:       { prio: 2, sfx: 'casi',                                                       aria: 'parece-dificil', ms: 700  },   // fallo: suave, SIN sacudida ni rojo
    pista:      { prio: 1, sfx: 'pista',                                                      ms: 400  },
    actividad:  { prio: 2, sfx: 'listo',   burst: 'chico',  toast: '✅ ¡Actividad completada!', aria: 'listo',      ms: 1000 },
    hito:       { prio: 3, sfx: 'hito',    burst: 'grande', confeti: true, aria: 'genial',      ms: 1800 },
    nivel:      { prio: 3, sfx: 'nivel',   burst: 'grande', confeti: true, aria: 'correcto', pantalla: 'nivel', ms: 2200 },
    desbloqueo: { prio: 2, sfx: 'cofre',   burst: 'medio',  ms: 1200 },
    jefe_golpe: { prio: 2, sfx: 'golpe',   burst: 'medio',  boss: 'golpe',                     ms: 800  },
    jefe_final: { prio: 3, sfx: 'nivel',   burst: 'grande', confeti: true, boss: 'derrota', aria: 'correcto', ms: 2500 }
  };
  function usar(ejecutores) { ej = ejecutores || {}; }
  function ajustar(o) { Object.assign(cfg, o || {}); }
  function correr(tipo, valor, e) {                           // un solo efecto; jamás lanza error ni bloquea
    try { if (typeof ej[tipo] === 'function') ej[tipo](valor, e); } catch (x) { /* un efecto roto no rompe la clase */ }
  }
  function evento(nombre, datos) {
    const fx = TABLA[nombre]; const lanzados = [];
    if (!fx) return lanzados;
    // combo silencioso: sube con cada acierto y se reinicia sin castigo visual
    if (nombre === 'acierto') { combo++; if (combo === 3) setTimeout0(() => evento('combo3')); if (combo === 5) setTimeout0(() => evento('combo5')); }
    if (nombre === 'casi') combo = 0;
    if (activos >= cfg.maxSimultaneos && fx.prio < 3) return lanzados;   // presupuesto: no saturar equipos lentos
    const visuales = ['burst', 'hud', 'confeti', 'boss', 'pantalla'];
    Object.keys(fx).forEach(k => {
      if (['prio', 'ms'].includes(k)) return;
      if (k === 'sfx' && !cfg.sonido) return;                  // sin sonido: todo mensaje importante sigue siendo texto
      if (visuales.includes(k) && !cfg.movimiento) return;     // «reducir movimiento»: sin partículas ni pulsos
      correr(k, fx[k], datos); lanzados.push(k);
    });
    activos++; setTimeout0(() => { activos = Math.max(0, activos - 1); }, fx.ms);
    return lanzados;
  }
  let setTimeout0 = (f, ms) => setTimeout(f, ms || 0);
  return { evento, usar, ajustar, _cfg: cfg, _tabla: TABLA, _reloj(f) { setTimeout0 = f; }, _estado: () => ({ activos, combo }) };
})();

// ═══ Sonidos sintetizados (sin archivos de audio: 0 KB) ═══
function crearSfx(ctxFactory) {
  const tonos = { acierto: [[660, .08], [880, .12]], racha: [[660, .06], [880, .06], [1100, .12]], casi: [[330, .12], [294, .14]],
                  pista: [[740, .08]], listo: [[523, .08], [659, .08], [784, .14]], hito: [[523, .1], [659, .1], [784, .1], [1047, .22]],
                  nivel: [[392, .1], [523, .1], [659, .1], [784, .1], [1047, .3]], cofre: [[300, .08], [600, .1], [900, .16]], golpe: [[180, .1], [120, .14]] };
  return function sfx(nombre) {
    const ctx = ctxFactory(); if (!ctx || !tonos[nombre]) return false;
    let t = ctx.currentTime;
    tonos[nombre].forEach(([f, d]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.18, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + d);
      o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + d + .02); t += d * .9;
    });
    return true;
  };
}
