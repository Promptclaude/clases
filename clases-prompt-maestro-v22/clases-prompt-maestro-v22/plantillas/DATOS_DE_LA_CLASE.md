---
plantilla: DATOS_DE_LA_CLASE
---

# Datos de la clase — completar ANTES de generar (Prioridad 0)

> ⚠️ Este archivo contiene la clave del panel docente. **Recomendado: repositorio PRIVADO.** Si el repo va a ser público, cambia el valor por uno propio y mantenlo fuera de GitHub.

```
CLAVE_PANEL_DOCENTE = 5813645
```

Donde el prompt dice `{{CLAVE_PANEL_DOCENTE}}` en el código, se escribe el valor de arriba (entre comillas si es cadena).

```
SEMANA:               [NÚMERO]
MATERIA:              [Tecnología / Aritmética / Ciencias / Español / ...]
GRADO:                [4° / 5° / 3° / ...]
TEMA:                 [TÍTULO del tema]
OBJETIVO:             [Frase corta para el estudiante — qué aprenderá hoy]
TEMA_VISUAL:          [UNIVERSO]           ← debe ser DIFERENTE al usado en la última clase (ver abajo)
ULTIMOS_TEMAS_USADOS: [UNIVERSO clase n-1, UNIVERSO clase n-2]  ← para no repetir (Prioridad 0-F)
AVATAR_TEMA_ICONO: [emoji o ícono del avatar/ficha para el mapa de camino, acorde al TEMA_VISUAL — ej: 🧑‍🚀 para Minecraft/espacio, ⚽ para Fútbol]
ICONOS_CAMINO_TEMA: [lista de 3-5 emojis/íconos decorativos para las casillas del mapa de camino, acordes al TEMA_VISUAL]
AVATARES_TEMA: [lista de 3-4 emojis para que el estudiante elija su avatar — ej: ['⛏️','🧟','🐷','💎'] para Minecraft]
SORPRESAS_CARTA: [lista personalizable de mini-premios formativos de la carta sorpresa — mensajes, XP bonus, accesorios]
AUTOR_MATERIA_SIGLA:  [sigla]              ← ej: tech4 / arit5 / cien3
AUTOR_SEMANA_NUM:     [N]
INDEX_URL:     [ruta o URL relativa al index.html de la materia — ej: "./index.html" o "../index_tech4.html"]
CONCEPTOS_CLAVE: [
  "[Concepto 1]: [definición breve]",
  "[Concepto 2]: [definición breve]",
  "[Concepto 3]: [definición breve]",
  "[Concepto 4]: [definición breve]"
]
GLOSARIO_CLASE: [
  { termino: "[Término 1]", definicion: "[Definición breve en lenguaje simple]" },
  { termino: "[Término 2]", definicion: "[Definición breve en lenguaje simple]" },
  { termino: "[Término 3]", definicion: "[Definición breve en lenguaje simple]" }
]
ESTRUCTURA DE EVALUACIÓN (posiciones según la Prioridad 9 — fuente única):
  Quiz 1:           8 preguntas de opción múltiple  → slide 10
  Quiz 2:           8 preguntas de opción múltiple  → slide 15
  Evaluación Final: 14 preguntas de opción múltiple → slides 21-22
  Pantalla final:   slide 23
  TOTAL:            30 preguntas
  NOTA MÁXIMA:      5.0  (30/30 aciertos)
  NOTA APROBATORIA: 3.0  (18/30 aciertos = 60%)
  NOTA MÍNIMA:      0.0  (0/30 aciertos)
  NOTA OFICIAL:     la MEJOR de todos los intentos (8-U); un reintento nunca la baja
EJERCICIOS_PRACTICA (v7.3, slide 16 — 2 o 3 ejercicios, reemplaza al video): [
  { enunciado: "[Ejercicio 1 — mismo tipo que aparecerá en el quiz]", pasos: ["[Paso 1]","[Paso 2]"], resultado: "[Resultado]" },
  { enunciado: "[Ejercicio 2]", pasos: ["[Paso 1]","[Paso 2]"], resultado: "[Resultado]" }
]
EJERCICIOS_TALLER_EN_CLASE (4 o 5 EXACTOS, nunca más de 5 — v6.5, SIN placeholder porque no hay textarea): [
  { enunciado: "[Ejercicio 1 — sintetizado y breve]", slideEjemplo: [N] },
  { enunciado: "[Ejercicio 2 — sintetizado y breve]", slideEjemplo: [N] },
  { enunciado: "[Ejercicio 3 — sintetizado y breve]", slideEjemplo: [N] },
  { enunciado: "[Ejercicio 4 — sintetizado y breve]", slideEjemplo: [N] }
  // Opcional un 5to ejercicio si la complejidad del tema lo requiere — máximo 5
]
REFERENCIAS_CULTURALES: [
  "Free Fire / Fortnite",
  "Roblox / Among Us",
  "TikTok / YouTube",
  "[artista pop colombiano]",
  "[deporte / equipo colombiano]"
]
PREGUNTAS_ORALES_DOCENTE: [
  "[Pregunta 1]",
  "[Pregunta 2]",
  "[Pregunta 3]",
  "[Pregunta 4]",
  "[Pregunta 5]"
]
MENSAJES_DOCENTE (v6.2 — tono cálido, firmado como el profe): [
  "[Mensaje motivacional 1 — ej: '¡Vas muy bien! — Profe Luis']",
  "[Mensaje motivacional 2]",
  "[Mensaje motivacional 3]",
  "[Mensaje motivacional 4]"
]
CLAVE_DOCENTE: `CLAVE_PANEL_DOCENTE`  ← NO CAMBIAR (7 dígitos, teclado físico, zona invisible)
# ── v22: IDENTIDAD DE LA CLASE (única fuente; el código solo la lee de CLASE_CFG) ──
CLASE_CFG:            { curso: "[mat|tec]", grado: "[4|5]", periodo: "[1-4]", semana: [N] }   ← igual que CONFIG_CURSO del index (8-K)
# ── v22: NARRATIVA Y PERSONALIZACIÓN (Prioridades 34 a 34-D) ──
HISTORIA_SEMILLA:     { gancho: "[mensaje misterioso que llega al estudiante]", misterio: "[qué se resuelve al final, usando el tema]", objeto: "[objeto que se recupera]", tono: "misterio amable", cierre: "[frase final con {nombre}]" }
TITULOS_TEMA:         ["[título neutro 1]", "[título neutro 2]", "[título neutro 3]"]   ← sin género; ej. "Detective Decimal", "Cronometrista Estrella"
MUNDOS:               [ {id:1,nombre:"[La Pista]",icono:"[emoji]",slides:[1,9]}, {id:2,nombre:"[...]",slides:[10,15]}, {id:3,nombre:"[MUNDO SORPRESA: otro ambiente]",slides:[16,20]}, {id:4,nombre:"[La Gran Final]",slides:[21,23]} ]
PREGUNTAS_PERSONALES: ["[1 por mundo, sin nota; se reutiliza una vez en un ejemplo posterior]"]
# ── v22: MINIJUEGOS (Prioridad 35) — 3 de tipos distintos, distintos a los de la clase anterior ──
MINIJUEGOS:          [ {slide:8,  tipoMJ:"[carrera|puente|detective|parejas|manipulable|candados]", datos:"[MJ_DATA]"},
                       {slide:14, tipoMJ:"[...]", datos:"[...]"},
                       {slide:20, tipoMJ:"candados", datos:"[3 candados]"} ]
# ── v22: ECONOMÍA (Prioridades 36 a 36-D) ──
MONEDA:               { nombre: "[gemas / estrellas / esmeraldas…]", icono: "[emoji]" }
COSMETICOS_TIENDA:    ["[accesorio de avatar]", "[marco de perfil]", "[título nuevo]", "[efecto de celebración]"]
PISTAS_EN_QUIZ:       true      ← el docente puede apagarlo desde el Panel Docente
# ── v22: ARIA (Prioridades 37 a 37-C) ──
CLASE_KB:             conceptos, procedimientos, ejemplosParalelos (números DISTINTOS a la evaluación), erroresComunes y mapaPreguntas de las 30 preguntas (sin respuestas)
RESPALDO_IMG:         [emoji del tema para imágenes rotas — Prioridad 1-B]
INSTITUCION:  "IE Simón Bolívar"
CIUDAD:       "Cúcuta, Colombia"
MAX_VIDAS:    8         ← NO CAMBIAR
```
---
## ═══════════════════════════════════════
