#!/usr/bin/env python3
"""Resume una clase HTML (aunque pese 6 MB) en ~40 líneas, sin leer imágenes: tema visual, slides y tipos.
Uso: python3 tools/esqueleto_clase.py clase.html"""
import re, sys, pathlib
def main():
    if len(sys.argv) < 2: sys.exit(__doc__)
    p = pathlib.Path(sys.argv[1]); h = p.read_text(encoding='utf-8')
    h2 = re.sub(r'(data:[A-Za-z0-9.+/\-]+;base64,)[A-Za-z0-9+/=]{300,}', r'\1…', h)
    print('archivo: %s | %.2f MB (sin base64: %.0f KB)' % (p.name, len(h)/1e6, len(h2)/1e3))
    for nombre in ('CONFIG_CLASE', 'CLASE_META'):
        m = re.search(r'(?:const|let|var)\s+' + nombre + r'\s*=\s*\{.*?\n?\};', h2, re.S)
        print('\n%s:\n%s' % (nombre, m.group(0)[:700] if m else '  (no encontrado)'))
    tipos = re.findall(r'\btype\s*:\s*[\'"]([A-Za-z0-9_]+)[\'"]', h2)
    from collections import Counter
    print('\nslides/actividades por type:', dict(Counter(tipos)))
    titulos = re.findall(r'\btitle\s*:\s*[\'"`]([^\'"`\n]{3,90})[\'"`]', h2)
    print('títulos (%d):' % len(titulos)); [print('  -', x) for x in titulos[:40]]
    print('\ntema visual — variables CSS:')
    for k, v in re.findall(r'(--(?:primary|accent|bg|font-ui|font-body|secondary)[\w-]*)\s*:\s*([^;}]+)[;}]', h2)[:12]: print('  %s: %s' % (k, v.strip()))
    print('\nARIA insertada:', 'sí' if 'id="aria-fab"' in h2 else 'no')
if __name__ == '__main__': main()
