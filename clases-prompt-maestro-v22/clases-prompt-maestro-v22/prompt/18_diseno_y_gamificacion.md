---
modulo: 18_diseno_y_gamificacion
etapa_de_lectura: 3
prioridades: [12, 12-B, 13, 14, 14-B, 15]
---

# 18 · Identidad visual, scroll, modo foco, cultura pop, contexto local, gamificación

## 🟠 PRIORIDAD 12 · ALTA — IDENTIDAD VISUAL TEMÁTICA (PALETA CLARA Y VIVA)

**Esta sección se rige por las reglas estrictas y verificables de la Prioridad Absoluta 0-E y 0-F (luminosidad mínima, prohibición de fondos oscuros y rotación de temas).** Usar siempre la tabla de paletas corregidas de la 0-E como fuente de los valores exactos — nunca inventar un `--primary-light` o `--bg-main` sin pasar la prueba de luminosidad ≥85-90%.
```css
:root {
  --tema-nombre:    "[UNIVERSO — diferente al de la clase anterior, ver 0-F]";
  --primary:        [COLOR_PRINCIPAL_VIVO — tomar de la tabla 0-E];
  --primary-light:  [VERSIÓN_MUY_CLARA — luminosidad ≥88%];
  --primary-dark:   [VERSIÓN_OSCURA — solo para texto y sombras, NUNCA para fondos grandes];
  --accent:         [COLOR_SECUNDARIO];
  --accent2:        [TERCER_COLOR];
  --bg-main:        [FONDO_CLARO — luminosidad ≥90%, tomar de la tabla 0-E];
  --bg-card:        #FFFFFF;
  --bg-sidebar:     [SIDEBAR — única zona donde se permite oscuro, con texto blanco/amarillo];
  --text:           #2B1A00;
  --text2:          #5C3A00;
  --muted:          #888888;
  --font-title:     '[FUENTE_DISPLAY]', sans-serif;
  --font-body:      'Nunito', sans-serif;
  --font-ui:        'Fredoka One', cursive;
  --success:        #22C55E;
  --error:          #EF4444;
  --warning:        #F59E0B;
  --gold:           #FFD700;
  --radius:         14px;
  --shadow:         0 4px 20px rgba(0,0,0,0.12);
}
```

## 🟠 PRIORIDAD 12-B · ALTA — BARRA DE DESPLAZAMIENTO VISIBLE Y FÁCIL DE USAR

### 📜 REGLA DE ORO: EL SCROLL NUNCA DEBE SER INVISIBLE O DIFÍCIL DE AGARRAR
Se detectó que en algunas clases la barra de desplazamiento vertical del contenedor principal (`#slide-wrap`) casi no se ve — muy delgada, del mismo color que el fondo, o sin contraste. Debe ser gruesa, con color del tema, y fácil de tomar con el mouse o el dedo (en pantallas táctiles).
```css
/* Aplicar SIEMPRE al contenedor principal de scroll (#slide-wrap o equivalente) */
#slide-wrap {
  scrollbar-width: auto;              /* Firefox: nunca "thin" en el contenedor principal */
  scrollbar-color: var(--primary) var(--primary-light);
}
#slide-wrap::-webkit-scrollbar {
  width: 14px;                        /* suficientemente ancha para agarrar fácil */
}
#slide-wrap::-webkit-scrollbar-track {
  background: var(--primary-light);
  border-radius: 10px;
}
#slide-wrap::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 10px;
  border: 3px solid var(--primary-light); /* efecto "flotante" que resalta el thumb */
}
#slide-wrap::-webkit-scrollbar-thumb:hover {
  background: var(--primary-dark);
}
```
**Checklist:**
```
[ ] La barra de scroll del contenedor principal es gruesa (≥12px) y con color contrastante del tema
[ ] scrollbar-color (Firefox) y ::-webkit-scrollbar (Chrome/Edge) están ambos definidos
[ ] La barra se distingue claramente del fondo en cualquiera de las paletas de la tabla 0-E
```

## 🟠 PRIORIDAD 13 · ALTA — MODO FOCO AMABLE

```javascript
function setupModoFoco() {
  let _blurTimer = null;
  let fueraCount = 0;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      fueraCount++;
      _blurTimer = setTimeout(() => mostrarMsgFoco(fueraCount), 2000);
    } else {
      clearTimeout(_blurTimer);
    }
  });
  window.addEventListener('blur', () => {
    _blurTimer = setTimeout(() => mostrarMsgFoco(fueraCount), 2500);
  });
  window.addEventListener('focus', () => clearTimeout(_blurTimer));
}
function mostrarMsgFoco(n) {
  // : nunca compite con la retroalimentación de un quiz — usa la cola de 8-Q, así que en la
  // práctica esto ya no puede "perder" al estudiante ninguna retroalimentación; se muestra en orden.
  const nombre = st.name || 'campeón';
  const msgs = [
    { emoji:'👋', titulo:`¡Hola de nuevo, ${nombre}!`,
      msg:'Notamos que saliste un momento. ¡La clase sigue aquí esperándote! Tu progreso ya se guardó automáticamente.' },
    { emoji:'🌟', titulo:'¡Bienvenido de vuelta!',
      msg:`Ya van ${n} salidas registradas — el profe puede verlo. ¡Vamos, tú puedes concentrarte! 💪` },
    { emoji:'🤝', titulo:'¡Ánimo!',
      msg:`${n} salidas registradas. Termina la clase y demuestra lo que sabes. ¡Ya casi acabas!` }
  ];
  const m = msgs[Math.min(n-1, msgs.length-1)];
  showModal(`
    <div style="text-align:center;padding:10px 0">
      <div style="font-size:3rem;margin-bottom:8px">${m.emoji}</div>
      <h2 style="font-family:var(--font-ui);color:var(--primary);font-size:1.2rem;margin-bottom:10px">${m.titulo}</h2>
      <p style="font-size:.9rem;color:var(--text2);line-height:1.7;margin-bottom:16px">${m.msg}</p>
      <button class="mbtn" onclick="closeModal()" style="width:100%;font-size:1rem;padding:12px">
        ✅ ¡Entendido! Volver a la clase
      </button>
    </div>
  `);
}
```

## 🟠 PRIORIDAD 14 · ALTA — CULTURA POP EN CADA SLIDE

```html
<!-- OBLIGATORIO antes de cada actividad -->
<details class="dyk">
  <summary>💡 ¿Sabías que…? (pista)</summary>
  <p>[CONCEPTO] es como [REFERENCIA_CULTURAL]: [EXPLICACIÓN en 1-2 oraciones]</p>
</details>
```
Mínimo 5 referencias distintas: Free Fire / Fortnite / Roblox / Among Us / Minecraft / TikTok / YouTube / Bad Bunny / Karol G / Barcelona / Selección Colombia / Encanto / Spider-Man / Dragon Ball.

## 🟠 PRIORIDAD 14-B · ALTA — CONTEXTO LOCAL DE CÚCUTA, NORTE DE SANTANDER

### 🏙️ REGLA DE ORO: LA CLASE TAMBIÉN SE VE, SE USA O SE VIVE EN CÚCUTA
Además de las referencias de cultura pop (Prioridad 14), algunas analogías, ejemplos o situaciones de los ejercicios deben usar **lugares y cosas reales de Cúcuta, Norte de Santander** — para que el estudiante reconozca su propia ciudad en la clase, no solo referencias genéricas de internet.
```html
<!-- Ejemplo de uso — en un ejemplo resuelto (Prioridad 0-B) o en un enunciado de quiz/práctica (Prioridad 2) -->
<p style="font-size:.82rem;color:var(--text2);margin-top:6px">
  📍 Como cuando vas al <strong>Ventura Plaza</strong>: [ANALOGÍA BREVE en 1 línea]
</p>
```
**Catálogo de lugares y referencias locales — usar mínimo 2-3 a lo largo de la clase, en ejemplos, enunciados de ejercicios o analogías (nunca forzado en todos los slides):**
```
Centros comerciales:  Ventura Plaza, Jardín Plaza, Unicentro Cúcuta, Alejandría, Bochalema Plaza
Lugares emblemáticos: El Malecón (ribera del río Pamplonita), Parque Colón, Puente Internacional
                      Simón Bolívar, Catedral San José, Torre del Reloj
Naturaleza/geografía: Río Zulia, Río Pamplonita, Área Metropolitana de Cúcuta, Cerro Tasajero
Cultura/tradición:    Feria Internacional de Cúcuta, Salsa y música vallenata en la región,
                      gastronomía nortesantandereana (mute, pastel de garbanzo, hayaca santandereana)
Deporte local:        Cúcuta Deportivo
```
**Reglas del uso de contexto local:**
- Se usa como analogía o como parte del ENUNCIADO de un ejercicio/ejemplo (ej. un problema de matemáticas ambientado en "si en el Ventura Plaza..."), nunca como dato forzado sin relación con el contenido
- No reemplaza las referencias de cultura pop (Prioridad 14) — ambas conviven, mínimo 2-3 menciones locales por clase además de las 5 de cultura pop
- Debe sentirse natural y reconocible para un estudiante de Cúcuta — nunca forzado ni genérico ("una ciudad colombiana" no cuenta, debe ser el lugar real y nombrado)
**Checklist:**
```
[ ] Al menos 2-3 referencias a lugares reales de Cúcuta/Norte de Santander a lo largo de la clase
[ ] Las referencias se usan en analogías o enunciados de ejercicios, con relación real al contenido
[ ] Conviven con las referencias de cultura pop (Prioridad 14) — no las reemplazan
```

## 🟠 PRIORIDAD 15 · ALTA — GAMIFICACIÓN

- XP con barra animada (gainPts, showFPts) — el XP no afecta la nota
- 5 badges/medallas con condiciones reales
- Sistema de avatar SVG inline con piezas desbloqueables
- Nivel basado en XP con título del tema visual
- Toast de celebración al ganar badge
```javascript
// GANCHO OBLIGATORIO: cada vez que se otorga una medalla nueva en esta clase,
// también debe registrarse en la vitrina acumulada entre semanas (Prioridad 20)
function otorgarBadge(badgeId, nombreBadge, emojiBadge) {
  if (st.badges.includes(badgeId)) return; // ya la tenía, no repetir
  st.badges.push(badgeId);
  save();
  showToast(`🏅 ¡Medalla desbloqueada: ${nombreBadge}!`);
  registrarLogroAcumulado(badgeId, nombreBadge, emojiBadge); // ver Prioridad 20
}
```
