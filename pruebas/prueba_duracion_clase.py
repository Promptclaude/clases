#!/usr/bin/env python3
"""Una clase dura 2 horas: el auditor avisa si tiene menos de 25 o más de 32 slides (y el ejemplo largo está en regla)."""
import json, os, subprocess, sys, tempfile
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ok = True
def chequeo(nombre, cond, detalle=''):
    global ok; print(('✔ ' if cond else '✗ ') + nombre + ((' — ' + detalle) if detalle and not cond else '')); ok = ok and cond

def auditar(datos_json, recorte=None):
    tmp = tempfile.mkdtemp(); d = json.load(open(datos_json, encoding='utf-8'))
    if recorte: d['slides'] = recorte(d['slides'])
    dj = os.path.join(tmp, 'd.json'); json.dump(d, open(dj, 'w', encoding='utf-8'), ensure_ascii=False)
    html, rep = os.path.join(tmp, 'c.html'), os.path.join(tmp, 'r.json')
    subprocess.run([sys.executable, os.path.join(RAIZ, 'tools', 'construir_clase.py'), os.path.join(RAIZ, 'plantilla', 'clase_referencia.src.html'), '--datos', dj, '-o', html], capture_output=True, text=True)
    r = subprocess.run([sys.executable, os.path.join(RAIZ, 'tools', 'auditar_clase.py'), html, '--json', rep], capture_output=True, text=True)
    return r.returncode, json.load(open(rep, encoding='utf-8'))

largo = os.path.join(RAIZ, 'plantilla', 'ejemplos', 'mat5_porcentajes_2h.datos.json')
n = len(json.load(open(largo, encoding='utf-8'))['slides'])
chequeo('el ejemplo de 2 horas tiene entre 25 y 32 slides', 25 <= n <= 32, str(n))
cod, rep = auditar(largo)
chequeo('el ejemplo largo no tiene errores', cod == 0, str(rep['errores']))
chequeo('el ejemplo largo cumple la duración (sin aviso)', any(x.startswith('Duración') for x in rep['ok']) and not any(x.startswith('Duración') for x in rep['avisos']), str(rep['avisos']))
cod, rep = auditar(os.path.join(RAIZ, 'plantilla', 'ejemplos', 'tec4_partes_pc.datos.json'))
chequeo('una clase de 9 slides recibe aviso de duración (sin fallar)', cod == 0 and any(x.startswith('Duración') and '25' in x for x in rep['avisos']), str(rep['avisos']))
cod, rep = auditar(largo, lambda sl: [sl[0]] + [dict(s, id='z%02d' % i) for i, s in enumerate(sl[1:-1] * 2)] + [sl[-1]])
chequeo('una clase de más de 32 slides recibe aviso', any(x.startswith('Duración') and '32' in x for x in rep['avisos']), str(rep['avisos'])[:200])
print('\n' + ('TODO EN ORDEN' if ok else 'HAY FALLAS')); sys.exit(0 if ok else 1)
