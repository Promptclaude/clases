#!/usr/bin/env python3
"""
verificar_matematica.py — recalcula con aritmética exacta (Decimal) cada pregunta numérica de la clase.
Cada pregunta con operación lleva  "calc": {"expr": "3.4+2.15", "resultado": "5,55"}  (decimales con coma o punto).
Comprueba: (1) expr da exactamente `resultado`; (2) la opción marcada correcta vale ese resultado; (3) NINGÚN distractor vale lo mismo
(equivalencias: 0,5 = 0,50); (4) hay UNA sola correcta. Las preguntas generadas (`gen`) se verifican en la prueba E2E (T17).
Con --estricto, una pregunta con operación en el enunciado y sin `calc` es un error.   Uso: python3 tools/verificar_matematica.py clase.html [--estricto]
"""
import ast, json, re, sys
from decimal import Decimal, InvalidOperation
def evaluar(expr):
    def ev(n):
        if isinstance(n, ast.Expression): return ev(n.body)
        if isinstance(n, ast.Constant) and isinstance(n.value, (int, float)): return Decimal(str(n.value))
        if isinstance(n, ast.UnaryOp) and isinstance(n.op, (ast.USub, ast.UAdd)): v = ev(n.operand); return -v if isinstance(n.op, ast.USub) else v
        if isinstance(n, ast.BinOp) and isinstance(n.op, (ast.Add, ast.Sub, ast.Mult, ast.Div)):
            a, b = ev(n.left), ev(n.right); return a + b if isinstance(n.op, ast.Add) else a - b if isinstance(n.op, ast.Sub) else a * b if isinstance(n.op, ast.Mult) else a / b
        raise ValueError('expresión no permitida')
    return ev(ast.parse(expr.replace(',', '.'), mode='eval'))
def num(txt):
    t = str(txt).strip().replace(' ', '').replace('\u2212', '-')
    if re.fullmatch(r'-?\d{1,3}(\.\d{3})+(,\d+)?', t): t = t.replace('.', '')
    try: return Decimal(t.replace(',', '.'))
    except InvalidOperation: return None
def main():
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    html = open(sys.argv[1], encoding='utf8').read(); estricto = '--estricto' in sys.argv
    m = re.search(r'<script type="application/json" id="datos-clase">(.*?)</script>', html, re.S)
    if not m: print('❌ No hay bloque <script id="datos-clase">'); sys.exit(1)
    datos = json.loads(m.group(1)); errores, ok, gen, sin = [], 0, 0, []
    for s in datos['slides']:
        for p in s.get('preguntas', []):
            pid = f"{s['id']}/{p['id']}"
            if 'gen' in p: gen += 1; continue
            calc = p.get('calc')
            if not calc:
                if re.search(r'\d[\d.,]*\s*[+\-−×x÷*/]\s*\d', p.get('enunciado', '')): sin.append(pid)
                continue
            try: r = evaluar(calc['expr'])
            except Exception as e: errores.append(f'{pid}: expresión inválida ({e})'); continue
            if num(calc['resultado']) is None or r != num(calc['resultado']): errores.append(f"{pid}: {calc['expr']} = {r}, pero calc.resultado dice {calc['resultado']}")
            buenas = [o for o in p['opciones'] if o.get('correcta')]
            if len(buenas) != 1: errores.append(f'{pid}: tiene {len(buenas)} opciones correctas'); continue
            if num(buenas[0]['texto']) != r: errores.append(f"{pid}: la opción marcada correcta ({buenas[0]['texto']}) no vale {r}")
            for o in p['opciones']:
                if not o.get('correcta') and num(o['texto']) == r: errores.append(f"{pid}: el distractor «{o['texto']}» vale lo mismo que la respuesta ({r})")
            ok += 1
    if sin and estricto: errores += [f'{x}: tiene una operación en el enunciado y no lleva "calc"' for x in sin]
    print(f'Matemática: {ok} preguntas recalculadas ✔ · {gen} generadas (se prueban en E2E T17) · {len(sin)} con operación sin "calc"' + (' (error)' if sin and estricto else ' (aviso)' if sin else ''))
    for e in errores: print('  ❌', e)
    sys.exit(1 if errores else 0)
if __name__ == '__main__': main()
