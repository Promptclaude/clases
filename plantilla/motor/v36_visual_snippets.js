// ═══ v36 · MEJORAS VISUALES (celular primero): etapas de color, temas por clase, mascota en la intro ═══
// 1) CINTA DE ETAPA sobre cada slide: dice en qué punto del ciclo de aprendizaje va el estudiante
//    (Aprende → Lo hacemos juntos → Ahora tú → ¡A jugar! → Comprueba) y le da un color a cada tipo de pantalla,
//    para que la clase no se vea como una sola pantalla repetida. Sale sola según el tipo; `etapa` en la slide la cambia.
// 2) TEMA DE COLOR por clase (meta.tema): 6 paletas ya revisadas para que el texto siempre se lea.
// 3) Mascota ARIA en la introducción, y cuadros de respuesta de `fill` EN LÍNEA con la frase.
// 4) Encabezado más compacto en celular (el XP pasa a la fila de las monedas) y la caja «Misión/Cómo/Para seguir»
//    plegable (ver tarjeta() en la plantilla): así la actividad ocupa casi toda la pantalla.
// Todo esto es SOLO presentación: no toca la nota, el avance ni lo guardado. Si falla, la clase sigue igual.

const V36_ETAPAS = {
  mision: ['🚀', 'Tu misión', '#6d28d9'], calienta: ['🔥', 'Calentamiento', '#c2410c'], aprende: ['🧠', 'Aprende', '#1d4ed8'],
  juntos: ['🤝', 'Lo hacemos juntos', '#047857'], tu: ['💪', 'Ahora tú', '#a16207'], juego: ['🎮', '¡A jugar!', '#be185d'],
  comprueba: ['🧪', 'Comprueba lo que sabes', '#6d28d9'], explica: ['✍️', 'Explica con tus palabras', '#0e7490'],
  reto: ['🏆', 'Reto final', '#b91c1c'], repaso: ['🔁', 'Repaso', '#4d7c0f'], final: ['🏁', 'Misión cumplida', '#a16207']
};
const V36_POR_TIPO = {
  intro: 'mision', info: 'aprende', tf: 'juntos', fill: 'juntos', drag: 'tu', ordenar: 'tu', tabla: 'tu', enlazar: 'tu', fraccion: 'tu',
  cuadricula: 'tu', recta: 'tu', comparar: 'tu', podio: 'tu', editor: 'tu', memoria: 'juego', relampago: 'juego', minijuego: 'juego',
  sopa: 'juego', detective: 'juego', candado: 'juego', quiz: 'comprueba', evalFinal: 'reto', abierta: 'explica', cuaderno: 'explica', final: 'final'
};
// fondo = color base · luz = resplandor de arriba · primario = bordes y botones · acento = detalles · contorno = bordes oscuros
const V36_TEMAS = {
  espacio:  { fondo: '#0F0B3D', luz: '#3a2a9a', primario: '#4F46E5', acento: '#FFB800', contorno: '#2B1B6B' },
  oceano:   { fondo: '#031c33', luz: '#0b5a8a', primario: '#0284c7', acento: '#fbbf24', contorno: '#0a3556' },
  bosque:   { fondo: '#08210f', luz: '#1f6b3b', primario: '#15803d', acento: '#fde047', contorno: '#14532d' },
  volcan:   { fondo: '#260707', luz: '#8a2a1a', primario: '#dc2626', acento: '#fbbf24', contorno: '#5b1111' },
  dulce:    { fondo: '#2f0a33', luz: '#86198f', primario: '#c026d3', acento: '#fde047', contorno: '#581c87' },
  desierto: { fondo: '#281604', luz: '#92400e', primario: '#c2410c', acento: '#fde68a', contorno: '#78350f' }
};
let v36TemaListo = false;

(function () {
  const c = document.createElement('style');
  c.textContent =
    // cinta de etapa: una «pestaña» pegada a la tarjeta
    '.v36-etapa{display:inline-flex;align-items:center;gap:6px;margin:0 0 -3px 16px;padding:4px 14px 5px;border-radius:12px 12px 0 0;color:#fff;font-weight:900;font-size:.8rem;letter-spacing:.02em;border:3px solid var(--contorno);border-bottom:0;position:relative;z-index:1;text-shadow:0 1px 0 #0004}' +
    '.v36-hero{display:flex;justify-content:center;margin:2px 0 6px}.v36-hero img{height:128px;width:auto;filter:drop-shadow(0 4px 0 #0002);animation:v36flota 3s ease-in-out infinite}' +
    '@keyframes v36flota{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}' +
    // frases de completar: el cuadro va EN LÍNEA con la oración
    'input[data-test=fill-input]{display:inline-block !important;width:8.5em !important;min-width:0 !important;max-width:100%;margin:2px 4px;vertical-align:baseline;text-align:center}' +
    // encabezado compacto: el XP vive en la fila de las monedas
    '#barra.v35on #xp-hud{display:none}#barra{padding:6px 12px}' +
    // caja «Misión / Cómo / Para seguir» plegable
    '.tarjeta-reto{padding:6px 12px}.tarjeta-reto summary{cursor:pointer;list-style:none;display:flex;gap:8px;align-items:flex-start;justify-content:space-between;font-weight:800;font-size:.98rem}' +
    '.tarjeta-reto summary::-webkit-details-marker{display:none}.tarjeta-reto .tr-g{white-space:nowrap;font-size:.8rem;background:#fff;border:2px solid var(--mundo-primario);border-radius:99px;padding:1px 9px}' +
    '.tarjeta-reto .tr-ver{display:block;font-size:.78rem;font-weight:700;color:var(--mundo-primario);margin-top:2px}.tarjeta-reto[open] .tr-ver{display:none}' +
    '.tarjeta-reto p{margin:.3em 0 .1em}' +
    '@media (prefers-reduced-motion:reduce){.v36-hero img{animation:none}}';
  document.head.appendChild(c);
})();

function v36Tema() {
  const t = V36_TEMAS[CONFIG_CLASE.tema]; if (!t) return;
  const r = document.documentElement.style;
  r.setProperty('--mundo-fondo', t.fondo); r.setProperty('--mundo-luz', t.luz); r.setProperty('--mundo-primario', t.primario);
  r.setProperty('--mundo-acento', t.acento); r.setProperty('--contorno', t.contorno);
}

function v36Etapa(s) {
  if (!v36TemaListo) { v36TemaListo = true; v36Tema(); }
  const clave = (s.etapa && V36_ETAPAS[s.etapa]) ? s.etapa : (V36_POR_TIPO[s.type] || 'aprende'), e = V36_ETAPAS[clave], stage = $('stage');
  stage.insertAdjacentHTML('afterbegin', '<div class="v36-etapa" data-test="etapa" data-etapa="' + clave + '" style="background:' + e[2] + '"><span aria-hidden="true">' + e[0] + '</span> ' + esc(e[1]) + '</div>');
  if (s.type === 'intro') {
    const h = stage.querySelector('h1,h2');
    if (h) h.insertAdjacentHTML('afterend', '<div class="v36-hero" data-test="hero"><img src="' + IMG.ariaListo + '" alt="ARIA, tu mascota, lista para empezar la misión contigo"></div>');
  }
}
