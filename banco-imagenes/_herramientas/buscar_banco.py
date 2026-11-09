#!/usr/bin/env python3
"""buscar_banco.py — encuentra imágenes del banco por lo que CONTIENEN (descripción, texto dentro de la imagen, etiquetas, tema y la slide donde se usaban).
Ejemplos:
  python3 buscar_banco.py vuelto                      # cualquier imagen que hable de «vuelto»
  python3 buscar_banco.py balanza decimales --materia aritmetica --grado 5
  python3 buscar_banco.py virus --tema seguridad-digital --alt        # --alt muestra el texto alternativo listo para copiar
  python3 buscar_banco.py --tema documentos-word --sin-recorte --min-calidad 4
Por defecto NO muestra descartadas ni específicas (texto de una sola clase). Cada palabra debe aparecer (sin importar tildes ni mayúsculas)."""
import json, sys, os, argparse, unicodedata
norm = lambda t: unicodedata.normalize('NFD', str(t).lower()).encode('ascii', 'ignore').decode()
ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter); ap.add_argument('q', nargs='*'); ap.add_argument('--cat'); ap.add_argument('--tema', help='subcarpeta: decimales, dinero, medidas, internet, seguridad-digital, documentos-word, verificar-informacion, historia-internet…')
ap.add_argument('--materia', choices=['aritmetica', 'tecnologia']); ap.add_argument('--grado', type=int); ap.add_argument('--sin-texto', action='store_true', help='solo imágenes sin ningún texto dentro')
ap.add_argument('--min-calidad', type=int, default=1); ap.add_argument('--estado'); ap.add_argument('--sin-recorte', action='store_true'); ap.add_argument('--alt', action='store_true', help='muestra la descripción/alt de cada resultado'); ap.add_argument('--max', type=int, default=40); a = ap.parse_args()
b = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'banco.json'), encoding='utf8'))['imagenes']; r = []
for x in b:
    if x['estado'] in ('descartada', 'especifica') and a.estado != x['estado']: continue
    if a.estado and x['estado'] != a.estado: continue
    if a.cat and x['categoria'] != a.cat: continue
    if a.tema and x['subcategoria'] != a.tema: continue
    if a.materia and a.materia not in x.get('materia', []): continue
    if a.grado and a.grado not in x.get('grados', []): continue
    if a.sin_texto and x['tiene_texto']: continue
    if x['calidad'] < a.min_calidad: continue
    if a.sin_recorte and x.get('recorte'): continue
    blob = norm(' '.join([x['id'], x.get('descripcion', ''), x.get('uso', ''), ' '.join(x['tags']), x.get('texto', ''), ' '.join(c.get('titulo', '') for c in x.get('usada_en_origen', []))]))
    if all(norm(w) in blob for w in a.q): r.append(x)
for x in sorted(r, key=lambda x: -x['calidad'])[:a.max]:
    print(f"{x['calidad']}★ {x['id']:<48} [{(x['categoria'] + '/' + x['subcategoria']).rstrip('/')}]{' ✂ ' + ','.join(x['recorte']) if x.get('recorte') else ''}")
    if a.alt: print(f"     alt: {x.get('alt') or x.get('descripcion') or x.get('uso', '')}")
print(f'{len(r)} resultados' + (f' (mostrando {a.max})' if len(r) > a.max else ''))
