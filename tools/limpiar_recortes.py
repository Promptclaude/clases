#!/usr/bin/env python3
"""
limpiar_recortes.py — limpia en lote PNG/WebP con transparencia (recortes de láminas de stickers).
Para cada imagen: (1) se queda con el sujeto principal y sus partes pegadas (estrellas, globo) y borra vecinos que
quedaron al recortar; (2) quita el halo blanco/sucio del contorno; (3) recorta el espacio vacío; (4) detecta si el
sujeto está CORTADO por el borde de la imagen original (no se puede arreglar: hay que re-exportar la lámina).
  --busto  desvanece suavemente el borde inferior (para mascotas de medio cuerpo cuyo corte es recto)
Salida: carpeta de limpias + informe.json:  ok | cortada (con qué lados) | sin-transparencia | vacia
Uso:  python3 tools/limpiar_recortes.py carpeta_entrada carpeta_salida [--busto] [--registrar banco-imagenes/banco.json --categoria personajes/aria]
Criterio «ok» = el sujeto no toca ningún borde (tolerancia 2 px).  Solo las «ok» se copian a salida/ok/ ; las demás a salida/revisar/.
"""
import argparse, json, os, sys
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

def limpiar(im, busto=False):
    a = np.array(im.convert('RGBA')).astype(np.float32); al = a[..., 3]
    if al.min() >= 250: return None, {'estado': 'sin-transparencia'}
    m = al > 40
    lab, n = ndi.label(ndi.binary_dilation(m, iterations=7))
    if n == 0 or not m.any(): return None, {'estado': 'vacia'}
    cnt = ndi.sum(m, lab, range(1, n + 1)); main = int(np.argmax(cnt)) + 1
    keep = ndi.binary_dilation((lab == main) & m, iterations=2) & (al > 0)
    solid = (al > 128) & (lab == main); b = 2
    lados = {k: int(v) for k, v in {'arriba': solid[:b].sum(), 'abajo': solid[-b:].sum(), 'izq': solid[:, :b].sum(), 'der': solid[:, -b:].sum()}.items() if v > 2}
    core = ndi.binary_erosion(al >= 250, iterations=1)
    idx = ndi.distance_transform_edt(~core, return_distances=False, return_indices=True)
    rgb = a[..., :3][idx[0], idx[1]]
    af = np.clip((ndi.gaussian_filter(np.where(keep, al, 0), 0.6) - 35) * 1.25, 0, 255); af[~keep] = 0
    o = Image.fromarray(np.dstack([np.where(core[..., None], a[..., :3], rgb), af]).astype(np.uint8), 'RGBA')
    bb = o.getchannel('A').point(lambda v: 255 if v > 20 else 0).getbbox()
    if not bb: return None, {'estado': 'vacia'}
    o = o.crop(bb); pad = 6
    c = Image.new('RGBA', (o.width + 2 * pad, o.height + 2 * pad), (0, 0, 0, 0)); c.paste(o, (pad, pad))
    solo_abajo = set(lados) <= {'abajo'}
    if busto and lados and solo_abajo:
        arr = np.array(c).astype(np.float32); h = arr.shape[0]; ys = np.where(arr[..., 3].max(axis=1) > 40)[0]; bot = ys.max(); k = max(4, int(h * .16)); ramp = np.ones(h)
        for i in range(k):
            y = bot - k + 1 + i
            if 0 <= y < h: ramp[y] = 1 - (i + 1) / k
        ramp[bot + 1:] = 0; arr[..., 3] *= ramp[:, None]; c = Image.fromarray(arr.astype(np.uint8), 'RGBA'); lados = {}
    return c, {'estado': 'cortada' if lados else 'ok', 'lados_cortados': lados, 'tam': list(c.size), 'fragmentos_vecinos_quitados': n - 1}

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('entrada'); ap.add_argument('salida'); ap.add_argument('--busto', action='store_true')
    ap.add_argument('--registrar'); ap.add_argument('--categoria', default='sin-categoria')
    a = ap.parse_args()
    os.makedirs(os.path.join(a.salida, 'ok'), exist_ok=True); os.makedirs(os.path.join(a.salida, 'revisar'), exist_ok=True)
    inf = {}
    for f in sorted(os.listdir(a.entrada)):
        if not f.lower().endswith(('.png', '.webp')): continue
        c, r = limpiar(Image.open(os.path.join(a.entrada, f)), a.busto); inf[f] = r
        if c is not None:
            nombre = os.path.splitext(f)[0].lower().replace(' ', '-').replace('_', '-') + '.png'
            c.save(os.path.join(a.salida, 'ok' if r['estado'] == 'ok' else 'revisar', nombre), optimize=True); r['archivo'] = nombre
    json.dump(inf, open(os.path.join(a.salida, 'informe.json'), 'w', encoding='utf8'), ensure_ascii=False, indent=1)
    ok = [k for k, v in inf.items() if v['estado'] == 'ok']
    print(f'✅ {len(ok)} listas · ⚠️ {sum(v["estado"]=="cortada" for v in inf.values())} cortadas (carpeta revisar/) · ❌ {sum(v["estado"] in ("sin-transparencia","vacia") for v in inf.values())} descartadas')
    for k, v in inf.items():
        if v['estado'] == 'cortada': print(f'   cortada: {k} → lados {v["lados_cortados"]}  (re-exporta la lámina original sin recortar ese lado)')
    if a.registrar:
        man = json.load(open(a.registrar, encoding='utf8')); lista = man['imagenes'] if 'imagenes' in man else man['assets']; es_banco = 'imagenes' in man; ids = {x['id'] for x in lista}; base = os.path.dirname(os.path.abspath(a.registrar)); nuevos = 0
        for k in ok:
            id_ = os.path.splitext(inf[k]['archivo'])[0]
            if id_ in ids: continue
            destino = os.path.join(base, a.categoria); os.makedirs(destino, exist_ok=True)
            img = Image.open(os.path.join(a.salida, 'ok', inf[k]['archivo'])); img.save(os.path.join(destino, inf[k]['archivo']), optimize=True)
            cat, _, sub = a.categoria.partition('/')
            reg = {'id': id_, 'archivo': f'{a.categoria}/{inf[k]["archivo"]}', 'categoria': cat, 'subcategoria': sub, 'estado': 'por_revisar', 'calidad': 4, 'transparente': True, 'tiene_texto': False, 'usada_en': []} if es_banco else None
            lista.append(reg | {'uso': '(completar)', 'tags': [], 'texto': '', 'origen': 'subido y limpiado con limpiar_recortes.py', 'ancho': img.width, 'alto': img.height}) if es_banco else lista.append({'id': id_, 'archivo': f'{a.categoria}/{inf[k]["archivo"]}', 'categoria': a.categoria, 'uso': '(completar)', 'tags': [], 'texto_incluido': '', 'origen': 'subido y limpiado con limpiar_recortes.py', 'ancho': img.width, 'alto': img.height}); nuevos += 1
        json.dump(man, open(a.registrar, 'w', encoding='utf8'), ensure_ascii=False, indent=1); print(f'📒 {nuevos} assets nuevos registrados en el manifiesto (completa "uso" y "tags")')

if __name__ == '__main__': main()
