#!/usr/bin/env python3
"""
extraer_imagenes_de_clase.py — saca a archivos las imágenes base64 incrustadas en una clase vieja (sin modificar la clase).
Quita duplicados (por contenido) y escribe un informe. Después: limpiar_recortes.py → assets-reutilizables.
Uso:  python3 tools/extraer_imagenes_de_clase.py clase.html carpeta_salida
"""
import base64, hashlib, io, json, os, re, sys
from PIL import Image
def main():
    if len(sys.argv) < 3: print(__doc__); sys.exit(1)
    html = open(sys.argv[1], encoding='utf8', errors='ignore').read(); out = sys.argv[2]; os.makedirs(out, exist_ok=True)
    vistos, filas = set(), []
    for mt, b in re.findall(r'data:(image/[a-z+]+);base64,([A-Za-z0-9+/=]{200,})', html):
        h = hashlib.md5(b.encode()).hexdigest()[:8]
        if h in vistos: continue
        vistos.add(h); raw = base64.b64decode(b); ext = mt.split('/')[1].replace('jpeg', 'jpg').replace('svg+xml', 'svg')
        nombre = f'img-{len(vistos):03d}-{h}.{ext}'; open(os.path.join(out, nombre), 'wb').write(raw)
        try:
            im = Image.open(io.BytesIO(raw)); tam = list(im.size); alfa = 'A' in im.mode
        except Exception: tam, alfa = None, None
        filas.append({'archivo': nombre, 'tam': tam, 'transparente': alfa, 'kb': len(raw) // 1024})
    json.dump(filas, open(os.path.join(out, 'informe.json'), 'w', encoding='utf8'), indent=1)
    print(f'✅ {len(filas)} imágenes únicas extraídas ({sum(f["kb"] for f in filas)} KB) → {out}  · {sum(1 for f in filas if f["transparente"])} con transparencia (candidatas a limpiar_recortes.py)')
if __name__ == '__main__': main()
