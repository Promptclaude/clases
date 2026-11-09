#!/usr/bin/env python3
"""importar.py — importó al banco las imágenes de los 4 documentos «PROCESO_SUBIR_DE_GRADO_*.html» (Aritmética 4.° y 5.°,
Tecnología 4.° y 5.°). Se conserva para que la importación sea reproducible.
Entradas: descripciones.txt (h6 | carpeta | descripción | tags), informe_extraccion.json (contexto de slide y OCR) y los archivos
originales extraídos (carpeta RAW). Uso: python3 importar.py RAW_DIR   (RAW_DIR = imágenes <hash>.webp extraídas del HTML)"""
import json, os, re, shutil, sys, unicodedata, datetime, warnings; warnings.filterwarnings('ignore')
import numpy as np, cv2
from PIL import Image
AQUI = os.path.dirname(os.path.abspath(__file__)); R = os.path.join(AQUI, '..', '..', '..'); P = os.path.join(R, 'banco.json'); RAW = sys.argv[1]
B = json.load(open(P, encoding='utf8')); L = B['imagenes']
desc = {}
for l in open(os.path.join(AQUI, 'descripciones.txt'), encoding='utf8'):
    if l.startswith('#') or '|' not in l: continue
    p = [x.strip() for x in l.split('|')]; desc[p[0]] = p
inf = json.load(open(os.path.join(AQUI, 'informe_extraccion.json'), encoding='utf8'))
def dhash(im): g = Image.new('RGBA', im.size, (255, 255, 255, 255)); g.alpha_composite(im.convert('RGBA')); a = np.array(g.convert('L').resize((9, 8)), dtype=int); return (a[:, 1:] > a[:, :-1]).flatten()
existentes = []
for x in L:
    try:
        if not x['archivo'].endswith('.svg'): existentes.append((x['id'], dhash(Image.open(os.path.join(R, x['archivo'])))))
    except Exception: pass
slug = lambda t: re.sub(r'-+', '-', re.sub(r'[^a-z0-9]+', '-', unicodedata.normalize('NFD', t.lower()).encode('ascii', 'ignore').decode())).strip('-')
AREA = {'A4': ('aritmetica', 4), 'A5': ('aritmetica', 5), 'T4': ('tecnologia', 4), 'T5': ('tecnologia', 5)}; ABR = {'Aritmetica4': 'A4', 'Aritmetica5': 'A5', 'Tecnologia4': 'T4', 'Tecnologia5': 'T5'}
ya = {x['id'] for x in L}; nuevos = omitidas = 0; hoy = datetime.date.today().isoformat()
for r in inf:
    h6 = r['h'][:6]; _, carpeta, d, tags = desc[h6]; arch = [f for f in os.listdir(RAW) if f.startswith(r['h'])][0]; im = Image.open(os.path.join(RAW, arch)).convert('RGBA')
    dup = [i for i, h0 in existentes if (dhash(im) != h0).sum() <= 5]
    if dup: omitidas += 1; print(f'  (omitida) {h6}: ya existe como {dup[0]}'); continue
    cat, _, sub = carpeta.partition('/'); base = slug(re.sub(r'[«»¡!¿?]', '', d))[:42].rstrip('-'); id_ = f'{base}-{h6[:4]}'
    while id_ in ya: id_ += 'x'
    ya.add(id_); dest = os.path.join(R, cat, sub) if sub else os.path.join(R, cat); os.makedirs(dest, exist_ok=True); ext = os.path.splitext(arch)[1]; shutil.copy(os.path.join(RAW, arch), os.path.join(dest, id_ + ext))
    w, h = im.size; g = np.array(im.convert('L')); sh = float(cv2.Laplacian(g, cv2.CV_64F).var()); calidad = min(5, 2 + (w >= 400) + (sh > 150) + (sh > 600))
    docs = sorted({ABR[d.split(':')[0]] for d in r['docs']}); ar = sorted({AREA[d][0] for d in docs}); gr = sorted({AREA[d][1] for d in docs})
    txt = r.get('texto', ''); ctexto = len(re.sub(r'[^A-Za-zÁÉÍÓÚáéíóúñÑ0-9]', '', txt)) >= 4
    rec = {'id': id_, 'archivo': f'{cat}/{sub}/{id_}{ext}' if sub else f'{cat}/{id_}{ext}', 'svg': None, 'categoria': cat, 'subcategoria': sub, 'descripcion': d, 'alt': d.replace('«', '').replace('»', '')[:150], 'uso': d.split(' con ')[0].split(':')[0][:80],
           'tags': sorted(set(tags.split() + ar + [f'{g}°' for g in gr] + ([sub] if sub else []))), 'materia': ar, 'grados': gr, 'ancho': w, 'alto': h, 'transparente': bool((np.array(im)[:, :, 3] < 10).mean() > 0.03),
           'tiene_texto': ctexto, 'texto_es_contenido': ctexto, 'texto': txt, 'origen': f"extraída de PROCESO_SUBIR_DE_GRADO ({', '.join(docs) or '—'}) · clave «{r['claves'][0]}» · {hoy}",
           'usada_en_origen': [{'doc': c['doc'], 'slide': c['slide'], 'titulo': c['titulo']} for c in r['contexto']], 'estado': 'aprobada', 'calidad': calidad, 'usada_en': []}
    if 'especifica' in tags.split(): rec['estado'] = 'especifica'
    L.append(rec); nuevos += 1
B['total'] = len(L); json.dump(B, open(P, 'w', encoding='utf8'), ensure_ascii=False, indent=1); print(f'{nuevos} imágenes registradas · {omitidas} omitidas por duplicadas · total {len(L)}')
