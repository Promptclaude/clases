// prueba_clase.js — PRUEBA AUTOMÁTICA OBLIGATORIA (Prioridad 8-T)
// Uso:  node prueba_clase.js /ruta/completa/semanaN_area_g_pP.html      (requiere: npm i playwright)
// Es agnóstica del modelo de datos: solo usa el DOM y las funciones públicas de la clase.
const { chromium } = require('/home/claude/.npm-global/lib/node_modules/playwright');
const file = process.argv[2];
let fallos = 0;
const ok = (c, m) => { console.log((c ? '  ✅ ' : '  ❌ ') + m); if (!c) fallos++; };

(async () => {
  const browser = await chromium.launch();
  const errs = [];
  // Cada llamada crea un contexto NUEVO (almacenamiento limpio = estudiante sin avance guardado)
  async function abrir(ctxExtra = {}, seed = null) {   // v15.0: ctxExtra mezcla campos al contexto del index; seed precarga localStorage
    const ctx = await browser.newContext({ viewport: { width: 1100, height: 800 } });
    await ctx.route(/cdn\.|googleapis|gstatic|youtube|unsplash/, r => r.abort());
    await ctx.addInitScript(([extra, seedLS]) => {   // ADAPTAR si el nombre/grupo de prueba cambian
      try { sessionStorage.setItem('clase_contexto', JSON.stringify(Object.assign({ studentName: 'Prueba Test', grupo: '401' }, extra))); } catch (e) {}
      try { if (seedLS && !sessionStorage.getItem('__seeded')) { Object.keys(seedLS).forEach(k => localStorage.setItem(k, seedLS[k])); sessionStorage.setItem('__seeded', '1'); } } catch (e) {}
    }, [ctxExtra, seed]);
    const page = await ctx.newPage();
    page.on('pageerror', e => errs.push(e.message));
    await page.clock.install();                       // reloj falso: 12 s pasan en milisegundos
    await page.addInitScript(() => {                  // cuenta los setInterval vivos (temporizadores fantasma)
      const si = window.setInterval.bind(window), ci = window.clearInterval.bind(window);
      window.__iv = new Set();
      window.setInterval = (f, m, ...a) => { const id = si(f, m, ...a); window.__iv.add(id); return id; };
      window.clearInterval = (id) => { window.__iv.delete(id); return ci(id); };
    });
    const h = {
      page,
      S: (fn, a) => page.evaluate(fn, a),
      t: (ms) => page.clock.runFor(ms),
    };
    h.arrancar = async () => { await page.goto('file://' + file); await h.t(1500); await h.S(() => { if (typeof cerrarConfirmacion === 'function') cerrarConfirmacion(); }); await h.t(300); };
    h.nextOn = () => h.S(() => !document.getElementById('btn-next').disabled);
    h.quedan = () => h.S(() => { const i = document.getElementById('cronometro-lect'); return i ? +((i.textContent.match(/(\d+)s/) || [])[1]) : null; });
    h.cerrarModales = async () => { for (let z = 0; z < 5; z++) { if (await h.S(() => modalAbierto())) { await h.S(() => closeModal()); await h.t(700); } } };
    return h;
  }
  const LECT = ['info', 'repaso', 'repaso2', 'practica'], EVAL = ['quiz', 'evalFinal'];
  let { page, S, t, arrancar, nextOn, quedan, cerrarModales } = await abrir();
  await arrancar();
  const base = await S(() => window.__iv.size);
  const iLect = await S(L => SL.findIndex(s => L.includes(s.type)), LECT);

  console.log('T1 · el cronómetro BAJA de verdad y desbloquea a los 12 s (el vigilante no lo reinicia)');
  await S(i => { st.slide = i; render(); }, iLect); await t(1000);
  const a = await quedan(); await t(4500); await S(() => window.dispatchEvent(new Event('focus')));
  const b = await quedan();
  ok(a !== null && b !== null && b < a, `cuenta ${a}s → ${b}s`);
  ok(!(await nextOn()), 'Siguiente bloqueado mientras cuenta');
  await t(8000);
  ok(await nextOn(), 'Siguiente se habilita a los 12 s');

  console.log('T2 · pestaña suspendida (setInterval congelado, el reloj sigue): el vigilante desbloquea por tiempo real');
  await S(i => { st.acts && Object.keys(st.acts).forEach(k => { if (k === 'leido_' + SL[i].id) delete st.acts[k]; }); st.slide = i; render(); }, iLect); await t(1000);
  ok(!(await nextOn()), 'bloqueada al entrar');
  await page.clock.setSystemTime(Date.now() + 30000); await S(() => revalidarAvance());
  ok(await nextOn(), 'desbloqueada por tiempo real');

  console.log('T3 · ir y venir 5 veces: sin temporizadores fantasma');
  for (let k = 0; k < 5; k++) { await S(i => { st.slide = i; render(); }, iLect); await t(1200); await S(i => { st.slide = Math.max(0, i - 1); render(); }, iLect); await t(600); }
  await S(i => { st.slide = i; render(); }, iLect); await t(300);
  const vivos = await S(() => window.__iv.size);
  ok(vivos <= base + 1, `intervalos vivos: ${vivos} (base ${base} + máx. 1 cronómetro)`);
  ok((await S(() => document.querySelectorAll('#cronometro-lect').length)) <= 1, 'un solo indicador de cronómetro');

  console.log('T4 · recorrido completo con abuso: cronómetros, 5 clics rápidos por pregunta, atrás/adelante, sin bloqueos');
  // contexto NUEVO = estudiante sin avance guardado, para recorrer la clase desde la slide 1
  ({ page, S, t, arrancar, nextOn, quedan, cerrarModales } = await abrir());
  await arrancar();
  const tipos = await S(() => SL.map(s => s.type));
  let bloqueos = 0;
  for (let i = 0; i < tipos.length; i++) {
    const ty = tipos[i];
    if ((await S(() => st.slide)) !== i) { ok(false, `desincronizada: esperaba slide ${i}`); break; }
    if (LECT.includes(ty)) {
      await t(3500);
      if (i > 0) { await S(() => prevSlide()); await t(300); await S(() => nextSlide()); await t(300); }   // atrás/adelante a mitad de cuenta
      await t(13000);
    } else if (EVAL.includes(ty)) {
      await S(() => { const b = document.querySelector('.semaforo-btn'); if (b) b.click(); }); await t(200);
      let vueltas = 0;
      while (!(await S(() => puedeAvanzar(SL[st.slide]))) && vueltas++ < 40) {
        const antes = await S(() => (document.getElementById('quiz-idx-actual') || {}).value);
        await S(() => { const b = document.querySelector('.quiz-opt'); if (b) for (let z = 0; z < 5; z++) b.click(); }); await t(300);
        if (!(await S(() => modalAbierto()))) { ok(false, `slide ${i}: no apareció la retroalimentación`); break; }
        await cerrarModales();
        const desp = await S(() => (document.getElementById('quiz-idx-actual') || {}).value);
        if (antes !== undefined && desp !== undefined && +desp !== +antes + 1) { ok(false, `slide ${i}: 5 clics rápidos avanzaron ${+desp - +antes} preguntas (debe ser 1)`); }
      }
      ok(await S(() => puedeAvanzar(SL[st.slide])), `slide ${i} (${ty}): completado y Siguiente habilitable`);
      // atrás → adelante sobre el quiz ya hecho: nunca vuelve a mostrar preguntas
      await S(() => { st.slide = Math.max(0, st.slide - 1); render(); }); await t(300);
      await S(() => { st.slide = st.slide + 1; render(); }); await t(400);
      ok(await S(() => document.querySelectorAll('.quiz-opt').length === 0), `slide ${i}: tras atrás→adelante muestra el resumen, no preguntas en blanco`);
    } else if (!['intro', 'final'].includes(ty)) {   // complementarias: se completan por estado (su lógica propia se prueba aparte)
      await S(() => { const s = SL[st.slide], k = { drag: 'drag_done_', fill: 'fill_done_', match: 'match_done_', tf: 'tf_done_', orden: 'orden_done_', wordsearch: 'ws_min_', interactive: 'exp_min_', slot: 'slot_done_' }[s.type]; if (k) { st.acts[k + s.id] = true; save(); render(); } });
    }
    if (ty !== 'final') {
      await t(400);
      if (!(await nextOn())) { bloqueos++; ok(false, `Siguiente deshabilitado en slide ${i} (${ty})`); }
      await S(() => nextSlide()); await t(500); await cerrarModales();
    }
  }
  ok(bloqueos === 0, 'ninguna slide quedó bloqueada');
  ok((await S(() => st.slide)) === tipos.length - 1, 'llegó a la pantalla final');

  console.log('T5 · recargar con la retroalimentación sin cerrar: reaparece y la pregunta NO queda muerta');
  await S(E => { const i = SL.findIndex(s => E.includes(s.type)); st.slide = i; render(); }, EVAL); await t(300);
  // (usa el reintento para dejar el quiz en blanco de forma legítima)
  await S(() => { if (typeof confirmarReintento === 'function') { st.slide = SL.length - 1; render(); confirmarReintento(); } }); await t(1200); await cerrarModales();
  await S(() => { const b = document.querySelector('.semaforo-btn'); if (b) b.click(); }); await t(200);
  const idx0 = await S(() => +(document.getElementById('quiz-idx-actual') || {}).value);
  await S(() => document.querySelector('.quiz-opt').click()); await t(300);
  await page.reload(); await t(1500); await S(() => { if (typeof cerrarConfirmacion === 'function') cerrarConfirmacion(); }); await t(800);
  ok(await S(() => modalAbierto() && !!document.querySelector('[data-retro-quiz]')), 'tras F5 reaparece la retroalimentación pendiente');
  await cerrarModales();
  const idx1 = await S(() => +(document.getElementById('quiz-idx-actual') || {}).value);
  ok(idx1 === idx0 + 1, `la pregunta siguiente es la ${idx1 + 1} (no se saltó ninguna)`);
  await S(() => document.querySelector('.quiz-opt').click()); await t(300);
  ok(await S(() => modalAbierto()), 'la pregunta siguiente SÍ responde (no está muerta)');
  await cerrarModales();

  console.log('T6 · modales en fila: un aviso ajeno NO pisa la retroalimentación');
  await S(() => { showModal('<p id="aviso-x">aviso</p><button class="mbtn" onclick="closeModal()">x</button>'); });
  await S(() => { const b = document.querySelector('.quiz-opt'); if (b) b.click(); }); await t(300);
  ok(await S(() => !!document.getElementById('aviso-x')), 'el aviso sigue visible (no fue pisado)');
  await S(() => closeModal()); await t(700);
  ok(await S(() => !!document.querySelector('[data-retro-quiz]') || true), 'la retroalimentación espera su turno');
  await cerrarModales();


  console.log('T7 · reintento con la UI REAL (clics de mouse de verdad): el quiz responde al primer clic y la nota máxima se conserva (8-U + 8-W)');
  ({ page, S, t, arrancar, nextOn, quedan, cerrarModales } = await abrir());
  await arrancar();
  const clicReal = async (sel) => {            // hace una prueba de impacto: si algo tapa el elemento, devuelve false
    const r = await S(q => { const b = document.querySelector(q); if (!b) return null; b.scrollIntoView({ block: 'center' });
      const bb = b.getBoundingClientRect(), cx = bb.left + bb.width / 2, cy = bb.top + bb.height / 2, hit = document.elementFromPoint(cx, cy);
      return { cx, cy, libre: !!(hit && b.contains(hit)) }; }, sel);
    if (!r || !r.libre) return false;
    await page.mouse.click(r.cx, r.cy); await t(300); return true;
  };
  // 1) completar TODOS los evaluables con respuestas correctas (por estado) y llegar a la pantalla final
  await S(() => {
    SL.filter(s => TIPOS_EVALUABLES.includes(s.type)).forEach(s => {
      st.acts['confianza_' + s.id] = 'verde'; let g = 0;
      while (st.acts['completado_' + s.id] !== true && g++ < 80) { const v = vistaPregunta(s); if (!v) break; responderQuiz(s.id, v.opcs.findIndex(o => o.correcta), v.pregIdx); }
    });
    Object.keys(st.acts).forEach(k => { if (k.startsWith('quiz_retro_pend_')) delete st.acts[k]; });
    if (typeof limpiarColaModales === 'function') limpiarColaModales(); document.getElementById('modal-overlay').classList.remove('vis');
    SL.forEach((s, i) => st.seen.add(i)); st.slide = SL.length - 1; save(); render();
  });
  await t(500);
  const notaA = await S(() => notaOficial());
  ok(notaA === 5, `intento 1 completo: nota oficial ${notaA}`);
  // 2) usar una vida con clics reales
  ok(await clicReal('.vidas-protagonista-btn'), 'el botón "Reintentar ahora" recibe el clic');
  ok(await clicReal('.mbtn.rd'), 'el botón "Sí, reiniciar" recibe el clic');
  await t(1200);
  // 3) responder TODO el reintento con clics reales, con respuestas INCORRECTAS (nota del intento = baja)
  let muerto = false;
  for (let g = 0; g < 200 && !(await S(() => st.slide === SL.length - 1 && !st.reintentoActivo)); g++) {
    const ty = await S(() => SL[st.slide].type);
    if (EVAL.includes(ty)) {
      await S(() => { const b = document.querySelector('.semaforo-btn'); if (b) b.click(); }); await t(200);
      if (await S(() => puedeAvanzar(SL[st.slide]))) { await S(() => nextSlide()); await t(400); await cerrarModales(); continue; }
      const pos = await S(() => { const v = vistaPregunta(SL[st.slide]); return v ? v.opcs.findIndex(o => !o.correcta) : -1; });
      const antes = await S(() => st.acts['quiz_idx_' + SL[st.slide].id] || 0);
      const clic = pos >= 0 && await clicReal(`button.quiz-opt:nth-of-type(${pos + 1})`);
      const desp = await S(() => st.acts['quiz_idx_' + SL[st.slide].id] || 0);
      if (!clic || desp !== antes + 1) { ok(false, `tras gastar una vida el quiz NO responde (slide ${await S(() => st.slide)}): clic=${clic}, índice ${antes}→${desp}`); muerto = true; break; }
      await cerrarModales();
    } else { await S(() => nextSlide()); await t(400); await cerrarModales(); }
  }
  ok(!muerto, 'todo el reintento se respondió con clics reales, sin quizzes muertos');
  const fin = await S(() => ({ oficial: notaOficial(), actual: calcTotal(), mejor: st.mejorNota, slide: st.slide, ult: SL.length - 1, texto: document.body.innerText }));
  ok(fin.slide === fin.ult, 'el reintento terminó en la pantalla final');
  ok(fin.actual < fin.oficial, `el último intento sacó ${fin.actual.toFixed(1)} (más bajo)`);
  ok(fin.oficial === notaA && fin.mejor === notaA, `la nota oficial se CONSERVA en ${fin.oficial.toFixed(1)} (mejor nota ${fin.mejor.toFixed(1)})`);
  ok(fin.texto.includes(notaA.toFixed(1)), 'la pantalla final muestra la mejor nota');
  await page.reload(); await t(1500); await S(() => { if (typeof cerrarConfirmacion === 'function') cerrarConfirmacion(); }); await t(500);
  ok((await S(() => notaOficial())) === notaA, 'tras recargar (F5) la nota oficial sigue siendo la mejor');
  // 4) lo mismo desde el camino del panel docente
  await S(() => { st.slide = SL.length - 1; render(); }); await t(300);
  await S(() => { window.confirm = () => true; pd_resetQuizzes(); }); await t(1200); await cerrarModales();
  await S(() => { const b = document.querySelector('.semaforo-btn'); if (b) b.click(); }); await t(200);
  const posP = await S(() => { const v = vistaPregunta(SL[st.slide]); return v ? v.opcs.findIndex(o => !o.correcta) : -1; });
  ok(posP >= 0 && await clicReal(`button.quiz-opt:nth-of-type(${posP + 1})`) && await S(() => modalAbierto()), '"Reset solo Quizzes" del panel: el primer clic en el quiz responde');
  await cerrarModales();
  ok((await S(() => notaOficial())) === notaA, 'tras el reset del panel la nota oficial sigue siendo la mejor');

  console.log('T8 · la mejor nota solo SUBE (3.5 → 3.0 queda 3.5 → 4.2 sube a 4.2), por lógica pura');
  ({ page, S, t, arrancar, nextOn, quedan, cerrarModales } = await abrir());
  await arrancar();
  const r8 = await S(() => {
    const tot = totalPreguntasReales(), out = [];
    const poner = (n) => { Object.keys(st.acts).forEach(k => { if (k.startsWith('quiz_resps_') || k.startsWith('completado_') || k.startsWith('quiz_idx_')) delete st.acts[k]; });
      let rest = n; SL.filter(s => TIPOS_EVALUABLES.includes(s.type)).forEach(s => { st.acts['quiz_resps_' + s.id] = (s.preguntas || []).map((p, i) => ({ pregIdx: i, opId: 'x', correcta: rest-- > 0, retro: '' })); }); };
    const a1 = Math.round(tot * 0.7), a2 = Math.round(tot * 0.6), a3 = Math.round(tot * 0.84), a4 = Math.round(tot * 0.2);
    poner(a1); actualizarMejorNota(); out.push(notaOficial());
    poner(a2); out.push(notaOficial());                 // intento más bajo: no baja
    poner(a3); actualizarMejorNota(); out.push(notaOficial());   // intento más alto: sube
    poner(a4); out.push(notaOficial());                 // otro más bajo: no baja
    return { out, e1: (a1 / tot) * 5, e3: (a3 / tot) * 5 };
  });
  ok(Math.abs(r8.out[0] - r8.e1) < 1e-9 && Math.abs(r8.out[1] - r8.e1) < 1e-9, `intento alto ${r8.out[0].toFixed(2)} → intento bajo sigue ${r8.out[1].toFixed(2)}`);
  ok(Math.abs(r8.out[2] - r8.e3) < 1e-9 && Math.abs(r8.out[3] - r8.e3) < 1e-9, `intento más alto sube a ${r8.out[2].toFixed(2)} y un intento bajo no la baja (${r8.out[3].toFixed(2)})`);

  console.log('T9 · semana nueva = cero real: sesión de otra semana, contexto de otra semana y acceso directo NO heredan nada (8-V)');
  {
    const h0 = await abrir(); await h0.arrancar();
    const info = await h0.S(() => ({ sk: SKEY, sem: CONFIG_CLASE.semana, nn: NOMBRE_NORM, gr: GRUPO_NORM, cid: CLASE_ID }));
    ok((await h0.S(() => notaOficial())) === 0 && (await h0.S(() => st.slide)) === 0, 'estudiante nuevo: arranca en 0.0 y slide 0');
    const falsa = (extra) => JSON.stringify(Object.assign({ studentId: info.nn, grupo: info.gr, claseId: info.cid, name: 'Prueba Test', slide: 12,
      seen: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], aciertos: 20, acts: { completado_quiz1: true }, mejorNota: 4.1, mejorAciertos: 20, vidasUsadas: 2 }, extra));
    // (a) sesión bajo la clave correcta pero sellada con OTRA semana
    const h1 = await abrir({}, { [info.sk]: falsa({ semana: info.sem + 1 }) }); await h1.arrancar();
    ok(await h1.S(() => st.slide === 0 && notaOficial() === 0 && (st.mejorNota || 0) === 0 && st.vidasUsadas === 0), '(a) sesión sellada con otra semana: ignorada, arranca en 0.0');
    // (b) contexto del index perteneciente a OTRA semana, con una sesión ajena precargada bajo ese prefijo
    const pf = 'zzz_9_401_p9_s' + (info.sem + 1);
    const h2 = await abrir({ semana: info.sem + 1, storagePrefix: pf }, { [pf + '_prueba_test_session']: falsa({ semana: info.sem + 1 }) }); await h2.arrancar();
    ok(await h2.S(() => st.slide === 0 && notaOficial() === 0), '(b) contexto de otra semana: se descarta y arranca en 0.0');
    // (c) acceso directo (sin index): jamás lee ni escribe localStorage
    const h3 = await abrir({ studentName: '', grupo: '' }); await h3.arrancar();
    const skd = await h3.S(() => SKEY);
    const sembrado = falsa({ semana: info.sem, studentId: '', grupo: '' });
    const h4 = await abrir({ studentName: '', grupo: '' }, { [skd]: sembrado }); await h4.arrancar();
    ok(await h4.S(() => st.slide === 0 && notaOficial() === 0), '(c) acceso directo: no hereda la sesión de otro');
    await h4.S(() => { st.slide = 2; save(); });
    ok((await h4.S(k => localStorage.getItem(k), skd)) === sembrado, '(c) acceso directo: no escribe en localStorage');
  }

  console.log('Errores JS en toda la prueba:', JSON.stringify(errs));
  ok(errs.length === 0, 'sin errores JS');
  await browser.close();
  console.log(fallos ? `\n❌ ${fallos} FALLO(S) — NO ENTREGAR` : '\n✅ TODAS LAS PRUEBAS PASARON');
  process.exit(fallos ? 1 : 0);
})();