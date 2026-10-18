---
modulo: 20_tecnica_e_integridad
etapa_de_lectura: 3
prioridades: [17, 18]
---

# 20 · Requisitos técnicos e integridad de la nota

## 🟢 PRIORIDAD 17 · TÉCNICA — REQUISITOS TÉCNICOS

### ✅ Obligatorio
- Un solo archivo `.html` 100% autocontenido
- JavaScript vanilla puro — sin React, Vue, jQuery
- CSS puro — sin Tailwind, Bootstrap
- Google Fonts como única CDN de fuentes
- **Mínimo 20 imágenes Unsplash** con fallback emoji
- **2-3 ejercicios prácticos resueltos** ligados directamente al quiz/examen (slide `practica`, Prioridad 2)
- **Sistema de 8 vidas** — solo resetean quizzes de opción múltiple
- **Nota desde 0.0** — se construye con aciertos, nunca desde 5.0
- Paleta de colores CLARA y VIVA
- Sin scroll de página — solo scroll en `#slide-wrap`
- Layout: sidebar 272px + main, navbar 60px
- **Botón físico "💾 Guardar"** en el navbar
- Sincronización con el index cada 20 segundos como máximo
- LocalStorage para persistencia de: slide actual, aciertos, respuestas, reflexiones, vidas
- Compatible Chrome, Firefox, Edge modernos
- Todo el texto en español colombiano natural
### 🚫 Prohibido
- Paletas oscuras / fondos negros / cyberpunk
- Nota que inicia en 5.0 (para que el cálculo sea correcto)
- Nota mínima hardcodeada en 1.0 (la mínima es 0.0)
- Scroll de página completa
- Imágenes sin sistema de fallback emoji
- Más de 1 quiz completo por slide (el quiz tiene múltiples preguntas en su propio slide)
- Que el estudiante pueda saltar quizzes o la evaluación final
- Actividades de drag/ordenar que afecten la nota
- Botón de reintentar sin modal de confirmación
- Taller en Clase con más de 5 ejercicios
- 🔺 v7.4: Cualquier slide tipo 'video', iframe de YouTube, o reproductor embebido — los videos quedan eliminados de las clases (Prioridad 2); esa posición del recorrido es SIEMPRE un slide tipo 'practica'
- 🔺 v7.4: Más de 3 mensajes motivacionales del docente en una misma sesión (Prioridad 18-D)
### 📦 CDN opcional permitida
```html
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
```

## 🔴 PRIORIDAD 18 · ABSOLUTA — INTEGRIDAD DE LA NOTA, PERSISTENCIA DE QUIZZES Y MENSAJES MOTIVACIONALES DEL DOCENTE

### 🎯 18-A. LA XP, LOS CLICS Y LA INTERACCIÓN NUNCA AFECTAN LA NOTA
**Regla de oro:** el XP, las medallas, los clics en elementos del explorador, o cualquier interacción visual/gamificada **NUNCA** modifican `st.aciertos` ni `calcTotal()`. Solo las actividades explícitamente definidas como evaluables (`quiz`, `evalFinal`) generan nota automática, y el Taller en Clase genera la Nota 2 manual (Prioridad 10/18-C). Todo lo demás — XP, badges, streak, clics del explorador, sopa de letras, drag/match/fill/orden — es puramente formativo y gamificado, sin ningún efecto en la calificación.
```javascript
// ✅ CORRECTO — el XP se calcula y muestra de forma completamente independiente de la nota:
function gainPts(cantidad) {
  st.xp = (st.xp || 0) + cantidad;
  save();
  showFPts(cantidad); // solo feedback visual, NUNCA toca st.aciertos ni calcTotal()
}
// ❌ PROHIBIDO — cualquier función que sume aciertos o modifique la nota fuera de responderQuiz():
// function onExploradorClick(sId) { st.aciertos++; }  ← NUNCA hacer esto
```
### 🔒 18-B. UN QUIZ YA RESPONDIDO NUNCA VUELVE A SUMAR NOTA — PERMANENCIA TOTAL
**Regla de oro:** una vez que una pregunta de quiz fue respondida, esa respuesta **queda fija para siempre** dentro del mismo intento. Si el estudiante recarga la página, sale y vuelve a entrar, o navega a otra slide y regresa al quiz, **NUNCA se vuelve a mostrar la pregunta ya respondida ni se vuelve a sumar el acierto**. Lo único que puede reiniciar un quiz ya completado es usar una de las 8 vidas (Prioridad 6/6-B) — ningún otro evento (recarga, navegación, cierre accidental) puede borrar o repetir respuestas.
```javascript
// Esto YA está garantizado por el diseño de rQuiz() (Prioridad 5) + save()/load() (Prioridad 8):
// - st.acts['quiz_idx_'+id]     → pregunta en la que va (persiste)
// - st.acts['quiz_resps_'+id]   → respuestas ya dadas (persiste, nunca se sobreescriben)
// - st.acts['completado_'+id]   → true cuando terminó TODAS las preguntas
// GARANTÍA EXPLÍCITA: rQuiz() SIEMPRE debe verificar esto primero:
// rQuiz() real vive en la Prioridad 8-P; ya cumple exactamente esta garantía:
// primera línea `if (st.acts['completado_'+s.id] === true) return renderResumenQuiz(s);`,
// y retoma en `st.acts['quiz_idx_'+s.id] || 0` — nunca desde la pregunta 1.
// PROHIBIDO ABSOLUTO: ningún evento de recarga, visibilitychange, o navegación
// puede llamar a algo como "delete st.acts['completado_'+id]" o "st.acts['quiz_idx_'+id] = 0"
// fuera de confirmarReintento() (Prioridad 6). Revisar que NINGÚN otro punto del código reinicie
// el progreso de un quiz salvo el flujo explícito de reintentar con una vida.
```
### 🎨 18-C. RECORDATORIO — TALLER EN CLASE (NOTA 2) Y CUADERNOS SOLO EN EL PANEL FLOTANTE
Ver Prioridad 10 (actualizada v6.2): los cuadernos jamás son slides, jamás se duplican dentro de una slide del recorrido, y el Taller en Clase (antes "Cuaderno 2") se presenta como la Nota 2 de la clase, calificada manualmente por el docente — con 4 o 5 ejercicios sintetizados y ya explicados previamente en alguna slide.
### 💌 18-D. MENSAJES MOTIVACIONALES PERSONALIZADOS DEL DOCENTE (v7.5 — MÁXIMO 3, SIN TEMPORIZADOR LIBRE)
**Regla de oro:** a lo largo de TODA la clase, debe aparecer un mensaje bonito y personalizado —como si lo escribiera el propio docente— animando e incentivando al estudiante, pero **NUNCA más de 3 veces en total por sesión completa**. Estos mensajes son puramente emocionales/motivacionales, NUNCA revelan respuestas ni afectan la nota.
```
🔺 PROHIBIDO: el disparador por tiempo libre (setInterval cada 18 minutos de la v7.4)
   queda ELIMINADO por completo. Un temporizador libre puede seguir disparando mensajes sin
   relación con lo que el estudiante está haciendo. Se reemplaza por dos disparadores puntuales
   y controlados: hitos de nota, y UN único chequeo a mitad de clase.
```
```javascript
// ═══ CONFIGURACIÓN — el docente personaliza este arreglo de mensajes ═══
const MENSAJES_DOCENTE = [
  "¡Vas muy bien! Sigue así, se nota tu esfuerzo. — Profe Luis",
  "Recuerda: equivocarte también es parte de aprender. ¡Tú puedes! — Profe Luis",
  "Estoy orgulloso de tu dedicación en esta clase. ¡Vamos con toda! — Profe Luis",
  // El docente puede editar estos mensajes, en tono cálido y cercano — pero el TOTAL
  // de veces que se muestran en una sesión nunca debe superar el límite de abajo
];
const MAX_MENSAJES_DOCENTE_POR_CLASE = 3; // 🔺 NUNCA CAMBIAR a un número mayor

// ═══ ÚNICO PUNTO DE ENTRADA VISUAL — todo disparador DEBE pasar por aquí ═══
function mostrarMensajeDocente(esCelebracion) {
  const usados = st.acts['msgDocenteUsados'] || 0;
  if (usados >= MAX_MENSAJES_DOCENTE_POR_CLASE) return; // 🔒 tope alcanzado, no mostrar más
  st.acts['msgDocenteUsados'] = usados + 1;
  save();
  const msg = MENSAJES_DOCENTE[Math.floor(Math.random() * MENSAJES_DOCENTE.length)];
  showModal(`
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:2.8rem;margin-bottom:8px">${esCelebracion ? '🎉' : '💌'}</div>
      <h2 style="font-family:var(--font-ui);color:var(--primary);font-size:1.05rem;margin-bottom:10px">
        ${esCelebracion ? '¡Vas increíble!' : 'Un mensaje de tu profe'}
      </h2>
      <p style="font-size:.9rem;color:var(--text2);line-height:1.8;font-style:italic;margin-bottom:16px">
        "${msg}"
      </p>
      <button class="mbtn" onclick="closeModal()" style="width:100%">💪 ¡Gracias, sigo adelante!</button>
    </div>
  `);
}
// ═══ DISPARADOR 1 (preferente) — por hito de nota/avance alcanzado ═══
// Llamar checarHitoNotaDocente() después de cada responderQuiz() y cada save()
function checarHitoNotaDocente() {
  const t = notaOficial();   // (8-U)
  const hitos = [4.0, 5.0];
  hitos.forEach(h => {
    const clave = 'hito_msg_docente_' + h;
    if (t >= h && !st.acts[clave]) {
      st.acts[clave] = true;
      save();
      mostrarMensajeDocente(true); // true = mensaje de celebración por nota
    }
  });
}
// ═══ DISPARADOR 2 (único extra) — UN SOLO chequeo a mitad de clase, nunca un timer libre ═══
let _msgDocenteMitadUsado = false;
function chequearMensajeMitadClase() {
  if (_msgDocenteMitadUsado) return;
  const pct = Math.round((st.seen.size / SL.length) * 100);
  if (pct >= 45 && pct <= 55) {
    _msgDocenteMitadUsado = true;
    mostrarMensajeDocente(false);
  }
}
// 🔺 Llamar chequearMensajeMitadClase() dentro de markSeen() o render() — NUNCA con setInterval libre
```
**Reglas del mensaje motivacional:**
- **Máximo 3 mensajes en total por sesión completa** — nunca más, sin importar cuánto dure la clase
- Tono cálido, cercano y personalizado — como si lo escribiera el docente directamente
- Nunca interrumpe una actividad evaluable a mitad de respuesta (no debe aparecer sobre un quiz abierto)
- Nunca revela respuestas correctas ni pistas de examen
- El arreglo `MENSAJES_DOCENTE` debe quedar fácil de personalizar por el autor de la clase
- `st.acts['msgDocenteUsados']` persiste (Prioridad 8-G) — al recargar o volver a entrar, el conteo NO se reinicia
