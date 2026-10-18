#!/usr/bin/env python3
"""Restaura un HTML aligerado con tools/aligerar_html.py (devuelve los base64 a su lugar).
Uso: python3 tools/restaurar_html.py clase.ligero.html [salida.html]"""
import re, sys, json, pathlib
def main():
    if len(sys.argv) < 2: sys.exit(__doc__)
    p = pathlib.Path(sys.argv[1]); nombre = p.name.replace('.ligero.html','')
    blobs = json.loads((p.parent/(nombre+'.blobs.json')).read_text(encoding='utf-8'))
    h = p.read_text(encoding='utf-8')
    usados = set()
    def sub(m):
        i = int(m.group(1)); usados.add(i); return blobs[i][len(blobs[i].split('base64,')[0])+7:]
    # el prefijo data:...;base64, ya está en el texto ligero; solo se repone el contenido
    out = re.sub(r'<<B64:(\d+)>>', sub, h)
    falt = [i for i in range(len(blobs)) if i not in usados]
    sal = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else p.parent/(nombre+'.restaurado.html')
    sal.write_text(out, encoding='utf-8')
    print('restaurado ->', sal, '|', len(usados), 'de', len(blobs), 'recursos repuestos')
    if falt: print('⚠️ AVISO: faltan marcadores en el HTML ligero (se borraron por error):', falt)
if __name__ == '__main__': main()
