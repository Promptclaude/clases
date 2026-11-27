#!/usr/bin/env python3
"""
armar_prompt.py — arma el prompt que se pega en Claude para que se lea COMPLETO.

Une, en este orden:  núcleo (con tarjeta R1–R16)  →  módulos de actividades 33–45  →  tarjeta final R1–R16.
La tarjeta se repite al final para que las reglas críticas queden al principio y al final del texto,
donde la atención del modelo es mayor. El resultado cabe en unos 14.000 tokens.

Uso:
  python3 tools/armar_prompt.py                    → escribe prompt_armado.md (modo clase)
  python3 tools/armar_prompt.py --verificar        → falla si prompt_armado.md (el del repositorio) está desfasado
  python3 tools/armar_prompt.py --motor            → añade el módulo 32 (para cambiar/ampliar el motor)
  python3 tools/armar_prompt.py --tipos enlazar,sopa,detective
                                                   → solo los módulos de esos tipos (+ los siempre necesarios)
  python3 tools/armar_prompt.py -o salida.md --presupuesto 40000     (tope de tokens; por defecto 34000)
Sale con código 1 si se pasa del presupuesto o falta algo.
"""
import argparse, glob, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from generar_referencia_datos import MODULO_DE_TIPO as POR_TIPO, BASICOS   # una sola fuente de verdad

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NUCLEO = os.path.join(RAIZ, 'Prompt_Maestro_Clases_v27_NUCLEO.md')
MODULOS = os.path.join(RAIZ, 'prompt-modulos')
SIEMPRE = {33, 35, 36, 37, 42, 44, 45, 46}  # banco, ritmo, mapa/final, flujo con imágenes, Aula, formato de datos, modo juego, aventura
RANGO_CLASE = range(33, 47)


def numero(ruta):
    m = re.match(r'(\d+)_', os.path.basename(ruta))
    return int(m.group(1)) if m else -1


def filtrar_formato(texto, tipos):
    """Del módulo 44 deja la cabecera y solo los ejemplos de los tipos usados (+ los básicos)."""
    partes = re.split(r'(?=<!-- TIPO:)', texto)
    quiero = set(tipos) | BASICOS
    return ''.join(p for p in partes if not p.startswith('<!-- TIPO:') or re.match(r'<!-- TIPO:(\w+) -->', p).group(1) in quiero)


def tokens(texto):
    return len(texto) // 3            # estimación para español


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--motor', action='store_true', help='añade el módulo 32 (motor y calidad)')
    ap.add_argument('--verificar', action='store_true', help='comprueba que prompt_armado.md del repositorio está al día (no escribe nada)')
    ap.add_argument('--tipos', help='lista de tipos de slide separados por coma; solo sus módulos')
    ap.add_argument('--presupuesto', type=int, default=34000, help='tope de tokens estimados')
    ap.add_argument('-o', '--salida', default=os.path.join(RAIZ, 'prompt_armado.md'))
    a = ap.parse_args()

    if not os.path.exists(NUCLEO):
        print('✗ Falta', NUCLEO); return 1
    nucleo = open(NUCLEO, encoding='utf-8').read()
    m = re.search(r'<!--TARJETA_INICIO-->.*?<!--TARJETA_FIN-->', nucleo, re.S)
    if not m:
        print('✗ El núcleo no tiene la tarjeta de reglas críticas (marcas TARJETA_INICIO/FIN)'); return 1
    tarjeta = m.group(0).replace('<!--TARJETA_INICIO-->', '').replace('<!--TARJETA_FIN-->', '').strip()

    todos = {numero(f): f for f in glob.glob(os.path.join(MODULOS, '*.md'))}
    if a.tipos:
        tipos = [t.strip() for t in a.tipos.split(',') if t.strip()]
        desconocidos = [t for t in tipos if t not in POR_TIPO and t not in ('quiz', 'evalFinal', 'info', 'intro', 'final', 'tf', 'fill', 'drag', 'minijuego')]
        if desconocidos:
            print('✗ Tipos desconocidos:', ', '.join(desconocidos)); return 1
        quiero = set(SIEMPRE) | {POR_TIPO[t] for t in tipos if t in POR_TIPO}
        if 'abierta' in tipos: quiero.add(34)
    else:
        quiero = set(RANGO_CLASE)
    if a.motor: quiero.add(32)
    faltan = [n for n in sorted(quiero) if n not in todos]
    if faltan:
        print('✗ Faltan módulos:', faltan); return 1

    partes = [nucleo.rstrip()]
    incluidos = []
    for n in sorted(quiero):
        txt = open(todos[n], encoding='utf-8').read().strip()
        if n == 44 and a.tipos:
            txt = filtrar_formato(txt, tipos).strip()
        partes.append('\n\n---\n\n<!-- MÓDULO %d -->\n\n%s' % (n, txt))
        incluidos.append((n, os.path.basename(todos[n])))
    partes.append('\n\n---\n\n## ★ TARJETA FINAL — antes de entregar, verifica R1–R16 una por una\n\n' + tarjeta + '\n')
    salida = ''.join(partes)

    t = tokens(salida)
    if a.verificar:
        if a.tipos or a.motor:
            print('✗ --verificar solo compara el modo clase por defecto (sin --tipos ni --motor)'); return 1
        ruta = os.path.join(RAIZ, 'prompt_armado.md')
        actual = open(ruta, encoding='utf-8').read() if os.path.exists(ruta) else ''
        if actual != salida:
            print('✗ prompt_armado.md está desfasado: corre  python3 tools/armar_prompt.py  y súbelo'); return 1
        print('✔ prompt_armado.md está al día (%d tokens estimados)' % t); return 0
    with open(a.salida, 'w', encoding='utf-8') as f: f.write(salida)
    print('Prompt armado: %s' % os.path.relpath(a.salida, RAIZ))
    print('  núcleo + %d módulos (%s) + tarjeta final' % (len(incluidos), ', '.join(str(n) for n, _ in incluidos)))
    print('  %d caracteres ≈ %d tokens (presupuesto %d)' % (len(salida), t, a.presupuesto))
    if t > a.presupuesto:
        print('✗ Se pasa del presupuesto: un prompt tan largo no se lee completo. Reduce con --tipos o recorta módulos.'); return 1
    print('✔ Cabe completo y la tarjeta R1–R16 queda al principio y al final.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
