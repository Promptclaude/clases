#!/usr/bin/env python3
"""quitar_fondo.py — quita el fondo, recorta al contenido y limpia restos de otras figuras.

Uso:
  python3 quitar_fondo.py entrada.png [más.png ...] -o salida/ [--modo auto|ia|color] [--margen 8] [--sin-limpiar]
  python3 quitar_fondo.py carpeta/ -o salida/

Modos:
  color  fondo liso (blanco, verde, gris…): se borra desde los bordes con tolerancia. Es el más limpio si el fondo es plano.
  ia     modelo U²-Net ligero (u2netp, 4,5 MB; se descarga solo de GitHub la primera vez). Sirve con fondos complicados.
  auto   usa «color» si las 4 esquinas son del mismo color y la imagen no tiene transparencia; si no, «ia».
Después de quitar el fondo SIEMPRE: (1) elimina restos pequeños pegados al borde (fragmentos de figuras vecinas),
(2) suaviza el borde (sin halo blanco), (3) recorta al contenido con un margen transparente.
Salida: PNG con transparencia. Imprime un informe por imagen (¿queda cortada por algún lado?)."""
import argparse, os, sys, urllib.request, warnings
warnings.filterwarnings('ignore')
import numpy as np
from PIL import Image, ImageFilter
import cv2

MODELO = os.path.expanduser('~/.u2net/u2netp.onnx')
URL = 'https://github.com/danielgatis/rembg/releases/download/v0.0.0/u2netp.onnx'


def mascara_ia(rgb):
    import onnxruntime as ort
    if not os.path.exists(MODELO):
        os.makedirs(os.path.dirname(MODELO), exist_ok=True); print('↓ descargando modelo u2netp (4,5 MB)…'); urllib.request.urlretrieve(URL, MODELO)
    sesion = ort.InferenceSession(MODELO, providers=['CPUExecutionProvider'])
    h, w = rgb.shape[:2]; x = cv2.resize(rgb, (320, 320), interpolation=cv2.INTER_AREA).astype(np.float32) / 255.0
    x = (x - np.array([0.485, 0.456, 0.406], np.float32)) / np.array([0.229, 0.224, 0.225], np.float32)
    y = sesion.run(None, {sesion.get_inputs()[0].name: x.transpose(2, 0, 1)[None].astype(np.float32)})[0][0, 0]
    y = (y - y.min()) / max(1e-6, (y.max() - y.min()))
    return cv2.resize(y, (w, h), interpolation=cv2.INTER_CUBIC).clip(0, 1)


def mascara_color(rgb, tol=28):
    """Inunda desde los bordes con el color de fondo (mediana de las esquinas). Respeta huecos internos del mismo color."""
    h, w = rgb.shape[:2]; esq = np.array([rgb[:6, :6], rgb[:6, -6:], rgb[-6:, :6], rgb[-6:, -6:]]).reshape(-1, 3); fondo = np.median(esq, axis=0)
    dif = np.abs(rgb.astype(np.int16) - fondo.astype(np.int16)).max(axis=2); cand = (dif <= tol).astype(np.uint8)
    n, lab = cv2.connectedComponents(cand, connectivity=4); borde = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    fondo_m = np.isin(lab, list(borde)) & (cand == 1)
    return (~fondo_m).astype(np.float32)


def fondo_liso(rgb, alfa):
    if alfa is not None and (alfa < 250).mean() > 0.02: return False
    esq = np.array([rgb[:6, :6].mean((0, 1)), rgb[:6, -6:].mean((0, 1)), rgb[-6:, :6].mean((0, 1)), rgb[-6:, -6:].mean((0, 1))])
    return float(np.abs(esq - esq.mean(0)).max()) < 18


def limpiar_fragmentos(a, ruido=0.0004):
    """Quita (1) motas diminutas y (2) restos de figuras vecinas: componentes pegadas al borde y CORTADAS por él
    (contacto largo con el borde de la imagen). NO toca adornos separados (confeti, destellos, la bombilla de «idea»)
    porque esos no están cortados en línea recta por el borde."""
    m = (a > 40).astype(np.uint8); n, lab, stats, _ = cv2.connectedComponentsWithStats(m, connectivity=8)
    if n <= 2: return a
    areas = stats[1:, cv2.CC_STAT_AREA]; mayor = areas.max(); h, w = m.shape; quitar = np.zeros_like(m, bool)
    for i in range(1, n):
        x, y, ww, hh, ar = stats[i]
        if ar == mayor: continue
        if ar < mayor * ruido: quitar |= (lab == i); continue
        comp = (lab == i); contacto = max(int(comp[0, :].sum()), int(comp[-1, :].sum()), int(comp[:, 0].sum()), int(comp[:, -1].sum()))
        if contacto >= 0.35 * max(ww, hh) and contacto >= 6 and ar < mayor * 0.30: quitar |= comp      # pedazo de otra figura, cortado por el borde
    out = a.copy(); out[quitar] = 0; return out


def mascara_total(ruta, modo='auto'):
    """Devuelve (rgb, máscara uint8 0-255, modo usado, ¿traía transparencia?) para la imagen completa."""
    im = Image.open(ruta).convert('RGBA'); arr = np.array(im); rgb, alfa0 = arr[:, :, :3], arr[:, :, 3]; tenia_alfa = (alfa0 < 250).mean() > 0.02
    if modo == 'auto': modo = 'color' if fondo_liso(rgb, alfa0) else 'ia'
    if tenia_alfa and modo != 'ia': m = alfa0 / 255.0
    elif modo == 'color': m = mascara_color(rgb)
    else:
        base = rgb
        if tenia_alfa: bg = Image.new('RGB', im.size, (255, 255, 255)); bg.paste(im, mask=im.split()[3]); base = np.array(bg)
        m = mascara_ia(base)
    m = (m * 255).astype(np.uint8)
    if modo == 'ia': m = cv2.GaussianBlur(m, (0, 0), 0.8)
    else: m = cv2.erode(m, np.ones((3, 3), np.uint8)); m = cv2.GaussianBlur(m, (0, 0), 0.7)
    return rgb, m, modo


def lamina(ruta, salida, modo='auto', margen=8, union=0.025, minimo=0.0015, limpiar=True):
    """Separa una LÁMINA (varias figuras en una imagen) en un PNG por figura. Las partes de una misma figura que estén
    a menos de `union` (fracción del lado mayor) se mantienen juntas (cuerpo + globo de texto, por ejemplo).
    Devuelve lista de (nombre, modo, (w,h), lados_cortados) en orden de lectura (filas de arriba abajo, izq. a der.)."""
    rgb, m, modo = mascara_total(ruta, modo); H, W = m.shape; k = max(3, int(union * max(H, W))) | 1
    dil = cv2.dilate((m > 40).astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k))); n, lab, st, _ = cv2.connectedComponentsWithStats(dil, connectivity=8)
    piezas = [(i, st[i]) for i in range(1, n) if st[i, cv2.CC_STAT_AREA] >= minimo * H * W]
    if not piezas: return []
    alto_med = float(np.median([p[3] for _, p in piezas])); piezas.sort(key=lambda t: (round((t[1][1] + t[1][3] / 2) / max(1.0, alto_med * 0.8)), t[1][0]))
    base = os.path.splitext(os.path.basename(ruta))[0]; os.makedirs(salida, exist_ok=True); res = []
    for orden, (i, _) in enumerate(piezas, 1):
        mi = np.where(lab == i, m, 0).astype(np.uint8)
        if limpiar: mi = limpiar_fragmentos(mi)
        ys, xs = np.where(mi > 20)
        if not len(ys): continue
        y0, y1, x0, x1 = max(0, ys.min() - margen), min(H, ys.max() + 1 + margen), max(0, xs.min() - margen), min(W, xs.max() + 1 + margen)
        rgba = np.dstack([rgb, mi])[y0:y1, x0:x1]; a = rgba[:, :, 3] > 40; h, w = a.shape
        lados = {'izquierda': a[:, 0].mean(), 'derecha': a[:, -1].mean(), 'arriba': a[0, :].mean(), 'abajo': a[-1, :].mean()}
        # una figura de la lámina cortada por el borde de la LÁMINA (no por nuestro recorte) se detecta contra el lienzo completo
        corte = [nom for nom, tocado in (('izquierda', x0 == 0), ('derecha', x1 == W), ('arriba', y0 == 0), ('abajo', y1 == H)) if tocado and lados[nom] > 0.02]
        nom = f'{base}_{orden:02d}.png'; Image.fromarray(rgba, 'RGBA').save(os.path.join(salida, nom), optimize=True)
        print(f'✅ {nom:<30} {w}x{h}px' + (f'  ✂ CORTADA por el borde de la lámina: {", ".join(corte)}' if corte else '')); res.append((nom, modo, (w, h), corte))
    return res


def procesar(ruta, salida, modo='auto', margen=8, limpiar=True):
    im = Image.open(ruta).convert('RGBA'); arr = np.array(im); rgb, alfa0 = arr[:, :, :3], arr[:, :, 3]
    tenia_alfa = (alfa0 < 250).mean() > 0.02
    if modo == 'auto': modo = 'color' if fondo_liso(rgb, alfa0) else 'ia'
    if tenia_alfa and modo != 'ia': m = alfa0 / 255.0
    elif modo == 'color': m = mascara_color(rgb)
    else:
        base = rgb
        if tenia_alfa: bg = Image.new('RGB', im.size, (255, 255, 255)); bg.paste(im, mask=im.split()[3]); base = np.array(bg)
        m = mascara_ia(base)
    m = (m * 255).astype(np.uint8)
    if modo == 'ia': m = cv2.GaussianBlur(m, (0, 0), 0.8)
    else:             # borde suave sin halo: erosiona 1 px y desenfoca ligeramente
        m = cv2.erode(m, np.ones((3, 3), np.uint8)); m = cv2.GaussianBlur(m, (0, 0), 0.7)
    if limpiar: m = limpiar_fragmentos(m)
    rgba = np.dstack([rgb, m]); ys, xs = np.where(m > 20)
    if not len(ys): print(f'⚠️  {os.path.basename(ruta)}: no quedó nada (revisa el modo)'); return None
    y0, y1, x0, x1 = max(0, ys.min() - margen), min(rgba.shape[0], ys.max() + 1 + margen), max(0, xs.min() - margen), min(rgba.shape[1], xs.max() + 1 + margen)
    rgba = rgba[y0:y1, x0:x1]; a = rgba[:, :, 3] > 40; h, w = a.shape
    lados = {'izquierda': a[:, 0].mean(), 'derecha': a[:, -1].mean(), 'arriba': a[0, :].mean(), 'abajo': a[-1, :].mean()}
    corte = [k for k, v in lados.items() if v > 0.02]  # tras recortar con margen, tocar el borde = el original estaba cortado
    os.makedirs(salida, exist_ok=True); nom = os.path.splitext(os.path.basename(ruta))[0] + '.png'; Image.fromarray(rgba, 'RGBA').save(os.path.join(salida, nom), optimize=True)
    print(f'✅ {nom:<28} modo={modo:<5} {w}x{h}px' + (f'  ✂ CORTADA por: {", ".join(corte)} (rehacer o pedir lámina completa)' if corte else '  sin cortes'))
    return nom, modo, (w, h), corte


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter); ap.add_argument('entradas', nargs='+'); ap.add_argument('-o', '--salida', required=True)
    ap.add_argument('--modo', default='auto', choices=['auto', 'ia', 'color']); ap.add_argument('--margen', type=int, default=8); ap.add_argument('--sin-limpiar', action='store_true'); ap.add_argument('--lamina', action='store_true', help='la imagen trae VARIAS figuras: separarlas en un PNG cada una'); a = ap.parse_args()
    fs = []
    for e in a.entradas: fs += [os.path.join(e, f) for f in sorted(os.listdir(e)) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))] if os.path.isdir(e) else [e]
    if a.lamina:
        tot = sum(len(lamina(f, a.salida, a.modo, a.margen, limpiar=not a.sin_limpiar)) for f in fs); print(f'\n{tot} figuras separadas en {a.salida}'); return
    ok = [procesar(f, a.salida, a.modo, a.margen, not a.sin_limpiar) for f in fs]; print(f'\n{sum(1 for x in ok if x)} de {len(fs)} listas en {a.salida}')


if __name__ == '__main__': main()
