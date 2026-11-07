#!/usr/bin/env python3
"""reparar_recortes.py — quita de las imágenes marcadas con `recorte` los restos de figuras vecinas (pedazos cortados
por el borde de la lámina original) y las vuelve a recortar al contenido. REVERSIBLE: el original queda en
`_originales/<misma ruta>` y en la etiqueta de git `antes-limpieza-fragmentos`.
Genera `vistas-previas/antes-despues-limpieza-N.png` para revisar. Después vuelve a medir los recortes.
Uso: python3 reparar_recortes.py [--simular]"""
import json, os, shutil, sys, subprocess, warnings; warnings.filterwarnings('ignore')
import numpy as np
from PIL import Image, ImageDraw
AQUI = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, AQUI); import quitar_fondo as Q
R = os.path.join(AQUI, '..'); P = os.path.join(R, 'banco.json'); B = json.load(open(P, encoding='utf8')); simular = '--simular' in sys.argv
cambios = []
for x in B['imagenes']:
    if not x.get('recorte') or x['estado'] not in ('aprobada', 'uso_con_cuidado', 'especifica') or x['archivo'].endswith('.svg'): continue
    ruta = os.path.join(R, x['archivo']); arr = np.array(Image.open(ruta).convert('RGBA')); a = arr[:, :, 3]; m = Q.limpiar_fragmentos(a.copy())
    if ((a > 40) & (m <= 40)).sum() / max(1, (a > 40).sum()) <= 0.004: continue
    ys, xs = np.where(m > 20); y0, y1, x0, x1 = max(0, ys.min() - 4), min(arr.shape[0], ys.max() + 5), max(0, xs.min() - 4), min(arr.shape[1], xs.max() + 5)
    nueva = np.dstack([arr[:, :, :3], m])[y0:y1, x0:x1]; cambios.append((x, ruta, nueva))
print(f'{len(cambios)} imágenes con restos de figuras vecinas')
if simular: sys.exit()
for x, ruta, nueva in cambios:
    orig = os.path.join(R, '_originales', x['archivo']); os.makedirs(os.path.dirname(orig), exist_ok=True)
    if not os.path.exists(orig): shutil.copy(ruta, orig)
    nuevo_rel = os.path.splitext(x['archivo'])[0] + '.png'; Image.fromarray(nueva, 'RGBA').save(os.path.join(R, nuevo_rel), optimize=True)
    if nuevo_rel != x['archivo'] and os.path.exists(ruta): os.remove(ruta)
    x.update(archivo=nuevo_rel, ancho=nueva.shape[1], alto=nueva.shape[0], nota=(x.get('nota', '') + ' · restos de figuras vecinas quitados (original en _originales/)').strip(' ·'), limpiada=True)
json.dump(B, open(P, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
os.makedirs(os.path.join(R, 'vistas-previas'), exist_ok=True); T = 150; cols = 8
def miniatura(ruta):
    im = Image.open(ruta).convert('RGBA'); im.thumbnail((T - 6, T - 6)); bg = Image.new('RGBA', im.size, (255, 255, 255, 255)); bg.alpha_composite(im); return bg.convert('RGB')
for k in range(0, len(cambios), 24):
    lote = cambios[k:k + 24]; filas = (len(lote) + cols - 1) // cols; s = Image.new('RGB', (T * cols, (T + 14) * filas * 2), (205, 205, 220)); d = ImageDraw.Draw(s)
    for i, (x, _, _) in enumerate(lote):
        ori = os.path.join(R, '_originales', [f for f in [x['archivo']]][0]); ori = ori if os.path.exists(ori) else [os.path.join(dp, f) for dp, _, fs in os.walk(os.path.join(R, '_originales')) for f in fs if os.path.splitext(f)[0] == os.path.splitext(os.path.basename(x['archivo']))[0]][0]
        for fila, ruta_im in enumerate([ori, os.path.join(R, x['archivo'])]):
            s.paste(miniatura(ruta_im), ((i % cols) * T + 3, ((i // cols) * 2 + fila) * (T + 14) + 3))
        d.text(((i % cols) * T + 3, ((i // cols) * 2 + 1) * (T + 14) + T), x['id'][4:12] + ' (arriba antes · abajo después)', fill=(0, 0, 0))
    s.save(os.path.join(R, 'vistas-previas', f'antes-despues-limpieza-{k // 24 + 1}.png'))
subprocess.run([sys.executable, os.path.join(AQUI, 'medir_recortes.py')])
