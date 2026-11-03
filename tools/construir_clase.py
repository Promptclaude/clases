#!/usr/bin/env python3
"""
construir_clase.py — arma una clase a partir de la plantilla de referencia (motor probado) y sus datos.
  1) inyecta el motor v23/v25 (fuente única de las funciones críticas) en la plantilla
  2) (opcional) reemplaza el bloque <script id="datos-clase"> por el JSON de la clase nueva  (--datos datos.json)
  3) empaqueta los asset:// (mismo comportamiento que empaquetar_assets.py)
Uso:  python3 tools/construir_clase.py plantilla/clase_referencia.src.html -o clase.html [--datos datos.json | --datos-de clase_vieja.html] [--motor-dir plantilla/motor]
"""
import argparse, json, os, re, subprocess, sys
def main():
    ap = argparse.ArgumentParser(); ap.add_argument('plantilla'); ap.add_argument('-o', '--salida', required=True)
    ap.add_argument('--datos'); ap.add_argument('--datos-de', help='clase ya construida de la que se toman los datos (para pasarla al motor nuevo)'); ap.add_argument('--motor-dir', default=os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'plantilla', 'motor'))
    ap.add_argument('--assets', default=os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'banco-imagenes')); ap.add_argument('--presupuesto-mb', default='1.5')
    a = ap.parse_args()
    t = open(a.plantilla, encoding='utf8').read()
    for marca, f in (('/*@@V23@@*/', 'v23_snippets.js'), ('/*@@FX@@*/', 'juego_fx_snippets.js')):
        assert marca in t, 'falta la marca ' + marca
        t = t.replace(marca, open(os.path.join(a.motor_dir, f), encoding='utf8').read())
    if a.datos_de:
        m = re.search(r'<script type="application/json" id="datos-clase">(.*?)</script>', open(a.datos_de, encoding='utf8').read(), re.S); assert m, 'esa clase no tiene bloque datos-clase'
        a.datos = a.salida + '.datos.tmp.json'; open(a.datos, 'w', encoding='utf8').write(m.group(1).replace('<\\/', '</'))
    if a.datos:
        d = json.load(open(a.datos, encoding='utf8')); js = json.dumps(d, ensure_ascii=False, indent=1).replace('</', '<\\/')
        t, n = re.subn(r'(<script type="application/json" id="datos-clase">).*?(</script>)', lambda m: m.group(1) + '\n' + js + '\n' + m.group(2), t, count=1, flags=re.S); assert n == 1
    tmp = a.salida + '.tmp.html'; open(tmp, 'w', encoding='utf8').write(t)
    r = subprocess.run([sys.executable, os.path.join(os.path.dirname(os.path.abspath(__file__)), 'empaquetar_assets.py'), tmp, '-o', a.salida, '--assets', a.assets, '--presupuesto-mb', a.presupuesto_mb], capture_output=True, text=True)
    os.remove(tmp)
    if a.datos_de and os.path.exists(a.datos): os.remove(a.datos)
    print(r.stdout.strip()); 
    if r.returncode: print(r.stderr.strip()); sys.exit(r.returncode)
if __name__ == '__main__': main()
