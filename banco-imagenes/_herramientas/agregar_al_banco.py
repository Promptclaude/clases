#!/usr/bin/env python3
"""agregar_al_banco.py — de una imagen (o lámina con varias figuras) a entradas listas en el banco.

  python3 agregar_al_banco.py ARCHIVOS_O_CARPETA --cat personajes/aria --prefijo aria-emocion \\
        --tags aria,pose,emocion --uso "ARIA con distintas emociones" [--lamina] [--modo auto|ia|color] [--aprobar] [--banco RUTA]

Hace, en este orden: quita el fondo → (si --lamina) separa cada figura → limpia restos de figuras vecinas → recorta al contenido →
mide calidad (resolución + nitidez), texto horneado (OCR) y cortes por el borde → descarta duplicados (ya existen en el banco) →
guarda el PNG en <banco>/<cat>/ → registra en banco.json (estado `por_revisar`, o `aprobada` con --aprobar) → crea una hoja
de revisión vistas-previas/nuevas-<prefijo>.png.  Las imágenes CORTADAS (por el borde de la lámina) o con TEXTO quedan en
`_descartadas/recortes-cortados` o `_especificas` respectivamente (no se mezclan con las buenas).
Ids: <prefijo>-01, <prefijo>-02… (si el prefijo ya existe continúa la numeración)."""
import argparse, json, os, re, shutil, subprocess, sys, tempfile, datetime, warnings; warnings.filterwarnings('ignore')
import numpy as np, cv2
from PIL import Image, ImageDraw
AQUI = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, AQUI); import quitar_fondo as Q


def dhash(im):
    g = Image.new('RGBA', im.size, (255, 255, 255, 255)); g.alpha_composite(im.convert('RGBA')); a = np.array(g.convert('L').resize((9, 8)), dtype=int); return (a[:, 1:] > a[:, :-1]).flatten()


def texto_ocr(im):
    try:
        bg = Image.new('RGBA', im.size, (255, 255, 255, 255)); bg.alpha_composite(im.convert('RGBA')); bg = bg.convert('L')
        if bg.width < 700: bg = bg.resize((bg.width * 2, bg.height * 2))
        t = tempfile.mktemp('.png'); bg.save(t)
        o = subprocess.run(['tesseract', t, '-', '-l', 'eng', '--psm', '11', 'tsv'], capture_output=True, text=True, timeout=40).stdout; os.remove(t); ws = []
        for l in o.split('\n')[1:]:
            p = l.split('\t')
            if len(p) >= 12 and p[11].strip():
                try: c = float(p[10])
                except ValueError: continue
                if c >= 70 and len(re.sub(r'[^A-Za-zÁÉÍÓÚáéíóúñÑ0-9]', '', p[11])) >= 3: ws.append(p[11])
        return ' '.join(ws)
    except Exception: return ''           # sin tesseract no se detecta texto: se avisa más abajo


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('entradas', nargs='+'); ap.add_argument('--cat', required=True, help='categoria/subcategoria, p. ej. personajes/aria · tematicos/fracciones · juego')
    ap.add_argument('--prefijo', required=True); ap.add_argument('--tags', default=''); ap.add_argument('--uso', default='')
    ap.add_argument('--lamina', action='store_true'); ap.add_argument('--modo', default='auto', choices=['auto', 'ia', 'color']); ap.add_argument('--aprobar', action='store_true')
    ap.add_argument('--banco', default=os.path.join(AQUI, '..')); a = ap.parse_args()
    R = a.banco; P = os.path.join(R, 'banco.json'); B = json.load(open(P, encoding='utf8')); L = B['imagenes']; cat, _, sub = a.cat.partition('/')
    fs = []
    for e in a.entradas: fs += [os.path.join(e, f) for f in sorted(os.listdir(e)) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))] if os.path.isdir(e) else [e]
    existentes = []
    for x in L:
        try:
            if not x['archivo'].endswith('.svg'): existentes.append((x['id'], dhash(Image.open(os.path.join(R, x['archivo'])))))
        except Exception: pass
    tmp = tempfile.mkdtemp(); piezas = []
    for f in fs:
        out = os.path.join(tmp, os.path.splitext(os.path.basename(f))[0]); res = Q.lamina(f, out, a.modo) if a.lamina else ([Q.procesar(f, out, a.modo)] if Q.procesar(f, out, a.modo) else [])
        for r in res:
            if r: piezas.append((os.path.join(out, r[0]), r[3], f))
    nums = [int(m.group(1)) for x in L for m in [re.fullmatch(re.escape(a.prefijo) + r'-(\d+)', x['id'])] if m]; n = max(nums, default=0)
    nuevas, omitidas = [], []; tiene_ocr = shutil.which('tesseract') is not None
    for ruta, corte, origen in piezas:
        im = Image.open(ruta).convert('RGBA'); h1 = dhash(im); dup = [i for i, h0 in existentes if (h1 != h0).sum() <= 5]
        if dup: omitidas.append((os.path.basename(ruta), f'duplicado de {dup[0]}')); continue
        n += 1; id_ = f'{a.prefijo}-{n:02d}'; w, h = im.size; g = np.array(im.convert('L')); sh = float(cv2.Laplacian(g, cv2.CV_64F).var()); calidad = min(5, 1 + (w >= 300) + (w >= 500) + (sh > 120) + (sh > 500))
        txt = texto_ocr(im) if tiene_ocr else ''; ctexto = len(re.sub(r'[^A-Za-zÁÉÍÓÚáéíóúñÑ0-9]', '', txt)) >= 4
        al = np.array(im)[:, :, 3] > 40; lados = {'izquierda': al[:, 0].mean(), 'derecha': al[:, -1].mean(), 'arriba': al[0, :].mean(), 'abajo': al[-1, :].mean()}; recorte = [k for k, v in lados.items() if v > 0.12]
        if corte: c2, s2, estado, motivo = '_descartadas', 'recortes-cortados', 'descartada', 'figura cortada por el borde de la lámina (' + ', '.join(corte) + '): pedir la lámina completa o regenerarla'
        elif w < 128: c2, s2, estado, motivo = '_descartadas', 'baja-resolucion', 'descartada', f'{w}x{h}px'
        elif ctexto: c2, s2, estado, motivo = '_especificas', 'nuevas', 'especifica', 'tiene texto horneado: solo sirve en su clase'
        else: c2, s2, estado, motivo = cat, sub, ('aprobada' if a.aprobar else 'por_revisar'), ''
        d = os.path.join(R, c2, s2) if s2 else os.path.join(R, c2); os.makedirs(d, exist_ok=True); nom = f'{id_}.png'; shutil.copy(ruta, os.path.join(d, nom))
        rec = {'id': id_, 'archivo': (c2 + '/' + s2 + '/' + nom) if s2 else (c2 + '/' + nom), 'svg': None, 'categoria': c2, 'subcategoria': s2, 'uso': a.uso, 'tags': sorted(set([t.strip() for t in a.tags.split(',') if t.strip()])),
               'ancho': w, 'alto': h, 'transparente': True, 'tiene_texto': ctexto, 'texto': txt[:160], 'origen': f'subida por el docente ({os.path.basename(origen)}) · {datetime.date.today().isoformat()}', 'estado': estado, 'calidad': calidad, 'usada_en': []}
        if motivo: rec['motivo' if estado == 'descartada' else 'nota'] = motivo
        if recorte and cat not in ('interfaz',): rec['recorte'] = recorte
        L.append(rec); existentes.append((id_, h1)); nuevas.append(rec)
    B['total'] = len(L); json.dump(B, open(P, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
    print(f'\n== RESULTADO: {len(nuevas)} nuevas · {len(omitidas)} omitidas ==')
    for r in nuevas: print(f"  {r['id']:<22} {r['estado']:<11} {r['ancho']}x{r['alto']} calidad {r['calidad']}★" + (f" ✂{','.join(r['recorte'])}" if r.get('recorte') else '') + (f"  [{r.get('motivo') or r.get('nota')}]" if (r.get('motivo') or r.get('nota')) else ''))
    for nom, m in omitidas: print(f'  (omitida) {nom}: {m}')
    if not tiene_ocr: print('⚠️  tesseract no está instalado: no se detectó texto horneado; revisa a mano.')
    if nuevas:
        os.makedirs(os.path.join(R, 'vistas-previas'), exist_ok=True); T = 160; cols = min(6, len(nuevas)); rows = (len(nuevas) + cols - 1) // cols; s = Image.new('RGB', (T * cols, (T + 14) * rows), (215, 215, 228)); dr = ImageDraw.Draw(s)
        for i, r in enumerate(nuevas):
            im = Image.open(os.path.join(R, r['archivo'])).convert('RGBA'); im.thumbnail((T - 6, T - 6)); bg = Image.new('RGBA', im.size, (255, 255, 255, 255)); bg.alpha_composite(im); X, Y = (i % cols) * T, (i // cols) * (T + 14); s.paste(bg.convert('RGB'), (X + 3, Y + 3)); dr.text((X + 3, Y + T), f"{r['id']} [{r['estado'][:5]}]", fill=(0, 0, 0))
        f = os.path.join(R, 'vistas-previas', f'nuevas-{a.prefijo}.png'); s.save(f); print('Hoja de revisión:', f)
    shutil.rmtree(tmp, ignore_errors=True)


if __name__ == '__main__': main()
