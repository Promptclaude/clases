## 🔴 PRIORIDAD 68 · ALTA — MODO JUEGO (motor 37): clima, racha, jefe final y modo ahorro

Estas piezas vienen del juego de las tablas y las pinta **el motor solo**. No escribas código para ellas ni agregues campos nuevos: solo conviene que sepas qué verá el estudiante.

- **Fondo ilustrado del tema** (`meta.tema`): montañas del juego en el borde inferior y en la bienvenida; el constructor incrusta solo la de esa clase. Con tema, la clase pesa ≈80 KB más.
- **Clima del tema** (`meta.tema`): partículas suaves detrás de la tarjeta (espacio ✦, océano burbujas, bosque luciérnagas, volcán brasas, dulce confeti, desierto arena). Elige el tema que acompañe la historia de la clase (Prioridad 66); sin `meta.tema` no hay clima.
- **Racha 🔥**: con 2 o más aciertos seguidos aparece «Racha ×N»; con 3 o más la tarjeta se ilumina. Un fallo («casi») reinicia sin castigo. No cambia nota, XP ni lo guardado.
- **Jefe final**: la slide `evalFinal` muestra «👑 JEFE FINAL» con una barra de vida que baja con cada pregunta acertada y una entrada dramática la primera vez. Nómbrala y redáctala como un reto, no como un examen («Reto final de la tienda»). Si la clase no tiene `evalFinal`, no hay jefe.
- **Portal** de color del tema al cambiar de pantalla, **chispas** al tocar y «Siguiente» que late 3 veces cuando se habilita.
- **Modo ahorro automático**: en equipos lentos o con «reducir movimiento» todo lo decorativo se apaga y la clase funciona igual. Para probar: `?fx=low` (ahorro), `?fx=high` (completo), `?fx=auto`.

### Reglas para quien genera la clase
1. **No** inventes efectos propios (partículas, sonidos, animaciones) en el HTML: todo evento de juego pasa por `Juego.evento(...)` (Prioridad 52) y el motor ya lo conecta.
2. **No** uses `localStorage` directo: solo `almacen()`.
3. Nada de esto puede ser la única forma de enterarse de algo: el texto de la clase debe bastar sin efectos.

### Pruebas
El e2e (T37) comprueba: clima y fondo ilustrado por tema (incrustado, sin internet), capas sin captura de toques, racha ×3 y reinicio, jefe con toda su vida al entrar y derrotado al acertar todo, nada de esto cambia nota/aciertos/XP, modo ahorro y «reducir movimiento» sin clima, y cero errores de JavaScript.
