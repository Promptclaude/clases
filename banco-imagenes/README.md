# banco-imagenes — banco central de sprites y recursos visuales

Base de datos: **`banco.json`** (una entrada por imagen). Vistas rápidas en `vistas-previas/`.
Consulta: `python3 _herramientas/buscar_banco.py gema --cat juego --sin-texto`

## Carpetas
| Carpeta | Qué va |
|---|---|
| `personajes/aria/` | Mascota ARIA (poses de cuerpo y busto) |
| `personajes/npc/` | Personajes de apoyo: detective, obrero, corredor, niños… |
| `interfaz/` | Botones, barras, marcos, fondos de UI |
| `premios/` | Medallas, trofeos, coronas, cofres |
| `juego/` | Estrellas, monedas, gemas, vidas, íconos (PNG + SVG) |
| `escenarios/` | Fondos y escenas amplias sin texto |
| `tematicos/` | Por tema (`logos-redes-sociales/`, `por-clasificar/` → se mueve al tema al revisar) |
| `infografias/` | Tablas y esquemas reutilizables (vacía por ahora) |
| `_especificas/` | Imágenes **con texto horneado**: sirven solo en su clase |
| `_descartadas/` | `posible-ip-terceros/` (estilo Fortnite, Minecraft, Among Us, Word) y `baja-resolucion/` |

## Estados (`estado`)
`aprobada` lista para usar · `por_revisar` sin texto, falta que un humano la confirme y la mueva al tema · `especifica` solo en su clase · `uso_con_cuidado` marcas registradas (solo para identificar la red en clase) · `descartada` no usar.

## Campos principales
id · archivo · svg · categoria · subcategoria · uso · tags · ancho/alto · transparente · tiene_texto/texto (OCR) · calidad 1–5 (resolución + nitidez) · area/grado/semana de origen · usada_en · veces_usada · estado · motivo.

## Reglas para ampliar el banco
1. Extraer: `python3 _herramientas/extraer_todo.py` (adaptar rutas) → `construir_banco.py` clasifica y deduplica.
2. Nunca incluir personajes o logos de terceros como recurso de la clase (salvo `uso_con_cuidado`).
3. Preferir imágenes **sin texto** y con fondo transparente: son las reutilizables.
4. Toda imagen nueva entra por `banco.json` (sin entrada no existe).
