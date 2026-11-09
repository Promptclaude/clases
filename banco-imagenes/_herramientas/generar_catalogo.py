#!/usr/bin/env python3
"""generar_catalogo.py — crea el catálogo visual del banco: banco-imagenes/CATALOGO.md (índice) y catalogo/<carpeta>.md
(una página por tema con miniatura, id, qué contiene, texto alternativo, materia/grado y estado). Se ve directo en GitHub.
Solo incluye lo usable (aprobada, por_revisar, uso_con_cuidado). Ejecutar cada vez que cambie el banco."""
import json, os, html, collections
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); B = json.load(open(os.path.join(R, 'banco.json'), encoding='utf8'))['imagenes']
usables = [x for x in B if x['estado'] in ('aprobada', 'por_revisar', 'uso_con_cuidado')]; grupos = collections.defaultdict(list)
for x in usables: grupos[(x['categoria'], x['subcategoria'])].append(x)
os.makedirs(os.path.join(R, 'catalogo'), exist_ok=True)
for f in os.listdir(os.path.join(R, 'catalogo')): os.remove(os.path.join(R, 'catalogo', f))
indice = ['# Catálogo visual del banco de imágenes', '', f'{len(usables)} imágenes usables (de {len(B)} registradas). Haz clic en un tema para ver miniaturas, qué contiene cada una y su texto alternativo (`alt`).', '',
          '**Cómo usarlas en una clase:** `"imagen": "asset://ID", "alt": "…el alt del catálogo…"`. Buscar por contenido: `python3 _herramientas/buscar_banco.py palabra --alt`.', '', '| Tema | Imágenes | Qué hay |', '|---|---|---|']
for (cat, sub), xs in sorted(grupos.items()):
    nombre = (cat + '/' + sub).rstrip('/'); arch = nombre.replace('/', '--') + '.md'; ncon = sum(1 for x in xs if x.get('descripcion'))
    L = [f'# {nombre}', '', f'{len(xs)} imágenes · [← volver al índice](../CATALOGO.md)', '', '| Imagen | Id y qué contiene | Materia · grado | Calidad |', '|:--:|---|---|:--:|']
    for x in sorted(xs, key=lambda x: (-x['calidad'], x['id'])):
        ruta = '../' + x['archivo']; d = html.escape(x.get('descripcion') or x.get('uso') or ''); mg = ' · '.join(filter(None, [', '.join(x.get('materia', [])), ('grado ' + ', '.join(map(str, x['grados']))) if x.get('grados') else '']))
        tx = (' <br><sub>texto: ' + html.escape(x['texto'][:70]) + '</sub>') if x.get('texto') and not x.get('descripcion') else ''
        L.append(f"| <img src=\"{ruta}\" width=\"110\" alt=\"{html.escape(x.get('alt') or d)}\"> | **`{x['id']}`**<br>{d}{tx}<br><sub>{' '.join('`' + t + '`' for t in x['tags'][:7])}</sub> | {mg or '—'} | {x['calidad']}★{' ✂' if x.get('recorte') else ''} |")
    open(os.path.join(R, 'catalogo', arch), 'w', encoding='utf8').write('\n'.join(L) + '\n')
    resumen = '; '.join(sorted({(x.get('descripcion') or x.get('uso') or '')[:38] for x in xs})[:3])
    indice.append(f'| [{nombre}](catalogo/{arch}) | {len(xs)} | {html.escape(resumen)}… |')
open(os.path.join(R, 'CATALOGO.md'), 'w', encoding='utf8').write('\n'.join(indice) + '\n')
print(f'catálogo: {len(grupos)} páginas, {len(usables)} imágenes')
