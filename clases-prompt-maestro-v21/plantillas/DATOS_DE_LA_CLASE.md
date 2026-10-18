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
ESTRUCTURA DE EVALUACIÓN:
  Quiz 1:           8 preguntas de opción múltiple  → slides 9-10
  Quiz 2:           8 preguntas de opción múltiple  → slides 14-15
  Evaluación Final: 14 preguntas de opción múltiple → slides 23-24
  TOTAL:            30 preguntas
  NOTA MÁXIMA:      5.0  (30/30 aciertos)
  NOTA APROBATORIA: 3.0  (18/30 aciertos = 60%)
  NOTA MÍNIMA:      0.0  (0/30 aciertos)
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
INSTITUCION:  "IE Simón Bolívar"
CIUDAD:       "Cúcuta, Colombia"
MAX_VIDAS:    8         ← NO CAMBIAR
```
---
## ═══════════════════════════════════════
