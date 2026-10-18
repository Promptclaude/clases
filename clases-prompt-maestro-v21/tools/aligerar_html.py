#!/usr/bin/env python3
"""Aligera un HTML de clase pesado (p. ej. 6 MB) para que Claude pueda leerlo SIN gastar tokens en imágenes.
Reemplaza cada data:...;base64,XXXX por un marcador <<B64:n>> y guarda los originales en un .blobs.json.
Uso:    python3 tools/aligerar_html.py clase.html            -> clase.ligero.html + clase.blobs.json
Luego:  python3 tools/restaurar_html.py clase.ligero.html     -> clase.restaurado.html (idéntico al original)
Se puede editar el .ligero.html libremente (texto, quizzes, estilos); solo hay que conservar los marcadores <<B64:n>>."""
import re, sys, json, pathlib
PAT = re.compile(r'(data:[A-Za-z0-9.+/\-]+;base64,)([A-Za-z0-9+/=]{300,})')
def main():
    if len(sys.argv) < 2: sys.exit(__doc__)
    p = pathlib.Path(sys.argv[1]); h = p.read_text(encoding='utf-8')
    blobs = []
    def sub(m):
        blobs.append(m.group(0)); return m.group(1) + '<<B64:%d>>' % (len(blobs)-1)
    ligero = PAT.sub(sub, h)
    base = p.with_suffix('')
    (base.parent/(base.name+'.ligero.html')).write_text(ligero, encoding='utf-8')
    (base.parent/(base.name+'.blobs.json')).write_text(json.dumps(blobs), encoding='utf-8')
    print('original: %.2f MB  ->  ligero: %.0f KB  (%d imágenes/recursos base64 apartados)' % (len(h)/1e6, len(ligero)/1e3, len(blobs)))
if __name__ == '__main__': main()
