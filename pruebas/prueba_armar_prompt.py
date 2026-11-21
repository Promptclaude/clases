#!/usr/bin/env python3
"""Prueba del armador de prompt: que el prompt completo siga siendo leíble de principio a fin."""
import os, re, subprocess, sys, tempfile
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ok = True
def chequeo(nombre, cond, detalle=''):
    global ok
    print(('✔ ' if cond else '✗ ') + nombre + ((' — ' + detalle) if detalle and not cond else ''))
    ok = ok and cond

def armar(*args):
    sal = os.path.join(tempfile.mkdtemp(), 'p.md')
    r = subprocess.run([sys.executable, os.path.join(RAIZ, 'tools', 'armar_prompt.py'), '-o', sal, *args], capture_output=True, text=True)
    return r, (open(sal, encoding='utf-8').read() if os.path.exists(sal) else '')

r, t = armar()
chequeo('armar_prompt termina bien (código 0)', r.returncode == 0, r.stdout + r.stderr)
chequeo('tamaño ≤ 25.000 tokens estimados', len(t) // 3 <= 25000, str(len(t) // 3))
reglas = ['R%d' % i for i in range(1, 16)]
ini = t.find('TARJETA DE REGLAS CRÍTICAS'); fin = t.rfind('TARJETA FINAL')
chequeo('la tarjeta aparece al principio y al final', 0 <= ini < fin and ini < 2000 and len(t) - fin < 4000, 'ini=%d fin=%d de %d' % (ini, fin, len(t)))
for rr in reglas:
    chequeo('%s está al principio y al final' % rr, len(re.findall(r'\| %s \|' % rr, t)) == 2)
chequeo('incluye los módulos 33 a 44', all('<!-- MÓDULO %d -->' % n in t for n in range(33, 45)))
chequeo('trae el formato del datos.json de los tipos básicos', all(k in t for k in ('"mision"', '"errorComun"', '"pares"', '"acertijos"', '"expr"')))
r0 = subprocess.run([sys.executable, os.path.join(RAIZ, 'tools', 'generar_referencia_datos.py'), '--verificar'], capture_output=True, text=True)
chequeo('el módulo 44 está al día con plantilla/ejemplos', r0.returncode == 0, r0.stdout + r0.stderr)
chequeo('no promete colores --mundo en datos.json', '+ colores `--mundo' not in t)
chequeo('el informe de entrega pide verificar R1–R15', 'R1 ✔' in t and 'R15 ✔' in t)
chequeo('pide el bloque de LECTURA al inicio', 'LECTURA:' in t and 'cortado' in t)
chequeo('sin referencias a imágenes remotas', 'unsplash' not in t.lower())
chequeo('sin tipos de slide inexistentes recomendados', not re.search(r'type[`: ]+(historia|interactive|wordsearch|match)\b', t))

r2, t2 = armar('--tipos', 'enlazar,sopa')
chequeo('--tipos arma un prompt más corto', r2.returncode == 0 and 0 < len(t2) < len(t), r2.stdout + r2.stderr)
chequeo('--tipos conserva el formato de los tipos pedidos y quita los otros', '### `enlazar`' in t2 and '### `sopa`' in t2 and '### `quiz`' in t2 and '### `detective`' not in t2)
r3, t3 = armar('--motor')
chequeo('--motor añade el módulo 32', r3.returncode == 0 and '<!-- MÓDULO 32 -->' in t3)
r4, _ = armar('--presupuesto', '5000')
chequeo('falla si se pasa del presupuesto', r4.returncode == 1)
r5, _ = armar('--tipos', 'inventado')
chequeo('rechaza tipos que el motor no tiene', r5.returncode == 1)
print('\n' + ('TODO EN ORDEN' if ok else 'HAY FALLAS'))
sys.exit(0 if ok else 1)
