# Guía rápida para generar una clase con Claude

Pensada para el docente: no hace falta saber programar para pedir la clase. Solo el último paso (verificar) necesita Python.

## 1. Trae el prompt
Descarga **`prompt_armado.md`** de este repositorio (botón *Raw* → copiar todo, o *Download*). Ya trae todo lo necesario: las reglas, los tipos de actividad y el formato de datos. Se mantiene al día solo (una prueba automática lo exige).

## 2. Pégalo como primer mensaje
Abre un chat nuevo con Claude y **pega el contenido completo** como primer mensaje. Mejor así que adjuntarlo como archivo de conocimiento de un Proyecto: esos archivos se consultan por fragmentos y no se leen enteros.

## 3. Comprueba que lo leyó
La primera respuesta de Claude debe empezar con un bloque de 4 líneas:

```
LECTURA: núcleo ✔ · módulos incluidos: 33 … 44 · tarjeta final ✔
Tipos de slide disponibles: …
Reglas críticas que más pesan en esta clase: …
Datos que me faltan: …
```

- Debe nombrar los módulos 33 a 44 y la lista de tipos. Si dice que el prompt llegó **cortado**, pégalo de nuevo.
- Si no aparece el bloque, escribe: «Empieza con el bloque LECTURA».

## 4. Pide la clase
Responde con estos datos (copia y completa):

```
Materia:
Grado:
Período:            Semana:
Tema:
DBA:
¿Conectada al Aula? (sí / no)
Imágenes que quiero usar o evitar (opcional):
Premio real para quien abra los 5 cofres (opcional; algo que tú puedas dar, p. ej. elegir la canción de inicio, ser tu ayudante del día, un sticker):
```

## 5. Qué recibes
Una clase completa son **25 a 32 pantallas** (unas 2 horas), en 3 ciclos: explicar con un ejemplo resuelto → practicar juntos (sin nota) → juego → quiz. Antes del primer quiz el estudiante explica con sus palabras. **Nadie se bloquea por equivocarse**: cada error trae su explicación, pista y otra oportunidad. Si recibes una clase corta, pide: «Alárgala a 25 slides con más ciclos de explicación y práctica».

- **Si el chat puede ejecutar herramientas:** la clase construida y verificada, con su informe de entrega.
- **Si no puede (lo más común):** un único bloque `datos.json` y dos comandos. El informe dirá **«NO VERIFICADO»**, y es normal.

Para verificar tú (o quien administra el repositorio):
1. Guarda el bloque como `datos.json`.
2. `python3 tools/construir_clase.py plantilla/clase_referencia.src.html --datos datos.json -o semanaN_xxx.html`
3. `python3 tools/puerta_de_calidad.py semanaN_xxx.html`
   - 🟢 **VERDE** → lista para el siguiente paso.
   - 🔴 **ROJO** → pega a Claude el informe de la puerta y pídele que corrija **los datos**; repite.

## Monedas y cofres (la práctica sin nota también vale)
Cada actividad sin nota da **🪙 monedas** al terminarla: 10 si la acierta, 5 si solo la intenta, 2 si pide ayuda. Una barra dorada arriba se llena y abre **5 cofres** (con aviso y confeti); el último abre **el premio que tú definas**. En la pantalla final y en la insignia imprimible aparecen las monedas, los cofres y el premio para que el estudiante te lo muestre. Los quizzes no dan monedas (su recompensa es la nota), y las monedas **nunca** cambian la nota ni bloquean nada. Cada clase empieza en cero.

## Cómo se ve la clase
Cada pantalla trae una **cinta de color** (🧠 Aprende, 🤝 Lo hacemos juntos, 💪 Ahora tú, 🎮 ¡A jugar!, 🧪 Comprueba…) para que el estudiante sepa en qué parte va, y cada clase puede tener su **tema de color** (espacio, océano, bosque, volcán, dulce o desierto) para que no se vean todas iguales. Pide uno que combine con la historia y distinto al de la clase anterior. En celular, la ayuda «Cómo se juega» se abre sola la primera vez de cada actividad y después queda en una línea.

## 6. Antes de usarla con estudiantes
- Ábrela una vez en un equipo del laboratorio: es lo único que las pruebas no cubren (cómo se ve y qué tan rápido va).
- Lee las cuentas y las respuestas correctas: la puerta recalcula las operaciones, pero la revisión pedagógica es tuya.
- Si la clase tiene **respuestas abiertas**, Claude te dice en qué slides están y qué debería encontrar en cada una. Aparecen en la hoja «Respuestas abiertas» del Aula.
- **Nunca** pidas a los estudiantes datos personales en una respuesta abierta (nombre, dirección, teléfono, contraseñas reales).

## Si algo no funciona
| Síntoma | Qué hacer |
|---|---|
| Claude no muestra el bloque LECTURA | Pide «Empieza con el bloque LECTURA» o pega el prompt otra vez |
| Usa un tipo de actividad que no existe | Pide que use solo los tipos de la lista que él mismo mostró |
| No hay imagen para el tema | Es esperable: debe reportarla como «imagen faltante», no inventarla |
| Quieres cambiar los colores de una clase | Hoy los define la plantilla; es un cambio de herramienta, no de datos |
