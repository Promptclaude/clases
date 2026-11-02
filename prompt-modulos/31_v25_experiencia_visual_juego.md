# 31 · v25 — Experiencia visual de videojuego: arte, intro, efectos, progresión, mascota y pack de imágenes reutilizable

> **Se lee en la Etapa 3**, después de 29 y 30. Convierte las ideas del repositorio de clases estructuradas (Aula Gamificada: portal con mundos, liga, `aula-fx.js`, `aula-sync.js`, ARIA con 25 expresiones) en **normas obligatorias** para crear clases nuevas o adaptar las existentes.
> **Regla de oro (manda sobre todo este módulo):** ningún efecto, imagen o mecánica de juego puede **bloquear** (39), **alterar la nota** (41), **ocultar qué hacer** (39-B) ni **superar el presupuesto de peso** (56). Si un efecto estorba, se quita.

## 🔴 PRIORIDAD 50 · ABSOLUTA — DIRECCIÓN DE ARTE UNIFICADA Y SOLO IMÁGENES PROPIAS

### 50.1 — Personajes y marcas: solo originales
- **Prohibido** usar, dibujar, pedir a un generador de imágenes o recortar **personajes, logos, skins o escenarios de terceros** (Fortnite, Free Fire, Minecraft, Among Us, Roblox, Pokémon, Mario, Disney, etc.), tampoco «estilo de» con nombres de marca en el prompt de imagen. **Razón:** derechos de autor y marcas; el repositorio es **público** (cualquiera lo ve y puede reclamar); y el estilo de videojuego se logra igual de bien con **personajes originales**.
- **Elenco permitido:** **ARIA** (mascota oficial del Aula) + **máx. 3 personajes originales por mundo** (compañeros de aventura) con el mismo estilo que ARIA. Plantilla para pedir un personaje nuevo: *«personaje original chibi tipo sticker, cuerpo completo, contorno blanco fino, fondo verde croma plano, mismo estilo que ARIA, sin logos ni texto, sin parecido a personajes existentes»*. Siempre **cuerpo completo y sin recortar** (los recortes que tocan el borde de la lámina no se pueden reutilizar: ver 56).
- Si una clase o infografía existente contiene personajes o logos de terceros, **no se extraen al pack** y se reemplazan por ARIA/originales al adaptarla (49-B).

### 50.2 — Biblia visual (se aplica a todo el HTML)
| Elemento | Norma |
|---|---|
| Tipografía | `Nunito` (900 títulos, 700 interfaz, 600 texto), con `system-ui` de respaldo; mínimo 16 px en texto, 14 px en etiquetas |
| Contorno de elementos de juego | índigo `#2B1B6B`, 4–6 px; esquinas ≥ 16 px; botones con «borde 3D» (sombra inferior más oscura) |
| Paleta por mundo | 1 color primario + 1 acento + 1 fondo oscuro; definidos como variables CSS (`--mundo-primario`, `--mundo-acento`, `--mundo-fondo`); contraste ≥ 4,5:1 |
| Fondo de cada slide | 2 capas (degradado + patrón/forma), nunca blanco plano; sin imágenes de fondo pesadas |
| Cada slide | **1 protagonista visual** (imagen, número gigante o esquema), **1 ARIA/compañero** reaccionando, ≤ 60 palabras (46) |
| Texto sobre imagen | siempre en HTML (nunca «quemado» en la imagen) para poder leerlo en voz alta (48) y traducirlo |

### 50.3 — Imágenes: solo del pack, por nombre
Toda imagen se pide como `asset://id` (ver 56). **Prohibido** pegar imágenes en base64 sueltas o enlazar imágenes externas. Si falta una, se agrega al pack (56), no se improvisa. Máx. **12 assets distintos por clase** y la imagen más grande ≤ 150 KB.

**Checklist:**
```
[ ] Cero personajes/logos/marcas de terceros en la clase, el pack y el prompt de imágenes
[ ] Tipografía, contorno índigo, paleta por mundo y fondo en 2 capas aplicados
[ ] Cada slide: 1 protagonista visual + ARIA/compañero + ≤ 60 palabras; texto siempre en HTML
[ ] Todas las imágenes son asset://id del manifiesto; ≤ 12 distintas; ninguna > 150 KB
```

## 🔴 PRIORIDAD 51 · ALTA — INTRO CINEMATOGRÁFICA, MUNDOS Y TRANSICIONES

1. **Intro en 3 tiempos, ≤ 4 s, saltable desde el 1.er segundo:**
   ① «**Presiona para empezar**» (`AulaFX.intro({titulo, sub})`): título del mundo animado sobre fondo de estrellas. Este toque también activa el audio (los navegadores no permiten sonido antes).
   ② **«Cargando misión…»** con barra (degradado cian→violeta→dorado) y un consejo de ARIA.
   ③ **ARIA aparece (`aria-hola`)** y muestra la **misión en 3 viñetas con íconos** (qué aprenderás · qué harás · qué ganarás).
2. **Portada de la misión:** nombre épico + tema + **3 recompensas visibles** (`estrella`, `moneda`, `medalla-*`).
3. **Zonas:** la clase se divide en 3–4 «zonas» con nombre y dibujo (46); un mapa de ruta muestra `candado`/`candado-abierto` **solo como imagen del progreso**: el desbloqueo real sigue siendo el de 39 (nunca se bloquea por responder mal).
4. **Transiciones:** entrada de contenido `fx-in` ≤ 0,4 s en cada slide; **iris/barrido con barra de carga solo entre zonas** (no entre cada slide) y al cambiar de página (`AulaFX.ir`). Duración ≤ 0,5 s.
5. **Siempre respetar** `prefers-reduced-motion` y el botón ✨ para apagar efectos (`AulaFX.activo`).

**Checklist:**
```
[ ] Intro 3 tiempos ≤ 4 s, saltable, con «Presiona para empezar» que activa el audio
[ ] Portada con misión en 3 viñetas y 3 recompensas visibles
[ ] Zonas con mapa; los candados son solo visuales (la navegación sigue 39)
[ ] Transiciones ≤ 0,5 s; iris solo entre zonas; reduce-motion y botón ✨ respetados
```

## 🔴 PRIORIDAD 52 · ABSOLUTA — MOTOR CENTRAL DE EFECTOS `Juego` (JUICE SIN CAOS)

**Todo** efecto pasa por `Juego.evento(nombre)`: nada de efectos sueltos repartidos por el código. Así se garantiza que (a) un fallo es **suave** (sin sacudida ni rojo), (b) «reducir movimiento» y «sin sonido» se respetan en un solo lugar, (c) un equipo lento no se satura (máx. 3 efectos simultáneos; los de prioridad 3 —hito, nivel, jefe final— nunca se descartan), (d) un efecto roto **no rompe la clase**.

| Evento | Qué pasa | Quién lo dispara |
|---|---|---|
| `acierto` | sonido + destello chico + pulso del HUD + ARIA `correcto` | `responderQuiz()` / actividad acertada |
| `casi` (fallo) | sonido grave suave + ARIA `parece-dificil`. **Sin partículas, sin sacudida, sin rojo.** | respuesta no correcta |
| `combo3` / `combo5` | «🔥 ¡Combo xN!» + destello / confeti. **El combo se reinicia en silencio** (nunca se castiga) | automático |
| `pista` | tono corto | botón de pista |
| `actividad` | «✅ ¡Actividad completada!» + destello | `marcarActividadHecha()` (39.6) |
| `hito` / `nivel` | confeti + fanfarria + pantalla de nivel | 44-D / 53 |
| `desbloqueo` | cofre que se abre | 53 |
| `jefe_golpe` / `jefe_final` | golpe al jefe / jefe derrotado | 53 |

**Reglas de sensación (juice):** respuesta visible a cada toque en **≤ 100 ms**; botones con *squash* (`scale .94`) al pulsar; números que **cuentan hacia arriba** (HUD) en ≤ 600 ms; partículas con `transform`/`opacity` (nunca animar `width/height/top/left`); capas de efectos con `pointer-events:none` y **sin `await`** (jamás esperan para dejar tocar); máx. 1 pantalla completa de celebración por slide, ≤ 2,5 s.
**Sonido:** sintetizado con Web Audio (**0 KB** de archivos); botón 🔊/🔇; se activa tras el primer toque; nada importante vive solo en audio.

```javascript
@@FX@@
```
**Integración:** al arrancar la clase, `Juego.usar({ sfx: crearSfx(() => ctxAudio), burst: (t, e) => AulaFX.burst(x, y), hud: () => pulsoHud(), confeti: dispararConfeti, toast: showToast, aria: ariaReaccionar, boss: golpeJefe, pantalla: mostrarNivel })`; `Juego.ajustar({ movimiento: !prefersReduced, sonido: sonidoActivo })`. `responderQuiz()` llama `Juego.evento(correcta ? 'acierto' : 'casi')` **después** de `pintarNota()` (41).

**Checklist:**
```
[ ] Todo efecto sale de Juego.evento(); no hay efectos sueltos fuera del motor
[ ] El fallo no tiene partículas, sacudida ni rojo; el combo se reinicia en silencio
[ ] Con «reducir movimiento» no hay partículas; sin sonido no suena nada; ambos probados (T16)
[ ] Máx. 3 efectos simultáneos; hito/nivel/jefe final nunca se descartan; un efecto roto no rompe la clase
[ ] Respuesta visible ≤ 100 ms; capas FX con pointer-events:none; ninguna espera bloquea el clic
```

## 🔴 PRIORIDAD 53 · ALTA — PROGRESIÓN QUE ENGANCHA (SIN TOCAR LA NOTA)

| Sistema | Norma |
|---|---|
| **XP de esfuerzo** | +10 completar una actividad · +5 corregirse tras un fallo · +5 por cada respuesta de quiz (bien o mal) · +10 extra si es correcta · **usar pistas o «No me sale» no resta nada**. El XP **no es la nota** y nunca se mezcla con ella (41). |
| **Niveles con nombre** | Explorador → Aprendiz → Constructor → Estratega → Campeón; al subir: pantalla de nivel + `medalla-bronce`/`plata`/`oro` y `corona` en el último. |
| **Monedas y cofres** | monedas por actividades; **cofre de recompensa** (`cofre` → `cofre-abierto`) al terminar cada zona: monedas, gemas o un cosmético. |
| **Tienda cosmética** | marcos de avatar, fondos del portal, accesorios para ARIA; se compran **solo con monedas ganadas por esfuerzo**; nunca dan ventajas en la nota; nunca se paga con dinero real. |
| **Insignias** | dibujadas con `escudo` + ícono; nombres de esfuerzo («🔧 Corregí mi error», «📈 Mejoré mi marca», «🧩 Terminé el reto difícil»). |
| **Racha diaria 🔥** | días seguidos entrando (`llama`); **1 día de gracia** por semana para que no se pierda por un imprevisto; la racha nunca se muestra como «perdida» de forma negativa. |
| **Jefe final** | el evalFinal puede presentarse como un jefe con **barra de vida = total de preguntas**: cada acierto le baja vida (`jefe_golpe`); un fallo **no lo cura**. Es solo presentación: **no crea otra nota**. Al terminar: «¡Jefe derrotado!» (≥ 60 % de aciertos) o «El jefe se escapó… ¡practica y vuelve!» (con el mini-reto de revancha, 45). |

**Checklist:**
```
[ ] XP, niveles, monedas, cofres, tienda e insignias definidos; ninguno altera la nota ni se compra con dinero real
[ ] Racha con día de gracia y lenguaje positivo
[ ] El jefe final es solo presentación del evalFinal; no existe una segunda nota
```

## 🔴 PRIORIDAD 54 · ALTA — PORTAL, MUNDOS Y LIGA DE ESFUERZO

1. **Portal «Aula Gamificada»** (el `index.html` del repositorio de clases) es el estándar: entrada con **apodo + PIN**, **mundos** por materia y grado, HUD (nivel · XP · 🔥), insignias y avance en línea opcional (`aula-sync.js` + `AULA_RESUMEN()`, que debe devolver la **nota oficial** de 8-U y los campos de 42).
2. **Liga de esfuerzo** (sustituye la regla «sin ranking» de 44-E solo en esto): se ordena por **XP semanal de esfuerzo, nunca por nota**; **solo apodos** (nunca nombres reales ni fotos); se muestra el **Top 10 y la posición propia con sus vecinos**, **jamás una lista de «últimos»**; se reinicia cada semana para que todos puedan empezar de nuevo; el docente puede apagarla.
3. **Carrera de grupos** por **XP promedio por estudiante activo** (justa entre grupos de tamaños distintos).
4. **Privacidad de menores:** datos mínimos (apodo, grupo, grado); el nombre real solo lo ve el docente y el propio estudiante.
5. **Local primero:** si no hay internet o servidor, la clase funciona igual y sincroniza al volver (nunca bloquea).

**Checklist:**
```
[ ] Liga por XP de esfuerzo con apodos; Top 10 + vecinos; sin lista de últimos; reinicio semanal; apagable
[ ] Ninguna pantalla compara notas entre estudiantes
[ ] AULA_RESUMEN() devuelve notaOficial() y los campos del index de 42
[ ] La clase funciona sin servidor ni internet
```

## 🔴 PRIORIDAD 55 · ALTA — ARIA EXPRESIVA (MAPA EVENTO → IMAGEN)

| Momento | Asset |
|---|---|
| Saludo / inicio de clase | `aria-hola` |
| Empezar un reto | `aria-tu-puedes` · `aria-vamos` · `aria-tu-puedes-saltando` |
| Acierto | `aria-correcto` · `aria-genial` |
| Fallo (empatía, nunca burla) | `aria-parece-dificil` |
| Explicación de un paso | `aria-asi-se-hace` |
| Práctica guiada | `aria-vamos-juntos` |
| Actividad terminada | `aria-listo` |
| 45 s sin tocar nada | `aria-sigues-aqui` + oferta de pista |
| Hito / cariño / vidas | `aria-corazon` |
| Cierre | `aria-nos-vemos` |
**Reglas:** ARIA sale en una esquina ≤ 3 s y se esconde; **máx. 1 reacción cada 8 s**; las imágenes traen su frase incluida, así que se usan **2 variantes** por momento para que no se repita; ARIA **nunca da la respuesta de un quiz evaluable** (conserva el anti-copia existente); opción de **voz** (lectura en voz alta, 48). Los mensajes largos de ARIA van en texto HTML, no en la imagen.

## 🔴 PRIORIDAD 56 · ABSOLUTA — PIPELINE DEL PACK DE IMÁGENES REUTILIZABLE

**Carpeta:** `assets-reutilizables/` con `assets.json` (manifiesto), `aria/`, `premios/`, `kit-juego/{svg,png}/` y las categorías nuevas que se agreguen. **Se referencia por id** (`asset://aria-hola`); nunca por ruta a mano.
**Herramientas** (`tools/`): `extraer_imagenes_de_clase.py` (saca las imágenes base64 de una clase vieja), `limpiar_recortes.py` (recorta, quita halos, quita fragmentos vecinos y **detecta recortes cortados**), `empaquetar_assets.py` (mete en la clase solo los `asset://` usados; falla si el peso pasa de 1,5 MB o si un id no existe).

**Flujo para subir un pack nuevo:**
1. Dejar las imágenes en `assets-entrada/`.
2. `python3 tools/limpiar_recortes.py assets-entrada salida [--busto] --registrar assets-reutilizables/assets.json --categoria <carpeta>` → las **ok** pasan al pack; las **cortadas** quedan en `salida/revisar/` con el lado cortado (hay que re-exportar la lámina original).
3. Completar `uso` y `tags` en el manifiesto.
4. Construir cada clase y **empaquetar**: `python3 tools/empaquetar_assets.py clase.html -o clase_final.html`.

**Criterios para que una imagen entre al pack (todas):** fondo transparente real · el sujeto **no toca ningún borde** · sin halo blanco/sucio · lado mayor ≥ 256 px · un sujeto (más elementos pegados como estrellas o globo) · **sin personajes ni marcas de terceros** (50.1) · nombre en minúsculas con guiones, en español (`aria-hola`, `medalla-oro`).
**Reglas de uso:** el kit (SVG) escala sin perder calidad y pesa 1–3 KB: se prefiere sobre un PNG; las ilustraciones grandes solo en WebP; los textos nunca van «quemados».
**Ley de peso:** HTML final ≤ **1,5 MB** (antes las clases pesaban 4–9 MB por imágenes incrustadas repetidas).

**Checklist:**
```
[ ] Toda imagen nueva pasó limpiar_recortes.py y los 7 criterios; las cortadas no se usan
[ ] Todas las imágenes de la clase son asset://id y la clase se entrega con empaquetar_assets.py (≤ 1,5 MB)
[ ] El manifiesto tiene uso y tags completos para cada asset nuevo
```

## 🔴 PRIORIDAD 57 · ABSOLUTA — «MEDIDOR VISUAL» Y ADAPTAR CLASES EXISTENTES A v25

**Medidor visual** (se imprime junto al Medidor de 49-C; 0–2 por criterio; no se entrega con < 14/20 ni con un 0 en 1–3):
| # | Criterio | |
|---|---|---|
| 1 | Cero personajes/marcas de terceros (50.1) | |
| 2 | Imágenes solo `asset://`; HTML ≤ 1,5 MB (50.3, 56) | |
| 3 | Efectos no bloquean ni tocan la nota; reduce-motion y sin sonido probados (52, T16) | |
| 4 | Intro 3 tiempos, saltable, con «Presiona para empezar» (51) | |
| 5 | Cada slide: protagonista visual + ARIA/compañero + ≤ 60 palabras (50.2) | |
| 6 | Fallo suave y empático; combo sin castigo (52, 55) | |
| 7 | Progresión: XP, niveles, cofres, jefe como presentación (53) | |
| 8 | Zonas y mapa con candados solo visuales (51) | |
| 9 | ARIA con el mapa evento→imagen y límite de 1 reacción/8 s (55) | |
| 10 | Liga por XP con apodos, sin notas ni «últimos» (54) | |

**Adaptar una clase existente a v25** (extiende 49-B, sin regenerar el contenido pedagógico): ① `extraer_imagenes_de_clase.py` para ver qué imágenes trae; ② reemplazar las genéricas por `asset://` del pack y las de terceros por ARIA/originales; ③ conectar `Juego` y `AulaFX`; ④ agregar intro, zonas y mapa; ⑤ `empaquetar_assets.py`; ⑥ T10–T16 y Medidores (49-C y 57).

**Honestidad:** el código de `Juego` y las herramientas están probados a nivel de lógica (T16, pruebas de `tools/`); **la apariencia en navegador real y el rendimiento en los equipos del laboratorio no están verificados** hasta generar y recorrer una clase v25.
