# banco-imagenes — banco central de sprites y recursos visuales

Base de datos: **`banco.json`** (505 imágenes). Vistas rápidas por carpeta en `vistas-previas/`.
Consulta: `python3 _herramientas/buscar_banco.py gema --cat juego --sin-texto` · Uso en clases: `asset://id` (ver módulo 33 del prompt).

## Carpetas (todas revisadas una a una)
| Carpeta | Contenido |
|---|---|
| `personajes/aria/` | Mascota ARIA: poses de cuerpo y busto (48) |
| `personajes/avatares/` | Avatares de perfil para el login (10) |
| `personajes/npc/` | Personajes de apoyo: detective, obrero, corredor, niños, mascota candado… (16) |
| `interfaz/botones/` · `banners/` · `barras-y-marcos/` · `insignias/` | Botones, títulos, marcos, selectores, insignias de curso |
| `premios/` | Trofeos, medallas, coronas, "misión completada" |
| `juego/` | Estrellas, monedas, gemas, vidas, cofres… (PNG + SVG) |
| `escenarios/` | `espacio/` · `colegio/` · `ciudad-digital/` |
| `infografias/` | Tabla con columna/celda/fila (y futuras) |
| `tematicos/` | `decimales/` · `dinero/` (tienda, precios) · `detectives/` · `fabrica/` · `internet/` · `seguridad-digital/` · `logos-redes-sociales/` |
| `_especificas/` | Imágenes con texto de una clase concreta (250): solo sirven allí |
| `_descartadas/` | `posible-ip-terceros/` (estilo Fortnite, Minecraft, Among Us, logo Word) y `baja-resolucion/` |

## Estados (`estado`)
`aprobada` (181) lista para usar · `por_limpiar` (17) poses de ARIA con restos del recorte, pasar por `tools/limpiar_recortes.py` · `uso_con_cuidado` (9) marcas registradas, solo para identificar una red en clase de internet · `especifica` (250) solo en su clase · `descartada` (48) el empaquetador la bloquea.

## Campos de `banco.json`
id · archivo · svg · categoria · subcategoria · uso · tags · ancho/alto · transparente · tiene_texto/texto (OCR) · calidad 1–5 · nota/motivo · area/grado/semana de origen · usada_en · veces_usada · estado.

## Reglas
1. Preferir imágenes sin texto y con fondo transparente: son las reutilizables.
2. Nunca personajes ni logos de terceros como recurso de clase (salvo `uso_con_cuidado`).
3. Toda imagen nueva entra por `banco.json`; sin entrada no existe.
4. Para ampliar: `_herramientas/extraer_todo.py` → `construir_banco.py` (clasifica y deduplica) y revisar las vistas previas.
