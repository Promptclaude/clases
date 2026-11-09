## MÓDULO 33 — BANCO DE IMÁGENES (usar ANTES de generar o pedir cualquier imagen)

1. Antes de crear una clase, lista los recursos visuales que necesita (personaje, fondo, premios, íconos, tema).
2. Consulta `banco-imagenes/banco.json` (o `python3 banco-imagenes/_herramientas/buscar_banco.py <palabras> --sin-texto`).
3. Usa solo `estado: aprobada` o `por_revisar` y `calidad >= 4`. Nunca `descartada`, `especifica` ni `uso_con_cuidado` (esta última solo si el tema es redes sociales). Si `tiene_texto: true`, úsala SOLO cuando `texto_es_contenido: true` (el texto es el contenido del concepto, como «0,25» o «Antivirus») y **léelo**: los números y rótulos de la imagen deben ser correctos para tu clase y para el grado. Busca por lo que CONTIENE: `python3 banco-imagenes/_herramientas/buscar_banco.py <palabras> --materia aritmetica --grado 5 --alt` (busca en descripción, texto de la imagen, etiquetas y la slide de origen) o navega `banco-imagenes/CATALOGO.md`. Copia el campo `alt` del banco como texto alternativo de la imagen.
4. Referencia por id: `<img src="asset://id">` y empaqueta con `empaquetar_assets.py`.
5. Si falta un recurso, créalo ORIGINAL (SVG propio o ilustración nueva), sin imitar personajes o marcas de terceros (Minecraft, Among Us, Fortnite, Mario, etc.), regístralo en `banco.json` y repórtalo al final como "recursos nuevos".
6. Consistencia: mismos personajes (ARIA y NPC aprobados) en todas las clases de una misma materia.

**Nota técnica:** `banco-imagenes/` es ahora la fuente de ids. `empaquetar_assets.py` y `construir_clase.py` lo leen por defecto y **bloquean** (error) cualquier imagen con estado `descartada`; avisan si es `especifica`, `uso_con_cuidado` o `por_revisar`. Cuando este módulo contradiga una mención anterior a `assets-reutilizables/`, manda este módulo (los 46 ids originales siguen existiendo con el mismo nombre).
