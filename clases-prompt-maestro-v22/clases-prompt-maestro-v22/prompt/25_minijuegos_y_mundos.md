---
modulo: 25_minijuegos_y_mundos
etapa_de_lectura: 3
prioridades: [35, 35-B]
---

# 25 · Minijuegos (contrato técnico común) y implementación visual de los mundos

## 🔴 PRIORIDAD 35 · ABSOLUTA — MINIJUEGOS: 3 POR CLASE, TODOS BAJO EL MISMO CONTRATO (NUNCA ROMPEN LA CLASE NI TOCAN LA NOTA)

### 35.1 — Qué es y cuántos hay
Un **minijuego** es una actividad corta (45–120 s por partida) donde el estudiante **practica con las manos** el concepto del momento. Cada clase lleva **3 minijuegos** (type `'minijuego'`): uno en el Mundo 2, uno en el Mundo 3 y uno de repaso antes de la evaluación final (posiciones de la Prioridad 9). **Los 3 deben ser de tipos diferentes** y **ninguno puede repetirse tal cual en la clase siguiente** (rotar el catálogo).

### 35.2 — Catálogo de tipos (elegir según el concepto; todos se alimentan de `MJ_DATA`, no de código nuevo)
| Tipo | Mecánica | Ideal para |
|---|---|---|
| `carrera` | Barra de tiempo: elige la opción correcta antes de que la barra termine; 6–8 rondas; el ritmo se adapta | Comparar, clasificar, cálculo mental |
| `puente` | Piezas sueltas: se arman en orden (pasos de un procedimiento) para "cruzar" | Procesos con secuencia |
| `detective` | Una solución resuelta **con un error escondido**: toca el paso equivocado y explica por qué | Errores comunes, procedimientos |
| `parejas` | Memoria: une concepto ↔ ejemplo/definición (6 parejas máx.) | Vocabulario, equivalencias |
| `manipulable` | Objeto interactivo (recta numérica, balanza, cuadrícula, reloj) que el estudiante mueve para cumplir un objetivo | Conceptos visuales y medidas |
| `candados` | "Escape room": 3 candados, cada uno se abre con un mini-reto + una pista de ARIA; el código final es la unión de las 3 respuestas | Repaso integrador |

### 35.3 — Contrato técnico (aplica a los 6 tipos, sin excepción)
```javascript
// Registro: cada tipo se declara así. NO se escribe un minijuego fuera de este molde.
const MJ_REGISTRO = {};
function registrarMinijuego(def) {                 // def: { tipo, montar(contenedor, datos, ctx), limpiar() }
  MJ_REGISTRO[def.tipo] = def;
}
// ctx que recibe montar(): { terminar(resultado), error(e), nivel, semilla, gastarPoder(id), sonido(nombre) }
// resultado: { estrellas: 0..3, aciertos, intentos, ms }
function montarMinijuego(slide, cont) {
  const def = MJ_REGISTRO[slide.tipoMJ];
  const ctx = construirCtxMJ(slide);               // incluye terminar() idempotente y limpiar() automático
  try { def.montar(cont, MJ_DATA[slide.id], ctx); }
  catch (e) { registrarFalloMJ(slide.id, e); montarRetoRapido(cont, slide); }   // NUNCA deja la clase muerta
}
```
**Reglas del contrato:**
1. **Nunca afecta la nota oficial.** Un minijuego da gemas, XP, insignias y estrellas; jamás aciertos de quiz ni `mejorNota`.
2. **Siempre se puede avanzar.** El botón Siguiente se habilita cuando el estudiante **completa una partida** (ganando o perdiendo) **o** cuando pulsa **"Saltar este reto"**, que aparece a los 25 s de estar en el slide (sin gemas, sin culpa). Si `montar()` lanza un error, se muestra el **Reto rápido** (1 pregunta simple del mismo tema) y Siguiente se habilita al responderla.
3. **Un solo `terminar()`.** `ctx.terminar()` es idempotente: llamarlo dos veces (doble clic, fin de tiempo + clic) no duplica gemas ni estrellas.
4. **Temporizadores bajo 8-S:** todo `setInterval/setTimeout` del minijuego se registra en el limpiador del slide; al cambiar de slide no queda ninguno vivo. Se prefiere `requestAnimationFrame` con reloj de tiempo real.
5. **Entradas:** funciona con **ratón, toque y teclado** (Tab/Enter/flechas). Zonas táctiles ≥ 44 × 44 px. Arrastrar siempre tiene alternativa de toque ("toca la pieza, toca el destino").
6. **Sin dependencias externas** (nada de librerías ni imágenes remotas); gráficos con emojis, CSS o SVG inline.
7. **Respeta `prefers-reduced-motion`:** si está activo, sin sacudidas ni destellos; se mantienen los cambios de color y texto.
8. **Anti-clic-rápido (8-M):** cada ronda se bloquea sincrónicamente al responder.
9. **Dificultad adaptable:** `nivel` = 1 (tranquila), 2 (media), 3 (veloz). Empieza según la **ruta elegida** (34-D) y baja un nivel tras 3 errores seguidos. Nunca sube sola a mitad de partida.
10. **Datos distintos a la evaluación:** los números y ejemplos de `MJ_DATA` **no repiten** ninguna pregunta de Quiz 1, Quiz 2 ni Evaluación Final.
11. **Guardado:** `st.mj[id] = { mejorEstrellas, partidas, ultimoMs }`. Al recargar se ve la mejor marca; la partida en curso no se restaura (se reinicia limpia).
12. **Premio (con el núcleo, Prioridad 36):** `ganar(estado, 1·estrellas, 'minijuego', 'mj:'+id+':e'+estrellas, tope)`. Cada nivel de estrella se paga **una sola vez** (el id de transacción lo garantiza): repetir para "farmear" no da más gemas.
13. **Accesibilidad de lectura:** instrucciones en máx. 2 frases, visibles **antes** de empezar, con botón "¿Cómo se juega?" (animación de ejemplo de 5 s).
14. **Pantalla de resultado:** estrellas, mensaje específico ("Igualaste cifras sin fallar"), gemas ganadas, botones "Jugar otra vez" y "Continuar".

### 35.4 — `MJ_DATA` (formato mínimo por tipo)
```javascript
const MJ_DATA = {
  mj1: { tipoMJ:'carrera',  rondas:[ { enunciado:'¿Cuál tiempo es menor?', opciones:['12,45 s','12,5 s'], correcta:0, pista:'Igualemos cifras…' } /* 6-8 */ ] },
  mj2: { tipoMJ:'detective',solucion:[ {paso:'Escribo 12,5 como 12,50'}, {paso:'Comparo 50 y 45: 45 es mayor'} ], pasoError:1, porQue:'50 > 45, no al revés' },
  mj3: { tipoMJ:'candados', candados:[ { reto:'…', respuesta:'…', pistaAria:'nivel 2' } /* exactamente 3 */ ] }
};
```

**Checklist:**
```
[ ] 3 minijuegos de 3 tipos distintos, en las posiciones de la Prioridad 9, y distintos a los de la clase anterior
[ ] Todos se registran con registrarMinijuego y se montan con montarMinijuego (try/catch + Reto rápido)
[ ] Ninguno toca mejorNota ni aciertos de quiz
[ ] Siguiente se habilita al completar una partida o al pulsar "Saltar este reto" (a los 25 s)
[ ] terminar() es idempotente; cada nivel de estrella paga gemas una sola vez
[ ] Cero setInterval/setTimeout huérfanos al cambiar de slide (8-S)
[ ] Funciona con ratón, toque y teclado; zonas ≥ 44 px; alternativa al arrastre
[ ] prefers-reduced-motion respetado; sin librerías ni imágenes remotas
[ ] MJ_DATA no repite números ni preguntas de la evaluación
[ ] Instrucciones ≤ 2 frases + "¿Cómo se juega?"; pantalla de resultado con mensaje específico
```

## 🔴 PRIORIDAD 35-B · ABSOLUTA — IMPLEMENTACIÓN VISUAL DE LOS MUNDOS (SIN ROMPER LA PALETA CLARA)

Los mundos de la 34-B cambian el **ambiente**, no la **legibilidad**. Esto reconcilia la 0-E (paleta clara obligatoria) con la idea de "entrar a otros mundos".

1. **El `body`, el fondo de las tarjetas y toda superficie de lectura, preguntas y opciones siguen siendo claros** (0-E: `--bg-main` con luminosidad ≥ 90 %, `--bg-card` = #FFFFFF). **No cambia.**
2. **El mundo se pinta en la escena** (`.escena`): una franja/ilustración dentro de la tarjeta (CSS puro o SVG inline) con sus propias variables:
```css
.escena { position:relative; border-radius:16px; overflow:hidden; min-height:120px; background:var(--m-fondo); color:var(--m-tinta); }
.mundo-1 { --m-fondo:linear-gradient(180deg,#FFE9C7,#FFD39B); --m-tinta:#4A2A00; --m-acento:#E8710A; }
.mundo-2 { --m-fondo:linear-gradient(180deg,#E6F4FF,#BFE3FF); --m-tinta:#0B3558; --m-acento:#1D8FE1; }
.mundo-3 { --m-fondo:linear-gradient(180deg,#2B2A5E,#5B3FA0); --m-tinta:#FFFFFF; --m-acento:#FFD54A; }   /* ambiente nocturno/espacial: SOLO dentro de .escena */
.mundo-4 { --m-fondo:linear-gradient(180deg,#FFF3B0,#FFD54A); --m-tinta:#4A3500; --m-acento:#C0392B; }
.escena * { pointer-events:auto; }
.escena::before, .escena::after { pointer-events:none; }                                  /* decoración nunca captura clics */
```
3. **Zona oscura permitida (excepción controlada de la 0-E):** un ambiente oscuro (espacio, noche, fondo del mar) **solo puede ocupar `.escena`**, con **texto de contraste ≥ 7:1** (blanco/amarillo claro) y **nunca detrás de** opciones de quiz, campos de escritura, botones de acción ni texto de lectura largo. Si hay duda, se aclara.
4. **Transición de portal** entre mundos: una superposición de ≤ 900 ms con `pointer-events:none`, que **siempre se elimina en un `finally`** (aunque algo falle). Una superposición que se queda pegada es una de las causas clásicas de "no deja contestar" (ver 38-C).
5. **El mundo se aplica por `data-mundo` en el contenedor del slide** (`render()` lo pone según `MUNDOS`); no se mezcla con el tema visual general (0-F), que sigue siendo único por clase y distinto al de la anterior.
6. **Sonido de mundo** opcional con Web Audio (33): un acorde corto al entrar, **desactivable** y apagado por defecto en la primera visita hasta que el estudiante toque algo.

**Checklist:**
```
[ ] body, tarjetas, preguntas y opciones siguen siendo claros (0-E intacta: --bg-main ≥ 90 %, --bg-card #FFFFFF)
[ ] Los fondos oscuros viven solo dentro de .escena, con contraste ≥ 7:1 y nunca detrás de opciones, campos o texto largo
[ ] Toda decoración y superposición tiene pointer-events:none; la del portal se elimina en finally
[ ] render() asigna data-mundo/clase de mundo según MUNDOS; el tema general sigue rotando entre clases (0-F)
[ ] El Mundo 3 se ve claramente distinto del universo base
```
