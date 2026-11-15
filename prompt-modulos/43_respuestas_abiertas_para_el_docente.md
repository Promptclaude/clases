## 🔴 PRIORIDAD 74 · ALTA — RESPUESTAS ABIERTAS QUE EL DOCENTE REVISA (motor 34 + servidor)

Cuando la clase está conectada al Aula (`"aula": true`, Prioridad 73) y el servidor tiene instalado `servidor-propuesta/Abiertas.gs`, lo que el estudiante **guarda** en una slide `abierta` y la marca de «hice la hoja a mano» de `cuaderno` llegan a la hoja **«Respuestas abiertas»** del docente (una fila por pregunta; el docente marca ✅ Bien · 🟡 Mejorar · 🔴 Repetir y comenta). Solo se envía lo que el estudiante pulsó **«Guardar respuesta»** (nunca los borradores). Sin Aula, las respuestas solo quedan en el navegador.

### Cómo escribir preguntas abiertas que se puedan revisar
- **Hasta 4 preguntas por slide (≤ 280 caracteres) y máximo 12 respuestas abiertas + cuadernos por clase** (el auditor lo exige; el servidor no guarda más).
- Cada pregunta se contesta en **1 a 3 frases** (`minPalabras` entre 5 y 12) y pide **razonar, explicar o dar un ejemplo**, no repetir una definición.
- Pon en `ejemplo` **un modelo de buena respuesta**: es el criterio con el que el docente revisa y lo que el estudiante imita.
- **Nunca pidas datos personales** (nombre, dirección, teléfono, contraseñas, edad, fotos): las respuestas las lee el docente y quedan guardadas. El auditor avisa si lo detecta.
- Distribúyelas: 1 slide `abierta` con 2 preguntas hacia el final del contenido y 1 `cuaderno` al cierre es lo habitual.
- En el **informe final al docente** indica en qué slides hay respuestas abiertas, qué debería encontrar en cada una (criterio de revisión en 1 línea) y recuérdale la hoja «Respuestas abiertas».

### Nombre del archivo
`semana<N>_<mat|tec><grado>_p<período>.html` (Prioridad 73). El servidor identifica la clase por el nombre del archivo; si no coincide con el patrón, el XP y la hoja se agrupan mal.

### Pruebas
`pruebas/prueba_servidor_abiertas.js` ejecuta el `Code.gs` parcheado + `Abiertas.gs` reales en un simulador de Apps Script (30 comprobaciones: filas, revisión del docente que no se pierde, «🔄 Cambió», paquetes dañados, límites, respuestas que parecen fórmulas, privacidad y una **prueba cruzada** con la clase real). El e2e (T31) comprueba que la clase solo envía lo guardado y con el formato esperado.
