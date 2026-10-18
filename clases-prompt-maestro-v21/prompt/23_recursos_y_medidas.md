---
modulo: 23_recursos_y_medidas
etapa_de_lectura: 3
prioridades: [31, 32, 33]
---

# 23 · Imágenes base64 propias, medidas exactas y sonido sintetizado

## 🟠 PRIORIDAD 31 · ALTA — IMÁGENES PROPIAS EMBEBIDAS EN BASE64

### 🖼️ REGLA DE ORO: TODA IMAGEN QUE NO SEA UNA FOTO DE STOCK VA EMBEBIDA COMO DATA URI, NUNCA COMO ARCHIVO EXTERNO
La Prioridad Absoluta 1 (imágenes reales de Unsplash) sigue vigente para el grid 2×2 de fotografías de apoyo en los slides de concepto. Pero para las **imágenes propias de diseño de la clase** — el título ilustrado, los personajes/mascota, los diagramas hechos a medida para un concepto puntual (parte entera/decimal, recta numérica, comparación de decimales, etc.) — la clase real analizada usa un patrón distinto y más confiable: **incrustar el PNG/JPG directamente como base64 dentro de un objeto JS**, en vez de enlazar a un archivo externo.

**Por qué esto es mejor que un `<img src="archivo.png">` externo:**
- El HTML queda 100% autocontenido (cumple la Prioridad Técnica 17 de "un solo archivo") — no depende de que el archivo `.png` viaje junto al `.html`, ni de rutas relativas que se rompen al mover el archivo.
- No hay riesgo de "imagen rota" si el profesor copia el HTML a otro computador o lo sube a otra plataforma sin la carpeta de imágenes.
- Convive perfectamente con el fallback de imágenes de la Prioridad 1 (si por algún motivo el data URI no carga, el `onerror` de esa prioridad muestra el emoji-placeholder igual que con una URL normal).

### 31.1 — Estructura: objeto `IMG` con constantes base64 (COPIAR Y ADAPTAR)
```javascript
// ═══ IMÁGENES PROPIAS DE LA CLASE — EMBEBIDAS EN BASE64, 100% AUTOCONTENIDAS ═══
// Cada clave es un nombre descriptivo del concepto que ilustra (NO el nombre de archivo original).
// El valor es el data URI completo, listo para usarse directo en cualquier atributo src o background.
const IMG = {
  char_robot:   "data:image/png;base64,iVBORw0KGgo...",   // mascota/personaje guía de la clase
  logo_lockup:  "data:image/png;base64,iVBORw0KGgo...",   // logo institucional o de marca de la serie de clases
  t_titulo:     "data:image/jpeg;base64,/9j/4AAQSkZJRg...", // imagen decorativa del slide de bienvenida
  t_concepto_1: "data:image/jpeg;base64,/9j/4AAQSkZJRg...", // diagrama a medida para el primer concepto de la semana
  t_concepto_2: "data:image/jpeg;base64,/9j/4AAQSkZJRg...", // diagrama a medida para el segundo concepto
  t_recuerda:   "data:image/jpeg;base64,/9j/4AAQSkZJRg...", // imagen del slide de cierre/repaso
  // ... una entrada por cada imagen propia que la clase necesite
};
```
Uso en el HTML de un slide (idéntico a cualquier `<img>`, porque un data URI ES una URL válida):
```html
<div style="text-align:center;margin-bottom:14px">
  <img src="${IMG.t_concepto_1}" alt="[Descripción real del concepto]"
       style="max-width:320px;width:100%;border-radius:16px;border:3px solid var(--accent);
              box-shadow:0 6px 18px rgba(10,20,60,.28)">
</div>
```

### 31.2 — Cómo convertir un PNG/JPG a base64 (flujo de trabajo para quien genera la clase)
1. Partir de la imagen ya diseñada (PNG o JPG, idealmente ya recortada/optimizada al tamaño final de uso — no subir un archivo de varios MB sin comprimir).
2. Convertirla a texto base64 puro. En un entorno con Python disponible: `base64.b64encode(open('archivo.png','rb').read()).decode()`. En un entorno con Node: `Buffer.from(fs.readFileSync('archivo.png')).toString('base64')`. También sirve cualquier conversor online confiable si no hay acceso a consola.
3. Anteponer el prefijo correcto según el formato real del archivo: `data:image/png;base64,` para PNG (fondos transparentes, íconos, mascota) o `data:image/jpeg;base64,` para JPG/JPEG (fotografías, ilustraciones sin transparencia).
4. Pegar el resultado completo (prefijo + cadena base64) como el valor de la clave correspondiente en el objeto `IMG`.
5. **Nunca** cortar ni truncar la cadena base64 al pegarla — una cadena incompleta rompe la imagen igual que un archivo corrupto.

### 31.3 — Cuándo usar base64 propio vs. Unsplash (regla de decisión)
| Tipo de imagen | Método |
|---|---|
| Foto real de un objeto/situación de la vida cotidiana (grid 2×2 de apoyo, Prioridad 1) | URL de Unsplash (`?w=300&h=130&fit=crop`) |
| Mascota/personaje guía de la clase | Base64 propio (PNG con transparencia si aplica) |
| Diagrama o ilustración diseñada a medida para UN concepto específico de esta semana (ej. "parte entera y parte decimal", "la recta numérica con decimales") | Base64 propio |
| Imagen decorativa del slide de bienvenida o de cierre | Base64 propio |
| Logo institucional / de la serie de clases | Base64 propio |

**Peso:** cada imagen base64 aumenta el tamaño del archivo HTML final (aprox. 33% más pesada que el binario original). Es un costo aceptable a cambio de la portabilidad total del archivo — pero evita incrustar más de 8-10 imágenes propias grandes en una sola clase; para el resto de apoyo visual, usa el grid de Unsplash de la Prioridad 1.

**Checklist:**
```
[ ] Existe un objeto IMG con una clave por cada imagen propia de diseño de la clase
[ ] Cada valor es un data URI completo (con su prefijo data:image/...;base64, correcto) y sin truncar
[ ] Las imágenes propias de diseño (mascota, diagramas a medida, título, cierre) usan IMG.xxx — nunca una ruta de archivo externo
[ ] El grid 2×2 de fotos de apoyo (Prioridad 1) SIGUE usando URLs de Unsplash, no base64
[ ] El fallback de imágenes (Prioridad 1) sigue funcionando igual con estas imágenes (probado con onerror)
[ ] No hay más de ~10 imágenes propias grandes embebidas en base64 en una sola clase (control de peso del archivo)
```


## 🟢 PRIORIDAD 32 · TÉCNICA — MEDIDAS EXACTAS DE CAJAS DE TEXTO E IMÁGENES POR SLIDE

### 📐 REGLA DE ORO: CADA ELEMENTO VISUAL TIENE UN ANCHO MÁXIMO FIJO — NADA CRECE LIBRE Y DESCONTROLADO
La revisión de una clase real construida con este sistema mostró que el diseño se mantiene limpio y consistente porque **cada tipo de elemento respeta un ancho máximo predefinido**, nunca "lo que quepa". Estas son las medidas exactas a reutilizar en toda clase nueva:

| Elemento | Medida exacta | Notas |
|---|---|---|
| Contenedor general del slide (`.si-wrap`) | `max-width:1040px; margin:0 auto;` | Todo el contenido de un slide vive dentro de este ancho, centrado |
| Grid de fotos de apoyo 2×2 (`.g2` + `.imgc`, Prioridad 1) | 2 columnas (`grid-template-columns:1fr 1fr; gap:12px`), cada foto `height:110px; object-fit:cover` | En móvil (`max-width:600px`) baja a **1 columna** |
| Pie de foto del grid (`.imgc-cap`) | `font-size:.65rem`, padding `4px 7px` | Texto corto, una línea, nunca un párrafo |
| Imagen propia de un concepto específico (diagrama base64, Prioridad 31) | `max-width:320px; width:100%` centrada, con borde de 3px y sombra | Para el slide de cierre/cierre motivacional puede subir hasta `max-width:460px` |
| Imagen del slide de bienvenida (título ilustrado) | `width:260px; max-width:75%` | Con animación suave tipo flotante, borde de acento |
| Burbuja de texto de la mascota/tip (`.mc`) | `max-width:380px` (hasta `460px` en pantallas de cierre) | Texto alineado a la izquierda dentro de la burbuja |
| Mensaje individual del chat de ARIA (`.aria-msg`) | `max-width:88%` del ancho de la burbuja de chat | Nunca ocupa el 100% — deja aire a los lados |
| Panel de chat de ARIA (`#aria-panel`) | `width:82vw` en móvil (definido en el widget) | Nunca se sale de la pantalla; no se redefine en la clase |

## 🟢 PRIORIDAD 33 · TÉCNICA — SONIDO SINTETIZADO CON WEB AUDIO API

### 🔊 REGLA DE ORO: CERO ARCHIVOS DE AUDIO — TODO SE GENERA EN EL MOMENTO CON OSCILADORES

**Qué es:** refuerzo sonoro para los eventos clave de la clase (acierto, fallo suave, logro, notificación de ARIA, despedida) generado 100% con la Web Audio API — osciladores que crean el sonido en tiempo real. Cero KB de `.mp3`/`.wav` incrustados, así que no pesa nada extra en el HTML. Respeta un interruptor propio (persistido en `localStorage`, igual que la voz de ARIA) y se desbloquea solo en el primer toque del estudiante, sin que el profe tenga que configurar nada — es el requisito de autoplay de casi todos los navegadores.

### 33.1 — Código (COPIAR TAL CUAL, en un `<script>` propio antes de cualquier lugar donde se use `ariaSonar()`)
```javascript
// ═══════════════════════════════════════════════════════════════════════
// SONIDO SINTETIZADO CON WEB AUDIO API (cero archivos de audio, ~2 KB de código)
// Todos los efectos se generan con osciladores en el momento — no se descarga ni se
// incrusta ningún .mp3/.wav, así que no pesa nada extra en el HTML.
// Respeta el interruptor de sonido (localStorage) y arranca en silencio si el
// navegador no ha tenido ninguna interacción todavía (política de autoplay).
// ═══════════════════════════════════════════════════════════════════════
let ariaAudioCtx = null;
let ariaSonidoActivo = (localStorage.getItem('aria_sonido_activo') ?? '1') === '1';

function ariaObtenerAudioCtx(){
  if (!ariaAudioCtx){
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ariaAudioCtx = new AC();
  }
  if (ariaAudioCtx.state === 'suspended') ariaAudioCtx.resume();
  return ariaAudioCtx;
}

// Reproduce una nota simple: frecuencia (Hz), duración (s), tipo de onda y volumen
function ariaTono(freq, duracion, tipo, volumen, retardo){
  if (!ariaSonidoActivo) return;
  const ctx = ariaObtenerAudioCtx();
  if (!ctx) return;
  const inicio = ctx.currentTime + (retardo || 0);
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = tipo || 'sine';
  osc.frequency.setValueAtTime(freq, inicio);
  gain.gain.setValueAtTime(0, inicio);
  gain.gain.linearRampToValueAtTime(volumen ?? 0.18, inicio + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, inicio + duracion);
  osc.connect(gain).connect(ctx.destination);
  osc.start(inicio);
  osc.stop(inicio + duracion + 0.02);
}

// Biblioteca de efectos — cada uno es una secuencia corta de ariaTono()
const ARIA_SONIDOS = {
  acierto:   () => { ariaTono(880,.11,'sine',.16,0); ariaTono(1318,.16,'sine',.14,.09); },
  falloSuave:() => { ariaTono(220,.16,'sine',.12,0); ariaTono(180,.18,'sine',.10,.07); },
  logro:     () => { [523,659,784,1047].forEach((f,i)=>ariaTono(f,.16,'triangle',.15,i*.09)); },
  clic:      () => { ariaTono(600,.05,'sine',.08,0); },
  notificacion:()=>{ ariaTono(740,.09,'sine',.12,0); ariaTono(988,.12,'sine',.12,.08); },
  despedida: () => { [659,523,392].forEach((f,i)=>ariaTono(f,.14,'sine',.12,i*.09)); }
};
function ariaSonar(nombre){ if (ARIA_SONIDOS[nombre]) ARIA_SONIDOS[nombre](); }
window.ariaSonar = ariaSonar;

// Interruptor de sonido — persiste entre sesiones igual que la voz
function ariaAlternarSonido(){
  ariaSonidoActivo = !ariaSonidoActivo;
  localStorage.setItem('aria_sonido_activo', ariaSonidoActivo ? '1' : '0');
  if (ariaSonidoActivo) ariaSonar('clic');
  return ariaSonidoActivo;
}
window.ariaAlternarSonido = ariaAlternarSonido;
window.ariaSonidoEstaActivo = () => ariaSonidoActivo;

// Desbloquea el audio en el primer toque del usuario (requisito de casi todos los
// navegadores móviles) sin que el profe tenga que hacer nada especial.
['pointerdown','keydown'].forEach(ev => {
  window.addEventListener(ev, () => { ariaObtenerAudioCtx(); }, { once:true, passive:true });
});

```

### 33.2 — Dónde se conecta cada sonido
| Momento | Sonido | Dónde va la llamada |
|---|---|---|
| Estudiante envía un mensaje al chat de ARIA | `clic` | Al inicio de `enviar()`, junto con `agregarMensajeAria('usuario', ...)` |
| ARIA abre su panel (manual o proactivo, 30-D/30-F) | `notificacion` | Al inicio de `abrirPanel()` |
| ARIA responde algo normal | `notificacion` | Dentro de `reaccionarAria()`, antes de `hablar()` |
| ARIA responde con categoría `logro` | `logro` (fanfarria de 4 notas) | Mismo punto, según la categoría detectada |
| ARIA responde con categoría `despedida` | `despedida` | Mismo punto, según la categoría detectada |
| Quiz — respuesta correcta | `acierto` | Junto con `ariaReaccionar('correcto')` (Prioridad 30-D) |
| Quiz — respuesta incorrecta | `falloSuave` | Junto con el conteo de fallos, ANTES de decidir si ya toca refuerzo proactivo (30-F) |

### 33.3 — Botón de silencio (junto al botón de voz existente)
```html
<button id="aria-sonido-btn" type="button" class="aria-voz-off">🔈 Sonidos: activados</button>
```
```javascript
function pintarBotonSonido(){
  const activo = window.ariaSonidoEstaActivo ? ariaSonidoEstaActivo() : true;
  $sonidoBtn.textContent = activo ? '🔈 Sonidos: activados' : '🔇 Sonidos: apagados';
  $sonidoBtn.classList.toggle('aria-voz-on', activo);
  $sonidoBtn.classList.toggle('aria-voz-off', !activo);
}
pintarBotonSonido();
$sonidoBtn.addEventListener('click', () => { ariaAlternarSonido(); pintarBotonSonido(); });
```

**Reglas no negociables de esta prioridad:**
- Ningún sonido dura más de ~0.4 s en total — son refuerzos discretos, nunca interrumpen ni distraen de la clase.
- El volumen de cada nota es bajo (`0.08`–`0.18` de ganancia) — nunca deben sonar como una alarma.
- El interruptor de sonido es independiente del de voz — el estudiante puede apagar uno sin apagar el otro.
- Si el navegador no soporta `AudioContext` (muy raro hoy en día), `ariaSonar()` simplemente no hace nada — nunca debe lanzar un error que rompa el resto de la clase.

**Checklist:**
```
[ ] ariaSonar() existe y no lanza error si AudioContext no está disponible
[ ] El interruptor de sonido persiste en localStorage y arranca en el valor guardado
[ ] Los 6 momentos de la tabla 33.2 están conectados
[ ] El botón de sonido está junto al de voz, con el mismo estilo visual (activado/apagado)
[ ] Ningún efecto dura más de ~0.4s ni suena como alarma
```

