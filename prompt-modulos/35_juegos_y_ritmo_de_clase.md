## 🔴 PRIORIDAD 66 · ALTA — JUEGOS DE APLICACIÓN Y RITMO DE CLASE (motor 28)

Una clase debe sentirse como una **app de juegos educativos profesional**: el estudiante toca, une, ordena, busca, compite contra el reloj y abre un tesoro. **Nunca** una sucesión de lecturas y preguntas. Los juegos se escriben **solo como datos JSON** (el motor los pinta; no se reescribe el motor).

### Regla de oro (igual que Prioridad 65)
Los juegos **NO tocan la nota del quiz**, **nadie se queda atrapado** (a los 25 s aparece «No me sale») y todo funciona **con un dedo** (tocar–tocar; en `enlazar` y `sopa` también se puede arrastrar). Mensajes siempre amables: «Casi, prueba otra vez» (nunca «incorrecto» ni «fallaste»). Cada juego lleva `porQue` para enseñar aunque se falle.

### Los 6 juegos nuevos
| `type` | Se juega así | Datos obligatorios | Úsalo para |
|---|---|---|---|
| `enlazar` | Une con líneas de colores cada elemento con su pareja | `pares:[{izq, der, porQue}]` (3–6, textos únicos) | Vocabulario, concepto↔definición, causa↔efecto |
| `ordenar` | Cambia pasos de lugar (tocar–tocar o ▲▼) y «Comprobar»: «3 de 5 en su lugar» | `items:[...]` **escritos en el orden correcto** (3–6; el motor los mezcla), `instruccion`, `porQue` | Procedimientos, ciclos, secuencias, historia |
| `memoria` | Voltea cartas y encuentra parejas; da ⭐ por pocas jugadas | `pares:[{a, b, porQue}]` (3–6) | Memorizar términos, símbolos, equivalencias |
| `relampago` | Ronda rápida: 8 s por frase, ❤️ vidas, 🔥 racha, ⭐ puntos; interruptor **⏱ Jugar sin reloj** | `opciones:[A,B]`, `items:[{texto, correcta:0\|1, porQue}]` (6–12, mezclar ~50/50), `segundos`, `vidas` | Clasificar rápido (hardware/software, par/impar, verdadero/falso) |
| `sopa` | Busca palabras en una cuadrícula leyendo una **pista** (no se muestra la palabra) | `palabras:[{palabra, pista}]` (3–8, 3–10 letras, sin tildes obligatorias), `tam` (≤12) | Vocabulario técnico, ortografía, partes de algo |
| `candado` | Escape room: cada acertijo correcto da un 🔑 dígito; con el código se abre el candado y aparece el tesoro | `acertijos:[{q, ops(3+), ok, digito 0-9, porQue}]` (3–5), `tesoro` | Cierre de clase con recompensa, repaso integrador |

Los 6 de Prioridad 65 siguen disponibles: `cuadricula`, `recta`, `comparar`, `podio`, `abierta`, `cuaderno`; y los clásicos `tf`, `fill`, `drag`, `minijuego`, `quiz`.

### Cómo elegir el juego según el objetivo
- **Reconocer / relacionar** → `enlazar`, `memoria`. **Recordar rápido** → `relampago`. **Proceso paso a paso** → `ordenar`, `podio`.
- **Ver y construir un número** → `cuadricula`, `recta`. **Vocabulario** → `sopa`. **Integrar todo** → `candado`. **Explicar** → `abierta`.

### RITMO DE CLASE (obligatorio)
1. **Nunca más de 2 slides seguidas de lectura/`info`**; cada `info` es corta (≤60 palabras) y lleva `ejemplo` + imagen del banco.
2. **Al menos 4 tipos de juego distintos** por clase (el auditor avisa si no). Máximo 2 slides seguidas del mismo tipo.
3. **Alternar el cuerpo**: un juego que *se toca* (enlazar, memoria, sopa) → uno de *pensar* (ordenar, cuadrícula, recta) → uno de *velocidad* (relámpago). No poner dos de velocidad.
4. **Curva de emoción**: abre con un juego fácil que dé éxito rápido; deja el más difícil para después del quiz; **cierra con `candado`** (o `relampago` + `final`) para terminar con recompensa.
5. **Receta de 11 slides** (adaptar): `intro` → `info` → `enlazar` → `relampago` → `quiz` → `memoria`/`cuadricula` → `ordenar` → `sopa` → `evalFinal` → `candado` → `final`. Para clases largas, repetir el patrón *info → juego → juego → quiz*.
6. **Misión narrativa**: la `intro` plantea una misión («arma tu computador», «salva la tienda») y cada juego avanza esa misión; el `candado`/`final` la cierra.
7. **Visual**: cada juego usa lenguaje claro y colores del banco; imágenes del banco (módulo 33) sin texto horneado; nunca personajes ni marcas de terceros.

### Prohibido
Juegos con reloj obligatorio sin interruptor; usar un juego para calificar; frases/`porQue` de más de 25 palabras; `relampago` con >12 frases o más de uno por clase; `sopa` con palabras de otra materia; repetir en una misma clase la misma respuesta correcta ≥4 veces seguidas.

### Cómo se prueba
`construir_clase.py` → `auditar_clase.py` (valida datos y variedad) → `puerta_de_calidad.py` en verde. El e2e (T10–T24) juega los 6 con clics reales: parejas, orden «x de n», cartas que se voltean, tiempo agotado del relámpago, palabras escondidas estables entre sesiones, código del candado y que la nota del quiz no cambia. Ejemplo completo: `plantilla/ejemplos/tec4_juegos_hardware.datos.json`.
