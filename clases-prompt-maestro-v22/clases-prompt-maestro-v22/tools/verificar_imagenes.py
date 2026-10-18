#!/usr/bin/env python3
"""Comprueba que las imágenes remotas de una clase respondan (Prioridad 1-B).
Uso:  python3 tools/verificar_imagenes.py clase.html
- Encuentra <img src="http…">, url(http…) y las URL de Unsplash armadas en el JS (…/photo-ID?…).
- Sale con código 1 si alguna responde con error. Si no hay red, lo dice y sale con 0 (queda 'sin verificar')."""
import re, sys, pathlib, urllib.request, urllib.error, socket
def main():
    if len(sys.argv) < 2: sys.exit(__doc__)
    t = re.sub(r'data:[a-z/+\-]+;base64,[A-Za-z0-9+/=]{200,}', '', pathlib.Path(sys.argv[1]).read_text(encoding='utf-8', errors='replace'))
    urls = set(re.findall(r'<img[^>]+src=["\'](https?://[^"\']+)', t)) | set(re.findall(r'url\(["\']?(https?://[^)"\']+)', t))
    urls |= set(re.findall(r'https://images\.unsplash\.com/photo-[A-Za-z0-9\-]+[^\s"\'`)]*', t))
    urls = {u for u in urls if '[' not in u and '${' not in u}
    if not urls: print('Sin imágenes remotas: nada que verificar.'); return
    malas, sinred = [], 0
    for u in sorted(urls):
        try:
            req = urllib.request.Request(u, method='GET', headers={'User-Agent': 'Mozilla/5.0', 'Range': 'bytes=0-0'})
            with urllib.request.urlopen(req, timeout=8) as r:
                if r.status >= 400: malas.append((u, r.status))
        except urllib.error.HTTPError as e: malas.append((u, e.code))
        except (urllib.error.URLError, socket.timeout, OSError): sinred += 1
    print(f'{len(urls)} URL remotas · {len(malas)} con error · {sinred} sin poder comprobar (red)')
    for u, c in malas: print('❌', c, u[:120])
    if sinred == len(urls): print('⚠️  Sin red: imágenes SIN verificar. Decláralo en la entrega (el respaldo 1-B las cubre si fallan).')
    sys.exit(1 if malas else 0)
if __name__ == '__main__': main()
