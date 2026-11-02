# assets-reutilizables — pack de imágenes para las clases

46 imágenes con **fondo transparente**, listas para usar en cualquier clase. Mira `vista-previa.png`.

## Cómo se usan
En la clase se escribe el **id** del manifiesto (`assets.json`), no una ruta:
```html
<img src="asset://aria-hola" alt="ARIA saluda" width="120">
<div style="background:url(asset://cofre) center/contain no-repeat"></div>
```
Y al terminar la clase se empaqueta (mete en el HTML **solo** las imágenes usadas; los íconos del kit van como SVG de 1–3 KB):
```
python3 tools/empaquetar_assets.py clase.html -o clase_final.html
```
Falla si un id no existe o si lo incrustado pasa de 1,5 MB. Con `--modo ruta` en vez de incrustar deja rutas relativas (hay que publicar la carpeta junto a la clase).

## Qué hay
| Carpeta | Contenido |
|---|---|
| `aria/` | Mascota ARIA: 5 de cuerpo completo y 8 de busto (con borde inferior desvanecido) |
| `premios/` | Medallas bronce/plata/oro, corona y trofeo (recortes limpiados) |
| `kit-juego/` | Elementos de juego **dibujados desde cero** (SVG + PNG): estrellas, moneda, gema, vidas, racha, escudo, candados, cofres, íconos ok/casi/pista, botones sin texto, cinta, barra de XP, globos, cohete, destello |

## Lista
| id | uso | tamaño |
|---|---|---|
| `medalla-bronce` | Medalla de bronce con laurel | 182×168 |
| `medalla-plata` | Medalla de plata con alas | 182×164 |
| `medalla-oro` | Medalla de oro con alas | 182×176 |
| `corona` | Corona dorada con rubíes | 182×172 |
| `trofeo` | Trofeo dorado con estrella | 182×165 |
| `aria-correcto` | Mascota ARIA (cuerpo) · ¡Correcto! | 408×389 |
| `aria-tu-puedes-saltando` | Mascota ARIA (cuerpo) · ¡Tú puedes! | 403×366 |
| `aria-sigues-aqui` | Mascota ARIA (cuerpo) · ¿Sigues aquí? ¿Necesitas algo de ayuda? | 423×332 |
| `aria-parece-dificil` | Mascota ARIA (cuerpo) · ¡Uy! Parece difícil… | 390×376 |
| `aria-nos-vemos` | Mascota ARIA (cuerpo) · ¡Nos vemos! | 403×361 |
| `aria-hola` | Mascota ARIA (busto) · ¡Hola! | 249×177 |
| `aria-genial` | Mascota ARIA (busto) · ¡Genial! | 254×179 |
| `aria-tu-puedes` | Mascota ARIA (busto) · ¡Tú puedes! | 259×153 |
| `aria-vamos` | Mascota ARIA (busto) · ¡Vamos! | 236×135 |
| `aria-listo` | Mascota ARIA (busto) · ¡Listo! | 250×134 |
| `aria-asi-se-hace` | Mascota ARIA (busto) · ¡Así se hace! | 249×151 |
| `aria-vamos-juntos` | Mascota ARIA (busto) · ¡Vamos juntos! | 222×155 |
| `aria-corazon` | Mascota ARIA (busto) · (sin texto) corazón | 207×178 |
| `estrella` | Estrella de puntuación | 256×256 |
| `estrella-vacia` | Estrella sin ganar | 256×256 |
| `moneda` | Moneda | 256×256 |
| `gema` | Gema | 256×256 |
| `corazon` | Vida (llena) | 256×256 |
| `corazon-vacio` | Vida gastada | 256×256 |
| `llama` | Racha | 256×256 |
| `escudo` | Escudo/insignia | 256×256 |
| `candado` | Bloqueado | 256×256 |
| `candado-abierto` | Desbloqueado | 256×256 |
| `cofre` | Cofre cerrado | 256×256 |
| `cofre-abierto` | Cofre abierto con premio | 256×256 |
| `ok` | Acierto | 256×256 |
| `casi` | Casi/otra vez | 256×256 |
| `pista` | Pista | 256×256 |
| `destello` | Brillo/partícula | 256×256 |
| `cohete` | Cohete (siguiente) | 256×256 |
| `boton-azul` | Botón sin texto: azul | 720×224 |
| `boton-verde` | Botón sin texto: verde | 720×224 |
| `boton-naranja` | Botón sin texto: naranja | 720×224 |
| `boton-violeta` | Botón sin texto: violeta | 720×224 |
| `boton-dorado` | Botón sin texto: dorado | 720×224 |
| `boton-rojo` | Botón sin texto: rojo | 720×224 |
| `cinta` | Cinta de título (sin texto) | 880×260 |
| `barra-xp-marco` | Marco de barra XP | 800×104 |
| `barra-xp-relleno` | Relleno de barra XP | 768×64 |
| `globo` | Globo de diálogo (sin texto) | 560×360 |
| `globo-pensar` | Globo de pensamiento | 560×380 |

## Qué se mejoró respecto a las imágenes originales
Las imágenes vivían **incrustadas en base64 dentro de cada clase** (69 por clase, 3 MB+ de imágenes y 4–9 MB por archivo), recortadas de láminas de stickers. Al sacarlas se encontró que:
- **Casi todas estaban mal recortadas:** traían **fragmentos de la imagen vecina** y un **halo blanco** en el contorno. Se limpiaron (se conserva solo el sujeto y sus partes pegadas, se corrige el color del borde y se recorta el espacio vacío).
- **18 de las 31 expresiones de ARIA y los botones de texto fijo estaban cortados por el borde de la lámina** (cabeza, globo o cuerpo incompletos). **No se pueden arreglar** sin la lámina original: no se incluyeron. Si me pasas las láminas sin recortar se recuperan.
- Los personajes y logos que **no son propios** (de videojuegos conocidos) **no se extrajeron**: el repositorio es público y esos derechos no son nuestros. Para ese estilo se usan ARIA y personajes originales (Prioridad 50 del prompt).
- El kit de juego es nuevo: bordes perfectos, escala sin pérdida y pesa casi nada.

## Para agregar imágenes nuevas
1. Déjalas en una carpeta (`assets-entrada/`), PNG o WebP **con transparencia**, el sujeto completo (que no toque el borde).
2. `python3 tools/limpiar_recortes.py assets-entrada salida --registrar assets-reutilizables/assets.json --categoria <carpeta>`
   - las **ok** pasan al pack y se registran en el manifiesto; las **cortadas** quedan en `salida/revisar/` indicando qué lado está cortado.
   - `--busto` desvanece el borde inferior de personajes de medio cuerpo.
3. Completa `uso` y `tags` del manifiesto.
Para rescatar las imágenes de una clase vieja: `python3 tools/extraer_imagenes_de_clase.py clase.html carpeta`.
