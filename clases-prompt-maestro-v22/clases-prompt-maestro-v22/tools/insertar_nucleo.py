#!/usr/bin/env python3
"""Inserta (o actualiza) motor/nucleo.js dentro de un HTML de clase, como PRIMER <script> propio.
Uso:  python3 tools/insertar_nucleo.py clase.html [salida.html]
- Idempotente: si ya está, lo reemplaza por la versión actual del repo (entre los marcadores NUCLEO_INICIO/NUCLEO_FIN).
- No consume tokens: se copia por script, nunca se reescribe a mano."""
import sys, re, pathlib
raiz = pathlib.Path(__file__).resolve().parent.parent
def main():
    if len(sys.argv) < 2: sys.exit(__doc__)
    ent = pathlib.Path(sys.argv[1]); sal = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else ent
    html = ent.read_text(encoding='utf-8'); js = (raiz/'motor'/'nucleo.js').read_text(encoding='utf-8')
    bloque = '<script>\n/*NUCLEO_INICIO*/\n' + js + '\n/*NUCLEO_FIN*/\n</script>\n'
    if '/*NUCLEO_INICIO*/' in html:
        nuevo = re.sub(r'<script>\s*/\*NUCLEO_INICIO\*/.*?/\*NUCLEO_FIN\*/\s*</script>\n?', lambda m: bloque, html, count=1, flags=re.S); accion = 'actualizado'
    else:
        m = re.search(r'<script(?![^>]*\bsrc=)[^>]*>', html)
        if not m: sys.exit('No encontré ningún <script> propio donde insertar el núcleo.')
        nuevo = html[:m.start()] + bloque + html[m.start():]; accion = 'insertado'
    sal.write_text(nuevo, encoding='utf-8'); print('Núcleo', accion, 'en', sal, '(+%d KB)' % (len(js)//1024 + 1))
if __name__ == '__main__': main()
