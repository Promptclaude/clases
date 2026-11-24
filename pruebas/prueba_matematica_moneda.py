#!/usr/bin/env python3
"""verificar_matematica.py debe entender precios ($20, $2.000) y porcentajes (25 %), y cazar distractores iguales a la respuesta."""
import json, os, subprocess, sys, tempfile
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(RAIZ, 'tools'))
from verificar_matematica import num
ok = True
def chequeo(nombre, cond):
    global ok; print(('✔ ' if cond else '✗ ') + nombre); ok = ok and cond

chequeo('«$20» vale 20', str(num('$20')) == '20')
chequeo('«$ 2.000» vale 2000 (punto de miles)', str(num('$ 2.000')) == '2000')
chequeo('«25 %» vale 25', str(num('25 %')) == '25')
chequeo('«3,5» sigue valiendo 3.5', str(num('3,5')) == '3.5')
chequeo('un texto sin número sigue siendo None', num('la mitad') is None)

def correr(opciones):
    q = {"id": "q1", "enunciado": "¿Cuánto es el 10 % de $200?", "calc": {"expr": "200/10", "resultado": "20"},
         "opciones": [{"id": str(i), "texto": t, "correcta": c} for i, (t, c) in enumerate(opciones)]}
    d = {"meta": {}, "slides": [{"id": "r1", "type": "quiz", "preguntas": [q]}]}
    f = os.path.join(tempfile.mkdtemp(), 'c.html')
    open(f, 'w', encoding='utf-8').write('<script type="application/json" id="datos-clase">' + json.dumps(d) + '</script>')
    return subprocess.run([sys.executable, os.path.join(RAIZ, 'tools', 'verificar_matematica.py'), f], capture_output=True, text=True).returncode

chequeo('respuesta correcta «$20» con calc 20 → verde', correr([('$20', True), ('$10', False), ('$2.000', False)]) == 0)
chequeo('distractor «$20» igual a la respuesta → rojo', correr([('$20', True), ('$20', False), ('$10', False)]) == 1)
chequeo('respuesta marcada «$25» con calc 20 → rojo', correr([('$25', True), ('$20', False), ('$10', False)]) == 1)
print('\n' + ('TODO EN ORDEN' if ok else 'HAY FALLAS')); sys.exit(0 if ok else 1)
