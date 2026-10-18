---
modulo: 17_estructura_y_pantallas
etapa_de_lectura: 3
prioridades: [9, 10, 10-B, 10-C, 10-D, 11]
---

# 17 · Estructura de slides, cuadernos, menú de ruta, nota final y pantalla final

## 🔴 PRIORIDAD 9 · ABSOLUTA — ESTRUCTURA DE 23 SLIDES

** CAMBIO CRÍTICO v6.2:** los cuadernos (Cuaderno 1 y Taller en Clase / antes "Cuaderno 2") **NUNCA** ocupan una posición dentro de la secuencia de slides. Son EXCLUSIVAMENTE paneles flotantes accesibles desde el navbar superior (ver Prioridad 10, actualizada en v6.2). Esto corrige clases anteriores que los integraban como slides duplicadas dentro del recorrido — eso queda PROHIBIDO. La estructura correcta, sin cuadernos, es de 23 slides (v22: con capítulos `historia`, minijuegos y mundos):
| Slides | Tipo | Contenido | Mundo | Nota |
|--------|------|-----------|-------|------|
| 1 | intro | Portal de entrada: apertura misteriosa con el nombre, **elige título y avatar** (34.4) | 1 | ❌ |
| 2 | **historia** | **Capítulo 1** — cuento interactivo que enseña el Concepto 1 (34-C) | 1 | ❌ |
| 3 | info | Concepto 1 formal y visual + 4 imágenes | 1 | ❌ |
| 4 | info | Concepto 2 + 4 imágenes | 1 | ❌ |
| 5 | **historia** | **Capítulo 2** — Concepto 2 en acción | 1 | ❌ |
| 6 | interactive | Explorador clickeable + 6 imágenes | 1 | ❌ |
| 7 | info | Concepto 3 + 4 imágenes | 1 | ❌ |
| 8 | **minijuego** | **Minijuego A** — practica el Concepto 3 (35) | 2 | ❌ |
| 9 | complementaria | Drag & drop / Matching (sin nota) + botón Verificar | 2 | ❌ |
| 10 | **quiz** | **QUIZ 1: 8 preguntas opción múltiple** | 2 | ✅ NOTA |
| 11 | complementaria | Fill in the blank / Ordenar (sin nota) + botón Verificar | 2 | ❌ |
| 12 | **historia** | **Capítulo 3** — giro: la historia viaja al **Mundo Sorpresa** | 3 | ❌ |
| 13 | info | Concepto 4 + 4 imágenes | 3 | ❌ |
| 14 | **minijuego** | **Minijuego B** — en el Mundo Sorpresa | 3 | ❌ |
| 15 | **quiz** | **QUIZ 2: 8 preguntas opción múltiple** | 3 | ✅ NOTA |
| 16 | practica | Ejercicios prácticos resueltos (ligados al Quiz 2/Eval. Final) | 3 | ❌ |
| 17 | info | Profundización + ¿Sabías que…? + 2 imágenes | 3 | ❌ |
| 18 | wordsearch | Sopa de letras (máx. 5 palabras, mín. 1 encontrada) | 3 | ❌ |
| 19 | repaso | Mapa mental / resumen visual + 2 imágenes | 3 | ❌ |
| 20 | **minijuego** | **Minijuego C** — escape room de repaso (`candados`) | 4 | ❌ |
| 21–22 | **evalFinal** | **Evaluación Final: 14 preguntas opción múltiple** (cap. final antes de 21) | 4 | ✅ NOTA |
| 23 | final | Pantalla cierre: nota (mejor nota) + vidas + gemas + resolución del misterio | 4 | — |
**Esta tabla es la ÚNICA fuente de las posiciones.** La plantilla `DATOS_DE_LA_CLASE.md` y las pruebas se leen contra ella (en la v21 la plantilla decía Quiz 1 = slides 9-10, Quiz 2 = 14-15 y Final = 23-24, lo que contradecía esta tabla). **Siguen siendo 23 slides**, así que los motores de navegación, bloqueo y nota no cambian de posición: `historia` cuenta como **lectura** (34-C.3) y `minijuego` como **actividad** (35.3). Si el docente pide una versión más corta, se conservan las posiciones de los evaluables (10, 15, 21–22) y se quitan slides no evaluables.
**Los cuadernos NO aparecen en esta tabla porque NO son slides.** Se acceden en cualquier momento desde los botones fijos del navbar (📒 Cuaderno 1 / 📝 Taller en Clase), como paneles flotantes independientes del recorrido — nunca deben duplicarse dentro del contenido de ninguna slide, ni contarse en `SL`, ni aparecer en el sidebar de progreso, ni bloquear `nextSlide()`.
**CÁLCULO DE NOTA CON ESTA ESTRUCTURA:**
```
Total preguntas evaluables = 8 (Q1) + 8 (Q2) + 14 (EF) = 30 preguntas
Nota = (aciertos / 30) × 5.0
Ejemplo: 20 aciertos de 30 → (20/30) × 5.0 = 3.33 (aprobado)
Ejemplo: 30 aciertos → 5.0 (perfecto)
Ejemplo: 0 aciertos → 0.0 (reprueba → se activan las 8 vidas)
```
**Nota 2 de la clase (independiente de esta nota automática):** el Taller en Clase (antes "Cuaderno 2") se califica aparte, manualmente por el docente — ver Prioridad 10 y Prioridad 18.

## 🔴 PRIORIDAD 10 · ABSOLUTA — CUADERNOS DIGITALES: ACCESO DESDE MENÚ SUPERIOR + DISEÑO TIPO AGENDA REAL

### 📒📓 LOS DOS CUADERNOS SIEMPRE VISIBLES Y ACCESIBLES DESDE EL MENÚ SUPERIOR
** Cambio de comportamiento CRÍTICO v6.2:** los cuadernos **NUNCA** son slides — ni ahora ni antes deberían haberlo sido de forma duplicada. Son **exclusivamente paneles flotantes** accesibles en cualquier momento desde dos botones siempre visibles en el menú/navbar superior. **NO ocupan lugar en la secuencia de `SL`, no aparecen en el sidebar de progreso, no bloquean `nextSlide()`, y bajo ninguna circunstancia deben duplicarse dentro del contenido de una slide.** Si una clase integra contenido de cuaderno directamente dentro de una slide del recorrido, eso es un error a corregir — el cuaderno vive únicamente en su panel flotante propio.
```html
<!-- En el NAVBAR superior — siempre visibles, junto a los demás botones -->
<div class="nb-tabs-top">
  <button id="btn-cuaderno1" class="nb-tab-btn" onclick="abrirCuadernoFlotante(1)" title="Cuaderno 1 — Teoría">
    📒 Cuaderno 1
    <span class="nb-tab-badge" id="nb1-badge"></span>
  </button>
  <button id="btn-cuaderno2" class="nb-tab-btn" onclick="abrirCuadernoFlotante(2)" title="Taller en Clase — Nota 2">
    📝 Taller en Clase
    <span class="nb-tab-badge" id="nb2-badge"></span>
  </button>
</div>
```
```css
.nb-tabs-top {
  display: flex;
  gap: 8px;
}
.nb-tab-btn {
  position: relative;
  background: linear-gradient(180deg, #fff, #f5f0e0);
  border: 2.5px solid var(--primary);
  border-radius: 10px;
  padding: 6px 14px;
  font-family: var(--font-ui);
  font-size: .78rem;
  color: var(--primary-dark);
  cursor: pointer;
  box-shadow: 0 3px 0 var(--primary-dark);
  transition: .15s;
}
.nb-tab-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 0 var(--primary-dark); }
.nb-tab-badge {
  position: absolute;
  top: -7px; right: -7px;
  background: var(--success);
  color: #fff;
  border-radius: 50%;
  width: 18px; height: 18px;
  font-size: .62rem;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #fff;
}
```
```javascript
// Panel flotante (modal grande) que muestra el cuaderno sin perder el slide actual
function abrirCuadernoFlotante(num) {
  const html = num === 1 ? renderCuaderno1Contenido() : renderCuaderno2Contenido();
  showModalGrande(`
    <div class="nb-modal-header">
      <span>${num === 1 ? '📒 Cuaderno 1 — Teoría' : '📝 Taller en Clase — Nota 2'}</span>
      <button onclick="closeModalGrande()" class="nb-modal-close">✕</button>
    </div>
    ${html}
  `);
}
// Actualizar las insignias (badges) del menú superior según completitud
function actualizarBadgesCuadernos() {
  const b1 = document.getElementById('nb1-badge');
  const b2 = document.getElementById('nb2-badge');
  // la insignia ✓ ahora refleja que el estudiante confirmó "Ya lo copié — Cerrar"
  if (b1) b1.textContent = st.acts['cuaderno1_confirmado'] ? '✓' : '';
  if (b2) b2.textContent = st.acts['cuaderno2_confirmado'] ? '✓' : '';
}
// Llamar actualizarBadgesCuadernos() dentro de updateUI()
```
---
### 📒 CUADERNO 1 — Diseño de AGENDA/HOJA REAL (no genérico) — v6.2
**Objetivo visual (v7.3 — corregido):** que el estudiante sienta que está viendo una página de agenda física bonita — con textura de papel, cinta adhesiva decorativa y fecha tipo agendero — pero **SIN post-its de colores, sin rotaciones ni tarjetas inclinadas, y SIN imágenes ni gráficos de ningún tipo**. La prioridad es que se vea claro y ordenado de un vistazo qué es exactamente lo que hay que copiar: fecha, nombre de la semana (ej. "Semana 3"), título de la clase, y una lista simple de conceptos/definiciones/fórmulas/ejemplos, uno debajo del otro, con letra de tamaño medio y sin espacios de más.
**Reglas de contenido:** el Cuaderno 1 es para definiciones, conceptos clave, fórmulas o la teoría que se requiera de la clase. Debe llevar SIEMPRE la fecha del día visible. No debe ser demasiado corto (que no aporte nada) ni demasiado largo (que abrume) — un punto medio claro y resumido. Debe verse claramente con forma de cuaderno/agenda (no una lista plana), y debe especificar en grande y en negrita que ese contenido se debe copiar en el cuaderno físico del estudiante.
```javascript
function renderCuaderno1Contenido() {
  return `
    <div class="agenda-page">
      <!-- Cinta adhesiva decorativa en la esquina (decoración mínima, no estorba la lectura) -->
      <div class="agenda-tape"></div>
      <!-- Banner grande y en negrita — indica que esto se copia en el cuaderno físico -->
      <div class="cuaderno-copia-banner">
        📌 <strong>COPIA ESTO EN TU CUADERNO</strong>
      </div>
      <!-- Encabezado tipo agenda — SIEMPRE con la fecha del día + nombre de la semana -->
      <!--  v7.3 — SIN imágenes/gráficos en el Cuaderno 1: solo fecha, título y "Semana N" -->
      <div class="agenda-header">
        <div class="agenda-fecha-box">
          <span class="agenda-dia">${new Date().getDate()}</span>
          <span class="agenda-mes">${new Date().toLocaleDateString('es-CO',{month:'short'}).toUpperCase()}</span>
        </div>
        <div>
          <p class="agenda-titulo">${st.tema || 'Mi resumen de la clase'}</p>
          <p class="agenda-sub">Semana ${AUTOR_SEMANA_NUM} · ${AUTOR_MATERIA_FALLBACK} · ${AUTOR_GRADO_FALLBACK}</p>
        </div>
      </div>
      <!--  v7.3 — Conceptos clave: lista LIMPIA, sin imágenes ni post-its —
           título en negrita + definición/concepto/fórmula/ejemplo, uno debajo del otro.
           Letra de tamaño medio (ni muy grande ni muy pequeña) y SIN espacios de más,
           para que se vea claramente que no es mucho texto por copiar. -->
      <div class="agenda-conceptos-lista">
        ${(st.conceptosClase||[]).map((c) => `
          <div class="concepto-item">
            <p class="concepto-titulo">${c.titulo}</p>
            <p class="concepto-texto">${c.definicion}</p>
          </div>
        `).join('')}
      </div>
      <!-- REFLEXIÓN 1 -->
      <div class="agenda-reflexion r1">
        <p class="agenda-reflexion-label">✍️ ¿Qué aprendí hoy?</p>
        <textarea id="reflexion1" placeholder="Escribe con tus propias palabras lo que aprendiste..."
          oninput="guardarReflexion('r1', this.value)" class="agenda-textarea"
        >${st.acts['reflexion_r1']||''}</textarea>
      </div>
      <!-- REFLEXIÓN 2 -->
      <div class="agenda-reflexion r2">
        <p class="agenda-reflexion-label">💭 ¿Qué te gustó más o qué se te dificultó?</p>
        <textarea id="reflexion2" placeholder="Cuéntame qué fue lo más fácil o lo más difícil..."
          oninput="guardarReflexion('r2', this.value)" class="agenda-textarea"
        >${st.acts['reflexion_r2']||''}</textarea>
      </div>
      <!--  v6.6 — Botones de acción: copiar y CERRAR/CONFIRMAR que ya se copió -->
      <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
        <button class="mbtn" style="flex:1;min-width:140px" onclick="copiarCuaderno()">
          📋 Copiar mi cuaderno
        </button>
        <button class="mbtn gd" style="flex:1;min-width:140px" onclick="confirmarCopiaCuaderno(1)">
          ✅ Ya lo copié — Cerrar
        </button>
      </div>
    </div>
  `;
}
// Confirmar que el estudiante ya copió el contenido y cerrar el panel
function confirmarCopiaCuaderno(num) {
  st.acts['cuaderno'+num+'_confirmado'] = true;
  save();
  actualizarBadgesCuadernos();
  closeModalGrande();
  showToast('✅ ¡Listo! Sigamos con la clase');
}
function guardarReflexion(key, valor) {
  st.acts['reflexion_'+key] = valor;
  save();
  actualizarBadgesCuadernos();
  // : NO llama habilitarBtnNext() — el Cuaderno 1 no es un slide y no bloquea nada
}
function copiarCuaderno() {
  const r1 = st.acts['reflexion_r1'] || '(sin escribir)';
  const r2 = st.acts['reflexion_r2'] || '(sin escribir)';
  const txt = `📒 MI CUADERNO — IE SIMÓN BOLÍVAR\n${new Date().toLocaleDateString('es-CO')}\n\n✍️ Qué aprendí hoy:\n${r1}\n\n💭 Lo que me gustó / dificultó:\n${r2}`;
  navigator.clipboard.writeText(txt).then(() => showToast('📋 ¡Cuaderno copiado!'));
}
```
**CSS del banner "copia esto en tu cuaderno" — agregar al `<style>`:**
```css
.cuaderno-copia-banner {
  background: linear-gradient(135deg, #fff3cd, #ffe08a);
  border: 3px solid var(--accent);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 12px;
  text-align: center;
  font-family: var(--font-ui);
  font-size: 1.05rem;
  color: var(--primary-dark);
  box-shadow: 0 3px 0 var(--primary-dark);
}
```
**CSS de la agenda — reemplaza al cuaderno rayado genérico anterior:**
```css
.agenda-page {
  background: #fffdf7;
  background-image:
    linear-gradient(90deg, transparent 0, transparent 38px, rgba(255,123,172,.25) 38px, rgba(255,123,172,.25) 40px, transparent 40px),
    repeating-linear-gradient(transparent, transparent 26px, rgba(180,200,230,.4) 26px, rgba(180,200,230,.4) 27px);
  border-radius: 14px;
  padding: 18px 20px 20px 48px;
  position: relative;
  box-shadow: 0 6px 0 var(--primary-dark), 0 10px 24px rgba(0,0,0,.15);
  border: 1px solid #eee;
  max-height: 70vh;
  overflow-y: auto;
}
.agenda-tape {
  position: absolute;
  top: -10px; right: 30px;
  width: 70px; height: 26px;
  background: repeating-linear-gradient(45deg, rgba(255,209,102,.85), rgba(255,209,102,.85) 6px, rgba(255,193,7,.85) 6px, rgba(255,193,7,.85) 12px);
  transform: rotate(-4deg);
  box-shadow: 0 2px 4px rgba(0,0,0,.15);
  opacity: .9;
}
.agenda-header {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 2px dashed var(--primary-light);
}
.agenda-fecha-box {
  background: var(--primary);
  color: #fff;
  border-radius: 12px;
  width: 56px; height: 56px;
  flex-shrink: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  box-shadow: 0 3px 0 var(--primary-dark);
}
.agenda-dia { font-family: var(--font-ui); font-size: 1.3rem; line-height: 1; }
.agenda-mes { font-size: .6rem; letter-spacing: .05em; opacity: .9; }
.agenda-titulo { font-family: var(--font-ui); font-size: 1.05rem; color: var(--primary-dark); margin-bottom: 2px; }
.agenda-sub { font-size: .72rem; color: var(--muted); font-style: italic; }
/* — .agenda-fotos y .agenda-foto-card YA NO se usan en el Cuaderno 1 (sin imágenes, ver Prioridad 10) — se dejan definidas por si se reutilizan en otro contexto, pero no se referencian en renderCuaderno1Contenido() */
.agenda-fotos { display: flex; gap: 14px; margin-bottom: 14px; flex-wrap: wrap; }
.agenda-foto-card {
  background: #fff;
  padding: 8px 8px 24px;
  box-shadow: 0 2px 6px rgba(0,0,0,.12);
  border-radius: 4px;
  width: 140px;
}
/* — SIN inclinación: fotos derechas, orden limpio (antes tenían rotate()) */
.agenda-foto-card img { width: 100%; height: 90px; object-fit: cover; border-radius: 2px; }
.agenda-foto-card p { font-family: var(--font-ui); font-size: .62rem; text-align: center; color: var(--text2); margin-top: 6px; }
/* — Lista de conceptos LIMPIA y compacta — SIN post-its, SIN imágenes.
   Tamaño de letra MEDIO a propósito (ni muy grande ni muy pequeño) y espaciado
   ajustado, para que se vea de un vistazo que no es mucho texto por copiar. */
.agenda-conceptos-lista {
  display: flex;
  flex-direction: column;
  gap: 8px;              /* 🔺 v7.3: menos separación entre conceptos */
  margin-bottom: 12px;    /* 🔺 v7.3: menos margen general */
}
.concepto-item {
  background: #fff;
  border-left: 5px solid var(--primary);
  border-radius: 0 8px 8px 0;
  padding: 8px 12px;      /* 🔺 v7.3: relleno más ajustado, sin espacio sobrante */
  box-shadow: 0 2px 4px rgba(0,0,0,.06);
}
.concepto-titulo { font-weight: 800; color: var(--primary-dark); margin-bottom: 2px; font-size: .9rem; }  /* tamaño medio */
.concepto-texto { color: var(--text2); line-height: 1.45; font-size: .85rem; }  /* tamaño medio, sin interlineado exagerado */
.agenda-reflexion { border-radius: 12px; padding: 12px; margin-bottom: 10px; }
.agenda-reflexion.r1 { background: #f0f8ff; border: 2px solid var(--primary); }
.agenda-reflexion.r2 { background: #fff8e1; border: 2px solid var(--accent); }
.agenda-reflexion-label { font-family: var(--font-ui); font-size: .85rem; color: var(--primary-dark); margin-bottom: 8px; }
.agenda-textarea {
  width: 100%; min-height: 65px; padding: 8px; border: 2px solid var(--primary-light);
  border-radius: 8px; font-family: var(--font-body); font-size: .82rem; resize: vertical;
  background: #fff; color: var(--text);
}
```
---
### 📝 TALLER EN CLASE (antes "Cuaderno 2") — 4 A 5 EJERCICIOS, ES LA NOTA 2 DE LA CLASE
**Renombrado y actualizado:** lo que antes se llamaba "Cuaderno 2" ahora se llama **"Taller en Clase"** en todos los textos, botones y títulos visibles. Es una actividad **calificada manualmente por el docente** — funciona como una **Nota 2** independiente de la nota automática de los quizzes (Prioridad 3).
**Reglas del Taller en Clase (v6.5 — corregido, SIN escritura en el computador):**
- **4 o 5 ejercicios** exactos, según la complejidad del tema (nunca más de 5, nunca menos de 4)
- Cada ejercicio debe corresponder a algo **ya explicado específicamente en una slide de la clase** — el estudiante debe poder resolverlo porque ya vio cómo se hace
- El enunciado de cada ejercicio debe ser **sintetizado y breve** — evitar contexto largo o innecesario; ir directo a lo que se pide
- Al abrir el panel, debe mostrar un **título grande**: "📝 Taller en Clase — Nota 2"
- Justo debajo del título, en **texto rojo**: "Responde esto en tu cuaderno"
- ** v6.5 — PROHIBIDO** incluir `<textarea>`, `<input>` ni ningún campo donde el estudiante escriba con el teclado. El panel SOLO muestra los 4-5 enunciados de los ejercicios (con su botón de "Ejemplo → Slide X") — el estudiante los resuelve físicamente en su cuaderno de papel, no en el computador
- Es un panel flotante (Prioridad 10) — NUNCA es un slide, nunca bloquea `nextSlide()`, nunca se duplica dentro de una slide
```javascript
// REGLAS DEL TALLER EN CLASE:
// - 4 o 5 ejercicios exactos según complejidad (NUNCA más de 5)
// - Cada ejercicio referencia un slide de ejemplo ya visto
// - Enunciados sintetizados y breves — sin contexto largo
// - Título grande "📝 Taller en Clase — Nota 2" + subtítulo en rojo "Responde esto en tu cuaderno"
// - SOLO lectura: NUNCA lleva textarea/input — el estudiante escribe en su cuaderno físico, no en el PC
function renderCuaderno2Contenido() {
  const ejercicios = CUADERNO2_EJERCICIOS || [];
  return `
    <div class="agenda-page agenda-ejercicios">
      <div class="agenda-tape" style="left:30px;right:auto;background:repeating-linear-gradient(45deg,rgba(129,199,132,.85),rgba(129,199,132,.85) 6px,rgba(76,175,80,.85) 6px,rgba(76,175,80,.85) 12px)"></div>
      <!--  v6.5 — Título grande del taller -->
      <h2 class="taller-titulo-grande">📝 Taller en Clase — Nota 2</h2>
      <!--  v6.5 — Aviso en rojo, justo debajo del título -->
      <p class="taller-aviso-rojo">Responde esto en tu cuaderno</p>
      <div class="agenda-header">
        <div class="agenda-fecha-box" style="background:var(--success)">
          <span class="agenda-dia">✏️</span>
          <span class="agenda-mes">TAREA</span>
        </div>
        <div>
          <p class="agenda-titulo">🖊️ Demuestra lo que aprendiste</p>
          <p class="agenda-sub">${ejercicios.length} ejercicios cortos · iguales a los ejemplos de la clase</p>
        </div>
      </div>
      <!--  v6.5 — SOLO enunciado + botón de ejemplo, SIN textarea ni input de ningún tipo -->
      ${ejercicios.map((ej, i) => `
        <div class="ej-card">
          <div class="ej-card-head">
            <span class="ej-num">${i+1}</span>
            <p class="ej-enunciado">${ej.enunciado}</p>
          </div>
          <button onclick="irASlide(${ej.slideEjemplo})" class="ej-link-ejemplo">
            💡 Ejemplo → Slide ${ej.slideEjemplo}
          </button>
        </div>
      `).join('') || '<p>Ejercicios no definidos</p>'}
      <!--  v6.6 — Botón de cerrar/confirmar que ya se copió el taller -->
      <button class="mbtn gd" style="width:100%;margin-top:12px" onclick="confirmarCopiaCuaderno(2)">
        ✅ Ya lo copié — Cerrar
      </button>
    </div>
  `;
}
// Ir a un slide específico (hipervínculo del taller) — abre dentro del mismo flujo,
// cerrando el modal flotante si estaba abierto desde el menú superior
function irASlide(num) {
  closeModalGrande();
  st.acts['volver_desde'] = st.slide;
  st.slide = num;
  save();
  render();
  showToast(`📍 Viendo el ejemplo — usa "Taller en Clase" en el menú para volver a tu ejercicio`);
}
```
**CSS del título grande y aviso en rojo — agregar al `<style>`:**
```css
.taller-titulo-grande {
  font-family: var(--font-ui);
  font-size: 1.5rem;
  color: var(--primary-dark);
  text-align: center;
  margin-bottom: 4px;
  font-weight: 900;
}
.taller-aviso-rojo {
  color: var(--error);
  font-weight: 900;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 14px;
}
```
**CSS del banner y aviso de Nota 2 — agregar al `<style>`:**
```css
.taller-banner {
  background: linear-gradient(135deg, #fff3cd, #ffe08a);
  border: 3px solid var(--accent);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 12px;
  text-align: center;
  font-family: var(--font-ui);
  font-size: 1.05rem;
  color: var(--primary-dark);
  box-shadow: 0 3px 0 var(--primary-dark);
}
.taller-nota2-aviso {
  background: #fff0f0;
  border: 2px dashed var(--error);
  border-radius: 10px;
  padding: 9px 13px;
  margin-bottom: 14px;
  font-size: .8rem;
  color: var(--text2);
  text-align: center;
}
```
**CSS adicional para las tarjetas de ejercicio:**
```css
.ej-card {
  background: #fff;
  border-radius: 10px;
  border: 3px solid var(--primary-light);
  padding: 12px;
  margin-bottom: 12px;
}
.ej-card-head { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; }
.ej-num {
  background: var(--success); color: #fff; border-radius: 50%;
  width: 26px; height: 26px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-ui); font-size: .85rem;
}
.ej-enunciado { font-size: .88rem; color: var(--text); line-height: 1.7; margin: 0; }
.ej-link-ejemplo {
  background: none; border: 2px solid var(--accent); color: var(--primary-dark);
  border-radius: 8px; padding: 4px 10px; font-family: var(--font-ui);
  font-size: .72rem; cursor: pointer; margin-bottom: 8px; display: inline-block;
}
```
---
### 🪟 MODAL GRANDE PARA CUADERNOS FLOTANTES
```javascript
function showModalGrande(html) {
  let overlay = document.getElementById('modal-grande-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'modal-grande-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:800;display:flex;align-items:center;justify-content:center;padding:20px';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = `
    <div style="background:var(--bg-card);border-radius:18px;max-width:560px;width:100%;
                max-height:88vh;overflow-y:auto;box-shadow:0 12px 40px rgba(0,0,0,.3);
                border:4px solid var(--primary)">
      ${html}
    </div>
  `;
  overlay.style.display = 'flex';
  overlay.onclick = (e) => { if (e.target === overlay) closeModalGrande(); };
}
function closeModalGrande() {
  const overlay = document.getElementById('modal-grande-overlay');
  if (overlay) overlay.style.display = 'none';
}
```
```css
.nb-modal-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 18px; background: var(--primary); color: #fff;
  font-family: var(--font-ui); font-size: 1.05rem;
  border-radius: 14px 14px 0 0;
}
.nb-modal-close {
  background: rgba(255,255,255,.2); border: none; color: #fff;
  border-radius: 8px; width: 30px; height: 30px; cursor: pointer; font-size: 1rem;
}
```
** Nota importante v6.2 sobre el avance obligatorio:** los cuadernos son EXCLUSIVAMENTE paneles flotantes — nunca ocupan lugar en la secuencia de slides, nunca se duplican dentro del contenido de una slide, y nunca bloquean `nextSlide()`. El estudiante puede abrirlos, escribir en ellos o copiarlos en cualquier momento de la clase (incluso repetidamente) sin que eso afecte su avance por las slides. Completarlos se anima con las insignias del navbar (Prioridad 10), pero jamás condiciona el paso de una slide a otra.

## 🔴 PRIORIDAD 10-B · ABSOLUTA — LA NOTA FINAL NO SE MUESTRA SI FALTAN SLIDES POR VER

## ═══════════════════════════════════════
### 🚧 REGLA DE ORO: NO SE PUEDE LLEGAR AL FINAL "SALTANDO" DIRECTO A LOS QUIZZES
Aunque el sistema de bloqueo de la Prioridad 0-C ya impide saltar evaluables y complementarias sin contestar, esta sección agrega una **verificación final de respaldo**: antes de mostrar la pantalla de cierre con la nota, el sistema revisa que TODAS las slides de la clase (no solo las evaluables) hayan sido marcadas como vistas (`st.seen`).
**Excepción v6.1:** esta verificación de recorrido completo aplica SOLO al primer intento (`st.reintentoActivo === false` y `st.vidasUsadas === 0`). Cuando el estudiante está dentro de un reintento dirigido (Prioridad 6-B), NO se le vuelve a exigir haber "visto" todo — ya lo vio en su primer intento; solo se le exige completar los evaluables pendientes.
```javascript
// Llamar esta función ANTES de renderizar rFinal() — en el lugar donde se navega al slide final
function verificarRecorridoCompleto() {
  // NUEVO v6.1 — si el estudiante viene de un reintento, no se vuelve a exigir el recorrido completo
  if (st.reintentoActivo || (st.vidasUsadas||0) > 0) return [];
  const totalSlides = SL.length;
  // El slide final (último índice) no cuenta como "pendiente de ver"
  const slidesAVerificar = SL.slice(0, totalSlides - 1);
  const faltantes = [];
  slidesAVerificar.forEach((s, idx) => {
    if (!st.seen.has(idx)) {
      faltantes.push({ idx, titulo: s.title || `Slide ${idx+1}`, tipo: s.type });
    }
  });
  return faltantes; // array vacío = recorrido completo
}
// Modificar la función de navegación al slide final para interceptar:
function irASlideFinal() {
  const faltantes = verificarRecorridoCompleto();
  if (faltantes.length > 0) {
    mostrarAvisoSlidesFaltantes(faltantes);
    return; // NO mostrar la nota todavía
  }
  // Todo completo — proceder normalmente
  st.slide = SL.length - 1;
  save();
  render();
}
function mostrarAvisoSlidesFaltantes(faltantes) {
  const primera = faltantes[0];
  showModal(`
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:3rem;margin-bottom:10px">📋</div>
      <h2 style="font-family:var(--font-ui);color:var(--primary);font-size:1.15rem;margin-bottom:10px">
        ¡Casi llegas! Te falta ver ${faltantes.length} slide${faltantes.length!==1?'s':''}
      </h2>
      <p style="font-size:.88rem;color:var(--text2);line-height:1.7;margin-bottom:14px">
        Para que tu <strong>nota final</strong> se muestre completa, primero debes pasar por
        <strong>todas las partes de la clase</strong> — no solo por los quizzes.
      </p>
      <div style="background:var(--primary-light);border-radius:10px;padding:10px;margin-bottom:16px;
                  text-align:left;max-height:140px;overflow-y:auto">
        ${faltantes.slice(0,5).map(f => `
          <p style="font-size:.78rem;color:var(--primary-dark);padding:3px 0">
            📍 ${f.titulo}
          </p>
        `).join('')}
        ${faltantes.length > 5 ? `<p style="font-size:.74rem;color:var(--muted)">...y ${faltantes.length-5} más</p>` : ''}
      </div>
      <button class="mbtn" style="width:100%" onclick="closeModal();irASlide(${primera.idx})">
        📍 Ir a "${primera.titulo}" ahora
      </button>
    </div>
  `);
}
```
**Importante:** esta verificación es un respaldo adicional — el bloqueo principal (Prioridad 0-C) ya impide saltar slides una por una. Esta capa extra cubre casos donde el estudiante pudo haber llegado al final por otra vía (ej. recargando la página en un slide avanzado) sin haber completado el recorrido real. En reintentos (Prioridad 6-B), la responsabilidad de "llegar al final" pasa a `st.reintentoPendientes` — cuando esa lista queda vacía, el sistema navega solo a la pantalla final.

## 🔴 PRIORIDAD 10-C · ABSOLUTA — MENÚ DE RUTA COMPACTO, GAMIFICADO Y NO-NAVEGABLE

### 🎮 REGLA DE ORO: SE VE COMO EL HUD DE UN VIDEOJUEGO, NUNCA COMO UNA LISTA LARGA, Y NUNCA SE TOCA PARA SALTAR
**Rediseño completo v7.5:** el viejo sidebar de 272px queda reemplazado por defecto por una **barra compacta de nodos** (estilo "quest tracker" de videojuego), fija y visible, pero mucho más pequeña — libera espacio para que el contenido de la clase sea protagonista. Cada nodo representa una sección con una etiqueta corta y puntual (ej. "Quiz 1", "Sopa", "Final" — nunca frases largas). Aplica sin excepción la Prioridad 0-G: **ningún nodo tiene `onclick` que cambie `st.slide`** — es 100% informativo.
**Reglas visuales del menú:**
- **Slide ya vista** → color completo/vivo, con un check ✅ y un leve brillo — se ve claramente "desbloqueada y superada"
- **Slide actual** → resaltada con pulso/glow, sin necesidad de check todavía
- **Slide NO vista aún** → con un "velo" de transparencia (opacidad baja + un toque de blanco/negro encima) y un ícono de candado 🔒 pequeño — se ve claramente "esperando a ser desbloqueada", nunca a todo color
- **Actividades que SÍ tienen nota** (Quiz 1, Quiz 2, Evaluación Final) → llevan un borde dorado/acento distinto y una pequeña ⭐ — se diferencian de un vistazo de las actividades sin nota
- Etiquetas cortas SIEMPRE (máx. 10-12 caracteres visibles) — el nombre completo puede ir en el `title` HTML (tooltip), nunca ocupando espacio en el nodo
```javascript
// Reutiliza la MISMA estructura de datos que antes (ahora fuente única, sin variante de sidebar/camino separadas)
const SECCIONES_MENU = [
  { nombre: 'Inicio',        rango: [0,0],   nota: false },
  { nombre: 'Concepto 1',    rango: [1,2],   nota: false },
  { nombre: 'Concepto 2',    rango: [3,4],   nota: false },
  { nombre: 'Explorador',    rango: [5,5],   nota: false },
  { nombre: 'Concepto 3',    rango: [6,7],   nota: false },
  { nombre: 'Actividad',     rango: [8,8],   nota: false },
  { nombre: 'Quiz 1',        rango: [9,9],   nota: true  }, // 🔺 lleva nota — se resalta distinto
  { nombre: 'Actividad',     rango: [10,10], nota: false },
  { nombre: 'Concepto 4',    rango: [11,12], nota: false },
  { nombre: 'Actividad',     rango: [13,13], nota: false },
  { nombre: 'Quiz 2',        rango: [14,14], nota: true  }, // 🔺 lleva nota
  { nombre: 'Práctica',      rango: [15,15], nota: false },
  { nombre: 'Curioso',       rango: [16,16], nota: false },
  { nombre: 'Sopa',          rango: [17,17], nota: false },
  { nombre: 'Repaso',        rango: [18,19], nota: false },
  { nombre: 'Final',         rango: [20,21], nota: true  }, // 🔺 Evaluación Final — lleva nota
  { nombre: 'Cierre',        rango: [22,22], nota: false },
];
// Los cuadernos NUNCA aparecen aquí — no son slides (Prioridad 10)
function renderMenuRuta() {
  const totalSlides = SL.length;
  const vistos = st.seen.size;
  const pctTotal = Math.round((vistos/totalSlides)*100);
  const nodos = SECCIONES_MENU.map(sec => {
    const [ini, fin] = sec.rango;
    const idxs = []; for (let i = ini; i <= fin; i++) idxs.push(i);
    const todasVistas = idxs.every(i => st.seen.has(i));
    const esActual     = idxs.includes(st.slide);
    const algunaVista  = idxs.some(i => st.seen.has(i));
    let estadoClase, iconoEstado;
    if (todasVistas)      { estadoClase = 'nodo-visitado'; iconoEstado = '✅'; }
    else if (esActual)    { estadoClase = 'nodo-actual';   iconoEstado = '▶️'; }
    else if (algunaVista) { estadoClase = 'nodo-parcial';  iconoEstado = '🟡'; }
    else                  { estadoClase = 'nodo-pendiente';iconoEstado = '🔒'; }
    const claseNota = sec.nota ? 'nodo-con-nota' : '';
    // 🔺🔺 Prioridad 0-G: JAMÁS onclick que cambie st.slide — solo informativo, cursor:default
    return `
      <div class="menu-nodo ${estadoClase} ${claseNota}" title="${sec.nombre}" style="cursor:default">
        ${sec.nota ? '<span class="nodo-estrella">⭐</span>' : ''}
        <span class="nodo-estado">${iconoEstado}</span>
        <span class="nodo-etiqueta">${sec.nombre}</span>
      </div>
    `;
  }).join('<div class="menu-linea"></div>');
  return `
    <div class="menu-ruta-wrap">
      <div class="menu-ruta-pct" title="Tu avance total">📍 ${pctTotal}%</div>
      <div class="menu-ruta-scroll"><div class="menu-ruta-track">${nodos}</div></div>
    </div>
  `;
}
```
```css
/* — Barra compacta tipo HUD de videojuego, NUNCA una columna lateral de 272px */
.menu-ruta-wrap {
  display: flex; align-items: center; gap: 8px;
  background: var(--bg-sidebar, var(--primary-dark));
  padding: 6px 10px; height: 46px; /* compacta — nunca ocupa media pantalla */
  border-bottom: 3px solid rgba(255,255,255,.15);
}
.menu-ruta-pct {
  flex-shrink: 0; font-family: var(--font-ui); font-size: .72rem; color: #fff;
  background: rgba(255,255,255,.12); border-radius: 20px; padding: 4px 10px;
}
.menu-ruta-scroll { overflow-x: auto; flex: 1; }
.menu-ruta-track { display: flex; align-items: center; gap: 0; min-width: max-content; }
.menu-nodo {
  display: flex; align-items: center; gap: 4px;
  padding: 5px 9px; border-radius: 20px; flex-shrink: 0;
  font-size: .66rem; white-space: nowrap;
  background: rgba(255,255,255,.08); border: 2px solid rgba(255,255,255,.15);
  transition: all .2s;
}
.menu-linea { width: 14px; height: 2px; background: rgba(255,255,255,.2); flex-shrink: 0; }
/* Estado: ya vista — color completo, check, leve brillo */
.menu-nodo.nodo-visitado {
  background: rgba(34,197,94,.28); border-color: var(--success); color: #fff; opacity: 1;
  box-shadow: 0 0 6px rgba(34,197,94,.35);
}
/* Estado: actual — resaltado con pulso */
.menu-nodo.nodo-actual {
  background: var(--accent); border-color: #fff; color: #1a1a1a; font-weight: 800;
  opacity: 1; animation: pulse 1.3s infinite;
}
/* Estado: parcial */
.menu-nodo.nodo-parcial { background: rgba(255,215,0,.18); border-color: #FFD700; color: #fff; opacity: .9; }
/* Estado: pendiente — VELO de transparencia + candado, "esperando a desbloquear" */
.menu-nodo.nodo-pendiente {
  background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.12);
  color: rgba(255,255,255,.45); opacity: .5; filter: grayscale(.4);
}
/* Actividades CON nota — borde dorado + estrella, se diferencian del resto */
.menu-nodo.nodo-con-nota { border-width: 3px; }
.menu-nodo.nodo-con-nota.nodo-pendiente { border-color: rgba(255,215,0,.35); }
.menu-nodo.nodo-con-nota:not(.nodo-pendiente) { border-color: var(--gold, #FFD700); box-shadow: 0 0 8px rgba(255,215,0,.4); }
.nodo-estrella { font-size: .65rem; }
.nodo-estado { font-size: .68rem; }
.nodo-etiqueta { font-family: var(--font-ui); }
```
### 📐 LA PANTALLA SE ADAPTA AL ESPACIO LIBERADO — SIN MÁRGENES VACÍOS
Al quitar la columna lateral de 272px, el contenido de la clase (`#slide-wrap`) debe **usar todo el ancho disponible** — nunca dejar franjas vacías a los costados donde antes vivía el sidebar.
```css
/* — Layout general: navbar arriba, menu-ruta-wrap debajo del navbar, contenido a todo el ancho */
.layout-clase { display: flex; flex-direction: column; height: 100vh; }
#slide-wrap {
  flex: 1; width: 100%; max-width: 900px; /* centrado, con buen margen de lectura, no 100vw sin límite */
  margin: 0 auto; padding: 16px 20px; overflow-y: auto;
}
```
**Checklist:**
```
[ ] El menú de progreso es una barra compacta (≈46px de alto), nunca una columna lateral de 272px
[ ] Etiquetas cortas y puntuales (máx. 10-12 caracteres visibles) — el nombre completo va en el atributo title
[ ] Ningún nodo tiene onclick que cambie st.slide (Prioridad 0-G) — 100% informativo
[ ] Slides ya vistas: color completo + check + brillo. Slides no vistas: veladas (opacidad baja + grayscale) + candado 🔒
[ ] Actividades con nota (Quiz 1, Quiz 2, Evaluación Final) tienen borde dorado + ⭐, distinguibles de un vistazo
[ ] Al quitar el sidebar de 272px, el contenido (#slide-wrap) usa el espacio liberado — sin franjas vacías a los costados
[ ] Los cuadernos NO aparecen en SECCIONES_MENU — no son slides (Prioridad 10)
```

## 🟢 PRIORIDAD 10-D · TÉCNICA — MAPA DE CAMINO TIPO "JUEGO DE MESA" (ALTERNATIVA OPCIONAL, YA NO ES EL VALOR POR DEFECTO)

** v7.5 — Cambio de estado:** el mapa de camino (tablero con casillas y avatar) sigue siendo una opción visual válida, pero **DEJA de ser la recomendación por defecto** — la Prioridad 10-C (menú compacto rediseñado) es ahora el estándar. Si el autor de la clase prefiere usar este mapa de camino en su lugar, DEBE aplicarle la misma regla de la Prioridad 0-G: **quitar el `onclick` de navegación** que tenía en versiones anteriores a v7.5.
```javascript
// PROHIBIDO: el onclick de camino-casilla que existía en versiones previas queda PROHIBIDO.
// ❌ ANTES: `<div class="camino-casilla ..." onclick="${todasVistas||esActual ? `st.slide=${ini};save();render()` : ''}">`
// ✅ AHORA (si se usa este mapa como alternativa): `<div class="camino-casilla ..." style="cursor:default">`
```
Todo lo demás del mapa de camino (casillas ilustradas, avatar/ficha, estados visuales, zigzag) se mantiene igual como referencia de diseño — solo cambia que ya no es clickeable y que ya no es la opción recomendada por defecto (esa es ahora la Prioridad 10-C).

## 🔴 PRIORIDAD 11 · ABSOLUTA — PANTALLA FINAL GAMIFICADA

```javascript
function rFinal() {
  // VERIFICACIÓN OBLIGATORIA — antes de cualquier otra cosa
  const faltantes = verificarRecorridoCompleto();
  if (faltantes.length > 0) {
    mostrarAvisoSlidesFaltantes(faltantes);
    // Renderizar un slide "puente" en lugar de la nota — sin nota visible todavía
    return `
      <div style="text-align:center;padding:40px 20px">
        <div style="font-size:3rem;margin-bottom:10px">🔒</div>
        <p style="font-family:var(--font-ui);color:var(--primary-dark);font-size:1.1rem">
          Completa toda la clase para ver tu nota final
        </p>
      </div>
    `;
  }
  markSeen();
  const t = notaOficial();   // (8-U): la MEJOR nota de todos los intentos, nunca la del último
  const vidasUsadas = st.vidasUsadas || 0;
  const vidasRestantes = MAX_VIDAS - vidasUsadas;
  const nombre = st.name || 'Estudiante';
  const totalPregs = EVAL_CONFIG.quiz1.preguntas + EVAL_CONFIG.quiz2.preguntas + EVAL_CONFIG.evalFinal.preguntas;
  const aciertos = aciertosOficiales();   // (8-U): aciertos del mejor intento
  // Recopilar errores de todos los quizzes
  const errores = [];
  ['quiz1','quiz2','evalFinal'].forEach(qId => {
    const resps = st.acts['quiz_resps_'+qId] || [];
    resps.filter(r=>!r.correcta).forEach(r => {
      errores.push({ quiz: qId, retro: r.retro });
    });
  });
  let msg, emoji, colorNota;
  if (t >= 4.5)      { msg = `🏆 ¡${nombre}, eres una leyenda!`; emoji = '🏆'; colorNota = 'var(--success)'; }
  else if (t >= 3.5) { msg = `🚀 ¡Muy bien, ${nombre}! Sigue así.`; emoji = '🌟'; colorNota = 'var(--success)'; }
  else if (t >= 3.0) { msg = `💪 ¡Bien hecho, ${nombre}! Con un reintento puedes mejorar.`; emoji = '💪'; colorNota = 'var(--warning)'; }
  else               { msg = `📚 No te rindas, ${nombre}. Usa una vida para intentarlo de nuevo.`; emoji = '📚'; colorNota = 'var(--error)'; }
  return `
    <!-- Fuegos artificiales SVG -->
    <svg style="position:fixed;inset:0;pointer-events:none;z-index:500;width:100%;height:100%" viewBox="0 0 600 300">
      ${['#FFD700','#FF6B35','#44B531','#5C94FC','#FF4444','#FF9E00'].map((c,i) => `
        <circle cx="${80+i*90}" cy="${40+Math.sin(i)*40}" r="2" fill="${c}">
          <animate attributeName="r" values="0;15;0" dur="${1.2+i*.2}s" repeatCount="indefinite" begin="${i*.25}s"/>
          <animate attributeName="opacity" values="1;0" dur="${1.2+i*.2}s" repeatCount="indefinite" begin="${i*.25}s"/>
        </circle>
      `).join('')}
    </svg>
    <div style="text-align:center;padding:10px 0 20px">
      <div style="font-size:4rem;margin-bottom:8px;animation:floatY 2s infinite">${emoji}</div>
      <p style="font-family:var(--font-ui);font-size:clamp(1.4rem,3.5vw,2.2rem);
                color:var(--primary-dark);font-weight:900;margin-bottom:4px">¡Misión Completada!</p>
      <p style="font-family:var(--font-body);font-size:clamp(1rem,2.5vw,1.4rem);
                color:var(--text2);font-weight:700;margin-bottom:14px">${nombre}</p>
      <!--  v7.3 — NOTA GIGANTE: mucho más grande y centrada, para verse desde lejos
           (el docente suele mostrar la pantalla del PC a distancia al estudiante) -->
      <div style="background:var(--bg-card);border:6px solid var(--primary);border-radius:24px;
                  padding:28px 36px;display:block;max-width:520px;margin:0 auto 16px;
                  box-shadow:0 10px 0 var(--primary-dark);text-align:center">
        <p style="font-size:1.1rem;font-family:var(--font-ui);color:var(--muted);margin-bottom:6px;letter-spacing:.05em">
          NOTA FINAL
        </p>
        <p style="font-family:var(--font-ui);font-size:clamp(6rem,20vw,11rem);line-height:1;
                  font-weight:900;color:${colorNota};text-shadow:4px 4px 0 rgba(0,0,0,.15);margin:0">
          ${t.toFixed(1)}
        </p>
        <p style="font-size:1.1rem;color:var(--muted);margin-top:6px;font-family:var(--font-ui)">de 5.0</p>
        <p style="font-size:.95rem;color:var(--text2);margin-top:4px">
          ${aciertos} / ${totalPregs} respuestas correctas
        </p>
      </div>
      ${renderAvisoMejorNota()}   <!--  v15.0 (8-U): si el último intento salió más bajo, avisa que la nota se mantiene -->
      <!--  v7.5 — Bloque de vidas PROTAGONISTA, inmediatamente después de la nota (Prioridad 6-C) -->
      ${renderBloqueVidasProtagonista()}
      <!-- Mensaje ByteBot -->
      <div class="mc" style="max-width:480px;margin:0 auto 14px;padding:12px">
        <p style="font-size:.92rem;color:var(--text2);line-height:1.7">${msg}</p>
      </div>
      <!-- RETROALIMENTACIÓN DE ERRORES -->
      ${errores.length > 0 ? `
        <div style="background:var(--primary-light);border-radius:14px;padding:14px;
                    max-width:480px;margin:0 auto 16px;text-align:left">
          <p style="font-family:var(--font-ui);color:var(--primary-dark);font-size:.88rem;margin-bottom:10px">
            📌 Preguntas que fallaste — para que estudies:
          </p>
          ${errores.slice(0,5).map((e,i) => `
            <div style="background:#fff;border-left:3px solid var(--error);border-radius:0 8px 8px 0;
                        padding:8px 10px;margin-bottom:7px">
              <p style="font-size:.75rem;color:var(--error);font-weight:700;margin-bottom:2px">❌ Error ${i+1}</p>
              <p style="font-size:.78rem;color:var(--text2);line-height:1.6">${e.retro||'Revisa el contenido de la clase.'}</p>
            </div>
          `).join('')}
          ${errores.length > 5 ? `<p style="font-size:.72rem;color:var(--muted);text-align:center;margin-top:4px">...y ${errores.length-5} más. Usa una vida para mejorar.</p>` : ''}
        </div>
      ` : `
        <div style="background:#e8fff0;border-radius:14px;padding:12px;max-width:480px;
                    margin:0 auto 16px;border:2px solid var(--success)">
          <p style="font-family:var(--font-ui);color:var(--success);font-size:.9rem">
            🎉 ¡No tuviste errores! Eres increíble, ${nombre}.
          </p>
        </div>
      `}
      <!-- Botones extra -->
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
        <button class="mbtn gd" onclick="save();syncIndex();showToast('✅ Nota guardada')">
          💾 Guardar nota
        </button>
        <button class="mbtn" onclick="st.slide=0;save();render()">
          🔁 Repasar clase
        </button>
      </div>
    </div>
  `;
}
```
