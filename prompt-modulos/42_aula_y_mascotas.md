## 🔴 PRIORIDAD 73 · ALTA — CONEXIÓN CON EL AULA, NOMBRE DEL ARCHIVO Y MASCOTAS (motor 34)

### 1. Conectar la clase con el Aula (hoja «Notas y avance»)
El repositorio de clases (`luiscaceres2586-lang/Clases`) tiene un servidor del Profe (`servidor/Code.gs`) y scripts compartidos (`recursos/js/aula-sync.js`, `aula-config.js`, `aula-contexto.js`). Para que una clase **generada con este motor** reporte avance y nota al docente, en `meta` se escribe:
```json
"meta": {"claseId":"semana6_tec4_p4","semana":6,"grado":4,"materia":"Tecnología e Informática","titulo":"…","dba":"…","aula":true,"aulaVersion":"20261110"}
```
- `aula:true` → `construir_clase.py` pone los 3 scripts como **primeras etiquetas del `<head>`** (`aula-sync.js` siempre primero) con ruta `../../recursos/js/` (cambiable con `aulaRecursos`). Sin `aula`, la clase es independiente (pruebas y uso suelto).
- El motor define solo `window.AULA_RESUMEN()` = `{materia, semana, avance 0-100, aciertos, preguntas, nota}`: es lo único que lee el servidor. `aula-sync.js` copia además **todo lo que la clase guarda en el navegador** (puntos de los juegos y respuestas `abierta`), siempre que el estado ocupe **menos de 30.000 caracteres** (la prueba lo verifica).
- **Identidad**: si el estudiante entró por la portada del Aula (sesión `aula_sesion_v1`), el motor usa **el nombre y el grupo de esa sesión**; solo si no hay sesión usa `?est=&grupo=`. Nunca se adivina el nombre desde otras claves del navegador (en una sala compartida mezclaría estudiantes).
- **Nombre del archivo = identidad de la clase en el servidor**: debe ser `semana<N>_<mat|tec><grado>_p<período>.html` (ej. `semana6_tec4_p4.html`) y vivir en `periodo-<N>/<área>-<grado>/`. El servidor saca de ahí el mundo del XP (`_mat5_`, `_tec4_`) y la barra de contexto. Pon el mismo texto en `meta.claseId`; el auditor avisa si no contiene `_mat<grado>_` o `_tec<grado>_`.
- No modifiques `Code.gs` ni los scripts del aula desde una clase. Si se necesita que el docente **lea** las respuestas abiertas en una hoja propia, eso es un cambio del servidor que se pide aparte.

### 2. Mascotas (regla de coherencia)
- **ARIA** (robot) es la mascota **dentro de las clases**. Hay dos versiones: la del pack original (`aria-*`, cabeza grande) y **ARIA v2** de cuerpo completo (`aria-v2-*`). **No mezcles las dos en una misma clase.**
- **Bolí** (ave azul con antena dorada, `boli-*`) es la mascota de la **portada y del índice**; no la uses dentro de una clase salvo que el docente lo pida.
- Para el perfil del estudiante hay 10 **avatares** de niñas y niños (`personajes/avatares`), y los íconos de juego (XP, racha, vida, acierto, error, meta, trofeo) están en `juego/` con estilo único.

### 3. Imágenes nuevas del repositorio de clases
`banco-imagenes/_herramientas/importaciones/recursos_clases/` importó 88 imágenes originales (personajes, avatares, íconos de juego, login, portada, períodos, grados e **íconos de área** `iconos/aritmetica` e `iconos/tecnologia`) y el **escudo del colegio en 520 px**. Se excluyó a propósito `legado/` (personajes antiguos en reemplazo). Para íconos sueltos (abaco, balanza, signo más, nube wifi, USB…) busca con `buscar_banco.py --cat iconos --alt`.

### Pruebas
`pruebas/prueba_aula_integracion.py` carga la clase en Chromium con los scripts **auténticos** del aula, una sesión falsa y un servidor simulado, y comprueba: pide el avance al abrir, envía `estadoGuardarLote` con clave `l.<archivo>`, resumen con `avance 100`, nombre real de la sesión, estado < 30.000 caracteres y cero errores de JavaScript. El e2e (T30) comprueba la identidad desde la sesión (y el respaldo con `?est=`), el contrato de `AULA_RESUMEN` y que una sesión dañada no rompe la clase.
