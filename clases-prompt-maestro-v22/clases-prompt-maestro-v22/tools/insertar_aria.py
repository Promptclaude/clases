#!/usr/bin/env python3
"""Inserta ARIA (widget + sprites) en un HTML de clase, ANTES de </body>, una sola vez.
Uso:  python3 tools/insertar_aria.py clase.html [salida.html]
- No consume tokens: el widget y los sprites se copian por script, nunca se leen ni se reescriben a mano.
- Idempotente: si la clase ya tiene ARIA (id="aria-fab"), no la inserta de nuevo.
- Nunca escribe una clave de Gemini. Si quieres la IA real, ver aria/README_ARIA.md."""
import sys, pathlib
raiz = pathlib.Path(__file__).resolve().parent.parent
def main():
    if len(sys.argv) < 2: sys.exit(__doc__)
    ent = pathlib.Path(sys.argv[1]); sal = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else ent
    html = ent.read_text(encoding='utf-8')
    if 'id="aria-fab"' in html:
        print('ARIA ya está en esta clase: no se inserta de nuevo.'); 
        if sal != ent: sal.write_text(html, encoding='utf-8')
        return
    widget = (raiz/'aria'/'aria_widget.html').read_text(encoding='utf-8')
    sprites = (raiz/'aria'/'aria_sprites_base64.js').read_text(encoding='utf-8')
    assert '<!--ARIA_SPRITES_AQUI-->' in widget
    widget = widget.replace('<!--ARIA_SPRITES_AQUI-->', '<script>\n' + sprites + '</script>', 1)
    i = html.rfind('</body>')
    if i < 0: sys.exit('No encontré </body> en la clase.')
    sal.write_text(html[:i] + widget + '\n' + html[i:], encoding='utf-8')
    print('ARIA insertada en', sal, '(+%d KB)' % (len(widget)//1024))
if __name__ == '__main__': main()
