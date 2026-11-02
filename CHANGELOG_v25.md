# v24 → v25 — Experiencia visual de videojuego + pack de imágenes reutilizable

**Prompt:** `Prompt_Maestro_Clases_v25_COMPLETO.md` (módulo nuevo 31, prioridades 50–57; las v22–v24 se conservan intactas).
**Nuevo en el repositorio:** `assets-reutilizables/` (46 imágenes + manifiesto), `tools/` (3 herramientas), `prompt-modulos/` (módulos 29, 30, 31 sueltos), `pruebas/` (motor de efectos y su prueba).

## Qué trae el módulo 31
| Prioridad | Norma |
|---|---|
| 50 | Dirección de arte unificada y **solo personajes/imágenes propios** (ARIA + originales; nada de marcas de terceros) |
| 51 | Intro en 3 tiempos (≤ 4 s, «Presiona para empezar»), portada con misión y recompensas, zonas y transiciones |
| 52 | **Motor central `Juego`**: todo efecto sale de un solo lugar; fallo suave (sin rojo ni sacudida), reduce-motion, sin sonido, máx. 3 efectos simultáneos, sonidos sintetizados (0 KB) |
| 53 | XP de esfuerzo, niveles, monedas, cofres, tienda cosmética, racha con día de gracia, jefe final **solo de presentación** |
| 54 | Portal «Aula Gamificada», liga por **XP de esfuerzo** con apodos (nunca por nota, sin lista de últimos), carrera de grupos |
| 55 | ARIA expresiva: mapa momento → imagen, 1 reacción cada 8 s |
| 56 | Pipeline del pack: limpiar recortes, detectar cortados, empaquetar solo lo usado (≤ 1,5 MB) |
| 57 | Medidor visual (0–20) y cómo adaptar clases existentes |

## Hallazgos sobre las imágenes de las clases actuales
- Cada clase incrusta ~69 imágenes en base64 (3 MB+); los archivos pesan 4–9 MB y las imágenes se repiten entre clases.
- Casi todos los recortes traían **fragmentos de la imagen vecina y halo blanco**; 18 de 31 expresiones de ARIA y los botones con texto fijo están **cortados por el borde** de la lámina (no recuperables sin el original).
- Hay personajes y logos de videojuegos de terceros en las infografías y en varios recortes: **no se extrajeron** (repositorio público, derechos ajenos).

## Verificado y no verificado
✅ Lógica del motor de efectos (14 comprobaciones), herramientas de limpieza/empaquetado/extracción probadas con archivos reales, inspección visual del pack.
⚠️ Sin verificar: apariencia y rendimiento de una clase v25 completa en navegador y en los equipos del laboratorio (hay que generar y recorrer la primera).
