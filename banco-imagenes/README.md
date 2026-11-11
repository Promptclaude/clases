# banco-imagenes — banco central de sprites y recursos visuales

Base de datos: **`banco.json`** (505 imágenes). Vistas rápidas por carpeta en `vistas-previas/`.
Consulta: `python3 _herramientas/buscar_banco.py gema --cat juego --sin-texto` · Uso en clases: `asset://id` (ver módulo 33 del prompt).

## Carpetas (todas revisadas una a una)
| Carpeta | Contenido |
|---|---|
| `personajes/aria/` | Mascota ARIA: poses de cuerpo y busto (34, todas limpias) |
| `personajes/avatares/` | Avatares de perfil para el login (10) |
| `personajes/npc/` | Personajes de apoyo: detective, obrero, corredor, niños, mascota candado… (16) |
| `interfaz/botones/` · `banners/` · `barras-y-marcos/` · `insignias/` | Botones, títulos, marcos, selectores, insignias de curso |
| `premios/` | Trofeos, medallas, coronas, "misión completada" |
| `juego/` | Estrellas, monedas, gemas, vidas, cofres… (PNG + SVG) |
| `escenarios/` | `espacio/` · `colegio/` · `ciudad-digital/` |
| `tematicos/` (nuevos temas) | `decimales` (30+), `dinero`, `medidas`, `razones`, `fracciones`, `detectives`, `trabajo-escrito` · Tecnología: `internet`, `seguridad-digital`, `documentos-word`, `verificar-informacion`, `historia-internet` |
| `institucional/` | Escudo del colegio (520 × 630 px) |
| `personajes/aria-v2/` · `personajes/boli/` | ARIA v2 de cuerpo completo (7) y **Bolí**, mascota de la portada (21 poses). ARIA = dentro de las clases; Bolí = portada e índice |
| `iconos/aritmetica/` · `iconos/tecnologia/` | Íconos de área (ábaco, balanza, calculadora, signos, USB, nube wifi, chip…) |
| `interfaz/login/` · `portada/` · `periodos/` · `estado/` · `insignias/` | Candados, gafete, PIN; cohete y portal; períodos 1–4; en línea / sin internet; grados 4 y 5 |
| `matematicas/` | **Kit SVG original** (64): fracciones (círculos y barras, vacías y pintadas), bloques base 10, figuras geométricas, monedas y billetes genéricos |
| `infografias/` | Tabla con columna/celda/fila (y futuras) |
| `tematicos/` | `decimales/` · `dinero/` (tienda, precios) · `detectives/` · `fabrica/` · `internet/` · `seguridad-digital/` · `logos-redes-sociales/` |
| `_especificas/` | Imágenes con texto de una clase concreta (250): solo sirven allí |
| `_descartadas/` | `posible-ip-terceros/` (estilo Fortnite, Minecraft, Among Us, logo Word), `baja-resolucion/` y `recortes-cortados/` (14 poses de ARIA cortadas por el borde de la lámina original; hay que regenerarlas) |

## Estados (`estado`)
`aprobada` (184) lista para usar · `por_limpiar` (0) · `uso_con_cuidado` (9) marcas registradas, solo para identificar una red en clase de internet · `especifica` (250) solo en su clase · `descartada` (62) el empaquetador la bloquea.

## Catálogo visual
**[CATALOGO.md](CATALOGO.md)** — una página por tema con miniaturas, id, qué contiene cada imagen, `alt` y grado (se ve en GitHub). Se regenera con `python3 _herramientas/generar_catalogo.py`.

## Campos de `banco.json`
id · archivo · svg · categoria · subcategoria · uso · tags · ancho/alto · transparente · tiene_texto/texto (OCR) · calidad 1–5 · nota/motivo · area/grado/semana de origen · usada_en · veces_usada · estado.

## Herramientas nuevas
Ver `GUIA_NUEVAS_IMAGENES.md`: cómo pedirme imágenes, qué puedo y qué no puedo hacer, receta para tu generador de IA (fondo verde liso) y lista de lo que más falta. `_originales/` guarda las imágenes antes de limpiar restos (reversible).

## Recortes
`_herramientas/medir_recortes.py` marca en `banco.json` el campo `recorte` (lados del lienzo que tocan la imagen) en personajes e ilustraciones: casi siempre es un recorte de una lámina. `buscar_banco.py --sin-recorte` las excluye y el empaquetador avisa al usarlas. Las de interfaz y los avatares circulares no se marcan (ocupan el lienzo por diseño).

## Reglas
1. Preferir imágenes sin texto y con fondo transparente: son las reutilizables.
2. Nunca personajes ni logos de terceros como recurso de clase (salvo `uso_con_cuidado`).
3. Toda imagen nueva entra por `banco.json`; sin entrada no existe.
4. Para ampliar: `_herramientas/extraer_todo.py` → `construir_banco.py` (clasifica y deduplica) y revisar las vistas previas.

## Metadatos de las imágenes importadas de «Proceso de subir de grado»
`descripcion` (qué contiene, 1 frase) · `alt` (texto alternativo listo para usar) · `tags` · `materia` y `grados` (aritmetica/tecnologia, 4.° y 5.°) · `texto` (lo que dice la imagen, por OCR) · `texto_es_contenido` (el texto ES el concepto: reutilizable en clases del tema) · `usada_en_origen` (slides donde se usaba) · `recorte_verificado` (revisada a ojo: está completa).
La importación es reproducible: `_herramientas/importaciones/proceso_subir_de_grado/`.

## Importaciones
- `_herramientas/importaciones/proceso_subir_de_grado/` — 165 imágenes de los documentos «Proceso de subir de grado».
- `_herramientas/importaciones/recursos_clases/` — 88 imágenes + escudo de `Clases/recursos/imagenes` (WebP sin pérdida, estilo «sticker» consistente).
