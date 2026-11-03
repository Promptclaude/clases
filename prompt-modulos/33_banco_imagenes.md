## MÓDULO 33 — BANCO DE IMÁGENES (usar ANTES de generar o pedir cualquier imagen)

1. Antes de crear una clase, lista los recursos visuales que necesita (personaje, fondo, premios, íconos, tema).
2. Consulta `banco-imagenes/banco.json` (o `python3 banco-imagenes/_herramientas/buscar_banco.py <palabras> --sin-texto`).
3. Usa solo `estado: aprobada` o `por_revisar`, `tiene_texto: false` y `calidad >= 4`. Nunca `descartada`, `especifica` ni `uso_con_cuidado` (esta última solo si el tema es redes sociales).
4. Referencia por id: `<img src="asset://id">` y empaqueta con `empaquetar_assets.py`.
5. Si falta un recurso, créalo ORIGINAL (SVG propio o ilustración nueva), sin imitar personajes o marcas de terceros (Minecraft, Among Us, Fortnite, Mario, etc.), regístralo en `banco.json` y repórtalo al final como "recursos nuevos".
6. Consistencia: mismos personajes (ARIA y NPC aprobados) en todas las clases de una misma materia.
