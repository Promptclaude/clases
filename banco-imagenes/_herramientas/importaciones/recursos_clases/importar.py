#!/usr/bin/env python3
"""importar.py — importa al banco las imágenes de luiscaceres2586-lang/Clases · recursos/imagenes/ (personajes ARIA v2 y Bolí, avatares,
íconos de juego, login, portada, períodos, grados, íconos de área) y reemplaza el escudo del colegio por la versión grande (520 px).
Excluye a propósito `legado/` (personajes antiguos que el repo de clases está reemplazando por originales) y `gif/`.
Convierte a WebP SIN pérdida (más liviano, misma calidad, transparencia intacta).
Uso: python3 importar.py RUTA/Clases/recursos/imagenes"""
import json, os, re, shutil, sys, unicodedata, datetime, warnings; warnings.filterwarnings('ignore')
import numpy as np, cv2
from PIL import Image
AQUI = os.path.dirname(os.path.abspath(__file__)); R = os.path.join(AQUI, '..', '..', '..'); P = os.path.join(R, 'banco.json'); ORIGEN = sys.argv[1]
B = json.load(open(P, encoding='utf8')); L = B['imagenes']; hoy = datetime.date.today().isoformat()
desc = {}
for l in open(os.path.join(AQUI, 'descripciones.txt'), encoding='utf8'):
    if l.startswith('#') or '|' not in l: continue
    p = [x.strip() for x in l.split('|')]; desc[p[0]] = p
def dhash(im): g = Image.new('RGBA', im.size, (255, 255, 255, 255)); g.alpha_composite(im.convert('RGBA')); a = np.array(g.convert('L').resize((9, 8)), dtype=int); return (a[:, 1:] > a[:, :-1]).flatten()
existentes = []
for x in L:
    try:
        if not x['archivo'].endswith('.svg'): existentes.append((x['id'], dhash(Image.open(os.path.join(R, x['archivo'])))))
    except Exception: pass
archivos = {}
for dp, _, fs in os.walk(ORIGEN):
    if os.sep + 'legado' in dp or os.sep + 'gif' in dp or os.sep + 'referencias' in dp: continue
    for f in fs:
        stem, ext = os.path.splitext(f)
        if ext.lower() in ('.png', '.webp', '.jpg'): archivos[stem] = os.path.join(dp, f)
def id_de(stem):
    s = stem.replace('personajes_aria-', 'aria-v2-').replace('personajes_boli-', 'boli-').replace('avatares_avatar-', 'avatar-').replace('iconos_', 'icono-').replace('login_', 'login-').replace('portada_', 'portada-').replace('periodos_', 'periodo-').replace('grados_', 'grado-').replace('aritmetica_', 'icono-aritmetica-').replace('tecnologia_', 'icono-tecnologia-')
    return re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', unicodedata.normalize('NFD', s.lower()).encode('ascii', 'ignore').decode())).strip('-')
ya = {x['id'] for x in L}; nuevas = omitidas = 0; faltan = []
for stem, (_, carpeta, d, tags) in desc.items():
    if stem not in archivos: faltan.append(stem); continue
    im = Image.open(archivos[stem]).convert('RGBA'); dup = [i for i, h0 in existentes if (dhash(im) != h0).sum() <= 4]
    if dup: omitidas += 1; print(f'  (omitida) {stem}: ya existe como {dup[0]}'); continue
    cat, _, sub = carpeta.partition('/'); id_ = id_de(stem)
    while id_ in ya: id_ += 'x'
    ya.add(id_); dest = os.path.join(R, cat, sub) if sub else os.path.join(R, cat); os.makedirs(dest, exist_ok=True); rel = (f'{cat}/{sub}/{id_}.webp' if sub else f'{cat}/{id_}.webp')
    im.save(os.path.join(R, rel), 'WEBP', lossless=True, method=6)
    w, h = im.size; g = np.array(im.convert('L')); sh = float(cv2.Laplacian(g, cv2.CV_64F).var()); calidad = min(5, 3 + (sh > 150) + (w >= 300))
    materia = ['aritmetica'] if carpeta == 'iconos/aritmetica' else ['tecnologia'] if carpeta == 'iconos/tecnologia' else []; grados = [4] if stem == 'grados_numero-4' else [5] if stem == 'grados_numero-5' else []
    numero = stem.startswith(('periodos_periodo', 'grados_numero'))
    rec = {'id': id_, 'archivo': rel, 'svg': None, 'categoria': cat, 'subcategoria': sub, 'descripcion': d, 'alt': d.replace('«', '').replace('»', '')[:150], 'uso': d[:80], 'tags': sorted(set(tags.split() + materia + ['estilo-sticker'] + ([sub] if sub else []))),
           'materia': materia, 'grados': grados, 'ancho': w, 'alto': h, 'transparente': True, 'tiene_texto': numero, 'texto_es_contenido': numero, 'texto': re.sub(r'\D', '', stem) if numero else '',
           'origen': f'repositorio de clases (recursos/imagenes/{os.path.basename(os.path.dirname(archivos[stem]))}) · {hoy}', 'estado': 'aprobada', 'calidad': calidad, 'recorte_verificado': True, 'usada_en': []}
    if stem.startswith('personajes_aria'): rec['nota'] = 'ARIA v2 (cuerpo completo): estilo distinto al de la ARIA del pack original (más grande de cabeza); no mezclar las dos versiones en una misma clase.'
    if stem.startswith('personajes_boli'): rec['nota'] = 'Bolí es la mascota de la portada y del índice; ARIA es la mascota dentro de las clases. No usar Bolí dentro de una clase salvo que el docente lo pida.'
    L.append(rec); nuevas += 1
# escudo institucional: reemplazar por la versión grande (520 px)
esc = [x for x in L if x['id'] == 'escudo-colegio-simon-bolivar']
ruta_escudo = os.path.join(ORIGEN, 'legado', 'escudo.webp')      # único archivo de legado/ que se aprovecha (es el escudo del colegio)
if esc and os.path.exists(ruta_escudo):
    e = esc[0]; viejo = os.path.join(R, e['archivo']); im = Image.open(ruta_escudo).convert('RGBA')
    if im.width > e['ancho']:
        copia = os.path.join(R, '_originales', 'institucional'); os.makedirs(copia, exist_ok=True); shutil.copy(viejo, os.path.join(copia, 'escudo-colegio-simon-bolivar-200px.png')); os.remove(viejo)
        nuevo = 'institucional/escudo-colegio-simon-bolivar.webp'; im.save(os.path.join(R, nuevo), 'WEBP', lossless=True, method=6); print(f"escudo: {e['ancho']}px → {im.width}px")
        e.update(archivo=nuevo, ancho=im.width, alto=im.height, calidad=5, nota='Versión grande (520 px) tomada del repositorio de clases; la de 200 px quedó en _originales/.', recorte_verificado=True)
B['total'] = len(L); json.dump(B, open(P, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
print(f'{nuevas} imágenes registradas · {omitidas} omitidas por duplicadas · {len(faltan)} sin archivo {faltan[:3]} · total {len(L)}')
