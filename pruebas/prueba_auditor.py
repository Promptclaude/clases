#!/usr/bin/env python3
"""Comprueba que auditar_clase.py y verificar_matematica.py DETECTAN clases defectuosas (cada defecto debe dar ROJO)."""
import json, os, re, subprocess, sys, tempfile
RAIZ = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); BASE = open(os.path.join(RAIZ, 'plantilla', 'clase_referencia.html'), encoding='utf8').read()
def correr(html):
    with tempfile.NamedTemporaryFile('w', suffix='.html', delete=False, encoding='utf8') as f: f.write(html); p = f.name
    r = subprocess.run([sys.executable, os.path.join(RAIZ, 'tools', 'auditar_clase.py'), p], capture_output=True, text=True); os.unlink(p); return r
def datos(html, fn):
    m = re.search(r'(<script type="application/json" id="datos-clase">)(.*?)(</script>)', html, re.S); d = json.loads(m.group(2)); fn(d)
    return html[:m.start(2)] + json.dumps(d, ensure_ascii=False) + html[m.end(2):]
CASOS = [
 ('quita el HUD de la nota (#nota-hud)', lambda h: h.replace('id="nota-hud"', 'id="otra-cosa"')),
 ('una pregunta con 2 respuestas correctas', lambda h: datos(h, lambda d: d['slides'][7]['preguntas'][1]['opciones'][1].update(correcta=True))),
 ('un distractor sin explicación del error (porQue)', lambda h: datos(h, lambda d: [o.pop('porQue') for o in d['slides'][7]['preguntas'][1]['opciones'] if not o['correcta'] and 'porQue' in o][:1] and d['slides'][7]['preguntas'][1].pop('errorComun'))),
 ('3 slides del mismo tipo seguidas', lambda h: datos(h, lambda d: [d['slides'][i].update(type='info', texto='x') for i in (2, 3, 4)])),
 ('menciona un personaje de terceros', lambda h: h.replace('Reino de los decimales</h1>', 'Reino de los decimales con Fortnite</h1>', 1)),
 ('respuesta calculada mal (3,4 + 2,15 = 5,50)', lambda h: datos(h, lambda d: d['slides'][7]['preguntas'][0].__setitem__('calc', {'expr': '3.4+2.15', 'resultado': '5,50'}))),
 ('opción correcta distinta del cálculo', lambda h: datos(h, lambda d: [o.update(correcta=(o['texto'] == '5,19')) for o in d['slides'][7]['preguntas'][0]['opciones']])),
 ('un distractor equivale a la respuesta (5,55 y 5,550)', lambda h: datos(h, lambda d: d['slides'][7]['preguntas'][0]['opciones'][1].update(texto='5,550'))),
 ('validación de sesión laxa', lambda h: h.replace('function sesionGuardadaEsValida(d) {', 'function sesionGuardadaEsValida(d) { if (d.semana !== undefined) return true;', 1)),
 ('imagen sin resolver (asset://)', lambda h: h.replace('<title>', '<img src="asset://aria-hola" alt="x"><title>', 1)),
 ('recurso externo (necesita internet)', lambda h: h.replace('</head>', '<script src="https://cdn.example.com/x.js"></script></head>', 1)),
 ('función crítica duplicada', lambda h: h.replace('function razonBloqueo(s) {', 'function razonBloqueo(x) { return ""; }\nfunction razonBloqueo(s) {', 1)),
]
base = correr(BASE); print(('✅' if base.returncode == 0 else '❌') + ' la clase de referencia sin defectos sale VERDE'); fallos = 0 if base.returncode == 0 else 1
for nombre, f in CASOS:
    try: r = correr(f(BASE)); det = r.returncode != 0
    except Exception as e: det, r = False, None; print('  (no se pudo armar el caso)', e)
    print(('✅ DETECTADO  ' if det else '❌ SE COLÓ    ') + nombre); fallos += 0 if det else 1
print(f'\n{len(CASOS) + 1 - fallos}/{len(CASOS) + 1} correctas'); sys.exit(1 if fallos else 0)
