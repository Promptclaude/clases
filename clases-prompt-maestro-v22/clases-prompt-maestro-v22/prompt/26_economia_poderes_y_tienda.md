---
modulo: 26_economia_poderes_y_tienda
etapa_de_lectura: 3
prioridades: [36, 36-B, 36-C, 36-D]
---

# 26 · Economía de gemas, poderes, tienda, misiones y rangos

> Objetivo: que el estudiante sienta que **gana cosas por intentar, explorar y mejorar**, y que puede **cambiarlas por poderes y premios**. Principio de justicia: **la nota se gana solo con los quizzes; las gemas premian el esfuerzo, no el resultado.** Así nadie "compra" nota y nadie se frustra por no tenerla.
> Toda la lógica de saldo vive en el núcleo (`motor/nucleo.js`: `Nucleo.ganar` y `Nucleo.gastar`, probadas). No se reescribe.

## 🔴 PRIORIDAD 36 · ABSOLUTA — ECONOMÍA DE GEMAS: GANANCIAS, TOPES Y PERSISTENCIA SEGURA

### 36.1 — La moneda
Cada clase nombra su moneda según el universo (`MONEDA = { nombre:'Cronos', icono:'⏱️' }`; Minecraft → "esmeraldas", espacio → "estrellas"…). En el código y el panel se llama internamente `gemas`.

### 36.2 — Fuentes de ganancia y topes (por clase y por estudiante)
| Fuente | Cuánto | Tope por clase |
|---|---|---|
| Capítulo `historia` completado | +2 | 6 |
| Pista escondida encontrada (`buscar`) | +1 | 6 |
| Predicción respondida (acierte o no) | +1 | 4 |
| Minijuego (1, 2 o 3 estrellas) | +1 / +2 / +4, cada nivel se paga una vez | 24 |
| Actividad complementaria verificada | +3 | 12 |
| Racha de 3 aciertos seguidos en práctica | +2 | 8 |
| Completar un quiz o la evaluación (**sin importar el resultado**) | +2 | 6 |
| Completar un reintento (recompensa a la **persistencia**) | +3 | 9 |
| Carta sorpresa (23) | según la carta | 6 |
**Total máximo orientativo: ≈ 81 gemas por clase.** Los quizzes **no pagan por acierto**: pagar por acierto empuja a copiar y castiga a quien aprende más lento.

### 36.3 — Reglas de persistencia (anti-herencia, ver 38-B)
- La billetera vive en `estado.eco` dentro de la **sesión sellada** de esa semana: **cada semana empieza con 0 gemas.** Las gemas no se arrastran entre semanas (un saldo heredado sería indistinguible del bug de la nota heredada).
- Lo que **sí** se acumula entre semanas son **cosméticos e insignias** (36-C) a través del **baúl**, que **nunca** contiene nota, avance, vidas ni gemas.
- Cada ganancia y cada gasto lleva un **id de transacción único y estable** (`'hist:h1'`, `'mj:mj2:e2'`, `'pista:quiz1_p3:n3'`). Si la acción se repite (doble clic, recarga a mitad), `Nucleo.ganar/gastar` la ignora. **Prohibido** sumar o restar `st.gemas` a mano.
- El saldo **nunca es negativo**. Si el saldo no alcanza, el botón se ve deshabilitado con el texto de lo que falta ("Te faltan 2 💎").
- El saldo se muestra siempre en la barra superior con una animación corta de monedas al ganar (≤ 600 ms, respetando `prefers-reduced-motion`).

**Checklist:**
```
[ ] MONEDA temática declarada; el saldo visible en la barra superior
[ ] Todas las ganancias pasan por Nucleo.ganar con id de transacción y tope por fuente
[ ] Los quizzes NO pagan por acierto; sí pagan por completar (2) y por persistir en un reintento (3)
[ ] La billetera arranca en 0 cada semana; no se hereda nada de otra semana
[ ] Cero sumas/restas manuales de gemas en el código
```

## 🔴 PRIORIDAD 36-B · ABSOLUTA — PODERES: AYUDAN A APRENDER, NO REGALAN NOTA

| Poder | Efecto | Costo | Dónde se puede usar |
|---|---|---|---|
| 🔦 **Linterna** | Pista de ARIA nivel 2 (procedimiento general) | 3 💎 | Prácticas, complementarias, minijuegos **y quizzes** |
| 🧭 **Brújula** | Pista de ARIA nivel 3 (ejemplo paralelo resuelto) | 5 💎 | Igual que la Linterna |
| ⏳ **Tiempo extra** | +10 s en una partida de minijuego | 4 💎 | Solo minijuegos |
| ❄️ **Congelar** | Detiene la barra de tiempo 5 s | 5 💎 | Solo minijuegos tipo `carrera` |
| 🔍 **Lupa** | Resalta una pareja/casilla/palabra (sopa de letras, parejas) | 4 💎 | Solo complementarias y minijuegos |
| 🧲 **Imán** | Sugiere el siguiente paso de un procedimiento ordenable | 4 💎 | Solo `puente` y arrastrar-ordenar |
| 🛡️ **Escudo de racha** | Una vez, un error no corta la racha de práctica | 3 💎 | Solo rachas de práctica (36-D) |

**Reglas innegociables:**
1. **Ningún poder elimina opciones, marca la correcta, suma aciertos ni toca `mejorNota`.** En los **quizzes y la evaluación final** solo existen las pistas de ARIA de proceso (Linterna y Brújula), que **nunca revelan la respuesta** (37-B).
2. El docente puede **apagar las pistas en evaluables** desde el Panel Docente con el interruptor `PISTAS_EN_QUIZ` (por defecto activado); al apagarlo, la Linterna y la Brújula se ven deshabilitadas dentro de quiz y evalFinal.
3. Cada uso de un poder se registra (`st.eco.poderes[id] = usos`) y se muestra en el panel docente.
4. Usar un poder requiere un clic de confirmación solo si cuesta ≥ 5 💎; el gasto es idempotente (`Nucleo.gastar`).
5. Un poder nunca se "pierde" por un error de interfaz: si la acción falla después de cobrar, se **reembolsa** con una transacción inversa (`'ref:'+idTx`).

**Checklist:**
```
[ ] Los 7 poderes existen con su costo y su ámbito permitido
[ ] Ningún poder elimina opciones ni suma aciertos; en evaluables solo Linterna y Brújula (pistas de proceso)
[ ] Interruptor PISTAS_EN_QUIZ en el Panel Docente
[ ] Cada uso se registra en st.eco.poderes; el reembolso existe si la acción falla tras cobrar
```

## 🟠 PRIORIDAD 36-C · ALTA — MOCHILA, TIENDA Y BAÚL (COSMÉTICOS E INSIGNIAS)

1. **Mochila** (botón fijo en el menú superior 16-B, con una insignia numérica de novedades): muestra saldo, poderes disponibles, cosméticos comprados y la cámara de insignias.
2. **Tienda** (dentro de la mochila): artículos cosméticos con precio fijo, por ejemplo **accesorio de avatar** (6–10 💎), **marco de perfil** (8), **título nuevo** de héroe (8), **efecto de celebración** (5), **fondo de la escena de inicio** (10).
3. **Comprar** = `Nucleo.gastar` con confirmación y animación; el artículo se agrega a `estado.eco.inventario` **y**, si es cosmético, también al **baúl** (`claves().baul`) para que **se conserve entre semanas**. El baúl guarda solo `{id, nombre, fecha}`.
4. La vitrina de logros acumulados (20) **lee del baúl**; no guarda nota ni progreso.
5. Los cosméticos **son opcionales**: la clase se completa igual sin comprar nada.

**Checklist:**
```
[ ] Mochila en el menú superior con saldo, poderes, cosméticos e insignias
[ ] Comprar usa Nucleo.gastar (idempotente) y confirmación
[ ] Los cosméticos van al baúl (sin nota/avance/gemas); la vitrina (20) lee del baúl
[ ] Nada de la tienda es necesario para completar la clase
```

## 🟠 PRIORIDAD 36-D · ALTA — MISIONES, RACHAS Y RANGOS DE AVENTURERO (COMPLEMENTA LA PRIORIDAD 15)

La Prioridad 15 (gamificación base: XP, insignias) **se mantiene**. Esta se suma:
1. **Misiones secundarias por mundo** (2 por mundo, opcionales): "Encuentra las 3 pistas escondidas", "Gana 2 estrellas en un minijuego", "Usa una pista de ARIA y luego acierta sin ayuda". Cada misión completada: +2 💎 y un sello en la mochila.
2. **Racha de práctica:** 3 aciertos seguidos en práctica/complementarias = +2 💎 (tope 8). Un error corta la racha salvo que tenga el Escudo.
3. **Rangos por XP** (5, con nombres temáticos): Novato → Explorador → Experto → Maestro → Leyenda. Subir de rango muestra una animación corta y una frase del aliado. **Los rangos no dependen de la nota oficial** (dependen de actividad).

**Checklist:**
```
[ ] 2 misiones opcionales por mundo, con sello al completarlas
[ ] Racha de práctica con tope y Escudo
[ ] 5 rangos temáticos que dependen de XP/actividad, no de la nota
```
