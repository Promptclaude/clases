#!/usr/bin/env python3
"""medir_recortes.py — marca en banco.json qué imágenes (con fondo transparente) tocan el borde del lienzo.
Una ilustración o personaje que toca el borde casi siempre es un RECORTE de una lámina: en pantalla se ve cortada.
Campo que agrega: `recorte` = lista de lados (izquierda/derecha/arriba/abajo). Las imágenes con `recorte_verificado: true` (revisadas a ojo) se omiten. Las categorías de interfaz
(botones, barras, banners, marcos, insignias) y los avatares circulares ocupan el lienzo por diseño y no se marcan.
Uso: python3 medir_recortes.py   (desde cualquier carpeta; reescribe banco.json)"""
import json, os, warnings; warnings.filterwarnings('ignore')
import numpy as np
from PIL import Image
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); P = os.path.join(R, 'banco.json'); B = json.load(open(P, encoding='utf8'))
POR_DISENO = {'interfaz', '_descartadas'}; UMBRAL = 0.12
n = 0
for x in B['imagenes']:
    x.pop('recorte', None)
    if x.get('recorte_verificado'): continue          # revisada a ojo: está completa (figura recortada a su contenido)
    if x['archivo'].endswith('.svg') or not x.get('transparente') or x['categoria'] in POR_DISENO or x.get('subcategoria') == 'avatares' or x.get('subcategoria') == 'logos-redes-sociales': continue
    try: a = np.array(Image.open(os.path.join(R, x['archivo'])).convert('RGBA'))[:, :, 3] > 40
    except Exception: continue
    lados = {'izquierda': a[:, 0].mean(), 'derecha': a[:, -1].mean(), 'arriba': a[0, :].mean(), 'abajo': a[-1, :].mean()}
    cort = [k for k, v in lados.items() if v > UMBRAL]
    if cort: x['recorte'] = cort; n += 1
json.dump(B, open(P, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
print(f'{n} imágenes marcadas con recorte (de {len(B["imagenes"])})')
