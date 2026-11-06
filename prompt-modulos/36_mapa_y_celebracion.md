## 🔴 PRIORIDAD 67 · ALTA — MAPA DE MISIÓN Y FINAL DE CELEBRACIÓN (motor 29)

Dos detalles que hacen que la clase se sienta como una app profesional. El motor los pinta solo; tú solo aportas **datos**.

### 1. Bienvenida y pestaña siempre de ESTA clase
El título de la pantalla de bienvenida y de la pestaña del navegador salen de `meta.titulo`, `meta.materia`, `meta.grado` y `meta.semana` (`construir_clase.py` los inserta). **Nunca** escribir a mano el título en el HTML. El auditor da error si la bienvenida no coincide con `meta.titulo`.

### 2. Mapa de misión (automático)
Bajo la barra de avance aparece una ruta con un nodo por slide: ✔ lo que ya pasó, el ícono del juego en el que estás (resaltado) y los íconos de lo que viene. El estudiante **ve qué juegos le esperan** y siente que recorre un mapa. Solo informa: no permite saltar slides. Por eso conviene que la clase tenga **buena variedad de íconos** (Prioridad 66).

### 3. Pantalla final de celebración (campos de la slide `final`)
La slide `final` muestra: ARIA celebrando, **medalla** (oro ≥ 4,5 · plata ≥ 3,5 · bronce en los demás casos: **nadie se va con las manos vacías**), ⭐ (1 a 3), juegos completados, XP y nivel, y una **insignia imprimible** con el nombre del estudiante, la clase y la fecha.
Campos que SÍ debes escribir en la slide `final`:
- `aprendiste`: **3 logros** (1 a 4, máximo 20 palabras cada uno) redactados en 2.ª persona y verbos de logro: «Diferencias el hardware del software». Se muestran como «🧠 Lo que lograste hoy». Si falta, el auditor avisa.
- `siguiente` (opcional): una frase que anticipa la próxima clase («Sumaremos y restaremos decimales en la tienda escolar») para generar curiosidad.

Ejemplo:
```json
{"id":"s11","type":"final","titulo":"¡Misión cumplida!",
 "aprendiste":["Lees y escribes decimales con décimas y centésimas.","Ubicas decimales en la recta numérica.","Comparas y ordenas decimales con seguridad."],
 "siguiente":"Sumaremos y restaremos decimales en la tienda escolar."}
```

### Pruebas
El e2e (T25) verifica que la bienvenida y la pestaña son de la clase, que el mapa tiene un nodo por slide y avanza, que el final muestra medalla empaquetada (sin internet), ≥ 1 estrella, juegos contados, insignia con el nombre y los logros.
