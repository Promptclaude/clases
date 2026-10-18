---
modulo: 12_contenido_y_quiz
etapa_de_lectura: 1
prioridades: [1, 2, 3, 4, 5]
---

# 12 · Imágenes, ejercicios, nota, bloqueo de evaluables y preguntas de quiz

## 🔴 PRIORIDAD 1 · ABSOLUTA — IMÁGENES REALES DE INTERNET (MÍNIMO 20)

### 📸 REGLA DE ORO: MÍNIMO 20 IMÁGENES REALES POR CLASE
**FUENTE EXCLUSIVA — Unsplash (sin API key, siempre funciona):**
```javascript
// PATRÓN EXACTO que funciona — NO cambiar la estructura de la URL:
'https://images.unsplash.com/photo-[ID_FOTO]?w=400&h=250&fit=crop&auto=format&q=80'
// Para thumbnails en tarjetas interactivas:
'https://images.unsplash.com/photo-[ID_FOTO]?w=120&h=120&fit=crop&auto=format&q=80'
// Para imágenes de detalle (cuando el usuario hace clic):
'https://images.unsplash.com/photo-[ID_FOTO]?w=500&h=300&fit=crop&auto=format&q=80'
```
**IDs de Unsplash confiables por categoría temática:**
```javascript
// TECNOLOGÍA / COMPUTADORES
const IMGS_TECH = {
  teclado:    '1587829741301-dc798b83add3',
  mouse:      '1527814050087-3793815479db',
  monitor:    '1547082299-de196ea013d6',
  laptop:     '1496181133206-80ce9b88a853',
  disco_hdd:  '1597872200969-2b65d56bd16b',
  usb:        '1601972599720-36938d4ecd31',
  ram:        '1531492746076-161ca9bcad58',
  cpu:        '1518770660439-4636190af475',
  impresora:  '1544117519-31a4b719223d',
  redes:      '1558618666-fcd25c85cd64',
  router:     '1544197150-b99a580bb7a8',
  internet:   '1451187580459-43490279c0fa',
  codigo:     '1461749280684-dccba630e2f6',
  apps:       '1512941937669-90a1b58e7e9c',
  celular:    '1511707171634-5f897ff02aa9',
  videojuego: '1612287230202-1ff1d85d1bdf',
  gamer_setup:'1593508512255-86ab42a8e620',
  so_windows: '1551650975-87deedd944c3',
};
// NATURALEZA / CIENCIAS
const IMGS_CIENCIAS = {
  planta:       '1416879595882-3373a0480b5b',
  animal:       '1474511320723-9a56873867b5',
  agua:         '1505118380757-91f5f5632de0',
  sol:          '1508739773434-c26b3d09e071',
  tierra:       '1446776811953-b23d57bd21aa',
  ecosistema:   '1441974231531-c6227db76b6e',
  laboratorio:  '1532094349884-32413686ca0c',
  microscopio:  '1507003211169-0a1dd7228f2d',
  celula:       '1559757148-5c350d0d3c56',
  cuerpo:       '1530026405845-74d57adf5e44',
};
// MATEMÁTICAS
const IMGS_MATH = {
  numeros:      '1509228468518-180b8abb5fa6',
  geometria:    '1509236841566-9f7efd7ce929',
  calculadora:  '1587145820266-a5951ee6f620',
  regla:        '1611532736597-de2d4265fba3',
  reloj:        '1516574187841-cb9cc2ca948b',
  monedas:      '1518458028785-8fbcd101ebb9',
  fracciones:   '1578662996442-48f60103fc96',
};
// LENGUAJE / ESPAÑOL
const IMGS_LENGUAJE = {
  libro:        '1481627834876-b7833e8f5570',
  escritura:    '1455390582262-e97a8c80a394',
  lectura:      '1512820790803-83ca734da794',
  lapiz:        '1513001900722-370f803f498d',
  biblioteca:   '1507842217343-583bb7270b66',
  periodico:    '1504711434969-e33886168f5c',
};
// SOCIAL / COLOMBIA
const IMGS_SOCIAL = {
  ciudad:       '1512917774080-9991f1c7a03d',
  campo:        '1500382017468-9049fed747ef',
  familia:      '1511895426328-dc8714191011',
  colombia:     '1580063665421-a10acfdb2a3a',
  escuela:      '1580582932707-520aed937b7b',
  mapa:         '1524661135-423995f22d0b',
};
```
**DISTRIBUCIÓN OBLIGATORIA — MÍNIMO 20 IMÁGENES POR CLASE:**
| Ubicación | Cantidad mínima |
|-----------|----------------|
| Slide intro | 1–2 imágenes decorativas |
| Cada slide 'info' (mín. 4 slides de info) | 4 imágenes en grid 2×2 cada uno = 16 |
| Explorador interactivo (6 elementos) | 6 thumbnails + 6 detalle = 12 |
| Repaso/resumen | 2 imágenes |
|  v7.3: Cuadernos | 0 — el Cuaderno 1 y el Taller en Clase NUNCA llevan imágenes (Prioridad 10); compensar el total en los slides 'info'/repaso/explorador |
| **TOTAL GARANTIZADO** | **≥ 20 imágenes reales** (todas fuera de los cuadernos) |
**IMPLEMENTACIÓN EXACTA en slides de contenido:**
```html
<!-- Grid 2×2 obligatorio en cada slide info -->
<div class="g2" style="gap:9px">
  <div class="imgc">
    <img src="https://images.unsplash.com/photo-[ID]?w=300&h=130&fit=crop&auto=format&q=80"
         alt="[descripción]" loading="lazy">
    <div class="imgc-cap">🖼️ [Título]</div>
  </div>
  <!-- repetir 3 veces más -->
</div>
```
**CSS de imágenes — incluir SIEMPRE:**
```css
.imgc { border-radius:10px; overflow:hidden; border:4px solid var(--primary); box-shadow:0 3px 0 var(--primary-dark); }
.imgc img { width:100%; height:130px; object-fit:cover; display:block; }
.imgc-cap { background:var(--primary); color:#fff; padding:5px 8px; font-family:var(--font-ui); font-size:.75rem; text-align:center; }
.hwp { background:linear-gradient(180deg,#fff,#f8f8f0); border:3px solid var(--primary); border-radius:11px; padding:11px; cursor:pointer; transition:.15s; text-align:center; box-shadow:0 4px 0 var(--primary-dark); }
.hwp:hover { transform:translateY(-2px); border-color:var(--accent); box-shadow:0 6px 0 var(--accent2); }
.hwp img { width:65px; height:65px; object-fit:cover; border-radius:7px; display:block; margin:0 auto 6px; }
.hw-detail { background:#fffde0; border:4px solid var(--accent); border-radius:var(--radius); padding:14px; margin-top:11px; display:none; animation:sIn .3s; box-shadow:0 5px 0 var(--accent2); }
.hw-detail.show { display:flex; gap:12px; align-items:flex-start; }
.hw-detail img { width:120px; height:90px; object-fit:cover; border-radius:7px; border:3px solid var(--accent); flex-shrink:0; }
```
**SISTEMA DE FALLBACK EMOJI — OBLIGATORIO al final del archivo:**
```javascript
document.addEventListener('DOMContentLoaded', function() {
  const emojiMap = {
    'teclado':'⌨️','keyboard':'⌨️','mouse':'🖱️','monitor':'🖥️','laptop':'💻',
    'computador':'💻','disco':'💾','hdd':'💾','usb':'🔌','cpu':'⚙️','ram':'💾',
    'impresora':'🖨️','cámara':'📷','red':'🌐','router':'📡','internet':'🌐',
    'código':'👨‍💻','apps':'📱','videojuego':'🎮','gamer':'🎮','hardware':'🔧',
    'software':'💻','planta':'🌱','animal':'🐾','célula':'🔬','sistema':'🫀',
    'agua':'💧','tierra':'🌍','sol':'☀️','luna':'🌙','laboratorio':'🧪',
    'número':'🔢','suma':'➕','resta':'➖','fracciones':'🔢','geometría':'📐',
    'calculadora':'🧮','libro':'📚','escritura':'✍️','lectura':'📖','lapiz':'✏️',
    'ciudad':'🏙️','campo':'🌾','colombia':'🇨🇴','mapa':'🗺️','música':'🎵','arte':'🎨',
  };
  function fixImg(img) {
    img.onerror = null;
    const alt = (img.alt||'').toLowerCase();
    let icon = '🖼️';
    for (const k in emojiMap) { if (alt.includes(k)) { icon = emojiMap[k]; break; } }
    const ph = document.createElement('div');
    ph.style.cssText = 'font-size:2.8rem;display:flex;align-items:center;justify-content:center;min-height:70px;width:100%;background:var(--primary-light,#e8f4ff);border-radius:9px;border:2px dashed var(--primary,#4a90d9);flex-direction:column;gap:5px;padding:8px;';
    const cap = img.closest('.imgc')?.querySelector('.imgc-cap')?.textContent || img.alt || '';
    ph.innerHTML = `<span>${icon}</span><span style="font-size:.65rem;font-family:Fredoka One;color:var(--primary-dark,#2c5282)">${cap}</span>`;
    img.parentNode.insertBefore(ph, img);
    img.style.display = 'none';
  }
  document.querySelectorAll('img').forEach(function(img) {
    if (img.complete && img.naturalWidth === 0) fixImg(img);
    else img.addEventListener('error', function() { fixImg(this); });
  });
});
```

## 🔴 PRIORIDAD 2 · ABSOLUTA — SLIDE DE EJERCICIOS PRÁCTICOS (sin video)

### 🚫 v7.3 — LOS VIDEOS QUEDAN ELIMINADOS DE LAS CLASES
**Cambio de criterio:** el slide de video (`type: 'video'`) queda eliminado de la estructura de la clase. En su lugar, en esa misma posición del recorrido (slide 16), va un **slide de ejercicios prácticos resueltos paso a paso**, cuyo contenido debe corresponder EXACTAMENTE a algo que luego se pregunte en el Quiz 2 o en la Evaluación Final — reforzando justo antes la habilidad que se va a evaluar (mismo principio de la Prioridad 0-B: "la respuesta ya fue enseñada antes").
### ✏️ REGLA DE ORO: 2-3 EJERCICIOS RESUELTOS, DIRECTAMENTE LIGADOS A LO QUE SE VA A PREGUNTAR
```javascript
// Slide tipo 'practica' — posición 16, reemplaza al antiguo 'video'
{
  type: 'practica',
  title: '✏️ Practiquemos juntos',
  ejercicios: [
    {
      enunciado: '[Situación o problema breve — el mismo tipo que aparecerá en el quiz]',
      pasos: ['[Paso 1]', '[Paso 2]', '[Paso 3]'],
      resultado: '[Resultado final]',
    },
    // 2 o 3 ejercicios en total — nunca más de 3, para no alargar el slide
  ]
}
function rPractica(s) {
  markSeen();
  const html = `
    <div class="slide-title">${s.title}</div>
    <p class="slide-sub">💪 Resuelve mentalmente cada paso — esto es justo lo que verás en el próximo quiz</p>
    ${s.ejercicios.map((ej, i) => `
      <div class="mc" style="margin-bottom:12px;padding:14px">
        <p style="font-family:var(--font-ui);color:var(--primary-dark);font-size:.92rem;margin-bottom:8px">
          ✏️ Ejercicio ${i+1}: ${ej.enunciado}
        </p>
        <div style="background:#fffde0;border:3px solid var(--accent);border-radius:12px;padding:12px;font-size:.85rem;line-height:2;color:var(--text2)">
          ${ej.pasos.map((p, j) => `<p>${['①','②','③','④'][j]||'•'} ${p}</p>`).join('')}
          <p style="color:var(--success);font-weight:900">✅ ${ej.resultado}</p>
        </div>
      </div>
    `).join('')}
  `;
  // ⏱️ v12.0: NO se llama al cronómetro aquí (antes: requestAnimationFrame → activarCronometroLectura). render() lo arranca por aplicarEstadoAvance() (Prioridad 8-O), igual que en cualquier slide de lectura.
  return html;
}
```
**Reglas de la slide de práctica:**
- Entre 2 y 3 ejercicios resueltos completos — nunca más de 3, para que no se vuelva pesada de leer
- Cada ejercicio debe usar el MISMO tipo de situación/problema que luego aparecerá en Quiz 2 o en la Evaluación Final — nunca un tema suelto sin relación
- Sigue contando como slide de lectura: aplica el cronómetro de 12 segundos (Prioridad 0-A) y las reglas de "máximo texto, máximo visual" (Prioridad 0-B)
- NUNCA afecta la nota directamente — es preparación; lo que sí afecta la nota es la pregunta relacionada que aparece después, en el quiz correspondiente
**CHECKLIST:**
```
[ ] El slide tipo 'video' fue eliminado por completo — no debe aparecer en ningún lugar del código generado
[ ] El slide tipo 'practica' ocupa la posición 16 de la estructura (Prioridad 9)
[ ] Entre 2 y 3 ejercicios resueltos paso a paso, nunca más de 3
[ ] Cada ejercicio de práctica se relaciona directamente con una pregunta real de Quiz 2 o Evaluación Final
[ ] Aplica cronómetro de 12s (Prioridad 0-A) igual que cualquier slide de lectura
```

## 🔴 PRIORIDAD 3 · ABSOLUTA — SISTEMA DE NOTA CALCULADA SOLO CON QUIZZES

### ⭐ REGLA DE ORO: SOLO LOS QUIZZES DE OPCIÓN MÚLTIPLE GENERAN NOTA
**ESTRUCTURA OBLIGATORIA DE EVALUACIÓN POR CLASE:**
```javascript
// CONFIGURACIÓN DE EVALUACIÓN — DEFINIR AL INICIO
const EVAL_CONFIG = {
  quiz1: {
    nombre: 'Quiz 1',
    preguntas: 8,      // Entre 7 y 10 preguntas
    peso: 33.3,        // % del total de preguntas
  },
  quiz2: {
    nombre: 'Quiz 2',
    preguntas: 8,      // Entre 7 y 10 preguntas
    peso: 33.3,
  },
  evalFinal: {
    nombre: 'Evaluación Final',
    preguntas: 14,     // Entre 12 y 15 preguntas
    peso: 33.4,
  }
};
// TOTAL PREGUNTAS = quiz1 + quiz2 + evalFinal
// Ej: 8 + 8 + 14 = 30 preguntas totales
// NOTA = (aciertos / total_preguntas) × 5.0
// Nota mínima = 0.0 · Nota máxima = 5.0 · Nota aprobatoria = 3.0
```
**SISTEMA DE PUNTUACIÓN — NOTA DESDE CERO:**
```javascript
// La nota NO inicia en 5.0 — se CONSTRUYE con aciertos
// Nota = (total_aciertos / total_preguntas_evaluables) × 5.0
let st = {
  aciertos: 0,        // contador de respuestas correctas en evaluables
  totalPregs: 0,      // total de preguntas evaluables respondidas
  // ...otros campos
};
// 🧾 v12.0 — Lo de arriba es la FÓRMULA conceptual de la nota (para entender qué mide calcTotal), no el código a copiar:
// calcTotal() real, con el tope anti-clic-rápido, vive en la Prioridad 8-M.
// registrarRespuesta() NO se implementa tal cual — sumar st.aciertos++ sin candado es exactamente el bug de 8-M.
// El único punto que suma un acierto es responderQuiz() (Prioridad 8-P), a través de recalcularAciertosDesdeContadores() (8-H).
```
**ACTIVIDADES SIN NOTA (complementarias) — NO afectan el cálculo:**
| Tipo | Nota | Obligatoria para avanzar | Nota si falla |
|------|------|--------------------------|---------------|
| Quiz opción múltiple | ✅ SÍ | ✅ NO se puede saltar | Simplemente no suma acierto |
| Evaluación final | ✅ SÍ | ✅ NO se puede saltar | Simplemente no suma acierto |
| Sopa de letras | ❌ NO | ⚠️ Mín. 1 palabra encontrada | Sin efecto en nota |
| Drag & drop | ❌ NO | ❌ Se puede saltar | Sin efecto en nota |
| Matching | ❌ NO | ❌ Se puede saltar | Sin efecto en nota |
| Fill in the blank | ❌ NO | ❌ Se puede saltar | Sin efecto en nota |
| Ordenar | ❌ NO | ❌ Se puede saltar | Sin efecto en nota |
| Explorador | ❌ NO | ❌ Se puede saltar | Sin efecto en nota |
| Cuadernos | ❌ NO | ❌ Se puede saltar | Sin efecto en nota |

>  **v15.0 — Nota oficial = MEJOR nota de todos los intentos (Prioridad 8-U).** `calcTotal()` es la nota del intento EN CURSO; la nota que se muestra, se guarda y se envía al index es `notaOficial()` = `max(calcTotal(), st.mejorNota)`. Reintentar con una vida **nunca baja la nota** (3.5 → reintento 3.0 → queda 3.5).

## 🔴 PRIORIDAD 4 · ABSOLUTA — BLOQUEO DE EVALUABLES — NO SE PUEDEN SALTAR (motor en 8-O)

### 🚫 LOS QUIZZES Y EVALUACIÓN FINAL SON OBLIGATORIOS — NO SE PUEDEN SALTAR
Un `quiz`/`evalFinal` bloquea "Siguiente" hasta que `st.acts['completado_'+id] === true` (es decir, hasta responder TODAS sus preguntas). La lógica vive en `puedeAvanzar(s)` y `nextSlide()` de la **Prioridad 8-O** (versión única); el mensaje amable de bloqueo es `mostrarMensajeBloqueo(s)` de la Prioridad 0-C.


**Reglas que se mantienen:**
- Ningún botón, atajo, menú lateral ni enlace permite pasar un quiz/evalFinal sin completarlo (el menú de progreso es 100% visual — Prioridad 0-G).
- La sopa de letras (`wordsearch`) exige **al menos 1 palabra encontrada** (`ws_min_`) — **sin opción de "saltar"**.
- El mensaje de bloqueo de un evaluable dice que "sí cuenta para tu nota" y no ofrece ninguna salida salvo volver a responder.

**Checklist:**
```
[ ] Existe UN SOLO nextSlide() en todo el archivo (el de la Prioridad 8-O) — buscar "function nextSlide" y confirmar que aparece una vez
[ ] No existe goNextForce() ni ningún botón "Saltar de todas formas"
[ ] Un quiz/evalFinal incompleto bloquea "Siguiente" tanto en el botón como en cualquier otra ruta
```

## 🔴 PRIORIDAD 5 · ABSOLUTA — PREGUNTAS DE QUIZ: OPCIÓN MÚLTIPLE CON CONTEXTO

### 📝 REGLAS DE DISEÑO DE PREGUNTAS
**PROHIBIDO:**
- Preguntas cuya respuesta esté literalmente en el enunciado
- Preguntas sin contexto previo — siempre referenciar un concepto explicado ANTES en la clase
- Preguntas que un estudiante pueda responder sin haber leído la clase
**OBLIGATORIO:**
- Cada pregunta tiene un **CONTEXTO** (párrafo breve o imagen) que da información suficiente para analizar
- La respuesta correcta requiere **INFERENCIA** — el estudiante debe pensar, no solo copiar
- El contexto menciona una situación, personaje o dato real que el estudiante debe interpretar
- Las 4 opciones son plausibles (no hay opciones ridículas o claramente incorrectas)
- Las opciones A, B, C, D se mezclan aleatoriamente cada vez que se muestra
**ESTRUCTURA OBLIGATORIA DE CADA PREGUNTA:**
```javascript
{
  id: 'q1',
  contexto: `
    <div style="background:var(--primary-light);border-left:4px solid var(--primary);
                padding:12px;border-radius:0 10px 10px 0;margin-bottom:12px;font-size:.85rem">
      <p style="font-weight:700;color:var(--primary-dark);margin-bottom:6px">📖 Lee con atención:</p>
      <p style="line-height:1.8;color:var(--text2)">
        [SITUACIÓN O DATO que requiere análisis — NO incluir la respuesta directamente]
      </p>
    </div>
  `,
  pregunta: '❓ [PREGUNTA que requiere inferencia a partir del contexto]',
  opciones: [
    { id:'a', texto:'[Opción A]', correcta: false },
    { id:'b', texto:'[Opción B]', correcta: true  },  // <- la correcta
    { id:'c', texto:'[Opción C]', correcta: false },
    { id:'d', texto:'[Opción D]', correcta: false },
  ],
  retroalimentacion: '[Explicación de POR QUÉ la respuesta correcta es correcta]',
  pistaAyuda: '[OPCIONAL — ver Prioridad 30-B. Orientación socrática que el profe Luis escribe para ESTA pregunta puntual: qué revisar, en qué fijarse, cómo pensarla — NUNCA la respuesta ni una pista tan directa que la delate. Si se deja vacío, ARIA usa un scaffolding genérico de respaldo.]'
}
```
> 📌 **`pistaAyuda` es opcional pero muy recomendado** en preguntas donde el estudiante suele trabarse: es lo que ARIA usa (Prioridad 30-B) cuando detecta que el estudiante pegó o escribió esta pregunta en el chat, en vez de darle la respuesta o dejarlo sin apoyo.
**FUNCIONES DEL QUIZ — v12.0: UNA SOLA IMPLEMENTACIÓN, en la Prioridad 8-P** (`vistaPregunta()`, `rQuiz()`, `responderQuiz()`, retroalimentación persistente, `resetearEstadoQuiz()`, `shuffleWithSeed()`). El HTML del quiz (barra de progreso, contexto, opciones aleatorias, aviso de obligatoriedad) sigue siendo el que esta prioridad especificaba y ahora está dentro de `rQuiz()` de 8-P.


**Lo que sí sigue vigente aquí — `renderResumenQuiz()`** (el botón usa `nextSlide()`, jamás `st.slide++`):
```javascript
function renderResumenQuiz(s) {
  const resps = st.acts['quiz_resps_'+s.id] || [];
  const correctas = resps.filter(r => r.correcta).length;
  const totalP = s.preguntas.length;
  return `
    <div class="slide-title">📊 Resumen — ${s.title}</div>
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:3.5rem;margin-bottom:8px">${correctas>=totalP*0.7?'🏆':correctas>=totalP*0.5?'⭐':'💪'}</div>
      <p style="font-family:var(--font-ui);font-size:1.3rem;color:var(--primary-dark);margin-bottom:6px">
        ${correctas} / ${totalP} correctas
      </p>
      <p style="font-size:.85rem;color:var(--muted);margin-bottom:16px">
        ${((correctas/totalP)*100).toFixed(0)}% de aciertos en este quiz
      </p>
      <!-- Detalle de respuestas incorrectas -->
      ${resps.filter(r=>!r.correcta).length > 0 ? `
        <div style="text-align:left;background:var(--primary-light);border-radius:12px;padding:12px;margin-bottom:14px">
          <p style="font-family:var(--font-ui);color:var(--primary-dark);font-size:.88rem;margin-bottom:8px">
            📌 Preguntas que fallaste:
          </p>
          ${resps.filter(r=>!r.correcta).map((r,i) => `
            <div style="background:#fff;border-left:3px solid var(--error);
                        border-radius:0 8px 8px 0;padding:8px 10px;margin-bottom:7px;font-size:.78rem">
              <p style="color:var(--error);font-weight:700;margin-bottom:3px">❌ Pregunta ${r.pregIdx+1}</p>
              <p style="color:var(--text2);line-height:1.6">${r.retro||'Revisa el contenido de la clase.'}</p>
            </div>
          `).join('')}
        </div>
      ` : `
        <div style="background:#e8fff0;border-radius:12px;padding:12px;margin-bottom:14px;
                    border:2px solid var(--success)">
          <p style="font-family:var(--font-ui);color:var(--success);font-size:.9rem">
            🎉 ¡Perfecto! No tuviste errores en este quiz.
          </p>
        </div>
      `}
      <button class="mbtn" onclick="nextSlide()">Continuar →</button>
    </div>
  `;
}
```
