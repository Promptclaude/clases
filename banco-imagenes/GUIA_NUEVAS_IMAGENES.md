# Cómo ampliar el banco con imágenes nuevas

## Qué se puede y qué no (entorno de Claude)
| Acción | ¿Se puede? |
|---|---|
| Que me **subas** imágenes o láminas al chat (PNG, JPG, WebP) y yo quite el fondo, separe cada figura, recorte, revise y registre en el banco | ✅ **Sí — es el camino recomendado** |
| Capturas de pantalla que tú tomes y subas | ✅ Sí (ver nota de derechos) |
| Dibujar imágenes originales en **SVG** (matemáticas, íconos, figuras, esquemas) | ✅ Sí, quedan perfectas y casi no pesan |
| Mostrarte opciones con la búsqueda de imágenes del chat | ⚠️ Solo para que las veas; **no** puedo descargarlas al banco |
| Descargar yo de Pixabay, Freepik, Google Imágenes, etc. | ❌ Mi entorno solo llega a GitHub y a repositorios de paquetes. (Si quieres, en Ajustes de Claude se pueden permitir más dominios, pero sigue valiendo la nota de derechos.) |

**Derechos:** el banco debe ser 100 % tuyo u original. No subas capturas de juegos, series, marcas ni personajes de otros; el empaquetador ya bloquea lo `descartada`. Si usas bancos externos, que sean de licencia **CC0 / dominio público** (por ejemplo kenney.nl, openclipart, OpenGameArt filtrado por CC0) y anota la fuente en `--uso`.

## Receta para pedir imágenes a tu generador de IA (la que mejor funciona)
1. **Fondo liso y uniforme, verde `#00B140`** (o blanco puro). Con fondo liso el recorte automático es casi perfecto (0,99 de 1,0 en mis pruebas); con fondos complejos baja a 0,93.
2. **Una lámina por tema**: 3 × 3 figuras, **separadas por bastante espacio** (que no se toquen ni se corten en los bordes de la lámina).
3. **Sin texto** dentro de la imagen (el texto lo pone la clase) y sin marcas ni personajes conocidos.
4. **Mismo estilo** en toda la serie (cuenta cuál usaste: «estilo ARIA: 3D suave, ojos azules, fondo verde»).
5. Calidad: lámina de al menos 2048 px de ancho (cada figura ≥ 400 px).
Plantilla: *«Lámina de 9 ilustraciones separadas, estilo [ESTILO], sobre fondo verde liso #00B140, mucho espacio entre figuras, ninguna cortada, sin texto: [LISTA DE 9 FIGURAS]».*

## Flujo cuando me subes una lámina
```
python3 _herramientas/agregar_al_banco.py lamina.png --lamina --cat personajes/aria --prefijo aria-emocion \
        --tags aria,pose --uso "ARIA con emociones" [--aprobar]
```
Hace: quitar fondo → separar figuras → limpiar restos → recortar → medir calidad, texto y cortes → evitar duplicados → guardar y registrar en `banco.json` → hoja de revisión `vistas-previas/nuevas-<prefijo>.png`. Lo cortado por el borde de la lámina va a `_descartadas/recortes-cortados`; lo que trae texto, a `_especificas`.

## Herramientas
`quitar_fondo.py` (fondo y recorte; `--lamina` separa figuras) · `agregar_al_banco.py` (todo el flujo) · `reparar_recortes.py` (quita restos de figuras vecinas; deja los originales en `_originales/`) · `medir_recortes.py` · `generar_kit_matematicas.py` (SVG originales) · `buscar_banco.py`.

## Lo que más falta (prioridad)
1. **ARIA**: 14 poses cortadas que hay que regenerar (durmiendo, triste, molesta, pensando…).
2. **Tecnología**: contraseñas, redes/wifi, nube, partes del computador sin recorte, correo, buscadores, Word/Excel/PowerPoint (íconos propios, sin logos de Microsoft).
3. **Escenarios** limpios: aula, laboratorio de informática, tienda, parque, ciudad, espacio.
4. **Personajes de apoyo** (niñas y niños de varias edades) en poses neutras.
5. **Ciencias y lenguaje** si vas a ampliar materias.
Matemáticas básicas ya están cubiertas con el kit SVG (fracciones, base 10, figuras, dinero).
