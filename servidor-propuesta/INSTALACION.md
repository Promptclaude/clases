# Instalar «Respuestas abiertas» en tu servidor del Aula (15 minutos)

**Qué logras:** una hoja nueva, **«Respuestas abiertas»**, donde ves lo que escribieron tus estudiantes en las preguntas abiertas
(y quién marcó que entregó el cuaderno), con un menú para marcar **✅ Bien · 🟡 Mejorar · 🔴 Repetir** y una columna para tu comentario.
**Qué NO cambia:** las notas, el XP, la liga, los PIN y `aula-sync.js` siguen exactamente igual. Son 6 líneas nuevas en `Code.gs` y un archivo nuevo.

> Hazlo cuando no haya estudiantes conectados (por ejemplo un sábado). Si algo sale mal, se revierte en 2 minutos (al final).

## Antes de empezar
1. Abre la hoja de cálculo del Aula → **Extensiones → Apps Script**.
2. **Respaldo:** abre `Code.gs`, selecciona todo (Ctrl+A), copia (Ctrl+C) y pégalo en un archivo de texto en tu computador: `Code.gs.respaldo.txt`.

## Paso 1 — Agregar el archivo nuevo
1. En el editor de Apps Script, junto a «Archivos», pulsa **＋ → Script**. Ponle de nombre **`Abiertas`**.
2. Borra lo que trae y pega TODO el contenido de `servidor-propuesta/Abiertas.gs`. Guarda (Ctrl+S).

## Paso 2 — Los 6 cambios en `Code.gs`
**Camino fácil:** si no has cambiado `Code.gs` desde que yo lo leí, abre `servidor-propuesta/Code.gs.con-cambios`, copia todo y pégalo reemplazando el contenido de `Code.gs`. Guarda.
**Camino seguro:** si tu `Code.gs` ya es distinto, aplica a mano las líneas marcadas con `+` en `CAMBIOS_Code.gs.diff` (son 5 puntos, una a dos líneas cada uno), o ejecútame `python3 aplicar_parche.py Code.gs`, que te avisa si algún punto cambió.

## Paso 3 — Crear la hoja
1. En la barra superior del editor elige la función **`asegurarHojaAbiertas`** y pulsa **▶ Ejecutar**. La primera vez pide permisos: acéptalos (es tu propio proyecto).
2. Vuelve a la hoja de cálculo: aparece una pestaña nueva **«Respuestas abiertas»** (con filtros, menú de Revisión y columnas ya resaltadas).

## Paso 4 — Publicar los cambios (este paso es el que más se olvida)
En Apps Script: **Implementar → Administrar implementaciones → ✏️ Editar → Versión: «Nueva versión» → Implementar.**
La dirección `/exec` NO cambia, así que no tienes que tocar nada en las clases. Si no publicas una versión nueva, el servidor sigue ejecutando la anterior.

## Paso 5 — Probar
1. Abre una clase hecha con el motor 34 o superior (con `"aula": true` y una slide `abierta`) entrando como un estudiante de prueba.
2. Escribe una respuesta y pulsa **«Guardar respuesta»**. Espera ~15 segundos (el aula envía por lotes) o cierra la pestaña.
3. En la hoja **«Respuestas abiertas»** debe aparecer la fila. Recarga la hoja una vez para ver el menú **🎮 Aula Gamificada → 📝 Ir a las respuestas abiertas / Respuestas por revisar**.

## Cómo la usas
- **Filtros** en la fila de títulos: por grupo, por clase, por estudiante o por **Revisión vacía** (lo que falta revisar).
- Columna **Revisión** (menú) y **Comentario del docente**: son tuyas; el servidor nunca las borra.
- Si el estudiante **cambia** una respuesta que ya revisaste, la fila pasa a **🔄 Cambió** y tu comentario se conserva.
- Las filas **📓** indican quién marcó «hice la hoja a mano»: sirve para saber quién entrega el cuaderno.
- Al eliminar un perfil o usar «Empezar de cero», sus respuestas se borran también.

## Si algo sale mal (volver atrás)
Pega tu `Code.gs.respaldo.txt` sobre `Code.gs`, borra el archivo `Abiertas`, y publica **Nueva versión** (Paso 4). La pestaña «Respuestas abiertas» puede quedar o borrarse; no afecta nada. El progreso de los estudiantes no se toca nunca: aunque `Abiertas.gs` falle, el servidor lo guarda igual.

## Privacidad
Las respuestas quedan solo en tu hoja de cálculo (la misma de «Notas y avance»); no se envían a ningún otro servicio. El auditor de clases avisa si una pregunta pide datos personales. Recomendación: no pedir nombres, direcciones, teléfonos ni fotos en preguntas abiertas.
