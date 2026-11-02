#!/usr/bin/env python3
"""
empaquetar_assets.py — mete en una clase SOLO las imágenes del pack que realmente usa.

En la clase se escribe  asset://id  (id = el de assets-reutilizables/assets.json), por ejemplo:
    <img src="asset://aria-hola" alt="ARIA saluda">      background:url(asset://cofre)
Modos:
  --modo inline  (por defecto)  reemplaza cada asset:// por un data: URI optimizado → UN SOLO .html que funciona sin internet.
                                Los del kit-juego se incrustan como SVG (pesan 1–3 KB); el resto como WebP con transparencia.
  --modo ruta                   reemplaza por una ruta relativa al archivo (hay que publicar la carpeta junto a la clase).
Controles de calidad (la herramienta falla si no se cumplen):
  · todo asset:// debe existir en el manifiesto  → salida 2
  · el peso total de lo incrustado no puede pasar --presupuesto-mb (por defecto 1.5)  → salida 1
  · avisa de imágenes base64 grandes que NO vienen del pack (se recomienda pasarlas al pack)
Uso:  python3 tools/empaquetar_assets.py clase.html -o clase_final.html [--assets assets-reutilizables] [--modo inline|ruta]
"""
import argparse, base64, io, json, os, re, sys
from PIL import Image

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('html'); ap.add_argument('-o', '--salida', required=True)
    ap.add_argument('--assets', default=os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets-reutilizables'))
    ap.add_argument('--modo', choices=['inline', 'ruta'], default='inline')
    ap.add_argument('--prefijo-ruta', default='../assets-reutilizables/')
    ap.add_argument('--presupuesto-mb', type=float, default=1.5)
    ap.add_argument('--calidad', type=int, default=85)
    a = ap.parse_args()

    raiz = os.path.abspath(a.assets)
    man = {x['id']: x for x in json.load(open(os.path.join(raiz, 'assets.json'), encoding='utf8'))['assets']}
    html = open(a.html, encoding='utf8').read()
    usados = sorted(set(re.findall(r'asset://([a-z0-9\-]+)', html)))
    dinamicos = re.findall(r"asset://['\"]\s*\+", html)
    if dinamicos:
        print('❌ Hay', len(dinamicos), "referencias armadas con 'asset://' + nombre. El empaquetador no puede resolverlas: declara cada imagen como token literal completo (const IMG = { x: 'asset://x' }) y usa IMG.x."); sys.exit(2)
    faltan = [u for u in usados if u not in man]
    if faltan:
        print('❌ Assets que no existen en el manifiesto:', ', '.join(faltan)); print('   Disponibles:', ', '.join(sorted(man))); sys.exit(2)

    reemplazo, peso = {}, {}
    for u in usados:
        m = man[u]; ruta = os.path.join(raiz, m['archivo'])
        if a.modo == 'ruta':
            reemplazo[u] = a.prefijo_ruta + m['archivo']; peso[u] = 0; continue
        svg = os.path.join(raiz, 'kit-juego', 'svg', u + '.svg')
        if os.path.exists(svg):
            datos = open(svg, 'rb').read(); mime = 'image/svg+xml'
        else:
            im = Image.open(ruta).convert('RGBA'); b = io.BytesIO()
            im.save(b, 'WEBP', quality=a.calidad, method=6); datos = b.getvalue(); mime = 'image/webp'
        reemplazo[u] = f'data:{mime};base64,' + base64.b64encode(datos).decode(); peso[u] = len(datos)

    salida = re.sub(r'asset://([a-z0-9\-]+)', lambda mo: reemplazo[mo.group(1)], html)
    open(a.salida, 'w', encoding='utf8').write(salida)

    total = sum(peso.values()) / 1e6
    print(f'✅ {len(usados)} assets del pack usados · modo {a.modo}')
    for u in usados: print(f'   {u:28} {peso[u]/1024:7.1f} KB')
    print(f'   Incrustado: {total:.2f} MB · HTML final: {os.path.getsize(a.salida)/1e6:.2f} MB')
    ajenas = [(len(b) * 3 // 4) for b in re.findall(r'data:image/[a-z+]+;base64,([A-Za-z0-9+/=]{20000,})', salida)]
    ajenas = [x for x in ajenas]
    if a.modo == 'inline':
        prop = sum(peso.values())
        grandes = [x for x in ajenas if x > 100_000 and not any(abs(x - p) < 64 for p in peso.values())]
        if grandes: print(f'⚠️  {len(grandes)} imagen(es) base64 grandes que NO son del pack ({sum(grandes)/1e6:.2f} MB): conviene agregarlas al pack y usar asset://')
    if total > a.presupuesto_mb:
        print(f'❌ Se pasa del presupuesto ({total:.2f} MB > {a.presupuesto_mb} MB): usa menos assets o --modo ruta'); sys.exit(1)

if __name__ == '__main__': main()
